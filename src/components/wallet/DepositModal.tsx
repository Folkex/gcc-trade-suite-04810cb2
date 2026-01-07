import { useState } from "react";
import { Copy, Check, AlertTriangle, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface DepositModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DepositModal = ({ open, onOpenChange }: DepositModalProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const walletAddresses = {
    eth: "0x742d35Cc6634C0532925a3b844Bc9e7595f8aBc1",
    sol: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  };

  const handleCopy = (address: string, chain: string) => {
    navigator.clipboard.writeText(address);
    setCopied(chain);
    toast.success(`${chain.toUpperCase()} address copied!`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass glass-border max-w-md">
        <DialogHeader>
          <DialogTitle>Top Up Trading Wallet</DialogTitle>
          <DialogDescription>
            Deposit funds to start trading. Select your preferred network.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="eth" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="eth" className="gap-2">
              <span className="text-blue-400">Ξ</span> Ethereum
            </TabsTrigger>
            <TabsTrigger value="sol" className="gap-2">
              <span className="text-purple-400">◎</span> Solana
            </TabsTrigger>
          </TabsList>

          <TabsContent value="eth" className="space-y-4 mt-4">
            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-white rounded-lg p-2 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">ETH Deposit Address</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-muted/50 rounded-lg font-mono text-xs break-all border border-border">
                  {walletAddresses.eth}
                </code>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleCopy(walletAddresses.eth, "eth")}
                >
                  {copied === "eth" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-200">
                Send only <strong>ETH or ERC-20 tokens</strong> to this address. Funds usually arrive in &lt; 1 minute.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="sol" className="space-y-4 mt-4">
            {/* QR Code Placeholder */}
            <div className="flex justify-center">
              <div className="w-40 h-40 bg-white rounded-lg p-2 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">SOL Deposit Address</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 p-3 bg-muted/50 rounded-lg font-mono text-xs break-all border border-border">
                  {walletAddresses.sol}
                </code>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleCopy(walletAddresses.sol, "sol")}
                >
                  {copied === "sol" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-200">
                Send only <strong>SOL or SPL tokens</strong> to this address. Funds usually arrive in &lt; 30 seconds.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;