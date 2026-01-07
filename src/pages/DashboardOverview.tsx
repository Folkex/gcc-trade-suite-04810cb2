import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Crosshair, 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shield, 
  Target,
  FolderOpen,
  Users,
  Plus,
  UserPlus,
  Trophy,
  Gift,
  ArrowRight,
  Sparkles,
  Radio,
  Clock,
  ChevronRight,
  Crown,
  Star
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FeedbackButton from "@/components/feedback/FeedbackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Mini Token Feed Data
const miniTokenFeed = [
  { name: "PEPE2.0", chain: "ETH", age: "2m", liquidity: "$125K", score: 87, safe: true },
  { name: "BONK2", chain: "SOL", age: "5m", liquidity: "$89K", score: 72, safe: true },
  { name: "WOJAK", chain: "ETH", age: "8m", liquidity: "$45K", score: 65, safe: false },
];

// Recent Project Updates
const recentProjects = [
  { name: "Trading Bot Alpha", status: "active", updated: "2h ago" },
  { name: "Portfolio Analyzer", status: "active", updated: "5h ago" },
  { name: "Market Scanner", status: "paused", updated: "1d ago" },
];

const DashboardOverview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const username = user?.email?.split("@")[0] || "Commander";

  return (
    <DashboardLayout>
      {/* Bento Grid Layout */}
      <div className="space-y-4">
        
        {/* ROW 1: Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Welcome Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <Card className="glass glass-border h-full bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 backdrop-blur-sm">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary font-mono">
                    <Clock className="h-3 w-3 mr-1" />
                    {currentTime.toLocaleTimeString()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{getGreeting()},</p>
                <h2 className="text-2xl font-bold mb-2">
                  Commander <span className="text-primary">{username}</span>
                </h2>
                <p className="text-xs text-muted-foreground font-mono">
                  // All systems operational
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Net Profit Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Card className="glass glass-border h-full hover:border-green-500/30 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-green-500/30 text-green-400">
                    +24.5%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Net Profit</p>
                <p className="text-3xl font-bold font-mono text-green-400">
                  +$12,450
                </p>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Projects Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass glass-border h-full hover:border-blue-500/30 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                    <FolderOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-blue-500/30 text-blue-400">
                    2 new
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Projects</p>
                <p className="text-3xl font-bold font-mono text-blue-400">
                  3
                </p>
                <p className="text-xs text-muted-foreground mt-2">Ongoing</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sniper Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="glass glass-border h-full hover:border-primary/30 transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Radio className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                    <span className="text-[10px] text-primary font-mono uppercase">Live</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sniper Status</p>
                <p className="text-lg font-bold font-mono text-primary">
                  Online & Scanning
                </p>
                <p className="text-xs text-muted-foreground mt-2">24/7 monitoring</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ROW 2: Sniper Preview + Management Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          
          {/* Market Pulse - Sniper Preview (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="glass h-full relative overflow-hidden border-primary/30 shadow-lg shadow-primary/5">
              {/* Neon border effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-50" />
              <div className="absolute inset-[1px] rounded-xl bg-background/95 backdrop-blur-xl" />
              
              <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Crosshair className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-mono">Market Pulse</CardTitle>
                      <p className="text-xs text-muted-foreground">Live new pairs feed</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 font-mono text-[10px]">
                    <Zap className="h-3 w-3 mr-1" />
                    TERMINAL
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="relative space-y-3">
                {/* Mini Token Feed */}
                <div className="space-y-2">
                  {miniTokenFeed.map((token, index) => (
                    <motion.div
                      key={token.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                          token.chain === "ETH" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                        )}>
                          {token.chain === "ETH" ? "Ξ" : "◎"}
                        </div>
                        <div>
                          <p className="font-medium font-mono text-sm">{token.name}</p>
                          <p className="text-xs text-muted-foreground">{token.age} ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-mono">{token.liquidity}</p>
                          <p className="text-xs text-muted-foreground">Liquidity</p>
                        </div>
                        <div className={cn(
                          "px-2 py-1 rounded-md font-mono text-sm",
                          token.score >= 80 ? "bg-green-500/20 text-green-400" :
                          token.score >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                          "bg-red-500/20 text-red-400"
                        )}>
                          {token.score}
                        </div>
                        {token.safe ? (
                          <Shield className="h-4 w-4 text-green-400" />
                        ) : (
                          <Shield className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Button 
                  onClick={() => navigate("/market-sniper")} 
                  className="w-full gap-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 font-mono"
                >
                  <Crosshair className="h-4 w-4" />
                  Open Terminal
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Workspace Activity - Management Hub (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-2"
          >
            <Card className="glass glass-border h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <FolderOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Workspace Activity</CardTitle>
                    <p className="text-xs text-muted-foreground">Recent project updates</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => navigate("/projects")}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        project.status === "active" ? "bg-green-400" : "bg-yellow-400"
                      )} />
                      <div>
                        <p className="font-medium text-sm">{project.name}</p>
                        <p className="text-xs text-muted-foreground">Updated {project.updated}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-1.5"
                    onClick={() => navigate("/projects")}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    New Project
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-1.5"
                    onClick={() => navigate("/team")}
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Invite Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ROW 3: Growth Tracker - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass glass-border bg-gradient-to-r from-amber-500/5 via-background to-purple-500/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-purple-500/20">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Your Empire</CardTitle>
                  <p className="text-xs text-muted-foreground">Growth & achievements overview</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Leaderboard Rank */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <Trophy className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Leaderboard Rank</p>
                        <p className="text-xs text-muted-foreground">Top 5% of traders</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 text-xs"
                      onClick={() => navigate("/leaderboard")}
                    >
                      View <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
                      <span className="text-2xl font-bold font-mono text-amber-400">#4</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">Silver Tier</span>
                      </div>
                      <p className="text-xs text-muted-foreground">5 more wins to Gold</p>
                      <Progress value={65} className="h-1.5 mt-2 w-32" />
                    </div>
                  </div>
                </div>

                {/* Referral Earnings */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <Gift className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Referral Earnings</p>
                        <p className="text-xs text-muted-foreground">12 friends invited</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-1 text-xs"
                      onClick={() => navigate("/referrals")}
                    >
                      View <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next payout</span>
                      <span className="font-mono font-medium text-purple-400">0.25 ETH</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Progress to payout</span>
                        <span className="font-mono">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground">Estimated payout: Jan 15, 2026</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton />
    </DashboardLayout>
  );
};

export default DashboardOverview;