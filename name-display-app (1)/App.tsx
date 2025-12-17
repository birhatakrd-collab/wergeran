import React, { useState } from 'react';
import { NameCard } from './components/NameCard';
import { PenTool } from 'lucide-react';

const App: React.FC = () => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-purple-500 selection:text-white">
      
      {/* Header Section */}
      <div className="mb-12 text-center space-y-2">
        <h2 className="text-slate-200 text-3xl font-bold tracking-tight">Name Generator</h2>
        <p className="text-slate-500">Type below to see your name card.</p>
      </div>

      {/* Main Card Display */}
      <div className="mb-12">
        <NameCard name={name} />
      </div>

      {/* Input Section */}
      <div className="w-full max-w-md relative">
        <label htmlFor="name-input" className="sr-only">Enter your name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PenTool className="h-5 w-5 text-slate-500" />
          </div>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name here..."
            className="block w-full pl-10 pr-4 py-4 border-2 border-slate-800 rounded-xl bg-slate-900 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-300 shadow-lg text-lg"
            autoComplete="off"
          />
        </div>
        <div className="mt-4 text-center">
            <p className="text-xs text-slate-600">
                Created with React & Tailwind CSS
            </p>
        </div>
      </div>

    </div>
  );
};

export default App;