import { useMarket } from "@/contexts/MarketContext";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const formatPrice = (price: number) => {
  if (price === 0) return "$0.00";
  if (price < 0.00001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(6)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 1000) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};

const LivePriceTicker = () => {
  const { marketData, loading, isLive } = useMarket();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Get top 12 tokens for the ticker
  const tickerTokens = marketData.slice(0, 12);

  // Double the tokens for seamless loop
  const displayTokens = [...tickerTokens, ...tickerTokens];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused || loading) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.4;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, loading, tickerTokens.length]);

  if (loading) {
    return (
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/30">
        <div className="flex items-center gap-8 px-6 py-2 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tickerTokens.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative bg-card/80 backdrop-blur-sm border-b border-border/30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live badge - positioned properly */}
      {isLive && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-success/10 border border-success/20 px-2 py-1 rounded-full text-[10px] z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-success font-semibold tracking-wide">LIVE</span>
        </div>
      )}

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling content */}
      <div
        ref={scrollRef}
        className="flex items-center gap-8 px-16 py-2 overflow-hidden scrollbar-none"
        style={{ scrollBehavior: 'auto' }}
      >
        {displayTokens.map((token, index) => (
          <motion.div
            key={`${token.id}-${index}`}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer hover:bg-secondary/50 px-2 py-1 rounded-lg transition-all"
            onClick={() => window.location.href = `/trade?token=${token.tokenAddress}&chain=${token.chainId}`}
            whileHover={{ scale: 1.02 }}
          >
            {/* Token icon or fallback */}
            {token.icon ? (
              <img 
                src={token.icon} 
                alt={token.symbol}
                className="w-5 h-5 rounded-full object-cover ring-1 ring-border/50"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center ring-1 ring-border/50">
                <span className="text-[9px] font-bold text-primary">
                  {token.symbol.charAt(0)}
                </span>
              </div>
            )}
            
            {/* Symbol */}
            <span className="font-mono text-xs font-bold text-foreground">
              {token.symbol}
            </span>
            
            {/* Price */}
            <span className="font-mono text-xs text-muted-foreground">
              {formatPrice(token.priceUsd)}
            </span>
            
            {/* Change */}
            <span className={`flex items-center gap-0.5 font-mono text-xs font-semibold ${
              token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {token.priceChange24h >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LivePriceTicker;
