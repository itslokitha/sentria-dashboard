import { motion } from "motion/react";
import { PhoneOff, CalendarX, Clock, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: PhoneOff,
    title: "Missed opportunities",
    subtitle: "lost revenue",
    description: "Every unanswered inquiry is a customer who goes elsewhere.",
    metric: "~30%",
    metricLabel: "avg miss rate"
  },
  {
    icon: CalendarX,
    title: "No-shows & cancellations",
    subtitle: "wasted capacity",
    description: "Last-minute gaps reduce efficiency and revenue potential.",
    metric: "15-25%",
    metricLabel: "cancellation rate"
  },
  {
    icon: Clock,
    title: "Admin overload",
    subtitle: "slower operations",
    description: "Staff time spent on repetitive tasks delays core business.",
    metric: "40%",
    metricLabel: "of staff time"
  },
];

export function ProblemOutcome() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/20 to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-5xl mx-auto"
        >
          <div className="inline-block mb-6">
            <span className="text-xs tracking-[0.25em] uppercase text-[#2D6BFF] font-bold">
              OPERATIONAL INTELLIGENCE
            </span>
          </div>
          <h2 className="text-white mb-6">
            Quantifying the inefficiency problem.
          </h2>
          <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed">
            Traditional business operations leak revenue and capacity at every customer touchpoint. SENTRIA's AI closes these gaps with precision.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-lg p-8 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <problem.icon className="w-6 h-6 text-[#B7C0D6]" strokeWidth={1.5} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white mb-1">{problem.metric}</div>
                    <div className="text-xs text-[#B7C0D6]">{problem.metricLabel}</div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {problem.title}
                </h3>
                <div className="text-sm text-primary mb-4 font-medium">
                  {problem.subtitle}
                </div>
                <p className="text-[#B7C0D6] leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
