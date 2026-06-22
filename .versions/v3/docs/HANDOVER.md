# HANDOVER - Live hand-off between Claude Code and Codex

> The agent that stops working updates this file so the next agent can pick up with zero
> guesswork. Keep it short and current. Overwrite the "Current state" each session; append to
> "History".

## Current state (latest)

- **Date:** 2026-06-17
- **From:** Codex
- **To:** Codex / Claude Code / next session
- **Version:** v2 frozen to `.versions/v2/`; Phase 1 local UI plus admin operations dashboard built.
- **Stage:** development, local-first UI deployed to Vercel. Supabase DB deploy is still blocked by
  project selection/free-project limit.

**What was just done**
- Built `/admin` fixture-backed Admin/Super Admin operations dashboard for doctor verification,
  review moderation, operating metrics, and audit preview.
- Added admin fixtures to `lib/demo-operations.ts`.
- Linked `/admin` from public search, staff dashboard, and onboarding flows.
- Tightened responsive action-button layouts across admin, staff, onboarding, and doctor-card rows.
- Created snapshot `.versions/v2/`.
- Updated docs: `DECISION_LOG.md`, `VERSIONING.md`, `.versions/README.md`, `CHANGELOG.md`,
  `dev-log.md`, `tasks.md`, `USER_FLOWS.md`, `API.md`, `PRD.md`, and this handover.

**Verification**
- `npm run typecheck` passed.
- `npm run lint` passed; note `next lint` deprecation warning for Next 16.
- `npm run build` passed locally; 12 static/SSG pages generated.
- Production-mode local validation passed on `http://127.0.0.1:3011/admin`: page 200, CSS 200,
  current build ID matched.
- Chrome DevTools Protocol mobile verification passed at 390px: CSS loaded, scroll width equals
  viewport width, and `hasOverflow=false`.
- Vercel production deploy passed. Current production alias:
  `https://doctor-platform-tawny.vercel.app`; latest deployment URL:
  `https://doctor-platform-nvyxypvib-thewebspell.vercel.app`.
- Live production `/admin` check passed with `curl --ssl-no-revoke -I`:
  `HTTP/1.1 200 OK`, `X-Matched-Path: /admin`, `X-Vercel-Cache: PRERENDER`.

**Integration IDs found**
- Vercel CLI team: `thewebspell` / `team_J6RRVVaSLMKbKLvxf3beewaN`.
- Vercel project: `doctor-platform` / `prj_TW5frDxjA3OEI5RigIrbS3POFpsg`.
- Latest Vercel deployment: `https://doctor-platform-nvyxypvib-thewebspell.vercel.app`.
- Stable Vercel alias: `https://doctor-platform-tawny.vercel.app`.
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
3. Codex wires the lead modal to the server action after schema/RLS is approved.

---

## History (append-only)

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
