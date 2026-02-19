import { motion } from "motion/react";
import { BookOpen, FileText, Video, Podcast, Download, ArrowRight, TrendingUp, Users, Calendar, Sparkles, X, Clock, User, CheckCircle, ExternalLink, Share2, BarChart3, Target, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

const resourceCategories = [
  { id: "all", label: "All Resources" },
  { id: "guides", label: "Implementation Guides" },
  { id: "case-studies", label: "Industry Case Studies" },
  { id: "research", label: "Research Reports" },
  { id: "whitepapers", label: "Whitepapers" },
];

const resources = [
  {
    type: "case-study",
    icon: FileText,
    title: "Healthcare AI Voice Automation: Multi-Practice Study",
    description: "Analysis of 800+ healthcare facilities implementing AI voice assistants for patient scheduling, reducing no-shows by 67% on average.",
    image: "https://images.unsplash.com/photo-1764885517847-79d62138cc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGhlYWx0aGNhcmUlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDEwODk5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "case-studies",
    date: "Feb 5, 2026",
    readTime: "12 min read",
    stats: { metric: "67%", label: "No-show reduction" },
    extendedDescription: "This comprehensive multi-facility study examines how 800+ medical practices across North America deployed AI voice assistants to handle patient appointment scheduling, confirmations, and reminders. The research reveals that automated voice systems successfully reduced patient no-show rates by an average of 67% through consistent multi-touchpoint reminder sequences, while simultaneously capturing 2,400+ additional appointments annually per practice from previously missed calls.",
    keyPoints: [
      "$847K average annual revenue increase per practice from captured missed calls",
      "67% reduction in patient no-show rates through automated reminder sequences",
      "4.8/5 average patient satisfaction score with AI voice interactions",
      "94% of calls answered in under 2 seconds compared to 18-minute human hold times",
      "24/7 availability enabling after-hours appointment booking and inquiry handling",
      "HIPAA-compliant implementations with end-to-end encryption across all platforms"
    ],
    author: "Dr. Rebecca Morrison, Healthcare Technology Research",
    company: "Institute for Healthcare Innovation",
    industry: "Healthcare",
    downloads: "4,782"
  },
  {
    type: "case-study",
    icon: FileText,
    title: "Retail Industry Voice AI Performance Analysis",
    description: "Cross-industry study of 1,200+ retail locations using AI voice for order tracking, returns, and customer service inquiries.",
    image: "https://images.unsplash.com/photo-1619496140817-ccc97b892d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMG1vZGVybiUyMHNob3BwaW5nfGVufDF8fHx8MTc3MDE3MjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "case-studies",
    date: "Feb 1, 2026",
    readTime: "10 min read",
    stats: { metric: "+73%", label: "Automation rate" },
    extendedDescription: "This industry-wide analysis examines 1,200+ retail locations that implemented AI voice assistants for customer service operations. The study reveals that voice AI successfully automated 73% of routine customer inquiries including order tracking, returns processing, product availability checks, and store hour inquiries. Retailers reported significant improvements in customer satisfaction, operational efficiency, and sales recovery, with the technology proving especially valuable during peak shopping periods like Black Friday and holiday seasons.",
    keyPoints: [
      "73% of routine customer inquiries automated without human intervention",
      "Average call handling time reduced from 8.5 minutes to 2.3 minutes",
      "$2.4M average annual sales recovery through proactive customer outreach",
      "92% customer satisfaction score with AI voice interactions",
      "Peak period handling without proportional staffing increases",
      "Multi-channel deployment across phone, web chat, and mobile applications"
    ],
    author: "Marcus Chen, Retail Analytics Director",
    company: "Global Retail Technology Consortium",
    industry: "Retail & E-commerce",
    downloads: "3,921"
  },
  {
    type: "case-study",
    icon: FileText,
    title: "Financial Services AI Voice Security & Compliance",
    description: "Banking industry analysis of PCI-compliant voice AI handling 145,000+ monthly account inquiries with voice biometrics.",
    image: "https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBiYW5raW5nJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMTcyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "case-studies",
    date: "Jan 28, 2026",
    readTime: "11 min read",
    stats: { metric: "-70%", label: "Call volume" },
    extendedDescription: "This banking sector study analyzes how regional banks and credit unions deployed secure, PCI-DSS compliant AI voice assistants with voice biometric authentication. Financial institutions successfully automated account balance inquiries, transaction history requests, fraud alerts, card activation, and branch appointment scheduling while maintaining 100% regulatory compliance. The technology proved particularly effective at reducing call center volumes during peak periods and eliminating long customer hold times.",
    keyPoints: [
      "70% reduction in incoming call volume to human agents within 90 days",
      "18-minute average hold times eliminated during peak banking hours",
      "145,000 automated account inquiries processed monthly per institution",
      "$1.9M average annual operational cost savings per financial institution",
      "94% customer satisfaction with AI voice banking interactions",
      "100% PCI-DSS compliance maintained with voice biometric security"
    ],
    author: "Jennifer Park, Banking Technology Analyst",
    company: "Financial Services Technology Council",
    industry: "Financial Services",
    downloads: "4,156"
  },
  {
    type: "whitepaper",
    icon: FileText,
    title: "2026 AI Voice Automation Industry Benchmark Report",
    description: "Comprehensive analysis of 14M+ AI voice conversations across 12 industries with performance metrics and ROI data.",
    image: "https://images.unsplash.com/photo-1569660424259-87e64a80f6fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwc2VydmVycyUyMHRlY2hub2xvZ3klMjBibHVlJTIwbGlnaHRzfGVufDF8fHx8MTc2OTY1OTMyMHww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "whitepapers",
    date: "Jan 22, 2026",
    readTime: "28 min read",
    stats: { metric: "14M+", label: "Conversations" },
    extendedDescription: "This comprehensive 2026 industry benchmark report analyzes performance data from over 14 million AI voice conversations across healthcare, finance, retail, hospitality, real estate, professional services, insurance, automotive, education, logistics, telecommunications, and construction sectors. The research provides unprecedented insights into accuracy rates, conversation completion metrics, customer satisfaction scores, operational efficiency improvements, and financial ROI across diverse use cases and deployment scales.",
    keyPoints: [
      "Industry accuracy benchmarks ranging from 91% to 97% across 12 sectors",
      "88% average conversation completion rate without human agent handoff",
      "Customer satisfaction scores averaging 4.6/5 across all industries analyzed",
      "83% average response time improvement compared to human-only operations",
      "Cost-per-conversation reductions of 60-85% depending on industry vertical",
      "Voice recognition accuracy across 23 languages and regional dialects"
    ],
    author: "AI Voice Technology Research Team",
    company: "International Institute for Conversational AI",
    industry: "Cross-Industry Research",
    downloads: "6,847"
  },
  {
    type: "whitepaper",
    icon: FileText,
    title: "ROI Analysis: Business Voice Automation Deployments",
    description: "Financial impact study of 3,200+ businesses implementing AI voice assistants with detailed cost-benefit analysis.",
    image: "https://images.unsplash.com/photo-1758876202980-0a28b744fb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZCUyMGdyYXBoc3xlbnwxfHx8fDE3Njk2NTkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "whitepapers",
    date: "Jan 18, 2026",
    readTime: "22 min read",
    stats: { metric: "$3.8M", label: "Avg. savings" },
    extendedDescription: "This extensive financial analysis examines ROI data from 3,200+ businesses across multiple industries that implemented AI voice automation systems over 18 months. The study reveals detailed cost savings breakdowns, efficiency improvements, customer retention impacts, and revenue growth metrics. Analysis includes implementation costs, ongoing operational expenses, productivity gains, and quantified business value across small, mid-market, and enterprise deployments.",
    keyPoints: [
      "$3.8M average annual cost savings per enterprise-scale deployment",
      "78% reduction in customer service operational expenses on average",
      "43% improvement in customer retention rates across industries",
      "4.2 month average payback period for mid-market implementations",
      "89% of organizations achieved or exceeded initial ROI projections",
      "Detailed industry-specific financial benchmarks and performance metrics"
    ],
    author: "Dr. Thomas Reynolds, Economics Research",
    company: "Business Technology Economics Lab",
    industry: "Financial Analysis",
    downloads: "5,429"
  },
  {
    type: "guide",
    icon: BookOpen,
    title: "Complete AI Voice Implementation Guide for Enterprises",
    description: "Step-by-step framework for planning, deploying, and scaling conversational AI across business operations.",
    image: "https://images.unsplash.com/photo-1700463108455-956c595bc97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlY29tbXVuaWNhdGlvbnMlMjB0ZWNobm9sb2d5JTIwbmV0d29ya3xlbnwxfHx8fDE3NzAxNzM2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "guides",
    date: "Jan 15, 2026",
    readTime: "18 min read",
    stats: { metric: "60+", label: "Pages" },
    extendedDescription: "This comprehensive 60-page implementation guide provides enterprise organizations with a complete framework for successfully deploying AI voice assistants. Covering strategic planning, use case identification, technical architecture, system integration, security compliance, change management, and performance optimization, this resource draws from thousands of real-world deployments across diverse industries and organizational scales.",
    keyPoints: [
      "Strategic framework for identifying high-ROI AI voice automation use cases",
      "Technical architecture patterns for enterprise system integration",
      "Security and compliance guidelines for regulated industries (HIPAA, PCI, GDPR)",
      "Change management strategies achieving 85%+ employee adoption rates",
      "Performance measurement frameworks and KPI tracking methodologies",
      "Industry-specific deployment playbooks for 12 major business sectors"
    ],
    author: "Enterprise AI Implementation Task Force",
    company: "Technology Leadership Council",
    industry: "Enterprise Technology",
    downloads: "7,234"
  },
  {
    type: "guide",
    icon: BookOpen,
    title: "Multi-Industry AI Voice Security & Compliance Guide",
    description: "Comprehensive security framework for AI voice systems in healthcare, finance, retail, and government sectors.",
    image: "https://images.unsplash.com/photo-1573209680076-bd7ec7007616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBzdXBwbHklMjBjaGFpbnxlbnwxfHx8fDE3NzAxMjQyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "guides",
    date: "Jan 10, 2026",
    readTime: "15 min read",
    stats: { metric: "SOC 2", label: "Standards" },
    extendedDescription: "This essential enterprise security guide provides comprehensive coverage of regulatory compliance and security requirements for AI voice implementations across highly regulated industries. Addressing GDPR, HIPAA, PCI-DSS, SOC 2, AIDA, CRTC, and PIPEDA frameworks, the guide includes practical implementation checklists, audit preparation guidance, encryption protocols, and real-world examples from successful deployments in healthcare, financial services, and government organizations.",
    keyPoints: [
      "Complete GDPR, HIPAA, PCI-DSS, and SOC 2 compliance frameworks",
      "End-to-end encryption and data privacy protection architectures",
      "Voice biometric authentication and multi-factor security protocols",
      "Audit trail logging and regulatory reporting requirements",
      "Incident response procedures for AI voice security events",
      "Industry-specific compliance requirements across 8 regulated sectors"
    ],
    author: "Cybersecurity Standards Committee",
    company: "International Cybersecurity Alliance",
    industry: "Security & Compliance",
    downloads: "4,891"
  },
  {
    type: "research",
    icon: BarChart3,
    title: "Customer Experience Impact: AI Voice vs. Traditional IVR",
    description: "Comparative study analyzing customer satisfaction, resolution rates, and experience metrics across 500+ deployments.",
    image: "https://images.unsplash.com/photo-1693585576669-e7700bf38484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaG9zcGl0YWxpdHl8ZW58MXx8fHwxNzcwMTE5NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "research",
    date: "Jan 5, 2026",
    readTime: "14 min read",
    stats: { metric: "4.6/5", label: "Avg. CSAT" },
    extendedDescription: "This comparative research study analyzes customer experience metrics from 500+ organizations that transitioned from traditional IVR systems to modern AI voice assistants. The research examines customer satisfaction scores, first-call resolution rates, average handle times, customer effort scores, and Net Promoter Scores (NPS) before and after AI voice implementation. Results demonstrate significant improvements across all customer experience dimensions.",
    keyPoints: [
      "Customer satisfaction increased from 3.2/5 to 4.6/5 on average post-implementation",
      "First-call resolution rates improved by 47% with AI voice automation",
      "Average customer effort score decreased by 61% compared to traditional IVR",
      "Net Promoter Score (NPS) improvements averaging +28 points",
      "Customer retention rates increased by 43% across all studied industries",
      "24/7 availability and multilingual support driving satisfaction gains"
    ],
    author: "Customer Experience Research Division",
    company: "Global CX Standards Institute",
    industry: "Customer Experience",
    downloads: "5,673"
  },
  {
    type: "case-study",
    icon: FileText,
    title: "Hospitality Sector: AI Concierge Performance Analysis",
    description: "Study of 200+ hotels implementing multilingual AI voice concierge services across 18 languages.",
    image: "https://images.unsplash.com/photo-1756435292384-1bf32eff7baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwbW9kZXJuJTIwaG9tZXxlbnwxfHx8fDE3NzAxNzIzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "case-studies",
    date: "Dec 28, 2025",
    readTime: "9 min read",
    stats: { metric: "97%", label: "Guest satisfaction" },
    extendedDescription: "This hospitality industry study examines 200+ hotels and resorts that deployed AI voice concierge services to handle guest requests, local recommendations, spa bookings, room service orders, and housekeeping requests. The research reveals that multilingual AI voice assistants successfully improved guest satisfaction scores from 83% to 97% while reducing front desk call volumes by 61% and generating additional revenue through intelligent upselling recommendations.",
    keyPoints: [
      "Guest satisfaction scores increased from 83% to 97% average",
      "47,000+ guest requests handled monthly across studied properties",
      "Seamless service delivery across 18 languages with cultural awareness",
      "61% reduction in front desk call volume, improving staff efficiency",
      "34% increase in ancillary bookings (spa, dining, activities) from AI suggestions",
      "$2.8M average additional annual revenue per hotel from intelligent upselling"
    ],
    author: "Hospitality Technology Research Group",
    company: "International Hotel & Resort Association",
    industry: "Hospitality",
    downloads: "3,847"
  },
  {
    type: "research",
    icon: BarChart3,
    title: "AI Voice Automation: Multi-Industry Productivity Impact",
    description: "Workforce productivity analysis across 2,500+ organizations measuring time savings and efficiency gains.",
    image: "https://images.unsplash.com/photo-1762279389045-110301edeecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjNuZXR3b3JrJTIwZGlnaXRhbHxlbnwxfHx8fDE3Njk2NTkzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "research",
    date: "Dec 22, 2025",
    readTime: "16 min read",
    stats: { metric: "81%", label: "Time saved" },
    extendedDescription: "This extensive workforce productivity study examines how 2,500+ organizations across healthcare, professional services, real estate, insurance, and other sectors achieved significant productivity improvements through AI voice automation. The research quantifies time savings in administrative tasks, analyzes reallocation of human resources to higher-value activities, and measures overall operational efficiency improvements across diverse business functions and organizational sizes.",
    keyPoints: [
      "81% average reduction in time spent on routine phone management tasks",
      "Administrative staff freed to focus on high-value patient/client interactions",
      "After-hours call handling without overtime staffing requirements",
      "Simultaneous handling of unlimited concurrent calls during peak periods",
      "Documentation accuracy improvements of 94% with automated transcription",
      "Employee satisfaction increased due to reduced repetitive task burden"
    ],
    author: "Workforce Productivity Research Institute",
    company: "Labor & Technology Economics Center",
    industry: "Workforce Analytics",
    downloads: "4,982"
  },
];

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);

  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(45,107,255,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.12),transparent_50%),linear-gradient(180deg,transparent,rgba(45,107,255,0.08),transparent)]"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Industry Research Hub
              </span>
            </div>
            <h1 className="text-white mb-6 max-w-4xl mx-auto text-3xl md:text-5xl lg:text-6xl">
              AI Voice Automation Industry Insights
            </h1>
            <p className="text-xl md:text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed">
              Research, case studies, and implementation data from thousands of AI voice deployments across all major industries worldwide.
            </p>
          </motion.div>

          {/* Featured Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: FileText, value: "14M+", label: "Conversations Analyzed" },
              { icon: Globe, value: "3,200+", label: "Organizations Studied" },
              { icon: Target, value: "12", label: "Industries Covered" },
              { icon: BarChart3, value: "$3.8M", label: "Avg. Annual Savings" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-primary/50 transition-all group"
              >
                <stat.icon className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#B7C0D6]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 sticky top-20 z-40 bg-[#070A12]/80 backdrop-blur-xl border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/50"
                    : "bg-white/5 text-[#B7C0D6] hover:bg-white/10 border border-white/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary/30 to-purple-500/30 backdrop-blur-xl border border-primary/30">
                        <span className="text-xs text-white font-semibold uppercase tracking-wide">
                          {resource.type.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                        <div className="text-xl font-bold text-primary">{resource.stats.metric}</div>
                        <div className="text-xs text-[#B7C0D6]">{resource.stats.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-xs text-[#B7C0D6]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{resource.date}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
                      {resource.title}
                    </h3>
                    <p className="text-base text-[#B7C0D6] mb-6 flex-1 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Resource Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedResource(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#0B1630] to-[#070A12] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Hero Image */}
            <div className="relative h-80 overflow-hidden rounded-t-3xl">
              <img 
                src={selectedResource.image}
                alt={selectedResource.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/50 to-transparent"></div>
              
              {/* Type Badge */}
              <div className="absolute top-6 left-6">
                <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-primary/40 to-purple-500/40 backdrop-blur-xl border border-primary/50">
                  <span className="text-sm text-white font-bold uppercase tracking-wide">
                    {selectedResource.type.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Stats Badge */}
              <div className="absolute top-6 right-6">
                <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="text-2xl font-bold text-primary">{selectedResource.stats.metric}</div>
                  <div className="text-xs text-[#B7C0D6]">{selectedResource.stats.label}</div>
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-white mb-2 leading-tight text-2xl md:text-4xl">
                  {selectedResource.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2 text-[#B7C0D6]">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm">{selectedResource.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#B7C0D6]">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">{selectedResource.industry}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-gradient-to-r from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">{selectedResource.author}</div>
                    <div className="text-sm text-[#B7C0D6]">{selectedResource.company}</div>
                  </div>
                </div>
              </div>

              {/* Extended Description */}
              <div className="mb-8">
                <h3 className="text-white mb-4 text-xl md:text-2xl">Overview</h3>
                <p className="text-lg text-[#B7C0D6] leading-relaxed">
                  {selectedResource.extendedDescription}
                </p>
              </div>

              {/* Key Points */}
              <div className="mb-10">
                <h3 className="text-white mb-6 text-xl md:text-2xl">Key Findings</h3>
                <div className="space-y-4">
                  {selectedResource.keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-base text-[#B7C0D6] leading-relaxed flex-1">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Related Resources CTA */}
              <div className="mt-10 p-6 bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="text-white font-bold">Explore More Industry Research</h4>
                </div>
                <p className="text-sm text-[#B7C0D6] mb-4">
                  Access our complete library of AI voice automation case studies, benchmark reports, and implementation guides.
                </p>
                <Button 
                  variant="ghost" 
                  className="text-primary hover:text-primary/80 hover:bg-primary/10 text-sm font-semibold"
                  onClick={() => setSelectedResource(null)}
                >
                  Browse All Resources →
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}