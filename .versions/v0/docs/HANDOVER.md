# HANDOVER — Live hand-off between Claude Code ↔ Codex

> The agent that stops working updates this file so the next agent (or a future you) can pick up
> with zero guesswork. Keep it short and current. Overwrite the "Current state" each session;
> append to "History".

## Current state (latest)

- **Date:** 2026-06-16
- **From:** Claude Code
- **To:** Codex / next session
- **Version:** v0 (planning) → next is v1 (MVP build)

**What was just done**
- Research + master blueprint produced: `Doctor_Platform_Blueprint.pdf`.
- Project docs scaffolded: `README.md`, `CLAUDE.md`, `AGENTS.md`, `.mcp.json`, `docs/*`.
- Memory & rules saved.

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
- Log every decision in `docs/DECISION-LOG.md`.

---

## History (append-only)

- 2026-06-16 — Claude Code — Created blueprint PDF, docs scaffold, memory. Next: start v1 MVP.
