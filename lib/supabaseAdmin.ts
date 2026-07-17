import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only client using the Supabase service-role key, which bypasses
 * Row Level Security entirely. Never import this from a "use client"
 * component — it must only be used inside API route handlers.
 *
 * Created lazily (not at module load) so that `next build` doesn't fail
 * just because SUPABASE_SERVICE_ROLE_KEY isn't set yet in this environment.
 */
let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase admin client is not configured: set SUPABASE_SERVICE_ROLE_KEY in .env.local");
    }
    client = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
  }
  return client;
}
