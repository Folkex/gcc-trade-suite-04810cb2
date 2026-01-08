import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Crosshair,
  FolderOpen,
  Shield,
  Wallet,
  Sparkles,
  Users,
  Trophy,
  Gift,
  Target,
  Waves,
  Copy,
  ArrowRightLeft,
  User,
  Lock,
  HelpCircle,
  BarChart3,
  Bell,
  FileText,
  Scale,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useMarket } from "@/contexts/MarketContext";
import InstallAppButton from "@/components/mobile/InstallAppButton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navSections: NavSection[] = [
  {
    title: "CORE",
    defaultOpen: true,
    items: [
      { title: "Overview", icon: LayoutDashboard, path: "/dashboard" },
      { title: "Projects", icon: FolderOpen, path: "/projects" },
      { title: "Team", icon: Users, path: "/team" },
      { title: "Notifications", icon: Bell, path: "/notifications" },
    ],
  },
  {
    title: "TERMINAL",
    defaultOpen: true,
    items: [
      { title: "Trade Terminal", icon: BarChart3, path: "/trade" },
      { title: "Sniper Board", icon: Crosshair, path: "/market-sniper" },
      { title: "Scanner", icon: Shield, path: "/scanner" },
      { title: "Whale Watch", icon: Waves, path: "/whale-watch" },
      { title: "Copy Trader", icon: Copy, path: "/copy-trading" },
      { title: "Gem Finder", icon: Sparkles, path: "/gem-finder" },
    ],
  },
  {
    title: "FINANCE",
    defaultOpen: false,
    items: [
      { title: "My Wallet", icon: Wallet, path: "/wallet" },
      { title: "Transactions", icon: ArrowRightLeft, path: "/transactions" },
    ],
  },
  {
    title: "GROWTH",
    defaultOpen: false,
    items: [
      { title: "Referrals", icon: Gift, path: "/referrals" },
      { title: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    ],
  },
  {
    title: "SETTINGS",
    defaultOpen: false,
    items: [
      { title: "Profile", icon: User, path: "/settings/profile" },
      { title: "Security", icon: Lock, path: "/settings/security" },
      { title: "Preferences", icon: Settings, path: "/dashboard/settings" },
      { title: "Support", icon: HelpCircle, path: "/support" },
    ],
  },
  {
    title: "LEGAL",
    defaultOpen: false,
    items: [
      { title: "Terms of Service", icon: FileText, path: "/legal/terms" },
      { title: "Privacy Policy", icon: Shield, path: "/legal/privacy" },
      { title: "Refund Policy", icon: Scale, path: "/legal/refund" },
    ],
  },
];

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isLive, loading } = useMarket();
  
  // Track open sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    navSections.reduce((acc, section) => ({
      ...acc,
      [section.title]: section.defaultOpen ?? true,
    }), {})
  );

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Get section color based on title
  const getSectionColor = (title: string) => {
    switch (title) {
      case "TERMINAL":
        return "text-primary";
      case "FINANCE":
        return "text-amber-500";
      case "GROWTH":
        return "text-purple-500";
      case "SETTINGS":
        return "text-muted-foreground";
      case "LEGAL":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen bg-card border-r border-border flex flex-col"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <img src="/logo.png" alt="Arbah.co" className="w-8 h-8 rounded-lg" />
              <span className="font-bold text-lg font-mono text-foreground">Arbah.co</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {collapsed && (
          <img src="/logo.png" alt="Arbah.co" className="w-8 h-8 rounded-lg mx-auto" />
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-muted z-50"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation with Sections */}
      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-thin">
        {navSections.map((section) => (
          <Collapsible
            key={section.title}
            open={collapsed ? false : openSections[section.title]}
            onOpenChange={() => !collapsed && toggleSection(section.title)}
          >
            {!collapsed && (
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-8 px-2 text-xs font-semibold tracking-wider hover:bg-transparent"
                >
                  <span className={getSectionColor(section.title)}>
                    {section.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 text-muted-foreground transition-transform",
                      openSections[section.title] && "rotate-180"
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
            )}

            <CollapsibleContent className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-full justify-start gap-3 h-10 transition-all duration-200",
                      collapsed && "justify-center px-0",
                      active
                        ? "bg-primary/10 text-primary hover:bg-primary/15 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="truncate text-sm"
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                );
              })}
            </CollapsibleContent>

            {/* Show items directly when collapsed */}
            {collapsed && (
              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "w-full justify-center px-0 h-10 transition-all duration-200",
                        active
                          ? "bg-primary/10 text-primary hover:bg-primary/15"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                      title={item.title}
                    >
                      <item.icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                    </Button>
                  );
                })}
              </div>
            )}
          </Collapsible>
        ))}
      </nav>

      {/* Live Status Indicator */}
      <div className="px-3 pb-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-colors",
              collapsed ? "justify-center" : "justify-start",
              isLive ? "bg-success/10" : "bg-destructive/10"
            )}>
              <div className="relative">
                <Radio className={cn(
                  "h-4 w-4",
                  isLive ? "text-success" : "text-destructive"
                )} />
                {!loading && (
                  <span className={cn(
                    "absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full",
                    isLive ? "bg-success animate-pulse" : "bg-destructive"
                  )} />
                )}
              </div>
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex flex-col"
                  >
                    <span className={cn(
                      "text-xs font-mono font-medium",
                      isLive ? "text-success" : "text-destructive"
                    )}>
                      {loading ? "Connecting..." : isLive ? "LIVE" : "OFFLINE"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {isLive ? "API Connected" : "Using Cache"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{isLive ? "Connected to DexScreener API" : "Using offline/cached data"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Install App Button (Mobile Only) */}
      <div className="px-3 pb-2">
        <InstallAppButton collapsed={collapsed} />
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 h-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="truncate"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
