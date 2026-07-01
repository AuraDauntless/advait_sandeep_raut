import './coj.css';
import ProjectButtons from '../../../components/ProjectButtons';
import Sun from './Sun';
import Clouds from './Clouds';
import Waves from './Waves';

export default function COJProject() {
  return (
    <div className="coj-theme fixed inset-0 h-screen w-screen overflow-y-auto overflow-x-hidden selection:bg-honey-200 selection:text-honey-900 z-40">
      
      {/* Decorative Clouds/Waves */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-peach-300 via-orange-300 to-yellow-200 z-0 pointer-events-none">
          <Sun />
          <Clouds />
          <Waves />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-32 animate-fadeIn">
        
        <header className="mb-20 text-center animate-bob-slow">
          <p className="text-honey-600 font-bold tracking-widest uppercase text-sm mb-4">Nov 1, 2023</p>
          <h1 className="text-texture-grainy text-6xl md:text-8xl font-black mb-8 leading-tight drop-shadow-sm">
            Crafts of Joy
          </h1>
          <p className="text-2xl text-peach-800/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Order Management System
          </p>
          
          <ProjectButtons 
            liveUrl="https://coj-orders.vercel.app/"
            githubUrl="https://github.com/Vihan2406/COJ_Orders"
            liveClassName="text-sm font-semibold text-peach-900 px-6 py-2.5 rounded-full bg-honey-200 hover:bg-honey-300 transition-colors shadow-md border border-honey-300"
            githubClassName="text-sm font-semibold text-peach-900 px-6 py-2.5 rounded-full bg-peach-100 hover:bg-peach-200 border border-peach-200 transition-colors shadow-sm"
            containerClassName="flex justify-center gap-4 mt-8"
          />
        </header>

        <article className="
          bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50
          [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-peach-900 [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:border-b [&>h2]:border-peach-200 [&>h2]:pb-4
          [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-honey-700 [&>h3]:mt-10 [&>h3]:mb-4
          [&>p]:text-peach-900/80 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-lg
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-peach-900/80 [&>ul]:mb-6 [&>ul]:text-lg [&>ul]:space-y-2
          [&_li]:my-2
          [&_strong]:text-honey-800 [&_strong]:font-semibold
          [&_code]:text-peach-900 [&_code]:bg-peach-50 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded-md [&_code]:font-mono [&_code]:text-sm [&_code]:shadow-sm [&_code]:border [&_code]:border-peach-100
        ">
          <h2>System Architecture & Engineering Challenges</h2>
          <p>
            The COJ Order Management System is a serverless full-stack application built to handle invoice generation and state synchronization seamlessly. Early iterations faced severe performance bottlenecks due to rapid, synchronous read/writes to Google Sheets. The architecture was specifically overhauled to minimize network latency and decouple frontend state from backend execution.
          </p>

          <h3>Frontend Specifications</h3>
          <ul>
            <li><strong>Framework:</strong> React 19 bootstrapped with Vite.</li>
            <li><strong>Styling:</strong> Utility-first styling implemented using Tailwind CSS v4, focusing on a headless component approach.</li>
            <li><strong>Authentication:</strong> OAuth flow handled via <code>@react-oauth/google</code>, managing secure access tokens.</li>
          </ul>

          <h3>State Management & Asynchronous Desyncs</h3>
          <p>
            Managing state directly against a slow external database (Google Sheets API) initially caused UI stuttering and race conditions when multiple admins modified orders concurrently. State separation is now maintained strictly through custom React Hooks to encapsulate logic and enforce optimistic UI updates:
          </p>
          <ul>
            <li><code>useOrderForm</code>: Manages local complex form state, input debouncing, and custom Regex validation logic before ever touching the network layer.</li>
            <li><code>useAdminOrders</code>: Interfaces with the backend API, managing global state and real-time administrative toggles. <strong>Crucially, it employs optimistic UI rendering</strong>—the UI updates instantly upon user interaction while the actual Google Apps Script fetch runs in the background, rolling back only on HTTP failure.</li>
          </ul>

          <h3>Serverless Backend</h3>
          <p>
            The backend leverages <strong>Google Apps Script</strong> endpoints acting as a REST API. It interfaces directly with a Google Sheets database. To circumvent GAS execution time limits and rate limiting, batch processing algorithms were written to read the entire sheet payload in a single HTTP request rather than querying row-by-row.
          </p>

          <h3>Automated Invoicing (Client-Side Rendering)</h3>
          <p>
            PDF invoice generation was intentionally shifted from the backend to the client-side using the <code>jspdf</code> library. Generating PDFs server-side via GAS proved too slow (often 5+ seconds). By offloading this to the client's browser:
          </p>
          <ul>
            <li>Invoice data is mapped dynamically from the authenticated global state and rendered onto a standardized PDF buffer directly in-memory.</li>
            <li>The operation went from a 5-second blocking network request to a sub-100ms client-side render, instantly triggering a localized Blob download.</li>
          </ul>
        </article>

      </main>
    </div>
  );
}
