import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onNavigate: (page: string) => void;
}

export function FinalCTA({ onNavigate }: FinalCTAProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="https://storage.coverr.co/videos/XjzDyf00CpAP01WCxHcwP5ndTYH3T2z7Q02?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjMzNDMxNTE4fQ.6vHe6d8mJgGHKMCxF7I0gNRGqfz4z2SLU-f4vKgr2pc" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A12] via-[#070A12]/95 to-[#070A12]"></div>
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1630]/30 via-[#0B1630]/50 to-black z-[1]"></div>
      <div className="absolute inset-0 z-[1]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle,rgba(45,107,255,0.1),transparent_70%)]"></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block mb-6">
            <span className="text-[10px] tracking-[0.2em] uppercase text-primary font-semibold">
              START YOUR TRANSFORMATION
            </span>
          </div>
          
          <h2 className="text-white mb-6">
            Deploy AI-powered patient access in 14 days.
          </h2>
          <p className="text-xl text-[#B7C0D6] mb-12 leading-relaxed">
            Join Canadian healthcare organizations already using SENTRIA to optimize operations, 
            improve patient access, and reclaim administrative capacity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => onNavigate('contact')}
              className="bg-primary hover:bg-primary/90 text-white px-10 group"
            >
              Contact Sales
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/5 px-10"
              onClick={() => onNavigate('sales')}
            >
              Talk to Sales
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">30 min</div>
              <div className="text-sm text-[#B7C0D6]">Initial demo call</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">3-5 days</div>
              <div className="text-sm text-[#B7C0D6]">Setup & configuration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">14 days</div>
              <div className="text-sm text-[#B7C0D6]">Guided pilot period</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}