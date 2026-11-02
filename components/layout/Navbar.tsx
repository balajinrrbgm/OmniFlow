"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { WalletButton } from "./WalletButton";

const navLinks = [
  { href: "/swap", label: "Swap", icon: "🔄" },
  { href: "/deposit", label: "Deposit", icon: "💰" },
  { href: "/defi", label: "DeFi", icon: "⚡" },
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-aurora-border bg-aurora-darker/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-solana-gradient flex items-center justify-center shadow-lg shadow-solana-purple/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Omni<span className="gradient-text">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-aurora-card text-white border border-aurora-border shadow-sm"
                  : "text-aurora-text hover:text-white hover:bg-aurora-card/50"
              }`}
            >
              <span className="mr-1.5">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Wallet Button */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-aurora-card border border-aurora-border">
            <span className="status-dot active" />
            <span className="text-xs text-aurora-text font-medium">Solana</span>
          </div>
          <WalletButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-aurora-text hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          className="md:hidden border-t border-aurora-border bg-aurora-darker p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          <div className="flex flex-col gap-2 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium ${
                  pathname === link.href
                    ? "bg-aurora-card text-white"
                    : "text-aurora-text"
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-aurora-border">
            <WalletButton />
          </div>
        </motion.div>
      )}
    </nav>
  );
};
