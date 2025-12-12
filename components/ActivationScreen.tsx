import React, { useState } from 'react';
import { Lock, ShieldCheck, Hammer } from 'lucide-react';

interface ActivationScreenProps {
  onActivate: () => void;
}

const ActivationScreen: React.FC<ActivationScreenProps> = ({ onActivate }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_CODE = '143915';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === CORRECT_CODE) {
      onActivate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); // Shake animation reset
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 font-kurdish">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-600/20 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md bg-dark-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl shadow-gold-500/10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-dark-800 rounded-full flex items-center justify-center border-2 border-gold-500/30 shadow-lg shadow-gold-500/20 animate-pulse">
            <Hammer className="text-gold-500 w-10 h-10" />
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-center text-white mb-4 leading-relaxed">
          چاڤەری بن تیمێ مە کار لسەر وێبسایتی دکەن ل دەمەک نێزیک دێ کەفتە کاری
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کودێ ئەکتیفکرنێ بنڤیسە"
              className={`w-full bg-dark-800 text-white text-center text-lg md:text-2xl tracking-[0.5em] font-bold py-4 rounded-xl border-2 focus:outline-none transition-all ${
                error 
                  ? 'border-red-500 animate-pulse text-red-500' 
                  : 'border-gray-700 focus:border-gold-500'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-dark-900 font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>تێچوون</span>
            <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
           <p className="text-xs md:text-sm text-gray-400 leading-relaxed bg-dark-800/50 p-3 rounded-lg border border-gray-700/50">
             <span className="text-gold-500 font-bold">تێبینی:</span> وێبسایت بێ بەرامبەرە ژبەر کارپێکرنێ ئەڤ تیمێ مە کود چالاک کریە
           </p>
        </div>
      </div>
    </div>
  );
};

export default ActivationScreen;