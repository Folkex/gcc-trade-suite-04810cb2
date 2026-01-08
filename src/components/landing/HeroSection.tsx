import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Rocket, LayoutDashboard, Crosshair, Wallet, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "The Ultimate Trading Super App",
    title: "One Platform.",
    titleHighlight: "Unlimited Power.",
    subtitle: "Trade crypto, manage projects, track whales, copy top traders, and grow your empire — all from a single command center.",
    cta: "Launch Dashboard",
    watchDemo: "Explore Features",
    features: [
      { icon: LayoutDashboard, label: "Mission Control" },
      { icon: Crosshair, label: "Sniper Terminal" },
      { icon: Wallet, label: "Multi-Wallet" },
      { icon: Trophy, label: "Leaderboard" },
    ],
  },
  ar: {
    badge: "التطبيق الخارق للتداول",
    title: "منصة واحدة.",
    titleHighlight: "قوة لا محدودة.",
    subtitle: "تداول العملات الرقمية، أدِر المشاريع، تتبع الحيتان، انسخ كبار المتداولين، ونمِّ إمبراطوريتك — كل ذلك من مركز قيادة واحد.",
    cta: "أطلق لوحة التحكم",
    watchDemo: "اكتشف المميزات",
    features: [
      { icon: LayoutDashboard, label: "مركز القيادة" },
      { icon: Crosshair, label: "محطة القنص" },
      { icon: Wallet, label: "محافظ متعددة" },
      { icon: Trophy, label: "لوحة المتصدرين" },
    ],
  },
};

const HeroSection = ({ lang }: HeroSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">{t.badge}</span>
              <Rocket className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            {t.title}
            <br />
            <span className="text-gradient">{t.titleHighlight}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all text-lg px-8 py-6 rounded-xl gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
            >
              <Link to="/dashboard">
                {t.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-xl gap-2 border-border/50 hover:bg-secondary/50"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Shield className="h-5 w-5" />
              {t.watchDemo}
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {t.features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm"
              >
                <feature.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="max-w-6xl mx-auto">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-secondary/50 px-4 py-3 border-b border-border/50 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground font-mono">
                    arbah.co/dashboard
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content Preview */}
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Stat Cards */}
                {[
                  { label: "Net Profit", value: "+$12,450", color: "text-success" },
                  { label: "Active Projects", value: "3 Ongoing", color: "text-blue-400" },
                  { label: "Sniper Status", value: "Online", color: "text-primary", pulse: true },
                  { label: "Rank", value: "#4 Silver", color: "text-amber-400" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="bg-secondary/30 rounded-xl p-4 border border-border/30"
                  >
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className={`text-xl font-bold ${stat.color} flex items-center gap-2`}>
                      {stat.value}
                      {stat.pulse && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Mini Chart */}
              <div className="px-6 pb-6">
                <div className="bg-secondary/30 rounded-xl h-32 flex items-end justify-between px-4 pb-4 gap-1 border border-border/30">
                  {[30, 45, 35, 55, 40, 65, 55, 75, 60, 80, 70, 85, 75, 90].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 1.2 + i * 0.03, duration: 0.4 }}
                      className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
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
