import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RotateCcw, ArrowRightLeft, Menu, Sparkles, Loader2, Play, ArrowDown } from 'lucide-react';
import { LANGUAGES, SOCIAL_LINKS, ABOUT_TEXT } from './constants';
import { Modal, LanguageSelector } from './components/UIComponents';
import { translateText } from './services/geminiService';
import { TranslationStatus } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); 
  const [targetLang, setTargetLang] = useState('ku-badini'); 
  const [status, setStatus] = useState<TranslationStatus>('idle');
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // Modals
  const [showAbout, setShowAbout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setOutputText('');
      setStatus('idle');
      return;
    }

    setStatus('loading');
    
    try {
      // Sequence Step 1: Translating
      setLoadingMessage('یا دهێتە وەرگێران...');
      
      const apiCall = translateText(inputText, sourceLang, targetLang);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sequence Step 2: Please Wait
      setLoadingMessage('چاڤەرێ بە...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      const result = await apiCall;

      // Sequence Step 3: Ready
      setLoadingMessage('نڤێسان ئامادەیە');
      await new Promise(resolve => setTimeout(resolve, 800));

      setOutputText(result);
      setStatus('success');
    } catch (error) {
      setOutputText('ببورە، ئارێشەک چێبوو د وەرگێرانێ دا.');
      setStatus('error');
    }
  }, [inputText, sourceLang, targetLang]);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const currentSource = LANGUAGES.find(l => l.code === sourceLang);
  const currentTarget = LANGUAGES.find(l => l.code === targetLang);

  // Reusable Translate Button Component
  const TranslateButtonContent = () => (
    <>
      {status === 'loading' ? (
        <div className="flex items-center gap-3">
           <Loader2 className="animate-spin" size={24} />
           <span className="font-bold text-lg">{loadingMessage}</span>
        </div>
      ) : (
        <div className="flex items-center gap-3">
           <Sparkles className="fill-current" size={24} />
           <span className="font-bold text-xl font-sans">وەرگێران</span>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-950 to-black text-white font-sans selection:bg-gold-500/30 selection:text-gold-400 overflow-x-hidden flex flex-col">
      
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-md border-b border-white/5 h-16 md:h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-tr from-gold-600 to-gold-400 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20">
                 <span className="text-dark-950 font-black text-2xl font-serif">B</span>
               </div>
               <div>
                 <h1 className="text-xl font-bold text-white tracking-wide">Wergêrana <span className="text-gold-400">Badînî</span></h1>
               </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setShowAbout(true)} className="text-gray-300 hover:text-gold-400 transition-colors font-medium">دەربارەی من</button>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.platform} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-gray-400 hover:text-gold-400 transition-all hover:scale-110"
                    title={link.platform}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setShowMenu(!showMenu)} className="md:hidden p-2 text-gray-300 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-16 left-0 right-0 bg-dark-900 border-b border-gold-500/10 z-50 md:hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => {setShowAbout(true); setShowMenu(false);}} className="block w-full text-right py-2 text-gray-300 font-bold hover:text-gold-400">دەربارەی من</button>
                <div className="flex justify-center gap-6 pt-4 border-t border-white/5">
                  {SOCIAL_LINKS.map((link) => (
                    <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gold-400">
                      <link.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 md:py-12 flex flex-col items-center pb-32 md:pb-12">
        
        {/* Badge */}
        <div className="text-center mb-6 w-full">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.1)]">
              <Sparkles size={14} />
              <span>هێزا زیرەکیا دەستکرد</span>
           </div>
        </div>

        {/* Main Translation Layout - Split Cards */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-stretch">
            
            {/* Input Card */}
            <div className="flex-1 bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-white/5 bg-dark-950/30 flex justify-between items-center rounded-t-3xl">
                    <LanguageSelector 
                        selected={sourceLang} 
                        onChange={setSourceLang} 
                        label="ژ زمانێ"
                    />
                     {inputText && (
                        <button 
                            onClick={() => setInputText('')}
                            className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-lg hover:bg-white/10"
                        >
                        <RotateCcw size={16} />
                        </button>
                    )}
                </div>
                {/* Body */}
                <div className="flex-1 p-4 md:p-6 relative">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="دەقێ خو لڤێرە بنڤیسە..."
                        className="w-full h-full min-h-[150px] md:min-h-[300px] bg-transparent text-lg md:text-xl text-white placeholder-gray-600 resize-none focus:outline-none leading-relaxed"
                        dir={currentSource?.direction}
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* Middle Controls (Desktop: Center, Mobile: Hidden/Integrated) */}
            <div className="flex md:flex-col items-center justify-center gap-2 -my-2 md:my-0 z-10">
                <button 
                  onClick={handleSwapLanguages}
                  className="p-3 rounded-full bg-dark-900 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-dark-950 transition-all shadow-lg md:rotate-90"
                >
                  <ArrowRightLeft size={20} />
                </button>
                
                {/* Desktop Translate Button (Centered) */}
                <button 
                    onClick={handleTranslate}
                    disabled={status === 'loading'}
                    className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 items-center justify-center text-dark-950 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                 >
                     <Play className="fill-current ml-1" size={28} />
                 </button>
            </div>

            {/* Output Card */}
            <div className="flex-1 bg-dark-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg flex flex-col">
                 {/* Header */}
                 <div className="p-4 border-b border-white/5 bg-dark-950/30 flex justify-between items-center rounded-t-3xl">
                    <LanguageSelector 
                        selected={targetLang} 
                        onChange={setTargetLang} 
                        label="بو زمانێ"
                    />
                    {outputText && status !== 'loading' && (
                        <button 
                            onClick={() => copyToClipboard(outputText)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 text-sm transition-colors border border-gold-500/20"
                        >
                            <Copy size={16} />
                            <span className="hidden sm:inline">کوبی بکە</span>
                        </button>
                    )}
                </div>
                {/* Body */}
                <div className="flex-1 p-4 md:p-6 relative">
                    {status === 'loading' && !loadingMessage.includes('نڤێسان') ? (
                        <div className="h-full flex flex-col items-center justify-center gap-4 min-h-[150px]">
                             {/* Only showing spinner here if strictly needed, but main status is in button now */}
                             <div className="w-10 h-10 rounded-full border-4 border-gold-500/20 border-t-gold-500 animate-spin"></div>
                        </div>
                    ) : (
                        <textarea
                            readOnly
                            value={outputText}
                            className="w-full h-full min-h-[150px] md:min-h-[300px] bg-transparent text-lg md:text-xl text-gold-100 placeholder-gray-700 resize-none focus:outline-none leading-relaxed selection:bg-gold-500/40"
                            placeholder="وەرگێران..."
                            dir={currentTarget?.direction}
                        />
                    )}
                </div>
            </div>

        </div>

      </main>

      {/* --- Fixed Bottom Button (Mobile Only) --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-50 bg-dark-950/90 backdrop-blur-lg border-t border-white/10 pb-8 safe-area-bottom">
         <button
            onClick={handleTranslate}
            disabled={status === 'loading'}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-600 to-amber-500 text-dark-950 shadow-[0_0_30px_rgba(251,191,36,0.2)] active:scale-95 transition-transform flex items-center justify-center"
         >
            <TranslateButtonContent />
         </button>
      </div>

      {/* --- Footer --- */}
      <footer className="border-t border-white/5 bg-dark-950 py-6 md:py-8 mt-auto md:mb-0 mb-20">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-3">
                <span className="text-xl font-serif text-gold-500 font-bold">B</span>
                {/* Removed Wergêrana Badînî text as requested */}
            </div>
            <p className="text-gray-500 text-xs md:text-sm">
                هەمی ماف د پاراستینە © {new Date().getFullYear()} - دروستکریە ژلایێ <a href="https://instagram.com/birhatkrd" className="text-gold-500 hover:underline">@birhatkrd</a>
            </p>
         </div>
      </footer>

      {/* About Modal */}
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="دەربارەی من"
      >
        <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 border-2 border-gold-500 flex items-center justify-center overflow-hidden">
                <span className="text-3xl md:text-4xl">👨‍💻</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">بیرهات غیاس</h3>
            <p className="text-gold-400 text-xs md:text-sm -mt-2">گەشەپێدەرێ وێبسایتی</p>
            <div className="bg-white/5 p-4 rounded-xl text-right text-gray-200 leading-7 md:leading-8 whitespace-pre-line border border-white/5 text-sm md:text-base">
                {ABOUT_TEXT}
            </div>
            <div className="flex gap-4 mt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a key={link.platform} href={link.url} className="p-2 bg-white/5 rounded-full hover:bg-gold-500 hover:text-dark-950 transition-all">
                    <link.icon size={18} />
                  </a>
                ))}
            </div>
        </div>
      </Modal>

    </div>
  );
}

export default App;