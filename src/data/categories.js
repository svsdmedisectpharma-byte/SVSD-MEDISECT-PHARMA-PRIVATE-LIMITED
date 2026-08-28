export const CATEGORIES = [
  { id: 'all', label: 'All Formulations', icon: 'Sparkles', count: 16 },
  { id: 'Tablets', label: 'Tablets & Capsules', icon: 'Pill', count: 6 },
  { id: 'Antibiotics', label: 'Antibiotics', icon: 'ShieldAlert', count: 2 },
  { id: 'Syrups', label: 'Syrups & Liquids', icon: 'FlaskConical', count: 2 },
  { id: 'Injections', label: 'Injectables & IV', icon: 'Syringe', count: 2 },
  { id: 'Ointments', label: 'Ointments & Gels', icon: 'Droplets', count: 2 },
  { id: 'Nutraceuticals', label: 'Nutraceuticals', icon: 'Zap', count: 2 },
];

export const THERAPEUTIC_AREAS = [
  'All Therapeutic Areas',
  'Anti-Infectives',
  'Gastrointestinal',
  'Pain & Inflammation',
  'Cardiovascular',
  'Anti-Diabetic',
  'Respiratory Care',
  'Dermatology',
  'Vitamins & Supplements',
  'Critical Care & Antibiotics'
];

export const CERTIFICATIONS = [
  {
    code: 'WHO-GMP',
    title: 'WHO-GMP Compliant Facilities',
    desc: 'Adhering to strict international standards for pharmaceutical manufacturing and sterile process automation.',
    icon: 'ShieldCheck',
    color: 'cyan'
  },
  {
    code: 'ISO 9001:2015',
    title: 'ISO Quality Management',
    desc: 'Zero-defect quality assurance protocol implemented at every stage of synthesis and packaging.',
    icon: 'Award',
    color: 'blue'
  },
  {
    code: 'GLP Certified',
    title: 'GLP Testing Laboratories',
    desc: 'State-of-the-art analytical equipment including HPLC, spectrophotometry, and microbial assay suites.',
    icon: 'Microscope',
    color: 'violet'
  },
  {
    code: 'DCGI Approved',
    title: 'DCGI Approved Formulations',
    desc: 'All molecules and therapeutic combinations are compliant with national regulatory drug authority guidelines.',
    icon: 'CheckCircle2',
    color: 'emerald'
  }
];

export const COMPANY_STATS = [
  { label: 'Trusted Formulations', value: '99.9%', sub: 'DCGI & WHO-GMP Approved' },
  { label: 'Trusted by Doctors', value: '100%', sub: 'Pan-India Medical Network' },
  { label: 'Quality Verification', value: '100%', sub: 'Batch HPLC Tested' },
  { label: 'Industrial Experienced People', value: 'Expert', sub: 'Skilled Pharma Team' }
];

export const WHATSAPP_PHONE_NUMBER = '917587432458';
export const OFFICIAL_EMAIL = 'svsdmedisectpharma@gmail.com';
export const CATALOG_DOWNLOAD_URL = 'https://docs.google.com/presentation/d/1OOSgsHhonRYoL1x6CTUn2GSxPMgTLZ7K/edit?usp=sharing&ouid=101517278743260727228&rtpof=true&sd=true';
export const CATALOG_PDF_EXPORT_URL = 'https://docs.google.com/presentation/d/1OOSgsHhonRYoL1x6CTUn2GSxPMgTLZ7K/export/pdf';

export const generateWhatsAppLink = (medicineName, composition, packaging) => {
  const text = `Hello Medisect Pharma Team,\n\nI am interested in placing an inquiry / PCD franchise order for:\n💊 *Medicine:* ${medicineName || 'Pharmaceutical Products'}\n🧬 *Composition:* ${composition || 'Full Product Range'}\n📦 *Packaging:* ${packaging || 'Standard Packaging'}\n\nPlease share the bulk price list, visual aid, and delivery lead time. Thank you!`;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
};
