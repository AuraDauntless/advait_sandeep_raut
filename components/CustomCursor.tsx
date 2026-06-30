"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest(".group")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center"
      animate={{
        x: mousePosition.x - 2, // slight offset to align the SVG arrow tip with the exact click point
        y: mousePosition.y - 2,
        scale: isHovering ? 1.4 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 30,
        mass: 0.2
      }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill={isHovering ? "white" : "none"}
        stroke="white" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
      >
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
      </svg>
    </motion.div>
  );
}
