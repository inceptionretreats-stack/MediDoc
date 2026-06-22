# Decision Log (append-only — never delete an entry)

Every meaningful decision, with date, what, why, and who. This is the project's memory. New
entries go at the top.

---

### 2026-06-16 — Initial product & tech decisions
- **Scope:** v1 = doctor **listing + lead capture + booking** only. Video consult, medicine,
  labs, payments are **deferred** to later phases (architect for them, don't build).
  *Why:* faster, cheaper launch; validate demand in Udaipur first.
- **Geography:** launch **Udaipur, Rajasthan**, then expand across India. *Why:* hyperlocal
  beachhead, easier doctor onboarding and supply density.
- **Stack:** Next.js (App Router) on **Vercel** + **Supabase** (Postgres/Auth/Storage/RLS/
  pgvector). *Why:* low cost, fast to ship, scales, great DX with the agent workflow.
- **AI:** **Vercel AI Gateway + AI SDK** with **tiered Claude** models (Haiku 4.5 / Sonnet 4.6 /
  Opus 4.8). Semantic search via pgvector. *Why:* one API + fallbacks + observability + cost
  control by routing cheap tasks to Haiku.
- **Compliance:** India **DPDP Act 2023**; ABDM/ABHA deferred. *Why:* matches market & launch.
- **Build process:** Claude Code (architect) + Codex (builder); MD memory; `.versions/` backups;
  MCP toolchain. *Why:* user's required workflow — never lose context, never overwrite blindly.

> Template for new entries:
> `### YYYY-MM-DD — <title>`
> `- **Decision:** … **Why:** … **By:** <agent/person>`
