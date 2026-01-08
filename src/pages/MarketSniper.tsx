import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crosshair, 
  Clock, 
  Droplets, 
  Flame, 
  Shield, 
  TrendingUp,
  TrendingDown,
  Zap,
  ShoppingCart,
  ExternalLink,
  RefreshCw,
  Volume2,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import QuickTradeModal from "@/components/trade/QuickTradeModal";
import { useMarket, DexScreenerPair } from "@/contexts/MarketContext";

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  SOL: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  BSC: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  ARB: "bg-blue-400/20 text-blue-400 border-blue-400/30",
  BASE: "bg-blue-600/20 text-blue-600 border-blue-600/30",
  MATIC: "bg-purple-400/20 text-purple-400 border-purple-400/30",
  AVAX: "bg-red-500/20 text-red-500 border-red-500/30",
  OP: "bg-red-400/20 text-red-400 border-red-400/30",
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const formatLiquidity = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

const formatPrice = (price: number) => {
  if (price < 0.00001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
};

// Price cell with flash animation on change
const PriceCell = ({ price, previousPrice }: { price: number; previousPrice?: number }) => {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPriceRef = useRef<number | undefined>(previousPrice);
  
  useEffect(() => {
    if (prevPriceRef.current !== undefined && price !== prevPriceRef.current) {
      if (price > prevPriceRef.current) {
        setFlash('up');
      } else if (price < prevPriceRef.current) {
        setFlash('down');
      }
      const timeout = setTimeout(() => setFlash(null), 500);
      return () => clearTimeout(timeout);
    }
    prevPriceRef.current = price;
  }, [price]);
  
  return (
    <span 
      className={`transition-all duration-300 ${
        flash === 'up' 
          ? 'text-success bg-success/20 px-1 rounded scale-105' 
          : flash === 'down' 
            ? 'text-destructive bg-destructive/20 px-1 rounded scale-105' 
            : ''
      }`}
    >
      {formatPrice(price)}
    </span>
  );
};

const TableSkeleton = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Skeleton className="h-5 w-12" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-7 w-16" />
        </TableCell>
      </TableRow>
    ))}
  </>
);

