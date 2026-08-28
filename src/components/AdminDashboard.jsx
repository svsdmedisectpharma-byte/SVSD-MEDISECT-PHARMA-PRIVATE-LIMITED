import React, { useState } from 'react';
import { 
  Lock, LogOut, Plus, Edit2, Trash2, CheckCircle2, XCircle, 
  Search, ShieldAlert, Package, Layers, Sparkles, ArrowLeft, RefreshCw, Eye, Upload, Image, Camera, KeyRound, Database, ShoppingCart, ExternalLink
} from 'lucide-react';
import { MedicineGraphic } from './MedicineGraphic';
import { authenticateAdmin, isSupabaseConfigured } from '../lib/supabase';

export const AdminDashboard = ({ medicines, setMedicines, onReturnToPublic }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('medisect_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // CRUD & Modal State
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMedicineId, setEditingMedicineId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    generic_name: '',
    composition: '',
    category: 'Tablets',
    dosage_form: 'Tablet',
    therapeutic_area: 'Anti-Infectives',
    packaging: '10 x 10 Alu-Alu Blister',
    badge: 'WHO-GMP Certified',
    description: '',
    in_stock: true,
    accent_color: 'blue',
    image: '',
    buy_url: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Handle File Upload to Base64
  const handleImageFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('Image file is too large (max 3MB). Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Login Submit (Supabase Auth + Company Email Verification)
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const result = await authenticateAdmin(loginEmail, loginPassword);
      setIsLoggingIn(false);

      if (result.success) {
        setIsAuthenticated(true);
        localStorage.setItem('medisect_admin_auth', 'true');
        if (result.user?.email) {
          localStorage.setItem('medisect_admin_email', result.user.email);
        }
        setLoginError('');
      } else {
        setLoginError(result.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setIsLoggingIn(false);
      setLoginError('Error connecting to authentication service.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('medisect_admin_auth');
  };

  // Open Form for Add
  const handleOpenAddForm = () => {
    setEditingMedicineId(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEditForm = (med) => {
    setEditingMedicineId(med.id);
    setFormData({
      name: med.name || '',
      generic_name: med.generic_name || '',
      composition: med.composition || '',
      category: med.category || 'Tablets',
      dosage_form: med.dosage_form || 'Tablet',
      therapeutic_area: med.therapeutic_area || 'Anti-Infectives',
      packaging: med.packaging || '10 x 10 Alu-Alu Blister',
      badge: med.badge || 'WHO-GMP Certified',
      description: med.description || '',
      in_stock: med.in_stock !== false,
      accent_color: med.accent_color || 'blue',
      image: med.image || '',
      buy_url: med.buy_url || ''
    });
    setIsFormOpen(true);
  };

  // Handle Save Form (Add or Edit)
  const handleSaveMedicine = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.composition.trim()) {
      alert('Please fill in required fields: Name and Active Composition.');
      return;
    }

    if (editingMedicineId) {
      // Update Existing
      const updated = medicines.map(med => {
        if (med.id === editingMedicineId) {
          return {
            ...med,
            ...formData,
            id: editingMedicineId
          };
        }
        return med;
      });
      setMedicines(updated);
    } else {
      // Add New
      const newMed = {
        id: `med_${Date.now()}`,
        ...formData
      };
      setMedicines([newMed, ...medicines]);
    }

    setIsFormOpen(false);
    setEditingMedicineId(null);
    setFormData(initialFormState);
  };

  // Toggle Stock Status
  const handleToggleStock = (id) => {
    const updated = medicines.map(med => {
      if (med.id === id) {
        return { ...med, in_stock: med.in_stock === false ? true : false };
      }
      return med;
    });
    setMedicines(updated);
  };

  // Delete Medicine
  const handleDeleteMedicine = (id) => {
    const updated = medicines.filter(med => med.id !== id);
    setMedicines(updated);
    setDeleteConfirmId(null);
  };

  // Filtered List
  const filteredMedicines = medicines.filter(m => {
    const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
    const q = searchFilter.toLowerCase();
    const matchesQuery = !q || 
      m.name?.toLowerCase().includes(q) || 
      m.generic_name?.toLowerCase().includes(q) || 
      m.composition?.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  // Calculate statistics
  const totalCount = medicines.length;
  const inStockCount = medicines.filter(m => m.in_stock !== false).length;
  const outOfStockCount = totalCount - inStockCount;

  // Render Unauthenticated Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 orb-blue opacity-50 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 orb-green opacity-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 shadow-[0_8px_30px_rgba(14,82,132,0.12)] space-y-6">
          
          <div className="flex flex-col items-center text-center space-y-3">
            <a href="#" onClick={(e) => { e.preventDefault(); onReturnToPublic(); }} className="cursor-pointer group">
              <img src="/logo.jpg" alt="Medisect Pharma Logo" className="h-16 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </a>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E5284]/10 text-[#0E5284] text-xs font-bold font-mono">
              <Lock className="w-3.5 h-3.5 text-[#0F753A]" />
              SECURE ADMIN MANAGEMENT PORTAL
            </div>
            <h2 className="font-display text-2xl font-extrabold text-[#0E5284]">Admin Authorization</h2>
            <p className="text-xs text-slate-500">Sign in to manage product inventory, active formulations, and catalog status.</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-shake">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0E5284] uppercase tracking-wider mb-1">Company Email / Admin ID</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-[#1E3A52] focus:outline-none focus:border-[#0E5284] focus:ring-2 focus:ring-[#0E5284]/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E5284] uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-[#1E3A52] focus:outline-none focus:border-[#0E5284] focus:ring-2 focus:ring-[#0E5284]/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-blue py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#0F753A]" />
                  <span>Authenticate & Open Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onReturnToPublic}
              className="text-xs font-semibold text-slate-500 hover:text-[#0E5284] flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E3A52]">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between flex-nowrap gap-4">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); onReturnToPublic(); }} className="flex items-center gap-3 shrink-0">
              <img src="/logo.jpg" alt="Medisect Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
            </a>
            <div className="hidden sm:flex flex-col border-l border-slate-200 pl-4">
              <span className="font-display font-extrabold text-sm text-[#0E5284] tracking-tight">ADMIN CONTROL PANEL</span>
              <span className="text-[10px] text-[#0F753A] font-mono font-semibold">WHO-GMP Catalog Inventory Sync</span>
            </div>
          </div>

          {/* Quick Actions & Logout */}
          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToPublic}
              className="btn-outline-blue px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Live Site</span>
            </button>

            <button
              onClick={handleOpenAddForm}
              className="btn-green px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Medicine</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
              title="Logout Admin Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Formulations</div>
              <div className="font-display text-3xl font-extrabold text-[#0E5284] mt-1">{totalCount}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0E5284]/10 flex items-center justify-center text-[#0E5284]">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active In Stock</div>
              <div className="font-display text-3xl font-extrabold text-[#0F753A] mt-1">{inStockCount}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0F753A]/10 flex items-center justify-center text-[#0F753A]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Out of Stock</div>
              <div className="font-display text-3xl font-extrabold text-amber-600 mt-1">{outOfStockCount}</div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Inventory Control Table Card */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
          
          {/* Table Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-display text-xl font-extrabold text-[#0E5284]">Medicine Inventory List</h3>
              <p className="text-xs text-slate-500 mt-0.5">Manage live formulations, edit generic compositions, and toggle stock availability.</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name or composition..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284] focus:bg-white transition-all"
                />
              </div>

              {/* Category Select */}
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E3A52] focus:outline-none focus:border-[#0E5284] cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="Tablets">Tablets</option>
                <option value="Syrups">Syrups</option>
                <option value="Injections">Injections</option>
                <option value="Ointments">Ointments</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Nutraceuticals">Nutraceuticals</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50/50">
                  <th className="py-3 px-4 rounded-l-xl">Formulation & Generic</th>
                  <th className="py-3 px-4">Active Composition</th>
                  <th className="py-3 px-4">Category & Packaging</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredMedicines.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No medicines match your filter criteria. Click "Add New Medicine" to add one!
                    </td>
                  </tr>
                ) : (
                  filteredMedicines.map(med => (
                    <tr key={med.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* Name & Generic */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                            <MedicineGraphic dosageForm={med.dosage_form} accentColor={med.accent_color} name={med.name} image={med.image} />
                          </div>
                          <div>
                            <div className="font-display font-extrabold text-[#0E5284] text-sm">{med.name}</div>
                            <div className="text-[11px] text-slate-400 italic">{med.generic_name}</div>
                          </div>
                        </div>
                      </td>

                      {/* Composition */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-mono text-[11px] text-slate-700 line-clamp-2 leading-relaxed">{med.composition}</div>
                      </td>

                      {/* Category & Packaging */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F1F8] text-[#0E5284] border border-[#0E5284]/15">
                            {med.category}
                          </span>
                          <div className="text-[11px] text-slate-500 font-mono">{med.packaging}</div>
                        </div>
                      </td>

                      {/* Stock Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStock(med.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            med.in_stock !== false
                              ? 'bg-[#E8F5EE] text-[#0F753A] border border-[#0F753A]/20 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-300/60 hover:bg-amber-100'
                          }`}
                          title="Click to toggle stock status"
                        >
                          {med.in_stock !== false ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditForm(med)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0E5284] hover:bg-[#0E5284]/10 transition-colors cursor-pointer"
                            title="Edit Formulation"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(med.id)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Formulation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Form for Add / Edit */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="font-display text-xl font-extrabold text-[#0E5284]">
                {editingMedicineId ? 'Edit Medicine Formulation' : 'Add New Medicine Formulation'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMedicine} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ceftricare-1000"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Generic / Scientific Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ceftriaxone Sodium Injection IP"
                    value={formData.generic_name}
                    onChange={e => setFormData({ ...formData, generic_name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  />
                </div>
              </div>

              {/* Brand Product Photo Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0E5284] flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#0F753A]" />
                    Brand Product Photo
                  </label>
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="text-[11px] text-red-600 hover:underline font-bold cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  {/* Image Preview Box */}
                  <div className="sm:col-span-4 h-24 rounded-xl border border-slate-300 bg-white overflow-hidden flex items-center justify-center relative shadow-xs">
                    {formData.image ? (
                      <img src={formData.image} alt="Brand Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <Image className="w-6 h-6 mx-auto mb-1 opacity-50 text-[#0E5284]" />
                        <span className="text-[10px] font-semibold">No Custom Photo</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="sm:col-span-8 space-y-2">
                    <div>
                      <label className="btn-outline-blue px-3.5 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs">
                        <Upload className="w-4 h-4 text-[#0F753A]" />
                        <span>Upload Brand Image File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or enter image URL:</div>

                    <input
                      type="text"
                      placeholder="https://example.com/brand-photo.jpg"
                      value={formData.image}
                      onChange={e => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Active Composition *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Each vial contains: Ceftriaxone Sodium IP eq. to Anhydrous Ceftriaxone 1000mg"
                  value={formData.composition}
                  onChange={e => setFormData({ ...formData, composition: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  >
                    <option value="Tablets">Tablets</option>
                    <option value="Syrups">Syrups</option>
                    <option value="Injections">Injections</option>
                    <option value="Ointments">Ointments</option>
                    <option value="Antibiotics">Antibiotics</option>
                    <option value="Nutraceuticals">Nutraceuticals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Dosage Form</label>
                  <select
                    value={formData.dosage_form}
                    onChange={e => setFormData({ ...formData, dosage_form: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Gel">Gel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Accent Theme</label>
                  <select
                    value={formData.accent_color}
                    onChange={e => setFormData({ ...formData, accent_color: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  >
                    <option value="blue">Blue Navy</option>
                    <option value="green">Emerald Green</option>
                    <option value="purple">Royal Purple</option>
                    <option value="amber">Amber Orange</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Packaging Details</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 x 10 Vial + WFI"
                    value={formData.packaging}
                    onChange={e => setFormData({ ...formData, packaging: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Quality Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. WHO-GMP Certified"
                    value={formData.badge}
                    onChange={e => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShoppingCart className="w-3.5 h-3.5 text-[#0E5284]" />
                    Purchase Link / 1MG Store URL (Optional)
                  </span>
                  <span className="text-[10px] text-[#5A7A91] font-normal lowercase">Direct link to 1MG, PharmEasy, or e-pharmacy</span>
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://www.1mg.com/drugs/ceftricare-1000mg-injection-12345"
                  value={formData.buy_url}
                  onChange={e => setFormData({ ...formData, buy_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Stock Availability</label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="in_stock"
                      checked={formData.in_stock === true}
                      onChange={() => setFormData({ ...formData, in_stock: true })}
                      className="text-[#0F753A] focus:ring-[#0F753A]"
                    />
                    <span className="text-[#0F753A] font-bold">In Stock</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="in_stock"
                      checked={formData.in_stock === false}
                      onChange={() => setFormData({ ...formData, in_stock: false })}
                      className="text-amber-600 focus:ring-amber-600"
                    />
                    <span className="text-amber-700 font-bold">Out of Stock</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E5284] mb-1">Description / Prescribing Notes</label>
                <textarea
                  rows={3}
                  placeholder="Clinical usage instructions, indications, and storage guidelines..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-[#1E3A52] focus:outline-none focus:border-[#0E5284] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-green px-6 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  {editingMedicineId ? 'Save Formulation Changes' : 'Add Formulation to Catalog'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="font-display font-extrabold text-lg text-[#0E5284]">Confirm Deletion</h4>
            <p className="text-xs text-slate-500">Are you sure you want to delete this medicine? It will be removed from the public catalog immediately.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteMedicine(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-md"
              >
                Yes, Delete Medicine
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
