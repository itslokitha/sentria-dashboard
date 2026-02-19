import { motion } from "motion/react";
import logoImage from "figma:asset/3ca298a21007a50a7e4273fbaceaee5a09caa649.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const torontoSkyline = "https://images.unsplash.com/photo-1699363059417-aeda250390eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3JvbnRvJTIwZG93bnRvd24lMjBza3lsaW5lJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc3MTE2NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <motion.div 
      className="fixed inset-0 z-[100] overflow-hidden touch-none"
      initial={{ backgroundColor: "rgba(7, 10, 18, 1)" }}
      animate={{ backgroundColor: "rgba(7, 10, 18, 0)" }}
      transition={{
        duration: 0.5,
        delay: 2.8 // Start fading background just before panels lift
      }}
    >
      {/* Logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [1, 1, 0] }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          times: [0, 0.5, 1],
          opacity: { duration: 2.8, times: [0, 0.85, 1] }
        }}
      >
        <motion.img 
          src={logoImage} 
          alt="SENTRIA" 
          className="w-64 sm:w-80 md:w-[450px] lg:w-[600px] drop-shadow-2xl relative z-20 max-w-[90vw]"
          animate={{
            filter: [
              "drop-shadow(0 0 15px rgba(45, 107, 255, 0.5))",
              "drop-shadow(0 0 30px rgba(45, 107, 255, 0.8))",
              "drop-shadow(0 0 15px rgba(45, 107, 255, 0.5))"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* 6 Panel Curtains with Toronto Skyline that lift up */}
      {[0, 1, 2, 3, 4, 5].map((index) => {
        // Butterfly effect: lift from both corners towards center
        const getDelay = (idx: number) => {
          const delayMap: { [key: number]: number } = {
            0: 3,      // Left corner - lifts first
            5: 3,      // Right corner - lifts first
            1: 3.2,    // Second from left
            4: 3.2,    // Second from right
            2: 3.4,    // Third from left
            3: 3.4     // Third from right (center panels lift last)
          };
          return delayMap[idx];
        };

        return (
          <motion.div
            key={index}
            className="absolute top-0 h-full overflow-hidden will-change-transform"
            style={{
              left: `${index * (100 / 6)}%`,
              width: `${100 / 6}%`
            }}
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 1.5,
              delay: getDelay(index),
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            onAnimationComplete={() => {
              if (index === 5) {
                onComplete();
              }
            }}
          >
            {/* Toronto Skyline Background for each panel */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${torontoSkyline})`,
                backgroundPositionX: `${index * 20}%`,
                backgroundSize: 'cover',
                imageRendering: 'auto',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/60 via-[#0B1630]/50 to-[#070A12]/60"></div>
            </div>
            
            {/* Blue Glowing Bottom Edge */}
            <div className="absolute bottom-0 inset-x-0 h-16 md:h-24 bg-gradient-to-t from-[#2D6BFF]/40 via-[#2D6BFF]/20 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-1 md:h-2 bg-gradient-to-r from-transparent via-[#2D6BFF] to-transparent shadow-[0_0_15px_rgba(45,107,255,0.8)] md:shadow-[0_0_20px_rgba(45,107,255,0.8)]"></div>
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 md:opacity-60"></div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}