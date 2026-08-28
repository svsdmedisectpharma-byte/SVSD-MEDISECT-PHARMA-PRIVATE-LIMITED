import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../data/categories';

export const Footer = () => {
  return (
    <footer className="relative pt-16 pb-10 border-t border-[#0E5284]/12 bg-white/55 backdrop-blur-xl overflow-hidden text-xs text-[#5A7A91]">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[200px] orb-blue opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] orb-green opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#0E5284]/10">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="MEDISECT PHARMA PVT LTD" 
                className="h-12 w-auto object-contain mix-blend-multiply"
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1 font-display text-xl font-extrabold">
                  <span className="text-[#0E5284]">MEDISECT</span>
                  <span className="text-[#0F753A]">PHARMA</span>
                </div>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[#5A7A91] uppercase">Pvt. Ltd.</span>
              </div>
            </div>
            <p className="text-[#5A7A91] leading-relaxed">
              A premier pharmaceutical manufacturer committed to delivering superior therapeutic outcomes through WHO-GMP certified, DCGI-approved formulations across India and global markets.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {['WHO-GMP', 'ISO 9001:2015', 'GLP Certified'].map(b => (
                <span key={b} className="px-2.5 py-1 rounded-full trust-badge text-[#0E5284] font-bold text-[10px] font-mono">{b}</span>
              ))}
            </div>
          </div>

          {/* Formulations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold text-[#0E5284] uppercase tracking-wider">Formulations</h4>
            <ul className="space-y-2">
              {['Tablets & Capsules', 'Antibiotics & Injectables', 'Syrups & Suspensions', 'Ointments & Topicals', 'Nutraceutical Range', 'Cardiology & Diabetology'].map(cat => (
                <li key={cat}>
                  <a href="#contact"
                    className="hover:text-[#0F753A] transition-colors flex items-center gap-1.5">
                    <span className="text-[#0F753A] font-bold">›</span>{cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold text-[#0E5284] uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {['PCD Franchise Model', 'Third-Party Manufacturing', 'WHO-GMP Quality', 'Sample Kit Request'].map(s => (
                <li key={s}><a href="#contact" className="hover:text-[#0F753A] transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Direct Support */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold text-[#0E5284] uppercase tracking-wider">Trade Desk Support</h4>
            <p className="leading-relaxed">Connect directly with our regulatory and sales desk for distribution terms, pricing, and product inquiries.</p>
            <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Medisect Pharma Team, I am reaching out for trade inquiry.')}`} target="_blank" rel="noopener noreferrer"
              className="btn-green w-full py-2.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer">
              <MessageCircle className="w-4 h-4 fill-current" />WhatsApp Trade Desk
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#E8F1F8]/60 border border-[#0E5284]/10 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0E5284]">
            <ShieldCheck className="w-4 h-4 text-[#0F753A]" />Statutory Medical & Regulatory Notice
          </div>
          <p className="text-[11px] text-[#5A7A91] leading-relaxed">
            Information on this website is for informational, trade, and educational purposes only and is intended for registered medical practitioners, licensed pharmacies, and distributors. Medicines must be taken strictly as prescribed by a qualified healthcare professional. Not intended for self-medication.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5A7A91] font-mono">
          <span>© {new Date().getFullYear()} MEDISECT PHARMA PVT. LTD. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Trade', 'Drug Safety & Vigilance'].map(l => (
              <a key={l} href="#" className="hover:text-[#0E5284] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};


