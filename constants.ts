import { ArtCardData } from "./types";
import { ALL_STYLES } from "./visual_styles";

// --- 1. PREDEFINED CARDS LIBRARY ---
export const PREDEFINED_CARDS: ArtCardData[] = ALL_STYLES.map((style) => ({
  id: style.id,
  term: style.name,
  era: style.era || "Unknown",
  shortDefinition: style.description,
  evocativeQuestion: style.prompt,
  visualElements: style.styleTags,
}));

// --- 2. HELPERS ---

export const FALLBACK_CREATIVE_RESULT = {
  styleName: "Static Void",
  explanation: "The oracle is silent. Only the void remains.",
  p5Code:
    "function setup(){createCanvas(windowWidth, windowHeight);background(0);} function draw(){stroke(255);point(random(width), random(height));}",
};
