import { motion } from "motion/react";
import { Handshake, Award, TrendingUp, Users, Target, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const partnerTypes = [
  {
    icon: Target,
    title: "Reseller Partners",
    description: "Sell SENTRIA to your clients and earn competitive margins on every deal",
    benefits: [
      "Up to 25% recurring revenue share",
      "Dedicated partner success manager",
      "Co-marketing opportunities",
      "Lead sharing program"
    ]
  },
  {
    icon: Zap,
    title: "Technology Partners",
    description: "Integrate SENTRIA with your platform to enhance value for mutual customers",
    benefits: [
      "Technical integration support",
      "Joint product roadmap planning",
      "Co-selling opportunities",
      "Marketplace listing priority"
    ]
  },
  {
    icon: Users,
    title: "Referral Partners",
    description: "Earn commissions by referring businesses to SENTRIA",
    benefits: [
      "15% commission on first year",
      "5% recurring commission thereafter",
      "Simple referral tracking dashboard",
      "No minimum requirements"
    ]
  },
  {
    icon: Award,
    title: "Agency Partners",
    description: "White-label SENTRIA for your agency clients with custom branding",
    benefits: [
      "White-label platform access",
      "Custom pricing tiers",
      "Priority technical support",
      "Dedicated implementation team"
    ]
  }
];

const partnerPerks = [
  {
    title: "Partner Portal Access",
    description: "Dedicated portal with sales tools, marketing assets, and real-time reporting"
  },
  {
    title: "Training & Certification",
    description: "Comprehensive training programs and certification paths for your team"
  },
  {
    title: "Co-Marketing Support",
    description: "Joint webinars, case studies, and marketing campaigns to drive growth"
  },
  {
    title: "Deal Registration",
    description: "Protect your deals and earn higher margins with our deal registration program"
  },
  {
    title: "Technical Support",
    description: "Priority access to technical resources and dedicated support team"
  },
  {
    title: "Partner Events",
    description: "Exclusive invitations to partner summits and networking events"
  }
];

const successStories = [
  {
    name: "TechFlow Solutions",
    type: "Technology Partner",
    result: "+300% Revenue Growth",
    quote: "Partnering with SENTRIA has opened up new revenue streams and strengthened our market position.",
    stats: { clients: "120+", revenue: "$2.4M" }
  },
  {
    name: "Digital Agency Pro",
    type: "Agency Partner",
    result: "40 New Clients",
    quote: "The white-label solution allows us to offer AI automation under our own brand seamlessly.",
    stats: { clients: "40+", revenue: "$850K" }
  },
  {
    name: "Business Advisors Inc",
    type: "Referral Partner",
    result: "$180K in Commissions",
    quote: "The referral program is straightforward and the commissions are industry-leading.",
    stats: { referrals: "75+", commissions: "$180K" }
  }
];

const partnerRequirements = [
  "Established business with proven track record",
  "Alignment with SENTRIA's values and mission",
  "Commitment to customer success",
  "Technical capability (for technology partners)",
  "Marketing and sales resources",
  "Willingness to invest in training"
];

export function PartnersPage() {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 rounded-full">
                <Handshake className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Partner Program
                </span>
              </div>
              <h1 className="mb-6 text-white leading-tight">
                Grow Your Business with SENTRIA
              </h1>
              <p className="text-2xl text-[#B7C0D6] leading-relaxed mb-8">
                Join our global partner ecosystem and unlock new revenue opportunities. Whether you're 
                a reseller, technology provider, agency, or referral partner—we have a program for you.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-[#B7C0D6]">Active Partners</div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">25%</div>
                  <div className="text-sm text-[#B7C0D6]">Revenue Share</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBhcnRuZXJzaGlwJTIwaGFuZHNoYWtlfGVufDF8fHx8MTc3MDEzOTQzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Business Partnership"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Partnership Programs</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Choose the partnership model that aligns with your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <partner.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{partner.title}</h3>
                <p className="text-[#B7C0D6] mb-6">{partner.description}</p>
                <div className="space-y-3">
                  {partner.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-[#B7C0D6]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Perks */}
      <section className="py-24 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Partner Benefits</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Comprehensive support to help you succeed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerPerks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                    <p className="text-[#B7C0D6] text-sm">{perk.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Partner Success Stories</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              See how our partners are growing with SENTRIA
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all"
              >
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">{story.result}</div>
                  <div className="text-sm text-[#B7C0D6]">{story.type}</div>
                </div>
                <p className="text-lg text-white mb-6 italic">"{story.quote}"</p>
                <div className="pt-6 border-t border-white/10">
                  <div className="font-bold text-white mb-3">{story.name}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-bold text-primary">{story.stats.clients}</div>
                      <div className="text-xs text-[#B7C0D6]">Clients</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{story.stats.revenue || story.stats.commissions}</div>
                      <div className="text-xs text-[#B7C0D6]">Revenue</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Partner Requirements</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              What we look for in our partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partnerRequirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-[#B7C0D6] text-lg">{req}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 text-center">
              <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-white mb-4">Ready to Partner with SENTRIA?</h2>
              <p className="text-xl text-[#B7C0D6] mb-8">
                Join our growing partner ecosystem and unlock new revenue opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-primary to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-colors">
                  Download Partner Guide
                </button>
              </div>
              <p className="text-sm text-[#B7C0D6] mt-6">
                Questions? Email partners@sentria.ai or call +1 (902) 555-0155
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
