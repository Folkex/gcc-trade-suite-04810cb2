import { Button } from "@/components/ui/button";
import { ArrowRight, Play, TrendingUp, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Trusted by 50,000+ traders in the GCC",
    title: "Trade Smarter.",
    titleHighlight: "Grow Faster.",
    subtitle: "The most intuitive trading platform designed for beginners. Trade crypto, forex, and commodities with confidence.",
    cta: "Start Trading Free",
    watchDemo: "Watch Demo",
    stat1: "Markets",
    stat1Value: "500+",
    stat2: "Daily Volume",
    stat2Value: "$2.5B+",
    stat3: "Countries",
    stat3Value: "15+",
  },
  ar: {
    badge: "موثوق من قبل أكثر من 50,000 متداول في دول الخليج",
    title: "تداول بذكاء.",
    titleHighlight: "انمو أسرع.",
    subtitle: "منصة التداول الأكثر سهولة للمبتدئين. تداول العملات الرقمية والفوركس والسلع بثقة.",
    cta: "ابدأ التداول مجاناً",
    watchDemo: "شاهد العرض",
    stat1: "الأسواق",
    stat1Value: "+500",
    stat2: "الحجم اليومي",
    stat2Value: "+$2.5B",
    stat3: "الدول",
    stat3Value: "+15",
  },
};

const HeroSection = ({ lang }: HeroSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-8">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">{t.badge}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t.title}
            <br />
            <span className="text-gradient">{t.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl gap-2"
            >
              {t.cta}
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-xl gap-2"
            >
              <Play className="h-5 w-5" />
              {t.watchDemo}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { label: t.stat1, value: t.stat1Value, icon: TrendingUp },
              { label: t.stat2, value: t.stat2Value, icon: Zap },
              { label: t.stat3, value: t.stat3Value, icon: Shield },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold font-display mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Cards Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 relative"
        >
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Mock Dashboard Header */}
              <div className="bg-secondary/50 px-6 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <div className="text-sm text-muted-foreground">TradeFlow Dashboard</div>
              </div>
              
              {/* Mock Dashboard Content */}
              <div className="p-6 grid md:grid-cols-3 gap-6">
                {/* Price Cards */}
                {[
                  { symbol: "BTC/USD", price: "43,250.00", change: "+2.45%", up: true },
                  { symbol: "EUR/USD", price: "1.0842", change: "+0.12%", up: true },
                  { symbol: "GOLD", price: "2,035.50", change: "-0.34%", up: false },
                ].map((item) => (
                  <div key={item.symbol} className="bg-secondary/30 rounded-xl p-4">
                    <div className="text-sm text-muted-foreground mb-1">{item.symbol}</div>
                    <div className="text-2xl font-bold font-display">${item.price}</div>
                    <div className={`text-sm ${item.up ? 'text-success' : 'text-destructive'}`}>
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mock Chart */}
              <div className="px-6 pb-6">
                <div className="bg-secondary/30 rounded-xl h-48 flex items-end justify-between px-4 pb-4 gap-1">
                  {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
