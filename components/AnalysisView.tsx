
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../types';
import { ArrowRight } from 'lucide-react';

interface AnalysisViewProps {
  analysis: AnalysisResult | null;
  onRespond: (response: string) => void;
  isLoading: boolean;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis, onRespond, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onRespond(inputText);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-center px-6 md:px-24 py-12">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="max-w-7xl w-full mx-auto"
      >
        {isLoading ? (
          <div className="flex flex-col items-start space-y-4">
             <div className="h-[1px] w-12 bg-white/50 animate-pulse" />
             <h2 className="text-4xl font-serif text-white/30 animate-pulse">Constructing Profile...</h2>
          </div>
        ) : analysis ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-end">
             
             {/* Left Column: Analysis */}
             <div className="space-y-12">
                <div className="space-y-4">
                    <span className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/50 block">Archetype Identified</span>
                    <h1 className="text-6xl md:text-8xl font-serif text-white leading-none tracking-tight">
                        {analysis.archetype}
                    </h1>
                </div>

                <div className="space-y-4">
                    <div className="w-full h-[1px] bg-white/20" />
                    <p className="font-ui text-lg text-white/70 font-light leading-relaxed max-w-md">
                        {analysis.philosophy}
                    </p>
                </div>
             </div>

             {/* Right Column: Inquiry */}
             <div className="space-y-12">
                 <div className="relative">
                     <span className="absolute -left-8 top-0 font-serif text-4xl text-white/20">"</span>
                     <p className="font-serif text-3xl md:text-4xl text-white leading-tight">
                        {analysis.followUpQuestion}
                     </p>
                 </div>

                 {/* Minimal Input */}
                 <form onSubmit={handleSubmit} className="relative pt-8">
                     <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your response..."
                        className="w-full bg-transparent border-b border-white/30 py-4 text-xl font-ui text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                        autoFocus
                     />
                     <button 
                        type="submit"
                        disabled={!inputText.trim()}
                        className="absolute right-0 bottom-4 p-2 text-white/50 hover:text-white disabled:opacity-0 transition-all"
                     >
                        <ArrowRight size={24} />
                     </button>
                 </form>
             </div>

          </div>
        ) : null}
      </motion.div>
    </div>
  );
};

export default AnalysisView;
