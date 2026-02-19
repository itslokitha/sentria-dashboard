import { motion } from "motion/react";
import { FileText, CheckCircle2, AlertCircle, Scale, UserCheck, CreditCard, RefreshCw, XCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const termsSections = [
  {
    icon: UserCheck,
    title: "Account Terms",
    content: "To create a SENTRIA account, you must be at least 18 years of age and authorized to enter into this agreement on behalf of your organization. You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. We recommend implementing strong password policies and enabling multi-factor authentication for enhanced security."
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    content: "Our subscription fees are billed monthly or annually in advance, depending on your selected plan. All prices are quoted exclusive of applicable taxes, which will be added to your invoice. We accept major credit cards and electronic payments. Subscriptions automatically renew unless cancelled prior to the renewal date. Custom enterprise plans include flexible payment terms and dedicated account management."
  },
  {
    icon: RefreshCw,
    title: "Cancellation & Termination",
    content: "You maintain full control over your subscription and may cancel at any time through your account dashboard or by contacting our customer success team. Your service remains active through the end of your current billing period. We're committed to making transitions smooth - our team will assist with data export and offboarding procedures. SENTRIA reserves the right to suspend service for accounts that violate our terms or engage in prohibited activities."
  },
  {
    icon: Scale,
    title: "Acceptable Use",
    content: "SENTRIA is designed to enhance your business operations through AI-powered voice automation. We expect all users to utilize our platform ethically and legally. Prohibited activities include transmitting malicious software, engaging in spam or phishing, violating intellectual property rights, or using the service for any unlawful purposes. We encourage responsible AI use that respects privacy and complies with applicable regulations."
  },
  {
    icon: CheckCircle2,
    title: "Service Level Agreement",
    content: "We are committed to providing enterprise-grade reliability with a 99.9% uptime guarantee for our production services. Our infrastructure is designed for high availability with redundancy and failover systems. While we strive for uninterrupted service, scheduled maintenance windows are communicated in advance. Fair usage policies ensure optimal performance for all customers. Enterprise clients receive enhanced SLA guarantees and priority support."
  },
  {
    icon: AlertCircle,
    title: "Limitation of Liability",
    content: "SENTRIA provides our platform and services on an 'as is' basis. While we maintain rigorous quality standards and security measures, we cannot guarantee that the service will always meet your specific requirements or be completely error-free. Our liability is limited to the fees paid by you in the preceding 12 months. We recommend implementing appropriate backup systems and business continuity plans for mission-critical operations."
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content: "SENTRIA retains all ownership rights to our platform, technology, and proprietary AI models. Your organization retains full ownership of all data, content, and information you upload or create using our services. By using SENTRIA, you grant us permission to process your data solely for the purpose of delivering and improving our services. We do not sell or share your proprietary business information with third parties."
  },
  {
    icon: RefreshCw,
    title: "Changes to Terms",
    content: "As our platform evolves and business needs change, we may update these terms from time to time. We will provide advance notice of any material changes via email and through in-platform notifications. Continued use of SENTRIA following such updates indicates acceptance of the revised terms. For enterprise customers, significant changes may be subject to mutual agreement. We maintain transparency in our terms and welcome feedback from our business partners."
  }
];

const keyPoints = [
  "Cancel anytime with no long-term contracts",
  "Fully compliant with privacy regulations",
  "99.9% uptime SLA guarantee",
  "Dedicated customer resolution team",
  "Transparent pricing with no hidden fees",
  "Your data remains your property at all times"
];

export function TermsPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Terms of Service
              </h2>
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
                <Scale className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Terms of Service
                </span>
              </div>
              <h1 className="mb-6 text-white leading-tight">
                Fair and Transparent Terms
              </h1>
              <p className="text-2xl text-[#B7C0D6] leading-relaxed">
                Please read these terms carefully before using SENTRIA's AI voice assistant platform. 
                By accessing our services, you agree to be bound by these terms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1764106813759-9ef7bf42a0af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50cyUyMGNvbnRyYWN0fGVufDF8fHx8MTc3MDExMzcyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Legal Terms and Agreements"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-16 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">What You Should Know</h2>
            <p className="text-2xl text-[#B7C0D6]">Key highlights from our terms of service</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-[#B7C0D6] text-lg">{point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-16">
              {termsSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                      <p className="text-xl text-[#B7C0D6] leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 text-center">
              <FileText className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-white mb-4">Questions About Our Terms?</h2>
              <p className="text-xl text-[#B7C0D6] mb-8">
                Our legal team is available to clarify any questions you have about our terms of service.
              </p>
              <div className="flex flex-col gap-3 text-[#B7C0D6]">
                <p className="text-lg">
                  <strong className="text-white">Email:</strong> legal@sentria.ai
                </p>
                <p className="text-lg">
                  <strong className="text-white">Phone:</strong> +1 (902) 555-0123
                </p>
                <p className="text-lg">
                  <strong className="text-white">Business Hours:</strong> Mon-Fri, 9 AM - 5 PM AST
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}