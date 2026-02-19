import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Outer glow effect */}
          <div className="absolute inset-0 bg-[#2D6BFF] rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
          
          {/* Glass-morphism button */}
          <div className="relative flex items-center justify-center w-14 h-14 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-[#2D6BFF]/50 transition-all duration-300 group-hover:scale-110">
            <ChevronUp className="w-6 h-6 text-[#2D6BFF] group-hover:text-white transition-colors duration-300" />
          </div>
        </button>
      )}
    </>
  );
}
