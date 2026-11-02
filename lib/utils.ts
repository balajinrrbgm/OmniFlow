/**
 * Utility functions for OmniFlow
 */

/**
 * Shorten an address for display (e.g., 0x1234...abcd)
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format a token amount with proper decimals
 */
export function formatAmount(
  amount: string | number,
  decimals = 6,
  maxDisplay = 4
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "0.00";
  if (num === 0) return "0.00";
  if (num < 0.0001) return "<0.0001";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: maxDisplay,
  });
}

/**
 * Format USD value
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get time ago string from ISO timestamp
 */
export function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  return `${diffDay}d ago`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  }
}

/**
 * Generate a unique ref ID for deposit tracking
 */
export function generateRefId(): string {
  return `omniflow_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Get explorer URL for a transaction hash
 */
export function getExplorerUrl(
  chain: string,
  txHash: string,
  type: "tx" | "address" = "tx"
): string {
  const explorers: Record<string, string> = {
    solana: `https://solscan.io/${type === "tx" ? "tx" : "account"}/${txHash}`,
    ethereum: `https://etherscan.io/${type}/${txHash}`,
    arbitrum: `https://arbiscan.io/${type}/${txHash}`,
    base: `https://basescan.org/${type}/${txHash}`,
    polygon: `https://polygonscan.com/${type}/${txHash}`,
    optimism: `https://optimistic.etherscan.io/${type}/${txHash}`,
    avalanche: `https://snowtrace.io/${type}/${txHash}`,
    bsc: `https://bscscan.com/${type}/${txHash}`,
    near: `https://explorer.near.org/transactions/${txHash}`,
    bitcoin: `https://blockstream.info/${type}/${txHash}`,
  };

  return explorers[chain] || `#${txHash}`;
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    awaiting: "text-yellow-400",
    detected: "text-blue-400",
    processing: "text-purple-400",
    completed: "text-green-400",
    failed: "text-red-400",
    refunded: "text-orange-400",
    pending: "text-yellow-400",
    success: "text-green-400",
  };
  return colors[status.toLowerCase()] || "text-gray-400";
}

/**
 * Get status dot class
 */
export function getStatusDotClass(status: string): string {
  const classes: Record<string, string> = {
    awaiting: "pending",
    detected: "active",
    processing: "pending",
    completed: "active",
    failed: "error",
    refunded: "error",
    pending: "pending",
    success: "active",
  };
  return classes[status.toLowerCase()] || "pending";
}

/**
 * Calculate estimated fee
 */
export function calculateFee(amount: number, feeBps: number): number {
  return (amount * feeBps) / 10000;
}

/**
 * Delay utility
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Chain type to display name
 */
export function chainTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    evm: "EVM",
    solana: "Solana",
    near: "NEAR",
    btc: "Bitcoin",
    tron: "Tron",
    ton: "TON",
    stellar: "Stellar",
    sui: "Sui",
  };
  return labels[type] || type.toUpperCase();
}
