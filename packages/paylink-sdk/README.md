# paylink-sdk

Drop-in React components and hooks for accepting Starknet USDC payments in any web app.
Built on StarkZap, Privy, and Cairo smart contracts.

```bash
npm install paylink-sdk
# or
pnpm add paylink-sdk
# or
yarn add paylink-sdk
```

---

## What this SDK does

PayLink SDK gives you three things:

1. **A payment page** — anyone can send USDC to a username via a shareable link
2. **Wallet abstraction** — payers sign in with Google, no seed phrases or downloads
3. **On-chain resolution** — usernames map to addresses via a deployed Cairo contract

---

## Requirements

Node.js 18+ and React 18+.

Install peer dependencies:

```bash
pnpm add react react-dom starkzap starknet @privy-io/react-auth zustand
```

---

## Environment variables

Add these to your `.env` file:

```bash
# Required
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_NETWORK=sepolia
VITE_SERVER_URL=https://your-backend.railway.app
VITE_ALCHEMY_API_KEY=your_alchemy_key

# The deployed UsernameRegistry contract on Starknet Sepolia
VITE_REGISTRY_CONTRACT=0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822

# Optional
VITE_MOONPAY_API_KEY=pk_test_your_key
```

Get a free Alchemy API key at [alchemy.com](https://alchemy.com).
Get a Privy App ID at [privy.io](https://privy.io).

---

## Quick start

### Step 1 — Wrap your app with PayLinkProvider

```tsx
import { PayLinkProvider } from 'paylink-sdk';

function App() {
  return (
    <PayLinkProvider privyAppId={import.meta.env.VITE_PRIVY_APP_ID}>
      <YourApp />
    </PayLinkProvider>
  );
}
```

### Step 2 — Add a payment page

```tsx
import { PaymentCard, ProfileHeader } from 'paylink-sdk';

function PayPage({ username }: { username: string }) {
  return (
    <div className="max-w-md mx-auto px-6 pt-12">
      <ProfileHeader username={username} />
      <PaymentCard recipientUsername={username} />
    </div>
  );
}
```

That is the complete integration. A payer visits the page, clicks Pay, signs in with Google, and sends USDC. No wallet setup required on their end.

---

## Components

### `<PayLinkProvider>`

Wraps your app with Privy authentication and StarkZap wallet context.
Must be placed at the root of your component tree above any PayLink component.

```tsx
import { PayLinkProvider } from 'paylink-sdk';

<PayLinkProvider privyAppId="your_privy_app_id">
  {children}
</PayLinkProvider>
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `privyAppId` | `string` | Yes | Your Privy application ID |
| `children` | `ReactNode` | Yes | Your application |

---

### `<PaymentCard>`

The core payment UI. Handles the full payment flow — login, balance check, funding prompt, transfer, and success screen.

```tsx
import { PaymentCard } from 'paylink-sdk';

<PaymentCard recipientUsername="mekjah" />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `recipientUsername` | `string` | Yes | Username registered on the Cairo contract |
| `onSuccess` | `(txHash: string) => void` | No | Called when payment confirms on-chain |
| `onError` | `(error: Error) => void` | No | Called when payment fails |

**Payment steps the component handles automatically:**
- `amount` — user enters USDC amount
- `processing` — wallet initialising and balance checking
- `funding` — user has zero USDC, shows wallet address and MoonPay button
- `insufficient_funds` — user has some USDC but not enough
- `waiting_for_gas` — STRK gas not yet confirmed, shows retry prompt
- `success` — payment confirmed on-chain
- `error` — resolution or transfer failed

---

### `<ProfileHeader>`

Displays a payment page header with the recipient's username and avatar.

```tsx
import { ProfileHeader } from 'paylink-sdk';

<ProfileHeader username="mekjah" />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `username` | `string` | Yes | Username to display |
| `displayName` | `string` | No | Override the display name |
| `bio` | `string` | No | Short description shown below the name |
| `avatarUrl` | `string` | No | Custom avatar image URL |

---

## Hooks

### `usePaymentFlow(recipientUsername)`

The hook that powers `PaymentCard`. Use this directly if you want to build your own payment UI.

```tsx
import { usePaymentFlow } from 'paylink-sdk';

function CustomPaymentUI() {
  const {
    amount,
    setAmount,
    step,
    isLoading,
    balance,
    walletAddress,
    startPayment,
    confirmAfterFunding,
    handleOpenMoonPay,
    resolutionError,
    retryResolution,
  } = usePaymentFlow('mekjah');

  return (
    <div>
      <input
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount in USDC"
      />
      <button onClick={() => startPayment()} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
      {step === 'success' && <p>Payment sent!</p>}
    </div>
  );
}
```

**Returns:**

| Value | Type | Description |
|---|---|---|
| `amount` | `string` | Current amount input |
| `setAmount` | `(v: string) => void` | Update amount |
| `step` | `PaymentStep` | Current UI step |
| `isLoading` | `boolean` | Any async operation in progress |
| `balance` | `number` | Sender's USDC balance |
| `walletAddress` | `string \| null` | Sender's Starknet wallet address |
| `startPayment` | `(refetch?: () => void) => Promise<void>` | Initiate payment flow |
| `confirmAfterFunding` | `() => Promise<void>` | Re-check balance after user funds wallet |
| `handleOpenMoonPay` | `() => void` | Open MoonPay onramp in new tab |
| `resolutionError` | `string \| null` | Error from username resolution |
| `retryResolution` | `() => Promise<void>` | Retry resolving the username |

---

### `useAuth()`

Access the authenticated user's wallet and login/logout functions.

```tsx
import { useAuth } from 'paylink-sdk';

function MyComponent() {
  const {
    login,
    logout,
    wallet,
    authenticated,
    starknetAddress,
    isLoading,
    error,
  } = useAuth();

  if (!authenticated) {
    return <button onClick={login}>Sign in with Google</button>;
  }

  return <p>Your address: {starknetAddress}</p>;
}
```

**Returns:**

| Value | Type | Description |
|---|---|---|
| `login` | `() => Promise<{ address, walletInstance } \| null>` | Trigger Privy login + StarkZap wallet setup |
| `logout` | `() => Promise<void>` | Log out and clear wallet state |
| `wallet` | `StarkZapWallet \| null` | StarkZap wallet instance |
| `authenticated` | `boolean` | Whether user is logged in |
| `starknetAddress` | `string \| null` | User's Starknet wallet address |
| `isLoading` | `boolean` | Auth operation in progress |
| `error` | `string \| null` | Last auth error message |
| `getAccessToken` | `() => Promise<string \| null>` | Get Privy JWT for server calls |

---

## Utilities

### `resolveUsername(username)`

Calls `resolve_name()` on the deployed Cairo contract and returns the wallet address for a username.
Returns `null` if the username is not registered.

```typescript
import { resolveUsername } from 'paylink-sdk';

const address = await resolveUsername('mekjah');
// Returns: '0x4488b21d9fd8a034...' or null
```

---

### `normalizeAddress(address)`

Normalises a Starknet address by removing leading zeros after `0x`.
`0x000abc` and `0xabc` both return `0xabc`.

```typescript
import { normalizeAddress } from 'paylink-sdk';

normalizeAddress('0x00cdb759...');
// Returns: '0xcdb759...'
```

---

### `addressesMatch(a, b)`

Compares two Starknet addresses safely, handling leading zero differences.

```typescript
import { addressesMatch } from 'paylink-sdk';

addressesMatch('0x000abc', '0xabc');
// Returns: true
```

---

### `openMoonPay(walletAddress)`

Opens the MoonPay USDC purchase widget in a new tab pointed at the given wallet address.

```typescript
import { openMoonPay } from 'paylink-sdk';

openMoonPay('0x4488b21d...');
// Opens https://buy-sandbox.moonpay.com?currencyCode=usdc_starknet&walletAddress=...
```

Requires `VITE_MOONPAY_API_KEY` in your environment.

---

## Types

```typescript
import type { PaymentStep, Transaction } from 'paylink-sdk';

type PaymentStep =
  | 'amount'
  | 'processing'
  | 'funding'
  | 'insufficient_funds'
  | 'waiting_for_gas'
  | 'success'
  | 'error';

interface Transaction {
  hash: string;
  amount: string;
  symbol: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  ownerAddress: string;
  direction?: 'sent' | 'received';
}
```

---

## On-chain username registry

The SDK resolves usernames through a Cairo 2.0 smart contract deployed on Starknet Sepolia.

**Contract address:**
`0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822`

**Functions:**

```cairo
// Register a username pointing to a wallet address (one-time, permanent)
fn register_name(name: felt252, address: ContractAddress)

// Resolve a username to a wallet address (returns zero if unregistered)
fn resolve_name(name: felt252) -> ContractAddress

// Look up what username is registered for an address
fn reverse_resolve(address: ContractAddress) -> felt252
```

Username resolution is trustless — anyone can verify the mapping independently without trusting PayLink's servers.

---

## Backend requirement

The SDK requires a running PayLink backend for:
- Wallet key management (deterministic per Privy user ID)
- STRK gas prefunding for new wallets
- Transaction persistence across sessions

Run the reference backend locally:

```bash
git clone https://github.com/MJ-RWA/paylink.git
cd paylink/apps/server
npm install
node index.js
```

Or deploy to Railway using the one-click deploy in the main repo.

Set `VITE_SERVER_URL` to your deployed backend URL.

---

## Network support

| Network | Status |
|---|---|
| Starknet Sepolia | ✅ Supported |
| Starknet Mainnet | 🔄 Pending AVNU paymaster approval |

---

## License

MIT — use it in any project, commercial or otherwise.

---

## Links

- [Live demo](https://paylink001.vercel.app)
- [GitHub](https://github.com/MJ-RWA/paylink)
- [npm](https://www.npmjs.com/package/paylink-sdk)
- [Contract on Starkscan](https://sepolia.starkscan.co/contract/0x0585589db8cdfee93349d5f7cabf7db8ce3d557c93b1c91cb201e0120672b822)