# dev-log.md — What was built / changed / fixed

Newest first. One entry per work session.

## 2026-06-17 - Multi-agent phase: booking, roles and AI previews
**Built**
- Ran parallel worker agents for three independent local UI slices.
- Added `/booking` with appointment lifecycle preview, status controls, and SMS/WhatsApp/email
  reminder copy previews.
- Added `/roles` with Doctor, Manager, and Front-desk role workspaces using local controls.
- Added `/ai-preview` with deterministic Smart Search, Lead-Form Assistant, and Symptom Triage
  previews; no model/API calls.
- Integrated navigation across public, staff, admin, onboarding, booking, roles and AI preview
  surfaces.
- Snapshot: froze the integrated tree into `.versions/v3/`.
**Verification**
- `npm run typecheck` passed.
- `npm run lint` passed (existing Next 15 warning: `next lint` is deprecated for Next 16).
- `npm run build` passed; 15 static/SSG pages generated.
- Production-mode HTTP validation passed on `http://127.0.0.1:3012` for `/`, `/admin`,
  `/booking`, `/roles`, `/ai-preview`, `/dashboard`, `/onboarding`, and a doctor profile route.
- Chrome DevTools Protocol mobile verification passed at 390px for `/booking`, `/roles`, and
  `/ai-preview`: CSS loaded and `hasOverflow=false`.
- Vercel production deploy passed:
  `https://doctor-platform-pvtibebnf-thewebspell.vercel.app`; stable alias
  `https://doctor-platform-tawny.vercel.app`.
- Live HTTP validation returned 200 for `/`, `/admin`, `/booking`, `/roles`, `/ai-preview`,
  `/dashboard`, `/onboarding`, and a doctor profile route.
**Issues + fixes**
- Worker verification was incomplete because builds were interrupted during parallel work. Main
  thread reran repo-wide typecheck/lint/build and completed mobile route checks.
- Aligned new booking preview clinic names with the existing doctor fixture directory.
**Blocked / next**
- Supabase persistence remains blocked by the Supabase project decision and by schema/RLS/Auth/AI
  ownership boundaries.

## 2026-06-17 - Phase 1: admin operations dashboard
**Built**
- Added `/admin` local Admin/Super Admin operations dashboard for F4 review workflows.
- Added fixture data for doctor verification queue, review moderation, audit events, and platform
  metrics in `lib/demo-operations.ts`.
- Linked `/admin` from public search, staff dashboard, and onboarding flows.
- Tightened mobile action layouts across admin, staff, onboarding, and doctor cards so buttons stack
  on narrow screens instead of clipping.
- Snapshot: froze the current tree into `.versions/v2/` after local verification.
**Verification**
- `npm run typecheck` passed.
- `npm run lint` passed (existing Next 15 warning: `next lint` is deprecated for Next 16).
- `npm run build` passed; 12 static/SSG pages generated.
- Production-mode HTTP validation passed on `http://127.0.0.1:3011/admin`: page 200, CSS 200,
  current build ID matched, and the custom 420px breakpoint was removed.
- Chrome DevTools Protocol mobile verification passed at 390px: CSS loaded, viewport width 390,
  document scroll width 390, and `hasOverflow=false`. Screenshot:
  `.codex/admin-page-mobile-cdp.png`.
- Vercel production deploy passed:
  `https://doctor-platform-nvyxypvib-thewebspell.vercel.app`; stable alias
  `https://doctor-platform-tawny.vercel.app`. Live `/admin` returned `HTTP/1.1 200 OK`.
**Issues + fixes**
- Initial Chrome CLI screenshots were misleading because headless Chrome cropped a wider layout
  viewport into a narrow image. Switched to CDP device metrics for accurate mobile verification.
- A stale local server on an older port served an old CSS hash after rebuild; final checks used a
  fresh port with current `.next/BUILD_ID`.
**Blocked / next**
- Supabase production persistence remains blocked by project selection/free-project limit and by
  the Claude-owned `create_lead()` RPC/RLS review.

## 2026-06-17 - Phase 1: local-first public and staff MVP slice
**Built**
- Snapshot: froze the current Phase 0 / v1 tree into `.versions/v1/` before new work.
- Public directory/search UI on `/` with fixture-backed verified doctors, specialty/area/search
  filters, doctor cards, and lead-flow explanation.
- Doctor profile pages at `/doctors/[slug]` generated from local fixtures.
- Lead request modal with required fields, phone-shape validation, consent copy, local preview
  success state, and explicit boundary that persistence waits for the reviewed `create_lead()` RPC.
- Staff lead-pipeline dashboard at `/dashboard` with local lead status controls and booking cards.
- Doctor onboarding draft flow at `/onboarding` with local validation and verification/KYC boundary.
- Removed stale `create_lead` function typing from `lib/types/database.ts` until the migration/RPC
  exists.
**Verification**
- `npm run typecheck` passed.
- `npm run lint` passed (existing Next 15 warning: `next lint` is deprecated for Next 16).
- `npm run build` passed; 11 static/SSG pages generated.
- Browser verification passed in production mode on `http://127.0.0.1:3002`: home directory,
  search filter, lead modal preview, doctor profile route, dashboard status change, onboarding
  draft save.
- Vercel production deploy is Ready:
  `https://doctor-platform-au05dp7vx-thewebspell.vercel.app`
  (`doctor-platform`, project `prj_TW5frDxjA3OEI5RigIrbS3POFpsg`, team `thewebspell`).
**Issues + fixes**
- Existing dev servers on ports 3000/3001 served stale `.next` assets after rebuilds. Stopped them,
  rebuilt, and verified against a clean `next start` server on port 3002.
- Playwright browser binaries were missing; installed Chromium with `NODE_EXTRA_CA_CERTS` so TLS
  verification stayed enabled.
**Blocked / next**
- Supabase project creation failed because the org is at its free active-project limit. Need user
  choice: use/restore an existing project, pause/delete another project, upgrade, or provide a
  different Supabase project ref.
- Next backend step remains Claude-owned/schema-sensitive: implement and review `create_lead()` RPC,
  then wire the lead modal through a server action.

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
