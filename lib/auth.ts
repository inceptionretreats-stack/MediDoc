import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/constants";

type ProfileRow = { full_name: string | null };
type RoleRow = { role: Role; tenant_id: string | null };

export type AuthSession = {
  userId: string;
  email: string | null;
  fullName: string | null;
  roles: { role: Role; tenantId: string | null }[];
  tenantIds: string[];
};

export const getCurrentUser = cache(async (): Promise<AuthSession | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const profileResult = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  const rolesResult = await supabase
    .from("user_roles")
    .select("role, tenant_id")
    .eq("user_id", user.id)
    .returns<RoleRow[]>();

  const roles: AuthSession["roles"] = (rolesResult.data ?? []).map((r) => ({
    role: r.role,
    tenantId: r.tenant_id,
  }));

  const tenantIds = Array.from(
    new Set(roles.map((r) => r.tenantId).filter((t): t is string => !!t)),
  );

  return {
    userId: user.id,
    email: user.email ?? null,
    fullName: profileResult.data?.full_name ?? null,
    roles,
    tenantIds,
  };
});

export function hasRole(session: AuthSession | null, allowed: Role[]): boolean {
  if (!session) return false;
  return session.roles.some((r) => allowed.includes(r.role));
}

export function hasTenantRole(
  session: AuthSession | null,
  tenantId: string,
  allowed: Role[],
): boolean {
  if (!session) return false;
  return session.roles.some(
    (r) => r.tenantId === tenantId && allowed.includes(r.role),
  );
}

export function requireRole(
  session: AuthSession | null,
  allowed: Role[],
): asserts session is AuthSession {
  if (!hasRole(session, allowed)) {
    throw new Error("forbidden");
  }
}
