import { motion } from "motion/react";
import { useEffect } from "react";
import { Radio, Phone, Wifi, Clock, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Star, DollarSign, Award, MessageCircle, Bell, Target, Smartphone } from "lucide-react";
import { Button } from "../components/ui/button";

export function TelecomPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Telecommunications Solutions - AI Voice for Telecom Providers | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1764099363030-3567281c090d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlY29tbXVuaWNhdGlvbnMlMjB0b3dlciUyMG5ldHdvcmslMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDE4MTM5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Telecommunications Tower"
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
            className="absolute top-20 left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Wifi className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                TELECOMMUNICATIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              AI Voice for Customer Support & Billing
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-6 md:mb-8 leading-relaxed">
              Transform customer service, reduce call center costs, and improve satisfaction with AI voice assistants 
              that handle technical support, billing inquiries, and account management 24/7.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group w-full sm:w-auto">
                Schedule Telecom Demo
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Customer Care Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              From initial inquiry to technical resolution, automate every customer interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: Phone,
                title: "Technical Support",
                description: "Automated troubleshooting for network issues, device setup, connectivity problems, and service outages",
                benefits: ["Network diagnostics", "Device setup", "Connectivity tests", "Outage updates"]
              },
              {
                icon: DollarSign,
                title: "Billing & Payments",
                description: "Handle billing inquiries, payment processing, plan explanations, and dispute resolution",
                benefits: ["Bill explanations", "Payment processing", "Plan details", "Dispute handling"]
              },
              {
                icon: Smartphone,
                title: "Account Management",
                description: "Plan changes, feature additions, device upgrades, and account modifications with instant processing",
                benefits: ["Plan changes", "Feature toggles", "Upgrades", "Account updates"]
              },
              {
                icon: Bell,
                title: "Service Activation",
                description: "New service setup, SIM activation, number porting, and service provisioning automation",
                benefits: ["SIM activation", "Number porting", "Service setup", "Provisioning"]
              },
              {
                icon: MessageCircle,
                title: "Sales & Upgrades",
                description: "Product recommendations, plan comparisons, device availability, and upgrade eligibility",
                benefits: ["Plan comparison", "Device info", "Upgrade eligibility", "Promotions"]
              },
              {
                icon: Zap,
                title: "BSS/OSS Integration",
                description: "Integration with all major telecom systems",
                benefits: ["Real-time sync", "Provisioning", "Order management", "CRM integration"]
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Perfect for All Telecom Services</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Specialized workflows for different telecommunications providers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile Network Operators",
                workflows: [
                  "Plan and pricing inquiries",
                  "Network coverage questions",
                  "Data usage and overage alerts",
                  "International roaming support",
                  "Family plan management"
                ]
              },
              {
                icon: Wifi,
                title: "Internet Service Providers",
                workflows: [
                  "Speed and bandwidth inquiries",
                  "Service outage reporting",
                  "Router and modem troubleshooting",
                  "Installation scheduling",
                  "Upgrade and downgrade requests"
                ]
              },
              {
                icon: Phone,
                title: "VoIP & Cloud Communications",
                workflows: [
                  "Business phone system setup",
                  "Extension and call routing",
                  "Conference call management",
                  "Voicemail configuration",
                  "Integration support"
                ]
              },
              {
                icon: Award,
                title: "Cable & Satellite TV",
                workflows: [
                  "Channel lineup inquiries",
                  "On-demand content access",
                  "Set-top box troubleshooting",
                  "Package upgrades and add-ons",
                  "DVR and recording support"
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