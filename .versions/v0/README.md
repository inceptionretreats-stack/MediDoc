# Doctor Platform — Listing • Leads • Booking

An AI-first doctor **listing + lead-capture + appointment-booking** portal for **Udaipur,
Rajasthan** (expanding across India). Inspired by Practo & Apollo247, scoped tight for v1.

> 📘 The full master blueprint is **`Doctor_Platform_Blueprint.pdf`** in this folder. Start there.

## What it does (v1)

1. **Doctors/clinics** create an account and build a public **listing** (profile, specialties,
   fees, location, hours, photos, verification).
2. **Patients** browse & search doctors (filters + AI smart search).
3. Patient taps **Call / Book** → a **popup form** opens → they submit details → this becomes a
   **LEAD**.
4. **Admin / Manager / Doctor / Front-desk** work the lead through a pipeline and convert it into
   a confirmed **booking** (with reminders).

Out of scope for v1 (future phases): video consultation, e-prescriptions, medicine delivery, lab
tests, payments. The architecture leaves hooks for all of them.

## Tech stack

| Layer        | Choice |
|--------------|--------|
| Frontend     | Next.js (App Router) on **Vercel** (Fluid Compute) |
| Backend      | Next.js Server Actions + Vercel Functions |
| Database     | **Supabase** Postgres + Auth + Storage + RLS + pgvector + Realtime |
| AI           | **Vercel AI Gateway + AI SDK**, tiered **Claude** models (Haiku/Sonnet/Opus) |
| Search       | Hybrid keyword + vector (pgvector embeddings) |
| Messaging    | SMS / WhatsApp (MSG91 / Gupshup / Twilio) |
| Compliance   | India **DPDP Act 2023**; ABDM/ABHA = future |

## Repository layout

```
f:\Doctor\
├─ README.md                      ← you are here
├─ CLAUDE.md                      ← instructions for Claude Code
├─ AGENTS.md                      ← instructions for Codex
├─ .mcp.json                      ← MCP servers shared by the agents
├─ Doctor_Platform_Blueprint.pdf  ← master spec (research + architecture)
├─ docs/
│  ├─ PRD.md                      ← product requirements
│  ├─ ARCHITECTURE.md             ← system & data architecture
│  ├─ RBAC.md                     ← roles + permission matrix
│  ├─ AI-AGENTS.md                ← the 5 AI agents + LLM choice
│  ├─ MCP.md                      ← MCP setup & policy
│  ├─ HANDOVER.md                 ← live hand-off between Claude Code ↔ Codex
│  ├─ DECISION-LOG.md             ← dated log of every decision (never delete)
│  └─ VERSIONING.md               ← backup-before-new-version discipline
├─ .versions/                     ← snapshots of old versions (vN) before each new build
└─ app/ components/ lib/ supabase/ agents/   ← code (created during build)
```

## Working rules (read before any change)

- **Log every decision** in `docs/DECISION-LOG.md`.
- **Snapshot the current version into `.versions/vN`** before starting a new version (see
  `docs/VERSIONING.md`).
- **Keep `docs/HANDOVER.md` current** so the other agent can pick up cleanly.
- **Stay consistent** — naming, folder structure, and conventions are uniform everywhere.
- **Use MCP** (see `.mcp.json` / `docs/MCP.md`) instead of ad-hoc scripts where possible.
