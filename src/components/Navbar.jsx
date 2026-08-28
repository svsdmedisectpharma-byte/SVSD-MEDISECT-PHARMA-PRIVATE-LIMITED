import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../data/categories';

export const Navbar = ({ onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [aboutOpen, setAboutOpen] = useState(false);

  const aboutLinks = [
    { label: 'Quality & GMP', href: '#certifications' },
    { label: 'R&D Innovation', href: '#rnd' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md py-2 shadow-[0_4px_20px_rgba(14,82,132,0.12)] border-b border-slate-200/80' : 'bg-white/80 backdrop-blur-sm py-2.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between flex-nowrap gap-4 min-h-[56px]">

        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none shrink-0 py-0.5">
          <img 
            src="/logo.jpg" 
            alt="MEDISECT PHARMA PVT LTD" 
            className="h-12 sm:h-14 md:h-16 max-h-[68px] w-auto min-h-[48px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform filter drop-shadow-xs"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-[#0E5284] text-xl md:text-2xl tracking-tight">MEDISECT</span>
              <span className="font-display font-bold text-[#0F753A] text-xl md:text-2xl tracking-tight">PHARMA</span>
            </div>
            <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#5A7A91] uppercase mt-0.5">Pvt. Ltd.</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex flex-row items-center flex-nowrap gap-1 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xs shrink-0">
          
          {/* About Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button 
              onClick={() => setAboutOpen(!aboutOpen)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1E3A52]/80 hover:text-[#0E5284] hover:bg-white/90 whitespace-nowrap transition-all duration-200 cursor-pointer"
            >
              <span>About</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180 text-[#0E5284]' : ''}`} />
            </button>

            {aboutOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 py-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl z-50 flex flex-col gap-0.5 animate-fade-in">
                {aboutLinks.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setAboutOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-[#1E3A52] hover:text-[#0E5284] hover:bg-[#0E5284]/8 transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#franchise"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1E3A52]/80 hover:text-[#0E5284] hover:bg-white/90 whitespace-nowrap transition-all duration-200">
            Partnerships
          </a>

          <a href="#contact"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#1E3A52]/80 hover:text-[#0E5284] hover:bg-white/90 whitespace-nowrap transition-all duration-200">
            Contact
          </a>
        </nav>

        {/* Direct Inquiry Button */}
        <div className="hidden md:flex flex-row items-center flex-nowrap gap-2.5 shrink-0">
          <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Medisect Pharma, I would like to inquire about your products.')}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-green flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer shrink-0">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Inquiry</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2 shrink-0">
          <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#0F753A]/10 border border-[#0F753A]/25 text-[#0F753A]">
            <MessageCircle className="w-5 h-5" />
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-white/60 border border-slate-200 text-[#0E5284]">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl space-y-4 animate-slide-up">
          <div className="flex flex-col gap-1">
            <div className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0E5284]/70">About Medisect</div>
            {aboutLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-[#1E3A52] hover:bg-[#0E5284]/10 hover:text-[#0E5284] transition-colors pl-6">
                • {l.label}
              </a>
            ))}
            <a href="#franchise" onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#1E3A52] hover:bg-[#0E5284]/10 hover:text-[#0E5284] transition-colors">
              Partnerships
            </a>
            <a href="#contact" onClick={() => setMobileOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-[#1E3A52] hover:bg-[#0E5284]/10 hover:text-[#0E5284] transition-colors">
              Contact
            </a>
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="btn-green w-full py-2.5 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />Direct Inquiry on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};


