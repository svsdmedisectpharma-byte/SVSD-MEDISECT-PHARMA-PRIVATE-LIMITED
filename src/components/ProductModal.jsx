import React, { useEffect } from 'react';
import { X, MessageCircle, ShieldCheck, Package, Sparkles, CheckCircle2, Thermometer, Award, ShoppingCart, ExternalLink } from 'lucide-react';
import { MedicineGraphic } from './MedicineGraphic';
import { generateWhatsAppLink } from '../data/categories';

export const ProductModal = ({ medicine, onClose }) => {
  useEffect(() => {
    if (medicine) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [medicine]);

  if (!medicine) return null;

  const whatsAppUrl = generateWhatsAppLink(medicine.name, medicine.composition, medicine.packaging);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">

      {/* Backdrop */}
      <div onClick={onClose}
        className="fixed inset-0 bg-[#0E5284]/20 backdrop-blur-lg transition-opacity animate-fade-in" />

      {/* Modal Window */}
      <div className="relative z-10 w-full max-w-3xl rounded-3xl glass-modal p-6 sm:p-8 overflow-hidden animate-scale-in max-h-[90vh] flex flex-col my-auto">

        {/* Subtle background orbs inside modal */}
        <div className="absolute -top-20 -right-20 w-64 h-64 orb-blue opacity-40 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 orb-green opacity-30 pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] accent-line rounded-b" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#0E5284]/12 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F1F8] text-[#0E5284] border border-[#0E5284]/20">
              {medicine.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-[#5A7A91] border border-[#0E5284]/10">
              {medicine.dosage_form}
            </span>
            {medicine.prescription_required && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#0E5284] bg-[#E8F1F8] border border-[#0E5284]/20">
                Rx Only
              </span>
            )}
          </div>
          <button onClick={onClose}
            className="p-2 rounded-full bg-white/70 hover:bg-white border border-[#0E5284]/15 text-[#5A7A91] hover:text-[#0E5284] transition-all cursor-pointer shadow-sm">
            <X className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-5 space-y-6 flex-1 relative z-10 pr-1">

          {/* Main two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

            {/* Graphic Column */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-white/90 bg-white/40 p-2 shadow-inner">
              <MedicineGraphic dosageForm={medicine.dosage_form} accentColor={medicine.accent_color}
                name={medicine.name} category={medicine.category} image={medicine.image} />
              <div className="mt-3 p-3 rounded-xl bg-white/60 border border-[#0E5284]/10 text-center">
                <div className="text-[11px] text-[#5A7A91] font-mono">Standard Packaging</div>
                <div className="text-xs font-bold text-[#0E5284] mt-0.5">{medicine.packaging}</div>
              </div>
            </div>

            {/* Details Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0E5284] leading-tight">
                  {medicine.name}
                </h2>
                <p className="text-xs font-medium text-[#5A7A91] italic mt-0.5">{medicine.generic_name}</p>
              </div>

              {/* Composition Box */}
              <div className="comp-box p-3 sm:p-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#0E5284] flex items-center gap-1.5 mb-1.5 font-bold">
                  <Sparkles className="w-4 h-4 text-[#0F753A]" />
                  Active Molecular Composition
                </div>
                <p className="text-xs sm:text-sm text-[#1E3A52] leading-relaxed font-semibold">
                  {medicine.composition}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/60 border border-[#0E5284]/10">
                  <span className="text-[10px] text-[#5A7A91] block uppercase font-bold">Therapeutic Area</span>
                  <span className="font-semibold text-[#0E5284]">{medicine.therapeutic_area}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/60 border border-[#0E5284]/10">
                  <span className="text-[10px] text-[#5A7A91] block uppercase font-bold">Quality Standard</span>
                  <span className="font-semibold text-[#0F753A] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {medicine.badge || 'WHO-GMP Certified'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5A7A91] leading-relaxed">
                {medicine.description}
              </p>
            </div>
          </div>

          {/* Clinical Indications */}
          {medicine.indications && medicine.indications.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#5A7A91] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0F753A]" />
                Primary Clinical Indications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {medicine.indications.map((ind, i) => (
                  <div key={i}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-white/60 border border-[#0E5284]/10 text-xs text-[#1E3A52]">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#0F753A', boxShadow: '0 0 6px rgba(15,117,58,0.5)' }} />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Storage */}
          {medicine.storage && (
            <div className="p-3.5 rounded-2xl bg-[#E8F1F8] border border-[#0E5284]/15 flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-[#0E5284] shrink-0" />
              <div className="text-xs text-[#5A7A91]">
                <span className="font-bold text-[#0E5284] block">Storage & Preservation</span>
                {medicine.storage}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#0E5284]/12 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
          <span className="text-xs text-[#5A7A91]">For PCD Franchise, Samples & Bulk Inquiries</span>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#5A7A91] bg-white/70 hover:bg-white border border-[#0E5284]/15 cursor-pointer transition-colors">
              Close
            </button>

            {medicine.buy_url && (
              <a href={medicine.buy_url} target="_blank" rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0E5284] text-white hover:bg-[#0A4270] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm">
                <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
                <span>Buy Online (1MG / Pharmacy)</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            )}

            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer"
              className="btn-green flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
              <MessageCircle className="w-4 h-4 fill-current" />
              Inquire on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
