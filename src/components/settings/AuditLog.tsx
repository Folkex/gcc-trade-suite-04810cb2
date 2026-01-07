import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LogIn, 
  LogOut, 
  FolderPlus, 
  Settings, 
  UserPlus, 
  Trash2, 
  Edit, 
  Shield,
  Filter
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuditEvent {
  id: string;
  action: string;
  description: string;
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  timestamp: string;
  type: "auth" | "project" | "settings" | "team" | "security";
  icon: React.ElementType;
}

const mockAuditEvents: AuditEvent[] = [
  {
    id: "1",
    action: "User logged in",
    description: "Successful login from Chrome on Windows",
    user: { name: "John Doe", email: "john.doe@example.com" },
    timestamp: "2026-01-07T10:30:00Z",
    type: "auth",
    icon: LogIn,
  },
  {
    id: "2",
    action: "Project created",
    description: 'Created new project "Q1 Marketing Campaign"',
    user: { name: "John Doe", email: "john.doe@example.com" },
    timestamp: "2026-01-07T09:15:00Z",
    type: "project",
    icon: FolderPlus,
  },
  {
    id: "3",
    action: "Settings updated",
    description: "Changed notification preferences",
    user: { name: "Jane Smith", email: "jane.smith@example.com" },
    timestamp: "2026-01-06T16:45:00Z",
    type: "settings",
    icon: Settings,
  },
  {
    id: "4",
    action: "Team member invited",
    description: "Invited bob.johnson@example.com as Editor",
    user: { name: "John Doe", email: "john.doe@example.com" },
    timestamp: "2026-01-06T14:20:00Z",
    type: "team",
    icon: UserPlus,
  },
  {
    id: "5",
    action: "Project deleted",
    description: 'Deleted project "Old Campaign"',
    user: { name: "Jane Smith", email: "jane.smith@example.com" },
    timestamp: "2026-01-05T11:00:00Z",
    type: "project",
    icon: Trash2,
  },
  {
    id: "6",
    action: "Profile updated",
    description: "Updated display name and avatar",
    user: { name: "John Doe", email: "john.doe@example.com" },
    timestamp: "2026-01-05T09:30:00Z",
    type: "settings",
    icon: Edit,
  },
  {
    id: "7",
    action: "2FA enabled",
    description: "Two-factor authentication enabled",
    user: { name: "John Doe", email: "john.doe@example.com" },
    timestamp: "2026-01-04T15:00:00Z",
    type: "security",
    icon: Shield,
  },
  {
    id: "8",
    action: "User logged out",
    description: "Logged out from all devices",
    user: { name: "Jane Smith", email: "jane.smith@example.com" },
    timestamp: "2026-01-04T12:00:00Z",
    type: "auth",
    icon: LogOut,
  },
];

const typeColors: Record<string, string> = {
  auth: "bg-blue-500/10 text-blue-600",
  project: "bg-green-500/10 text-green-600",
  settings: "bg-purple-500/10 text-purple-600",
  team: "bg-amber-500/10 text-amber-600",
  security: "bg-red-500/10 text-red-600",
};

const typeLabels: Record<string, string> = {
  auth: "Authentication",
  project: "Project",
  settings: "Settings",
  team: "Team",
  security: "Security",
};

interface AuditLogProps {
  isLoading?: boolean;
}

const AuditLog = ({ isLoading = false }: AuditLogProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [events] = useState<AuditEvent[]>(mockAuditEvents);

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter(e => e.type === filter);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card className="glass glass-border">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass glass-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Audit Log</CardTitle>
            <CardDescription>
              Track all activities and changes in your workspace.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No activities found for this filter.
            </div>
          ) : (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-colors group"
              >
                <div className={`p-2 rounded-lg ${typeColors[event.type]}`}>
                  <event.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{event.action}</span>
                    <Badge variant="outline" className="text-xs">
                      {typeLabels[event.type]}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 truncate">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={event.user.avatarUrl} />
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {event.user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      {event.user.name}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(event.timestamp)}
                </span>
              </motion.div>
            ))
          )}
        </div>
        {filteredEvents.length > 0 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuditLog;
