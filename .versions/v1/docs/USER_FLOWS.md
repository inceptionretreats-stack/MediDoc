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

## F2 — Doctor/Clinic: onboard → list → manage
1. Sign up (within a **tenant**). 2. Build listing (profile, specialties, fees, hours, photos).
3. Upload KYC → Admin verifies → listing goes live. 4. Set availability/slots.
5. Receive tenant-scoped leads & bookings; manage own front-desk staff.

## F3 — Manager: work the pipeline
1. See assigned leads (New→Contacted→Booked→Closed). 2. Assign/reassign. 3. Follow up within SLA.
4. Convert to booking. 5. Review reports.

## F4 — Admin / Super Admin
1. Verify doctors & listings. 2. Manage Managers (and Admins, for Super). 3. Moderate reviews.
4. View analytics. 5. (Super) platform settings, billing, audit log — across all tenants.

## F5 — Symptom triage (P2)
1. Patient describes symptoms. 2. **Triage agent** suggests a specialty (disclaimer shown; red-flag
   symptoms → emergency guidance). 3. Routes into F1 search.
