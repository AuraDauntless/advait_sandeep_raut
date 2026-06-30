"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from './AudioProvider';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMuted, toggleMute, playHoverTick, playClick } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ease-in-out px-6 md:px-12 flex items-center justify-between ${
        isScrolled 
          ? "bg-black/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="font-display font-bold text-xl tracking-wider text-white">
        <Link href="/">ASR.</Link>
      </div>
      <div className="flex items-center gap-6 md:gap-8 text-sm font-sans font-medium text-gray-400">
        <Link href="/" className="hover:text-white transition-colors" onMouseEnter={playHoverTick} onMouseDown={playClick}>Home</Link>
        <Link href="/#engineering-grid" className="hover:text-white transition-colors" onMouseEnter={playHoverTick} onMouseDown={playClick}>Systems</Link>
        <a href="https://github.com/AuraDauntless" target="_blank" className="hover:text-white transition-colors" onMouseEnter={playHoverTick} onMouseDown={playClick}>GitHub</a>
        
        <button 
          onClick={() => {
            toggleMute();
            if (isMuted) playClick(); // Play sound if we just unmuted
          }} 
          onMouseEnter={playHoverTick}
          className="ml-2 p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </nav>
  );
}
