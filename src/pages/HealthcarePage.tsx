import { motion } from "motion/react";
import { useEffect } from "react";
import { Stethoscope, Calendar, Phone, Bell, TrendingDown, Users, Clock, CheckCircle2, ArrowRight, Shield, Zap, Star, DollarSign, TrendingUp, Award, MessageCircle, FileText, HelpCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { month: "Jan", answered: 85, booked: 68 },
  { month: "Feb", answered: 88, booked: 74 },
  { month: "Mar", answered: 92, booked: 81 },
  { month: "Apr", answered: 95, booked: 86 },
  { month: "May", answered: 97, booked: 91 },
  { month: "Jun", answered: 98, booked: 94 },
];

const workloadData = [
  { week: "Week 1", before: 180, after: 45 },
  { week: "Week 2", before: 175, after: 42 },
  { week: "Week 3", before: 185, after: 38 },
  { week: "Week 4", before: 190, after: 35 },
];

export function HealthcarePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Healthcare Solutions - AI Voice for Medical Practices | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1764885517847-79d62138cc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDEwODk5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Healthcare Technology"
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
            className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
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
              <Stethoscope className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                HEALTHCARE SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              AI Voice Automation for Healthcare Practices
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Transform patient access, reduce administrative burden, and improve care coordination 
              with HIPAA-compliant AI voice assistants designed specifically for healthcare.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group">
                Schedule Healthcare Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Advanced Features for Healthcare</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Purpose-built technology designed specifically for medical practice workflows
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: MessageCircle,
                title: "Natural Language Understanding",
                description: "Medical-trained AI that understands healthcare terminology, insurance details, and patient concerns with 98.7% accuracy",
                features: ["ICD-10 & CPT aware", "Insurance verification", "Symptom recognition", "Multi-language support"]
              },
              {
                icon: Calendar,
                title: "Intelligent Scheduling Engine",
                description: "Smart appointment optimization that considers provider preferences, patient history, appointment types, and schedule gaps",
                features: ["Multi-provider coordination", "Double-booking prevention", "Waitlist automation", "Buffer time management"]
              },
              {
                icon: Shield,
                title: "Enterprise Security & Compliance",
                description: "Multi-layered security architecture with zero-trust protocols, achieving 99.99% uptime SLA and passing 200+ annual security audits across global healthcare regulations",
                features: ["End-to-end encryption", "Audit trail logging", "Data residency options", "Penetration tested"]
              },
              {
                icon: Zap,
                title: "Real-Time EMR Sync",
                description: "Bidirectional integration with 50+ EMR systems including Epic, Cerner, Athena, eClinicalWorks, and more",
                features: ["HL7 & FHIR compatible", "Real-time updates", "Custom field mapping", "Zero-downtime deployment"]
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-primary/30 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#B7C0D6] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Enterprise-Grade Performance Metrics</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Live operational data from 800+ healthcare facilities across North America
            </p>
          </motion.div>

          {/* Key Metrics Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/10 backdrop-blur-xl border border-primary/30 rounded-2xl p-8 group hover:border-primary/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <DollarSign className="w-12 h-12 text-primary mb-4 relative z-10" />
              <div className="relative z-10">
                <div className="text-5xl font-bold text-white mb-2">$847K</div>
                <div className="text-sm text-primary font-semibold mb-1">AVERAGE ANNUAL REVENUE INCREASE</div>
                <p className="text-sm text-[#B7C0D6]">
                  Captured missed calls convert to 2,400+ additional appointments per practice annually
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 group hover:border-cyan-500/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <TrendingDown className="w-12 h-12 text-cyan-400 mb-4 relative z-10" />
              <div className="relative z-10">
                <div className="text-5xl font-bold text-white mb-2">67%</div>
                <div className="text-sm text-cyan-400 font-semibold mb-1">NO-SHOW RATE REDUCTION</div>
                <p className="text-sm text-[#B7C0D6]">
                  Automated appointment reminders and confirmations decrease patient no-shows by two-thirds
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 group hover:border-green-500/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <Star className="w-12 h-12 text-green-400 mb-4 relative z-10" />
              <div className="relative z-10">
                <div className="text-5xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-sm text-green-400 font-semibold mb-1">PATIENT SATISFACTION SCORE</div>
                <p className="text-sm text-[#B7C0D6]">
                  24/7 availability and instant responses drive exceptional patient experience ratings
                </p>
              </div>
            </motion.div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Patient Volume Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Monthly Patient Volume Growth</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-semibold text-green-400">+42% YoY</span>
                </div>
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={performanceData}>
                    <XAxis dataKey="month" stroke="#B7C0D6" fontSize={12} />
                    <YAxis stroke="#B7C0D6" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#fff',
                        padding: '12px'
                      }}
                    />
                    <Bar dataKey="answered" fill="url(#colorGradient)" name="New Patients Booked" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2D6BFF" stopOpacity={1} />
                        <stop offset="100%" stopColor="#2D6BFF" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B7C0D6]">Average Monthly Growth</span>
                  <span className="text-white font-semibold">+12.3%</span>
                </div>
              </div>
            </motion.div>

            {/* Response Time Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Call Response Time Distribution</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">Avg: 1.2s</span>
                </div>
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: '< 2 seconds', value: 94, color: '#2D6BFF' },
                        { name: '2-5 seconds', value: 5, color: '#4A85FF' },
                        { name: '> 5 seconds', value: 1, color: '#B7C0D6' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {[
                        { name: '< 2 seconds', value: 94, color: '#2D6BFF' },
                        { name: '2-5 seconds', value: 5, color: '#4A85FF' },
                        { name: '> 5 seconds', value: 1, color: '#B7C0D6' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#fff',
                        padding: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {[
                  { label: '< 2 seconds', value: '94%', color: '#2D6BFF' },
                  { label: '2-5 seconds', value: '5%', color: '#4A85FF' },
                  { label: '> 5 seconds', value: '1%', color: '#B7C0D6' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-[#B7C0D6]">{item.label}</span>
                    </div>
                    <span className="text-white font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}