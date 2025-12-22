
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
  Megaphone, 
  Bot, 
  ChevronLeft 
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
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

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const languages = [
    "Auto Detect", "کوردی بادینی", "کوردی سورانی", "ئینگلیزی", "عەرەبی", "تورکی", "فارسی", "فەڕەنسی", "ئەلمانی", "ئیسپانی", 
    "ئیتاڵی", "ڕووسی", "چینی", "ژاپۆنی", "کۆری", "پورتوگالی", "هۆڵەندی", "سویدی", "نەرویجی", "دانیمارکی", "فیلیپینی"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, showFullChat]);

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#030308] relative overflow-x-hidden pb-6">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header - Menu Right, Logo Left (in RTL) */}
      {!showFullChat && (
        <nav className="w-full max-w-xl px-4 py-3 flex items-center justify-between sticky top-0 z-50 glass border-b border-white/5 shadow-2xl">
          {/* Menu Button (Appears Right in RTL) */}
          <button onClick={() => setIsMenuOpen(true)} className="w-9 h-9 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-all border border-white/5 active:scale-90">
            <Menu className="w-4 h-4 text-white" />
          </button>

          {/* Logo (Appears Left in RTL) */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { setActiveTab('translate'); setShowFullChat(false); }}>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-white leading-none">بیرهات <span className="text-indigo-400">AI</span></span>
              <span className="text-[6px] text-zinc-500 font-bold tracking-[0.1em] uppercase">Intelligence</span>
            </div>
            <div className="w-7 h-7 ai-gradient rounded-lg flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all">
              <Cpu className="text-white w-3.5 h-3.5" />
            </div>
          </div>
        </nav>
      )}

      <main className={`w-full max-w-xl px-4 pt-4 space-y-4 z-10 relative transition-all duration-500 ${showFullChat ? 'pt-0 max-w-none px-0' : ''}`}>
        {showFullChat ? (
          <div className="flex flex-col h-screen w-full bg-[#030308] animate-reveal">
            <div className="p-4 glass border-b border-white/5 flex items-center justify-between">
              <button onClick={() => setShowFullChat(false)} className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="font-bold text-xs uppercase">ڤەگەرە</span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <h3 className="text-white font-black text-sm">بیرهات AI</h3>
                  <p className="text-[8px] text-green-400 font-bold">Online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-transparent">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] shadow-lg ${msg.role === 'user' ? 'bg-white/5 text-zinc-300 border border-white/5 rounded-bl-none' : 'ai-gradient text-white rounded-br-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-end">
                  <div className="ai-gradient p-2 px-3 rounded-xl animate-pulse text-white text-[9px] font-bold">ل هیڤیا بەرسڤێ...</div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 glass border-t border-white/5 pb-8">
              <div className="max-w-xl mx-auto flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="ئاریشەکا مۆبایل بنڤێسە..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                />
                <button onClick={handleChat} className="w-11 h-11 ai-gradient rounded-full flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-20 glass rounded-xl border-indigo-500/10 overflow-hidden relative group flex items-center justify-center shadow-lg">
              <div className="text-center p-2 z-10">
                <h2 className="text-xs font-black text-white tracking-tight leading-snug">
                  ژبۆ ڕیکلامکرنێ دناڤ وێبسایتی دا <br /> پەیوەندیێ ب مە بکە
                </h2>
              </div>
              <div className="ad-shimmer-layer"></div>
            </div>

            {activeTab === 'translate' && (
              <div className="space-y-5 animate-reveal">
                <div className="glass rounded-3xl p-4 space-y-4 border-white/5 shadow-2xl relative">
                  <div className="flex items-center justify-between gap-2">
                    <select 
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[9px] font-black rounded-lg px-2 py-2 focus:outline-none"
                    >
                      {languages.map(l => <option key={l} value={l} className="bg-[#030308]">{l}</option>)}
                    </select>
                    <div className="p-1 bg-indigo-500/10 rounded text-indigo-400"><ArrowRightLeft size={10} /></div>
                    <select 
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 text-white text-[9px] font-black rounded-lg px-2 py-2 focus:outline-none"
                    >
                      {languages.slice(1).map(l => <option key={l} value={l} className="bg-[#030308]">{l}</option>)}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <textarea 
                      placeholder="نڤێسینا خو ل ڤێرە بنڤێسە..."
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-indigo-500/20 resize-none shadow-inner"
                    />

                    <div className="flex flex-col items-center">
                      <button 
                        onClick={handleTranslate}
                        disabled={isTranslating}
                        className="w-full max-w-[200px] h-12 gold-gradient-solid rounded-xl flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all border border-white/10"
                      >
                        {isTranslating ? <Zap className="w-4 h-4 text-black animate-spin" /> : <Languages className="w-4 h-4 text-black" />}
                        <span className="text-black font-black text-base gold-text-glow">وەرگێڕان</span>
                      </button>
                    </div>

                    <div className="w-full min-h-[100px] bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-4 text-white text-sm flex items-center justify-center text-center leading-relaxed">
                      {targetText || <span className="text-zinc-700 italic">وەرگێڕان دێ ل ڤێرە دیار بیت...</span>}
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowFullChat(true)}
                    className="w-full glass border-indigo-500/10 p-4 rounded-xl flex items-center justify-center gap-3 group transition-all hover:bg-white/5 active:scale-95"
                  >
                    <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                    <div className="text-right">
                      <div className="text-white font-black text-sm">چاتی بکە دگەل بیرهات AI</div>
                      <div className="text-indigo-400 font-black text-[9px] uppercase tracking-widest">دەستپێبکە</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="glass rounded-3xl p-6 space-y-6 animate-reveal text-center relative overflow-hidden">
                <div className="w-24 h-24 ai-gradient rounded-3xl p-1 mx-auto floating shadow-2xl">
                  <div className="w-full h-full bg-[#030308] rounded-[1.4rem] flex items-center justify-center"><User className="w-10 h-10 text-white opacity-60" /></div>
                </div>
                <h2 className="text-xl font-black text-white">بیرهات (Birhat)</h2>
                <p className="text-zinc-300 text-sm leading-relaxed text-justify px-2">ناڤێ من بیرهات، دەرچوویێ بەشێ زمانێ ئینگلیزی مە ل زانکۆیا زاخۆ. من ئەڤ پلاتفۆرمە دروست کریە ژبو کو خزمەتا زمان و زاراڤێ مەیێ کوردی بادینی بکەم و بکارئینانا ژیریا دەستکرد ل ڤێرە گەشە پێ بدەم.</p>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="grid grid-cols-1 gap-3 animate-reveal">
                <div className="glass p-6 rounded-2xl border-white/5 text-center space-y-2 hover:border-indigo-500/20 transition-all">
                  <Sparkles className="w-6 h-6 text-indigo-400 mx-auto" />
                  <h3 className="text-base font-black text-white">سمینار</h3>
                  <p className="text-zinc-500 text-[10px]">دروستکرنا سمینارێن ئەکادیمی ب زمانێن بیانی.</p>
                </div>
                <div className="glass p-6 rounded-2xl border-white/5 text-center space-y-2 hover:border-pink-500/20 transition-all">
                  <GraduationCap className="w-6 h-6 text-pink-400 mx-auto" />
                  <h3 className="text-base font-black text-white">کۆرس</h3>
                  <p className="text-zinc-500 text-[10px]">کۆرسێن فێربوونا زمانێ ئینگلیزی ل نێزیک.</p>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="glass rounded-3xl p-6 space-y-6 animate-reveal">
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" className="flex flex-col items-center gap-2 p-4 glass rounded-xl border border-white/5 hover:bg-white/5 transition-all active:scale-95">
                      <s.icon className={`w-6 h-6 ${s.color}`} />
                      <span className="text-[9px] font-black text-white uppercase">{s.name}</span>
                    </a>
                  ))}
                </div>
                <div className="ai-gradient p-6 rounded-2xl text-center shadow-xl border border-white/10 active:scale-95 transition-transform">
                  <h4 className="text-white/50 font-black mb-1 uppercase text-[7px] tracking-widest">Direct WhatsApp</h4>
                  <a href="tel:07503687260" className="text-xl font-black text-white">07503687260</a>
                </div>
              </div>
            )}

            <footer className="pt-6 pb-2 flex flex-col items-center gap-1 border-t border-white/5">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600">Created by Birhat</span>
              <span className="text-[7px] text-zinc-800 font-bold uppercase tracking-widest">© 2025 Birhat AI</span>
            </footer>
          </>
        )}
      </main>
      
      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-56 h-full glass border-l border-white/5 p-5 flex flex-col shadow-2xl animate-reveal">
            <button onClick={() => setIsMenuOpen(false)} className="self-end p-1.5 bg-white/5 rounded-full mb-6 border border-white/10 active:scale-90"><X size={16} className="text-white"/></button>
            <div className="space-y-2">
              {[
                { id: 'translate', label: 'سەرەکی', icon: Layout },
                { id: 'about', label: 'دەربارەی من', icon: Info },
                { id: 'services', label: 'خزمەتگوزاری', icon: Briefcase },
                { id: 'contact', label: 'پەیوەندی', icon: Phone }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setShowFullChat(false); setIsMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl transition-all ${activeTab === item.id && !showFullChat ? 'ai-gradient text-white shadow-lg translate-x-[-4px]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-[13px] font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
