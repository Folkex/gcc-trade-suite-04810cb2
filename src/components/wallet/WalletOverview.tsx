import { useState } from "react";
import { Wallet, Plus, ArrowDownLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DepositModal from "./DepositModal";

interface WalletOverviewProps {
  onWithdraw?: () => void;
}

const WalletOverview = ({ onWithdraw }: WalletOverviewProps) => {
  const [depositOpen, setDepositOpen] = useState(false);

  // Dummy wallet data
  const walletData = {
    totalUSD: 15420.50,
    eth: 2.45,
    sol: 125.8,
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 font-mono text-sm h-9 border-primary/30 hover:border-primary/50"
          >
            <Wallet className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">${walletData.totalUSD.toLocaleString()}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 glass glass-border">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Trading Balance</span>
            <span className="font-mono text-primary">${walletData.totalUSD.toLocaleString()}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-blue-400">Ξ</span>
                </div>
                <span className="text-muted-foreground">ETH</span>
              </div>
              <span className="font-mono">{walletData.eth}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-purple-400">◎</span>
                </div>
                <span className="text-muted-foreground">SOL</span>
              </div>
              <span className="font-mono">{walletData.sol}</span>
            </div>
          </div>

          <DropdownMenuSeparator />
          
          <div className="p-2 flex gap-2">
            <Button
              size="sm"
              onClick={() => setDepositOpen(true)}
              className="flex-1 gap-1 bg-primary hover:bg-primary/90"
            >
              <Plus className="h-3 w-3" />
              Deposit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onWithdraw}
              className="flex-1 gap-1"
            >
              <ArrowDownLeft className="h-3 w-3" />
              Withdraw
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </>
  );
};

export default WalletOverview;