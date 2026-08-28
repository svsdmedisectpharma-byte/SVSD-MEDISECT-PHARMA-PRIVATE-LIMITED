import React from 'react';
import { Eye, Package, MessageCircle, CheckCircle2, Sparkles, ExternalLink, ShoppingCart } from 'lucide-react';
import { MedicineGraphic } from './MedicineGraphic';
import { generateWhatsAppLink } from '../data/categories';

export const MedicineCard = ({ medicine, onOpenModal }) => {
  const whatsAppUrl = generateWhatsAppLink(medicine.name, medicine.composition, medicine.packaging);

  return (
    <div className="group relative rounded-3xl glass-card flex flex-col p-4 sm:p-5 transition-all duration-300 hover:-translate-y-2.5 hover:shadow-[0_20px_40px_rgba(14,82,132,0.2)] hover:border-[#0E5284]/35">

      {/* Top accent line shows on hover */}
      <div className="absolute top-0 inset-x-8 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity accent-line" />

      {/* Category + Badge row */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F1F8] text-[#0E5284] border border-[#0E5284]/15">
          {medicine.category}
        </span>
        {medicine.in_stock === false ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-300/60 px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        ) : medicine.badge && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[#0F753A] bg-[#E8F5EE] border border-[#0F753A]/20 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />{medicine.badge}
          </span>
        )}
      </div>

      {/* Product Image Frame */}
      <div className="relative cursor-pointer mb-4 rounded-2xl overflow-hidden group-hover:shadow-[0_8px_20px_rgba(14,82,132,0.1)]"
        onClick={() => onOpenModal(medicine)}>
        <MedicineGraphic dosageForm={medicine.dosage_form} accentColor={medicine.accent_color} name={medicine.name} image={medicine.image} />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all flex items-center justify-center rounded-2xl">
          <span className="px-3.5 py-1.5 rounded-full bg-[#0E5284] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> View Full Details
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 space-y-2.5 cursor-pointer" onClick={() => onOpenModal(medicine)}>
        <div>
          <h3 className="font-display font-bold text-lg text-[#0E5284] group-hover:text-[#0F753A] transition-colors leading-tight">
            {medicine.name}
          </h3>
          <p className="text-xs text-[#5A7A91] italic line-clamp-1">{medicine.generic_name}</p>
        </div>

        {/* Composition box */}
        <div className="comp-box p-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#0E5284] flex items-center gap-1 mb-1">
            <Sparkles className="w-3 h-3 text-[#0F753A]" />
            <span className="font-bold">Active Composition</span>
          </div>
          <p className="text-xs text-[#1E3A52] line-clamp-2 leading-relaxed">{medicine.composition}</p>
        </div>

        {/* Packaging */}
        <div className="flex items-center justify-between text-xs text-[#5A7A91]">
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-[#0E5284]" />
            <span className="font-semibold text-[#1E3A52]">{medicine.packaging}</span>
          </div>
          <span className="text-[10px] font-mono bg-white/80 text-[#5A7A91] px-2 py-0.5 rounded-lg border border-[#0E5284]/10">
            {medicine.therapeutic_area}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-[#0E5284]/10 space-y-2">
        {medicine.buy_url && (
          <a
            href={medicine.buy_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#0E5284] to-[#1A6BA8] hover:from-[#0A4270] hover:to-[#0E5284] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
            <span>Buy Online (1MG / Store)</span>
            <ExternalLink className="w-3 h-3 opacity-80 ml-auto" />
          </a>
        )}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => onOpenModal(medicine)}
            className="btn-outline-blue w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
          <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer"
            className="btn-green w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer">
            <MessageCircle className="w-3.5 h-3.5" /> Inquire
          </a>
        </div>
      </div>
    </div>
  );
};
