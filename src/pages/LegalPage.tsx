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
    lastUpdated: "January 8, 2026",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing, browsing, or using Arbah.co (the 'Platform'), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ('Terms'), our Privacy Policy, and all applicable laws and regulations. These Terms constitute a legally binding agreement between you ('User', 'you', or 'your') and Arbah.co ('Company', 'we', 'us', or 'our'). If you do not agree to these Terms, you must immediately discontinue use of the Platform. Your continued use of the Platform following any modifications to these Terms constitutes acceptance of those changes. We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting. It is your responsibility to review these Terms periodically for changes."
      },
      {
        title: "2. Eligibility Requirements",
        content: "To use Arbah.co, you must: (a) be at least 18 years of age or the age of legal majority in your jurisdiction, whichever is higher; (b) have the legal capacity to enter into a binding agreement; (c) not be a resident of any jurisdiction where cryptocurrency trading is prohibited or restricted by law; (d) not be on any sanctions list or subject to economic sanctions imposed by any government; (e) not have been previously suspended or removed from the Platform; and (f) comply with all applicable local, state, national, and international laws and regulations. By using the Platform, you represent and warrant that you meet all eligibility requirements. We reserve the right to verify your identity and eligibility at any time and may refuse service, terminate accounts, or cancel transactions at our sole discretion."
      },
      {
        title: "3. Description of Services",
        content: "Arbah.co provides a comprehensive cryptocurrency trading and market intelligence platform that includes, but is not limited to: (a) real-time market data, charts, and analytics from multiple decentralized exchanges; (b) trading terminals with advanced order types and execution tools; (c) portfolio tracking and management features; (d) wallet integration and multi-wallet management; (e) copy trading functionality allowing users to replicate strategies of other traders; (f) whale watching and large transaction monitoring; (g) token analysis and gem finder tools for discovering new opportunities; (h) market sniper tools for rapid token acquisition; (i) scanner functionality for identifying market trends; (j) referral and leaderboard programs; and (k) educational resources and market insights. The availability of specific features may vary based on your subscription tier, geographic location, and regulatory requirements."
      },
      {
        title: "4. Account Registration and Security",
        content: "To access certain features of the Platform, you must create an account by providing accurate, current, and complete information. You are solely responsible for: (a) maintaining the confidentiality of your account credentials, including your password and any two-factor authentication devices; (b) all activities that occur under your account, whether or not authorized by you; (c) immediately notifying us of any unauthorized access or security breach; (d) ensuring your account information remains accurate and up-to-date; and (e) logging out from your account at the end of each session. We implement industry-standard security measures, but we cannot guarantee absolute security. You acknowledge that you use the Platform at your own risk. We reserve the right to suspend or terminate accounts that we believe have been compromised or are being used in violation of these Terms."
      },
      {
        title: "5. Wallet Connection and Custody",
        content: "Arbah.co is a non-custodial platform, meaning we never take possession, custody, or control of your cryptocurrency assets or private keys. When you connect a wallet to our Platform: (a) you retain full ownership and control of your assets at all times; (b) you are solely responsible for the security of your private keys and seed phrases; (c) we cannot recover lost or stolen assets, private keys, or passwords; (d) transactions initiated through the Platform are executed on public blockchain networks and are irreversible once confirmed; (e) you are responsible for verifying all transaction details before confirmation; and (f) blockchain transaction fees (gas fees) are paid directly to network validators and are non-refundable. We strongly recommend using hardware wallets for enhanced security and never sharing your private keys or seed phrases with anyone, including Arbah.co staff."
      },
      {
        title: "6. Risk Disclosure and Disclaimers",
        content: "CRYPTOCURRENCY TRADING INVOLVES SUBSTANTIAL RISK OF LOSS AND IS NOT SUITABLE FOR ALL INVESTORS. You acknowledge and agree that: (a) cryptocurrency markets are highly volatile, and prices can fluctuate dramatically within short periods; (b) you may lose some or all of your invested capital; (c) past performance is not indicative of future results; (d) market conditions, liquidity, and other factors may prevent you from executing trades at desired prices; (e) smart contract vulnerabilities, blockchain network issues, and protocol failures may result in loss of funds; (f) regulatory changes may adversely affect the value or legality of certain cryptocurrencies; (g) tax implications vary by jurisdiction, and you are solely responsible for compliance with applicable tax laws; (h) the Platform provides information and tools, not financial, investment, legal, or tax advice; and (i) you should consult with qualified professionals before making any investment decisions. ARBAH.CO IS NOT A REGISTERED BROKER, DEALER, INVESTMENT ADVISOR, OR EXCHANGE."
      },
      {
        title: "7. Prohibited Activities",
        content: "You agree not to engage in any of the following prohibited activities: (a) violating any applicable laws, regulations, or third-party rights; (b) using the Platform for money laundering, terrorist financing, or other illegal purposes; (c) manipulating markets through wash trading, spoofing, or other deceptive practices; (d) attempting to gain unauthorized access to the Platform, other users' accounts, or our systems; (e) interfering with the proper functioning of the Platform through viruses, bots, or other harmful code; (f) circumventing any security features or access restrictions; (g) scraping, data mining, or extracting data from the Platform without authorization; (h) impersonating others or providing false information; (i) using the Platform to harass, abuse, or harm others; (j) engaging in front-running, sandwich attacks, or other predatory trading practices; (k) promoting securities or tokens in violation of applicable laws; (l) using automated systems or bots in violation of our policies; (m) reverse engineering or attempting to derive source code from the Platform; or (n) any other activity that we determine, in our sole discretion, to be harmful to the Platform or its users."
      },
      {
        title: "8. Copy Trading Terms",
        content: "If you use our copy trading feature: (a) you acknowledge that past performance of copied traders does not guarantee future results; (b) you are solely responsible for selecting which traders to copy and for monitoring your copied positions; (c) copied trades are executed automatically based on your settings, and market conditions may result in different execution prices than the original trader; (d) you can modify or stop copying at any time, but pending orders may still execute; (e) copied traders may have different risk tolerances, capital allocations, and investment objectives than you; (f) we do not endorse, recommend, or guarantee the performance of any trader; (g) copied traders receive no compensation from us and are not acting as your financial advisors; (h) slippage, fees, and timing differences may cause your results to differ from copied traders; and (i) you should diversify your investments and not allocate more capital to copy trading than you can afford to lose."
      },
      {
        title: "9. Subscription and Payment Terms",
        content: "Certain features of the Platform require paid subscriptions. By subscribing: (a) you authorize us to charge your designated payment method on a recurring basis until you cancel; (b) subscription fees are billed in advance for the subscription period; (c) prices are subject to change with notice, and changes apply to subsequent billing periods; (d) you are responsible for all applicable taxes; (e) failure to pay may result in suspension or termination of your subscription; (f) we may offer promotional pricing, which is subject to specific terms and conditions; (g) subscription benefits are personal to you and may not be shared, transferred, or resold; (h) downgrades take effect at the end of the current billing period; (i) upgrades take effect immediately with prorated charges; and (j) all payment information must be accurate and kept up-to-date. We accept various payment methods as displayed on the Platform."
      },
      {
        title: "10. Intellectual Property Rights",
        content: "All content, features, functionality, and materials on the Platform, including but not limited to: text, graphics, logos, icons, images, audio clips, video clips, data compilations, software, and the compilation thereof, are the exclusive property of Arbah.co or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. The Arbah.co name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Arbah.co. You may not use these marks without our prior written permission. You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for personal, non-commercial purposes in accordance with these Terms. Any unauthorized use terminates this license immediately."
      },
      {
        title: "11. User-Generated Content",
        content: "If you submit, post, or share any content on the Platform (including but not limited to trading strategies, comments, usernames, or profile information): (a) you grant us a worldwide, royalty-free, perpetual, irrevocable, non-exclusive license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content; (b) you represent and warrant that you own or have the necessary rights to the content and that it does not violate any third-party rights; (c) you are solely responsible for your content and any consequences of sharing it; (d) we may remove or modify content at our discretion; (e) we are not responsible for monitoring all content but reserve the right to do so; and (f) you agree not to post content that is illegal, offensive, defamatory, misleading, or violates these Terms."
      },
      {
        title: "12. Third-Party Services and Links",
        content: "The Platform may contain links to third-party websites, services, or integrate with third-party applications (such as wallet providers, blockchain networks, and data providers). We are not responsible for: (a) the content, accuracy, or opinions expressed on third-party sites; (b) the security or privacy practices of third parties; (c) any transactions you conduct with third parties; (d) any damages or losses caused by third-party services; or (e) the availability or functionality of third-party services. Your use of third-party services is governed by their respective terms of service and privacy policies. We encourage you to review these documents before using any third-party service."
      },
      {
        title: "13. Limitation of Liability",
        content: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ARBAH.CO, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO: DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE PLATFORM; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM; (C) ANY CONTENT OBTAINED FROM THE PLATFORM; (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT; (E) TRADING LOSSES OR MISSED OPPORTUNITIES; (F) TECHNICAL FAILURES, BUGS, OR ERRORS; (G) ACTIONS OR INACTIONS OF BLOCKCHAIN NETWORKS; OR (H) ANY OTHER MATTER RELATING TO THE PLATFORM, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF: (I) THE AMOUNTS YOU HAVE PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM; OR (II) ONE HUNDRED US DOLLARS ($100)."
      },
      {
        title: "14. Indemnification",
        content: "You agree to defend, indemnify, and hold harmless Arbah.co and its directors, officers, employees, agents, partners, suppliers, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from: (a) your use of and access to the Platform; (b) your violation of any term of these Terms; (c) your violation of any third-party right, including without limitation any copyright, property, or privacy right; (d) any claim that your content caused damage to a third party; (e) your trading activities and any resulting disputes; or (f) your violation of any applicable laws or regulations. This defense and indemnification obligation will survive these Terms and your use of the Platform."
      },
      {
        title: "15. Dispute Resolution and Arbitration",
        content: "Any dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by binding arbitration. The arbitration shall be conducted in accordance with the rules of a recognized arbitration institution. The arbitrator's decision shall be final and binding, and judgment upon the award may be entered in any court having jurisdiction. You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. If for any reason a claim proceeds in court rather than in arbitration, you waive any right to a jury trial. This arbitration agreement shall survive the termination of your relationship with Arbah.co."
      },
      {
        title: "16. Governing Law and Jurisdiction",
        content: "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Arbah.co is incorporated, without regard to its conflict of law provisions. You agree that any legal action or proceeding arising out of or relating to these Terms or your use of the Platform shall be brought exclusively in the courts of that jurisdiction, and you hereby consent to the personal jurisdiction and venue of such courts. Notwithstanding the foregoing, we may seek injunctive or other equitable relief to protect our intellectual property rights in any court of competent jurisdiction."
      },
      {
        title: "17. Termination",
        content: "We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination: (a) your right to use the Platform will immediately cease; (b) any pending transactions may or may not be completed at our discretion; (c) you remain liable for all obligations accrued prior to termination; (d) provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability; and (e) we may delete your account data after a reasonable period, except as required by law. You may terminate your account at any time by contacting customer support or using account settings, but no refunds will be provided for unused subscription periods."
      },
      {
        title: "18. Modifications to the Platform",
        content: "We reserve the right to modify, suspend, or discontinue the Platform or any feature, service, or content at any time without notice or liability. We may also impose limits on certain features or restrict your access to parts or all of the Platform without notice or liability. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Platform. We continuously work to improve the Platform and may introduce new features, change existing ones, or remove features that are no longer needed or viable."
      },
      {
        title: "19. Notices and Communications",
        content: "By creating an account, you agree to receive communications from us electronically, including emails, push notifications, and in-app messages. You agree that all agreements, notices, disclosures, and other communications we provide electronically satisfy any legal requirement that such communications be in writing. We may send: (a) service announcements and updates; (b) security alerts and notifications; (c) promotional materials (which you may opt out of); (d) transaction confirmations; (e) legal notices and policy updates; and (f) customer support communications. You are responsible for keeping your contact information up-to-date."
      },
      {
        title: "20. Severability and Waiver",
        content: "If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect. Our failure to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. No waiver of any term shall be deemed a further or continuing waiver of such term or any other term."
      },
      {
        title: "21. Entire Agreement",
        content: "These Terms, together with our Privacy Policy, Refund Policy, and any other policies or agreements referenced herein, constitute the sole and entire agreement between you and Arbah.co regarding the Platform and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Platform. Any ambiguities in the interpretation of these Terms shall not be construed against the drafting party."
      },
      {
        title: "22. Contact Information",
        content: "If you have any questions about these Terms of Service, please contact us at: Arbah.co Legal Department, Email: legal@arbah.co, Support: support@arbah.co. For general inquiries about the Platform, visit our Help Center or contact our customer support team. We aim to respond to all legal inquiries within 5-7 business days."
      }
    ]
  },
  privacy: {
    title: "Privacy Policy",
    icon: Shield,
    lastUpdated: "January 8, 2026",
    sections: [
      {
        title: "1. Introduction and Scope",
        content: "Arbah.co ('Company', 'we', 'us', or 'our') is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, store, and protect your personal data when you use our cryptocurrency trading platform and related services (collectively, the 'Platform'). This Policy applies to all users of the Platform worldwide, though certain rights may vary based on your jurisdiction. By using the Platform, you consent to the data practices described in this Policy. If you do not agree with this Policy, please do not use the Platform. We may update this Policy periodically, and material changes will be communicated through the Platform or via email."
      },
      {
        title: "2. Information We Collect",
        content: "We collect several types of information: (A) Information You Provide: email address, display name, profile picture, phone number (if provided for 2FA), wallet addresses you connect, trading preferences and settings, customer support communications, survey responses, and any other information you voluntarily provide. (B) Information Collected Automatically: IP address, device type and identifiers, browser type and version, operating system, access times and dates, pages viewed and features used, click patterns and navigation paths, referral URLs, session duration, and performance data. (C) Blockchain Data: public wallet addresses, transaction history, token holdings, and smart contract interactions (all of which is publicly available on the blockchain). (D) Third-Party Information: data from analytics providers, data from authentication services, market data providers, and publicly available information."
      },
      {
        title: "3. How We Use Your Information",
        content: "We use your information for the following purposes: (A) Service Provision: to create and manage your account, provide access to Platform features, process transactions, display your portfolio and trading history, enable copy trading and social features, and provide customer support. (B) Platform Improvement: to analyze usage patterns and trends, identify bugs and technical issues, develop new features and services, personalize your experience, and conduct research and analytics. (C) Communication: to send service notifications and updates, respond to your inquiries, provide important security alerts, send marketing communications (with your consent), and notify you of policy changes. (D) Security and Compliance: to detect and prevent fraud, enforce our Terms of Service, comply with legal obligations, protect our rights and property, and ensure platform security. (E) Legal Bases: we process data based on contractual necessity, legitimate interests, legal compliance, and your consent where required."
      },
      {
        title: "4. Data Sharing and Disclosure",
        content: "We may share your information with: (A) Service Providers: cloud hosting providers, analytics services, payment processors, customer support tools, email service providers, and security services. All service providers are bound by confidentiality obligations. (B) Business Transfers: in connection with any merger, acquisition, restructuring, or sale of assets, your information may be transferred as a business asset. (C) Legal Requirements: when required by law, court order, or government request; to protect our rights, privacy, safety, or property; to enforce our Terms of Service; or to respond to an emergency involving danger of death or serious injury. (D) With Your Consent: when you explicitly authorize sharing with third parties. (E) Aggregated Data: we may share anonymized, aggregated data that cannot be used to identify you. We DO NOT sell your personal information to third parties for their marketing purposes."
      },
      {
        title: "5. Blockchain and Public Data",
        content: "You acknowledge that: (A) blockchain transactions are publicly recorded and permanently stored on distributed ledgers; (B) your wallet addresses, transaction amounts, and token holdings are visible to anyone; (C) once recorded on the blockchain, transactions cannot be deleted or modified; (D) linking your identity to a wallet address may make your transaction history identifiable; (E) we cannot control or limit access to public blockchain data; (F) third parties may analyze blockchain data and potentially link it to your identity; and (G) you should consider these factors when using the Platform and connecting wallets. We recommend using different wallets for different purposes if privacy is a concern."
      },
      {
        title: "6. Data Retention",
        content: "We retain your personal data for as long as necessary to: (A) maintain your active account and provide services; (B) comply with legal, accounting, or reporting requirements; (C) resolve disputes and enforce our agreements; (D) maintain security and fraud prevention records; and (E) fulfill any other legitimate business purpose. Specific retention periods: account data is retained while your account is active plus 7 years; transaction logs are kept for 7 years for compliance; security logs are maintained for 2 years; marketing preferences are kept until you unsubscribe; and support tickets are retained for 3 years. After retention periods expire, data is securely deleted or anonymized. Some data may be retained longer if required by law or for ongoing legal proceedings."
      },
      {
        title: "7. Data Security",
        content: "We implement comprehensive security measures including: (A) Technical Safeguards: encryption of data in transit (TLS 1.3) and at rest (AES-256), secure server infrastructure with regular security audits, intrusion detection and prevention systems, regular vulnerability assessments and penetration testing, secure coding practices, and multi-factor authentication options. (B) Organizational Safeguards: employee access controls and least-privilege principles, regular security training for staff, incident response procedures, vendor security assessments, and data protection impact assessments. (C) Operational Safeguards: regular backups with encryption, disaster recovery procedures, and continuous monitoring. Despite these measures, no system is completely secure. You are responsible for maintaining the security of your account credentials and devices."
      },
      {
        title: "8. Your Privacy Rights",
        content: "Depending on your jurisdiction, you may have the following rights: (A) Access: request a copy of your personal data we hold. (B) Correction: request correction of inaccurate or incomplete data. (C) Deletion: request deletion of your personal data (subject to legal retention requirements). (D) Portability: receive your data in a structured, machine-readable format. (E) Restriction: request restriction of processing in certain circumstances. (F) Objection: object to processing based on legitimate interests or for direct marketing. (G) Withdraw Consent: withdraw consent where processing is based on consent. (H) Lodge Complaints: file complaints with your local data protection authority. To exercise these rights, contact us at privacy@arbah.co with proof of identity. We will respond within 30 days (or as required by applicable law). Some requests may be denied if they conflict with legal obligations or legitimate interests."
      },
      {
        title: "9. International Data Transfers",
        content: "Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer data internationally, we implement appropriate safeguards including: (A) Standard Contractual Clauses approved by relevant authorities; (B) data processing agreements with recipients; (C) ensuring recipients maintain adequate security measures; and (D) compliance with applicable cross-border transfer requirements. By using the Platform, you consent to the transfer of your information to countries outside your residence, including countries that may not provide the same level of data protection as your home country."
      },
      {
        title: "10. Cookies and Tracking Technologies",
        content: "We use cookies and similar technologies for: (A) Essential Cookies: required for Platform functionality, security, and authentication. (B) Analytics Cookies: to understand how users interact with the Platform, measure performance, and identify issues. (C) Preference Cookies: to remember your settings and preferences. (D) Marketing Cookies: to deliver relevant advertisements (with your consent where required). You can manage cookies through your browser settings. Disabling certain cookies may affect Platform functionality. We also use: local storage for performance optimization, session storage for temporary data, and pixel tags/web beacons for analytics. Our analytics providers may include Google Analytics (you can opt out via browser plugin), and similar services."
      },
      {
        title: "11. Do Not Track Signals",
        content: "Some browsers have 'Do Not Track' (DNT) features that signal to websites that you do not want your online activity tracked. There is currently no universally accepted standard for how companies should respond to DNT signals. At this time, we do not respond to DNT signals. However, you can use the privacy settings and tools described in this Policy to manage tracking and personalization. We will update this Policy if a standard for responding to DNT signals is established."
      },
      {
        title: "12. Third-Party Services and Links",
        content: "The Platform may contain links to or integrate with third-party services, including: wallet providers, blockchain networks, market data providers, authentication services, and social media platforms. These third parties have their own privacy policies that govern their collection and use of your information. We are not responsible for the privacy practices of third parties. We encourage you to review their privacy policies before providing any information or using their services. Third-party integrations are provided for convenience, and their inclusion does not imply endorsement."
      },
      {
        title: "13. Children's Privacy",
        content: "The Platform is not intended for users under 18 years of age (or the age of majority in your jurisdiction, whichever is higher). We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will promptly delete that information. If you believe we have collected information from a child, please contact us immediately at privacy@arbah.co. Parents or guardians who become aware that their child has provided us with information should contact us."
      },
      {
        title: "14. Marketing Communications",
        content: "With your consent where required, we may send you marketing communications about our products, services, and promotions. You can opt out of marketing communications at any time by: (A) clicking the 'unsubscribe' link in any marketing email; (B) adjusting your notification preferences in account settings; (C) contacting us at privacy@arbah.co. Please note that even after opting out of marketing, you will continue to receive transactional and service-related communications necessary for the operation of your account."
      },
      {
        title: "15. California Privacy Rights (CCPA/CPRA)",
        content: "If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA): (A) Right to Know: what personal information we collect, use, disclose, and sell. (B) Right to Delete: request deletion of your personal information. (C) Right to Opt-Out: of the sale or sharing of personal information (note: we do not sell personal information). (D) Right to Non-Discrimination: for exercising your privacy rights. (E) Right to Correction: of inaccurate personal information. (F) Right to Limit: use of sensitive personal information. To exercise these rights, contact us at privacy@arbah.co or call our toll-free number. We will verify your identity before processing requests. You may designate an authorized agent to make requests on your behalf."
      },
      {
        title: "16. European Privacy Rights (GDPR)",
        content: "If you are in the European Economic Area (EEA), United Kingdom, or Switzerland, you have rights under the General Data Protection Regulation (GDPR) including: (A) the rights described in Section 8 (Your Privacy Rights); (B) the right to lodge a complaint with your local supervisory authority; (C) the right to object to automated decision-making; and (D) the right not to be subject to decisions based solely on automated processing. Our legal bases for processing are: contract performance, legitimate interests, legal compliance, and consent. Our Data Protection Officer can be contacted at dpo@arbah.co. For EU-specific inquiries, we have appointed an EU representative who can be reached at eu-rep@arbah.co."
      },
      {
        title: "17. Other Regional Privacy Rights",
        content: "Users in other jurisdictions may have additional rights under local laws: (A) Brazil (LGPD): rights similar to GDPR, including access, correction, deletion, and data portability. (B) Canada (PIPEDA): rights to access and correct personal information. (C) Australia: rights under the Privacy Act 1988. (D) Singapore (PDPA): rights to access and correct personal data. (E) Other Jurisdictions: we comply with applicable local privacy laws. Contact us to learn about rights specific to your jurisdiction."
      },
      {
        title: "18. Data Breach Notification",
        content: "In the event of a data breach that affects your personal information: (A) we will investigate promptly and take appropriate remedial measures; (B) we will notify affected users without undue delay (and within timeframes required by applicable law); (C) notification will include the nature of the breach, types of data affected, steps we are taking, and recommendations for protecting yourself; (D) we will notify relevant supervisory authorities as required by law; and (E) we maintain incident response procedures to handle breaches effectively. We encourage you to monitor your accounts and report any suspicious activity."
      },
      {
        title: "19. Changes to This Privacy Policy",
        content: "We may update this Privacy Policy periodically to reflect changes in our practices, technologies, legal requirements, or for other operational reasons. When we make material changes: (A) we will update the 'Last Updated' date at the top of this Policy; (B) we will notify you via email or prominent notice on the Platform; (C) we may request renewed consent where required by law; and (D) continued use of the Platform after changes constitutes acceptance. We encourage you to review this Policy regularly. Previous versions of this Policy are available upon request."
      },
      {
        title: "20. Contact Us",
        content: "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: Arbah.co Privacy Team, Email: privacy@arbah.co, Data Protection Officer: dpo@arbah.co, General Support: support@arbah.co. For EU Users: EU Representative at eu-rep@arbah.co. We aim to respond to all privacy-related inquiries within 30 days. For complaints, you may also contact your local data protection authority."
      }
    ]
  },
  refund: {
    title: "Refund Policy",
    icon: Scale,
    lastUpdated: "January 8, 2026",
    sections: [
      {
        title: "1. Policy Overview",
        content: "This Refund Policy ('Policy') outlines Arbah.co's guidelines and procedures for refunds related to subscription services, premium features, and any applicable platform fees. At Arbah.co, we are committed to providing high-quality services and fair, transparent refund processes. This Policy is designed to balance user protection with the operational requirements of our Platform. By subscribing to our services or making any purchases on the Platform, you agree to the terms of this Policy. Please read this Policy carefully before making any purchase."
      },
      {
        title: "2. Scope of This Policy",
        content: "This Policy applies to: (A) Monthly and annual subscription plans (Basic, Pro, Premium, Enterprise); (B) One-time purchases of additional features or credits; (C) Any promotional or discounted purchases; and (D) Add-on services purchased through the Platform. This Policy does NOT apply to: (A) Cryptocurrency trading transactions (which are governed by blockchain protocols); (B) Blockchain network fees (gas fees) which are paid directly to network validators; (C) Third-party services or products not sold directly by Arbah.co; (D) Losses from trading activities; or (E) Promotional credits or free trial periods."
      },
      {
        title: "3. Subscription Billing and Automatic Renewal",
        content: "Subscription terms: (A) Subscriptions are billed in advance for the subscription period (monthly or annually). (B) Subscriptions automatically renew at the end of each billing period unless cancelled. (C) You will be charged the applicable subscription fee on your billing date. (D) Annual subscriptions provide a discount compared to monthly billing. (E) All prices are displayed in USD unless otherwise specified. (F) Prices are exclusive of applicable taxes, which will be added where required. (G) You can view your billing history and manage your subscription in account settings. (H) We will notify you of any price changes at least 30 days before they take effect."
      },
      {
        title: "4. Cancellation Policy",
        content: "You may cancel your subscription at any time: (A) Through your account settings under 'Subscription' or 'Billing'. (B) By contacting customer support at support@arbah.co. (C) Cancellation takes effect at the end of your current billing period. (D) You will retain access to premium features until the end of your paid period. (E) No partial refunds are provided for unused portions of a subscription period. (F) After cancellation, your account will revert to the free tier (if available). (G) Your data will be retained according to our data retention policy. (H) You can resubscribe at any time, but promotional pricing may not be available."
      },
      {
        title: "5. Refund Eligibility",
        content: "Refunds may be considered in the following circumstances: (A) Technical Issues: Extended service outages exceeding 24 consecutive hours that materially affect your use of paid features; Critical bugs that prevent core functionality and are not resolved within 48 hours; Billing errors or duplicate charges made by us. (B) First-Time Subscribers: First-time subscribers may request a courtesy refund within 7 days of initial purchase if they are not satisfied with the service. This courtesy refund is limited to one per user and is subject to verification. (C) Annual Subscription Downgrade: If you wish to downgrade from an annual to monthly subscription within 14 days of purchase, we may offer a prorated refund minus any benefits already received. (D) Account Issues: If your account was charged after you requested cancellation (and we can verify the cancellation request was made before the billing date)."
      },
      {
        title: "6. Non-Refundable Items and Circumstances",
        content: "The following are strictly non-refundable: (A) Subscription fees after the eligible refund period has passed. (B) Blockchain transaction fees (gas fees) - these are paid directly to network validators and are outside our control. (C) Trading fees and any losses incurred from trading activities. (D) Promotional, discounted, or special offer subscriptions (unless otherwise stated in the promotion terms). (E) One-time purchases after the service or feature has been accessed or used. (F) Subscriptions or purchases made with promotional credits or rewards. (G) Accounts terminated for violation of our Terms of Service. (H) Refund requests made more than 30 days after the original purchase. (I) Situations where the user simply changed their mind (buyer's remorse) outside the first-time subscriber courtesy period. (J) Downtime or issues caused by factors outside our control (internet outages, blockchain network congestion, etc.)."
      },
      {
        title: "7. Refund Request Process",
        content: "To request a refund: (A) Contact our support team at support@arbah.co with the subject line 'Refund Request'. (B) Include the following information: your account email address, transaction ID or receipt number, date of purchase, subscription plan or item purchased, detailed reason for the refund request, and any supporting documentation (screenshots, error messages, etc.). (C) Our team will acknowledge your request within 2 business days. (D) Refund requests are reviewed on a case-by-case basis. (E) We may request additional information to process your request. (F) You will receive a written decision within 5-7 business days. (G) If approved, refunds are processed within 5-10 business days. (H) If denied, we will explain the reason and any alternative solutions."
      },
      {
        title: "8. Refund Methods and Processing",
        content: "Approved refunds are processed as follows: (A) Refunds are credited to the original payment method used for the purchase. (B) Credit/debit card refunds typically appear within 5-10 business days, depending on your financial institution. (C) Bank transfer refunds may take up to 14 business days. (D) Cryptocurrency payments (if accepted) are refunded at the USD equivalent value at the time of the original transaction. (E) We cannot process refunds to different payment methods or accounts. (F) Any applicable fees charged by payment processors are non-refundable. (G) Partial refunds may be issued where appropriate (e.g., prorated annual subscriptions). (H) You will receive email confirmation when your refund has been processed."
      },
      {
        title: "9. Disputes and Chargebacks",
        content: "If you have a billing dispute: (A) Please contact our support team first to resolve the issue directly. (B) We are committed to resolving disputes fairly and promptly. (C) Filing a chargeback with your payment provider without first contacting us may result in: immediate suspension of your account, loss of any credits, data, or subscription benefits, and additional fees if the chargeback is unsuccessful. (D) We reserve the right to dispute chargebacks we believe are unwarranted. (E) Fraudulent chargebacks may be reported to relevant authorities and credit agencies. (F) Accounts associated with chargebacks may be permanently banned from the Platform. (G) We maintain records of all transactions and communications for chargeback disputes."
      },
      {
        title: "10. Free Trials and Promotional Periods",
        content: "If we offer free trials or promotional periods: (A) Free trials provide full access to specified features for a limited time. (B) You may be required to provide payment information to start a trial. (C) If you do not cancel before the trial ends, your payment method will be charged for the first subscription period. (D) We will send a reminder before your trial ends (if you have enabled notifications). (E) Trial periods may only be used once per user/payment method. (F) Attempting to abuse trial periods (e.g., creating multiple accounts) may result in account termination. (G) Promotional periods have specific terms stated in the promotion. (H) No refunds are provided for forgetting to cancel a trial."
      },
      {
        title: "11. Subscription Upgrades and Downgrades",
        content: "Changing your subscription: (A) Upgrades: When you upgrade to a higher tier, the change takes effect immediately; you are charged a prorated amount for the remainder of your billing period; your new billing date remains the same. (B) Downgrades: When you downgrade to a lower tier, the change takes effect at the end of your current billing period; you retain higher-tier features until then; no refunds are provided for the current period; and your new rate applies from the next billing cycle. (C) Plan Changes: You can change plans through account settings or by contacting support; multiple changes within a billing period may result in adjusted charges."
      },
      {
        title: "12. Service Credits",
        content: "In lieu of monetary refunds, we may offer service credits: (A) Service credits can be applied to future subscription periods or purchases. (B) Credits are non-transferable and have no cash value. (C) Credits expire 12 months from the date of issuance. (D) Credits cannot be used for third-party services or blockchain fees. (E) If your account is terminated, any unused credits are forfeited. (F) Service credits are offered at our discretion as a goodwill gesture. (G) Accepting service credits does not waive your rights to pursue other remedies if applicable."
      },
      {
        title: "13. Enterprise and Custom Plans",
        content: "For Enterprise or custom subscription plans: (A) Refund terms are specified in your individual service agreement. (B) Custom terms may override the standard refund policy. (C) Contact your account manager for refund-related inquiries. (D) Enterprise trials and pilots have specific terms agreed upon in writing. (E) Multi-user or team subscriptions may have different refund procedures. (F) Volume discounts may affect refund calculations."
      },
      {
        title: "14. Regional Considerations",
        content: "Certain jurisdictions may have additional consumer protection laws: (A) European Union: Consumers may have a 14-day cooling-off period for digital services under the Consumer Rights Directive. However, by using the service immediately, you may waive this right. (B) Australia: Consumers have rights under Australian Consumer Law that cannot be excluded. (C) Other Regions: We comply with applicable local consumer protection laws, which may provide additional or different rights. (D) Nothing in this Policy is intended to limit rights that cannot be legally waived. (E) Contact us for information about rights specific to your region."
      },
      {
        title: "15. Force Majeure",
        content: "We are not liable for service interruptions or our inability to provide refunds due to circumstances beyond our reasonable control, including: (A) Natural disasters, acts of God, or extreme weather events. (B) War, terrorism, civil unrest, or government actions. (C) Epidemics, pandemics, or public health emergencies. (D) Cyber attacks, widespread internet outages, or infrastructure failures. (E) Blockchain network issues, protocol failures, or smart contract bugs. (F) Third-party service provider failures. (G) Any other events that could not have been reasonably anticipated or prevented. In such cases, we will make reasonable efforts to resume normal operations and address refund requests as soon as practicable."
      },
      {
        title: "16. Policy Changes",
        content: "We reserve the right to modify this Refund Policy at any time: (A) Material changes will be communicated via email or Platform notification. (B) Changes take effect 30 days after posting (unless a longer period is required by law). (C) Your continued use of paid services after changes constitutes acceptance. (D) The Policy in effect at the time of your purchase governs that transaction. (E) Previous versions of this Policy are available upon request. (F) We encourage you to review this Policy periodically."
      },
      {
        title: "17. Contact Information",
        content: "For refund requests, billing inquiries, or questions about this Policy: Customer Support Email: support@arbah.co, Billing Department: billing@arbah.co, Response Time: We aim to respond to all inquiries within 2 business days. When contacting us, please include: your account email, transaction details, and a clear description of your request. Our support team is available Monday through Friday, 9 AM to 6 PM (UTC). For urgent billing issues outside these hours, please email with 'URGENT' in the subject line."
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
