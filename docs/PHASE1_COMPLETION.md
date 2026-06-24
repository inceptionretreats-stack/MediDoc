# Phase 1 Completion Guide

Step-by-step instructions to finish the four remaining items in **Phase 1 — Auth + session middleware + RBAC enforcement**.

You are expected to read each step, paste the snippet, and run the verification at the end of each section. If a verification fails, stop and fix before moving on. All commands assume PowerShell on Windows from the project root `c:\web applications\Doctor\Doctor`.

**Prereqs**
- Phase 0 complete (DB live, schema applied, types generated). ✅
- Phase 1 base scaffolding committed at `847f4a0` (middleware, `lib/auth.ts`, sign-in/up pages, callback). ✅
- Vercel env vars pushed in production + preview + development. ✅
- Local dev server can start with `npm run dev`. ✅

---

## Section 1 — Per-page `requireRole()` enforcement (~30 min)

The middleware already redirects unauthenticated users away from `/dashboard`, `/admin`, `/roles`, `/onboarding`, `/booking` to `/sign-in?next=<path>`. What's missing: an **authenticated user with the wrong role** can currently still see those pages. We fix that by adding a server-side role check at the top of each page.

### Role policy (conservative defaults)

| Page | Allowed roles |
|---|---|
| `/admin` | `admin`, `super_admin` |
| `/dashboard` | `manager`, `admin`, `super_admin`, `front_desk` |
| `/roles` | `doctor`, `manager`, `admin`, `super_admin`, `front_desk` |
| `/onboarding` | any signed-in user (no role check, just `getCurrentUser()`) |
| `/booking` | any signed-in user (no role check, just `getCurrentUser()`) |

### Step 1.1 — Add a helper for role-gated pages

Open `lib/auth.ts`. The existing `requireRole(session, allowed)` throws when forbidden. Throwing in a server component returns a 500 to the user. We want a clean redirect instead. Add this helper at the bottom of the file:

```ts
import { redirect } from "next/navigation";

/**
 * Use at the top of a server component. Redirects to /sign-in if the user is
 * not authenticated, or to /403 if they are signed in but lack the role.
 * Returns the session for downstream use.
 */
export async function requirePageRole(
  allowed: Role[],
  pathname: string,
): Promise<AuthSession> {
  const session = await getCurrentUser();
  if (!session) {
    redirect(`/sign-in?next=${encodeURIComponent(pathname)}`);
  }
  if (!hasRole(session, allowed)) {
    redirect("/403");
  }
  return session;
}
```

### Step 1.2 — Add a 403 page

Create `app/403/page.tsx`:

```tsx
export const dynamic = "force-static";

export default function ForbiddenPage() {
  return (
    <main className="mx-auto max-w-md p-8 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">403 — Not allowed</h1>
      <p className="mt-2 text-sm text-slate-600">
        You're signed in, but your role doesn't have access to this page.
      </p>
      <a
        href="/dashboard"
        className="mt-6 inline-block rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white"
      >
        Back to dashboard
      </a>
    </main>
  );
}
```

### Step 1.3 — Wire each protected page

Edit each of the 5 pages. The pattern is the same: convert the default export to `async`, call `requirePageRole`, then render.

**`app/admin/page.tsx`** — replace contents with:

```tsx
import type { Metadata } from "next";
import { requirePageRole } from "@/lib/auth";
import { AdminOps } from "@/components/admin/admin-ops"; // adjust import to match your existing component

export const metadata: Metadata = {
  title: "Admin operations - Doctor Platform",
};

export default async function AdminPage() {
  await requirePageRole(["admin", "super_admin"], "/admin");
  return <AdminOps />;
}
```

**`app/dashboard/page.tsx`** — replace contents with:

```tsx
import type { Metadata } from "next";
import { requirePageRole } from "@/lib/auth";
import { StaffDashboard } from "@/components/dashboard/staff-dashboard";

export const metadata: Metadata = {
  title: "Lead pipeline - Doctor Platform",
};

export default async function DashboardPage() {
  await requirePageRole(
    ["manager", "admin", "super_admin", "front_desk"],
    "/dashboard",
  );
  return <StaffDashboard />;
}
```

**`app/roles/page.tsx`** — same shape, allowed roles `["doctor", "manager", "admin", "super_admin", "front_desk"]`, path `"/roles"`.

**`app/onboarding/page.tsx`** — only requires sign-in, no role check:

```tsx
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
// ... existing imports

export default async function OnboardingPage() {
  const session = await getCurrentUser();
  if (!session) redirect("/sign-in?next=%2Fonboarding");
  // pass session to component if needed
  return <OnboardingFlow session={session} />;
}
```

**`app/booking/page.tsx`** — same pattern as `/onboarding`. Sign-in required, no role check.

### Step 1.4 — Verify

```powershell
npm run typecheck
npm run build
npm run dev   # in another terminal
```

Then manually:

