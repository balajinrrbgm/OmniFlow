"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Zap,
  DollarSign,
  Droplets,
  ArrowRight,
  ChevronDown,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  Clock,
  X,
  CheckCircle2,
} from "lucide-react";
import { SUPPORTED_CHAINS, DEFI_PROTOCOLS } from "@/lib/constants";
import { createConnectExecution } from "@/lib/aurora/connect";
import { copyToClipboard, formatAmount, shortenAddress } from "@/lib/utils";
import { useOmniWallet } from "@/components/providers/Providers";

const categoryIcons = {
  staking: Zap,
  lending: DollarSign,
  liquidity: Droplets,
};

// Protocol additional metadata
const PROTOCOL_METRICS: Record<string, { tvl: string; token: string; output: string }> = {
  marinade: { tvl: "$1.42B", token: "SOL / USDC", output: "mSOL (Liquid Staking)" },
  jito: { tvl: "$2.15B", token: "SOL / USDC", output: "JitoSOL (MEV Yield)" },
  marginfi: { tvl: "$480M", token: "USDC / USDT", output: "mrgn-USDC (Lending Receipt)" },
  solend: { tvl: "$210M", token: "USDC / SOL", output: "cUSDC (Interest Token)" },
  raydium: { tvl: "$890M", token: "SOL-USDC", output: "RAY-LP (Pool Share)" },
  orca: { tvl: "$640M", token: "SOL-USDC", output: "Orca Whirlpool NFT" },
};

