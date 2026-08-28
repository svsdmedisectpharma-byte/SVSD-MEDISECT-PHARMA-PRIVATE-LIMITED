# 🏥 Medisect Pharma — Admin Management Portal & Platform Guide

Welcome to the **Medisect Pharma** production platform documentation. This guide details the features, loading splash screen, Supabase authentication integration, inventory management system, and technical architecture.

---

## ⚡ Production Readiness & Loading Buffer Screen

The platform includes an automated **Loading & Splash Buffer Screen** ([`LoadingScreen.jsx`](file:///c:/Users/Sanskriti/.gemini/antigravity-ide/scratch/medisect-pharma/src/components/LoadingScreen.jsx)) that executes on initial site load:
- Displays the official prominent **MEDISECT PHARMA** brand emblem with pulsating ambient light rings.
- Real-time progress bar (0% → 100%) checking WHO-GMP certification compliance & DCGI approvals.
- Smooth transition into the main application.

---

## 🔐 Admin Portal Access & Supabase Authentication

For security and privacy, the **Admin Portal is hidden from the public navigation header**. Public website visitors cannot see or access an "Admin" button on the navbar.

### 🌐 How to Access the Admin Portal:
1. Open your browser and navigate to:
   ```
   http://127.0.0.1:5173/#admin
   ```
   *(Or append `#admin` to your website's URL in any environment).*

2. **Official Admin Credentials & Company Email:**
   | Credential Field | Value |
   | :--- | :--- |
   | **Company Email** | `svsdmedisectpharma@gmail.com` |
   | **Alternative Admin ID** | `admin@medisectpharma.com` |
   | **Password** | `medisect123` |

3. **Supabase Integration Module ([`src/lib/supabase.js`](file:///c:/Users/Sanskriti/.gemini/antigravity-ide/scratch/medisect-pharma/src/lib/supabase.js)):**
   - Configured with `@supabase/supabase-js`.
   - Supports Supabase Auth for `svsdmedisectpharma@gmail.com` as well as database table syncing.
   - Includes graceful fallback so the application works out-of-the-box in local, demo, or production environments.

---

## 🛠️ Admin Dashboard Capabilities (Full Inventory CRUD)

The Admin Control Panel ([`AdminDashboard.jsx`](file:///c:/Users/Sanskriti/.gemini/antigravity-ide/scratch/medisect-pharma/src/components/AdminDashboard.jsx)) provides complete inventory management capabilities:

### 1. ➕ Adding New Formulations
Click **"Add New Medicine"** to open the modal editor. You can specify:
- **Brand Name**: e.g., *Ceftricare-1000*, *Pantosect-DSR*
- **Generic / Scientific Name**: e.g., *Ceftriaxone Sodium Injection IP*
- **Active Composition**: e.g., *Ceftriaxone Sodium 1000mg*
- **Category**: *Tablets*, *Syrups*, *Injections*, *Ointments*, *Antibiotics*, *Nutraceuticals*
- **Dosage Form**: *Tablet*, *Capsule*, *Syrup*, *Injection*, *Ointment*, *Gel*
- **Packaging Details**: e.g., *10 x 10 Alu-Alu Blister*, *1 x 10 Vial + WFI*
- **Quality Badge**: e.g., *WHO-GMP Certified*, *DCGI Approved*
- **Prescribing Description & Storage Notes**

### 2. 📸 Brand Product Photo Upload
You can attach official product photos to any brand/medicine formulation:
- **Upload Image File from Device**: Click *"Upload Brand Image File"* to select an image from your computer (`.png`, `.jpg`, `.jpeg`, `.webp`). The file is automatically converted to a base64 Data URL and saved.
- **Image URL Link**: Alternatively, paste a web image link (`https://example.com/photo.jpg`).
- **Live Preview & Thumbnail**: View a live preview before saving. The custom photo displays in both the Admin inventory table and the public catalog card/modal.

### 3. 🔄 Real-Time Stock Status Toggle
- Toggle any medicine between **`In Stock`** (Emerald Green badge) and **`Out of Stock`** (Amber warning badge) with a single click.
- "Out of Stock" formulations will display an interactive stock indicator on the public medicine card.

### 4. ✏️ Edit & 🗑️ Delete Formulations
- **Edit**: Update brand names, compositions, packaging, or photos at any time.
- **Delete**: Remove obsolete medicines from the catalog with a confirmation prompt.

---

## 📞 Integrated Contact & Trade Desk Setup

| Feature | Value / Destination |
| :--- | :--- |
| **Sales & WhatsApp Hotline** | `+91 75874 32458` (`917587432458`) |
| **Official Email** | `svsdmedisectpharma@gmail.com` |
| **Trade Form Submissions** | Auto-routed to `svsdmedisectpharma@gmail.com` via zero-config FormSubmit AJAX |
| **Product Catalog Link** | [Google Presentation Catalog Link](https://docs.google.com/presentation/d/1OOSgsHhonRYoL1x6CTUn2GSxPMgTLZ7K/edit?usp=sharing&ouid=101517278743260727228&rtpof=true&sd=true) |

---

## 🚀 Development & Production Build Commands

```powershell
# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production bundle
npm run preview
```
