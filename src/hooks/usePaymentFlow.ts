import { usePaymentStore } from './useStore';
import { useAuth } from './useAuth';
import { Amount, sepoliaTokens } from 'starkzap';

const STRK = sepoliaTokens.STRK;
const USDC = sepoliaTokens.USDC;
const RECIPIENT_ADDRESS = "0x0251366E37314e144d03176c3279F9bbCe7B12aF06D7aBFB925679265C5C4EBc";

export function usePaymentFlow() {
  const {
    amount, setAmount,
    step, setStep,
    isLoading, setIsLoading,
    balance, setBalance,
  } = usePaymentStore();

  const { authenticated, wallet, login } = useAuth();

  const startPayment = async () => {
    setIsLoading(true);

    try {
      let activeWallet = wallet;

      if (!authenticated || !activeWallet) {
        const result = await login();
        if (!result || !result.walletInstance) {
          setIsLoading(false);
          return;
        }
        activeWallet = result.walletInstance;
      }

      setStep('processing');

      // Check STRK gas balance — if zero, tell user to wait and retry
      
      const gasBalance = await activeWallet.balanceOf(STRK);
      const gasAmount = Number(gasBalance.toUnit());
      console.log('[payment] STRK gas unit:', gasBalance.toUnit());
      console.log('[payment] STRK gas balance:', gasAmount);

      if (!Number.isFinite(gasAmount) || gasAmount === 0) {
        // Gas was sent by server but hasn't confirmed yet
        // Show a friendly waiting state instead of throwing
        setStep('waiting_for_gas');
        setIsLoading(false);
        return;
      }

      // Check USDC balance
      const balanceData = await activeWallet.balanceOf(USDC);
      const balanceAmount = Number(balanceData.toUnit());
      setBalance(balanceAmount);
      console.log('[payment] USDC balance:', balanceAmount);

      if (Number.isNaN(balanceAmount) || balanceAmount < Number(amount)) {
        setStep('insufficient_funds');
        setIsLoading(false);
        return;
      }

      
      await activeWallet.ensureReady({ deploy: 'if_needed' });

      const tx = await activeWallet.transfer(
        USDC,
        [{ to: RECIPIENT_ADDRESS, amount: Amount.parse(amount, USDC) }],
        { feeMode: 'user_pays' }
      );

      await tx.wait();
      setStep('success');

    } catch (error: any) {
      console.error('Payment Flow Error:', error);

      // Specific error for gas/balance issues — tell user to retry
      if (
        error?.message?.includes('balance') ||
        error?.message?.includes('Resources bounds') ||
        error?.message?.includes('funds')
      ) {
        setStep('waiting_for_gas');
      } else {
        setStep('amount');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitialPay = async () => {
    await startPayment();
  };

  return {
    amount, setAmount,
    step, setStep,
    isLoading,
    startPayment,
    handleInitialPay,
    isLoggedIn: authenticated,
    balance,
  };
}