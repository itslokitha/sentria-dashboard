import { motion } from "motion/react";
import { Check, Sparkles, Building2, Globe, Zap, Phone, MessageSquare, Calendar, BarChart3, Shield, Users, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState } from "react";

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [currency, setCurrency] = useState<'USD' | 'CAD' | 'GBP' | 'EUR'>('USD');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [clickedTier, setClickedTier] = useState<string | null>(null);

  // Currency conversion rates (base USD)
  const conversionRates = {
    USD: 1,
    CAD: 1.38,
    GBP: 0.79,
    EUR: 0.93
  };

  const currencySymbols = {
    USD: '$',
    CAD: 'CA$',
    GBP: '£',
    EUR: '€'
  };

  // Function to convert price
  const convertPrice = (usdPrice: string): string => {
    if (usdPrice === 'Custom') return 'Custom';
    const numericPrice = parseInt(usdPrice.replace('$', ''));
    const converted = Math.round(numericPrice * conversionRates[currency]);
    return `${currencySymbols[currency]}${converted}`;
  };

  // Function to get annual price (20% discount)
  const getAnnualPrice = (usdPrice: string): string => {
    if (usdPrice === 'Custom') return 'Custom';
    const numericPrice = parseInt(usdPrice.replace('$', ''));
    const discountedPrice = Math.round(numericPrice * 0.8); // 20% discount
    const converted = Math.round(discountedPrice * conversionRates[currency]);
    return `${currencySymbols[currency]}${converted}`;
  };

  // Function to get full annual billing amount (12 months with 20% discount)
  const getFullAnnualBilling = (usdPrice: string): string => {
    if (usdPrice === 'Custom') return 'Custom';
    const numericPrice = parseInt(usdPrice.replace('$', ''));
    const annualTotal = Math.round(numericPrice * 12 * 0.8); // 12 months with 20% discount
    const converted = Math.round(annualTotal * conversionRates[currency]);
    return `${currencySymbols[currency]}${converted.toLocaleString()}`;
  };

  // Handle button click with delay for glow effect
  const handleButtonClick = (tierName: string) => {
    setClickedTier(tierName);
    setTimeout(() => {
      onNavigate('contact');
    }, 400); // Delay navigation to show the glow effect
  };

  const pricingTiers = [
    {
      name: "Starter",
      price: "$179",
      period: "per month",
      minutes: "200 minutes",
      description: "Perfect for small businesses starting their AI journey",
      icon: Sparkles,
      gradient: "from-blue-500 to-cyan-500",
      popular: false,
      features: [
        "200 minutes of AI calls per month",
        "Basic voice assistant",
        "Email & chat support",
        "CRM integration",
        "Call analytics dashboard",
        "Standard voice customization",
        "Business hours availability",
        "5 custom workflows"
      ]
    },
    {
      name: "Growth",
      price: "$255",
      period: "per month",
      minutes: "350 minutes",
      description: "Ideal for growing businesses scaling operations",
      icon: Building2,
      gradient: "from-primary to-purple-500",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "350 minutes of AI calls per month",
        "Advanced voice AI with learning",
        "Priority phone & email support",
        "Multi-channel integration",
        "Advanced analytics & reporting",
        "Custom voice personality",
        "24/7 availability",
        "Unlimited custom workflows",
        "API access"
      ]
    },
    {
      name: "Scale",
      price: "$375",
      period: "per month",
      minutes: "600 minutes",
      description: "Built for businesses with high call volumes",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        "Everything in Growth, plus:",
        "600 minutes of AI calls per month",
        "Premium voice AI with deep learning",
        "Priority 24/7 support",
        "Advanced integrations",
        "Real-time analytics & insights",
        "Fully customizable voice",
        "24/7 global availability",
        "Dedicated account support"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      minutes: "Unlimited",
      description: "Tailored solutions for large-scale operations",
      icon: Globe,
      gradient: "from-pink-500 to-orange-500",
      popular: false,
      features: [
        "Everything in Scale, plus:",
        "Unlimited AI call minutes",
        "Enterprise-grade voice AI",
        "Dedicated account manager",
        "White-label solutions",
        "Custom integrations",
        "Advanced security & compliance",
        "SLA guarantees",
        "On-premise deployment option",
        "Custom training & onboarding"
      ]
    }
  ];

  const additionalFeatures = [
    {
      icon: Phone,
      title: "Intelligent Call Routing",
      description: "AI-powered call distribution and priority management"
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Human-like interactions with context awareness"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated appointment booking and management"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Comprehensive insights and performance metrics"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "GDPR, HIPAA, PIPEDA compliance ready"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Multi-user access with role-based permissions"
    }
  ];

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes! All plans include a 14-day free trial with full access to features."
    },
    {
      question: "Is there a setup fee?",
      answer: "Yes, there is a one-time setup fee to configure your AI voice assistant, integrate with your systems, and customize the voice personality to match your brand."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the start of your next billing cycle."
    },
    {
      question: "What happens if I exceed my monthly call limit?",
      answer: "We'll notify you when you're approaching your limit. You can either upgrade your plan or purchase additional call credits at a pro-rated rate."
    },
    {
      question: "Do you offer annual billing?",
      answer: "Yes! Annual billing provides a 20% discount on all plans. Contact our sales team for details."
    },
    {
      question: "What kind of support is included?",
      answer: "All plans include support, with response times varying by tier. Enterprise customers get dedicated account management and 24/7 priority support."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1630_1px,transparent_1px),linear-gradient(to_bottom,#0B1630_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-[128px]"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px]"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Live Space Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Shooting Stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`shooting-${i}`}
              className="absolute h-[2px] w-12 bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                top: `${Math.random() * 50}%`,
                left: '-50px',
              }}
              animate={{
                x: ['0vw', '120vw'],
                y: ['0vh', '60vh'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 8,
                repeatDelay: 6,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-purple-500/20 backdrop-blur-xl border border-primary/30 rounded-full mb-8">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Flexible Pricing for Every Business
              </span>
            </div>

            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            
            <p className="text-2xl text-[#B7C0D6] max-w-3xl mx-auto mb-12">
              Scale your business with AI-powered voice automation. No hidden fees, no long-term contracts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Billing Period & Currency Selectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-16 gap-4 flex-wrap"
          >
            {/* Billing Period Toggle */}
            <div className="inline-flex bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-xl">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 min-w-[120px] ${
                  billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30 scale-105'
                    : 'text-[#B7C0D6] hover:text-white hover:bg-white/5'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 min-w-[120px] relative ${
                  billingPeriod === 'annual'
                    ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30 scale-105'
                    : 'text-[#B7C0D6] hover:text-white hover:bg-white/5'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Save 20%
                </span>
              </button>
            </div>

            {/* Currency Selector */}
            <div className="inline-flex bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-xl">
              {(['USD', 'CAD', 'GBP', 'EUR'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 min-w-[80px] ${
                    currency === curr
                      ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30 scale-105'
                      : 'text-[#B7C0D6] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative ${
                  tier.popular ? 'md:col-span-2 xl:col-span-1 xl:scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-6 py-2 bg-gradient-to-r from-primary to-purple-500 rounded-full text-sm font-bold shadow-lg shadow-primary/50 animate-pulse">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border ${
                  tier.popular ? 'border-primary/50 shadow-2xl shadow-primary/20' : 'border-white/10'
                } rounded-3xl p-8 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group flex flex-col`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-3xl font-bold text-white mb-3">{tier.name}</h3>
                  <p className="text-[#B7C0D6] mb-8 leading-relaxed">{tier.description}</p>

                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl font-bold text-white tracking-tight">{billingPeriod === 'annual' ? getAnnualPrice(tier.price) : convertPrice(tier.price)}</span>
                      <span className="text-[#B7C0D6] text-base">/{billingPeriod === 'annual' ? 'mo' : tier.period}</span>
                    </div>
                    {billingPeriod === 'annual' && tier.name !== 'Enterprise' && (
                      <p className="text-sm text-primary/80 mt-2 font-medium">
                        Billed annually at {getFullAnnualBilling(tier.price)}
                      </p>
                    )}
                    {tier.name !== 'Enterprise' && <p className="text-sm text-[#B7C0D6]/60 mt-2">+ applicable taxes</p>}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-[#B7C0D6] text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleButtonClick(tier.name)}
                    className={`w-full mt-auto ${
                      clickedTier === tier.name
                        ? tier.popular
                          ? `bg-gradient-to-r ${tier.gradient} shadow-2xl shadow-primary/80 scale-[0.98] animate-pulse`
                          : 'bg-white/10 border border-white/20 shadow-2xl shadow-primary/60 scale-[0.98]'
                        : tier.popular
                        ? `bg-gradient-to-r ${tier.gradient} hover:opacity-90 shadow-lg shadow-primary/30`
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    } text-white py-6 text-lg font-semibold group/btn hover:scale-[1.02] transition-all duration-300`}
                  >
                    {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-[#B7C0D6] max-w-3xl mx-auto">
              All plans include our core features designed to transform your customer communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-[#B7C0D6]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#B7C0D6]">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-[#B7C0D6]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-xl border border-primary/30 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-[#B7C0D6] mb-8 max-w-2xl mx-auto">
                Start automating your customer communication with SENTRIA's AI-powered voice assistant
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onNavigate('contact')}
                  size="lg"
                  className="bg-gradient-to-r from-[#2D6BFF] to-[#1E4FCC] hover:opacity-90 px-10 text-lg shadow-[0_0_30px_rgba(45,107,255,0.6)]"
                >
                  Get Started Today
                </Button>
                {/* Removed Try Emily Demo button */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}