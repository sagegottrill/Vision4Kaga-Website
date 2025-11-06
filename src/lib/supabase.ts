import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase project credentials
// Get these from: https://app.supabase.com/project/_/settings/api
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Endorsement {
  id?: number;
  name: string;
  title: string;
  location: string;
  content: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface Volunteer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  message: string;
  created_at?: string;
}

export interface Contact {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface Donation {
  id?: number;
  name: string;
  email: string;
  ward_community: string;
  amount: number;
  is_recurring: boolean;
  created_at?: string;
}

export interface AdminUser {
  id?: number;
  username: string;
  email: string;
  created_at?: string;
}
