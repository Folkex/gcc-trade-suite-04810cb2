import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crosshair, Wallet, TrendingUp, BarChart3, Zap, Shield, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NewsTicker from "@/components/crypto/NewsTicker";
import AISentimentBox from "@/components/crypto/AISentimentBox";
import LiveTokenFeed from "@/components/crypto/LiveTokenFeed";
import WhaleWatcher from "@/components/crypto/WhaleWatcher";
import FeedbackButton from "@/components/feedback/FeedbackButton";
import { Card, CardContent } from "@/components/ui/card";

const DashboardOverview = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Portfolio", value: "$45,231", change: "+12.5%", icon: Wallet, color: "text-primary" },
    { label: "Today P&L", value: "+$1,234", change: "+2.4%", icon: TrendingUp, color: "text-primary" },
    { label: "Active Trades", value: "12", change: "3 profit", icon: Target, color: "text-blue-400" },
    { label: "Win Rate", value: "68.5%", change: "+5.2%", icon: Zap, color: "text-yellow-400" },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/25">
            <Crosshair className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-mono tracking-tight">
              CRYPTO_SNIPER<span className="text-primary animate-pulse">_</span>
            </h1>
            <p className="text-muted-foreground font-mono text-xs">
              // Welcome back, {user?.email?.split("@")[0]}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="terminal-card border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {stat.label}
                  </span>
                </div>
                <p className={`text-xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-primary font-mono">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Live Token Feed - Takes 3 columns */}
        <div className="xl:col-span-3 space-y-6">
          <LiveTokenFeed />
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          <AISentimentBox />
          <WhaleWatcher />
        </div>
      </div>

      {/* Feedback Button */}
      <FeedbackButton />
    </DashboardLayout>
  );
};

export default DashboardOverview;
