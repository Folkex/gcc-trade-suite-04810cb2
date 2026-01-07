import React from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SentimentData {
  mood: "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed";
  score: number;
  change24h: number;
}

const mockSentiment: SentimentData = {
  mood: "Greed",
  score: 78,
  change24h: 5,
};

const getMoodColor = (score: number) => {
  if (score >= 75) return "text-primary";
  if (score >= 50) return "text-yellow-400";
  if (score >= 25) return "text-orange-400";
  return "text-destructive";
};

const getMoodGradient = (score: number) => {
  if (score >= 75) return "from-primary/20 to-primary/5";
  if (score >= 50) return "from-yellow-400/20 to-yellow-400/5";
  if (score >= 25) return "from-orange-400/20 to-orange-400/5";
  return "from-destructive/20 to-destructive/5";
};

const AISentimentBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="terminal-card border-primary/30 overflow-hidden">
        <div className={`h-1 bg-gradient-to-r ${getMoodGradient(mockSentiment.score)}`} />
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs text-muted-foreground uppercase">
                AI Sentiment
              </span>
            </div>
            <div className={`flex items-center gap-1 text-xs font-mono ${
              mockSentiment.change24h >= 0 ? "text-primary" : "text-destructive"
            }`}>
              {mockSentiment.change24h >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {mockSentiment.change24h >= 0 ? "+" : ""}{mockSentiment.change24h}
            </div>
          </div>
          
          <div className="text-center mb-3">
            <p className={`text-2xl font-bold font-mono ${getMoodColor(mockSentiment.score)}`}>
              {mockSentiment.mood}
            </p>
            <p className={`text-4xl font-bold font-mono ${getMoodColor(mockSentiment.score)}`}>
              {mockSentiment.score}<span className="text-lg text-muted-foreground">/100</span>
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>Fear</span>
              <span>Greed</span>
            </div>
            <div className="relative h-2 rounded-full bg-gradient-to-r from-destructive via-yellow-400 to-primary overflow-hidden">
              <motion.div
                className="absolute top-0 h-full w-1 bg-white shadow-lg"
                initial={{ left: "0%" }}
                animate={{ left: `${mockSentiment.score}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AISentimentBox;
