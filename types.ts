
export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface TranslationState {
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  isLoading: boolean;
  error: string | null;
}
