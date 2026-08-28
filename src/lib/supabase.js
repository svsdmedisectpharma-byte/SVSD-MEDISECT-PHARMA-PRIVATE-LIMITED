import { createClient } from '@supabase/supabase-js';

// Read environment variables or use fallback empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Authenticate Admin User via Supabase Auth
 * Falls back gracefully to local credentials if Supabase is not configured
 */
export async function authenticateAdmin(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  // If Supabase is configured, attempt Supabase Auth
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user, session: data.session };
    } catch (err) {
      console.warn('Supabase Auth error, checking fallback credentials:', err);
    }
  }

  // Fallback / Standalone Local Verification
  const validEmails = ['svsdmedisectpharma@gmail.com', 'admin@medisectpharma.com', 'admin'];
  if (validEmails.includes(cleanEmail) && password === 'medisect123') {
    return { success: true, user: { email: cleanEmail, role: 'admin' } };
  }

  return { 
    success: false, 
    error: 'Invalid credentials. Please verify your company email and password.' 
  };
}

/**
 * Fetch live formulation inventory from Supabase 'medicines' table
 */
export async function fetchMedicinesFromDatabase() {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Error fetching from Supabase:', err);
    return null;
  }
}

/**
 * Upsert / Save medicine formulation to Supabase
 */
export async function saveMedicineToDatabase(medicine) {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('medicines')
      .upsert(medicine)
      .select();

    if (error) {
      console.error('Supabase save error:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Error saving to Supabase:', err);
    return null;
  }
}

/**
 * Delete formulation from Supabase
 */
export async function deleteMedicineFromDatabase(id) {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase
      .from('medicines')
      .delete()
      .eq('id', id);

    return !error;
  } catch (err) {
    console.error('Error deleting from Supabase:', err);
    return false;
  }
}
