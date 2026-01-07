import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface MarketsSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Live Markets",
    title: "Real-Time Market Intelligence",
    subtitle: "Track crypto, forex, and commodities with professional-grade tools and lightning-fast data.",
    viewAll: "Open Trading Terminal",
    stats: [
      { label: "Markets Tracked", value: "500+", icon: BarChart3 },
      { label: "Daily Volume", value: "$2.5B+", icon: Activity },
      { label: "Update Speed", value: "<100ms", icon: Zap },
    ],
  },
  ar: {
    badge: "الأسواق الحية",
    title: "ذكاء السوق في الوقت الفعلي",
    subtitle: "تتبع العملات الرقمية والفوركس والسلع بأدوات احترافية وبيانات فائقة السرعة.",
    viewAll: "افتح محطة التداول",
    stats: [
      { label: "الأسواق المتتبعة", value: "+500", icon: BarChart3 },
      { label: "الحجم اليومي", value: "+$2.5B", icon: Activity },
      { label: "سرعة التحديث", value: "<100ms", icon: Zap },
    ],
  },
};

const mockMarkets = [
  { symbol: "BTC", name: "Bitcoin", price: "43,250.00", change: 2.45, volume: "2.1B", icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: "2,285.30", change: 3.12, volume: "890M", icon: "Ξ" },
  { symbol: "SOL", name: "Solana", price: "98.45", change: 5.67, volume: "520M", icon: "◎" },
  { symbol: "BNB", name: "Binance", price: "312.80", change: -1.23, volume: "340M", icon: "B" },
  { symbol: "XRP", name: "Ripple", price: "0.6234", change: 1.89, volume: "280M", icon: "X" },
  { symbol: "DOGE", name: "Dogecoin", price: "0.0892", change: -2.15, volume: "180M", icon: "Ð" },
];

const MarketsSection = ({ lang }: MarketsSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24 relative overflow-hidden" id="markets">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success mb-6">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12"
        >
          {t.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
            >
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {mockMarkets.map((market, index) => (
            <motion.div
              key={market.symbol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
            >
              {/* Icon & Symbol */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary">
                  {market.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm">{market.symbol}</div>
                  <div className="text-xs text-muted-foreground">{market.name}</div>
                </div>
              </div>
              
              {/* Price */}
              <div className="font-mono text-lg font-bold mb-1">${market.price}</div>
              
              {/* Change */}
              <div className={`flex items-center gap-1 text-sm ${market.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {market.change >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                <span className="font-medium">{market.change >= 0 ? '+' : ''}{market.change}%</span>
              </div>
              
              {/* Mini Chart Line */}
              <div className="mt-3 h-8 flex items-end gap-0.5">
                {[...Array(12)].map((_, i) => {
                  const height = 20 + Math.random() * 80;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${market.change >= 0 ? 'bg-success/40' : 'bg-destructive/40'}`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline" className="rounded-xl px-8">
            <Link to="/dashboard/sniper">
              {t.viewAll}
              <TrendingUp className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketsSection;
