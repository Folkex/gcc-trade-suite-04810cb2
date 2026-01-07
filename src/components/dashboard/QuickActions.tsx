import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, RefreshCw, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { icon: ArrowUpRight, label: "Buy", color: "bg-green-500/10 text-green-500 hover:bg-green-500/20" },
  { icon: ArrowDownLeft, label: "Sell", color: "bg-red-500/10 text-red-500 hover:bg-red-500/20" },
  { icon: RefreshCw, label: "Exchange", color: "bg-primary/10 text-primary hover:bg-primary/20" },
  { icon: History, label: "History", color: "bg-accent/10 text-accent hover:bg-accent/20" },
];

const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Button
                  variant="ghost"
                  className={`w-full h-20 flex flex-col gap-2 ${action.color}`}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
