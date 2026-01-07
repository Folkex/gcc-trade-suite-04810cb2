import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Droplets,
  TrendingUp,
  Shield,
  AlertTriangle,
  Zap,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TokenPair {
  id: string;
  name: string;
  symbol: string;
  chain: "SOL" | "ETH" | "BSC";
  age: number; // minutes
  liquidity: number;
  volume5m: number;
  snipeScore: number;
  isSafe: boolean;
  priceChange: number;
}

const mockPairs: TokenPair[] = [
  { id: "1", name: "NeuralAI", symbol: "NRAI", chain: "SOL", age: 2, liquidity: 185000, volume5m: 45000, snipeScore: 92, isSafe: true, priceChange: 345.2 },
  { id: "2", name: "MoonDoge", symbol: "MDOGE", chain: "ETH", age: 5, liquidity: 12000, volume5m: 8500, snipeScore: 23, isSafe: false, priceChange: -45.8 },
  { id: "3", name: "SolanaGem", symbol: "SGEM", chain: "SOL", age: 8, liquidity: 520000, volume5m: 125000, snipeScore: 88, isSafe: true, priceChange: 567.4 },
  { id: "4", name: "PepeMax", symbol: "PMAX", chain: "BSC", age: 12, liquidity: 3500, volume5m: 1200, snipeScore: 15, isSafe: false, priceChange: 12.1 },
  { id: "5", name: "CryptoAI", symbol: "CRAI", chain: "ETH", age: 18, liquidity: 890000, volume5m: 234000, snipeScore: 95, isSafe: true, priceChange: 234.7 },
  { id: "6", name: "MemeFi", symbol: "MIFI", chain: "SOL", age: 25, liquidity: 67000, volume5m: 18000, snipeScore: 71, isSafe: true, priceChange: 89.3 },
];

const chainIcons: Record<string, { color: string; bg: string }> = {
  SOL: { color: "text-purple-400", bg: "bg-purple-400/20" },
  ETH: { color: "text-blue-400", bg: "bg-blue-400/20" },
  BSC: { color: "text-yellow-400", bg: "bg-yellow-400/20" },
};

const formatNumber = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value}`;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-primary";
  if (score >= 50) return "text-yellow-400";
  return "text-destructive";
};

const LiveTokenFeed = () => {
  const navigate = useNavigate();
  const [pairs] = useState<TokenPair[]>(mockPairs);

  return (
    <Card className="terminal-card border-primary/20 overflow-hidden">
      <CardHeader className="pb-2 border-b border-border/50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-mono text-lg">
            <div className="h-2 w-2 rounded-full bg-primary pulse-dot" />
            LIVE_NEW_PAIRS
          </CardTitle>
          <Badge variant="outline" className="font-mono text-xs border-primary/30 text-primary">
            <Zap className="h-3 w-3 mr-1" />
            {pairs.length} ACTIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="font-mono text-xs text-primary/80">TOKEN</TableHead>
                <TableHead className="font-mono text-xs text-primary/80">CHAIN</TableHead>
                <TableHead className="font-mono text-xs text-primary/80">AGE</TableHead>
                <TableHead className="font-mono text-xs text-primary/80">LIQUIDITY</TableHead>
                <TableHead className="font-mono text-xs text-primary/80">VOL_5M</TableHead>
                <TableHead className="font-mono text-xs text-primary/80">SNIPE</TableHead>
                <TableHead className="font-mono text-xs text-primary/80">SAFE</TableHead>
                <TableHead className="font-mono text-xs text-primary/80 text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {pairs.map((pair, index) => (
                  <motion.tr
                    key={pair.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-border/20 hover:bg-primary/5 cursor-pointer group"
                    onClick={() => navigate(`/token/${pair.id}`)}
                  >
                    <TableCell className="font-mono">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">
                            {pair.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{pair.name}</p>
                          <p className="text-xs text-muted-foreground">${pair.symbol}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono ${chainIcons[pair.chain].bg} ${chainIcons[pair.chain].color}`}>
                        {pair.chain}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {pair.age}m
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <div className="flex items-center gap-1 text-blue-400">
                        <Droplets className="h-3 w-3" />
                        {formatNumber(pair.liquidity)}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-purple-400">
                      {formatNumber(pair.volume5m)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              pair.snipeScore >= 80 ? "bg-primary" :
                              pair.snipeScore >= 50 ? "bg-yellow-400" : "bg-destructive"
                            }`}
                            style={{ width: `${pair.snipeScore}%` }}
                          />
                        </div>
                        <span className={`font-mono text-sm font-bold ${getScoreColor(pair.snipeScore)}`}>
                          {pair.snipeScore}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {pair.isSafe ? (
                        <div className="flex items-center gap-1 text-primary">
                          <Shield className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTokenFeed;
