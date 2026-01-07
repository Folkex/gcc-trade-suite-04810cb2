import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, Mail, Phone, Send, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

const faqs = [
  {
    question: "How do I deposit funds into my trading account?",
    answer:
      "You can deposit funds by navigating to Settings > Billing and clicking on 'Add Funds'. We support bank transfers, credit/debit cards, and popular e-wallets. Processing times vary from instant to 3 business days depending on the method.",
  },
  {
    question: "What are the trading fees?",
    answer:
      "Our fee structure is transparent and competitive. Stock trades are $0.01 per share (min $1), crypto trades have a 0.5% fee, and forex trades are commission-free with competitive spreads. See our full fee schedule in the Help Center.",
  },
  {
    question: "How do I enable two-factor authentication (2FA)?",
    answer:
      "Go to Settings > Security and click 'Enable 2FA'. You can choose between authenticator app (recommended) or SMS verification. We strongly recommend enabling 2FA to secure your account.",
  },
  {
    question: "Can I trade on mobile devices?",
    answer:
      "Yes! Our platform is fully responsive and works on all devices. We also have dedicated iOS and Android apps available for download from the App Store and Google Play Store.",
  },
  {
    question: "What markets can I trade?",
    answer:
      "We offer access to global markets including US stocks (NYSE, NASDAQ), GCC markets (Tadawul, DFM, ADX), cryptocurrencies, forex pairs, and commodities. Check our Markets section for real-time data.",
  },
  {
    question: "How do I set up price alerts?",
    answer:
      "Navigate to any asset's detail page and click the bell icon, or go to Settings > Notifications to manage all your price alerts. You can set alerts for specific prices, percentage changes, or technical indicators.",
  },
  {
    question: "What is the minimum deposit amount?",
    answer:
      "The minimum deposit is $100 for most payment methods. Some e-wallet options may have different minimums. There's no maximum limit for deposits.",
  },
  {
    question: "How long do withdrawals take?",
    answer:
      "Withdrawal processing times depend on the method: e-wallets are usually instant to 24 hours, card withdrawals take 3-5 business days, and bank transfers take 2-5 business days.",
  },
];

const HelpSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent! We'll get back to you within 24 hours.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Help & Support
        </h1>
        <p className="text-muted-foreground">
          Find answers or get in touch with our support team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions about our platform.
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

        {/* Contact Form & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Contact Info */}
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">support@tradepro.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+971 4 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Live Chat</p>
                  <p className="font-medium">Available 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="text-lg">Send us a Message</CardTitle>
              <CardDescription>
                We typically respond within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief subject"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default HelpSupport;
