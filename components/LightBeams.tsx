"use client";
import { motion } from 'framer-motion';

export default function LightBeams() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen opacity-40 fixed">
      {/* Beam 1 */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [1, 1.5, 1], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[20%] w-[100px] h-[150vh] bg-gradient-to-b from-white/20 via-white/5 to-transparent -rotate-12 blur-[15px]"
        style={{ transformOrigin: "top center" }}
      />
      {/* Beam 2 */}
      <motion.div
        animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [1, 2, 1], x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[-20%] left-[60%] w-[150px] h-[150vh] bg-gradient-to-b from-white/10 via-white/5 to-transparent rotate-12 blur-[20px]"
        style={{ transformOrigin: "top center" }}
      />
      {/* Beam 3 */}
      <motion.div
        animate={{ opacity: [0.1, 0.7, 0.1], scaleX: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[-10%] right-[10%] w-[80px] h-[150vh] bg-gradient-to-b from-white/15 via-white/5 to-transparent -rotate-6 blur-[10px]"
        style={{ transformOrigin: "top center" }}
      />
    </div>
  );
}
