import { motion } from "motion/react";
import {
  Mic, Brain, Zap, Globe, MessageSquare, Phone, Activity, CheckCircle2,
  ArrowRight, Sparkles, Waves, Volume2, Languages, Network, Cpu, Lock,
  Shield, TrendingUp, Users, BarChart3, Server, Headphones
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
  Tooltip, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar
} from "recharts";
import { useEffect } from "react";

const performanceData = [
  { time: "0ms", accuracy: 0, response: 0 },
  { time: "20ms", accuracy: 65, response: 45 },
  { time: "40ms", accuracy: 88, response: 78 },
  { time: "60ms", accuracy: 95, response: 92 },
  { time: "80ms", accuracy: 98, response: 97 },
  { time: "100ms", accuracy: 98.7, response: 99 },
];

const languageData = [
  { language: "English", calls: 5200000 },
  { language: "Spanish", calls: 2800000 },
  { language: "French", calls: 1500000 },
  { language: "German", calls: 980000 },
  { language: "Mandarin", calls: 1200000 },
  { language: "Other 35+", calls: 2320000 },
];

const capabilityRadar = [
  { capability: "NLP Accuracy", score: 98.7 },
  { capability: "Response Speed", score: 99 },
  { capability: "Conversation Flow", score: 96 },
  { capability: "Intent Recognition", score: 97 },
  { capability: "Emotion Detection", score: 94 },
  { capability: "Context Retention", score: 95 },
];

const industryUsage = [
  { month: "Jan", healthcare: 2400, finance: 1800, retail: 1600 },
  { month: "Feb", healthcare: 2800, finance: 2100, retail: 1900 },
  { month: "Mar", healthcare: 3200, finance: 2400, retail: 2200 },
  { month: "Apr", healthcare: 3600, finance: 2800, retail: 2600 },
  { month: "May", healthcare: 4100, finance: 3200, retail: 3000 },
  { month: "Jun", healthcare: 4500, finance: 3600, retail: 3400 },
];

interface VoiceTechnologyPageProps {
  onNavigate: (page: string) => void;
}

