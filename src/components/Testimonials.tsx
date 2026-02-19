import { motion } from "motion/react";
import { Quote, Play, Star } from "lucide-react";

const testimonials = [
  {
    quote: "We went from missing 30% of calls to answering over 95%. The impact on our booking rate was immediate and transformative.",
    name: "Dr. Sarah Chen",
    role: "Clinic Manager",
    location: "Halifax, NS",
    rating: 5,
    image: "https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9uJTIwbW9kZXJuJTIwY2xpbmljfGVufDF8fHx8MTc2OTYwODkwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    quote: "Cancellations used to create chaos. Now they're filled within hours. Our team focuses on patient care, not phone triage.",
    name: "Dr. Michael Osei",
    role: "Owner, Multi-site Clinic",
    location: "Ontario",
    rating: 5,
    image: "https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwbWVkaWNhbCUyMHN0YWZmJTIwdGVhbXxlbnwxfHx8fDE3Njk2NTkzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    quote: "The audit trail and control features gave us confidence. It's not just automation—it's accountable, compliant automation.",
    name: "Jennifer Lavoie",
    role: "Operations Director",
    location: "Montreal, QC",
    rating: 5,
    image: "https://images.unsplash.com/photo-1631563020941-c0c6bc534b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMEFJJTIwaGVhbHRoY2FyZSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzY5NjU5MzE5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
];

export function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwbWVkaWNhbCUyMHN0YWZmJTIwdGVhbXxlbnwxfHx8fDE3Njk2NTkzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Healthcare Team"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A12] via-[#070A12]/98 to-[#070A12]"></div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/20 to-transparent z-[1]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px] z-[1]"></div>
      
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
              CUSTOMER STORIES
            </span>
          </div>
          <h2 className="text-white mb-6">
            Trusted by clinics across Canada
          </h2>
          <p className="text-lg text-[#B7C0D6] max-w-2xl mx-auto">
            Real results from healthcare organizations using SENTRIA to transform their operations.
          </p>
        </motion.div>

        {/* Video Testimonial Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1587557983735-f05198060b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsJTIwbWVkaWNhbCUyMHN0YWZmJTIwdGVhbXxlbnwxfHx8fDE3Njk2NTkzMjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Video Testimonial"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            {/* Play button */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
            </motion.div>

            {/* Video info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wide">
                      Video Testimonial
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  "SENTRIA transformed how we manage patient communications"
                </h3>
                <p className="text-[#B7C0D6]">
                  Dr. Michael Thompson, Family Practice Network - Toronto, ON
                </p>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </div>
        </motion.div>
        
        {/* Text Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                {/* Image header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/80 to-transparent"></div>
                  
                  {/* Rating stars */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                    ))}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <Quote className="w-8 h-8 text-primary/40 mb-4" />
                  
                  <p className="text-[#B7C0D6] leading-relaxed mb-6 flex-1">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="border-t border-white/10 pt-6">
                    <div className="font-semibold text-white mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#B7C0D6] mb-0.5">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-[#B7C0D6]/60">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
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
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-white/[0.05] to-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-sm text-[#B7C0D6]">Clinics trust SENTRIA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">96%</div>
                <div className="text-sm text-[#B7C0D6]">Customer satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">2M+</div>
                <div className="text-sm text-[#B7C0D6]">Calls handled</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-sm text-[#B7C0D6]">Average rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}