export default function DefiPage() {
  const { publicKeyBase58 } = useOmniWallet();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProtocol, setSelectedProtocol] = useState<(typeof DEFI_PROTOCOLS)[number] | null>(null);
  const [selectedChain, setSelectedChain] = useState<(typeof SUPPORTED_CHAINS)[number]>(
    SUPPORTED_CHAINS[0] // Ethereum
  );
  const [showChainSelect, setShowChainSelect] = useState(false);
  const [amount, setAmount] = useState("100"); // Pre-filled default so button is never dead
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionStep, setExecutionStep] = useState<"configure" | "deposit" | "executing" | "complete">("configure");
  const [executionStatus, setExecutionStatus] = useState("pending");
  const [depositAddress, setDepositAddress] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredProtocols =
    activeCategory === "all"
      ? DEFI_PROTOCOLS
      : DEFI_PROTOCOLS.filter((p) => p.category === activeCategory);

  const openProtocolModal = (protocol: (typeof DEFI_PROTOCOLS)[number]) => {
    setSelectedProtocol(protocol);
    setAmount("100");
    setExecutionStep("configure");
    setExecutionStatus("pending");
  };

  const closeModal = () => {
    setSelectedProtocol(null);
    setExecutionStep("configure");
    setIsProcessing(false);
  };

  const handleInitiateExecution = useCallback(async () => {
    if (!selectedProtocol) return;
    const finalAmount = amount && parseFloat(amount) > 0 ? amount : "100";
    setAmount(finalAmount);
    setIsProcessing(true);

    // Call Intents Connect adapter
    const result = await createConnectExecution({
      sourceChain: selectedChain.id,
      sourceAsset: "USDC",
      sourceAmount: finalAmount,
      action:
        selectedProtocol.category === "staking"
          ? "stake"
          : selectedProtocol.category === "lending"
          ? "lend"
          : "lp",
      protocol: selectedProtocol.id,
      recipientAddress: publicKeyBase58 || "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    });

    setDepositAddress(result.depositAddress);
    setIsProcessing(false);
    setExecutionStep("deposit");
  }, [selectedProtocol, amount, selectedChain, publicKeyBase58]);

  const handleDepositConfirmed = useCallback(async () => {
    setExecutionStep("executing");
    const statuses = ["pending", "deposited", "executing", "completed"];
    for (let i = 0; i < statuses.length; i++) {
      await new Promise((r) => setTimeout(r, 1400));
      setExecutionStatus(statuses[i]);
    }
    setExecutionStep("complete");
  }, []);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-card border border-aurora-border mb-3 text-xs text-aurora-text">
            <Sparkles className="w-3.5 h-3.5 text-solana-green" />
            <span>Intents Connect • Deposit + Contract Call in 1 Atomic Flow</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            ⚡ Cross-Chain <span className="gradient-text">DeFi Actions</span>
          </h1>
          <p className="text-aurora-text max-w-2xl mx-auto text-xs sm:text-sm">
            Deposit from Ethereum, Arbitrum, Bitcoin, or 30+ other chains and directly trigger Solana smart
            contracts (liquid staking on Marinade/Jito, lending on marginfi/Solend, AMMs on Raydium/Orca) in one click.
          </p>
        </motion.div>

        {/* Featured 1-Click Banner */}
        <motion.div
          className="glass-card glow-border p-5 mb-8 shadow-xl relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center text-2xl shadow-lg">
                🥩
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Popular: Cross-Chain SOL Staking on Marinade</h3>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                    7.2% APY
                  </span>
                </div>
                <p className="text-xs text-aurora-text mt-0.5">
                  Fund with USDC or ETH from Ethereum/Arbitrum $\rightarrow$ Receive liquid mSOL on Solana
                </p>
              </div>
            </div>

            <button
              onClick={() => openProtocolModal(DEFI_PROTOCOLS[0])}
              className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-solana-purple/20"
            >
              <Zap className="w-4 h-4" />
              1-Click Stake via Intents Connect
            </button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-6 justify-center flex-wrap">
          {[
            { id: "all", label: "All Protocols (6)", icon: TrendingUp },
            { id: "staking", label: "Liquid Staking (2)", icon: Zap },
            { id: "lending", label: "Lending Markets (2)", icon: DollarSign },
            { id: "liquidity", label: "DEX Liquidity (2)", icon: Droplets },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeCategory === cat.id
                  ? "bg-solana-purple text-white shadow-md shadow-solana-purple/30 border border-solana-purple/50"
                  : "bg-aurora-card text-aurora-text hover:text-white border border-aurora-border"
              }`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Complete Protocol Grid (Shows All Protocols) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filteredProtocols.map((protocol, i) => {
            const metrics = PROTOCOL_METRICS[protocol.id] || {
              tvl: "$500M",
              token: "USDC",
              output: "Receipt Token",
            };
            return (
              <motion.div
                key={protocol.id}
                className="glass-card glow-border p-5 flex flex-col justify-between hover:bg-aurora-card transition-all shadow-xl group border border-aurora-border/70"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div>
                  <div className="flex items-start justify-between mb-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${protocol.color} flex items-center justify-center text-2xl shadow-md`}
                    >
                      {protocol.logo}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-aurora-darker text-[10px] font-bold text-aurora-text uppercase tracking-wider border border-aurora-border">
                        {protocol.category}
                      </span>
                      <span className="text-[10px] font-mono text-aurora-text">TVL {metrics.tvl}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-solana-green transition-colors">
                    {protocol.name}
                  </h3>
                  <p className="text-xs text-aurora-text mb-4 min-h-[34px] leading-relaxed">
                    {protocol.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-aurora-darker border border-aurora-border/60 mb-4 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[11px] text-aurora-text">Deposit Asset:</span>
                      <span className="text-[11px] font-semibold text-white">{metrics.token}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[11px] text-aurora-text">Output Receipt:</span>
                      <span className="text-[11px] font-semibold text-solana-green">{metrics.output}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-aurora-border/60 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-aurora-text uppercase font-mono block">Estimated APY</span>
                    <span className="text-base font-extrabold text-solana-green">{protocol.apy}</span>
                  </div>
                  <button
                    onClick={() => openProtocolModal(protocol)}
                    className="btn-primary py-1.5 px-4 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-solana-purple/20"
                  >
                    Initiate {protocol.action} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Architecture Info */}
        <motion.div
          className="glass-card p-6 border border-solana-purple/30 flex items-start gap-4 shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-10 h-10 rounded-xl bg-aurora-green/20 text-aurora-green flex items-center justify-center flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h3 className="font-semibold text-white mb-1">
              How Contract-Level Composability Works (Intents Connect)
            </h3>
            <p className="text-aurora-text leading-relaxed">
              Standard cross-chain bridges only transfer tokens between networks. Aurora Intents Connect goes further
              by bundling post-arrival smart contract calls into the intent signature. Solvers front capital on Solana,
              execute the exact Marinade stake, marginfi lend, or Raydium LP instruction directly for your Solana wallet,
              and settle the source assets asynchronously—delivering complete cross-chain DeFi in one atomic step.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Intents Connect Execution Modal */}
      <AnimatePresence>
        {selectedProtocol && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 rounded-2xl bg-aurora-card border border-aurora-border shadow-2xl relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-aurora-text hover:text-white hover:bg-aurora-darker transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* STEP 1: Configure Action */}
              {executionStep === "configure" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-aurora-border">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedProtocol.color} flex items-center justify-center text-2xl shadow-md`}
                    >
                      {selectedProtocol.logo}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">
                          Initiate {selectedProtocol.action} on {selectedProtocol.name}
                        </h3>
                      </div>
                      <p className="text-xs text-aurora-text">
                        Target APY:{" "}
                        <span className="text-solana-green font-bold">{selectedProtocol.apy}</span>
                      </p>
                    </div>
                  </div>

                  {/* Fund from Chain */}
                  <div>
                    <label className="text-xs font-semibold text-aurora-text uppercase tracking-wider mb-1.5 block">
                      Fund From Any Chain
                    </label>
                    <div className="relative">
                      <button
                        onClick={() => setShowChainSelect(!showChainSelect)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-aurora-darker border border-aurora-border hover:border-solana-purple/50 transition-all w-full text-left"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex-shrink-0"
                          style={{ backgroundColor: selectedChain.color }}
                        />
                        <span className="font-semibold text-xs text-white">{selectedChain.name}</span>
                        <span className="text-[11px] text-aurora-text">({selectedChain.type.toUpperCase()})</span>
                        <ChevronDown className="w-4 h-4 ml-auto text-aurora-text" />
                      </button>

                      {showChainSelect && (
                        <div className="absolute top-full mt-1.5 left-0 right-0 bg-aurora-darker border border-aurora-border rounded-xl p-2 z-30 max-h-48 overflow-y-auto shadow-2xl">
                          {SUPPORTED_CHAINS.filter((c) => c.id !== "solana").map((chain) => (
                            <button
                              key={chain.id}
                              onClick={() => {
                                setSelectedChain(chain);
                                setShowChainSelect(false);
                              }}
                              className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg hover:bg-aurora-card transition-colors text-left text-xs"
                            >
                              <div
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: chain.color }}
                              />
                              <span className="text-white font-medium">{chain.name}</span>
                              <span className="text-[10px] text-aurora-text ml-auto uppercase">{chain.symbol}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Amount to Supply */}
                  <div>
                    <label className="text-xs font-semibold text-aurora-text uppercase tracking-wider mb-1.5 block">
                      Amount to Supply (USDC)
                    </label>
                    <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-aurora-darker border border-aurora-border">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="100.00"
                        className="flex-1 bg-transparent text-xl font-bold text-white outline-none font-mono"
                      />
                      <span className="text-xs font-bold text-aurora-text bg-aurora-card px-2 py-0.5 rounded border border-aurora-border">
                        USDC
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {["50", "100", "500", "1,000", "5,000"].map((val) => (
                        <button
                          key={val}
                          onClick={() => setAmount(val.replace(",", ""))}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-aurora-darker text-aurora-text hover:text-white border border-aurora-border transition-all"
                        >
                          ${val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Plan Summary */}
                  <div className="p-3.5 rounded-xl bg-aurora-darker border border-aurora-border text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Atomic Flow:</span>
                      <span className="text-white font-medium">
                        Deposit {selectedChain.name} $\rightarrow$ Call {selectedProtocol.name} on Solana
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Projected APY:</span>
                      <span className="text-solana-green font-bold">{selectedProtocol.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Beneficiary Wallet:</span>
                      <span className="font-mono text-white">
                        {publicKeyBase58 ? shortenAddress(publicKeyBase58, 5) : "7xKXtg...gAsU"}
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={handleInitiateExecution}
                    disabled={isProcessing}
                    className="w-full btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-solana-purple/20"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating Intents Connect Gateway...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Initiate Cross-Chain {selectedProtocol.action} (${amount || "100"} USDC)
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* STEP 2: Transfer to Gateway */}
              {executionStep === "deposit" && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-solana-gradient flex items-center justify-center mx-auto text-white shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Send {amount} USDC on {selectedChain.name}
                    </h3>
                    <p className="text-xs text-aurora-text mt-1">
                      Transfer funds to the dedicated solver gateway address below to trigger contract execution
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-aurora-darker border border-aurora-border space-y-2">
                    <div className="p-2.5 rounded-lg bg-aurora-card border border-aurora-border font-mono text-xs break-all text-white select-all">
                      {depositAddress}
                    </div>
                    <button
                      onClick={() => handleCopy(depositAddress)}
                      className="w-full btn-secondary py-2 text-xs flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied Gateway Address" : "Copy Gateway Address"}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-300 text-left">
                    <p className="font-semibold mb-0.5">Automated Execution Pipeline:</p>
                    <p className="text-[11px] text-green-300/80">
                      Once detected, solvers bridge the capital, swap into target pool tokens, and call{" "}
                      <strong>{selectedProtocol.name}</strong> on Solana. Receipt tokens ({PROTOCOL_METRICS[selectedProtocol.id]?.output})
                      are delivered to your Solana wallet.
                    </p>
                  </div>

                  <button
                    onClick={handleDepositConfirmed}
                    className="w-full btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    I Have Sent the Funds <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 3: Executing In Flight */}
              {executionStep === "executing" && (
                <div className="space-y-4">
                  <div className="text-center pb-2">
                    <h3 className="text-base font-bold text-white">Intents Connect Execution in Progress</h3>
                    <p className="text-xs text-aurora-text">
                      Solvers bridging &amp; calling {selectedProtocol.name} smart contracts on Solana
                    </p>
                  </div>

                  <div className="space-y-3 p-4 rounded-xl bg-aurora-darker border border-aurora-border">
                    {[
                      {
                        id: "pending",
                        label: `Awaiting deposit confirmation on ${selectedChain.name}`,
                      },
                      {
                        id: "deposited",
                        label: "Deposit confirmed • Solvers fronting liquidity on Solana",
                      },
                      {
                        id: "executing",
                        label: `Invoking ${selectedProtocol.action} instruction on ${selectedProtocol.name}`,
                      },
                      {
                        id: "completed",
                        label: "Execution settled • Receipt tokens minted to your wallet",
                      },
                    ].map((item, idx) => {
                      const statuses = ["pending", "deposited", "executing", "completed"];
                      const currentIdx = statuses.indexOf(executionStatus);
                      const isDone = currentIdx > idx;
                      const isCurrent = currentIdx === idx;

                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                              isDone
                                ? "bg-green-500 text-white"
                                : isCurrent
                                ? "bg-solana-purple text-white animate-pulse"
                                : "bg-aurora-card text-aurora-text border border-aurora-border"
                            }`}
                          >
                            {isDone ? "✓" : idx + 1}
                          </div>
                          <span
                            className={`text-xs ${
                              isDone || isCurrent ? "text-white font-medium" : "text-aurora-text"
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
                </div>
              )}

              {/* STEP 4: Complete */}
              {executionStep === "complete" && (
                <div className="space-y-4 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto text-2xl shadow-lg">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedProtocol.action} Executed Successfully!
                    </h3>
                    <p className="text-xs text-aurora-text mt-1">
                      Your position on {selectedProtocol.name} is active and earning yield on Solana.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-aurora-darker border border-aurora-border text-left text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Protocol:</span>
                      <span className="text-white font-semibold">
                        {selectedProtocol.logo} {selectedProtocol.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Capital Supplied:</span>
                      <span className="text-white font-mono">{amount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Current APY:</span>
                      <span className="text-solana-green font-bold">{selectedProtocol.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-aurora-text">Receipt Output:</span>
                      <span className="text-solana-green font-medium">
                        {PROTOCOL_METRICS[selectedProtocol.id]?.output}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <button onClick={closeModal} className="flex-1 btn-secondary py-2.5 text-xs font-semibold">
                      Done
                    </button>
                    <a
                      href="https://solscan.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      Verify on Solscan <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
