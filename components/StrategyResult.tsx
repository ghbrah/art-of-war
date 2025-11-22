import React from 'react';
import { StrategyAdvice } from '../types';
import { Quote, ShieldCheck, Feather } from 'lucide-react';

interface StrategyResultProps {
  advice: StrategyAdvice;
  onReset: () => void;
}

const StrategyResult: React.FC<StrategyResultProps> = ({ advice, onReset }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4 pb-20 animate-fade-in">
      <div className="bg-[#e7e5e4] text-stone-900 rounded-lg shadow-2xl overflow-hidden relative">
        
        {/* Paper Texture Overlay effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/aged-paper.png")` }}>
        </div>

        {/* Top Banner */}
        <div className="bg-stone-800 text-amber-500 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold serif-title uppercase tracking-wider">
              {advice.title}
            </h2>
            <div className="h-1 w-12 bg-amber-600 mt-2"></div>
          </div>
          {advice.chineseCharacter && (
            <div className="text-5xl text-stone-600/50 chinese-char font-bold select-none">
              {advice.chineseCharacter}
            </div>
          )}
        </div>

        <div className="p-8 space-y-8">
          
          {/* The Quote */}
          <div className="relative pl-8 border-l-4 border-amber-700/30 italic">
             <Quote className="absolute -left-3 -top-3 w-6 h-6 text-amber-700 fill-current bg-[#e7e5e4] p-1 rounded-full" />
            <p className="text-xl font-serif text-stone-800 leading-relaxed">
              "{advice.originalQuote}"
            </p>
            <p className="text-right text-sm text-stone-500 mt-2 font-semibold uppercase tracking-widest">
              — Sun Tzu
            </p>
          </div>

          <hr className="border-stone-300" />

          {/* Interpretation */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-stone-800 uppercase tracking-wide mb-3">
              <Feather className="w-5 h-5 text-amber-700" />
              Strategic Insight
            </h3>
            <p className="text-stone-700 leading-7">
              {advice.interpretation}
            </p>
          </div>

          {/* Actionable Advice */}
          <div className="bg-stone-200/50 rounded p-6 border border-stone-300">
            <h3 className="flex items-center gap-2 text-lg font-bold text-stone-800 uppercase tracking-wide mb-4">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              Orders of Battle
            </h3>
            <ul className="space-y-3">
              {advice.actionableAdvice.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-stone-800 text-amber-500 text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-stone-800">{step}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-stone-100 p-4 flex justify-center border-t border-stone-300">
          <button 
            onClick={onReset}
            className="text-stone-500 hover:text-stone-800 text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            Consult Another Matter
          </button>
        </div>
      </div>
    </div>
  );
};

export default StrategyResult;
