import { GoogleGenAI, Type } from "@google/genai";
import { UserInteraction, AnalysisResult, CreativeArtResult } from "../types";
import { FALLBACK_CREATIVE_RESULT } from "../constants";

const apiKey =
  process.env.API_KEY && process.env.API_KEY !== "undefined"
    ? process.env.API_KEY
    : "";
const ai = new GoogleGenAI({ apiKey });

/**
 * Helper to clean and parse JSON from AI response
 */
function cleanAndParseJSON<T>(text: string): T {
  const jsonString = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(jsonString) as T;
}

/**
 * Analyze user preferences
 */
export const analyzeUserStyle = async (
  history: UserInteraction[],
): Promise<AnalysisResult> => {
  // If no API key, return a poetic fallback
  if (!apiKey)
    return {
      archetype: "无名观察者",
      philosophy: "你似乎在寻找一种超越形式的秩序，在混乱与结构之间游走。",
      followUpQuestion: "当混乱降临时，你会试图整理它，还是加入它？",
    };

  const interactionsText =
    history.length > 0
      ? history
          .map(
            (h) =>
              `User ${h.action} the concept "${h.term}"${h.visualElements ? ` (Visual Elements: ${h.visualElements.join(", ")})` : ""}.`,
          )
          .join("\n")
      : "The user has just started browsing.";

  const prompt = `
    Role: Senior Art Historian & Jungian Psychologist.
    Task: Analyze the user's aesthetic preferences based on their interactions.
    
    Interactions:
    ${interactionsText}

    Requirements:
    1. Identify a "Style Archetype" (poetic title in Chinese).
    2. Provide a 2-3 sentence psychological analysis of their aesthetic tendencies (in Chinese).
    3. Ask one deep, philosophical question about art/society related to their choices (in Chinese).

    Output Format:
    Strictly JSON with keys: "archetype", "philosophy", "followUpQuestion".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            archetype: { type: Type.STRING },
            philosophy: { type: Type.STRING },
            followUpQuestion: { type: Type.STRING },
          },
          required: ["archetype", "philosophy", "followUpQuestion"],
        },
      },
    });

    const text = response.text || "{}";
    // Remove potential markdown clutter just in case
    const jsonString = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(jsonString) as AnalysisResult;
  } catch (error) {
    console.error("Analysis Error:", error);
    return {
      archetype: "虚空行者",
      philosophy: "你的选择充满了矛盾与张力，显示出一种不被定义的自由。",
      followUpQuestion: "你拒绝定义，是为了保护自己，还是为了保持可能？",
    };
  }
};

// Final Generative Art - AI generates p5.js code
export const generateCreativeArt = async (
  history: UserInteraction[],
  analysisText: string,
  finalComment: string,
): Promise<CreativeArtResult> => {
  const visualTags = Array.from(
    new Set(history.flatMap((h) => h.visualElements || [])),
  );
  const historySummary = history.map((h) => h.term).join(", ");
  const visualSummary = visualTags.join(", ");
  const prompt = `
      CONTEXT:
      User Preference: ${historySummary}
      Associated Visual Elements: ${visualSummary}
      Psychological Profile: "${analysisText}"
      User Comment: "${finalComment}"

      TASK:
      1. Invent a specific, unique art movement name (e.g., "Resonant Dataism", "Echoic Void").
      2. Explain the visual language (forms, colors, motion) in Chinese.
      3. Write a COMPLETE, FUNCTIONAL p5.js sketch representing this style.

      TECHNICAL CONSTRAINTS & LIBRARIES:
      - **Global Mode**: Define 'setup()' and 'draw()' at the top level.
      - **Responsiveness**: Use 'createCanvas(windowWidth, windowHeight)'. MUST include 'windowResized()'.
      - **No External Assets**: DO NOT use 'loadImage', 'loadFont', or 'p5.SoundFile'. You CANNOT load external files.
      
      AVAILABLE CAPABILITIES:
      Decide which of the following tools best represent the chosen style. You should integrate the ones that heighten the artistic expression:

      1. **Audio (p5.sound)**:
         - Audio-Reactive: 'p5.AudioIn' (Mic), 'p5.FFT' (Spectrum/Waveform).
         - Generative Audio/Synthesis: 'p5.Oscillator', 'p5.MonoSynth', 'p5.PolySynth', 'p5.Noise', 'p5.Envelope'.
         - Effects: 'p5.Reverb', 'p5.Delay', 'p5.Filter'.
      
      2. **Images & Pixels**:
         - Real-time Video: 'createCapture(VIDEO)' for webcam input.
         - Pixel Manipulation: 'loadPixels()', 'pixels[]', 'updatePixels()', 'get()', 'set()'.
         - Off-screen Buffers: 'createGraphics()'.

      3. **Interaction**:
         - Mouse/Touch: 'mouseX', 'mouseY', 'pmouseX', 'mousePressed()', 'touchStarted()'.
         - Motion: Device orientation/acceleration if applicable.

      4. **Machine Learning (ml5.js)**:
         - Pose/Object/Face detection via webcam.

      CRITICAL RULES:
      - **Robustness**: Always check if classes exist before instantiation
      - **Efficiency**: Use HSB color mode for fluid changes. If using 3D, use 'WEBGL'.
      - **Dark Mode Friendly**: Prefer darker backgrounds with vibrant elements.
      - **No Comments**: Do NOT include any comments in the code.

      OUTPUT FORMAT:
      JSON with keys: styleName, explanation, p5Code.
    `;

  console.log("Generating creative art...");
  console.log("Prompt:", prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleName: { type: Type.STRING },
            explanation: { type: Type.STRING },
            p5Code: { type: Type.STRING },
          },
          required: ["styleName", "explanation", "p5Code"],
        },
      },
    });

    const text = response.text || "{}";
    if (!text) throw new Error("Empty response");

    return cleanAndParseJSON<CreativeArtResult>(text);
  } catch (e) {
    console.error("Creative Gen Error:", e);
    return FALLBACK_CREATIVE_RESULT;
  }
};
