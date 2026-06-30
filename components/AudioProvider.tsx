"use client";

import React, { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHoverTick: () => void;
  playCardHover: () => void;
  playClick: () => void;
}

const AudioStateContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx.current = new AudioContextClass();
    }
    return () => {
      if (audioCtx.current?.state !== 'closed') {
        audioCtx.current?.close().catch(() => {});
      }
    };
  }, []);

  const playSoundFile = (src: string, vol: number) => {
    if (isMuted) return;
    try {
      const audio = new Audio(src);
      audio.volume = vol;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (e) {}
  };

  const playHoverTick = () => playSoundFile("/card-sound.mp3", 0.4); // Buttons
  const playCardHover = () => playSoundFile("/card-sound.mp3", 0.15); // Cards (lesser volume)
  const playClick = () => playSoundFile("/click-sound.mp3", 0.8);

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <AudioStateContext.Provider value={{ isMuted, toggleMute, playHoverTick, playCardHover, playClick }}>
      {children}
    </AudioStateContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioStateContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
