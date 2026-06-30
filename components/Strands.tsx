"use client";
import React, { useRef, useEffect } from 'react';

export default function Strands() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      
      const numStrands = 5;
      const pointsPerStrand = 100;
      
      for (let i = 0; i < numStrands; i++) {
        ctx.beginPath();
        for (let j = 0; j < pointsPerStrand; j++) {
          const x = (j / (pointsPerStrand - 1)) * width;
          // Calculate y based on sine waves, time, and strand index
          const amplitude = 100 + Math.sin(time * 0.5 + i) * 50;
          const frequency = 0.005 + (i * 0.001);
          const y = height / 2 + Math.sin(x * frequency + time + (i * 0.5)) * amplitude;
          
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Monochrome styling: fading white lines with varying opacities
        const opacity = 0.05 + (i * 0.02);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none mix-blend-screen" 
      style={{ width: '100%', height: '100%' }}
    />
  );
}
