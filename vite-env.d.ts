interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    GEMINI_API_KEY?: string;
    VITE_API_KEY?: string;
    API_KEY?: string;
    [key: string]: string | undefined;
  }
}