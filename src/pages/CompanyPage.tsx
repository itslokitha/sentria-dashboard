import { motion } from "motion/react";
import { Users, Target, Award, MapPin, Briefcase, Mail, Linkedin, ArrowRight, TrendingUp, Heart, Rocket, Globe, Zap, Code, Coffee, Monitor, Dumbbell, Plane, GraduationCap, DollarSign, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

const values = [
  {
    icon: Rocket,
    title: "Move Fast, Think Big",
    description: "We embrace bold ideas and ship quickly. Every team member has the autonomy to make impactful decisions.",
  },
  {
    icon: Users,
    title: "Customer Obsession",
    description: "Our clients' success is our success. We measure ourselves by the value we deliver to businesses worldwide.",
  },
  {
    icon: Heart,
    title: "Build with Empathy",
    description: "We create technology that respects users, protects privacy, and makes everyone's job easier.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "We invest in our people. Learning is built into our culture through mentorship, courses, and conferences.",
  },
  {
    icon: Globe,
    title: "Diverse & Inclusive",
    description: "Great ideas come from diverse perspectives. We're building a team that reflects the world we serve.",
  },
  {
    icon: Zap,
    title: "Ownership Mindset",
    description: "Everyone owns their work and its outcomes. We trust our team to do what's right for SENTRIA.",
  },
];

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    items: ["Top-of-market salaries", "Equity in a fast-growing company", "Performance bonuses", "Annual salary reviews"]
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    items: ["Comprehensive health insurance", "Mental health support", "Gym membership stipend", "Wellness days off"]
  },
  {
    icon: Monitor,
    title: "Work-Life Balance",
    items: ["Flexible remote work", "Unlimited PTO policy", "4-day work weeks (optional)", "No meeting Fridays"]
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    items: ["$3K annual learning budget", "Conference attendance", "Internal mentorship program", "Technical certifications"]
  },
  {
    icon: Plane,
    title: "Time Off & Travel",
    items: ["Unlimited vacation days", "Company retreats", "Sabbatical program (5 years)", "Travel stipend"]
  },
  {
    icon: Coffee,
    title: "Office Perks",
    items: ["Catered lunches", "Premium equipment", "Standing desks", "Team activities & events"]
  },
];

const openings = [
  {
    title: "Senior AI/ML Engineer",
    location: "Remote (North America)",
    type: "Full-time",
    department: "Engineering",
    description: "Build cutting-edge voice AI systems that handle millions of conversations daily.",
    skills: ["Python", "TensorFlow/PyTorch", "NLP", "Distributed Systems"]
  },
  {
    title: "Full-Stack Engineer",
    location: "Toronto, ON / Remote",
    type: "Full-time",
    department: "Engineering",
    description: "Create beautiful, scalable web applications that power our global platform.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"]
  },
  {
    title: "Product Manager - Voice AI",
    location: "Remote (Global)",
    type: "Full-time",
    department: "Product",
    description: "Define the future of AI-powered business communications across industries.",
    skills: ["Product Strategy", "User Research", "Data Analysis", "Stakeholder Management"]
  },
  {
    title: "Enterprise Sales Executive",
    location: "New York, NY / Remote",
    type: "Full-time",
    department: "Sales",
    description: "Close deals with Fortune 500 companies and scale our enterprise business.",
    skills: ["B2B SaaS Sales", "Enterprise Deals", "Relationship Building", "CRM Mastery"]
  },
  {
    title: "Customer Success Manager",
    location: "Remote (North America)",
    type: "Full-time",
    department: "Customer Success",
    description: "Ensure our clients achieve exceptional ROI and become SENTRIA advocates.",
    skills: ["Account Management", "Technical Aptitude", "Communication", "Problem Solving"]
  },
  {
    title: "Product Designer",
    location: "Vancouver, BC / Remote",
    type: "Full-time",
    department: "Design",
    description: "Design intuitive experiences that make complex AI feel simple and delightful.",
    skills: ["Figma", "UI/UX Design", "Prototyping", "Design Systems"]
  },
  {
    title: "DevOps Engineer",
    location: "Remote (Global)",
    type: "Full-time",
    department: "Engineering",
    description: "Build and maintain infrastructure that scales to billions of API calls.",
    skills: ["Kubernetes", "AWS/GCP", "CI/CD", "Monitoring"]
  },
  {
    title: "Technical Writer",
    location: "Remote (North America)",
    type: "Full-time",
    department: "Product",
    description: "Create world-class documentation that helps businesses succeed with SENTRIA.",
    skills: ["Technical Writing", "API Documentation", "Developer Advocacy", "Content Strategy"]
  },
];

