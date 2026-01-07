import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  CreditCard, 
  AlertTriangle,
  Send,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TransactionHistory from "@/components/wallet/TransactionHistory";
import ProBadge from "@/components/ui/ProBadge";
import { toast } from "sonner";

const Wallet = () => {
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [twoFACode, setTwoFACode] = useState("");

  // Dummy wallet data
  const walletData = {
    totalUSD: 15420.50,
    eth: 2.45,
    sol: 125.8,
    ethPrice: 3850,
    solPrice: 98,
  };

  const networkFee = 0.002; // ETH
  const totalToReceive = parseFloat(withdrawAmount || "0") - networkFee;

  const handleWithdraw = () => {
    if (!withdrawAddress || !withdrawAmount || !twoFACode) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Withdrawal initiated! Check your wallet shortly.");
    setWithdrawAddress("");
    setWithdrawAmount("");
    setTwoFACode("");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Wallet Manager
          </h1>
          <ProBadge />
        </div>
        <p className="text-muted-foreground">
          Manage your trading funds, deposits, and withdrawals.
        </p>
      </motion.div>

      {/* Balance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3 mb-6"
      >
        <Card className="glass glass-border md:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
              <p className="text-3xl font-bold font-mono text-primary">
                ${walletData.totalUSD.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-400">Ξ</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ethereum</p>
                <p className="text-xl font-bold font-mono">{walletData.eth} ETH</p>
                <p className="text-xs text-muted-foreground">
                  ≈ ${(walletData.eth * walletData.ethPrice).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-lg font-bold text-purple-400">◎</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Solana</p>
                <p className="text-xl font-bold font-mono">{walletData.sol} SOL</p>
                <p className="text-xs text-muted-foreground">
                  ≈ ${(walletData.sol * walletData.solPrice).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Withdraw / Buy Crypto Tabs */}
        <Card className="glass glass-border">
          <CardHeader>
            <CardTitle>Manage Funds</CardTitle>
            <CardDescription>
              Withdraw or purchase crypto with fiat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="withdraw">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="withdraw" className="gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  Withdraw
                </TabsTrigger>
                <TabsTrigger value="buy" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Buy Crypto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="withdraw" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Destination Address</Label>
                  <Input
                    id="address"
                    placeholder="0x... or SOL address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Withdraw (ETH)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="2fa">2FA Code</Label>
                  <Input
                    id="2fa"
                    placeholder="Enter 6-digit code"
                    value={twoFACode}
                    onChange={(e) => setTwoFACode(e.target.value)}
                    maxLength={6}
                    className="font-mono tracking-widest"
                  />
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Network Fee</span>
                    <span className="font-mono">{networkFee} ETH</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total to Receive</span>
                    <span className="font-mono text-primary">
                      {totalToReceive > 0 ? totalToReceive.toFixed(4) : "0.00"} ETH
                    </span>
                  </div>
                </div>

                <Button onClick={handleWithdraw} className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Withdraw Funds
                </Button>
              </TabsContent>

              <TabsContent value="buy" className="mt-4">
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Buy Crypto Instantly</h3>
                    <p className="text-sm text-muted-foreground">
                      Purchase ETH or SOL with your credit card or bank account.
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" className="gap-2">
                      <img
                        src="https://via.placeholder.com/20"
                        alt="MoonPay"
                        className="h-5 w-5 rounded"
                      />
                      MoonPay
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <img
                        src="https://via.placeholder.com/20"
                        alt="Stripe"
                        className="h-5 w-5 rounded"
                      />
                      Stripe
                    </Button>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    Secure payments powered by industry leaders
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <TransactionHistory />
      </motion.div>
    </DashboardLayout>
  );
};

export default Wallet;