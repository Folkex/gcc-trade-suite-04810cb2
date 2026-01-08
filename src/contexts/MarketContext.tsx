import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";

export type TokenSource = "new" | "trending" | "major";

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
  source: TokenSource;
  previousPrice?: number;
  marketCap?: number;
  fdv?: number;
}

interface MarketContextType {
  // Data Streams
  newTokens: DexScreenerPair[];
  trendingTokens: DexScreenerPair[];
  majorTokens: DexScreenerPair[];
  allTokens: DexScreenerPair[];
  
  // Computed
  topGainer: DexScreenerPair | null;
  topVolume: DexScreenerPair | null;
  trendingToken: DexScreenerPair | null;
  
  // Legacy compatibility
  marketData: DexScreenerPair[];
  
  // State
  loading: boolean;
  loadingMajor: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLive: boolean;
  
  // Actions
  refresh: () => Promise<void>;
  getTokenByAddress: (address: string) => DexScreenerPair | undefined;
  getAllTokens: () => DexScreenerPair[];
  searchTokens: (query: string) => DexScreenerPair[];
}

// ============================================
// MAJOR TOKEN ADDRESSES - Top 50 Tokens
// ============================================

// Solana Major Tokens
const SOLANA_MAJOR_TOKENS = [
  "So11111111111111111111111111111111111111112", // Wrapped SOL
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // BONK
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", // WIF (dogwifhat)
  "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", // JUP (Jupiter)
  "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R", // RAY (Raydium)
  "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs", // ORCA
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", // mSOL
  "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj", // stSOL
  "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3", // PYTH
  "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ", // W (Wormhole)
  "hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux", // HNT (Helium)
  "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof", // RNDR
  "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr", // POPCAT
  "MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5", // MEW
  "CATEtUxmTbZPH9mPCaFtnCFR7XYt3A1nBY3hcdwjEP3", // CATE
  "A3eME5CetyZPBoWbRUwY3tSe25S6tb18ba9ZPbWk9eFJ", // PENG
];

// Ethereum Major Tokens (with 0x prefix)
const ETH_MAJOR_TOKENS = [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
  "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
  "0x6B175474E89094C44Da98b954EesdfDCAD3F97fB12", // DAI
  "0x514910771AF9Ca656af840dff83E8264EcF986CA", // LINK
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", // UNI
  "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", // AAVE
  "0x6982508145454Ce325dDbE47a25d4ec3d2311933", // PEPE
  "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", // SHIB
  "0x4d224452801ACEd8B2F0aebE155379bb5D594381", // APE
  "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39", // HEX
  "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", // MATIC
  "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84", // stETH
  "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704", // cbETH
];

// Base Chain Major Tokens
const BASE_MAJOR_TOKENS = [
  "0x4200000000000000000000000000000000000006", // WETH on Base
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  "0x532f27101965dd16442E59d40670FaF5eBB142E4", // BRETT
  "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b", // TOSHI
  "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4", // NORMIE
];

// Combine all addresses with their chain IDs
const MAJOR_TOKEN_CONFIG: { address: string; chain: string }[] = [
  ...SOLANA_MAJOR_TOKENS.map(addr => ({ address: addr, chain: "solana" })),
  ...ETH_MAJOR_TOKENS.map(addr => ({ address: addr, chain: "ethereum" })),
  ...BASE_MAJOR_TOKENS.map(addr => ({ address: addr, chain: "base" })),
];

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
    launchedAt: new Date(Date.now() - 60000),
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
];

const MOCK_MAJOR_TOKENS: DexScreenerPair[] = [
  {
    id: "mock-major-1",
    pairAddress: "major-1",
    tokenAddress: "So11111111111111111111111111111111111111112",
    name: "Wrapped SOL",
    symbol: "SOL",
    chain: "SOL",
    chainId: "solana",
    launchedAt: new Date(),
    liquidity: 500000000,
    volume24h: 85000000,
    priceUsd: 185.42,
    priceChange24h: 3.24,
    buys24h: 124500,
    sells24h: 83200,
    dexId: "raydium",
    url: "https://dexscreener.com/solana/mock",
    source: "major",
    marketCap: 85000000000,
    fdv: 85000000000,
  },
  {
    id: "mock-major-2",
    pairAddress: "major-2",
    tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Wrapped Ether",
    symbol: "WETH",
    chain: "ETH",
    chainId: "ethereum",
    launchedAt: new Date(),
    liquidity: 2000000000,
    volume24h: 500000000,
    priceUsd: 3420.50,
    priceChange24h: 1.85,
    buys24h: 250000,
    sells24h: 180000,
    dexId: "uniswap",
    url: "https://dexscreener.com/ethereum/mock",
    source: "major",
    marketCap: 400000000000,
    fdv: 400000000000,
  },
];

