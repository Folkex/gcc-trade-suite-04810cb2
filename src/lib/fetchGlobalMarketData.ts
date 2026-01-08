// ============================================
// MULTI-API FALLBACK SYSTEM FOR GLOBAL MARKET DATA
// Priority: 1. CoinGecko 2. CoinCap 3. CoinPaprika
// ============================================

export interface StandardizedAsset {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume: number;
}

export type DataSource = "CoinGecko" | "CoinCap" | "CoinPaprika" | "Cached";

export interface FetchResult {
  data: StandardizedAsset[];
  source: DataSource;
  timestamp: Date;
}

// Cached data for fallback
let cachedData: FetchResult | null = null;

// ============================================
// API RESPONSE TYPES
// ============================================
interface CoinGeckoAsset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

interface CoinCapAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  changePercent24Hr: string;
}

interface CoinPaprikaAsset {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  quotes: {
    USD: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_24h: number;
    };
  };
}

// ============================================
// MAPPER FUNCTIONS - Standardize all API responses
// ============================================
const mapCoinGecko = (assets: CoinGeckoAsset[]): StandardizedAsset[] => {
  return assets.map((asset) => ({
    id: asset.id,
    rank: asset.market_cap_rank || 0,
    symbol: asset.symbol.toUpperCase(),
    name: asset.name,
    price: asset.current_price || 0,
    priceChange24h: asset.price_change_percentage_24h || 0,
    marketCap: asset.market_cap || 0,
    volume: asset.total_volume || 0,
  }));
};

const mapCoinCap = (assets: CoinCapAsset[]): StandardizedAsset[] => {
  return assets.map((asset) => ({
    id: asset.id,
    rank: parseInt(asset.rank) || 0,
    symbol: asset.symbol.toUpperCase(),
    name: asset.name,
    price: parseFloat(asset.priceUsd) || 0,
    priceChange24h: parseFloat(asset.changePercent24Hr) || 0,
    marketCap: parseFloat(asset.marketCapUsd) || 0,
    volume: parseFloat(asset.volumeUsd24Hr) || 0,
  }));
};

const mapCoinPaprika = (assets: CoinPaprikaAsset[]): StandardizedAsset[] => {
  return assets.map((asset) => ({
    id: asset.id,
    rank: asset.rank || 0,
    symbol: asset.symbol.toUpperCase(),
    name: asset.name,
    price: asset.quotes?.USD?.price || 0,
    priceChange24h: asset.quotes?.USD?.percent_change_24h || 0,
    marketCap: asset.quotes?.USD?.market_cap || 0,
    volume: asset.quotes?.USD?.volume_24h || 0,
  }));
};

// ============================================
// INDIVIDUAL API FETCH FUNCTIONS
// ============================================
const fetchFromCoinGecko = async (limit: number): Promise<StandardizedAsset[]> => {
  console.log("🦎 [CoinGecko] Attempting fetch...");
  
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
    { 
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(10000) // 10s timeout
    }
  );

  if (!response.ok) {
    throw new Error(`CoinGecko API returned ${response.status}`);
  }

  const data: CoinGeckoAsset[] = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error("CoinGecko: Invalid response format");
  }

  console.log(`✅ [CoinGecko] Successfully fetched ${data.length} assets`);
  return mapCoinGecko(data);
};

const fetchFromCoinCap = async (limit: number): Promise<StandardizedAsset[]> => {
  console.log("🧢 [CoinCap] Attempting fetch...");
  
  const response = await fetch(
    `https://api.coincap.io/v2/assets?limit=${limit}`,
    { 
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(10000)
    }
  );

  if (!response.ok) {
    throw new Error(`CoinCap API returned ${response.status}`);
  }

  const json = await response.json();
  
  if (!json.data || !Array.isArray(json.data)) {
    throw new Error("CoinCap: Invalid response format");
  }

  console.log(`✅ [CoinCap] Successfully fetched ${json.data.length} assets`);
  return mapCoinCap(json.data);
};

const fetchFromCoinPaprika = async (limit: number): Promise<StandardizedAsset[]> => {
  console.log("🌶️ [CoinPaprika] Attempting fetch...");
  
  const response = await fetch(
    `https://api.coinpaprika.com/v1/tickers?limit=${limit}`,
    { 
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(10000)
    }
  );

  if (!response.ok) {
    throw new Error(`CoinPaprika API returned ${response.status}`);
  }

  const data: CoinPaprikaAsset[] = await response.json();
  
  if (!Array.isArray(data)) {
    throw new Error("CoinPaprika: Invalid response format");
  }

  console.log(`✅ [CoinPaprika] Successfully fetched ${data.length} assets`);
  return mapCoinPaprika(data);
};

// ============================================
// MAIN FALLBACK FUNCTION - Try-Catch-Try
// ============================================
export const fetchGlobalMarketData = async (limit: number = 50): Promise<FetchResult> => {
  const errors: string[] = [];

  // Priority 1: CoinGecko (Best Data)
  try {
    const data = await fetchFromCoinGecko(limit);
    const result: FetchResult = { data, source: "CoinGecko", timestamp: new Date() };
    cachedData = result;
    return result;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.warn(`⚠️ [CoinGecko] Failed: ${msg}, trying CoinCap...`);
    errors.push(`CoinGecko: ${msg}`);
  }

  // Priority 2: CoinCap (Fastest / No Key)
  try {
    const data = await fetchFromCoinCap(limit);
    const result: FetchResult = { data, source: "CoinCap", timestamp: new Date() };
    cachedData = result;
    return result;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.warn(`⚠️ [CoinCap] Failed: ${msg}, trying CoinPaprika...`);
    errors.push(`CoinCap: ${msg}`);
  }

  // Priority 3: CoinPaprika (Backup)
  try {
    const data = await fetchFromCoinPaprika(limit);
    const result: FetchResult = { data, source: "CoinPaprika", timestamp: new Date() };
    cachedData = result;
    return result;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.warn(`⚠️ [CoinPaprika] Failed: ${msg}`);
    errors.push(`CoinPaprika: ${msg}`);
  }

  // All APIs failed - return cached data if available
  if (cachedData) {
    console.warn("🔄 [Fallback] All APIs failed, returning cached data");
    return { ...cachedData, source: "Cached" };
  }

  // No cached data, throw error
  throw new Error(`All market data APIs failed:\n${errors.join("\n")}`);
};

// Export for testing/debugging
export const clearCache = () => {
  cachedData = null;
};
