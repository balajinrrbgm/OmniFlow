"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Coins,
  TrendingUp,
  Layers,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Globe,
    title: "31+ Chains Supported",
    description:
      "Accept deposits from Ethereum, Arbitrum, Base, BSC, Polygon, Bitcoin, TON, Tron, and many more.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: Zap,
    title: "Instant Cross-Chain Swaps",
    description:
      "Swap any token from any chain to any Solana SPL token. No bridges, no extra gas.",
    color: "from-purple-500 to-pink-400",
  },
  {
    icon: Coins,
    title: "Omni-Deposit",
    description:
      "Get a persistent deposit address. Users send from any wallet, funds arrive on Solana automatically.",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: TrendingUp,
    title: "DeFi in One Click",
    description:
      "Deposit + stake, lend, or provide LP — all in a single cross-chain flow via Intents Connect.",
    color: "from-orange-500 to-yellow-400",
  },
  {
    icon: Shield,
    title: "Non-Custodial & Secure",
    description:
      "Aurora Intents never holds your funds. Competitive solver network ensures best execution.",
    color: "from-red-500 to-rose-400",
  },
  {
    icon: Layers,
    title: "Built-in Revenue",
    description:
      "Configure custom fees on every cross-chain flow. 60/40 revenue share in your favor.",
    color: "from-indigo-500 to-violet-400",
  },
];

const stats = [
  { value: "31+", label: "Chains" },
  { value: "120+", label: "Assets" },
  { value: "<60s", label: "Settlement" },
  { value: "0", label: "Gas Needed" },
];

const supportedChains = [
  "Ethereum",
  "Arbitrum",
  "Base",
  "Polygon",
  "Optimism",
  "Avalanche",
  "BSC",
  "Bitcoin",
  "NEAR",
  "TON",
  "Tron",
  "Stellar",
  "Sui",
  "Solana",
  "Gnosis",
  "Monad",
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-solana-purple/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solana-green/10 rounded-full blur-[120px]" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aurora-card border border-aurora-border mb-8">
              <span className="status-dot active" />
              <span className="text-sm text-aurora-text">
                Powered by Aurora Intents × NEAR Intents
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The{" "}
              <span className="gradient-text">Universal Gateway</span>
              <br />
              to Solana DeFi
            </h1>

            <p className="text-xl text-aurora-text max-w-2xl mx-auto mb-10">
              Deposit, swap, stake, and earn yield from 31+ chains — all in one
              flow. No bridges. No extra gas. No complexity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/swap">
                <motion.button
                  className="btn-primary flex items-center gap-2 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch App <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/deposit">
                <motion.button
                  className="btn-secondary flex items-center gap-2 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Deposit Address
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-aurora-text mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need,{" "}
              <span className="gradient-text">One Platform</span>
            </h2>
            <p className="text-aurora-text text-lg max-w-xl mx-auto">
              OmniFlow integrates all three Aurora Intents products to deliver
              the most complete cross-chain experience on Solana.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="glass-card glow-border p-8 group hover:bg-aurora-card transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-aurora-text leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Chains */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">Any Chain</span> to Solana
            </h2>
            <p className="text-aurora-text text-lg mb-12">
              Users from all these chains can use your Solana app immediately
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {supportedChains.map((chain, i) => (
              <motion.div
                key={chain}
                className="chain-badge text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, borderColor: "#9945FF" }}
              >
                {chain}
              </motion.div>
            ))}
            <div className="chain-badge text-sm border-dashed">
              +15 more chains
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect & Choose",
                desc: "Connect your Solana wallet and choose your action: swap, deposit, or DeFi.",
              },
              {
                step: "02",
                title: "Fund from Anywhere",
                desc: "Send tokens from any of 31+ chains. Aurora Intents handles all the routing.",
              },
              {
                step: "03",
                title: "Done!",
                desc: "Funds arrive on Solana and your DeFi action executes automatically. That's it.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="text-6xl font-bold gradient-text mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-aurora-text">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="glass-card glow-border p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Go <span className="gradient-text">Cross-Chain</span>?
            </h2>
            <p className="text-aurora-text text-lg mb-8 max-w-xl mx-auto">
              Start using Solana DeFi from any chain in seconds.
              No bridging required.
            </p>
            <Link href="/swap">
              <motion.button
                className="btn-primary text-lg flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch OmniFlow <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
