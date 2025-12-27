import { Language, Direction } from './types';

export const LANGUAGES: Language[] = [
  { code: 'ku-badini', name: 'Kurdî (Badînî)', nativeName: 'کوردی (بادینی)', dir: Direction.RTL },
  { code: 'en', name: 'English', nativeName: 'English', dir: Direction.LTR },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: Direction.RTL },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', dir: Direction.LTR },
  { code: 'ku-sorani', name: 'Kurdî (Soranî)', nativeName: 'کوردی (سۆرانی)', dir: Direction.RTL },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: Direction.LTR },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: Direction.LTR },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: Direction.LTR },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', dir: Direction.RTL },
];

export const SOCIAL_LINKS = [
  { platform: 'Snapchat', username: '@birhatkrd', url: 'https://www.snapchat.com/add/birhatkrd' },
  { platform: 'TikTok', username: '@birhatkrd', url: 'https://www.tiktok.com/@birhatkrd' },
  { platform: 'Instagram', username: '@birhatkrd', url: 'https://instagram.com/birhatkrd' },
  { platform: 'Telegram', username: '@birhatkrd', url: 'https://t.me/birhatkrd' },
];
