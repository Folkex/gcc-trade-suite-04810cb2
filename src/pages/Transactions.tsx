import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRightLeft, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter,
  Search,
  Download,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "buy" | "sell" | "deposit" | "withdrawal" | "fee";
  asset: string;
  amount: string;
  value: string;
  status: "completed" | "pending" | "failed";
  timestamp: string;
  txHash: string;
  chain: "ETH" | "SOL";
}

const transactions: Transaction[] = [
  { id: "1", type: "buy", asset: "PEPE", amount: "+1,500,000", value: "$450.00", status: "completed", timestamp: "2 hours ago", txHash: "0x123...abc", chain: "ETH" },
  { id: "2", type: "sell", asset: "DOGE", amount: "-5,000", value: "$425.50", status: "completed", timestamp: "5 hours ago", txHash: "0x456...def", chain: "ETH" },
  { id: "3", type: "deposit", asset: "ETH", amount: "+1.5", value: "$5,775.00", status: "completed", timestamp: "1 day ago", txHash: "0x789...ghi", chain: "ETH" },
  { id: "4", type: "buy", asset: "BONK", amount: "+50,000,000", value: "$1,250.00", status: "completed", timestamp: "1 day ago", txHash: "7xK...sU", chain: "SOL" },
  { id: "5", type: "withdrawal", asset: "SOL", amount: "-25", value: "$2,450.00", status: "pending", timestamp: "2 days ago", txHash: "8yL...tV", chain: "SOL" },
  { id: "6", type: "fee", asset: "ETH", amount: "-0.005", value: "$19.25", status: "completed", timestamp: "2 days ago", txHash: "0xabc...123", chain: "ETH" },
  { id: "7", type: "sell", asset: "WIF", amount: "-10,000", value: "$2,100.00", status: "completed", timestamp: "3 days ago", txHash: "9zM...uW", chain: "SOL" },
  { id: "8", type: "buy", asset: "SHIB", amount: "+25,000,000", value: "$575.00", status: "failed", timestamp: "3 days ago", txHash: "0xdef...456", chain: "ETH" },
];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "buy":
        return <ArrowDownLeft className="h-4 w-4 text-green-400" />;
      case "sell":
        return <ArrowUpRight className="h-4 w-4 text-red-400" />;
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-blue-400" />;
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-orange-400" />;
      case "fee":
        return <span className="text-xs text-muted-foreground font-mono">FEE</span>;
    }
  };

  const getTypeBadge = (type: Transaction["type"]) => {
    const colors = {
      buy: "bg-green-500/10 text-green-400 border-green-500/30",
      sell: "bg-red-500/10 text-red-400 border-red-500/30",
      deposit: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      withdrawal: "bg-orange-500/10 text-orange-400 border-orange-500/30",
      fee: "bg-muted text-muted-foreground border-border",
    };
    return (
      <Badge variant="outline" className={colors[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    const colors = {
      completed: "bg-green-500/10 text-green-400 border-green-500/30",
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      failed: "bg-red-500/10 text-red-400 border-red-500/30",
    };
    return (
      <Badge variant="outline" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Transactions
              </h1>
            </div>
            <p className="text-muted-foreground">
              View all your trades, deposits, and withdrawals.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => toast.success("Export started!")}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by asset or tx hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="buy">Buy</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="withdrawal">Withdrawal</SelectItem>
            <SelectItem value="fee">Fee</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass glass-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Value</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Time</TableHead>
                  <TableHead className="text-right">Tx</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          {getTypeIcon(tx.type)}
                        </div>
                        <span className="hidden sm:inline">{getTypeBadge(tx.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          tx.chain === "ETH" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"
                        }`}>
                          {tx.chain === "ETH" ? "Ξ" : "◎"}
                        </div>
                        <span className="font-medium">{tx.asset}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-mono ${
                        tx.amount.startsWith("+") ? "text-green-400" : "text-foreground"
                      }`}>
                        {tx.amount}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell font-mono">
                      {tx.value}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getStatusBadge(tx.status)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground">
                      {tx.timestamp}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toast.info(`Opening ${tx.txHash}`)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Transactions;