import React from 'react';
import ProjectButtons from '../../../components/ProjectButtons';

export default function PrismaticaProject() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-y-auto overflow-x-hidden bg-white z-40 font-sans selection:bg-[#E4E8FF] selection:text-[#3C3C3C]">
      
      <main className="relative bg-white py-20 md:py-32 overflow-hidden min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative z-10 max-w-6xl mx-auto">
            
            {/* Main Title "Prismatica" */}
            <h1
              className="text-[60px] sm:text-[90px] md:text-[140px] lg:text-[180px] font-black leading-none mb-12 tracking-tight"
              style={{
                WebkitTextStroke: '2px #434343',
                color: 'transparent',
              }}
            >
              PRISMATICA
            </h1>

            {/* Content Container with Vertical "TECH" */}
            <div className="relative flex flex-col md:flex-row items-start gap-8">
              
              {/* Content Box */}
              <article className="bg-[#E4E8FF] rounded-[40px] p-8 md:p-14 max-w-4xl shadow-sm relative z-10 w-full
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-[#3C3C3C] [&>h2]:mb-6
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-[#434343] [&>h3]:mt-10 [&>h3]:mb-4
                [&>p]:text-[#474748] [&>p]:text-lg [&>p]:md:text-xl [&>p]:leading-relaxed [&>p]:mb-6
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-[#474748] [&>ul]:text-lg [&>ul]:md:text-xl [&>ul]:mb-6 [&>ul]:space-y-3
                [&_strong]:text-[#3C3C3C] [&_strong]:font-bold
                [&_code]:text-[#3C3C3C] [&_code]:bg-white/60 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm
              ">
                <div className="mb-10 flex flex-wrap gap-3">
                  {["React 18", "Vite", "Express", "TypeScript", "Tailwind CSS", "Radix UI"].map(tag => (
                    <span key={tag} className="px-5 py-2 text-sm font-bold text-white bg-[#7886DF] rounded-full shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2>Architecture Overview</h2>
                <p>
                  Prismatica is a Single Page Application (SPA) designed to handle high-throughput concurrent requests during active event registration windows.
                </p>

                <h3>Concurrent Development Environment</h3>
                <p>
                  The local development environment runs concurrently, hosting both the Vite frontend and Express backend over a single port using proxy routing to eliminate CORS preflight overhead during development.
                </p>

                <h3>Frontend Implementation</h3>
                <ul>
                  <li><strong>Core:</strong> Modern full-stack JavaScript architecture utilizing React 18 and React Router 6.</li>
                  <li><strong>Component Styling:</strong> Powered by Tailwind CSS 3 alongside Radix UI primitives. This ensures a fully headless, accessible architecture that strictly adheres to WAI-ARIA standards and keyboard navigation support.</li>
                </ul>

                <h3>Type Safety Protocols</h3>
                <p>
                  End-to-end type safety is guaranteed via shared TypeScript interfaces. Models defining <code>User</code>, <code>EventRegistration</code>, and <code>PaymentStatus</code> are exported from a shared <code>packages/types</code> directory and imported by both the client and server directories to prevent runtime shape mismatches.
                </p>

                <ProjectButtons 
                  liveUrl="https://prismatica.co.in"
                  githubUrl="https://github.com/AuraDauntless/prismatica_final"
                  liveClassName="text-sm md:text-base font-bold text-white px-8 py-3 rounded-full bg-[#3C3C3C] hover:bg-black transition-colors shadow-md"
                  githubClassName="text-sm md:text-base font-bold text-[#3C3C3C] px-8 py-3 rounded-full bg-white hover:bg-gray-50 border border-[#3C3C3C]/10 transition-colors shadow-sm"
                  containerClassName="flex flex-wrap gap-4 mt-12 pt-8 border-t border-[#7886DF]/20"
                />
              </article>

              {/* Vertical "TECH" */}
              <div className="hidden lg:block absolute -right-32 top-[40%] -translate-y-1/2">
                <h2
                  className="text-[140px] lg:text-[180px] font-black leading-none rotate-90 tracking-tighter opacity-80"
                  style={{
                    WebkitTextStroke: '2px #434343',
                    color: 'transparent',
                  }}
                >
                  TECH
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
