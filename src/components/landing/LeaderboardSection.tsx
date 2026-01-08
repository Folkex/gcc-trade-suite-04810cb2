import { motion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GlobalLeaderboard from "@/components/crypto/GlobalLeaderboard";

interface LeaderboardSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "Global Rankings",
    title: "Top Cryptocurrencies by Market Cap",
    subtitle: "Track the world's largest digital assets in real-time. Data updates every 15 seconds.",
    viewAll: "View Full Leaderboard",
  },
  ar: {
    badge: "التصنيف العالمي",
    title: "أكبر العملات الرقمية حسب القيمة السوقية",
    subtitle: "تتبع أكبر الأصول الرقمية في العالم في الوقت الفعلي. البيانات تتحدث كل 15 ثانية.",
    viewAll: "عرض الترتيب الكامل",
  },
};

const LeaderboardSection = ({ lang }: LeaderboardSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24 relative overflow-hidden" id="leaderboard">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6">
            <Crown className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* Leaderboard Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <GlobalLeaderboard limit={10} compact showHeader={false} />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Button asChild variant="outline" size="lg" className="rounded-xl px-8 gap-2">
            <Link to="/markets">
              {t.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardSection;