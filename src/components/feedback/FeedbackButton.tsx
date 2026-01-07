import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, Send, X, Bug, Lightbulb, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

type FeedbackType = "bug" | "feature" | "question";

const feedbackTypes: { type: FeedbackType; label: string; icon: React.ElementType; color: string }[] = [
  { type: "bug", label: "Report Bug", icon: Bug, color: "text-red-500 bg-red-500/10 border-red-500/30" },
  { type: "feature", label: "Feature Request", icon: Lightbulb, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" },
  { type: "question", label: "Question", icon: HelpCircle, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" },
];

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("bug");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Thank you for your feedback!");
    setMessage("");
    setIsOpen(false);
    setIsSubmitting(false);
  };

  const selectedType = feedbackTypes.find(t => t.type === feedbackType)!;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageSquarePlus className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </PopoverTrigger>
      <PopoverContent 
        side="top" 
        align="end" 
        className="w-80 glass glass-border p-4"
        sideOffset={16}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Send Feedback</h3>
            <p className="text-sm text-muted-foreground">
              Help us improve your experience
            </p>
          </div>

          {/* Feedback Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm">What's this about?</Label>
            <div className="grid grid-cols-3 gap-2">
              {feedbackTypes.map(({ type, label, icon: Icon, color }) => (
                <button
                  key={type}
                  onClick={() => setFeedbackType(type)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all ${
                    feedbackType === type
                      ? color
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="feedback-message" className="text-sm">
              Your message
            </Label>
            <Textarea
              id="feedback-message"
              placeholder={
                feedbackType === "bug"
                  ? "Describe the bug you encountered..."
                  : feedbackType === "feature"
                  ? "Describe the feature you'd like..."
                  : "What would you like to know?"
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            className="w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Feedback
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FeedbackButton;
