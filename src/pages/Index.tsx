import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Crosshair, 
  Clock, 
  ArrowRight,
  Globe,
  Activity,
  Layers,
  Flame,
  Rocket,
  ChevronRight,
  FileText,
  Shield,
  Scale,
  LogIn,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMarket, DexScreenerPair } from "@/contexts/MarketContext";
import { useAuth } from "@/contexts/AuthContext";
import GlobalLeaderboard from "@/components/crypto/GlobalLeaderboard";

// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card px-4 sm:px-6 py-3 flex items-center justify-between mb-6"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center neon-glow-soft group-hover:scale-105 transition-transform">
          <span className="text-primary-foreground font-bold text-sm">A</span>
        </div>
        <span className="font-bold text-xl font-mono text-foreground hidden sm:block">Arbah.co</span>
      </Link>

      {/* Nav Links - Desktop */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Markets
        </Link>
        <Link to="/trade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Trade
        </Link>
        <Link to="/market-sniper" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Sniper
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-2">
        {user ? (
          <Button 
            onClick={() => navigate("/dashboard")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5"
          >
            Dashboard
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </>
        )}
      </div>
    </motion.header>
  );
};

// ============================================
// QUICK BUY CARD COMPONENT
// ============================================
const QuickBuyCard = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");

  const handleQuickTrade = () => {
    if (address.trim()) {
      navigate(`/trade?token=${address.trim()}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6 relative overflow-hidden group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 aurora-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center neon-glow-soft">
            <Crosshair className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Quick Trade</h3>
            <p className="text-xs text-muted-foreground">Paste any contract</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="0x... or So11..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-secondary/50 border-border focus:border-primary/50 font-mono text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleQuickTrade()}
          />
          <Button 
            onClick={handleQuickTrade}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 rounded-xl font-semibold"
          >
            <Zap className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// METRIC CARD COMPONENT
// ============================================
interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  delay?: number;
}

const MetricCard = ({ title, value, change, icon: Icon, delay = 0 }: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-5 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl translate-x-8 -translate-y-8 group-hover:bg-primary/10 transition-colors" />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-bold text-foreground font-mono">{value}</div>
      {change && (
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="h-3 w-3 text-primary" />
          <span className="text-xs text-primary">{change}</span>
        </div>
      )}
    </div>
  </motion.div>
);

// ============================================
// TOKEN ROW COMPONENT
// ============================================
interface TokenRowProps {
  token: DexScreenerPair;
  index: number;
  variant?: "trending" | "new";
}

const TokenRow = ({ token, index, variant = "trending" }: TokenRowProps) => {
  const navigate = useNavigate();
  const isPositive = token.priceChange24h >= 0;

  const formatPrice = (price: number) => {
    if (price < 0.00001) return `$${price.toExponential(2)}`;
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/trade?token=${token.tokenAddress}&chain=${token.chainId}`)}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 cursor-pointer transition-all group"
    >
      {/* Rank/Icon */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center ring-1 ring-border">
        {variant === "trending" ? (
          <span className="text-sm font-bold text-primary">#{index + 1}</span>
        ) : (
          <Rocket className="h-4 w-4 text-primary" />
        )}
      </div>

      {/* Token Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground text-sm truncate">{token.symbol}</span>
          <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-border text-muted-foreground">
            {token.chain}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground truncate block">{token.name}</span>
      </div>

      {/* Price & Change */}
      <div className="text-right">
        <div className="font-mono text-sm text-foreground">{formatPrice(token.priceUsd)}</div>
        {variant === "trending" ? (
          <div className={`text-xs font-mono ${isPositive ? "text-primary" : "text-destructive"}`}>
            {isPositive ? "+" : ""}{token.priceChange24h.toFixed(2)}%
          </div>
        ) : (
          <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
            <Clock className="h-3 w-3" />
            {getTimeAgo(token.launchedAt)}
          </div>
        )}
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

// ============================================
// FLOATING NAV DOCK
// ============================================
const FloatingNavDock = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { icon: BarChart3, label: "Terminal", path: "/trade" },
    { icon: Crosshair, label: "Sniper", path: "/market-sniper" },
    { icon: Globe, label: "Markets", path: "/markets" },
    { icon: Layers, label: "Dashboard", path: "/dashboard" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="glass-card p-2 flex flex-col gap-1">
        {navItems.map((item, i) => (
          <motion.button
            key={item.path}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(item.path)}
            className="group relative w-12 h-12 rounded-xl flex items-center justify-center hover:bg-secondary/50 transition-colors"
          >
            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-card rounded-lg border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================
// MAIN INDEX PAGE
// ============================================
const Index = () => {
  const navigate = useNavigate();
  const { trendingTokens, newTokens, majorTokens, loading } = useMarket();

  // Calculate metrics
  const totalVolume = majorTokens.reduce((sum, t) => sum + (t.volume24h || 0), 0);
  const totalMarketCap = majorTokens.reduce((sum, t) => sum + (t.marketCap || 0), 0);
  const activePairs = newTokens.length + trendingTokens.length + majorTokens.length;

  const formatBigNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      
      {/* Floating Nav Dock */}
      <FloatingNavDock />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:pl-24">
        
        {/* Header */}
        <Header />
        
        {/* ============================================ */}
        {/* ROW 1: HERO SECTION */}
        {/* ============================================ */}
        <section className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Left: Hero Text */}
          <div className="lg:col-span-3 flex flex-col justify-center py-12 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Badge variant="outline" className="border-primary/30 text-primary mb-6">
                <Activity className="h-3 w-3 mr-1" />
                Live Market Data
              </Badge>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4"
            >
              Trade Faster.
              <br />
              <span className="text-gradient">Snipe Smarter.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-md"
            >
              The fastest real-time crypto terminal. Track new launches, trending tokens, and whale movements—all in one place.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button 
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 font-semibold neon-glow-soft"
              >
                Launch Terminal
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/markets")}
                className="border-border hover:bg-secondary/50 rounded-full px-8"
              >
                View Markets
              </Button>
            </motion.div>
          </div>

          {/* Right: Quick Buy Card */}
          <div className="lg:col-span-2 flex items-center">
            <QuickBuyCard />
          </div>
        </section>

        {/* ============================================ */}
        {/* ROW 2: LIVE METRICS */}
        {/* ============================================ */}
        <section className="grid sm:grid-cols-3 gap-4 mb-8">
          <MetricCard
            title="Total Market Cap"
            value={formatBigNumber(totalMarketCap)}
            change="+2.4% today"
            icon={Globe}
            delay={0.4}
          />
          <MetricCard
            title="24h Volume"
            value={formatBigNumber(totalVolume)}
            change="+12.3% vs avg"
            icon={BarChart3}
            delay={0.5}
          />
          <MetricCard
            title="Active Pairs"
            value={activePairs.toLocaleString()}
            icon={Activity}
            delay={0.6}
          />
        </section>

        {/* ============================================ */}
        {/* ROW 3: TRENDING + NEW PAIRS */}
        {/* ============================================ */}
        <section className="grid lg:grid-cols-5 gap-6 mb-8">
          {/* Left: Trending */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-3 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Flame className="h-4 w-4 text-orange-500" />
                </div>
                <h2 className="font-semibold text-foreground">Trending Now</h2>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/market-sniper")}
                className="text-muted-foreground hover:text-white"
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                    <div className="w-10 h-10 rounded-xl bg-secondary" />
                    <div className="flex-1">
                      <div className="h-4 w-20 bg-secondary rounded mb-2" />
                      <div className="h-3 w-32 bg-secondary rounded" />
                    </div>
                  </div>
                ))
              ) : (
                trendingTokens.slice(0, 5).map((token, i) => (
                  <TokenRow key={token.id} token={token} index={i} variant="trending" />
                ))
              )}
            </div>
          </motion.div>

          {/* Right: New Pairs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Rocket className="h-4 w-4 text-primary" />
                </div>
                <h2 className="font-semibold text-foreground">New Launches</h2>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary text-[10px]">
                LIVE
              </Badge>
            </div>
            
            <div className="space-y-1">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
                    <div className="w-10 h-10 rounded-xl bg-secondary" />
                    <div className="flex-1">
                      <div className="h-4 w-16 bg-secondary rounded mb-2" />
                      <div className="h-3 w-24 bg-secondary rounded" />
                    </div>
                  </div>
                ))
              ) : (
                newTokens.slice(0, 5).map((token, i) => (
                  <TokenRow key={token.id} token={token} index={i} variant="new" />
                ))
              )}
            </div>
          </motion.div>
        </section>

        {/* ============================================ */}
        {/* ROW 4: GLOBAL LEADERBOARD */}
        {/* ============================================ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <GlobalLeaderboard limit={50} compact={false} showHeader={true} />
        </motion.section>

        {/* Footer */}
        <footer className="py-12 border-t border-border mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-lg font-mono text-foreground">Arbah.co</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The fastest real-time crypto terminal for traders and investors.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
                <li><Link to="/trade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trade Terminal</Link></li>
                <li><Link to="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Markets</Link></li>
                <li><Link to="/market-sniper" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sniper Board</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
                <li><a href="mailto:support@arbah.co" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/legal/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                    <Scale className="h-3 w-3" />
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Arbah.co — Real-time crypto intelligence. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
