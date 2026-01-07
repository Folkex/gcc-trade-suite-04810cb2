import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import DashboardOverview from "./pages/DashboardOverview";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardSettings from "./pages/DashboardSettings";
import Projects from "./pages/Projects";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";
import MarketSniper from "./pages/MarketSniper";
import GemFinder from "./pages/GemFinder";
import TokenAnalyzer from "./pages/TokenAnalyzer";
import Scanner from "./pages/Scanner";
import WhaleWatch from "./pages/WhaleWatch";

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
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/update-password" element={<UpdatePassword />} />
                <Route path="/dashboard" element={<DashboardOverview />} />
                <Route path="/dashboard/analytics" element={<DashboardAnalytics />} />
                <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/help" element={<HelpSupport />} />
            <Route path="/market-sniper" element={<MarketSniper />} />
            <Route path="/gem-finder" element={<GemFinder />} />
            <Route path="/token/:id" element={<TokenAnalyzer />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/whale-watch" element={<WhaleWatch />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
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
