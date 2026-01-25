import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';

import ArtArchive from './components/ArtArchive';
import AnalysisView from './components/AnalysisView';
import P5Renderer from './components/P5Renderer';
import LoadingTerminal from './components/LoadingTerminal';
import LanguageSwitcher from './components/LanguageSwitcher';

import { GameState, UserInteraction, AnalysisResult, CreativeArtResult } from './types';
import { analyzeUserStyle, generateCreativeArt } from './services/geminiService';
import { PREDEFINED_CARDS } from './constants';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);

  // In the Cabinet grid flow, we select from predefined cards directly
  const allCards = PREDEFINED_CARDS;

  const [userHistory, setUserHistory] = useState<UserInteraction[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [creativeResults, setCreativeResults] = useState<CreativeArtResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Handlers ---

  const handleGridSelectionComplete = async (selectedIds: string[]) => {
    // 1. Construct history from selections
    const selectedCards = allCards.filter(c => selectedIds.includes(c.id));

    const mockHistory: UserInteraction[] = selectedCards.map(c => ({
      cardId: c.id,
      term: c.term,
      visualElements: c.visualElements,
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
        archetype: t('analysis.fallbackArchetype'),
        philosophy: t('analysis.fallbackPhilosophy'),
        followUpQuestion: t('analysis.fallbackQuestion')
      });
    }
  };

  const handleFinalResponse = async (response: string) => {
    setAnalysis(null);
    setGameState(GameState.CREATIVE_PATH);

    const analysisPhilosophy = analysis?.philosophy || "Unknown";

    try {
      // Generate 3 specialized artworks in parallel: Static, Camera-reactive, and Audio-reactive
      const results = await Promise.all([
        generateCreativeArt(userHistory, analysisPhilosophy, response, 'static'),
        generateCreativeArt(userHistory, analysisPhilosophy, response, 'camera'),
        generateCreativeArt(userHistory, analysisPhilosophy, response, 'audio')
      ]);
      setCreativeResults(results);
      setCurrentIndex(0);
    } catch (e) {
      console.error(e);
      setCreativeResults([FALLBACK_CREATIVE_RESULT]);
    }
  };

  const resetGame = () => {
    setGameState(GameState.IDLE);
    setUserHistory([]);
    setAnalysis(null);
    setCreativeResults([]);
    setCurrentIndex(0);
  };

  const handleDownload = () => {
    const currentResult = creativeResults[currentIndex];
    if (!currentResult) return;

    const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${currentResult.styleName} - Art Archive Oracle</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/addons/p5.sound.min.js"></script>
  <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
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
        pointer-events: none;
        z-index: 100;
    }
    h1 { font-size: 3rem; margin: 0 0 1rem 0; font-weight: 200; letter-spacing: 0.05em; }
    p { font-size: 1rem; line-height: 1.6; opacity: 0.9; margin: 0; padding-left: 1rem; border-left: 1px solid rgba(255,255,255,0.5); }
    .meta { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 0.5rem; opacity: 0.7; }
    .gradient-drop {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60%;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0) 100%);
        pointer-events: none;
        z-index: 90;
    }
  </style>
</head>
<body>
  <div class="gradient-drop"></div>
  <div id="overlay">
    <div class="meta">${t('result.aestheticSignature')}</div>
    <h1>${currentResult.styleName}</h1>
    <p>${currentResult.explanation}</p>
  </div>
  <script>
    // Fix for "willReadFrequently" warning
    (function() {
      const oldGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function(type, attributes) {
        if (type === '2d') {
          attributes = attributes || {};
          attributes.willReadFrequently = true;
        }
        return oldGetContext.call(this, type, attributes);
      };
    })();

    // Ensure p5.js sound works with user gesture
    if (typeof window.userStartAudio === 'undefined') {
      window.userStartAudio = function() {
        if (window.getAudioContext && window.getAudioContext().resume) {
          return window.getAudioContext().resume();
        }
        return Promise.resolve();
      };
    }
    
    ${currentResult.p5Code}
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `art_${Date.now()}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="fixed inset-0 w-full h-full bg-black overflow-hidden text-[#d4d4d4] font-serif">

      {/* Language Switcher */}
      <LanguageSwitcher />

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
            <ArtArchive
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
      <AnimatePresence mode="wait">
        {gameState === GameState.CREATIVE_PATH && (
          <motion.div
            key="creative-path"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black flex flex-col cursor-auto"
          >
            {creativeResults.length > 0 ? (
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={currentIndex}>
                  <motion.div
                    key={currentIndex}
                    custom={currentIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 z-0">
                      <P5Renderer
                        code={creativeResults[currentIndex].p5Code}
                        styleName={creativeResults[currentIndex].styleName}
                        explanation={creativeResults[currentIndex].explanation}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Consistently Minimalist Control Panel */}
                <div className="absolute bottom-12 left-0 right-0 z-40 pointer-events-none flex justify-center px-6">
                  <div className="flex items-center pointer-events-auto bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] px-2">

                    {/* Navigation Cluster */}
                    <div className="flex items-center h-12 md:h-14">
                      <button
                        onClick={() => setCurrentIndex(prev => (prev - 1 + creativeResults.length) % creativeResults.length)}
                        className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-all hover:scale-110"
                      >
                        <ChevronLeft size={16} strokeWidth={1.5} />
                      </button>

                      <div className="px-4 flex flex-col items-center gap-1">
                        <span className="font-ui text-[9px] tracking-[0.3em] text-white/40">
                          {currentIndex + 1}&thinsp;/&thinsp;{creativeResults.length}
                        </span>
                        <div className="flex gap-1.5">
                          {creativeResults.map((_, i) => (
                            <div
                              key={i}
                              className={`h-[1px] transition-all duration-700 ${i === currentIndex ? 'bg-white w-4' : 'bg-white/10 w-2'}`}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentIndex(prev => (prev + 1) % creativeResults.length)}
                        className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white transition-all hover:scale-110"
                      >
                        <ChevronRight size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-2" />

                    {/* Actions Cluster */}
                    <div className="flex items-center h-12 md:h-14 gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1, color: "#fff" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDownload}
                        className="w-12 h-12 flex items-center justify-center text-white/40 transition-colors"
                        title={t('result.exportArchive')}
                      >
                        <Download size={18} strokeWidth={1.5} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1, color: "#fff" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={resetGame}
                        className="w-12 h-12 flex items-center justify-center text-white/40 transition-colors"
                        title={t('result.initializeNew')}
                      >
                        <RotateCcw size={18} strokeWidth={1.5} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <LoadingTerminal />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vercel Analytics */}
      <Analytics />

    </main>
  );
};

export default App;