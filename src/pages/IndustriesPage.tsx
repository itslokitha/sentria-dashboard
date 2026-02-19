import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  Stethoscope, DollarSign, ShoppingCart, Home, Hotel, Briefcase, 
  X, TrendingUp, Users, Clock, Phone, MessageCircle,
  Calendar, BarChart3, Shield, Zap, Car, GraduationCap, Truck, Wifi, HardHat, FileText,
  Sparkles, Globe, Target, ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";

const industries = [
  {
    icon: Stethoscope,
    name: "Healthcare",
    slug: "healthcare",
    tagline: "Revolutionize patient access and care coordination",
    description: "Transform patient experiences with AI voice assistants that handle appointment scheduling, prescription refills, insurance verification, and medical triage 24/7. Reduce no-shows by 45%, increase patient satisfaction, and free your staff to focus on care.",
    stats: { clients: "500+", calls: "2M+", satisfaction: "96%", efficiency: "45%" },
    image: "https://images.unsplash.com/photo-1764885517847-79d62138cc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMG1lZGljYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDE3MjM4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Calendar, title: "Appointment Scheduling", desc: "Intelligent booking with provider preferences, insurance verification, and automated reminders" },
      { icon: Phone, title: "After-Hours Triage", desc: "Medical protocol-trained AI routes urgent cases and handles routine inquiries 24/7" },
      { icon: MessageCircle, title: "Prescription Refills", desc: "Automated refill requests sent directly to pharmacy with patient verification" },
      { icon: Users, title: "Patient Follow-ups", desc: "Post-visit check-ins, satisfaction surveys, and care plan adherence monitoring" }
    ],
    benefits: [
      "98.7% appointment fulfillment rate",
      "60% reduction in front desk call volume",
      "45% decrease in no-show rates",
      "HIPAA compliant with end-to-end encryption"
    ],
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: DollarSign,
    name: "Financial Services",
    slug: "finance",
    tagline: "Secure, compliant banking automation",
    description: "Deploy enterprise-grade AI voice solutions for banks, credit unions, and insurance companies. Handle account inquiries, fraud alerts, loan applications, and payment processing with bank-level security. Reduce call center costs by 70% while improving customer satisfaction.",
    stats: { clients: "250+", calls: "1.5M+", satisfaction: "94%", efficiency: "70%" },
    image: "https://images.unsplash.com/photo-1571715268998-d6e79bed5fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBiYW5raW5nJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcwMTcyMzgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Shield, title: "Fraud Detection", desc: "Real-time alerts with multi-factor voice authentication and transaction verification" },
      { icon: Phone, title: "Account Inquiries", desc: "Balance checks, transaction history, and account management available 24/7" },
      { icon: BarChart3, title: "Loan Applications", desc: "Pre-qualification screening, document collection, and application status updates" },
      { icon: MessageCircle, title: "Payment Processing", desc: "Secure voice-activated payments, bill pay setup, and payment plan management" }
    ],
    benefits: [
      "PCI DSS Level 1 certified infrastructure",
      "70% reduction in call center operating costs",
      "Voice biometric authentication in 40+ languages",
      "99.99% uptime with disaster recovery"
    ],
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    icon: ShoppingCart,
    name: "Retail & E-commerce",
    slug: "retail",
    tagline: "24/7 customer support that drives sales",
    description: "Power your retail operations with AI that never sleeps. Handle order status inquiries, product recommendations, returns processing, and customer support across all channels. Increase conversion rates by 35% and reduce cart abandonment with proactive voice engagement.",
    stats: { clients: "800+", calls: "3M+", satisfaction: "95%", efficiency: "35%" },
    image: "https://images.unsplash.com/photo-1619496140817-ccc97b892d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBzdG9yZSUyMG1vZGVybiUyMHNob3BwaW5nfGVufDF8fHx8MTc3MDE3MjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Phone, title: "Order Tracking", desc: "Real-time delivery updates, shipping confirmations, and proactive delay notifications" },
      { icon: MessageCircle, title: "Product Recommendations", desc: "AI-powered shopping assistance with personalized suggestions based on preferences" },
      { icon: Calendar, title: "Returns & Exchanges", desc: "Automated return label generation, refund processing, and exchange coordination" },
      { icon: Users, title: "Loyalty Programs", desc: "Points balance inquiries, rewards redemption, and exclusive offer notifications" }
    ],
    benefits: [
      "35% increase in conversion rates",
      "50% reduction in cart abandonment",
      "Multilingual support for global customers",
      "Seamless integration with Shopify, WooCommerce, Magento"
    ],
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: Home,
    name: "Real Estate",
    slug: "realestate",
    tagline: "Qualify leads and book showings automatically",
    description: "Transform property inquiries into booked showings with AI agents that qualify leads, schedule tours, answer property questions, and follow up with prospects. Increase showing conversion by 40% and give agents more time to close deals instead of managing schedules.",
    stats: { clients: "300+", calls: "800K+", satisfaction: "93%", efficiency: "40%" },
    image: "https://images.unsplash.com/photo-1756435292384-1bf32eff7baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlJTIwbW9kZXJuJTIwaG9tZXxlbnwxfHx8fDE3NzAxNzIzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Phone, title: "Property Inquiries", desc: "Detailed property information, pricing, availability, and neighborhood details on demand" },
      { icon: Calendar, title: "Showing Scheduler", desc: "Intelligent calendar management with agent availability and property access coordination" },
      { icon: Users, title: "Lead Qualification", desc: "Budget verification, timeline assessment, and mortgage pre-approval status collection" },
      { icon: MessageCircle, title: "Virtual Tours", desc: "Schedule and coordinate virtual property tours with video links and follow-ups" }
    ],
    benefits: [
      "40% higher showing-to-offer conversion",
      "3x more qualified leads per agent",
      "Automated follow-ups increase engagement by 65%",
      "Integration with MLS, Zillow, and major CRMs"
    ],
    gradient: "from-orange-500 to-red-600"
  },
  {
    icon: Hotel,
    name: "Hospitality",
    slug: "hospitality",
    tagline: "Elevate guest experiences with AI concierge",
    description: "Deliver exceptional guest experiences with AI-powered reservations, room service, concierge services, and guest support. Handle booking modifications, special requests, and local recommendations in 40+ languages. Increase direct bookings by 30% and guest satisfaction scores.",
    stats: { clients: "400+", calls: "1.2M+", satisfaction: "97%", efficiency: "30%" },
    image: "https://images.unsplash.com/photo-1693585576669-e7700bf38484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwaG9zcGl0YWxpdHl8ZW58MXx8fHwxNzcwMTE5NDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Calendar, title: "Reservations", desc: "Real-time booking, room upgrades, and special occasion arrangements with preferences" },
      { icon: MessageCircle, title: "Guest Services", desc: "Wake-up calls, housekeeping requests, maintenance issues, and amenity information" },
      { icon: Phone, title: "Room Service", desc: "Menu ordering, dietary accommodation, and delivery coordination with kitchen systems" },
      { icon: Users, title: "Concierge", desc: "Restaurant reservations, activity booking, transportation, and local recommendations" }
    ],
    benefits: [
      "30% increase in direct bookings (lower OTA fees)",
      "97% guest satisfaction with AI interactions",
      "Multilingual support for international guests",
      "Integration with Opera, Protel, and major PMS systems"
    ],
    gradient: "from-amber-500 to-yellow-600"
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    slug: "professional",
    tagline: "Streamline client intake and scheduling",
    description: "Optimize operations for law firms, accounting practices, consulting agencies, and professional services. Automate client intake, consultation booking, document requests, and follow-ups. Increase billable hours by 25% by reducing administrative overhead and missed opportunities.",
    stats: { clients: "350+", calls: "900K+", satisfaction: "92%", efficiency: "25%" },
    image: "https://images.unsplash.com/photo-1758520144587-3ac9072573c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBvZmZpY2UlMjBidXNpbmVzcyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzAxNzIzODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Users, title: "Client Intake", desc: "Structured information collection, conflict checks, and engagement letter coordination" },
      { icon: Calendar, title: "Consultation Booking", desc: "Calendar synchronization with attorney availability and meeting room coordination" },
      { icon: MessageCircle, title: "Document Requests", desc: "Automated document collection, secure upload links, and completion reminders" },
      { icon: Phone, title: "Follow-ups", desc: "Case status updates, billing inquiries, and appointment reminders" }
    ],
    benefits: [
      "25% increase in billable hours captured",
      "60% faster client onboarding process",
      "Automated conflict checks and compliance tracking",
      "Integration with Clio, MyCase, and practice management tools"
    ],
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    icon: Shield,
    name: "Insurance",
    slug: "insurance",
    tagline: "Accelerate claims and policy management",
    description: "Streamline insurance operations with AI that handles policy inquiries, claims intake, quote generation, and renewal reminders. Reduce claims processing time by 55% and improve policyholder satisfaction with instant 24/7 support across life, health, auto, and property insurance.",
    stats: { clients: "180+", calls: "950K+", satisfaction: "93%", efficiency: "55%" },
    image: "https://images.unsplash.com/photo-1642522029686-5485ea7e6042?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBhZ2VudCUyMG9mZmljZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzAxNzM2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: FileText, title: "Claims Processing", desc: "FNOL intake, damage assessment, document collection, and claim status updates" },
      { icon: Phone, title: "Policy Management", desc: "Coverage questions, policy changes, beneficiary updates, and renewal processing" },
      { icon: BarChart3, title: "Quote Generation", desc: "Instant quotes for auto, home, life insurance with underwriting pre-screening" },
      { icon: MessageCircle, title: "Premium Reminders", desc: "Payment reminders, grace period alerts, and automated payment plan setup" }
    ],
    benefits: [
      "55% faster claims processing time",
      "40% reduction in call abandonment rate",
      "Automated FNOL with 24/7 availability",
      "Integration with Guidewire, Duck Creek, Applied Epic"
    ],
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: Car,
    name: "Automotive",
    slug: "automotive",
    tagline: "Drive sales with intelligent lead engagement",
    description: "Transform automotive dealerships with AI that qualifies leads, schedules test drives, answers vehicle questions, and manages service appointments. Increase showroom visits by 45% and service bay utilization while giving sales teams more time for in-person closing.",
    stats: { clients: "220+", calls: "1.1M+", satisfaction: "94%", efficiency: "45%" },
    image: "https://images.unsplash.com/photo-1643142314913-0cf633d9bbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwYXV0b21vdGl2ZSUyMHNob3dyb29tfGVufDF8fHx8MTc3MDEzNjk0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Calendar, title: "Test Drive Booking", desc: "Instant scheduling with vehicle availability, trade-in assessment, and sales rep assignment" },
      { icon: Phone, title: "Vehicle Inquiries", desc: "Detailed specs, pricing, financing options, and inventory availability across locations" },
      { icon: Users, title: "Service Scheduling", desc: "Maintenance appointments, recall notices, and loaner vehicle coordination" },
      { icon: MessageCircle, title: "Lead Follow-up", desc: "Post-visit engagement, financing pre-approval, and promotional offer delivery" }
    ],
    benefits: [
      "45% increase in test drive bookings",
      "3x faster lead response time",
      "85% service bay utilization improvement",
      "Integration with CDK, Reynolds & Reynolds, DealerSocket"
    ],
    gradient: "from-red-500 to-orange-600"
  },
  {
    icon: GraduationCap,
    name: "Education",
    slug: "education",
    tagline: "Enhance enrollment and student support",
    description: "Modernize educational institutions with AI that handles admissions inquiries, course enrollment, campus tours, and student services. Support universities, K-12 schools, and training centers with multilingual assistance that increases enrollment by 38% and reduces administrative burden.",
    stats: { clients: "290+", calls: "780K+", satisfaction: "95%", efficiency: "38%" },
    image: "https://images.unsplash.com/photo-1764720573370-5008f1ccc9fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzcwMTczNjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Users, title: "Admissions Support", desc: "Application status, program requirements, financial aid info, and campus tour scheduling" },
      { icon: Calendar, title: "Course Registration", desc: "Class availability, prerequisite checks, schedule conflicts, and waitlist management" },
      { icon: Phone, title: "Student Services", desc: "Housing inquiries, parking permits, transcript requests, and IT support routing" },
      { icon: MessageCircle, title: "Parent Communication", desc: "Tuition payment reminders, event notifications, and emergency alert distribution" }
    ],
    benefits: [
      "38% increase in completed applications",
      "24/7 multilingual support for international students",
      "70% reduction in administrative call volume",
      "Integration with Blackboard, Canvas, Ellucian Banner"
    ],
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Truck,
    name: "Logistics & Supply Chain",
    slug: "logistics",
    tagline: "Optimize delivery and shipment tracking",
    description: "Streamline logistics operations with AI that manages shipment tracking, delivery scheduling, carrier coordination, and customer notifications. Reduce missed deliveries by 42% and improve on-time performance with proactive communication across freight, parcel, and last-mile delivery.",
    stats: { clients: "160+", calls: "1.8M+", satisfaction: "91%", efficiency: "42%" },
    image: "https://images.unsplash.com/photo-1573209680076-bd7ec7007616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBzdXBwbHklMjBjaGFpbnxlbnwxfHx8fDE3NzAxMjQyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Phone, title: "Shipment Tracking", desc: "Real-time location updates, ETA calculations, and proactive delay notifications" },
      { icon: Calendar, title: "Delivery Scheduling", desc: "Time window coordination, address verification, and special instruction collection" },
      { icon: MessageCircle, title: "Customer Updates", desc: "Automated SMS/voice notifications for pickup, in-transit, and delivery milestones" },
      { icon: Users, title: "Carrier Coordination", desc: "Route optimization, proof of delivery, and exception handling with dispatch teams" }
    ],
    benefits: [
      "42% reduction in missed delivery attempts",
      "30% fewer 'where is my order' calls",
      "Real-time integration with TMS and WMS systems",
      "Support for FedEx, UPS, DHL, and regional carriers"
    ],
    gradient: "from-sky-500 to-blue-600"
  },
  {
    icon: Wifi,
    name: "Telecommunications",
    slug: "telecommunications",
    tagline: "Automate technical support and billing",
    description: "Transform telecom customer service with AI that handles technical support, billing inquiries, plan changes, and service activation. Reduce call center costs by 65% while maintaining high satisfaction across mobile, internet, and cable service providers.",
    stats: { clients: "140+", calls: "2.2M+", satisfaction: "89%", efficiency: "65%" },
    image: "https://images.unsplash.com/photo-1700463108455-956c595bc97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxlY29tbXVuaWNhdGlvbnMlMjB0ZWNobm9sb2d5JTIwbmV0d29ya3xlbnwxfHx8fDE3NzAxNzM2MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Phone, title: "Technical Support", desc: "Troubleshooting guides, service outage updates, router resets, and ticket escalation" },
      { icon: BarChart3, title: "Billing & Payments", desc: "Bill explanations, payment processing, dispute resolution, and payment plan setup" },
      { icon: MessageCircle, title: "Plan Management", desc: "Upgrade/downgrade options, add-on services, contract renewals, and feature activation" },
      { icon: Users, title: "New Activations", desc: "Number porting, SIM activation, device setup assistance, and service provisioning" }
    ],
    benefits: [
      "65% reduction in call center operating costs",
      "First-call resolution rate of 78%",
      "Automated outage notifications to affected customers",
      "Integration with OSS/BSS systems and CRM platforms"
    ],
    gradient: "from-violet-500 to-purple-600"
  },
  {
    icon: HardHat,
    name: "Construction",
    slug: "construction",
    tagline: "Streamline project coordination and client updates",
    description: "Modernize construction operations with AI that manages client inquiries, subcontractor coordination, material orders, and project status updates. Reduce project delays by 35% and improve client satisfaction with proactive communication for contractors, builders, and developers.",
    stats: { clients: "130+", calls: "520K+", satisfaction: "90%", efficiency: "35%" },
    image: "https://images.unsplash.com/photo-1625470496744-a01bf36a262f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMHNpdGUlMjBtYW5hZ2VtZW50fGVufDF8fHx8MTc3MDE3MzYzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    useCases: [
      { icon: Calendar, title: "Project Scheduling", desc: "Milestone tracking, inspection coordination, permit status, and timeline updates" },
      { icon: Phone, title: "Client Communication", desc: "Progress updates, change order discussions, budget reviews, and walkthrough scheduling" },
      { icon: Users, title: "Subcontractor Coordination", desc: "Work assignment, material delivery scheduling, and site access management" },
      { icon: MessageCircle, title: "Material Management", desc: "Supplier inquiries, delivery tracking, inventory checks, and reorder automation" }
    ],
    benefits: [
      "35% reduction in project communication delays",
      "Automated daily progress reports to stakeholders",
      "Real-time change order processing",
      "Integration with Procore, Buildertrend, CoConstruct"
    ],
    gradient: "from-yellow-500 to-amber-600"
  }
];

