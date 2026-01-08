import { useState } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import MarketsSection from "@/components/landing/MarketsSection";
import LeaderboardSection from "@/components/landing/LeaderboardSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} onLangChange={setLang} />
      <HeroSection lang={lang} />
      <FeaturesSection lang={lang} />
      <MarketsSection lang={lang} />
      <LeaderboardSection lang={lang} />
      <CTASection lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Index;
