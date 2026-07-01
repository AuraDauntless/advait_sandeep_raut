"use client";
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import EngineeringGrid from '@/components/EngineeringGrid';
import LifeAtBits from '@/components/LifeAtBits';
import Footer from '@/components/Footer';
import Hyperspeed from '@/components/Hyperspeed';
import ReactionDotMinigame from '@/components/ReactionDotMinigame';


export default function Home() {
  const containerRef = useRef(null);
  const [showMinigame, setShowMinigame] = useState(false);
  const { scrollYProgress, scrollY } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Hyperspeed fade out transition (fades completely by 600px of scroll)
  const hyperspeedOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] font-sans selection:bg-white/20 selection:text-white">
      
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-50 transform origin-left opacity-30" style={{ scaleX }} />

      {/* Subtle Noise Texture Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Elegant Gradient Mesh Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[120px] mix-blend-screen" />
      </div>

      {/* Hero Background Layer: Hyperspeed (Fades on Scroll) */}
      <motion.div 
        className="absolute inset-0 z-[5] pointer-events-none fixed mix-blend-screen"
        style={{ opacity: hyperspeedOpacity }}
      >
        <Hyperspeed />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <AboutMe />
        <ExperienceTimeline />
        <LifeAtBits />
        <EngineeringGrid />
        
        {/* Minigame Section */}
        <section className="py-20 px-4 relative z-10 border-t border-white/5">
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Systems Check</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">Verify reaction times and hand-eye coordination before proceeding.</p>
            
            <button 
              onClick={() => setShowMinigame(!showMinigame)}
              className="px-8 py-3 border border-blue-500/30 text-blue-100 bg-blue-900/20 hover:bg-blue-800/40 rounded-full font-mono text-sm tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] active:scale-95"
            >
              {showMinigame ? "CLOSE MODULE" : "BOOT PROTOCOL"}
            </button>
          </div>
          
          {showMinigame && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <ReactionDotMinigame />
            </motion.div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
