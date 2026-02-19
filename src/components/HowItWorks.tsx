import { motion } from "motion/react";
import { Link2, Settings, Zap, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect your phone + booking system",
    description: "Integrate with your existing phone line and calendar platform in minutes.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure clinic rules",
    description: "Set hours, services, escalation paths, and approval workflows.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Go live in days",
    description: "Deploy to production with guided onboarding—not months of setup.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Track outcomes in the dashboard",
    description: "Monitor call metrics, bookings, and operational impact in real-time.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#2D6BFF] font-semibold">
              IMPLEMENTATION
            </span>
          </div>
          <h2 className="text-white mb-6">
            How it works
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-2xl mx-auto">
            A structured deployment process designed for minimal disruption.
          </p>
        </motion.div>
        
        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-16 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Node */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0B1630] border-2 border-primary flex items-center justify-center z-10">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  
                  <div className="pt-32">
                    <div className="text-sm text-primary font-mono mb-3">{step.number}</div>
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-[#B7C0D6]" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-white mb-3 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#B7C0D6] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Vertical line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-[1px] bg-gradient-to-b from-white/20 to-transparent"></div>
              )}
              
              {/* Node */}
              <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-[#0B1630] border-2 border-primary flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary"></div>
              </div>
              
              <div>
                <div className="text-xs text-primary font-mono mb-2">{step.number}</div>
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <step.icon className="w-5 h-5 text-[#B7C0D6]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#B7C0D6] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
