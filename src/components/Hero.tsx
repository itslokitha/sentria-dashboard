import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, TrendingUp, Calendar, Clock, Brain, Activity, Zap, BarChart3, Play, Pause } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect, useRef } from "react";

const generateRealtimeData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    calls: Math.floor(Math.random() * 30) + 70,
    bookings: Math.floor(Math.random() * 25) + 60,
    revenue: Math.floor(Math.random() * 40) + 80,
  }));
};

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData());
  const [metrics, setMetrics] = useState({
    answerRate: 98.7,
    conversions: 1247,
    efficiency: 186,
    saved: 142,
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          time: prev[prev.length - 1].time + 1,
          calls: Math.floor(Math.random() * 30) + 70,
          bookings: Math.floor(Math.random() * 25) + 60,
          revenue: Math.floor(Math.random() * 40) + 80,
        });
        return newData;
      });

      setMetrics(prev => ({
        answerRate: Math.min(99.9, prev.answerRate + (Math.random() - 0.5) * 0.1),
        conversions: prev.conversions + Math.floor(Math.random() * 3),
        efficiency: prev.efficiency + Math.floor(Math.random() * 2),
        saved: prev.saved + Math.floor(Math.random() * 2),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://storage.coverr.co/videos/XjzDyf00CpAP01WCxHcwP5ndTYH3T2z7Q02?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjMzNDMxNTE4fQ.6vHe6d8mJgGHKMCxF7I0gNRGqfz4z2SLU-f4vKgr2pc" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-[#070A12]/95 to-[#070A12]/90"></div>
        <div className="absolute inset-0 bg-[#070A12]/40"></div>
      </div>

      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
      >
        {isVideoPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white ml-0.5" />
        )}
      </button>

      {/* Enhanced animated grid background */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>
      
      {/* Advanced particle network system */}
      <div className="absolute inset-0 overflow-hidden opacity-30 z-[1]">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(45,107,255,0)" />
              <stop offset="50%" stopColor="rgba(45,107,255,0.8)" />
              <stop offset="100%" stopColor="rgba(45,107,255,0)" />
            </linearGradient>
            <radialGradient id="nodeGradient">
              <stop offset="0%" stopColor="rgba(45,107,255,1)" />
              <stop offset="100%" stopColor="rgba(45,107,255,0.3)" />
            </radialGradient>
          </defs>
          
          {/* Intelligent routing lines */}
          <motion.path
            d="M 0,100 Q 400,150 800,100 T 1600,100"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 0,250 Q 400,200 800,250 T 1600,250"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Advanced animated nodes */}
          {[
            { cx: "20%", cy: 100, delay: 0 },
            { cx: "50%", cy: 250, delay: 0.5 },
            { cx: "80%", cy: 150, delay: 1 },
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.cx} cy={node.cy} r="6" fill="url(#nodeGradient)">
                <animate 
                  attributeName="r" 
                  values="4;8;4" 
                  dur="2s" 
                  begin={`${node.delay}s`}
                  repeatCount="indefinite" 
                />
                <animate 
                  attributeName="opacity" 
                  values="0.5;1;0.5" 
                  dur="2s" 
                  begin={`${node.delay}s`}
                  repeatCount="indefinite" 
                />
              </circle>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-3 mb-8 px-5 py-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 backdrop-blur-sm">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-xs tracking-[0.2em] uppercase text-primary font-bold">
                AI-POWERED BUSINESS AUTOMATION
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="mb-8 text-white leading-[1.1]" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}>
              Transform Your Business<br />
              <span className="bg-gradient-to-r from-primary via-[#4A85FF] to-[#6B9EFF] bg-clip-text text-transparent">
                with AI Voice
              </span><br />
              Intelligence
            </h1>
            
            <p className="text-xl lg:text-2xl text-[#B7C0D6] mb-10 leading-relaxed max-w-2xl">
              SENTRIA deploys autonomous AI voice agents that handle customer interactions, optimize operations, 
              and deliver actionable insights—24/7 across every channel worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={() => onNavigate('contact')}
                className="bg-primary hover:bg-primary/90 text-white text-base px-10 py-7 h-auto group relative overflow-hidden shadow-2xl shadow-primary/20"
              >
                <span className="relative z-10 flex items-center text-lg font-semibold">
                  Contact Sales
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#4A85FF] to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-base px-10 py-7 h-auto text-lg font-semibold"
                onClick={() => onNavigate('platform')}
              >
                View Platform
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-[#B7C0D6] justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="font-medium">SOC 2 Type II</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="font-medium">GDPR Compliant</div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="font-medium">Enterprise Security</div>
            </div>
          </motion.div>
          
          {/* Right: Real-time Analytics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-white/[0.10] to-white/[0.03] backdrop-blur-2xl border border-white/20 rounded-2xl p-10 shadow-2xl">
              {/* Header */}
              <div className="mb-10 pb-8 border-b border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping"></div>
                    </div>
                    <div className="text-xs tracking-[0.2em] uppercase text-primary font-bold">
                      LIVE INTELLIGENCE
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <div className="text-sm text-[#B7C0D6] font-mono">Real-time</div>
                  </div>
                </div>
                <div className="text-base text-[#B7C0D6]">Operational metrics updating every 2s</div>
              </div>
              
              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div 
                  className="space-y-3"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2 text-[#B7C0D6] text-sm font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2D6BFF]"></div>
                    <span>AI Answer Rate</span>
                  </div>
                  <div className="text-5xl font-bold text-white font-mono">
                    {metrics.answerRate.toFixed(1)}%
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#2D6BFF]">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12.3% vs baseline</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-3"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 text-[#B7C0D6] text-sm font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4A85FF]"></div>
                    <span>Autonomous Bookings</span>
                  </div>
                  <div className="text-5xl font-bold text-white font-mono">
                    {metrics.conversions.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4A85FF]">
                    <Calendar className="w-4 h-4" />
                    <span>342 this week</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-3"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-2 text-[#B7C0D6] text-sm font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6B9EFF]"></div>
                    <span>Capacity Recovered</span>
                  </div>
                  <div className="text-5xl font-bold text-white font-mono">
                    {metrics.efficiency}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B7C0D6]">
                    <span>~${(metrics.efficiency * 200).toLocaleString()} protected</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-3"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  <div className="flex items-center gap-2 text-[#B7C0D6] text-sm font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8CB7FF]"></div>
                    <span>Admin Hours Saved</span>
                  </div>
                  <div className="text-5xl font-bold text-white font-mono">
                    {metrics.saved}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B7C0D6]">
                    <Clock className="w-4 h-4" />
                    <span>Per month</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Real-time evolving chart */}
              <div className="mt-10 pt-8 border-t border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span className="text-sm text-[#B7C0D6] font-medium">Performance Trend</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#2D6BFF]"></div>
                    <span className="text-xs text-[#B7C0D6]">Calls</span>
                    <div className="w-2 h-2 rounded-full bg-[#4A85FF] ml-2"></div>
                    <span className="text-xs text-[#B7C0D6]">Bookings</span>
                  </div>
                </div>
                <div className="w-full" style={{ height: '160px', minHeight: '160px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <AreaChart data={realtimeData}>
                      <defs>
                        <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2D6BFF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2D6BFF" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4A85FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4A85FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="calls" 
                        stroke="#2D6BFF" 
                        strokeWidth={2}
                        fill="url(#colorCalls)" 
                        isAnimationActive={true}
                        animationDuration={300}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#4A85FF" 
                        strokeWidth={2}
                        fill="url(#colorBookings)" 
                        isAnimationActive={true}
                        animationDuration={300}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-[#B7C0D6] tracking-wide">
                    Real-time operational flow
                  </div>
                  <div className="text-xs text-primary font-mono flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    STREAMING
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced 3D glow effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-[#2D6BFF]/30 via-[#2D6BFF]/20 to-[#2D6BFF]/30 blur-3xl -z-10 opacity-70"></div>
            <div className="absolute -inset-16 bg-gradient-to-r from-[#2D6BFF]/20 via-transparent to-[#2D6BFF]/20 blur-3xl -z-20 opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}