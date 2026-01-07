import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BarChart3, Zap, ChevronRight, ChevronLeft, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface WelcomeModalProps {
  open: boolean;
  onComplete: () => void;
}

const slides = [
  {
    icon: Sparkles,
    title: "Welcome to Your Dashboard",
    description: "Your all-in-one platform for managing projects, tracking analytics, and staying organized. Let's get you started!",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Powerful Analytics",
    description: "Track your progress with real-time charts and insights. Monitor key metrics and make data-driven decisions.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Quick Actions",
    description: "Get things done faster with quick actions and keyboard shortcuts. Your productivity is our priority.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const WelcomeModal = ({ open, onComplete }: WelcomeModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] glass glass-border p-0 gap-0 overflow-hidden" hideClose>
        {/* Progress Bar */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Step {currentSlide + 1} of {slides.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={handleSkip}
            >
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-1" />
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className={`inline-flex p-4 rounded-2xl ${slides[currentSlide].bgColor} mb-6`}>
                {React.createElement(slides[currentSlide].icon, {
                  className: `h-12 w-12 ${slides[currentSlide].color}`,
                })}
              </div>
              <h2 className="text-2xl font-bold mb-3">{slides[currentSlide].title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {slides[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 pb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-border/50">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {currentSlide === slides.length - 1 ? (
              "Get Started"
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
