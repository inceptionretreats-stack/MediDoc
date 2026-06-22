# HANDOVER - Live hand-off between Claude Code and Codex

> The agent that stops working updates this file so the next agent can pick up with zero
> guesswork. Keep it short and current. Overwrite the "Current state" each session; append to
> "History".

## Current state (latest)

- **Date:** 2026-06-22
- **From:** Claude Code
- **To:** Codex / Claude Code / next session
- **Version:** v4-db-live frozen to `.versions/v4-db-live/`; Supabase project is live and schema applied.
- **Stage:** Supabase DB live (project `xwnrjpmktffnrldhkayf` "MediDoc", region ap-south-1, Postgres 17). Vercel UI still serves fixtures — wiring to live DB starts in Phase 1.
- **Detailed context:** see `docs/SESSION_CONTEXT.md` and plan `C:\Users\Dell\.claude\plans\dreamy-mixing-book.md`.

**Phase 0 — completed 2026-06-22**
- Linked Supabase CLI to project `xwnrjpmktffnrldhkayf` (org `uxrkydqrcwuljilsvupc`, ap-south-1).
- Pushed all 4 migrations (`..._init`, `..._tenancy_rbac`, `..._directory`, `..._leads_bookings`).
- Seeded 10 specialties via `scripts/seed-specialties.mjs` (service-role upsert; idempotent).
- Regenerated `lib/types/database.ts` from live schema (896 lines, typecheck clean).
- Verified 14 tables present, RLS active (anon reads specialties, denied on tenants).
- Fixed `.mcp.json` filesystem path from `f:\Doctor` to `c:\web applications\Doctor\Doctor`.
- Snapshot `.versions/v4-db-live/` (2311 files).

**Phase 0 — still pending (manual)**
- Mirror `.env.local` secrets into Vercel project env (Production + Preview). Requires `vercel login` first. Keys to add: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL` (set to `https://doctor-platform-tawny.vercel.app`).

**Old current state (2026-06-17) follows for history:**

**What was just done**
- Ran multi-agent mode with three workers:
  - Worker A built `/booking`.
  - Worker B built `/roles`.
  - Worker C built `/ai-preview`.
- Integrated worker outputs and wired navigation between public search, dashboard, admin,
  onboarding, booking, role workspaces, and AI preview pages.
- Added deterministic local AI previews without model/API calls.
- Added booking lifecycle and SMS/WhatsApp/email notification preview without provider calls.
- Added Doctor, Manager, and Front-desk role dashboards without Auth/RLS-backed scoping.
- Cleaned `docs/USER_FLOWS.md` to ASCII and saved full session context in
  `docs/SESSION_CONTEXT.md`.
- Created snapshot `.versions/v3/`.
- Deployed v3 to Vercel production and verified live routes.

**Current local routes**
- `/` public directory/search and local lead request modal.
- `/doctors/[slug]` doctor profiles.
- `/dashboard` staff lead pipeline.
- `/onboarding` doctor listing draft.
- `/admin` Admin/Super Admin operations preview.
- `/booking` booking lifecycle and notification preview.
- `/roles` Doctor/Manager/Front-desk role workspaces.
- `/ai-preview` Smart Search, Lead-Form Assistant, and Symptom Triage previews.

**Verification**
- `npm run typecheck` passed.
- `npm run lint` passed; note `next lint` deprecation warning for Next 16.
- `npm run build` passed; 15 static/SSG pages generated.
- Production-mode local HTTP validation passed on `http://127.0.0.1:3012` for `/`, `/admin`,
  `/booking`, `/roles`, `/ai-preview`, `/dashboard`, `/onboarding`, and a doctor profile route.
- Chrome DevTools Protocol mobile verification passed at 390px for `/booking`, `/roles`, and
  `/ai-preview`: CSS loaded and `hasOverflow=false`.
- Vercel production deploy passed:
  `https://doctor-platform-pvtibebnf-thewebspell.vercel.app`; stable alias
  `https://doctor-platform-tawny.vercel.app`.
- Live HTTP validation returned 200 for `/`, `/admin`, `/booking`, `/roles`, `/ai-preview`,
  `/dashboard`, `/onboarding`, and a doctor profile route.

