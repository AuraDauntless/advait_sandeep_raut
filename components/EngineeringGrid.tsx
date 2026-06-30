"use client";
import React, { useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useAudio } from './AudioProvider';

const projects = [
  {
    id: 'coj',
    title: 'Crafts of Joy (COJ) Order Management System',
    summary: 'Serverless full-stack architecture leveraging React 19/Vite, Google Apps Script REST endpoints, and automated jspdf generation for invoice processing.',
    stack: ['React 19', 'Vite', 'Tailwind v4', 'Google Apps Script', 'OAuth'],
    slug: '/projects/coj',
    spotlightColor: 'rgba(249, 184, 154, 0.15)', // warm peach
    borderColor: 'group-hover:border-[#f9b89a]/50',
    pillHoverClass: 'group-hover:bg-[#fbedc7]/10 group-hover:text-[#f9b89a] group-hover:border-[#f9b89a]/30',
  },
  {
    id: 'prismatica',
    title: 'Prismatica College Fest Platform',
    summary: 'Single Page Application with concurrent Vite/Express environment. Features end-to-end type safety via shared TypeScript interfaces and Radix UI primitives.',
    stack: ['React 18', 'Express', 'TypeScript', 'Radix UI'],
    slug: '/projects/prismatica',
    spotlightColor: 'rgba(120, 134, 223, 0.15)', // indigo
    borderColor: 'group-hover:border-[#7886DF]/50',
    pillHoverClass: 'group-hover:bg-[#7886DF]/10 group-hover:text-[#7886DF] group-hover:border-[#7886DF]/30',
  },
  {
    id: 'galactic-star-catalogue',
    title: 'Galactic Star Catalogue',
    summary: 'Client-side deterministic 3D data visualization engine utilizing React Three Fiber for point cloud rendering and a multi-parameter debounced filtering system.',
    stack: ['React Three Fiber', 'Framer Motion', 'TypeScript', 'Recharts'],
    slug: '/projects/galactic-star-catalogue',
    spotlightColor: 'rgba(122, 211, 255, 0.15)', // cyan
    borderColor: 'group-hover:border-[#7ad3ff]/50',
    pillHoverClass: 'group-hover:bg-[#7ad3ff]/10 group-hover:text-[#7ad3ff] group-hover:border-[#7ad3ff]/30',
  }
];

const TiltedCard = ({ project }: { project: typeof projects[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { playCardHover, playClick } = useAudio();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    mouseX.set(mX);
    mouseY.set(mY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    playCardHover();
  };

  return (
    <Link href={project.slug} className="group block h-full outline-none w-full" style={{ perspective: "1000px" }} onMouseDown={playClick}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative flex flex-col h-full p-8 bg-[#0a0a0a] border border-white/5 transition-colors duration-500 overflow-hidden rounded-3xl ${project.borderColor}`}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 rounded-[inherit]"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                ${project.spotlightColor},
                transparent 80%
              )
            `,
          }}
        />
        
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full transition-transform duration-300">
          <motion.h3 
            className="text-2xl font-bold mb-4 transition-colors duration-500 text-white"
          >
            {project.title}
          </motion.h3>
          <motion.p 
            className="mb-8 flex-grow text-sm leading-relaxed font-light transition-colors duration-500 text-gray-400"
          >
            {project.summary}
          </motion.p>
          <motion.div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.map((tech: string) => (
              <span 
                key={tech} 
                className={`px-3 py-1.5 text-xs font-mono border border-white/10 rounded-full transition-all duration-500 bg-white/5 text-gray-400 ${project.pillHoverClass}`}
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function EngineeringGrid() {
  return (
    <section id="engineering-grid" className="py-32 px-4 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Featured Engineering Grid
        </h2>
      </motion.div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project) => (
            <div key={project.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-lg relative">
              <TiltedCard project={project} />
            </div>
          ))}
        </div>
    </section>
  );
}
