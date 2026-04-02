import { useState } from 'react';
import ProfileHeader from '../components/paylink/ProfileHeader';
import PaymentCard from '../components/paylink/PaymentCard';
import DashboardCard from '../components/paylink/DashboardCard';
import TransactionList from '../components/paylink/TransactionList';
import WithdrawModal from '../components/paylink/WithdrawModal';
import WithdrawToAddressModal from '../components/paylink/WithdrawToAddressModal';
import SettingsModal from '../components/paylink/SettingsModal';
import AuthModal from '../components/ui/AuthModal';
import Modal from '../components/ui/Modal';
import Card from '../components/ui/Card';
import { ShieldCheck, History, Share2, Wallet, ChevronDown, ChevronUp, Eye, EyeOff, Check, ArrowRight, Settings, LogOut } from 'lucide-react';
import { useUIStore } from '../hooks/useStore';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { usePaymentFlow } from '../hooks/usePaymentFlow';

export default function PayLinkPage() {
  const { view, setView, isAdvancedMode, setAdvancedMode, activeModal, setActiveModal, pendingAction, setPendingAction } = useUIStore();
  const { isLoggedIn, user, logout } = useAuth();
  const { handleInitialPay } = usePaymentFlow();
  const [isAdvancedWithdrawOpen, setIsAdvancedWithdrawOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Handle pending actions after login
  useEffect(() => {
    if (isLoggedIn && pendingAction === 'pay') {
      setPendingAction(null);
      handleInitialPay();
    }
  }, [isLoggedIn, pendingAction, handleInitialPay, setPendingAction]);

  // Protect receiver view
  useEffect(() => {
    if (view === 'receiver' && !isLoggedIn) {
      setActiveModal('auth');
    }
  }, [view, isLoggedIn, setActiveModal]);

  const transactions = [
    { id: 1, sender: 'Alice Johnson', amount: 50.00, date: '2026-04-01 14:30' },
    { id: 2, sender: 'Bob Smith', amount: 25.50, date: '2026-03-31 09:15' },
    { id: 3, sender: 'Charlie Davis', amount: 120.00, date: '2026-03-30 18:45' },
  ];

  const myPayments = [
    { id: 1, recipient: '@mekjah', amount: 15.00, date: '2026-04-02 10:00', status: 'Completed' },
    { id: 2, recipient: '@stark_dev', amount: 42.00, date: '2026-03-28 15:20', status: 'Completed' },
  ];

  const handleShare = async () => {
    const shareData = {
      title: 'PayLink - @mekjah',
      text: 'Send me a payment instantly via PayLink!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log('Error copying:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-900">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Top Navigation / Toggle */}
      <div className="relative max-w-md mx-auto px-6 pt-6 flex justify-between items-center">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex">
          <button
            onClick={() => setView('sender')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'sender' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pay
          </button>
          <button
            onClick={() => setView('receiver')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'receiver' ? 'bg-teal-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Dashboard
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          {isLoggedIn && (
            <div className="flex items-center space-x-2 mr-2">
              <div className="hidden sm:block text-right">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Signed in as</div>
                <div className="text-xs font-bold text-gray-900">{user?.name}</div>
              </div>
              <button 
                onClick={logout}
                className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
          {view === 'receiver' && (
            <button 
              onClick={() => setActiveModal('settings')}
              className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-teal-600 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setAdvancedMode(!isAdvancedMode)}
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 hover:text-teal-600 transition-colors"
            title={isAdvancedMode ? "Disable Advanced Mode" : "Enable Advanced Mode"}
          >
            {isAdvancedMode ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <main className="relative max-w-md mx-auto px-6 pb-12">
        {view === 'sender' ? (
          <>
            <ProfileHeader username="mekjah" />
            <PaymentCard />
            
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => setActiveModal('history')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                    <History className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">My Payments</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button 
                onClick={() => setActiveModal('identity')}
                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">Verified Identity</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button 
                onClick={handleShare}
                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <span className="font-semibold">{copied ? 'Link Copied!' : 'Share PayLink'}</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </>
        ) : (
          <div className="pt-8 space-y-6">
            <DashboardCard balance={1240.50} isAdvancedMode={isAdvancedMode} />

            {/* Advanced Withdrawal Section */}
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

            <TransactionList transactions={transactions} isAdvancedMode={isAdvancedMode} />
          </div>
        )}

        {/* Modals */}
        <Modal title="My Payments" isOpen={activeModal === 'history'} onClose={() => setActiveModal(null)}>
          <div className="space-y-4">
            {myPayments.map(pay => (
              <div key={pay.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <div className="font-bold text-sm">{pay.recipient}</div>
                  <div className="text-xs text-gray-400">{pay.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">-${pay.amount.toFixed(2)}</div>
                  <div className="text-[10px] text-green-600 font-bold">{pay.status}</div>
                </div>
              </div>
            ))}
          </div>
        </Modal>

        <Modal title="Verified Identity" isOpen={activeModal === 'identity'} onClose={() => setActiveModal(null)}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                This user has verified their identity via Starknet ID and social authentication.
              </p>
              <div className="bg-gray-50 p-3 rounded-xl text-left space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 font-medium">Email Verified</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 font-medium">Starknet ID: mekjah.stark</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal title="Withdraw to Bank" isOpen={activeModal === 'withdraw'} onClose={() => setActiveModal(null)}>
          <WithdrawModal onConfirm={() => setActiveModal(null)} />
        </Modal>

        <Modal title="Send to Address" isOpen={activeModal === 'withdraw_address'} onClose={() => setActiveModal(null)}>
          <WithdrawToAddressModal onConfirm={() => setActiveModal(null)} />
        </Modal>

        <Modal title="Receiver Settings" isOpen={activeModal === 'settings'} onClose={() => setActiveModal(null)}>
          <SettingsModal onConfirm={() => setActiveModal(null)} />
        </Modal>

        <AuthModal 
          isOpen={activeModal === 'auth'} 
          onClose={() => {
            setActiveModal(null);
            setPendingAction(null);
          }}
          title={view === 'receiver' ? "Sign in to Dashboard" : "Continue to pay"}
          subtitle={view === 'receiver' ? "Sign in to access your dashboard securely" : "Sign in to complete your payment securely"}
        />

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2026 PayLink. Secure Payment Portal.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-600">Terms</a>
            <a href="#" className="hover:text-gray-600">Privacy</a>
            <a href="#" className="hover:text-gray-600">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
