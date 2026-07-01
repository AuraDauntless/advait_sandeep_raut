"use client";
import React, { useState, useEffect } from "react";

export default function ReactionDotMinigame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [dotPos, setDotPos] = useState({ x: 50, y: 50 });

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsActive(true);
    moveDot();
  };

  const moveDot = () => {
    // Generate a random X and Y percentage between 5% and 95%.
    // This provides a 5% margin padding to ensure the dot never overflows 
    // the boundaries of the playable grid container, keeping the geometry clean.
    const newX = Math.floor(Math.random() * 90) + 5;
    const newY = Math.floor(Math.random() * 90) + 5;
    setDotPos({ x: newX, y: newY });
  };

  const handleDotClick = () => {
    if (!isActive) return;
    setScore((prev) => prev + 1);
    moveDot();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (score > highScore) {
        setHighScore(score);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, score, highScore]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 bg-[#0c0a1a] border border-purple-900/30 rounded-[40px] p-6 sm:p-8 font-sans shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-purple-900/40 pb-4 gap-4 sm:gap-0">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-purple-300/70 font-mono uppercase tracking-[0.2em]">Starcatcher Module</span>
          <span className="text-xl font-bold text-purple-100 font-mono">
            {isActive ? "ACTIVE ✨" : "IDLE 🌙"}
          </span>
        </div>
        
        <div className="flex gap-8 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-purple-300/70 tracking-wider">T-MINUS</span>
            <span className="text-lg text-white">{timeLeft}s</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-purple-300/70 tracking-wider">STARS</span>
            <span className="text-lg text-white">{score}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-purple-300/70 tracking-wider">RECORD</span>
            <span className="text-lg text-white">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Playable Area */}
      <div className="relative w-full aspect-video sm:aspect-[21/9] bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 border-2 border-purple-500/20 rounded-[32px] overflow-hidden select-none touch-none shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Galaxy Star Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 1px, transparent 1px), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.5) 2px, transparent 2px)', 
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
          }}
        />

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm z-20">
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold text-sm tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(232,121,249,0.5)]"
            >
              {timeLeft === 0 ? "Play Again ✨" : "Start Game 🚀"}
            </button>
          </div>
        )}

        {isActive && (
          <div 
            className="absolute z-10"
            style={{
              left: `${dotPos.x}%`,
              top: `${dotPos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div 
              onPointerDown={handleDotClick}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-tr from-pink-300 to-purple-100 rounded-full cursor-crosshair hover:scale-110 active:scale-75 transition-transform shadow-[0_0_20px_rgba(244,114,182,0.8)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