1. Open `http://localhost:3000/admin` in **incognito**. Should redirect to `/sign-in?next=%2Fadmin`. ✅
2. Sign in with a magic link as a `patient` user (we'll create one in Section 4). Visit `/admin` again. Should redirect to `/403`. ✅
3. As an `admin` user, visit `/admin`. Should render. ✅

---

## Section 2 — Admin-only invite flow (~1 hour)

Admins need a way to add a doctor/manager/front-desk to a tenant by email. Supabase Auth has `inviteUserByEmail()` — we wrap it with a server-side role check and pre-assign the role in `user_roles` before the user accepts.

### Step 2.1 — Create a service-role Supabase admin client

Create `lib/supabase/admin.ts`:

```ts
import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "@/lib/env";
import type { Database } from "@/lib/types/database";

/**
 * Service-role client. BYPASSES RLS. Use ONLY in trusted server contexts
 * (server actions, route handlers) after explicit role checks. Never expose
 * to client-side code.
 */
export function createAdminClient() {
  const env = getServerEnv();
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
```

Verify `lib/env.ts` already includes `SUPABASE_SERVICE_ROLE_KEY` in `getServerEnv()`. If not, add it to the Zod schema:

```ts
SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
```

### Step 2.2 — Create the invite route handler

Create `app/api/admin/invite/route.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import { getCurrentUser, hasRole } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { ROLES, type Role } from "@/lib/constants";

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
  // 1. Authn + Authz
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!hasRole(session, ["admin", "super_admin"])) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  // 2. Validate body
  const body = await request.json().catch(() => null);
  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "invalid input" },
      { status: 400 },
    );
  }
  const { email, role, tenantId, fullName } = parsed.data;

  // 3. Tenant-scoped admin guardrails:
  //    Non-super-admins can only invite into their own tenants.
  if (!hasRole(session, ["super_admin"])) {
    if (!tenantId || !session.tenantIds.includes(tenantId)) {
      return NextResponse.json(
        { ok: false, error: "cannot invite outside your tenant" },
        { status: 403 },
      );
    }
  }

  // 4. Send invite via Supabase Auth
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

  // 5. Pre-assign role (trigger handle_new_user already created profile row)
  const { error: roleError } = await admin.from("user_roles").insert({
    user_id: invited.user.id,
    role,
    tenant_id: tenantId,
  });
  if (roleError) {
    return NextResponse.json(
      { ok: false, error: `role assignment failed: ${roleError.message}` },
      { status: 500 },
    );
  }

  // 6. Audit
  await admin.from("audit_log").insert({
    actor_user_id: session.userId,
    action: "user.invited",
    target_table: "auth.users",
    target_id: invited.user.id,
    payload: { email, role, tenant_id: tenantId },
  });

  return NextResponse.json({
    ok: true,
    message: `Invited ${email} as ${role}.`,
    userId: invited.user.id,
  });
}
```

### Step 2.3 — Verify

Start the dev server, then test from another terminal:

```powershell
# As an UNAUTHED user (should get 401):
curl -X POST http://localhost:3000/api/admin/invite `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","role":"doctor","tenantId":null}'

# Expected: {"ok":false,"error":"unauthorized"}
```

Then sign in as an admin via `/sign-in` (you may need to manually set your `user_roles` row in the Supabase dashboard first — see Section 4 for the first-admin bootstrap), open browser DevTools → Application → Cookies → copy the `sb-...-auth-token`, and retry with that cookie.

Production-grade check: write a small UI in `/admin` to call this endpoint via fetch with credentials; that's the proper flow.

---

## Section 3 — RBAC verification matrix in `docs/RBAC.md` (~15 min)

Append a matrix at the end of `docs/RBAC.md` showing what every role can SELECT/INSERT/UPDATE/DELETE on each table. This is documentation, not code — but it's the ground truth your future RLS tests will follow.

Open `docs/RBAC.md` and append:

```markdown
## RBAC verification matrix

Legend: **S** = SELECT, **I** = INSERT, **U** = UPDATE, **D** = DELETE, blank = denied.

`anon` = unauthenticated visitor. `tenant-*` roles = scoped to the user's tenant via RLS helpers.

| Table | anon | patient | doctor | front_desk | manager | admin | super_admin |
|---|---|---|---|---|---|---|---|
| `tenants` |  |  |  |  | S | SIU | SIUD |
| `profiles` |  | S (self) | S (self+tenant) | S (tenant) | S (tenant) | SIU (tenant) | SIUD |
| `user_roles` |  | S (self) | S (self) | S (tenant) | S (tenant) | SIU (tenant) | SIUD |
| `specialties` | S | S | S | S | S | SIUD | SIUD |
| `clinics` | S | S | S (tenant) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `doctors` | S | S | SU (self) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `doctor_specialties` | S | S | SU (self) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `listings` | S | S | S (self) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `availability_slots` | S | S | SIU (self) | SIU (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `leads` | I (via RPC) | S (self) | S (tenant) | SIU (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `lead_events` |  | S (self lead) | S (tenant) | SI (tenant) | SI (tenant) | SI (tenant) | SIUD |
| `bookings` |  | S (self) | S (self) | SIU (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `reviews` | S | SI (self booking) | S (self) | S (tenant) | SU (tenant) | SIUD (tenant) | SIUD |
| `audit_log` |  |  |  |  | S (tenant) | S (tenant) | SIUD |

### How to verify

For each row, run two queries in a Supabase SQL editor session **set to each role's JWT** and compare against this matrix:

```sql
-- Example: verify anon can read specialties but not tenants
set local role anon;
select count(*) from specialties;      -- expect: 10
select count(*) from tenants;          -- expect: ERROR or 0 rows (RLS denies)

-- Example: as a patient
set local jwt.claims.sub = '<patient-user-id>';
set local role authenticated;
select count(*) from leads;            -- expect: only own leads
insert into leads (...) values (...);  -- expect: ERROR (use RPC instead)
```

Automated coverage of this matrix is **Phase 10** (Playwright + Supabase service-role seed → role-scoped client tests).
```

(Adjust table contents to match what your actual RLS policies in `supabase/migrations/20260616090100_tenancy_rbac.sql` + `20260616090200_directory.sql` + `20260616090300_leads_bookings.sql` enforce — if you discover a mismatch, the migration is the source of truth, update the matrix.)

### Verify

`docs/RBAC.md` opens cleanly and the table renders in your markdown previewer.

---

## Section 4 — Supabase Auth dashboard config (manual, ~5 min)

This is a one-time configuration the magic-link flow needs to work at all. There's no CLI for this — it's dashboard-only.

### Step 4.1 — Enable Email provider

1. Open https://supabase.com/dashboard/project/xwnrjpmktffnrldhkayf/auth/providers
2. Scroll to **Email** → click to expand
3. Toggle **Enable Email provider** = ON
4. Toggle **Confirm email** = OFF (magic-link doesn't need it; turn on later if you switch to password auth)
5. **Save**

### Step 4.2 — Set Site URL and redirect allowlist

1. Open https://supabase.com/dashboard/project/xwnrjpmktffnrldhkayf/auth/url-configuration
2. **Site URL** = `https://doctor-platform-tawny.vercel.app`
3. Under **Redirect URLs**, click **Add URL** for each:
   - `http://localhost:3000/auth/callback`
   - `https://doctor-platform-tawny.vercel.app/auth/callback`
   - `https://*-inceptionretreats-7739s-projects.vercel.app/auth/callback` (covers all preview deploys)
4. **Save**

### Step 4.3 — (Optional) Customize magic-link template

1. Open https://supabase.com/dashboard/project/xwnrjpmktffnrldhkayf/auth/templates
2. Pick **Magic Link**
3. Change the **Subject** to something branded like `Sign in to Doctor Platform`
4. **Save**

### Step 4.4 — Bootstrap the first admin

The first time you sign in, you'll have no `user_roles` row, so the role gates from Section 1 will redirect you to `/403`. To break this chicken-and-egg, manually insert a `super_admin` row for your account.

1. Go to `http://localhost:3000/sign-up`, enter your email + name, submit
2. Check your inbox, click the magic link → you'll land on `/dashboard` (or `/403` once Section 1 is wired)
3. In Supabase dashboard: https://supabase.com/dashboard/project/xwnrjpmktffnrldhkayf/sql/new
4. Run:

```sql
-- Find your user
select id, email from auth.users where email = 'YOUR_EMAIL_HERE';

-- Insert super_admin role (no tenant — platform-level)
insert into public.user_roles (user_id, role, tenant_id)
values ('<paste-id-from-above>', 'super_admin', null);
```

5. Refresh `/dashboard` — you should now have access to everything.

### Step 4.5 — Verify the full flow

1. `npm run dev` if not already running
2. Go to http://localhost:3000/sign-in in **incognito**
3. Submit your email
4. Open the magic link from your inbox in the same incognito window
5. Should land on `/dashboard` (or wherever `next` pointed)

If the link bounces with "Sign-in link is invalid or expired" — your callback URL allowlist is missing the one you're trying to use. Go back to Step 4.2.

---

## Final verification

After all 4 sections are done:

```powershell
npm run typecheck    # expect: clean
npm run build        # expect: clean, sign-in/sign-up/403/admin/invite routes generated
npm run dev          # background
```

Manual end-to-end:

1. Incognito → `/admin` → 307 to `/sign-in?next=%2Fadmin` ✅
2. Sign in as a non-admin user → `/admin` → 307 to `/403` ✅
3. Sign in as super_admin → `/admin` → 200 ✅
4. As super_admin, POST to `/api/admin/invite` with valid body → 200 + invited user appears in `auth.users` and has a row in `user_roles` ✅
5. Invited user clicks the email link → lands on `/dashboard` with their pre-assigned role active ✅

Once all 5 pass, Phase 1 is done. Commit and push:

```powershell
git add app/ lib/ docs/RBAC.md docs/PHASE1_COMPLETION.md
git commit -m "feat(auth): per-page RBAC enforcement, admin invite API, RBAC matrix"
git push origin main
```

GitHub auto-deploy is connected, so the push will trigger a Vercel build. Watch it at https://vercel.com/inceptionretreats-7739s-projects/doctor-platform/deployments.

Next: Phase 2 — replace lead modal demo with `create_lead()` RPC + replace `/dashboard` fixtures with live queries.
