import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { History, ShieldCheck, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { addressesMatch } from '../lib/address';
// Hooks
import { useUIStore, usePaymentStore } from '../hooks/useStore';
import { useAuth } from '../hooks/useAuth';
import { usePaymentFlow } from '../hooks/usePaymentFlow';
import { useUnifiedTransactions } from '../hooks/useUnifiedTransactions';

// UI Components
import ProfileHeader from '../components/paylink/ProfileHeader';
import PaymentCard from '../components/paylink/PaymentCard';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Section from '../components/ui/Section';
import Modal from '../components/ui/Modal';
import AuthModal from '../components/ui/AuthModal';
import Button from '../components/ui/Button';

export default function PaymentPage() {
  const { username } = useParams<{ username: string }>();
  const { pendingAction, setPendingAction, activeModal, setActiveModal } = useUIStore();
  const { authenticated } = useAuth();
  const { walletAddress } = usePaymentStore();
  const { transactions: unifiedTransactions, refetch } = useUnifiedTransactions(walletAddress);
  
  // Dynamic resolution with error handling
  const { 
    startPayment, 
    step, 
    resolutionError, 
    retryResolution, 
    isLoading: isFlowLoading 
  } = usePaymentFlow(username);

  const handlePayClick = async () => {
    if (!authenticated) {
      setPendingAction('pay'); 
      setActiveModal('auth');
    } else {
      await startPayment(refetch);
    }
  };


  useEffect(() => {
    if (authenticated && pendingAction === 'pay') {
      setPendingAction(null);
      setActiveModal(null); 
      startPayment(refetch);
    }
  }, [authenticated, pendingAction, startPayment, setPendingAction, setActiveModal, refetch]);

 const myPayments = useMemo(() => {
  if (!walletAddress) return [];
  return unifiedTransactions.filter(tx => 
    tx.direction === 'sent' || 
    addressesMatch(tx.ownerAddress, walletAddress) ||
    addressesMatch(tx.senderAddress, walletAddress) 
  );
}, [unifiedTransactions, walletAddress]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans text-gray-900">
      <Navbar />
      
      <Section className="relative max-w-md mx-auto px-6 pt-12 pb-24">
        <ProfileHeader username={username || 'mekjah'} />
        
        {step === 'error' && resolutionError ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center space-y-6">
             <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-500">
                {resolutionError.includes('not been set up') ? (
                  <AlertCircle className="w-8 h-8" />
                ) : (
                  <RotateCcw className="w-8 h-8" />
                )}
             </div>
             <div className="space-y-2">
               <h2 className="text-xl font-bold text-gray-900">
                 {resolutionError.includes('not been set up') ? 'Not Found' : 'Connection Error'}
               </h2>
               <p className="text-gray-500 text-sm">
                  {resolutionError}
               </p>
             </div>
             <Button 
               onClick={() => retryResolution()} 
               isLoading={isFlowLoading}
               className="w-full flex items-center justify-center gap-2"
             >
               <RotateCcw className="w-4 h-4" />
               Try Again
             </Button>
          </div>
        ) : (
          <PaymentCard onPay={handlePayClick} />
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 space-y-3">
          <button 
            onClick={() => setActiveModal('history')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600">
                <History className="w-5 h-5" />
              </div>
              <span className="font-semibold">My Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              {myPayments.length > 0 && (
                <span className="bg-teal-100 text-teal-700 text-[10px] px-2 py-1 rounded-full font-bold">
                  {myPayments.length}
                </span>
              )}
              <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </button>

          <button 
            onClick={() => setActiveModal('identity')}
            className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-semibold">Verified Identity</span>
            </div>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* History Modal */}
        <Modal 
          title="My Payments" 
          isOpen={activeModal === 'history'} 
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {myPayments.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">No payments found.</div>
            ) : (
              myPayments.map(pay => (
                <div key={pay.hash} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="min-w-0 flex-1 mr-3">
                    <div className="font-bold text-sm truncate">
                      {pay.hash.slice(0, 10)}...{pay.hash.slice(-4)}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {new Date(pay.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-gray-900">
                      {pay.amount} {pay.symbol}
                    </div>
                    <div className={`text-[9px] font-black uppercase ${
                      pay.status === 'success' ? 'text-green-600' : 'text-amber-500'
                    }`}>
                      {pay.status}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Modal>

        {/* Identity Modal */}
        <Modal 
          title="Verified Identity" 
          isOpen={activeModal === 'identity'} 
          onClose={() => setActiveModal(null)}
        >
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="space-y-2 px-2">
              <p className="text-gray-500 text-xs">
                This user has verified their identity via Starknet ID and social authentication.
              </p>
              <div className="bg-gray-50 p-4 rounded-2xl text-left space-y-3 mt-4">
                <div className="flex items-center justify-between text-xs">
                   <div className="flex items-center space-x-2">
                     <Check className="w-4 h-4 text-green-500" />
                     <span className="text-gray-700 font-bold">Email Verified</span>
                   </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 font-bold">Starknet ID</span>
                  </div>
                  <span className="text-teal-600 font-bold">{username}.stark</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={activeModal === 'auth'} 
          onClose={() => {
            setActiveModal(null);
            setPendingAction(null);
          }}
          title="Continue to pay"
          subtitle="Sign in to complete your payment securely"
        />
        
      </Section>
      <Footer />
    </div>
  );
}
