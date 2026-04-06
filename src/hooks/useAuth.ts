import { usePrivy } from '@privy-io/react-auth';
import { StarkZap, OnboardStrategy, StarkSigner } from 'starkzap';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ec } from 'starknet';

// Module-level singleton — shared across ALL components that call useAuth()
// This is the key fix for the loop: one instance, one onboard attempt
const sdk = new StarkZap({
  network: import.meta.env.VITE_NETWORK === 'mainnet' ? 'mainnet' : 'sepolia',
});

const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3001';

// Shared wallet state at module level — persists across re-renders and components
let sharedWallet: any = null;
let sharedAddress: string | null = null;
let isOnboarding = false;  // Single flag for the entire app, not per-component

export function useAuth() {
  const {
    login: privyLogin,
    logout: privyLogout,
    authenticated,
    ready,
    getAccessToken,
  } = usePrivy();

  // Local state for triggering re-renders when shared state changes
  const [wallet, setWallet] = useState<any>(sharedWallet);
  const [starknetAddress, setStarknetAddress] = useState<string | null>(sharedAddress);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccessTokenRef = useRef(getAccessToken);
  useEffect(() => {
    getAccessTokenRef.current = getAccessToken;
  });

  const onboardWithSigner = useCallback(async () => {
    const token = await getAccessTokenRef.current();
    if (!token) throw new Error('No auth token');

    console.log('[onboard] Fetching wallet key from server...');
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
    console.log('[onboard] Got key, creating signer...');

    const hexKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    const validStarkKey = ec.starkCurve.grindKey(hexKey);

    const { wallet: connectedWallet } = await sdk.onboard({
      strategy: OnboardStrategy.Signer,
      account: { signer: new StarkSigner(validStarkKey) },
      deploy: 'never',
    });

    console.log('[onboard] Success. Address:', connectedWallet.address);
    return connectedWallet;
  }, []);

  useEffect(() => {
    
    if (!ready || !authenticated || sharedWallet || isOnboarding) return;

    isOnboarding = true;

    const run = async () => {
      try {
        const connectedWallet = await onboardWithSigner();
        // Update module-level shared state
        sharedWallet = connectedWallet;
        sharedAddress = connectedWallet.address;
        // Update local React state to trigger re-renders in all consumers
        setWallet(connectedWallet);
        setStarknetAddress(connectedWallet.address);
      } catch (err) {
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
  };

  return {
    login,
    logout,
    wallet,
    authenticated,
    starknetAddress,
    ready,
    isLoading,
    error,
  };
}