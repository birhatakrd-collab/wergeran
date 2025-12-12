import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'سەرەکی' },
    { id: 'about', label: 'دەربارەی من' },
    { id: 'services', label: 'خزمەتگوزاری' },
    { id: 'terms', label: 'مەرج' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-4 z-40 px-4 w-full max-w-5xl mx-auto">
      <div className="glass-panel rounded-full px-4 sm:px-6 py-3 shadow-2xl shadow-black/50 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
          <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all">
             <span className="text-black font-bold text-xl">B</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white tracking-wide">Badini<span className="text-gold-400">Translate</span></h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                currentSection === item.id 
                  ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 glass-panel rounded-3xl p-4 md:hidden animate-fade-in origin-top">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-right px-4 py-3 rounded-xl transition-all font-medium ${
                   currentSection === item.id 
                    ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;