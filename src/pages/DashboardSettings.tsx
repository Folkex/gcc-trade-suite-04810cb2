import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, CreditCard, Bell, Camera, Check, Users, History, Wallet, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TeamSettings from "@/components/settings/TeamSettings";
import AuditLog from "@/components/settings/AuditLog";
import DangerZone from "@/components/settings/DangerZone";
import SafetyTriggers from "@/components/safety/SafetyTriggers";
import MultiWalletManager from "@/components/wallet/MultiWalletManager";
import WalletAssets from "@/components/wallet/WalletAssets";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Mock user data
const mockUser = {
  fullName: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "",
  plan: "Free",
};

const invoiceHistory = [
  { id: "INV-001", date: "Jan 15, 2026", amount: "$0.00", status: "Paid" },
  { id: "INV-002", date: "Dec 15, 2025", amount: "$0.00", status: "Paid" },
  { id: "INV-003", date: "Nov 15, 2025", amount: "$0.00", status: "Paid" },
];

const DashboardSettings = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(mockUser.fullName);
  const [email, setEmail] = useState(user?.email || mockUser.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [tradingAlerts, setTradingAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "JD";

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleSaveSecurity = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }
    toast.success("Security settings updated!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEnable2FA = () => {
    toast.success("2FA setup initiated! Check your email.");
  };

  const handleUpgradePlan = () => {
    toast.info("Upgrade feature coming soon!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="glass glass-border p-1 h-auto flex-wrap">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-primary/10">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary/10">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 data-[state=active]:bg-primary/10">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary/10">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2 data-[state=active]:bg-primary/10">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-2 data-[state=active]:bg-primary/10">
              <History className="h-4 w-4" />
              Audit Log
            </TabsTrigger>
            <TabsTrigger value="wallets" className="gap-2 data-[state=active]:bg-primary/10">
              <Wallet className="h-4 w-4" />
              Wallets
            </TabsTrigger>
            <TabsTrigger value="safety" className="gap-2 data-[state=active]:bg-primary/10">
              <AlertTriangle className="h-4 w-4" />
              Safety
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="glass glass-border">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile picture.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={mockUser.avatarUrl} />
                      <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="glass glass-border">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveSecurity}>
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass glass-border">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">2FA Status</p>
                      <p className="text-sm text-muted-foreground">
                        Currently disabled
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleEnable2FA}>
                      Enable 2FA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <Card className="glass glass-border">
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Manage your subscription and billing information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">Free Plan</h3>
                          <Badge variant="secondary">Current</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Basic trading features and analytics
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleUpgradePlan}>
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass glass-border">
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>
                    View and download your past invoices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invoiceHistory.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <p className="font-medium">{invoice.id}</p>
                            <p className="text-muted-foreground">{invoice.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{invoice.amount}</span>
                          <Badge variant="outline" className="text-green-600 border-green-600/50">
                            <Check className="h-3 w-3 mr-1" />
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="glass glass-border">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how and when you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailAlerts" className="font-medium">
                        Email Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch
                      id="emailAlerts"
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications" className="font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get push notifications on your device
                      </p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weeklyDigest" className="font-medium">
                        Weekly Digest
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your activity
                      </p>
                    </div>
                    <Switch
                      id="weeklyDigest"
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="tradingAlerts" className="font-medium">
                        Trading Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about trade executions
                      </p>
                    </div>
                    <Switch
                      id="tradingAlerts"
                      checked={tradingAlerts}
                      onCheckedChange={setTradingAlerts}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="priceAlerts" className="font-medium">
                        Price Alerts
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when assets hit target prices
                      </p>
                    </div>
                    <Switch
                      id="priceAlerts"
                      checked={priceAlerts}
                      onCheckedChange={setPriceAlerts}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <TeamSettings />
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit">
            <AuditLog />
          </TabsContent>

          {/* Wallets Tab */}
          <TabsContent value="wallets">
            <div className="space-y-6">
              <WalletAssets />
              <MultiWalletManager />
            </div>
          </TabsContent>

          {/* Safety Tab */}
          <TabsContent value="safety">
            <div className="space-y-6">
              <SafetyTriggers />
              <DangerZone />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
