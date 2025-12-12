import React from 'react';
import { User, MapPin, GraduationCap, Instagram, Send, Ghost, Code2, Globe } from 'lucide-react';
import { DEVELOPER_INFO, SOCIAL_LINKS } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          دەربارەی <span className="gold-gradient-text">گەشەپێدەری</span>
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto rounded-full opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Profile Card */}
        <div className="glass-panel rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden group hover:border-gold-500/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
             <div className="w-32 h-32 mx-auto mb-8 relative">
               <div className="absolute inset-0 bg-gold-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
               <div className="relative w-full h-full bg-dark-900 rounded-full border-2 border-gold-500 flex items-center justify-center overflow-hidden shadow-2xl">
                 <span className="text-6xl font-black text-white">B</span>
               </div>
             </div>

             <h3 className="text-3xl font-bold text-white mb-2">{DEVELOPER_INFO.name}</h3>
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 font-medium text-sm mb-8">
               <Code2 size={16} />
               <span>Full Stack Developer</span>
             </div>

             <div className="space-y-4 text-right max-w-sm mx-auto">
               <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-dark-900 rounded-xl text-gold-400 shadow-inner">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">قوناغا خوێندنێ</p>
                    <p className="text-gray-200 font-medium">{DEVELOPER_INFO.degree}</p>
                  </div>
               </div>

               <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="p-3 bg-dark-900 rounded-xl text-gold-400 shadow-inner">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">جهـ</p>
                    <p className="text-gray-200 font-medium">{DEVELOPER_INFO.origin}</p>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Vision & Social */}
        <div className="flex flex-col gap-8">
          
          {/* Vision Box */}
          <div className="glass-panel rounded-[2rem] p-10 flex-1 relative overflow-hidden">
             <Globe className="text-gold-500/20 w-48 h-48 absolute -bottom-10 -left-10 rotate-12" />
             
             <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Globe className="text-gold-500" />
                  ئارمانجا مە
                </h4>
                <p className="text-gray-300 leading-9 text-lg text-justify font-light">
                  {DEVELOPER_INFO.description}
                </p>
             </div>
          </div>

          {/* Social Links Box */}
          <div className="glass-panel rounded-[2rem] p-8">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <p className="text-gray-400 text-sm">پەیوەندیێ بکە</p>
                   <p className="text-xl font-bold text-white dir-ltr text-right">{SOCIAL_LINKS.handle}</p>
                </div>
                <div className="bg-gold-500 text-black px-4 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Follow Me</div>
             </div>
             
             <div className="flex justify-between gap-4">
                <a href={SOCIAL_LINKS.instagram} target="_blank" className="flex-1 bg-dark-900 p-4 rounded-2xl flex items-center justify-center text-gray-400 hover:text-pink-500 hover:bg-pink-500/10 border border-white/5 transition-all">
                  <Instagram size={28} />
                </a>
                <a href={SOCIAL_LINKS.snapchat} target="_blank" className="flex-1 bg-dark-900 p-4 rounded-2xl flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 border border-white/5 transition-all">
                  <Ghost size={28} />
                </a>
                <a href={SOCIAL_LINKS.telegram} target="_blank" className="flex-1 bg-dark-900 p-4 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 border border-white/5 transition-all">
                  <Send size={28} />
                </a>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;