"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from './AudioProvider';

const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number] } },
    hidden: { opacity: 0, y: 15 },
  };

  return (
    <motion.span className={className} variants={container} initial="hidden" animate="visible">
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span key={charIndex} variants={child} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export default function Hero() {
  const { playHoverTick, playClick } = useAudio();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 py-20 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center mt-10 w-full max-w-4xl">
        
        {/* Main Avatar Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="relative w-40 h-40 mb-12 rounded-full overflow-hidden border border-white/10 ring-1 ring-white/5 bg-black"
        >
          <img 
            src="/profile_original.jpg" 
            alt="Advait Raut" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <h1 className="font-display text-[11.5vw] sm:text-6xl md:text-8xl font-bold tracking-tight mb-4 text-white">
          <SplitText text="Advait Sandeep Raut" />
        </h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="font-display text-xl md:text-2xl text-gray-400 mb-8 tracking-wide font-light"
        >
          Product Architect & Full-Stack Developer
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-base md:text-lg text-gray-500 mb-12 leading-relaxed font-light"
        >
          Spearheading product strategy and executing high-performance web architecture, robust API design, and complex hardware integrations.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a 
            href="#engineering-grid" 
            onMouseEnter={playHoverTick}
            onMouseDown={playClick}
            className="px-8 py-3.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-colors"
          >
            Explore Systems
          </a>
          <a 
            href="https://github.com/AuraDauntless" 
            target="_blank" 
            onMouseEnter={playHoverTick}
            onMouseDown={playClick}
            className="px-8 py-3.5 bg-transparent text-white text-sm font-bold rounded-full border border-white/20 hover:border-white transition-colors"
          >
            GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
