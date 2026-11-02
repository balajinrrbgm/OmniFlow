"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  ExternalLink,
  Search,
  Wallet,
  ShieldCheck,
  Percent,
  Zap,
  Layers,
  ArrowRight,
  Cpu,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Coins,
} from "lucide-react";
import { shortenAddress, formatUSD, timeAgo, getStatusColor, getStatusDotClass } from "@/lib/utils";
import { useOmniWallet } from "@/components/providers/Providers";

const MOCK_FLOWS = [
  { from: "Ethereum", share: "34%", vol: "$1,638,800", color: "#627EEA" },
  { from: "Arbitrum", share: "22%", vol: "$1,060,400", color: "#2D374B" },
  { from: "Base", share: "18%", vol: "$867,600", color: "#0052FF" },
  { from: "Bitcoin", share: "14%", vol: "$674,800", color: "#F7931A" },
  { from: "Tron & Others", share: "12%", vol: "$578,400", color: "#FF0013" },
];

const MOCK_TELEMETRY = [
  {
    id: "int_8842",
    solver: "wintermute.near",
    route: "ETH (Base) → SOL (Solana)",
    amount: "$2,400",
    latency: "34s",
    status: "settled",
  },
  {
    id: "int_8841",
    solver: "amber-group.near",
    route: "USDC (Arb) → mSOL (Marinade)",
    amount: "$10,000",
    latency: "42s",
    status: "settled",
  },
  {
    id: "int_8840",
    solver: "flowdesk.near",
    route: "BTC (Bitcoin) → USDC (Solana)",
    amount: "$8,500",
    latency: "58s",
    status: "settled",
  },
  {
    id: "int_8839",
    solver: "pro-market.near",
    route: "USDT (Tron) → SOL (Solana)",
    amount: "$1,200",
    latency: "38s",
    status: "settled",
  },
];

const FULL_TRANSACTIONS = [
  {
    id: "tx_101",
    type: "defi" as const,
    status: "completed",
    sourceChain: "Ethereum",
    sourceChainColor: "#627EEA",
    sourceToken: "USDC",
    sourceAmount: "5,000.00",
    destToken: "mSOL",
    destAmount: "34.21",
    defiAction: "Stake (Marinade)",
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    depositAddress: "0x742d35Cc6634C0532925a3b844D4f71b54bdA02913",
    feeEarned: "$15.00",
  },
  {
    id: "tx_102",
    type: "swap" as const,
    status: "completed",
    sourceChain: "Base",
    sourceChainColor: "#0052FF",
    sourceToken: "ETH",
    sourceAmount: "1.50",
    destToken: "SOL",
    destAmount: "28.45",
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    depositAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    feeEarned: "$11.25",
  },
  {
    id: "tx_103",
    type: "deposit" as const,
    status: "completed",
    sourceChain: "Bitcoin",
    sourceChainColor: "#F7931A",
    sourceToken: "BTC",
    sourceAmount: "0.12",
    destToken: "USDC",
    destAmount: "7,560.00",
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    depositAddress: "bc1q742d35cc6634c0532925a3b844d4f71b54bda02",
    feeEarned: "$22.68",
  },
  {
    id: "tx_104",
    type: "defi" as const,
    status: "completed",
    sourceChain: "Arbitrum",
    sourceChainColor: "#2D374B",
    sourceToken: "USDC",
    sourceAmount: "12,000.00",
    destToken: "mrgn-USDC",
    destAmount: "12,000.00",
    defiAction: "Lend (marginfi)",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    depositAddress: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    feeEarned: "$36.00",
  },
  {
    id: "tx_105",
    type: "swap" as const,
    status: "processing",
    sourceChain: "Polygon",
    sourceChainColor: "#8247E5",
    sourceToken: "USDC",
    sourceAmount: "2,500.00",
    destToken: "SOL",
    destAmount: "~17.12",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    depositAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    feeEarned: "$7.50",
  },
  {
    id: "tx_106",
    type: "deposit" as const,
    status: "refunded",
    sourceChain: "Tron",
    sourceChainColor: "#FF0013",
    sourceToken: "USDT",
    sourceAmount: "450.00",
    destToken: "USDC",
    destAmount: "0",
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    depositAddress: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9",
    feeEarned: "$0.00",
  },
];

