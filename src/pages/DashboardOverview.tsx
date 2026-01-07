import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PortfolioCard from "@/components/dashboard/PortfolioCard";
import MarketOverview from "@/components/dashboard/MarketOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import WelcomeModal from "@/components/onboarding/WelcomeModal";
import GettingStartedChecklist from "@/components/onboarding/GettingStartedChecklist";
import FeedbackButton from "@/components/feedback/FeedbackButton";

const DashboardOverview = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showChecklist, setShowChecklist] = useState(true);

  // Check if user is new (hasn't seen welcome modal)
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
    const checklistDismissed = localStorage.getItem("checklistDismissed");
    if (checklistDismissed) {
      setShowChecklist(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcome(false);
  };

  const handleDismissChecklist = () => {
    localStorage.setItem("checklistDismissed", "true");
    setShowChecklist(false);
  };

  // Mock checklist items - in production these would come from user data
  const checklistItems = [
    {
      id: "profile",
      title: "Complete your profile",
      description: "Add your name and avatar",
      completed: false,
      icon: Wallet,
      action: "Complete",
      route: "/dashboard/settings",
    },
    {
      id: "project",
      title: "Create your first project",
      description: "Start organizing your work",
      completed: false,
      icon: BarChart3,
      action: "Create",
      route: "/projects",
    },
    {
      id: "notifications",
      title: "Set up notifications",
      description: "Stay updated on important events",
      completed: true,
      icon: TrendingUp,
      action: "Configure",
      route: "/dashboard/settings",
    },
    {
      id: "preferences",
      title: "Customize your preferences",
      description: "Tailor the experience to your needs",
      completed: false,
      icon: PieChart,
      action: "Customize",
      route: "/dashboard/settings",
    },
  ];

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Welcome back, {user?.email?.split("@")[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your portfolio today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <PortfolioCard
          title="Portfolio Value"
          value="$45,231.89"
          change="+12.5% from last month"
          changeType="positive"
          icon={<Wallet className="h-4 w-4" />}
          delay={0}
        />
        <PortfolioCard
          title="Today's P&L"
          value="+$1,234.56"
          change="+2.4% today"
          changeType="positive"
          icon={<TrendingUp className="h-4 w-4" />}
          delay={0.05}
        />
        <PortfolioCard
          title="Open Positions"
          value="12"
          change="3 profitable"
          changeType="neutral"
          icon={<BarChart3 className="h-4 w-4" />}
          delay={0.1}
        />
        <PortfolioCard
          title="Win Rate"
          value="68.5%"
          change="+5.2% this week"
          changeType="positive"
          icon={<PieChart className="h-4 w-4" />}
          delay={0.15}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview />
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickActions />
          {showChecklist && (
            <GettingStartedChecklist 
              items={checklistItems} 
              onDismiss={handleDismissChecklist}
            />
          )}
        </div>
      </div>

      {/* Welcome Modal for new users */}
      <WelcomeModal open={showWelcome} onComplete={handleWelcomeComplete} />

      {/* Feedback Button */}
      <FeedbackButton />
    </DashboardLayout>
  );
};

export default DashboardOverview;
