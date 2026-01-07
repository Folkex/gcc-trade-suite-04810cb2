import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  MessageSquare, 
  Book, 
  ChevronDown, 
  Send,
  ExternalLink,
  Mail,
  MessageCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

const faqs = [
  {
    question: "How do I connect my wallet?",
    answer: "Go to Settings > Wallets and click 'Connect Additional Wallet'. You can connect MetaMask, Phantom, or any WalletConnect-compatible wallet.",
  },
  {
    question: "What are the trading fees?",
    answer: "Trading fees vary by tier. Bronze: 0.5%, Silver: 0.4%, Gold: 0.3%, Platinum: 0.2%, Diamond: 0.1%. Upgrade by inviting more friends!",
  },
  {
    question: "How does Copy Trading work?",
    answer: "Add wallet addresses you want to follow in the Copy Trading section. Enable 'Auto-Copy' to automatically mirror their trades. You can set position size limits in settings.",
  },
  {
    question: "What safety features are available?",
    answer: "We offer: Auto-sell on liquidity drop, tax threshold protection, honeypot detection, rug pull alerts, and a panic sell button for emergencies.",
  },
  {
    question: "How do I withdraw funds?",
    answer: "Go to My Wallet > Withdraw. Enter your destination address, amount, and 2FA code. Withdrawals are processed within 10 minutes.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We use industry-standard encryption, 2FA, and never store your private keys. All transactions are signed locally on your device.",
  },
];

const Support = () => {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketMessage, setTicketMessage] = useState("");

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketCategory || !ticketMessage) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Support ticket submitted! We'll get back to you within 24 hours.");
    setTicketSubject("");
    setTicketCategory("");
    setTicketMessage("");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-1">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Help & Support
          </h1>
        </div>
        <p className="text-muted-foreground">
          Get help with your account, find answers, or contact support.
        </p>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3 mb-6"
      >
        <Card className="glass glass-border hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Book className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">Documentation</p>
                <p className="text-sm text-muted-foreground">Read the full docs</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <MessageCircle className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Discord</p>
                <p className="text-sm text-muted-foreground">Join our community</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Mail className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-muted-foreground">support@sniper.app</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Ticket */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Submit a Ticket
              </CardTitle>
              <CardDescription>
                Can't find what you're looking for? Send us a message.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={ticketCategory} onValueChange={setTicketCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="trading">Trading Problems</SelectItem>
                    <SelectItem value="wallet">Wallet & Deposits</SelectItem>
                    <SelectItem value="bug">Bug Report</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={5}
                />
              </div>
              <Button onClick={handleSubmitTicket} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Support;