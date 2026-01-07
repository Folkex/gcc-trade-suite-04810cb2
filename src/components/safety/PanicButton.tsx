import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const PanicButton = () => {
  const [open, setOpen] = useState(false);
  const [executing, setExecuting] = useState(false);

  const handleEmergencySell = async () => {
    setExecuting(true);
    // Simulate emergency sell
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setExecuting(false);
    setOpen(false);
    toast.success("Emergency sell executed! All positions closed.");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="relative text-red-500 hover:text-red-400 hover:bg-red-500/10 animate-pulse"
        title="Emergency Sell All"
      >
        <AlertTriangle className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="glass glass-border border-red-500/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              Emergency Sell All Positions
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This will immediately sell ALL open positions across all connected wallets at market price.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400 font-medium">
              ⚠️ Warning: This action cannot be undone. You may experience slippage during emergency sells.
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Open Positions:</span>
              <span className="font-mono text-foreground">5</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Value:</span>
              <span className="font-mono text-foreground">$12,450.00</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Est. Slippage:</span>
              <span className="font-mono text-red-400">~2-5%</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleEmergencySell}
              disabled={executing}
              className="gap-2"
            >
              {executing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Executing...
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  SELL ALL NOW
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PanicButton;