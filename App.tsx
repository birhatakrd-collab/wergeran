import React, { useState } from 'react';
import { ArrowRightLeft, Copy, X, Sparkles, Zap, Globe, MessageSquare, BookOpen, Cpu, Palette } from 'lucide-react';
import { LANGUAGES } from './constants';
import { Language } from './types';
import { translateText } from './services/geminiService';
import LanguageSelector from './components/LanguageSelector';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'translate' | 'chat'>('translate');
  
  const [sourceLang, setSourceLang] = useState<Language>(LANGUAGES[1]); 
  const [targetLang, setTargetLang] = useState<Language>(LANGUAGES[0]); 
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const result = await translateText(inputText, sourceLang.name, targetLang.name);
      setOutputText(result);
    } catch (error) {
      console.error(error);
      setOutputText('چێ نەبوو، ژ کەرمێ دووبارە هەوڵ بدە.');
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-['Rabar_041']">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 bg-[#030303]">
        <div className="absolute inset-0 bg-grid opacity-30 animate-pulse"></div>
        {/* Glow Orbs */}
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* Header */}
      <header className="relative z-30 pt-6 pb-2">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-black shadow-lg">
                <Zap size={18} fill="currentColor" className="text-black" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-wide text-white group-hover:text-amber-400 transition-colors duration-300">
              بیرهات <span className="text-amber-500 text-glow">AI</span>
            </span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
             <Globe size={12} className="text-amber-500/70" />
             <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase">وەشانێ ٢.٠</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-start pt-6 pb-4 px-4">
        
        <div className="w-full max-w-4xl">
          
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/10 inline-flex gap-1 relative shadow-lg">
                <button 
                  onClick={() => setActiveTab('translate')}
                  className={`
                    relative px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2
                    ${activeTab === 'translate' ? 'text-black' : 'text-gray-400 hover:text-white'}
                  `}
                >
                  {activeTab === 'translate' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.4)]"></div>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowRightLeft size={14} /> وەرگێڕ
                  </span>
                </button>

                <button 
                  onClick={() => setActiveTab('chat')}
                  className={`
                    relative px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 flex items-center gap-2
                    ${activeTab === 'chat' ? 'text-black' : 'text-gray-400 hover:text-white'}
                  `}
                >
                  {activeTab === 'chat' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)]"></div>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                     <MessageSquare size={14} /> بیرهات AI
                  </span>
                </button>
            </div>
          </div>

          {activeTab === 'translate' ? (
            /* TRANSLATOR SECTION */
            <div className="animate-float">
              <div className="bg-[#0a0a0a]/60 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden relative">
                
                {/* Top Light Line */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50"></div>

                {/* Language Controls */}
                <div className="bg-black/20 border-b border-white/5 p-3 flex items-center justify-between gap-3">
                  <div className="flex-1 flex justify-start">
                     <LanguageSelector selected={sourceLang} onChange={setSourceLang} />
                  </div>

                  <button 
                    onClick={swapLanguages}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all duration-300 active:rotate-180"
                  >
                    <ArrowRightLeft size={16} />
                  </button>

                  <div className="flex-1 flex justify-end">
                     <LanguageSelector selected={targetLang} onChange={setTargetLang} />
                  </div>
                </div>

                {/* Translation Area */}
                <div className="flex flex-col md:flex-row min-h-[320px] relative divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/5">
                  
                  {/* Input */}
                  <div className="flex-1 relative group">
                    <textarea
                      className={`w-full h-full p-5 text-lg text-gray-200 bg-transparent resize-none focus:outline-none placeholder-gray-600 transition-colors ${sourceLang.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                      placeholder="ل ڤێرە بنڤیسە..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      dir={sourceLang.dir}
                      spellCheck="false"
                    />
                    {inputText && (
                      <button 
                        onClick={() => { setInputText(''); setOutputText(''); }}
                        className="absolute top-3 left-3 p-1 rounded-full text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    )}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-[10px] text-gray-600 font-mono bg-black/40 px-2 py-0.5 rounded border border-white/5">{inputText.length}</span>
                    </div>
                  </div>

                  {/* Output */}
                  <div className="flex-1 relative bg-black/20">
                    {isLoading ? (
                       <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                          <div className="relative">
                            <div className="absolute inset-0 bg-amber-500 blur-lg opacity-20 animate-pulse"></div>
                            <Sparkles className="text-amber-400 animate-spin" size={28} />
                          </div>
                          <span className="text-amber-500/70 text-sm font-medium animate-pulse">وەرگێران یا دهێتە کرن ب رێکا ژیریا دەستکرد...</span>
                       </div>
                    ) : (
                      <>
                        <textarea
                          readOnly
                          className={`w-full h-full p-5 text-lg text-amber-50/90 bg-transparent resize-none focus:outline-none ${targetLang.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          placeholder="وەرگێڕان..."
                          value={outputText}
                          dir={targetLang.dir}
                        />
                        {outputText && <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"></div>}
                      </>
                    )}
                    
                    <div className="absolute bottom-3 left-3">
                       <button 
                        onClick={() => copyToClipboard(outputText)}
                        disabled={!outputText}
                        className="p-1.5 text-gray-500 hover:text-amber-400 hover:bg-amber-500/10 rounded-md transition-all disabled:opacity-0"
                       >
                         <Copy size={16} />
                       </button>
                    </div>
                  </div>
                </div>
                
                {/* Action Area */}
                <div className="p-3 bg-black/30 border-t border-white/5 flex justify-end">
                  <button
                    onClick={handleTranslate}
                    disabled={isLoading || !inputText.trim()}
                    className="
                      group relative overflow-hidden
                      bg-gradient-to-r from-amber-600 to-amber-500 
                      disabled:from-gray-800 disabled:to-gray-800 disabled:text-gray-600
                      text-black font-bold text-sm py-2.5 px-8 rounded-xl 
                      shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]
                      transition-all duration-300 transform hover:-translate-y-0.5
                      flex items-center gap-2
                    "
                  >
                    <span className="relative z-10">وەرگێڕان</span>
                    {!isLoading && <ArrowRightLeft size={16} className="relative z-10 transition-transform group-hover:rotate-180 duration-500" />}
                    <div className="absolute inset-0 bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CHAT SECTION */
            <div className="animate-fade-in">
                <ChatAssistant />
            </div>
          )}

          {/* New Feature Boxes Section - Replaces Info Footer */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 group hover:border-amber-500/20">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:scale-110 transition-transform duration-300">
                          <BookOpen size={24} />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-200 mb-1">زمانێ کوردی</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">زمانێ کوردی ناسنامە و دیرۆکا مە یە، پاراستنا وێ ئەرکێ مە هەمیانە دا کو زیندی و پاراستی بمینیت.</p>
                      </div>
                  </div>
              </div>

              <div className="bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 group hover:border-blue-500/20">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-110 transition-transform duration-300">
                          <Cpu size={24} />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-200 mb-1">ژیریا دەستکرد</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">بکارهئینانا تەکنەلۆجیایا سەردەم (AI) بۆ پێشخستن و بەڵاڤکرنا زمانێ پیرۆزێ کوردی ل جیهانێ.</p>
                      </div>
                  </div>
              </div>

              <div className="bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 group hover:border-purple-500/20">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500 group-hover:scale-110 transition-transform duration-300">
                          <Palette size={24} />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-200 mb-1">دیزاینێ تایبەت</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">دیزاینەکێ مودێرن و ب سانا بۆ بکارئینەران، داکو ب خۆشی و بێ ئاریشە مفای ژ خزمەتگوزاریان وەربگرن.</p>
                      </div>
                  </div>
              </div>

              <div className="bg-[#0a0a0a]/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 group hover:border-green-500/20">
                  <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500/10 rounded-xl text-green-500 group-hover:scale-110 transition-transform duration-300">
                          <Zap size={24} />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-gray-200 mb-1">بیرهات AI</h3>
                          <p className="text-sm text-gray-400 leading-relaxed">وەرگێڕانەکا ب لەز و دروست ب پشتەڤانیا مۆدێلێن هەرە ب هێز یێن جیهانێ بۆ خزمەتا وە.</p>
                      </div>
                  </div>
              </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;