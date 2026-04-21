import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        embeddedWallets: {
          ethereum: { createOnLogin: 'off' },
          solana: { createOnLogin: 'off' },
        },
       
        
        loginMethods: ['google', 'email'],
         appearance: {
          theme: 'light',
          accentColor: '#0D9488',
          logo: 'https://paylink001.vercel.app/favicon.ico',
        },
        
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);