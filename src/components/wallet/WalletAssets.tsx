import { Copy, ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useWallet } from "@/contexts/WalletContext";
import ConnectWalletButton from "./ConnectWalletButton";
import { toast } from "sonner";

const WalletAssets = () => {
  const { 
    isConnected, 
    address, 
    shortAddress, 
    tokenBalances, 
    externalWalletValue,
    portfolioLoading 
  } = useWallet();

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
        <CardHeader>
          <CardTitle>Connected Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to view your assets and balances.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="text-center mb-4">
            <p className="text-muted-foreground">
              No wallet connected. Connect your wallet to see your portfolio.
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
              View and manage your connected wallet assets.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address Display */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50">
          <div>
            <p className="text-sm text-muted-foreground">Wallet Address</p>
            <p className="font-mono text-lg">{shortAddress}</p>
          </div>
          <div className="flex gap-2">
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

        {/* Total Value */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Total Wallet Value</p>
          {portfolioLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-2xl font-bold text-primary font-mono">
              {formatUsd(externalWalletValue)}
            </p>
          )}
        </div>

        {/* Assets Table */}
        <div>
          <h4 className="font-medium mb-3">Assets</h4>
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
      </CardContent>
    </Card>
  );
};

export default WalletAssets;