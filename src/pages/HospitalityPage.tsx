import { motion } from "motion/react";
import { useEffect } from "react";
import { Hotel, Calendar, Phone, Utensils, TrendingUp, Users, Clock, CheckCircle2, ArrowRight, Zap, Bell, Star, Sparkles, MessageCircle, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

const guestSatisfactionData = [
  { month: "Jan", score: 8.2, withAI: 8.9 },
  { month: "Feb", score: 8.3, withAI: 9.1 },
  { month: "Mar", score: 8.1, withAI: 9.2 },
  { month: "Apr", score: 8.4, withAI: 9.4 },
  { month: "May", score: 8.5, withAI: 9.5 },
  { month: "Jun", score: 8.4, withAI: 9.7 },
];

const directBookingData = [
  { quarter: "Q1", OTA: 62, direct: 38 },
  { quarter: "Q2", OTA: 58, direct: 42 },
  { quarter: "Q3", OTA: 52, direct: 48 },
  { quarter: "Q4", OTA: 47, direct: 53 },
];

const serviceRequestData = [
  { category: "Room Service", requests: 1840, resolved: 1802 },
  { category: "Concierge", requests: 1520, resolved: 1496 },
  { category: "Housekeeping", requests: 980, resolved: 968 },
  { category: "Maintenance", requests: 420, resolved: 412 },
];

export function HospitalityPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Hospitality Solutions - AI Voice for Hotels & Restaurants | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1682221568203-16f33b35e57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGhvc3BpdGFsaXR5JTIwbG9iYnl8ZW58MXx8fHwxNzcwMTgxMzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Luxury Hotel Lobby"
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
            className="absolute top-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
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
              <Hotel className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                HOSPITALITY SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              Elevate Guest Experiences with AI Concierge
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Deliver exceptional guest experiences with AI-powered reservations, concierge services, 
              and 24/7 support. Increase direct bookings by 30% and guest satisfaction scores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group">
                Schedule Hospitality Demo
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Hospitality Voice Automation</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              AI-powered guest services from reservation to check-out and beyond
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "Smart Reservations",
                description: "Real-time booking, room upgrades, special occasion arrangements with guest preferences",
                features: ["Direct booking", "Room upgrades", "Special requests"]
              },
              {
                icon: MessageCircle,
                title: "Guest Services",
                description: "Wake-up calls, housekeeping, maintenance requests, and amenity information 24/7",
                features: ["Wake-up calls", "Housekeeping", "Maintenance"]
              },
              {
                icon: Utensils,
                title: "Room Service & Dining",
                description: "Menu ordering, dietary accommodations, delivery coordination with kitchen systems",
                features: ["Menu ordering", "Diet preferences", "Delivery tracking"]
              },
              {
                icon: Sparkles,
                title: "AI Concierge",
                description: "Restaurant reservations, activity booking, transportation, and local recommendations",
                features: ["Restaurant booking", "Activity planning", "Transportation"]
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
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Measurable Guest Experience Impact</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Track satisfaction scores, direct bookings, and service efficiency in real-time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Guest Satisfaction Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Guest Satisfaction Score</h3>
                  <p className="text-sm text-[#B7C0D6]">97% satisfaction with AI concierge interactions</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <LineChart data={guestSatisfactionData}>
                    <XAxis dataKey="month" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis domain={[7, 10]} stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#B7C0D6" strokeWidth={2} strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="withAI" stroke="#2D6BFF" strokeWidth={3} dot={{ fill: '#2D6BFF', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Direct Booking Growth */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Direct vs OTA Bookings (%)</h3>
                  <p className="text-sm text-[#B7C0D6]">30% increase in direct bookings = lower OTA fees</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={directBookingData}>
                    <XAxis dataKey="quarter" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      labelStyle={{ color: '#B7C0D6' }}
                    />
                    <Bar dataKey="OTA" fill="#B7C0D6" opacity={0.3} radius={[4, 4, 0, 0]} stackId="stack" />
                    <Bar dataKey="direct" fill="#2D6BFF" radius={[4, 4, 0, 0]} stackId="stack" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Service Request Resolution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Service Request Fulfillment</h3>
                <p className="text-sm text-[#B7C0D6]">98% same-day resolution rate across all services</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <div className="w-full" style={{ height: '280px', minHeight: '280px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={serviceRequestData} layout="vertical">
                  <XAxis type="number" stroke="#B7C0D6" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="category" type="category" stroke="#B7C0D6" style={{ fontSize: '12px' }} width={100} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B1630', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    labelStyle={{ color: '#B7C0D6' }}
                  />
                  <Bar dataKey="requests" fill="#B7C0D6" opacity={0.3} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="resolved" fill="#2D6BFF" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Multilingual Support */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Multilingual Guest Support</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Deliver exceptional service to international guests in their native language
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Multilingual AI",
                features: [
                  "Multiple languages supported",
                  "Real-time translation",
                  "Cultural awareness",
                  "Local dialect recognition"
                ]
              },
              {
                icon: Hotel,
                title: "PMS Integration",
                features: [
                  "Opera Cloud / PMS",
                  "Protel / Mews",
                  "Cloudbeds",
                  "RMS / Maestro",
                  "Custom integrations"
                ]
              },
              {
                icon: Users,
                title: "Guest Personalization",
                features: [
                  "Preference tracking",
                  "VIP recognition",
                  "Stay history",
                  "Custom requests"
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
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-[#B7C0D6]">{feature}</span>
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