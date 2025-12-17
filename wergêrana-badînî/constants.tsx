import { Language, SocialLink } from './types';
import { Instagram, Ghost, Send } from 'lucide-react';

export const LANGUAGES: Language[] = [
    { code: 'ku-badini', name: 'کوردی (بادینی)', flag: '☀️', direction: 'rtl' },
    { code: 'en', name: 'ئینگلیزی', flag: '🇬🇧', direction: 'ltr' },
    { code: 'ar', name: 'عەرەبی', flag: '🇸🇦', direction: 'rtl' },
    { code: 'ku-sorani', name: 'کوردی (سۆرانی)', flag: '☀️', direction: 'rtl' },
    { code: 'tr', name: 'تورکی', flag: '🇹🇷', direction: 'ltr' },
    { code: 'de', name: 'ئەڵمانی', flag: '🇩🇪', direction: 'ltr' },
    { code: 'fr', name: 'فەرەنسی', flag: '🇫🇷', direction: 'ltr' },
    { code: 'es', name: 'ئیسپانی', flag: '🇪🇸', direction: 'ltr' },
    { code: 'it', name: 'ئیتاڵی', flag: '🇮🇹', direction: 'ltr' },
    { code: 'ru', name: 'ڕووسی', flag: '🇷🇺', direction: 'ltr' },
    { code: 'fa', name: 'فارسی', flag: '🇮🇷', direction: 'rtl' },
    { code: 'nl', name: 'هۆڵەندی', flag: '🇳🇱', direction: 'ltr' },
    { code: 'sv', name: 'سویدی', flag: '🇸🇪', direction: 'ltr' },
    { code: 'no', name: 'نەرویجی', flag: '🇳🇴', direction: 'ltr' },
    { code: 'da', name: 'دانیمارکی', flag: '🇩🇰', direction: 'ltr' },
    { code: 'zh', name: 'چینی', flag: '🇨🇳', direction: 'ltr' },
    { code: 'ja', name: 'یابانی', flag: '🇯🇵', direction: 'ltr' },
    { code: 'ko', name: 'کۆری', flag: '🇰🇷', direction: 'ltr' },
    { code: 'hi', name: 'هیندی', flag: '🇮🇳', direction: 'ltr' },
    { code: 'pt', name: 'پورتوگالی', flag: '🇵🇹', direction: 'ltr' },
    // Extended list simulated
    { code: 'pl', name: 'پۆڵەندی', flag: '🇵🇱', direction: 'ltr' },
    { code: 'uk', name: 'ئۆکرانی', flag: '🇺🇦', direction: 'ltr' },
    { code: 'el', name: 'یۆنانی', flag: '🇬🇷', direction: 'ltr' },
];

export const SOCIAL_LINKS: SocialLink[] = [
    { platform: 'Instagram', username: '@birhatkrd', url: 'https://instagram.com/birhatkrd', icon: Instagram },
    { platform: 'Snapchat', username: '@birhatkrd', url: 'https://snapchat.com/add/birhatkrd', icon: Ghost },
    { platform: 'Telegram', username: '@birhatkrd', url: 'https://t.me/birhatkrd', icon: Send },
];

export const ABOUT_TEXT = `
ناڤێ من بیرهات غیاس ئەز دەرچوویێ زانکویا زاخۆ مە بەشێ زمانێ ئنگلیزی. 
من ئەف پروژە یێ دروستکری وەک خزمەتەک بو زمانێ کوردی بادینی یێ شرین و هاریکاریا قوتابی و ماموستا و کومپانی و هەر تاکە کەسەکی پێدڤی دبیتێ.
هیڤیە ببیتە جهێ مفای. 
ئەز خەلکێ دهوکێ مە.
`;
