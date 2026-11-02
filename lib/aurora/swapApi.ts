/**
 * Aurora Intents 1Click Swap API Integration
 * Uses the @defuse-protocol/one-click-sdk-typescript patterns
 * Endpoint: https://1click.chaindefuser.com
 */

import { AURORA_CONFIG } from "@/lib/constants";

const API_BASE = AURORA_CONFIG.SWAP_API_BASE;

export interface SwapQuoteParams {
  originAsset: string;
  destinationAsset: string;
  amount: string;
  slippageTolerance?: number;
  recipient: string;
  refundTo: string;
  dry?: boolean;
}

export interface SwapQuoteResponse {
  depositAddress: string;
  depositMemo: string | null;
  expectedOutput: string;
  minOutput: string;
  expiration: string;
  estimatedTime: number;
}

export interface SwapStatusResponse {
  status: "PENDING" | "DETECTED" | "PROCESSING" | "SUCCESS" | "FAILED" | "REFUNDED";
  depositTxHash?: string;
  destinationTxHash?: string;
  settledAmount?: string;
  error?: string;
}

/**
 * Get a cross-chain swap quote from the 1Click API
 * When dry=false, returns a live deposit address for execution
 */
export async function getSwapQuote(
  params: SwapQuoteParams
): Promise<SwapQuoteResponse> {
  const deadline = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  const body = {
    dry: params.dry ?? false,
    swapType: "EXACT_INPUT",
    slippageTolerance: params.slippageTolerance ?? 100, // 1% in bps
    originAsset: params.originAsset,
    depositType: "ORIGIN_CHAIN",
    destinationAsset: params.destinationAsset,
    amount: params.amount,
    refundTo: params.refundTo,
    refundType: "ORIGIN_CHAIN",
    recipient: params.recipient,
    recipientType: "DESTINATION_CHAIN",
    deadline,
  };

  const response = await fetch(`${API_BASE}/v0/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.NEXT_PUBLIC_ONECLICK_JWT_TOKEN
        ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ONECLICK_JWT_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Swap quote failed: ${err}`);
  }

  return response.json();
}

/**
 * Track the status of a cross-chain swap by deposit address
 */
export async function getSwapStatus(
  depositAddress: string
): Promise<SwapStatusResponse> {
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
    throw new Error("Failed to fetch swap status");
  }

  return response.json();
}

/**
 * Format a Solana asset ID for the 1Click API
 * Format: nep141:sol-<hex_mint_address>.omft.near
 */
export function formatSolanaAssetId(mintAddress: string): string {
  return `nep141:sol-${mintAddress}.omft.near`;
}

/**
 * Well-known Solana asset IDs on the Defuse/NEAR Intents network
 */
export const SOLANA_ASSETS = {
  USDC: "nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
  SOL: "nep141:wrap.near", // Native SOL via NEAR wrapped
} as const;

/**
 * Well-known origin chain asset IDs
 */
export const ORIGIN_ASSETS = {
  // Arbitrum
  ARB_USDC: "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
  // Ethereum
  ETH_USDC: "nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near",
  ETH_USDT: "nep141:eth-0xdac17f958d2ee523a2206206994597c13d831ec7.omft.near",
  // Base
  BASE_USDC: "nep141:base-0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913.omft.near",
  // Polygon
  POLY_USDC: "nep141:poly-0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359.omft.near",
  // BSC
  BSC_USDT: "nep141:bsc-0x55d398326f99059fF775485246999027B3197955.omft.near",
  // NEAR
  NEAR_USDC: "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
  NEAR_NATIVE: "nep141:wrap.near",
} as const;

/**
 * Simulate a swap quote for demo/development purposes
 */
export function simulateSwapQuote(
  params: SwapQuoteParams
): SwapQuoteResponse {
  const amountNum = parseFloat(params.amount);
  const fee = amountNum * 0.003; // 0.3% fee simulation
  const output = amountNum - fee;

  return {
    depositAddress: "0x" + Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join(""),
    depositMemo: null,
    expectedOutput: output.toFixed(6),
    minOutput: (output * 0.99).toFixed(6),
    expiration: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    estimatedTime: 45,
  };
}
