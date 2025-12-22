
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
  Info, 
  Briefcase, 
  Languages, 
  Zap, 
  Layout, 
  User, 
  GraduationCap, 
  Bot, 
  ChevronLeft,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ShieldCheck,
  RefreshCcw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// لیستا زمانێن پشتەڤانی لێکری
const languages = [
  'Auto Detect',
  'English',
  'Arabic',
  'کوردی بادینی',
  'کوردی سۆرانی',
  'Turkish',
  'German',
  'French',
  'Spanish',
  'Persian',
  'Dutch',
  'Russian'
];

const App: React.FC = () => {
  // --- Security & Activation ---
  const [isActivated, setIsActivated] = useState<boolean>(() => {
    return localStorage.getItem('birhat_ai_activated') === 'true';
  });
  const [pin, setPin] = useState(['', '', '', '']);
  const [activationError, setActivationError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // --- Navigation & UI ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'translate' | 'about' | 'services' | 'contact'>('translate');
  const [showFullChat, setShowFullChat] = useState(false);
  
  // --- Features ---
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

  // --- PIN Logic ---
  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPin = () => {
    const finalPin = pin.join('');
    if (finalPin.length < 4) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      if (finalPin === '1290') {
        setIsActivated(true);
        localStorage.setItem('birhat_ai_activated', 'true');
        setActivationError(false);
      } else {
        setActivationError(true);
        setPin(['', '', '', '']);
        inputRefs[0].current?.focus();
        setTimeout(() => setActivationError(false), 2000);
      }
      setIsVerifying(false);
    }, 1000);
  };

  useEffect(() => {
    if (pin.every(digit => digit !== '')) {
      verifyPin();
    }
  }, [pin]);

  // --- AI Handlers ---
  const handleTranslate = async () => {
    if (!sourceText.trim() || isTranslating) return;
    setIsTranslating(true);
    try {
      // Initialization right before call ensures the most up-to-date key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate from ${sourceLang} to ${targetLang}. If the target is Badini, use authentic and pure Badini dialect of Kurdish. ONLY provide the translation text, no metadata. Input Text: "${sourceText}"`,
      });
      setTargetText(response.text || 'نەشیام وەرگێڕانێ بکەم.');
    } catch (error) {
      setTargetText('بوورە، کێشەیەک د سێرڤەری دا هەیە.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      // Initialization right before call ensures the most up-to-date key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `Your name is 'بیرهات AI'. You are a tech assistant for mobile and social media issues. Use Badini dialect. Be extremely helpful and friendly.`,
        }
      });
      setChatMessages(prev => [...prev, { role: 'ai', text: response.text || 'ببوورە من تێنگەهشت.' }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'ai', text: 'ئاریشەک د پەیوەندیێ دا هەیە.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, showFullChat]);

  const socialLinks = [
    { name: 'Telegram', icon: Send, url: 'https://t.me/birhatkrd', color: 'text-[#0088cc]' },
    { name: 'Snapchat', icon: Ghost, url: 'https://snapchat.com/add/birhatkrd', color: 'text-[#fffc00]' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/birhatkrd', color: 'text-[#e4405f]' },
    { name: 'TikTok', icon: Music2, url: 'https://tiktok.com/@birhatkrd', color: 'text-white' }
  ];

  // --- Render Security Screen ---
  if (!isActivated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030308] relative px-6 overflow-hidden">
        <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-pink-600/10 rounded-full blur-[100px] animate-pulse"></div>
        
        <div className="w-full max-w-sm z-10 animate-reveal">
          <div className="glass rounded-[3.5rem] p-10 border-white/5 shadow-2xl space-y-10 text-center relative overflow-hidden">
            <div className="space-y-4">
              <div className="w-24 h-24 ai-gradient rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl floating">
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tighter">Security Lock</h1>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Protected by Birhat Engine</p>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 rounded-3xl p-5 flex gap-4 text-right items-center group hover:bg-amber-500/10 transition-colors" dir="rtl">
              <div className="w-10 h-10 bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-amber-200/80 text-[11px] font-bold leading-relaxed">
                چ دەمێ هوسا نەمایە وێبسایت بهێتە بەلاف کرن چاڤێ هەوە لسەر سوشیالا مەبیت!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-4" dir="ltr">
                {pin.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={inputRefs[idx]}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className={`w-14 h-20 bg-white/5 border ${activationError ? 'border-red-500/50 animate-shake' : 'border-white/10'} rounded-3xl text-center text-3xl font-black text-white focus:outline-none focus:border-indigo-500/40 transition-all shadow-inner`}
                  />
                ))}
              </div>
              
              <div className="h-4">
                {isVerifying ? (
                  <div className="flex items-center justify-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                    <RefreshCcw className="w-3 h-3 animate-spin" /> System Verifying...
                  </div>
                ) : activationError ? (
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Wrong Access Code</span>
                ) : (
                  <span className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em] opacity-40">Code is required to proceed</span>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-5">
              <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">Request Unlock Code</p>
              <div className="flex items-center justify-center gap-5">
                {socialLinks.slice(0, 3).map(link => (
                  <a key={link.name} href={link.url} target="_blank" className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-all active:scale-90">
                    <link.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#030308] relative overflow-x-hidden pb-10">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-pink-600/5 rounded-full blur-[120px]"></div>
      </div>

      {!showFullChat && (
        <nav className="w-full max-w-xl px-5 py-5 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/5 shadow-2xl">
          <button onClick={() => setIsMenuOpen(true)} className="w-11 h-11 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 active:scale-90">
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setActiveTab('translate'); setShowFullChat(false); }}>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black text-white leading-none">بیرهات <span className="text-indigo-400">AI</span></span>
              <span className="text-[8px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-1">Intelligence Platform</span>
            </div>
            <div className="w-10 h-10 ai-gradient rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-12 transition-all">
              <Cpu className="text-white w-5 h-5" />
            </div>
          </div>
        </nav>
      )}

      <main className={`w-full max-w-xl px-5 pt-8 space-y-6 z-10 relative transition-all duration-500 ${showFullChat ? 'pt-0 max-w-none px-0' : ''}`}>
        {showFullChat ? (
          <div className="flex flex-col h-screen w-full bg-[#030308] animate-reveal">
            <div className="p-6 glass border-b border-white/5 flex items-center justify-between">
              <button onClick={() => setShowFullChat(false)} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-black text-[11px] uppercase tracking-widest">ڤەگەرە</span>
              </button>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <h3 className="text-white font-black text-[15px]">بیرهات AI</h3>
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</p>
                  </div>
                </div>
                <div className="w-12 h-12 ai-gradient rounded-2xl flex items-center justify-center shadow-2xl">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-7 custom-scrollbar bg-transparent">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[2rem] text-[14px] leading-relaxed shadow-2xl border ${msg.role === 'user' ? 'bg-white/5 text-zinc-300 border-white/5 rounded-bl-none' : 'ai-gradient text-white border-white/10 rounded-br-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-end">
                  <div className="ai-gradient p-4 px-7 rounded-[1.5rem] animate-pulse text-white text-[11px] font-black uppercase tracking-[0.2em] shadow-xl">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-6 glass border-t border-white/5 pb-12">
              <div className="max-w-2xl mx-auto flex gap-4">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="ئاریشەکا مۆبایل یان سۆشیال میدیا بنڤێسە..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-[1.8rem] px-6 py-5 text-white text-[15px] focus:outline-none focus:border-indigo-500/40 transition-all placeholder:text-zinc-700 shadow-inner"
                />
                <button onClick={handleChat} disabled={isChatLoading} className="w-16 h-16 ai-gradient rounded-[1.8rem] flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform disabled:opacity-50">
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-28 glass rounded-[2.5rem] border-indigo-500/10 overflow-hidden relative group flex items-center justify-center shadow-2xl border cursor-pointer hover:bg-white/5 transition-all">
              <div className="text-center p-5 z-10 space-y-2">
                <h2 className="text-[14px] font-black text-white tracking-tight">
                  ژبۆ ڕیکلامکرنێ دناڤ وێبسایتی دا
                </h2>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] opacity-60">Pave your brand with us</p>
              </div>
              <div className="ad-shimmer-layer opacity-40"></div>
            </div>

            {activeTab === 'translate' && (
              <div className="space-y-7 animate-reveal">
                <div className="glass rounded-[3rem] p-7 space-y-7 border-white/5 shadow-2xl relative">
                  <div className="flex items-center justify-between gap-4">
                    <select 
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[11px] font-black rounded-2xl px-4 py-4 focus:outline-none appearance-none text-center shadow-sm"
                    >
                      {languages.map(l => <option key={l} value={l} className="bg-[#030308]">{l}</option>)}
                    </select>
                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20 shadow-lg"><ArrowRightLeft size={16} /></div>
                    <select 
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[11px] font-black rounded-2xl px-4 py-4 focus:outline-none appearance-none text-center shadow-sm"
                    >
                      {languages.slice(1).map(l => <option key={l} value={l} className="bg-[#030308]">{l}</option>)}
                    </select>
                  </div>
                  <div className="space-y-5">
                    <textarea 
                      placeholder="نڤێسینا خو ل ڤێرە بنڤێسە..."
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      className="w-full h-40 bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white text-[16px] focus:outline-none focus:border-indigo-500/30 resize-none shadow-inner transition-all leading-relaxed"
                    />
                    <div className="flex justify-center">
                      <button onClick={handleTranslate} disabled={isTranslating} className="w-full max-w-[240px] h-16 gold-gradient-solid rounded-3xl flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all border border-white/10 group">
                        {isTranslating ? <Loader2 className="w-6 h-6 text-black animate-spin" /> : <Languages className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />}
                        <span className="text-black font-black text-xl gold-text-glow">وەرگێڕان</span>
                      </button>
                    </div>
                    <div className="w-full min-h-[140px] bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] p-7 text-white text-[16px] flex items-center justify-center text-center leading-relaxed shadow-inner">
                      {targetText || <span className="text-zinc-700 italic font-bold opacity-30 tracking-wide">وەرگێڕان دێ ل ڤێرە دیار بیت...</span>}
                    </div>
                  </div>
                  <button onClick={() => setShowFullChat(true)} className="w-full glass border-indigo-500/20 p-6 rounded-3xl flex items-center justify-between group transition-all hover:bg-white/5 active:scale-95 shadow-xl">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 ai-gradient rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform"><Bot className="w-7 h-7 text-white" /></div>
                      <div className="text-right">
                        <div className="text-white font-black text-[17px]">چاتی بکە دگەل بیرهات AI</div>
                        <div className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] mt-1">Smart Engine Online</div>
                      </div>
                    </div>
                    <ChevronLeft className="w-6 h-6 text-zinc-600 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="glass rounded-[3.5rem] p-10 space-y-8 animate-reveal text-center relative overflow-hidden border-white/5 shadow-2xl">
                <div className="w-32 h-32 ai-gradient rounded-[3rem] p-1 mx-auto floating shadow-2xl">
                  <div className="w-full h-full bg-[#030308] rounded-[2.7rem] flex items-center justify-center overflow-hidden">
                    <User className="w-14 h-14 text-white opacity-40" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white tracking-tighter">بیرهات (Birhat)</h2>
                  <p className="text-indigo-400 font-black text-[11px] uppercase tracking-[0.4em] opacity-60">Tech & Linguistics Specialist</p>
                </div>
                <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/5 shadow-inner">
                  <p className="text-zinc-300 text-[15px] leading-relaxed text-center font-bold">
                    ناڤێ من بیرهات، دەرچوویێ بەشێ زمانێ ئینگلیزی مە ل زانکۆیا زاخۆ. من ئەڤ پلاتفۆرمە دروست کریە ژبو کو خزمەتا زمان و زاراڤێ مەیێ کوردی بادینی بکەم و بکارئینانا ژیریا دەستکرد ل ڤێرە گەشە پێ بدەم.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid grid-cols-1 gap-5 animate-reveal">
                <div className="glass p-10 rounded-[3rem] border-white/5 text-center space-y-5 hover:border-indigo-500/40 transition-all group cursor-pointer shadow-2xl relative overflow-hidden">
                  <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg border border-indigo-500/10">
                    <Sparkles className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">سمینار</h3>
                    <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.3em]">Master Sessions</p>
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed font-bold">دروستکرنا سمینارێن ئەکادیمی ب زمانێن بیانی و پێشکەشکرن ب شێوەیەکێ زانستی.</p>
                </div>
                <div className="glass p-10 rounded-[3rem] border-white/5 text-center space-y-5 hover:border-pink-500/40 transition-all group cursor-pointer shadow-2xl relative overflow-hidden">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg border border-pink-500/10">
                    <GraduationCap className="w-8 h-8 text-pink-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">کۆرس</h3>
                    <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.3em]">Educational Courses</p>
                  </div>
                  <p className="text-zinc-400 text-[14px] leading-relaxed font-bold">کۆرسێن فێربوونا زمانێ ئینگلیزی ب ستایلەکێ جیهانی و ب ڕێکارێن نوی.</p>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="glass rounded-[3.5rem] p-10 space-y-10 animate-reveal border-white/5 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" className="flex flex-col items-center gap-4 p-8 glass rounded-[2.2rem] border border-white/5 hover:bg-white/5 transition-all active:scale-95 group shadow-sm border-white/10">
                      <s.icon className={`w-9 h-9 ${s.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] opacity-40">{s.name}</span>
                    </a>
                  ))}
                </div>
                <div className="ai-gradient p-10 rounded-[2.5rem] text-center shadow-[0_25px_50px_-15px_rgba(79,70,229,0.6)] border border-white/10 active:scale-95 transition-transform cursor-pointer relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                  <h4 className="text-white/40 font-black mb-1 uppercase text-[9px] tracking-[0.5em] relative z-10">WhatsApp Hotline</h4>
                  <a href="tel:07503687260" className="text-3xl font-black text-white relative z-10 tracking-widest">07503687260</a>
                </div>
              </div>
            )}

            <footer className="pt-14 pb-4 flex flex-col items-center gap-3 border-t border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/5 rounded-lg flex items-center justify-center border border-white/10"><CheckCircle2 size={10} className="text-indigo-400" /></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">System Secure & Encrypted</span>
              </div>
              <span className="text-[9px] text-zinc-800 font-black uppercase tracking-[0.6em] mt-3">© 2025 Birhat AI Engine • Pro Edition</span>
            </footer>
          </>
        )}
      </main>
      
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-72 h-full glass border-l border-white/5 p-10 flex flex-col shadow-2xl animate-reveal">
            <button onClick={() => setIsMenuOpen(false)} className="self-end p-3 bg-white/5 rounded-2xl mb-12 border border-white/10 active:scale-90 shadow-lg"><X size={24} className="text-white"/></button>
            <div className="space-y-4">
              {[
                { id: 'translate', label: 'سەرەکی', icon: Layout },
                { id: 'about', label: 'دەربارەی من', icon: Info },
                { id: 'services', label: 'خزمەتگوزاری', icon: Briefcase },
                { id: 'contact', label: 'پەیوەندی', icon: Phone }
              ].map(item => (
                <button key={item.id} onClick={() => { setActiveTab(item.id as any); setShowFullChat(false); setIsMenuOpen(false); }} className={`w-full flex items-center gap-5 p-5 rounded-3xl transition-all ${activeTab === item.id && !showFullChat ? 'ai-gradient text-white shadow-2xl scale-[1.05]' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}>
                  <item.icon className="w-6 h-6" />
                  <span className="text-[16px] font-black">{item.label}</span>
                </button>
              ))}
              <div className="mt-16 pt-10 border-t border-white/5">
                <button onClick={() => { localStorage.removeItem('birhat_ai_activated'); window.location.reload(); }} className="w-full flex items-center gap-5 p-5 rounded-3xl text-red-500/30 hover:text-red-500 hover:bg-red-500/5 transition-all group">
                  <Lock className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-[12px] font-black uppercase tracking-widest">Logout Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// لێرە کلیل ب شێوەیەکێ پاراستی دهێتە وەرگرتن
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