**Integration IDs found**
- Vercel CLI team: `thewebspell` / `team_J6RRVVaSLMKbKLvxf3beewaN`.
- Vercel project: `doctor-platform` / `prj_TW5frDxjA3OEI5RigIrbS3POFpsg`.
- Current production alias: `https://doctor-platform-tawny.vercel.app`.
- Latest deployed URL:
  `https://doctor-platform-pvtibebnf-thewebspell.vercel.app`.
- Vercel connector also exposes team `macsen-skyops` / `team_zddX0CBzjmFhTdPVUAgaQpIm`, but the
  connector is not authorized to the CLI deployment scope `thewebspell`.
- Supabase org: `naman24122-source's Org` / `udjqhpdqtflhvihtmnlf`.
- Existing Supabase projects:
  - `salespilot` / `celgudcdzicielgnckse` - active, unrelated existing schema.
  - `naman24122-source's Project` / `egrxtbnttrsokxdcezkg` - inactive, cannot restore while org is
    at the free active-project limit.

**Blocked**
- Creating dedicated Supabase project `doctor-platform` failed: the org reached the free active
  project limit.
- Do not apply Doctor Platform migrations to `salespilot`; it already has an unrelated app schema,
  including a conflicting `public.leads` table.
- Live lead persistence remains blocked until Claude/DB agent reviews and adds the `create_lead()`
  RPC plus any RLS changes.
- Auth/RBAC, production AI agents/prompts, notification providers, and compliance-sensitive writes
  remain outside Codex ownership under `AGENTS.md`.

**Run locally**
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill Supabase keys when a project is selected.
3. `npm run dev`

**This machine's npm needs a CA bundle**
Use `NODE_EXTRA_CA_CERTS=F:\Doctor\node-cacerts.pem` for npm/network commands when TLS inspection
causes `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. TLS verification stays enabled.

**Next**
1. User chooses Supabase path: upgrade Supabase, free an active project slot, provide another
   project ref/org, or explicitly accept the risk of using `salespilot` after backup/review.
2. Claude/DB agent adds reviewed `create_lead()` RPC and any RLS changes.
3. Codex wires live server actions after schema/RLS/Auth are approved.

---

## History (append-only)

- 2026-06-22 - Claude Code - Phase 0 unblocked: linked Supabase project `xwnrjpmktffnrldhkayf` (MediDoc, ap-south-1, Postgres 17), pushed 4 migrations, seeded 10 specialties, regenerated types, verified RLS, snapshot to `.versions/v4-db-live/`.
- 2026-06-17 - Codex - Multi-agent local UI completion: `/booking`, `/roles`, `/ai-preview`;
  local typecheck/lint/build and 390px CDP mobile verification passed. Session context saved to
  `docs/SESSION_CONTEXT.md`.
- 2026-06-17 - Codex - Deployed multi-agent v3 Vercel production app:
  `https://doctor-platform-pvtibebnf-thewebspell.vercel.app`; stable alias
  `https://doctor-platform-tawny.vercel.app`. Live route checks returned 200.
- 2026-06-17 - Codex - Phase 1 admin operations slice: `/admin` verification queue, review
  moderation, metrics and audit preview; local build and 390px CDP mobile verification passed.
- 2026-06-17 - Codex - Deployed updated Vercel production app:
  `https://doctor-platform-nvyxypvib-thewebspell.vercel.app`; stable alias
  `https://doctor-platform-tawny.vercel.app`.
- 2026-06-17 - Codex - Phase 1 local-first UI slice: directory/search, doctor profiles, lead modal
  preview, staff dashboard, onboarding draft; local verification passed. Supabase project creation
  blocked by free-project limit.
- 2026-06-17 - Codex - Deployed initial Vercel production app:
  `https://doctor-platform-au05dp7vx-thewebspell.vercel.app`.
- 2026-06-16 - Claude Code - Phase 0.1 + 0.2 built: Next.js foundation and multi-tenant Supabase
  schema/RLS migrations.
- 2026-06-16 - Claude Code - Created blueprint PDF (v0), docs scaffold, memory.
- 2026-06-16 - Claude Code - v1 Enterprise Governance Edition: multi-tenancy, 8-agent EOS,
  workflow/traceability, governance rulebook, full doc suite.
