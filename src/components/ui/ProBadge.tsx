import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProBadgeProps {
  className?: string;
}

const ProBadge = ({ className }: ProBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
        "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30",
        className
      )}
    >
      <Sparkles className="h-2.5 w-2.5" />
      PRO
    </span>
  );
};

export default ProBadge;