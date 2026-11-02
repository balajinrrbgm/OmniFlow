"use client";

import React, {
  FC,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
  useWallet as useSolanaWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

// Interface for unified OmniFlow wallet
export interface OmniWalletContextType {
  publicKey: PublicKey | null;
  publicKeyBase58: string;
  connected: boolean;
  walletName: string;
  solBalance: number;
  isDemoWallet: boolean;
  connectDemoWallet: () => void;
  disconnectWallet: () => void;
}

const OmniWalletContext = createContext<OmniWalletContextType>({
  publicKey: null,
  publicKeyBase58: "",
  connected: false,
  walletName: "",
  solBalance: 0,
  isDemoWallet: false,
  connectDemoWallet: () => {},
  disconnectWallet: () => {},
});

export const useOmniWallet = () => useContext(OmniWalletContext);

// Inner provider that unifies real wallet adapter + one-click demo fallback
const OmniWalletBridge: FC<{ children: ReactNode }> = ({ children }) => {
  const solanaWallet = useSolanaWallet();
  const [demoConnected, setDemoConnected] = useState(false);

  useEffect(() => {
    // Check localStorage on mount for persistent demo state
    try {
      const saved = localStorage.getItem("omniflow_demo_wallet");
      if (saved === "true") {
        setDemoConnected(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const demoPublicKey = useMemo(
    () => new PublicKey("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"),
    []
  );

  const connectDemoWallet = () => {
    setDemoConnected(true);
    try {
      localStorage.setItem("omniflow_demo_wallet", "true");
    } catch {}
  };

  const disconnectWallet = () => {
    if (solanaWallet.connected) {
      solanaWallet.disconnect();
    }
    setDemoConnected(false);
    try {
      localStorage.removeItem("omniflow_demo_wallet");
    } catch {}
  };

  const isRealConnected = solanaWallet.connected && solanaWallet.publicKey !== null;
  const activeConnected = isRealConnected || demoConnected;
  const activePublicKey = isRealConnected ? solanaWallet.publicKey : demoConnected ? demoPublicKey : null;
  const activeKeyStr = activePublicKey ? activePublicKey.toBase58() : "";
  const activeWalletName = isRealConnected ? (solanaWallet.wallet?.adapter.name || "Solana Wallet") : demoConnected ? "Solana Demo Wallet" : "";
  const activeBalance = isRealConnected ? 5.24 : demoConnected ? 14.82 : 0;

  return (
    <OmniWalletContext.Provider
      value={{
        publicKey: activePublicKey,
        publicKeyBase58: activeKeyStr,
        connected: activeConnected,
        walletName: activeWalletName,
        solBalance: activeBalance,
        isDemoWallet: !isRealConnected && demoConnected,
        connectDemoWallet,
        disconnectWallet,
      }}
    >
      {children}
    </OmniWalletContext.Provider>
  );
};

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const network =
    (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) ||
    WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network),
    [network]
  );

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <OmniWalletBridge>{children}</OmniWalletBridge>
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
};