export default function DashboardPage() {
  const { publicKeyBase58, connected, solBalance } = useOmniWallet();
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState("30D");
  const [simVolume, setSimVolume] = useState(1000000); // 1 Million default for calculator
  const [feeBps, setFeeBps] = useState(30); // 30 bps = 0.3%

  const integratorEarnings = useMemo(() => {
    const totalFee = (simVolume * feeBps) / 10000;
    return totalFee * 0.6; // 60% share
  }, [simVolume, feeBps]);

  const filteredTx = FULL_TRANSACTIONS.filter((tx) => {
    const matchesFilter = filterType === "all" || tx.type === filterType;
    const matchesSearch =
      tx.sourceChain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sourceToken.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.depositAddress.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aurora-card border border-aurora-border mb-2 text-xs text-aurora-text">
              <span className="status-dot active" />
              <span>Real-Time Cross-Chain Telemetry • NEAR Intents Solvers</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              📊 Protocol <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-xs sm:text-sm text-aurora-text">
              Live settlement telemetry, cross-chain volume routing, and Aurora 60/40 integrator economics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe selector */}
            <div className="flex p-1 rounded-xl bg-aurora-card border border-aurora-border text-xs">
              {["24H", "7D", "30D", "ALL"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    timeframe === tf
                      ? "bg-solana-purple text-white shadow-md shadow-solana-purple/30"
                      : "text-aurora-text hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {connected && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-aurora-card border border-aurora-border text-xs">
                <Wallet className="w-3.5 h-3.5 text-solana-purple" />
                <span className="font-mono text-white font-semibold">
                  {shortenAddress(publicKeyBase58, 4)}
                </span>
                <span className="text-solana-green font-bold ml-1">{solBalance.toFixed(2)} SOL</span>
              </div>
            )}
          </div>
        </div>

        {/* Institutional Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {[
            {
              label: "Cumulative Volume",
              value: "$4,820,000",
              sub: "+18.4% this month",
              icon: BarChart3,
              color: "text-blue-400",
            },
            {
              label: "Settled Intents",
              value: "1,248",
              sub: "Across 31+ chains",
              icon: Activity,
              color: "text-purple-400",
            },
            {
              label: "Avg. Settlement",
              value: "36.4s",
              sub: "Solver execution speed",
              icon: Clock,
              color: "text-yellow-400",
            },
            {
              label: "Solver Success Rate",
              value: "99.4%",
              sub: "Auto-refund fallback",
              icon: ShieldCheck,
              color: "text-green-400",
            },
            {
              label: "Integrator Fee Share",
              value: "$14,460",
              sub: "60% protocol split",
              icon: DollarSign,
              color: "text-emerald-400",
            },
            {
              label: "Connected Networks",
              value: "31 Chains",
              sub: "EVM, BTC, TON, Solana",
              icon: Layers,
              color: "text-orange-400",
            },
          ].map((m, i) => (
            <div key={i} className="glass-card p-4 hover:border-solana-purple/40 transition-all shadow-lg">
              <div className="flex items-center gap-1.5 mb-2">
                <m.icon className={`w-4 h-4 ${m.color}`} />
                <span className="text-[11px] text-aurora-text font-medium">{m.label}</span>
              </div>
              <div className="text-xl font-bold text-white mb-0.5">{m.value}</div>
              <div className="text-[10px] text-aurora-text">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Mid Row: Visual Flow Pipeline & Live Solver Stream */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Visual Liquidity Flow Pipeline */}
          <div className="lg:col-span-7 glass-card glow-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Cross-Chain Liquidity Inflow Distribution</h3>
                <p className="text-xs text-aurora-text">Origin chains routing liquidity through Aurora Intents</p>
              </div>
              <span className="text-xs text-solana-green font-mono font-semibold">Live Pipeline</span>
            </div>

            {/* Visual stacked bar */}
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-aurora-darker border border-aurora-border">
              {MOCK_FLOWS.map((f, i) => (
                <div
                  key={i}
                  style={{ width: f.share, backgroundColor: f.color }}
                  title={`${f.from}: ${f.vol} (${f.share})`}
                  className="h-full hover:opacity-80 transition-opacity"
                />
              ))}
            </div>

            {/* Flow Legend & Amounts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {MOCK_FLOWS.map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-aurora-darker border border-aurora-border/60">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }} />
                    <span className="text-xs font-semibold text-white">{f.from}</span>
                    <span className="text-[10px] text-aurora-text ml-auto font-mono">{f.share}</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{f.vol}</div>
                </div>
              ))}
              <div className="p-3 rounded-xl bg-solana-purple/10 border border-solana-purple/30 flex items-center justify-center text-center">
                <div>
                  <span className="text-[10px] text-solana-green uppercase font-bold tracking-wider block">
                    All Settled On
                  </span>
                  <span className="text-xs font-bold text-white">Solana Mainnet ◎</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Solver Execution Stream */}
          <div className="lg:col-span-5 glass-card glow-border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-solana-purple" />
                <h3 className="text-base font-bold text-white">Live Solver Telemetry</h3>
              </div>
              <span className="status-dot active" />
            </div>

            <div className="space-y-2.5">
              {MOCK_TELEMETRY.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-xl bg-aurora-darker border border-aurora-border/70 flex items-center justify-between text-xs hover:border-aurora-border transition-all"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-white">{t.route}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-solana-purple/20 text-solana-purple font-mono">
                        {t.solver}
                      </span>
                    </div>
                    <div className="text-[10px] text-aurora-text mt-0.5">
                      {t.amount} • Latency {t.latency}
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-semibold uppercase">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="glass-card glow-border shadow-2xl overflow-hidden">
          <div className="p-5 border-b border-aurora-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Verified Intent Settlement Log</h3>
              <p className="text-xs text-aurora-text">
                Live ledger of cross-chain swaps, persistent deposits, and DeFi executions
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-aurora-text absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chain, token, address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-8 py-1.5 text-xs w-56"
                />
              </div>

              <div className="flex gap-1 p-1 rounded-lg bg-aurora-darker border border-aurora-border text-xs">
                {[
                  { id: "all", label: "All" },
                  { id: "swap", label: "Swaps" },
                  { id: "deposit", label: "Deposits" },
                  { id: "defi", label: "DeFi Calls" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterType(f.id)}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      filterType === f.id
                        ? "bg-solana-purple text-white shadow-sm"
                        : "text-aurora-text hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-aurora-border text-[11px] text-aurora-text uppercase tracking-wider bg-aurora-darker/50">
                  <th className="px-5 py-3">Operation / Product</th>
                  <th className="px-5 py-3">Origin Chain</th>
                  <th className="px-5 py-3">Inbound Amount</th>
                  <th className="px-5 py-3">Settled on Solana</th>
                  <th className="px-5 py-3">App Fee Share</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3 text-right">Solscan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-aurora-border/60 text-xs">
                {filteredTx.map((tx) => (
                  <tr key={tx.id} className="hover:bg-aurora-card/40 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          tx.type === "swap"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : tx.type === "deposit"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        }`}
                      >
                        {tx.type === "swap" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : tx.type === "deposit" ? (
                          <ArrowDownRight className="w-3 h-3" />
                        ) : (
                          <TrendingUp className="w-3 h-3" />
                        )}
                        {tx.type === "defi"
                          ? tx.defiAction
                          : tx.type === "deposit"
                          ? "Intents Deposit"
                          : "1Click Swap"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: tx.sourceChainColor }}
                        />
                        <span className="font-semibold text-white">{tx.sourceChain}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-white">
                      {tx.sourceAmount} {tx.sourceToken}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-solana-green font-bold">
                      {tx.destAmount} {tx.destToken}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-emerald-400 font-semibold">
                      +{tx.feeEarned}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className={`status-dot ${getStatusDotClass(tx.status)}`} />
                        <span className={`text-[11px] capitalize ${getStatusColor(tx.status)} font-medium`}>
                          {tx.status === "refunded" ? "Auto-Refunded (Timeout)" : tx.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-aurora-text">
                      {timeAgo(tx.timestamp)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <a
                        href="https://solscan.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aurora-text hover:text-solana-purple transition-colors inline-block"
                        title="Verify on Solscan"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Integrator Revenue Calculator */}
        <div className="glass-card glow-border p-6 shadow-2xl border border-emerald-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Aurora Widget Studio 60/40 Fee Simulator
                </h3>
                <p className="text-xs text-aurora-text">
                  Calculate real protocol earnings based on your customized app margin
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-aurora-text uppercase font-mono block">
                Projected Integrator Earnings (60%)
              </span>
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                {formatUSD(integratorEarnings)}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 rounded-xl bg-aurora-darker border border-aurora-border">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-aurora-text">Simulated Monthly Routed Volume:</span>
                <span className="font-bold text-white font-mono">{formatUSD(simVolume)}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={simVolume}
                onChange={(e) => setSimVolume(Number(e.target.value))}
                className="w-full accent-solana-purple cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-aurora-text mt-1 font-mono">
                <span>$100K</span>
                <span>$5M</span>
                <span>$10M</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-aurora-text">Custom Margin (bps):</span>
                <span className="font-bold text-solana-green font-mono">{feeBps} bps (0.30%)</span>
              </div>
              <div className="flex gap-2">
                {[20, 30, 50, 80].map((bps) => (
                  <button
                    key={bps}
                    onClick={() => setFeeBps(bps)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      feeBps === bps
                        ? "bg-solana-purple text-white shadow-md shadow-solana-purple/30"
                        : "bg-aurora-card text-aurora-text hover:text-white border border-aurora-border"
                    }`}
                  >
                    {bps} bps
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
