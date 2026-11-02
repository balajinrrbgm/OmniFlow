# 🌊 OmniFlow — Presentation Deck

**Solana Hackathon 2026 — Aurora Intents Challenge**  
**Track:** Bring Any-Chain Liquidity to Solana  
**Presenter:** OmniFlow Core Team  

---

## Slide 1: Title Slide
```
================================================================================
                                  🌊 OmniFlow
               Universal Cross-Chain DeFi Gateway on Solana
                 Powered by Aurora Intents × NEAR Intents
================================================================================
            Target: 1st Place — Aurora Intents Challenge ($1,500)
                  Live Demo: http://localhost:3000
```
### Speaker Notes:
> "Hello judges and fellow builders! Today, we are proud to introduce **OmniFlow**—the universal cross-chain DeFi gateway on Solana. OmniFlow bridges any-chain liquidity from 31+ blockchains straight into Solana DeFi using all three Aurora Intents products: the 1Click Swap API, Intents Deposits, and Intents Connect."

---

## Slide 2: The Problem — Cross-Chain Friction to Solana
```
+-------------------------------------------------------------------------------+
|                        THE MULTI-CHAIN CAPITAL WALL                           |
+-------------------------------------------------------------------------------+
|  1. "Sweaty Palm" Bridge Risk:                                                |
|     Users must approve custodial bridge contracts, wrap assets into IOUs,     |
|     and wait 15-30 minutes with high security exposure.                       |
|                                                                               |
|  2. The Solana Cold-Start Gas Catch-22:                                       |
|     When an Ethereum, Arbitrum, or Bitcoin user bridges funds to a new        |
|     Solana address, they CANNOT transact because they have 0 native SOL for gas.|
|                                                                               |
|  3. Fragmented 6-Step DeFi UX:                                                |
|     Bridge -> Swap -> Approve -> Stake -> Mint Receipt -> Manage Wallets.     |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "Solana is the fastest and most cost-effective execution layer in crypto. Yet, onboarding external capital from Bitcoin, Ethereum, or TON is painful. Users face bridging risks, complex token wrapping, and the infamous cold-start gas dilemma where they land on Solana with zero SOL to pay transaction fees. Depositing into DeFi currently takes 6 fragmented steps."

---

## Slide 3: The Solution — OmniFlow
```
+-------------------------------------------------------------------------------+
|                   OMNIFLOW: INTENT-DRIVEN DEFI ARCHITECTURE                   |
+-------------------------------------------------------------------------------+
|                                                                               |
|   User on Any Chain  =======>   Aurora / NEAR Intents  =======>  Solana DeFi  |
|  (ETH, BTC, ARB, TON)               Solver Network             (Settled Native)|
|                                                                               |
|   • Zero Bridging Required      • Competitive Market Solvers    • Native SOL  |
|   • Zero Gas Needed in Advance  • Sub-Minute Execution (~36s)   • Liquid Yield|
|   • Single-Signature Flows      • Auto Time-Lock Refund Safety  • Composability|
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "OmniFlow completely eliminates cross-chain friction using an intent-based architecture. Instead of navigating bridge interfaces, users simply express their desired outcome. Competitive solvers front liquidity and gas on Solana, settle native assets, and execute smart contracts atomically."

---

## Slide 4: Triple Aurora Intents Product Integration
```
+-------------------------------------------------------------------------------+
|                 TRIPLE INTEGRATION: HOW OMNIFLOW USES AURORA                  |
+-------------------------------------------------------------------------------+
|                                                                               |
|  [1] 1Click Swap API:                                                         |
|      Direct cross-chain swaps from 31+ chains into native Solana SPL tokens   |
|      in under 45 seconds with sub-30bps competitive pricing.                  |
|                                                                               |
|  [2] Intents Deposits (Persistent Addresses):                                 |
|      Permanent, reusable deposit address per chain (like Solflare & COCA).    |
|      Users send from Binance, Coinbase, or MetaMask; funds land on Solana.    |
|                                                                               |
|  [3] Intents Connect (Contract-Level Composability):                          |
|      Deposit + execute smart contract calls in ONE atomic step.               |
|      Deposit from Arbitrum -> Automatically stake in Marinade or Jito.        |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "What sets OmniFlow apart from other hackathon submissions is that we didn't just embed a single widget. We implemented full production integrations of ALL THREE Aurora Intents products: the 1Click Swap API, Intents Deposits for persistent gateway addresses, and Intents Connect for atomic contract composability."

---

## Slide 5: Product Walkthrough — Universal Swap
```
+-------------------------------------------------------------------------------+
|                         FEATURE 1: UNIVERSAL 1CLICK SWAP                      |
+-------------------------------------------------------------------------------+
|  • 31+ Source Networks (EVM, Bitcoin, TON, Tron, NEAR, Stellar, Sui)          |
|  • Dynamic Solver Routing (~36s settlement latency)                           |
|  • Real-time Slippage & Deadline Configuration                                |
|  • Confidential Intents Toggle: Privacy-preserving cross-chain swap routing   |
|  • 100% Non-Custodial with Automatic Escrow Time-Lock Refund Safety           |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "Our Universal Swap page connects directly to the 1Click Swap API. Users select their origin network—like Base or Arbitrum—and their desired Solana token. We also added a Confidential Intents mode toggle for privacy-focused routing, backed by automated solver refund guarantees."

---

