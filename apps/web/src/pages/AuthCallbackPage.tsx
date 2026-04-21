import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { authenticated, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;

    if (authenticated) {
      const redirect = localStorage.getItem('paylink_redirect_after_login');
      localStorage.removeItem('paylink_redirect_after_login');

      const destination = redirect || '/';
      console.log('[auth/callback] Success! Redirecting to:', destination);
      navigate(destination, { replace: true });
    } else {
    
      console.warn('[auth/callback] User not authenticated, sending to login.');
      navigate('/', { replace: true });
    }
  }, [ready, authenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 font-medium">Signing you in...</p>
      </div>
    </div>
  );
}