import { motion } from "motion/react";
import { useEffect } from "react";
import { Briefcase, Calendar, Phone, FileText, TrendingUp, Users, Clock, CheckCircle2, ArrowRight, Zap, Scale, Building2, MessageCircle, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const billableHoursData = [
  { month: "Jan", traditional: 142, withAI: 178 },
  { month: "Feb", traditional: 145, withAI: 184 },
  { month: "Mar", traditional: 148, withAI: 189 },
  { month: "Apr", traditional: 151, withAI: 195 },
  { month: "May", traditional: 149, withAI: 198 },
  { month: "Jun", traditional: 153, withAI: 206 },
];

const clientIntakeData = [
  { week: "Week 1", intakes: 24, completed: 18 },
  { week: "Week 2", intakes: 28, completed: 24 },
  { week: "Week 3", intakes: 32, completed: 29 },
  { week: "Week 4", intakes: 35, completed: 33 },
];

const timeAllocationData = [
  { category: "Client Work", hours: 68 },
  { category: "Consultations", hours: 52 },
  { category: "Admin (Saved)", hours: 15 },
  { category: "Business Dev", hours: 25 },
];

export function ProfessionalPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Professional Services Solutions - AI Voice for Firms | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1642522029691-029b5a432954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzcwMTgxMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Professional Office"
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
            className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
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
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                PROFESSIONAL SERVICES
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              Streamline Client Communications & Scheduling
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Optimize operations for law firms, accounting practices, and consulting agencies. 
              Automate client intake, consultation booking, and follow-ups—capture 25% more billable hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group">
                Schedule Professional Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Professional Services Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              AI-powered client management from first contact to case closure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Client Intake & Screening",
                description: "Structured information collection, conflict checks, and engagement letter coordination",
                features: ["Info collection", "Conflict checks", "Engagement setup"]
              },
              {
                icon: Calendar,
                title: "Consultation Scheduling",
                description: "Calendar sync with attorney/consultant availability and meeting room coordination",
                features: ["Calendar sync", "Room booking", "Reminder automation"]
              },
              {
                icon: FileText,
                title: "Document Management",
                description: "Automated document requests, secure upload links, and completion tracking",
                features: ["Document requests", "Secure uploads", "Status tracking"]
              },
              {
                icon: Phone,
                title: "Client Communication",
                description: "Case status updates, billing inquiries, appointment reminders, and follow-ups",
                features: ["Status updates", "Billing support", "Follow-ups"]
              },
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <capability.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{capability.title}</h3>
                <p className="text-sm text-[#B7C0D6] mb-4 leading-relaxed">{capability.description}</p>
                <div className="space-y-2">
                  {capability.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#B7C0D6]">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Measurable Practice Growth</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Track billable hours, client onboarding speed, and practice efficiency
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Billable Hours Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Billable Hours per Month</h3>
                  <p className="text-sm text-[#B7C0D6]">25% increase in captured billable time</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={billableHoursData}>
                    <defs>
                      <linearGradient id="billableGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2D6BFF" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#2D6BFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Area type="monotone" dataKey="traditional" stroke="#B7C0D6" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="withAI" stroke="#2D6BFF" fill="url(#billableGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Client Intake Speed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Client Intake Completion</h3>
                  <p className="text-sm text-[#B7C0D6]">60% faster onboarding with AI assistance</p>
                </div>
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={clientIntakeData}>
                    <XAxis dataKey="week" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Bar dataKey="intakes" fill="#B7C0D6" opacity={0.3} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="completed" fill="#2D6BFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Time Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Weekly Time Allocation (Hours)</h3>
                <p className="text-sm text-[#B7C0D6]">15+ hours saved weekly on administrative tasks</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={timeAllocationData} layout="vertical">
                  <XAxis type="number" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="category" type="category" stroke="#B7C0D6" style={{ fontSize: '12px' }} width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#B7C0D6' }}
                  />
                  <Bar dataKey="hours" fill="#2D6BFF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Practice Management Integration */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Seamless Practice Management Integration</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Connect with your existing tools and workflows instantly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Briefcase,
                title: "Legal Practice Management",
                integrations: [
                  "Clio / Clio Grow",
                  "MyCase",
                  "PracticePanther",
                  "Smokeball",
                  "Custom legal tech"
                ]
              },
              {
                icon: FileText,
                title: "Accounting & Tax Software",
                integrations: [
                  "QuickBooks",
                  "Xero",
                  "FreshBooks",
                  "Sage",
                  "Thomson Reuters"
                ]
              },
              {
                icon: Shield,
                title: "Security & Compliance",
                integrations: [
                  "SOC 2 Type II certified",
                  "Attorney-client privilege",
                  "End-to-end encryption",
                  "Audit trail logging",
                  "GDPR compliant"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8 hover:border-primary/30 transition-colors"
              >
                <item.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold text-white mb-6">{item.title}</h3>
                <div className="space-y-3">
                  {item.integrations.map((integration, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-[#B7C0D6]">{integration}</span>
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