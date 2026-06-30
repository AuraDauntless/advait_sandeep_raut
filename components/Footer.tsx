export default function Footer() {
  return (
    <footer className="py-12 border-t border-accent/20 bg-background relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
        <div className="text-sm text-gray-500 font-mono tracking-widest uppercase">
          System Architecture &copy; {new Date().getFullYear()}
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-400 font-mono">
          <a href="mailto:advaitsandeepraut@gmail.com" className="hover:text-accent transition-colors hover:shadow-[0_0_10px_rgba(45,212,191,0.5)]">
            Email
          </a>
          <a href="https://www.linkedin.com/in/advait-sandeep-raut-48b08131b/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
          <a href="https://codeforces.com/profile/AuraDauntless" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            Codeforces
          </a>
          <a href="/Advait_Raut_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-accent border-b border-accent/30 hover:border-accent transition-colors">
            Resume [PDF]
          </a>
        </nav>
      </div>
    </footer>
  );
}
