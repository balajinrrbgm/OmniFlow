"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useOmniWallet } from "@/components/providers/Providers";
import { shortenAddress, copyToClipboard } from "@/lib/utils";
import {
  Wallet,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
  LogOut,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";

export const WalletButton: React.FC = () => {
  const {
    connected,
    publicKeyBase58,
    solBalance,
    walletName,
    isDemoWallet,
    connectDemoWallet,
    disconnectWallet,
  } = useOmniWallet();
  const { setVisible } = useWalletModal();

  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (publicKeyBase58) {
      await copyToClipboard(publicKeyBase58);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConnectPhantom = () => {
    setShowModal(false);
    setVisible(true);
  };

  const handleConnectDemo = () => {
    connectDemoWallet();
    setShowModal(false);
  };

  return (
    <div className="relative">
      {!connected ? (
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-2 shadow-lg shadow-solana-purple/20"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Solana Wallet</span>
        </button>
      ) : (
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-aurora-card border border-aurora-border hover:border-solana-purple/50 transition-all text-xs"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <div className="text-left font-mono">
            <span className="font-semibold text-white">
              {shortenAddress(publicKeyBase58, 4)}
            </span>
            <span className="text-solana-green ml-1.5 font-bold">
              {solBalance.toFixed(2)} SOL
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-aurora-text" />
        </button>
      )}

      {/* Connected Wallet Dropdown */}
      <AnimatePresence>
        {showDropdown && connected && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="absolute right-0 mt-2 w-72 p-4 rounded-2xl bg-aurora-card border border-aurora-border shadow-2xl z-50 text-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-aurora-border mb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-aurora-text">
                  Connected Wallet
                </span>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-solana-green" />
                  {walletName}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-semibold border border-green-500/20">
                Solana
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-aurora-darker border border-aurora-border mb-3">
              <span className="text-[10px] text-aurora-text block mb-1">Public Address</span>
              <p className="font-mono text-white text-[11px] break-all select-all">
                {publicKeyBase58}
              </p>
            </div>

            <div className="flex items-center justify-between py-1 px-1 mb-3">
              <span className="text-aurora-text">SOL Balance</span>
              <span className="font-mono text-white font-bold">{solBalance.toFixed(4)} SOL</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={handleCopy}
                className="btn-secondary py-1.5 px-2 flex items-center justify-center gap-1 text-[11px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy Key
                  </>
                )}
              </button>
              <a
                href={`https://solscan.io/account/${publicKeyBase58}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-1.5 px-2 flex items-center justify-center gap-1 text-[11px]"
              >
                <ExternalLink className="w-3 h-3" /> Solscan
              </a>
            </div>

            <button
              onClick={() => {
                disconnectWallet();
                setShowDropdown(false);
              }}
              className="w-full py-1.5 px-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all flex items-center justify-center gap-1.5 text-[11px] font-medium"
            >
              <LogOut className="w-3 h-3" /> Disconnect Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm p-6 rounded-2xl bg-aurora-card border border-aurora-border shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-aurora-text hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <div className="w-10 h-10 rounded-xl bg-solana-gradient flex items-center justify-center mx-auto mb-3">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Select Solana Wallet</h3>
                <p className="text-xs text-aurora-text mt-1">
                  Connect your preferred Solana wallet or use 1-click test wallet
                </p>
              </div>

              <div className="space-y-2.5">
                {/* 1-Click Demo Wallet (Universal for all judges/browsers) */}
                <button
                  onClick={handleConnectDemo}
                  className="w-full p-3.5 rounded-xl bg-gradient-to-r from-solana-purple/20 to-solana-green/20 border border-solana-purple/40 hover:border-solana-green/60 transition-all flex items-center gap-3 text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-solana-gradient flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      1-Click Demo Solana Wallet
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-solana-green/20 text-solana-green font-mono">
                        Instant
                      </span>
                    </div>
                    <div className="text-[11px] text-aurora-text">
                      Preloaded with 14.82 SOL for seamless testing
                    </div>
                  </div>
                </button>

                {/* Phantom / Solflare Standard Provider */}
                <button
                  onClick={handleConnectPhantom}
                  className="w-full p-3.5 rounded-xl bg-aurora-darker border border-aurora-border hover:border-solana-purple/50 transition-all flex items-center gap-3 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white flex-shrink-0 font-bold text-xs">
                    👻
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Phantom / Solflare Extension</div>
                    <div className="text-[11px] text-aurora-text">
                      Standard browser Web3 wallet provider
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-aurora-border text-center">
                <span className="text-[11px] text-aurora-text flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-solana-green" />
                  Non-custodial &amp; powered by Solana Web3 SDK
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

