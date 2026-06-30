import React from 'react';
import ProjectButtons from '../../../components/ProjectButtons';
import { Galaxy3D } from './components/Galaxy3D';

export default function GalacticProject() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-y-auto overflow-x-hidden bg-[#0b1220] text-white z-40 font-sans selection:bg-[#7ad3ff]/30 selection:text-white">
      
      <main className="relative py-20 md:py-32 min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* Header section similar to SEDS */}
            <div className="mb-16">
              <div className="text-gray-400 font-mono text-sm mb-4">2023-04-20</div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                Galactic Star Catalogue
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {["React 18", "TypeScript", "Vite", "Framer Motion", "React Three Fiber", "Recharts"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 text-sm font-semibold text-white bg-[#121a2a] border border-white/10 rounded-full shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <ProjectButtons 
                liveUrl="https://seds-celestia-mission-ctrl-problem.vercel.app/"
                githubUrl="https://github.com/AuraDauntless/SEDS-Celestia-Mission-CTRL-Problem-Statement-3"
                liveClassName="text-sm md:text-base font-bold text-[#0b1220] px-8 py-3 rounded-full bg-[#7ad3ff] hover:bg-[#5dbbee] transition-colors shadow-[0_0_15px_rgba(122,211,255,0.4)]"
                githubClassName="text-sm md:text-base font-bold text-white px-8 py-3 rounded-full bg-[#121a2a] hover:bg-[#1a253a] border border-white/10 transition-colors shadow-sm"
                containerClassName="flex flex-wrap gap-4 pt-4 border-t border-white/10"
              />
            </div>

            {/* Bounded 3D Galaxy Map Card */}
            <div className="mb-20">
              <Galaxy3D />
            </div>

            {/* Technical Specifications Panel */}
            <article className="bg-[#121a2a] rounded-[24px] p-8 md:p-14 shadow-sm relative z-10 w-full mx-auto border border-white/5
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-6
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-[#7ad3ff]
                [&>p]:text-gray-300 [&>p]:text-lg [&>p]:md:text-xl [&>p]:leading-relaxed [&>p]:mb-6
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-gray-300 [&>ul]:text-lg [&>ul]:md:text-xl [&>ul]:mb-6 [&>ul]:space-y-3
                [&_strong]:text-white [&_strong]:font-bold
                [&_code]:text-[#7ad3ff] [&_code]:bg-[#0b1220] [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
              ">
              <h2>Technical Specifications</h2>
              <p>
                The Galactic Star Catalogue is a client-side data visualization engine optimized for WebGL context rendering.
              </p>

              <h3>Core Stack</h3>
              <ul>
                <li><strong>Framework:</strong> React 18, TypeScript, Vite.</li>
                <li><strong>Animation Engine:</strong> Framer Motion for UI-layer transitions.</li>
              </ul>

              <h3>3D Rendering Pipeline</h3>
              <ul>
                <li><strong>Engine:</strong> Deterministic 3D point cloud rendering utilizing React Three Fiber and the <code>drei</code> helper library.</li>
                <li><strong>Visual Algorithms:</strong> Employs seeded random number generators (RNG) to ensure deterministic placement of stars. Luminosity-scaled glow intensities and circular sprite rendering are calculated via vertex shaders to maintain 60 FPS under heavy geometry loads.</li>
              </ul>

              <h3>Data Plotting and State</h3>
              <ul>
                <li><strong>HR Diagram:</strong> Scatter plot implementation utilizing Recharts to map stellar temperature against luminosity.</li>
                <li><strong>Filtering Engine:</strong> A multi-parameter, debounced filtering engine isolates specific stellar classifications. The active filter state is persisted across sessions utilizing the browser's <code>localStorage</code> API.</li>
              </ul>
            </article>

          </div>
        </div>
      </main>
    </div>
  );
}
