// you can use any different ai model here

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GENAI_API_KEY; // Use environment variable for Google GenAI API key

export const ai = new GoogleGenAI({ apiKey });
