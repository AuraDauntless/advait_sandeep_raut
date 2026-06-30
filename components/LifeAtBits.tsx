"use client";
import React, { MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useAudio } from './AudioProvider';

const clubs = [
  {
    id: 'csa',
    role: 'Treasurer',
    organization: 'Council For Student Affairs (CSA)',
    period: 'Apr 2026 - Present',
    description: 'Managing financial operations and budget allocations for the student council at BITS Pilani K K Birla Goa Campus.',
    hoverColor: 'rgba(234, 179, 8, 0.15)', // yellow
    borderColor: 'group-hover:border-yellow-500/50',
    tagBg: 'bg-yellow-500/10',
    tagText: 'text-yellow-400',
    logo: '/bits_logo.jpg'
  },
  {
    id: 'cel',
    role: 'Senior Associate',
    organization: 'Center for Entrepreneurial Leadership (CEL)',
    period: 'Sep 2024 - Present',
    description: 'Fostering the entrepreneurial ecosystem on campus. Promoted from Associate. Focused on Data Analysis and Business Analysis.',
    hoverColor: 'rgba(59, 130, 246, 0.15)', // blue
    borderColor: 'group-hover:border-blue-500/50',
    tagBg: 'bg-blue-500/10',
    tagText: 'text-blue-400',
    logo: '/cel_logo.jpg'
  },
  {
    id: 'ascii',
    role: 'Core Manager',
    organization: 'ASCII BITS Goa',
    period: 'Nov 2025 - Present',
    description: 'Managing core operations and events for the Association of Students of Computer Science for Information Inference.',
    hoverColor: 'rgba(239, 68, 68, 0.15)', // red
    borderColor: 'group-hover:border-red-500/50',
    tagBg: 'bg-red-500/10',
    tagText: 'text-red-400',
    logo: '/ascii_logo.jpg'
  }
];

const volunteering = {
  id: 'nirmaan',
  role: 'Project Lead & Event Manager',
  organization: 'Nirmaan Organization',
  period: 'Sep 2024 - Apr 2026',
  description: 'Served as Project Lead and Volunteer for Project Disha, driving key initiatives. Engineered and deployed the COJ Web App as part of this volunteering effort to digitize and streamline operations. Also contributed as an Event Manager during the Joy of Giving Week, coordinating activities for grassroots community development and social impact.',
  hoverColor: 'rgba(255, 255, 255, 0.08)',
  borderColor: 'group-hover:border-white/40',
  tagBg: 'bg-white/10',
  tagText: 'text-white',
  logo: '/nirmaan_logo.jpg'
};

const SpotlightCard = ({ children, className = "", hoverColor, borderColor }: { children: React.ReactNode, className?: string, hoverColor: string, borderColor: string }) => {
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
      className={`relative group bg-[#0a0a0a] border border-white/5 transition-colors duration-500 overflow-hidden ${borderColor} ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 rounded-[inherit]"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${hoverColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default function LifeAtBits() {
  return (
    <section id="life-at-bits" className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          Life at BITS & Volunteering
        </h2>
        <p className="text-gray-400 text-lg font-light leading-relaxed">
          Beyond building products, I am deeply involved in shaping campus culture, driving entrepreneurial initiatives, and giving back to the community through grassroots volunteering.
        </p>
      </motion.div>
      
      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {clubs.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="h-full"
          >
            <SpotlightCard 
              hoverColor={activity.hoverColor} 
              borderColor={activity.borderColor}
              className="p-8 rounded-3xl h-full flex flex-col"
            >
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black">
                    <img src={activity.logo} alt={activity.organization} className="w-full h-full object-cover" />
                  </div>
                  <span className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-full text-gray-400 whitespace-nowrap">
                    {activity.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{activity.role}</h3>
                  <h4 className="text-sm text-gray-400 font-medium">{activity.organization}</h4>
                </div>
              </div>
              
              <p className="text-gray-500 font-light leading-relaxed mb-6 flex-grow text-sm">
                {activity.description}
              </p>
              
              <div className="flex items-center gap-2 mt-auto">
                <span className={`px-3 py-1.5 text-xs font-bold tracking-widest uppercase rounded-md ${activity.tagBg} ${activity.tagText}`}>
                  Campus Leadership
                </span>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      {/* Volunteering Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-white/10 flex-grow max-w-[200px]" />
          <h3 className="font-display text-xl font-bold text-white tracking-widest uppercase text-center">Volunteering</h3>
          <div className="h-px bg-white/10 flex-grow max-w-[200px]" />
        </div>

        <SpotlightCard 
          hoverColor={volunteering.hoverColor} 
          borderColor={volunteering.borderColor}
          className="p-8 md:p-12 rounded-3xl"
        >
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Info */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white/10 bg-black">
                    <img src={volunteering.logo} alt={volunteering.organization} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{volunteering.role}</h3>
                    <h4 className="text-lg text-gray-400 font-medium">{volunteering.organization}</h4>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-base">
                {volunteering.description}
              </p>
              
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-md ${volunteering.tagBg} ${volunteering.tagText}`}>
                  Social Impact
                </span>
                <span className="px-3 py-1.5 text-xs font-mono border border-white/10 rounded-full text-gray-500">
                  {volunteering.period}
                </span>
              </div>
            </div>

            {/* Volunteering Images */}
            <div className="flex-1 flex flex-col gap-4 w-full mt-8 lg:mt-0">
              {/* Top Row: Masonry-style 2 columns */}
              <div className="flex flex-row gap-4 items-start justify-center">
                {/* Left Column */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="w-full rounded-2xl overflow-hidden relative group/img border border-white/10 shadow-xl">
                    <img src="/volunteering.jpg" alt="Volunteering activity 1" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <div className="w-full rounded-2xl overflow-hidden relative group/img border border-white/10 shadow-xl">
                    <img src="/volunteering_6.png" alt="Volunteering activity 6" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>
                {/* Right Column */}
                <div className="flex-1 rounded-2xl overflow-hidden relative group/img border border-white/10 shadow-xl">
                  <img src="/volunteering_2.jpg" alt="Volunteering activity 2" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              {/* Bottom Row: 3 images */}
              <div className="flex flex-row gap-4 items-start justify-center">
                <div className="flex-1 rounded-2xl overflow-hidden relative group/img border border-white/10 shadow-xl">
                  <img src="/volunteering_3.jpg" alt="Volunteering activity 3" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden relative group/img border border-white/10 shadow-xl">
                  <img src="/volunteering_4.jpg" alt="Volunteering activity 4" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden relative group/img border border-white/10 shadow-xl">
                  <img src="/volunteering_5.jpg" alt="Volunteering activity 5" className="w-full h-auto block transition-transform duration-700 group-hover/img:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
      
    </section>
  );
}
