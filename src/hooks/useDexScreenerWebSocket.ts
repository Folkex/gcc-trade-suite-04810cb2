import { useState, useEffect, useCallback, useRef } from "react";

interface PriceUpdate {
  price: number;
  priceChange24h: number;
  volume24h: number;
  timestamp: Date;
}

// DexScreener doesn't have a public WebSocket API, so we'll use fast polling (3 seconds)
// as a real-time simulation. For production, you'd integrate with a proper WebSocket provider.
export function useDexScreenerRealtime(
  tokenAddress: string | null,
  enabled: boolean = true
) {
  const [priceData, setPriceData] = useState<PriceUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const previousPriceRef = useRef<number | null>(null);

  const fetchPrice = useCallback(async () => {
    if (!tokenAddress) return;

    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      
      if (!response.ok) return;

      const data = await response.json();
      const pairs = data.pairs || [];
      
      if (pairs.length === 0) return;

      // Get the pair with highest liquidity
      const bestPair = pairs.reduce((best: any, current: any) => {
        const currentLiq = current.liquidity?.usd || 0;
        const bestLiq = best.liquidity?.usd || 0;
        return currentLiq > bestLiq ? current : best;
      }, pairs[0]);

      const newPrice = parseFloat(bestPair.priceUsd) || 0;
      const now = new Date();

      setPriceData({
        price: newPrice,
        priceChange24h: bestPair.priceChange?.h24 || 0,
        volume24h: bestPair.volume?.h24 || 0,
        timestamp: now,
      });

      setLastUpdate(now);
      previousPriceRef.current = newPrice;
    } catch (err) {
      console.error("Realtime fetch error:", err);
    }
  }, [tokenAddress]);

  const connect = useCallback(() => {
    if (!tokenAddress || !enabled) return;

    console.log("🔴 Starting realtime price updates for:", tokenAddress);
    setIsConnected(true);

    // Initial fetch
    fetchPrice();

    // Fast polling every 3 seconds for near-realtime updates
    intervalRef.current = setInterval(fetchPrice, 3000);
  }, [tokenAddress, enabled, fetchPrice]);

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsConnected(false);
    console.log("🔴 Stopped realtime price updates");
  }, []);

  useEffect(() => {
    if (enabled && tokenAddress) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [tokenAddress, enabled, connect, disconnect]);

  return {
    priceData,
    isConnected,
    lastUpdate,
    connect,
    disconnect,
  };
}
