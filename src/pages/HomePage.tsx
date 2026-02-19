import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { ArrowRight, TrendingUp, Users, Globe, Zap, Phone, MessageSquare, Calendar, BarChart3, CheckCircle2, Shield, Lock, Activity, Sparkles, Play, Building2, Brain, Heart, DollarSign, ShoppingBag, Home, Hotel, Briefcase, GraduationCap, Truck, Wrench, Smartphone } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

const generateRealtimeData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    calls: Math.floor(Math.random() * 30) + 70,
    bookings: Math.floor(Math.random() * 25) + 60,
  }));
};

const industries = [
  { name: "Healthcare", icon: Heart, route: "healthcare", description: "Patient engagement & appointment management" },
  { name: "Finance", icon: DollarSign, route: "finance", description: "Secure banking & fraud prevention" },
  { name: "Retail", icon: ShoppingBag, route: "retail", description: "Customer service & order tracking" },
  { name: "Real Estate", icon: Home, route: "real-estate", description: "Property inquiries & showings" },
  { name: "Hospitality", icon: Hotel, route: "hospitality", description: "Reservations & guest services" },
  { name: "Professional Services", icon: Briefcase, route: "professional", description: "Client scheduling & support" },
  { name: "Education", icon: GraduationCap, route: "education", description: "Enrollment & campus information" },
  { name: "Logistics", icon: Truck, route: "logistics", description: "Shipment tracking & fleet management" },
  { name: "Automotive", icon: Wrench, route: "automotive", description: "Service appointments & support" },
  { name: "Construction", icon: Building2, route: "construction", description: "Project coordination & quotes" },
  { name: "Insurance", icon: Shield, route: "insurance", description: "Claims processing & policy support" },
  { name: "Telecommunications", icon: Smartphone, route: "telecom", description: "Technical support & billing" },
];

const features = [
  {
    icon: Phone,
    title: "AI Voice Assistant",
    description: "Natural conversations, 24/7 availability, and human-like responses with multi-language support.",
    stats: { metric: "98.7%", label: "Accuracy" }
  },
  {
    icon: MessageSquare,
    title: "Intelligent SMS Platform",
    description: "Automated engagement, appointment reminders, and 2-way conversations at scale.",
    stats: { metric: "65%", label: "Response Rate" }
  },
  {
    icon: Calendar,
    title: "Capacity Optimization",
    description: "AI-powered scheduling that predicts cancellations and automatically fills gaps.",
    stats: { metric: "$3.8M", label: "Avg. Savings" }
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Live dashboards, predictive insights, and comprehensive reporting on all operations.",
    stats: { metric: "14M+", label: "Calls/Month" }
  },
];

const outcomes = [
  { metric: "+93%", label: "Answer Rate", description: "Never miss a customer interaction" },
  { metric: "-70%", label: "Call Volume", description: "Reduce operational overhead" },
  { metric: "+65%", label: "Conversion", description: "Turn more inquiries into business" },
  { metric: "99.9%", label: "Uptime SLA", description: "Enterprise-grade reliability" },
];

