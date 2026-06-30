"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section id="about" className="py-24 px-4 max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
          About Me
        </h2>
      </motion.div>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8 text-gray-400 font-light leading-relaxed text-lg md:text-xl text-left">
          <p>
            Hey everyone, my name is Advait Sandeep Raut. I am currently pursuing a B.E. in Computer Science and Engineering at BITS Pilani K K Birla Goa Campus. I am a tech enthusiast and a keen learner who enjoys building web apps, products, and other technical projects from scratch, handling everything from the initial planning to the final execution.
          </p>
          <p>
            I specialize in architecting and engineering technology products from the ground up. Operating as the lead architect and technical planner, I oversee the complete product lifecycle—from conceptualizing the core system architecture to deploying highly interactive, production-ready applications. My approach focuses strictly on functional execution, ensuring that complex, data-heavy backends seamlessly integrate with clean, sophisticated UI/UX interfaces.
          </p>
          <p>
            My technical work bridges applied artificial intelligence, cognitive neuroscience, and software-defined radio. I lead the technical planning and development of robust tracking tools, including the engineering of Global Navigation Satellite System (GNSS) simulation dashboards and the review of NavIC I5S implementations. Concurrently, my research involves utilizing Graph-XAI methodologies to quantify brain atrophy in fMRI neuroimaging, requiring the translation of high-dimensional datasets into programmatic, actionable models.
          </p>
          <p>
            Building zero-to-one products requires a rigid technical foundation. I design strong core architectures utilizing Python, C, and C++, paired with dynamic, highly responsive frontends built in React.js and TypeScript. Whether deploying standalone full-stack applications or designing complex command-and-control dashboards, I prioritize a stripped-down, modern aesthetic—removing unnecessary visual clutter to deliver precise, highly optimized user experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