export function VoiceTechnologyPage({ onNavigate }: VoiceTechnologyPageProps) {
  useEffect(() => {
    document.title = "AI Voice Technology - Advanced NLP Platform | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1620245446020-879dc5cf2414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHZvaWNlJTIwdGVjaG5vbG9neSUyMG1pY3JvcGhvbmUlMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3MDE4MjIxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Voice Technology"
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
            className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full">
              <Waves className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400 tracking-wider uppercase">
                AI VOICE TECHNOLOGY
              </span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>

            <h1 className="text-white mb-6 text-3xl md:text-5xl lg:text-6xl">
              Revolutionary Voice AI Technology Engineered for Human-Like Conversations
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-8 leading-relaxed max-w-4xl mx-auto">
              State-of-the-art neural language models, emotion detection, and contextual understanding 
              delivering human-like conversations with 98.7% accuracy.
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Accuracy Rate", value: "98.7%", icon: Brain },
                { label: "Response Time", value: "<100ms", icon: Zap },
                { label: "Uptime", value: "99.99%", icon: Activity },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4"
                >
                  <stat.icon className="w-5 h-5 text-cyan-400 mb-2 mx-auto" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-[#B7C0D6]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Technology Components */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Core Voice Technology Stack</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Six integrated AI systems working together to deliver human-like voice conversations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Neural Language Models",
                description: "GPT-4 powered transformer architecture with custom fine-tuning on billions of business conversations",
                capabilities: [
                  "Contextual understanding across multi-turn dialogues",
                  "Industry-specific terminology and jargon",
                  "Custom training on your business data",
                  "Continuous learning from interactions",
                  "Semantic intent classification",
                  "Entity extraction and relationship mapping"
                ]
              },
              {
                icon: Waves,
                title: "Speech Recognition Engine",
                description: "Advanced ASR (Automatic Speech Recognition) with noise cancellation and accent adaptation",
                capabilities: [
                  "Multi-language and dialect support",
                  "Real-time streaming recognition",
                  "Background noise filtering",
                  "Accent and pronunciation adaptation",
                  "Speaker diarization (multiple speakers)",
                  "Custom vocabulary and terminology"
                ]
              },
              {
                icon: Volume2,
                title: "Voice Synthesis (TTS)",
                description: "Natural-sounding text-to-speech with emotional inflection and brand voice customization",
                capabilities: [
                  "Neural voice generation",
                  "Custom voice personalities",
                  "Emotion and tone control",
                  "Speaking rate and pitch adjustment",
                  "Pronunciation customization",
                  "SSML markup support"
                ]
              },
              {
                icon: MessageSquare,
                title: "Conversation Management",
                description: "Intelligent dialogue flow control with context retention and multi-turn conversation handling",
                capabilities: [
                  "State-based conversation flows",
                  "Context window up to 25 turns",
                  "Intent prediction and routing",
                  "Clarification and confirmation loops",
                  "Fallback and error recovery",
                  "Conversation history tracking"
                ]
              },
              {
                icon: Activity,
                title: "Emotion & Sentiment Analysis",
                description: "Real-time emotion detection and sentiment analysis to adapt conversation tone and escalation",
                capabilities: [
                  "Voice stress analysis",
                  "Sentiment scoring (-1 to +1)",
                  "Emotion classification (8 categories)",
                  "Frustration detection and alerts",
                  "Satisfaction prediction",
                  "Adaptive response generation"
                ]
              },
              {
                icon: Network,
                title: "Integration & Orchestration",
                description: "API-first architecture connecting to CRMs, calendars, databases, and business systems",
                capabilities: [
                  "RESTful and GraphQL APIs",
                  "Real-time data sync",
                  "Webhook event streaming",
                  "Database query execution",
                  "Third-party API calls",
                  "Custom function execution"
                ]
              }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
                  <tech.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                <p className="text-sm text-[#B7C0D6] mb-6 leading-relaxed">{tech.description}</p>
                <div className="space-y-2">
                  {tech.capabilities.map((capability, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#B7C0D6]">{capability}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Analytics */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Voice AI Performance Metrics</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Enterprise-grade accuracy, speed, and reliability metrics powered by advanced neural networks
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Response Time & Accuracy</h3>
              <div className="h-80" style={{ minHeight: '320px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#B7C0D6" fontSize={12} />
                    <YAxis stroke="#B7C0D6" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(11, 22, 48, 0.95)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Area type="monotone" dataKey="accuracy" stroke="#06b6d4" fill="url(#colorAccuracy)" strokeWidth={2} />
                    <Area type="monotone" dataKey="response" stroke="#3b82f6" fill="url(#colorResponse)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-sm text-[#B7C0D6]">Accuracy %</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-[#B7C0D6]">Response Rate %</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">AI Capability Matrix</h3>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <RadarChart data={capabilityRadar}>
                    <PolarGrid stroke="#B7C0D6" opacity={0.2} />
                    <PolarAngleAxis dataKey="capability" stroke="#B7C0D6" fontSize={10} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#B7C0D6" fontSize={10} />
                    <Radar name="Performance" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Voice Technology Details */}
      <section className="py-24 relative overflow-hidden">
        {/* Removed radial gradient background */}
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Voice Technology Details</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Dive deeper into the capabilities and features of our advanced voice AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Neural Language Models",
                description: "GPT-4 powered transformer architecture with custom fine-tuning on billions of business conversations",
                capabilities: [
                  "Contextual understanding across multi-turn dialogues",
                  "Industry-specific terminology and jargon",
                  "Custom training on your business data",
                  "Continuous learning from interactions",
                  "Semantic intent classification",
                  "Entity extraction and relationship mapping"
                ]
              },
              {
                icon: Waves,
                title: "Speech Recognition Engine",
                description: "Advanced ASR (Automatic Speech Recognition) with noise cancellation and accent adaptation",
                capabilities: [
                  "Multi-language and dialect support",
                  "Real-time streaming recognition",
                  "Background noise filtering",
                  "Accent and pronunciation adaptation",
                  "Speaker diarization (multiple speakers)",
                  "Custom vocabulary and terminology"
                ]
              },
              {
                icon: Volume2,
                title: "Voice Synthesis (TTS)",
                description: "Natural-sounding text-to-speech with emotional inflection and brand voice customization",
                capabilities: [
                  "Neural voice generation",
                  "Custom voice personalities",
                  "Emotion and tone control",
                  "Speaking rate and pitch adjustment",
                  "Pronunciation customization",
                  "SSML markup support"
                ]
              },
              {
                icon: MessageSquare,
                title: "Conversation Management",
                description: "Intelligent dialogue flow control with context retention and multi-turn conversation handling",
                capabilities: [
                  "State-based conversation flows",
                  "Context window up to 25 turns",
                  "Intent prediction and routing",
                  "Clarification and confirmation loops",
                  "Fallback and error recovery",
                  "Conversation history tracking"
                ]
              },
              {
                icon: Activity,
                title: "Emotion & Sentiment Analysis",
                description: "Real-time emotion detection and sentiment analysis to adapt conversation tone and escalation",
                capabilities: [
                  "Voice stress analysis",
                  "Sentiment scoring (-1 to +1)",
                  "Emotion classification (8 categories)",
                  "Frustration detection and alerts",
                  "Satisfaction prediction",
                  "Adaptive response generation"
                ]
              },
              {
                icon: Network,
                title: "Integration & Orchestration",
                description: "API-first architecture connecting to CRMs, calendars, databases, and business systems",
                capabilities: [
                  "RESTful and GraphQL APIs",
                  "Real-time data sync",
                  "Webhook event streaming",
                  "Database query execution",
                  "Third-party API calls",
                  "Custom function execution"
                ]
              }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
                  <tech.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                <p className="text-sm text-[#B7C0D6] mb-6 leading-relaxed">{tech.description}</p>
                <div className="space-y-2">
                  {tech.capabilities.map((capability, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#B7C0D6]">{capability}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          {/* Removed CTA section */}
        </div>
      </section>
    </div>
  );
}