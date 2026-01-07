import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  delay?: number;
}

const PortfolioCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  delay = 0,
}: PortfolioCardProps) => {
  const changeColors = {
    positive: "text-green-500",
    negative: "text-red-500",
    neutral: "text-muted-foreground",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon || <Wallet className="h-4 w-4" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {change && (
            <div className={`flex items-center gap-1 text-sm ${changeColors[changeType]}`}>
              {changeType === "positive" && <TrendingUp className="h-3 w-3" />}
              {changeType === "negative" && <TrendingDown className="h-3 w-3" />}
              {change}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioCard;
