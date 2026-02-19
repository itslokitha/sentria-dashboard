import { motion } from "motion/react";
import { Shield, Lock, Key, Database, AlertTriangle, CheckCircle2, Eye, FileCheck, Server, Activity } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption",
    details: "Military-grade encryption standards protect your sensitive customer data at every stage"
  },
  {
    icon: Key,
    title: "Multi-Factor Authentication",
    description: "Required MFA for all accounts with support for authenticator apps and hardware keys",
    details: "Prevent unauthorized access with industry-leading authentication protocols"
  },
  {
    icon: Database,
    title: "Data Residency",
    description: "Choose where your data is stored with options in North America, Europe, and Asia-Pacific",
    details: "Maintain compliance with regional data sovereignty requirements"
  },
  {
    icon: Eye,
    title: "Audit Logging",
    description: "Comprehensive activity logs for all user actions and system events",
    details: "Complete visibility into who accessed what data and when for compliance tracking"
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Hosted on AWS with automated backups, redundancy, and disaster recovery",
    details: "Enterprise-grade infrastructure with 99.9% uptime SLA"
  },
  {
    icon: AlertTriangle,
    title: "Threat Detection",
    description: "24/7 monitoring with AI-powered anomaly detection and automated threat response",
    details: "Proactive security measures to identify and neutralize threats before they impact you"
  }
];

const certifications = [
  {
    name: "SOC 2 Type II",
    description: "Independently audited security, availability, and confidentiality controls",
    year: "2025"
  },
  {
    name: "ISO 27001",
    description: "International standard for information security management systems",
    year: "2025"
  },
  {
    name: "GDPR Compliant",
    description: "Full compliance with European data protection regulations",
    year: "Ongoing"
  },
  {
    name: "PIPEDA Compliant",
    description: "Adheres to Canadian privacy legislation requirements",
    year: "Ongoing"
  },
  {
    name: "HIPAA Ready",
    description: "Healthcare-grade security controls for protected health information",
    year: "2025"
  },
  {
    name: "PCI DSS",
    description: "Payment card industry data security standards compliance",
    year: "2025"
  }
];

const securityPractices = [
  {
    title: "Regular Security Audits",
    description: "Quarterly penetration testing and annual third-party security assessments"
  },
  {
    title: "Secure Development",
    description: "Security-first development practices with code reviews and vulnerability scanning"
  },
  {
    title: "Employee Training",
    description: "Mandatory security awareness training for all team members annually"
  },
  {
    title: "Incident Response",
    description: "24/7 security operations center with documented incident response procedures"
  },
  {
    title: "Access Controls",
    description: "Role-based access control with principle of least privilege enforcement"
  },
  {
    title: "Data Backup",
    description: "Automated daily backups with 30-day retention and point-in-time recovery"
  }
];

export function SecurityPage() {
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
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Enterprise Security
                </span>
              </div>
              <h1 className="mb-6 text-white leading-tight">
                Security Built Into Every Layer
              </h1>
              <p className="text-2xl text-[#B7C0D6] leading-relaxed mb-8">
                Your data security is our top priority. We employ enterprise-grade security measures, 
                regular audits, and industry-leading certifications to protect your business.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm text-[#B7C0D6]">Uptime SLA</div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-[#B7C0D6]">Security Monitoring</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1768839720936-87ce3adf2d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGF0YSUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzcwMTQxOTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cybersecurity and Data Protection"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Comprehensive Security Features</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Multiple layers of protection to keep your data safe and secure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#B7C0D6] mb-4">{feature.description}</p>
                <p className="text-sm text-[#B7C0D6]/80 italic">{feature.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Certifications & Compliance</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Independently verified security and compliance standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                  <span className="text-sm text-primary font-semibold">{cert.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-[#B7C0D6]">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Our Security Practices</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Continuous improvement and vigilance to maintain the highest security standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {securityPractices.map((practice, index) => (
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
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{practice.title}</h3>
                    <p className="text-[#B7C0D6] text-sm">{practice.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
              <Activity className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-white mb-4">Security Questions or Concerns?</h2>
              <p className="text-xl text-[#B7C0D6] mb-8">
                Our security team is here to address any questions about our security practices, 
                certifications, or to discuss your specific compliance requirements.
              </p>
              <div className="flex flex-col gap-3 text-[#B7C0D6]">
                <p className="text-lg">
                  <strong className="text-white">Email:</strong> security@sentria.ai
                </p>
                <p className="text-lg">
                  <strong className="text-white">Emergency:</strong> +1 (902) 555-0199 (24/7)
                </p>
                <p className="text-lg">
                  <strong className="text-white">Bug Bounty:</strong> security-bounty@sentria.ai
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
