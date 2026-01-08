import { useState, useCallback } from "react";
import { DexScreenerPair } from "./useDexScreener";

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
  };
  volume?: {
    h24?: number;
  };
  priceChange?: {
    h24?: number;
  };
  liquidity?: {
    usd: number;
  };
  pairCreatedAt?: number;
  info?: {
    imageUrl?: string;
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

export function useDexScreenerSearch() {
  const [results, setResults] = useState<DexScreenerPair[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    console.log("🔍 Searching tokens:", query);
    setLoading(true);
    setError(null);

    try {
      const searchUrl = `https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      const pairs: DexScreenerPairData[] = data.pairs || [];

      // Get unique tokens by address
      const seenTokens = new Set<string>();
      const formattedResults: DexScreenerPair[] = [];

      for (const pair of pairs) {
        if (!pair.baseToken || seenTokens.has(pair.baseToken.address)) {
          continue;
        }
        seenTokens.add(pair.baseToken.address);

        formattedResults.push({
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

        if (formattedResults.length >= 10) break;
      }

      console.log("✅ Search results:", formattedResults.length);
      setResults(formattedResults);
    } catch (err) {
      console.error("❌ Search error:", err);
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clearResults };
}
