"use client";
import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export interface ParticlesProps {
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  moveParticlesOnHover?: boolean;
  alphaParticles?: boolean;
  disableRotation?: boolean;
  pixelRatio?: number;
}

// Particle class definition separated from useEffect to allow persisting instances
class Particle {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
  color: string;
  angle: number;
  spin: number;
  speed: number;
  particleSpread: number;
  moveParticlesOnHover: boolean;
  
  constructor(w: number, h: number, particleBaseSize: number, speed: number, particleColors: string[], particleSpread: number, moveParticlesOnHover: boolean) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.baseX = this.x;
    this.baseY = this.y;
    this.size = (Math.random() * (particleBaseSize * 0.03)) + 0.5; 
    this.density = (Math.random() * 30) + 1;
    this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
    this.angle = Math.random() * 360;
    this.spin = (Math.random() - 0.5) * speed * 5;
    this.speed = speed;
    this.particleSpread = particleSpread;
    this.moveParticlesOnHover = moveParticlesOnHover;
  }

  draw(ctx: CanvasRenderingContext2D, alphaParticles: boolean, disableRotation: boolean) {
    ctx.save();
    ctx.translate(this.x, this.y);
    if (!disableRotation) {
      ctx.rotate((this.angle * Math.PI) / 180);
    }
    
    ctx.fillStyle = this.color;
    if (alphaParticles) {
      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
    }
    
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }

  update(w: number, h: number, mouseX: number, mouseY: number, mouseRadius: number) {
    this.angle += this.spin;
    
    this.baseX += (Math.random() - 0.5) * this.speed * 2;
    this.baseY += (Math.random() - 0.5) * this.speed * 2;
    
    if (this.baseX > w) this.baseX = 0;
    if (this.baseX < 0) this.baseX = w;
    if (this.baseY > h) this.baseY = 0;
    if (this.baseY < 0) this.baseY = h;

    if (this.moveParticlesOnHover) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouseRadius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouseRadius - distance) / mouseRadius;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        
        this.x -= directionX * (this.particleSpread * 0.05);
        this.y -= directionY * (this.particleSpread * 0.05);
      } else {
        if (this.x !== this.baseX) {
          const dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          const dy = this.y - this.baseY;
          this.y -= dy / 20;
        }
      }
    } else {
        this.x = this.baseX;
        this.y = this.baseY;
    }
  }
}

export default function Particles({
  particleColors = ["#ffffff"],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  moveParticlesOnHover = true,
  alphaParticles = false,
  disableRotation = false,
  pixelRatio = 1
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef);
  const particlesRef = useRef<Particle[]>([]);
  
  // Track mouse for hover effect
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!isInView) return; // Pause rendering loop if offscreen

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * pixelRatio;
    canvas.height = h * pixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(pixelRatio, pixelRatio);

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(w, h, particleBaseSize, speed, particleColors, particleSpread, moveParticlesOnHover));
      }
    }

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * pixelRatio;
      canvas.height = h * pixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const pArray = particlesRef.current;
      for (let i = 0; i < pArray.length; i++) {
        pArray[i].update(w, h, mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius);
        pArray[i].draw(ctx, alphaParticles, disableRotation);
      }
      if (speed > 0 || moveParticlesOnHover) {
        animId = requestAnimationFrame(animate);
      }
    };

    if (speed > 0 || moveParticlesOnHover) {
      animId = requestAnimationFrame(animate);
    } else {
      animate(); // Draw once
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isInView, particleColors, particleCount, particleSpread, speed, particleBaseSize, moveParticlesOnHover, alphaParticles, disableRotation, pixelRatio]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
    />
  );
}
