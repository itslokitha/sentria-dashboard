// import { useState } from "react";
// import { motion } from "motion/react";
// import { Button } from "../components/ui/button";
// import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
// import logoImage from "figma:asset/3ca298a21007a50a7e4273fbaceaee5a09caa649.png";

// interface LoginPageProps {
//   onNavigate: (page: string) => void;
// }

// export function LoginPage({ onNavigate }: LoginPageProps) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log("Login attempt:", { email, password });
//   };

//   return (
//     <div className="min-h-screen pt-20 bg-[#070A12] flex items-center justify-center px-4 relative overflow-hidden">
//       {/* Live City Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* City Image Base */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1624980464457-699d5e7f0723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwY2l0eSUyMG5pZ2h0JTIwc2t5bGluZXxlbnwxfHx8fDE3NzExNzExNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
//           }}
//         >
//           {/* Dark overlay for readability */}
//           <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/80 via-[#070A12]/70 to-[#070A12]/80"></div>
//         </div>
        
//         {/* Animated Traffic Lights - Moving Dots */}
//         {Array.from({ length: 30 }).map((_, i) => (
//           <motion.div
//             key={`traffic-${i}`}
//             animate={{
//               x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
//               y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
//               opacity: [0.3, 0.8, 0.3],
//             }}
//             transition={{
//               duration: 5 + Math.random() * 10,
//               repeat: Infinity,
//               ease: "linear",
//               delay: Math.random() * 5,
//             }}
//             className="absolute w-1 h-1 rounded-full"
//             style={{
//               backgroundColor: Math.random() > 0.5 ? '#2D6BFF' : '#FFFFFF',
//               boxShadow: `0 0 ${4 + Math.random() * 6}px ${Math.random() > 0.5 ? '#2D6BFF' : '#FFFFFF'}`,
//             }}
//           />
//         ))}
        
//         {/* Glowing Window Flickers */}
//         {Array.from({ length: 40 }).map((_, i) => (
//           <motion.div
//             key={`window-${i}`}
//             animate={{
//               opacity: [0.4, 0.9, 0.4],
//             }}
//             transition={{
//               duration: 2 + Math.random() * 4,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: Math.random() * 3,
//             }}
//             className="absolute w-1 h-2 bg-yellow-300/60 rounded-sm blur-[0.5px]"
//             style={{
//               left: `${10 + Math.random() * 80}%`,
//               top: `${20 + Math.random() * 60}%`,
//             }}
//           />
//         ))}
        
//         {/* Moving Car Headlights */}
//         <motion.div
//           animate={{
//             x: ['-10%', '110%'],
//           }}
//           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//           className="absolute bottom-1/3 left-0 w-20 h-1 bg-gradient-to-r from-transparent via-white to-yellow-200 blur-sm"
//         />
//         <motion.div
//           animate={{
//             x: ['110%', '-10%'],
//           }}
//           transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
//           className="absolute bottom-1/4 right-0 w-16 h-1 bg-gradient-to-l from-transparent via-red-500 to-orange-500 blur-sm"
//         />
//         <motion.div
//           animate={{
//             x: ['-10%', '110%'],
//           }}
//           transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 4 }}
//           className="absolute bottom-1/2 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-blue-200 to-white blur-sm"
//         />
        
//         {/* Searchlight Beams from Buildings */}
//         <motion.div
//           animate={{
//             rotate: [0, 360],
//             opacity: [0.1, 0.3, 0.1],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute top-1/4 left-1/4 w-2 h-96 bg-gradient-to-b from-primary/30 to-transparent origin-top blur-md"
//         />
//         <motion.div
//           animate={{
//             rotate: [360, 0],
//             opacity: [0.1, 0.3, 0.1],
//           }}
//           transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
//           className="absolute top-1/3 right-1/3 w-2 h-80 bg-gradient-to-b from-purple-500/30 to-transparent origin-top blur-md"
//         />
        
//         {/* Pulsing City Glow */}
//         <motion.div
//           animate={{
//             opacity: [0.2, 0.4, 0.2],
//             scale: [1, 1.1, 1],
//           }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent blur-3xl"
//         />
        
//         {/* Airplane/Drone Lights */}
//         <motion.div
//           animate={{
//             x: ['100%', '-20%'],
//             y: ['20%', '10%'],
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//           className="absolute top-0 right-0"
//         >
//           <div className="w-2 h-2 bg-red-500 rounded-full blur-[1px] shadow-lg shadow-red-500/50"></div>
//         </motion.div>
//         <motion.div
//           animate={{
//             x: ['-20%', '100%'],
//             y: ['15%', '25%'],
//           }}
//           transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 8 }}
//           className="absolute top-0 left-0"
//         >
//           <div className="flex gap-1">
//             <div className="w-1.5 h-1.5 bg-white rounded-full blur-[0.5px] shadow-lg shadow-white/50"></div>
//             <div className="w-1.5 h-1.5 bg-green-500 rounded-full blur-[0.5px] shadow-lg shadow-green-500/50"></div>
//           </div>
//         </motion.div>
        
