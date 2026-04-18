import { usePrivy } from '@privy-io/react-auth';
import { StarkZap, OnboardStrategy, StarkSigner } from 'starkzap';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ec } from 'starknet';
import { usePaymentStore } from './useStore';
import { getPayLinkConfig } from '../config';

const { network, serverUrl } = getPayLinkConfig();

const sdk = new StarkZap({
  network,
});

const SERVER_URL = serverUrl;

// Shared wallet state at module level
let sharedWallet: any = null;
let sharedAddress: string | null = null;
let isOnboarding = false;

export function useAuth() {
  const {
    login: privyLogin,
    logout: privyLogout,
    authenticated,
    ready,
    user,
    getAccessToken,
  } = usePrivy();

  const [wallet, setWallet] = useState<any>(sharedWallet);
  const [starknetAddress, setStarknetAddress] = useState<string | null>(sharedAddress);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { clearTransactions } = usePaymentStore.getState();
  
  const getAccessTokenRef = useRef(getAccessToken);
  useEffect(() => {
    getAccessTokenRef.current = getAccessToken;
  });

  const onboardWithSigner = useCallback(async () => {
  const token = await getAccessTokenRef.current();
  
  if (!token) {
    console.warn('[onboard] No token yet, skipping...');
    throw new Error('AUTH_NOT_READY'); 
  }

  // STEP 1: Get private key ONLY
  console.log('[onboard] Fetching private key from server...');
  const response = await fetch(`${SERVER_URL}/api/wallet/get-or-create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error ?? 'Failed to get wallet key');
  }

  const { privateKey } = await response.json();

  // STEP 2: Create wallet (SOURCE OF TRUTH)
  const hexKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
  const validStarkKey = ec.starkCurve.grindKey(hexKey);

  const { wallet: connectedWallet } = await sdk.onboard({
    strategy: OnboardStrategy.Signer,
    account: { signer: new StarkSigner(validStarkKey) },
    deploy: 'never',
  });

  console.log('[onboard] Wallet address (SOURCE OF TRUTH):', connectedWallet.address);

  // STEP 3: Send REAL address back to backend
  await fetch(`${SERVER_URL}/api/wallet/get-or-create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      address: connectedWallet.address, 
    }),
  });

  // STEP 4: Save to Zustand
  const { setWalletAddress } = usePaymentStore.getState();
  setWalletAddress(connectedWallet.address);

  return connectedWallet;
}, []);

  useEffect(() => {
    if (!ready || !authenticated || sharedWallet || isOnboarding) return;
   if (!getAccessTokenRef.current) return;
    isOnboarding = true;

    const run = async () => {
  try {
    const connectedWallet = await onboardWithSigner();

    sharedWallet = connectedWallet;
    sharedAddress = connectedWallet.address;

    setWallet(connectedWallet);
    setStarknetAddress(connectedWallet.address);

    const { setWalletAddress } = usePaymentStore.getState();
    setWalletAddress(connectedWallet.address);

  } catch (err: any) {
    if (err.message === 'AUTH_NOT_READY') {
      console.log('[auto-onboard] Waiting for token...');
      isOnboarding = false;

      setTimeout(run, 500);
      return;
    }

    console.error('[auto-onboard] Failed:', err);
    isOnboarding = false;
  }
};

    run();
  }, [ready, authenticated, onboardWithSigner]);

  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!authenticated) {
        await privyLogin();
        setIsLoading(false);
        return null;
      }
      
      if (sharedWallet) {
        const { setWalletAddress } = usePaymentStore.getState();
        setWalletAddress(sharedWallet.address);
        
        setIsLoading(false);
        return {
          address: sharedWallet.address,
          walletInstance: sharedWallet,
        };
      }

      isOnboarding = false;
      const connectedWallet = await onboardWithSigner();
      sharedWallet = connectedWallet;
      sharedAddress = connectedWallet.address;
      setWallet(connectedWallet);
      setStarknetAddress(connectedWallet.address);
      const { setWalletAddress } = usePaymentStore.getState();
      setWalletAddress(connectedWallet.address);

      return {
        address: connectedWallet.address,
        walletInstance: connectedWallet,
      };

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      console.error('[login] Error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await privyLogout();
    sharedWallet = null;
    sharedAddress = null;
    isOnboarding = false;
    setWallet(null);
    setStarknetAddress(null);
    setError(null);
    const { setWalletAddress } = usePaymentStore.getState();
    setWalletAddress(null);
    clearTransactions();
  };

  return {
    login,
    logout,
    wallet,
    authenticated,
    ready,
    isLoading,
    error,
    user,
    starknetAddress: starknetAddress || user?.wallet?.address || null,
    getAccessToken,
  };
}