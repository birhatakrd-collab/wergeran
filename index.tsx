
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Instagram, 
  Send, 
  Ghost, 
  Music2, 
  Sparkles, 
  Cpu,
  Phone,
  ArrowRightLeft,
  Menu,
  X,
  Briefcase,
  Languages,
  Zap,
  Layout,
  User,
  GraduationCap,
  Bot,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [isActivated, setIsActivated] = useState<boolean>(() => {
    return localStorage.getItem('isActivated') === 'true';
  });
  const [activationCode, setActivationCode] = useState('');
  const [activationError, setActivationError] = useState(false);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'translate' | 'about' | 'services' | 'contact'>('translate');
  const [showFullChat, setShowFullChat] = useState(false);
  
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLang, setSourceLang] = useState('Auto Detect');
  const [targetLang, setTargetLang] = useState('کوردی بادینی');
  const [isTranslating, setIsTranslating] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'سلاڤ! ئەز بیرهات AI مە، شارەزا مە د چاڕەسەرکرنا ئاریشێن مۆبایل و سۆشیال میدیایێ دا. فەرموو، ئەز چەوا دشێم هاریکاریا تە بکەم؟' }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize AI - Using standard process.env.API_KEY for Netlify compatibility
  // Please ensure your Netlify environment variable is named "API_KEY"
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const languages = [
    "Auto Detect", "کوردی بادینی", "کوردی سورانی", "ئینگلیزی", "عەرەبی", "تورکی", "فارسی", "فەڕەنسی", "ئەلمانی", "ئیسپانی", 
    "ئیتاڵی", "ڕووسی", "چینی", "ژاپۆنی", "کۆری", "پورتوگالی", "هۆڵەندی", "سویدی", "نەرویجی", "دانیمارکی", "فیلیپینی"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, showFullChat]);

  const handleActivation = () => {
    if (activationCode === '1290') {
      setIsActivated(true);
      localStorage.setItem('isActivated', 'true');
    } else {
      setActivationError(true);
      setTimeout(() => setActivationError(false), 2000);
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate from ${sourceLang} to ${targetLang}. If the target is Badini, use authentic and pure Badini dialect of Kurdish. Only provide the translation text, nothing else. Text: "${sourceText}"`,
      });
      setTargetText(response.text || 'ئاریشەیەک چێبوو...');
    } catch (error) {
      setTargetText('بوورە، وەرگێڕان سەرنەگرت.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are 'بیرهات AI', a specialized assistant. You ONLY help users with mobile phone and social media issues. You MUST ONLY answer in the Badini Kurdish dialect. If the user asks about anything else, politely explain that you are specifically for mobile/social media support in Badini. Be friendly and professional.`,
        }
      });
      setChatMessages(prev => [...prev, { role: 'ai', text: response.text || 'ببوورە من تێنگەهشت.' }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'ئاریشەیەک د پەیوەندیێ دا هەیە.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const socialLinks = [
    { name: 'Telegram', icon: Send, url: 'https://t.me/birhatkrd', color: 'text-[#0088cc]' },
    { name: 'Snapchat', icon: Ghost, url: 'https://snapchat.com/add/birhatkrd', color: 'text-[#fffc00]' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/birhatkrd', color: 'text-[#e4405f]' },
    { name: 'TikTok', icon: Music2, url: 'https://tiktok.com/@birhatkrd', color: 'text-white' }
  ];

  if (!isActivated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030308] p-6 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-pink-600/10 rounded-full blur-[140px] animate-pulse"></div>
        </div>
        
        <div className="w-full max-w-sm glass rounded-[3.5rem] p-8 text-center space-y-8 animate-reveal relative border-white/5 shadow-[0_0_100px_rgba(79,70,229,0.1)]">
          <div className="space-y-4">
            <div className="w-20 h-20 ai-gradient rounded-full p-0.5 mx-auto floating shadow-[0_0_40px_rgba(79,70,229,0.4)]">
              <div className="w-full h-full bg-[#030308] rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-[26px] font-black text-white leading-tight">
                بخێرهاتی بو باشترین <br/>
                <span className="text-indigo-400">وەرگێرانا بادینی</span>
              </h1>
              <div className="flex items-center justify-center gap-1.5 py-1">
                <div className="w-1 h-1 rounded-full bg-indigo-500 animate-ping"></div>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] italic">Birhat AI Platform</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-3xl border border-white/5 backdrop-blur-md shadow-inner">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-[12px] text-zinc-300 text-right leading-relaxed font-bold">
                تیمێ مە ب باشترین شێواز یێ کاردکەت داکو ب زویترین دەم بهێتە خزمەتا هەوە
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="relative group">
              <input 
                type="tel" 
                maxLength={4}
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleActivation()}
                placeholder="کۆدێ ئەکتیفکرنێ"
                className={`relative w-full bg-[#0a0a0f] border ${activationError ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-[1.8rem] px-6 py-5 text-white text-center text-4xl font-black focus:outline-none focus:border-indigo-500 transition-all placeholder:text-zinc-800 tracking-tighter shadow-inner leading-none`}
              />
              {activationError && <p className="text-red-500 text-[11px] font-black mt-3 animate-bounce">کۆد یێ شاشە، دووبارە تێست بکە!</p>}
            </div>

            <button 
              onClick={handleActivation}
              className="w-full h-14 gold-gradient-solid rounded-[1.5rem] flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all border border-white/20 group overflow-hidden relative"
            >
              <CheckCircle2 className="w-6 h-6 text-black relative z-10" />
              <span className="text-black font-black text-xl gold-text-glow relative z-10">دەستپێبکە</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/5">
            <div className="bg-indigo-500/5 p-3 rounded-2xl border border-indigo-500/10 inline-block px-5">
              <p className="text-[11px] text-zinc-300 font-black leading-relaxed">
                تێبینی : وێبسایت بێ بەرامبەرە <br/> 
                <span className="text-zinc-500 text-[10px] font-bold">لێ هێشتا نە هاتیە بەلافکرن</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#030308] relative overflow-x-hidden pb-4">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/5 rounded-full blur-[100px]"></div>
      </div>

      {!showFullChat && (
        <nav className="w-full max-w-xl px-4 py-3 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/5 shadow-2xl">
          <button onClick={() => setIsMenuOpen(true)} className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10 shadow-lg">
            <Menu className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setActiveTab('translate'); setShowFullChat(false); }}>
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-black text-white leading-none tracking-tight">بیرهات <span className="text-indigo-400">AI</span></span>
              <span className="text-[6px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Intelligence</span>
            </div>
            <div className="w-7 h-7 ai-gradient rounded-xl flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
              <Cpu className="text-white w-3.5 h-3.5" />
            </div>
          </div>
        </nav>
      )}

      <main className={`w-full max-w-xl px-4 pt-4 space-y-4 z-10 relative transition-all duration-500 ${showFullChat ? 'pt-0 max-w-none px-0' : ''}`}>
        {showFullChat ? (
          <div className="flex flex-col h-screen w-full bg-[#030308] animate-reveal">
            <div className="p-4 glass border-b border-white/5 flex items-center justify-between">
              <button onClick={() => setShowFullChat(false)} className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="font-black text-[11px] uppercase tracking-wider">ڤەگەرە</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 ai-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <h3 className="text-white font-black text-[13px]">بیرهات AI</h3>
                  <p className="text-[8px] text-green-400 font-bold uppercase tracking-widest">Online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-transparent">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-xl border ${msg.role === 'user' ? 'bg-white/5 text-zinc-300 border-white/5' : 'ai-gradient text-white border-white/10'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-end">
                  <div className="ai-gradient p-2.5 px-4 rounded-2xl animate-pulse text-white text-[10px] font-black shadow-lg">ل هیڤیا بەرسڤێ...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 glass border-t border-white/5 pb-10">
              <div className="max-w-xl mx-auto flex gap-3">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="ئاریشەکا مۆبایل بنڤێسە..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-[14px] focus:outline-none focus:border-indigo-500/50 transition-all shadow-inner"
                />
                <button onClick={handleChat} className="w-12 h-12 ai-gradient rounded-2xl flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-24 glass rounded-[1.5rem] border-indigo-500/20 overflow-hidden relative group flex items-center justify-center shadow-xl">
              <div className="text-center p-4 z-10 space-y-1">
                <h2 className="text-[12px] font-black text-white tracking-tight leading-snug drop-shadow-lg">
                  ژبۆ ڕیکلامکرنێ دناڤ وێبسایتی دا <br /> 
                  <span className="text-indigo-400">پەیوەندیێ ب مە بکە</span>
                </h2>
              </div>
              <div className="ad-shimmer-layer"></div>
            </div>

            {activeTab === 'translate' && (
              <div className="space-y-6 animate-reveal">
                <div className="glass rounded-[2rem] p-5 space-y-5 border-white/5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between gap-3">
                    <select 
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="flex-1 bg-[#0a0a0f] border border-white/10 text-white text-[10px] font-black rounded-xl px-3 py-3 focus:outline-none shadow-md"
                    >
                      {languages.map(l => <option key={l} value={l} className="bg-[#030308]">{l}</option>)}
                    </select>
                    <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 shadow-inner border border-indigo-500/10"><ArrowRightLeft size={14} /></div>
                    <select 
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="flex-1 bg-[#0a0a0f] border border-white/10 text-white text-[10px] font-black rounded-xl px-3 py-3 focus:outline-none shadow-md"
                    >
                      {languages.slice(1).map(l => <option key={l} value={l} className="bg-[#030308]">{l}</option>)}
                    </select>
                  </div>

                  <div className="space-y-4">
                    <textarea 
                      placeholder="نڤێسینا خو ل ڤێرە بنڤێسە..."
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      className="w-full h-28 bg-[#0a0a0f] border border-white/10 rounded-[1.2rem] p-4 text-white text-[15px] font-medium focus:outline-none focus:border-indigo-500/30 resize-none shadow-inner leading-relaxed"
                    />

                    <div className="flex flex-col items-center py-1">
                      <button 
                        onClick={handleTranslate}
                        disabled={isTranslating}
                        className="w-full max-w-[220px] h-12 gold-gradient-solid rounded-2xl flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all border border-white/20"
                      >
                        {isTranslating ? <Zap className="w-5 h-5 text-black animate-spin" /> : <Languages className="w-5 h-5 text-black" />}
                        <span className="text-black font-black text-[16px] gold-text-glow uppercase tracking-wider">وەرگێڕان</span>
                      </button>
                    </div>

                    <div className="w-full min-h-[100px] bg-indigo-500/5 border border-indigo-500/10 rounded-[1.2rem] p-5 text-white text-[15px] font-bold flex items-center justify-center text-center leading-relaxed shadow-inner">
                      {targetText || <span className="text-zinc-700 italic text-[13px] font-medium">وەرگێڕان دێ ل ڤێرە دیار بیت...</span>}
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowFullChat(true)}
                    className="w-full glass border-indigo-500/10 p-5 rounded-[1.5rem] flex items-center justify-center gap-4 group transition-all hover:bg-white/5 active:scale-[0.98]"
                  >
                    <div className="w-9 h-9 ai-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform"><Bot className="w-5 h-5 text-white" /></div>
                    <div className="text-right">
                      <div className="text-white font-black text-[14px]">چاتی بکە دگەل بیرهات AI</div>
                      <div className="text-indigo-400 font-black text-[9px] uppercase tracking-[0.2em]">دەستپێبکە</div>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-indigo-400 mr-auto opacity-40 group-hover:translate-x-[-5px] transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="glass rounded-[2rem] p-8 space-y-7 animate-reveal text-center relative overflow-hidden shadow-2xl">
                <div className="w-24 h-24 ai-gradient rounded-3xl p-0.5 mx-auto floating shadow-2xl">
                  <div className="w-full h-full bg-[#030308] rounded-[1.7rem] flex items-center justify-center">
                    <User className="w-10 h-10 text-white opacity-40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-white">بیرهات (Birhat)</h2>
                  <div className="h-0.5 w-12 bg-indigo-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-zinc-300 text-[14px] leading-relaxed text-justify px-2 opacity-90 font-medium">ناڤێ من بیرهات، دەرچوویێ بەشێ زمانێ ئینگلیزی مە ل زانکۆیا زاخۆ. من ئەڤ پلاتفۆرمە دروست کریە ژبو کو خزمەتا زمان و زاراڤێ مەیێ کوردی بادینی بکەم و بکارئینانا ژیریا دەستکرد ل ڤێرە گەشە پێ بدەم.</p>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid grid-cols-1 gap-4 animate-reveal">
                <div className="glass p-6 rounded-[1.5rem] border-white/5 text-center space-y-3 shadow-xl hover:bg-white/5 transition-all group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-[16px] font-black text-white">سمینار</h3>
                  <p className="text-zinc-500 text-[11px] font-medium">دروستکرنا سمینارێن ئەکادیمی ب زمانێن بیانی دگەل دیزاینێن مۆدێرن و سەرنجڕاکێش.</p>
                </div>
                <div className="glass p-6 rounded-[1.5rem] border-white/5 text-center space-y-3 shadow-xl hover:bg-white/5 transition-all group">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-inner">
                    <GraduationCap className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-[16px] font-black text-white">کۆرس</h3>
                  <p className="text-zinc-500 text-[11px] font-medium">کۆرسێن فێربوونا زمانێ ئینگلیزی ب تەکنیکێن مۆدێرن و ب شێوەیەکێ پراکتیکی ل نێزیک.</p>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="glass rounded-[2rem] p-7 space-y-7 animate-reveal shadow-2xl">
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" className="flex flex-col items-center gap-3 p-5 glass rounded-2xl border border-white/5 hover:bg-white/5 transition-all shadow-lg active:scale-95">
                      <s.icon className={`w-6 h-6 ${s.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                      <span className="text-[10px] font-black text-white uppercase tracking-wider">{s.name}</span>
                    </a>
                  ))}
                </div>
                <div className="ai-gradient p-7 rounded-[1.8rem] text-center shadow-2xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="text-white/40 font-black mb-1 uppercase text-[8px] tracking-[0.3em]">Direct Line</h4>
                  <a href="tel:07503687260" className="text-2xl font-black text-white active:scale-95 transition-transform block shadow-lg">07503687260</a>
                </div>
              </div>
            )}

            <footer className="pt-8 pb-4 flex flex-col items-center gap-2 border-t border-white/5 opacity-60">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Designed & Developed by Birhat</span>
              <span className="text-[7px] text-zinc-800 font-bold uppercase tracking-[0.4em]">© 2025 Birhat AI Platform</span>
            </footer>
          </>
        )}
      </main>
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-start">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-64 h-full glass border-r border-white/10 p-6 flex flex-col shadow-2xl animate-reveal">
            <button onClick={() => setIsMenuOpen(false)} className="self-start p-2 mb-8 text-zinc-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-6">
              {[
                { id: 'translate', icon: Layout, label: 'وەرگێڕان' },
                { id: 'about', icon: User, label: 'دەربارەی من' },
                { id: 'services', icon: Briefcase, label: 'خزمەتگوزاری' },
                { id: 'contact', icon: Phone, label: 'پەیوەندی' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMenuOpen(false);
                    setShowFullChat(false);
                  }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === item.id && !showFullChat ? 'bg-indigo-500/20 text-indigo-400' : 'text-zinc-400 hover:bg-white/5'}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-black text-[14px]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
