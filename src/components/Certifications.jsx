import React from 'react';
import { ShieldCheck, Award, Microscope, CheckCircle2, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/categories';

const iconMap = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#0E5284]" />,
  Award: <Award className="w-6 h-6 text-[#0F753A]" />,
  Microscope: <Microscope className="w-6 h-6 text-[#0E5284]" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-[#0F753A]" />,
};

const bgMap = {
  cyan: 'bg-[#E8F1F8] border-[#0E5284]/20',
  blue: 'bg-[#E8F1F8] border-[#0E5284]/20',
  violet: 'bg-[#E8F1F8] border-[#0E5284]/20',
  emerald: 'bg-[#E8F5EE] border-[#0F753A]/20',
};

export const Certifications = () => {
  return (
    <section id="certifications" className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] orb-blue opacity-40 pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full trust-badge text-[#0E5284] text-xs font-bold mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0F753A]" />
          UNCOMPROMISING REGULATORY INTEGRITY
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E5284] tracking-tight mb-4">
          International Quality Accreditations
        </h2>
        <p className="text-[#5A7A91] text-sm sm:text-base">
          Every Medisect Pharma batch undergoes extensive multi-tier quality validations in accordance with global pharmacopoeial standards (IP/BP/USP).
        </p>
        <div className="mt-4 w-16 mx-auto accent-line" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {CERTIFICATIONS.map((cert, i) => (
          <div key={i} className="rounded-3xl glass-card p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner ${bgMap[cert.color]}`}>
                  {iconMap[cert.icon]}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#E8F1F8] border border-[#0E5284]/20 text-[#0E5284]">
                  {cert.code}
                </span>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#0E5284] mb-2">{cert.title}</h3>
                <p className="text-xs text-[#5A7A91] leading-relaxed">{cert.desc}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#0E5284]/10 flex items-center gap-2 text-[11px] text-[#0F753A] font-mono font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Quality Audited</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom banner */}
      <div className="mt-10 p-6 rounded-3xl glass-panel-deep flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F1F8] border border-[#0E5284]/20 flex items-center justify-center text-[#0E5284] shrink-0">
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display text-sm sm:text-base font-bold text-[#0E5284]">
              Zero-Defect Analytical Testing & HPLC Verification
            </h4>
            <p className="text-xs text-[#5A7A91] mt-0.5">
              Assay quantification, dissolution kinetics, and microbial limit testing on 100% of finished batches.
            </p>
          </div>
        </div>
        <a href="#contact"
          className="btn-outline-blue px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer">
          Request Certificate of Analysis (COA)
        </a>
      </div>
    </section>
  );
};
