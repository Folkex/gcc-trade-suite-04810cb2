import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface CTASectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    title: "Ready to Start Your Trading Journey?",
    subtitle: "Join thousands of traders in the GCC who trust TradeFlow for their trading needs.",
    cta: "Create Free Account",
    note: "No credit card required • Start trading in minutes",
  },
  ar: {
    title: "هل أنت مستعد لبدء رحلة التداول؟",
    subtitle: "انضم إلى آلاف المتداولين في دول الخليج الذين يثقون في TradeFlow.",
    cta: "إنشاء حساب مجاني",
    note: "لا حاجة لبطاقة ائتمان • ابدأ التداول في دقائق",
  },
};

const CTASection = ({ lang }: CTASectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-12 md:p-16 text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Glow Effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-primary-foreground mb-8"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Start for free today</span>
            </motion.div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto">
              {t.title}
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              {t.subtitle}
            </p>

            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 rounded-xl gap-2 bg-white text-primary hover:bg-white/90"
            >
              {t.cta}
              <ArrowRight className="h-5 w-5" />
            </Button>

            <p className="text-sm text-primary-foreground/60 mt-6">{t.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