interface IndustriesPageProps {
  onNavigate: (page: string) => void;
}

export function IndustriesPage({ onNavigate }: IndustriesPageProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);
  const [filter, setFilter] = useState<string>("all");

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero with Animated Background */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                12 Industries
              </span>
            </div>
            <h1 className="text-white mb-6 max-w-5xl mx-auto bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text">
              Industry-Specific AI Voice Solutions
            </h1>
            <p className="text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed">
              Purpose-built voice AI technology designed for your industry's unique challenges. 
              Deployed globally, trusted by thousands.
            </p>
          </motion.div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-20">
            {[
              { icon: Target, label: "All Industries", value: "All Industries" },
              { icon: Clock, label: "High Volume", value: "High Volume" },
              { icon: TrendingUp, label: "Compliance-First", value: "Compliance-First" },
              { icon: Globe, label: "24/7 Support", value: "24/7 Support" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center hover:border-primary/50 transition-all group"
              >
                <stat.icon className="w-8 h-8 text-primary mb-2 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="pb-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedIndustry(industry)}
                className="group relative cursor-pointer"
              >
                {/* Card */}
                <div className="relative h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-primary/50 transition-all duration-500">
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img 
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                    
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${industry.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6">
                    {/* Icon */}
                    <div className="mb-auto">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500`}>
                        <industry.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary group-hover:bg-clip-text transition-all duration-300">
                        {industry.name}
                      </h3>
                      <p className="text-sm text-[#B7C0D6] line-clamp-2">
                        {industry.tagline}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${industry.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedIndustry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0B1630] to-[#070A12] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndustry(null)}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              {/* Header with Image */}
              <div className="relative h-56 md:h-80 overflow-hidden">
                <img 
                  src={selectedIndustry.image}
                  alt={selectedIndustry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1630] via-black/50 to-transparent"></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedIndustry.gradient} opacity-20 md:opacity-10`}></div>
                
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                  <div className={`inline-flex items-center gap-2 md:gap-3 mb-2 md:mb-4 px-3 md:px-6 py-1.5 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r ${selectedIndustry.gradient} shadow-lg`}>
                    <selectedIndustry.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    <span className="font-semibold text-sm md:text-lg text-white">{selectedIndustry.name}</span>
                  </div>
                  <h2 className="text-white text-xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 leading-tight">{selectedIndustry.tagline}</h2>
                  <p className="text-sm md:text-lg lg:text-xl text-[#B7C0D6] max-w-3xl leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-none">{selectedIndustry.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-8">
                {/* Use Cases */}
                <div className="mb-8 md:mb-12">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">Key Capabilities</h3>
                  <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    {selectedIndustry.useCases.map((useCase, i) => (
                      <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-4 md:p-6 hover:border-primary/50 transition-colors">
                        <div className="flex items-start gap-3 md:gap-4">
                          <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${selectedIndustry.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <useCase.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                          </div>
                          <div>
                            <div className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">{useCase.title}</div>
                            <div className="text-sm md:text-base text-[#B7C0D6]">{useCase.desc}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Button 
                    onClick={() => {
                      setSelectedIndustry(null);
                      onNavigate(selectedIndustry.slug);
                    }}
                    size="lg"
                    className={`flex-1 bg-gradient-to-r ${selectedIndustry.gradient} hover:opacity-90 text-white px-6 md:px-10 text-base md:text-lg py-3 md:py-4 group shadow-lg`}
                  >
                    Explore {selectedIndustry.name} Solutions
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-6 text-5xl md:text-6xl lg:text-7xl">Ready to Transform Your Industry?</h2>
            <p className="text-xl text-[#B7C0D6] mb-10 max-w-3xl mx-auto">
              Experience the power of AI voice automation designed specifically for your sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('contact')}
                size="lg" 
                className="bg-gradient-to-r from-[#2D6BFF] to-[#1E4FCC] hover:opacity-90 px-12 text-lg"
              >
                Get Started Today
              </Button>
              {/* Removed Try Emily button */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}