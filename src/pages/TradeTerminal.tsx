import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowUpDown,
  Settings2,
  Zap,
  Wallet,
  AlertCircle,
  Check,
  X,
  Bell,
  Activity,
  Target,
  Percent,
  Loader2,
  RefreshCw,
  Radio,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useDexScreenerToken, DexScreenerPair } from "@/hooks/useDexScreener";
import { useDexScreenerRealtime } from "@/hooks/useDexScreenerWebSocket";
import { TokenSearchBar } from "@/components/trade/TokenSearchBar";

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  chain: string;
  tokenAddress?: string;
  liquidity?: number;
}

// Default token data when no token is selected
const DEFAULT_TOKEN: TokenData = {
  id: "default",
  name: "Select a Token",
  symbol: "---",
  price: 0,
  change24h: 0,
  volume24h: 0,
  marketCap: 0,
  chain: "SOL",
};

// Order Book Data
const generateOrderBook = (basePrice: number) => {
  const asks = Array.from({ length: 10 }, (_, i) => ({
    price: basePrice + (i + 1) * (basePrice * 0.005),
    amount: Math.random() * 50000 + 10000,
    total: 0,
  })).reverse();
  
  const bids = Array.from({ length: 10 }, (_, i) => ({
    price: basePrice - (i + 1) * (basePrice * 0.005),
    amount: Math.random() * 50000 + 10000,
    total: 0,
  }));
  
  return { asks, bids };
};

// Recent Trades
const generateRecentTrades = (basePrice: number) => 
  Array.from({ length: 15 }, (_, i) => ({
    id: i,
    price: basePrice + (Math.random() - 0.5) * (basePrice * 0.02),
    amount: Math.random() * 10000 + 1000,
    time: new Date(Date.now() - i * 15000),
    isBuy: Math.random() > 0.5,
  }));

// Positions
const mockPositions = [
  { token: "PEPE", invested: 500, currentValue: 892.50, pnl: 78.5, pnlDollar: 392.50 },
  { token: "NRAI", invested: 1200, currentValue: 2340, pnl: 95.0, pnlDollar: 1140 },
  { token: "SGEM", invested: 800, currentValue: 650, pnl: -18.75, pnlDollar: -150 },
];

