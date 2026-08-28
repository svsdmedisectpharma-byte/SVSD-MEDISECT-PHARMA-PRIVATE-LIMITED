import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

// Color accents map
const colorMap = {
  cyan: { bg: 'rgba(14,82,132,0.07)', border: 'rgba(14,82,132,0.2)', accent: '#0E5284', badge: '#E8F1F8', badgeText: '#0E5284' },
  blue: { bg: 'rgba(14,82,132,0.07)', border: 'rgba(14,82,132,0.2)', accent: '#0E5284', badge: '#E8F1F8', badgeText: '#0E5284' },
  violet: { bg: 'rgba(14,82,132,0.05)', border: 'rgba(14,82,132,0.15)', accent: '#0E5284', badge: '#E8F1F8', badgeText: '#0E5284' },
  emerald: { bg: 'rgba(15,117,58,0.06)', border: 'rgba(15,117,58,0.2)', accent: '#0F753A', badge: '#E8F5EE', badgeText: '#0F753A' },
  amber: { bg: 'rgba(15,117,58,0.05)', border: 'rgba(15,117,58,0.18)', accent: '#0F753A', badge: '#E8F5EE', badgeText: '#0F753A' },
};

const TabletIllustration = ({ accent }) => (
  <div className="w-full h-full flex items-center justify-center relative">
    {/* Blister pack grid */}
    <div className="absolute inset-4 rounded-xl border border-[#0E5284]/10 bg-white/40 grid grid-cols-3 gap-2 p-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-lg bg-white/60 border border-[#0E5284]/15 flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 rounded-full border-2 shadow-md" style={{ borderColor: accent, backgroundColor: accent + '22' }} />
        </div>
      ))}
    </div>
    {/* Foreground capsule */}
    <div className="relative z-10 flex items-center transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110">
      <div className="w-13 h-24 rounded-full border border-white/70 shadow-2xl overflow-hidden flex flex-col"
        style={{ width: 52, height: 90 }}>
        <div className="h-1/2 flex items-center justify-center" style={{ backgroundColor: accent }}>
          <span className="text-[9px] font-black tracking-widest text-white/90 uppercase">MED</span>
        </div>
        <div className="h-1/2 bg-white/90 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: accent }} />
        </div>
        {/* Light streak */}
        <div className="absolute top-0 left-2 w-1.5 h-full bg-gradient-to-b from-white/70 via-white/25 to-transparent rounded-full -skew-x-12 pointer-events-none" />
      </div>
    </div>
  </div>
);

const VialIllustration = ({ accent }) => (
  <div className="w-full h-full flex items-center justify-center gap-3">
    {/* Vial */}
    <div className="w-14 h-28 rounded-lg border border-[#0E5284]/20 bg-white/50 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-between p-1.5 shadow-xl group-hover:scale-105 transition-transform">
      <div className="w-8 h-4 rounded-t-sm bg-gradient-to-r from-slate-300 via-white to-slate-300 border-b border-slate-200 flex items-center justify-center">
        <div className="w-3 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <div className="w-5 h-2 bg-slate-200 rounded-sm" />
      <div className="w-full flex-1 rounded border border-[#0E5284]/10 relative p-1 flex flex-col justify-end bg-white/30">
        <div className="w-full h-3/5 rounded-b opacity-80" style={{ backgroundColor: accent + 'CC' }}>
          <div className="w-full h-1 bg-white/50 rounded-t" />
        </div>
        <div className="absolute top-1.5 inset-x-1 py-1 px-0.5 bg-white/90 rounded text-[7px] text-[#1E3A52] font-bold uppercase tracking-tight text-center">1000mg</div>
      </div>
    </div>
    {/* Syringe */}
    <div className="w-5 h-32 rounded-full border border-[#0E5284]/15 bg-white/50 p-0.5 flex flex-col items-center justify-between opacity-80">
      <div className="w-0.5 h-6 bg-slate-400" />
      <div className="w-4 h-16 rounded border border-[#0E5284]/15 bg-white/60 flex flex-col justify-end relative">
        <div className="w-full h-1/2 rounded-b" style={{ backgroundColor: accent + '44' }} />
        <div className="absolute inset-y-1 right-0.5 flex flex-col justify-between">
          {[...Array(4)].map((_, i) => <div key={i} className="w-1.5 h-[1px] bg-[#0E5284]/30" />)}
        </div>
      </div>
      <div className="w-3 h-4 bg-slate-400 rounded-sm" />
    </div>
  </div>
);

