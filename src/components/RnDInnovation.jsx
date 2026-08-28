import React from 'react';
import { Building2, Truck, FlaskConical, Boxes } from 'lucide-react';

const features = [
  {
    title: 'Third-Party Contract Manufacturing',
    desc: 'High-speed automated blister, alu-alu, liquid filling, and sterile vial lines capable of fulfilling massive commercial volume orders.',
    icon: Building2, badge: 'High Capacity', iconBg: 'bg-[#E8F5EE] border-[#0F753A]/20', iconColor: '#0F753A'
  },
  {
    title: 'Cold-Chain & Real-Time Logistics',
    desc: 'Temperature-controlled pharmaceutical logistics maintaining 2°C–8°C for sensitive biologicals, injectables, and enzyme-based formulations.',
    icon: Truck, badge: '2°C–8°C Cold Chain', iconBg: 'bg-[#E8F1F8] border-[#0E5284]/20', iconColor: '#0E5284'
  },
  {
    title: 'Advanced R&D Formulation Lab',
    desc: 'Specialized formulation scientists developing enhanced bioavailability, sustained-release pellets, and fast-melt matrices for next-gen drugs.',
    icon: FlaskConical, badge: 'High Bioavailability', iconBg: 'bg-[#E8F5EE] border-[#0F753A]/20', iconColor: '#0F753A'
  },
];

export const RnDInnovation = () => {
  return (
    <section id="franchise" className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="absolute top-1/3 -right-20 w-80 h-80 orb-blue opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 orb-green opacity-30 pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full trust-badge text-[#0E5284] text-xs font-bold mb-4">
          <Boxes className="w-3.5 h-3.5 text-[#0F753A]" />
          PHARMA PARTNERSHIP & CONTRACT SERVICES
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E5284] tracking-tight mb-4">
          Empowering Healthcare Distribution
        </h2>
        <p className="text-[#5A7A91] text-sm sm:text-base">
          Accelerate your pharmaceutical business with our contract manufacturing and supply capabilities.
        </p>
        <div className="mt-4 w-16 mx-auto accent-line" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="rounded-3xl glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-inner ${item.iconBg}`}>
                    <Icon className="w-6 h-6" style={{ color: item.iconColor }} />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold trust-badge text-[#0E5284]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#0E5284]">{item.title}</h3>
                <p className="text-sm text-[#5A7A91] leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 border-t border-[#0E5284]/10 flex items-center justify-between">
                <span className="text-xs text-[#5A7A91] font-mono">Pan-India Availability</span>
                <a href="#contact"
                  className="text-xs font-bold text-[#0F753A] hover:text-[#0E5284] flex items-center gap-1 group transition-colors cursor-pointer">
                  <span>Apply Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

