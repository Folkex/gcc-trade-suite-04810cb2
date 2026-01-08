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
    lastUpdated: "January 8, 2025",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing and using Arbah.co, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service. Arbah.co is a trading platform designed to provide market intelligence and trading tools for cryptocurrency markets."
      },
      {
        title: "2. Description of Service",
        content: "Arbah.co provides cryptocurrency trading tools, real-time market data, portfolio management, and analytics services. Our platform offers features including but not limited to: live market intelligence, trading terminals, wallet management, copy trading, whale watching, and gem finder tools. All data is sourced from reputable market data providers."
      },
      {
        title: "3. User Responsibilities",
        content: "Users are responsible for maintaining the confidentiality of their account credentials and ensuring the security of their connected wallets. You agree to notify Arbah.co immediately of any unauthorized use of your account. You are solely responsible for all trading decisions made using our platform. Trading cryptocurrencies involves significant risk, and you should only trade with funds you can afford to lose."
      },
      {
        title: "4. Risk Disclosure",
        content: "Cryptocurrency trading involves substantial risk of loss and is not suitable for every investor. The valuation of digital assets may fluctuate significantly, and you may lose all or more than your initial investment. Past performance is not indicative of future results. Arbah.co does not provide financial advice, and all information on the platform is for informational purposes only."
      },
      {
        title: "5. Intellectual Property",
        content: "All content, features, functionality, trademarks, and branding of Arbah.co are owned by Arbah.co and its licensors and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission."
      },
      {
        title: "6. Limitation of Liability",
        content: "Arbah.co shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. This includes but is not limited to: loss of profits, data, or other intangible losses arising from trading activities, market conditions, or technical issues."
      },
      {
        title: "7. Account Termination",
        content: "We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms, is harmful to other users, us, or third parties, or involves fraudulent or illegal activity. Upon termination, your right to use the service will immediately cease."
      },
      {
        title: "8. Governing Law",
        content: "These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms or your use of Arbah.co shall be resolved through binding arbitration. We reserve the right to modify these terms at any time, and will notify users of material changes via email or platform notification."
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    icon: Shield,
    lastUpdated: "January 8, 2025",
    sections: [
      {
        title: "1. Information We Collect",
        content: "Arbah.co collects information you provide directly, including: email address, display name, profile information, and wallet addresses you choose to connect. We also automatically collect usage data, device information, IP addresses, browser type, and interaction data to improve our service and provide personalized experiences."
      },
      {
        title: "2. How We Use Your Information",
        content: "We use your information to: provide and maintain our trading platform, process your transactions, send important notifications about your account and market activity, provide customer support, analyze usage patterns to improve the service, detect and prevent fraud or abuse, and comply with legal obligations."
      },
      {
        title: "3. Data Security",
        content: "Arbah.co implements industry-standard security measures including: end-to-end encryption for sensitive data, secure servers with regular security audits, two-factor authentication options, and strict access controls for employee data access. We never store your private keys or wallet seed phrases."
      },
      {
        title: "4. Third-Party Services",
        content: "We integrate with third-party services including market data providers (DexScreener), authentication services, and analytics platforms. These services have their own privacy policies, and we encourage you to review them. We share only the minimum data necessary for these integrations to function."
      },
      {
        title: "5. Data Retention",
        content: "We retain your personal data for as long as your account is active or as needed to provide services. Trading history and activity logs are retained for compliance purposes. You may request deletion of your data at any time, subject to our legal retention requirements."
      },
      {
        title: "6. Your Rights",
        content: "You have the right to: access your personal data, correct inaccurate information, request deletion of your data, export your data in a portable format, opt-out of marketing communications, and restrict certain processing activities. Contact support@arbah.co to exercise these rights."
      },
      {
        title: "7. Cookies and Tracking",
        content: "Arbah.co uses cookies and similar technologies for: maintaining your session, remembering your preferences, analyzing platform usage, and improving user experience. You can manage cookie preferences in your browser settings, though some features may not function properly without cookies."
      },
      {
        title: "8. Contact Us",
        content: "If you have questions about this Privacy Policy or our data practices, please contact our privacy team at privacy@arbah.co. For general support inquiries, reach us at support@arbah.co. We respond to all privacy-related requests within 30 days."
      }
    ]
  },
  refund: {
    title: "Refund Policy",
    icon: Scale,
    lastUpdated: "January 8, 2025",
    sections: [
      {
        title: "1. Overview",
        content: "This Refund Policy outlines Arbah.co's guidelines for refunds on subscription services, premium features, and any applicable platform fees. We strive to provide fair and transparent refund processes for all our users."
      },
      {
        title: "2. Subscription Refunds",
        content: "Subscription fees are generally non-refundable once the billing period has started. However, Arbah.co may offer refunds in certain circumstances at our discretion, such as: extended service outages, technical issues preventing platform access, or billing errors on our part."
      },
      {
        title: "3. Eligibility for Refunds",
        content: "To be eligible for a refund, you must: contact our support team within 7 days of your purchase, provide a valid reason for the refund request, include relevant documentation or screenshots if applicable, and not have violated our Terms of Service. First-time subscribers may be eligible for a one-time courtesy refund."
      },
      {
        title: "4. Processing Refunds",
        content: "Approved refunds will be processed within 5-10 business days. Refunds will be credited to the original payment method used for the purchase. Processing times may vary depending on your payment provider. You will receive email confirmation when your refund has been processed."
      },
      {
        title: "5. Non-Refundable Items",
        content: "The following are non-refundable: trading fees and transaction costs, blockchain gas fees, promotional or discounted subscriptions, one-time purchases after the service has been rendered, and accounts terminated for Terms of Service violations."
      },
      {
        title: "6. Chargebacks",
        content: "Filing a chargeback with your payment provider without first contacting Arbah.co support may result in immediate and permanent account suspension. We encourage all users to resolve billing issues directly with our support team first. Fraudulent chargebacks may be reported to relevant authorities."
      },
      {
        title: "7. Subscription Cancellation",
        content: "You may cancel your subscription at any time through your account settings. Upon cancellation, you will continue to have access to premium features until the end of your current billing period. No partial refunds are provided for unused portions of a billing period."
      },
      {
        title: "8. Contact for Refunds",
        content: "For refund requests, please contact our support team at support@arbah.co with: your account email, transaction ID or receipt, reason for refund request, and any supporting documentation. Our team will review your request and respond within 2-3 business days."
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
