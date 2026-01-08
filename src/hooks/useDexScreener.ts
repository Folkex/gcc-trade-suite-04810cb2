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

interface DexScreenerBoostToken {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon?: string;
  description?: string;
  amount?: number;
  totalAmount?: number;
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

export function useDexScreener() {
  const [pairs, setPairs] = useState<DexScreenerPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchLatestTokens = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch latest boosted tokens
      const boostResponse = await fetch(
        "https://api.dexscreener.com/token-boosts/latest/v1"
      );

      if (!boostResponse.ok) {
        throw new Error("Failed to fetch boosted tokens");
      }

      const boostedTokens: DexScreenerBoostToken[] = await boostResponse.json();

      // Get unique token addresses by chain (limit to first 20)
      const tokensByChain = new Map<string, string[]>();
      const limitedTokens = boostedTokens.slice(0, 20);

      for (const token of limitedTokens) {
        const existing = tokensByChain.get(token.chainId) || [];
        if (!existing.includes(token.tokenAddress)) {
          existing.push(token.tokenAddress);
          tokensByChain.set(token.chainId, existing);
        }
      }

      // Fetch pair data for each token
      const pairPromises: Promise<DexScreenerPairData[]>[] = [];

      for (const [chainId, addresses] of tokensByChain) {
        // DexScreener supports multiple addresses comma-separated
        const addressBatch = addresses.join(",");
        pairPromises.push(
          fetch(
            `https://api.dexscreener.com/latest/dex/tokens/${addressBatch}`
          )
            .then((res) => res.json())
            .then((data) => data.pairs || [])
            .catch(() => [])
        );
      }

      const pairResults = await Promise.all(pairPromises);
      const allPairs = pairResults.flat();

      // Convert to our format, taking only the best pair per token
      const seenTokens = new Set<string>();
      const formattedPairs: DexScreenerPair[] = [];

      for (const pair of allPairs) {
        if (!pair.baseToken || seenTokens.has(pair.baseToken.address)) {
          continue;
        }
        seenTokens.add(pair.baseToken.address);

        const boostedToken = limitedTokens.find(
          (t) =>
            t.tokenAddress.toLowerCase() ===
            pair.baseToken.address.toLowerCase()
        );

        formattedPairs.push({
          id: pair.pairAddress,
          pairAddress: pair.pairAddress,
          tokenAddress: pair.baseToken.address,
          name: pair.baseToken.name || "Unknown",
          symbol: pair.baseToken.symbol || "???",
          chain: chainMap[pair.chainId] || pair.chainId.toUpperCase(),
          chainId: pair.chainId,
          launchedAt: pair.pairCreatedAt
            ? new Date(pair.pairCreatedAt)
            : new Date(),
          liquidity: pair.liquidity?.usd || 0,
          volume24h: pair.volume?.h24 || 0,
          priceUsd: parseFloat(pair.priceUsd) || 0,
          priceChange24h: pair.priceChange?.h24 || 0,
          buys24h: pair.txns?.h24?.buys || 0,
          sells24h: pair.txns?.h24?.sells || 0,
          icon: boostedToken?.icon || pair.info?.imageUrl,
          dexId: pair.dexId,
          url: pair.url,
        });
      }

      // Sort by volume descending
      formattedPairs.sort((a, b) => b.volume24h - a.volume24h);

      setPairs(formattedPairs);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("DexScreener fetch error:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLatestTokens();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchLatestTokens, 30000);
    return () => clearInterval(interval);
  }, [fetchLatestTokens]);

  return {
    pairs,
    loading,
    error,
    lastUpdated,
    refresh: fetchLatestTokens,
  };
}
