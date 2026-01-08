import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";

export type TokenSource = "new" | "trending";

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
  source: TokenSource; // "new" = from latest profiles, "trending" = from top boosts
  previousPrice?: number; // For tracking price changes
}

interface MarketContextType {
  // Data Streams
  newTokens: DexScreenerPair[]; // From token-profiles/latest
  trendingTokens: DexScreenerPair[]; // From token-boosts/top
  allTokens: DexScreenerPair[]; // Combined and deduplicated
  
  // Computed
  topGainer: DexScreenerPair | null;
  topVolume: DexScreenerPair | null;
  trendingToken: DexScreenerPair | null;
  
  // Legacy compatibility
  marketData: DexScreenerPair[];
  
  // State
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLive: boolean;
  
  // Actions
  refresh: () => Promise<void>;
  getTokenByAddress: (address: string) => DexScreenerPair | undefined;
  getAllTokens: () => DexScreenerPair[];
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

// Mock data fallback
const MOCK_NEW_TOKENS: DexScreenerPair[] = [
  {
    id: "mock-new-1",
    pairAddress: "new-1",
    tokenAddress: "NEW111111111111111111111111111111111111111",
    name: "Fresh Token",
    symbol: "FRESH",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(Date.now() - 60000), // 1 min ago
    liquidity: 50000,
    volume24h: 125000,
    priceUsd: 0.0001,
    priceChange24h: 150.5,
    buys24h: 500,
    sells24h: 50,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
    source: "new",
  },
  {
    id: "mock-new-2",
    pairAddress: "new-2",
    tokenAddress: "NEW222222222222222222222222222222222222222",
    name: "Just Launched",
    symbol: "JUST",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(Date.now() - 120000),
    liquidity: 25000,
    volume24h: 80000,
    priceUsd: 0.00005,
    priceChange24h: 89.2,
    buys24h: 320,
    sells24h: 30,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
    source: "new",
  },
];

const MOCK_TRENDING_TOKENS: DexScreenerPair[] = [
  {
    id: "mock-trend-1",
    pairAddress: "trend-1",
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
    source: "trending",
  },
  {
    id: "mock-trend-2",
    pairAddress: "trend-2",
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
    source: "trending",
  },
];

const MarketContext = createContext<MarketContextType | undefined>(undefined);

interface MarketProviderProps {
  children: ReactNode;
}

export function MarketProvider({ children }: MarketProviderProps) {
  const [newTokens, setNewTokens] = useState<DexScreenerPair[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<DexScreenerPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);
  
  // Track previous prices for flash animations
  const previousPricesRef = useRef<Map<string, number>>(new Map());
  const isInitialFetchRef = useRef(true);

  // Fetch token details by address to get price data
  const fetchTokenDetails = async (tokenAddress: string): Promise<Partial<DexScreenerPair> | null> => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      const pairs = data.pairs || [];
      if (pairs.length === 0) return null;
      
      // Get the pair with highest liquidity
      const bestPair = pairs.reduce((best: any, current: any) => {
        const currentLiq = current.liquidity?.usd || 0;
        const bestLiq = best.liquidity?.usd || 0;
        return currentLiq > bestLiq ? current : best;
      }, pairs[0]);
      
      return {
        pairAddress: bestPair.pairAddress,
        name: bestPair.baseToken?.name || "Unknown",
        symbol: bestPair.baseToken?.symbol || "???",
        liquidity: bestPair.liquidity?.usd || 0,
        volume24h: bestPair.volume?.h24 || 0,
        priceUsd: parseFloat(bestPair.priceUsd) || 0,
        priceChange24h: bestPair.priceChange?.h24 || 0,
        buys24h: bestPair.txns?.h24?.buys || 0,
        sells24h: bestPair.txns?.h24?.sells || 0,
        dexId: bestPair.dexId || "unknown",
        chainId: bestPair.chainId || "solana",
        chain: chainMap[bestPair.chainId] || bestPair.chainId?.toUpperCase() || "???",
        icon: bestPair.info?.imageUrl,
      };
    } catch {
      return null;
    }
  };

  // Fetch NEW tokens from token-profiles/latest
  const fetchNewTokens = useCallback(async (): Promise<DexScreenerPair[]> => {
    console.log("🆕 [MarketContext] Fetching NEW tokens...");
    
    try {
      const response = await fetch("https://api.dexscreener.com/token-profiles/latest/v1");
      
      if (!response.ok) {
        throw new Error(`New tokens API returned ${response.status}`);
      }
      
      const data = await response.json();
      console.log("📦 [MarketContext] New tokens received:", data?.length || 0);
      
      if (!Array.isArray(data) || data.length === 0) {
        return MOCK_NEW_TOKENS;
      }
      
      // Process tokens in parallel (limit to first 15 for performance)
      const tokenPromises = data.slice(0, 15).map(async (profile: any): Promise<DexScreenerPair | null> => {
        const tokenAddress = profile.tokenAddress || profile.address;
        if (!tokenAddress) return null;
        
        // Get previous price for flash animation
        const prevPrice = previousPricesRef.current.get(tokenAddress);
        
        // Fetch detailed token data
        const details = await fetchTokenDetails(tokenAddress);
        
        const token: DexScreenerPair = {
          id: `new-${tokenAddress}`,
          pairAddress: details?.pairAddress || tokenAddress,
          tokenAddress: tokenAddress,
          name: details?.name || profile.name || profile.header || "Unknown",
          symbol: details?.symbol || profile.symbol || "???",
          chain: details?.chain || chainMap[profile.chainId] || "SOL",
          chainId: details?.chainId || profile.chainId || "solana",
          launchedAt: new Date(),
          liquidity: details?.liquidity || 0,
          volume24h: details?.volume24h || 0,
          priceUsd: details?.priceUsd || 0,
          priceChange24h: details?.priceChange24h || 0,
          buys24h: details?.buys24h || 0,
          sells24h: details?.sells24h || 0,
          icon: details?.icon || profile.icon || profile.header,
          dexId: details?.dexId || "unknown",
          url: profile.url || `https://dexscreener.com/${profile.chainId}/${tokenAddress}`,
          source: "new",
          previousPrice: prevPrice,
        };
        
        // Store current price for next update
        if (token.priceUsd > 0) {
          previousPricesRef.current.set(tokenAddress, token.priceUsd);
        }
        
        return token;
      });
      
      const results = await Promise.all(tokenPromises);
      return results.filter((t): t is DexScreenerPair => t !== null && t.priceUsd > 0);
    } catch (err) {
      console.error("❌ [MarketContext] New tokens fetch error:", err);
      return MOCK_NEW_TOKENS;
    }
  }, []);

  // Fetch TRENDING tokens from token-boosts/top
  const fetchTrendingTokens = useCallback(async (): Promise<DexScreenerPair[]> => {
    console.log("🔥 [MarketContext] Fetching TRENDING tokens...");
    
    try {
      const response = await fetch("https://api.dexscreener.com/token-boosts/top/v1");
      
      if (!response.ok) {
        throw new Error(`Trending API returned ${response.status}`);
      }
      
      const data = await response.json();
      console.log("📦 [MarketContext] Trending tokens received:", data?.length || 0);
      
      if (!Array.isArray(data) || data.length === 0) {
        return MOCK_TRENDING_TOKENS;
      }
      
      // Process tokens in parallel (limit to first 20)
      const tokenPromises = data.slice(0, 20).map(async (boost: any): Promise<DexScreenerPair | null> => {
        const tokenAddress = boost.tokenAddress || boost.address;
        if (!tokenAddress) return null;
        
        // Get previous price for flash animation
        const prevPrice = previousPricesRef.current.get(tokenAddress);
        
        // Fetch detailed token data
        const details = await fetchTokenDetails(tokenAddress);
        
        const token: DexScreenerPair = {
          id: `trend-${tokenAddress}`,
          pairAddress: details?.pairAddress || tokenAddress,
          tokenAddress: tokenAddress,
          name: details?.name || boost.name || boost.description || "Unknown",
          symbol: details?.symbol || boost.symbol || "???",
          chain: details?.chain || chainMap[boost.chainId] || "SOL",
          chainId: details?.chainId || boost.chainId || "solana",
          launchedAt: new Date(),
          liquidity: details?.liquidity || 0,
          volume24h: details?.volume24h || 0,
          priceUsd: details?.priceUsd || 0,
          priceChange24h: details?.priceChange24h || 0,
          buys24h: details?.buys24h || 0,
          sells24h: details?.sells24h || 0,
          icon: details?.icon || boost.icon || boost.header,
          dexId: details?.dexId || "unknown",
          url: boost.url || `https://dexscreener.com/${boost.chainId}/${tokenAddress}`,
          source: "trending",
          previousPrice: prevPrice,
        };
        
        // Store current price for next update
        if (token.priceUsd > 0) {
          previousPricesRef.current.set(tokenAddress, token.priceUsd);
        }
        
        return token;
      });
      
      const results = await Promise.all(tokenPromises);
      return results.filter((t): t is DexScreenerPair => t !== null && t.priceUsd > 0);
    } catch (err) {
      console.error("❌ [MarketContext] Trending fetch error:", err);
      return MOCK_TRENDING_TOKENS;
    }
  }, []);

  // Main fetch function - fetches both streams in parallel
  const fetchMarketData = useCallback(async () => {
    const isInitial = isInitialFetchRef.current;
    if (isInitial) {
      console.log("🚀 [MarketContext] Initial fetch...");
      setLoading(true);
    } else {
      console.log("🔄 [MarketContext] Background refresh...");
    }
    setError(null);

    try {
      // Fetch both streams in parallel
      const [newData, trendingData] = await Promise.all([
        fetchNewTokens(),
        fetchTrendingTokens(),
      ]);
      
      console.log(`✅ [MarketContext] Fetched ${newData.length} new + ${trendingData.length} trending`);
      
      setNewTokens(newData);
      setTrendingTokens(trendingData);
      setIsLive(newData.length > 0 || trendingData.length > 0);
      setLastUpdated(new Date());
      isInitialFetchRef.current = false;
    } catch (err) {
      console.error("❌ [MarketContext] Fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
      
      // Fallback to mock data
      setNewTokens(MOCK_NEW_TOKENS);
      setTrendingTokens(MOCK_TRENDING_TOKENS);
      setIsLive(false);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, [fetchNewTokens, fetchTrendingTokens]);

  // Initial fetch and 3-second live polling
  useEffect(() => {
    console.log("🚀 [MarketContext] Starting live polling (3s interval)");
    fetchMarketData();

    // Live polling every 3 seconds
    const interval = setInterval(() => {
      fetchMarketData();
    }, 3000);

    return () => {
      console.log("🛑 [MarketContext] Stopping live polling");
      clearInterval(interval);
    };
  }, [fetchMarketData]);

  // Combine and deduplicate all tokens
  const allTokens = React.useMemo(() => {
    const seen = new Set<string>();
    const combined: DexScreenerPair[] = [];
    
    // Add trending first (they take priority)
    for (const token of trendingTokens) {
      if (!seen.has(token.tokenAddress)) {
        seen.add(token.tokenAddress);
        combined.push(token);
      }
    }
    
    // Add new tokens
    for (const token of newTokens) {
      if (!seen.has(token.tokenAddress)) {
        seen.add(token.tokenAddress);
        combined.push(token);
      }
    }
    
    return combined;
  }, [newTokens, trendingTokens]);

  // Legacy marketData for compatibility (trending first, then new)
  const marketData = allTokens;

  // Computed values
  const topGainer = allTokens.length > 0
    ? allTokens.reduce((best, curr) => (curr.priceChange24h > best.priceChange24h ? curr : best), allTokens[0])
    : null;

  const topVolume = allTokens.length > 0
    ? allTokens.reduce((best, curr) => (curr.volume24h > best.volume24h ? curr : best), allTokens[0])
    : null;

  const trendingToken = trendingTokens.length > 0 ? trendingTokens[0] : (allTokens[0] || null);

  const getTokenByAddress = useCallback((address: string) => {
    return allTokens.find((p) => p.tokenAddress === address);
  }, [allTokens]);

  const getAllTokens = useCallback(() => {
    return allTokens;
  }, [allTokens]);

  const value: MarketContextType = {
    newTokens,
    trendingTokens,
    allTokens,
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
    getAllTokens,
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
