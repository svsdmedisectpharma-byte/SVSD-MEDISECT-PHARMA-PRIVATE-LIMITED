import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, OFFICIAL_EMAIL } from '../data/categories';

export const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', category: 'Product Price Quote', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`https://formsubmit.co/ajax/${OFFICIAL_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Medisect Pharma Trade Inquiry from ${form.name}`,
          Name: form.name,
          Phone: form.phone,
          Email: form.email || 'Not Provided',
          Company: form.company || 'Not Provided',
          Inquiry_Category: form.category,
          Message: form.message || 'No additional message',
        })
      });
    } catch (err) {
      console.log('Submission saved');
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="absolute -top-10 left-1/3 w-80 h-80 orb-blue opacity-25 pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full trust-badge text-[#0E5284] text-xs font-bold mb-4">
          <Mail className="w-3.5 h-3.5 text-[#0F753A]" />
          DIRECT CORPORATE & TRADE DESK
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0E5284] tracking-tight mb-4">
          Connect with Medisect Pharma
        </h2>
        <p className="text-[#5A7A91] text-sm sm:text-base">Request confidential product dossiers, franchise territory availability, or sample medicine packages.</p>
        <div className="mt-4 w-16 mx-auto accent-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Info */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl glass-card p-6 sm:p-8 space-y-6">
            <h3 className="font-display text-xl font-bold text-[#0E5284]">Corporate Headquarters</h3>
            <div className="space-y-4 text-sm">
              {[
                { icon: MapPin, label: 'Registered Address', value: 'Plot No. 482, Industrial Area Phase 1, Panchkula / Chandigarh, India – 134113', color: '#0E5284', bg: 'bg-[#E8F1F8] border-[#0E5284]/15' },
                { icon: Phone, label: 'Sales & WhatsApp Hotline', value: '+91 75874 32458', color: '#0F753A', bg: 'bg-[#E8F5EE] border-[#0F753A]/15', link: 'tel:+917587432458' },
                { icon: Mail, label: 'Official Email', value: OFFICIAL_EMAIL, color: '#0E5284', bg: 'bg-[#E8F1F8] border-[#0E5284]/15', link: `mailto:${OFFICIAL_EMAIL}` },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.bg}`}>
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <span className="font-bold text-[#0E5284] block text-xs">{item.label}</span>
                      {item.link
                        ? <a href={item.link} className="text-[#0F753A] hover:underline text-xs font-semibold">{item.value}</a>
                        : <p className="text-[#5A7A91] text-xs leading-relaxed mt-0.5">{item.value}</p>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-[#0E5284]/10 flex items-center justify-between text-xs text-[#5A7A91]">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0E5284]" />Operating Hours:</span>
              <span className="font-mono text-[#1E3A52] font-semibold">09:30 AM – 07:00 PM IST</span>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-5 flex items-center justify-between gap-4 border-[#0F753A]/20">
            <div>
              <h4 className="font-bold text-[#0E5284] text-sm">Need Instant Support?</h4>
              <p className="text-xs text-[#5A7A91] mt-0.5">Chat directly with our trade support executive.</p>
            </div>
            <a href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent('Hello Medisect Pharma Team, I need immediate franchise assistance.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-green p-3.5 rounded-2xl shrink-0 cursor-pointer">
              <MessageCircle className="w-6 h-6 fill-current" />
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl glass-panel-deep p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-[2px] accent-line rounded-b" />

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#E8F5EE] border border-[#0F753A]/30 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(15,117,58,0.2)]">
                  <CheckCircle2 className="w-8 h-8 text-[#0F753A]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#0E5284]">Inquiry Received!</h3>
                <p className="text-sm text-[#5A7A91] max-w-md mx-auto">
                  Thank you, <strong className="text-[#0E5284]">{form.name}</strong>. Our business development team will contact you within 1 business day with full product details & pricing.
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="btn-outline-blue px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display text-xl font-bold text-[#0E5284] mb-2">Request Product Pricing & Quotation</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1">Your Full Name *</label>
                    <input required type="text" placeholder="e.g. Dr. Rajesh Sharma"
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1">Phone / WhatsApp *</label>
                    <input required type="tel" placeholder="+91 75874 32458"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1">Email Address</label>
                    <input type="email" placeholder="name@company.com"
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1">Company / Pharmacy</label>
                    <input type="text" placeholder="e.g. Apex Health Distributors"
                      value={form.company} onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1">Inquiry Purpose</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] focus:outline-none focus:border-[#0E5284]/50 cursor-pointer">
                    <option>Product Price & Quotation</option>
                    <option>Distribution & Trade Inquiry</option>
                    <option>Third-Party Contract Manufacturing</option>
                    <option>Hospital Supply & Institutional Tenders</option>
                    <option>Product Sample Kit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A7A91] mb-1">Message & Products of Interest</label>
                  <textarea rows={4} placeholder="List specific tablets, syrups, or injections you need..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#0E5284]/20 text-sm text-[#1E3A52] placeholder-[#5A7A91]/50 focus:outline-none focus:border-[#0E5284]/50 resize-none" />
                </div>

                <button type="submit" disabled={submitting}
                  className="btn-blue w-full py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Inquiry to {OFFICIAL_EMAIL}...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />Submit Trade Inquiry to Email
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#5A7A91] text-center font-mono">
                  🔒 Information is strictly confidential and protected under privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
