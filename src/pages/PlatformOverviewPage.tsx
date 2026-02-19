import { motion } from "motion/react";
import { 
  Brain, Phone, MessageSquare, Calendar, Zap, Shield, BarChart3, Network, 
  CheckCircle2, ArrowRight, Sparkles, Globe, Users, TrendingUp, Lock, 
  Activity, Server, Cpu, Database, Cloud, Code, Layers, Workflow
} from "lucide-react";
import { Button } from "../components/ui/button";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, 
  Tooltip, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { useEffect } from "react";

const platformData = [
  { month: "Jan", calls: 85000, automation: 72, satisfaction: 94 },
  { month: "Feb", calls: 92000, automation: 75, satisfaction: 95 },
  { month: "Mar", calls: 105000, automation: 78, satisfaction: 96 },
  { month: "Apr", calls: 118000, automation: 82, satisfaction: 96 },
  { month: "May", calls: 134000, automation: 85, satisfaction: 97 },
  { month: "Jun", calls: 152000, automation: 88, satisfaction: 98 },
];

const usageData = [
  { name: "Voice AI", value: 45, color: "#2D6BFF" },
  { name: "SMS Platform", value: 28, color: "#4A85FF" },
  { name: "Scheduling", value: 18, color: "#6B9EFF" },
  { name: "Analytics", value: 9, color: "#8CB7FF" },
];

const industryAdoption = [
  { industry: "Healthcare", adoption: 94 },
  { industry: "Finance", adoption: 89 },
  { industry: "Retail", adoption: 86 },
  { industry: "Real Estate", adoption: 82 },
  { industry: "Hospitality", adoption: 91 },
  { industry: "Professional", adoption: 78 },
];

