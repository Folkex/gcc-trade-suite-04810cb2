import { useState, useEffect } from "react";
import { Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import InstallGuideModal from "./InstallGuideModal";
import { cn } from "@/lib/utils";

interface InstallAppButtonProps {
  collapsed?: boolean;
}

const InstallAppButton = ({ collapsed }: InstallAppButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if on mobile device
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      );
    };

    // Check if already installed as PWA
    const checkStandalone = () => {
      setIsStandalone(
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true
      );
    };

    checkMobile();
    checkStandalone();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't show if not on mobile or already installed
  if (!isMobile || isStandalone) {
    return null;
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
        className={cn(
          "w-full justify-start gap-3 h-11 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary",
          collapsed && "justify-center px-0"
        )}
      >
        <Download className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">Install App</span>}
      </Button>
      
      <InstallGuideModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
};

export default InstallAppButton;