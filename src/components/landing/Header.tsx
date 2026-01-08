import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import LivePriceTicker from "./LivePriceTicker";

interface HeaderProps {
  lang: "en" | "ar";
  onLangChange: (lang: "en" | "ar") => void;
}

const translations = {
  en: {
    markets: "Markets",
    features: "Features",
    pricing: "Pricing",
    about: "About",
    login: "Login",
    getStarted: "Get Started",
  },
  ar: {
    markets: "الأسواق",
    features: "المميزات",
    pricing: "الأسعار",
    about: "عن المنصة",
    login: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
  },
};

const Header = ({ lang, onLangChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Live Price Ticker */}
      <LivePriceTicker />
      
      {/* Main Header */}
      <div className="glass glass-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16" dir={isRTL ? "rtl" : "ltr"}>
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="font-display font-bold text-xl">TradeFlow</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[t.markets, t.features, t.pricing, t.about].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLangChange(lang === "en" ? "ar" : "en")}
              className="rounded-full"
            >
              <Globe className="h-5 w-5" />
            </Button>
            {user ? (
              <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">{t.login}</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  <Link to="/signup">{t.getStarted}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass glass-border border-t"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4" dir={isRTL ? "rtl" : "ltr"}>
              {[t.markets, t.features, t.pricing, t.about].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => onLangChange(lang === "en" ? "ar" : "en")}
                  className="justify-start gap-2"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "العربية" : "English"}
                </Button>
                {user ? (
                  <Button asChild className="bg-gradient-to-r from-primary to-accent">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/login">{t.login}</Link>
                    </Button>
                    <Button asChild className="bg-gradient-to-r from-primary to-accent">
                      <Link to="/signup">{t.getStarted}</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
