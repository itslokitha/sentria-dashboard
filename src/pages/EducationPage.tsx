import { motion } from "motion/react";
import { useEffect } from "react";
import { GraduationCap, Calendar, Users, Phone, TrendingUp, Clock, CheckCircle2, ArrowRight, Zap, Star, DollarSign, Award, MessageCircle, Bell, Target, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";

export function EducationPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  useEffect(() => {
    document.title = "Education Solutions - AI Voice for Schools & Universities | SENTRIA";
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-[#070A12] via-[#0B0F1A] to-[#070A12]">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1648301033733-44554c74ec50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZWR1Y2F0aW9uJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMTgxMzkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="University Campus"
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
            className="absolute top-20 left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
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
                EDUCATION SOLUTIONS
              </span>
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
            
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-5xl lg:text-6xl">
              AI Voice for Student Services & Admissions
            </h1>
            <p className="text-base md:text-xl text-[#B7C0D6] mb-6 md:mb-8 leading-relaxed">
              Enhance student engagement, streamline admissions, and reduce administrative workload with AI voice assistants 
              designed for universities, K-12 schools, and training centers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
              <Button onClick={() => onNavigate('contact')} size="lg" className="bg-primary hover:bg-primary/90 group w-full sm:w-auto">
                Schedule Education Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Complete Campus Communication</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              From prospective students to alumni, automate every educational touchpoint
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: Users,
                title: "Admissions & Enrollment",
                description: "Handle prospective student inquiries, application status, campus tour scheduling, and enrollment processes",
                benefits: ["Application tracking", "Campus tour booking", "Document requests", "Deadline reminders"]
              },
              {
                icon: DollarSign,
                title: "Financial Aid Support",
                description: "Answer FAFSA questions, scholarship inquiries, payment plans, and financial aid status updates",
                benefits: ["Aid eligibility", "Scholarship info", "Payment deadlines", "Award notifications"]
              },
              {
                icon: Calendar,
                title: "Academic Advising",
                description: "Schedule advising appointments, course registration support, and degree progress inquiries",
                benefits: ["Advisor scheduling", "Course availability", "Registration help", "Degree audits"]
              },
              {
                icon: Bell,
                title: "Student Services",
                description: "Housing assignments, meal plan questions, ID card services, and campus facility inquiries",
                benefits: ["Housing info", "Meal plan changes", "Facility bookings", "Event registration"]
              },
              {
                icon: MessageCircle,
                title: "Parent Communication",
                description: "Parent portal access, billing questions, student progress updates, and emergency contacts",
                benefits: ["Billing inquiries", "Grade notifications", "Event updates", "Emergency alerts"]
              },
              {
                icon: Zap,
                title: "SIS Integration",
                description: "Integration with all major student information systems",
                benefits: ["Real-time sync", "Grade access", "Schedule updates", "Transcript requests"]
              }
            ].map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-8 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 md:mb-6">
                  <capability.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{capability.title}</h3>
                <p className="text-sm md:text-base text-[#B7C0D6] mb-4 md:mb-6 leading-relaxed">
                  {capability.description}
                </p>
                <div className="space-y-2">
                  {capability.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs md:text-sm text-[#B7C0D6]">
                      <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-transparent via-[#0B1630]/30 to-transparent">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-white mb-4 md:mb-6 text-2xl md:text-4xl">Solutions for All Education Levels</h2>
            <p className="text-base md:text-lg text-[#B7C0D6] max-w-3xl mx-auto">
              Specialized workflows for different educational institutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Universities & Colleges",
                workflows: [
                  "Prospective student inquiry management",
                  "Campus tour and open house scheduling",
                  "Course registration and advisor appointments",
                  "Housing and meal plan coordination",
                  "Alumni engagement and fundraising"
                ]
              },
              {
                icon: BookOpen,
                title: "K-12 Schools",
                workflows: [
                  "Parent-teacher conference scheduling",
                  "Attendance and absence notifications",
                  "School event registration",
                  "Transportation and bus route info",
                  "Emergency communication system"
                ]
              },
              {
                icon: Target,
                title: "Training Centers",
                workflows: [
                  "Course enrollment and scheduling",
                  "Certification program inquiries",
                  "Payment and financing options",
                  "Corporate training coordination",
                  "Continuing education credits"
                ]
              },
              {
                icon: Award,
                title: "Online Education",
                workflows: [
                  "Student onboarding and orientation",
                  "Technical support for platforms",
                  "Assignment deadline reminders",
                  "Live session scheduling",
                  "Certificate and credential verification"
                ]
              }
            ].map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-8"
              >
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-white">{useCase.title}</h3>
                </div>
                <div className="space-y-2 md:space-y-3">
                  {useCase.workflows.map((workflow, j) => (
                    <div key={j} className="flex items-start gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 md:mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base text-[#B7C0D6]">{workflow}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}