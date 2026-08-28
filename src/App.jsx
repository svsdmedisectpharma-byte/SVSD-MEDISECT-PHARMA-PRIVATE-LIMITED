import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Certifications } from './components/Certifications';
import { RnDInnovation } from './components/RnDInnovation';
import { QuickInquiryCTA } from './components/QuickInquiryCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { LoadingScreen } from './components/LoadingScreen';
import { AIChatbot } from './components/AIChatbot';
import medicinesData from './data/medicines.json';
import { ArrowUp } from 'lucide-react';
import { fetchMedicinesFromDatabase } from './lib/supabase';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Synchronized Medicines State with LocalStorage Persistence
  const [medicines, setMedicinesState] = useState(() => {
    const saved = localStorage.getItem('medisect_medicines');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved medicines from localStorage', e);
      }
    }
    return medicinesData;
  });

  // Attempt to fetch from Supabase if configured
  useEffect(() => {
    async function loadRemoteMedicines() {
      const dbMedicines = await fetchMedicinesFromDatabase();
      if (dbMedicines && dbMedicines.length > 0) {
        setMedicinesState(dbMedicines);
        localStorage.setItem('medisect_medicines', JSON.stringify(dbMedicines));
      }
    }
    loadRemoteMedicines();
  }, []);

  const setMedicines = (newMedicines) => {
    setMedicinesState(newMedicines);
    localStorage.setItem('medisect_medicines', JSON.stringify(newMedicines));
  };

  // Route Handling: 'public' vs 'admin'
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (hash === '#admin' || path === '/admin') return 'admin';
    return 'public';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentRoute('admin');
      } else if (window.location.hash !== '#admin' && currentRoute === 'admin') {
        setCurrentRoute('public');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentRoute]);

  const navigateToAdmin = () => {
    window.location.hash = 'admin';
    setCurrentRoute('admin');
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setCurrentRoute('public');
  };

  // Render Admin View
  if (currentRoute === 'admin') {
    return (
      <AdminDashboard
        medicines={medicines}
        setMedicines={setMedicines}
        onReturnToPublic={navigateToPublic}
      />
    );
  }

  // Render Public Website View
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E3A52] relative overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Fixed ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-[20%] w-[600px] h-[600px] orb-blue animate-float-a opacity-70" />
        <div className="absolute top-1/3 right-[-5%] w-[550px] h-[550px] orb-[#0F753A] animate-float-b opacity-60" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] orb-blue animate-float-c opacity-50" />
      </div>

      <div className="relative z-10">
        <Navbar onOpenAdmin={navigateToAdmin} />

        {/* Top spacer to ensure fixed Navbar never overlaps content below */}
        <div className="h-24 sm:h-28 md:h-32 shrink-0" aria-hidden="true" />

        <main>
          <Hero />
          <Certifications />
          <RnDInnovation />
          <QuickInquiryCTA medicines={medicines} />
          <ContactSection />
        </main>

        <Footer />

        {/* Scroll to top button */}
        <div className="fixed bottom-6 left-6 z-40">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-3 rounded-full bg-white/80 hover:bg-white border border-[#0E5284]/20 text-[#0E5284] shadow-[0_4px_16px_rgba(14,82,132,0.15)] backdrop-blur-md transition-all cursor-pointer hover:scale-110"
            title="Scroll to top">
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Customized AI Chatbot Floating Assistant Widget */}
        <AIChatbot />
      </div>
    </div>
  );
}


