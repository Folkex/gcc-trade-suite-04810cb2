import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export interface DexScreenerPair {
  id: string;
  pairAddress: string;
  tokenAddress: string;
  name: string;
  symbol: string;
  chain: string;
  chainId: string;
  launchedAt: Date;
  liquidity: number;
  volume24h: number;
  priceUsd: number;
  priceChange24h: number;
  buys24h: number;
  sells24h: number;
  icon?: string;
  dexId: string;
  url: string;
}

interface MarketContextType {
  // Data
  marketData: DexScreenerPair[];
  topGainer: DexScreenerPair | null;
  topVolume: DexScreenerPair | null;
  trendingToken: DexScreenerPair | null;
  
  // State
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLive: boolean; // True when using real API data, false when using mock
  
  // Actions
  refresh: () => Promise<void>;
  getTokenByAddress: (address: string) => DexScreenerPair | undefined;
}

const chainMap: Record<string, string> = {
  solana: "SOL",
  ethereum: "ETH",
  bsc: "BSC",
  arbitrum: "ARB",
  polygon: "MATIC",
  base: "BASE",
  avalanche: "AVAX",
  optimism: "OP",
};

// Mock data fallback when API fails
const MOCK_PAIRS: DexScreenerPair[] = [
  {
    id: "mock-1",
    pairAddress: "0x1234...mock",
    tokenAddress: "So11111111111111111111111111111111111111112",
    name: "Wrapped SOL",
    symbol: "SOL",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(),
    liquidity: 15000000,
    volume24h: 8500000,
    priceUsd: 185.42,
    priceChange24h: 3.24,
    buys24h: 12450,
    sells24h: 8320,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
  },
  {
    id: "mock-2",
    pairAddress: "0x5678...mock",
    tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "USD Coin",
    symbol: "USDC",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(),
    liquidity: 25000000,
    volume24h: 12000000,
    priceUsd: 1.0,
    priceChange24h: 0.01,
    buys24h: 25000,
    sells24h: 24800,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
  },
  {
    id: "mock-3",
    pairAddress: "0x9012...mock",
    tokenAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    name: "Jupiter",
    symbol: "JUP",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(),
    liquidity: 5000000,
    volume24h: 3200000,
    priceUsd: 0.89,
    priceChange24h: -2.15,
    buys24h: 8500,
    sells24h: 9200,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
  },
  {
    id: "mock-4",
    pairAddress: "0x3456...mock",
    tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    name: "Bonk",
    symbol: "BONK",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(),
    liquidity: 2500000,
    volume24h: 4500000,
    priceUsd: 0.00002145,
    priceChange24h: 8.75,
    buys24h: 15000,
    sells24h: 12000,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
  },
  {
    id: "mock-5",
    pairAddress: "0x7890...mock",
    tokenAddress: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    name: "Marinade Staked SOL",
    symbol: "mSOL",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(),
    liquidity: 8000000,
    volume24h: 1800000,
    priceUsd: 198.5,
    priceChange24h: 2.89,
    buys24h: 3200,
    sells24h: 2900,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
  },
];

const MarketContext = createContext<MarketContextType | undefined>(undefined);

interface MarketProviderProps {
  children: ReactNode;
}

export function MarketProvider({ children }: MarketProviderProps) {
  const [marketData, setMarketData] = useState<DexScreenerPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);

  const fetchMarketData = useCallback(async () => {
    console.log("🔄 [MarketContext] Fetching market data...");
    setLoading(true);
    setError(null);

    try {
      const searchUrl = "https://api.dexscreener.com/latest/dex/search?q=solana";
      console.log("📡 [MarketContext] Requesting:", searchUrl);

      const response = await fetch(searchUrl);
      console.log("📥 [MarketContext] Response status:", response.status);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 [MarketContext] Data received:", data);

      const allPairs = data.pairs || [];
      console.log("📊 [MarketContext] Total pairs found:", allPairs.length);

      if (allPairs.length === 0) {
        console.warn("⚠️ [MarketContext] No pairs returned, using mock data");
        setMarketData(MOCK_PAIRS);
        setIsLive(false);
        setLastUpdated(new Date());
        return;
      }

      // Convert to our format, taking unique tokens
      const seenTokens = new Set<string>();
      const formattedPairs: DexScreenerPair[] = [];

      for (const pair of allPairs) {
        if (!pair.baseToken || seenTokens.has(pair.baseToken.address)) {
          continue;
        }
        seenTokens.add(pair.baseToken.address);

        formattedPairs.push({
          id: pair.pairAddress,
          pairAddress: pair.pairAddress,
          tokenAddress: pair.baseToken.address,
          name: pair.baseToken.name || "Unknown",
          symbol: pair.baseToken.symbol || "???",
          chain: chainMap[pair.chainId] || pair.chainId?.toUpperCase() || "???",
          chainId: pair.chainId || "unknown",
          launchedAt: pair.pairCreatedAt ? new Date(pair.pairCreatedAt) : new Date(),
          liquidity: pair.liquidity?.usd || 0,
          volume24h: pair.volume?.h24 || 0,
          priceUsd: parseFloat(pair.priceUsd) || 0,
          priceChange24h: pair.priceChange?.h24 || 0,
          buys24h: pair.txns?.h24?.buys || 0,
          sells24h: pair.txns?.h24?.sells || 0,
          icon: pair.info?.imageUrl,
          dexId: pair.dexId || "unknown",
          url: pair.url || "",
        });

        // Limit to 30 unique tokens
        if (formattedPairs.length >= 30) break;
      }

      console.log("✅ [MarketContext] Formatted pairs:", formattedPairs.length);

      // Sort by volume descending
      formattedPairs.sort((a, b) => b.volume24h - a.volume24h);

      setMarketData(formattedPairs);
      setIsLive(true);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("❌ [MarketContext] Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");

      // Fallback to mock data on error
      console.log("🔄 [MarketContext] Falling back to mock data");
      setMarketData(MOCK_PAIRS);
      setIsLive(false);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch and auto-refresh
  useEffect(() => {
    console.log("🚀 [MarketContext] Mounted, triggering initial fetch");
    fetchMarketData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      console.log("⏰ [MarketContext] Auto-refresh triggered");
      fetchMarketData();
    }, 30000);

    return () => {
      console.log("🛑 [MarketContext] Unmounted, clearing interval");
      clearInterval(interval);
    };
  }, [fetchMarketData]);

  // Computed values
  const topGainer = marketData.length > 0
    ? marketData.reduce((best, curr) => (curr.priceChange24h > best.priceChange24h ? curr : best), marketData[0])
    : null;

  const topVolume = marketData.length > 0
    ? marketData.reduce((best, curr) => (curr.volume24h > best.volume24h ? curr : best), marketData[0])
    : null;

  const trendingToken = marketData.length > 0 ? marketData[0] : null;

  const getTokenByAddress = (address: string) => {
    return marketData.find((p) => p.tokenAddress === address);
  };

  const value: MarketContextType = {
    marketData,
    topGainer,
    topVolume,
    trendingToken,
    loading,
    error,
    lastUpdated,
    isLive,
    refresh: fetchMarketData,
    getTokenByAddress,
  };

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
}
