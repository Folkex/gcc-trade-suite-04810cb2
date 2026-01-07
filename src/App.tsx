import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Landing & Auth
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import NotFound from "./pages/NotFound";

// Core Section
import DashboardOverview from "./pages/DashboardOverview";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardSettings from "./pages/DashboardSettings";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Notifications from "./pages/Notifications";

// Terminal Section (Crypto)
import MarketSniper from "./pages/MarketSniper";
import Scanner from "./pages/Scanner";
import WhaleWatch from "./pages/WhaleWatch";
import CopyTrading from "./pages/CopyTrading";
import GemFinder from "./pages/GemFinder";
import TokenAnalyzer from "./pages/TokenAnalyzer";

// Finance Section
import Wallet from "./pages/Wallet";
import Transactions from "./pages/Transactions";

// Growth Section
import Referrals from "./pages/Referrals";
import Leaderboard from "./pages/Leaderboard";

// Settings Section
import Profile from "./pages/Profile";
import Security from "./pages/Security";
import Support from "./pages/Support";
import HelpSupport from "./pages/HelpSupport";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Landing & Auth */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />

                {/* Core Section */}
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
                <Route path="/dashboard/settings" element={<DashboardSettings />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/team" element={<Team />} />
                <Route path="/notifications" element={<Notifications />} />

                {/* Terminal Section (Crypto) */}
                <Route path="/market-sniper" element={<MarketSniper />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/whale-watch" element={<WhaleWatch />} />
                <Route path="/copy-trading" element={<CopyTrading />} />
                <Route path="/gem-finder" element={<GemFinder />} />
                <Route path="/token/:id" element={<TokenAnalyzer />} />

                {/* Finance Section */}
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/transactions" element={<Transactions />} />

                {/* Growth Section */}
                <Route path="/referrals" element={<Referrals />} />
                <Route path="/leaderboard" element={<Leaderboard />} />

                {/* Settings Section */}
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/security" element={<Security />} />
                <Route path="/support" element={<Support />} />
                <Route path="/help" element={<HelpSupport />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;