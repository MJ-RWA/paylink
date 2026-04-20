import Modal from './Modal';
import Button from './Button';
import { useAuth } from '../../hooks/useAuth';
import { ShieldCheck, Chrome } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess,
  title = "Continue to pay",
  subtitle = "Sign in to complete your payment securely"
}: AuthModalProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentPath = window.location.pathname + window.location.search;
      localStorage.setItem('redirect_after_login', currentPath);

      const result = await login({
        loginMethods: ['google'],
        redirectUrl: `${window.location.origin}/auth/callback`,
      });

      if (result?.address) {
        onSuccess?.();
        onClose();
      } else if (!result) {
        // Privy login initiated, will redirect
        return;
      } else {
        setError("Could not create your secure wallet. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="py-4">
          <Button 
            onClick={handleGoogleLogin} 
            isLoading={isLoading}
            className="flex items-center justify-center space-x-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Chrome className="w-5 h-5 text-blue-500" />
            <span className="font-bold">Continue with Google</span>
          </Button>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium">{error}</p>
        )}

        <div className="pt-4 border-t border-gray-50 space-y-3">
          <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            <span>Secure • No wallet needed • Fast</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            PayLink uses Starknet to secure your transactions silently.
          </p>
        </div>
      </div>
    </Modal>
  );
}
