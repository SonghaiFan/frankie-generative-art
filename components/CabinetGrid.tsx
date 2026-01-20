
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArtCardData } from '../types';
import GenerativeArt from './GenerativeArt';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CabinetGridProps {
  cards: ArtCardData[];
  onSelectionComplete: (selectedIds: string[]) => void;
}

const CabinetGrid: React.FC<CabinetGridProps> = ({ cards, onSelectionComplete }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setIsAtTop(e.currentTarget.scrollTop < 100);
  };

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
    <div
      onScroll={handleScroll}
      className="relative w-full h-full bg-black overflow-y-auto overflow-x-hidden snap-y snap-proximity selection:bg-white selection:text-black"
    >

      {/* 1. HERO SECTION (Architectural Layout) */}
      <section className="relative w-full min-h-screen snap-start flex flex-col">
        <div className="flex-1 border-b border-white/20 relative flex flex-col p-6 md:p-20 overflow-hidden">
          {/* Architectural Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

          {/* Technical Corner Markers */}
          <div className="absolute top-0 left-0 border-r border-b border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">A-101 // CORE</div>
          <div className="absolute top-0 right-0 border-l border-b border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">PHASE: 01</div>
          <div className="absolute bottom-0 left-0 border-r border-t border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">LAT: 40.7128 N</div>
          <div className="absolute bottom-0 right-0 border-l border-t border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">LNG: 74.0060 W</div>

          {/* Main Title Block */}
          <div className="relative z-10">
            <div className="flex flex-col border-l-2 border-white pl-8 md:pl-12">
              <span className="font-ui text-[10px] tracking-[0.8em] uppercase text-white/30 mb-4">SYSTEM READY</span>
              <h1 className="text-[12vw] md:text-[7.5vw] font-serif leading-[0.85] text-white tracking-widest uppercase mb-12">
                Art Archive<br />Oracle
              </h1>

              <div className="max-w-[320px] font-serif italic text-white/30 text-[11px] tracking-widest leading-loose border-t border-white/10 pt-8">
                <div className="font-ui text-[7px] tracking-[0.4em] mb-4 text-white/20 uppercase flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/20" />
                  ARCHIVE_MANIFESTO
                </div>
                "The void is not an absence, but a selective frequency. This machine translates your subconscious resonance into aesthetic geometry."
              </div>
            </div>
          </div>

          {/* Scroll Block */}
          <div className="mt-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-start-9 md:col-span-4 lg:col-start-10 lg:col-span-3">
              <div
                className="w-full h-40 border border-white/10 flex flex-col items-center justify-center pointer-events-none opacity-40"
              >
                <div className="font-ui text-[7px] tracking-[0.4em] mb-4 text-white/20 uppercase">SYSTEM_STATE</div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white/20 animate-pulse" />
                  <span className="font-ui text-[9px] tracking-[0.4em] uppercase text-white/40">Waiting for Input</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifest / Selection Header (Architectural Sidebar) */}
      <div className="fixed top-24 right-8 z-50 hidden md:block w-72">
        <div className="border border-white/20 bg-black/60 backdrop-blur-xl p-6 flex flex-col items-end">
          {/* Integrated Protocol Text */}
          <div className="w-full mb-8 border-b border-white/10 pb-6 text-right">
            <div className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/20 mb-3 flex items-center justify-end gap-2">
              <span className="w-8 h-px bg-white/10" />
              PROTOCOL V.4.0
            </div>
            <p className="font-serif text-[11px] text-white/40 italic leading-relaxed">
              Observe the archetypes. Calibrate your vision by selecting up to three frequencies below.
            </p>
          </div>

          <div className="font-ui text-[8px] tracking-[0.4em] uppercase text-white/20 mb-6 border-b border-white/10 pb-2 w-full text-right flex justify-between items-center">
            <span className="w-2 h-2 border border-white/20 inline-block" />
            MANIFEST : {selectedIds.length} / 03
          </div>
          <div className="flex flex-col items-end space-y-4 w-full">
            {[0, 1, 2].map((i) => {
              const id = selectedIds[i];
              const card = id ? cards.find(c => c.id === id) : null;
              return (
                <div key={i} className="flex flex-col items-end w-full group">
                  <div
                    className={`h-8 flex items-center justify-end w-full border-b border-white/10 relative transition-colors ${card ? 'cursor-pointer hover:border-white/40' : ''}`}
                    onClick={() => card && handleToggle(card.id)}
                  >
                    <AnimatePresence mode="wait">
                      {card ? (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          key={card.id}
                          className="flex items-center gap-3"
                        >
                          <span className="text-white tracking-[0.2em] text-[11px] uppercase font-ui font-medium">
                            {card.term}
                          </span>
                          <div className="w-1.5 h-1.5 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ) : (
                        <span className="text-white/10 tracking-widest text-[9px]">—</span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Full Screen Grid - Architectural Cells */}
      <div id="grid-start" className="w-full z-10 snap-start bg-black">
        <div className="border-t border-l border-white/20 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {cards.map((card, index) => {
            const isSelected = selectedIds.includes(card.id);
            const isHovered = hoveredId === card.id;
            const isActive = isSelected || isHovered;

            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 0.995 }}
                whileTap={{ scale: 0.98 }}
                className={`
                    relative w-full aspect-square 
                    border-r border-b border-white/10
                    cursor-pointer overflow-hidden group 
                    transition-all duration-300
                    ${isSelected ? 'bg-white/5' : 'bg-transparent'}
                  `}
                onMouseEnter={() => setHoveredId(card.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleToggle(card.id)}
              >
                {/* Index Number */}
                <div className="absolute top-2 left-3 font-ui text-[7px] text-white/20 group-hover:text-white/40">
                  {index < 10 ? `0${index}` : index}
                </div>

                {/* Selection Marker */}
                {isSelected && (
                  <motion.div
                    layoutId="selection-glow"
                    className="absolute inset-[1px] border border-white/40 z-10 pointer-events-none"
                  />
                )}

                {/* Background: Art */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isSelected ? 0.3 : 0.6 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0 pointer-events-none brightness-110"
                    >
                      <GenerativeArt seed={card.term} visualElements={card.visualElements} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Text Label - Centered */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                  <div className={`
                        font-ui text-[10px] md:text-[11px] tracking-[0.6em] uppercase transition-all duration-300 font-medium
                        ${isActive ? 'text-white translate-y-0' : 'text-white/30 group-hover:text-white/80'}
                    `}>
                    {card.term}
                  </div>
                  <div className={`
                        mt-2 font-ui text-[7px] tracking-[0.2em] text-white/40 uppercase transition-all duration-500
                        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    `}>
                    {card.era}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Visual Scroll Hint (Gradient Fade at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-20" />

      {/* Floating Action Button (Unified Action/Scroll) */}
      <AnimatePresence>
        {(isComplete || isAtTop) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-0 right-0 flex justify-center z-[60] pointer-events-none"
          >
            <button
              onClick={() => {
                if (isComplete) {
                  onSelectionComplete(selectedIds);
                } else {
                  document.getElementById('grid-start')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="pointer-events-auto group relative flex items-center justify-center w-16 h-16 bg-white text-black overflow-hidden hover:scale-110 transition-all shadow-[0_0_50px_rgba(255,255,255,0.4)]"
              title={isComplete ? "Synthesize Oracle" : "Explore Archive"}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="relative flex items-center justify-center">
                <motion.div
                  key={isComplete ? 'complete' : 'scroll'}
                  initial={{ opacity: 0, scale: 0.5, rotate: isComplete ? 0 : 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: isComplete ? 0 : 90 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isComplete ? <Sparkles size={20} /> : <ArrowRight size={20} />}
                </motion.div>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CabinetGrid;
