import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink, 
  RefreshCw,
  Globe,
  AlertCircle,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  fetchGlobalMarketData, 
  StandardizedAsset, 
  DataSource 
} from "@/lib/fetchGlobalMarketData";

// ============================================
// SYMBOL TO ADDRESS MAPPING - The Bridge
// ============================================
const SYMBOL_TO_ADDRESS: Record<string, { address: string; chain: string }> = {
  // Major Cryptocurrencies
  BTC: { address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", chain: "ethereum" }, // WBTC
  ETH: { address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chain: "ethereum" }, // WETH
  SOL: { address: "So11111111111111111111111111111111111111112", chain: "solana" }, // Wrapped SOL
  USDT: { address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", chain: "ethereum" },
  USDC: { address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", chain: "ethereum" },
  BNB: { address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", chain: "ethereum" },
  XRP: { address: "0x1d2F0da169ceB9fC7B3144628dB156f3F6c60dBE", chain: "bsc" }, // Pegged XRP on BSC
  ADA: { address: "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47", chain: "bsc" }, // Pegged ADA on BSC
  DOGE: { address: "0xbA2aE424d960c26247Dd6c32edC70B295c744C43", chain: "bsc" }, // Pegged DOGE
  TRX: { address: "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B", chain: "bsc" },
  TON: { address: "0x76A797A59Ba2C17726896976B7B3747BfD1d220f", chain: "bsc" },
  SHIB: { address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", chain: "ethereum" },
  AVAX: { address: "0x85f138bfEE4ef8e540890CFb48F620571d67Eda3", chain: "ethereum" },
  LINK: { address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", chain: "ethereum" },
  DOT: { address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402", chain: "bsc" },
  MATIC: { address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", chain: "ethereum" },
  UNI: { address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", chain: "ethereum" },
  LTC: { address: "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94", chain: "bsc" },
  ATOM: { address: "0x0Eb3a705fc54725037CC9e008bDede697f62F335", chain: "bsc" },
  XLM: { address: "0x43C934A845205F0b514417d757d7235B8f53f1B9", chain: "bsc" },
  PEPE: { address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933", chain: "ethereum" },
  APE: { address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381", chain: "ethereum" },
  AAVE: { address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9", chain: "ethereum" },
  MKR: { address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2", chain: "ethereum" },
  CRV: { address: "0xD533a949740bb3306d119CC777fa900bA034cd52", chain: "ethereum" },
  LDO: { address: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32", chain: "ethereum" },
  ARB: { address: "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1", chain: "ethereum" },
  OP: { address: "0x4200000000000000000000000000000000000042", chain: "optimism" },
  INJ: { address: "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30", chain: "ethereum" },
  BONK: { address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", chain: "solana" },
  WIF: { address: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm", chain: "solana" },
  JUP: { address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", chain: "solana" },
  RAY: { address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R", chain: "solana" },
};

// Get tradeable address for a symbol
export const getTradeableAddress = (symbol: string): { address: string; chain: string } | null => {
  const upperSymbol = symbol.toUpperCase();
  return SYMBOL_TO_ADDRESS[upperSymbol] || null;
};

interface GlobalLeaderboardProps {
  limit?: number;
  compact?: boolean;
  showHeader?: boolean;
}

const formatPrice = (price: number) => {
  if (isNaN(price) || price === 0) return "$0.00";
  if (price < 0.00001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 1000) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const formatMarketCap = (value: number) => {
  if (isNaN(value) || value === 0) return "—";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

// Source badge color mapping
const getSourceColor = (source: DataSource) => {
  switch (source) {
    case "CoinGecko": return "text-green-400 border-green-400/30";
    case "CoinCap": return "text-blue-400 border-blue-400/30";
    case "CoinPaprika": return "text-orange-400 border-orange-400/30";
    case "Cached": return "text-yellow-400 border-yellow-400/30";
    default: return "text-muted-foreground border-border";
  }
};

const GlobalLeaderboard = ({ limit = 50, compact = false, showHeader = true }: GlobalLeaderboardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assets, setAssets] = useState<StandardizedAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [dataSource, setDataSource] = useState<DataSource>("CoinCap");

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchGlobalMarketData(limit);
      setAssets(result.data);
      setDataSource(result.source);
      setLastUpdated(result.timestamp);
      setError(null);
    } catch (err) {
      console.error("❌ [GlobalLeaderboard] All APIs failed:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  // Initial fetch and 15-second polling
  useEffect(() => {
    console.log("🌐 [GlobalLeaderboard] Starting multi-API polling (15s interval)");
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  const handleAssetClick = (asset: StandardizedAsset) => {
    const tradeable = getTradeableAddress(asset.symbol);
    
    if (tradeable) {
      navigate(`/trade?token=${tradeable.address}&chain=${tradeable.chain}`);
    } else {
      toast({
        title: "Chart View Only",
        description: `${asset.name} (${asset.symbol}) is not available for DEX trading.`,
        action: (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://coincap.io/assets/${asset.id}`, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View Chart
          </Button>
        ),
      });
    }
  };

  if (loading && assets.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        {showHeader && (
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="h-5 w-5 text-amber-500" />
              Global Market Leaderboard
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {[...Array(compact ? 10 : 20)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3">
                <div className="col-span-1">
                  <Skeleton className="h-5 w-6" />
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="col-span-3 hidden sm:flex justify-end">
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && assets.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        {showHeader && (
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="h-5 w-5 text-amber-500" />
              Global Market Leaderboard
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className="py-12 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
          <p className="text-muted-foreground mb-4 text-sm">{error}</p>
          <Button variant="outline" onClick={() => fetchData()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/50">
      {showHeader && (
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Crown className="h-5 w-5 text-amber-500" />
              Global Market Leaderboard
              <Badge variant="outline" className={`ml-2 text-[10px] font-normal ${getSourceColor(dataSource)}`}>
                <Database className="h-3 w-3 mr-1" />
                {dataSource}
              </Badge>
            </CardTitle>
            {lastUpdated && (
              <span className="text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0">
        {/* Table Header */}
        <div className={`grid ${compact ? "grid-cols-10" : "grid-cols-12"} gap-4 px-4 py-2 border-b border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground`}>
          <div className="col-span-1">#</div>
          <div className={compact ? "col-span-3" : "col-span-4"}>Name</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">24h %</div>
          {!compact && <div className="col-span-3 text-right hidden sm:block">Market Cap</div>}
          {compact && <div className="col-span-2 text-right hidden sm:block">Mkt Cap</div>}
        </div>

        {/* Asset Rows */}
        <div className="divide-y divide-border/30 max-h-[600px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {assets.slice(0, compact ? 10 : limit).map((asset, index) => {
              const change = asset.priceChange24h;
              const isPositive = change >= 0;
              const tradeable = getTradeableAddress(asset.symbol);
              
              return (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => handleAssetClick(asset)}
                  className={`grid ${compact ? "grid-cols-10" : "grid-cols-12"} gap-4 px-4 py-3 hover:bg-secondary/30 cursor-pointer transition-colors group`}
                >
                  {/* Rank */}
                  <div className="col-span-1 flex items-center">
                    <span className={`text-sm font-bold ${
                      asset.rank <= 3 ? "text-amber-500" : "text-muted-foreground"
                    }`}>
                      {asset.rank}
                    </span>
                  </div>

                  {/* Name & Symbol */}
                  <div className={`${compact ? "col-span-3" : "col-span-4"} flex items-center gap-3`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center ring-1 ring-border/50">
                      <span className="text-xs font-bold text-primary">
                        {asset.symbol.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm truncate">{asset.symbol}</span>
                        {tradeable && (
                          <Badge variant="outline" className="text-[9px] px-1 py-0 text-success border-success/30">
                            DEX
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate block">
                        {asset.name}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 flex items-center justify-end">
                    <span className="font-mono text-sm font-medium">
                      {formatPrice(asset.price)}
                    </span>
                  </div>

                  {/* 24h Change */}
                  <div className="col-span-2 flex items-center justify-end">
                    <span className={`flex items-center gap-1 font-mono text-sm font-medium ${
                      isPositive ? "text-success" : "text-destructive"
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5" />
                      )}
                      {isPositive ? "+" : ""}{change.toFixed(2)}%
                    </span>
                  </div>

                  {/* Market Cap */}
                  <div className={`${compact ? "col-span-2" : "col-span-3"} hidden sm:flex items-center justify-end gap-2`}>
                    <span className="font-mono text-sm text-muted-foreground">
                      {formatMarketCap(asset.marketCap)}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalLeaderboard;