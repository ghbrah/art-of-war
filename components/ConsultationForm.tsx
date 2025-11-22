import React, { useState } from 'react';
import { SendHorizontal, Loader2 } from 'lucide-react';

interface ConsultationFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4">
      <div className="bg-stone-900 border border-stone-700 rounded-lg shadow-2xl p-6 md:p-8 relative overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-700/50"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-700/50"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-700/50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-700/50"></div>

        <h2 className="text-xl text-stone-300 mb-4 serif-title text-center">
          Describe Your Conflict
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              className="w-full h-32 bg-stone-950 text-stone-200 border border-stone-800 rounded-md p-4 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-900 transition-all resize-none placeholder-stone-600"
              placeholder="e.g., My competitor is undercutting my prices, or I am facing a difficult negotiation with my landlord..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`w-full py-3 px-6 flex items-center justify-center gap-2 rounded bg-amber-700 hover:bg-amber-600 text-stone-100 font-semibold tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${isLoading ? 'animate-pulse' : ''}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Consulting the Strategist...</span>
              </>
            ) : (
              <>
                <SendHorizontal className="w-5 h-5" />
                <span>Seek Counsel</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationForm;
