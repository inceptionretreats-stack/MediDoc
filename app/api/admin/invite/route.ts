import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getCurrentUser, hasRole } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { ROLES } from "@/lib/constants";

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(ROLES),
  tenantId: z.string().uuid().nullable(),
  fullName: z.string().trim().min(1).max(120).optional(),
});

async function getOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function POST(request: NextRequest) {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: "unauthorized" },
      { status: 401 },
    );
  }
  if (!hasRole(session, ["admin", "super_admin"])) {
    return NextResponse.json(
      { ok: false, error: "forbidden" },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "invalid input",
      },
      { status: 400 },
    );
  }
  const { email, role, tenantId, fullName } = parsed.data;

  if (!hasRole(session, ["super_admin"])) {
    if (!tenantId || !session.tenantIds.includes(tenantId)) {
      return NextResponse.json(
        { ok: false, error: "cannot invite outside your tenant" },
        { status: 403 },
      );
    }
    if (role === "super_admin") {
      return NextResponse.json(
        { ok: false, error: "only super_admin can grant super_admin" },
        { status: 403 },
      );
    }
  }

  const admin = createAdminClient();
  const origin = await getOrigin();

  const { data: invited, error: inviteError } =
    await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${origin}/auth/callback?next=%2Fdashboard`,
      data: fullName ? { full_name: fullName } : undefined,
    });

  if (inviteError || !invited.user) {
    return NextResponse.json(
      { ok: false, error: inviteError?.message ?? "invite failed" },
      { status: 500 },
    );
  }

  const { error: roleError } = await admin.from("user_roles").insert({
    user_id: invited.user.id,
    role,
    tenant_id: tenantId,
  });
  if (roleError) {
    return NextResponse.json(
      {
        ok: false,
        error: `role assignment failed: ${roleError.message}`,
      },
      { status: 500 },
    );
  }

  await admin.from("audit_log").insert({
    actor_id: session.userId,
    action: "user.invited",
    entity: "auth.users",
    entity_id: invited.user.id,
    after: { email, role, tenant_id: tenantId },
    tenant_id: tenantId,
  });

  return NextResponse.json({
    ok: true,
    message: `Invited ${email} as ${role}.`,
    userId: invited.user.id,
  });
}
