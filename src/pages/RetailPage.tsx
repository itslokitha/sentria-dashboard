import { motion } from "motion/react";
import { useEffect } from "react";
import { ShoppingCart, Package, RotateCcw, Gift, TrendingUp, Users, Clock, CheckCircle2, ArrowRight, Zap, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const conversionData = [
  { month: "Jan", conversion: 2.1, withAI: 2.8 },
  { month: "Feb", conversion: 2.3, withAI: 3.1 },
  { month: "Mar", conversion: 2.2, withAI: 3.3 },
  { month: "Apr", conversion: 2.4, withAI: 3.5 },
  { month: "May", conversion: 2.5, withAI: 3.7 },
  { month: "Jun", conversion: 2.6, withAI: 3.9 },
];

const customerSupportData = [
  { week: "Week 1", tickets: 1240, resolved: 1156 },
  { week: "Week 2", tickets: 1380, resolved: 1310 },
  { week: "Week 3", tickets: 1520, resolved: 1468 },
  { week: "Week 4", tickets: 1650, resolved: 1601 },
];

const revenueImpactData = [
  { category: "Cart Recovery", value: 285 },
  { category: "Upsells", value: 420 },
  { category: "Reorders", value: 310 },
  { category: "Support Time", value: 195 },
];

export function RetailPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Retail & E-commerce Solutions - AI Voice for Retailers | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1619496140817-ccc97b892d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXRhaWwlMjBzdG9yZSUyMHNob3BwaW5nfGVufDF8fHx8MTc3MDE4MTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern Retail Store"
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
            className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
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
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                RETAIL SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              24/7 AI Customer Support That Drives Sales
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Transform your retail operations with AI voice assistants that handle customer inquiries, 
              recover abandoned carts, and provide personalized shopping assistance around the clock.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group">
                Schedule Retail Demo
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Retail Voice Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              AI-powered customer service across every touchpoint in the shopping journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "Order Tracking & Updates",
                description: "Real-time delivery status, proactive delay notifications, and shipment rerouting",
                features: ["Live tracking", "SMS/Voice updates", "Delivery coordination"]
              },
              {
                icon: MessageCircle,
                title: "Product Recommendations",
                description: "Personalized shopping assistance with AI-powered product suggestions",
                features: ["Smart recommendations", "Size/fit guidance", "Inventory checks"]
              },
              {
                icon: RotateCcw,
                title: "Returns & Exchanges",
                description: "Automated return label generation, refund processing, and exchange coordination",
                features: ["Easy returns", "Instant labels", "Exchange handling"]
              },
              {
                icon: Gift,
                title: "Loyalty & Rewards",
                description: "Points balance inquiries, rewards redemption, and exclusive offer notifications",
                features: ["Points tracking", "Reward redemption", "VIP perks"]
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Measurable Revenue Impact</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Track conversion rates, cart recovery, and customer satisfaction in real-time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Conversion Rate Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Conversion Rate Growth</h3>
                  <p className="text-sm text-[#B7C0D6]">35% average increase with AI voice assistance</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <LineChart data={conversionData}>
                    <XAxis dataKey="month" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Line type="monotone" dataKey="conversion" stroke="#B7C0D6" strokeWidth={2} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="withAI" stroke="#2D6BFF" strokeWidth={3} dot={{ fill: '#2D6BFF', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Customer Support Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Support Ticket Resolution</h3>
                  <p className="text-sm text-[#B7C0D6]">97% first-contact resolution rate</p>
                </div>
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={customerSupportData}>
                    <defs>
                      <linearGradient id="supportGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2D6BFF" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#2D6BFF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Area type="monotone" dataKey="tickets" stroke="#B7C0D6" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="resolved" stroke="#2D6BFF" fill="url(#supportGradient)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Revenue Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Monthly Revenue Impact ($K)</h3>
                <p className="text-sm text-[#B7C0D6]">Average additional revenue per 10,000 customers</p>
              </div>
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={revenueImpactData} layout="vertical">
                  <XAxis type="number" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="category" type="category" stroke="#B7C0D6" style={{ fontSize: '12px' }} width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#B7C0D6' }}
                  />
                  <Bar dataKey="value" fill="#2D6BFF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Seamless E-commerce Integration</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Connect with your existing tools in minutes, not months
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platforms",
                integrations: [
                  "Shopify / Shopify Plus",
                  "WooCommerce",
                  "Magento",
                  "BigCommerce",
                  "Custom platforms via API"
                ]
              },
              {
                title: "Shipping & Logistics",
                integrations: [
                  "FedEx / UPS / DHL",
                  "ShipStation",
                  "Shippo",
                  "EasyPost",
                  "Custom carriers"
                ]
              },
              {
                title: "Customer Service",
                integrations: [
                  "Zendesk",
                  "Gorgias",
                  "Freshdesk",
                  "Help Scout",
                  "Intercom"
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