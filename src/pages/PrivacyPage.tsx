import { motion } from "motion/react";
import { Shield, Lock, Eye, Database, UserCheck, FileText, Globe, Mail } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const privacySections = [
  {
    icon: Database,
    title: "Data Collection",
    content: "We collect only the information necessary to provide and improve our AI voice assistant services. This includes call recordings, transcripts, customer interaction data, and usage analytics. All data collection is transparent and explicitly consented to by users."
  },
  {
    icon: Lock,
    title: "Data Security",
    content: "Your data is protected with enterprise-grade encryption both in transit (TLS 1.3) and at rest (AES-256). We employ multi-factor authentication, regular security audits, and penetration testing to ensure the highest level of protection."
  },
  {
    icon: UserCheck,
    title: "Data Usage",
    content: "We use your data solely to deliver our services, improve AI models, and provide analytics. We never sell your data to third parties. Any data used for AI training is anonymized and aggregated to protect individual privacy."
  },
  {
    icon: Eye,
    title: "Your Rights",
    content: "You have the right to access, modify, or delete your data at any time. You can request a complete export of your data, opt-out of certain data collection practices, and withdraw consent. We respond to all data requests within 30 days."
  },
  {
    icon: Globe,
    title: "International Compliance",
    content: "SENTRIA complies with PIPEDA (Canada) and other international privacy regulations. We maintain data residency options and ensure cross-border data transfers meet all legal requirements."
  },
  {
    icon: FileText,
    title: "Data Retention",
    content: "We retain your data only as long as necessary to provide services or as required by law. Call recordings are retained for 90 days by default, analytics data for 2 years, and account information for the duration of your subscription plus 1 year."
  }
];

const principles = [
  { title: "Transparency", description: "Clear communication about what data we collect and why" },
  { title: "Consent", description: "Explicit permission for all data collection and processing" },
  { title: "Minimization", description: "Collect only what's necessary for service delivery" },
  { title: "Security", description: "Enterprise-grade protection at every layer" },
  { title: "Control", description: "You own your data and can access it anytime" },
  { title: "Accountability", description: "Regular audits and compliance certifications" }
];

export function PrivacyPage() {
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
                Privacy Policy
              </h2>
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Privacy Policy
                </span>
              </div>
              <h1 className="mb-6 text-white leading-tight">
                Your Privacy is Our Priority
              </h1>
              <p className="text-2xl text-[#B7C0D6] leading-relaxed mb-8">
                We believe in transparency, security, and giving you complete control over your data. 
                Learn how we protect your information and respect your privacy.
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
                  src="https://images.unsplash.com/photo-1599350686877-382a54114d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YWN5JTIwc2hpZWxkJTIwcHJvdGVjdGlvbnxlbnwxfHx8fDE3NzAxNzY5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Privacy and Data Protection"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Our Privacy Principles</h2>
            <p className="text-2xl text-[#B7C0D6]">The core values that guide our data practices</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
                <p className="text-lg text-[#B7C0D6]">{principle.description}</p>
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
              {privacySections.map((section, index) => (
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
              <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-white mb-4">Questions About Privacy?</h2>
              <p className="text-xl text-[#B7C0D6] mb-8">
                Our privacy team is here to help. Contact us with any questions or concerns about how we handle your data.
              </p>
              <div className="flex flex-col gap-3 text-[#B7C0D6]">
                <p className="text-lg">
                  <strong className="text-white">Email:</strong> privacy@sentria.ai
                </p>
                <p className="text-lg">
                  <strong className="text-white">Response Time:</strong> Within 48 hours
                </p>
                <p className="text-lg">
                  <strong className="text-white">Data Requests:</strong> Fulfilled within 30 days
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}