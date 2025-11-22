import React from 'react';
import { Scroll, Wind } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center border-b border-stone-800 bg-stone-950/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3 mb-2">
        <Scroll className="w-8 h-8 text-amber-600" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-amber-500 serif-title">
          THE ART OF WAR
        </h1>
        <Wind className="w-8 h-8 text-amber-600" />
      </div>
      <p className="text-stone-400 text-sm tracking-widest uppercase mt-2">
        Strategic Counsel for Modern Conflict
      </p>
    </header>
  );
};

export default Header;
