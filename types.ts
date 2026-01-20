
export enum GameState {
  IDLE = 'IDLE',           // The Archive Grid view (Selection phase)
  ANALYZING = 'ANALYZING', // AI analyzing preference
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
