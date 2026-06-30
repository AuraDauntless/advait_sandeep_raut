"use client";
import React, { MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useAudio } from './AudioProvider';

const timelineData = [
  {
    id: 'fanplay',
    role: 'Artificial Intelligence Intern',
    company: 'FANPLAY IoT',
    duration: 'May 2026 - Present',
    logo: '/fanplay_iot_logo.jpg',
    bullets: [
      'Architecting machine learning pipelines to analyze complex IoT data streams.',
      'Optimizing AI inference models for deployment to ensure low-latency, real-time analytics.'
    ]
  },
  {
    id: 'zeroshift',
    role: 'Sales and Growth Intern',
    company: 'ZeroShift',
    duration: 'Oct 2025 - Dec 2025',
    logo: '/zeroshift_logo.png',
    bullets: [
      'Led data-driven sales strategies, identifying new market opportunities and optimizing lead generation.',
      'Analyzed customer acquisition metrics to accelerate overall sales growth and business development.'
    ]
  },
  {
    id: 'jaza',
    role: 'Web Development Intern',
    company: 'Jaza Software',
    duration: 'May 2025 - Jul 2025',
    logo: '/jaza_logo.jpg',
    bullets: [
      'Built and deployed responsive web interfaces utilizing HTML5, modern CSS, and JavaScript architectures.',
      'Ensured cross-browser compatibility and optimized front-end performance for seamless user experiences.'
    ]
  }
];

const TimelineCard = ({ node }: { node: typeof timelineData[0] }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { playCardHover, playClick } = useAudio();

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => {
    playCardHover();
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseDown={playClick}
      className="relative group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        <div className="mb-6 flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-white/5 flex items-center justify-center">
            <img 
              src={node.logo} 
              alt={node.company} 
              className="w-full h-full object-cover bg-white" 
              onError={(e) => { 
                e.currentTarget.style.display = 'none'; 
                e.currentTarget.parentElement!.innerHTML = `<span class="text-white/50 text-xl font-bold">${node.company[0]}</span>`;
              }} 
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{node.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-gray-400 font-medium text-sm">{node.company}</span>
              <span className="text-white/20 text-sm">•</span>
              <span className="text-gray-500 font-bold tracking-widest text-xs font-mono uppercase">{node.duration}</span>
            </div>
          </div>
        </div>
        <ul className="space-y-4 text-gray-400 font-light leading-relaxed">
          {node.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="text-white/40 font-mono mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity">→</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default function ExperienceTimeline() {
  return (
    <section className="py-32 px-4 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Professional Experience
        </h2>
      </motion.div>
      
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-2 md:before:ml-[50%] before:-translate-x-px before:h-full before:w-[1px] before:bg-white/10">
        {timelineData.map((node, i) => (
          <motion.div 
            key={node.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            <div className="flex items-center justify-center w-2.5 h-2.5 rounded-full bg-gray-500 absolute left-2 md:left-1/2 -translate-x-1/2 z-10 group-hover:bg-white group-hover:scale-150 transition-all duration-500"></div>
            
            <div className="w-full pl-10 md:w-[calc(50%-3rem)] md:pl-0">
              <TimelineCard node={node} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
