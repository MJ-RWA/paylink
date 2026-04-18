import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import * as zustand_middleware from 'zustand/middleware';
import * as zustand from 'zustand';
import * as _privy_io_react_auth from '@privy-io/react-auth';

interface PayLinkProviderProps {
    privyAppId: string;
    config?: {
        network?: 'mainnet' | 'sepolia';
        serverUrl?: string;
    };
    children: ReactNode;
}
declare function PayLinkProvider({ privyAppId, config, children }: PayLinkProviderProps): react_jsx_runtime.JSX.Element;

interface Transaction {
    hash: string;
    amount: string;
    symbol: string;
    timestamp: number;
    status: 'pending' | 'success' | 'failed';
    direction?: 'sent' | 'received';
    recipientAddress: string;
    senderAddress: string;
}
type PaymentStep = 'amount' | 'processing' | 'success' | 'insufficient_funds' | 'waiting_for_gas' | 'funding' | 'error';
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
    setTransactions: (txs: Transaction[]) => void;
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
declare const usePaymentStore: zustand.UseBoundStore<Omit<zustand.StoreApi<PaymentState>, "setState" | "persist"> & {
    setState(partial: PaymentState | Partial<PaymentState> | ((state: PaymentState) => PaymentState | Partial<PaymentState>), replace?: false | undefined): unknown;
    setState(state: PaymentState | ((state: PaymentState) => PaymentState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<zustand_middleware.PersistOptions<PaymentState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: PaymentState) => void) => () => void;
        onFinishHydration: (fn: (state: PaymentState) => void) => () => void;
        getOptions: () => Partial<zustand_middleware.PersistOptions<PaymentState, unknown, unknown>>;
    };
}>;
declare const useUIStore: zustand.UseBoundStore<zustand.StoreApi<UIState>>;

declare function usePaymentFlow(recipientUsername?: string): {
    transactions: Transaction[];
    amount: string;
    setAmount: (amount: string) => void;
    step: PaymentStep;
    setStep: (step: PaymentStep) => void;
    isLoading: boolean;
    startPayment: (onTransferComplete?: () => void) => Promise<void>;
    confirmAfterFunding: (onTransferComplete?: () => void) => Promise<void>;
    handleOpenMoonPay: () => void;
    isLoggedIn: boolean;
    balance: number | null;
    walletAddress: string | null;
    resolutionError: string | null;
    retryResolution: () => Promise<void>;
};

declare function useAuth(): {
    login: () => Promise<{
        address: any;
        walletInstance: any;
    } | null>;
    logout: () => Promise<void>;
    wallet: any;
    authenticated: boolean;
    ready: boolean;
    isLoading: boolean;
    error: string | null;
    user: _privy_io_react_auth.User | null;
    starknetAddress: string | null;
    getAccessToken: () => Promise<string | null>;
};

declare function useUnifiedTransactions(walletAddress: string | null): {
    transactions: any[];
    refetch: () => Promise<void>;
    isLoading: boolean;
};

declare function normalizeAddress(address: string): string;

declare function resolveUsername(username: string): Promise<string | null>;

declare function withdrawToAddress(wallet: any, recipientAddress: string, amount: string): Promise<string>;

declare function saveTransactionToServer(token: string, transaction: {
    hash: string;
    amount: string;
    symbol: string;
    timestamp: number;
    status: string;
    recipientAddress: string;
    senderAddress: string;
}): Promise<void>;
declare function updateTransactionOnServer(hash: string, status: string): Promise<void>;

interface PaymentParams {
    recipient: string;
    amount: number;
    asset: string;
}

export { PayLinkProvider, type PaymentParams, normalizeAddress, resolveUsername, saveTransactionToServer, updateTransactionOnServer, useAuth, usePaymentFlow, usePaymentStore, useUIStore, useUnifiedTransactions, withdrawToAddress };
