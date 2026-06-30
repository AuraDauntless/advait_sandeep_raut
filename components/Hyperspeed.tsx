"use client";
import React, { useRef, useEffect } from 'react';

export default function Hyperspeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const numStars = 500;
    const stars: { x: number; y: number; z: number; o: number }[] = [];
    
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w * 2 - w,
        y: Math.random() * h * 2 - h,
        z: Math.random() * w,
        o: Math.random()
      });
    }

    const centerX = w / 2;
    const centerY = h / 2;
    let speed = 0.3; // Slowest possible ambient speed

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Draw solid black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        star.z -= speed;
        
        if (star.z <= 0) {
          star.x = Math.random() * w * 2 - w;
          star.y = Math.random() * h * 2 - h;
          star.z = w;
        }

        const k = 128.0 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        const tailZ = star.z + speed * 15; // length of streak
        const tk = 128.0 / tailZ;
        const tpx = star.x * tk + centerX;
        const tpy = star.y * tk + centerY;

        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const opacity = (1 - star.z / w) * star.o;
          ctx.beginPath();
          ctx.moveTo(tpx, tpy);
          ctx.lineTo(px, py);
          ctx.lineWidth = (1 - star.z / w) * 3;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-full"
    />
  );
}
