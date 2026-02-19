import { motion } from "motion/react";
import { Plug, Zap, CheckCircle2, ArrowRight, Code, Cloud, Database, Workflow } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const integrationCategories = [
  {
    category: "CRM & Sales",
    icon: Database,
    integrations: [
      { name: "Salesforce", description: "Sync leads, contacts, and opportunities automatically", logo: "☁️" },
      { name: "HubSpot", description: "Integrate with your marketing and sales workflows", logo: "🟠" },
      { name: "Pipedrive", description: "Streamline your sales pipeline management", logo: "🔵" },
      { name: "Zoho CRM", description: "Connect customer data across platforms", logo: "🟡" }
    ]
  },
  {
    category: "Communication",
    icon: Zap,
    integrations: [
      { name: "Twilio", description: "Enhanced voice and SMS capabilities", logo: "📞" },
      { name: "Slack", description: "Real-time notifications and team collaboration", logo: "💬" },
      { name: "Microsoft Teams", description: "Seamless enterprise communication", logo: "👥" },
      { name: "WhatsApp Business", description: "Connect with customers on WhatsApp", logo: "💚" }
    ]
  },
  {
    category: "Calendars & Scheduling",
    icon: Workflow,
    integrations: [
      { name: "Google Calendar", description: "Automated appointment scheduling", logo: "📅" },
      { name: "Outlook Calendar", description: "Microsoft 365 calendar integration", logo: "📆" },
      { name: "Calendly", description: "Streamlined booking workflows", logo: "🗓️" },
      { name: "Acuity Scheduling", description: "Advanced scheduling capabilities", logo: "⏰" }
    ]
  },
  {
    category: "Business Tools",
    icon: Cloud,
    integrations: [
      { name: "Zapier", description: "Connect with 5,000+ apps", logo: "⚡" },
      { name: "Make (Integromat)", description: "Advanced automation workflows", logo: "🔧" },
      { name: "Google Workspace", description: "Full G Suite integration", logo: "🌐" },
      { name: "Microsoft 365", description: "Enterprise productivity suite", logo: "🏢" }
    ]
  },
  {
    category: "Healthcare",
    icon: Code,
    integrations: [
      { name: "Epic", description: "Leading EHR/EMR integration", logo: "🏥" },
      { name: "Cerner", description: "Healthcare information technology", logo: "⚕️" },
      { name: "Athenahealth", description: "Cloud-based healthcare services", logo: "🩺" },
      { name: "AdvancedMD", description: "Medical practice management", logo: "💊" }
    ]
  },
  {
    category: "Analytics & Data",
    icon: Database,
    integrations: [
      { name: "Google Analytics", description: "Track performance and insights", logo: "📊" },
      { name: "Tableau", description: "Advanced data visualization", logo: "📈" },
      { name: "Power BI", description: "Microsoft business intelligence", logo: "📉" },
      { name: "Mixpanel", description: "Product analytics platform", logo: "🎯" }
    ]
  }
];

const apiFeatures = [
  {
    icon: Code,
    title: "RESTful API",
    description: "Full-featured REST API with comprehensive documentation and SDKs for popular languages"
  },
  {
    icon: Zap,
    title: "Webhooks",
    description: "Real-time event notifications for call completions, appointments, and custom triggers"
  },
  {
    icon: Cloud,
    title: "GraphQL Support",
    description: "Flexible GraphQL API for advanced queries and efficient data fetching"
  },
  {
    icon: Workflow,
    title: "Bulk Operations",
    description: "Batch processing APIs for handling large-scale data imports and exports"
  }
];

const developmentTools = [
  "Comprehensive API Documentation",
  "SDKs for JavaScript, Python, Ruby, PHP",
  "Sandbox Environment for Testing",
  "Postman Collection & OpenAPI Spec",
  "Code Examples & Tutorials",
  "24/7 Developer Support"
];

export function IntegrationsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
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
                <Plug className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                  Integrations & API
                </span>
              </div>
              <h1 className="mb-6 text-white leading-tight">
                Connect SENTRIA to Your Tech Stack
              </h1>
              <p className="text-2xl text-[#B7C0D6] leading-relaxed mb-8">
                Seamless integrations with the tools you already use. Connect your CRM, calendar, 
                communication platforms, and more—or build custom integrations with our powerful API.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="group relative bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 rounded-2xl p-6 hover:border-primary/50 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <Database className="w-8 h-8 text-primary mb-3" />
                    <div className="text-4xl font-bold text-white mb-1">100+</div>
                    <div className="text-sm text-[#B7C0D6]">Native Integrations</div>
                  </div>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <Zap className="w-8 h-8 text-cyan-400 mb-3" />
                    <div className="text-4xl font-bold text-white mb-1">99.9%</div>
                    <div className="text-sm text-[#B7C0D6]">API Uptime</div>
                  </div>
                </div>
                
                <div className="group relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <Code className="w-8 h-8 text-purple-400 mb-3" />
                    <div className="text-4xl font-bold text-white mb-1">&lt;100ms</div>
                    <div className="text-sm text-[#B7C0D6]">API Response Time</div>
                  </div>
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
                  src="https://images.unsplash.com/photo-1758626042818-b05e9c91b84a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGludGVncmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzAxNzY5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Software Integration and Technology"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Popular Integrations</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Connect with the platforms you use every day
            </p>
          </motion.div>

          <div className="space-y-16">
            {integrationCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.integrations.map((integration, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all group cursor-pointer"
                    >
                      <div className="text-4xl mb-4">{integration.logo}</div>
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {integration.name}
                      </h4>
                      <p className="text-sm text-[#B7C0D6]">{integration.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-24 border-y border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Powerful API</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Build custom integrations with our developer-friendly API
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-primary/50 transition-all group text-center"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#B7C0D6]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Tools */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-white mb-4">Developer Resources</h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              Everything you need to build and deploy integrations quickly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {developmentTools.map((tool, index) => (
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
                  <span className="text-[#B7C0D6] text-lg">{tool}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              <Code className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-white mb-4">Ready to Integrate?</h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Access our API documentation, explore integration guides, or speak with our solutions team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    onNavigate?.('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}