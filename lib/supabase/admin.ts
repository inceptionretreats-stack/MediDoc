import { createClient } from "@supabase/supabase-js";
import { getPublicEnv, getServerEnv } from "@/lib/env";
import type { Database } from "@/lib/types/database";

/**
 * Service-role Supabase client. BYPASSES RLS — use only in trusted server
 * contexts (server actions, route handlers) AFTER an explicit role check via
 * `requireRole` or equivalent. Never import into client components.
 */
export function createAdminClient() {
  const pub = getPublicEnv();
  const srv = getServerEnv();
  return createClient<Database>(
    pub.NEXT_PUBLIC_SUPABASE_URL,
    srv.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
