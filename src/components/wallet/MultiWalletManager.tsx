import { useState } from "react";
import { Wallet, Plus, Trash2, Check, Power } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import ProBadge from "@/components/ui/ProBadge";
import { toast } from "sonner";

interface WalletSlot {
  id: string;
  name: string;
  address: string;
  ethBalance: number;
  solBalance: number;
  active: boolean;
  primary: boolean;
}

const MultiWalletManager = () => {
  const [wallets, setWallets] = useState<WalletSlot[]>([
    {
      id: "1",
      name: "Wallet A",
      address: "0x742d...8aBc1",
      ethBalance: 1.25,
      solBalance: 50.0,
      active: true,
      primary: true,
    },
    {
      id: "2",
      name: "Wallet B",
      address: "0x9f3e...2dFa4",
      ethBalance: 0.85,
      solBalance: 25.5,
      active: true,
      primary: false,
    },
    {
      id: "3",
      name: "Wallet C",
      address: "0x1a2b...7cDe8",
      ethBalance: 0.35,
      solBalance: 50.3,
      active: false,
      primary: false,
    },
  ]);

  const [shotgunMode, setShotgunMode] = useState(false);

  const toggleWalletActive = (id: string) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
    toast.success("Wallet status updated");
  };

  const setPrimaryWallet = (id: string) => {
    setWallets((prev) =>
      prev.map((w) => ({ ...w, primary: w.id === id }))
    );
    toast.success("Primary wallet updated");
  };

  return (
    <Card className="glass glass-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Multi-Wallet Manager
            </CardTitle>
            <CardDescription>
              Connect and manage multiple trading wallets.
            </CardDescription>
          </div>
          <ProBadge />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Shotgun Mode Toggle */}
        <div className="relative p-4 rounded-lg bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30">
          <div className="absolute -top-2 left-3">
            <Badge variant="outline" className="text-[10px] bg-background border-red-500/50 text-red-400">
              SHOTGUN MODE
            </Badge>
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">Fire from All Wallets</p>
              <p className="text-xs text-muted-foreground">
                Execute trades simultaneously from all active wallets
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Power className={`h-4 w-4 ${shotgunMode ? "text-red-400" : "text-muted-foreground"}`} />
              <Switch
                checked={shotgunMode}
                onCheckedChange={setShotgunMode}
                className="data-[state=checked]:bg-red-500"
              />
            </div>
          </div>
        </div>

        {/* Wallet Slots */}
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`p-4 rounded-lg border transition-all ${
                wallet.active
                  ? "bg-muted/30 border-primary/30"
                  : "bg-muted/10 border-border/50 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{wallet.name}</span>
                  {wallet.primary && (
                    <Badge variant="secondary" className="text-[10px]">
                      PRIMARY
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPrimaryWallet(wallet.id)}
                    disabled={wallet.primary}
                    className="h-7 text-xs"
                  >
                    {wallet.primary ? (
                      <Check className="h-3 w-3 mr-1 text-green-500" />
                    ) : null}
                    Set Primary
                  </Button>
                  <Switch
                    checked={wallet.active}
                    onCheckedChange={() => toggleWalletActive(wallet.id)}
                  />
                </div>
              </div>

              <code className="text-xs text-muted-foreground font-mono">
                {wallet.address}
              </code>

              <div className="flex gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-400 text-xs">Ξ</span>
                  <span className="font-mono">{wallet.ethBalance} ETH</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-400 text-xs">◎</span>
                  <span className="font-mono">{wallet.solBalance} SOL</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Connect Additional Wallet
        </Button>
      </CardContent>
    </Card>
  );
};

export default MultiWalletManager;