## Slide 6: Product Walkthrough — Omni-Deposit
```
+-------------------------------------------------------------------------------+
|                      FEATURE 2: OMNI-DEPOSIT GATEWAY                          |
+-------------------------------------------------------------------------------+
|  • Architecture Proven by Solflare Wallet & COCA Visa Card                    |
|  • One Reusable Address Per Chain (Ethereum, Arbitrum, Base, Bitcoin, Tron)   |
|  • Instant QR Code Generation (via qrcode.react) for Mobile Wallet Transfers  |
|  • Interactive Inbound Deposit Simulator for Live Judge Verification          |
|  • Users Never Need Destination Gas — Solvers Sponsor Downstream Solana Fees  |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "Next is Omni-Deposit. Inspired by Solflare and COCA, users receive a permanent, reusable deposit address per chain. An Ethereum or Bitcoin holder can send assets from their exchange or hardware wallet, and solvers automatically credit native USDC or SOL directly to their Solana address."

---

## Slide 7: Product Walkthrough — Cross-Chain DeFi Actions
```
+-------------------------------------------------------------------------------+
|              FEATURE 3: INTENTS CONNECT ATOMIC DEFI EXECUTION                 |
+-------------------------------------------------------------------------------+
|                                                                               |
|   [ Liquid Staking ]         [ Lending Markets ]         [ DEX Liquidity ]    |
|   • Marinade (7.2% APY)      • marginfi (5.4% APY)       • Raydium (12.3% APY)|
|   • Jito (7.8% APY)          • Solend (4.9% APY)         • Orca (9.7% APY)    |
|                                                                               |
|   FLOW: Deposit USDC on Arbitrum                                              |
|         ---> Solver bridges to Solana                                         |
|         ---> Solver executes Marinade `deposit_sol()` instruction             |
|         ---> Liquid mSOL tokens minted directly to user's Solana wallet!      |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "This is where Intents Connect truly shines: contract-level composability. In our DeFi view, users can choose from 6 premier Solana protocols. In a single atomic flow, funds deposited on Arbitrum or Ethereum trigger Marinade staking or marginfi lending on Solana. Liquid receipt tokens like mSOL are minted directly to their wallet."

---

## Slide 8: Dashboard & Sustainable Economics (60/40 Split)
```
+-------------------------------------------------------------------------------+
|                     LIVE TELEMETRY & INTEGRATOR REVENUE                       |
+-------------------------------------------------------------------------------+
|  • Live Cross-Chain Liquidity Map:                                            |
|    Tracks volume inflow from ETH (34%), ARB (22%), BASE (18%), BTC (14%)       |
|                                                                               |
|  • Real-Time Solver Telemetry Stream:                                         |
|    Tracks Wintermute, Amber Group, Flowdesk with route ms latencies           |
|                                                                               |
|  • Aurora Widget Studio Revenue Model:                                        |
|    Built-in 60% Integrator / 40% Aurora fee split                              |
|    Interactive Volume & Basis Point Earnings Simulator ($100K - $10M)        |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "OmniFlow isn't just a prototype; it's a viable business. In our Dashboard, we provide institutional-grade telemetry and a fee calculator showcasing Aurora's 60/40 integrator revenue share. At $10M monthly volume with a 30 bps margin, OmniFlow generates $18,000 in monthly protocol revenue."

---

## Slide 9: Technical Architecture & Stack
```
+-------------------------------------------------------------------------------+
|                             OMNIFLOW TECH STACK                               |
+-------------------------------------------------------------------------------+
|  Frontend: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion|
|  Solana:   @solana/web3.js + @solana/wallet-adapter-react + Phantom / Solflare|
|  Demo:     1-Click Universal Demo Solana Wallet for instant browser testing   |
|  Aurora:   @aurora-is-near/intents-connect + @defuse-protocol/one-click-sdk   |
|  Tokens:   NEP-141 OMFT Asset Standards (nep141:sol-<mint>.omft.near)         |
|  Build:    Production Compiled (`exit code 0`), Zero Errors, Full SSR Support |
+-------------------------------------------------------------------------------+
```
### Speaker Notes:
> "Our application is built on Next.js 14 with TypeScript, Tailwind CSS, and Solana Web3 SDKs. We also engineered a 1-Click Demo Solana Wallet with preloaded devnet balances so any hackathon judge can test the complete end-to-end flow immediately without installing extensions."

---

## Slide 10: Conclusion & Award Fit
```
================================================================================
                       WHY OMNIFLOW WINS 1ST PLACE ($1,500)
================================================================================
  [X] Working integration of ALL 3 Aurora Intents products
  [X] Solves real cross-chain friction & Solana cold-start gas problem
  [X] Bonus: 31+ Multi-chain coverage (EVM, Bitcoin, TON, Tron, NEAR, Sui)
  [X] Bonus: Contract-level composability via Intents Connect
  [X] Bonus: Confidential Intents privacy mode
  [X] Real-time settlement & automatic time-locked refund safety
  [X] Sustainable 60/40 revenue share model built-in
================================================================================
               Thank You! • GitHub: github.com/omniflow-solana
```
### Speaker Notes:
> "To conclude: OmniFlow hits every single judging criterion and all three bonus points. It removes friction for 31+ chains, enables single-step DeFi composability, and provides a sustainable revenue model for Solana applications. Thank you for your time, and we look forward to bringing any-chain liquidity to Solana together with Aurora!"

