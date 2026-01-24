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
      1. Invent a specific, unique art movement name.
      2. Explain the visual language (forms, colors, motion) in Chinese.
      3. Write a COMPLETE, FUNCTIONAL p5.js (v1.9.0) sketch representing this style.

      TECHNICAL CONSTRAINTS:
      - Global mode. Fullscreen (windowResized).
      - Various inputs: mouse/touch, audio (userStartAudio), webcam (ml5.js).
      - HSB color. Dark background. No assets.
      - ml5.js v1: Use ml5.handPose(), ml5.bodyPose(), or ml5.faceMesh().
      - For video, use center-cropping (do not compress/stretch).
      - Use loadPixels() for raw image processing. No 'unload' events.
      Return JSON.
    `;

  console.log("Generating creative art...");
  console.log("Prompt:", prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleName: { type: Type.STRING },
            explanation: { type: Type.STRING },
            p5Code: {
              type: Type.STRING,
              description:
                "The full p5.js code string including setup and draw functions.",
            },
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
