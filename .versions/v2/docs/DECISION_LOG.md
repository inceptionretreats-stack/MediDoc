# Decision Log (append-only — never delete an entry)

### 2026-06-17 - Phase 1 local-first implementation
- **Decision:** freeze the current Phase 0 / v1 working tree into `.versions/v1/` before Phase 1
  implementation. **Why:** follows the backup-before-new-version rule and preserves Claude Code's
  schema/UI foundation. **By:** Codex.
- **Decision:** implement Phase 1 UI as local-first fixture-backed flows before live Supabase
  persistence. **Why:** the account email is not a project credential, and creating a new Supabase
  project is currently blocked by the org free-project limit. **By:** Codex.
- **Decision:** do not apply Doctor Platform migrations to existing Supabase projects `salespilot`
  or `naman24122-source's Project` without explicit user selection. **Why:** prevents accidental
  schema/data changes to unrelated projects. **By:** Codex.
- **Decision:** deploy the local-first Phase 1 app to Vercel project `doctor-platform`
  (`prj_TW5frDxjA3OEI5RigIrbS3POFpsg`) under team `thewebspell`
  (`team_J6RRVVaSLMKbKLvxf3beewaN`). **Why:** Vercel CLI authentication exposed this team and the
  build was locally verified. **By:** Codex.

Every meaningful decision, with date, what, why, and who. This is the project's memory. New
entries go at the top.

---

### 2026-06-16 — Phase 0.2 schema & RLS design
- **Decision:** model **tenant = clinic/hospital org**; `tenant_id` (or a tenant-bearing FK) on
  every operational table; isolation via RLS. **Why:** enterprise multi-tenancy without per-tenant
  DBs; matches the blueprint. **By:** Database Agent (Claude Code).
- **Decision:** enforce RLS with **security-definer helper functions**
  (`is_platform_admin / is_super_admin / is_tenant_member / has_tenant_role`) and wrap
  `auth.uid()` in subqueries. **Why:** avoids recursive RLS on `user_roles` and is 100×-faster per
  Supabase guidance. **By:** Database Agent.
- **Decision:** public (anon) read limited to **verified doctors / live listings / open slots /
  approved reviews**; everything operational is tenant- or owner-scoped (deny by default). **By:** Security.
- **Decision:** public/anon **lead intake deferred to a security-definer `create_lead()` RPC**
  (Phase 1); no direct anon INSERT on `leads`. **Why:** validate + rate-limit server-side; don't
  expose raw inserts. **By:** Architect.
- **Decision:** run/verify on **localhost first** before any live deploy (user instruction).
- **Deferred:** Vercel live link + Supabase connection until the user shares their Vercel +
  Supabase IDs.

### 2026-06-16 — Phase 0.1 build + npm TLS fix
- **Decision:** foundation stack = Next.js 15 (App Router) + TS strict + Tailwind v4 + shadcn
  (new-york); Supabase via `@supabase/ssr` (env-based, RLS-safe). **Why:** matches the approved
  blueprint; builds & runs locally without MCP. **By:** Architect (Claude Code).
- **Decision:** resolve npm `UNABLE_TO_VERIFY_LEAF_SIGNATURE` by exporting the machine's trusted
  root CAs to `node-cacerts.pem` and using `NODE_EXTRA_CA_CERTS` — **rejected** disabling
  `strict-ssl`. **Why:** keeps full TLS verification (security first) while trusting the local
  SSL-inspection proxy the machine already trusts. **By:** Architect.
- **Verification:** `typecheck` + `build` green (4 static pages).

### 2026-06-16 — v1 Engineering Operating System & multi-tenancy
- **Decision:** keep v1 product scope unchanged (listing + leads + booking); treat the new rulebook
  as platform-wide **governance**, not a scope change. **Why:** stay shippable; rules are
  forward-looking. **By:** PM/Architect (Claude Code).
- **Decision:** **multi-tenant** model where a **clinic/hospital = tenant**; `tenant_id` on every
  table; all RLS tenant-scoped. **Why:** enterprise isolation like Practo Ray; no cross-tenant
  leakage. **By:** Architect.
- **Decision:** adopt the **8-agent Engineering Operating System** + linear delivery workflow +
  full traceability; every feature updates PRD/CHANGELOG/USER_FLOWS/API + tests + migration +
  handover. **Why:** correctness, auditability, nothing forgotten. **By:** PM.
- **Decision:** rulebook lives **both** in the PDF (Ch. 18) and `docs/GOVERNANCE.md`. **Why:** PDF
  for humans/clients, markdown for agents. **By:** Documentation.
- **Decision:** standardize on **`DECISION_LOG.md`** (underscore) naming. **Why:** match the
  Engineering OS spec; consistency. **By:** Documentation.
- **Decision:** remain at **research/proposal stage** — no application code until the client
  approves the proposal. **Why:** client approval gate. **By:** PM.
- **Backup:** v0 snapshotted to `.versions/v0/` before this update.

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
