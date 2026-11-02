export type ChainId = string;
export type TokenSymbol = string;

export interface Chain {
  id: ChainId;
  name: string;
  symbol: string;
  color: string;
  type: "evm" | "solana" | "near" | "btc" | "tron" | "ton" | "stellar" | "sui";
}

export interface Token {
  symbol: TokenSymbol;
  name: string;
  decimals: number;
  color: string;
  address?: string;
}

export interface SwapQuote {
  depositAddress: string;
  depositMemo?: string;
  expectedOutput: string;
  minOutput: string;
  expiration: string;
  fee: string;
  route: string[];
}

export interface DepositInfo {
  address: string;
  chain: Chain;
  token: Token;
  qrData: string;
  refId: string;
  status: DepositStatus;
  createdAt: string;
}

export type DepositStatus =
  | "awaiting"
  | "detected"
  | "processing"
  | "completed"
  | "failed"
  | "refunded";

export interface Transaction {
  id: string;
  type: "swap" | "deposit" | "defi";
  status: DepositStatus;
  sourceChain: Chain;
  sourceToken: Token;
  sourceAmount: string;
  destToken: Token;
  destAmount: string;
  timestamp: string;
  depositAddress: string;
  destTxHash?: string;
  sourceTxHash?: string;
  defiAction?: string;
  defiProtocol?: string;
}

export interface DeFiAction {
  id: string;
  protocol: string;
  action: "stake" | "lend" | "lp";
  inputToken: TokenSymbol;
  inputAmount: string;
  outputToken?: string;
  apy: string;
  status: DepositStatus;
}

export interface QuoteRequest {
  originAsset: string;
  destinationAsset: string;
  amount: string;
  slippageTolerance: number;
  recipient: string;
  refundTo: string;
  deadline: string;
}
