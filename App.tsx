
import React, { useState } from 'react';
import { translateText } from './services/geminiService';
import { LANGUAGES, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('ku-BA');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8" dir="rtl">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-900/10 blur-[150px] rounded-full"></div>
      </div>

      <header className="relative z-10 text-center mb-10">
        <div className="inline-flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/20 rotate-3">
            <span className="text-slate-950 font-black text-3xl">B</span>
          </div>
          <div className="text-right">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter">بیرهات <span className="gold-text">AI</span></h1>
            <p className="text-amber-500 font-bold text-[10px] uppercase tracking-[0.4em]">Advanced Behdini Engine</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-6xl">
        <div className="glass rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          {/* Header/Selectors */}
          <div className="p-6 bg-white/5 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow">
              <select 
                value={sourceLang} 
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-slate-900 text-white font-black p-3 rounded-2xl border border-white/10 outline-none focus:border-amber-500/50 transition-all cursor-pointer text-sm"
              >
                {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.nativeName}</option>)}
              </select>
              
              <div className="text-amber-500 opacity-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
              </div>

              <select 
                value={targetLang} 
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-slate-900 text-white font-black p-3 rounded-2xl border border-white/10 outline-none focus:border-amber-500/50 transition-all cursor-pointer text-sm"
              >
                {LANGUAGES.filter(l => l.code !== 'auto').map(l => <option key={l.code} value={l.code}>{l.nativeName}</option>)}
              </select>
            </div>

            {isLoading && (
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          {/* Text Areas */}
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-white/5">
            <div className="p-8 sm:p-12 min-h-[350px]">
              <textarea 
                className="w-full h-full bg-transparent border-none outline-none resize-none text-2xl sm:text-3xl font-bold text-white placeholder:text-slate-700 custom-scrollbar" 
                placeholder="تێکستێ خۆ بنویسە..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
              />
            </div>
            <div className="p-8 sm:p-12 min-h-[350px] bg-slate-950/20 relative">
              <div className={`w-full h-full text-2xl sm:text-3xl font-black leading-relaxed overflow-y-auto custom-scrollbar ${isLoading ? 'opacity-20' : 'opacity-100 text-amber-400'}`}>
                {translatedText || <span className="text-slate-800 italic">وەرگێران...</span>}
              </div>
              
              {translatedText && (
                <button 
                  onClick={handleCopy}
                  className={`absolute bottom-8 left-8 px-6 py-2 rounded-xl font-black text-xs transition-all ${copied ? 'bg-green-500 text-white' : 'bg-amber-500 text-slate-950 hover:scale-105'}`}
                >
                  {copied ? 'کۆپی بوو' : 'کۆپی'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button 
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="px-20 py-6 bg-amber-500 text-slate-950 font-black text-xl rounded-2xl shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale"
          >
            {isLoading ? 'چاڤەڕێ بە...' : 'وەرگێران'}
          </button>
        </div>
      </main>

      <footer className="mt-20 text-center relative z-10">
        <div className="flex gap-6 justify-center mb-6">
          {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
            <a key={name} href={url} target="_blank" className="text-slate-600 hover:text-amber-500 transition-colors text-xs font-black uppercase tracking-widest">{name}</a>
          ))}
        </div>
        <p className="text-slate-700 text-[9px] font-black uppercase tracking-[0.5em]">Developed by @birhatkrd</p>
      </footer>
    </div>
  );
};

export default App;
