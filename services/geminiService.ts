import { GoogleGenAI, Type } from "@google/genai";
import { UserInteraction, AnalysisResult, CreativeArtResult } from "../types";
import { FALLBACK_CREATIVE_RESULT } from "../constants";

const apiKey =
  process.env.API_KEY && process.env.API_KEY !== "undefined"
    ? process.env.API_KEY
    : "";
const ai = new GoogleGenAI({ apiKey });

// Analyze user preferences
export const analyzeUserStyle = async (
  history: UserInteraction[],
): Promise<AnalysisResult> => {
  console.log("Analyzing style with architecture history...");

  // If no API key, return a poetic fallback
  if (!apiKey || apiKey === "undefined") {
    console.warn("API Key is missing or undefined string. Using fallback.");
    return {
      archetype: "神秘主义漫游者",
      philosophy: "你似乎在寻找一种超越形式的秩序，在混乱与结构之间游走。",
      followUpQuestion: "当混乱降临时，你会试图整理它，还是加入它？",
    };
  }
  const interactionsText = history
    .map((h) => `User ${h.action} the concept "${h.term}".`)
    .join("\n");

  const prompt = `
    Act as an art historian and psychologist. 
    Analyze the following user interactions with art history cards:
    ${interactionsText}

    1. Identify a "Style Archetype" (a poetic title in Chinese, e.g. "Structural Poet", "Chaos Navigator").
    2. Write a brief psychological analysis of their aesthetic tendencies (in Chinese, 100 words).
    3. Ask a probing, philosophical question about society or culture related to these tendencies (in Chinese, max 50 words).

    Return JSON.
  `;

  console.log("Starting style analysis...");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            archetype: { type: Type.STRING },
            philosophy: { type: Type.STRING },
            followUpQuestion: { type: Type.STRING },
          },
        },
      },
    });
    return JSON.parse(response.text!) as AnalysisResult;
  } catch (error) {
    console.error("Analysis Error", error);
    return {
      archetype: "观察者",
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
         - TECHNICAL SUGGESTION: Consider using advanced generative techniques like Flow Fields (Perlin noise networks), Recursive Fractals, Reaction-Diffusion simulations, or Harmonograph oscillators.
         - MODERN CAPABILITIES: You may also use 'Audio-Reactive' elements (using p5.FFT for real-time sound analysis) or 'Neural Stylization' (using ml5.js for real-time webcam tracking/object detection). 
         - IMPORTANT: If using audio or camera, remind the user to 'Click the screen to activate sensor' in the 'explanation' text, as browsers require a user gesture. Initialize AudioIn or Capture inside setup().
         - It should be visually impressive and immersive. Dark background preferred.
      
      Return JSON.
    `;

  console.log("Generating creative art...");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
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
    return JSON.parse(response.text!) as CreativeArtResult;
  } catch (e) {
    console.error(e);
    return FALLBACK_CREATIVE_RESULT;
  }
};
