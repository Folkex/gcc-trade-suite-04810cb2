import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDexScreenerSearch } from "@/hooks/useDexScreenerSearch";
import { DexScreenerPair } from "@/hooks/useDexScreener";

interface TokenSearchBarProps {
  onTokenSelect?: (token: DexScreenerPair) => void;
  className?: string;
}

export function TokenSearchBar({ onTokenSelect, className = "" }: TokenSearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { results, loading, search, clearResults } = useDexScreenerSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        search(query);
        setIsOpen(true);
      } else {
        clearResults();
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, search, clearResults]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (token: DexScreenerPair) => {
    setQuery("");
    setIsOpen(false);
    clearResults();
    
    if (onTokenSelect) {
      onTokenSelect(token);
    } else {
      navigate(`/trade?token=${token.tokenAddress}&chain=${token.chainId}`);
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.0001) return price.toFixed(8);
    if (price < 1) return price.toFixed(6);
    return price.toFixed(4);
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toFixed(0);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search tokens..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-9 pr-9 h-9 font-mono text-sm bg-secondary/50 border-border/50 focus:border-primary/50"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => {
              setQuery("");
              clearResults();
              setIsOpen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-50 max-h-[400px] overflow-auto">
          {loading && (
            <div className="p-4 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground mt-2">Searching...</p>
            </div>
          )}

          {!loading && results.length === 0 && query.length >= 2 && (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No tokens found for "{query}"
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="py-1">
              {results.map((token) => (
                <button
                  key={token.id}
                  onClick={() => handleSelect(token)}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
                >
                  {/* Token Icon */}
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                    {token.icon ? (
                      <img
                        src={token.icon}
                        alt={token.symbol}
                        className="h-6 w-6 rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-xs font-bold text-primary">
                        {token.symbol.slice(0, 2)}
                      </span>
                    )}
                  </div>

                  {/* Token Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold truncate">
                        {token.symbol}
                      </span>
                      <Badge variant="outline" className="text-[10px] px-1 py-0">
                        {token.chain}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {token.name}
                    </p>
                  </div>

                  {/* Price & Change */}
                  <div className="text-right shrink-0">
                    <p className="font-mono text-sm">${formatPrice(token.priceUsd)}</p>
                    <div
                      className={`flex items-center justify-end gap-0.5 text-xs ${
                        token.priceChange24h >= 0 ? "text-success" : "text-destructive"
                      }`}
                    >
                      {token.priceChange24h >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>{token.priceChange24h.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Liquidity */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs text-muted-foreground">Liq</p>
                    <p className="font-mono text-xs">${formatNumber(token.liquidity)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
