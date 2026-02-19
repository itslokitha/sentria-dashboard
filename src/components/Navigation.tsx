import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoImage from "figma:asset/3ca298a21007a50a7e4273fbaceaee5a09caa649.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigation = [
    { 
      name: "Platform", 
      onClick: () => handleNavClick("platform-overview"),
      dropdown: [
        { name: "Overview", onClick: () => handleNavClick("platform-overview") },
        { name: "Voice AI Technology", onClick: () => handleNavClick("voice-technology") },
        { name: "Solutions", onClick: () => handleNavClick("solutions") },
        { name: "Integrations", onClick: () => handleNavClick("integrations") },
        { name: "Pricing", onClick: () => handleNavClick("pricing") },
      ]
    },
    { 
      name: "Industries", 
      onClick: () => handleNavClick("industries"),
      dropdown: [
        { name: "Overview", onClick: () => handleNavClick("industries") },
        { name: "Healthcare", onClick: () => handleNavClick("healthcare") },
        { name: "Financial Services", onClick: () => handleNavClick("finance") },
        { name: "Retail & E-commerce", onClick: () => handleNavClick("retail") },
        { name: "Real Estate", onClick: () => handleNavClick("realestate") },
        { name: "Hospitality", onClick: () => handleNavClick("hospitality") },
        { name: "Professional Services", onClick: () => handleNavClick("professional") },
        { name: "Insurance", onClick: () => handleNavClick("insurance") },
        { name: "Automotive", onClick: () => handleNavClick("automotive") },
        { name: "Education", onClick: () => handleNavClick("education") },
        { name: "Logistics & Supply Chain", onClick: () => handleNavClick("logistics") },
        { name: "Telecommunications", onClick: () => handleNavClick("telecommunications") },
        { name: "Construction", onClick: () => handleNavClick("construction") },
      ]
    },
    { name: "Resources", onClick: () => handleNavClick("resources") },
    // { 
    //   name: "Meet Emily", 
    //   onClick: () => handleNavClick("emily"),
    //   highlight: true
    // },
  ];
  
  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#070A12]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-primary/5' : 'bg-transparent'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-between h-20">
          {/* Logo */}
          <motion.button 
            onClick={() => handleNavClick('home')}
            className="flex items-center group relative lg:order-first order-2 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src={logoImage} alt="SENTRIA" className="h-70 transition-all" />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10"></div>
          </motion.button>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={item.onClick}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all flex items-center gap-1.5 rounded-lg group/nav ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={`size-4 transition-transform duration-200 ${
                      openDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-[#0B1630]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <motion.button
                          key={subItem.name}
                          onClick={subItem.onClick}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.05 }}
                          className="w-full px-4 py-3 text-left text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                        >
                          {subItem.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          {/* Contact Button - Desktop */}
          <motion.div 
            className="hidden lg:flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Button
              onClick={() => handleNavClick('login')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105"
            >
              Login
            </Button>
            <Button
              onClick={() => handleNavClick('contact')}
              className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Contact Sales
            </Button>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors relative z-50"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0B1630]/98 backdrop-blur-xl border-t border-white/10 shadow-2xl"
          >
            <div className="px-6 py-6 space-y-1 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {navigation.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => {
                      if (item.dropdown) {
                        setMobileOpenDropdown(mobileOpenDropdown === item.name ? null : item.name);
                      } else {
                        item.onClick();
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm font-medium flex items-center justify-between ${
                      item.highlight
                        ? 'bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className={`size-4 transition-transform duration-200 ${
                        mobileOpenDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && mobileOpenDropdown === item.name && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1 ml-4 space-y-1 overflow-hidden"
                      >
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={subItem.onClick}
                            className="w-full text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Mobile Contact Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="pt-4 space-y-3"
              >
                <Button
                  onClick={() => handleNavClick('login')}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 text-sm font-medium py-6 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 text-white text-sm font-medium py-6 rounded-xl shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-primary/50"
                >
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}