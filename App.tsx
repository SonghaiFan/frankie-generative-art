import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

import CabinetGrid from './components/CabinetGrid';
import AnalysisView from './components/AnalysisView';
import P5Renderer from './components/P5Renderer';
import Spotlight from './components/Spotlight';

import { GameState, UserInteraction, AnalysisResult, CreativeArtResult } from './types';
import { analyzeUserStyle, generateCreativeArt } from './services/geminiService';
import { PREDEFINED_CARDS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);

  // In the Cabinet grid flow, we select from predefined cards directly
  const allCards = PREDEFINED_CARDS;

  const [userHistory, setUserHistory] = useState<UserInteraction[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [creativeResult, setCreativeResult] = useState<CreativeArtResult | null>(null);

  // --- Handlers ---

  const handleGridSelectionComplete = async (selectedIds: string[]) => {
    // 1. Construct history from selections
    const selectedCards = allCards.filter(c => selectedIds.includes(c.id));

    const mockHistory: UserInteraction[] = selectedCards.map(c => ({
      cardId: c.id,
      term: c.term,
      action: 'kept',
      timestamp: Date.now()
    }));

    setUserHistory(mockHistory);

    // 2. Move to Analysis State
    setGameState(GameState.ANALYZING);

    // 3. Trigger API
    performAnalysis(mockHistory);
  };

  const performAnalysis = async (history: UserInteraction[]) => {
    try {
      const result = await analyzeUserStyle(history);
      setAnalysis(result);
    } catch (e) {
      setAnalysis({
        archetype: "Void Walker",
        philosophy: "You seek structure within chaos.",
        followUpQuestion: "Is your order internal or external?"
      });
    }
  };

  const handleFinalResponse = async (response: string) => {
    setAnalysis(null);
    setGameState(GameState.CREATIVE_PATH);

    const analysisPhilosophy = analysis?.philosophy || "Unknown";

    try {
      const result = await generateCreativeArt(userHistory, analysisPhilosophy, response);
      setCreativeResult(result);
    } catch (e) {
      console.error(e);
    }
  };

  const resetGame = () => {
    setGameState(GameState.IDLE);
    setUserHistory([]);
    setAnalysis(null);
    setCreativeResult(null);
  };

  const handleDownload = () => {
    if (!creativeResult) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${creativeResult.styleName} - Art Archive Oracle</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@200;400;700&display=swap');
    body { margin: 0; padding: 0; overflow: hidden; background: #000; font-family: 'Noto Serif SC', serif; }
    canvas { display: block; }
    #overlay {
        position: absolute;
        bottom: 40px;
        left: 40px;
        max-width: 600px;
        color: white;
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 100;
    }
    h1 { font-size: 3rem; margin: 0 0 1rem 0; font-weight: 200; letter-spacing: 0.05em; }
    p { font-size: 1rem; line-height: 1.6; opacity: 0.9; margin: 0; padding-left: 1rem; border-left: 1px solid rgba(255,255,255,0.5); }
    .meta { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 0.5rem; opacity: 0.7; }
  </style>
</head>
<body>
  <div id="overlay">
    <div class="meta">Aesthetic Signature</div>
    <h1>${creativeResult.styleName}</h1>
    <p>${creativeResult.explanation}</p>
  </div>
  <script>
    ${creativeResult.p5Code}
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `art_oracle_${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black overflow-hidden text-[#d4d4d4] font-serif cursor-none">

      {/* 
         Global Spotlight:
         Provides the "Stage Light" / "Flashlight" effect. 
      */}
      <Spotlight isActive={true} />

      {/* LAYER 1: The Cabinet Grid (Idle State) */}
      <AnimatePresence>
        {gameState === GameState.IDLE && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <CabinetGrid
              cards={allCards}
              onSelectionComplete={handleGridSelectionComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAYER 2: Analysis View */}
      {(gameState === GameState.ANALYZING) && (
        <AnalysisView
          analysis={analysis}
          isLoading={!analysis}
          onRespond={handleFinalResponse}
        />
      )}

      {/* LAYER 3: Creative Result */}
      <AnimatePresence>
        {gameState === GameState.CREATIVE_PATH && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] bg-black flex flex-col cursor-auto"
          >
            {creativeResult ? (
              <>
                <div className="absolute inset-0 z-0">
                  <P5Renderer code={creativeResult.p5Code} />
                </div>

                {/* Final Overlay UI */}
                <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="max-w-xl pointer-events-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="font-ui text-xs tracking-[0.4em] uppercase text-white/50 mb-4">
                        Aesthetic Signature
                      </div>
                      <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 mix-blend-difference">
                        {creativeResult.styleName}
                      </h1>
                      <p className="font-ui text-sm md:text-base text-white/80 leading-relaxed border-l border-white/30 pl-6 mb-8 mix-blend-difference">
                        {creativeResult.explanation}
                      </p>

                      <div className="flex items-center gap-6">
                        <button
                          onClick={handleDownload}
                          className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors group"
                        >
                          <Download size={16} />
                          <span className="text-xs uppercase tracking-widest">Save Artifact</span>
                        </button>
                        <button
                          onClick={resetGame}
                          className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                        >
                          Restart Sequence
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-white/30 animate-pulse font-serif text-2xl">
                Synthesizing Final Form...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;