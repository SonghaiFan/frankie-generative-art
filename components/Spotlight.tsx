
import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface SpotlightProps {
  isActive: boolean;
}

const Spotlight: React.FC<SpotlightProps> = ({ isActive }) => {
  // 1. Raw Mouse Position (Instant) - For the Cursor Dot
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  // 2. Spring Physics (Smooth) - Only for the Atmosphere/Beam
  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update raw values immediately
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* The Darkness/Beam Overlay - Expanded Visibility */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-40 will-change-transform"
        style={{
          // Increased radius to 800px and adjusted stops for a smoother falloff
          background: "radial-gradient(circle 800px at var(--x) var(--y), transparent 10%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.9) 70%, #000 100%)",
        }}
      >
        {/* We use a CSS variable helper to bind the spring values to the gradient efficiently */}
        <GradientUpdater x={smoothX} y={smoothY} />
      </motion.div>

      {/* The Cursor Dot - Follows Instantly (1:1 with hardware mouse) */}
      <motion.div 
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-screen"
        style={{ 
            x: mouseX, 
            y: mouseY, 
            translateX: '-50%', 
            translateY: '-50%' 
        }}
      >
        {/* Core Dot - Sharp and precise */}
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_1px_rgba(255,255,255,1)]" />
        
        {/* Subtle Ring - Decorative */}
        <div className="absolute inset-0 -m-3 w-8 h-8 border border-white/20 rounded-full animate-pulse opacity-50" />
      </motion.div>
    </>
  );
};

// Optimization component to update CSS variables for the gradient
const GradientUpdater: React.FC<{ x: any, y: any }> = ({ x, y }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const update = () => {
            if (ref.current) {
                const parent = ref.current.parentElement;
                if (parent) {
                    parent.style.setProperty('--x', `${x.get()}px`);
                    parent.style.setProperty('--y', `${y.get()}px`);
                }
            }
        };
        const unsubX = x.on("change", update);
        const unsubY = y.on("change", update);
        return () => { unsubX(); unsubY(); };
    }, [x, y]);

    return <div ref={ref} style={{ display: 'none' }} />;
};

export default Spotlight;
