import React from 'react';
import { User, Sparkles } from 'lucide-react';

interface NameCardProps {
  name: string;
}

export const NameCard: React.FC<NameCardProps> = ({ name }) => {
  const displayText = name.trim() || "Your Name";

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative w-full max-w-md bg-slate-900 ring-1 ring-gray-900/5 rounded-xl leading-none flex items-top justify-start space-x-6 p-10 shadow-2xl">
        <div className="space-y-6 w-full text-center flex flex-col items-center">
          <div className="flex items-center justify-center p-4 bg-slate-800 rounded-full shadow-inner mb-4">
             {name.trim() ? <Sparkles className="w-8 h-8 text-yellow-400" /> : <User className="w-8 h-8 text-slate-400" />}
          </div>
          
          <div className="space-y-2">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
              Hello, I am
            </p>
            <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 pb-2 break-all">
              {displayText}
            </h1>
          </div>

          <div className="h-1 w-24 bg-slate-700 rounded-full mt-6"></div>
        </div>
      </div>
    </div>
  );
};