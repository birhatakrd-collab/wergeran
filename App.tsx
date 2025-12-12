import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TranslationBox from './components/TranslationBox';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import { ShieldCheck, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  // Removed Activation Logic State
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    // Show welcome modal once per user session/browser
    const hasVisited = localStorage.getItem('hasVisitedBadiniTranslate_V2');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisitedBadiniTranslate_V2', 'true');
    }
  }, []);

  const renderContent = () => {
    switch (currentSection) {
      case 'about':
        return <AboutSection />;
      case 'services':
        return (
          <div className="max-w-5xl mx-auto px-4 py-20 animate-fade-in text-center">
            <div className="glass-panel p-10 md:p-16 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-500/20 transition-all duration-700"></div>
              
              <div className="inline-flex items-center justify-center p-5 bg-dark-900 rounded-2xl mb-8 shadow-lg border border-gold-500/20">
                <BookOpen className="text-gold-400 w-10 h-10" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">خزمەتگوزاریێن مە</h2>
              <p className="text-gray-300 text-lg md:text-xl leading-loose max-w-3xl mx-auto font-light">
                ئەم رابووینە ب دروستکرنا پێشکەفتیترین وێبسایتێ وەرگێرانێ کو بشێت وەرگێرانەکا دروست و پاراستی بو 
                <span className="text-gold-400 font-bold mx-2">٢٥٠+ زمانان</span>
                 دابین بکەت. تەکنەلوژیایا زیرەکیا دەستکرد (AI) هاتیە بکارئینان ژبو باشترین ئەنجام دگەل دیزاینەکا سەردەمیانە.
              </p>
            </div>
          </div>
        );
      case 'terms':
        return (
           <div className="max-w-5xl mx-auto px-4 py-20 animate-fade-in text-center">
            <div className="glass-panel p-10 md:p-16 rounded-[2rem] relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

              <div className="inline-flex items-center justify-center p-5 bg-dark-900 rounded-2xl mb-8 shadow-lg border border-gold-500/20">
                <ShieldCheck className="text-gold-400 w-10 h-10" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">مەرجێن بکارئینانێ</h2>
              
              <div className="space-y-6 text-gray-300 text-lg md:text-xl text-right max-w-2xl mx-auto font-light">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-gold-500 font-bold text-xl">٠١</span>
                  <p>ئەڤ وێبسایتە بێ بەرامبەرە و بو خزمەتا گشتی یە.</p>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-gold-500 font-bold text-xl">٠٢</span>
                  <p>هەمی ماف د پاراستینە بو گەشەپێدەرێ وێبسایتی (Birhat).</p>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-gold-500 font-bold text-xl">٠٣</span>
                  <p>نابیت ئەڤ وێبسایتە بو مەرەمێن نەدروست بهێتە بکارئینان.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="animate-fade-in w-full flex flex-col items-center">
            {/* Hero Text - Reduced size and padding for better mobile reachability */}
            <div className="text-center pt-8 pb-4 px-4 w-full">
               <h1 className="text-3xl md:text-6xl font-black mb-3 tracking-tight drop-shadow-2xl">
                 <span className="text-white">وەرگێرانا</span>{' '}
                 <span className="gold-gradient-text">بادینی</span>
               </h1>
               <p className="text-gray-400 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed opacity-80">
                 وەرگێرانەکا پرۆفێشنال و بلەز
               </p>
            </div>
            
            <TranslationBox />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col font-kurdish selection:bg-gold-500/30 overflow-x-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]"></div>
      </div>

      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      
      <Navbar onNavigate={setCurrentSection} currentSection={currentSection} />
      
      <main className="flex-grow w-full relative z-10">
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;