"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Particles from '@/components/Particles';

export interface ProjectLayoutProps {
  title: string;
  date: string;
  tags?: string[];
  github?: string;
  live?: string;
  children: React.ReactNode;
}

export default function ProjectLayout({ title, date, tags = [], github, live, children }: ProjectLayoutProps) {
  return (
    <main className="relative min-h-screen bg-background font-sans selection:bg-white/20 selection:text-white pb-32">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={80}
          particleSpread={10}
          speed={0.05}
          particleBaseSize={30}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={1}
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent opacity-80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-gray-400 font-mono text-sm mb-4">{date}</div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 drop-shadow-2xl">
            {title}
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 text-sm font-mono text-gray-300 bg-white/5 border border-white/10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="text-sm font-semibold text-black px-6 py-2.5 rounded-full bg-white hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                View Live
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-white px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors backdrop-blur-md">
                GitHub
              </a>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="
            [&>h2]:font-display [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-20 [&>h2]:mb-8 [&>h2]:border-b [&>h2]:border-white/10 [&>h2]:pb-4
            [&>h3]:font-display [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4
            [&>p]:font-sans [&>p]:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-lg
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-gray-300 [&>ul]:mb-6 [&>ul]:text-lg [&>ul]:space-y-2
            [&_li]:my-2
            [&_strong]:text-white [&_strong]:font-semibold
            [&_code]:text-white [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm
          "
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
