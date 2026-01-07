import { ArrowDownLeft, ArrowUpRight, Clock, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "fee";
  amount: string;
  asset: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  txHash: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: "+1.5",
    asset: "ETH",
    status: "completed",
    timestamp: "2 hours ago",
    txHash: "0x123...abc",
  },
  {
    id: "2",
    type: "withdrawal",
    amount: "-0.5",
    asset: "ETH",
    status: "pending",
    timestamp: "5 hours ago",
    txHash: "0x456...def",
  },
  {
    id: "3",
    type: "deposit",
    amount: "+100",
    asset: "SOL",
    status: "completed",
    timestamp: "1 day ago",
    txHash: "7xK...sU",
  },
  {
    id: "4",
    type: "fee",
    amount: "-0.01",
    asset: "ETH",
    status: "completed",
    timestamp: "1 day ago",
    txHash: "0x789...ghi",
  },
  {
    id: "5",
    type: "withdrawal",
    amount: "-25",
    asset: "SOL",
    status: "failed",
    timestamp: "2 days ago",
    txHash: "8yL...tV",
  },
];

const TransactionHistory = () => {
  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="text-green-400 border-green-500/50 gap-1">
            <Check className="h-3 w-3" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-400 border-amber-500/50 gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="text-red-400 border-red-500/50 gap-1">
            <X className="h-3 w-3" />
            Failed
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-400" />;
      case "fee":
        return <span className="text-xs text-muted-foreground">FEE</span>;
    }
  };

  return (
    <Card className="glass glass-border">
      <CardHeader>
        <CardTitle>Recent Transfers</CardTitle>
        <CardDescription>
          Your deposit, withdrawal, and fee history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {getTypeIcon(tx.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-medium ${
                        tx.type === "deposit" ? "text-green-400" : "text-foreground"
                      }`}
                    >
                      {tx.amount} {tx.asset}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{tx.timestamp}</span>
                    <span>•</span>
                    <code className="font-mono">{tx.txHash}</code>
                  </div>
                </div>
              </div>
              {getStatusBadge(tx.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;