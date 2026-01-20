
import React from 'react';
import { motion } from 'framer-motion';
import { ArtCardData } from '../types';
import { X, Check } from 'lucide-react';
import GenerativeArt from './GenerativeArt';

interface LiquidCardProps {
  data: ArtCardData;
  onKeep: () => void;
  onDiscard: () => void;
}

const LiquidCard: React.FC<LiquidCardProps> = ({ data, onKeep, onDiscard }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      {/* Darkened Backdrop for Focus */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-all duration-700" />

      {/* Simplified Card Container */}
      <div className="relative w-full max-w-[400px] aspect-[3/5] rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] bg-black">
          
          {/* Layer 1: Symbolic Generative Background */}
          <div className="absolute inset-0 z-0">
               <GenerativeArt seed={data.term} visualElements={data.visualElements} />
          </div>

          {/* Layer 2: Gradient for Legibility (Optional now with difference mode, but kept for depth) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10 pointer-events-none" />

          {/* Layer 3: Content */}
          <div className="relative z-20 h-full flex flex-col justify-between p-8 text-white pointer-events-none">
              
              {/* Top: Metadata */}
              <div className="text-center pt-4">
                  <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-ui text-[10px] tracking-[0.3em] uppercase border border-white/60 rounded-full px-3 py-1 inline-block mix-blend-difference shadow-lg"
                  >
                      {data.era}
                  </motion.div>
              </div>
              
              {/* Middle: Core Concept */}
              <div className="flex flex-col items-center justify-center text-center space-y-6 mix-blend-difference">
                  <motion.h2 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl md:text-5xl font-serif font-bold tracking-wide text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
                  >
                      {data.term}
                  </motion.h2>

                  <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="font-ui text-sm text-white font-medium leading-relaxed border-l-2 border-white pl-4 text-left drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
                  >
                      {data.shortDefinition}
                  </motion.p>
              </div>

              {/* Bottom: Question & Action */}
              <div className="space-y-8 pb-4 pointer-events-auto">
                  <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="font-serif italic text-lg text-white text-center leading-snug mix-blend-difference drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
                  >
                      "{data.evocativeQuestion}"
                  </motion.div>

                  <div className="flex items-center justify-between px-4">
                      <button 
                          onClick={onDiscard}
                          className="w-12 h-12 rounded-full border border-white/40 bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:border-white transition-all group shadow-lg"
                      >
                          <X size={20} className="text-white group-hover:scale-110 transition-transform" />
                      </button>

                      <span className="font-ui text-[9px] tracking-widest uppercase text-white/50 mix-blend-difference">
                          Decide
                      </span>

                      <button 
                          onClick={onKeep}
                          className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      >
                          <Check size={20} />
                      </button>
                  </div>
              </div>

          </div>
      </div>
    </motion.div>
  );
};

export default LiquidCard;
