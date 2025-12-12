import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly as per @google/genai guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const translateText = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  if (!text || !text.trim()) return "";

  try {
    const model = 'gemini-2.5-flash';
    
    // Professional System Instruction to teach the model "Badini" (Duhok/Zakho)
    const systemInstruction = `
      You are an expert linguistic translator specializing in the "Badini" (Bahdini) dialect of Northern Kurmanji Kurdish, specifically as spoken in the Duhok and Zakho regions.

      STRICT RULES FOR OUTPUT:
      1. **SCRIPT (ئەلفوبێ)**: When translating to Kurdish (Badini), you must **ONLY** use the Kurdish-Arabic script (ئەلفوبێی کوردی).
         - **FORBIDDEN**: NEVER use Latin/English letters in the Kurdish output. 
         - Example: Do NOT write "Tu chaway". YOU MUST WRITE "تو چەوایی".
         - Even if the input is English, the Kurdish output must be in Arabic script.

      2. **DIALECT (Duhok/Zakho)**:
         - Use the specific vocabulary and grammar of Duhok and Zakho.
         - **Verbs**: Use "ئەز دچم" (I go), "من دڤێت" (I want), "ئەز یێ دهێم" (I am coming).
         - **Vocabulary**: 
           - Use "باش" (Bash) for Good.
           - Use "چەوا" (Chewa) or "چەوانی" for How.
           - Use "هەوە" (Hew) for You (plural/obj).
           - Use "ڤێرێ" (Vêrê) / "وێرێ" (Wêrê) for Here/There.
           - Use "مirov" -> "مروڤ" or "کەس" naturally.
         
      3. **STYLE**:
         - The translation must be "Jwan" (Beautiful) and natural.
         - Avoid literal machine translation; use idioms common in Badinan if appropriate.
         - Tone: Polite and native.

      4. **NO EXPLANATIONS**: Output ONLY the translated text without notes.

      EXAMPLES (English -> Badini):
      - "Hello" -> "سڵاڤ"
      - "How are you?" -> "تو چەوایی؟" or "هوین چەوانن؟"
      - "I miss you" -> "بیریا تە دکەم" or "من بیریا تە کریە"
      - "Where are you going?" -> "تو دچەیە کیڤە؟"
      - "This is great" -> "ئەڤە یا گەلەکا باشە"
    `;

    const prompt = `
      Translate the following text ONLY. Do not add any explanations.
      
      Source Language: ${sourceLang}
      Target Language: ${targetLang}
      
      Text to translate:
      "${text}"
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, 
      }
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Translation error:", error);
    return "بورین، ئارێشەک چێبوو د وەرگێرانێ دا. هیڤیە دوبارە بکە."; 
  }
};