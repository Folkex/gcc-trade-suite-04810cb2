import { useState, useEffect, useCallback } from "react";

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

interface DexScreenerPairData {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns?: {
    h24?: { buys: number; sells: number };
    h6?: { buys: number; sells: number };
    h1?: { buys: number; sells: number };
    m5?: { buys: number; sells: number };
  };
  volume?: {
    h24?: number;
    h6?: number;
    h1?: number;
    m5?: number;
  };
  priceChange?: {
    h24?: number;
    h6?: number;
    h1?: number;
    m5?: number;
  };
  liquidity?: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv?: number;
  pairCreatedAt?: number;
  info?: {
    imageUrl?: string;
  };
  boosts?: {
    active: number;
  };
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

export function useDexScreener() {
  const [pairs, setPairs] = useState<DexScreenerPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchLatestTokens = useCallback(async () => {
    console.log("🔄 Fetching DexScreener data...");
    setLoading(true);
    setError(null);
    setUsingMockData(false);

    try {
      // Use search endpoint with "solana" to guarantee results
      const searchUrl = "https://api.dexscreener.com/latest/dex/search?q=solana";
      console.log("📡 Requesting:", searchUrl);
      
      const response = await fetch(searchUrl);
      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 Data received:", data);

      const allPairs: DexScreenerPairData[] = data.pairs || [];
      console.log("📊 Total pairs found:", allPairs.length);

      if (allPairs.length === 0) {
        console.warn("⚠️ No pairs returned from API, using mock data");
        setPairs(MOCK_PAIRS);
        setUsingMockData(true);
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
          launchedAt: pair.pairCreatedAt
            ? new Date(pair.pairCreatedAt)
            : new Date(),
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

      console.log("✅ Formatted pairs:", formattedPairs.length);

      // Sort by volume descending
      formattedPairs.sort((a, b) => b.volume24h - a.volume24h);

      setPairs(formattedPairs);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("❌ DexScreener fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      
      // Fallback to mock data on error
      console.log("🔄 Falling back to mock data");
      setPairs(MOCK_PAIRS);
      setUsingMockData(true);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("🚀 useDexScreener mounted, triggering initial fetch");
    fetchLatestTokens();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      console.log("⏰ Auto-refresh triggered");
      fetchLatestTokens();
    }, 30000);
    
    return () => {
      console.log("🛑 useDexScreener unmounted, clearing interval");
      clearInterval(interval);
    };
  }, [fetchLatestTokens]);

  return {
    pairs,
    loading,
    error,
    lastUpdated,
    usingMockData,
    refresh: fetchLatestTokens,
  };
}

// Hook to fetch a single token by address
export function useDexScreenerToken(tokenAddress: string | null, chainId: string = "solana") {
  const [token, setToken] = useState<DexScreenerPair | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = useCallback(async () => {
    if (!tokenAddress) {
      console.log("⚠️ No token address provided");
      setLoading(false);
      return;
    }

    console.log("🔄 Fetching token data for:", tokenAddress);
    setLoading(true);
    setError(null);

    try {
      // Use the tokens endpoint to get data for a specific token
      const tokenUrl = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
      console.log("📡 Requesting:", tokenUrl);

      const response = await fetch(tokenUrl);
      console.log("📥 Response status:", response.status);

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      console.log("📦 Token data received:", data);

      const pairs: DexScreenerPairData[] = data.pairs || [];
      
      if (pairs.length === 0) {
        throw new Error("Token not found");
      }

      // Get the pair with highest liquidity
      const bestPair = pairs.reduce((best, current) => {
        const currentLiq = current.liquidity?.usd || 0;
        const bestLiq = best.liquidity?.usd || 0;
        return currentLiq > bestLiq ? current : best;
      }, pairs[0]);

      const formattedToken: DexScreenerPair = {
        id: bestPair.pairAddress,
        pairAddress: bestPair.pairAddress,
        tokenAddress: bestPair.baseToken.address,
        name: bestPair.baseToken.name || "Unknown",
        symbol: bestPair.baseToken.symbol || "???",
        chain: chainMap[bestPair.chainId] || bestPair.chainId?.toUpperCase() || "???",
        chainId: bestPair.chainId || "unknown",
        launchedAt: bestPair.pairCreatedAt
          ? new Date(bestPair.pairCreatedAt)
          : new Date(),
        liquidity: bestPair.liquidity?.usd || 0,
        volume24h: bestPair.volume?.h24 || 0,
        priceUsd: parseFloat(bestPair.priceUsd) || 0,
        priceChange24h: bestPair.priceChange?.h24 || 0,
        buys24h: bestPair.txns?.h24?.buys || 0,
        sells24h: bestPair.txns?.h24?.sells || 0,
        icon: bestPair.info?.imageUrl,
        dexId: bestPair.dexId || "unknown",
        url: bestPair.url || "",
      };

      console.log("✅ Token formatted:", formattedToken);
      setToken(formattedToken);
    } catch (err) {
      console.error("❌ Token fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  }, [tokenAddress, chainId]);

  useEffect(() => {
    fetchToken();

    // Auto-refresh every 15 seconds for live price updates
    const interval = setInterval(fetchToken, 15000);
    return () => clearInterval(interval);
  }, [fetchToken]);

  return { token, loading, error, refresh: fetchToken };
}
