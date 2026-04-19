import { useEffect, useCallback, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUIStore, usePaymentStore, useAuthStore } from '../../hooks/useStore';
import { Share2, Banknote } from 'lucide-react';
import { sepoliaTokens } from 'starkzap';
import Card from '../ui/Card';
import Toast from '../ui/Toast';

interface DashboardCardProps {
  isAdvancedMode: boolean;
}

export default function DashboardCard({ isAdvancedMode }: DashboardCardProps) {
  const { wallet, authenticated } = useAuth();
  const { setActiveModal } = useUIStore();
  const [ showToast, setShowToast] = useState(false);
  const [ liveBalance, setLiveBalance] = useState<number>(0);
  const { walletAddress } = usePaymentStore();

 const refreshBalance = useCallback(async () => {
    if (!wallet || !authenticated) return;

    try {

      const raw = await wallet.balanceOf(sepoliaTokens.USDC);
      const numeric = parseFloat(
        String(raw.toFormatted()).replace(/[^0-9.]/g, '')
      );
        setLiveBalance(isNaN(numeric) ? 0 : numeric);

      } catch (err) {

      console.error('[DashboardCard] Balance fetch failed:', err);

      }
      }, [wallet, authenticated]);

  useEffect(() => {
    if (!authenticated || !wallet) return;
    refreshBalance();
    const interval = setInterval(refreshBalance, 30000);
    return () => clearInterval(interval);
  }, [refreshBalance, authenticated, wallet]);



  if (!authenticated) {
    return (
      <Card className="text-center p-8">
        <p className="text-sm text-gray-500">Connect your wallet to view balance</p>
      </Card>
    );
  }

  const { user: localUser } = useAuthStore();

  const handleShare = () => {
    const link = `paylink001.vercel.app/${localUser?.username}`;
    navigator.clipboard.writeText(link);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <Card className="text-center space-y-2" padding="lg">
        <p className="text-sm text-gray-500 font-medium">Available Balance (USDC)</p>
        
        {/* 3. Display persistent balance with nice formatting */}
        <h2 className="text-4xl font-bold text-gray-900">
          ${liveBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
         </h2>
        
        {isAdvancedMode && walletAddress && (
          <div className="pt-2 text-[10px] text-teal-600 font-mono break-all bg-teal-50/50 p-2 rounded-md">
            {walletAddress}
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
          
          <button onClick={handleShare}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group"
          >
            <Share2 className="w-6 h-6 text-gray-600 mb-2" />
            <span className="text-xs font-bold text-gray-600">Share Link</span>
          </button>
        </div>
      </Card>
      <Toast 
        isVisible={showToast} 
        message={`Copied: paylink.app/${localUser?.username}`} 
      />
    </>
  );
}
