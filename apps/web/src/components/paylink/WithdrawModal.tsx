import { Banknote, Info } from 'lucide-react';
import Button from '../ui/Button';
import { useWithdrawal } from '../../hooks/useWithdrawal';

export default function WithdrawModal({ onConfirm }: { onConfirm: () => void }) {
  const { isLoading, withdraw } = useWithdrawal();

  const handleWithdraw = async () => {
    // In demo mode, we still allow the action but label it clearly
    const success = await withdraw(0, 'Chase Bank', 'bank');
    if (success) onConfirm();
  };

  return (
    <div className="space-y-6">
      <div className="relative p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center space-x-4 opacity-75">
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
          Coming Soon
        </div>
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 shadow-sm">
          <Banknote className="w-6 h-6" />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900">Link Bank Account</div>
          <div className="text-xs text-gray-500">Withdraw directly to your local bank</div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-xl flex items-start space-x-3 text-blue-700">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="text-xs leading-relaxed">
          Bank withdrawals are currently in development. Use <strong>"Send to another address"</strong> in the dashboard for immediate access to your funds.
        </p>
      </div>
      
      <div className="space-y-2 opacity-50 pointer-events-none">
        <label className="text-xs font-bold text-gray-500 uppercase px-1">Amount to withdraw</label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 font-bold text-2xl">$</div>
          <input 
            type="number" 
            placeholder="0.00" 
            disabled
            className="w-full p-4 pl-10 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-teal-500 font-bold text-xl"
          />
        </div>
      </div>

      <Button onClick={handleWithdraw} isLoading={isLoading} disabled>
        Withdraw to Bank
      </Button>
    </div>
  );
}