const stats = [
  { value: "85+", label: "Team Members" },
  { value: "12", label: "Countries" },
  { value: "4.8/5", label: "Glassdoor Rating" },
  { value: "95%", label: "Employee Satisfaction" },
];

export function CompanyPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse"></div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
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
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                We're Hiring - Join the AI Revolution
              </span>
            </div>
            <h1 className="text-white mb-6 max-w-5xl mx-auto bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text">
              Build the Future of AI Voice Technology
            </h1>
            <p className="text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed mb-12">
              Join a fast-growing team of builders, thinkers, and innovators transforming how 
              businesses communicate with their customers worldwide.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#B7C0D6]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join SENTRIA */}
      <section className="py-24 relative">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Why Join SENTRIA?</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Work on cutting-edge AI technology while building a career that matters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Origin Story */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
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
                  alt="Acadia University Campus"
                  className="relative rounded-2xl w-full h-[500px] object-cover border border-white/10"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-white font-semibold">Wolfville, Nova Scotia, Canada</span>
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
                <span className="text-sm text-primary font-semibold">Our Origin Story</span>
              </div>
              <h2 className="text-white mb-6">From Dorm Room to Global Platform</h2>
              <div className="space-y-6 text-lg text-[#B7C0D6] leading-relaxed">
                <p>
                  In early 2024, three friends—<span className="text-white font-semibold">Lokitha Nilaweera, Denish Leninrajah, and Thevan Samarasinghe</span>—sat 
                  in a coffee shop near <span className="text-white font-semibold">Acadia University's campus in Wolfville, Nova Scotia, Canada</span>. 
                  They were frustrated by how businesses everywhere struggled with basic customer communication.
                </p>
                <p>
                  Lokitha studied computer science and was obsessed with AI. Denish came from a business background 
                  and saw the massive market opportunity. Thevan, an entrepreneurship major, knew how to turn ideas into 
                  scalable businesses. Together, they had <span className="text-white font-semibold">one bold vision: AI could solve this</span>.
                </p>
                <p>
                  That coffee shop conversation turned into late-night coding sessions in their university dorm room. 
                  They built their first voice AI prototype, testing it with a local business in Wolfville. 
                  The results? <span className="text-primary font-semibold text-xl">40% efficiency improvement</span> overnight.
                </p>
                <p>
                  Word spread fast across campus, then to businesses in Halifax, then across Canada. What started as 
                  three students' project became a full-fledged company. By the end of 2024, SENTRIA was serving 
                  500+ businesses. Today, we're a <span className="text-white font-semibold">global platform processing 14M+ conversations monthly 
                  across 12 industries</span>.
                </p>
                <p className="text-primary font-semibold text-xl border-l-4 border-primary pl-6">
                  From three university friends in Nova Scotia to 85+ team members serving 3,200+ businesses worldwide—all in under 2 years.
                </p>
                <p className="text-base text-[#B7C0D6]/80 italic">
                  "We built SENTRIA because we believe every business deserves access to enterprise-grade AI, 
                  not just Fortune 500 companies. That mission drives everything we do today." 
                  <span className="text-white not-italic">— Lokitha, Denish & Thevan</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-6">Benefits & Perks</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              We invest in our team with competitive compensation and world-class benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center shadow-lg">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{benefit.title}</h3>
                </div>
                <ul className="space-y-3">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-[#B7C0D6]">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-white mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-[#B7C0D6] mb-10 max-w-3xl mx-auto">
              Join a team that's transforming how 3,200+ businesses communicate. 
              Build AI that millions of people interact with every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white px-12 text-lg shadow-lg shadow-primary/50"
              >
                <Mail className="mr-2 w-5 h-5" />
                Send Your Resume
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/5 px-12 text-lg"
              >
                Learn About Our Culture
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}