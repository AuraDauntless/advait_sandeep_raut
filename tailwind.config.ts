import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif'],
        mono: ['var(--font-fira)', 'monospace'],
      },
      colors: {
        background: '#000000', // Pure black
        foreground: '#ffffff', // Pure white
        primary: '#0a0a0a', // Off-black
        accent: '#ffffff', // Pure white
        glow: 'rgba(255, 255, 255, 0.15)', // White glow
      },
      boxShadow: {
        'antigravity': '0 20px 50px -10px rgba(255, 255, 255, 0.1)',
        'antigravity-hover': '0 30px 60px -15px rgba(255, 255, 255, 0.25)',
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
        'pixel-grid': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
      }
    },
  },
  plugins: [],
}
export default config
