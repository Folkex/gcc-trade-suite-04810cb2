import { motion } from "framer-motion";
import { 
  Crown, 
  Shield, 
  TrendingUp, 
  Medal, 
  Flame,
  Zap,
  Star,
  Target
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Trader {
  rank: number;
  username: string;
  winRate: number;
  totalProfit: string;
  trades: number;
  badges: string[];
}

const topTraders: Trader[] = [
  { rank: 1, username: "CryptoWhale", winRate: 94, totalProfit: "+$1,245,000", trades: 892, badges: ["crown", "flame"] },
  { rank: 2, username: "AlphaHunter", winRate: 91, totalProfit: "+$892,450", trades: 756, badges: ["medal", "shield"] },
  { rank: 3, username: "DeFiMaster", winRate: 89, totalProfit: "+$654,200", trades: 634, badges: ["medal", "zap"] },
  { rank: 4, username: "TokenSniper", winRate: 87, totalProfit: "+$521,800", trades: 589, badges: ["shield"] },
  { rank: 5, username: "GemFinder99", winRate: 85, totalProfit: "+$445,300", trades: 512, badges: ["star"] },
  { rank: 6, username: "WhaleWatch", winRate: 84, totalProfit: "+$398,100", trades: 478, badges: ["shield"] },
  { rank: 7, username: "SolanaKing", winRate: 82, totalProfit: "+$356,700", trades: 445, badges: [] },
  { rank: 8, username: "EthMaxi", winRate: 81, totalProfit: "+$312,400", trades: 412, badges: ["target"] },
  { rank: 9, username: "MemeTrader", winRate: 79, totalProfit: "+$289,600", trades: 398, badges: [] },
  { rank: 10, username: "SafeHands", winRate: 78, totalProfit: "+$245,800", trades: 367, badges: ["shield"] },
];

const myRank = {
  rank: 156,
  username: "You",
  winRate: 72,
  totalProfit: "+$12,450",
  trades: 45,
  badges: ["target"],
  percentile: 15,
};

const getBadgeIcon = (badge: string) => {
  switch (badge) {
    case "crown":
      return <Crown className="h-4 w-4 text-yellow-400" />;
    case "medal":
      return <Medal className="h-4 w-4 text-amber-400" />;
    case "shield":
      return <Shield className="h-4 w-4 text-blue-400" />;
    case "flame":
      return <Flame className="h-4 w-4 text-orange-400" />;
    case "zap":
      return <Zap className="h-4 w-4 text-purple-400" />;
    case "star":
      return <Star className="h-4 w-4 text-yellow-400" />;
    case "target":
      return <Target className="h-4 w-4 text-green-400" />;
    default:
      return null;
  }
};

const getRankStyle = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50";
  if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50";
  if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50";
  return "bg-muted/30 border-border/50";
};

const getRankBadge = (rank: number) => {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="font-mono text-muted-foreground">#{rank}</span>;
};

const Leaderboard = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Leaderboard
          </h1>
          <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0">
            <TrendingUp className="h-3 w-3 mr-1" />
            Top Traders
          </Badge>
        </div>
        <p className="text-muted-foreground">
          See how you stack up against the best traders on the platform.
        </p>
      </motion.div>

      {/* My Rank Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="glass glass-border border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    #{myRank.rank}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Your Ranking</h3>
                  <p className="text-muted-foreground">Top {myRank.percentile}% of all traders</p>
                  <div className="flex items-center gap-2 mt-1">
                    {myRank.badges.map((badge, i) => (
                      <span key={i}>{getBadgeIcon(badge)}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold font-mono text-green-400">{myRank.winRate}%</p>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono text-primary">{myRank.totalProfit}</p>
                  <p className="text-xs text-muted-foreground">Total Profit</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-mono">{myRank.trades}</p>
                  <p className="text-xs text-muted-foreground">Trades</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Leaderboard Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass glass-border">
          <CardHeader>
            <CardTitle>Top Traders</CardTitle>
            <CardDescription>
              Rankings based on overall performance and profitability.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all-time">
              <TabsList className="mb-4">
                <TabsTrigger value="all-time">All Time</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="weekly">This Week</TabsTrigger>
              </TabsList>

              <TabsContent value="all-time" className="space-y-3">
                {topTraders.map((trader) => (
                  <div
                    key={trader.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-[1.01] ${getRankStyle(trader.rank)}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center">
                        {getRankBadge(trader.rank)}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-muted text-foreground font-medium">
                          {trader.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{trader.username}</span>
                          {trader.badges.map((badge, i) => (
                            <span key={i}>{getBadgeIcon(badge)}</span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {trader.trades} trades
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-right">
                      <div className="hidden sm:block">
                        <p className={`font-mono font-medium ${trader.winRate >= 85 ? "text-green-400" : "text-foreground"}`}>
                          {trader.winRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                      </div>
                      <div>
                        <p className="font-mono font-medium text-green-400">
                          {trader.totalProfit}
                        </p>
                        <p className="text-xs text-muted-foreground">Profit</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="monthly" className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Monthly leaderboard resets on the 1st of each month.</p>
              </TabsContent>

              <TabsContent value="weekly" className="text-center py-12 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Weekly leaderboard resets every Monday.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badge Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <Card className="glass glass-border">
          <CardHeader>
            <CardTitle className="text-lg">Badge Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-muted-foreground">#1 Trader</span>
              </div>
              <div className="flex items-center gap-2">
                <Medal className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-muted-foreground">Top 3</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Safe Trader</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-muted-foreground">Hot Streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-muted-foreground">Fast Trader</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-muted-foreground">Rising Star</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-sm text-muted-foreground">Sniper</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Leaderboard;