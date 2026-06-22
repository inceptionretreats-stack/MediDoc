# HANDOVER - Live hand-off between Claude Code and Codex

> The agent that stops working updates this file so the next agent can pick up with zero
> guesswork. Keep it short and current. Overwrite the "Current state" each session; append to
> "History".

## Current state (latest)

- **Date:** 2026-06-17
- **From:** Codex
- **To:** Codex / Claude Code / next session
- **Version:** v1 frozen to `.versions/v1/`; Phase 1 local-first UI slice built.
- **Stage:** development, local-first. Vercel deploy can proceed; Supabase DB deploy is blocked by
  project selection/free-project limit.

**What was just done (Phase 1 local-first UI)**
- Built public directory/search on `/` with fixture-backed verified doctors and filters.
- Built doctor profile routes at `/doctors/[slug]`.
- Built lead request modal with local validation, consent copy, and local preview success state.
- Built staff lead pipeline at `/dashboard` and doctor onboarding draft flow at `/onboarding`.
- Removed stale `create_lead` RPC typing from `lib/types/database.ts` until the migration exists.
- Snapshot created: `.versions/v1/`.
- Docs updated: `DECISION_LOG.md`, `VERSIONING.md`, `CHANGELOG.md`, `dev-log.md`, `tasks.md`,
  `USER_FLOWS.md`, `API.md`, `PRD.md`.

**Verification**
- `npm run typecheck` passed.
- `npm run lint` passed; note `next lint` deprecation warning for Next 16.
- `npm run build` passed; 11 static/SSG pages generated.
- Browser checks passed on production server `http://127.0.0.1:3002`: home directory, search
  filter, lead modal preview, doctor profile route, dashboard status change, onboarding draft save.

**Integration IDs found**
- Vercel CLI team: `thewebspell` / `team_J6RRVVaSLMKbKLvxf3beewaN`.
- Vercel project: `doctor-platform` / `prj_TW5frDxjA3OEI5RigIrbS3POFpsg`.
- Vercel deployment: `https://doctor-platform-au05dp7vx-thewebspell.vercel.app` (Ready).
- Vercel connector also exposed team: `macsen-skyops` / `team_zddX0CBzjmFhTdPVUAgaQpIm`, but the
  CLI login used for deployment belongs to `thewebspell`.
- Supabase org: `naman24122-source's Org` / `udjqhpdqtflhvihtmnlf`.
- Existing Supabase projects: `salespilot` / `celgudcdzicielgnckse` (active),
  `naman24122-source's Project` / `egrxtbnttrsokxdcezkg` (inactive).

**Blocked**
- Creating new Supabase project `doctor-platform` in `ap-south-1` failed: org has reached the free
  active-project limit. Do not apply Doctor migrations to `salespilot` or the inactive project
  without explicit user choice.
- Live lead persistence remains blocked until Claude-owned/reviewed `create_lead()` RPC and server
  action are added.

**Run locally**
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill Supabase keys when a project is selected.
3. `npm run dev`

**This machine's npm needs a CA bundle**
Use `NODE_EXTRA_CA_CERTS=F:\Doctor\node-cacerts.pem` for npm/network commands when TLS inspection
causes `UNABLE_TO_VERIFY_LEAF_SIGNATURE`. TLS verification stays enabled.

**Next**
1. User chooses Supabase path: restore/use existing inactive project, use `salespilot`, pause/delete
   or upgrade another project, or provide another project ref.
2. Claude/DB agent adds reviewed `create_lead()` RPC and any RLS changes; Codex wires the modal via
   server action after schema is fixed.

---

## History (append-only)

- 2026-06-17 - Codex - Phase 1 local-first UI slice: directory/search, doctor profiles, lead modal
  preview, staff dashboard, onboarding draft; local verification passed. Supabase project creation
  blocked by free-project limit.
- 2026-06-17 - Codex - Deployed Vercel production app:
  `https://doctor-platform-au05dp7vx-thewebspell.vercel.app`.
- 2026-06-16 - Claude Code - Phase 0.1 + 0.2 built: Next.js foundation and multi-tenant Supabase
  schema/RLS migrations.
- 2026-06-16 - Claude Code - Created blueprint PDF (v0), docs scaffold, memory.
- 2026-06-16 - Claude Code - v1 Enterprise Governance Edition: multi-tenancy, 8-agent EOS,
  workflow/traceability, governance rulebook, full doc suite.
