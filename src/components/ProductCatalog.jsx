import React, { useState, useMemo } from 'react';
import {
  Search, Sparkles, LayoutGrid, List, Pill, FlaskConical, Syringe,
  Droplets, ShieldAlert, Zap, RotateCcw, ChevronDown, Download
} from 'lucide-react';
import { MedicineCard } from './MedicineCard';
import { CATEGORIES, THERAPEUTIC_AREAS, WHATSAPP_PHONE_NUMBER, CATALOG_DOWNLOAD_URL } from '../data/categories';

const getCategoryIcon = (name) => {
  switch (name) {
    case 'Sparkles': return <Sparkles className="w-3.5 h-3.5" />;
    case 'Pill': return <Pill className="w-3.5 h-3.5" />;
    case 'ShieldAlert': return <ShieldAlert className="w-3.5 h-3.5" />;
    case 'FlaskConical': return <FlaskConical className="w-3.5 h-3.5" />;
    case 'Syringe': return <Syringe className="w-3.5 h-3.5" />;
    case 'Droplets': return <Droplets className="w-3.5 h-3.5" />;
    case 'Zap': return <Zap className="w-3.5 h-3.5" />;
    default: return <Pill className="w-3.5 h-3.5" />;
  }
};

export const ProductCatalog = ({ medicines, activeCategory, setActiveCategory, searchQuery, setSearchQuery, onOpenModal }) => {
  const [selectedTherapeutic, setSelectedTherapeutic] = useState('All Therapeutic Areas');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = useMemo(() => {
    return medicines.filter(med => {
      const matchCat = activeCategory === 'all' || med.category.toLowerCase() === activeCategory.toLowerCase();
      const matchTherapy = selectedTherapeutic === 'All Therapeutic Areas' || med.therapeutic_area.toLowerCase() === selectedTherapeutic.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || [med.name, med.generic_name, med.composition, med.packaging, med.category, ...(med.indications || [])].some(s => s.toLowerCase().includes(q));
      return matchCat && matchTherapy && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [medicines, activeCategory, selectedTherapeutic, searchQuery, sortBy]);

  const resetFilters = () => { setActiveCategory('all'); setSelectedTherapeutic('All Therapeutic Areas'); setSearchQuery(''); setSortBy('featured'); };

  return (
    <section id="catalog" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">

      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 orb-blue opacity-70 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 orb-green opacity-60 pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full trust-badge text-[#0E5284] text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#0F753A]" />
          COMPLETE PHARMACEUTICAL PORTFOLIO
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-[#0E5284] tracking-tight mb-4">
          Explore Our Medicine Catalog
        </h2>
        <p className="text-[#5A7A91] text-sm sm:text-base">
          Browse DCGI-approved formulations crafted under WHO-GMP compliance. Filter by dosage form, therapeutic area, or search by molecular active ingredient.
        </p>
        <div className="pt-4 flex justify-center">
          <a href={https://docs.google.com/presentation/d/1OOSgsHhonRYoL1x6CTUn2GSxPMgTLZ7K/edit?usp=sharing&ouid=101517278743260727228&rtpof=true&sd=true} target="_blank" rel="noopener noreferrer",
            className="btn-outline-blue px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer">}
          <Download className="w-4 h-4 text-[#0F753A]" />
          <span>Download Official Product Catalog & Visual Aid</span>
        </a>
      </div>
      <div className="mt-4 w-16 mx-auto accent-line" />
    </div>

      {/* Control Deck */ }
  <div className="p-4 sm:p-6 rounded-3xl glass-panel-deep mb-10 space-y-5 relative z-10">

    {/* Top Row */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

      {/* Search */}
      <div className="md:col-span-6 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0E5284]/50" />
        <input
          type="text"
          placeholder="Search brand name, molecule, composition, or indication..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white/70 border border-[#0E5284]/15 text-sm text-[#1E3A52] placeholder-[#5A7A91]/60 focus:outline-none focus:border-[#0E5284]/50 focus:bg-white/95 focus:shadow-[0_0_0_3px_rgba(14,82,132,0.1)] transition-all"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0E5284]/10 hover:bg-[#0E5284]/20 text-[#0E5284] flex items-center justify-center text-xs">✕</button>
        )}
      </div>

      {/* Therapeutic Select */}
      <div className="md:col-span-4 relative">
        <select value={selectedTherapeutic} onChange={e => setSelectedTherapeutic(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-white/70 border border-[#0E5284]/15 text-sm text-[#1E3A52] focus:outline-none focus:border-[#0E5284]/40 cursor-pointer appearance-none">
          {THERAPEUTIC_AREAS.map(area => (
            <option key={area} value={area} className="bg-white text-[#1E3A52]">{area}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A7A91] pointer-events-none" />
      </div>

      {/* Controls */}
      <div className="md:col-span-2 flex items-center justify-end gap-2">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="px-3 py-3 rounded-2xl bg-white/70 border border-[#0E5284]/15 text-xs text-[#1E3A52] focus:outline-none cursor-pointer">
          <option value="featured">Featured</option>
          <option value="name-asc">A → Z</option>
          <option value="name-desc">Z → A</option>
        </select>
        <div className="flex items-center p-1 rounded-2xl bg-white/70 border border-[#0E5284]/15 gap-1">
          <button onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-[#0E5284] text-white shadow-sm' : 'text-[#5A7A91] hover:text-[#0E5284]'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-[#0E5284] text-white shadow-sm' : 'text-[#5A7A91] hover:text-[#0E5284]'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Category Pills */}
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#0E5284]/10">
      {CATEGORIES.map(cat => {
        const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
        return (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-250 ${isActive ? 'glass-pill-active' : 'glass-pill'}`}>
            <span>{getCategoryIcon(cat.icon)}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  </div>

  {/* Filter chips / counter */ }
  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1 text-xs">
    <div className="flex flex-wrap items-center gap-2 text-[#5A7A91]">
      <span>Showing <strong className="text-[#0E5284] font-mono">{filtered.length}</strong> formulations</span>
      {activeCategory !== 'all' && (
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1F8] border border-[#0E5284]/20 text-[#0E5284] font-semibold flex items-center gap-1">
          {activeCategory}
          <button onClick={() => setActiveCategory('all')} className="hover:text-[#0F753A]">✕</button>
        </span>
      )}
      {selectedTherapeutic !== 'All Therapeutic Areas' && (
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5EE] border border-[#0F753A]/20 text-[#0F753A] font-semibold flex items-center gap-1">
          {selectedTherapeutic}
          <button onClick={() => setSelectedTherapeutic('All Therapeutic Areas')} className="hover:text-[#0E5284]">✕</button>
        </span>
      )}
      {searchQuery && (
        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F1F8] border border-[#0E5284]/20 text-[#0E5284] flex items-center gap-1">
          "{searchQuery}"
          <button onClick={() => setSearchQuery('')} className="hover:text-[#0F753A]">✕</button>
        </span>
      )}
    </div>
    {(activeCategory !== 'all' || selectedTherapeutic !== 'All Therapeutic Areas' || searchQuery) && (
      <button onClick={resetFilters}
        className="flex items-center gap-1 text-[#5A7A91] hover:text-[#0E5284] transition-colors cursor-pointer">
        <RotateCcw className="w-3.5 h-3.5" /><span>Reset all</span>
      </button>
    )}
  </div>

  {/* Products */ }
  {
    filtered.length > 0 ? (
      viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(med => <MedicineCard key={med.id} medicine={med} onOpenModal={onOpenModal} />)}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(med => (
            <div key={med.id}
              className="rounded-2xl glass-card p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F1F8] text-[#0E5284] border border-[#0E5284]/15">{med.category}</span>
                  <span className="text-[10px] font-mono bg-white/80 text-[#5A7A91] px-2 py-0.5 rounded border border-[#0E5284]/10">{med.packaging}</span>
                </div>
                <h3 onClick={() => onOpenModal(med)}
                  className="text-lg font-bold text-[#0E5284] hover:text-[#0F753A] cursor-pointer transition-colors">{med.name}</h3>
                <p className="text-xs text-[#5A7A91] italic">{med.generic_name}</p>
                <p className="text-xs text-[#1E3A52] max-w-2xl line-clamp-1">{med.composition}</p>
              </div>
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <button onClick={() => onOpenModal(med)}
                  className="btn-outline-blue flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                  View Details
                </button>
                <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(`Hello Medisect Pharma, I am inquiring about ${med.name}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-green flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-center cursor-pointer">
                  WhatsApp Inquire
                </a>
              </div>
            </div>
          ))}
        </div>
      )
    ) : (
      <div className="p-12 text-center rounded-3xl glass-panel-deep max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#E8F1F8] border border-[#0E5284]/20 text-[#0E5284] mx-auto flex items-center justify-center">
          <Pill className="w-8 h-8 opacity-50" />
        </div>
        <h3 className="font-display text-lg font-bold text-[#0E5284]">No Matching Formulations Found</h3>
        <p className="text-xs text-[#5A7A91]">Try adjusting your search query or clearing category filters.</p>
        <button onClick={resetFilters}
          className="btn-blue px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer">Reset Filters</button>
      </div>
    )
  }
    </section >
  );
};
