import { Smartphone, Share, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface InstallGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InstallGuideModal = ({ open, onOpenChange }: InstallGuideModalProps) => {
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass glass-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Install Sniper App
          </DialogTitle>
          <DialogDescription>
            Add the app to your home screen for the best experience.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isIOS ? (
            <>
              {/* iOS Instructions */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Tap the Share button</p>
                    <p className="text-sm text-muted-foreground">
                      Look for the <Share className="h-4 w-4 inline mx-1" /> icon at the bottom of Safari
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Scroll and tap "Add to Home Screen"</p>
                    <p className="text-sm text-muted-foreground">
                      Look for the <Plus className="h-4 w-4 inline mx-1" /> icon with "Add to Home Screen"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Tap "Add" to confirm</p>
                    <p className="text-sm text-muted-foreground">
                      The app will now appear on your home screen
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : isAndroid ? (
            <>
              {/* Android Instructions */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Tap the menu button</p>
                    <p className="text-sm text-muted-foreground">
                      Look for the ⋮ icon in Chrome's top right corner
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Tap "Add to Home screen"</p>
                    <p className="text-sm text-muted-foreground">
                      Or "Install App" if you see that option
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Tap "Add" to confirm</p>
                    <p className="text-sm text-muted-foreground">
                      The app will now appear on your home screen
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <Smartphone className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                Open this page on your mobile device to install the app.
              </p>
            </div>
          )}

          {/* Benefits */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm font-medium mb-2">Why install?</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Check className="h-3 w-3 text-green-400" />
                Works offline
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3 w-3 text-green-400" />
                Faster loading
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3 w-3 text-green-400" />
                Full screen experience
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3 w-3 text-green-400" />
                Push notifications
              </li>
            </ul>
          </div>
        </div>

        <Button onClick={() => onOpenChange(false)} className="w-full">
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InstallGuideModal;