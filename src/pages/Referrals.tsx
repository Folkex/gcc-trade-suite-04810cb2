import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Check, 
  Users, 
  Coins, 
  Calendar, 
  Trophy,
  Star,
  Zap,
  Crown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

const Referrals = () => {
  const [copied, setCopied] = useState(false);
  
  const referralLink = "https://sniper.app/ref/USER123ABC";
  
  const stats = {
    friendsInvited: 12,
    totalEarnings: "1.45",
    nextPayout: "0.25",
    payoutDate: "Jan 15, 2026",
    currentTier: "Silver",
    invitesToNextTier: 5,
    nextTier: "Gold",
  };

  const tiers = [
    { name: "Bronze", minInvites: 0, fee: "0.5%", color: "text-amber-600", bgColor: "bg-amber-500/10" },
    { name: "Silver", minInvites: 5, fee: "0.4%", color: "text-gray-400", bgColor: "bg-gray-500/10" },
    { name: "Gold", minInvites: 15, fee: "0.3%", color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
    { name: "Platinum", minInvites: 30, fee: "0.2%", color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
    { name: "Diamond", minInvites: 50, fee: "0.1%", color: "text-purple-400", bgColor: "bg-purple-500/10" },
  ];

  const currentTierIndex = tiers.findIndex(t => t.name === stats.currentTier);
  const progress = stats.friendsInvited >= 50 ? 100 : 
    ((stats.friendsInvited - tiers[currentTierIndex].minInvites) / 
    (tiers[currentTierIndex + 1]?.minInvites - tiers[currentTierIndex].minInvites || 1)) * 100;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const recentReferrals = [
    { name: "User_4x8f2", date: "2 days ago", earned: "0.05 ETH" },
    { name: "CryptoKing", date: "5 days ago", earned: "0.12 ETH" },
    { name: "DeFi_Master", date: "1 week ago", earned: "0.08 ETH" },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Referral Program
          </h1>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
            <Coins className="h-3 w-3 mr-1" />
            Earn ETH
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Invite friends and earn 10% of their trading fees forever.
        </p>
      </motion.div>

      {/* Referral Link Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="glass glass-border border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Your Referral Link
            </CardTitle>
            <CardDescription>
              Share this link to earn commissions on every trade your friends make.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <code className="flex-1 p-4 bg-muted/50 rounded-lg font-mono text-sm break-all border border-border">
                {referralLink}
              </code>
              <Button onClick={handleCopy} size="lg" className="gap-2 shrink-0">
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-3 mb-6"
      >
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Friends Invited</p>
                <p className="text-2xl font-bold font-mono">{stats.friendsInvited}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Coins className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold font-mono text-green-400">{stats.totalEarnings} ETH</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Payout</p>
                <p className="text-2xl font-bold font-mono">{stats.nextPayout} ETH</p>
                <p className="text-xs text-muted-foreground">{stats.payoutDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tier System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Tier System
              </CardTitle>
              <CardDescription>
                Invite more friends to unlock lower trading fees.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Progress */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{stats.currentTier} Tier</span>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/50">
                    {stats.invitesToNextTier} more to {stats.nextTier}
                  </Badge>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Invite {stats.invitesToNextTier} more people to reach {stats.nextTier} Tier and unlock lower fees!
                </p>
              </div>

              {/* Tier List */}
              <div className="space-y-2">
                {tiers.map((tier, index) => {
                  const isCurrentTier = tier.name === stats.currentTier;
                  const isUnlocked = index <= currentTierIndex;
                  
                  return (
                    <div
                      key={tier.name}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        isCurrentTier 
                          ? "border-primary/50 bg-primary/10" 
                          : isUnlocked 
                          ? "border-border/50 bg-muted/30" 
                          : "border-border/30 bg-muted/10 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${tier.bgColor}`}>
                          {tier.name === "Diamond" ? (
                            <Crown className={`h-4 w-4 ${tier.color}`} />
                          ) : (
                            <Star className={`h-4 w-4 ${tier.color}`} />
                          )}
                        </div>
                        <div>
                          <span className={`font-medium ${tier.color}`}>{tier.name}</span>
                          <p className="text-xs text-muted-foreground">
                            {tier.minInvites}+ invites
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {tier.fee} fee
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>
                Your latest successful invites.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReferrals.map((ref, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{ref.name}</p>
                        <p className="text-xs text-muted-foreground">{ref.date}</p>
                      </div>
                    </div>
                    <span className="font-mono text-green-400 text-sm">+{ref.earned}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4">
                View All Referrals
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;