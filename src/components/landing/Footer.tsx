import { Globe } from "lucide-react";

interface FooterProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    description: "The most intuitive trading platform designed for beginners in the GCC region.",
    products: "Products",
    company: "Company",
    legal: "Legal",
    productLinks: ["Crypto Trading", "Forex Trading", "Commodities", "Copy Trading"],
    companyLinks: ["About Us", "Careers", "Press", "Contact"],
    legalLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    copyright: "© 2024 TradeFlow. All rights reserved.",
    regulated: "Regulated by relevant financial authorities.",
  },
  ar: {
    description: "منصة التداول الأكثر سهولة للمبتدئين في منطقة الخليج.",
    products: "المنتجات",
    company: "الشركة",
    legal: "قانوني",
    productLinks: ["تداول العملات الرقمية", "تداول الفوركس", "السلع", "نسخ التداول"],
    companyLinks: ["عن الشركة", "الوظائف", "الصحافة", "اتصل بنا"],
    legalLinks: ["سياسة الخصوصية", "شروط الخدمة", "سياسة ملفات تعريف الارتباط"],
    copyright: "© 2024 TradeFlow. جميع الحقوق محفوظة.",
    regulated: "مرخصة من الهيئات المالية المختصة.",
  },
};

const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-16" dir={isRTL ? "rtl" : "ltr"}>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="font-display font-bold text-xl">TradeFlow</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">{t.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{t.regulated}</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t.products}</h4>
            <ul className="space-y-3">
              {t.productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t.company}</h4>
            <ul className="space-y-3">
              {t.companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t.legal}</h4>
            <ul className="space-y-3">
              {t.legalLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
