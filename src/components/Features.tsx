import { motion } from "motion/react";
import { Brain, Shield, Zap, Globe, BarChart3, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Models",
    description: "Powered by state-of-the-art neural networks trained on billions of conversations for human-like interactions.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-50ms response times ensure seamless, natural conversations without awkward delays.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level encryption, SOC 2 Type II compliance, and complete data sovereignty.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Support for 120+ languages with native accent recognition and regional dialects.",
  },
  {
    icon: MessageSquare,
    title: "Contextual Understanding",
    description: "Advanced NLP maintains conversation context across sessions for personalized experiences.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive insights into conversation flows, sentiment analysis, and performance metrics.",
  },
];

export function Features() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D1F3D]/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Built for <span className="text-primary">Performance</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Enterprise-grade capabilities designed to handle millions of conversations with precision and reliability.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-8 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