const SyrupIllustration = ({ accent }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-16 h-28 rounded-xl border border-[#0F753A]/20 bg-white/50 backdrop-blur-sm relative overflow-hidden flex flex-col items-center justify-between p-1.5 shadow-xl group-hover:scale-105 transition-transform">
      <div className="w-10 h-5 rounded-t-md bg-white/70 border border-[#0F753A]/20 flex items-center justify-center">
        <span className="text-[8px] text-[#0F753A] font-mono font-bold">10ml</span>
      </div>
      <div className="w-6 h-2" style={{ backgroundColor: accent + '66' }} />
      <div className="w-full flex-1 rounded-lg bg-white/40 border border-[#0F753A]/15 relative p-1 flex flex-col justify-end">
        <div className="w-full h-4/5 rounded-b-md relative overflow-hidden" style={{ backgroundColor: accent + 'BB' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-white/40" />
          <div className="absolute bottom-1 left-2 w-1.5 h-1.5 rounded-full bg-white/60 animate-ping" />
        </div>
        <div className="absolute top-2 inset-x-1 p-1 bg-white/90 rounded text-[7px] text-[#0E5284] font-bold text-center">100 ML</div>
      </div>
    </div>
  </div>
);

const TubeIllustration = ({ accent }) => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-12 h-32 transform -rotate-45 relative flex flex-col items-center group-hover:-rotate-30 group-hover:scale-105 transition-transform">
      <div className="w-6 h-5 rounded-t-sm border border-white/60 shadow-md flex items-center justify-center" style={{ backgroundColor: accent }}>
        <div className="w-3 h-1 bg-white/50 rounded" />
      </div>
      <div className="w-10 h-2 bg-slate-200 rounded-t-md" />
      <div className="w-12 h-20 rounded-b-md border border-[#0E5284]/15 bg-white/60 p-1 flex flex-col items-center justify-between shadow-xl relative">
        <div className="w-full h-1.5 rounded-full" style={{ background: `linear-gradient(90deg, ${accent} 0%, #0F753A 100%)` }} />
        <span className="text-[8px] font-bold uppercase tracking-wider transform -rotate-90" style={{ color: accent }}>TOPICAL</span>
        <div className="w-full h-2 bg-slate-100 border-t border-slate-200 rounded-b" />
      </div>
    </div>
  </div>
);

export const MedicineGraphic = ({ dosageForm, accentColor = 'blue', name, image }) => {
  const theme = colorMap[accentColor] || colorMap.blue;

  if (image) {
    return (
      <div className="w-full h-44 rounded-2xl relative overflow-hidden bg-white border border-slate-200 group">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 left-2.5 z-20">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F1F8] text-[#0E5284] border border-[#0E5284]/15 shadow-xs">
            {dosageForm}
          </span>
        </div>
      </div>
    );
  }

  const renderIllustration = () => {
    switch (dosageForm) {
      case 'Injection': return <VialIllustration accent={theme.accent} />;
      case 'Syrup / Suspension': return <SyrupIllustration accent={theme.accent} />;
      case 'Ointment / Cream': return <TubeIllustration accent={theme.accent} />;
      default: return <TabletIllustration accent={theme.accent} />;
    }
  };

  return (
    <div className="w-full h-44 rounded-2xl relative overflow-hidden p-3 flex flex-col justify-between group"
      style={{
        background: `linear-gradient(145deg, ${theme.bg}, rgba(255,255,255,0.4))`,
        border: `1px solid ${theme.border}`,
      }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-soft opacity-50 pointer-events-none" />

      {/* Top status bar */}
      <div className="relative z-20 flex items-center justify-between">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
          style={{ backgroundColor: theme.badge, color: theme.badgeText, border: `1px solid ${theme.border}` }}>
          {dosageForm}
        </span>
        <div className="flex items-center gap-1 text-[10px] text-[#5A7A91] bg-white/70 px-2 py-0.5 rounded-full border border-white/80 backdrop-blur-md">
          <ShieldCheck className="w-3 h-3 text-[#0F753A]" />
          <span>GMP</span>
        </div>
      </div>

      {/* Center illustration */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {renderIllustration()}
      </div>

      {/* Bottom label */}
      <div className="relative z-20 flex items-center justify-between text-[10px]">
        <span className="truncate max-w-[140px] text-[#1E3A52] font-semibold opacity-80">{name}</span>
        <div className="flex items-center gap-1" style={{ color: theme.accent }}>
          <Sparkles className="w-3 h-3" />
          <span className="font-semibold">Active Bio</span>
        </div>
      </div>
    </div>
  );
};
