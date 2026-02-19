import { motion } from "motion/react";
import { Users, Lightbulb, Rocket, Heart, Target, Globe, MapPin, GraduationCap, Coffee, Code, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

const founders = [
  {
    name: "Lokitha Nilaweera",
    role: "CEO & Co-Founder",
    bio: "Computer Science major with a passion for AI and natural language processing. Led the technical vision from day one.",
    image: "https://images.unsplash.com/photo-1758520144587-3ac9072573c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzAxNzIzODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    name: "Denish Leninrajah",
    role: "CTO & Co-Founder",
    bio: "Business major turned tech entrepreneur. Focused on scaling operations and building enterprise partnerships.",
    image: "https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBiYW5raW5nJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMTcyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    name: "Thevan Samarasinghe",
    role: "CPO & Co-Founder",
    bio: "Entrepreneurship major with expertise in scaling startups and building innovative business models. Drives product strategy and growth.",
    image: "https://images.unsplash.com/photo-1619496140817-ccc97b892d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMG1vZGVybiUyMHNob3BwaW5nfGVufDF8fHx8MTc3MDE3MjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-emerald-500 to-teal-600"
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We challenge the status quo and constantly push the boundaries of what's possible with AI voice technology.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description: "Our clients' growth is our growth. We measure success by the value we deliver to businesses worldwide.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "From local businesses to global enterprises, we're democratizing access to enterprise-grade AI.",
  },
  {
    icon: Heart,
    title: "Integrity & Trust",
    description: "We build with transparency, maintain the highest security standards, and earn trust every single day.",
  },
];

const timeline = [
  { 
    year: "2024", 
    quarter: "Q1",
    event: "The Beginning", 
    description: "Three friends from Acadia University in Wolfville, Nova Scotia had an idea over coffee: what if AI could handle business communications?",
    metric: "3 founders",
    color: "from-cyan-500 to-blue-600"
  },
  { 
    year: "2024", 
    quarter: "Q2",
    event: "First Prototype", 
    description: "Built initial voice AI system in a campus dorm room. First test with a local business showed 40% efficiency improvement.",
    metric: "1 client",
    color: "from-purple-500 to-pink-600"
  },
  { 
    year: "2024", 
    quarter: "Q3",
    event: "Product Launch", 
    description: "Officially launched SENTRIA platform. Expanded from Nova Scotia to serve businesses across Canada.",
    metric: "50+ clients",
    color: "from-emerald-500 to-teal-600"
  },
  { 
    year: "2024", 
    quarter: "Q4",
    event: "Multi-Industry Expansion", 
    description: "Added support for 12 industries. Businesses in healthcare, finance, retail, and more started seeing results.",
    metric: "500+ clients",
    color: "from-orange-500 to-red-600"
  },
  { 
    year: "2025", 
    quarter: "Q1",
    event: "Global Expansion", 
    description: "Crossed borders into international markets. Added multi-language support and compliance for multiple regions.",
    metric: "1,500+ clients",
    color: "from-blue-500 to-indigo-600"
  },
  { 
    year: "2025", 
    quarter: "Q4",
    event: "Enterprise Scale", 
    description: "Major enterprise partnerships signed. Platform now handling millions of conversations monthly.",
    metric: "3,200+ clients",
    color: "from-violet-500 to-purple-600"
  },
  { 
    year: "2026", 
    quarter: "Q1",
    event: "Today & Beyond", 
    description: "Serving 3,200+ businesses globally across 12 industries. Processing 14M+ calls with 93.5% satisfaction.",
    metric: "14M+ calls/month",
    color: "from-primary to-purple-500"
  },
];

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1764307465084-bf5ba6ffa9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1bml2ZXJzaXR5JTIwY2FtcHVzJTIwdGVjaG5vbG9neSUyMGlubm92YXRpb258ZW58MXx8fHwxNzcwMTgzMTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="University Innovation"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/50 via-[#070A12]/70 to-[#070A12]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D6BFF]/5 to-transparent"></div>
          
          {/* Floating Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Founded at Acadia University, 2024
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              From Dorm Room to Global AI Platform
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Three friends from Acadia University in Nova Scotia built SENTRIA with a simple mission: 
              make enterprise-grade AI voice assistants accessible to businesses everywhere.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => onNavigate('emily')}
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5"
              >
                Try Meet Emily
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1758520144587-3ac9072573c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzAxNzIzODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Acadia University"
                  className="relative rounded-2xl w-full h-[500px] object-cover border border-white/10"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-white font-semibold">Wolfville, Nova Scotia</span>
                  </div>
                  <p className="text-sm text-[#B7C0D6]">Where it all began - Acadia University, 2024</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Coffee className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-semibold">The Origin Story</span>
              </div>
              <h2 className="text-white mb-6">It Started with a Conversation</h2>
              <div className="space-y-6 text-lg text-[#B7C0D6] leading-relaxed">
                <p>
                  In early 2024, three friends sat in a coffee shop near Acadia University's campus, 
                  frustrated by how businesses were struggling with basic customer communication. 
                  Denish Leninrajah, Lokitha Nilaweera, and Thevan Samarasinghe had different backgrounds—business, IT, and entrepreneurship—but 
                  shared one vision: <span className="text-white font-semibold">AI could solve this</span>.
                </p>
                <p>
                  That conversation turned into late-night coding sessions in their dorm room. 
                  They built their first prototype using cutting-edge voice AI technology, testing it 
                  with a local business in Wolfville. The results? <span className="text-white font-semibold">40% efficiency improvement</span> overnight.
                </p>
                <p>
                  Word spread fast. What started as a school project became a full-fledged company. 
                  By the end of 2024, SENTRIA had grown from a local solution to a trusted platform. Today, we're a global platform 
                  processing millions of conversations across 12 industries.
                </p>
                <p className="text-primary font-semibold text-xl">
                  From three students in Nova Scotia to a worldwide AI platform—all in under 2 years.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Our Core Values</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              The principles that guide everything we build and every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-base text-[#B7C0D6] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-white mb-6">Join Our Journey</h2>
            <p className="text-xl text-[#B7C0D6] mb-10 max-w-3xl mx-auto">
              We started in a dorm room. Today, we're transforming how 3,200+ businesses communicate. 
              Want to be part of the next chapter?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-12 text-lg shadow-lg shadow-primary/50"
              >
                Start Your Journey
              </Button>
              <Button 
                onClick={() => onNavigate('emily')}
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 px-12 text-lg"
              >
                Try Meet Emily
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}