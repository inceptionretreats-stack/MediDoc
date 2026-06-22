# tasks.md — Pending / Completed / Next

## Next priority
- [ ] **Choose Supabase project path**: current org cannot create another free project. Options:
      restore/use `naman24122-source's Project`, use `salespilot`, pause/delete/upgrade an existing
      project, or provide another Supabase project ref.
- [x] Deploy the verified local-first app to Vercel production.

## Pending (Phase 0 setup)
- [ ] (On Supabase ID) create project, fill `.env.local`, `supabase db push`, regen
      `lib/types/database.ts`, wire `.mcp.json`.
- [ ] (On Vercel ID) `vercel deploy` → live preview URL (use `NODE_EXTRA_CA_CERTS`).
- [ ] Auth + session middleware (`middleware.ts`) using `@supabase/ssr`.
- [ ] CI/CD (Vercel) + migrations pipeline.
- [ ] Decide SMS/WhatsApp provider (MSG91 / Gupshup / Twilio) + Supabase region (India).

## Pending (Phase 1 MVP — after DB is live)
- [x] Local-first public listing + search pages with fixture-backed verified doctors.
- [x] Local-first Admin/Super Admin operations dashboard for verification, moderation, metrics and
      audit preview.
- [x] Local-first booking lifecycle and notification preview (`/booking`).
- [x] Local-first Doctor/Manager/Front-desk role workspaces (`/roles`).
- [x] Local-first AI-assist previews for Smart Search, Lead-Form Assistant and Symptom Triage
      (`/ai-preview`).
- [ ] **Lead popup form** + `create_lead()` security-definer RPC (public/anon intake).
- [ ] RBAC dashboards; AI agents v1 (Smart Search, Lead-Form Assistant).

## Pending (Phase 1 MVP)
- [ ] Doctor onboarding & listing · search · **lead popup** · lead pipeline · booking.
- [ ] RBAC dashboards (Super Admin / Admin / Manager / Doctor / Front-desk).
- [ ] AI agents v1: Smart Search + Lead-Form Assistant (Vercel AI Gateway).

## Completed
- [x] v0 research + master blueprint PDF + docs scaffold + memory.
- [x] v1 update: multi-tenancy, 8-agent EOS, workflow/traceability, governance rulebook, doc suite.
- [x] Backup v0 → `.versions/v0/`.
- [x] Client approval of v1 proposal → build started.
- [x] **Phase 0.1** — Next.js + TS + Tailwind v4 + shadcn foundation; lib + design-system Button.
- [x] **Phase 0.2** — multi-tenant Supabase schema + RLS migrations, config, seed.
- [x] Ran on **localhost** first (http://localhost:3000, 200 OK).
- [x] **Phase 1 local-first UI slice** — directory/search, doctor profiles, lead modal preview,
      staff dashboard, onboarding draft flow; verified locally in production mode.
- [x] **Phase 1 admin operations slice** - `/admin` verification queue, review moderation,
      operating metrics and audit preview; verified locally in production mode.
- [x] **Multi-agent local UI completion** - `/booking`, `/roles`, `/ai-preview`; verified locally
      in production mode.
- [x] Vercel production deployment ready:
      `https://doctor-platform-tawny.vercel.app` (latest:
      `https://doctor-platform-pvtibebnf-thewebspell.vercel.app`).
