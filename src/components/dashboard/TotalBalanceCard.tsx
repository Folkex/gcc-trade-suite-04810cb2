import { Wallet, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useWallet, INTERNAL_BALANCE } from "@/contexts/WalletContext";
import ConnectWalletButton from "@/components/wallet/ConnectWalletButton";

const TotalBalanceCard = () => {
  const { isConnected, externalWalletValue, portfolioLoading } = useWallet();

  const grandTotal = INTERNAL_BALANCE + externalWalletValue;

  const formatUsd = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="glass glass-border h-full hover:border-primary/30 transition-all group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 cursor-help">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <div className="space-y-2 p-1">
                  <p className="font-medium">Balance Breakdown</p>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Internal:</span>
                      <span className="font-mono">{formatUsd(INTERNAL_BALANCE)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Wallet:</span>
                      <span className="font-mono">{formatUsd(externalWalletValue)}</span>
                    </div>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Balance</p>
        
        {!isConnected ? (
          <div className="space-y-3">
            <p className="text-xl font-mono text-muted-foreground">
              Connect wallet to view
            </p>
            <ConnectWalletButton />
          </div>
        ) : portfolioLoading ? (
          <Skeleton className="h-9 w-32" />
        ) : (
          <>
            <p className="text-3xl font-bold font-mono text-primary">
              {formatUsd(grandTotal)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                Live
              </Badge>
              <span className="text-xs text-muted-foreground">
                {externalWalletValue > 0 ? 'Wallet connected' : 'No assets detected'}
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TotalBalanceCard;