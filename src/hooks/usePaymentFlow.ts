import { usePaymentStore, useUIStore } from './useStore';
import { useAuth } from './useAuth';
import { starkzap } from '../services/starkzapService';

export function usePaymentFlow() {
  const { 
    amount, setAmount, 
    step, setStep, 
    isLoading, setIsLoading, 
    balance, setBalance 
  } = usePaymentStore();
  const { setActiveModal, setPendingAction } = useUIStore();
  const { isLoggedIn } = useAuth();

  const handleInitialPay = async () => {
    if (!isLoggedIn) {
      setPendingAction('pay');
      setActiveModal('auth');
      return;
    }

    setIsLoading(true);
    
    // Check balance after login
    const currentBalance = await starkzap.getBalance('USDC');
    setBalance(currentBalance);
    
    // For demo purposes, if amount > 1000, simulate insufficient funds
    if (parseFloat(amount) > 1000) {
      setStep('insufficient_funds');
      setIsLoading(false);
    } else {
      await handleFinalPayment();
    }
  };

  const handleFinalPayment = async () => {
    setStep('processing');
    setIsLoading(true);
    
    const result = await starkzap.sendPayment({
      recipient: '@mekjah',
      amount: parseFloat(amount),
      asset: 'USDC'
    });

    setIsLoading(false);
    if (result.success) {
      setStep('success');
    } else {
      setStep('amount');
    }
  };

  const reset = () => {
    setStep('amount');
    setAmount('');
  };

  return {
    amount,
    setAmount,
    step,
    setStep,
    isLoading,
    handleInitialPay,
    handleFinalPayment,
    reset,
    isLoggedIn,
    balance
  };
}
