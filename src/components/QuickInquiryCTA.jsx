import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../data/categories';

export const QuickInquiryCTA = ({ medicines }) => {
  const [selectedMed, setSelectedMed] = useState(medicines[0]?.name || '');
  const [inquiryType, setInquiryType] = useState('Bulk Product Pricing');
  const [stateRegion, setStateRegion] = useState('');
  const [customNotes, setCustomNotes] = useState('');

  const handleLaunchWhatsApp = (e) => {
    e.preventDefault();
    const med = medicines.find(m => m.name === selectedMed);
    const text = `Hello Medisect Pharma Team,\n\nI am contacting you via the website inquiry portal.\n\n📋 *Inquiry Type:* ${inquiryType}\n💊 *Medicine:* ${selectedMed}${med ? ` (${med.composition})` : ''}\n📍 *Territory:* ${stateRegion || 'All India'}\n📝 *Notes:* ${customNotes || 'Please send price list and visual aids.'}\n\nThank you!`;
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const benefits = [
    'Instant PDF Visual Aids',
    'Monopoly Rights Check',
    'Zero-Delay Dispatch',
    'Competitive Net Pricing',
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl glass-panel-deep p-8 sm:p-12 overflow-hidden border border-[#0E5284]/15">
        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-[3px] accent-line rounded-b" />
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 orb-green opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 orb-blue opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full trust-badge text-[#0E5284] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#0F753A]" />
              INSTANT WHATSAPP DIRECT CONNECT
            </div>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0E5284] leading-tight">
              Instant Medicine Inquiry &<br />
              <span className="bg-gradient-to-r from-[#0F753A] to-[#0E5284] bg-clip-text text-transparent">
                Product Rate Quotation
              </span>
            </h3>
            <p className="text-sm text-[#5A7A91] leading-relaxed">
              Select a formulation below to generate a tailored WhatsApp inquiry with complete composition details. Our regulatory desk responds within 15 minutes.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#1E3A52] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0F753A] shrink-0" />{b}
                </div>
              ))}
            </div>
          </div>

          {/* Right – form */}
          <div className="lg:col-span-6">
            <form onSubmit={handleLaunchWhatsApp}
              className="p-6 rounded-2xl bg-white/65 border border-white/90 shadow-[0_4px_20px_rgba(14,82,132,0.08)] space-y-4">

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1.5">Select Formulation</label>
                <select value={selectedMed} onChange={e => setSelectedMed(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] focus:outline-none focus:border-[#0E5284]/50 cursor-pointer font-semibold">
                  {medicines.map(m => (
                    <option key={m.id} value={m.name}>{m.name} — {m.category} ({m.packaging})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1.5">Inquiry Intent</label>
                  <select value={inquiryType} onChange={e => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]/50 cursor-pointer">
                    <option>Bulk Product Pricing</option>
                    <option>Distribution & Trade Inquiry</option>
                    <option>Third-Party Manufacturing</option>
                    <option>Hospital Institutional Supply</option>
                    <option>Product Sample Kit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1.5">Territory / City</label>
                  <input type="text" placeholder="e.g. Mumbai, Delhi, Patna..."
                    value={stateRegion} onChange={e => setStateRegion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-xs text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1.5">Remarks</label>
                <input type="text" placeholder="e.g. Looking for 100+ boxes + visual aids..."
                  value={customNotes} onChange={e => setCustomNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-xs text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50" />
              </div>

              <button type="submit"
                className="btn-green w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
                <MessageCircle className="w-5 h-5 fill-current" />
                Launch WhatsApp Inquiry Now
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#5A7A91] font-mono">
                <Clock className="w-3.5 h-3.5 text-[#0E5284]" />
                Average Response: &lt; 15 mins (Mon – Sat)
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
