import { motion } from "framer-motion";
import { 
  LineChart, 
  Shield, 
  Smartphone, 
  Globe, 
  Users, 
  Zap,
  Bell,
  BookOpen
} from "lucide-react";

interface FeaturesSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Features",
    title: "Everything You Need to Trade with Confidence",
    subtitle: "Powerful tools designed for beginners, trusted by professionals.",
    features: [
      {
        icon: LineChart,
        title: "Real-Time Charts",
        description: "Advanced candlestick charts with 50+ technical indicators for precise analysis.",
      },
      {
        icon: Shield,
        title: "Bank-Level Security",
        description: "Your funds are protected with military-grade encryption and 2FA authentication.",
      },
      {
        icon: Smartphone,
        title: "Trade Anywhere",
        description: "Seamless experience across web, iOS, and Android devices.",
      },
      {
        icon: Globe,
        title: "GCC Focused",
        description: "Support for Arabic language, local currencies, and Islamic finance options.",
      },
      {
        icon: Users,
        title: "Copy Trading",
        description: "Follow and copy trades from successful traders automatically.",
      },
      {
        icon: Zap,
        title: "Instant Execution",
        description: "Lightning-fast order execution with minimal slippage.",
      },
      {
        icon: Bell,
        title: "Smart Alerts",
        description: "Custom price alerts and trading signals delivered in real-time.",
      },
      {
        icon: BookOpen,
        title: "Learn as You Trade",
        description: "Built-in tutorials and educational content for beginners.",
      },
    ],
  },
  ar: {
    badge: "المميزات",
    title: "كل ما تحتاجه للتداول بثقة",
    subtitle: "أدوات قوية مصممة للمبتدئين، يثق بها المحترفون.",
    features: [
      {
        icon: LineChart,
        title: "رسوم بيانية فورية",
        description: "رسوم بيانية متقدمة مع أكثر من 50 مؤشر فني للتحليل الدقيق.",
      },
      {
        icon: Shield,
        title: "أمان بمستوى البنوك",
        description: "أموالك محمية بتشفير عسكري ومصادقة ثنائية.",
      },
      {
        icon: Smartphone,
        title: "تداول من أي مكان",
        description: "تجربة سلسة على الويب وأجهزة iOS و Android.",
      },
      {
        icon: Globe,
        title: "مخصص لدول الخليج",
        description: "دعم اللغة العربية والعملات المحلية وخيارات التمويل الإسلامي.",
      },
      {
        icon: Users,
        title: "نسخ الصفقات",
        description: "تابع ونسخ صفقات المتداولين الناجحين تلقائياً.",
      },
      {
        icon: Zap,
        title: "تنفيذ فوري",
        description: "تنفيذ أوامر سريع للغاية مع انزلاق سعري ضئيل.",
      },
      {
        icon: Bell,
        title: "تنبيهات ذكية",
        description: "تنبيهات أسعار مخصصة وإشارات تداول في الوقت الفعلي.",
      },
      {
        icon: BookOpen,
        title: "تعلم أثناء التداول",
        description: "دروس تعليمية ومحتوى تعليمي مدمج للمبتدئين.",
      },
    ],
  },
};

const FeaturesSection = ({ lang }: FeaturesSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24 bg-secondary/30" id="features">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
