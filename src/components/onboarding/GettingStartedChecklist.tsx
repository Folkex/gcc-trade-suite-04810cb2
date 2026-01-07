import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, User, FolderPlus, Settings, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ElementType;
  action: string;
  route: string;
}

interface GettingStartedChecklistProps {
  items: ChecklistItem[];
  onDismiss?: () => void;
}

const defaultItems: ChecklistItem[] = [
  {
    id: "profile",
    title: "Complete your profile",
    description: "Add your name and avatar",
    completed: false,
    icon: User,
    action: "Complete",
    route: "/dashboard/settings",
  },
  {
    id: "project",
    title: "Create your first project",
    description: "Start organizing your work",
    completed: false,
    icon: FolderPlus,
    action: "Create",
    route: "/projects",
  },
  {
    id: "notifications",
    title: "Set up notifications",
    description: "Stay updated on important events",
    completed: false,
    icon: Bell,
    action: "Configure",
    route: "/dashboard/settings",
  },
  {
    id: "preferences",
    title: "Customize your preferences",
    description: "Tailor the experience to your needs",
    completed: false,
    icon: Settings,
    action: "Customize",
    route: "/dashboard/settings",
  },
];

const GettingStartedChecklist = ({ 
  items = defaultItems, 
  onDismiss 
}: GettingStartedChecklistProps) => {
  const navigate = useNavigate();
  const completedCount = items.filter(item => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  if (progress === 100 && onDismiss) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass glass-border overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Getting Started</CardTitle>
              <CardDescription>
                Complete these steps to get the most out of your dashboard
              </CardDescription>
            </div>
            <span className="text-2xl font-bold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  item.completed
                    ? "bg-primary/5 border border-primary/20"
                    : "bg-muted/30 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.completed ? "bg-primary/10" : "bg-muted"}`}>
                      <item.icon className={`h-4 w-4 ${item.completed ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className={`font-medium text-sm ${item.completed ? "line-through text-muted-foreground" : ""}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
                {!item.completed && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => navigate(item.route)}
                    className="text-xs"
                  >
                    {item.action}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-4 text-muted-foreground"
              onClick={onDismiss}
            >
              Dismiss checklist
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GettingStartedChecklist;
