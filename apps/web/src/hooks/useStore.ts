import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { normalizeAddress } from '../lib/address';

interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  setAuth: (isLoggedIn: boolean, user: any | null) => void;
  updateUser: (updates: any) => void;

}

export interface Transaction {
  hash: string;
  amount: string;
  symbol: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  direction?: 'sent' | 'received';
  recipientAddress: string;
  senderAddress: string;
}

export type PaymentStep = 'amount' | 'processing' | 'success' | 'insufficient_funds' | 'waiting_for_gas' | 'funding' | 'error';

interface PaymentState {
  amount: string;
  step: PaymentStep;
  isLoading: boolean;
  balance: number | null;
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
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
  transactions: Transaction[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  addTransaction: (tx: Transaction) => void;
  setTransactions: (txs: Transaction[]) => void; // Added for backend sync
  updateTransactionStatus: (hash: string, status: 'success' | 'failed') => void;
  clearTransactions: () => void;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setAuth: (isLoggedIn, user) => set({ isLoggedIn, user }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : updates,
          isLoggedIn: true,
        })),
    }),
    {
      name: 'paylink_user_storage',
    }
  )
);

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set) => ({
      amount: '',
      step: 'amount',
      isLoading: false,
      balance: null,
      walletAddress: null,
      selectedMethod: null,
      savedMethod: null,
      preferredAsset: 'USDC',
      transactions: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setAmount: (amount) => set({ amount }),
      setStep: (step) => set({ step }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setBalance: (balance) => set({ balance }),
      setMethod: (method) => set({ selectedMethod: method }),
      saveMethod: (method) => set({ savedMethod: method }),
      setPreferredAsset: (asset) => set({ preferredAsset: asset }),
      setWalletAddress: (address) =>
      set({ walletAddress: address ? normalizeAddress(address) : null }),
      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (tx) =>
        set((state) => {
          if (!tx.senderAddress || !tx.recipientAddress) return state;

          const sender = normalizeAddress(tx.senderAddress);
          const recipient = normalizeAddress(tx.recipientAddress);

          if (sender === recipient) return state;

          const newTx: Transaction = {
            ...tx,
            senderAddress: sender,
            recipientAddress: recipient,
            direction: tx.direction || 'sent',
          };

          const filtered = state.transactions.filter(t => t.hash !== tx.hash);
          return { transactions: [newTx, ...filtered] };
        }),

      updateTransactionStatus: (hash, status) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.hash === hash ? { ...tx, status } : tx
          ),
        })),

      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'paylink-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        transactions: state.transactions,
        preferredAsset: state.preferredAsset,
        savedMethod: state.savedMethod,
      }),

     onRehydrateStorage: () => (state) => {
     state?.setHydrated(true);
     },
    }
  )
);

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      view: 'sender',
      isAdvancedMode: false,
      activeModal: null,
      pendingAction: null,
      setView: (view) => set({ view }),
      setAdvancedMode: (enabled) => set({ isAdvancedMode: enabled }),
      setActiveModal: (modal) => set({ activeModal: modal }),
      setPendingAction: (action) => set({ pendingAction: action }),
    }),
    {
      name: 'paylink_ui_storage',
      partialize: (state) => ({ pendingAction: state.pendingAction }),
    }
  )
);