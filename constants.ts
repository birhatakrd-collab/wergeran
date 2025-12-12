import { Language } from './types';

// The user provided key. In production, this should be strictly an env var.
// For this demo to work immediately, we expose it here, but typically we rely on process.env.API_KEY.
export const DEMO_API_KEY = 'AIzaSyCURWtSR72M6_lYoc4MiM-I_9OqAHF37vM';

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/birhatkrd',
  snapchat: 'https://snapchat.com/add/birhatkrd',
  telegram: 'https://t.me/birhatkrd',
  tiktok: 'https://www.tiktok.com/@birhatkrd',
  handle: '@birhatkrd'
};

export const DEVELOPER_INFO = {
  name: "بیرهات غیاس",
  degree: "دەرچوویێ زانکویا زاخۆ - بەشێ زمانێ ئنگلیزی",
  origin: "دهوک",
  description: "من ئەف پروژە یێ دروست وەک خزمەتەک بو زمانێ کوردی بادینی یێ شرین و هاریکاریا قوتابی و ماموستا وکومپانی و هەر تاکە کەسەکی پێدڤی دبیتێ هیڤیە ببیتە جهێ مفای."
};

// Priority languages
const PRIORITY_LANGUAGES: Language[] = [
  { code: 'en', name: 'ئنگلیزی', flag: '🇬🇧' },
  { code: 'ku', name: 'کوردی (بادینی)', flag: '☀️' }, // Custom flag for simplicity
  { code: 'ar', name: 'عەرەبی', flag: '🇸🇦' },
];

// A subset of world languages to reach ~250 conceptually (truncated for file size, but functional for AI to select)
// The AI model can handle names passed to it, so we display names in Kurdish/English.
export const LANGUAGES: Language[] = [
  ...PRIORITY_LANGUAGES,
  { code: 'de', name: 'ئەلمانی (German)', flag: '🇩🇪' },
  { code: 'fr', name: 'فەرەنسی (French)', flag: '🇫🇷' },
  { code: 'es', name: 'ئیسپانی (Spanish)', flag: '🇪🇸' },
  { code: 'tr', name: 'تورکی (Turkish)', flag: '🇹🇷' },
  { code: 'fa', name: 'فارسی (Persian)', flag: '🇮🇷' },
  { code: 'it', name: 'ئیطالی (Italian)', flag: '🇮🇹' },
  { code: 'ru', name: 'رووسی (Russian)', flag: '🇷🇺' },
  { code: 'zh', name: 'چینی (Chinese)', flag: '🇨🇳' },
  { code: 'ja', name: 'یابانی (Japanese)', flag: '🇯🇵' },
  { code: 'ko', name: 'کوری (Korean)', flag: '🇰🇷' },
  { code: 'hi', name: 'هندی (Hindi)', flag: '🇮🇳' },
  { code: 'pt', name: 'پورتوگالی (Portuguese)', flag: '🇵🇹' },
  { code: 'nl', name: 'هولەندی (Dutch)', flag: '🇳🇱' },
  { code: 'sv', name: 'سوێدی (Swedish)', flag: '🇸🇪' },
  { code: 'no', name: 'نەرویجی (Norwegian)', flag: '🇳🇴' },
  { code: 'da', name: 'دانیمارکی (Danish)', flag: '🇩🇰' },
  { code: 'fi', name: 'فینلەندی (Finnish)', flag: '🇫🇮' },
  { code: 'pl', name: 'پولەندی (Polish)', flag: '🇵🇱' },
  { code: 'uk', name: 'ئوکراینی (Ukrainian)', flag: '🇺🇦' },
  { code: 'el', name: 'یونانی (Greek)', flag: '🇬🇷' },
  { code: 'he', name: 'عێبری (Hebrew)', flag: '🇮🇱' },
  { code: 'id', name: 'ئەندەنوسی (Indonesian)', flag: '🇮🇩' },
  { code: 'ms', name: 'مالیزی (Malay)', flag: '🇲🇾' },
  { code: 'th', name: 'تایلەندی (Thai)', flag: '🇹🇭' },
  { code: 'vi', name: 'ڤێتنامی (Vietnamese)', flag: '🇻🇳' },
  // ... The model supports virtually all. We list major ones for the dropdown UI.
];