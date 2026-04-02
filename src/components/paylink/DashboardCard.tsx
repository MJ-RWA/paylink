import { useUIStore, usePaymentStore } from '../../hooks/useStore';
import { Share2, Banknote } from 'lucide-react';
import Card from '../ui/Card';

export default function DashboardCard({ balance, isAdvancedMode }: { balance: number, isAdvancedMode: boolean }) {
  const { setActiveModal } = useUIStore();
  const { preferredAsset } = usePaymentStore();

  return (
    <Card className="text-center space-y-2" padding="lg">
      <p className="text-sm text-gray-500 font-medium">Available Balance</p>
      <h2 className="text-4xl font-bold text-gray-900">${balance.toLocaleString()}</h2>
      {isAdvancedMode && (
        <div className="pt-2 text-xs text-teal-600 font-mono">
          {balance.toLocaleString()} {preferredAsset} • 0x049d...4dc7
        </div>
      )}
      <div className="pt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveModal('withdraw')}
          className="flex flex-col items-center justify-center p-4 bg-teal-50 rounded-2xl border border-teal-100 hover:bg-teal-100 transition-colors group"
        >
          <Banknote className="w-6 h-6 text-teal-600 mb-2" />
          <span className="text-xs font-bold text-teal-600">Withdraw to Bank</span>
        </button>
        <button
          className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group"
        >
          <Share2 className="w-6 h-6 text-gray-600 mb-2" />
          <span className="text-xs font-bold text-gray-600">Share Link</span>
        </button>
      </div>
    </Card>
  );
}
