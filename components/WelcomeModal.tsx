import React from 'react';
import { X, Sparkles } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in font-kurdish">
      <div className="glass-panel border border-gold-500/20 rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl shadow-gold-500/10 transform animate-scale-up">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-6 pt-2">
          <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto border border-gold-500/20 relative">
            <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full"></div>
            <Sparkles className="text-gold-500 w-10 h-10 relative z-10" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              بخێر هاتی بو <span className="text-gold-400">Badini Translate</span>
            </h2>
            <p className="text-gold-600 text-sm font-medium tracking-widest uppercase">Version 2.0</p>
          </div>
          
          <p className="text-gray-400 leading-relaxed font-light">
            نوکە تو دشێی بێ بەرامبەر و ب دیزاینەکێ نووی و پێشکەفتی وەرگێرانێ دناڤبەرا ٢٥٠+ زمانان دا بکەی.
          </p>

          <button
            onClick={onClose}
            className="w-full py-4 mt-2 bg-gradient-to-r from-gold-600 to-gold-400 hover:from-gold-500 hover:to-gold-300 text-black font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
          >
            دەستپێکە
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;