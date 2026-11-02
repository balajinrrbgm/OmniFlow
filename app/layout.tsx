import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "OmniFlow | Universal Cross-Chain DeFi Gateway on Solana",
  description:
    "Deposit, swap, stake, and earn yield from 31+ chains directly on Solana. Powered by Aurora Intents.",
  keywords: [
    "Solana",
    "DeFi",
    "cross-chain",
    "Aurora Intents",
    "swap",
    "bridge",
    "deposit",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-aurora-darker text-white antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
