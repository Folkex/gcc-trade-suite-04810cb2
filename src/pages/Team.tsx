import { motion } from "framer-motion";
import { Users } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TeamSettings from "@/components/settings/TeamSettings";

const Team = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Team Management
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage your team members and their access permissions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TeamSettings />
      </motion.div>
    </DashboardLayout>
  );
};

export default Team;