import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  FileText, 
  Shield, 
  Scale, 
  ArrowLeft,
  Check,
  AlertCircle,
  Mail
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const legalContent = {
  terms: {
    title: "Terms of Service",
    icon: FileText,
    lastUpdated: "January 1, 2025",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing and using TradeFlow, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service."
      },
      {
        title: "2. Description of Service",
        content: "TradeFlow provides cryptocurrency trading tools, market analysis, and portfolio management services. We offer features including but not limited to: real-time market data, trading terminals, wallet management, and social trading features."
      },
      {
        title: "3. User Responsibilities",
        content: "Users are responsible for maintaining the confidentiality of their account credentials. You agree to notify us immediately of any unauthorized use of your account. Trading cryptocurrencies involves significant risk, and you should only trade with funds you can afford to lose."
      },
      {
        title: "4. Risk Disclosure",
        content: "Cryptocurrency trading involves substantial risk of loss and is not suitable for every investor. The valuation of cryptocurrencies may fluctuate, and you may lose all or more than your initial investment. Past performance is not indicative of future results."
      },
      {
        title: "5. Intellectual Property",
        content: "All content, features, and functionality of TradeFlow are owned by us and are protected by international copyright, trademark, and other intellectual property laws."
      },
      {
        title: "6. Limitation of Liability",
        content: "TradeFlow shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service."
      },
      {
        title: "7. Termination",
        content: "We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties."
      },
      {
        title: "8. Changes to Terms",
        content: "We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the platform."
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    icon: Shield,
    lastUpdated: "January 1, 2025",
    sections: [
      {
        title: "1. Information We Collect",
        content: "We collect information you provide directly, including name, email address, and wallet addresses. We also collect usage data, device information, and cookies to improve our service."
      },
      {
        title: "2. How We Use Your Information",
        content: "We use your information to provide and maintain our service, notify you about changes, provide customer support, gather analysis to improve the service, and detect and prevent fraud."
      },
      {
        title: "3. Data Security",
        content: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information."
      },
      {
        title: "4. Third-Party Services",
        content: "We may employ third-party companies to facilitate our service. These third parties have access to your personal information only to perform specific tasks on our behalf."
      },
      {
        title: "5. Data Retention",
        content: "We retain your personal data only for as long as necessary to provide you with our service and as described in this policy, or as required by law."
      },
      {
        title: "6. Your Rights",
        content: "You have the right to access, update, or delete your personal information. You can exercise these rights by contacting our support team."
      },
      {
        title: "7. Cookies",
        content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve user experience."
      },
      {
        title: "8. Contact Us",
        content: "If you have any questions about this Privacy Policy, please contact us at privacy@tradeflow.app"
      }
    ]
  },
  refund: {
    title: "Refund Policy",
    icon: Scale,
    lastUpdated: "January 1, 2025",
    sections: [
      {
        title: "1. Overview",
        content: "This Refund Policy outlines our guidelines for refunds on TradeFlow subscription services and any applicable fees."
      },
      {
        title: "2. Subscription Refunds",
        content: "Subscription fees are generally non-refundable. However, we may offer refunds in certain circumstances at our discretion, such as technical issues preventing service use."
      },
      {
        title: "3. Eligibility for Refunds",
        content: "To be eligible for a refund, you must contact us within 7 days of your purchase. Refund requests must include a valid reason and any supporting documentation."
      },
      {
        title: "4. Processing Refunds",
        content: "Approved refunds will be processed within 5-10 business days. Refunds will be credited to the original payment method used for the purchase."
      },
      {
        title: "5. Non-Refundable Items",
        content: "Trading fees, gas fees, and transaction costs are non-refundable. One-time purchases and promotional offers may also be non-refundable."
      },
      {
        title: "6. Chargebacks",
        content: "Filing a chargeback without first contacting our support team may result in permanent account suspension. We encourage users to resolve issues directly with us."
      },
      {
        title: "7. Cancellation",
        content: "You may cancel your subscription at any time. Upon cancellation, you will continue to have access until the end of your current billing period."
      },
      {
        title: "8. Contact for Refunds",
        content: "For refund requests, please contact our support team at support@tradeflow.app with your account details and reason for the refund request."
      }
    ]
  }
};

const LegalPage = () => {
  const { type } = useParams<{ type: string }>();
  const pageData = legalContent[type as keyof typeof legalContent] || legalContent.terms;
  const IconComponent = pageData.icon;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            asChild
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <IconComponent className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{pageData.title}</h1>
              <p className="text-muted-foreground">Last updated: {pageData.lastUpdated}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pageData.sections.map((section, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {section.title.split('.')[0]}. {section.title.split('. ')[1]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6 md:p-8 space-y-8">
              {pageData.sections.map((section, index) => (
                <div key={index} id={`section-${index}`} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  {index < pageData.sections.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Have Questions?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    If you have any questions about this {pageData.title.toLowerCase()}, please don't hesitate to contact us.
                  </p>
                  <Button asChild>
                    <Link to="/support">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 mb-8"
        >
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Other Legal Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(legalContent).map(([key, data]) => {
              if (key === type) return null;
              const Icon = data.icon;
              return (
                <Link key={key} to={`/legal/${key}`}>
                  <Card className="hover:border-primary/30 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{data.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default LegalPage;
