# dev-log.md — What was built / changed / fixed

Newest first. One entry per work session.

## 2026-06-16 — Phase 0.2: database foundation + localhost run
**Built**
- Multi-tenant schema as ordered migrations in `supabase/migrations/`:
  `..._init` (extensions, enums, `set_updated_at`), `..._tenancy_rbac` (tenants, profiles,
  user_roles, `handle_new_user` trigger, security-definer RLS helpers, RLS), `..._directory`
  (specialties, clinics, doctors, doctor_specialties, listings, availability_slots, RLS),
  `..._leads_bookings` (leads, lead_events, bookings, reviews, audit_log, RLS).
- `supabase/config.toml` + `supabase/seed.sql` (10 specialties).
- **Tenant = clinic/hospital**; `tenant_id` on every operational table; RLS via
  `is_platform_admin / is_super_admin / is_tenant_member / has_tenant_role` (security definer,
  `auth.uid()` wrapped in subqueries per Supabase perf guidance); FK + RLS columns indexed.
- Public read only for verified doctors / live listings / open slots / approved reviews.
- Ran the app **on localhost first**: `npm run dev` → http://localhost:3000 → `GET / 200`, clean.
- Reused the **supabase-postgres-best-practices** skill (skills-first rule).
**Issues + fixes**
- Vercel CLI install + `whoami` hit the same `UNABLE_TO_VERIFY_LEAF_SIGNATURE`; same
  `NODE_EXTRA_CA_CERTS` bundle is the fix.
**Decisions / deferred**
- Public/anon lead intake (popup form) → Phase 1 via a security-definer `create_lead()` RPC;
  direct anon INSERT on `leads` is denied (deny by default).
- `ai_runs`, `notifications`, `doctor_embeddings` (pgvector) deferred to their feature steps.
**Blocked / next**
- Live Vercel link + Supabase connection **await the user's Vercel + Supabase IDs**.
- Migrations are ready to `supabase db push` once the project exists; then regenerate
  `lib/types/database.ts`.

## 2026-06-16 — Phase 0.1: project foundation (build starts — local)
**Built**
- Client approved the v1 proposal → development begun on local PC (MCP access to come later).
- Next.js 15 (App Router) + TypeScript **strict** + Tailwind **v4** + shadcn (new-york) scaffold.
- Config: `package.json`, `tsconfig.json` (`@/*` paths, `noUncheckedIndexedAccess`),
  `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `components.json`, `.gitignore`,
  `.env.example`.
- Library layer: `lib/utils.ts` (cn), `lib/constants.ts` (roles, statuses, app config),
  `lib/env.ts` (zod-validated, lazy), `lib/supabase/{client,server}.ts` (@supabase/ssr, RLS-safe),
  `lib/types/database.ts` (stub — regenerate after first migration).
- UI: `app/globals.css` (brand teal tokens), `app/layout.tsx`, `app/page.tsx` (landing),
  `components/ui/button.tsx`.
- Reused the **shadcn-ui** skill for the setup (skills-first rule).
**Verification:** `npm run typecheck` ✓ · `npm run build` ✓ (4 static pages, ~103 kB first load).
**Issues + fixes**
- Env validation made lazy (call-time, not import-time) so the app builds without secrets.
- `lib/supabase/server.ts`: typed the `setAll` cookie param with `CookieOptions` (strict mode).
- **npm install blocked by `UNABLE_TO_VERIFY_LEAF_SIGNATURE`** (machine has SSL-inspecting
  antivirus/proxy). Fixed *securely* by exporting the Windows trusted roots to
  `node-cacerts.pem` (gitignored) and running npm/build with
  `NODE_EXTRA_CA_CERTS=f:/Doctor/node-cacerts.pem` — TLS verification stays ON.
**Next**
- Phase 0.2: Supabase schema + **tenant-scoped RLS** migrations (Database Agent) — will use the
  `supabase-postgres-best-practices` skill.

## 2026-06-16 — v1 Enterprise Governance Edition (research stage)
**Built/changed**
- Backed up v0 → `.versions/v0/`.
- Updated blueprint to v1: multi-tenancy woven in; added 4 chapters (Agent Roster, Workflow &
  Traceability, Documentation System, Governance Rulebook); cover/TOC bumped.
- Created `GOVERNANCE.md`, `AGENT-ROSTER.md`, `WORKFLOW.md` and the required suite
  (`CHANGELOG.md`, `dev-log.md`, `tasks.md`, `USER_FLOWS.md`, `API.md`).
- Renamed `DECISION-LOG.md` → `DECISION_LOG.md`.
**Issues + fixes**
- None — documentation/proposal only; no code generated (awaiting client approval).
**Next**
- On approval: Phase-0 setup (Next.js + Supabase init, base schema + tenant RLS).

## 2026-06-16 — v0
- Initial research, blueprint PDF, docs scaffold, memory saved.
