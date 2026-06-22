# API.md — Endpoint & Contract Reference

> Research-stage contract sketch. Filled in per feature during build. All inputs/outputs validated
> (zod); consistent response envelope; tenant + role enforced server-side; failures logged.

## Response envelope (all endpoints)
```jsonc
// success
{ "ok": true, "data": { /* ... */ } }
// error
{ "ok": false, "error": { "code": "string", "message": "string" } }
```

## Surfaces (planned)
| Surface | Examples | Auth |
|---------|----------|------|
| Lead intake | `submitLead()`, `verifyOtp()` | public + OTP, rate-limited |
| Search / AI | `POST /api/search`, `POST /api/triage` | public, rate-limited |
| Lead ops | `assignLead()`, `updateLeadStatus()` | Manager/Admin (RLS, tenant) |
| Booking | `createBooking()`, `reschedule()`, `cancel()` | staff / patient (own) |
| Listing | `upsertListing()`, `verifyDoctor()` | Doctor / Admin (tenant) |
| Webhooks | `/api/webhooks/sms`, `/api/webhooks/whatsapp` | signed |
| Cron | reminder dispatch, SLA escalation, daily digest | Vercel Cron (secret) |

## Current implementation notes
- 2026-06-17: public search/listing, doctor profile, lead modal preview, onboarding draft, and
  staff/admin dashboard screens are fixture-backed UI only.
- `create_lead()` is intentionally not present in the current migrations or generated DB types.
  It remains the next schema/RPC handoff before public lead persistence.
- No live mutation endpoint is exposed yet; this preserves the RLS/security boundary while
  Supabase project selection is blocked.

## Rules
- Validate every request **and** response · never trust FE input · proper error handling ·
  authn + authz on every call · rate-limit sensitive endpoints · log failures · version breaking
  changes · every mutation writes `audit_log` / `lead_events` and is tenant-scoped.
