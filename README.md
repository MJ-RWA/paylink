# PayLink — Web2-Style Payments on Starknet

PayLink is an open-source payment link system built on Starknet. It lets anyone 
send and receive USDC via a shareable link — no wallets, no seed phrases, no 
crypto knowledge required.

> **Live Demo:** [paylink.vercel.app](https://paylink.vercel.app)  
> **Network:** Starknet Sepolia Testnet  
> **Contract:** [0x0585589...](https://sepolia.starkscan.co/contract/0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822)  
> **SDK:** [npmjs.com/package/paylink-sdk](https://www.npmjs.com/package/paylink-sdk)

---

## What It Does

A creator visits PayLink, logs in with Google, and gets a link like 
`paylink.app/mekjah`. They share that link anywhere. Anyone who visits 
it can send USDC in under 60 seconds — no wallet setup, no crypto jargon.

**Creator flow:**
1. Sign in with Google → wallet created silently via Privy + StarkZap
2. Claim a username → registered on-chain via Cairo contract
3. Share `paylink.app/username` anywhere
4. Dashboard shows live balance and transaction history

**Payer flow:**
1. Visit a PayLink URL
2. Enter amount → sign in with Google (wallet created automatically)
3. Fund wallet with USDC → confirm payment
4. Done — never saw a seed phrase or gas fee

---

## Features

- **Google login** via Privy — no wallet download needed
- **Silent wallet creation** — StarkZap generates and manages wallets server-side
- **On-chain username registry** — Cairo contract maps usernames to addresses trustlessly
- **Auto gas funding** — server prefunds new wallets with STRK so users never buy gas
- **Transaction history** — persisted server-side, scoped per wallet address
- **MoonPay integration** — credit card onramp (sandbox, pending production approval)
- **Gasless payments** — AVNU paymaster integration (pending Propulsion Program approval)
- **Fully open source** — drop-in SDK available on npm

### Current Status

| Feature | Status |
|---|---|
| Google login + wallet creation | ✅ Working |
| USDC transfer on Sepolia | ✅ Working |
| On-chain username registry | ✅ Working |
| Auto STRK gas prefunding | ✅ Working |
| Transaction history (sender + receiver) | ✅ Working |
| Wallet-to-wallet withdrawal | ✅ Working |
| MoonPay credit card onramp | 🔄 Sandbox — pending production approval |
| AVNU gasless payments | 🔄 Pending Propulsion Program approval |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| State | Zustand with persistence |
| Routing | React Router DOM |
| Auth | Privy (Google/email login) |
| Wallet | StarkZap SDK |
| Chain | Starknet Sepolia |
| Smart Contract | Cairo 2.0 |
| Backend | Node.js + Express |

---

## Project Structure
paylink/
├── src/
│   ├── components/
│   │   ├── paylink/
│   │   │   ├── PaymentCard.tsx      # Core payment UI
│   │   │   ├── ProfileHeader.tsx    # Payment page header
│   │   │   ├── DashboardCard.tsx    # Balance display
│   │   │   ├── TransactionList.tsx  # Transaction history
│   │   │   └── CreateUsername.tsx   # Username registration
│   │   └── ui/                      # Shared UI components
│   ├── hooks/
│   │   ├── useAuth.ts               # Privy + StarkZap wallet management
│   │   ├── usePaymentFlow.ts        # Payment state machine
│   │   └── useStore.ts              # Zustand stores
│   ├── lib/
│   │   ├── address.ts               # Address normalization utilities
│   │   ├── registry.ts              # Cairo contract interaction
│   │   └── transactions.ts          # Server API helpers
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── PaymentPage.tsx
│   │   └── LoginPage.tsx
│   └── App.tsx
├── server/
│   └── index.js                     # Express backend
├── packages/
│   └── paylink-sdk/                 # Publishable SDK
├── package.json
└── .env.example

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Install pnpm

```bash
npm install -g pnpm
```

### Clone and install

```bash
git clone https://github.com/MJ-RWA/paylink.git
cd paylink
pnpm install
```

### Environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your values:

```bash
# Privy
VITE_PRIVY_APP_ID=your_privy_app_id
PRIVY_SECRET_KEY=your_privy_secret

# Network
VITE_NETWORK=sepolia
VITE_SERVER_URL=http://localhost:3001

# Deployer wallet (funds new user wallets with STRK gas)
DEPLOYER_ADDRESS=0x_your_deployer_address
DEPLOYER_PRIVATE_KEY=0x_your_deployer_private_key

# Alchemy RPC (free at alchemy.com)
ALCHEMY_API_KEY=your_alchemy_key
VITE_ALCHEMY_API_KEY=your_alchemy_key

# Registry contract (already deployed — do not change)
VITE_REGISTRY_CONTRACT=0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822

# Optional — pending approvals
VITE_MOONPAY_API_KEY=pk_test_your_key
VITE_AVNU_API_KEY=your_avnu_key
```

### Run development server

Start both the Vite frontend and Express backend together:

```bash
pnpm dev:all
```

Or separately:

```bash
# Terminal 1 — frontend
pnpm dev

# Terminal 2 — backend
pnpm server
```

Frontend runs at `http://localhost:5173`  
Backend runs at `http://localhost:3001`

### Build for production

```bash
pnpm build
```

---

## On-Chain Username Registry

PayLink uses a Cairo 2.0 smart contract on Starknet Sepolia to map usernames 
to wallet addresses trustlessly.

**Contract:** `0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822`  
**Explorer:** [View on Starkscan](https://sepolia.starkscan.co/contract/0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822)

When you visit `paylink.app/mekjah`, the app calls `resolve_name("mekjah")` on 
this contract. The wallet address comes directly from Starknet — not from a 
database. Anyone can verify the mapping independently.

```cairo
fn register_name(name: felt252, address: ContractAddress)
fn resolve_name(name: felt252) -> ContractAddress
fn reverse_resolve(address: ContractAddress) -> felt252
```

---

## PayLink SDK

Drop PayLink's payment components into any React app to add Starknet payments in minutes.

### Install

```bash
# npm
npm install paylink-sdk

# pnpm
pnpm add paylink-sdk

# yarn
yarn add paylink-sdk
```

### Peer dependencies

The SDK requires these packages in your project:

```bash
pnpm add react react-dom starkzap @privy-io/react-auth starknet
```

### Quick start

Wrap your app with `PayLinkProvider` and use the components:

```tsx
import { PayLinkProvider, PaymentCard, ProfileHeader } from 'paylink-sdk';

function App() {
  return (
    <PayLinkProvider privyAppId="your_privy_app_id">
      <YourApp />
    </PayLinkProvider>
  );
}

// On a payment page
function PayPage() {
  return (
    <div>
      <ProfileHeader username="mekjah" />
      <PaymentCard recipientUsername="mekjah" />
    </div>
  );
}
```

### Available exports

```tsx
// Components
import { PaymentCard, ProfileHeader, PayLinkProvider } from 'paylink-sdk';

// Hooks
import { usePaymentFlow, useAuth } from 'paylink-sdk';

// Utilities
import { normalizeAddress, addressesMatch, resolveUsername, openMoonPay } from 'paylink-sdk';

// Types
import type { PaymentStep, Transaction } from 'paylink-sdk';
```

### Environment variables needed in your app

```bash
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_NETWORK=sepolia
VITE_SERVER_URL=https://your-backend.railway.app
VITE_ALCHEMY_API_KEY=your_key
VITE_REGISTRY_CONTRACT=0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822
```

### Full documentation

[npmjs.com/package/paylink-sdk](https://www.npmjs.com/package/paylink-sdk)

---

## Contributing

PRs are welcome. Please open an issue first for significant changes.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a pull request

---

## License

MIT