export function PlatformOverviewPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  useEffect(() => {
    document.title = "Platform Overview - Enterprise AI Solutions | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwdGVjaG5vbG9neSUyMHBsYXRmb3JtJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MDE4MjIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Enterprise Platform"
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
            className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
          />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                COMPLETE PLATFORM SUITE
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-6 text-3xl md:text-5xl lg:text-6xl">
              The Most Comprehensive AI Voice & Automation Platform for Enterprise
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-8 leading-relaxed max-w-4xl mx-auto">
              A unified platform combining AI voice technology, intelligent automation, advanced analytics, 
              and seamless integrations—designed to transform how businesses communicate at scale.
            </p>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "System Integrations", value: "250+", icon: Network },
                { label: "Platform Uptime", value: "99.99%", icon: Activity },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4"
                >
                  <stat.icon className="w-5 h-5 text-primary mb-2 mx-auto" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-[#B7C0D6]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Platform Components */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Four Integrated Platform Components</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Each component works seamlessly together to create a comprehensive business automation ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Phone,
                title: "AI Voice Assistant Platform",
                description: "Natural language voice AI that handles inbound and outbound calls with human-like conversation at global scale",
                capabilities: [
                  "Advanced NLP with contextual understanding",
                  "Emotion detection and sentiment analysis",
                  "98.7% accuracy rate with sub-100ms response",
                  "Unlimited concurrent call handling",
                  "Custom voice personalities and branding",
                  "Multi-channel voice (phone, web, mobile)"
                ],
                metrics: [
                  { label: "Response Time", value: "<100ms", icon: Zap },
                  { label: "NLP Accuracy", value: "98.7%", icon: Brain },
                  { label: "Industry Deployments", value: "12 Sectors", icon: Globe }
                ],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: MessageSquare,
                title: "Intelligent SMS Automation",
                description: "AI-powered text messaging platform for automated customer engagement, appointment reminders, and conversational workflows",
                capabilities: [
                  "2-way conversational SMS with AI responses",
                  "Automated appointment reminders and confirmations",
                  "Cancellation recovery and waitlist management",
                  "Personalized drip campaigns and follow-ups",
                  "Template library with smart personalization",
                  "Compliance-ready with opt-out management"
                ],
                metrics: [
                  { label: "Delivery Rate", value: "99.4%", icon: CheckCircle2 },
                  { label: "Avg Response", value: "<3s", icon: Zap },
                  { label: "Conversion Lift", value: "+42%", icon: TrendingUp }
                ],
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Calendar,
                title: "Capacity Optimization Engine",
                description: "Machine learning algorithms that predict cancellations, optimize schedules, and maximize revenue through intelligent capacity management",
                capabilities: [
                  "Predictive cancellation modeling with ML",
                  "Automated waitlist matching and fulfillment",
                  "Dynamic overbooking recommendations",
                  "Revenue protection and gap-filling automation",
                  "Demand forecasting and trend analysis",
                  "Multi-location resource optimization"
                ],
                metrics: [
                  { label: "Fill Rate", value: "96%", icon: TrendingUp },
                  { label: "ML Accuracy", value: "94%", icon: Brain },
                  { label: "Auto-Booking", value: "Real-time", icon: Zap }
                ],
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: BarChart3,
                title: "Analytics & Intelligence Suite",
                description: "Comprehensive real-time analytics, predictive insights, and customizable reporting across all platform interactions and business metrics",
                capabilities: [
                  "Real-time operational dashboards",
                  "Custom report builder with 200+ metrics",
                  "Predictive analytics and trend forecasting",
                  "Call transcription and sentiment analysis",
                  "Performance benchmarking across industries",
                  "API access for custom integrations"
                ],
                metrics: [
                  { label: "Data Refresh", value: "Real-time", icon: Activity },
                  { label: "Metrics Available", value: "200+", icon: BarChart3 },
                  { label: "API Uptime", value: "99.99%", icon: Server }
                ],
                color: "from-orange-500 to-red-500"
              }
            ].map((component, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${component.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <component.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{component.title}</h3>
                    <p className="text-sm text-[#B7C0D6] leading-relaxed">
                      {component.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3">Key Capabilities</h4>
                  <div className="space-y-2">
                    {component.capabilities.map((capability, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[#B7C0D6]">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {component.metrics.map((metric, j) => (
                    <div key={j} className="text-center group/metric hover:scale-105 transition-transform">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover/metric:border-primary/40 transition-colors">
                        <metric.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-lg font-bold text-white mb-1">{metric.value}</div>
                      <div className="text-xs text-[#B7C0D6]">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Enterprise-Grade Infrastructure</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Built on cutting-edge technology with global scalability, intelligent automation, and seamless integration capabilities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Cloud,
                title: "Global Cloud Infrastructure",
                description: "Multi-region deployment across 6 continents with automatic failover and 99.99% uptime guarantee",
                features: ["15+ data centers worldwide", "Auto-scaling capacity", "Edge computing nodes", "CDN acceleration"]
              },
              {
                icon: Network,
                title: "250+ System Integrations",
                description: "Pre-built connectors to CRM, EHR, scheduling, and business systems with real-time data synchronization",
                features: ["Salesforce & HubSpot", "Epic & Cerner", "Calendar platforms", "Custom API webhooks"]
              },
              {
                icon: Cpu,
                title: "AI Processing Power",
                description: "Advanced neural networks processing millions of conversations with sub-100ms response times",
                features: ["98.7% accuracy rate", "Natural language understanding", "Emotion detection", "Context awareness"]
              },
              {
                icon: Database,
                title: "Enterprise Data Layer",
                description: "Distributed databases with encryption, real-time replication, and point-in-time recovery capabilities",
                features: ["Multi-region sync", "Automated backups", "Data encryption at rest", "ACID compliance"]
              },
              {
                icon: Workflow,
                title: "Intelligent Automation",
                description: "Machine learning algorithms that predict patterns, optimize workflows, and maximize operational efficiency",
                features: ["Predictive analytics", "Smart scheduling", "Automated workflows", "Capacity optimization"]
              },
              {
                icon: Code,
                title: "Developer-Friendly APIs",
                description: "RESTful and GraphQL APIs with comprehensive documentation, SDKs, and webhook support for custom integrations",
                features: ["OpenAPI 3.0 spec", "Python, Node.js SDKs", "Real-time webhooks", "Sandbox environment"]
              }
            ].map((arch, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <arch.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{arch.title}</h3>
                <p className="text-sm text-[#B7C0D6] mb-4 leading-relaxed">{arch.description}</p>
                <div className="space-y-1.5">
                  {arch.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span className="text-xs text-[#B7C0D6]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Platform Performance & Growth</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Real-time metrics showing platform usage, automation rates, and customer satisfaction
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Platform Growth Trends</h3>
              <div className="h-80" style={{ minHeight: '320px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={platformData}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2D6BFF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2D6BFF" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAutomation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4A85FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4A85FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#B7C0D6" fontSize={12} />
                    <YAxis stroke="#B7C0D6" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area type="monotone" dataKey="calls" stroke="#2D6BFF" fill="url(#colorCalls)" strokeWidth={2} />
                    <Area type="monotone" dataKey="automation" stroke="#4A85FF" fill="url(#colorAutomation)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#2D6BFF]"></div>
                  <span className="text-sm text-[#B7C0D6]">Total Calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4A85FF]"></div>
                  <span className="text-sm text-[#B7C0D6]">Automation %</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Industry Adoption Rates</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={industryAdoption} layout="vertical">
                    <XAxis type="number" stroke="#B7C0D6" fontSize={12} />
                    <YAxis dataKey="industry" type="category" stroke="#B7C0D6" fontSize={12} width={100} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="adoption" fill="#2D6BFF" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Platform Usage Distribution</h3>
              <div className="h-64 flex items-center justify-center" style={{ minHeight: '256px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <PieChart>
                    <Pie
                      data={usageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {usageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(11, 22, 48, 0.95)', 
                        border: '1px solid rgba(45, 107, 255, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {usageData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-[#B7C0D6]">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Key Performance Indicators</h3>
              <div className="space-y-6">
                {[
                  { label: "Customer Satisfaction Score", value: "98%", change: "+3%" },
                  { label: "Average Resolution Time", value: "45 sec", change: "-32%" },
                  { label: "First Call Resolution", value: "87%", change: "+12%" },
                  { label: "Cost Per Interaction", value: "$0.14", change: "-68%" }
                ].map((kpi, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#B7C0D6]">{kpi.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">{kpi.value}</span>
                        <span className="text-xs text-green-400 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded">
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        style={{ width: kpi.value }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,107,255,0.1),transparent_50%)]"></div>
            
            <div className="relative z-10">
              <h2 className="text-white mb-6 text-2xl md:text-4xl">Ready to Transform Your Operations?</h2>
              <p className="text-base md:text-lg text-[#B7C0D6] mb-8 max-w-2xl mx-auto">
                Use SENTRIA's platform to automate communications, optimize operations, 
                and deliver exceptional customer experiences.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/5 px-10" 
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('contact');
                      window.scrollTo({ top: 0, behavior: 'auto' });
                    }
                  }}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}