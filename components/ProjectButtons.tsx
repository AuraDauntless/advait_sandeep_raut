"use client";
import React from 'react';
import { useAudio } from './AudioProvider';

interface ProjectButtonsProps {
  liveUrl?: string;
  githubUrl?: string;
  liveText?: string;
  githubText?: string;
  liveClassName?: string;
  githubClassName?: string;
  containerClassName?: string;
}

export default function ProjectButtons({ 
  liveUrl, 
  githubUrl, 
  liveText = "View Live", 
  githubText = "GitHub",
  liveClassName = "",
  githubClassName = "",
  containerClassName = "flex flex-wrap gap-4"
}: ProjectButtonsProps) {
  const { playHoverTick, playClick } = useAudio();

  return (
    <div className={containerClassName}>
      {liveUrl && (
        <a 
          href={liveUrl} 
          target="_blank" 
          rel="noreferrer" 
          onMouseEnter={playHoverTick} 
          onMouseDown={playClick} 
          className={liveClassName}
        >
          {liveText}
        </a>
      )}
      {githubUrl && (
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noreferrer" 
          onMouseEnter={playHoverTick} 
          onMouseDown={playClick} 
          className={githubClassName}
        >
          {githubText}
        </a>
      )}
    </div>
  );
}
