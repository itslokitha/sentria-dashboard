import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import logoImage from "figma:asset/3ca298a21007a50a7e4273fbaceaee5a09caa649.png";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen pt-20 bg-[#070A12] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Live City Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* City Image Base */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1624980464457-699d5e7f0723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMG5pZ2h0JTIwc2t5bGluZXxlbnwxfHx8fDE3NzExNzExNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/80 via-[#070A12]/70 to-[#070A12]/80"></div>
        </div>
        
        {/* Animated Traffic Lights - Moving Dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`traffic-${i}`}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: Math.random() > 0.5 ? '#2D6BFF' : '#FFFFFF',
              boxShadow: `0 0 ${4 + Math.random() * 6}px ${Math.random() > 0.5 ? '#2D6BFF' : '#FFFFFF'}`,
            }}
          />
        ))}
        
        {/* Glowing Window Flickers */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`window-${i}`}
            animate={{
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
            className="absolute w-1 h-2 bg-yellow-300/60 rounded-sm blur-[0.5px]"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}
        
        {/* Moving Car Headlights */}
        <motion.div
          animate={{
            x: ['-10%', '110%'],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 left-0 w-20 h-1 bg-gradient-to-r from-transparent via-white to-yellow-200 blur-sm"
        />
        <motion.div
          animate={{
            x: ['110%', '-10%'],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/4 right-0 w-16 h-1 bg-gradient-to-l from-transparent via-red-500 to-orange-500 blur-sm"
        />
        <motion.div
          animate={{
            x: ['-10%', '110%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 4 }}
          className="absolute bottom-1/2 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-blue-200 to-white blur-sm"
        />
        
        {/* Searchlight Beams from Buildings */}
        <motion.div
          animate={{
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-2 h-96 bg-gradient-to-b from-primary/30 to-transparent origin-top blur-md"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-1/3 right-1/3 w-2 h-80 bg-gradient-to-b from-purple-500/30 to-transparent origin-top blur-md"
        />
        
        {/* Pulsing City Glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent blur-3xl"
        />
        
        {/* Airplane/Drone Lights */}
        <motion.div
          animate={{
            x: ['100%', '-20%'],
            y: ['20%', '10%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full blur-[1px] shadow-lg shadow-red-500/50"></div>
        </motion.div>
        <motion.div
          animate={{
            x: ['-20%', '100%'],
            y: ['15%', '25%'],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 8 }}
          className="absolute top-0 left-0"
        >
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] shadow-lg shadow-white/50"></div>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full blur-[0.5px] shadow-lg shadow-green-500/50"></div>
          </div>
        </motion.div>
        
        {/* Ambient Light Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [Math.random() * 100, -20],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 8,
            }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full blur-[0.5px]"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          />
        ))}
        
        {/* Grid Overlay for Tech Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#0B1630] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl" style={{ backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)' }}>
          {/* Logo */}
          <div className="flex justify-center mb-8 -mx-8 md:-mx-10 px-8 md:px-10">
            <motion.button
              onClick={() => onNavigate("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              {/* Logo removed */}
            </motion.button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Welcome Back
            </h1>
            <p className="text-base text-[#B7C0D6]">
              Sign in to your SENTRIA account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <span className="text-white/60 group-hover:text-white/80 transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group"
            >
              Sign In
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#0B1630] text-white/40">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="text-white/60 hover:text-white transition-colors font-medium"
            >
              Contact sales to get started{" "}
              <span className="text-primary">→</span>
            </button>
          </div>
        </div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-white/40">
            <Lock className="w-4 h-4" />
            <span>Secured with enterprise-grade encryption</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}