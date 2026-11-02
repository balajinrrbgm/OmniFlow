"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniWallet } from "@/components/providers/Providers";
import {
  ArrowDownUp,
  RefreshCw,
  Settings,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  Zap,
  Shield,
  Clock,
  AlertCircle,
  Lock,
} from "lucide-react";
import { SUPPORTED_CHAINS, POPULAR_TOKENS } from "@/lib/constants";
import {
  simulateSwapQuote,
  SOLANA_ASSETS,
  ORIGIN_ASSETS,
} from "@/lib/aurora/swapApi";
import {
  shortenAddress,
  formatAmount,
  copyToClipboard,
  getStatusColor,
  getStatusDotClass,
} from "@/lib/utils";

type SwapStep = "configure" | "review" | "deposit" | "tracking" | "complete";

export default function SwapPage() {
  const { publicKeyBase58, connected } = useOmniWallet();
  const [step, setStep] = useState<SwapStep>("configure");
  const [sourceChain, setSourceChain] = useState<(typeof SUPPORTED_CHAINS)[number]>(SUPPORTED_CHAINS[0]);
  const [sourceToken, setSourceToken] = useState<(typeof POPULAR_TOKENS)[number]>(POPULAR_TOKENS[0]);
  const [destToken, setDestToken] = useState<(typeof POPULAR_TOKENS)[number]>(POPULAR_TOKENS[2]); // SOL
  const [amount, setAmount] = useState("");
  const [showChainSelect, setShowChainSelect] = useState(false);
  const [quote, setQuote] = useState<ReturnType<typeof simulateSwapQuote> | null>(null);
  const [copied, setCopied] = useState(false);
  const [txStatus, setTxStatus] = useState<string>("pending");
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState("1.0");
  const [confidentialMode, setConfidentialMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetQuote = useCallback(async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsLoading(true);

    // Simulate API quote calculation
    await new Promise((r) => setTimeout(r, 1200));

    const simQuote = simulateSwapQuote({
      originAsset: ORIGIN_ASSETS.ARB_USDC,
      destinationAsset: SOLANA_ASSETS.USDC,
      amount,
      slippageTolerance: parseFloat(slippage) * 100,
      recipient: publicKeyBase58 || "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      refundTo: "0xOriginRefundAddressEVM",
    });

    setQuote(simQuote);
    setStep("review");
    setIsLoading(false);
  }, [amount, slippage, publicKeyBase58]);

  const handleConfirmSwap = useCallback(async () => {
    setStep("deposit");
  }, []);

  const handleDepositConfirmed = useCallback(async () => {
    setStep("tracking");
    const statuses = ["pending", "detected", "processing", "completed"];
    for (let i = 0; i < statuses.length; i++) {
      await new Promise((r) => setTimeout(r, 1800));
      setTxStatus(statuses[i]);
    }
    setStep("complete");
  }, []);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep("configure");
    setQuote(null);
    setAmount("");
    setTxStatus("pending");
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-card border border-aurora-border mb-3 text-xs text-aurora-text">
            <span className="status-dot active" />
            <span>Aurora 1Click Swap API & Widget Engine</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            🔄 Universal <span className="gradient-text">Swap</span>
          </h1>
          <p className="text-aurora-text text-sm">
            Swap tokens across 31+ chains directly into native Solana assets with 1 click
          </p>
        </motion.div>

        {/* Swap Card */}
        <motion.div
          className="glass-card glow-border p-6 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Step Progress Indicator */}
          <div className="flex items-center justify-between mb-6 px-1">
            {["Configure", "Review", "Deposit", "Solver Track", "Settled"].map(
              (label, i) => {
                const stepMap: SwapStep[] = [
                  "configure",
                  "review",
                  "deposit",
                  "tracking",
                  "complete",
                ];
                const isActive = stepMap.indexOf(step) >= i;
                return (
                  <React.Fragment key={label}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? "bg-solana-gradient text-white shadow-md shadow-solana-purple/30"
                            : "bg-aurora-darker text-aurora-text border border-aurora-border"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-[10px] hidden sm:block ${
                          isActive ? "text-white font-medium" : "text-aurora-text"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < 4 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 mt-[-14px] ${
                          stepMap.indexOf(step) > i
                            ? "bg-solana-gradient"
                            : "bg-aurora-border"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: Configure */}
            {step === "configure" && (
              <motion.div
                key="configure"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Advanced Settings & Confidential Intents Toggle */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={() => setConfidentialMode(!confidentialMode)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      confidentialMode
                        ? "bg-purple-950/60 border-purple-500 text-purple-300"
                        : "bg-aurora-darker border-aurora-border text-aurora-text hover:text-white"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Confidential Intents {confidentialMode ? "ON" : "OFF"}
                  </button>

                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 rounded-lg hover:bg-aurora-card transition-colors text-aurora-text hover:text-white"
                    title="Swap Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>

                {/* Slippage Settings Drawer */}
                {showSettings && (
                  <motion.div
                    className="mb-4 p-4 rounded-xl bg-aurora-darker border border-aurora-border"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-aurora-text">Slippage Tolerance</span>
                      <span className="text-xs text-solana-green font-mono">{slippage}%</span>
                    </div>
                    <div className="flex gap-2">
                      {["0.5", "1.0", "2.0"].map((val) => (
                        <button
                          key={val}
                          onClick={() => setSlippage(val)}
                          className={`flex-1 py-1 rounded-lg text-xs font-medium transition-all ${
                            slippage === val
                              ? "bg-solana-purple text-white shadow-sm"
                              : "bg-aurora-card text-aurora-text hover:text-white"
                          }`}
                        >
                          {val}%
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Source Chain & Asset */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-aurora-text uppercase tracking-wider">
                      Origin Network & Asset
                    </label>
                    <span className="text-xs text-aurora-text">31+ Chains Supported</span>
                  </div>

                  <div className="p-4 rounded-xl bg-aurora-darker border border-aurora-border hover:border-aurora-border/80 transition-all">
                    {/* Chain Dropdown */}
                    <div className="relative mb-3">
                      <button
                        onClick={() => setShowChainSelect(!showChainSelect)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-aurora-card border border-aurora-border hover:border-solana-purple/50 transition-all w-full text-left"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: sourceChain.color }}
                        />
                        <span className="font-medium text-sm">{sourceChain.name}</span>
                        <span className="text-xs text-aurora-text uppercase">({sourceChain.type})</span>
                        <ChevronDown className="w-4 h-4 ml-auto text-aurora-text" />
                      </button>

                      {showChainSelect && (
                        <motion.div
                          className="absolute top-full mt-2 left-0 right-0 bg-aurora-card border border-aurora-border rounded-xl p-2 z-30 max-h-56 overflow-y-auto shadow-2xl"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {SUPPORTED_CHAINS.filter((c) => c.id !== "solana").map((chain) => (
                            <button
                              key={chain.id}
                              onClick={() => {
                                setSourceChain(chain);
                                setShowChainSelect(false);
                              }}
                              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-aurora-border transition-colors text-left"
                            >
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: chain.color }}
                              />
                              <span className="text-xs font-medium">{chain.name}</span>
                              <span className="text-[10px] text-aurora-text ml-auto">{chain.symbol}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Amount Input */}
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent text-2xl font-bold outline-none placeholder-aurora-text/40 font-mono"
                      />
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-aurora-card border border-aurora-border">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: sourceToken.color }}
                        />
                        <span className="font-semibold text-xs">{sourceToken.symbol}</span>
                      </div>
                    </div>
                  </div>

                  {/* Swap Direction Arrow */}
                  <div className="flex justify-center -my-2 relative z-10">
                    <div className="p-2 rounded-xl bg-aurora-card border border-aurora-border shadow-lg">
                      <ArrowDownUp className="w-4 h-4 text-solana-purple" />
                    </div>
                  </div>

                  {/* Destination on Solana */}
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-aurora-text uppercase tracking-wider">
                      Target Settlement (Solana)
                    </label>
                    <span className="text-xs text-solana-green">Native Non-Custodial</span>
                  </div>

                  <div className="p-4 rounded-xl bg-aurora-darker border border-aurora-border">
                    <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-aurora-card border border-aurora-border">
                      <div className="w-5 h-5 rounded-full bg-solana-purple flex items-center justify-center text-[10px] font-bold">
                        ◎
                      </div>
                      <span className="font-medium text-sm">Solana Mainnet</span>
                      <span className="ml-auto text-[10px] text-aurora-text uppercase tracking-wide">
                        Receiver Chain
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 text-2xl font-bold text-solana-green font-mono">
                        {amount && parseFloat(amount) > 0
                          ? formatAmount(parseFloat(amount) * 0.997)
                          : "0.00"}
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-aurora-card border border-aurora-border">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: destToken.color }}
                        />
                        <span className="font-semibold text-xs">{destToken.symbol}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live solver quote estimates */}
                {amount && parseFloat(amount) > 0 && (
                  <motion.div
                    className="mt-4 p-3 rounded-xl bg-aurora-darker/60 border border-aurora-border/60 space-y-1.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex justify-between text-xs">
                      <span className="text-aurora-text flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Solver Settlement
                      </span>
                      <span className="text-white font-medium">~35 - 60 sec</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-aurora-text flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> Route
                      </span>
                      <span className="text-white font-mono">{sourceChain.name} → NEAR Solver → Solana</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-aurora-text flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" /> Integrator Fee Split
                      </span>
                      <span className="text-solana-green font-medium">0.3% (60% app share)</span>
                    </div>
                  </motion.div>
                )}

                {/* Primary CTA */}
                <button
                  onClick={handleGetQuote}
                  disabled={!amount || parseFloat(amount) <= 0 || isLoading}
                  className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Querying Aurora Solvers...
                    </>
                  ) : (
                    <>
                      Request Quote &amp; Route <ArrowDownUp className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {/* STEP 2: Review Quote */}
            {step === "review" && quote && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">Verify Intent Quote</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Solvers Ready
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-aurora-darker border border-aurora-border space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-aurora-text">You Deposit:</span>
                    <span className="font-semibold text-white">
                      {formatAmount(amount)} {sourceToken.symbol} ({sourceChain.name})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Expected Settlement:</span>
                    <span className="font-semibold text-solana-green">
                      ~{formatAmount(quote.expectedOutput)} {destToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Guaranteed Minimum:</span>
                    <span className="text-white">
                      {formatAmount(quote.minOutput)} {destToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Destination Recipient:</span>
                    <span className="font-mono text-white">
                      {publicKeyBase58 ? shortenAddress(publicKeyBase58, 5) : "7xKXtg...gAsU (Connected Solana Wallet)"}
                    </span>
                  </div>
                  <div className="border-t border-aurora-border my-2" />
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Quote Valid Until:</span>
                    <span className="text-aurora-text">
                      {new Date(quote.expiration).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-300">
                    Confirming generates a dedicated deposit route. Send the exact amount from any wallet on{" "}
                    <strong>{sourceChain.name}</strong>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep("configure")} className="flex-1 btn-secondary text-sm">
                    Back
                  </button>
                  <button onClick={handleConfirmSwap} className="flex-1 btn-primary text-sm">
                    Generate Deposit Route
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Deposit */}
            {step === "deposit" && quote && (
              <motion.div
                key="deposit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <h3 className="text-base font-semibold mb-1">
                    Send {sourceToken.symbol} on {sourceChain.name}
                  </h3>
                  <p className="text-xs text-aurora-text">
                    Transfer exactly{" "}
                    <span className="text-white font-bold">{formatAmount(amount)} {sourceToken.symbol}</span> to the
                    solver address below
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-aurora-darker border border-aurora-border space-y-3">
                  <div className="p-3 rounded-lg bg-aurora-card border border-aurora-border text-center">
                    <p className="text-[10px] text-aurora-text uppercase tracking-wider mb-1">
                      {sourceChain.name} Deposit Address
                    </p>
                    <p className="font-mono text-xs break-all text-white font-medium select-all">
                      {quote.depositAddress}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(quote.depositAddress)}
                    className="w-full btn-secondary text-xs flex items-center justify-center gap-2 py-2.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" /> Address Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Deposit Address
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
                  <p className="font-semibold">⚡ Non-Custodial Intent Guarantee:</p>
                  <p className="text-[11px] text-amber-300/80">
                    If the solver network fails to deliver on Solana within 15 minutes, your funds are safely refunded to your origin address automatically.
                  </p>
                </div>

                <button
                  onClick={handleDepositConfirmed}
                  className="w-full btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  I Have Transferred the Funds <ArrowDownUp className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* STEP 4: Tracking */}
            {step === "tracking" && (
              <motion.div
                key="tracking"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="text-center mb-2">
                  <h3 className="text-base font-semibold">Cross-Chain Intent Settlement</h3>
                  <p className="text-xs text-aurora-text">Solvers are competing to fulfill your trade</p>
                </div>

                <div className="p-5 rounded-xl bg-aurora-darker border border-aurora-border space-y-3.5">
                  {[
                    { status: "pending", label: "Awaiting deposit on origin chain" },
                    { status: "detected", label: "Origin deposit detected on-chain" },
                    { status: "processing", label: "NEAR Intent solvers routing & swapping" },
                    { status: "completed", label: "Settlement verified on Solana" },
                  ].map((item, i) => {
                    const statuses = ["pending", "detected", "processing", "completed"];
                    const currentIdx = statuses.indexOf(txStatus);
                    const isComplete = currentIdx > i;
                    const isCurrent = currentIdx === i;

                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isComplete
                              ? "bg-green-500 text-white shadow-md shadow-green-500/30"
                              : isCurrent
                              ? "bg-solana-purple text-white animate-pulse"
                              : "bg-aurora-card text-aurora-text border border-aurora-border"
                          }`}
                        >
                          {isComplete ? "✓" : i + 1}
                        </div>
                        <span
                          className={`text-xs ${
                            isComplete || isCurrent ? "text-white font-medium" : "text-aurora-text"
                          }`}
                        >
                          {item.label}
                        </span>
                        {isCurrent && (
                          <RefreshCw className="w-3.5 h-3.5 text-solana-purple animate-spin ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Complete */}
            {step === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4 py-2"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold">Intent Fulfilled!</h3>
                  <p className="text-xs text-aurora-text mt-1">
                    Funds were successfully swapped and delivered to your Solana wallet.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-aurora-darker border border-aurora-border space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Sent:</span>
                    <span className="text-white font-medium">{formatAmount(amount)} {sourceToken.symbol} ({sourceChain.name})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Received on Solana:</span>
                    <span className="text-solana-green font-bold">
                      {quote && formatAmount(quote.expectedOutput)} {destToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aurora-text">Execution Engine:</span>
                    <span className="text-white">NEAR Intents Solver Network</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={handleReset} className="flex-1 btn-secondary text-sm">
                    Start Another Swap
                  </button>
                  <a
                    href="https://solscan.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary flex items-center justify-center gap-1.5 text-sm"
                  >
                    View on Solscan <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Embedded Aurora Widget Studio Info Card */}
        <motion.div
          className="mt-8 glass-card p-5 border border-aurora-border"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-aurora-green/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-aurora-green" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Integrator Revenue Share Enabled</h4>
              <p className="text-xs text-aurora-text">
                Every swap routed through OmniFlow collects custom app fee splits via Aurora Widget Studio
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

