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
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 bg-[#0a0c10] border border-blue-900/30 rounded-2xl p-6 sm:p-8 font-sans shadow-2xl">
      
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-blue-900/40 pb-4 gap-4 sm:gap-0">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-blue-300/70 font-mono uppercase tracking-[0.2em]">Reaction Protocol</span>
          <span className="text-xl font-bold text-blue-100 font-mono tracking-tight">
            {isActive ? "SYS_ACTIVE" : "SYS_IDLE"}
          </span>
        </div>
        
        <div className="flex gap-8 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-blue-300/70 tracking-wider">T-MINUS</span>
            <span className="text-lg text-white">{timeLeft}s</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-blue-300/70 tracking-wider">SCORE</span>
            <span className="text-lg text-white">{score}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-blue-300/70 tracking-wider">RECORD</span>
            <span className="text-lg text-white">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Playable Area */}
      <div className="relative w-full aspect-video sm:aspect-[21/9] bg-gradient-to-br from-[#060913] via-[#0b1021] to-[#05070a] border border-blue-800/30 rounded-xl overflow-hidden select-none touch-none shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
        
        {/* Deep Galaxy Star Pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 1px, transparent 1px), radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.5) 2px, transparent 2px)', 
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
          }}
        />

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#05070a]/60 backdrop-blur-[2px] z-20">
            <button 
              onClick={startGame}
              className="px-8 py-2.5 bg-blue-600/10 text-blue-100 border border-blue-500/30 font-mono font-semibold text-xs tracking-widest rounded-lg hover:bg-blue-600/20 active:bg-blue-600/30 transition-all shadow-[0_0_15px_rgba(59,130,246,0.15)]"
            >
              {timeLeft === 0 ? "RESTART_SEQ" : "INITIATE"}
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
              className="w-5 h-5 sm:w-6 sm:h-6 bg-cyan-100 rounded-full cursor-crosshair hover:scale-110 active:scale-75 transition-transform shadow-[0_0_15px_rgba(103,232,249,0.6)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
