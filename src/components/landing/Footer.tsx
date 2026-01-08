import { Globe, Github, Twitter, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface FooterProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    description: "Your gateway to smart cryptocurrency trading. Real-time market data, advanced analytics, and seamless trading experience.",
    platform: "Platform",
    company: "Company",
    legal: "Legal",
    platformLinks: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Sniper Board", href: "/dashboard/sniper" },
      { label: "Wallet", href: "/dashboard/wallet" },
      { label: "Leaderboard", href: "/dashboard/leaderboard" },
    ],
    companyLinks: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/support" },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Refund Policy", href: "/legal/refund" },
    ],
    copyright: "© 2025 Arbah.co. All rights reserved.",
    regulated: "Licensed and regulated trading platform.",
  },
  ar: {
    description: "بوابتك للتداول الذكي بالعملات المشفرة. بيانات السوق الحية، والتحليلات المتقدمة، وتجربة تداول سلسة.",
    platform: "المنصة",
    company: "الشركة",
    legal: "قانوني",
    platformLinks: [
      { label: "لوحة التحكم", href: "/dashboard" },
      { label: "لوحة القنص", href: "/dashboard/sniper" },
      { label: "المحفظة", href: "/dashboard/wallet" },
      { label: "لوحة المتصدرين", href: "/dashboard/leaderboard" },
    ],
    companyLinks: [
      { label: "عن الشركة", href: "#" },
      { label: "الوظائف", href: "#" },
      { label: "المدونة", href: "#" },
      { label: "اتصل بنا", href: "/support" },
    ],
    legalLinks: [
      { label: "سياسة الخصوصية", href: "/legal/privacy" },
      { label: "شروط الخدمة", href: "/legal/terms" },
      { label: "سياسة الاسترداد", href: "/legal/refund" },
    ],
    copyright: "© 2025 Arbah.co. جميع الحقوق محفوظة.",
    regulated: "منصة تداول مرخصة ومنظمة.",
  },
};

const Footer = ({ lang }: FooterProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16" dir={isRTL ? "rtl" : "ltr"}>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="font-display font-bold text-xl">Arbah.co</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">{t.description}</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: MessageCircle, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.platform}</h4>
            <ul className="space-y-3">
              {t.platformLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.company}</h4>
            <ul className="space-y-3">
              {t.companyLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.legal}</h4>
            <ul className="space-y-3">
              {t.legalLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>{t.copyright}</div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>{t.regulated}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
