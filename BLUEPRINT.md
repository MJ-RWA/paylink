# PayLink Project Blueprint: The "Linktree for Crypto"

## 1. Project Identity & "The Hook"
**Value Proposition:** PayLink eliminates the "Web3 Wall" by replacing complex hex addresses and gas management with a human-readable URL and social authentication.

*   **Before (High Friction):**
    1.  Receiver sends `0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7`.
    2.  Sender needs a wallet extension, seed phrase, and ETH for gas.
    3.  Sender manually selects token and confirms multiple popups.
*   **After (PayLink):**
    1.  Receiver shares `paylink.app/mekjah`.
    2.  Sender clicks link, signs in with Google (Privy).
    3.  Sender types "50 USDC" and clicks "Send" (Gasless via AVNU).
    4.  Transaction complete.

## 2. StarkZap SDK Integration Strategy
We leverage StarkZap v2 for a "low-code" implementation:

*   **Wallets (Privy):** Use `StarkZap.Wallets.connect({ strategy: 'privy' })`. This handles the creation of an embedded Starknet account linked to the user's Google/Email identity.
*   **Paymaster (AVNU):** Integrate `StarkZap.Paymaster.useAVNU()`. This wraps the transaction in a meta-transaction format where the AVNU paymaster covers the gas fees, providing a $0 gas experience for the sender.
*   **DeFi (Transfers):** Use `StarkZap.DeFi.transfer({ recipient, amount, token })`. This module handles the underlying Cairo contract calls for ERC20 transfers (USDC, STRK, etc.) with built-in balance checks.
*   **Staking (Advanced):** Implement `StarkZap.DeFi.stake({ vault: 'nostra', amount })` on the receiver's side to automatically route incoming payments into yield-bearing positions.

## 3. On-Chain Logic (Cairo 2.0)
The **Username Registry** contract maps `felt252` (slugs) to `ContractAddress`.

*   **Why On-Chain?** It ensures the mapping is immutable and censorship-resistant. No centralized database can "steal" a username or redirect payments.
*   **Logic:** A simple `LegacyMap<felt252, ContractAddress>` with a `register_username` function that checks for availability.

## 4. Component Architecture
1.  **`ProfileHeader`**: Displays the receiver's username, avatar, and verified badge.
2.  **`PaymentCard`**: The main interaction hub containing the amount input and token selection.
3.  **`TokenSelector`**: A sleek dropdown using StarkZap's asset list (USDC, STRK, WBTC).
4.  **`GaslessButton`**: A specialized button component that handles the meta-transaction signature flow.
5.  **`SuccessConfetti`**: Visual feedback for a completed transaction.

## 5. 7-Day Build Roadmap
*   **Day 1:** Environment Setup & StarkZap SDK Initialization.
*   **Day 2:** UI Scaffolding (Google Stitch for layout).
*   **Day 3:** Privy Social Login Integration.
*   **Day 4:** Username Registry Contract (CairoCoder) & Deployment.
*   **Day 5:** AVNU Paymaster Integration for Gasless Flows.
*   **Day 6:** DeFi Transfer Logic & Balance Checks.
*   **Day 7:** Final Polish, QR Code Generation, and Mainnet Submission.

## 6. Bounty-Winning Tips
*   **QR Code Integration:** Generate a dynamic QR code for the profile link to enable "Scan to Pay" in physical settings.
*   **Transaction History:** Show a "Recent Supporters" feed (if public) to create social proof.
*   **Mobile-First Design:** Ensure the "Linktree" vibe is perfect on mobile browsers where most social sharing happens.
*   **One-Click Staking:** Add a toggle for receivers: "Earn 5% APY on incoming USDC."

## 7. Low-Code Leverage
*   **CairoCoder:** Use this to generate the Starknet interface and TypeScript hooks for the Username Registry contract.
*   **Google Stitch:** Use for rapid UI prototyping and ensuring consistent spacing/typography across the "Linktree" layout.
