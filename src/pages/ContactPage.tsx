import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Send, Building2, User, Briefcase, MessageSquare, Linkedin, Twitter, Facebook, Instagram, X, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "",
    employees: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const industries = [
    "Healthcare",
    "Financial Services",
    "Retail & E-commerce",
    "Real Estate",
    "Hospitality",
    "Professional Services",
    "Insurance",
    "Automotive",
    "Education",
    "Logistics & Supply Chain",
    "Telecommunications",
    "Construction",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        industry: "",
        employees: "",
        message: "",
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 6pm EST",
      link: "tel:+15551234567",
    },
    {
      icon: Facebook,
      title: "Facebook",
      content: "@sentria.ai",
      description: "Like and follow our page",
      link: "https://www.facebook.com/sentria.ai",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      content: "@sentria-ai",
      description: "Connect with us professionally",
      link: "https://www.linkedin.com/company/sentria-ai",
    },
    {
      icon: X,
      title: "X",
      content: "@sentria_ai",
      description: "Follow us for updates",
      link: "https://twitter.com/sentria_ai",
    },
    {
      icon: Instagram,
      title: "Instagram",
      content: "@sentria_ai",
      description: "See our latest content",
      link: "https://www.instagram.com/sentria_ai",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#070A12] text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>
      
      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#2D6BFF] rounded-full blur-[150px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] opacity-10 animate-pulse delay-1000"></div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#2D6BFF]/20 to-purple-500/20 border border-[#2D6BFF]/30 backdrop-blur-sm mb-6"
            >
              <div className="w-2 h-2 bg-[#2D6BFF] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#2D6BFF]">Get In Touch</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Contact Sales
            </h1>
            <p className="text-xl md:text-2xl text-[#B7C0D6] max-w-3xl mx-auto leading-relaxed">
              Transform your business with AI-powered voice technology. Our team is ready to help you get started.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative group h-full">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2D6BFF] to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity"></div>
                
                {/* Card */}
                <div className="relative h-full backdrop-blur-xl bg-[#0B1630]/80 border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20"
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-[#2D6BFF] to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold mb-4">Message Sent Successfully!</h3>
                      <p className="text-[#B7C0D6] text-lg mb-8">
                        Thank you for reaching out. Our sales team will contact you within 24 hours.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="bg-gradient-to-r from-[#2D6BFF] to-purple-500 hover:opacity-90"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit} className="space-y-3.5 flex-shrink-0">
                        <h2 className="text-3xl font-bold mb-1">Send us a message</h2>
                        
                        {/* Name and Email Row */}
                        <div className="grid md:grid-cols-2 gap-3.5">
                          <div className="space-y-1.5">
                            <label htmlFor="name" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Full Name *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Smith"
                              className="bg-white/5 border-white/10 focus:border-[#2D6BFF] text-white placeholder:text-white/40 h-11"
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Address *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="john@company.com"
                              className="bg-white/5 border-white/10 focus:border-[#2D6BFF] text-white placeholder:text-white/40 h-11"
                            />
                          </div>
                        </div>

                        {/* Company and Phone Row */}
                        <div className="grid md:grid-cols-2 gap-3.5">
                          <div className="space-y-1.5">
                            <label htmlFor="company" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              Company Name *
                            </label>
                            <Input
                              id="company"
                              name="company"
                              type="text"
                              required
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="ACME Corporation"
                              className="bg-white/5 border-white/10 focus:border-[#2D6BFF] text-white placeholder:text-white/40 h-11"
                            />
                          </div>
                          
                          <div className="space-y-1.5">
                            <label htmlFor="phone" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Phone Number
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+1 (555) 123-4567"
                              className="bg-white/5 border-white/10 focus:border-[#2D6BFF] text-white placeholder:text-white/40 h-11"
                            />
                          </div>
                        </div>

                        {/* Industry Dropdown */}
                        <div className="space-y-1.5">
                          <label htmlFor="industry" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            Industry *
                          </label>
                          <select
                            id="industry"
                            name="industry"
                            required
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:border-[#2D6BFF] focus:outline-none focus:ring-2 focus:ring-[#2D6BFF]/20 transition-all"
                          >
                            <option value="" className="bg-[#0B1630]">Select your industry</option>
                            {industries.map((industry) => (
                              <option key={industry} value={industry} className="bg-[#0B1630]">
                                {industry}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Number of Employees */}
                        <div className="space-y-1.5">
                          <label htmlFor="employees" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Number of Employees *
                          </label>
                          <select
                            id="employees"
                            name="employees"
                            required
                            value={formData.employees}
                            onChange={handleChange}
                            className="w-full h-11 bg-white/5 border border-white/10 rounded-lg px-4 text-white focus:border-[#2D6BFF] focus:outline-none focus:ring-2 focus:ring-[#2D6BFF]/20 transition-all"
                          >
                            <option value="" className="bg-[#0B1630]">Select company size</option>
                            <option value="1-10" className="bg-[#0B1630]">1-10 employees</option>
                            <option value="11-50" className="bg-[#0B1630]">11-50 employees</option>
                            <option value="51-200" className="bg-[#0B1630]">51-200 employees</option>
                            <option value="201-500" className="bg-[#0B1630]">201-500 employees</option>
                            <option value="501-1000" className="bg-[#0B1630]">501-1,000 employees</option>
                            <option value="1001-5000" className="bg-[#0B1630]">1,001-5,000 employees</option>
                            <option value="5001+" className="bg-[#0B1630]">5,001+ employees</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div className="space-y-1.5">
                          <label htmlFor="message" className="text-sm font-medium text-[#B7C0D6] flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us about your project and how we can help..."
                            rows={5}
                            className="bg-white/5 border-white/10 focus:border-[#2D6BFF] text-white placeholder:text-white/40 resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <div className="pt-1">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-13 bg-gradient-to-r from-[#2D6BFF] to-purple-500 hover:opacity-90 text-white font-semibold text-lg rounded-xl shadow-lg shadow-[#2D6BFF]/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Sending...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                Send Message
                              </span>
                            )}
                          </Button>

                          <p className="text-xs text-[#B7C0D6] text-center mt-2.5">
                            By submitting this form, you agree to our Privacy Policy and Terms of Service.
                          </p>
                        </div>
                      </form>

                      {/* AI Abstract Video Background */}
                      <div className="relative mt-6 flex-1 min-h-[200px] overflow-hidden rounded-xl border border-white/10 bg-[#0B1630]/40">
                        {/* AI Abstract Video Background */}
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover opacity-90"
                        >
                          <source src="https://cdn.coverr.co/videos/coverr-abstract-digital-particles-flowing/1080p.mp4" type="video/mp4" />
                        </video>
                        
                        {/* Gradient Overlay for Better Blending */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2D6BFF]/10 via-transparent to-purple-500/10"></div>
                        
                        {/* Fallback Animated Background if Video Doesn't Load */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1a3e] to-[#0a0e27]">
                          {/* Nebula Clouds */}
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: 'radial-gradient(ellipse at 20% 30%, rgba(45,107,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(168,85,247,0.15) 0%, transparent 50%)',
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          
                          {/* Stars - Small */}
                          {[...Array(30)].map((_, i) => (
                            <motion.div
                              key={`star-small-${i}`}
                              className="absolute bg-white rounded-full"
                              style={{
                                width: `${1 + Math.random()}px`,
                                height: `${1 + Math.random()}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.3, 1],
                              }}
                              transition={{
                                duration: 2 + Math.random() * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2,
                              }}
                            />
                          ))}
                          
                          {/* Stars - Medium */}
                          {[...Array(15)].map((_, i) => (
                            <motion.div
                              key={`star-med-${i}`}
                              className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
                              style={{
                                width: `${2 + Math.random()}px`,
                                height: `${2 + Math.random()}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                              animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 1.5 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2,
                              }}
                            />
                          ))}
                          
                          {/* Stars - Large/Bright */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={`star-large-${i}`}
                              className="absolute rounded-full"
                              style={{
                                width: '3px',
                                height: '3px',
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(45,107,255,0.6) 50%, transparent 100%)',
                                boxShadow: '0 0 8px rgba(45,107,255,0.8), 0 0 12px rgba(255,255,255,0.4)',
                              }}
                              animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 2, 1],
                              }}
                              transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2,
                              }}
                            />
                          ))}
                          
                          {/* Shooting Stars */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={`shooting-${i}`}
                              className="absolute h-[1px] bg-gradient-to-r from-white via-white to-transparent"
                              style={{
                                width: '60px',
                                left: `${Math.random() * 50}%`,
                                top: `${Math.random() * 80}%`,
                                transformOrigin: 'left center',
                                rotate: '135deg',
                              }}
                              animate={{
                                x: [0, 200],
                                y: [0, 200],
                                opacity: [0, 1, 1, 0],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatDelay: 5 + i * 3,
                                ease: "easeOut",
                                delay: i * 2,
                              }}
                            />
                          ))}
                          
                          {/* Floating Cosmic Particles */}
                          {[...Array(10)].map((_, i) => (
                            <motion.div
                              key={`cosmic-${i}`}
                              className="absolute rounded-full"
                              style={{
                                width: `${2 + Math.random() * 2}px`,
                                height: `${2 + Math.random() * 2}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: i % 2 === 0 ? 'rgba(45,107,255,0.6)' : 'rgba(168,85,247,0.6)',
                                boxShadow: i % 2 === 0 ? '0 0 6px rgba(45,107,255,0.8)' : '0 0 6px rgba(168,85,247,0.8)',
                              }}
                              animate={{
                                y: [-30, 30, -30],
                                x: [-15, 15, -15],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.5, 1],
                              }}
                              transition={{
                                duration: 4 + Math.random() * 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.3,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Info Sidebar - Takes 1 column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="relative group block"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2D6BFF] to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>
                    
                    {/* Card */}
                    <div className="relative backdrop-blur-xl bg-[#0B1630]/60 border border-white/10 rounded-xl p-5 hover:border-[#2D6BFF]/30 transition-all cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#2D6BFF]/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#2D6BFF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                          <p className="text-sm text-[#B7C0D6]">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}

              {/* Image Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="relative group overflow-hidden rounded-xl"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjB0ZWNobm9sb2d5JTIwaGVhZHNldHxlbnwxfHx8fDE3NzAyNjM5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Customer service representative"
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1630] via-transparent to-transparent"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-1">24/7 Support Available</h3>
                  <p className="text-sm text-[#B7C0D6]">Our team is here to help you succeed</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2D6BFF] to-purple-500 rounded-2xl opacity-20 blur-xl"></div>
            
            {/* Card */}
            <div className="relative backdrop-blur-xl bg-gradient-to-r from-[#0B1630]/90 to-[#0B1630]/70 border border-white/10 rounded-2xl p-12 overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 opacity-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759092913686-5ce5f9da67fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwbmlnaHR8ZW58MXx8fHwxNzcwMjYzNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Modern office"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-[#B7C0D6] mb-8">
                  Join companies already using SENTRIA's AI voice technology to revolutionize their customer interactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="flex items-center justify-center gap-2 text-[#B7C0D6]">
                    <div className="w-2 h-2 bg-[#2D6BFF] rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[#B7C0D6]">
                    <div className="w-2 h-2 bg-[#2D6BFF] rounded-full"></div>
                    <span>Enterprise-Grade Security</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[#B7C0D6]">
                    <div className="w-2 h-2 bg-[#2D6BFF] rounded-full"></div>
                    <span>Custom Solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}