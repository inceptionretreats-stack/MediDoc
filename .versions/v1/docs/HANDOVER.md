# HANDOVER — Live hand-off between Claude Code ↔ Codex

> The agent that stops working updates this file so the next agent (or a future you) can pick up
> with zero guesswork. Keep it short and current. Overwrite the "Current state" each session;
> append to "History".

## Current state (latest)

- **Date:** 2026-06-16
- **From:** Claude Code
- **To:** Codex / next session
- **Version:** v1 approved → **Phase 0.1 + 0.2 built**, running on localhost.
- **Stage:** development, local-first. Live deploy + Supabase connection **await user's IDs**.

**What was just done (Phase 0.1 + 0.2)**
- 0.1: Next.js 15 + TS strict + Tailwind v4 + shadcn foundation, `lib/`, brand theme, landing, Button.
- 0.2: **multi-tenant Supabase schema + RLS** in `supabase/migrations/` (tenancy/RBAC helpers,
  directory, leads/bookings/reviews/audit), `config.toml`, specialty seed.
- Ran on **localhost**: http://localhost:3000 → 200 OK (dev server may still be running in bg).
- Logged in `dev-log.md`, `tasks.md`, `CHANGELOG.md`, `DECISION_LOG.md`.

**Waiting on the user**
- **Vercel ID** → `NODE_EXTRA_CA_CERTS=f:/Doctor/node-cacerts.pem vercel deploy` for the live link.
- **Supabase project** (URL + anon + service keys, region near India) → fill `.env.local`,
  `supabase db push`, regenerate `lib/types/database.ts`.

**Next after IDs:** Phase 1 — public search/listing pages, the lead popup + `create_lead()` RPC.

**Build status:** ✅ `typecheck` + `build` pass (verified).

**Run locally**
1. `npm install`  2. copy `.env.example` → `.env.local` and fill Supabase keys  3. `npm run dev`.

**⚠ This machine's npm needs a CA bundle** (SSL-inspecting antivirus/proxy → `UNABLE_TO_VERIFY_LEAF_SIGNATURE`).
Either prefix commands with `NODE_EXTRA_CA_CERTS=f:/Doctor/node-cacerts.pem`, or set it once:
`setx NODE_EXTRA_CA_CERTS "f:\Doctor\node-cacerts.pem"` (then reopen the terminal). The PEM is the
machine's own trusted roots, exported locally; it is gitignored. TLS verification stays enabled.

**What's next (start of v1 MVP)**
1. Initialise Next.js (App Router) + Supabase project; wire env vars & `.mcp.json`.
2. Create the Supabase schema + RLS from `docs/ARCHITECTURE.md` (Claude Code owns this).
3. Build the public listing + search pages and the **lead popup form** (Codex, after schema).
4. Stand up Auth + the RBAC dashboards (Super Admin / Admin / Manager / Doctor / Front-desk).
5. Wire the first two AI agents (Smart Search & Lead-Form Assistant) via Vercel AI Gateway.

**Open questions / decisions needed**
- Confirm SMS/WhatsApp provider (MSG91 vs Gupshup vs Twilio) for Udaipur launch.
- Confirm Supabase region (closest low-latency to India).

**Don't forget**
- Snapshot to `.versions/` before the first version bump.
- Log every decision in `docs/DECISION_LOG.md`.

---

## History (append-only)

- 2026-06-16 — Claude Code — Created blueprint PDF (v0), docs scaffold, memory.
- 2026-06-16 — Claude Code — v1 Enterprise Governance Edition: multi-tenancy, 8-agent EOS,
  workflow/traceability, governance rulebook, full doc suite. Next: client approval → Phase 0.
