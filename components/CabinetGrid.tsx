
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtCardData } from '../types';
import GenerativeArt from './GenerativeArt';
import { ArrowRight } from 'lucide-react';

interface CabinetGridProps {
  cards: ArtCardData[];
  onSelectionComplete: (selectedIds: string[]) => void;
}

const CabinetGrid: React.FC<CabinetGridProps> = ({ cards, onSelectionComplete }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(sid => sid !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const isComplete = selectedIds.length >= 1;

  return (
    <div className="relative w-full h-full flex flex-col bg-black">

      {/* Manifest / Selection Header (Text-based) */}
      <div className="fixed top-6 right-8 z-50 pointer-events-none mix-blend-difference flex flex-col items-end font-serif">
        <div className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3 border-b border-white/20 pb-1">
          Manifest ({selectedIds.length}/3)
        </div>
        <div className="flex flex-col items-end space-y-1">
          {[0, 1, 2].map((i) => {
            const id = selectedIds[i];
            const card = id ? cards.find(c => c.id === id) : null;
            return (
              <div key={i} className="h-6 flex items-center justify-end">
                {card ? (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={card.id}
                    className="text-white tracking-widest text-sm md:text-base border-r-2 border-white pr-2"
                  >
                    {card.term}
                  </motion.span>
                ) : (
                  <span className="text-white/10 tracking-widest text-sm pr-2 border-r-2 border-white/10">—</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Full Screen Grid */}
      {/* Forced overflow-y-scroll to keep scrollbar track visible for visual consistency with spotlight mask */}
      <div className="flex-1 w-full overflow-y-scroll z-10">
        <div className="min-h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 bg-black/50 pb-32">
          {cards.map((card, index) => {
            const isSelected = selectedIds.includes(card.id);
            const isHovered = hoveredId === card.id;
            const isActive = isSelected || isHovered;

            return (
              <motion.div
                key={card.id}
                className={`
                    relative w-full aspect-square 
                    border-r border-b border-white/5 
                    cursor-pointer overflow-hidden group 
                    transition-colors duration-700
                    ${isSelected ? 'bg-white/5' : ''}
                  `}
                style={{
                  // Subtle staggered fade-in based on index
                  opacity: 0,
                  animation: `fadeIn 1s ease-out ${index * 0.05}s forwards`
                }}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleToggle(card.id)}
              >
                {/* CSS Animation Keyframes injection for fade-in */}
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                  `}</style>

                {/* Background: Art */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isSelected ? 0.3 : 0.6 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 z-0 pointer-events-none"
                    >
                      <GenerativeArt seed={card.term} visualElements={card.visualElements} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Text Label */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center">
                  {/* Main Term */}
                  <div className={`
                        font-serif text-sm md:text-base tracking-widest transition-all duration-500
                        ${isActive ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/20 group-hover:text-white/60'}
                    `}>
                    {card.term}
                  </div>

                  {/* Era - Only shows on hover/select */}
                  <div className={`
                        mt-2 font-ui text-[8px] tracking-[0.2em] uppercase transition-all duration-500
                        ${isActive ? 'opacity-70 translate-y-0 text-white' : 'opacity-0 translate-y-2'}
                    `}>
                    {card.era}
                  </div>
                </div>

                {/* Selection Marker (Minimal corner dot) */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                )}

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Visual Scroll Hint (Gradient Fade at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-20" />

      {/* Floating Action Button */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-0 right-0 flex justify-center z-[60] pointer-events-none"
          >
            <button
              onClick={() => onSelectionComplete(selectedIds)}
              className="pointer-events-auto group flex items-center gap-4 px-10 py-4 bg-white text-black font-ui text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <span>Synthesize</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CabinetGrid;
