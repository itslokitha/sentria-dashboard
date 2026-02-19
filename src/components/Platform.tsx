import { motion } from "motion/react";
import { Database, Shield, GitBranch, Zap, BarChart2, Network } from "lucide-react";

const capabilities = [
  {
    icon: Database,
    title: "Data sovereignty",
    description: "All patient data stored and processed within Canadian borders. Full PIPEDA compliance.",
  },
  {
    icon: Shield,
    title: "End-to-end encryption",
    description: "AES-256 encryption at rest, TLS 1.3 in transit. Zero-knowledge architecture.",
  },
  {
    icon: GitBranch,
    title: "Version control",
    description: "Every AI decision is logged with full audit trail. Rollback to any point in time.",
  },
  {
    icon: Zap,
    title: "Real-time processing",
    description: "Sub-second response times. Process thousands of concurrent conversations.",
  },
  {
    icon: BarChart2,
    title: "Predictive analytics",
    description: "ML models forecast demand, optimize capacity, and identify revenue opportunities.",
  },
  {
    icon: Network,
    title: "API-first architecture",
    description: "RESTful APIs and webhooks. Integrate with any healthcare system or workflow.",
  },
];

export function Platform() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-15"
        >
          <source src="https://storage.coverr.co/videos/coverr-abstract-digital-grid-7062?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjMzNDMxNTE4fQ.6vHe6d8mJgGHKMCxF7I0gNRGqfz4z2SLU-f4vKgr2pc" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A12] via-[#070A12]/95 to-[#070A12]"></div>
      </div>
      
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0B1630]/40 to-black z-[1]"></div>
      
      {/* Animated technical grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_2px,transparent_2px),linear-gradient(90deg,rgba(45,107,255,0.03)_2px,transparent_2px)] bg-[size:60px_60px]"></div>
        
        {/* Flowing data lines */}
        <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              r="3"
              fill="#2D6BFF"
              initial={{ cx: "0%", cy: `${20 + i * 15}%` }}
              animate={{ cx: "100%", cy: `${20 + i * 15}%` }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "linear",
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
          <div className="inline-block mb-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#2D6BFF] font-semibold">
              PLATFORM
            </span>
          </div>
          <h2 className="text-white mb-6">
            Enterprise-grade infrastructure
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-3xl mx-auto">
            Built on secure, scalable architecture designed for healthcare operations at any scale.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-lg p-8 hover:border-primary/40 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <capability.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3">
                  {capability.title}
                </h3>
                <p className="text-sm text-[#B7C0D6] leading-relaxed">
                  {capability.description}
                </p>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-white/[0.05] to-white/[0.03] backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.99%</div>
                <div className="text-sm text-[#B7C0D6]">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">&lt;100ms</div>
                <div className="text-sm text-[#B7C0D6]">Response time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">SOC 2</div>
                <div className="text-sm text-[#B7C0D6]">Type II certified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-[#B7C0D6]">Canada hosted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}