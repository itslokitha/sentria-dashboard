import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PhoneCall, Headphones, ShoppingCart, Building2 } from "lucide-react";

const useCases = [
  {
    icon: PhoneCall,
    title: "Customer Support",
    description: "Automate first-line support with AI agents that understand context and escalate complex issues seamlessly.",
    image: "https://images.unsplash.com/photo-1562851529-c370841f6536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2ljZSUyMGFzc2lzdGFudCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY5NjU2NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { reduction: "70%", metric: "Support costs" },
  },
  {
    icon: ShoppingCart,
    title: "Sales & Commerce",
    description: "Drive conversions with personalized product recommendations and 24/7 availability for customer inquiries.",
    image: "https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzY5NjIxOTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { reduction: "40%", metric: "Sales cycle" },
  },
  {
    icon: Headphones,
    title: "Virtual Assistants",
    description: "Deploy intelligent virtual assistants that handle scheduling, reminders, and complex task management.",
    image: "https://images.unsplash.com/photo-1760978632014-f799595497af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzY5NjU2NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { reduction: "5x", metric: "Productivity boost" },
  },
  {
    icon: Building2,
    title: "Enterprise Operations",
    description: "Streamline internal operations with voice-enabled workflows for HR, IT, and facility management.",
    image: "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdCUyMGRhcmt8ZW58MXx8fHwxNzY5NjU2NjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: { reduction: "60%", metric: "Process time" },
  },
];

export function UseCases() {
  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Powering <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From startups to Fortune 500 companies, Sentria adapts to your unique business needs.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <ImageWithFallback
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Stats */}
                <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold text-white">{useCase.stats.reduction}</div>
                  <div className="text-xs text-gray-400">{useCase.stats.metric}</div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 text-white">{useCase.title}</h3>
                <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
