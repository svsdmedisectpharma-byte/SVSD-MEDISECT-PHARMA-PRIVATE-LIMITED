import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Award, Star, MessageCircle } from 'lucide-react';
import { COMPANY_STATS, WHATSAPP_PHONE_NUMBER } from '../data/categories';

export const Hero = () => {
  const trustBadges = [
    { icon: ShieldCheck, label: 'WHO-GMP Certified', color: '#0E5284' },
    { icon: Award, label: 'ISO 9001:2015', color: '#0F753A' },
    { icon: CheckCircle2, label: 'DCGI Approved', color: '#0E5284' },
    { icon: Star, label: 'GLP Tested Batches', color: '#0F753A' },
  ];

  return (
    <section className="relative min-h-[75vh] pt-12 sm:pt-16 pb-14 flex items-center justify-center overflow-hidden">

      {/* Animated Ambient Orbs */}
      <div className="absolute top-10 left-[15%] w-[500px] h-[500px] orb-blue animate-float-a pointer-events-none" />
      <div className="absolute top-1/2 right-[5%] w-[450px] h-[450px] orb-green animate-float-b pointer-events-none" />
      <div className="absolute bottom-0 left-[30%] w-[600px] h-[350px] orb-blue animate-float-c pointer-events-none opacity-60" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-soft pointer-events-none opacity-60" />

      {/* Floating credential cards */}
      <div className="absolute top-20 left-8 hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl trust-badge animate-float-a">
        <div className="w-9 h-9 rounded-xl bg-[#0E5284]/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#0E5284]" />
        </div>
        <div>
          <div className="text-xs font-bold text-[#0E5284]">WHO-GMP Certified</div>
          <div className="text-[10px] text-[#5A7A91] font-mono">Sterile Cleanroom Facility</div>
        </div>
      </div>

      <div className="absolute bottom-20 right-8 hidden xl:flex items-center gap-3 px-4 py-3 rounded-2xl trust-badge animate-float-b">
        <div className="w-9 h-9 rounded-xl bg-[#0F753A]/10 flex items-center justify-center">
          <Award className="w-5 h-5 text-[#0F753A]" />
        </div>
        <div>
          <div className="text-xs font-bold text-[#0F753A]">ISO 9001:2015</div>
          <div className="text-[10px] text-[#5A7A91] font-mono">Zero-Defect Quality Assurance</div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full trust-badge mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F753A] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F753A]" />
          </span>
          <span className="text-xs font-bold tracking-wide text-[#0E5284]">
            WHO-GMP & ISO 9001:2015 CERTIFIED PHARMACEUTICAL INNOVATIONS
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0E5284] leading-[1.1] mb-6">
          Advancing Healthcare,<br />
          <span className="bg-gradient-to-r from-[#0F753A] via-[#0E9A4E] to-[#0E5284] bg-clip-text text-transparent">
            Carefully.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#5A7A91] font-normal leading-relaxed mb-10">
          Medisect Pharma delivers precisely formulated, DCGI-approved medicines — Antibiotics, Gastrocare, Cardiology, Nutraceuticals, and Injectables — built for superior clinical outcomes and pan-India PCD distribution.
        </p>

        {/* Trust Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full trust-badge">
                <Icon className="w-4 h-4" style={{ color: badge.color }} />
                <span className="text-xs font-bold" style={{ color: badge.color }}>{badge.label}</span>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a href="#contact"
            className="btn-blue w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 group cursor-pointer">
            <span>Get Trade Quotation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Medisect Pharma Team, I am inquiring from your website.')}`} target="_blank" rel="noopener noreferrer"
            className="btn-outline-green w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer">
            <MessageCircle className="w-5 h-5 text-[#0F753A]" />
            <span>WhatsApp Connect</span>
          </a>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto glass-panel p-4 sm:p-6 rounded-3xl relative overflow-hidden">
          {/* Accent top line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] accent-line" />

          {COMPANY_STATS.map((stat, i) => (
            <div key={i}
              className={`flex flex-col items-center py-2 ${i < COMPANY_STATS.length - 1 ? 'border-r border-[#0E5284]/10' : ''}`}>
              <span className="font-display text-2xl sm:text-3xl font-extrabold bg-gradient-to-br from-[#0E5284] to-[#0F753A] bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-[#1E3A52] mt-1 text-center">{stat.label}</span>
              <span className="text-[10px] text-[#5A7A91] font-mono mt-0.5">{stat.sub}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


