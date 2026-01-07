import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Crosshair,
  Search,
  Fish,
  Copy,
  Wallet,
  Receipt,
  Gift,
  Trophy,
  Settings,
  Shield,
  HelpCircle,
  Bell,
  Zap,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FeaturesSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "All-In-One Platform",
    title: "Your Complete Command Center",
    subtitle: "Everything you need to trade, manage, and grow — unified in one powerful super app.",
    exploreAll: "Explore All Features",
    sections: [
      {
        name: "Core",
        description: "Your central hub for overview, projects, and team collaboration",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-500/10",
        features: [
          { icon: LayoutDashboard, title: "Overview", description: "Mission Control dashboard with live stats and activity.", link: "/dashboard" },
          { icon: FolderKanban, title: "Projects", description: "Manage workspace projects and tasks.", link: "/dashboard/projects" },
          { icon: Users, title: "Team", description: "Member management with roles.", link: "/dashboard/team" },
        ]
      },
      {
        name: "Terminal",
        description: "Professional trading tools for serious crypto traders",
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-500/10",
        features: [
          { icon: Crosshair, title: "Sniper Board", description: "Live new pairs with safety scores.", link: "/dashboard/sniper" },
          { icon: Search, title: "Scanner", description: "Contract analyzer & rug-check.", link: "/dashboard/scanner" },
          { icon: Fish, title: "Whale Watch", description: "Track large transactions.", link: "/dashboard/whale-watch" },
          { icon: Copy, title: "Copy Trader", description: "Auto-copy successful wallets.", link: "/dashboard/copy-trading" },
        ]
      },
      {
        name: "Finance",
        description: "Complete financial management and transaction history",
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-500/10",
        features: [
          { icon: Wallet, title: "My Wallet", description: "Deposits, withdrawals, and QR codes.", link: "/dashboard/wallet" },
          { icon: Receipt, title: "Transactions", description: "Complete trade history.", link: "/dashboard/transactions" },
        ]
      },
      {
        name: "Growth",
        description: "Grow your network and climb the ranks",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-500/10",
        features: [
          { icon: Gift, title: "Referrals", description: "Affiliate links and earnings.", link: "/dashboard/referrals" },
          { icon: Trophy, title: "Leaderboard", description: "Compete for top rankings.", link: "/dashboard/leaderboard" },
        ]
      },
      {
        name: "Settings",
        description: "Customize and secure your experience",
        color: "from-slate-400 to-gray-500",
        bgColor: "bg-slate-500/10",
        features: [
          { icon: Settings, title: "Settings", description: "Preferences & configuration.", link: "/dashboard/settings" },
          { icon: Shield, title: "Security", description: "2FA & account protection.", link: "/dashboard/security" },
          { icon: HelpCircle, title: "Support", description: "Help center & FAQs.", link: "/dashboard/support" },
          { icon: Bell, title: "Notifications", description: "Alerts & updates.", link: "/dashboard/notifications" },
        ]
      },
    ],
  },
  ar: {
    badge: "منصة شاملة",
    title: "مركز القيادة الكامل",
    subtitle: "كل ما تحتاجه للتداول والإدارة والنمو — موحد في تطبيق واحد قوي.",
    exploreAll: "استكشف جميع الميزات",
    sections: [
      {
        name: "الأساسي",
        description: "مركزك للنظرة العامة والمشاريع والتعاون",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-500/10",
        features: [
          { icon: LayoutDashboard, title: "نظرة عامة", description: "لوحة تحكم مع إحصائيات حية.", link: "/dashboard" },
          { icon: FolderKanban, title: "المشاريع", description: "إدارة المشاريع والمهام.", link: "/dashboard/projects" },
          { icon: Users, title: "الفريق", description: "إدارة الأعضاء والأدوار.", link: "/dashboard/team" },
        ]
      },
      {
        name: "المحطة",
        description: "أدوات تداول احترافية",
        color: "from-emerald-500 to-green-500",
        bgColor: "bg-emerald-500/10",
        features: [
          { icon: Crosshair, title: "لوحة القنص", description: "أزواج جديدة مع درجات الأمان.", link: "/dashboard/sniper" },
          { icon: Search, title: "الماسح", description: "محلل العقود.", link: "/dashboard/scanner" },
          { icon: Fish, title: "مراقبة الحيتان", description: "تتبع المعاملات الكبيرة.", link: "/dashboard/whale-watch" },
          { icon: Copy, title: "نسخ التداول", description: "نسخ تلقائي للمحافظ الناجحة.", link: "/dashboard/copy-trading" },
        ]
      },
      {
        name: "المالية",
        description: "إدارة مالية كاملة",
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-500/10",
        features: [
          { icon: Wallet, title: "محفظتي", description: "الإيداعات والسحوبات.", link: "/dashboard/wallet" },
          { icon: Receipt, title: "المعاملات", description: "تاريخ الصفقات الكامل.", link: "/dashboard/transactions" },
        ]
      },
      {
        name: "النمو",
        description: "وسّع شبكتك وتسلق الترتيب",
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-500/10",
        features: [
          { icon: Gift, title: "الإحالات", description: "روابط الإحالة والأرباح.", link: "/dashboard/referrals" },
          { icon: Trophy, title: "لوحة المتصدرين", description: "تنافس على الترتيب.", link: "/dashboard/leaderboard" },
        ]
      },
      {
        name: "الإعدادات",
        description: "خصص وأمّن تجربتك",
        color: "from-slate-400 to-gray-500",
        bgColor: "bg-slate-500/10",
        features: [
          { icon: Settings, title: "الإعدادات", description: "التفضيلات والتكوين.", link: "/dashboard/settings" },
          { icon: Shield, title: "الأمان", description: "المصادقة الثنائية.", link: "/dashboard/security" },
          { icon: HelpCircle, title: "الدعم", description: "مركز المساعدة.", link: "/dashboard/support" },
          { icon: Bell, title: "الإشعارات", description: "التنبيهات والتحديثات.", link: "/dashboard/notifications" },
        ]
      },
    ],
  },
};

const FeaturesSection = ({ lang }: FeaturesSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t.title}
          </h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Feature Sections */}
        <div className="space-y-16">
          {t.sections.map((section, sectionIndex) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-1.5 rounded-full bg-gradient-to-b ${section.color}`} />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{section.name}</h3>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.features.map((feature, featureIndex) => (
                  <Link
                    key={feature.title}
                    to={feature.link}
                    className="block group"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.05 + featureIndex * 0.05 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="relative h-full bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                    >
                      {/* Hover Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      
                      <div className="relative z-10">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors flex items-center gap-2">
                          {feature.title}
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="rounded-xl px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90">
            <Link to="/dashboard">
              {t.exploreAll}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
