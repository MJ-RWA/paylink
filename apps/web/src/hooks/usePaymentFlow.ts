import { usePaymentStore } from './useStore';
import { useAuth } from './useAuth';
import { Amount, sepoliaTokens } from 'starkzap';
import { normalizeAddress } from '../lib/address';
import { saveTransactionToServer, updateTransactionOnServer } from '../lib/transactions';
import { useEffect, useRef, useState, useCallback } from 'react';
import { resolveUsername } from '../lib/registry';

const STRK = sepoliaTokens.STRK;
const USDC = sepoliaTokens.USDC;

function openMoonPay(walletAddress: string) {
  const apiKey = import.meta.env.VITE_MOONPAY_PUBLISHABLE_KEY;
  if (!apiKey) {
    console.warn('[moonpay] VITE_MOONPAY_PUBLISHABLE_KEY not set in .env');
    return;
  }
  const params = new URLSearchParams({
    apiKey,
    currencyCode: 'usdc_starknet',
    walletAddress,
    colorCode: '#0D9488',
  });
  window.open(
    `https://buy-sandbox.moonpay.com?${params.toString()}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export function usePaymentFlow(recipientUsername?: string) {
  const {
    amount, setAmount,
    step, setStep,
    setIsLoading,
    balance, setBalance,
    walletAddress, setWalletAddress,
    transactions,
    addTransaction,
    updateTransactionStatus,
    preferredAsset
  } = usePaymentStore();

  const [recipientAddress, setRecipientAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { authenticated, wallet, login, getAccessToken } = useAuth();
  const getAccessTokenRef = useRef(getAccessToken);

  useEffect(() => { 
    getAccessTokenRef.current = getAccessToken; 
  });

  const performResolution = useCallback(async () => {
    if (!recipientUsername) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const addr = await resolveUsername(recipientUsername);
      if (addr) {
        setRecipientAddress(normalizeAddress(addr));
      } else {
        setStep('error');
        setError(`This PayLink (@${recipientUsername}) has not been set up yet.`);
      }
    } catch (err: any) {
      console.error(`[paymentFlow] Resolution failed for ${recipientUsername}:`, err);
      setStep('error');
      setError(err.message || 'Could not connect to Starknet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [recipientUsername, setStep, setIsLoading]);

  useEffect(() => {
    performResolution();
  }, [performResolution]);

  const getActiveWallet = async () => {
    if (authenticated && wallet) return wallet;
    const result = await login();
    if (!result?.walletInstance) throw new Error('Login cancelled');
    return result.walletInstance;
  };

  const executeTransfer = async (activeWallet: any, onTransferComplete?: () => void) => {
    if (!recipientAddress) {
      setStep('error');
      throw new Error('Recipient address resolution failed.');
    }

    const currentAddress = normalizeAddress(activeWallet.address);
    const normalizedRecipient = normalizeAddress(recipientAddress);

    if (currentAddress === normalizedRecipient) {
      setStep('error');
      setError('Cannot send payment to yourself');
      throw new Error('Invalid payment: recipient equals sender');
    }

    await activeWallet.ensureReady({ deploy: 'if_needed' });
    const tx = await activeWallet.transfer(
      USDC,
      [{ to: normalizedRecipient, amount: Amount.parse(amount, USDC) }],
      { feeMode: 'user_pays' }
    );

    const txHash = tx.transaction_hash ?? tx.hash;

    addTransaction({
      hash: txHash,
      amount,
      symbol: preferredAsset || 'USDC',
      timestamp: Date.now(),
      status: 'pending',
      senderAddress: currentAddress,         
      recipientAddress: normalizedRecipient, 
      direction: 'sent',                    
    });
    const token = await getAccessTokenRef?.current?.() ?? '';
    try {
      await saveTransactionToServer(token, {
        hash: txHash,
        amount,
        symbol: preferredAsset || 'USDC',
        timestamp: Date.now(),
        status: 'pending',
        recipientAddress: normalizedRecipient, 
        senderAddress: currentAddress,        
      });
    } catch (e) {
      console.warn('[paymentFlow] Server sync failed, will retry on success', e);
    }

    try {
    
      await tx.wait();
      const updatedBalance = await activeWallet.balanceOf(USDC);
      setBalance(Number(updatedBalance.toUnit()));

      
      updateTransactionStatus(txHash, 'success');
      await updateTransactionOnServer(txHash, 'success');

  
      await new Promise(r => setTimeout(r, 1500));
      if (onTransferComplete) {
        onTransferComplete();
      }
      setStep('success');
      
    } catch (error) {
      console.error('[paymentFlow] Transaction execution failed:', error);
      updateTransactionStatus(txHash, 'failed');
      updateTransactionOnServer(txHash, 'failed');
      throw error;
    }
  };

  const startPayment = async (onTransferComplete?: () => void) => {
    setIsLoading(true);
    try {
      const activeWallet = await getActiveWallet();
      setWalletAddress(normalizeAddress(activeWallet.address));
      setStep('processing');

    
      const gasBalance = await activeWallet.balanceOf(STRK);
      const gasAmount = Number(gasBalance.toUnit());
      if (!Number.isFinite(gasAmount) || gasAmount === 0) {
        setStep('waiting_for_gas');
        return;
      }

    
      const balanceData = await activeWallet.balanceOf(USDC);
      const balanceAmount = Number(balanceData.toUnit());
      setBalance(balanceAmount);

      if (balanceAmount < Number(amount)) {
        setStep(balanceAmount === 0 ? 'funding' : 'insufficient_funds');
        return;
      }

      await executeTransfer(activeWallet, onTransferComplete);
    } catch (error: any) {
      console.error('Payment Flow Error:', error);
      if (error?.message !== 'Login cancelled') {
          setStep('amount');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAfterFunding = async (onTransferComplete?: () => void) => {
    setIsLoading(true);
    try {
      const activeWallet = await getActiveWallet();
      
      setWalletAddress(normalizeAddress(activeWallet.address));
      
      setStep('processing');
      
      const balanceData = await activeWallet.balanceOf(USDC);
      const balanceAmount = Number(balanceData.toUnit());
      setBalance(balanceAmount);

      if (!Number.isFinite(balanceAmount) || balanceAmount < Number(amount)) {
        setStep('funding');
        return;
      }

      await executeTransfer(activeWallet, onTransferComplete);
    } catch (error: any) {
      console.error('confirmAfterFunding error:', error);
      setStep('funding');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenMoonPay = () => {
    if (walletAddress) openMoonPay(walletAddress);
  };

  return {
    transactions,
    amount, setAmount,
    step, setStep,
    isLoading: usePaymentStore(s => s.isLoading),
    startPayment,
    confirmAfterFunding,
    handleOpenMoonPay,
    isLoggedIn: authenticated,
    balance,
    walletAddress,
    resolutionError: error,
    retryResolution: performResolution
  };
}