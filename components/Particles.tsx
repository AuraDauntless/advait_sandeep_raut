"use client";
import React, { useRef, useEffect } from 'react';

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
  
  // Track mouse for hover effect
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w * pixelRatio;
    canvas.height = h * pixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(pixelRatio, pixelRatio);

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
      
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        // Map particleBaseSize to actual physical radius
        this.size = (Math.random() * (particleBaseSize * 0.03)) + 0.5; 
        this.density = (Math.random() * 30) + 1;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * speed * 5;
      }

      draw() {
        if (!ctx) return;
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

      update() {
        this.angle += this.spin;
        
        // Ambient movement based on speed
        this.baseX += (Math.random() - 0.5) * speed * 2;
        this.baseY += (Math.random() - 0.5) * speed * 2;
        
        // Wrap around screen
        if (this.baseX > w) this.baseX = 0;
        if (this.baseX < 0) this.baseX = w;
        if (this.baseY > h) this.baseY = 0;
        if (this.baseY < 0) this.baseY = h;

        if (moveParticlesOnHover) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            // Push away based on spread
            this.x -= directionX * (particleSpread * 0.05);
            this.y -= directionY * (particleSpread * 0.05);
          } else {
            // Return to base position softly
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

    const particleArray: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particleArray.push(new Particle());
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

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
      }
      if (speed > 0 || moveParticlesOnHover) {
        animId = requestAnimationFrame(animate);
      }
    };

    let animId: number;
    if (speed > 0 || moveParticlesOnHover) {
      animId = requestAnimationFrame(animate);
    } else {
      // Draw once and stop
      animate();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [particleColors, particleCount, particleSpread, speed, particleBaseSize, moveParticlesOnHover, alphaParticles, disableRotation, pixelRatio]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen"
    />
  );
}
