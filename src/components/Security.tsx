import { motion } from "motion/react";
import { Shield, Lock, FileText, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const securityFeatures = [
  {
    icon: Lock,
    title: "Role-based access",
    description: "Granular permissions control who sees what patient data.",
  },
  {
    icon: FileText,
    title: "Audit logs",
    description: "Complete traceability of all system actions and data access.",
  },
  {
    icon: Shield,
    title: "Minimum necessary data",
    description: "Collect only what's required for the workflow—nothing more.",
  },
  {
    icon: AlertTriangle,
    title: "Clear escalation rules",
    description: "Defined handoff protocols for complex cases requiring human judgment.",
  },
];

export function Security() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-[#0B1630]/20 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#2D6BFF] font-semibold">
              SECURITY
            </span>
          </div>
          <h2 className="text-white mb-6">
            Designed for privacy and control.
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-3xl mx-auto">
            Built with healthcare regulations and data sovereignty in mind.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-lg p-6 h-full">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-white mb-2 leading-tight text-sm">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#B7C0D6] leading-relaxed">
                  {feature.description}
                </p>
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
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/5 group"
          >
            Security & Privacy
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
