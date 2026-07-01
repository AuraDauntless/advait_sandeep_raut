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
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 bg-[#0a0a0a] border border-[#222222] rounded p-6 font-sans">
      
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#222222] pb-4 gap-4 sm:gap-0">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em]">Reaction Matrix Module</span>
          <span className="text-xl font-bold text-gray-100 font-mono">
            {isActive ? "SYS_ACTIVE" : "SYS_IDLE"}
          </span>
        </div>
        
        <div className="flex gap-8 font-mono">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 tracking-wider">T-MINUS</span>
            <span className="text-lg text-white">{timeLeft}s</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 tracking-wider">SCORE</span>
            <span className="text-lg text-white">{score}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 tracking-wider">HI-SCORE</span>
            <span className="text-lg text-white">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Playable Area */}
      <div className="relative w-full aspect-video sm:aspect-[21/9] bg-[#121212] border border-[#222222] rounded overflow-hidden select-none touch-none">
        
        {/* Flat Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        />

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
            <button 
              onClick={startGame}
              className="px-8 py-2 bg-white text-black font-mono font-bold text-xs tracking-widest uppercase hover:bg-gray-200 active:bg-gray-300 transition-colors"
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
              className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full cursor-crosshair hover:scale-110 active:scale-90 transition-transform"
            />
          </div>
        )}
      </div>
    </div>
  );
}
