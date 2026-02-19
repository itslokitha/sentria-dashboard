import { motion } from "motion/react";
import { Brain, Phone, MessageSquare, Calendar, Zap, Shield, BarChart3, Network, CheckCircle2, ArrowRight, Sparkles, Globe, Users, TrendingUp, Lock, Activity } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useState } from "react";

const products = [
  {
    icon: Phone,
    name: "AI Voice Assistant",
    tagline: "Natural conversations, 24/7",
    description: "Advanced natural language processing handles customer calls with human-like conversation. Answers questions, processes requests, and routes complex queries intelligently.",
    features: ["Multi-language support", "Emotion detection", "98.7% accuracy", "Sub-second response"],
    color: "from-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9uJTIwbW9kZXJuJTIwY2xpbmljfGVufDF8fHx8MTc2OTYwODkwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    stats: { metric: "14M+", label: "Calls/month" }
  },
  {
    icon: MessageSquare,
    name: "Intelligent SMS Platform",
    tagline: "Automated customer engagement",
    description: "AI-powered text messaging for appointment reminders, follow-ups, cancellation recovery, waitlist management, and personalized 2-way conversations at scale.",
    features: ["Smart scheduling", "Predictive engagement", "2-way conversations", "Template library"],
    color: "from-purple-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1631563020941-c0c6bc534b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMEFJJTIwaGVhbHRoY2FyZSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY5NjU5MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: { metric: "65%", label: "Response rate" }
  },
  {
    icon: Calendar,
    name: "Capacity Optimization Engine",
    tagline: "Maximize business utilization",
    description: "Machine learning algorithms predict cancellations, match customers from waitlist, and automatically fill schedule gaps to protect revenue and optimize capacity.",
    features: ["Predictive analytics", "Auto-fill cancellations", "Revenue protection", "Demand forecasting"],
    color: "from-emerald-500 to-teal-600",
    image: "https://images.unsplash.com/photo-1758876202980-0a28b744fb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMGdyYXBoc3xlbnwxfHx8fDE3Njk2NTkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    stats: { metric: "$3.8M", label: "Avg. savings" }
  },
  {
    icon: BarChart3,
    name: "Analytics & Intelligence",
    tagline: "Data-driven decision making",
    description: "Real-time dashboards, predictive insights, and comprehensive reporting on all operational metrics and customer interaction patterns across your entire organization.",
    features: ["Real-time dashboards", "Custom reports", "Predictive models", "API access"],
    color: "from-orange-500 to-red-600",
    image: "https://images.unsplash.com/photo-1569660424259-87e64a80f6fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVycyUyMHRlY2hub2xvZ3klMjBibHVlJTIwbGlnaHRzfGVufDF8fHx8MTc2OTY1OTMyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    stats: { metric: "99.9%", label: "Uptime" }
  },
];

const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  efficiency: 65 + i * 3,
  bookings: 800 + i * 100,
  satisfaction: 75 + i * 2,
}));

const radarData = [
  { metric: 'Call Handling', score: 98 },
  { metric: 'Booking Rate', score: 94 },
  { metric: 'Customer Satisfaction', score: 96 },
  { metric: 'Response Time', score: 99 },
  { metric: 'Accuracy', score: 97 },
  { metric: 'Availability', score: 100 },
];

const integrations = [
  { name: "EMR/CRM Systems", count: "50+" },
  { name: "API Endpoints", count: "200+" },
  { name: "Daily Sync Events", count: "1M+" },
];

const securityFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with bank-level encryption and security protocols"
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "GDPR, HIPAA, and industry-specific compliance built-in"
  },
  {
    icon: Activity,
    title: "99.9% Uptime",
    description: "Redundant infrastructure with 24/7 monitoring and support"
  },
];

export function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState(0);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BFF]/5 to-transparent"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Platform Suite
              </span>
            </div>
            <h1 className="text-white mb-6 max-w-4xl mx-auto bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text">
              AI-Powered Solutions for Modern Business
            </h1>
            <p className="text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed">
              Comprehensive platform to automate customer access, optimize operations, and deliver measurable outcomes across 12 industries.
            </p>
          </motion.div>

          {/* Performance Dashboard */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Platform Performance Trends</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs text-primary font-mono">LIVE</span>
                </div>
              </div>
              <div className="w-full" style={{ height: '256px', minHeight: '256px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <LineChart data={performanceData}>
                    <XAxis dataKey="month" stroke="#B7C0D6" fontSize={10} />
                    <YAxis stroke="#B7C0D6" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Line type="monotone" dataKey="efficiency" stroke="#2D6BFF" strokeWidth={3} dot={{ fill: '#2D6BFF', r: 4 }} />
                    <Line type="monotone" dataKey="satisfaction" stroke="#4A85FF" strokeWidth={3} dot={{ fill: '#4A85FF', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">AI Capability Matrix</h3>
              <div className="w-full flex items-center justify-center" style={{ height: '256px', minHeight: '256px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#B7C0D6" opacity={0.2} />
                    <PolarAngleAxis dataKey="metric" stroke="#B7C0D6" fontSize={10} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#B7C0D6" fontSize={10} />
                    <Radar name="Performance" dataKey="score" stroke="#2D6BFF" fill="#2D6BFF" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${product.color} backdrop-blur-xl border border-white/20`}>
                        <span className="text-xs text-white font-semibold uppercase tracking-wide">
                          {product.tagline}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                        <div className="text-2xl font-bold text-primary">{product.stats.metric}</div>
                        <div className="text-xs text-[#B7C0D6]">{product.stats.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${product.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <product.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-base text-[#B7C0D6] mb-6 flex-1 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#B7C0D6]">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Network className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Integrations
              </span>
            </div>
            <h2 className="text-white mb-6">
              Seamless Integration with Your Existing Systems
            </h2>
            <p className="text-xl text-[#B7C0D6] max-w-2xl mx-auto">
              Connect with any CRM, ERP, or workflow tool through our API-first architecture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {integrations.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-primary/50 transition-all"
              >
                <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text mb-3">{stat.count}</div>
                <div className="text-lg text-[#B7C0D6]">{stat.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Enterprise-Grade Security</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Your data is protected with industry-leading security standards and compliance certifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-base text-[#B7C0D6] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/50">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white mb-4">
                Ready to See It in Action?
              </h2>
              <p className="text-xl text-[#B7C0D6] mb-10">
                Experience the power of SENTRIA with a personalized demo tailored to your industry and use case.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-12 text-lg shadow-lg shadow-primary/50"
                >
                  Request Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/5 px-12 text-lg"
                >
                  View Documentation
                </Button>
              </div>
              <p className="text-sm text-[#B7C0D6] mt-6">
                No credit card required • 14-day free trial • Setup in minutes
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}