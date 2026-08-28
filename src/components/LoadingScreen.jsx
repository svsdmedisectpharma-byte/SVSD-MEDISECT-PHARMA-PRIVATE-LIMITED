import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, CheckCircle2, FlaskConical } from 'lucide-react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Medisect Platform...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'Loading WHO-GMP Certified Formulations...' },
      { at: 45, text: 'Verifying DCGI Compliance & Active Molecules...' },
      { at: 75, text: 'Preparing Quality & Trade Information...' },
      { at: 95, text: 'Readying Medisect Pharma Platform...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        
        // Update status text based on progress
        const currentStatus = statuses.find(s => next >= s.at && prev < s.at);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC] transition-opacity duration-500 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 orb-blue opacity-50 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-80 h-80 orb-green opacity-40 animate-pulse pointer-events-none" />

      {/* Main loading content box */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        
        {/* Brand Logo Container with pulse ring */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#0E5284]/20 to-[#0F753A]/20 blur-xl animate-pulse" />
          <div className="relative p-4 rounded-3xl bg-white/90 backdrop-blur-md border border-white shadow-xl flex items-center justify-center">
            <img 
              src="/logo.jpg" 
              alt="MEDISECT PHARMA" 
              className="h-24 sm:h-28 w-auto object-contain mix-blend-multiply drop-shadow-md"
            />
          </div>
        </div>

        {/* Company Title */}
        <div className="space-y-1 mb-8">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-display font-black text-2xl sm:text-3xl text-[#0E5284] tracking-tight">MEDISECT</span>
            <span className="font-display font-bold text-2xl sm:text-3xl text-[#0F753A] tracking-tight">PHARMA</span>
          </div>
          <p className="text-[11px] font-bold tracking-[0.25em] text-[#5A7A91] uppercase">Pvt. Ltd. • Quality & Excellence</p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full space-y-3">
          <div className="w-full h-3 rounded-full bg-slate-200/80 p-0.5 overflow-hidden border border-slate-300/60 shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#0E5284] via-[#1A6BA8] to-[#0F753A] transition-all duration-150 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-[#5A7A91]">
            <span className="flex items-center gap-1 text-[#0E5284]">
              <FlaskConical className="w-3.5 h-3.5 text-[#0F753A] animate-spin" style={{ animationDuration: '3s' }} />
              {statusText}
            </span>
            <span className="font-mono font-bold text-[#0E5284]">{progress}%</span>
          </div>
        </div>

        {/* Footer Badges */}
        <div className="mt-12 flex items-center gap-3 text-[10px] font-bold text-[#5A7A91] uppercase tracking-wider">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <ShieldCheck className="w-3 h-3 text-[#0F753A]" /> WHO-GMP
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-[#0E5284]" /> DCGI Approved
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#0F753A]" /> GLP Certified
          </span>
        </div>

      </div>
    </div>
  );
};
