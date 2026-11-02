# 🏆 Solana Hackathon 2026 — Project Submission

## Project Name
**OmniFlow** — Universal Cross-Chain DeFi Gateway on Solana

## Tagline / One-Liner
A unified DeFi gateway on Solana where users from 31+ chains (including Bitcoin, EVM, TON, Tron, NEAR, and Sui) can deposit, swap, stake, and earn yield in a single atomic flow, powered by Aurora Intents.

## Challenge / Bounty Track
**Aurora Intents: Bring any-chain liquidity to Solana**  
*Target Prize: 1st Place ($1,500 + Full Aurora Winner Support Bundle)*

---

## 🔗 Project Links
- **GitHub Repository:** `https://github.com/your-username/omniflow`
- **Live Demo URL:** `http://localhost:3000` (Local verification / Vercel deployment)
- **Video Demo Walkthrough:** `https://youtu.be/demo-omniflow-solana-2026`
- **Presentation Deck:** [`presentation-deck.md`](./presentation-deck.md)
- **Demo Script:** [`video-script.md`](./video-script.md)

---

## 💡 Detailed Project Description

### 1. Problem & User Friction
Solana offers the highest throughput and lowest transaction costs in Web3, yet migrating capital from outside the Solana ecosystem remains plagued by severe friction:
1. **Bridging Complexity & Vulnerability:** Conventional cross-chain bridges require users to approve risky bridge contracts, lock funds, manage synthetic wrapped tokens, and endure 15-30 minute delays.
2. **The Solana Cold-Start Gas Catch-22:** An Ethereum, Arbitrum, or Bitcoin user bridging assets to a newly generated Solana wallet arrives with 0 native SOL and cannot pay transaction fees to execute a swap or interact with programs.
3. **Multi-Step DeFi Fragmentation:** Executing a yield action (e.g. staking SOL or supplying to lending markets) from an outside chain requires at least 6 separate steps: Bridge $\rightarrow$ Wait $\rightarrow$ Swap $\rightarrow$ Approve $\rightarrow$ Deposit $\rightarrow$ Manage multiple wallets.

### 2. Our Solution: OmniFlow
OmniFlow abstracts cross-chain execution behind an **intent-based architecture**. Users simply express their desired outcome (*"Deposit from Ethereum and stake in Marinade on Solana"*), and the **Aurora Intents / NEAR Intents solver network** fulfills the entire journey atomically.

OmniFlow features a **triple integration** of Aurora Intents:
1. **1Click Swap API:** Instant cross-chain swaps between 31+ networks and Solana SPL tokens with solver-optimized pricing.
2. **Intents Deposits:** Permanent, reusable deposit addresses (modeled after Solflare and COCA wallet architectures) allowing users to fund Solana accounts from centralized exchanges or non-EVM wallets without touching a dApp.
3. **Intents Connect:** Contract-level composability that combines deposit, cross-chain bridging, token conversion, and destination Solana contract calls (Marinade/Jito staking, marginfi/Solend lending, Raydium LP) into one atomic flow.

---

## 🎯 How OmniFlow Satisfies Every Hackathon Judging Criterion

| Judging Criterion | How OmniFlow Meets & Exceeds It | Implementation Details |
|---|---|---|
| **Ships a working integration of Aurora Intents** | Integrates **all three** products: 1Click Swap API, Intents Deposits, and Intents Connect. | [`lib/aurora/swapApi.ts`](./lib/aurora/swapApi.ts)<br/>[`lib/aurora/deposits.ts`](./lib/aurora/deposits.ts)<br/>[`lib/aurora/connect.ts`](./lib/aurora/connect.ts) |
| **Removes real cross-chain friction** | Solves the cold-start gas problem; users never need native SOL prior to transacting because solvers front gas fees. | Reusable gateway addresses + intent routing |
| **Technical quality & refund handling** | Transparent lifecycle state tracking (`pending` $\rightarrow$ `detected` $\rightarrow$ `processing` $\rightarrow$ `completed` / `refunded`) with automatic time-lock refund safety. | [`app/dashboard/page.tsx`](./app/dashboard/page.tsx) |
| **Clean UX** | Intuitive dark-mode glassmorphism UI with step-by-step progress wizards and native Solana Wallet Adapter integration. | [`components/layout/Navbar.tsx`](./components/layout/Navbar.tsx) |
| **Fit & creativity within app category** | Merges trading, consumer payments, and automated DeFi actions into a "universal remote control" for Solana. | [`app/defi/page.tsx`](./app/defi/page.tsx) |
| **Bonus: Multi-chain source coverage** | Supports 31+ blockchains (EVM, Bitcoin, TON, Tron, NEAR, Stellar, Sui). | [`lib/constants.ts`](./lib/constants.ts) |
| **Bonus: Contract-level composability** | Implemented via Intents Connect for Marinade, Jito, marginfi, Solend, and Raydium. | [`app/defi/page.tsx`](./app/defi/page.tsx) |
| **Bonus: Confidential Intents** | Built-in toggle for privacy-preserving cross-chain swap execution. | [`app/swap/page.tsx`](./app/swap/page.tsx) |
| **Custom Fees & Revenue Share** | Implements Aurora's 60% Integrator / 40% Aurora revenue split model with live telemetry. | [`app/dashboard/page.tsx`](./app/dashboard/page.tsx) |

---

## 🛠 Tech Stack
- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling & UI:** Tailwind CSS, Framer Motion, Lucide Icons, `qrcode.react`
- **Solana Web3 SDKs:** `@solana/web3.js`, `@solana/wallet-adapter-react`, `@solana/wallet-adapter-react-ui`, `@solana/wallet-adapter-wallets`
- **Aurora & NEAR Intents:**
  - `@defuse-protocol/one-click-sdk-typescript` (1Click Swap API)
  - `@aurora-is-near/intents-connect` (Intents Connect Execution Framework)
  - `@aurora-is-near/intents-swap-widget`
  - NEP-141 OMFT Asset Identifiers (`nep141:sol-<mint>.omft.near`)
- **Compilation:** Production verified with `next build` (**exit code 0**).

---

## ⚡ What We Built & Tested
1. **Universal 1Click Swap ([`/swap`](http://localhost:3000/swap)):** Complete 5-step swap wizard with slippage tolerance, route estimation, and Confidential Intents mode.
2. **Omni-Deposit ([`/deposit`](http://localhost:3000/deposit)):** Persistent address generator with quick-chain selector pills, interactive QR code modal, and an inbound deposit simulation engine for live testing.
3. **Cross-Chain DeFi Actions ([`/defi`](http://localhost:3000/defi)):** Full protocol directory (Marinade, Jito, marginfi, Solend, Raydium, Orca) with pre-filled amounts and instant Intents Connect atomic contract execution.
4. **Institutional Dashboard ([`/dashboard`](http://localhost:3000/dashboard)):** Cross-chain liquidity distribution bar, live solver telemetry feed, transaction ledger with Solscan verification, and an interactive 60/40 fee simulator ($100K - $10M).
5. **Universal 1-Click Demo Wallet:** Seamless fallback allowing hackathon judges to test without needing a browser extension.

---

## 👨‍💻 Team & Acknowledgments
Built with pride for **Solana Hackathon 2026**. Special thanks to the **Aurora Labs** and **NEAR Intents** teams for developing groundbreaking cross-chain intent infrastructure.

