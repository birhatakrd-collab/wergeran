
import React from 'react';
import { 
  Instagram, 
  Send, 
  Ghost, 
  Music2, 
  Sparkles, 
  Globe,
  Cpu,
  Phone,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const socialLinks = [
    { 
      name: 'Telegram', 
      icon: Send, 
      url: 'https://t.me/birhatkrd', 
      color: 'text-[#0088cc]', 
      bg: 'bg-[#0088cc]/10',
      border: 'border-[#0088cc]/20'
    },
    { 
      name: 'Snapchat', 
      icon: Ghost, 
      url: 'https://snapchat.com/add/birhatkrd', 
      color: 'text-[#fffc00]', 
      bg: 'bg-[#fffc00]/10',
      border: 'border-[#fffc00]/20'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/birhatkrd', 
      color: 'text-[#e4405f]', 
      bg: 'bg-[#e4405f]/10',
      border: 'border-[#e4405f]/20'
    },
    { 
      name: 'TikTok', 
      icon: Music2, 
      url: 'https://tiktok.com/@birhatkrd', 
      color: 'text-white', 
      bg: 'bg-white/10',
      border: 'border-white/20'
    }
  ];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <div className="mesh-bg"></div>
      
      <div className="scroll-container px-6 pt-10">
        
        {/* Branding / Domain */}
        <div className="flex justify-center mb-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="px-5 py-2 glass-card rounded-full border-white/5 flex items-center gap-3 group">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]"></div>
            <span className="text-sm font-bold tracking-wider text-indigo-100/80">birhatkrd.com</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex justify-center mb-10 animate-reveal" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-[3rem] flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(79,70,229,0.6)] animate-float">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#12121a] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
              <Cpu className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-4 mb-12 animate-reveal" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl font-black text-gradient leading-[1.3] px-2">
            چاڤەرێ <span className="underline decoration-indigo-500/30 decoration-4 underline-offset-8">باشترین</span> وێبسایتێ وەرگێرانێ ببن
          </h1>
          <p className="text-zinc-500 text-sm font-medium tracking-wide">هەمی زمانان ب زاراڤێ بادینی ببینه</p>
        </div>

        {/* Main Info Card */}
        <div className="glass-card rounded-[2.5rem] p-8 mb-8 animate-reveal group" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <Globe className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-indigo-300">پڕۆژەیێ نوی</span>
            </div>
            <ShieldCheck className="w-5 h-5 text-zinc-600" />
          </div>
          
          <p className="text-lg font-medium leading-[1.9] text-zinc-300 text-justify" style={{ direction: 'rtl' }}>
            تیمێ مە یێ کار لسەر ئێک ژ بهێزترین پروژە دکەت ئەوژی وەرگێران ژ هەمی زمانان بو زمانێ کوردی یێ بادینی ب رێکا ژیریا دەستکرد ڤە و دگەل هندێ باشترین و ب هێزترین AI ب کوردی و ب زاراڤێ بادینی ب ئاخڤیتن...
          </p>
        </div>

        {/* Contact / Phone Section */}
        <div className="animate-reveal mb-10" style={{ animationDelay: '0.5s' }}>
          <div className="glass-card rounded-[2.2rem] p-6 border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                <Phone className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400/80 mb-2">ژبو ریکلام و سپونسەر کرنێ</h3>
              <a 
                href="tel:07503687260" 
                className="text-white text-2xl font-black tracking-widest hover:text-indigo-400 transition-colors flex items-center gap-2"
              >
                07503687260
                <ArrowUpRight className="w-5 h-5 opacity-40" />
              </a>
              <p className="mt-3 text-zinc-500 text-[13px] font-medium leading-relaxed">
                ژبو ریکلام کرنێ دناڤ وێبسایتێ مەدا پەیوەندیێ بمە بکە یان نامەکێ بومە فرێبکە
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Social Links */}
        <div className="animate-reveal grid grid-cols-4 gap-4 mb-12" style={{ animationDelay: '0.6s' }}>
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group active:scale-90 transition-transform"
            >
              <div className={`w-16 h-16 ${social.bg} ${social.border} border rounded-[1.5rem] flex items-center justify-center shadow-xl group-hover:-translate-y-2 transition-all duration-500 icon-glow ${social.color}`}>
                <social.icon className="w-7 h-7" />
              </div>
            </a>
          ))}
        </div>

        {/* Professional Footer - Empty Spacer */}
        <div className="text-center opacity-30 animate-reveal pb-10" style={{ animationDelay: '0.7s' }}>
          <div className="h-[1px] w-12 bg-zinc-800 mx-auto mb-6"></div>
        </div>

      </div>
    </div>
  );
};

export default App;
