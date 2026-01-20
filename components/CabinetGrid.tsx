
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArtCardData } from '../types';
import GenerativeArt from './GenerativeArt';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CabinetGridProps {
  cards: ArtCardData[];
  onSelectionComplete: (selectedIds: string[]) => void;
}

const CabinetGrid: React.FC<CabinetGridProps> = ({ cards, onSelectionComplete }) => {
  const { t } = useTranslation();
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
          <div className="absolute top-0 left-0 border-r border-b border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">A-101 // {t('hero.coreLabel')}</div>
          <div className="absolute top-0 right-0 border-l border-b border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">{t('hero.phase')}</div>
          <div className="absolute bottom-0 left-0 border-r border-t border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">LAT: 40.7128 N</div>
          <div className="absolute bottom-0 right-0 border-l border-t border-white/10 px-3 py-1.5 font-ui text-[8px] tracking-[0.2em] uppercase text-white/20">LNG: 74.0060 W</div>

          {/* Main Title Block */}
          <div className="relative z-10">
            <div className="flex flex-col border-l-2 border-white pl-8 md:pl-12">
              <span className="font-ui text-[10px] tracking-[0.8em] uppercase text-white/30 mb-4">{t('hero.systemReady')}</span>
              <h1 className="text-[12vw] md:text-[7.5vw] font-serif leading-[0.85] text-white tracking-widest uppercase mb-12" style={{ whiteSpace: 'pre-line' }}>
                {t('hero.title')}
              </h1>

              <div className="max-w-[320px] font-serif italic text-white/30 text-[11px] tracking-widest leading-loose border-t border-white/10 pt-8">
                <div className="font-ui text-[7px] tracking-[0.4em] mb-4 text-white/20 uppercase flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/20" />
                  {t('hero.manifestLabel')}
                </div>
                "{t('hero.manifestText')}"
              </div>
            </div>
          </div>

          {/* Scroll Block */}
          <div className="mt-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-start-9 md:col-span-4 lg:col-start-10 lg:col-span-3">
              <div
                className="w-full h-40 border border-white/10 flex flex-col items-center justify-center pointer-events-none opacity-40"
              >
                <div className="font-ui text-[7px] tracking-[0.4em] mb-4 text-white/20 uppercase">{t('hero.systemState')}</div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-white/20 animate-pulse" />
                  <span className="font-ui text-[9px] tracking-[0.4em] uppercase text-white/40">{t('hero.waitingForInput')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Integrated Floating Action & Manifest */}
      <AnimatePresence>
        {(isComplete || isAtTop) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-0 right-0 flex justify-center z-[60] pointer-events-none"
          >
            <div className="flex items-stretch pointer-events-auto bg-black border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

              {/* Manifest Slots (Architectural) */}
              <div className="flex items-center gap-6 px-6 border-r border-white/10">
                <div className="flex items-center gap-5">
                  {[0, 1, 2].map((i) => {
                    const id = selectedIds[i];
                    const card = id ? cards.find(c => c.id === id) : null;
                    return (
                      <div key={i} className="flex items-center gap-2 group/item">
                        <div
                          className={`w-2 h-2 border transition-all duration-500 ${card ? 'bg-white border-white rotate-45' : 'border-white/20'}`}
                        />
                        <AnimatePresence>
                          {card && (
                            <motion.button
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggle(card.id);
                              }}
                              className="overflow-hidden whitespace-nowrap"
                            >
                              <span className="font-ui text-[9px] tracking-[0.2em] uppercase text-white/60 group-hover/item:text-white transition-colors">
                                {card.term}
                              </span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                <div className="h-4 w-px bg-white/10" />
                <span className="font-ui text-[9px] tracking-[0.4em] uppercase text-white/20">
                  {selectedIds.length}/3
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (isComplete) {
                    onSelectionComplete(selectedIds);
                  } else {
                    document.getElementById('grid-start')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group relative flex items-center justify-center w-20 h-14 transition-all duration-500 ${isComplete ? 'bg-white text-black' : 'bg-transparent text-white/40'}`}
                title={isComplete ? t('cabinet.synthesizeOracle') : t('cabinet.exploreArchive')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <motion.div
                  key={isComplete ? 'complete' : 'scroll'}
                  initial={{ opacity: 0, scale: 0.8, rotate: isComplete ? 0 : 90 }}
                  animate={{ opacity: 1, scale: 1, rotate: isComplete ? 0 : 90 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isComplete ? <Sparkles size={18} /> : <ArrowRight size={18} />}
                </motion.div>
                <span className="sr-only">{isComplete ? t('cabinet.synthesizeOracle') : t('cabinet.exploreArchive')}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CabinetGrid;
