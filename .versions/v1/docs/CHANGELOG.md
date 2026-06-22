# CHANGELOG

All notable changes to the Doctor Platform. Newest first. (Keep-a-Changelog style.)

## [Unreleased] — development (local)
### Added
- **Phase 0.1 project foundation:** Next.js 15 (App Router) + TypeScript strict + Tailwind v4 +
  shadcn (new-york). Config, lib layer (env/constants/utils/Supabase clients), brand theme,
  landing page, design-system Button.
- **Phase 0.2 database foundation:** multi-tenant Supabase schema (tenant = clinic/hospital) as
  ordered migrations — tenancy/RBAC with security-definer RLS helpers, directory
  (specialties/clinics/doctors/listings/slots), leads/bookings/reviews/audit_log. RLS on every
  table; public read for verified/live records. `config.toml` + specialty seed.
- Verified the app runs on **localhost** (http://localhost:3000).
### Notes
- Client approved the v1 proposal; coding on local PC. Live Vercel link + Supabase connection
  await the user's Vercel + Supabase IDs.

## [v1] — 2026-06-16 — Enterprise Governance Edition (research/proposal)
### Added
- Multi-tenancy model (clinic/hospital = tenant): `tenant_id` on every table, tenant-scoped RLS.
- Engineering Operating System: 8-agent roster (`AGENT-ROSTER.md`).
- Delivery workflow & traceability model (`WORKFLOW.md`).
- Documentation system + skills-first rule (PDF Ch. 17).
- Full governance rulebook (`GOVERNANCE.md`, PDF Ch. 18).
- New required docs: `CHANGELOG.md`, `dev-log.md`, `tasks.md`, `USER_FLOWS.md`, `API.md`.
- Blueprint PDF expanded to v1 (20 chapters); cover marked v1.
### Changed
- `DECISION-LOG.md` → `DECISION_LOG.md` (underscore naming convention).
- RBAC, Data Model, Security chapters now include tenant isolation.
### Backup
- Previous version snapshotted to `.versions/v0/`.
### Notes
- **Stage:** research/proposal. No application code yet — coding begins after client approval.

## [v0] — 2026-06-16
### Added
- Initial research + master blueprint PDF (16 chapters) and `/docs` scaffold.
