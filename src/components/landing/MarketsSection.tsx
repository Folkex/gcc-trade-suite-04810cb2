import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useMarket } from "@/contexts/MarketContext";
import { useMemo } from "react";

interface MarketsSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Live Markets",
    badgeOffline: "Market Data",
    title: "Real-Time Market Intelligence",
    subtitle: "Track crypto markets with professional-grade tools and lightning-fast data from DexScreener.",
    viewAll: "Open Trading Terminal",
    scanning: "Scanning markets...",
    statsLabels: {
      activePairs: "Active Pairs",
      trendingVolume: "Trending Volume",
      topGainer: "Top Gainer",
    },
  },
  ar: {
    badge: "الأسواق الحية",
    badgeOffline: "بيانات السوق",
    title: "ذكاء السوق في الوقت الفعلي",
    subtitle: "تتبع أسواق العملات الرقمية بأدوات احترافية وبيانات فائقة السرعة من DexScreener.",
    viewAll: "افتح محطة التداول",
    scanning: "جارٍ مسح الأسواق...",
    statsLabels: {
      activePairs: "الأزواج النشطة",
      trendingVolume: "حجم التداول الرائج",
      topGainer: "أعلى رابح",
    },
  },
};

const formatVolume = (value: number) => {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
};

const formatPrice = (price: number) => {
  if (price === 0) return "$0.00";
  if (price < 0.00001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 1000) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const MarketsSection = ({ lang }: MarketsSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";
  
  // Use global market context
  const { marketData, topGainer, loading, isLive } = useMarket();

  // Calculate live statistics
  const liveStats = useMemo(() => {
    if (marketData.length === 0) {
      return {
        activePairs: "0",
        trendingVolume: "$0",
        topGainerSymbol: "---",
        topGainerChange: 0,
      };
    }

    // Active pairs count
    const activePairs = marketData.length.toString();

    // Sum top 5 tokens volume for trending volume
    const top5Volume = marketData
      .slice(0, 5)
      .reduce((sum, token) => sum + token.volume24h, 0);

    // Top gainer
    const topGainerSymbol = topGainer?.symbol || "---";
    const topGainerChange = topGainer?.priceChange24h || 0;

    return {
      activePairs,
      trendingVolume: formatVolume(top5Volume),
      topGainerSymbol,
      topGainerChange,
    };
  }, [marketData, topGainer]);

  // Get top 6 tokens for display
  const displayTokens = marketData.slice(0, 6);

  return (
    <section className="py-24 relative overflow-hidden" id="markets">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
            isLive 
              ? "bg-success/10 border-success/20 text-success" 
              : "bg-warning/10 border-warning/20 text-warning"
          }`}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Activity className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {loading ? t.scanning : (isLive ? t.badge : t.badgeOffline)}
            </span>
            {!loading && isLive && (
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            )}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Stats Row - Live Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
        >
          {/* Active Pairs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
          >
            <BarChart3 className="h-5 w-5 text-primary mx-auto mb-2" />
            {loading ? (
              <Skeleton className="h-8 w-16 mx-auto mb-1" />
            ) : (
              <div className="text-2xl md:text-3xl font-bold text-foreground">{liveStats.activePairs}</div>
            )}
            <div className="text-xs text-muted-foreground">{t.statsLabels.activePairs}</div>
          </motion.div>

          {/* Trending Volume */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
          >
            <Activity className="h-5 w-5 text-primary mx-auto mb-2" />
            {loading ? (
              <Skeleton className="h-8 w-20 mx-auto mb-1" />
            ) : (
              <div className="text-2xl md:text-3xl font-bold text-foreground">{liveStats.trendingVolume}</div>
            )}
            <div className="text-xs text-muted-foreground">{t.statsLabels.trendingVolume}</div>
          </motion.div>

          {/* Top Gainer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
          >
            <Zap className="h-5 w-5 text-primary mx-auto mb-2" />
            {loading ? (
              <Skeleton className="h-8 w-24 mx-auto mb-1" />
            ) : (
              <div className="text-2xl md:text-3xl font-bold text-success">
                {liveStats.topGainerSymbol}
                <span className="text-sm ml-1">+{liveStats.topGainerChange.toFixed(1)}%</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground">{t.statsLabels.topGainer}</div>
          </motion.div>
        </motion.div>

        {/* Market Cards Grid - Live Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              // Loading skeletons
              [...Array(6)].map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="w-8 h-8 rounded-lg" />
                    <div>
                      <Skeleton className="h-4 w-12 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-20 mb-2" />
                  <Skeleton className="h-4 w-14" />
                  <div className="mt-3 h-8 flex items-end gap-0.5">
                    {[...Array(12)].map((_, i) => (
                      <Skeleton key={i} className="flex-1 rounded-t" style={{ height: `${30 + Math.random() * 50}%` }} />
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              // Real token cards
              displayTokens.map((token, index) => (
                <motion.div
                  key={token.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => window.location.href = `/trade?token=${token.tokenAddress}&chain=${token.chainId}`}
                >
                  {/* Icon & Symbol */}
                  <div className="flex items-center gap-2 mb-3">
                    {token.icon ? (
                      <img 
                        src={token.icon} 
                        alt={token.symbol}
                        className="w-8 h-8 rounded-lg object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary">
                        {token.chain === "SOL" ? "◎" : token.chain === "ETH" ? "Ξ" : token.symbol.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-sm">{token.symbol}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[80px]">{token.name}</div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="font-mono text-lg font-bold mb-1">{formatPrice(token.priceUsd)}</div>
                  
                  {/* Change */}
                  <div className={`flex items-center gap-1 text-sm ${token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {token.priceChange24h >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    <span className="font-medium">{token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%</span>
                  </div>
                  
                  {/* Mini Chart Line - animated based on price change */}
                  <div className="mt-3 h-8 flex items-end gap-0.5">
                    {[...Array(12)].map((_, i) => {
                      // Create a pseudo-random but consistent pattern based on token id
                      const seed = token.id.charCodeAt(i % token.id.length) + i;
                      const height = 20 + ((seed * 37) % 80);
                      return (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: index * 0.05 + i * 0.02, duration: 0.3 }}
                          className={`flex-1 rounded-t ${token.priceChange24h >= 0 ? 'bg-success/40' : 'bg-destructive/40'}`}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline" className="rounded-xl px-8">
            <Link to="/market-sniper">
              {t.viewAll}
              <TrendingUp className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketsSection;
