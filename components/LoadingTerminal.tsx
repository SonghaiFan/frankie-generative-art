
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CODE_SNIPPETS = [
  "正在检索审美原型...",
  "Searching for aesthetic archetypes in the void...",
  "Fragmented memories: Synchronizing with the archive...",
  "正在提取潜意识模式...",
  "Tracing the golden ratio within chaos...",
  "Soul synthesis: Level 0.72...",
  "正在重构艺术史的碎片...",
  "Weaving light through traditional silk...",
  "Awaiting the oracle's verdict...",
  "正在将情感转化为几何逻辑...",
  "Geometric logic: Processing subconscious impulses...",
  "Oracle is observing your choices...",
  "正在唤醒沉睡的视觉语言...",
];

const LoadingTerminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines(prev => {
        const nextSnippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
        const timestamp = (Math.random() * 0.9999).toFixed(4);
        const newLine = `[${timestamp}] — ${nextSnippet}`;
        const updated = [...prev, newLine];
        return updated.slice(-12); // Keep last 12 lines
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      
      {/* Moving Text Logs (Moved to corners to avoid overlap) */}
      <div className="absolute bottom-12 left-12 w-64 font-serif italic text-[9px] text-white/20 space-y-1 h-32 flex flex-col justify-end overflow-hidden mask-fade-top">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-nowrap tracking-widest"
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Main Loading Visual: The Oracle's Eye */}
      <div className="relative flex flex-col items-center justify-center gap-16 z-10 pointer-events-none">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Poetic pulses */}
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 border border-white/20 rounded-full blur-[1px]"
          />

          {/* Core: The blinking pupil */}
          <div className="relative">
             <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
             <motion.div 
               animate={{ scale: [1, 5], opacity: [0.3, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
               className="absolute inset-0 w-1 h-1 bg-white rounded-full"
             />
          </div>
        </div>
        
        <div className="flex flex-col gap-4 items-center">
           <motion.span 
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="font-ui text-[8px] tracking-[1em] uppercase text-white/30"
           >
             Synthesis
           </motion.span>
           <h2 className="font-serif italic text-2xl text-white/80 tracking-widest font-light">
             先知正在构思...
           </h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingTerminal;
