import { useState } from "react";
import { Shield, Percent, AlertTriangle, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import ProBadge from "@/components/ui/ProBadge";
import { toast } from "sonner";

const SafetyTriggers = () => {
  const [liquidityDrop, setLiquidityDrop] = useState("50");
  const [taxThreshold, setTaxThreshold] = useState("20");
  const [autoSellLiquidity, setAutoSellLiquidity] = useState(true);
  const [autoSellTax, setAutoSellTax] = useState(true);
  const [honeypotProtection, setHoneypotProtection] = useState(true);
  const [rugPullDetection, setRugPullDetection] = useState(true);

  const handleSave = () => {
    toast.success("Safety triggers updated!");
  };

  return (
    <Card className="glass glass-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Safety Triggers (Anti-Rug)
            </CardTitle>
            <CardDescription>
              Configure automatic protection against scams and rug pulls.
            </CardDescription>
          </div>
          <ProBadge />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auto-Sell on Liquidity Drop */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="font-medium flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                Auto-Sell on Liquidity Drop
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically sell position if liquidity drops below threshold
              </p>
            </div>
            <Switch checked={autoSellLiquidity} onCheckedChange={setAutoSellLiquidity} />
          </div>
          {autoSellLiquidity && (
            <div className="flex items-center gap-3 pl-6">
              <Label className="text-muted-foreground whitespace-nowrap">
                Sell if liquidity drops &gt;
              </Label>
              <Input
                type="number"
                value={liquidityDrop}
                onChange={(e) => setLiquidityDrop(e.target.value)}
                className="w-20 font-mono"
                min="10"
                max="90"
              />
              <span className="text-muted-foreground">%</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Auto-Sell on High Tax */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                Auto-Sell on Tax Increase
              </Label>
              <p className="text-sm text-muted-foreground">
                Automatically sell if buy/sell tax exceeds threshold
              </p>
            </div>
            <Switch checked={autoSellTax} onCheckedChange={setAutoSellTax} />
          </div>
          {autoSellTax && (
            <div className="flex items-center gap-3 pl-6">
              <Label className="text-muted-foreground whitespace-nowrap">
                Sell if tax exceeds &gt;
              </Label>
              <Input
                type="number"
                value={taxThreshold}
                onChange={(e) => setTaxThreshold(e.target.value)}
                className="w-20 font-mono"
                min="5"
                max="50"
              />
              <span className="text-muted-foreground">%</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Honeypot Protection */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="font-medium">Honeypot Protection</Label>
            <p className="text-sm text-muted-foreground">
              Block buys on tokens that can't be sold
            </p>
          </div>
          <Switch checked={honeypotProtection} onCheckedChange={setHoneypotProtection} />
        </div>

        <Separator />

        {/* Rug Pull Detection */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="font-medium">Rug Pull Detection</Label>
            <p className="text-sm text-muted-foreground">
              Alert and auto-sell on suspected rug pull activity
            </p>
          </div>
          <Switch checked={rugPullDetection} onCheckedChange={setRugPullDetection} />
        </div>

        <Button onClick={handleSave} className="w-full gap-2">
          <Save className="h-4 w-4" />
          Save Safety Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default SafetyTriggers;