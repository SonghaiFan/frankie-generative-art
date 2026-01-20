
import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface SpotlightProps {
  isActive: boolean;
}

const Spotlight: React.FC<SpotlightProps> = ({ isActive }) => {
  // Initialize in center for that "Stage Light" feel immediately upon load
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 
         The Darkness/Beam Overlay 
         We use a radial gradient that is transparent in the middle and black outside.
         Radius adjusted to 600px for a more focused "stage light" feel on desktop.
         
         CRITICAL: We set width to calc(100% - 10px) to ensure the rightmost scrollbar 
         area is NOT covered by this overlay. This ensures the pure white scrollbar 
         remains visible and "above" the darkness.
      */}
      <motion.div 
        className="pointer-events-none fixed top-0 left-0 bottom-0 z-40 will-change-transform"
        style={{
          width: 'calc(100% - 10px)',
          background: "radial-gradient(circle 600px at var(--x) var(--y), transparent 5%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.95) 60%, #000 100%)",
        }}
      >
        <GradientUpdater x={smoothX} y={smoothY} />
      </motion.div>

      {/* The Cursor Dot - Subtle feedback */}
      <motion.div 
        className="fixed top-0 left-0 z-[100] pointer-events-none mix-blend-difference"
        style={{ 
            x: mouseX, 
            y: mouseY, 
            translateX: '-50%', 
            translateY: '-50%' 
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80" />
      </motion.div>
    </>
  );
};

const GradientUpdater: React.FC<{ x: any, y: any }> = ({ x, y }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        const update = () => {
            if (ref.current && ref.current.parentElement) {
                ref.current.parentElement.style.setProperty('--x', `${x.get()}px`);
                ref.current.parentElement.style.setProperty('--y', `${y.get()}px`);
            }
        };
        const unsubX = x.on("change", update);
        const unsubY = y.on("change", update);
        return () => { unsubX(); unsubY(); };
    }, [x, y]);
    return <div ref={ref} style={{ display: 'none' }} />;
};

export default Spotlight;
