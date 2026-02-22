
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or Key env vars are missing! Did you restart npm run dev?");
}

// We provide empty fallbacks so the app doesn't crash immediately on load.
// Supabase operations will fail gracefully later if used.
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');
