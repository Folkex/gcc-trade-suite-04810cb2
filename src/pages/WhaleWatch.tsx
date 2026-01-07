import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface WhaleMove {
  id: string;
  wallet: string;
  action: "buy" | "sell";
  token: string;
  tokenSymbol: string;
  amount: number;
  value: number;
  chain: string;
  timestamp: Date;
  txHash: string;
}

const mockWhaleMoves: WhaleMove[] = [
  { id: "1", wallet: "0x8a2f...3f2e", action: "buy", token: "Pepe", tokenSymbol: "PEPE", amount: 15000000000, value: 50000, chain: "ETH", timestamp: new Date(Date.now() - 2 * 60 * 1000), txHash: "0x..." },
  { id: "2", wallet: "0x4b9c...9c1d", action: "sell", token: "Shiba Inu", tokenSymbol: "SHIB", amount: 890000000, value: 35000, chain: "ETH", timestamp: new Date(Date.now() - 5 * 60 * 1000), txHash: "0x..." },
  { id: "3", wallet: "7xKp...mN4r", action: "buy", token: "dogwifhat", tokenSymbol: "WIF", amount: 125000, value: 125000, chain: "SOL", timestamp: new Date(Date.now() - 8 * 60 * 1000), txHash: "5x..." },
  { id: "4", wallet: "9dEf...1e4c", action: "buy", token: "Bonk", tokenSymbol: "BONK", amount: 5000000000, value: 78000, chain: "SOL", timestamp: new Date(Date.now() - 12 * 60 * 1000), txHash: "3j..." },
  { id: "5", wallet: "0x6c5f...5f3a", action: "sell", token: "Dogecoin", tokenSymbol: "DOGE", amount: 2500000, value: 420000, chain: "ETH", timestamp: new Date(Date.now() - 18 * 60 * 1000), txHash: "0x..." },
  { id: "6", wallet: "Hk9p...rT2s", action: "buy", token: "Jupiter", tokenSymbol: "JUP", amount: 450000, value: 890000, chain: "SOL", timestamp: new Date(Date.now() - 25 * 60 * 1000), txHash: "8k..." },
  { id: "7", wallet: "0x3a8b...2c4d", action: "sell", token: "Floki", tokenSymbol: "FLOKI", amount: 12000000000, value: 156000, chain: "BSC", timestamp: new Date(Date.now() - 32 * 60 * 1000), txHash: "0x..." },
  { id: "8", wallet: "Mn4k...pQ7r", action: "buy", token: "Raydium", tokenSymbol: "RAY", amount: 89000, value: 234000, chain: "SOL", timestamp: new Date(Date.now() - 45 * 60 * 1000), txHash: "9m..." },
];

const formatValue = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
};

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  SOL: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  BSC: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const WhaleWatch = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
              WHALE_WATCH<span className="text-blue-400 animate-pulse">_</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              // Large wallet movements in real-time
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Volume", value: "$2.1M", change: "+15%" },
          { label: "Active Whales", value: "47", change: "+8" },
          { label: "Buys", value: "156", color: "text-primary" },
          { label: "Sells", value: "89", color: "text-destructive" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="terminal-card border-blue-500/20">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-mono uppercase mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold font-mono ${stat.color || "text-foreground"}`}>
                  {stat.value}
                </p>
                {stat.change && (
                  <p className="text-xs text-primary font-mono">{stat.change}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Whale Feed */}
      <Card className="terminal-card border-blue-500/20 overflow-hidden">
        <CardHeader className="pb-2 border-b border-border/50">
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <div className="h-2 w-2 rounded-full bg-blue-400 pulse-dot" />
            LIVE_FEED
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/20">
            {mockWhaleMoves.map((move, index) => (
              <motion.div
                key={move.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 hover:bg-muted/20 transition-colors cursor-pointer ${
                  move.action === "buy" ? "border-l-2 border-l-primary" : "border-l-2 border-l-destructive"
                }`}
                style={{
                  background: move.action === "buy" 
                    ? "linear-gradient(90deg, hsl(var(--primary) / 0.05), transparent)"
                    : "linear-gradient(90deg, hsl(var(--destructive) / 0.05), transparent)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                      move.action === "buy" ? "bg-primary/20 neon-glow" : "bg-destructive/20 neon-glow-red"
                    }`}>
                      {move.action === "buy" ? (
                        <TrendingUp className="h-6 w-6 text-primary" />
                      ) : (
                        <TrendingDown className="h-6 w-6 text-destructive" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">
                          {move.wallet}
                        </span>
                        <Badge variant="outline" className={`text-[10px] font-mono ${
                          move.action === "buy" 
                            ? "border-primary/30 text-primary" 
                            : "border-destructive/30 text-destructive"
                        }`}>
                          {move.action.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] font-mono ${chainColors[move.chain]}`}>
                          {move.chain}
                        </Badge>
                      </div>
                      <p className="font-mono">
                        <span className={`text-lg font-bold ${
                          move.action === "buy" ? "text-primary" : "text-destructive"
                        }`}>
                          {formatValue(move.value)}
                        </span>
                        <span className="text-muted-foreground"> of </span>
                        <span className="text-foreground font-bold">{move.token}</span>
                        <span className="text-muted-foreground"> (${move.tokenSymbol})</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getTimeAgo(move.timestamp)}
                    </p>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View TX
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default WhaleWatch;