//         {/* Ambient Light Particles */}
//         {Array.from({ length: 15 }).map((_, i) => (
//           <motion.div
//             key={`particle-${i}`}
//             animate={{
//               y: [Math.random() * 100, -20],
//               opacity: [0, 0.6, 0],
//               scale: [0.5, 1, 0.5],
//             }}
//             transition={{
//               duration: 6 + Math.random() * 8,
//               repeat: Infinity,
//               ease: "easeOut",
//               delay: Math.random() * 8,
//             }}
//             className="absolute w-0.5 h-0.5 bg-white rounded-full blur-[0.5px]"
//             style={{
//               left: `${Math.random() * 100}%`,
//               bottom: 0,
//             }}
//           />
//         ))}
        
//         {/* Grid Overlay for Tech Feel */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(45,107,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,107,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
//       </div>

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 w-full max-w-md"
//       >
//         <div className="bg-[#0B1630] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl" style={{ backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)' }}>
//           {/* Logo */}
//           <div className="flex justify-center mb-8 -mx-8 md:-mx-10 px-8 md:px-10">
//             <motion.button
//               onClick={() => onNavigate("home")}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full"
//             >
//               {/* Logo removed */}
//             </motion.button>
//           </div>

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
//               Welcome Back
//             </h1>
//             <p className="text-base text-[#B7C0D6]">
//               Sign in to your SENTRIA account
//             </p>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="you@company.com"
//                   required
//                   className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="w-5 h-5" />
//                   ) : (
//                     <Eye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20 transition-all"
//                 />
//                 <span className="text-white/60 group-hover:text-white/80 transition-colors">
//                   Remember me
//                 </span>
//               </label>
//               <button
//                 type="button"
//                 className="text-primary hover:text-primary/80 transition-colors font-medium"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               size="lg"
//               className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group"
//             >
//               Sign In
//               <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-white/10"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-[#0B1630] text-white/40">
//                 Don't have an account?
//               </span>
//             </div>
//           </div>

//           {/* Sign Up Link */}
//           <div className="text-center">
//             <button
//               type="button"
//               onClick={() => onNavigate("contact")}
//               className="text-white/60 hover:text-white transition-colors font-medium"
//             >
//               Contact sales to get started{" "}
//               <span className="text-primary">→</span>
//             </button>
//           </div>
//         </div>

//         {/* Security Badge */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="mt-6 text-center"
//         >
//           <div className="inline-flex items-center gap-2 text-sm text-white/40">
//             <Lock className="w-4 h-4" />
//             <span>Secured with enterprise-grade encryption</span>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

// ============================================================
// SENTRIA — LoginPage (Auth-connected)
// Replaces dev2's LoginPage. Uses AuthContext to sign in via
// Cognito. Redirects to /dashboard on success.
// ============================================================

import { useState, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthContext';

interface LoginPageProps {
  onNavigate?: (page: string) => void; // kept for backwards compat
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, go straight to dashboard
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname ?? '/dashboard';
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      // AuthContext sets the session → ProtectedRoute will let them through
      const from = (location.state as any)?.from?.pathname ?? '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login failed:', err);
      // Map Cognito error codes to friendly messages
      if (err?.name === 'NotAuthorizedException') {
        setError('Incorrect email or password.');
      } else if (err?.name === 'UserNotFoundException') {
        setError('No account found with that email.');
      } else if (err?.name === 'UserNotConfirmedException') {
        setError('Your account email is not yet verified. Please check your inbox.');
      } else if (err?.name === 'PasswordResetRequiredException') {
        setError('A password reset is required. Please contact your administrator.');
      } else {
        setError('Login failed. Please try again or contact support.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A12] flex items-center justify-center relative overflow-hidden">
      {/* Background nebula */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-10">
          <svg viewBox="0 0 480 120" className="w-48 h-auto mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="loginGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4d5ed" />
                <stop offset="50%" stopColor="#8b8dc4" />
                <stop offset="100%" stopColor="#1a2570" />
              </linearGradient>
            </defs>
            <text x="240" y="80" fontFamily="Arial" fontSize="72" fontWeight="700" textAnchor="middle" letterSpacing="3" fill="url(#loginGradient)">
              SENTRIA
            </text>
          </svg>
          <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
        </div>

        {/* Form */}
        <div className="bg-[#0d1128]/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl shadow-black/50">
          <h2 className="text-2xl font-bold text-white mb-6">Welcome back</h2>

          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/70 focus:bg-black/50 transition-all text-sm"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-black/30 border border-blue-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/70 focus:bg-black/50 transition-all text-sm"
                autoComplete="current-password"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 text-sm mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Don't have an account?{' '}
            <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