const TradeTerminal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenAddress = searchParams.get("token");
  const chainId = searchParams.get("chain") || "solana";
  
  // Fetch real token data from DexScreener
  const { token: dexToken, loading, error, refresh } = useDexScreenerToken(tokenAddress, chainId);
  
  // Real-time price updates (3-second polling)
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const { priceData, isConnected, lastUpdate } = useDexScreenerRealtime(tokenAddress, realtimeEnabled);
  
  // Merge realtime price with token data
  const token: TokenData = useMemo(() => {
    if (!dexToken) return DEFAULT_TOKEN;
    
    // Use realtime price if available, otherwise use initial fetch
    const currentPrice = priceData?.price ?? dexToken.priceUsd;
    const currentChange = priceData?.priceChange24h ?? dexToken.priceChange24h;
    const currentVolume = priceData?.volume24h ?? dexToken.volume24h;
    
    return {
      id: dexToken.id,
      name: dexToken.name,
      symbol: dexToken.symbol,
      price: currentPrice,
      change24h: currentChange,
      volume24h: currentVolume,
      marketCap: dexToken.liquidity,
      chain: dexToken.chain,
      tokenAddress: dexToken.tokenAddress,
      liquidity: dexToken.liquidity,
    };
  }, [dexToken, priceData]);
  
  // Track price changes for visual feedback
  const [priceFlash, setPriceFlash] = useState<'up' | 'down' | null>(null);
  const previousPriceRef = React.useRef<number | null>(null);
  
  useEffect(() => {
    if (priceData && previousPriceRef.current !== null) {
      if (priceData.price > previousPriceRef.current) {
        setPriceFlash('up');
      } else if (priceData.price < previousPriceRef.current) {
        setPriceFlash('down');
      }
      setTimeout(() => setPriceFlash(null), 500);
    }
    if (priceData) {
      previousPriceRef.current = priceData.price;
    }
  }, [priceData]);
  
  const orderBook = useMemo(() => generateOrderBook(token.price || 0.001), [token.price]);
  const recentTrades = useMemo(() => generateRecentTrades(token.price || 0.001), [token.price]);
  const [positions] = useState(mockPositions);
  
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [payAmount, setPayAmount] = useState("1");
  const [slippage, setSlippage] = useState("1");
  const [priority, setPriority] = useState<"low" | "medium" | "turbo">("medium");
  const [timeframe, setTimeframe] = useState("1h");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Advanced features
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [enableAlerts, setEnableAlerts] = useState(false);
  const [trailingStop, setTrailingStop] = useState(false);
  const [antiMev, setAntiMev] = useState(true);
  
  const receiveAmount = token.price > 0 ? parseFloat(payAmount || "0") / token.price : 0;
  
  const formatPrice = (price: number) => {
    if (price === 0) return "---";
    if (price < 0.0001) return price.toFixed(8);
    if (price < 1) return price.toFixed(6);
    return price.toFixed(4);
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(2);
  };
  
  const handleTokenSelect = (selectedToken: DexScreenerPair) => {
    navigate(`/trade?token=${selectedToken.tokenAddress}&chain=${selectedToken.chainId}`);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Loading State */}
        {loading && !dexToken && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground font-mono">Loading token data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !dexToken && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-4" />
              <p className="text-destructive font-mono mb-2">Failed to load token</p>
              <p className="text-muted-foreground text-sm mb-4">{error}</p>
              <Button onClick={refresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* No Token Selected - Show search */}
        {!tokenAddress && !loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center w-full max-w-md px-4">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-mono mb-2">No token selected</p>
              <p className="text-sm text-muted-foreground mb-4">
                Search for a token or go to the Sniper Board
              </p>
              <TokenSearchBar onTokenSelect={handleTokenSelect} className="mb-4" />
              <Button onClick={() => navigate("/sniper")} variant="outline" size="sm">
                Go to Sniper Board
              </Button>
            </div>
          </div>
        )}

        {/* Main Content - Show when we have token data */}
        {(dexToken || (!loading && tokenAddress)) && (
          <>
            {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              {/* Search Bar Row */}
              <div className="flex items-center gap-3 mb-4">
                <TokenSearchBar onTokenSelect={handleTokenSelect} className="flex-1 max-w-md" />
                
                {/* Realtime Toggle */}
                <div className="flex items-center gap-2 bg-secondary/30 rounded-lg px-3 py-2">
                  <Radio className={`h-4 w-4 ${isConnected ? 'text-success animate-pulse' : 'text-muted-foreground'}`} />
                  <span className="text-xs font-mono text-muted-foreground hidden sm:inline">LIVE</span>
                  <Switch
                    checked={realtimeEnabled}
                    onCheckedChange={setRealtimeEnabled}
                    className="scale-75"
                  />
                </div>
                
                {lastUpdate && (
                  <span className="text-xs text-muted-foreground font-mono hidden md:inline">
                    Updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                    {loading ? (
                      <Loader2 className="h-6 w-6 text-primary-foreground animate-spin" />
                    ) : (
                      <BarChart3 className="h-6 w-6 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-bold font-mono">
                        {token.symbol}<span className="text-muted-foreground">/SOL</span>
                      </h1>
                      <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
                        {token.chain}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={refresh}
                        disabled={loading}
                      >
                        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm font-mono">{token.name}</p>
                  </div>
                </div>
                
                {/* Price Display */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    {loading && !dexToken ? (
                      <Skeleton className="h-8 w-24 mb-1" />
                    ) : (
                      <p 
                        className={`text-3xl font-bold font-mono transition-all duration-300 ${
                          priceFlash === 'up' 
                            ? 'text-success scale-105' 
                            : priceFlash === 'down' 
                              ? 'text-destructive scale-105' 
                              : token.change24h >= 0 
                                ? 'text-success' 
                                : 'text-destructive'
                        }`}
                      >
                        ${formatPrice(token.price)}
                      </p>
                    )}
                    <div className={`flex items-center gap-1 justify-end ${token.change24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                      {token.change24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-mono">{token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">24h Vol</p>
                    <p className="font-mono">${formatNumber(token.volume24h)}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">Liquidity</p>
                    <p className="font-mono">${formatNumber(token.liquidity || 0)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

        {/* Main Trading Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Column A: Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-6"
          >
            <Card className="h-full">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-mono text-sm text-primary">PRICE_CHART</CardTitle>
                  <div className="flex gap-1">
                    {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
                      <Button
                        key={tf}
                        size="sm"
                        variant={timeframe === tf ? "default" : "ghost"}
                        className={`font-mono text-xs h-7 px-2 ${
                          timeframe === tf 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        onClick={() => setTimeframe(tf)}
                      >
                        {tf}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Chart Placeholder */}
                <div className="h-[400px] bg-secondary/30 rounded-lg border relative overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="border-border/20 border-r border-b" />
                    ))}
                  </div>
                  
                  {/* Candlesticks */}
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-8 pt-4">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const isGreen = Math.random() > 0.4;
                      const height = 20 + Math.random() * 60;
                      const wickHeight = height + Math.random() * 20;
                      return (
                        <div key={i} className="relative flex flex-col items-center" style={{ height: `${wickHeight}%` }}>
                          <div 
                            className={`w-0.5 absolute top-0 ${isGreen ? 'bg-success/50' : 'bg-destructive/50'}`}
                            style={{ height: `${(wickHeight - height) / 2}%` }}
                          />
                          <div 
                            className={`w-2 rounded-sm ${isGreen ? 'bg-success' : 'bg-destructive'}`}
                            style={{ height: `${height}%`, marginTop: `${(wickHeight - height) / 4}%` }}
                          />
                          <div 
                            className={`w-0.5 ${isGreen ? 'bg-success/50' : 'bg-destructive/50'}`}
                            style={{ height: `${(wickHeight - height) / 2}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Trade Markers */}
                  <div className="absolute top-20 left-1/4 flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-mono text-success">BUY $120</span>
                  </div>
                  <div className="absolute top-32 right-1/3 flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
                    <span className="text-xs font-mono text-destructive">SELL $85</span>
                  </div>
                  
                  {/* Price Line */}
                  <div className="absolute right-0 top-1/3 flex items-center">
                    <div className="h-px w-full bg-primary/30 absolute" />
                    <div className="bg-primary px-2 py-0.5 rounded text-xs font-mono text-primary-foreground">
                      ${formatPrice(token.price)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Column B: Order Book & Recent Trades */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 hidden lg:block"
          >
            <div className="space-y-4 h-full flex flex-col">
              {/* Order Book */}
              <Card className="flex-1">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="font-mono text-sm text-primary">ORDER_BOOK</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="grid grid-cols-3 text-xs font-mono text-muted-foreground mb-2 px-2">
                    <span>PRICE</span>
                    <span className="text-right">SIZE</span>
                    <span className="text-right">TOTAL</span>
                  </div>
                  
                  {/* Asks */}
                  <div className="space-y-0.5 mb-2">
                    {orderBook.asks.slice(0, 6).map((order, i) => (
                      <div key={`ask-${i}`} className="grid grid-cols-3 text-xs font-mono px-2 py-0.5 relative">
                        <div className="absolute inset-0 bg-destructive/10" style={{ width: `${(order.amount / 60000) * 100}%` }} />
                        <span className="text-destructive relative z-10">{formatPrice(order.price)}</span>
                        <span className="text-right relative z-10">{formatNumber(order.amount)}</span>
                        <span className="text-right text-muted-foreground relative z-10">{formatNumber(order.amount * order.price)}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Spread */}
                  <div className="py-2 text-center border-y">
                    <span className="font-mono text-lg font-bold text-primary">${formatPrice(token.price)}</span>
                  </div>
                  
                  {/* Bids */}
                  <div className="space-y-0.5 mt-2">
                    {orderBook.bids.slice(0, 6).map((order, i) => (
                      <div key={`bid-${i}`} className="grid grid-cols-3 text-xs font-mono px-2 py-0.5 relative">
                        <div className="absolute inset-0 bg-success/10" style={{ width: `${(order.amount / 60000) * 100}%` }} />
                        <span className="text-success relative z-10">{formatPrice(order.price)}</span>
                        <span className="text-right relative z-10">{formatNumber(order.amount)}</span>
                        <span className="text-right text-muted-foreground relative z-10">{formatNumber(order.amount * order.price)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Trades */}
              <Card className="flex-1">
                <CardHeader className="pb-2 border-b">
                  <CardTitle className="font-mono text-sm text-primary">RECENT_TRADES</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="grid grid-cols-3 text-xs font-mono text-muted-foreground mb-2 px-2">
                    <span>PRICE</span>
                    <span className="text-right">AMOUNT</span>
                    <span className="text-right">TIME</span>
                  </div>
                  <div className="space-y-0.5 max-h-[200px] overflow-y-auto">
                    {recentTrades.map((trade) => (
                      <div key={trade.id} className="grid grid-cols-3 text-xs font-mono px-2 py-0.5">
                        <span className={trade.isBuy ? 'text-success' : 'text-destructive'}>
                          {formatPrice(trade.price)}
                        </span>
                        <span className="text-right">{formatNumber(trade.amount)}</span>
                        <span className="text-right text-muted-foreground">
                          {trade.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Column C: Execution Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="font-mono text-sm text-primary">EXECUTE_TRADE</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {/* Buy/Sell Tabs */}
                <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "buy" | "sell")}>
                  <TabsList className="w-full p-1">
                    <TabsTrigger 
                      value="buy" 
                      className="flex-1 font-mono data-[state=active]:bg-success data-[state=active]:text-success-foreground"
                    >
                      BUY
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sell" 
                      className="flex-1 font-mono data-[state=active]:bg-destructive data-[state=active]:text-destructive-foreground"
                    >
                      SELL
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="mt-4 space-y-4">
                    <SwapForm 
                      tradeType="buy" 
                      payAmount={payAmount}
                      setPayAmount={setPayAmount}
                      receiveAmount={receiveAmount}
                      token={token}
                      onSwap={() => setShowConfirmModal(true)}
                    />
                  </TabsContent>
                  
                  <TabsContent value="sell" className="mt-4 space-y-4">
                    <SwapForm 
                      tradeType="sell" 
                      payAmount={payAmount}
                      setPayAmount={setPayAmount}
                      receiveAmount={receiveAmount}
                      token={token}
                      onSwap={() => setShowConfirmModal(true)}
                    />
                  </TabsContent>
                </Tabs>
                
                {/* Advanced Settings */}
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="settings" className="border-border">
                    <AccordionTrigger className="text-sm font-mono text-muted-foreground hover:text-foreground py-2">
                      <div className="flex items-center gap-2">
                        <Settings2 className="h-4 w-4" />
                        TRADE_SETTINGS
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-4">
                      {/* Slippage */}
                      <div>
                        <label className="text-xs font-mono text-muted-foreground mb-2 block">
                          SLIPPAGE_TOLERANCE
                        </label>
                        <div className="flex gap-2">
                          {['0.5', '1', '3', 'auto'].map((s) => (
                            <Button
                              key={s}
                              size="sm"
                              variant={slippage === s ? "default" : "outline"}
                              className="flex-1 font-mono text-xs"
                              onClick={() => setSlippage(s)}
                            >
                              {s === 'auto' ? 'AUTO' : `${s}%`}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Priority Fee */}
                      <div>
                        <label className="text-xs font-mono text-muted-foreground mb-2 block">
                          PRIORITY_FEE
                        </label>
                        <div className="flex gap-2">
                          {[
                            { key: 'low', label: 'LOW', sol: '0.0001' },
                            { key: 'medium', label: 'MED', sol: '0.0005' },
                            { key: 'turbo', label: 'TURBO', sol: '0.002' },
                          ].map((p) => (
                            <Button
                              key={p.key}
                              size="sm"
                              variant={priority === p.key ? "default" : "outline"}
                              className="flex-1 font-mono text-xs"
                              onClick={() => setPriority(p.key as typeof priority)}
                            >
                              <div className="flex flex-col items-center">
                                <span>{p.label}</span>
                                <span className="text-[10px] opacity-70">{p.sol} SOL</span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Anti-MEV */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor="anti-mev" className="text-xs font-mono">Anti-MEV Protection</Label>
                        <Switch id="anti-mev" checked={antiMev} onCheckedChange={setAntiMev} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Advanced Orders */}
                  <AccordionItem value="advanced" className="border-border">
                    <AccordionTrigger className="text-sm font-mono text-muted-foreground hover:text-foreground py-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        ADVANCED_ORDERS
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-4">
                      {/* Stop Loss */}
                      <div>
                        <label className="text-xs font-mono text-muted-foreground mb-2 block">
                          STOP_LOSS (%)
                        </label>
                        <Input
                          type="number"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(e.target.value)}
                          placeholder="e.g. 10"
                          className="font-mono h-9"
                        />
                      </div>

                      {/* Take Profit */}
                      <div>
                        <label className="text-xs font-mono text-muted-foreground mb-2 block">
                          TAKE_PROFIT (%)
                        </label>
                        <Input
                          type="number"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(e.target.value)}
                          placeholder="e.g. 50"
                          className="font-mono h-9"
                        />
                      </div>

                      {/* Trailing Stop */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor="trailing" className="text-xs font-mono">Trailing Stop</Label>
                        <Switch id="trailing" checked={trailingStop} onCheckedChange={setTrailingStop} />
                      </div>

                      {/* Price Alerts */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor="alerts" className="text-xs font-mono">Price Alerts</Label>
                        <Switch id="alerts" checked={enableAlerts} onCheckedChange={setEnableAlerts} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Positions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 mb-20 lg:mb-0"
        >
          <Card>
            <CardHeader className="pb-2 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-sm text-primary">MY_POSITIONS</CardTitle>
                <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
                  {positions.length} ACTIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">TOKEN</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">INVESTED</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden sm:table-cell">CURRENT</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">PNL</TableHead>
                      <TableHead className="font-mono text-xs text-primary text-right whitespace-nowrap">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {positions.map((position) => (
                      <TableRow key={position.token}>
                        <TableCell className="font-mono font-bold whitespace-nowrap">{position.token}</TableCell>
                        <TableCell className="font-mono whitespace-nowrap">${position.invested.toFixed(2)}</TableCell>
                        <TableCell className="font-mono whitespace-nowrap hidden sm:table-cell">${position.currentValue.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className={`font-mono whitespace-nowrap ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                            <span>{position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(1)}%</span>
                            <span className="text-muted-foreground ml-1 hidden sm:inline">
                              ({position.pnlDollar >= 0 ? '+' : ''}${position.pnlDollar.toFixed(0)})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 sm:gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="font-mono text-[10px] sm:text-xs h-7 px-2 sm:px-3 border-destructive/30 text-destructive hover:bg-destructive/10"
                            >
                              <span className="hidden sm:inline">SELL </span>50%
                            </Button>
                            <Button 
                              size="sm" 
                              className="font-mono text-[10px] sm:text-xs h-7 px-2 sm:px-3 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              <span className="hidden sm:inline">SELL </span>ALL
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mobile Sticky Footer - above bottom nav */}
        <div className="lg:hidden fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-0 right-0 bg-card/95 backdrop-blur-lg border-t p-3 z-40">
          <div className="flex gap-2 max-w-lg mx-auto">
            <Button 
              className="flex-1 h-11 font-mono text-base bg-success text-success-foreground hover:bg-success/90"
              onClick={() => {
                setTradeType("buy");
                setShowConfirmModal(true);
              }}
            >
              BUY
            </Button>
            <Button 
              className="flex-1 h-11 font-mono text-base bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                setTradeType("sell");
                setShowConfirmModal(true);
              }}
            >
              SELL
            </Button>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-mono text-primary">CONFIRM_{tradeType.toUpperCase()}</DialogTitle>
              <DialogDescription className="font-mono text-muted-foreground">
                Review your trade before executing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center p-3 bg-secondary rounded">
                <span className="text-muted-foreground font-mono text-sm">You Pay</span>
                <span className="font-mono font-bold">{payAmount} SOL</span>
              </div>
              <div className="flex justify-center">
                <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex justify-between items-center p-3 bg-secondary rounded">
                <span className="text-muted-foreground font-mono text-sm">You Receive</span>
                <span className="font-mono font-bold">{formatNumber(receiveAmount)} {token.symbol}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono space-y-1">
                <div className="flex justify-between">
                  <span>Slippage</span>
                  <span>{slippage === 'auto' ? 'Auto' : `${slippage}%`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Priority Fee</span>
                  <span>{priority.toUpperCase()}</span>
                </div>
                {stopLoss && (
                  <div className="flex justify-between">
                    <span>Stop Loss</span>
                    <span>{stopLoss}%</span>
                  </div>
                )}
                {takeProfit && (
                  <div className="flex justify-between">
                    <span>Take Profit</span>
                    <span>{takeProfit}%</span>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 font-mono"
              >
                <X className="h-4 w-4 mr-2" />
                CANCEL
              </Button>
              <Button 
                onClick={() => setShowConfirmModal(false)}
                className={`flex-1 font-mono ${
                  tradeType === 'buy' 
                    ? 'bg-success text-success-foreground hover:bg-success/90' 
                    : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                }`}
              >
                <Check className="h-4 w-4 mr-2" />
                CONFIRM
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

// Swap Form Component
interface SwapFormProps {
  tradeType: "buy" | "sell";
  payAmount: string;
  setPayAmount: (value: string) => void;
  receiveAmount: number;
  token: TokenData;
  onSwap: () => void;
}

const SwapForm = ({ tradeType, payAmount, setPayAmount, receiveAmount, token, onSwap }: SwapFormProps) => {
  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(2);
  };

  return (
    <div className="space-y-4">
      {/* You Pay */}
      <div>
        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
          <span>YOU_{tradeType === 'buy' ? 'PAY' : 'SELL'}</span>
          <span className="flex items-center gap-1">
            <Wallet className="h-3 w-3" />
            Balance: 12.5 {tradeType === 'buy' ? 'SOL' : token.symbol}
          </span>
        </div>
        <div className="relative">
          <Input
            type="number"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
            className="h-14 text-xl font-mono pr-20"
            placeholder="0.00"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 px-2 text-xs font-mono text-primary hover:bg-primary/10"
              onClick={() => setPayAmount("12.5")}
            >
              MAX
            </Button>
            <span className="font-mono font-bold">{tradeType === 'buy' ? 'SOL' : token.symbol}</span>
          </div>
        </div>
      </div>
      
      {/* Swap Icon */}
      <div className="flex justify-center">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {/* You Receive */}
      <div>
        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
          <span>YOU_RECEIVE</span>
        </div>
        <div className="relative">
          <Input
            type="text"
            value={formatNumber(receiveAmount)}
            readOnly
            className="h-14 text-xl font-mono pr-20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="font-mono font-bold">{tradeType === 'buy' ? token.symbol : 'SOL'}</span>
          </div>
        </div>
      </div>
      
      {/* Swap Button */}
      <Button 
        onClick={onSwap}
        className={`w-full h-14 text-lg font-mono font-bold ${
          tradeType === 'buy' 
            ? 'bg-success text-success-foreground hover:bg-success/90' 
            : 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
        }`}
      >
        <Zap className="h-5 w-5 mr-2" />
        SWAP
      </Button>
      
      {/* Info */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
        <AlertCircle className="h-3 w-3" />
        <span>1 {tradeType === 'buy' ? 'SOL' : token.symbol} ≈ {formatNumber(1 / token.price)} {tradeType === 'buy' ? token.symbol : 'SOL'}</span>
      </div>
    </div>
  );
};

export default TradeTerminal;
