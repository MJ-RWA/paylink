import DashboardCard from '../components/paylink/DashboardCard';
import TransactionList from '../components/paylink/TransactionList';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Section from '../components/ui/Section';
import { Eye, EyeOff, Settings, LogOut, ChevronUp, ChevronDown, Wallet } from 'lucide-react';
import { useUIStore, useAuthStore, usePaymentStore } from '../hooks/useStore';
import { useAuth } from '../hooks/useAuth';
import CreateUsername from '../components/paylink/CreateUsername';
import { useUnifiedTransactions } from '../hooks/useUnifiedTransactions';
import { useEffect, useState } from 'react';
import Modal from '../components/ui/Modal';
import SettingsModal from '../components/paylink/SettingsModal';
import WithdrawModal from '../components/paylink/WithdrawModal';
import Card from '../components/ui/Card';
import WithdrawToAddressModal from '../components/paylink/WithdrawToAddressModal';
import { normalizeAddress } from '../lib/address';
import { resolveUsername } from '../lib/registry';

export default function DashboardPage() {
  const { isAdvancedMode, setAdvancedMode, setActiveModal, activeModal } = useUIStore();
  const { logout, authenticated, login, isLoading: isAuthLoading, starknetAddress } = useAuth();
  const { user: localUser } = useAuthStore();
  const [isAdvancedWithdrawOpen, setIsAdvancedWithdrawOpen] = useState(false);
  const { walletAddress: storeWalletAddress, hydrated, setWalletAddress } = usePaymentStore();
  const walletAddress = storeWalletAddress || (starknetAddress ? normalizeAddress(starknetAddress) : null);
  const txHook = useUnifiedTransactions(walletAddress);
  const transactions = txHook.transactions;
  const refetch = txHook.refetch;
  const [walletMismatch, setWalletMismatch] = useState(false);
  const [hasCheckedMismatch, setHasCheckedMismatch] = useState(false);



 const handleRebind = async () => {
  try {
    if (!walletAddress || !localUser?.username) return;

    const res = await fetch('http://localhost:3001/rebind', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: localUser.username,
        newAddress: walletAddress,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert(' Username successfully rebound!');
      setWalletMismatch(false);
      setHasCheckedMismatch(true);  

      await refetch(); 
    } else {
      alert('❌ Failed to rebind');
    }
  } catch (err) {
    console.error(err);
    alert('❌ Error rebinding username');
  }
 };

 useEffect(() => {
    if (starknetAddress) {
      const normalized = normalizeAddress(starknetAddress);
      if (walletAddress !== normalized) {
        setWalletAddress(normalized);
        console.log('[Dashboard] Synced store with Auth:', normalized);
      }
    }
  }, [starknetAddress, walletAddress, setWalletAddress]);


 useEffect(() => {
  if (!hydrated || !walletAddress || !localUser?.username) return;
  if (hasCheckedMismatch) return;

  const check = async () => {
  const resolved = await resolveUsername(localUser.username);

  const safeResolved = resolved ? normalizeAddress(resolved) : null;
  const safeWallet = walletAddress ? normalizeAddress(walletAddress) : null;

  const isMismatch =
    safeResolved !== null &&
    safeResolved !== safeWallet;

  setWalletMismatch(isMismatch);
  setHasCheckedMismatch(true);
  };
  check();
}, [hydrated, walletAddress, localUser?.username, hasCheckedMismatch]);

  useEffect(() => {
    if (!authenticated && !isAuthLoading) {
      login();
    }
  }, [authenticated, isAuthLoading, login]);

  if (isAuthLoading && !authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F9FB]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-bold">Connecting...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F9FB]">
        <p className="text-gray-500 font-medium">Please sign in to continue.</p>
      </div>
    );
  }

  if (!localUser?.username) {
    return <CreateUsername />;
  }


  
  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-900">
      <Navbar />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
      </div>

      <Section className="relative max-w-md mx-auto px-6 pt-12 pb-24">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tighter text-gray-900">Dashboard</h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Welcome back, {localUser?.username || 'Creator'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setActiveModal('settings')} 
              className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-teal-600 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setAdvancedMode(!isAdvancedMode)} 
              className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-teal-600 transition-colors"
              title={isAdvancedMode ? "Disable Advanced Mode" : "Enable Advanced Mode"}
            >
              {isAdvancedMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
            <button 
              onClick={logout} 
              className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <DashboardCard 
            isAdvancedMode={isAdvancedMode} 
          />

          <Card padding="none">
            <button
              onClick={() => setIsAdvancedWithdrawOpen(!isAdvancedWithdrawOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-bold text-gray-700">Advanced Options</span>
              {isAdvancedWithdrawOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {isAdvancedWithdrawOpen && (
              <div className="p-4 pt-0 space-y-3 border-t border-gray-50">
                <button 
                  onClick={() => setActiveModal('withdraw_address')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <Wallet className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-bold">Send to another address</div>
                    <div className="text-xs text-gray-400">Transfer funds to an external account</div>
                  </div>
                </button>
              </div>
            )}
          </Card>

          <TransactionList 
            transactions={transactions} 
            isAdvancedMode={isAdvancedMode} 
            currentWalletAddress={walletAddress}
          />
          
          <Modal title="Receiver Settings" isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)}>
            <SettingsModal onConfirm={() => setActiveModal(null)} />
          </Modal>

          <Modal title="Withdraw to Bank" isOpen={activeModal === 'withdraw'} onClose={() => setActiveModal(null)}>
            <WithdrawModal onConfirm={() => setActiveModal(null)} />
          </Modal>

          <Modal title="Send to Address" isOpen={activeModal === 'withdraw_address'} onClose={() => setActiveModal(null)}>
            <WithdrawToAddressModal onConfirm={() => setActiveModal(null)} />
          </Modal>
        </div>

          <Modal
           title="Wallet Mismatch Detected"
           isOpen={walletMismatch}
           onClose={() => {}}
          >
         <div className="space-y-4">
         <p className="text-sm text-gray-600">
          Your username is linked to another wallet.
        </p>

        <p className="text-xs text-gray-400 break-all">
        Current wallet: {walletAddress}
         </p>

        <button
       onClick={handleRebind}
       className="w-full bg-teal-600 text-white py-2 rounded-xl font-bold">
       Fix & Rebind Username
       </button>
       </div>
       </Modal>
      </Section>
      <Footer />
    </div>
  );
}