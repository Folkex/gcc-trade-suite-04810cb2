import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ConnectWalletButtonProps {
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
}

const ConnectWalletButton = ({ variant = 'default', className }: ConnectWalletButtonProps) => {
  const { 
    isConnected, 
    shortAddress, 
    balance, 
    balanceSymbol,
    openConnectModal, 
    disconnect,
    address,
    chainId,
    isLoading 
  } = useWallet();

  const getChainName = (id: number | undefined) => {
    switch (id) {
      case 1: return 'Ethereum';
      case 56: return 'BSC';
      case 137: return 'Polygon';
      case 42161: return 'Arbitrum';
      default: return 'Unknown';
    }
  };

  const getChainColor = (id: number | undefined) => {
    switch (id) {
      case 1: return 'text-blue-400';
      case 56: return 'text-yellow-400';
      case 137: return 'text-purple-400';
      case 42161: return 'text-blue-300';
      default: return 'text-muted-foreground';
    }
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success('Address copied to clipboard');
    }
  };

  const openExplorer = () => {
    if (!address || !chainId) return;
    const explorers: Record<number, string> = {
      1: 'https://etherscan.io/address/',
      56: 'https://bscscan.com/address/',
      137: 'https://polygonscan.com/address/',
      42161: 'https://arbiscan.io/address/',
    };
    const baseUrl = explorers[chainId] || 'https://etherscan.io/address/';
    window.open(`${baseUrl}${address}`, '_blank');
  };

  if (isLoading) {
    return (
      <Button 
        variant="outline" 
        disabled 
        className={cn(
          "border-primary/30 bg-primary/5",
          className
        )}
      >
        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        Connecting...
      </Button>
    );
  }

  if (!isConnected) {
    return (
      <Button
        onClick={openConnectModal}
        className={cn(
          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all duration-300",
          variant === 'icon' && "w-10 h-10 p-0",
          className
        )}
      >
        <Wallet className={cn("h-4 w-4", variant !== 'icon' && "mr-2")} />
        {variant !== 'icon' && (variant === 'compact' ? 'Connect' : 'Connect Wallet')}
      </Button>
    );
  }

  // Connected state
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-sm">{shortAddress}</span>
            {variant === 'default' && (
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {balance} {balanceSymbol}
              </span>
            )}
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-card border-border">
        {/* Balance & Chain */}
        <div className="px-3 py-2 border-b border-border">
          <p className="text-sm font-medium">{balance} {balanceSymbol}</p>
          <p className={cn("text-xs", getChainColor(chainId))}>
            {getChainName(chainId)}
          </p>
        </div>

        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="h-4 w-4 mr-2" />
          Copy Address
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={openExplorer} className="cursor-pointer">
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Explorer
        </DropdownMenuItem>

        <DropdownMenuItem onClick={openConnectModal} className="cursor-pointer">
          <Wallet className="h-4 w-4 mr-2" />
          Switch Network
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          onClick={disconnect} 
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ConnectWalletButton;
