import { motion } from "motion/react";

export function TrustStrip() {
  return (
    <section className="py-20 border-y border-white/8 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent relative overflow-hidden">
      {/* Animated scan line */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50"></div>
            <p className="text-xs text-primary tracking-[0.2em] uppercase font-semibold">
              Trusted by Leading Organizations Worldwide
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="h-16 bg-gradient-to-r from-white/5 to-white/10 rounded border border-white/10 flex items-center justify-center hover:border-primary/30 transition-all duration-300">
                  <span className="text-xs text-white/60 tracking-widest group-hover:text-white/80 transition-colors">
                    COMPANY {i}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}