# Product Requirements — Doctor Platform v1

## Goal
Help patients in Udaipur find the right doctor fast, and help doctors/clinics capture and convert
those patients as **leads** and **bookings** — with AI assisting at every step.

## Personas
- **Patient** — searching for a doctor by problem/specialty/location; wants quick contact/booking.
- **Doctor / Clinic owner** — wants visibility, qualified leads, and a simple booking calendar.
- **Front-desk / Receptionist** — handles the clinic's incoming leads & bookings.
- **Manager** — oversees a set of doctors/clinics, distributes & follows up leads.
- **Admin / Super Admin** — runs the platform, verifies doctors, sees everything, reports.

## v1 scope (must-have)
1. **Doctor listing & onboarding** — sign-up, profile (name, specialties, qualifications,
   experience, fees, languages, clinic & location, hours, photos), verification/KYC, publish.
2. **Discovery & search** — browse + filters (specialty, location, availability, gender, rating,
   fee) + **AI smart search** (free-text → ranked matches).
3. **Lead capture popup** — on "Call / Book", a modal collects patient name, phone, problem,
   preferred time; creates a **lead** with source tracking; OTP-verify phone; de-dupe.
4. **Lead pipeline** — statuses New → Contacted → Booked → Closed/Lost; assignment; notes; SLA
   timer; activity history.
5. **Appointment booking** — slot calendar per doctor; confirm/reschedule/cancel; reminders.
6. **Role dashboards** — per-role views with the RBAC rules in `docs/RBAC.md`.
7. **Notifications** — SMS/WhatsApp/email for lead confirmation, booking confirmation, reminders.
8. **Reviews & ratings** — post-visit rating (moderated).
9. **AI agents** — at minimum Smart Search & Lead-Form Assistant in v1; others phase in.

## Implementation status
- 2026-06-17: local-first Phase 1 UI slice is implemented for discovery/search, doctor profiles,
  lead request modal preview, staff lead dashboard, and doctor onboarding draft.
- 2026-06-17: local-first Admin/Super Admin operations dashboard is implemented at `/admin` for
  verification queue, review moderation, operating metrics, and audit preview.
- Live persistence, OTP, notifications, RBAC dashboards backed by Supabase, and AI agents remain
  pending until a Doctor-specific Supabase project is selected and the reviewed `create_lead()` RPC
  exists.

## Out of scope (later phases)
Video/audio/chat consultation, e-prescriptions, online payments, medicine delivery, lab tests,
full health-record vault, ABDM/ABHA, multi-city ops tooling.

## Success metrics
- Doctors onboarded & verified (supply), searches → lead conversion rate, lead → booking rate,
  booking show-rate, time-to-first-contact (SLA), patient rating.

## Key flows
- **Patient:** search → doctor profile → "Call/Book" popup → submit → confirmation (SMS/WhatsApp).
- **Staff:** new lead alert → contact → book slot → reminder → mark outcome → review request.
- **Doctor:** set availability → receive leads/bookings → manage calendar.

## Non-functional
SEO-first public pages (ISR), mobile-first, fast on low-end Android, `Asia/Kolkata`, Hindi+English
ready, DPDP-compliant consent, full audit log of staff & AI actions.
