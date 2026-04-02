import { useAuthStore } from './useStore';
import { starkzap } from '../services/starkzapService';

export function useAuth() {
  const { isLoggedIn, user, setAuth } = useAuthStore();

  const login = async () => {
    try {
      const result = await starkzap.login();
      if (result.success) {
        setAuth(true, result.user);
        return result.user;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    return null;
  };

  const logout = () => {
    setAuth(false, null);
  };

  const getCurrentUser = () => user;

  return {
    isLoggedIn,
    user,
    login,
    logout,
    getCurrentUser,
  };
}
