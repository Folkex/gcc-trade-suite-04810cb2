import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TradePro</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-5 h-5" />
              <span className="text-sm">{user.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground mb-8">
            Your trading dashboard is ready. Start exploring the markets.
          </p>

          {/* Placeholder for dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Portfolio Value</h3>
              <p className="text-3xl font-bold text-primary">$0.00</p>
              <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Today's P&L</h3>
              <p className="text-3xl font-bold text-green-500">+$0.00</p>
              <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Open Positions</h3>
              <p className="text-3xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground mt-1">Coming soon</p>
            </div>
          </div>

          <div className="mt-8 bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              🚀 Dashboard Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're building an amazing trading experience for you. Real-time charts, 
              portfolio tracking, and market analysis are on the way.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
