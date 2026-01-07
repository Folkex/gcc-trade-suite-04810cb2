import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, Trash2, TrendingUp, AlertCircle, DollarSign, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "trade" | "alert" | "system" | "billing";
  read: boolean;
  createdAt: string;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Trade Executed",
    message: "Your buy order for AAPL at $178.50 has been executed successfully.",
    type: "trade",
    read: false,
    createdAt: "2 minutes ago",
  },
  {
    id: "2",
    title: "Price Alert Triggered",
    message: "BTC has reached your target price of $45,000.",
    type: "alert",
    read: false,
    createdAt: "15 minutes ago",
  },
  {
    id: "3",
    title: "Security Update",
    message: "Your password was successfully updated from a new device.",
    type: "system",
    read: false,
    createdAt: "1 hour ago",
  },
  {
    id: "4",
    title: "Monthly Statement Ready",
    message: "Your January 2026 trading statement is now available for download.",
    type: "billing",
    read: true,
    createdAt: "2 hours ago",
  },
  {
    id: "5",
    title: "Stop Loss Triggered",
    message: "Your stop loss for TSLA at $230.00 was triggered.",
    type: "trade",
    read: true,
    createdAt: "5 hours ago",
  },
  {
    id: "6",
    title: "New Feature Available",
    message: "Check out our new advanced charting tools in the Analytics section.",
    type: "system",
    read: true,
    createdAt: "1 day ago",
  },
];

const notificationIcons = {
  trade: TrendingUp,
  alert: AlertCircle,
  billing: DollarSign,
  system: Shield,
};

const notificationColors = {
  trade: "bg-green-500/10 text-green-600",
  alert: "bg-yellow-500/10 text-yellow-600",
  billing: "bg-blue-500/10 text-blue-600",
  system: "bg-purple-500/10 text-purple-600",
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              Stay updated with your trading activity.
            </p>
          </div>

          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead} className="gap-2">
                <CheckCheck className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="outline" onClick={clearAll} className="gap-2 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Clear all
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass glass-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="h-20 w-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                <Bell className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground text-center max-w-sm">
                You're all caught up! New notifications will appear here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {notifications.map((notification, index) => {
            const Icon = notificationIcons[notification.type];
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    "glass glass-border transition-all duration-200 hover:shadow-md cursor-pointer group",
                    !notification.read && "border-l-4 border-l-primary"
                  )}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                          notificationColors[notification.type]
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4
                              className={cn(
                                "font-medium",
                                !notification.read && "text-foreground",
                                notification.read && "text-muted-foreground"
                              )}
                            >
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.createdAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="h-8 w-8"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Notifications;
