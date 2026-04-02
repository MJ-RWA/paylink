import { useState } from 'react';
import { Wallet, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { useWithdrawal } from '../../hooks/useWithdrawal';

export default function WithdrawToAddressModal({ onConfirm }: { onConfirm: () => void }) {
  const { isLoading, withdraw } = useWithdrawal();
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    if (!address || !amount) return;
    const success = await withdraw(parseFloat(amount), address, 'wallet');
    if (success) onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase px-1">Recipient Address</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Wallet className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..." 
              className="w-full p-4 pl-12 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-mono text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase px-1">Amount to send</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 font-bold text-2xl">$</div>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00" 
              className="w-full p-4 pl-10 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-bold text-xl"
            />
          </div>
          <div className="flex justify-between px-1">
            <span className="text-[10px] text-gray-400">Available: $1,240.50</span>
            <button 
              onClick={() => setAmount('1240.50')}
              className="text-[10px] text-teal-600 font-bold hover:underline"
            >
              Send Max
            </button>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleWithdraw} 
        isLoading={isLoading}
        disabled={!address || !amount || parseFloat(amount) <= 0}
        className="flex items-center justify-center space-x-2"
      >
        <span>Send Funds</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
      
      <p className="text-[10px] text-center text-gray-400">
        Funds will be sent instantly via the PayLink system. No extra fees.
      </p>
    </div>
  );
}
