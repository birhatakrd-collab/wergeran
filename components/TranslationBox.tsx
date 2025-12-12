import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Loader2, X, ChevronDown, Languages, Sparkles } from 'lucide-react';
import { LANGUAGES } from '../constants';
import { translateText } from '../services/geminiService';

const TranslationBox: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ku');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (sourceText.trim().length > 0) {
      setIsLoading(true);
      const result = await translateText(sourceText, 
        LANGUAGES.find(l => l.code === sourceLang)?.name || sourceLang,
        LANGUAGES.find(l => l.code === targetLang)?.name || targetLang
      );
      setTargetText(result);
      setIsLoading(false);
    } else {
      setTargetText('');
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // Clear the text boxes when swapping languages as requested
    setSourceText('');
    setTargetText('');
  };

  const handleCopy = () => {
    if (targetText) {
      navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLangDetails = (code: string) => LANGUAGES.find(l => l.code === code) || { name: code, flag: '🏳️' };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-20">
      
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 relative">
        
        {/* --- Source Card --- */}
        <div className="glass-panel rounded-3xl p-3 flex-1 flex flex-col min-h-[160px] md:min-h-[220px] border border-white/5 shadow-xl relative z-0">
           
           {/* Language Selector Header */}
           <div className="relative mb-2">
              <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg flex items-center justify-between px-3 py-2 border border-white/5 group">
                 <div className="flex items-center gap-2">
                    <span className="text-xl">{getLangDetails(sourceLang).flag}</span>
                    <span className="font-medium text-sm md:text-base text-gray-200 group-hover:text-gold-400 transition-colors">{getLangDetails(sourceLang).name}</span>
                 </div>
                 <ChevronDown size={16} className="text-gray-500 group-hover:text-gold-500" />
              </div>
              <select 
                 value={sourceLang}
                 onChange={(e) => setSourceLang(e.target.value)}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                 {LANGUAGES.map(lang => (
                   <option key={`source-${lang.code}`} value={lang.code} className="bg-dark-900 text-gray-200">
                     {lang.name}
                   </option>
                 ))}
              </select>
           </div>

           {/* Input Area */}
           <div className="flex-1 relative">
             <textarea
               value={sourceText}
               onChange={(e) => setSourceText(e.target.value)}
               placeholder="رستەکێ د ڤێرێ دا بنڤیسە..."
               className="w-full h-full bg-transparent resize-none focus:outline-none text-base md:text-lg leading-relaxed placeholder-gray-600 font-light"
               spellCheck="false"
               dir="auto"
             />
             {sourceText && (
               <button 
                 onClick={() => { setSourceText(''); setTargetText(''); }}
                 className="absolute bottom-1 right-1 text-gray-500 hover:text-red-400 p-1.5 rounded-full hover:bg-white/5 transition-colors"
               >
                 <X size={16} />
               </button>
             )}
           </div>
        </div>

        {/* --- Swap Button --- */}
        <div className="flex items-center justify-center -my-6 md:my-auto z-20 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
           <button 
             onClick={handleSwap}
             className="bg-dark-900 border border-gold-500/30 text-gold-500 p-2.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all transform hover:rotate-180 active:scale-95"
           >
             <ArrowRightLeft size={20} />
           </button>
        </div>

        {/* --- Target Card --- */}
        <div className="glass-panel rounded-3xl p-3 flex-1 flex flex-col min-h-[160px] md:min-h-[220px] border border-white/5 shadow-xl bg-black/40 relative z-0">
           
           {/* Language Selector Header */}
           <div className="relative mb-2">
              <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg flex items-center justify-between px-3 py-2 border border-white/5 group">
                 <div className="flex items-center gap-2">
                    <span className="text-xl">{getLangDetails(targetLang).flag}</span>
                    <span className="font-medium text-sm md:text-base text-gray-200 group-hover:text-gold-400 transition-colors">{getLangDetails(targetLang).name}</span>
                 </div>
                 <ChevronDown size={16} className="text-gray-500 group-hover:text-gold-500" />
              </div>
              <select 
                 value={targetLang}
                 onChange={(e) => setTargetLang(e.target.value)}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                 {LANGUAGES.map(lang => (
                   <option key={`target-${lang.code}`} value={lang.code} className="bg-dark-900 text-gray-200">
                     {lang.name}
                   </option>
                 ))}
              </select>
           </div>

           {/* Output Area */}
           <div className="flex-1 relative overflow-y-auto">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center h-full gap-2 text-gold-500/80">
                   <Loader2 className="animate-spin" size={20} />
                   <span className="font-medium animate-pulse text-xs">د وەرگێرانێ دایە...</span>
                 </div>
               ) : (
                 targetText ? (
                   <div className="text-base md:text-lg leading-relaxed text-gray-100 font-light dir-auto" dir="auto">
                     {targetText}
                   </div>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-gray-700 gap-2 opacity-50 select-none">
                     <Languages size={24} />
                     <span className="italic font-light text-xs">ئەنجام دێ لڤێرە دەرکەڤیت</span>
                   </div>
                 )
               )}
           </div>

           {/* Copy Action */}
           <div className="mt-1 flex justify-end">
              <button 
                onClick={handleCopy}
                disabled={!targetText}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium text-xs ${copied ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied && <span>هاتە کوپیکرن</span>}
              </button>
           </div>
        </div>

      </div>

      {/* --- Translate Button --- */}
      <div className="mt-5">
         <button 
           onClick={handleTranslate}
           disabled={isLoading || !sourceText}
           className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold text-lg py-3.5 rounded-2xl shadow-lg shadow-gold-500/10 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
         >
           {isLoading ? <Loader2 className="animate-spin" size={22} /> : <Sparkles size={22} className="group-hover:animate-pulse" />}
           <span>وەرگێران</span>
         </button>
      </div>

    </div>
  );
};

export default TranslationBox;