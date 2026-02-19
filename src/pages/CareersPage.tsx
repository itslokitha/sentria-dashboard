import { motion } from "motion/react";
import { Users, Briefcase, Globe, Rocket, Heart, Zap, TrendingUp, Award, Code, MessageCircle, BarChart3, Sparkles, ArrowRight, MapPin, Clock, DollarSign, GraduationCap, Coffee, Laptop, Target } from "lucide-react";
import { Button } from "../components/ui/button";

const openPositions = [
  {
    title: "Senior AI/ML Engineer",
    department: "Engineering",
    location: "Remote (Canada)",
    type: "Full-time",
    description: "Lead development of our next-generation voice AI models and natural language processing systems.",
    icon: Code,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    title: "Product Manager - Enterprise",
    department: "Product",
    location: "Remote (North America)",
    type: "Full-time",
    description: "Drive product strategy and roadmap for our enterprise AI voice assistant platform.",
    icon: Target,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Help businesses maximize value from SENTRIA's AI voice solutions across multiple industries.",
    icon: MessageCircle,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    title: "Sales Development Representative",
    department: "Sales",
    location: "Remote (North America)",
    type: "Full-time",
    description: "Generate qualified leads and drive growth across our 12+ target industries.",
    icon: TrendingUp,
    gradient: "from-orange-500 to-red-600"
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote (Canada)",
    type: "Full-time",
    description: "Scale our infrastructure to support 14M+ monthly calls with 99.9% uptime.",
    icon: Zap,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote (Global)",
    type: "Full-time",
    description: "Create compelling content that showcases the power of AI voice automation.",
    icon: Sparkles,
    gradient: "from-violet-500 to-purple-600"
  }
];

const benefits = [
  {
    icon: Globe,
    title: "Remote-First Culture",
    description: "Work from anywhere. We're a global team spanning multiple time zones."
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Industry-leading salaries plus equity in a fast-growing AI company."
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision coverage for you and your family."
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "$2,000 annual budget for courses, conferences, and professional growth."
  },
  {
    icon: Coffee,
    title: "Flexible Schedule",
    description: "Choose your hours. We care about results, not when you're online."
  },
  {
    icon: Laptop,
    title: "Top-Tier Equipment",
    description: "Latest MacBook Pro, monitor, and all the tools you need to do your best work."
  },
  {
    icon: Rocket,
    title: "Growth Opportunities",
    description: "Fast-growing startup means rapid career advancement for top performers."
  },
  {
    icon: Users,
    title: "Amazing Team",
    description: "Work with talented people who are passionate about AI and innovation."
  }
];

const stats = [
  { label: "Team Members", value: "50+", icon: Users },
  { label: "Countries", value: "8", icon: Globe },
  { label: "Avg. Team Age", value: "28", icon: Award },
  { label: "Employee NPS", value: "92", icon: TrendingUp }
];

interface CareersPageProps {
  onNavigate: (page: string) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzAxODMzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Team Collaboration"
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
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                JOIN OUR TEAM
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              Build the Future of AI Voice Automation
            </h1>
            <p className="text-xl text-[#B7C0D6] mb-8 leading-relaxed">
              Join a fast-growing team that's transforming how 3,200+ businesses communicate. 
              From our start in a university dorm room to processing 14M+ calls monthly, we're just getting started.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                View Open Positions
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => onNavigate('about')}
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5"
              >
                Our Story
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4"
                >
                  <stat.icon className="w-6 h-6 text-primary mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-[#B7C0D6]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join SENTRIA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Why Join SENTRIA?</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              We're building something special. Here's what makes SENTRIA a great place to grow your career.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-[#B7C0D6] leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Open Positions</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              We're growing fast and looking for talented people to join our team. 
              All positions are remote-first.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${position.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <position.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs text-primary font-semibold">
                        {position.department}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-[#B7C0D6] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {position.location}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs text-[#B7C0D6] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[#B7C0D6] mb-4 leading-relaxed">{position.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/5 group/btn"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-semibold">Our Culture</span>
              </div>
              <h2 className="text-white mb-6">More Than Just a Job</h2>
              <div className="space-y-4 text-lg text-[#B7C0D6] leading-relaxed">
                <p>
                  At SENTRIA, we're not just building software—we're building a movement. 
                  A team of passionate innovators who believe AI should empower businesses, not replace humans.
                </p>
                <p>
                  We started in a university dorm room, and that scrappy, collaborative spirit 
                  still defines us today. We move fast, experiment constantly, and celebrate both 
                  wins and lessons learned.
                </p>
                <p className="text-white font-semibold">
                  Our values: Innovation First • Customer Success • Global Impact • Integrity & Trust
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <Button 
                  onClick={() => onNavigate('about')}
                  className="bg-primary hover:bg-primary/90 group"
                >
                  Learn Our Story
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Rocket, value: "2 years", label: "From Startup to Global" },
                { icon: Users, value: "3,200+", label: "Businesses Trust Us" },
                { icon: Globe, value: "12", label: "Industries Served" },
                { icon: TrendingUp, value: "14M+", label: "Monthly Calls" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#B7C0D6]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
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
            <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-white mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-[#B7C0D6] mb-10 max-w-3xl mx-auto">
              Join a team that's transforming business communication with AI. 
              We're looking for talented, passionate people who want to build the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-12 text-lg shadow-lg shadow-primary/50"
              >
                View Open Positions
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 px-12 text-lg"
              >
                Contact Recruiting Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
