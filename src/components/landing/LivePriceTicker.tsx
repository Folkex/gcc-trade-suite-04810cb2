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

  // Get top 10 tokens for the ticker
  const tickerTokens = marketData.slice(0, 10);

  // Double the tokens for seamless loop
  const displayTokens = [...tickerTokens, ...tickerTokens];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused || loading) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled half (the first set of tokens)
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
      <div className="bg-secondary/50 border-b border-border/50">
        <div className="flex items-center gap-6 px-4 py-1.5 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
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
      className="bg-secondary/50 border-b border-border/50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Live indicator */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-secondary/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-secondary/80 to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling content */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 px-4 py-1.5 overflow-hidden scrollbar-none"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayTokens.map((token, index) => (
            <motion.div
              key={`${token.id}-${index}`}
              className="flex items-center gap-2 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => window.location.href = `/trade?token=${token.tokenAddress}&chain=${token.chainId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (index % tickerTokens.length) * 0.05 }}
            >
              {/* Token icon or fallback */}
              {token.icon ? (
                <img 
                  src={token.icon} 
                  alt={token.symbol}
                  className="w-4 h-4 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-primary">
                    {token.symbol.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Symbol */}
              <span className="font-mono text-xs font-semibold text-foreground">
                {token.symbol}
              </span>
              
              {/* Price */}
              <span className="font-mono text-xs text-muted-foreground">
                {formatPrice(token.priceUsd)}
              </span>
              
              {/* Change */}
              <span className={`flex items-center gap-0.5 font-mono text-xs font-medium ${
                token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'
              }`}>
                {token.priceChange24h >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </span>
              
              {/* Separator dot */}
              <span className="w-1 h-1 rounded-full bg-border ml-2" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Live badge */}
      {isLive && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-secondary/90 px-1.5 py-0.5 rounded text-[10px] z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-success font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
};

export default LivePriceTicker;
