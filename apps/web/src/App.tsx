import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  LandingPage, 
  TermsPage, 
  PrivacyPage, 
  SupportPage, 
  LoginPage, 
  DashboardPage, 
  PaymentPage,
  AuthCallbackPage
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import { StarknetConfig, jsonRpcProvider, argent, braavos, useInjectedConnectors } from "@starknet-react/core";
import { sepolia } from "@starknet-react/chains";
import Demo from './components/landing/Demo';
import Features from './components/landing/Features';
import HowItWorks from './components/landing/HowItWorks';
import ScrollToTop from './components/ui/ScrollToTop';

function StarknetProvider({ children }: { children: React.ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [braavos(), argent()],
    includeRecommended: "always",
  });

  function rpc() {
    return {
      nodeUrl: "https://starknet-sepolia.public.blastapi.io" 
    };
  }

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={jsonRpcProvider({ rpc })} 
      connectors={connectors}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}


export default function App() {
  return (
    <StarknetProvider>
      <Analytics />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/features" element={<Features />} />
          <Route path='HowItWorks' element={<HowItWorks />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/:username" element={<PaymentPage />} />
        </Routes>
      </Router>
    </StarknetProvider>
  );
}