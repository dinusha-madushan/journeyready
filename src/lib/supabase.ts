import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** null when Supabase is not set up. The app still works with browser storage. */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
