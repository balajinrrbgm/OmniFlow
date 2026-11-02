import React from "react";
import { Zap, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-aurora-border bg-aurora-darker">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-solana-gradient flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Omni<span className="gradient-text">Flow</span>
              </span>
            </div>
            <p className="text-aurora-text text-sm max-w-md leading-relaxed">
              Universal Cross-Chain DeFi Gateway on Solana. Deposit, swap,
              stake, and earn yield from 31+ chains — all in one flow. Powered
              by Aurora Intents.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-aurora-text">
              Product
            </h4>
            <ul className="space-y-2.5">
              {["Swap", "Deposit", "DeFi Actions", "Dashboard"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-aurora-text hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-aurora-text">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Aurora Intents Docs",
                  href: "https://docs.intents.aurora.dev/",
                },
                {
                  label: "Solana Dev Guide",
                  href: "https://docs.intents.aurora.dev/intents-connect/developer-guides/solana",
                },
                {
                  label: "Aurora Intents",
                  href: "https://intents.aurora.dev/",
                },
                {
                  label: "GitHub",
                  href: "#",
                },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-aurora-text hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-aurora-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-aurora-text">
            © 2026 OmniFlow. Built for Solana Hackathon 2026 — Aurora Intents
            Challenge.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-aurora-text flex items-center gap-1.5">
              <span className="status-dot active" /> All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