const MarketContext = createContext<MarketContextType | undefined>(undefined);

interface MarketProviderProps {
  children: ReactNode;
}

export function MarketProvider({ children }: MarketProviderProps) {
  const [newTokens, setNewTokens] = useState<DexScreenerPair[]>([]);
  const [trendingTokens, setTrendingTokens] = useState<DexScreenerPair[]>([]);
  const [majorTokens, setMajorTokens] = useState<DexScreenerPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMajor, setLoadingMajor] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(false);
  
  const previousPricesRef = useRef<Map<string, number>>(new Map());
  const isInitialFetchRef = useRef(true);
  const isInitialMajorFetchRef = useRef(true);

  // Fetch token details by address
  const fetchTokenDetails = async (tokenAddress: string, chainId?: string): Promise<Partial<DexScreenerPair> | null> => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      const pairs = data.pairs || [];
      if (pairs.length === 0) return null;
      
      // Filter by chain if specified, then get highest liquidity pair
      const filteredPairs = chainId 
        ? pairs.filter((p: any) => p.chainId === chainId)
        : pairs;
      
      if (filteredPairs.length === 0) return null;
      
      const bestPair = filteredPairs.reduce((best: any, current: any) => {
        const currentLiq = current.liquidity?.usd || 0;
        const bestLiq = best.liquidity?.usd || 0;
        return currentLiq > bestLiq ? current : best;
      }, filteredPairs[0]);
      
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
        marketCap: bestPair.marketCap || bestPair.fdv || 0,
        fdv: bestPair.fdv || 0,
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
      
      const tokenPromises = data.slice(0, 15).map(async (profile: any): Promise<DexScreenerPair | null> => {
        const tokenAddress = profile.tokenAddress || profile.address;
        if (!tokenAddress) return null;
        
        const prevPrice = previousPricesRef.current.get(tokenAddress);
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
          marketCap: details?.marketCap,
          fdv: details?.fdv,
        };
        
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
      
      const tokenPromises = data.slice(0, 20).map(async (boost: any): Promise<DexScreenerPair | null> => {
        const tokenAddress = boost.tokenAddress || boost.address;
        if (!tokenAddress) return null;
        
        const prevPrice = previousPricesRef.current.get(tokenAddress);
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
          marketCap: details?.marketCap,
          fdv: details?.fdv,
        };
        
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

  // Fetch MAJOR tokens - The Giants
  const fetchMajorTokens = useCallback(async (): Promise<DexScreenerPair[]> => {
    console.log("🏛️ [MarketContext] Fetching MAJOR tokens...");
    
    try {
      // Split into batches to avoid URL length issues
      const batchSize = 15;
      const allTokens: DexScreenerPair[] = [];
      
      for (let i = 0; i < MAJOR_TOKEN_CONFIG.length; i += batchSize) {
        const batch = MAJOR_TOKEN_CONFIG.slice(i, i + batchSize);
        
        const tokenPromises = batch.map(async ({ address, chain }): Promise<DexScreenerPair | null> => {
          const prevPrice = previousPricesRef.current.get(address);
          const details = await fetchTokenDetails(address, chain);
          
          if (!details || !details.priceUsd || details.priceUsd === 0) return null;
          
          const token: DexScreenerPair = {
            id: `major-${address}`,
            pairAddress: details.pairAddress || address,
            tokenAddress: address,
            name: details.name || "Unknown",
            symbol: details.symbol || "???",
            chain: details.chain || chainMap[chain] || chain.toUpperCase(),
            chainId: details.chainId || chain,
            launchedAt: new Date(),
            liquidity: details.liquidity || 0,
            volume24h: details.volume24h || 0,
            priceUsd: details.priceUsd || 0,
            priceChange24h: details.priceChange24h || 0,
            buys24h: details.buys24h || 0,
            sells24h: details.sells24h || 0,
            icon: details.icon,
            dexId: details.dexId || "unknown",
            url: `https://dexscreener.com/${chain}/${address}`,
            source: "major",
            previousPrice: prevPrice,
            marketCap: details.marketCap || 0,
            fdv: details.fdv || 0,
          };
          
          if (token.priceUsd > 0) {
            previousPricesRef.current.set(address, token.priceUsd);
          }
          
          return token;
        });
        
        const results = await Promise.all(tokenPromises);
        allTokens.push(...results.filter((t): t is DexScreenerPair => t !== null));
      }
      
      // Sort by market cap descending
      allTokens.sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
      
      console.log(`✅ [MarketContext] Fetched ${allTokens.length} major tokens`);
      return allTokens.length > 0 ? allTokens : MOCK_MAJOR_TOKENS;
    } catch (err) {
      console.error("❌ [MarketContext] Major tokens fetch error:", err);
      return MOCK_MAJOR_TOKENS;
    }
  }, []);

  // Main fetch function - fetches new and trending in parallel (3s interval)
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
      setNewTokens(MOCK_NEW_TOKENS);
      setTrendingTokens(MOCK_TRENDING_TOKENS);
      setIsLive(false);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  }, [fetchNewTokens, fetchTrendingTokens]);

  // Major tokens fetch (10s interval - less frequent)
  const fetchMajorData = useCallback(async () => {
    const isInitial = isInitialMajorFetchRef.current;
    if (isInitial) {
      console.log("🏛️ [MarketContext] Initial major tokens fetch...");
      setLoadingMajor(true);
    }

    try {
      const majorData = await fetchMajorTokens();
      setMajorTokens(majorData);
      isInitialMajorFetchRef.current = false;
    } catch (err) {
      console.error("❌ [MarketContext] Major fetch error:", err);
      setMajorTokens(MOCK_MAJOR_TOKENS);
    } finally {
      setLoadingMajor(false);
    }
  }, [fetchMajorTokens]);

  // Initial fetch and 3-second live polling for new/trending
  useEffect(() => {
    console.log("🚀 [MarketContext] Starting live polling (3s interval)");
    fetchMarketData();

    const interval = setInterval(() => {
      fetchMarketData();
    }, 3000);

    return () => {
      console.log("🛑 [MarketContext] Stopping live polling");
      clearInterval(interval);
    };
  }, [fetchMarketData]);

  // Major tokens polling (10s interval)
  useEffect(() => {
    console.log("🏛️ [MarketContext] Starting major tokens polling (10s interval)");
    fetchMajorData();

    const interval = setInterval(() => {
      fetchMajorData();
    }, 10000);

    return () => {
      console.log("🛑 [MarketContext] Stopping major tokens polling");
      clearInterval(interval);
    };
  }, [fetchMajorData]);

  // Combine and deduplicate all tokens
  const allTokens = React.useMemo(() => {
    const seen = new Set<string>();
    const combined: DexScreenerPair[] = [];
    
    // Add major tokens first (highest priority)
    for (const token of majorTokens) {
      if (!seen.has(token.tokenAddress)) {
        seen.add(token.tokenAddress);
        combined.push(token);
      }
    }
    
    // Add trending tokens
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
  }, [newTokens, trendingTokens, majorTokens]);

  // Legacy marketData for compatibility
  const marketData = React.useMemo(() => {
    // Return trending + new (not major for sniper view)
    const seen = new Set<string>();
    const combined: DexScreenerPair[] = [];
    
    for (const token of trendingTokens) {
      if (!seen.has(token.tokenAddress)) {
        seen.add(token.tokenAddress);
        combined.push(token);
      }
    }
    
    for (const token of newTokens) {
      if (!seen.has(token.tokenAddress)) {
        seen.add(token.tokenAddress);
        combined.push(token);
      }
    }
    
    return combined;
  }, [newTokens, trendingTokens]);

  // Computed values
  const topGainer = allTokens.length > 0
    ? allTokens.reduce((best, curr) => (curr.priceChange24h > best.priceChange24h ? curr : best), allTokens[0])
    : null;

  const topVolume = allTokens.length > 0
    ? allTokens.reduce((best, curr) => (curr.volume24h > best.volume24h ? curr : best), allTokens[0])
    : null;

  const trendingToken = trendingTokens.length > 0 ? trendingTokens[0] : (allTokens[0] || null);

  const getTokenByAddress = useCallback((address: string) => {
    return allTokens.find((p) => 
      p.tokenAddress.toLowerCase() === address.toLowerCase()
    );
  }, [allTokens]);

  const getAllTokens = useCallback(() => {
    return allTokens;
  }, [allTokens]);

  // Search across all tokens
  const searchTokens = useCallback((query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    
    return allTokens.filter(token => 
      token.symbol.toLowerCase().includes(q) ||
      token.name.toLowerCase().includes(q) ||
      token.tokenAddress.toLowerCase().includes(q)
    );
  }, [allTokens]);

  const value: MarketContextType = {
    newTokens,
    trendingTokens,
    majorTokens,
    allTokens,
    marketData,
    topGainer,
    topVolume,
    trendingToken,
    loading,
    loadingMajor,
    error,
    lastUpdated,
    isLive,
    refresh: fetchMarketData,
    getTokenByAddress,
    getAllTokens,
    searchTokens,
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