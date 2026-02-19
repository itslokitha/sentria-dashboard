import { motion } from "motion/react";
import { RefreshCw, PhoneIncoming, Bell, TrendingDown, Globe, Brain, Zap, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

const outcomes = [
  {
    icon: Brain,
    title: "AI-powered call handling",
    description: "Natural language processing answers patient questions with human-like conversation.",
    impact: "98.7% resolution rate",
  },
  {
    icon: RefreshCw,
    title: "Intelligent cancellation recovery",
    description: "Machine learning predicts optimal waitlist matches and automates outreach.",
    impact: "186 slots filled monthly",
  },
  {
    icon: PhoneIncoming,
    title: "Autonomous booking conversion",
    description: "AI agents convert missed calls into confirmed appointments via SMS and voice.",
    impact: "73% conversion rate",
  },
  {
    icon: Bell,
    title: "Predictive no-show prevention",
    description: "Behavioral analysis triggers personalized confirmations and reminders.",
    impact: "40% reduction in no-shows",
  },
  {
    icon: TrendingDown,
    title: "Workflow automation",
    description: "Eliminate repetitive tasks with intelligent routing and decision trees.",
    impact: "142 hours saved monthly",
  },
  {
    icon: Globe,
    title: "24/7 operational continuity",
    description: "Always-on AI coverage across all provinces and time zones.",
    impact: "Zero missed opportunities",
  },
];

const generateLiveData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * 20) + 80,
  }));
};

export function CoreOutcomes() {
  const [liveData, setLiveData] = useState<{ [key: number]: any[] }>({});

  useEffect(() => {
    const initialData: { [key: number]: any[] } = {};
    outcomes.forEach((_, index) => {
      initialData[index] = generateLiveData();
    });
    setLiveData(initialData);

    const interval = setInterval(() => {
      setLiveData(prev => {
        const newData = { ...prev };
        outcomes.forEach((_, index) => {
          const data = [...(prev[index] || [])];
          data.shift();
          data.push({
            time: data[data.length - 1]?.time + 1 || 0,
            value: Math.floor(Math.random() * 20) + 80,
          });
          newData[index] = data;
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-black via-[#0B1630]/30 to-black relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src="https://storage.coverr.co/videos/T1ZkwG8Dg9JgXY3Ar37tz02v3kScXgFhY?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjMzNDMxNTE4fQ.6vHe6d8mJgGHKMCxF7I0gNRGqfz4z2SLU-f4vKgr2pc" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A12] via-[#070A12]/95 to-[#070A12]"></div>
      </div>
      
      {/* Enhanced grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] z-[1]"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Data flow visualization */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(45,107,255,0)" />
              <stop offset="50%" stopColor="rgba(45,107,255,0.3)" />
              <stop offset="100%" stopColor="rgba(45,107,255,0)" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <motion.path
              key={i}
              d={`M ${i * 25}%,0 Q ${i * 25 + 10}%,50% ${i * 25}%,100%`}
              stroke="url(#flowGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </svg>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">
              AI CAPABILITIES
            </span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </div>
          <h2 className="text-white mb-6">
            Autonomous intelligence, measurable outcomes
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-3xl mx-auto">
            Advanced AI models trained specifically for Canadian healthcare operations, with real-time performance monitoring.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 h-full overflow-hidden">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative overflow-hidden">
                    <outcome.icon className="w-6 h-6 text-primary relative z-10" strokeWidth={1.5} />
                    <motion.div
                      className="absolute inset-0 bg-primary/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-2 leading-tight">
                      {outcome.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#B7C0D6] leading-relaxed mb-4">
                  {outcome.description}
                </p>
                
                {/* Mini live chart */}
                <div className="w-full" style={{ height: '48px', minHeight: '48px', marginBottom: '12px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={liveData[index] || []}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2D6BFF" 
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={true}
                        animationDuration={300}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs text-primary font-mono">
                    {outcome.impact}
                  </span>
                  <Zap className="w-3 h-3 text-primary ml-auto" />
                </div>

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-xl transition-all duration-300"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(45, 107, 255, 0)",
                      "0 0 20px rgba(45, 107, 255, 0.1)",
                      "0 0 0px rgba(45, 107, 255, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping"></div>
              </div>
              <span className="text-sm text-white font-semibold">
                Real-time performance tracking
              </span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-sm text-[#B7C0D6]">
              Live monitoring with full audit trail
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}