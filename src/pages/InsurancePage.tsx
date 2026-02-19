import { motion } from "motion/react";
import { useEffect } from "react";
import { Shield, Phone, FileText, Clock, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Star, DollarSign, Award, MessageCircle, Bell, Calendar, Target } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { month: "Jan", claims: 78, quotes: 85 },
  { month: "Feb", claims: 82, quotes: 88 },
  { month: "Mar", claims: 86, quotes: 91 },
  { month: "Apr", claims: 89, quotes: 93 },
  { month: "May", claims: 93, quotes: 96 },
  { month: "Jun", claims: 96, quotes: 98 },
];

const claimTypeData = [
  { name: "Auto", value: 385, color: "#2D6BFF" },
  { name: "Home", value: 245, color: "#4A85FF" },
  { name: "Life", value: 156, color: "#6B9EFF" },
  { name: "Health", value: 214, color: "#8CB7FF" },
];

export function InsurancePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Insurance Solutions - AI Voice for Carriers & Agencies | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1696861273647-92dfe8bb697c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMGhhbmRzaGFrZXxlbnwxfHx8fDE3NzAxODEzODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Insurance Business"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/50 via-[#070A12]/70 to-[#070A12]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BFF]/5 to-transparent"></div>
          
          {/* Floating Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                INSURANCE SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              AI Voice Automation for Insurance Agencies
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-6 md:mb-8 leading-relaxed">
              Streamline claims processing, policy inquiries, and customer service with intelligent AI voice assistants 
              that handle complex insurance workflows 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group w-full sm:w-auto">
                Schedule Insurance Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Insurance Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              From first notice of loss to policy renewals, handle every customer interaction intelligently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: FileText,
                title: "Claims Processing",
                description: "Automated FNOL (First Notice of Loss) intake, status updates, and documentation collection with intelligent routing",
                benefits: ["24/7 claim reporting", "Document upload", "Status tracking", "Adjuster routing"]
              },
              {
                icon: Phone,
                title: "Policy Inquiries",
                description: "Answer coverage questions, provide quote information, and assist with policy changes instantly",
                benefits: ["Coverage details", "Premium quotes", "Policy modifications", "Renewal reminders"]
              },
              {
                icon: Users,
                title: "Agent Support",
                description: "Free up agents for complex cases by handling routine inquiries, appointments, and follow-ups automatically",
                benefits: ["Appointment scheduling", "Lead qualification", "Call routing", "CRM integration"]
              },
              {
                icon: Bell,
                title: "Customer Communication",
                description: "Proactive outreach for policy renewals, payment reminders, and important updates",
                benefits: ["Payment reminders", "Renewal notices", "Coverage updates", "Birthday greetings"]
              },
              {
                icon: Target,
                title: "Lead Management",
                description: "Capture, qualify, and route insurance leads with intelligent conversation and CRM integration",
                benefits: ["Lead qualification", "Quote requests", "Hot lead alerts", "Follow-up automation"]
              },
              {
                icon: Shield,
                title: "Compliance & Security",
                description: "Maintain regulatory compliance with encrypted communications and comprehensive audit trails",
                benefits: ["Data encryption", "Call recording", "Audit logs", "GDPR compliant"]
              }
            ].map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-8 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 md:mb-6">
                  <capability.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{capability.title}</h3>
                <p className="text-sm md:text-base text-[#B7C0D6] mb-4 md:mb-6 leading-relaxed">
                  {capability.description}
                </p>
                <div className="space-y-2">
                  {capability.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs md:text-sm text-[#B7C0D6]">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Seamless Integration</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Connect with your existing systems for a unified insurance workflow
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: FileText,
                title: "CRM Integration",
                description: "Sync customer data and interactions with leading CRM platforms for a seamless experience",
                benefits: ["Data synchronization", "Lead tracking", "Call logging", "Analytics integration"]
              },
              {
                icon: Phone,
                title: "Telephony Systems",
                description: "Connect with popular telephony solutions to enhance call handling and routing",
                benefits: ["Call routing", "IVR integration", "Call recording", "Analytics"]
              },
              {
                icon: Users,
                title: "Policy Management",
                description: "Automate policy updates and renewals with integration to policy management systems",
                benefits: ["Policy updates", "Renewal reminders", "Status tracking", "Data synchronization"]
              },
              {
                icon: Bell,
                title: "Billing Systems",
                description: "Integrate with billing platforms to streamline payment processing and reminders",
                benefits: ["Payment reminders", "Invoice generation", "Payment tracking", "Data synchronization"]
              },
              {
                icon: Target,
                title: "Marketing Tools",
                description: "Connect with marketing automation tools to enhance lead generation and nurturing",
                benefits: ["Lead qualification", "Campaign tracking", "Email integration", "Analytics"]
              },
              {
                icon: Shield,
                title: "Compliance Systems",
                description: "Ensure regulatory compliance with integration to compliance management systems",
                benefits: ["Data encryption", "Audit logs", "Compliance checks", "Reporting"]
              }
            ].map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-8 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 md:mb-6">
                  <capability.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{capability.title}</h3>
                <p className="text-sm md:text-base text-[#B7C0D6] mb-4 md:mb-6 leading-relaxed">
                  {capability.description}
                </p>
                <div className="space-y-2">
                  {capability.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs md:text-sm text-[#B7C0D6]">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Built for All Insurance Lines</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Specialized workflows for every type of insurance agency
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {[
              {
                icon: Shield,
                title: "Auto Insurance",
                workflows: [
                  "Accident claim intake and routing",
                  "Coverage verification and quotes",
                  "Payment reminders and renewals",
                  "Roadside assistance coordination"
                ]
              },
              {
                icon: Target,
                title: "Home Insurance",
                workflows: [
                  "Property damage claim processing",
                  "Coverage adjustment requests",
                  "Inspection scheduling",
                  "Natural disaster response"
                ]
              },
              {
                icon: Users,
                title: "Life Insurance",
                workflows: [
                  "Beneficiary update requests",
                  "Policy value inquiries",
                  "Claim documentation collection",
                  "Annual review scheduling"
                ]
              },
              {
                icon: Award,
                title: "Health Insurance",
                workflows: [
                  "Coverage benefit explanations",
                  "Provider network inquiries",
                  "Pre-authorization status",
                  "FSA/HSA account questions"
                ]
              }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-8"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-white">{useCase.title}</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {useCase.workflows.map((workflow, j) => (
                    <div key={j} className="flex items-start gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-[#B7C0D6]">{workflow}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}