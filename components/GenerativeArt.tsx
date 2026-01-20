
import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import { PREDEFINED_CARDS } from '../constants';
import { STYLE_GENERATORS } from "../visual_styles";

interface GenerativeArtProps {
  seed: string;
  visualElements: string[];
}

const GenerativeArt: React.FC<GenerativeArtProps> = ({ seed, visualElements }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Resolve Style ID
    // Since we generated a unique runtime ID for the card instance, we need to map 
    // the card's content (term) back to its original definition to find the correct visual style.
    const originalCard = PREDEFINED_CARDS.find(c => c.term === seed);
    const styleId = originalCard ? originalCard.id : 'rhizome';

    // 2. Get Sketch Logic
    // Fallback to rhizome if not found
    const sketchLogic = STYLE_GENERATORS[styleId] || STYLE_GENERATORS['rhizome'];

    // 3. Initialize p5
    const sketch = (p: p5) => {
      sketchLogic(p, seed);
    };

    const myP5 = new p5(sketch, containerRef.current);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (myP5 && (myP5 as any).customResize) {
          const { width, height } = entry.contentRect;
          (myP5 as any).customResize(width, height);
        }
      }
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      myP5.remove();
    };
  }, [seed, visualElements]);

  return <div ref={containerRef} className="w-full h-full absolute inset-0 mix-blend-screen" />;
};

export default GenerativeArt;
