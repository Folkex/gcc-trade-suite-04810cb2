import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const marketData = [
  { symbol: "BTC/USD", name: "Bitcoin", price: "43,256.78", change: "+2.34%", positive: true },
  { symbol: "ETH/USD", name: "Ethereum", price: "2,567.89", change: "+1.89%", positive: true },
  { symbol: "EUR/USD", name: "Euro", price: "1.0892", change: "-0.12%", positive: false },
  { symbol: "AAPL", name: "Apple Inc.", price: "178.45", change: "+0.78%", positive: true },
  { symbol: "GOLD", name: "Gold Spot", price: "2,034.56", change: "-0.45%", positive: false },
  { symbol: "OIL", name: "Crude Oil", price: "76.89", change: "+1.23%", positive: true },
];

const MarketOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketData.map((item, index) => (
              <motion.div
                key={item.symbol}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">
                      {item.symbol.slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.symbol}</p>
                    <p className="text-xs text-muted-foreground">{item.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">${item.price}</p>
                  <p
                    className={`text-xs flex items-center gap-1 justify-end ${
                      item.positive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.positive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {item.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketOverview;
