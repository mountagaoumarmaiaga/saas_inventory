import { createClient } from '@supabase/supabase-js';

// Dynamically extract environment variables injected by Laravel's HandleInertiaRequests
// This avoids relying on Vite's build-time `import.meta.env` which can become stale 
// or missing depending on how the server was started.
let supabaseUrl = '';
let supabaseKey = '';

try {
    const pageEl = document.getElementById('app');
    if (pageEl && pageEl.dataset.page) {
        const pageData = JSON.parse(pageEl.dataset.page);
        if (pageData?.props?.env) {
            supabaseUrl = pageData.props.env.supabaseUrl;
            supabaseKey = pageData.props.env.supabaseAnonKey;
        }
    }
} catch (e) {
    console.warn("Could not parse Inertia page props for Supabase env.");
}

// Fallback to Vite env if DOM extraction fails (e.g. during SSR)
supabaseUrl = supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '';
supabaseKey = supabaseKey || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or Key env vars are missing from both Inertia props and Vite env!");
}

// We provide empty fallbacks so the app doesn't crash immediately on load.
export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');
