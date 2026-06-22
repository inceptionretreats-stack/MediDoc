# USER_FLOWS.md — Step-by-step User Journeys

> Research-stage flows. Each feature must update the relevant flow before it ships.

## F1 — Patient: discover → lead → booking (core)
1. Patient lands on an SEO page (home / specialty / area).
2. Searches or browses → **AI Smart Search** ranks doctors.
3. Opens a doctor profile (photo, specialties, fees, hours, reviews).
4. Taps **Call** or **Book** → **popup form** opens.
5. Enters name, phone (**OTP-verified**), problem, preferred time, consent.
6. **AI Lead-Form Assistant** validates, summarizes, de-dupes → **LEAD** created (status NEW).
7. Patient gets instant SMS/WhatsApp confirmation; staff get a realtime alert.
8. Staff contact → book a slot → **BOOKING** → reminders → visit → review request.

**Current implementation note (2026-06-17):** steps 1-5 are implemented locally with fixture-backed
verified doctors, doctor profile routes, and a lead request modal. Step 6 persistence is blocked
until the reviewed `create_lead()` RPC/server action is added and Supabase is connected.

## F2 — Doctor/Clinic: onboard → list → manage
1. Sign up (within a **tenant**). 2. Build listing (profile, specialties, fees, hours, photos).
3. Upload KYC → Admin verifies → listing goes live. 4. Set availability/slots.
5. Receive tenant-scoped leads & bookings; manage own front-desk staff.

**Current implementation note (2026-06-17):** a local doctor listing draft form exists at
`/onboarding`; it does not publish or persist and keeps verification/KYC as a required boundary.

## F3 — Manager: work the pipeline
1. See assigned leads (New→Contacted→Booked→Closed). 2. Assign/reassign. 3. Follow up within SLA.
4. Convert to booking. 5. Review reports.

**Current implementation note (2026-06-17):** `/dashboard` provides a fixture-backed lead pipeline
and booking overview for local UX validation only.

## F4 — Admin / Super Admin
1. Verify doctors & listings. 2. Manage Managers (and Admins, for Super). 3. Moderate reviews.
4. View analytics. 5. (Super) platform settings, billing, audit log — across all tenants.

**Current implementation note (2026-06-17):** `/admin` provides a fixture-backed operations
workspace for doctor verification, review moderation, operating metrics, and audit preview. Actions
are local UI state only; real cross-tenant visibility and writes must remain server/RLS enforced.

## F5 — Symptom triage (P2)
1. Patient describes symptoms. 2. **Triage agent** suggests a specialty (disclaimer shown; red-flag
   symptoms → emergency guidance). 3. Routes into F1 search.
