
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Crosshair, Download, Sparkles } from 'lucide-react';

import VoidField from './components/VoidField';
import LiquidCard from './components/LiquidCard';
import AnalysisView from './components/AnalysisView';
import P5Renderer from './components/P5Renderer';
import OnboardingOverlay from './components/OnboardingOverlay';
import { GameState, StarState, ArtCardData, UserInteraction, AnalysisResult, CreativeArtResult, NetworkNode, NetworkLink, ActiveConstellation } from './types';
import { generateArtCard, analyzeUserStyle, generateCreativeArt } from './services/geminiService';

// --- Star Field Generation ---
const generateStars = (count: number): StarState[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        // x and y are roughly 0-100 range, serving as initial seeds for the force graph
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 0.8 + 0.2, // Depth/Size
        brightness: Math.random() * 0.5 + 0.2
    }));
};

const INITIAL_STARS = generateStars(120); 

// --- Feedback Components ---

const ClickFeedback: React.FC<{ x: number, y: number }> = ({ x, y }) => (
    <motion.div 
        initial={{ opacity: 1, scale: 0 }}
        animate={{ opacity: 0, scale: 4, borderWidth: "0px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed z-50 pointer-events-none rounded-full border border-white"
        style={{ left: x, top: y, width: 20, height: 20, marginLeft: -10, marginTop: -10 }}
    />
);

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [stars, setStars] = useState<StarState[]>(INITIAL_STARS);
  
  // Track which star was clicked to turn it into a node later
  const [pendingStar, setPendingStar] = useState<StarState | null>(null);

  const [currentCard, setCurrentCard] = useState<ArtCardData | null>(null);
  const [userHistory, setUserHistory] = useState<UserInteraction[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [creativeResult, setCreativeResult] = useState<CreativeArtResult | null>(null);
  
  // Constellation / Network State
  const [activeConstellation, setActiveConstellation] = useState<ActiveConstellation | null>(null);
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([]);
  const [networkLinks, setNetworkLinks] = useState<NetworkLink[]>([]);
  
  // Visual States
  const [clickPos, setClickPos] = useState<{x: number, y: number} | null>(null);
  
  // Animation Frame Ref
  const animationRef = useRef<number>(0);

  const handleGlobalClick = (e: React.MouseEvent) => {
    // Only used for visual ripple if needed, or if user clicks empty space
    if (showOnboarding) return;
    setClickPos({ x: e.clientX, y: e.clientY });
  };

  const handleNodeClick = (starId: number) => {
    if (showOnboarding) return;
    if (gameState !== GameState.IDLE) return;

    // Find the star data
    const star = stars.find(s => s.id === starId);
    if (star) {
        setPendingStar(star);
        triggerConstellation(starId);
    }
  };

  const triggerConstellation = (targetId: number) => {
    setGameState(GameState.DIVINING);

    // Pick 2-3 predecessors to form a path TO the target
    const pathLength = Math.floor(Math.random() * 2) + 3; // 3 or 4 stars total
    const path = [targetId];
    
    // Find neighbors or random stars to connect from
    for (let i = 0; i < pathLength - 1; i++) {
        const randomPrev = stars[Math.floor(Math.random() * stars.length)].id;
        // Avoid duplicates
        if (!path.includes(randomPrev)) {
           path.unshift(randomPrev);
        }
    }

    setActiveConstellation({ path, progress: 0 });

    // Animate the path
    const startTime = performance.now();
    const duration = 1200; // Faster animation

    const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setActiveConstellation(prev => prev ? { ...prev, progress } : null);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            handleImpact(targetId);
        }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleImpact = (targetId: number) => {
      setClickPos(null);
      revealCard(targetId);
  };

  const revealCard = async (starId: number) => {
    setGameState(GameState.REVEALING);

    try {
        const exclude = userHistory.map(h => h.term);
        const cardData = await generateArtCard(exclude);
        
        setTimeout(() => {
            setCurrentCard(cardData);
            setGameState(GameState.VIEWING_CARD);
        }, 300); 
    } catch (e) {
        setGameState(GameState.IDLE);
        setActiveConstellation(null);
        setPendingStar(null);
    }
  };

  const handleCardInteraction = (kept: boolean) => {
    if (!currentCard) return;

    const interaction: UserInteraction = {
      cardId: currentCard.id,
      term: currentCard.term,
      action: kept ? 'kept' : 'discarded',
      timestamp: Date.now()
    };
    
    const newHistory = [...userHistory, interaction];
    setUserHistory(newHistory);

    // --- Network Logic ---
    if (kept && pendingStar) {
        // Transform the Pending Star into a Network Node
        // preserving its 'drawer' location (x, y percentages)
        const mainNode: NetworkNode = {
            id: currentCard.id,
            label: currentCard.term,
            x: pendingStar.x, 
            y: pendingStar.y
        };

        const newNodes = [mainNode];
        const newLinks: NetworkLink[] = [];

        // Add visual elements as connected concepts (optional: place them near the main node)
        currentCard.visualElements.forEach((tag, i) => {
             // Offset slightly from parent for the sub-nodes
             const offsetX = (Math.random() - 0.5) * 5; 
             const offsetY = (Math.random() - 0.5) * 5;
             
             newNodes.push({
                 id: `${currentCard.id}-${tag}`,
                 label: tag,
                 x: pendingStar.x + offsetX,
                 y: pendingStar.y + offsetY
             });
             // Link to main node
             newLinks.push({ sourceId: mainNode.id, targetId: `${currentCard.id}-${tag}` });
        });

        // Link the main node to previous history nodes to form a connected graph
        if (networkNodes.length > 0) {
             // Link to the most recent added node
             const prevNode = networkNodes[0]; 
             newLinks.push({ sourceId: mainNode.id, targetId: prevNode.id });
        }

        setNetworkNodes(prev => [...newNodes, ...prev]);
        setNetworkLinks(prev => [...newLinks, ...prev]);

        // Remove the star that was just "opened"
        setStars(prev => prev.filter(s => s.id !== pendingStar.id));
    }

    setCurrentCard(null);
    setActiveConstellation(null);
    setPendingStar(null);
    setGameState(GameState.IDLE);

    const keptCount = newHistory.filter(h => h.action === 'kept').length;
    if (keptCount >= 3) {
      setGameState(GameState.ANALYZING);
      performAnalysis(newHistory);
    }
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
    setActiveConstellation(null);
    setStars(generateStars(120));
    setNetworkNodes([]);
    setNetworkLinks([]);
    setPendingStar(null);
    setShowOnboarding(true);
  };

  const handleDownload = () => {
    if (!creativeResult) return;
    
    // Create a standalone HTML structure that includes the explanation overlay
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
    <main className="fixed inset-0 w-full h-full bg-black overflow-hidden text-[#d4d4d4]">
      
      {/* Onboarding Overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>

      {/* LAYER 0: Background & Force Graph */}
      {gameState !== GameState.CREATIVE_PATH && (
        <div className={`absolute inset-0 z-0 transition-all duration-1000 ${
            gameState !== GameState.IDLE && gameState !== GameState.DIVINING 
              ? 'opacity-30 blur-[2px] scale-95' 
              : 'opacity-100'
        }`}>
           <VoidField 
              stars={stars}
              activeConstellation={activeConstellation}
              networkNodes={networkNodes}
              networkLinks={networkLinks}
              onSpaceClick={handleGlobalClick}
              onNodeClick={handleNodeClick}
           />
        </div>
      )}

      {/* Click Ripple */}
      {clickPos && <ClickFeedback x={clickPos.x} y={clickPos.y} />}

      <AnimatePresence>
        {gameState === GameState.VIEWING_CARD && currentCard && (
          <LiquidCard 
            data={currentCard}
            onKeep={() => handleCardInteraction(true)}
            onDiscard={() => handleCardInteraction(false)}
          />
        )}
      </AnimatePresence>

      {(gameState === GameState.ANALYZING) && (
        <AnalysisView 
          analysis={analysis} 
          isLoading={!analysis}
          onRespond={handleFinalResponse}
        />
      )}

      {/* Final Result Overlay */}
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
                        
                        <div className="absolute bottom-12 left-8 md:left-12 max-w-xl z-10 mix-blend-difference pointer-events-none">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 2, duration: 1 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="font-ui text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2">Aesthetic Signature</h2>
                                    <h1 className="text-4xl md:text-5xl font-serif text-white tracking-wide">{creativeResult.styleName}</h1>
                                </div>
                                <div className="w-12 h-[1px] bg-white/50" />
                                <p className="font-ui text-sm text-white/80 leading-relaxed">
                                    {creativeResult.explanation}
                                </p>
                            </motion.div>
                        </div>
                        
                        <div className="absolute bottom-12 right-12 z-20 flex flex-row items-center gap-8">
                            <button 
                                onClick={handleDownload}
                                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white"
                                title="Export Art as HTML"
                            >
                                <Download size={20} />
                            </button>
                            <button onClick={resetGame} className="font-ui text-[10px] uppercase text-white hover:underline">Reset</button>
                        </div>
                    </>
                 ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-6">
                        <div className="w-px h-16 bg-white/20 animate-pulse" />
                        <p className="font-ui text-[10px] tracking-[0.4em] uppercase text-white/40">Synthesizing Visual Language</p>
                    </div>
                 )}
             </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;
