import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CTASectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    title: "Ready to Take Control?",
    subtitle: "Join thousands of traders who trust TradeFlow for their complete trading ecosystem.",
    cta: "Get Started Free",
    secondaryCta: "View Demo",
    note: "No credit card required • Free forever plan available",
    features: [
      { icon: Zap, text: "Instant setup" },
      { icon: Shield, text: "Bank-level security" },
      { icon: Users, text: "24/7 support" },
    ],
  },
  ar: {
    title: "هل أنت مستعد للسيطرة؟",
    subtitle: "انضم إلى آلاف المتداولين الذين يثقون في TradeFlow لنظامهم التجاري الكامل.",
    cta: "ابدأ مجاناً",
    secondaryCta: "شاهد العرض",
    note: "لا حاجة لبطاقة ائتمان • خطة مجانية للأبد",
    features: [
      { icon: Zap, text: "إعداد فوري" },
      { icon: Shield, text: "أمان بنكي" },
      { icon: Users, text: "دعم على مدار الساعة" },
    ],
  },
};

const CTASection = ({ lang }: CTASectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
          
          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 p-10 md:p-16 lg:p-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-8"
              >
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">Start your journey today</span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                {t.title}
              </motion.h2>
              
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/80 mb-10"
              >
                {t.subtitle}
              </motion.p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-6 mb-10"
              >
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/90">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <feature.icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button 
                  asChild
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-xl gap-2 bg-white text-primary hover:bg-white/90 shadow-xl"
                >
                  <Link to="/signup">
                    {t.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Link to="/dashboard">
                    {t.secondaryCta}
                  </Link>
                </Button>
              </motion.div>

              {/* Note */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-sm text-white/60 mt-6"
              >
                {t.note}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
