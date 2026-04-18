import { PrivyProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';
import { setPayLinkConfig } from '../config';

interface PayLinkProviderProps {
  privyAppId: string;
  config?: {
    network?: 'mainnet' | 'sepolia';
    serverUrl?: string;
  };
  children: ReactNode;
}

export function PayLinkProvider({ privyAppId, config, children }: PayLinkProviderProps) {
  // 👇 Inject config into SDK
  setPayLinkConfig(config || {});

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['google', 'email'],
        appearance: { theme: 'light' },
      }}
    >
      {children}
    </PrivyProvider>
  );
}