import { GoogleGenAI, Type } from "@google/genai";
import { UserInteraction, AnalysisResult, CreativeArtResult } from "../types";
import { FALLBACK_CREATIVE_RESULT } from "../constants";

const apiKey =
  process.env.API_KEY && process.env.API_KEY !== "undefined"
    ? process.env.API_KEY
    : "";
const ai = new GoogleGenAI({ apiKey });

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
          .map((h) => `User ${h.action} the concept "${h.term}".`)
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
  finalChoice: string,
): Promise<CreativeArtResult> => {
  const prompt = `
      Based on the user's interaction history: ${history.map((h) => h.term).join(", ")}
      Their psychological profile: "${analysisText}"
      And their answer to the final cultural question: "${finalChoice}"

      1. Invent a specific, unique art movement name for them (e.g. "Neo-Digital Decay", "Algorithm Ancestry").
      2. Explain the visual language of this style (forms, colors, motion) in Chinese.
      3. Write a complete, functional p5.js sketch that visually represents this style.
         - The sketch MUST be in GLOBAL mode (define function setup() and function draw() at top level).
         - Use 'windowWidth' and 'windowHeight' for full screen.
         - Handle window resizing in 'windowResized()' if possible.
         - Do NOT use external images or fonts, only p5 drawing primitives.
         - Make it animated or interactive or both.
         - It should be visually impressive and immersive. Dark background preferred.
      4. P5.js GUIDELINES(v1.9.0):
         - If using default 2D or WEBGL: Heavily utilize techniques like Perlin Noise (noise()), coordinate transformations (push/pop/translate/rotate), trigonometry (sin/cos) for periodic motion/polar coordinates, particle systems, recursive fractals, vertex shapes (beginShape/curveVertex), and Blend Modes (ADD, MULTIPLY, DIFFERENCE, etc.). 
         - If using 3D primitives or texture(), MUST use createCanvas(windowWidth, windowHeight, WEBGL)
         - COLOR: Prefer HSB colorMode for more natural color transitions and harmonic palettes.
         - MODERN CAPABILITIES: You may also use 'Audio-Reactive' elements (using p5.FFT for real-time sound analysis) or 'Neural Stylization' (using ml5.js for real-time webcam tracking/object detection). 
         - SENSORS: If using audio or camera, remind the user to 'Click the screen to activate sensor' in the 'explanation' text, as browsers require a user gesture. Initialize AudioIn or Capture inside setup().
      Return JSON.
    `;

  console.log("Generating creative art...");
  console.log(prompt);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.9,
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
    const jsonString = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(jsonString) as CreativeArtResult;
  } catch (e) {
    console.error(e);
    return FALLBACK_CREATIVE_RESULT;
  }
};
