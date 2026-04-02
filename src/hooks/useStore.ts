import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  setAuth: (isLoggedIn: boolean, user: any | null) => void;
}

export type PaymentStep = 'amount' | 'processing' | 'success' | 'insufficient_funds';

interface PaymentState {
  amount: string;
  step: PaymentStep;
  isLoading: boolean;
  balance: number | null;
  selectedMethod: 'card' | 'bank' | null;
  savedMethod: 'card' | 'bank' | null;
  preferredAsset: string;
  setAmount: (amount: string) => void;
  setStep: (step: PaymentStep) => void;
  setIsLoading: (isLoading: boolean) => void;
  setBalance: (balance: number | null) => void;
  setMethod: (method: 'card' | 'bank' | null) => void;
  saveMethod: (method: 'card' | 'bank') => void;
  setPreferredAsset: (asset: string) => void;
}

interface UIState {
  view: 'sender' | 'receiver';
  isAdvancedMode: boolean;
  activeModal: 'history' | 'identity' | 'withdraw' | 'withdraw_address' | 'settings' | 'auth' | null;
  pendingAction: 'pay' | null;
  setView: (view: 'sender' | 'receiver') => void;
  setAdvancedMode: (enabled: boolean) => void;
  setActiveModal: (modal: 'history' | 'identity' | 'withdraw' | 'withdraw_address' | 'settings' | 'auth' | null) => void;
  setPendingAction: (action: 'pay' | null) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize from localStorage if available
  const savedUser = typeof window !== 'undefined' ? localStorage.getItem('paylink_user') : null;
  const initialUser = savedUser ? JSON.parse(savedUser) : null;
  const initialIsLoggedIn = !!initialUser;

  return {
    isLoggedIn: initialIsLoggedIn,
    user: initialUser,
    setAuth: (isLoggedIn, user) => {
      if (isLoggedIn && user) {
        localStorage.setItem('paylink_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('paylink_user');
      }
      set({ isLoggedIn, user });
    },
  };
});

export const usePaymentStore = create<PaymentState>((set) => ({
  amount: '',
  step: 'amount',
  isLoading: false,
  balance: null,
  selectedMethod: null,
  savedMethod: null,
  preferredAsset: 'USDC',
  setAmount: (amount) => set({ amount }),
  setStep: (step) => set({ step }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setBalance: (balance) => set({ balance }),
  setMethod: (method) => set({ selectedMethod: method }),
  saveMethod: (method) => set({ savedMethod: method }),
  setPreferredAsset: (asset) => set({ preferredAsset: asset }),
}));

export const useUIStore = create<UIState>((set) => ({
  view: 'sender',
  isAdvancedMode: false,
  activeModal: null,
  pendingAction: null,
  setView: (view) => set({ view }),
  setAdvancedMode: (enabled) => set({ isAdvancedMode: enabled }),
  setActiveModal: (modal) => set({ activeModal: modal }),
  setPendingAction: (action) => set({ pendingAction: action }),
}));
