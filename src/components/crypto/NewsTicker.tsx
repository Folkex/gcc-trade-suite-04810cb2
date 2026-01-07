import React from "react";
import { motion } from "framer-motion";

const headlines = [
  "🚀 Bitcoin breaks $100K resistance level • ",
  "📊 Ethereum ETF sees record inflows • ",
  "🔥 Solana DEX volume surges 150% in 24h • ",
  "⚠️ SEC delays multiple crypto ETF decisions • ",
  "💰 Whale moves $500M BTC to unknown wallet • ",
  "📈 DeFi TVL reaches new all-time high • ",
  "🎯 Analysts predict altseason incoming • ",
  "🏦 Major bank announces crypto custody service • ",
];

const NewsTicker = () => {
  return (
    <div className="w-full bg-card/50 border-b border-border/50 overflow-hidden py-2">
      <div className="flex items-center">
        <div className="flex-shrink-0 px-4 py-1 bg-primary/20 text-primary font-mono text-xs font-bold border-r border-border/50">
          LIVE
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary pulse-dot" />
        </div>
        <div className="overflow-hidden flex-1">
          <motion.div
            className="flex whitespace-nowrap ticker-scroll"
            style={{ width: "fit-content" }}
          >
            <span className="text-sm font-mono text-muted-foreground">
              {headlines.map((h, i) => (
                <span key={i}>{h}</span>
              ))}
              {headlines.map((h, i) => (
                <span key={`dup-${i}`}>{h}</span>
              ))}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
