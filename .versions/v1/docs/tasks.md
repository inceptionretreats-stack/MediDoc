# tasks.md — Pending / Completed / Next

## Next priority
- [ ] **Awaiting user's Vercel + Supabase IDs** → then: deploy live link + `supabase db push`.

## Pending (Phase 0 setup)
- [ ] (On Supabase ID) create project, fill `.env.local`, `supabase db push`, regen
      `lib/types/database.ts`, wire `.mcp.json`.
- [ ] (On Vercel ID) `vercel deploy` → live preview URL (use `NODE_EXTRA_CA_CERTS`).
- [ ] Auth + session middleware (`middleware.ts`) using `@supabase/ssr`.
- [ ] CI/CD (Vercel) + migrations pipeline.
- [ ] Decide SMS/WhatsApp provider (MSG91 / Gupshup / Twilio) + Supabase region (India).

## Pending (Phase 1 MVP — after DB is live)
- [ ] Public listing + search pages (read verified doctors/live listings).
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
