import { Link } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import Button from './Button';
import UserMenu from './UserMenu';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../hooks/useStore';

export default function Navbar() {
  const { authenticated, user, logout } = useAuth();
  const { user: localUser } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-200 group-hover:bg-teal-700 transition-colors">
            <Wallet className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-gray-900">PayLink</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-sm font-semibold text-gray-600 hover:text-teal-600 transition-colors">Features</Link>
          <Link to="/how-it-works" className="text-sm font-semibold text-gray-600 hover:text-teal-600 transition-colors">How it works</Link>
          <Link to="/support" className="text-sm font-semibold text-gray-600 hover:text-teal-600 transition-colors">Support</Link>
        </div>

        <div className="flex items-center space-x-4">
          {!authenticated ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="hidden sm:flex py-2 px-4 text-sm font-bold rounded-xl">
                  Log In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="py-2 px-4 text-sm font-bold rounded-xl shadow-md">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <UserMenu user={localUser || user} onLogout={logout} />
          )}
        </div>
      </div>
    </nav>
  );
}
