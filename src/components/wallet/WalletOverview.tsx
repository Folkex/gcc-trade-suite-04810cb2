import { useState } from "react";
import { Wallet, Plus, ArrowDownLeft, ChevronDown, Link2Off } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import DepositModal from "./DepositModal";
import { useWallet, INTERNAL_BALANCE } from "@/contexts/WalletContext";

interface WalletOverviewProps {
  onWithdraw?: () => void;
}

const WalletOverview = ({ onWithdraw }: WalletOverviewProps) => {
  const [depositOpen, setDepositOpen] = useState(false);
  const { 
    isConnected, 
    tokenBalances, 
    externalWalletValue, 
    portfolioLoading,
    openConnectModal,
    disconnect 
  } = useWallet();

  const grandTotal = INTERNAL_BALANCE + externalWalletValue;

  const formatUsd = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (!isConnected) {
    return (
      <Button
        variant="outline"
        className="gap-2 font-mono text-sm h-9 border-primary/30 hover:border-primary/50"
        onClick={openConnectModal}
      >
        <Wallet className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Connect Wallet</span>
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 font-mono text-sm h-9 border-primary/30 hover:border-primary/50"
          >
            <Wallet className="h-4 w-4 text-primary" />
            {portfolioLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <span className="hidden sm:inline">{formatUsd(grandTotal)}</span>
            )}
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 glass glass-border">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Trading Balance</span>
            {portfolioLoading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <span className="font-mono text-primary">{formatUsd(grandTotal)}</span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="px-2 py-2 space-y-2">
            {portfolioLoading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))
            ) : tokenBalances.length > 0 ? (
              tokenBalances.map((token) => (
                <div key={token.symbol} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {token.icon ? (
                      <img src={token.icon} alt={token.symbol} className="w-5 h-5 rounded-full" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">{token.symbol.slice(0, 1)}</span>
                      </div>
                    )}
                    <span className="text-muted-foreground">{token.symbol}</span>
                  </div>
                  <span className="font-mono">{token.balance}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-2">No assets detected</p>
            )}
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

          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={disconnect} className="text-destructive focus:text-destructive gap-2">
            <Link2Off className="h-4 w-4" />
            Disconnect Wallet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} />
    </>
  );
};

export default WalletOverview;