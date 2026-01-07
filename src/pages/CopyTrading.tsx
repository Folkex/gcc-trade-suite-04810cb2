import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Eye, 
  EyeOff, 
  ToggleLeft, 
  ToggleRight,
  Wallet as WalletIcon,
  Percent,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProBadge from "@/components/ui/ProBadge";
import { toast } from "sonner";

interface TrackedWallet {
  id: string;
  nickname: string;
  address: string;
  winRate: number;
  trades: number;
  pnl: string;
  autoCopy: boolean;
  lastActive: string;
}

const initialWallets: TrackedWallet[] = [
  {
    id: "1",
    nickname: "Smart Money 1",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f8aBc1",
    winRate: 85,
    trades: 142,
    pnl: "+$45,200",
    autoCopy: true,
    lastActive: "2 min ago",
  },
  {
    id: "2",
    nickname: "Whale Alpha",
    address: "0x9f3e78A2e5Db8A5c2dFa4E6C35Cc6634C053Bc12",
    winRate: 78,
    trades: 89,
    pnl: "+$28,450",
    autoCopy: false,
    lastActive: "15 min ago",
  },
  {
    id: "3",
    nickname: "Degen King",
    address: "0x1a2b3c4d5e6f7890AbCdEf1234567890AbCdEf12",
    winRate: 92,
    trades: 67,
    pnl: "+$112,800",
    autoCopy: true,
    lastActive: "Just now",
  },
];

const CopyTrading = () => {
  const [wallets, setWallets] = useState<TrackedWallet[]>(initialWallets);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [newWalletNickname, setNewWalletNickname] = useState("");

  const handleAddWallet = () => {
    if (!newWalletAddress || !newWalletNickname) {
      toast.error("Please fill in all fields");
      return;
    }

    const newWallet: TrackedWallet = {
      id: Date.now().toString(),
      nickname: newWalletNickname,
      address: newWalletAddress,
      winRate: Math.floor(Math.random() * 30) + 60,
      trades: 0,
      pnl: "$0",
      autoCopy: false,
      lastActive: "Just added",
    };

    setWallets((prev) => [...prev, newWallet]);
    setNewWalletAddress("");
    setNewWalletNickname("");
    setAddModalOpen(false);
    toast.success(`Now tracking ${newWalletNickname}!`);
  };

  const toggleAutoCopy = (id: string) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, autoCopy: !w.autoCopy } : w))
    );
    toast.success("Auto-copy setting updated");
  };

  const removeWallet = (id: string) => {
    setWallets((prev) => prev.filter((w) => w.id !== id));
    toast.success("Wallet removed from tracking");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Copy Trading
              </h1>
              <ProBadge />
            </div>
            <p className="text-muted-foreground">
              Track and automatically copy trades from successful wallets.
            </p>
          </div>
          <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="glass glass-border">
              <DialogHeader>
                <DialogTitle>Track New Wallet</DialogTitle>
                <DialogDescription>
                  Enter a wallet address to start tracking its trades.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="nickname">Nickname</Label>
                  <Input
                    id="nickname"
                    placeholder="e.g., Smart Money 2"
                    value={newWalletNickname}
                    onChange={(e) => setNewWalletNickname(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Wallet Address</Label>
                  <Input
                    id="address"
                    placeholder="0x..."
                    value={newWalletAddress}
                    onChange={(e) => setNewWalletAddress(e.target.value)}
                    className="font-mono"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddWallet}>Start Tracking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3 mb-6"
      >
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <WalletIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tracked Wallets</p>
                <p className="text-2xl font-bold font-mono">{wallets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Percent className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Win Rate</p>
                <p className="text-2xl font-bold font-mono text-green-400">
                  {wallets.length > 0
                    ? Math.round(
                        wallets.reduce((acc, w) => acc + w.winRate, 0) / wallets.length
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Activity className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-Copy Active</p>
                <p className="text-2xl font-bold font-mono">
                  {wallets.filter((w) => w.autoCopy).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tracked Wallets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass glass-border">
          <CardHeader>
            <CardTitle>Tracked Wallets</CardTitle>
            <CardDescription>
              Monitor performance and enable auto-copy for each wallet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <div
                  key={wallet.id}
                  className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{wallet.nickname}</h3>
                        <Badge
                          variant="outline"
                          className={
                            wallet.winRate >= 80
                              ? "text-green-400 border-green-500/50"
                              : wallet.winRate >= 60
                              ? "text-amber-400 border-amber-500/50"
                              : "text-red-400 border-red-500/50"
                          }
                        >
                          {wallet.winRate}% Win Rate
                        </Badge>
                      </div>
                      <code className="text-xs text-muted-foreground font-mono">
                        {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}
                      </code>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeWallet(wallet.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">Trades: </span>
                        <span className="font-mono">{wallet.trades}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">PnL: </span>
                        <span className="font-mono text-green-400">{wallet.pnl}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Active: </span>
                        <span>{wallet.lastActive}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">Auto-Copy</span>
                      <Switch
                        checked={wallet.autoCopy}
                        onCheckedChange={() => toggleAutoCopy(wallet.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {wallets.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <WalletIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No wallets tracked yet.</p>
                  <p className="text-sm">Add a wallet to start copy trading.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default CopyTrading;