import { GoogleGenAI, Type } from "@google/genai";
import { StrategyAdvice } from "../types";

// Helper function to safely retrieve the API key from various environment configurations.
// This is crucial for deployments on platforms like Netlify using Vite.
const getApiKey = (): string | undefined => {
  // 1. Check for Vite environment variable (preferred for this stack)
  // @ts-ignore
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }

  // 2. Safe Fallback for other environments
  // We use @ts-ignore to prevent the build from failing if 'process' is not defined in the types.
  try {
    // @ts-ignore
    if (typeof process !== "undefined" && process.env) {
      // @ts-ignore
      if (process.env.REACT_APP_API_KEY) {
        // @ts-ignore
        return process.env.REACT_APP_API_KEY;
      }
      // @ts-ignore
      if (process.env.API_KEY) {
        // @ts-ignore
        return process.env.API_KEY;
      }
    }
  } catch (e) {
    // Ignore errors if accessing process fails
  }

  return undefined;
};

const API_KEY = getApiKey();

// Initialize the Google GenAI client. 
// We pass the retrieved key or an empty string to prevent initialization errors,
// but actual API calls are guarded by the isConfigured check.
const ai = new GoogleGenAI({ apiKey: API_KEY || "" });

// Export a check to let the UI know if we are configured correctly
export const isConfigured = (): boolean => {
  return !!API_KEY;
};

// Define the schema for the structured response
const strategySchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "The name of the strategy or stratagem (e.g., 'Empty Fort Strategy', 'Attack by Stratagem').",
    },
    originalQuote: {
      type: Type.STRING,
      description: "A relevant quote from Sun Tzu's Art of War or the 36 Stratagems.",
    },
    interpretation: {
      type: Type.STRING,
      description: "A concise explanation of how this ancient strategy applies to the user's specific modern problem.",
    },
    actionableAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3 concrete, actionable steps the user should take.",
    },
    chineseCharacter: {
      type: Type.STRING,
      description: "A single relevant Chinese character (Kanji/Hanzi) representing the essence of the advice (e.g., 智 for Wisdom, 胜 for Victory, 忍 for Patience).",
    }
  },
  required: ["title", "originalQuote", "interpretation", "actionableAdvice", "chineseCharacter"],
};

export const getStrategicAdvice = async (userQuery: string): Promise<StrategyAdvice> => {
  if (!API_KEY) {
    throw new Error("MISSING_API_KEY");
  }

  const modelId = "gemini-2.5-flash";
  const systemInstruction = `
    You are a master strategist embodying the wisdom of Sun Tzu and the classic Chinese strategists. 
    Users will come to you with modern problems (conflicts, business challenges, relationship issues, etc.).
    Your goal is to analyze their situation and provide wisdom based strictly on 'The Art of War' or 'The 36 Stratagems'.
    
    1. Identify the core conflict or dynamic in the user's query.
    2. Select the most appropriate stratagem or principle.
    3. Provide the response in the specified JSON format.
    4. Tone: Wise, authoritative, calm, yet practical and sharp.
    5. Do not be vague. Give specific tactical advice derived from the strategy.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: strategySchema,
        temperature: 0.7, // Slightly creative for wisdom application
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response received from the strategist.");
    }

    return JSON.parse(responseText) as StrategyAdvice;

  } catch (error: any) {
    console.error("Error fetching strategy:", error);
    throw error;
  }
};