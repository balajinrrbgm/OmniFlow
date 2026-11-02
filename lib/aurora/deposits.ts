/**
 * Aurora Intents Deposits Integration
 * Generates persistent deposit addresses for cross-chain deposits
 */

import { AURORA_CONFIG } from "@/lib/constants";

const API_BASE = AURORA_CONFIG.SWAP_API_BASE;

export interface PersistentDepositParams {
  refId: string;
  sourceChain: string;
  sourceAsset: string;
  destinationAsset: string;
  recipientAddress: string;
}

export interface PersistentDepositResponse {
  depositAddress: string;
  refId: string;
  chain: string;
  asset: string;
  status: "active" | "expired";
  createdAt: string;
}

export interface DepositStatusResponse {
  status: "AWAITING" | "DETECTED" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED";
  amount?: string;
  sourceTxHash?: string;
  destinationTxHash?: string;
  settledAmount?: string;
  timestamp?: string;
}

/**
 * Generate a persistent deposit address for a user
 * This address can be reused for multiple deposits
 */
export async function createPersistentDeposit(
  params: PersistentDepositParams
): Promise<PersistentDepositResponse> {
  const response = await fetch(`${API_BASE}/v0/deposits/persistent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.NEXT_PUBLIC_ONECLICK_JWT_TOKEN
        ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONECLICK_JWT_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      ref_id: params.refId,
      source_chain: params.sourceChain,
      source_asset: params.sourceAsset,
      destination_asset: params.destinationAsset,
      recipient: params.recipientAddress,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to create deposit address: ${err}`);
  }

  return response.json();
}

/**
 * Check the status of a deposit
 */
export async function getDepositStatus(
  depositAddress: string
): Promise<DepositStatusResponse> {
  const response = await fetch(
    `${API_BASE}/v0/status?depositAddress=${encodeURIComponent(depositAddress)}`,
    {
      headers: {
        ...(process.env.NEXT_PUBLIC_ONECLICK_JWT_TOKEN
          ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONECLICK_JWT_TOKEN}` }
          : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch deposit status");
  }

  return response.json();
}

/**
 * Generate a simulated persistent deposit address for demo
 */
export function simulateDepositAddress(
  chain: string,
  _walletAddress: string
): PersistentDepositResponse {
  const chainPrefixes: Record<string, string> = {
    ethereum: "0x",
    arbitrum: "0x",
    base: "0x",
    polygon: "0x",
    optimism: "0x",
    avalanche: "0x",
    bsc: "0x",
    bitcoin: "bc1q",
    tron: "T",
    near: "",
    ton: "EQ",
    stellar: "G",
    sui: "0x",
  };

  const prefix = chainPrefixes[chain] || "0x";
  const randomHex = Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");

  return {
    depositAddress: `${prefix}${randomHex}`,
    refId: `omniflow_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    chain,
    asset: "USDC",
    status: "active",
    createdAt: new Date().toISOString(),
  };
}

/**
 * Simulate deposit status tracking
 */
export function simulateDepositStatus(): DepositStatusResponse {
  const statuses: DepositStatusResponse["status"][] = [
    "AWAITING",
    "DETECTED",
    "PROCESSING",
    "COMPLETED",
  ];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    status: randomStatus,
    amount: "100.00",
    sourceTxHash: "0x" + Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join(""),
    destinationTxHash:
      randomStatus === "COMPLETED"
        ? Array.from({ length: 88 }, () =>
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[
              Math.floor(Math.random() * 62)
            ]
          ).join("")
        : undefined,
    settledAmount: randomStatus === "COMPLETED" ? "99.70" : undefined,
    timestamp: new Date().toISOString(),
  };
}
