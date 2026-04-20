import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuthStore, usePaymentStore } from '../../hooks/useStore';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { shortString, CallData } from 'starknet';

const CONTRACT_ADDRESS =
  '0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822';

export default function CreateUsername() {
  const navigate = useNavigate();
  const { updateUser } = useAuthStore();
  const { wallet, authenticated, login } = useAuth();
  

  const { walletAddress } = usePaymentStore();

  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<
  'idle' | 'checking' | 'available' | 'taken' | 'invalid'
>('idle'); 
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  

  const validateUsername = (val: string) => {
    if (val.length === 0) return { valid: false, msg: null };
    if (val.length < 3) return { valid: false, msg: 'Too short (min 3 chars)' };
    if (val.length > 20) return { valid: false, msg: 'Too long (max 20 chars)' };
    if (!/^[a-z0-9_]+$/.test(val))
      return { valid: false, msg: 'Lowercase, numbers, and underscores only' };
    return { valid: true, msg: null };
  };

  useEffect(() => {
    const { valid, msg } = validateUsername(username);
    if (!valid) {
      setStatus(username.length > 0 ? 'invalid' : 'idle');
      setError(msg);
      return;
    }
    setError(null);
    setStatus('checking');
    const timer = setTimeout(() => {
      const takenNames = ['admin', 'paylink', 'starknet', 'crypto'];
      if (takenNames.includes(username.toLowerCase())) {
        setStatus('taken');
        setError('This username is already taken');
      } else {
        setStatus('available');
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [username]);

useEffect(() => {
  if (showSuccess) {
    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [showSuccess, navigate]);

  const handleCreate = async (): Promise<void> => {
    if (status !== 'available') return;

    setIsSubmitting(true);
    setError(null);

    try {

  let activeWallet = wallet;
  let activeAddress = walletAddress;

  if (!authenticated || !activeWallet) {
    const result = await login();
    
    
    if (!result || !result.walletInstance) {
      setError('Please log in to continue');
      return;
    }

  
    activeWallet = result.walletInstance;
    activeAddress = result.address; 
  }

  if (!activeAddress || !activeWallet) {
    setError('Wallet address not synchronized. Please try clicking the button again.');
    return;
  }

  console.log('[register] Using address:', activeAddress);

    
      await activeWallet.ensureReady({ deploy: 'if_needed' });

      
      const nameFelt = shortString.encodeShortString(username);
      console.log('[register] name as felt252:', nameFelt);

    
      const tx = await activeWallet.execute([
        {
          contractAddress: CONTRACT_ADDRESS,
          entrypoint: 'register_name',
          calldata: CallData.compile({
            name: nameFelt,
            address: activeAddress,
          }),
        },
      ]);

      console.log('[register] tx hash:', tx.transaction_hash);
      await tx.wait();
      console.log('[register] confirmed on-chain');

  
      updateUser({ 
      username, 
      address: activeAddress 
      });
      setShowSuccess(true);

    } catch (err: any) {
      console.error('[register] Error:', err);

      if (err?.message?.includes('Name already registered')) {
        setStatus('taken');
        setError('This username is already taken on Starknet');
      } else if (
        err?.message?.includes('balance') ||
        err?.message?.includes('Resources bounds')
      ) {
        setError('Not enough STRK for gas. Wait 30 seconds and try again.');
      } else if (err?.message === 'Login cancelled') {
        setError('Login was cancelled. Please try again.');
      } else {
        setError(err?.message ?? 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F8F9FB] p-6">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50" />
      </div>

      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <Card className="shadow-2xl border-teal-100" padding="lg">
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-2xl text-teal-600 mb-2">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h1 className="text-3xl font-black tracking-tighter text-gray-900">
                    Create your PayLink
                  </h1>
                  <p className="text-gray-500 font-medium">
                    Claim your unique username to start getting paid.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold select-none">
                      paylink001.vercel.app/
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(
                          e.target.value.toLowerCase().replace(/\s/g, '')
                        )
                      }
                      placeholder="username"
                      className={`w-full bg-gray-50 border-2 rounded-2xl py-4 pl-[105px] pr-12 text-lg font-bold text-gray-900 focus:outline-none transition-all ${
                        status === 'available'
                          ? 'border-teal-500 bg-teal-50/30'
                          : status === 'taken' || status === 'invalid'
                          ? 'border-red-200 bg-red-50/30'
                          : 'border-gray-100 focus:border-teal-500'
                      }`}
                      autoFocus
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {status === 'checking' && (
                        <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
                      )}
                      {status === 'available' && (
                        <Check className="w-5 h-5 text-teal-500" />
                      )}
                      {(status === 'taken' || status === 'invalid') && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="min-h-[20px]">
                    {status === 'checking' && (
                      <p className="text-xs text-teal-600 font-bold animate-pulse">
                        Checking availability...
                      </p>
                    )}
                    {error && (
                      <p className="text-xs text-red-500 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                      </p>
                    )}
                    {status === 'available' && !error && (
                      <p className="text-xs text-teal-600 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Username is available!
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      Preview
                    </p>
                    <p className="text-sm font-bold text-gray-700 break-all">
                      paylink001.vercel.app/
                      <span className="text-teal-600">
                        {username || 'yourname'}
                      </span>
                    </p>
                  </div>

                  <Button
                    onClick={handleCreate}
                    disabled={status !== 'available' || isSubmitting}
                    isLoading={isSubmitting}
                    className="w-full py-4 text-lg shadow-teal-200"
                  >
                    <span>
                      {!authenticated
                        ? 'Connect & Create PayLink'
                        : 'Create PayLink'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>

                  {isSubmitting && (
                    <p className="text-xs text-center text-gray-400">
                      Registering on Starknet — this takes ~15 seconds...
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-teal-200">
              <Check className="w-12 h-12 text-white stroke-[3px]" />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tighter text-gray-900">
                You're all set!
              </h2>
              <p className="text-xl text-gray-500 font-medium">
                paylink.app/{username} is now yours on Starknet
              </p>
              <p className="text-sm text-gray-400">
                Redirecting to your dashboard...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}