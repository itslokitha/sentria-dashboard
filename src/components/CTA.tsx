import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const benefits = [
  "Free 30-day trial",
  "No credit card required",
  "Full feature access",
  "24/7 technical support",
];

export function CTA() {
  return (
    <section className="py-32 bg-gradient-to-b from-[#0D1F3D]/10 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(30,75,143,0.15),transparent_70%)]"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your <span className="text-primary">Voice Experience?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Join hundreds of companies already using Sentria to deliver exceptional customer experiences at scale.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-gray-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/5 px-10 py-6 text-lg"
            >
              Contact Sales
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            Trusted by industry leaders worldwide. Enterprise support available.
          </p>
        </motion.div>
      </div>
    </section>
  );
}