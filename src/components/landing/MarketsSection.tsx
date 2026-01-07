import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketsSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Live Markets",
    title: "Trade 500+ Global Markets",
    subtitle: "Access crypto, forex, commodities, and more from a single platform.",
    viewAll: "View All Markets",
    tabs: ["Crypto", "Forex", "Commodities"],
  },
  ar: {
    badge: "الأسواق الحية",
    title: "تداول أكثر من 500 سوق عالمي",
    subtitle: "الوصول إلى العملات الرقمية والفوركس والسلع والمزيد من منصة واحدة.",
    viewAll: "عرض جميع الأسواق",
    tabs: ["العملات الرقمية", "الفوركس", "السلع"],
  },
};

const mockMarkets = [
  { symbol: "BTC/USD", name: "Bitcoin", price: "43,250.00", change: 2.45, volume: "2.1B" },
  { symbol: "ETH/USD", name: "Ethereum", price: "2,285.30", change: 3.12, volume: "890M" },
  { symbol: "EUR/USD", name: "Euro / Dollar", price: "1.0842", change: 0.12, volume: "5.2B" },
  { symbol: "GBP/USD", name: "Pound / Dollar", price: "1.2695", change: -0.23, volume: "2.8B" },
  { symbol: "XAU/USD", name: "Gold", price: "2,035.50", change: -0.34, volume: "1.5B" },
  { symbol: "XAG/USD", name: "Silver", price: "22.85", change: 1.25, volume: "320M" },
];

const MarketsSection = ({ lang }: MarketsSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24" id="markets">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success mb-6">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Market Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 md:grid-cols-5 gap-4 px-6 py-4 bg-secondary/50 text-sm font-medium text-muted-foreground border-b border-border">
            <div>{isRTL ? "الرمز" : "Symbol"}</div>
            <div className="hidden md:block">{isRTL ? "الاسم" : "Name"}</div>
            <div className="text-end">{isRTL ? "السعر" : "Price"}</div>
            <div className="text-end">{isRTL ? "التغيير" : "Change"}</div>
            <div className="text-end">{isRTL ? "الحجم" : "Volume"}</div>
          </div>

          {/* Table Body */}
          {mockMarkets.map((market, index) => (
            <motion.div
              key={market.symbol}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-4 md:grid-cols-5 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer"
            >
              <div className="font-semibold">{market.symbol}</div>
              <div className="hidden md:block text-muted-foreground">{market.name}</div>
              <div className="text-end font-mono">${market.price}</div>
              <div className={`text-end flex items-center justify-end gap-1 ${market.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {market.change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {market.change >= 0 ? '+' : ''}{market.change}%
              </div>
              <div className="text-end text-muted-foreground">${market.volume}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="rounded-xl">
            {t.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketsSection;
