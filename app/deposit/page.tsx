"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  Wallet,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  QrCode,
  ChevronDown,
  ArrowRight,
  Shield,
  Clock,
  AlertCircle,
  Repeat,
  Zap,
  Sparkles,
  X,
} from "lucide-react";
import { SUPPORTED_CHAINS } from "@/lib/constants";
import { simulateDepositAddress } from "@/lib/aurora/deposits";
import { shortenAddress, copyToClipboard } from "@/lib/utils";
import { useOmniWallet } from "@/components/providers/Providers";

interface DepositEntry {
  chain: (typeof SUPPORTED_CHAINS)[number];
  address: string;
  refId: string;
  status: "active" | "expired";
  createdAt: string;
}

const POPULAR_CHAINS_LIST = [
  "ethereum",
  "arbitrum",
  "base",
  "bitcoin",
  "polygon",
  "tron",
  "ton",
  "bsc",
];

export default function DepositPage() {
  const { publicKeyBase58, connected } = useOmniWallet();
  const [selectedChain, setSelectedChain] = useState<(typeof SUPPORTED_CHAINS)[number]>(
    SUPPORTED_CHAINS[0] // Ethereum
  );
  const [showChainSelect, setShowChainSelect] = useState(false);
  const [currentDeposit, setCurrentDeposit] = useState<DepositEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [testTransferActive, setTestTransferActive] = useState(false);
  const [testTransferStep, setTestTransferStep] = useState(0);

  const [depositHistory, setDepositHistory] = useState<
    Array<{
      id: string;
      chain: string;
      amount: string;
      token: string;
      status: string;
      time: string;
    }>
  >([
    {
      id: "1",
      chain: "Ethereum",
      amount: "500.00",
      token: "USDC",
      status: "completed",
      time: "2 mins ago",
    },
    {
      id: "2",
      chain: "Arbitrum",
      amount: "1,250.00",
      token: "USDC",
      status: "completed",
      time: "15 mins ago",
    },
    {
      id: "3",
      chain: "Bitcoin",
      amount: "0.05",
      token: "BTC",
      status: "processing",
      time: "42 mins ago",
    },
    {
      id: "4",
      chain: "Base",
      amount: "350.00",
      token: "USDC",
      status: "completed",
      time: "1 hour ago",
    },
  ]);

  // Generate address immediately on chain change or load
  const generateAddressForChain = useCallback(
    (chain: (typeof SUPPORTED_CHAINS)[number]) => {
      setIsGenerating(true);
      const recipient = publicKeyBase58 || "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";
      const result = simulateDepositAddress(chain.id, recipient);

      const entry: DepositEntry = {
        chain,
        address: result.depositAddress,
        refId: result.refId,
        status: "active",
        createdAt: result.createdAt,
      };

      setCurrentDeposit(entry);
      setIsGenerating(false);
    },
    [publicKeyBase58]
  );

  useEffect(() => {
    generateAddressForChain(selectedChain);
  }, [selectedChain, generateAddressForChain]);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateInboundDeposit = async () => {
    if (!currentDeposit) return;
    setTestTransferActive(true);
    setTestTransferStep(1); // Detected

    await new Promise((r) => setTimeout(r, 1500));
    setTestTransferStep(2); // Routing via solvers

    await new Promise((r) => setTimeout(r, 2000));
    setTestTransferStep(3); // Completed on Solana

    // Append to live history
    const newTx = {
      id: `tx_${Date.now()}`,
      chain: currentDeposit.chain.name,
      amount: "250.00",
      token: currentDeposit.chain.id === "bitcoin" ? "BTC" : "USDC",
      status: "completed",
      time: "Just now",
    };
    setDepositHistory((prev) => [newTx, ...prev]);

    setTimeout(() => {
      setTestTransferActive(false);
      setTestTransferStep(0);
    }, 3000);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-card border border-aurora-border mb-3 text-xs text-aurora-text">
            <span className="status-dot active" />
            <span>Aurora Intents Deposits • Solflare &amp; COCA Production Pattern</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            💰 Omni-<span className="gradient-text">Deposit</span>
          </h1>
          <p className="text-aurora-text max-w-xl mx-auto text-sm">
            Generate a persistent, reusable deposit address for any chain. Funds sent from external wallets
            (MetaMask, Binance, Coinbase, or Ledger) automatically bridge and convert into your Solana wallet.
          </p>
        </motion.div>

        {/* Quick Chain Switcher Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none justify-start sm:justify-center">
          <span className="text-xs text-aurora-text mr-1 whitespace-nowrap">Quick Select:</span>
          {SUPPORTED_CHAINS.filter((c) => POPULAR_CHAINS_LIST.includes(c.id)).map((chain) => (
            <button
              key={chain.id}
              onClick={() => setSelectedChain(chain)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                selectedChain.id === chain.id
                  ? "bg-solana-purple text-white shadow-md shadow-solana-purple/30 border border-solana-purple/50"
                  : "bg-aurora-card text-aurora-text hover:text-white border border-aurora-border"
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: chain.color }}
              />
              {chain.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left: Active Gateway Card */}
          <motion.div
            className="lg:col-span-3 glass-card glow-border p-6 shadow-2xl space-y-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {selectedChain.name} Deposit Gateway
                </h2>
                <p className="text-xs text-aurora-text">
                  Reusable persistent address • Zero destination gas required
                </p>
              </div>
              <span className="text-xs text-solana-green flex items-center gap-1 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20 font-semibold">
                <Repeat className="w-3 h-3" /> Permanent Route
              </span>
            </div>

            {/* Network Selector Dropdown */}
            <div>
              <label className="text-xs font-semibold text-aurora-text uppercase tracking-wider mb-2 block">
                Source Blockchain
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowChainSelect(!showChainSelect)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-aurora-darker border border-aurora-border hover:border-solana-purple/50 transition-all w-full text-left"
                >
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0"
                    style={{ backgroundColor: selectedChain.color }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-white">{selectedChain.name}</div>
                    <div className="text-[11px] text-aurora-text">
                      {selectedChain.type.toUpperCase()} Network ({selectedChain.symbol})
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-auto text-aurora-text" />
                </button>

                {showChainSelect && (
                  <motion.div
                    className="absolute top-full mt-2 left-0 right-0 bg-aurora-card border border-aurora-border rounded-xl p-2 z-30 max-h-64 overflow-y-auto shadow-2xl"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {SUPPORTED_CHAINS.filter((c) => c.id !== "solana").map((chain) => (
                      <button
                        key={chain.id}
                        onClick={() => {
                          setSelectedChain(chain);
                          setShowChainSelect(false);
                        }}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-aurora-border transition-colors text-left ${
                          selectedChain.id === chain.id ? "bg-aurora-border/60" : ""
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: chain.color }}
                        />
                        <span className="text-xs font-medium text-white">{chain.name}</span>
                        <span className="text-[10px] text-aurora-text ml-auto uppercase">
                          {chain.symbol}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Generated Address Box */}
            {currentDeposit && (
              <div className="p-5 rounded-xl bg-aurora-darker border-2 border-solana-purple/40 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                    <span className="status-dot active" /> Active Reusable Gateway
                  </span>
                  <span className="text-[10px] text-aurora-text font-mono">
                    Session Ref: {shortenAddress(currentDeposit.refId, 4)}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-aurora-card border border-aurora-border">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-aurora-text uppercase tracking-wider font-semibold">
                      Your {selectedChain.name} Address
                    </span>
                    <span className="text-[10px] text-solana-green">Ready to Receive</span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm break-all text-white font-semibold select-all">
                    {currentDeposit.address}
                  </p>
                </div>

                {/* Actions: Copy & QR */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => handleCopy(currentDeposit.address)}
                    className="btn-primary text-xs flex items-center justify-center gap-1.5 py-2.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-300" /> Copied Address!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Address
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowQRModal(true)}
                    className="btn-secondary text-xs flex items-center justify-center gap-1.5 py-2.5"
                  >
                    <QrCode className="w-3.5 h-3.5" /> View QR Code
                  </button>
                </div>

                {/* Simulated Inbound Test Transfer Button */}
                <button
                  onClick={handleSimulateInboundDeposit}
                  disabled={testTransferActive}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-solana-purple/20 to-solana-green/20 border border-solana-purple/30 hover:border-solana-green/50 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all"
                >
                  {testTransferActive ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-solana-green" />
                      {testTransferStep === 1 && "Simulating inbound transfer on " + selectedChain.name + "..."}
                      {testTransferStep === 2 && "NEAR Intent Solvers converting & bridging..."}
                      {testTransferStep === 3 && "Settlement confirmed on Solana!"}
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-solana-green" />
                      Test Send Deposit to this Address (Solver Simulation)
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Destination Confirmation */}
            <div className="p-3.5 rounded-xl bg-aurora-darker border border-aurora-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-solana-purple flex items-center justify-center text-xs font-bold">
                  ◎
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Target Settlement Account</div>
                  <div className="text-[11px] font-mono text-aurora-text">
                    {publicKeyBase58
                      ? shortenAddress(publicKeyBase58, 6)
                      : "7xKXtg...gAsU (Connected Solana Wallet)"}
                  </div>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-medium">
                Auto-Credited
              </span>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
              <p className="font-semibold mb-0.5">How persistent deposits work:</p>
              <p className="text-[11px] text-blue-300/80 leading-relaxed">
                Send any supported token from {selectedChain.name} (Metamask, Coinbase, Binance, Phantom).
                Aurora Intents solver network detects the deposit on-chain, automatically routes liquidity, and delivers
                USDC/SOL straight to your Solana wallet in ~45 seconds.
              </p>
            </div>
          </motion.div>

          {/* Right: Architecture & Recent Transfers */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Why Persistent Addresses Win */}
            <div className="glass-card p-5 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2 text-white">
                <ArrowRight className="w-4 h-4 text-solana-purple" />
                Why Persistent Addresses Win
              </h3>
              <div className="space-y-2.5 text-xs text-aurora-text">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-solana-purple/20 text-solana-purple flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <p>
                    <strong className="text-white">Exchange-like UX:</strong> Users get one permanent deposit address
                    per chain just like Binance/Coinbase, but 100% self-custodial.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-solana-purple/20 text-solana-purple flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <p>
                    <strong className="text-white">Zero Destination Gas:</strong> Solvers front gas fees on Solana so users
                    never need native SOL prior to transacting.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-solana-purple/20 text-solana-purple flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <p>
                    <strong className="text-white">31+ Blockchains:</strong> Supports EVM, Bitcoin, TON, Tron, NEAR, Stellar,
                    Sui, and more.
                  </p>
                </div>
              </div>
            </div>

            {/* Live Deposit Feed */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm text-white">Live Solver Activity</h3>
                <span className="status-dot active" />
              </div>
              <div className="space-y-2.5">
                {depositHistory.map((deposit) => (
                  <div
                    key={deposit.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-aurora-darker border border-aurora-border/60 text-xs"
                  >
                    <div>
                      <div className="font-medium text-white">
                        +{deposit.amount} {deposit.token}
                      </div>
                      <div className="text-[10px] text-aurora-text">
                        from {deposit.chain} • {deposit.time}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded capitalize ${
                        deposit.status === "completed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {deposit.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRModal && currentDeposit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm p-6 rounded-2xl bg-aurora-card border border-aurora-border shadow-2xl relative text-center"
            >
              <button
                onClick={() => setShowQRModal(false)}
                className="absolute top-4 right-4 p-1 text-aurora-text hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-1">
                {selectedChain.name} Deposit QR Code
              </h3>
              <p className="text-xs text-aurora-text mb-4">
                Scan from your mobile wallet to transfer
              </p>

              <div className="p-4 bg-white rounded-2xl inline-block mx-auto mb-4 shadow-lg">
                <QRCodeSVG
                  value={currentDeposit.address}
                  size={190}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="p-2.5 rounded-xl bg-aurora-darker border border-aurora-border mb-4">
                <p className="font-mono text-xs break-all text-white select-all">
                  {currentDeposit.address}
                </p>
              </div>

              <button
                onClick={() => handleCopy(currentDeposit.address)}
                className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied to Clipboard!" : "Copy Address"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
