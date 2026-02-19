import { motion } from "motion/react";
import { useEffect } from "react";
import { Home, Calendar, Phone, Key, TrendingUp, Users, Clock, CheckCircle2, ArrowRight, Zap, MapPin, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const leadConversionData = [
  { month: "Jan", inquiries: 245, showings: 98, offers: 32 },
  { month: "Feb", inquiries: 268, showings: 127, offers: 45 },
  { month: "Mar", inquiries: 292, showings: 156, offers: 58 },
  { month: "Apr", inquiries: 315, showings: 184, offers: 71 },
  { month: "May", inquiries: 341, showings: 215, offers: 86 },
  { month: "Jun", inquiries: 368, showings: 248, offers: 102 },
];

const responseTimeData = [
  { time: "Before AI", avgMinutes: 127 },
  { time: "With AI", avgMinutes: 2 },
];

const agentProductivityData = [
  { metric: "Showings/Week", before: 12, withAI: 28 },
  { metric: "Leads Qualified", before: 45, withAI: 120 },
  { metric: "Follow-ups/Day", before: 8, withAI: 35 },
];

export function RealEstatePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Real Estate Solutions - AI Voice for Agents & Brokers | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1611094016919-36b65678f3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwcHJvcGVydHl8ZW58MXx8fHwxNzcwMTIwMTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Real Estate"
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
            className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
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
              <Home className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                REAL ESTATE SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              Qualify Leads & Book Showings Automatically
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Transform property inquiries into booked showings with AI that qualifies leads, 
              schedules tours, and follows up with prospects—giving agents more time to close deals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group">
                Schedule Real Estate Demo
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Real Estate Voice Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              AI-powered lead generation and showing coordination for maximum productivity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "Property Inquiries",
                description: "Instant answers about pricing, features, availability, and neighborhood details",
                features: ["Property details", "Pricing info", "Neighborhood data"]
              },
              {
                icon: Calendar,
                title: "Showing Scheduler",
                description: "Intelligent calendar management with agent availability and property access coordination",
                features: ["Smart scheduling", "Auto-coordination", "Calendar sync"]
              },
              {
                icon: Users,
                title: "Lead Qualification",
                description: "Budget verification, timeline assessment, and mortgage pre-approval status collection",
                features: ["Budget screening", "Timeline capture", "Pre-approval check"]
              },
              {
                icon: Key,
                title: "Virtual Tour Coordination",
                description: "Schedule and manage virtual property tours with video links and automated follow-ups",
                features: ["Tour scheduling", "Video links", "Follow-up automation"]
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Proven Sales Performance</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Track lead conversion, showing rates, and agent productivity in real-time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Lead Conversion Funnel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Lead-to-Offer Conversion</h3>
                  <p className="text-sm text-[#B7C0D6]">40% higher showing-to-offer conversion with AI</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <LineChart data={leadConversionData}>
                    <XAxis dataKey="month" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Line type="monotone" dataKey="inquiries" stroke="#B7C0D6" strokeWidth={2} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="showings" stroke="#4A85FF" strokeWidth={2} />
                    <Line type="monotone" dataKey="offers" stroke="#2D6BFF" strokeWidth={3} dot={{ fill: '#2D6BFF', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Response Time Comparison */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Average Response Time</h3>
                  <p className="text-sm text-[#B7C0D6]">63x faster response to property inquiries</p>
                </div>
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={responseTimeData}>
                    <XAxis dataKey="time" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Bar dataKey="avgMinutes" fill="#2D6BFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Agent Productivity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Agent Productivity Gains</h3>
                <p className="text-sm text-[#B7C0D6]">3x more qualified leads per agent with AI assistance</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={agentProductivityData}>
                  <XAxis dataKey="metric" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#B7C0D6' }}
                  />
                  <Bar dataKey="before" fill="#B7C0D6" opacity={0.3} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="withAI" fill="#2D6BFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CRM & MLS Integration */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Seamless Real Estate Integration</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Connect with your existing MLS, CRM, and marketing tools instantly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "MLS & Listing Platforms",
                integrations: [
                  "MLS systems nationwide",
                  "Zillow Premier Agent",
                  "Realtor.com",
                  "Redfin",
                  "Custom listing feeds"
                ]
              },
              {
                title: "CRM & Transaction",
                integrations: [
                  "Follow Up Boss",
                  "LionDesk",
                  "BoomTown",
                  "kvCORE",
                  "Salesforce Real Estate"
                ]
              },
              {
                title: "Calendar & Showing",
                integrations: [
                  "ShowingTime",
                  "Calendly",
                  "Google Calendar",
                  "Outlook Calendar",
                  "Apple Calendar"
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