import { useState, useMemo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useMarket } from "@/contexts/MarketContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Crown, 
  Flame, 
  Sparkles,
  ArrowUpDown,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const formatPrice = (price: number) => {
  if (price === 0) return "$0.00";
  if (price < 0.00001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 1000) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const formatMarketCap = (value: number) => {
  if (!value || value === 0) return "—";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

const formatVolume = (value: number) => {
  if (!value || value === 0) return "—";
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

type SortField = "rank" | "name" | "price" | "change" | "marketCap" | "volume";
type SortDirection = "asc" | "desc";

const Markets = () => {
  const navigate = useNavigate();
  const { majorTokens, trendingTokens, newTokens, loadingMajor, loading, refresh, lastUpdated } = useMarket();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"major" | "trending" | "new">("major");
  const [sortField, setSortField] = useState<SortField>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getTokensForTab = () => {
    switch (activeTab) {
      case "major": return majorTokens;
      case "trending": return trendingTokens;
      case "new": return newTokens;
      default: return majorTokens;
    }
  };

  const filteredAndSortedTokens = useMemo(() => {
    let tokens = getTokensForTab();
    
    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tokens = tokens.filter(t => 
        t.symbol.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q)
      );
    }
    
    // Sort
    tokens = [...tokens].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.symbol.localeCompare(b.symbol);
          break;
        case "price":
          comparison = a.priceUsd - b.priceUsd;
          break;
        case "change":
          comparison = a.priceChange24h - b.priceChange24h;
          break;
        case "marketCap":
          comparison = (a.marketCap || 0) - (b.marketCap || 0);
          break;
        case "volume":
          comparison = a.volume24h - b.volume24h;
          break;
        default:
          comparison = 0;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
    
    return tokens;
  }, [activeTab, searchQuery, sortField, sortDirection, majorTokens, trendingTokens, newTokens]);

  const handleTokenClick = (token: any) => {
    navigate(`/trade?token=${token.tokenAddress}&chain=${token.chainId}`);
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className={`flex items-center gap-1 text-xs font-medium transition-colors ${
        sortField === field ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
      {sortField === field && (
        <ArrowUpDown className={`h-3 w-3 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
      )}
    </button>
  );

  const isLoading = activeTab === "major" ? loadingMajor : loading;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Markets</h1>
            <p className="text-muted-foreground text-sm">
              Live prices for top cryptocurrencies
              {lastUpdated && (
                <span className="ml-2 text-xs">
                  • Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refresh()}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="major" className="gap-2">
                <Crown className="h-4 w-4" />
                Major ({majorTokens.length})
              </TabsTrigger>
              <TabsTrigger value="trending" className="gap-2">
                <Flame className="h-4 w-4" />
                Trending ({trendingTokens.length})
              </TabsTrigger>
              <TabsTrigger value="new" className="gap-2">
                <Sparkles className="h-4 w-4" />
                New ({newTokens.length})
              </TabsTrigger>
            </TabsList>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          {/* Token List */}
          <Card className="mt-4 border-border/50 bg-card/50">
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border/50 bg-secondary/30">
                <div className="col-span-1 text-xs font-medium text-muted-foreground">#</div>
                <div className="col-span-3">
                  <SortButton field="name">Name</SortButton>
                </div>
                <div className="col-span-2 text-right">
                  <SortButton field="price">Price</SortButton>
                </div>
                <div className="col-span-2 text-right">
                  <SortButton field="change">24h %</SortButton>
                </div>
                <div className="col-span-2 text-right hidden sm:block">
                  <SortButton field="marketCap">Market Cap</SortButton>
                </div>
                <div className="col-span-2 text-right hidden md:block">
                  <SortButton field="volume">Volume 24h</SortButton>
                </div>
              </div>

              {/* Token Rows */}
              <div className="divide-y divide-border/30">
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    // Loading skeletons
                    [...Array(10)].map((_, i) => (
                      <div key={`skeleton-${i}`} className="grid grid-cols-12 gap-4 px-4 py-3">
                        <div className="col-span-1">
                          <Skeleton className="h-5 w-6" />
                        </div>
                        <div className="col-span-3 flex items-center gap-3">
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
                        <div className="col-span-2 hidden sm:flex justify-end">
                          <Skeleton className="h-5 w-20" />
                        </div>
                        <div className="col-span-2 hidden md:flex justify-end">
                          <Skeleton className="h-5 w-20" />
                        </div>
                      </div>
                    ))
                  ) : filteredAndSortedTokens.length === 0 ? (
                    <div className="px-4 py-12 text-center text-muted-foreground">
                      No tokens found
                    </div>
                  ) : (
                    filteredAndSortedTokens.map((token, index) => (
                      <motion.div
                        key={token.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => handleTokenClick(token)}
                        className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-secondary/30 cursor-pointer transition-colors group"
                      >
                        {/* Rank */}
                        <div className="col-span-1 flex items-center">
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}
                          </span>
                        </div>

                        {/* Token Info */}
                        <div className="col-span-3 flex items-center gap-3">
                          {token.icon ? (
                            <img 
                              src={token.icon} 
                              alt={token.symbol}
                              className="w-8 h-8 rounded-full object-cover ring-1 ring-border/50"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center ring-1 ring-border/50">
                              <span className="text-xs font-bold text-primary">
                                {token.symbol.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm truncate">{token.symbol}</span>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {token.chain}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground truncate block">
                              {token.name}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className="font-mono text-sm font-medium">
                            {formatPrice(token.priceUsd)}
                          </span>
                        </div>

                        {/* 24h Change */}
                        <div className="col-span-2 flex items-center justify-end">
                          <span className={`flex items-center gap-1 font-mono text-sm font-medium ${
                            token.priceChange24h >= 0 ? "text-success" : "text-destructive"
                          }`}>
                            {token.priceChange24h >= 0 ? (
                              <TrendingUp className="h-3.5 w-3.5" />
                            ) : (
                              <TrendingDown className="h-3.5 w-3.5" />
                            )}
                            {token.priceChange24h >= 0 ? "+" : ""}
                            {token.priceChange24h.toFixed(2)}%
                          </span>
                        </div>

                        {/* Market Cap */}
                        <div className="col-span-2 hidden sm:flex items-center justify-end">
                          <span className="font-mono text-sm text-muted-foreground">
                            {formatMarketCap(token.marketCap || 0)}
                          </span>
                        </div>

                        {/* Volume */}
                        <div className="col-span-2 hidden md:flex items-center justify-end gap-2">
                          <span className="font-mono text-sm text-muted-foreground">
                            {formatVolume(token.volume24h)}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Markets;