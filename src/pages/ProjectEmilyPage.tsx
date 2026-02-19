import { motion } from "motion/react";
import { Mic, MicOff, Volume2, VolumeX, Activity, Brain, Zap, MessageSquare, Phone, ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect, useRef } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export function ProjectEmilyPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'emily', message: string, timestamp: string }>>([ 
    { role: 'emily', message: "Hi! I'm Emily, your AI voice assistant. Click the microphone to start talking with me, or type your message below.", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [audioWaveData, setAudioWaveData] = useState(Array.from({ length: 20 }, () => ({ value: 0 })));
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Meet Emily - Revolutionary AI Voice Assistant | SENTRIA";
  }, []);

  // Simulate audio wave animation
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioWaveData(prev => 
          prev.map(() => ({ value: Math.random() * 100 }))
        );
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioWaveData(Array.from({ length: 20 }, () => ({ value: 0 })));
    }
  }, [isListening]);

  // Auto scroll to bottom
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMsg = {
      role: 'user' as const,
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setConversation(prev => [...prev, userMsg]);
    setInputMessage("");
    
    // Simulate Emily's response
    setTimeout(() => {
      const responses = [
        "I understand you're interested in our AI voice solutions. Would you like to know more about specific industries we serve?",
        "That's a great question! Our AI can handle complex conversations with natural language understanding. What industry are you in?",
        "I can help you with scheduling, customer inquiries, support tickets, and much more. What's your primary use case?",
        "Our voice AI integrates seamlessly with your existing systems. Would you like to see a demo of our integration capabilities?",
        "Excellent! I can provide 24/7 support in over 40 languages. Which languages does your business need support for?"
      ];
      
      const emilyMsg = {
        role: 'emily' as const,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setConversation(prev => [...prev, emilyMsg]);
    }, 1000);
  };

  const toggleListening = () => {
    if (!isListening) {
      // Simulate voice recognition start
      setIsListening(true);
      
      // Simulate received voice input after 3 seconds
      setTimeout(() => {
        const voiceInputs = [
          "Can you tell me about your healthcare solutions?",
          "How does the pricing work for your platform?",
          "What industries do you support?",
          "I need help automating customer service calls"
        ];
        
        const userMsg = {
          role: 'user' as const,
          message: voiceInputs[Math.floor(Math.random() * voiceInputs.length)],
          timestamp: new Date().toLocaleTimeString()
        };
        
        setConversation(prev => [...prev, userMsg]);
        setIsListening(false);
        
        // Emily responds
        setTimeout(() => {
          const emilyMsg = {
            role: 'emily' as const,
            message: "Great question! Let me explain how SENTRIA can transform your operations with intelligent voice automation...",
            timestamp: new Date().toLocaleTimeString()
          };
          setConversation(prev => [...prev, emilyMsg]);
        }, 1500);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background with Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1720962158849-2c3b22499d2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjB2b2ljZSUyMGFzc2lzdGFudCUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzcwMTgxOTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="AI Voice Technology"
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
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                LIVE INTERACTIVE DEMO
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-6 text-3xl md:text-5xl lg:text-6xl">
              A Truly Conversational AI Voice Assistant That Understands Context Like a Human
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-8 leading-relaxed max-w-4xl mx-auto">
              Experience Emily—a revolutionary leap in artificial intelligence that doesn't just respond, 
              but genuinely converses, understands intent, and adapts to your business in real-time.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: "Response Time", value: "<100ms", icon: Zap },
                { label: "Multi-Language", value: "Yes", icon: MessageSquare },
                { label: "Accuracy", value: "98.7%", icon: Brain },
                { label: "Uptime", value: "99.9%", icon: Activity },
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

      {/* Interactive Demo Section */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">Experience Emily in Action</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Talk to Emily using your voice or type your questions. See firsthand how natural AI conversation can be.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Voice Controls */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 lg:sticky lg:top-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white">Voice Controls</h3>
              </div>
              
              {/* Audio Visualization */}
              <div className="mb-8">
                <div className="bg-black/40 border border-white/10 rounded-xl p-6" style={{ height: '200px', minHeight: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={audioWaveData}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#2D6BFF" 
                        strokeWidth={3}
                        dot={false}
                        isAnimationActive={true}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <span className={`text-sm font-medium ${isListening ? 'text-primary animate-pulse' : 'text-[#B7C0D6]'}`}>
                    {isListening ? '🎤 Listening to your voice...' : 'Ready to listen'}
                  </span>
                </div>
              </div>

              {/* Voice Button */}
              <div className="flex justify-center mb-8">
                <button
                  onClick={toggleListening}
                  className={`relative w-32 h-32 rounded-full transition-all duration-300 ${ 
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_60px_rgba(239,68,68,0.5)]' 
                      : 'bg-primary hover:bg-primary/90 shadow-[0_0_60px_rgba(45,107,255,0.4)]'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-12 h-12 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  ) : (
                    <Mic className="w-12 h-12 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                  
                  {isListening && (
                    <>
                      <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-pulse"></div>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-[#B7C0D6] mb-6">
                {isListening ? 'Speak now... Click again to stop' : 'Click the microphone to start talking'}
              </p>

              {/* Controls */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/5"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
                <Button
                  onClick={() => setConversation([conversation[0]])}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/5"
                >
                  Reset Chat
                </Button>
              </div>

              {/* Capabilities */}
              <div className="pt-8 border-t border-white/10">
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  Emily's Capabilities
                </h4>
                <div className="space-y-3">
                  {[
                    "Answer questions about SENTRIA",
                    "Explain features and pricing",
                    "Schedule demos and meetings",
                    "Provide technical information",
                    "Handle multi-turn conversations",
                    "Understand context and intent"
                  ].map((capability, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#B7C0D6]">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {capability}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Conversation Window */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary/20 to-purple-500/20 border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold flex items-center gap-2">
                      Meet Emily
                      <span className="text-xs px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400">
                        Online
                      </span>
                    </h4>
                    <p className="text-xs text-[#B7C0D6]">AI Voice Assistant • Ready to help</p>
                  </div>
                  <div className="ml-auto">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {conversation.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-2xl p-4 ${ 
                        msg.role === 'user' 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                          : 'bg-white/10 border border-white/10 text-white'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.message}</p>
                      </div>
                      <p className="text-xs text-[#B7C0D6] mt-1 px-2">{msg.timestamp}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={conversationEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/10 p-4 bg-black/20">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-[#B7C0D6]/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  />
                  <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                    Send
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Behind Emily */}
      <section className="py-20 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6 text-2xl md:text-4xl">The Technology Behind Emily</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Advanced AI models and natural language processing power Emily's human-like conversations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Neural Language Models",
                description: "State-of-the-art transformer architecture trained on billions of conversational interactions",
                features: ["GPT-4 integration", "Custom fine-tuning", "Contextual awareness", "Intent recognition"]
              },
              {
                icon: Activity,
                title: "Voice Recognition",
                description: "Real-time speech-to-text with support for accents, dialects, and background noise filtering",
                features: ["Multi-language support", "99.7% accuracy", "Noise cancellation", "Accent adaptation"]
              },
              {
                icon: Zap,
                title: "Instant Processing",
                description: "Cloud-native architecture delivering sub-100ms response times at global scale",
                features: ["Edge computing", "Auto-scaling", "99.9% uptime", "Global CDN"]
              }
            ].map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:border-primary/30 transition-colors"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <tech.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tech.title}</h3>
                <p className="text-[#B7C0D6] mb-6 leading-relaxed">{tech.description}</p>
                <div className="space-y-2">
                  {tech.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-[#B7C0D6]">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {feature}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl p-12 text-center relative overflow-hidden"
          >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,107,255,0.1),transparent_50%)]"></div>
            
            <div className="relative z-10">
              <h2 className="text-white mb-6 text-2xl md:text-4xl">Ready to Deploy Emily for Your Business?</h2>
              <p className="text-base md:text-lg text-[#B7C0D6] mb-8 max-w-2xl mx-auto">
                See how Emily can transform your customer interactions, automate support, 
                and scale your operations with intelligent voice AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-10"
                  onClick={() => onNavigate('contact')}
                >
                  Schedule Live Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}