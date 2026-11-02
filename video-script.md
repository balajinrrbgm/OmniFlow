# 🎬 OmniFlow — Hackathon Demo Video Script

**Target Duration:** 2:45 – 3:00 Minutes  
**Hackathon:** Solana Hackathon 2026 — Aurora Intents Challenge  
**Video Resolution:** 1080p / 60 FPS  
**Audio:** Clear voiceover with subtle background ambient electronic music  

---

## Timeline & Scene Overview

| Timestamp | Scene Name | Primary Visual | Key Message |
|---|---|---|---|
| `0:00 - 0:25` | **Introduction & The Problem** | Landing Page (`/`) Hero Section | Solana's capital wall & cold-start gas problem |
| `0:25 - 0:55` | **Universal Swap & Privacy** | Swap Interface (`/swap`) | 1Click Swap API & Confidential Intents |
| `0:55 - 1:30` | **Omni-Deposit & QR Gateway** | Deposit Gateway (`/deposit`) | Persistent deposit address (Solflare/COCA pattern) |
| `1:30 - 2:10` | **Cross-Chain DeFi Actions** | DeFi Execution (`/defi`) | Intents Connect atomic contract execution (Marinade) |
| `2:10 - 2:40` | **Institutional Dashboard** | Telemetry & Revenue (`/dashboard`) | 60/40 fee share model & live solver telemetry |
| `2:40 - 3:00` | **Closing & Summary** | Pitch Summary / GitHub | Triple integration recap & prize fit |

---

## Detailed Step-by-Step Script