const MarketSniper = () => {
  const { marketData: pairs, loading, error, lastUpdated, isLive, refresh } = useMarket();
  const usingMockData = !isLive;
  const [quickTradeToken, setQuickTradeToken] = useState<DexScreenerPair | null>(null);
  const [chainFilter, setChainFilter] = useState<string>("all");
  const [minLiquidity, setMinLiquidity] = useState("");
  const [soundAlerts, setSoundAlerts] = useState(false);
  const navigate = useNavigate();

  const filteredPairs = pairs
    .filter((p) => chainFilter === "all" || p.chain === chainFilter)
    .filter((p) => !minLiquidity || p.liquidity >= parseInt(minLiquidity) * 1000);

  const handleRowClick = (pair: DexScreenerPair) => {
    navigate(`/trade?token=${pair.tokenAddress}&chain=${pair.chainId}`);
  };

  const handleQuickBuy = (e: React.MouseEvent, pair: DexScreenerPair) => {
    e.stopPropagation();
    setQuickTradeToken(pair);
  };

  // Calculate stats from real data
  const avgLiquidity = pairs.length > 0 
    ? pairs.reduce((sum, p) => sum + p.liquidity, 0) / pairs.length 
    : 0;
  const gainers = pairs.filter(p => p.priceChange24h > 50).length;

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/25">
              <Crosshair className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
                MARKET_SNIPER<span className="text-primary animate-pulse">_</span>
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                // Real-time DexScreener data • Click any row to trade
              </p>
            </div>
            {lastUpdated && (
              <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                Updated {getTimeAgo(lastUpdated)}
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Boosted Tokens", value: loading ? "..." : pairs.length.toString(), icon: Flame, color: "text-orange-500" },
            { label: "Avg Liquidity", value: loading ? "..." : formatLiquidity(avgLiquidity), icon: Droplets, color: "text-blue-500" },
            { label: "Hot Gainers", value: loading ? "..." : gainers.toString(), icon: TrendingUp, color: "text-success" },
            { label: "Chains Active", value: loading ? "..." : [...new Set(pairs.map(p => p.chain))].length.toString(), icon: Shield, color: "text-primary" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="text-xs text-muted-foreground font-mono uppercase">
                      {stat.label}
                    </span>
                  </div>
                  <p className={`text-2xl font-bold font-mono mt-2 ${stat.color}`}>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                {/* First row on mobile */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Sound Alerts */}
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="sound-alerts" className="text-xs sm:text-sm font-mono whitespace-nowrap">
                      Alerts
                    </Label>
                    <Switch
                      id="sound-alerts"
                      checked={soundAlerts}
                      onCheckedChange={setSoundAlerts}
                    />
                  </div>
                </div>

                {/* Second row on mobile */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Chain Filter */}
                  <Select value={chainFilter} onValueChange={setChainFilter}>
                    <SelectTrigger className="w-[100px] sm:w-[120px] h-8 font-mono text-xs">
                      <SelectValue placeholder="Chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Chains</SelectItem>
                      <SelectItem value="SOL">Solana</SelectItem>
                      <SelectItem value="ETH">Ethereum</SelectItem>
                      <SelectItem value="BSC">BSC</SelectItem>
                      <SelectItem value="BASE">Base</SelectItem>
                      <SelectItem value="ARB">Arbitrum</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Min Liquidity */}
                  <Input
                    type="number"
                    placeholder="Min Liq (K)"
                    value={minLiquidity}
                    onChange={(e) => setMinLiquidity(e.target.value)}
                    className="w-[90px] sm:w-[100px] h-8 font-mono text-xs"
                  />

                  {/* Refresh - mobile */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:hidden"
                    onClick={refresh}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>

                <div className="hidden sm:block flex-1" />

                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-mono"
                    onClick={refresh}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>

                  <Button
                    variant="outline"
                    className="font-mono"
                    onClick={() => navigate("/gem-finder")}
                  >
                    <Crosshair className="h-4 w-4 mr-2" />
                    GEM_FINDER
                  </Button>
                  <Button
                    className="font-mono"
                    onClick={() => navigate("/trade")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    TERMINAL
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Card className="border-destructive/50 bg-destructive/10">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div className="flex-1">
                  <p className="font-mono text-sm text-destructive">⚠️ API Connection Failed: {error}</p>
                  <p className="text-xs text-muted-foreground">Using mock data. Check console for details.</p>
                </div>
                <Button variant="outline" size="sm" onClick={refresh}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Mock Data Warning */}
        {usingMockData && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Card className="border-warning/50 bg-warning/10">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-warning" />
                <div className="flex-1">
                  <p className="font-mono text-sm text-warning">⚠️ Using Mock Data</p>
                  <p className="text-xs text-muted-foreground">API returned no results. Displaying sample data.</p>
                </div>
                <Button variant="outline" size="sm" onClick={refresh}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Live Pairs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-0 border-b">
              <div className="flex items-center gap-2">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                )}
                <CardTitle className="font-mono text-lg">LIVE_BOOSTED_TOKENS</CardTitle>
                <Badge variant="outline" className="ml-auto font-mono text-xs">
                  {filteredPairs.length} results
                </Badge>
              </div>
              <CardDescription className="font-mono text-xs">
                // Powered by DexScreener API • Click any row to trade
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">TOKEN</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden sm:table-cell">TYPE</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden sm:table-cell">CHAIN</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden md:table-cell">AGE</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">PRICE</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">LIQ</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden lg:table-cell">VOL 24H</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden lg:table-cell">B/S</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">24H</TableHead>
                      <TableHead className="font-mono text-xs text-primary text-right whitespace-nowrap">ACT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableSkeleton />
                    ) : filteredPairs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8">
                          <p className="text-muted-foreground font-mono">No tokens found matching your filters</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <AnimatePresence>
                        {filteredPairs.map((pair, index) => (
                          <motion.tr
                            key={pair.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.02 }}
                            className="border-b hover:bg-muted/50 cursor-pointer group"
                            onClick={() => handleRowClick(pair)}
                          >
                            <TableCell className="font-mono">
                              <div className="flex items-center gap-2">
                                {pair.icon ? (
                                  <img 
                                    src={pair.icon} 
                                    alt={pair.symbol}
                                    className="h-8 w-8 rounded-lg object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                  />
                                ) : (
                                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
                                    <span className="text-xs font-bold text-primary">
                                      {pair.symbol.slice(0, 2)}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-sm truncate max-w-[100px] sm:max-w-[150px]">{pair.name}</p>
                                  <p className="text-xs text-muted-foreground">${pair.symbol}</p>
                                </div>
                              </div>
                            </TableCell>
                            {/* Source Badge - New vs Hot */}
                            <TableCell className="hidden sm:table-cell">
                              {pair.source === "new" ? (
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[10px] gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  NEW
                                </Badge>
                              ) : (
                                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-[10px] gap-1">
                                  <Flame className="h-3 w-3" />
                                  HOT
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant="outline" className={`${chainColors[pair.chain] || 'bg-muted'} text-[10px]`}>
                                {pair.chain}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm hidden md:table-cell">
                              <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                                <Clock className="h-3 w-3" />
                                {getTimeAgo(pair.launchedAt)}
                              </div>
                            </TableCell>
                            {/* Price with flash animation */}
                            <TableCell className="font-mono text-xs sm:text-sm whitespace-nowrap">
                              <PriceCell price={pair.priceUsd} previousPrice={pair.previousPrice} />
                            </TableCell>
                            <TableCell className="font-mono text-xs sm:text-sm">
                              <div className="flex items-center gap-1 text-blue-500 whitespace-nowrap">
                                <Droplets className="h-3 w-3 hidden sm:block" />
                                {formatLiquidity(pair.liquidity)}
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm text-purple-500 hidden lg:table-cell whitespace-nowrap">
                              {formatLiquidity(pair.volume24h)}
                            </TableCell>
                            <TableCell className="font-mono text-sm hidden lg:table-cell whitespace-nowrap">
                              <span className="text-success">{pair.buys24h}</span>
                              <span className="text-muted-foreground">/</span>
                              <span className="text-destructive">{pair.sells24h}</span>
                            </TableCell>
                            <TableCell>
                              <div className={`flex items-center gap-1 font-mono text-xs sm:text-sm whitespace-nowrap ${
                                pair.priceChange24h >= 0 ? "text-success" : "text-destructive"
                              }`}>
                                {pair.priceChange24h >= 0 ? (
                                  <TrendingUp className="h-3 w-3" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" />
                                )}
                                {pair.priceChange24h >= 0 ? "+" : ""}{pair.priceChange24h.toFixed(1)}%
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs h-7 px-2"
                                  onClick={(e) => handleQuickBuy(e, pair)}
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  BUY
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-primary hover:bg-primary/10 h-7 w-7"
                                  onClick={(e) => handleQuickBuy(e, pair)}
                                >
                                  <Zap className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Trade Modal */}
        {quickTradeToken && (
          <QuickTradeModal
            open={!!quickTradeToken}
            onOpenChange={(open) => !open && setQuickTradeToken(null)}
            token={{
              name: quickTradeToken.name,
              symbol: quickTradeToken.symbol,
              price: quickTradeToken.priceUsd,
              chain: quickTradeToken.chain,
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketSniper;
