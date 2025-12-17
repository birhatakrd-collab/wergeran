import React, { Fragment, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, Search } from 'lucide-react';
import { Language } from '../types.ts';
import { LANGUAGES } from '../constants.tsx';

// --- Types ---
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

interface LanguageSelectorProps {
    selected: string;
    onChange: (code: string) => void;
    label: string;
}

// --- Modal Component ---
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-dark-900 border border-gold-500/30 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.15)] overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gold-500/5">
                            <h2 className="text-xl font-bold text-gold-400 font-sans">{title}</h2>
                            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 text-gray-200 leading-relaxed font-sans text-lg">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- Language Selector Component ---
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    const selectedLang = LANGUAGES.find(l => l.code === selected) || LANGUAGES[0];

    const filteredLanguages = LANGUAGES.filter(l => 
        l.name.includes(searchTerm) || l.code.includes(searchTerm)
    );

    // Close dropdown on outside click (simplified for this example)
    useEffect(() => {
        const handleClick = () => setIsOpen(false);
        if(isOpen) window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [isOpen]);

    return (
        <div className="relative w-full md:w-1/3" onClick={e => e.stopPropagation()}>
            <label className="block text-xs text-gold-500/80 mb-1 font-sans font-bold px-2">{label}</label>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-dark-950 border border-white/10 hover:border-gold-500/50 text-white rounded-xl px-4 py-3 transition-all duration-300 shadow-sm group"
            >
                <span className="flex items-center gap-3 text-lg">
                    <span className="text-2xl">{selectedLang.flag}</span>
                    <span className="font-sans font-medium">{selectedLang.name}</span>
                </span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 group-hover:text-gold-400 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-dark-900 border border-gold-500/20 rounded-xl shadow-2xl z-40 max-h-80 flex flex-col overflow-hidden"
                    >
                        <div className="p-2 border-b border-white/10 bg-dark-950/50 sticky top-0">
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="گەریان..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-dark-950 text-white text-sm rounded-lg pl-3 pr-10 py-2 border border-white/5 focus:border-gold-500/50 focus:outline-none placeholder-gray-600 text-right"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-1 scrollbar-thin">
                            {filteredLanguages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        onChange(lang.code);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-right transition-colors font-sans mb-1
                                        ${selected === lang.code ? 'bg-gold-500/20 text-gold-400' : 'text-gray-300 hover:bg-white/5'}
                                    `}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-xl">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </span>
                                    {selected === lang.code && <Check size={16} />}
                                </button>
                            ))}
                            {filteredLanguages.length === 0 && (
                                <div className="p-4 text-center text-gray-500 text-sm font-sans">
                                    چ زمان نەهاتنە دیتن
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};