import { Copy, ExternalLink, Link2Off, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useWallet, INTERNAL_BALANCE } from "@/contexts/WalletContext";
import ConnectWalletButton from "./ConnectWalletButton";
import { toast } from "sonner";

const CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  56: 'BNB Smart Chain',
  137: 'Polygon',
  42161: 'Arbitrum One',
};

const WalletAssets = () => {
  const { 
    isConnected, 
    address, 
    shortAddress, 
    chainId,
    tokenBalances, 
    externalWalletValue,
    portfolioLoading,
    disconnect
  } = useWallet();

  const grandTotal = INTERNAL_BALANCE + externalWalletValue;
  const chainName = chainId ? CHAIN_NAMES[chainId] || `Chain ${chainId}` : 'Unknown';

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard!");
    }
  };

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
      <Card className="glass glass-border">
        <CardHeader className="text-center pb-2">
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to view your real assets and balances.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Wifi className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center max-w-sm">
            <p className="text-muted-foreground mb-6">
              Link your MetaMask, Trust Wallet, or any Web3 wallet to see your portfolio.
            </p>
          </div>
          <ConnectWalletButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass glass-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Connected Wallet</CardTitle>
            <CardDescription>
              Your real wallet assets and balances.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address & Network Status */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Address Card */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Wallet Address</p>
            <div className="flex items-center justify-between">
              <p className="font-mono text-lg">{shortAddress}</p>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleCopyAddress}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => window.open(`https://etherscan.io/address/${address}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Network Status</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-medium">Connected</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {chainName}
              </Badge>
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
          {portfolioLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-3xl font-bold text-primary font-mono">
              {formatUsd(grandTotal)}
            </p>
          )}
        </div>

        {/* Assets Table */}
        <div>
          <h4 className="font-medium mb-3">Your Assets</h4>
          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead>Asset</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead className="text-right">Value (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioLoading ? (
                  [...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div>
                            <Skeleton className="h-4 w-16 mb-1" />
                            <Skeleton className="h-3 w-12" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : tokenBalances.length > 0 ? (
                  tokenBalances.map((token) => (
                    <TableRow key={token.symbol} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {token.icon ? (
                            <img 
                              src={token.icon} 
                              alt={token.symbol}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                              {token.symbol.slice(0, 2)}
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{token.name}</p>
                            <p className="text-xs text-muted-foreground">{token.symbol}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {token.balance} {token.symbol}
                      </TableCell>
                      <TableCell className="text-right font-mono text-primary">
                        {formatUsd(token.valueUsd)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                      No assets found in this wallet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Disconnect Button */}
        <Button 
          variant="outline" 
          className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={disconnect}
        >
          <Link2Off className="h-4 w-4" />
          Disconnect Wallet
        </Button>
      </CardContent>
    </Card>
  );
};

export default WalletAssets;