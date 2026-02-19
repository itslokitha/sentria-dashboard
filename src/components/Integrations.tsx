import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const integrations = [
  {
    name: "Google Calendar",
    category: "Calendar",
    description: "Two-way sync for appointments and availability",
  },
  {
    name: "Microsoft Outlook Calendar",
    category: "Calendar",
    description: "Enterprise calendar integration with real-time updates",
  },
  {
    name: "Jane App",
    category: "Practice Management",
    description: "Direct booking and patient record integration",
  },
  {
    name: "Custom API",
    category: "Automation",
    description: "Connect your existing booking platform via API",
  },
];

export function Integrations() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/10 to-transparent"></div>
      
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
              INTEGRATIONS
            </span>
          </div>
          <h2 className="text-white mb-6">
            Works with your current tools.
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-2xl mx-auto">
            Connect to your existing calendar and booking systems without disrupting workflows.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="mb-4">
                  <div className="text-xs text-primary mb-2">{integration.category}</div>
                  <h3 className="font-semibold text-white mb-2 leading-tight">
                    {integration.name}
                  </h3>
                </div>
                <p className="text-sm text-[#B7C0D6] leading-relaxed">
                  {integration.description}
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
            View All Integrations
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
