import { motion } from "motion/react";
import { Shield, CheckCircle2, Globe, FileCheck, Building2, Award, Scale, BookOpen } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const complianceStandards = [
  {
    icon: Globe,
    title: "GDPR Compliance Ready",
    region: "European Union",
    description: "Full compliance with the General Data Protection Regulation, ensuring the highest standards of data privacy and protection for EU citizens, compliance ready.",
    requirements: [
      "Data subject rights (access, rectification, erasure), compliance ready",
      "Privacy by design and by default, compliance ready",
      "Data protection impact assessments, compliance ready",
      "Breach notification within 72 hours, compliance ready"
    ]
  },
  {
    icon: Building2,
    title: "PIPEDA Compliance Ready",
    region: "Canada",
    description: "Adheres to Canada's Personal Information Protection and Electronic Documents Act, ensuring responsible handling of personal information, compliance ready.",
    requirements: [
      "Consent for collection and use, compliance ready",
      "Limited collection and use, compliance ready",
      "Safeguarding personal information, compliance ready",
      "Individual access to information, compliance ready"
    ]
  },
  {
    icon: Shield,
    title: "CCPA Compliance Ready",
    region: "California, USA",
    description: "Compliant with the California Consumer Privacy Act, providing transparency and control over personal data, compliance ready.",
    requirements: [
      "Right to know what data is collected, compliance ready",
      "Right to delete personal information, compliance ready",
      "Right to opt-out of data sales, compliance ready",
      "Non-discrimination for exercising rights, compliance ready"
    ]
  },
  {
    icon: FileCheck,
    title: "HIPAA Compliance Ready",
    region: "United States",
    description: "Healthcare-grade security controls for organizations handling protected health information (PHI), compliance ready.",
    requirements: [
      "Administrative safeguards, compliance ready",
      "Physical safeguards, compliance ready",
      "Technical safeguards, compliance ready",
      "Business Associate Agreements (BAA), compliance ready"
    ]
  }
];

const dataHandling = [
  {
    title: "Data Collection Ready",
    description: "We collect only what's necessary for service delivery and clearly communicate all data collection practices, ready"
  },
  {
    title: "Data Processing Ready",
    description: "All data processing activities are documented, lawful, and conducted with appropriate security measures, ready"
  },
  {
    title: "Data Storage Ready",
    description: "Data is stored in secure, compliant facilities with encryption at rest and redundant backups, ready"
  },
  {
    title: "Data Transfer Ready",
    description: "Cross-border data transfers comply with all applicable regulations including Standard Contractual Clauses, ready"
  },
  {
    title: "Data Retention Ready",
    description: "Clear retention policies with automated deletion after specified periods unless required by law, ready"
  },
  {
    title: "Data Rights Ready",
    description: "Full support for data subject rights including access, rectification, erasure, and portability, ready"
  }
];

const industryCompliance = [
  { industry: "Healthcare", standards: ["HIPAA", "HITECH", "PHIPA (Canada)"] },
  { industry: "Finance", standards: ["PCI DSS", "SOX", "GLBA"] },
  { industry: "Education", standards: ["FERPA", "COPPA"] },
  { industry: "Retail", standards: ["PCI DSS", "CCPA"] },
  { industry: "Government", standards: ["FedRAMP", "FISMA"] },
  { industry: "Legal", standards: ["Attorney-Client Privilege", "Work Product Doctrine"] }
];

export function CompliancePage() {
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="mb-6 text-left">
                <h3 className="text-white font-bold mb-2">Enterprise-Grade Security & Compliance</h3>
                <p className="text-[#B7C0D6]">Trusted by businesses worldwide</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1632152053560-2ff69f7981f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wbGlhbmNlJTIwYXVkaXQlMjBjaGVja2xpc3R8ZW58MXx8fHwxNzcwMTc2OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Compliance and Audit"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
                <FileCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Compliance & Regulations
                </span>
              </div>
              <h1 className="mb-6 text-white leading-tight">
                Global Compliance Standards
              </h1>
              <p className="text-2xl text-[#B7C0D6] leading-relaxed mb-8">
                SENTRIA maintains compliance with international data protection regulations, 
                industry-specific standards, and security frameworks to protect your business.
                Our comprehensive compliance program ensures your organization meets stringent regulatory 
                requirements across all jurisdictions. We implement enterprise-grade security controls, 
                conduct regular third-party audits, and maintain transparent documentation to give you 
                complete confidence in our platform's compliance posture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">International Compliance Standards</h2>
            <p className="text-2xl text-[#B7C0D6] max-w-3xl mx-auto">
              We meet the highest global standards for data protection and privacy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                    <standard.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{standard.title}</h3>
                    <p className="text-sm text-primary font-semibold">{standard.region}</p>
                  </div>
                </div>
                <p className="text-lg text-[#B7C0D6] mb-6">{standard.description}</p>
                <div className="space-y-3">
                  {standard.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-[#B7C0D6]">{req}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Handling */}
      <section className="py-24 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Compliant Data Handling</h2>
            <p className="text-2xl text-[#B7C0D6] max-w-3xl mx-auto">
              Every step of our data lifecycle adheres to strict compliance requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataHandling.map((item, index) => (
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
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-[#B7C0D6] text-sm">{item.description}</p>
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
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-white mb-4">Compliance Questions?</h2>
              <p className="text-xl text-[#B7C0D6] mb-8">
                Our compliance team can help you understand how SENTRIA meets your specific regulatory requirements.
              </p>
              <div className="space-y-4">
                <p className="text-lg">
                  <strong className="text-white">Contact:</strong> compliance@sentria.ai
                </p>
                {/* Removed phone line */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}