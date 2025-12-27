
import React, { useState, useEffect } from 'react';
import { translateText } from './services/geminiService';
import { LANGUAGES, SOCIAL_LINKS } from './constants';
import { LanguageSelector } from './components/LanguageSelector';

const App: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('ku-BA');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-translate with debounce could be added, but manual for stability
  const handleTranslate = async () => {
    if (!sourceText.trim() || isLoading) return;
    setIsLoading(true);
    setTranslatedText('');
    try {
      const result = await translateText(sourceText, sourceLang, targetLang);
      setTranslatedText(result);
    } catch (err) {
      setTranslatedText("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (sourceLang === 'auto') return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200" dir="rtl">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="relative z-10 pt-12 pb-8 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 group">
          <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/20 group-hover:rotate-12 transition-transform duration-500">
            <span className="text-slate-950 font-black text-2xl">B</span>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-black text-white tracking-tighter">بیرهات <span className="gold-text">AI</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">Royal Behdini Engine</p>
          </div>
        </div>

        <nav className="flex gap-5">
          {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
            <a 
              key={name} 
              href={url} 
              target="_blank" 
              className="text-slate-500 hover:text-amber-500 text-[10px] font-black uppercase tracking-widest transition-all hover:-translate-y-1"
            >
              {name}
            </a>
          ))}
        </nav>
      </header>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
          {/* Toolbar */}
          <div className="p-4 sm:p-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 sm:gap-6 flex-grow">
              <LanguageSelector value={sourceLang} onChange={setSourceLang} />
              
              <button 
                onClick={handleSwap}
                disabled={sourceLang === 'auto'}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-amber-500 hover:bg-white/5 transition-all disabled:opacity-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </button>

              <LanguageSelector value={targetLang} onChange={setTargetLang} excludeAuto />
            </div>

            {isLoading && (
              <div className="flex items-center gap-1.5 px-4">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          {/* Editors */}
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-white/5">
            <div className="p-8 sm:p-12 min-h-[350px] sm:min-h-[450px] relative">
              <textarea 
                className="w-full h-full bg-transparent border-none outline-none resize-none text-2xl sm:text-4xl font-bold text-white placeholder:text-slate-800 custom-scrollbar leading-tight" 
                placeholder="تێکستێ خۆ لێرە بنویسە..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
              <div className="absolute bottom-6 right-8 text-[10px] font-black text-slate-800 uppercase tracking-widest">
                Source Input
              </div>
            </div>

            <div className="p-8 sm:p-12 min-h-[350px] sm:min-h-[450px] bg-white/[0.01] relative">
              <div className={`w-full h-full text-2xl sm:text-4xl font-black leading-tight overflow-y-auto custom-scrollbar ${isLoading ? 'opacity-30' : 'opacity-100 text-amber-400'}`}>
                {translatedText || <span className="text-slate-900 italic font-bold">ئەنجام دێ لێرە دیار بیت...</span>}
              </div>
              
              {translatedText && !isLoading && (
                <div className="absolute bottom-8 left-8 flex gap-3">
                  <button 
                    onClick={handleCopy}
                    className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                  >
                    {copied ? 'کۆپی بوو' : 'کۆپی'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Big Action Button */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="group relative px-20 py-7 bg-amber-500 text-slate-950 font-black text-2xl rounded-3xl shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
          >
            {isLoading ? 'چاڤەڕێ بە...' : 'وەرگێران'}
            <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">Powered by Gemini 3 Pro & Birhat Engine</p>
        </div>
      </main>

      <footer className="relative z-10 pb-12 text-center">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto mb-8"></div>
        <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.8em]">Developed & Designed by @birhatkrd</p>
      </footer>
    </div>
  );
};

export default App;
