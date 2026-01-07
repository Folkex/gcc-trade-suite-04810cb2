import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface WhaleMove {
  id: string;
  wallet: string;
  action: "buy" | "sell";
  token: string;
  amount: number;
  value: number;
  timestamp: Date;
}

const mockWhaleMoves: WhaleMove[] = [
  { id: "1", wallet: "0x8a...3f2e", action: "buy", token: "PEPE", amount: 15000000000, value: 50000, timestamp: new Date(Date.now() - 2 * 60 * 1000) },
  { id: "2", wallet: "0x4b...9c1d", action: "sell", token: "SHIB", amount: 890000000, value: 35000, timestamp: new Date(Date.now() - 5 * 60 * 1000) },
  { id: "3", wallet: "0x2f...7a8b", action: "buy", token: "WIF", amount: 125000, value: 125000, timestamp: new Date(Date.now() - 8 * 60 * 1000) },
  { id: "4", wallet: "0x9d...1e4c", action: "buy", token: "BONK", amount: 5000000000, value: 78000, timestamp: new Date(Date.now() - 12 * 60 * 1000) },
  { id: "5", wallet: "0x6c...5f3a", action: "sell", token: "DOGE", amount: 2500000, value: 420000, timestamp: new Date(Date.now() - 18 * 60 * 1000) },
];

const formatValue = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const formatAmount = (amount: number) => {
  if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`;
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`;
  return amount.toString();
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  return `${mins}m ago`;
};

const WhaleWatcher = () => {
  return (
    <Card className="terminal-card border-blue-500/20 overflow-hidden">
      <CardHeader className="pb-2 border-b border-border/50">
        <CardTitle className="flex items-center gap-2 font-mono text-lg">
          <Wallet className="h-5 w-5 text-blue-400" />
          WHALE_WATCH
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/20">
          {mockWhaleMoves.map((move, index) => (
            <motion.div
              key={move.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 hover:bg-muted/30 transition-colors cursor-pointer ${
                move.action === "buy" ? "glow-border" : ""
              }`}
              style={move.action === "buy" ? {
                borderLeft: "2px solid hsl(var(--primary))",
                background: "linear-gradient(90deg, hsl(var(--primary) / 0.05), transparent)",
              } : {
                borderLeft: "2px solid hsl(var(--destructive))",
                background: "linear-gradient(90deg, hsl(var(--destructive) / 0.05), transparent)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    move.action === "buy" ? "bg-primary/20" : "bg-destructive/20"
                  }`}>
                    {move.action === "buy" ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
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
                    </div>
                    <p className="font-mono text-sm">
                      <span className={move.action === "buy" ? "text-primary" : "text-destructive"}>
                        {formatValue(move.value)}
                      </span>
                      <span className="text-muted-foreground"> of </span>
                      <span className="text-foreground font-bold">${move.token}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTimeAgo(move.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-3 border-t border-border/50">
          <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 font-mono text-xs">
            View All Whale Activity →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhaleWatcher;