### Scene 1: Introduction & The Problem (0:00 – 0:25)
**Screen Action:**
- Screen begins on [http://localhost:3000/](http://localhost:3000/) (Landing Page).
- Cursor hovers over the hero title: *"The Universal Gateway to Solana DeFi"*.
- Scroll down briefly to showcase the 31+ supported chains badge and feature grid.
- Click **"Connect Solana Wallet"** in the top navbar $\rightarrow$ Select **"1-Click Demo Solana Wallet"** $\rightarrow$ Show instant connection with `7xKXtg...gAsU` and `14.82 SOL`.

**Voiceover (Speaker):**
> *"Solana is the most performant execution layer in crypto, but bringing liquidity from external ecosystems like Ethereum, Bitcoin, or TON is still painful. Users face bridging risks, wrapped token friction, and the notorious cold-start problem where incoming users land on Solana with zero SOL to pay transaction fees.*
>
> *Enter **OmniFlow**—the Universal Cross-Chain DeFi Gateway on Solana, powered by Aurora Intents. OmniFlow bridges any-chain liquidity from 31+ blockchains straight into Solana in a single atomic flow."*

---

### Scene 2: Feature 1 — Universal 1Click Swap (0:25 – 0:55)
**Screen Action:**
- Click **"Swap"** in the navbar to open [http://localhost:3000/swap](http://localhost:3000/swap).
- Select origin network: click dropdown and choose **"Arbitrum"** or **"Base"**.
- Enter amount: type `500` USDC.
- Toggle the **"Confidential Intents"** button ON (shows purple privacy mode badge).
- Click **"Request Quote & Route"** $\rightarrow$ Step transitions to **Review**.
- Point out expected output, route via NEAR Solver, and guaranteed minimum.
- Click **"Generate Deposit Route"** $\rightarrow$ Show unique solver deposit address.
- Click **"I Have Transferred the Funds"** $\rightarrow$ Solver progression moves from *Detected* $\rightarrow$ *Processing* $\rightarrow$ *Fulfilled on Solana!*

**Voiceover (Speaker):**
> *"Our first feature is Universal Swap, powered by the Aurora 1Click Swap API. Users can swap any token from 31+ chains into native Solana assets in under 45 seconds.*
>
> *Notice our built-in **Confidential Intents Mode** toggle, which shields swap routing. Once the quote is confirmed, a non-custodial solver address is generated. When funds arrive, competitive solvers front liquidity on Solana and settle the native assets with automatic time-locked refund protection."*

---

### Scene 3: Feature 2 — Omni-Deposit Persistent Gateway (0:55 – 1:30)
**Screen Action:**
- Click **"Deposit"** in the navbar to open [http://localhost:3000/deposit](http://localhost:3000/deposit).
- Point out that **Ethereum** is already active with a persistent deposit address (`0x...`).
- Click the **"Arbitrum"**, **"Bitcoin"**, and **"Tron"** quick-select chips at the top to demonstrate instant address switching.
- Click **"View QR Code"** $\rightarrow$ The QR modal opens displaying the live SVG QR code $\rightarrow$ Click **"Copy Address"** $\rightarrow$ Close modal.
- Click **"Test Send Deposit (Solver Simulation)"** $\rightarrow$ Watch the live button change states: *Detected on Ethereum* $\rightarrow$ *Solvers converting* $\rightarrow$ *Settlement confirmed on Solana!* $\rightarrow$ New transaction appears in the live activity feed!

**Voiceover (Speaker):**
> *"Next is Omni-Deposit, implementing the persistent deposit address architecture proven by Solflare Wallet and COCA.*
>
> *Users receive a permanent, reusable deposit address for any chain—including Ethereum, Bitcoin, or Tron. Users can send funds directly from Binance, Coinbase, or MetaMask without ever connecting to a dApp. Our solver network automatically routes the capital and deposits native USDC into their Solana wallet. Best of all: users never need native SOL for gas—solvers sponsor the destination transaction."*

---

### Scene 4: Feature 3 — Cross-Chain DeFi Actions via Intents Connect (1:30 – 2:10)
**Screen Action:**
- Click **"DeFi"** in the navbar to open [http://localhost:3000/defi](http://localhost:3000/defi).
- Show the 6 premier protocols: Marinade, Jito, marginfi, Solend, Raydium, and Orca.
- Click the featured hero button: **"1-Click Stake via Intents Connect"** (Marinade Finance - 7.2% APY).
- The Intents Connect modal opens:
  - Source chain defaults to **Ethereum**.
  - Amount defaults to `$100 USDC`. Click the `$500` quick chip.
  - Plan summary updates in real time to show: *Deposit Ethereum $\rightarrow$ Call Marinade on Solana $\rightarrow$ Receive liquid mSOL*.
- Click **"Initiate Cross-Chain Stake ($500 USDC)"**.
- In the modal, click **"I Have Sent the Funds"**.
- Watch the live execution tracker: *Deposit verified $\rightarrow$ Solvers fronting liquidity $\rightarrow$ Invoking Marinade program on Solana $\rightarrow$ Completed!*
- Show the success screen with output receipt token `mSOL` and Solscan link.

**Voiceover (Speaker):**
> *"This is where Aurora Intents Connect delivers true innovation: **contract-level composability**.*
>
> *Rather than just bridging raw tokens, Intents Connect bundles post-arrival smart contract calls into a single flow. Watch as we stake into **Marinade Finance**. We select Ethereum as our funding chain and $500 USDC. With one click, the solver detects our deposit, executes the Marinade staking program directly on Solana, and delivers liquid **mSOL** tokens straight into our wallet. No bridge hops, no wrapping, no separate staking transaction."*

---

### Scene 5: Feature 4 — Institutional Dashboard & Revenue Share (2:10 – 2:40)
**Screen Action:**
- Click **"Dashboard"** in the navbar to open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).
- Point to the **Cross-Chain Liquidity Map** (visual distribution bar showing Ethereum 34%, Arbitrum 22%, Base 18%, Bitcoin 14%).
- Point to the **Live Solver Telemetry** stream tracking Wintermute, Amber Group, and Flowdesk with sub-second latencies.
- Scroll down to the **60/40 Integrator Fee Calculator**:
  - Drag the volume slider from $1M to $5M.
  - Click the **"30 bps"** and **"50 bps"** chips to see projected revenue update live ($15,000 / $25,000).
- Highlight the **Verified Settlement Log** with filter buttons (Swaps, Deposits, DeFi Calls) and Solscan verification links.

**Voiceover (Speaker):**
> *"Our Dashboard delivers institutional-grade telemetry. We track real-time liquidity inflow across chains and monitor active solvers like Wintermute and Amber Group with sub-40 second latencies.*
>
> *Importantly, OmniFlow implements Aurora's **60% Integrator / 40% Aurora revenue sharing model**. With our interactive calculator, integrators can customize their margin basis points and forecast real protocol yields."*

---

### Scene 6: Conclusion (2:40 – 3:00)
**Screen Action:**
- Navigate back to the Home page or show the summary slide from `presentation-deck.md`.
- Conclude with the GitHub repository link and hackathon logo.

**Voiceover (Speaker):**
> *"In summary, OmniFlow delivers a complete, production-grade integration of all three Aurora Intents products: the 1Click Swap API, Intents Deposits, and Intents Connect. It solves the cold-start gas dilemma, brings any-chain liquidity to Solana from 31+ blockchains, and turns complex multi-step DeFi into an atomic, one-click experience.*
>
> *Thank you, and welcome to OmniFlow!"*