const testimonials = [
  {
    quote: "SENTRIA transformed our customer service. We're handling 3x the volume with the same team.",
    author: "Sarah Chen",
    role: "COO, National Retail Chain",
    metric: "+200%",
    label: "Volume handled"
  },
  {
    quote: "The ROI was immediate. We recovered $2.1M in the first year from reduced no-shows alone.",
    author: "Dr. Michael Torres",
    role: "Director, Multi-Clinic Network",
    metric: "$2.1M",
    label: "First-year ROI"
  },
  {
    quote: "Best decision we made. Our customer satisfaction scores jumped to 97% within 2 months.",
    author: "Jessica Park",
    role: "VP Operations, Hotel Group",
    metric: "97%",
    label: "Guest CSAT"
  },
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData());
  const [metrics, setMetrics] = useState({
    calls: 14247,
    businesses: 3200,
    satisfaction: 93.5,
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // Rotating hero text
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroTexts = [
    "AI Voice Intelligence",
    "Intelligent Automation",
    "Voice-First Technology",
    "Conversational AI",
    "Enterprise Automation"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          calls: Math.floor(Math.random() * 30) + 70,
          bookings: Math.floor(Math.random() * 25) + 60,
        });
        return newData;
      });

      setMetrics(prev => ({
        calls: prev.calls + Math.floor(Math.random() * 10),
        businesses: prev.businesses,
        satisfaction: Math.min(99.9, prev.satisfaction + (Math.random() - 0.5) * 0.1),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Rotate hero text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Animated Background - Futuristic Tech Abstract */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[128px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/30 rounded-full blur-[128px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-[128px]"
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Digital Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200, -300],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
        
        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            y: ['-100%', '200vh'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          animate={{
            y: ['-100%', '200vh'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        />
        
        {/* Hexagonal Pattern Overlay */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute border-2 border-primary/20"
            style={{
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Data Streams */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{
              left: `${15 + i * 15}%`,
            }}
            animate={{
              y: ['-10%', '110vh'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3,
            }}
          />
        ))}
        
        {/* Circuit Board Lines */}
        {[...Array(15)].map((_, i) => {
          const isHorizontal = i % 2 === 0;
          return (
            <motion.div
              key={`circuit-${i}`}
              className={`absolute ${isHorizontal ? 'h-px w-64' : 'w-px h-64'}`}
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                background: 'linear-gradient(90deg, transparent, rgba(45,107,255,0.4), transparent)',
              }}
              animate={{
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          );
        })}
        
        {/* Glowing Nodes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{
                scale: [1, 2, 3],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        ))}
        
        {/* Pulse Rings */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border-2 border-primary/30"
            style={{
              width: '400px',
              height: '400px',
              left: `${20 + i * 25}%`,
              top: `${30 + i * 15}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1,
            }}
          />
        ))}
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl mx-4 md:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-2 text-sm md:text-base">
                <span>Close</span>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 hover:border-primary flex items-center justify-center transition-colors">
                  <span className="text-xl">&times;</span>
                </div>
              </div>
            </button>

            {/* Video Container */}
            <div className="relative bg-black rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://player.vimeo.com/video/1165141338?badge=0&autopause=0&player_id=0&app_id=58479"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  title="SENTRIA Platform Introduction"
                ></iframe>
              </div>
            </div>
            
            {/* Video Info */}
            <div className="mt-4 text-center">
              <p className="text-white text-sm md:text-base">THIS IS SENTRIA</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BFF]/5 to-transparent"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
                <Brain className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">
                  AI-Powered Business Automation
                </span>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
              <h1 className="mb-6 md:mb-8 text-white leading-[1.1] text-4xl md:text-5xl lg:text-6xl">
                Transform Your<br />
                Business with<br />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    className="inline-block bg-gradient-to-r from-primary via-[#4A85FF] to-[#6B9EFF] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {heroTexts[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
              </h1>
              <p className="text-base md:text-xl lg:text-2xl text-[#B7C0D6] max-w-2xl leading-relaxed mb-6 md:mb-10">
                SENTRIA deploys autonomous AI voice agents that handle customer interactions, optimize operations, 
                and deliver actionable insights—24/7 across 12 industries globally.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-10">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-8 md:px-12 text-base md:text-lg shadow-lg shadow-primary/50 w-full sm:w-auto"
                >
                  Contact Sales
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setIsVideoOpen(true)}
                  className="border-white/20 text-white hover:bg-white/5 px-8 md:px-12 text-base md:text-lg w-full sm:w-auto"
                >
                  <Play className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                  Watch Intro
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-[#B7C0D6]">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                </div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="font-medium">GDPR Compliant</div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="font-medium">PIPEDA Compliant</div>
                <div className="w-px h-5 bg-white/20 hidden sm:block"></div>
                <div className="font-medium">Enterprise Security</div>
              </div>
            </motion.div>

            {/* Right - Live Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8">
                <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">
                      AI Performance Monitor
                    </span>
                  </div>
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>

                {/* Live Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
                  {/* Response Time */}
                  <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Zap className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                      <div className="text-[10px] md:text-xs text-[#B7C0D6]">Response Time</div>
                    </div>
                    <div className="text-xl md:text-3xl font-bold text-white font-mono">
                      {(Math.random() * 50 + 150).toFixed(0)}
                      <span className="text-sm md:text-base text-[#B7C0D6] ml-1">ms</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-green-400 mt-1">
                      <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span>Optimal</span>
                    </div>
                  </div>

                  {/* Voice Accuracy */}
                  <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Brain className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                      <div className="text-[10px] md:text-xs text-[#B7C0D6]">Accuracy</div>
                    </div>
                    <div className="text-xl md:text-3xl font-bold text-white font-mono">
                      {(97 + Math.random() * 2).toFixed(1)}
                      <span className="text-sm md:text-base text-[#B7C0D6] ml-1">%</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-purple-400 mt-1">
                      <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span>High</span>
                    </div>
                  </div>

                  {/* Global Uptime */}
                  <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      <div className="text-[10px] md:text-xs text-[#B7C0D6]">Uptime</div>
                    </div>
                    <div className="text-xl md:text-3xl font-bold text-white font-mono">
                      99.9
                      <span className="text-sm md:text-base text-[#B7C0D6] ml-1">%</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-green-400 mt-1">
                      <Activity className="w-2.5 h-2.5 md:w-3 md:h-3" />
                      <span>24/7</span>
                    </div>
                  </div>
                </div>

                {/* Neural Network Visualization */}
                <div className="pt-4 md:pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="text-xs md:text-sm text-[#B7C0D6]">Neural Processing Load</div>
                    <div className="text-[10px] md:text-xs text-primary font-mono">
                      {(60 + Math.random() * 25).toFixed(1)}% CAPACITY
                    </div>
                  </div>
                  
                  {/* Processing Bars */}
                  <div className="space-y-2 md:space-y-3">
                    {['Natural Language', 'Speech Recognition', 'Sentiment Analysis', 'Intent Detection'].map((label, index) => {
                      const value = 60 + Math.random() * 35;
                      return (
                        <div key={label}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-[10px] md:text-xs text-[#B7C0D6]">{label}</div>
                            <div className="text-[10px] md:text-xs text-white font-mono">{value.toFixed(0)}%</div>
                          </div>
                          <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${
                                  index === 0 ? '#2D6BFF' :
                                  index === 1 ? '#8B5CF6' :
                                  index === 2 ? '#06B6D4' :
                                  '#10B981'
                                }, ${
                                  index === 0 ? '#60A5FA' :
                                  index === 1 ? '#A78BFA' :
                                  index === 2 ? '#22D3EE' :
                                  '#34D399'
                                })`,
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Status Footer */}
                  <div className="flex items-center justify-between mt-4 md:mt-6 pt-3 md:pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                      <div className="text-[10px] md:text-xs text-[#B7C0D6]">All systems operational</div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-xs text-primary font-mono">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                      AI ACTIVE
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl -z-10 opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Showcase */}
      <section className="py-8 md:py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">
                Global Multi-Industry Platform
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white mb-3 md:mb-4 px-4">
              Trusted Across <span className="text-transparent bg-gradient-to-r from-primary to-purple-400 bg-clip-text">12 Industries</span>
            </h2>
            <p className="text-sm md:text-lg text-[#B7C0D6] max-w-2xl mx-auto px-4">
              SENTRIA delivers specialized AI voice solutions for every sector
            </p>
          </motion.div>

          {/* Industries List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                {industries.map((industry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.03 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => onNavigate(`industries/${industry.route}`)}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 transition-all duration-300 cursor-pointer group"
                  >
                    <industry.icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors mb-2 md:mb-3" />
                    <div className="text-white font-semibold text-sm md:text-base group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                      {industry.name}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-white/10 text-center"
              >
                <Button
                  onClick={() => onNavigate('industries')}
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 px-6 md:px-8 text-sm md:text-base group"
                >
                  Explore All Industries
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-12 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">
                Measurable Results
              </span>
            </div>
            <h2 className="text-white mb-4 md:mb-6 max-w-4xl mx-auto text-2xl md:text-4xl px-4">
              Real Impact, Backed by Data
            </h2>
            <p className="text-base md:text-xl lg:text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed px-4">
              AI voice automation delivers immediate operational improvements and measurable long-term ROI
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-8 text-center hover:border-primary/50 transition-all group"
              >
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text mb-2 md:mb-4">
                  {outcome.metric}
                </div>
                <div className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">{outcome.label}</div>
                <div className="text-xs md:text-sm text-[#B7C0D6]">{outcome.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl px-4">Complete AI Platform</h2>
            <p className="text-base md:text-xl lg:text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed px-4">
              Everything you need to automate customer interactions and optimize operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('platform-overview')}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col p-4 md:p-8">
                  <div className="mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-xs md:text-sm font-semibold mt-4 md:mt-6 group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities */}
      <section className="py-12 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm font-semibold text-primary tracking-wider uppercase">
                Enterprise-Grade Platform
              </span>
            </div>
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl px-4">Built for Scale, Security & Performance</h2>
            <p className="text-base md:text-xl lg:text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed px-4">
              Global infrastructure designed to handle millions of interactions with enterprise-level security and compliance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Global Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Global Infrastructure</h3>
              <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed mb-4">
                Multi-region deployment across 15+ data centers with automatic failover and 99.9% uptime SLA
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Multi-Region</span>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Auto-Scaling</span>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">CDN</span>
              </div>
            </motion.div>

            {/* Security & Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 md:w-7 md:h-7 text-green-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Security & Compliance</h3>
              <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed mb-4">
                Enterprise-grade encryption and comprehensive compliance with CRTC, AIDA, HIPAA, and PIPEDA standards
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">CRTC</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">AIDA</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">HIPAA</span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">PIPEDA</span>
              </div>
            </motion.div>

            {/* Advanced AI Engine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 md:w-7 md:h-7 text-purple-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Advanced AI Engine</h3>
              <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed mb-4">
                Neural language models with real-time learning, sentiment analysis, and context-aware responses
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">NLP</span>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">ML</span>
                <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Deep Learning</span>
              </div>
            </motion.div>

            {/* API & Integrations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">API & Integrations</h3>
              <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed mb-4">
                RESTful APIs, webhooks, and pre-built integrations with 100+ business tools and CRM systems
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">REST API</span>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Webhooks</span>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">SDKs</span>
              </div>
            </motion.div>

            {/* Real-time Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-orange-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Real-time Analytics</h3>
              <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed mb-4">
                Live dashboards, predictive insights, and custom reporting with data export to your BI tools
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">Live Data</span>
                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">Predictive</span>
                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">BI Export</span>
              </div>
            </motion.div>

            {/* 24/7 Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-indigo-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Enterprise Support</h3>
              <p className="text-sm md:text-base text-[#B7C0D6] leading-relaxed mb-4">
                Dedicated success team, priority support, and custom training for your organization
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">24/7</span>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Dedicated CSM</span>
                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Training</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-primary/50">
                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h2 className="text-white mb-3 md:mb-4 text-2xl md:text-4xl px-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-base md:text-xl text-[#B7C0D6] mb-6 md:mb-10 px-4">
                Experience the power of AI-driven automation that boosts efficiency, optimizes operations, and delivers exceptional customer experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-8 md:px-12 text-base md:text-lg shadow-lg shadow-primary/50 w-full sm:w-auto"
                >
                  Contact Sales
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}