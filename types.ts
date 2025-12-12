export interface Language {
  code: string;
  name: string;
  nativeName?: string;
  flag?: string; // Emoji flag
}

export interface TranslationHistoryItem {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: number;
}
