import { usePaymentFlow } from '../../hooks/usePaymentFlow';
import AmountInput from './AmountInput';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ShieldCheck, AlertCircle, ExternalLink, CreditCard, Banknote } from 'lucide-react';

export default function PaymentCard() {
  const { 
    amount, 
    setAmount, 
    step, 
    setStep, 
    isLoading, 
    handleInitialPay, 
    reset,
    isLoggedIn,
    balance
  } = usePaymentFlow();

  if (step === 'success') {
    return (
      <Card className="text-center space-y-6" padding="lg">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white">
            ✓
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
        <p className="text-gray-500">Your payment of ${amount} has been sent to @mekjah.</p>
        <div className="pt-2 text-xs text-gray-400">No extra fees • Instant payment</div>
        <button
          onClick={reset}
          className="text-teal-600 font-medium hover:underline"
        >
          Send another payment
        </button>
      </Card>
    );
  }

  if (step === 'insufficient_funds') {
    return (
      <Card className="space-y-6" padding="lg">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Insufficient Funds</h3>
            <p className="text-sm text-gray-500">
              To complete this payment, you need USDC in your wallet.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Required:</span>
            <span className="font-bold">${amount} USDC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Your Balance:</span>
            <span className="font-bold text-red-500">${balance?.toFixed(2) || '0.00'} USDC</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={() => window.open('https://ramp.network', '_blank')} variant="outline" className="flex items-center justify-center space-x-2">
            <span>Top up with Crypto</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
          <button
            onClick={() => setStep('amount')}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Go back
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="space-y-6" padding="lg">
      {step === 'amount' && (
        <>
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-bold text-gray-900">Send Payment</h3>
            <p className="text-sm text-gray-500">Pay instantly to @mekjah. Simple and secure.</p>
          </div>

          <AmountInput value={amount} onChange={setAmount} />

          <div className="pt-4">
            <Button
              onClick={handleInitialPay}
              isLoading={isLoading}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              {isLoggedIn ? `Pay $${amount}` : 'Continue to Pay'}
            </Button>
          </div>

          {/* Roadmap Features */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Coming Soon</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg opacity-50 cursor-not-allowed">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">Card</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg opacity-50 cursor-not-allowed">
                <Banknote className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500">Bank</span>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 'processing' && (
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">Processing Payment</h3>
            <p className="text-sm text-gray-500">Please wait while we secure your transaction...</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-2 pt-2">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <ShieldCheck className="w-3 h-3" />
          <span>Secure payment • Powered by PayLink</span>
        </div>
      </div>
    </Card>
  );
}
