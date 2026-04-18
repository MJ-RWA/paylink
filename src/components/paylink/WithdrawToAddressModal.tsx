import { useState } from 'react';
import { withdrawToAddress } from '../../lib/withdraw';
import { useAuth } from '../../hooks/useAuth';
import { usePaymentStore } from '../../hooks/useStore';

interface WithdrawToAddressModalProps {
  onConfirm: () => void;
}

export default function WithdrawToAddressModal({ onConfirm }: WithdrawToAddressModalProps) {
  const { wallet } = useAuth();
  const { balance } = usePaymentStore();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWithdraw = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const hash = await withdrawToAddress(wallet, recipientAddress, amount);
      setTxHash(hash);
    } catch (err: any) {
      setError(err.message ?? 'Withdrawal failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Success state
  if (txHash) {
    return (
      <>

      <div className="text-center space-y-4 py-4">
        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
          <span className="text-teal-600 text-xl">✓</span>
        </div>
        <p className="font-medium text-gray-900">Withdrawal sent</p>
        
         <a href={`https://sepolia.voyager.online/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-teal-600 hover:underline block"
        >
          View on explorer ↗
        </a>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full py-2.5 bg-teal-500 text-white rounded-xl font-medium text-sm"
        >
          Done
        </button>
      </div>

      </>
    );
  }

  return (
    <div className="space-y-6">
  {/* Card Container */}
  <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-5">

    {/* Recipient */}
    <div className="space-y-2">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
        Recipient
      </label>
      <div className="relative">
        <input
          type="text"
          value={recipientAddress}
          onChange={e => setRecipientAddress(e.target.value.trim())}
          placeholder="0x..."
          className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-300 font-mono">
          Starknet
        </div>
      </div>
    </div>

    {/* Amount */}
    <div className="space-y-2">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
        Amount
      </label>

      <div className="relative">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="w-full bg-gray-50/70 border border-gray-200 rounded-xl px-4 py-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400/30 focus:border-teal-400 transition-all"
        />

        {/* Currency Badge */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-lg">
          USDC
        </div>
      </div>

      {balance !== null && (
        <div className="flex justify-between items-center px-1">
          <p className="text-xs text-gray-400">
            Available balance
          </p>
          <button
            type="button"
            onClick={() => setAmount(Number(balance).toFixed(2))}
            className="text-xs font-semibold text-teal-600 hover:text-teal-700"
          >
            ${Number(balance).toFixed(2)}
          </button>
        </div>
      )}
    </div>

    {/* Error */}
    {error && (
      <div className="bg-red-50/70 border border-red-100 rounded-xl px-4 py-3">
        <p className="text-sm text-red-500 font-medium">{error}</p>
      </div>
    )}

    {/* Action */}
    <button
      type="button"
      onClick={handleWithdraw}
      disabled={isLoading || !recipientAddress || !amount || parseFloat(amount) <= 0}
      className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold text-sm shadow-md shadow-teal-200/50 hover:shadow-lg hover:shadow-teal-300/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing transaction...' : `Withdraw ${amount || '0'} USDC`}
    </button>
  </div>

  {/* Secondary Action */}
  <button
    type="button"
    onClick={onConfirm}
    className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors"
  >
    Cancel
  </button>
</div>
  );
}