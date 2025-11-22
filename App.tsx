import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ConsultationForm from './components/ConsultationForm';
import StrategyResult from './components/StrategyResult';
import { getStrategicAdvice, isConfigured } from './services/geminiService';
import { StrategyAdvice } from './types';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<StrategyAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState<boolean>(false);
  
  // To handle scroll on result
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check configuration on mount
    if (!isConfigured()) {
      setConfigError(true);
      setError("Configuration Error: 'VITE_API_KEY' is missing. If using Netlify, rename 'API_KEY' to 'VITE_API_KEY' in Site Settings AND trigger a 'Clear cache and deploy' to rebuild the site.");
    }
  }, []);

  const handleConsultation = async (query: string) => {
    if (configError) return;

    setLoading(true);
    setError(null);
    setAdvice(null);

    try {
      const result = await getStrategicAdvice(query);
      setAdvice(result);
      // Smooth scroll to result after a brief delay for rendering
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      
      // Determine a more user-friendly error message
      let errorMessage = "The strategist is silent. Please check your connection and try again.";
      
      // Check for common API Key issues
      if (err.message === "MISSING_API_KEY" || 
          (err.message && (
          err.message.includes("API Key") || 
          err.message.includes("400") || 
          err.message.includes("403")
        ))) {
        errorMessage = "Configuration Error: The Strategist cannot be reached. Please ensure your Netlify environment variable is named 'VITE_API_KEY' and you have triggered a rebuild.";
        setConfigError(true);
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAdvice(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 flex flex-col relative selection:bg-amber-900 selection:text-white">
      
      {/* Background Ambient Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-amber-900/10 blur-[100px]"></div>
         <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-stone-800/20 blur-[120px]"></div>
      </div>

      <Header />

      <main className="flex-grow flex flex-col items-center w-full relative z-10">
        
        {/* Config Error Banner */}
        {configError && (
           <div className="w-full max-w-2xl mt-6 px-4 animate-fade-in">
             <div className="bg-red-950/50 border border-red-800/50 text-red-200 p-4 rounded-lg flex items-start gap-3">
               <ShieldAlert className="w-6 h-6 flex-shrink-0 text-red-500" />
               <div>
                 <h3 className="font-bold text-red-400">System Malfunction</h3>
                 <p className="text-sm mt-1">{error}</p>
               </div>
             </div>
           </div>
        )}

        {/* Intro Text */}
        {!advice && !loading && !configError && (
          <div className="max-w-2xl mx-auto text-center px-6 mt-8 animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl text-amber-500/80 serif-title mb-4">
              Know the Enemy, Know Yourself
            </h2>
            <p className="text-stone-400 leading-relaxed">
              In business, life, and conflict, the principles of victory remain unchanged for thousands of years. 
              Describe your situation below, and receive counsel from the ancient Art of War.
            </p>
          </div>
        )}

        <ConsultationForm onSubmit={handleConsultation} isLoading={loading || configError} />

        {error && !configError && (
          <div className="mt-6 p-4 bg-amber-950/30 border border-amber-800/30 rounded-lg flex items-center gap-3 text-amber-200 max-w-lg animate-fade-in">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div ref={resultRef} className="w-full">
          {advice && (
            <StrategyResult advice={advice} onReset={handleReset} />
          )}
        </div>
      </main>

      <footer className="w-full py-6 text-center text-stone-600 text-xs uppercase tracking-widest border-t border-stone-900 relative z-10">
        <p>Inspired by Sun Tzu's Art of War</p>
      </footer>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;