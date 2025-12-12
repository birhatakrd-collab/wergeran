import React from 'react';
import { Instagram, Send, Ghost } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Developer Credit */}
        <div className="flex items-center gap-2 text-gray-400 font-medium">
           <span className="text-sm md:text-base">گەشەپێدەرێ وێبسایتی</span>
           <span className="text-gold-500 font-bold text-lg md:text-xl">بیرهات</span>
        </div>

        {/* Social Icons & Handle */}
        <div className="flex flex-row-reverse items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/5">
           <span className="text-gray-400 text-sm dir-ltr font-mono">{SOCIAL_LINKS.handle}</span>
           <div className="h-4 w-px bg-white/10"></div>
           <div className="flex items-center gap-3">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                {/* Custom TikTok SVG Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
              <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110">
                <Send size={18} />
              </a>
              <a href={SOCIAL_LINKS.snapchat} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition-colors transform hover:scale-110">
                <Ghost size={18} />
              </a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;