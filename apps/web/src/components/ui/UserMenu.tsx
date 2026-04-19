import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Settings, LogOut, ChevronDown, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../hooks/useStore';

interface UserMenuProps {
  user: {
    name?: string;
    email?: string;
    profilePicture?: string;
    username?: string;
  };
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user: localUser } = useAuthStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

 const initials = localUser?.username 
    ? localUser.username.slice(0, 2).toUpperCase() 
    : 'U';

    const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-2xl hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-teal-50 flex items-center justify-center border-2 border-white shadow-sm">
          {user.profilePicture ? (
            <img 
              src={user.profilePicture} 
              alt= {localUser?.username}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-teal-700 font-bold text-sm tracking-tight">{initials}</span>
          )}
        </div>
        <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100]"
          >
            {/* User Info Section */}
            <div className="p-4 bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-teal-700 font-bold text-lg leading-none">{initials}</span>
                  )}
                </div>
                <div className="min-w-0">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {getGreeting()},
                    </span>
                  {user.username && (
                    <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-0.5">
                      @{localUser?.username}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 truncate font-medium">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Menu Actions */}
            <div className="p-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-teal-600 hover:bg-teal-50/50 transition-all group"
              >
                <LayoutDashboard className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
                <span>Dashboard</span>
              </Link>
              <button
                disabled
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed opacity-50"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="p-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all group"
              >
                <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
