import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  Users,
  Droplets,
  Code,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

interface ScanResult {
  label: string;
  status: "safe" | "warning" | "danger";
  value: string;
  icon: LucideIcon;
}

const mockResults: ScanResult[] = [
  { label: "Mint Authority", status: "safe", value: "Disabled", icon: Lock },
  { label: "Liquidity Locked", status: "safe", value: "98%", icon: Droplets },
  { label: "Top 10 Holders", status: "safe", value: "15%", icon: Users },
  { label: "Contract Verified", status: "safe", value: "Yes", icon: Code },
  { label: "Honeypot Check", status: "safe", value: "Passed", icon: Shield },
];

const Scanner = () => {
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [safetyScore] = useState(92);

  const handleScan = async () => {
    if (!address.trim()) {
      toast.error("Please enter a token address");
      return;
    }

    setIsScanning(true);
    setShowResults(false);

    // Simulate scanning
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsScanning(false);
    setShowResults(true);
    toast.success("Scan complete!");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case "danger":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-primary";
    if (score >= 50) return "text-yellow-400";
    return "text-destructive";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-primary to-primary/50";
    if (score >= 50) return "from-yellow-400 to-yellow-400/50";
    return "from-destructive to-destructive/50";
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/25">
            <Shield className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
              CONTRACT_SCANNER<span className="text-primary animate-pulse">_</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              // Rug check & safety analysis
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scanner Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="terminal-card border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Paste token contract address..."
                  className="pl-12 h-14 text-lg font-mono bg-muted/30 border-primary/20 focus:border-primary"
                />
              </div>
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-lg"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    SCANNING...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    SCAN
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Safety Score Gauge */}
          <Card className="terminal-card border-primary/30 overflow-hidden">
            <div className={`h-1 bg-gradient-to-r ${getScoreGradient(safetyScore)}`} />
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <p className="font-mono text-sm text-muted-foreground uppercase mb-2">
                    Safety Score
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-7xl font-bold font-mono ${getScoreColor(safetyScore)}`}>
                      {safetyScore}
                    </span>
                    <span className="text-2xl text-muted-foreground font-mono">/100</span>
                  </div>
                  <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">
                    LOW RISK
                  </Badge>
                </div>

                {/* Speedometer Visual */}
                <div className="relative w-48 h-24">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    {/* Background arc */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Score arc */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${safetyScore * 1.25} 125`}
                      className="drop-shadow-[0_0_8px_hsl(var(--primary))]"
                    />
                    {/* Needle */}
                    <line
                      x1="50"
                      y1="50"
                      x2={50 + 30 * Math.cos(Math.PI * (1 - safetyScore / 100))}
                      y2={50 - 30 * Math.sin(Math.PI * (1 - safetyScore / 100))}
                      stroke="hsl(var(--foreground))"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="4" fill="hsl(var(--foreground))" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockResults.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className={`terminal-card ${
                  result.status === "safe" ? "border-primary/30" :
                  result.status === "warning" ? "border-yellow-400/30" :
                  "border-destructive/30"
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          result.status === "safe" ? "bg-primary/20" :
                          result.status === "warning" ? "bg-yellow-400/20" :
                          "bg-destructive/20"
                        }`}>
                          <result.icon className={`h-5 w-5 ${
                            result.status === "safe" ? "text-primary" :
                            result.status === "warning" ? "text-yellow-400" :
                            "text-destructive"
                          }`} />
                        </div>
                        <div>
                          <p className="font-mono text-xs text-muted-foreground uppercase">
                            {result.label}
                          </p>
                          <p className={`font-mono text-lg font-bold ${
                            result.status === "safe" ? "text-primary" :
                            result.status === "warning" ? "text-yellow-400" :
                            "text-destructive"
                          }`}>
                            {result.value}
                          </p>
                        </div>
                      </div>
                      {getStatusIcon(result.status)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Scanner;
