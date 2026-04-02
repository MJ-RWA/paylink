# PayLink Open-Source Starter Kit

PayLink is a **Web2-style payment link system powered by Starknet**. It provides a seamless, gasless onboarding experience for non-crypto users while leveraging the security and decentralization of the Starknet blockchain.

## 🚀 Features

- **Web2 UX**: No crypto jargon, no wallet addresses, no gas fees visible to the sender.
- **Gasless Payments**: Powered by AVNU Paymaster for a frictionless experience.
- **Social Login**: Integrated with Privy/Cartridge-style social authentication.
- **Modular Architecture**: Clean, reusable components and hooks for easy customization.
- **Type Safe**: Built with TypeScript for robust development.
- **Mobile First**: Fully responsive design optimized for mobile devices.

## 🛠 Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Blockchain**: Starknet (via StarkZap SDK)

## 📂 Folder Structure

```text
src/
├── components/
│   ├── paylink/      # Feature-specific components (PaymentCard, Dashboard, etc.)
│   └── ui/           # Generic reusable UI components (Button, Modal, Card)
├── hooks/            # Custom React hooks (usePaymentFlow, useAuth, useWithdrawal)
├── services/         # API and StarkZap SDK logic
├── lib/              # Utility functions and helpers
├── types/            # TypeScript interfaces and types
└── App.tsx           # Main application entry and layout
```

## 🏁 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/paylink-starter-kit.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy `.env.example` to `.env` and add your StarkZap/Privy credentials.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📖 Usage Examples

Check out `examples/basic-usage.tsx` for a quick demonstration of how to use the core components.

```tsx
import PaymentCard from './components/paylink/PaymentCard';
import ProfileHeader from './components/paylink/ProfileHeader';

export default function MyPage() {
  return (
    <div>
      <ProfileHeader username="yourname" />
      <PaymentCard />
    </div>
  );
}
```

## 🔗 StarkZap Integration

The `src/services/starkzapService.ts` file is the central hub for blockchain interactions. You can easily plug in your own StarkZap SDK configuration there.

## 🎨 Customization

You can customize the theme by modifying the `tailwind.config.js` or the CSS variables in `src/index.css`. The components are built with Tailwind CSS utility classes for easy styling.

## 📄 License

This project is licensed under the MIT License.
