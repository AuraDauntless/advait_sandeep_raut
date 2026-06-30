import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat, Fira_Code } from 'next/font/google';
import './globals.css';
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

import { AudioProvider } from "@/components/AudioProvider";

export const metadata: Metadata = {
  title: 'Advait Raut - Product Architect & Full-Stack Developer',
  description: 'Product Architect & Full-Stack Developer portfolio showcasing high-performance web architecture and product strategy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${firaCode.variable} scroll-smooth`}>
      <body className="font-sans bg-background text-foreground antialiased min-h-screen">
        <AudioProvider>
          <CustomCursor />
          <Navbar />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
