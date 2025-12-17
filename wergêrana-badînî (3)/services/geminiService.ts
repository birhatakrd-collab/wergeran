import { GoogleGenAI } from "@google/genai";

// Inserted key directly for simple hosting. Note: In a production app with a backend, this should be hidden.
const apiKey = 'AIzaSyDflAHYSAq2gcvz8yNZfcIe8wkwwRffEls';

const ai = new GoogleGenAI({ apiKey });

const BADINI_SYSTEM_INSTRUCTION = `
You are a highly advanced and accurate translation engine specifically tuned for the Kurdish Badini dialect.
Your name is "Wergêrana Badînî". You were created by Birhat Ghias.

RULES FOR TRANSLATION:
1.  **Target Language: Kurdish (Badini)**
    *   If the user asks to translate TO "Kurdish (Badini)" or "Badini":
    *   You MUST use the **Kurdish Arabic Script** (e.g., 'چەوانی', 'باشە').
    *   DO NOT use Latin/Hawar script.
    *   Ensure vocabulary matches the Badini dialect (spoken in Duhok, Zakho) rather than standard Sorani. 
    *   Example: Use 'ئاخڤتن' for speaking, 'چوون' for going, 'وەرە' for come.
    *   Ensure grammar is strictly Badini.

2.  **General Behavior**:
    *   Translate the user's input directly.
    *   Do not provide explanations unless asked.
    *   Do not output markdown code blocks.
    *   Output ONLY the translated text.
    *   Never mention Google or Gemini. You are a proprietary system.

3.  **Tone**:
    *   Formal yet natural for the dialect.
`;

export const translateText = async (
  text: string, 
  sourceLang: string, 
  targetLang: string
): Promise<string> => {
  if (!text.trim()) return "";
  if (!apiKey) throw new Error("API Key is missing.");

  try {
    const prompt = `Translate the following text exactly from ${sourceLang} to ${targetLang}. Text: "${text}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: BADINI_SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature for more accurate translation
      },
    });

    return response.text || "";
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("ببورە، ئارێشەک چێبوو د وەرگێرانێ دا.");
  }
};