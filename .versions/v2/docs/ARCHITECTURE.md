# System & Data Architecture

## High-level
```
Patient / Staff browser
        │  (HTTPS)
        ▼
Next.js App Router on Vercel  ──►  Vercel AI Gateway ──► Claude (Haiku/Sonnet/Opus)
 ├─ Public SEO pages (SSR/ISR)
 ├─ Role dashboards (RSC + client)
 ├─ Server Actions / Route Handlers  ──►  Supabase
 └─ Lead popup + booking engine            ├─ Postgres (+ RLS, pgvector)
                                           ├─ Auth (JWT, roles)
                                           ├─ Storage (photos, docs)
                                           └─ Realtime (lead/booking updates)
        │
        └──► SMS / WhatsApp / Email provider (MSG91 / Gupshup / Twilio)
```

## Components
- **Frontend:** Next.js App Router; public doctor/specialty pages use **ISR** for SEO; dashboards
  use React Server Components + minimal client JS. Mobile-first.
- **Backend:** Server Actions for mutations + Route Handlers for webhooks/AI; runs on Vercel
  **Fluid Compute** (full Node.js, low cold-starts).
- **Database:** Supabase Postgres. **RLS on every table.** `pgvector` for embeddings. Realtime for
  live lead/booking updates on dashboards.
- **Auth & RBAC:** Supabase Auth; role stored in a `profiles`/`user_roles` row; enforced by RLS
  + server checks. See `docs/RBAC.md`.
- **AI:** Vercel AI Gateway + AI SDK; agents in `agents/`. See `docs/AI-AGENTS.md`.
- **Messaging:** provider behind a thin adapter so we can swap MSG91/Gupshup/Twilio.

## Core tables (sketch)
`profiles` · `user_roles` · `clinics` · `doctors` · `specialties` · `doctor_specialties` ·
`listings` · `availability_slots` · `leads` · `lead_events` · `bookings` · `reviews` ·
`notifications` · `doctor_embeddings` (pgvector) · `ai_runs` · `audit_log`.

Conventions: snake_case; every table has `id uuid pk`, `created_at`, `updated_at`; money in
**paise (int)**; times in UTC stored, displayed `Asia/Kolkata`; phones **E.164**.

Key relationships: a `clinic` has many `doctors`; a `doctor` has many `listings`,
`availability_slots`, `leads`, `bookings`, `reviews`; a `lead` may convert to a `booking`; every
`lead`/`booking` carries scoping ids (`owner_doctor_id`, `clinic_id`, `assigned_manager_id`,
`patient_id`) used by RLS.

## Environments & secrets
- Vercel **Preview** (per-branch) + **Production**; Supabase project per environment (or branch
  DBs). Secrets in Vercel/Supabase env vars — never in code. Migrations in `supabase/migrations`.

## Deployment
Git push → Vercel preview deploy → review → promote to production. Supabase migrations applied via
CI or the Supabase MCP in a scoped write session. Rollback = redeploy previous Vercel build +
down-migration if needed.

## Future hooks (don't build yet, leave room)
Teleconsult (video), payments, e-prescriptions, lab/medicine modules, ABDM/ABHA, multi-city.
