import p5 from "p5";
import { abstractStyles } from "./abstract";
import { atmosphereStyles } from "./atmosphere";
import { digitalStyles } from "./digital";
import { geometryStyles } from "./geometry";
import { minimalismStyles } from "./minimalism";
import { painterlyStyles } from "./painterly";
import { popStyles } from "./pop";
import { traditionalStyles } from "./traditional";
import { ArtStyle } from "../types";

export const ALL_STYLES: ArtStyle[] = [
  ...abstractStyles,
  ...atmosphereStyles,
  ...digitalStyles,
  ...geometryStyles,
  ...minimalismStyles,
  ...painterlyStyles,
  ...popStyles,
  ...traditionalStyles,
];

// Create the mapping for the GenerativeArt component
export const STYLE_GENERATORS: Record<string, (p: p5, seed: string) => void> =
  Object.fromEntries(ALL_STYLES.map((style) => [style.id, style.sketch]));

// Lookup by ID
export const STYLES_BY_ID: Record<string, ArtStyle> = Object.fromEntries(
  ALL_STYLES.map((style) => [style.id, style]),
);
