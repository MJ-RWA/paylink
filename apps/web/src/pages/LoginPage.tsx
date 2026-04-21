import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
  const { login, authenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname || '/';
  const fromSearch = location.state?.from?.search || '';
  const from = fromPath + fromSearch;

  useEffect(() => {
    if (authenticated) {
      navigate(from, { replace: true });
    }
  }, [authenticated, navigate, from]);

  const handleLogin = async () => {
    const currentPath = from; // 'from' is already determined from location.state and includes search
    localStorage.setItem('paylink_redirect_after_login', currentPath);
    
    await login({
      loginMethods: ['google'],
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <Section className="flex items-center justify-center pt-32 pb-48">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-black tracking-tighter text-gray-900">Welcome to PayLink</h1>
            <p className="text-gray-500 font-medium">Sign in with Google to manage your links and payments.</p>
          </div>
          <Button onClick={handleLogin} className="py-5 text-xl shadow-teal-200">
            <Chrome className="w-6 h-6" />
            <span>Continue with Google</span>
          </Button>
        </div>
      </Section>
      <Footer />
    </div>
  );
}