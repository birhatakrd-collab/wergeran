import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="relative group">
      <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg shadow-gold-500/20 transform transition-transform group-hover:scale-105">
        <span className="text-dark-900 font-bold text-3xl font-serif">B</span>
      </div>
      <div className="absolute -inset-1 bg-gold-400 opacity-20 blur-lg rounded-full group-hover:opacity-40 transition-opacity"></div>
    </div>
  );
};

export default Logo;
