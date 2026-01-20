
export enum GameState {
  IDLE = 'IDLE',           // Initial state, starry sky
  DIVINING = 'DIVINING',   // Constellation drawing animation
  REVEALING = 'REVEALING', // The specific star is hit
  VIEWING_CARD = 'VIEWING_CARD', // Viewing a card
  ANALYZING = 'ANALYZING', // AI analyzing preference
  DIALOGUE = 'DIALOGUE',   // Chat/Question phase
  CREATIVE_PATH = 'CREATIVE_PATH' // Final result
}

export interface ArtCardData {
  id: string;
  term: string;
  pronunciation?: string;
  era: string;
  shortDefinition: string;
  evocativeQuestion: string; // The "issue" to prompt thought
  visualElements: string[];  // e.g. ["Geometric", "Fluid", "Shadow"]
}

export interface UserInteraction {
  cardId: string;
  term: string;
  action: 'kept' | 'discarded';
  timestamp: number;
}

export interface StarState {
  id: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  z: number; // Depth scale 0.1 - 1.0
  brightness: number; // 0.1 - 1.0
}

export interface ActiveConstellation {
  path: number[]; // Array of star IDs
  progress: number; // 0.0 to 1.0 (overall progress)
}

export interface NetworkNode {
  id: string;
  label: string;
  x: number; // %
  y: number; // %
}

export interface NetworkLink {
  sourceId: string;
  targetId: string;
}

export interface AnalysisResult {
  archetype: string;
  philosophy: string;
  followUpQuestion: string;
  creativeAdvice?: string;
}

export interface CreativeArtResult {
  styleName: string;
  explanation: string;
  p5Code: string;
}
