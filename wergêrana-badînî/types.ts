export interface Language {
    code: string;
    name: string;
    flag: string; // Emoji flag or code
    direction: 'rtl' | 'ltr';
}

export interface SocialLink {
    platform: string;
    username: string;
    url: string;
    icon: React.ElementType;
}

export type TranslationStatus = 'idle' | 'loading' | 'success' | 'error';
