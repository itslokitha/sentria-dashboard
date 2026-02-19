import { motion } from "motion/react";
import { useEffect } from "react";
import { HardHat, Calendar, Phone, Wrench, TrendingUp, Users, CheckCircle2, ArrowRight, Zap, Star, DollarSign, Award, MessageCircle, Bell, Target, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";

export function ConstructionPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Construction Solutions - AI Voice for Contractors & Builders | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1769247178314-08cfd0886972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRpbmclMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzAxODEzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Construction Site"
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
            className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
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
              <HardHat className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                CONSTRUCTION SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              AI Voice for Project Management & Client Communication
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-6 md:mb-8 leading-relaxed">
              Win more bids, coordinate projects efficiently, and improve client communication with AI voice assistants 
              designed for contractors, builders, and construction management firms.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group w-full sm:w-auto">
                Schedule Construction Demo
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Construction Communication</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              From initial inquiry to project completion, automate every client and vendor interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: Phone,
                title: "Lead Capture & Qualification",
                description: "Automatically qualify project inquiries, gather requirements, and schedule site visits with intelligent screening",
                benefits: ["24/7 lead capture", "Budget qualification", "Site visit scheduling", "Project scope gathering"]
              },
              {
                icon: Calendar,
                title: "Project Coordination",
                description: "Schedule inspections, coordinate subcontractors, and manage milestone communications automatically",
                benefits: ["Inspection scheduling", "Subcontractor coordination", "Client updates", "Milestone tracking"]
              },
              {
                icon: Building2,
                title: "Client Communication",
                description: "Keep clients informed with progress updates, change order approvals, and completion notifications",
                benefits: ["Progress updates", "Change orders", "Payment reminders", "Completion notices"]
              },
              {
                icon: Bell,
                title: "Permit & Inspection",
                description: "Automate permit application follow-ups, inspection scheduling, and compliance tracking",
                benefits: ["Permit tracking", "Inspection booking", "Compliance alerts", "Certificate requests"]
              },
              {
                icon: MessageCircle,
                title: "Vendor & Supplier",
                description: "Coordinate material deliveries, track orders, and manage supplier relationships efficiently",
                benefits: ["Delivery scheduling", "Order tracking", "Quote requests", "Inventory alerts"]
              },
              {
                icon: Zap,
                title: "Construction Software Integration",
                description: "Integration with all major construction management platforms",
                benefits: ["Real-time sync", "Project updates", "Document access", "Budget tracking"]
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Built for All Construction Specialties</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Specialized workflows for different types of construction businesses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {[
              {
                icon: Building2,
                title: "General Contractors",
                workflows: [
                  "Bid opportunity screening and qualification",
                  "Multi-trade project coordination",
                  "Client progress update automation",
                  "Subcontractor scheduling and payments",
                  "Final walkthrough and punch list management"
                ]
              },
              {
                icon: HardHat,
                title: "Specialty Contractors",
                workflows: [
                  "Trade-specific estimate requests",
                  "Equipment and tool scheduling",
                  "Material ordering and delivery",
                  "Warranty and service call management",
                  "License and certification tracking"
                ]
              },
              {
                icon: Target,
                title: "Home Builders",
                workflows: [
                  "Model home tour scheduling",
                  "Custom home design consultations",
                  "Construction phase updates",
                  "HOA and community coordination",
                  "New homeowner orientation"
                ]
              },
              {
                icon: Award,
                title: "Renovation & Remodeling",
                workflows: [
                  "Free estimate scheduling",
                  "Design consultation booking",
                  "Project timeline communication",
                  "Change order approvals",
                  "Before/after photo sharing"
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