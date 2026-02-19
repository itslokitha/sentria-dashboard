import { motion } from "motion/react";
import { useEffect } from "react";
import { DollarSign, Shield, Phone, CreditCard, TrendingUp, Users, Clock, CheckCircle2, ArrowRight, Lock, Zap, BarChart3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const fraudDetectionData = [
  { month: "Jan", detected: 142, prevented: 138 },
  { month: "Feb", detected: 156, prevented: 152 },
  { month: "Mar", detected: 189, prevented: 185 },
  { month: "Apr", detected: 201, prevented: 198 },
  { month: "May", detected: 224, prevented: 221 },
  { month: "Jun", detected: 247, prevented: 245 },
];

const costSavingsData = [
  { quarter: "Q1", traditional: 850, withAI: 245 },
  { quarter: "Q2", traditional: 890, withAI: 220 },
  { quarter: "Q3", traditional: 920, withAI: 210 },
  { quarter: "Q4", traditional: 950, withAI: 195 },
];

const callVolumeData = [
  { hour: "6am", volume: 120 },
  { hour: "9am", volume: 450 },
  { hour: "12pm", volume: 680 },
  { hour: "3pm", volume: 590 },
  { hour: "6pm", volume: 320 },
  { hour: "9pm", volume: 180 },
];

export function FinancePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Financial Services Solutions - AI Voice for Banking | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559329418-84b22aaad6e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkaXN0cmljdCUyMHNreXNjcmFwZXJzJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzcwMTgxMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Financial District"
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
            className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
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
              <DollarSign className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                FINANCIAL SERVICES
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              Enterprise AI Voice for Banking & Finance
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Deploy secure, compliant AI voice solutions for banks, credit unions, and financial institutions. 
              Reduce call center costs by 70% while maintaining bank-level security and regulatory compliance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group">
                Schedule Financial Demo
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Financial Voice Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Secure, compliant AI voice assistants for every financial interaction
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Fraud Detection & Alerts",
                description: "Real-time voice authentication and transaction verification with multi-factor security",
                features: ["Voice biometrics", "Suspicious activity alerts", "Secure verification"]
              },
              {
                icon: Phone,
                title: "24/7 Account Services",
                description: "Balance inquiries, transaction history, and account management available anytime",
                features: ["Balance checks", "Transfer history", "Statement access"]
              },
              {
                icon: CreditCard,
                title: "Loan & Application Processing",
                description: "Automated pre-qualification, document collection, and application status updates",
                features: ["Credit pre-qualification", "Document upload", "Status tracking"]
              },
              {
                icon: Lock,
                title: "Secure Payment Processing",
                description: "PCI-compliant voice-activated payments and bill pay automation",
                features: ["Voice payments", "Bill pay setup", "Payment plans"]
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Real-Time Performance Intelligence</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Monitor fraud prevention, cost savings, and customer satisfaction in real-time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Fraud Detection Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Fraud Detection Performance</h3>
                  <p className="text-sm text-[#B7C0D6]">AI-powered fraud prevention rate: 99.2%</p>
                </div>
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={fraudDetectionData}>
                    <defs>
                      <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
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
                    <Area type="monotone" dataKey="detected" stroke="#2D6BFF" fill="url(#fraudGradient)" strokeWidth={2} />
                    <Area type="monotone" dataKey="prevented" stroke="#4A85FF" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Cost Savings Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Cost Reduction Analysis</h3>
                  <p className="text-sm text-[#B7C0D6]">70% reduction in call center operating costs</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={costSavingsData}>
                    <XAxis dataKey="quarter" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Bar dataKey="traditional" fill="#B7C0D6" opacity={0.3} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="withAI" fill="#2D6BFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Call Volume Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">24/7 Call Volume Distribution</h3>
                <p className="text-sm text-[#B7C0D6]">AI handles peak volumes without additional staffing</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={callVolumeData}>
                  <XAxis dataKey="hour" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#B7C0D6' }}
                  />
                  <Line type="monotone" dataKey="volume" stroke="#2D6BFF" strokeWidth={3} dot={{ fill: '#2D6BFF', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}