import { usePaymentFlow } from '../../hooks/usePaymentFlow';
import AmountInput from './AmountInput';
import Button from '../ui/Button';
import Card from '../ui/Card';
import {
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  CreditCard,
  Banknote,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface PaymentCardProps {
  onPay?: () => void;
}

export default function PaymentCard({ onPay }: PaymentCardProps) {
  const { username } = useParams<{ username: string }>();
  
  const {
    amount,
    setAmount,
    step,
    setStep,
    isLoading,
    startPayment,
    confirmAfterFunding,
    handleOpenMoonPay,
    isLoggedIn,
    balance,
    walletAddress,
  } = usePaymentFlow(username);

  const [copied, setCopied] = useState(false);

  const handleButtonClick = (e?: any) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (onPay) {
      onPay();
    } else {
      startPayment();
    }
  };

  const displayBalance: string = balance
    ? parseFloat(balance.toString()).toFixed(2)
    : '0.00';

  const copyAddress = async () => {
    if (!walletAddress) return;
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Success screen
  if (step === 'success') {
    return (
      <Card className="text-center space-y-6" padding="lg">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white">
            ✓
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
        <p className="text-gray-500">
          Your payment of ${amount} has been sent to @{username || 'mekjah'}.
        </p>
        <div className="pt-2 text-xs text-gray-400">
          No extra fees • Instant payment
        </div>
        <Button
          type="button"
          onClick={() => setStep('amount')}
          variant="secondary"
          className="flex items-center justify-center space-x-2 w-full"
        >
          Send another payment
        </Button>
      </Card>
    );
  }

  // Insufficient funds
  if (step === 'insufficient_funds') {
  return (
    <Card className="overflow-hidden" padding="none">
      {/* Header banner */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 px-6 pt-8 pb-6 text-center border-b border-amber-100">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-amber-100">
          <AlertCircle className="w-7 h-7 text-amber-500" />
        </div>
        <h3 className="text-lg font-black tracking-tight text-gray-900">
          Top Up Required
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          You need more USDC to complete this payment
        </p>
      </div>

      <div className="p-6 space-y-5">
        {/* Amount shortfall */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Required</span>
            <span className="text-sm font-bold text-gray-900">${amount} USDC</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Your balance</span>
            <span className="text-sm font-bold text-red-500">${displayBalance} USDC</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Shortfall</span>
            <span className="text-sm font-black text-amber-600">
              ${(parseFloat(amount) - parseFloat(displayBalance || '0')).toFixed(2)} USDC
            </span>
          </div>
        </div>

        {/* Wallet address */}
        {walletAddress && (
          <div className="space-y-1.5">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1">
              Your Starknet wallet
            </p>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
              <code className="text-[11px] text-gray-600 break-all flex-1 leading-relaxed font-mono">
                {walletAddress}
              </code>
              <button
                type="button"
                onClick={copyAddress}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-400"
                title="Copy address"
              >
                {copied
                  ? <Check className="w-3.5 h-3.5 text-teal-500" />
                  : <Copy className="w-3.5 h-3.5" />
                }
              </button>
            </div>
            <p className="text-[11px] text-gray-400 px-1">
              Send USDC on Starknet Sepolia to this address
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2.5">
          <Button
            type="button"
            onClick={handleOpenMoonPay}
            className="w-full flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Buy USDC with Card</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </Button>

          <Button
            type="button"
            onClick={(e: any) => {
              e.preventDefault();
              confirmAfterFunding();
            }}
            variant="secondary"
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? 'Checking balance...' : "I've added funds — continue"}
          </Button>

          <button
            type="button"
            onClick={() => setStep('amount')}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
          >
            ← Go back
          </button>
        </div>
      </div>
    </Card>
  );
}

  // Funding step
  if (step === 'funding') {
    return (
      <>
      <Card className="space-y-6" padding="lg">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Add USDC to Pay</h3>
          <p className="text-sm text-gray-500">
            You need <strong>${amount} USDC</strong> to complete this payment.
            Add funds using a card or bank transfer.
          </p>
        </div>

        {walletAddress && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Your wallet address
            </p>
            <div className="flex items-start gap-3">
              <code className="text-xs text-gray-700 break-all flex-1 leading-relaxed">
                {walletAddress}
              </code>
              <button
                onClick={copyAddress}
                className="shrink-0 p-1.5 rounded-md hover:bg-gray-200 transition-colors text-gray-500"
                title="Copy address"
              >
                {copied
                  ? <Check className="w-4 h-4 text-teal-500" />
                  : <Copy className="w-4 h-4" />
                }
              </button>
            </div>
            <p className="text-xs text-gray-400">
              Send USDC on Starknet Sepolia to this address
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleOpenMoonPay}
            className="flex items-center justify-center space-x-2 w-full"
          >
            <CreditCard className="w-4 h-4" />
            <span>Buy USDC with Card</span>
            <ExternalLink className="w-4 h-4" />
          </Button>

          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg opacity-50 cursor-not-allowed">
            <Banknote className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Bank transfer — coming soon</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-3">
          <p className="text-xs text-gray-400 text-center">
            Already sent USDC? Click below to check your balance and proceed.
          </p>
          <Button
            type="button"
            onClick={(e: any) => {
            e.preventDefault(); 
            confirmAfterFunding();
           }}
            variant="secondary"
            isLoading={isLoading}
            className="w-full"
          >
            {isLoading ? 'Checking balance...' : "I've added funds — continue"}
          </Button>
          <button
            type="button"
            onClick={() => setStep('amount')}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
          <ShieldCheck className="w-3 h-3" />
          <span>Secure • No wallet needed</span>
        </div>
      </Card>
      </>
    );
  }

  // Main card
  return (
    <Card className="space-y-6" padding="lg">
      {step === 'amount' && (
        <>
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-bold text-gray-900">Send Payment</h3>
            <p className="text-sm text-gray-500">
              Pay @{username || 'mekjah'} instantly. Simple and secure.
            </p>
          </div>

          <AmountInput value={amount} onChange={setAmount} />

          <div className="pt-4">
            <Button
              type="button"
              onClick={handleButtonClick}
              isLoading={isLoading}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              {isLoggedIn ? `Pay $${amount}` : 'Continue to Pay'}
            </Button>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              Coming Soon
            </p>
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
            <p className="text-sm text-gray-500">
              Please wait while we secure your transaction...
            </p>
          </div>
        </div>
      )}

      {step === 'waiting_for_gas' && (
        <div className="text-center p-4 space-y-4">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7 text-amber-500" />
          </div>
          <p className="text-amber-600 font-medium">Almost ready</p>
          <p className="text-sm text-gray-500">
            Your wallet is being set up on Starknet. This takes about 30 seconds.
          </p>
          <button
            type="button"
            onClick={() => setStep('amount')}
            className="mt-2 px-6 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium"
          >
            Try again
          </button>
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
