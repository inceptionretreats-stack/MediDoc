# Roles & Permissions (RBAC)

Authorization is enforced **server-side** via Supabase Auth + **Row Level Security** on every
table. The client is never trusted. Each user has exactly one primary role; a doctor/clinic can
also own front-desk sub-users.

## Roles
- **Super Admin** — platform owner. Full control incl. billing, global settings, manage admins.
- **Admin** — manage & verify doctors/listings, manage managers, all leads/bookings, reports.
- **Manager** — assigned doctors/clinics + their leads/bookings; assign & follow up leads.
- **Doctor / Clinic owner** — own listing, availability, own leads & bookings; manage own staff.
- **Front-desk / Receptionist** — that clinic's leads & bookings only.
- **Patient** — browse, search, submit lead, book, view own bookings (guest or account).
- **AI service role** — scoped backend identity used by agents; every action audit-logged.

## Permission matrix
(✓ full · ◑ own/assigned scope only · ✕ none)

| Action / Role                     | Super Admin | Admin | Manager | Doctor | Front-desk | Patient |
|-----------------------------------|:-----------:|:-----:|:-------:|:------:|:----------:|:-------:|
| Manage platform settings & billing | ✓ | ✕ | ✕ | ✕ | ✕ | ✕ |
| Create/suspend Admins & Managers   | ✓ | ◑ (Mgr) | ✕ | ✕ | ✕ | ✕ |
| Verify / approve doctor listings   | ✓ | ✓ | ✕ | ✕ | ✕ | ✕ |
| Create / edit doctor listing       | ✓ | ✓ | ◑ | ◑ (own) | ✕ | ✕ |
| View doctors                       | ✓ | ✓ | ◑ | ◑ (own) | ◑ (clinic) | ✓ (public) |
| View leads                         | ✓ | ✓ | ◑ (assigned) | ◑ (own) | ◑ (clinic) | ◑ (own) |
| Assign / reassign leads            | ✓ | ✓ | ◑ | ✕ | ✕ | ✕ |
| Update lead status / notes         | ✓ | ✓ | ◑ | ◑ (own) | ◑ (clinic) | ✕ |
| Manage availability / slots        | ✓ | ✓ | ◑ | ◑ (own) | ◑ (clinic) | ✕ |
| Create / modify booking            | ✓ | ✓ | ◑ | ◑ (own) | ◑ (clinic) | ◑ (own) |
| View analytics / reports           | ✓ | ✓ | ◑ | ◑ (own) | ✕ | ✕ |
| Moderate reviews                   | ✓ | ✓ | ✕ | ✕ | ✕ | ✕ |
| Submit review                      | ✕ | ✕ | ✕ | ✕ | ✕ | ◑ (after visit) |
| Run AI agents                      | ✓ | ✓ | ◑ | ◑ (own) | ◑ (clinic) | ◑ (search/triage) |
| Read audit log                     | ✓ | ✓ | ✕ | ✕ | ✕ | ✕ |

## RLS principle
- Tenant scoping columns: `owner_doctor_id`, `clinic_id`, `assigned_manager_id`, `patient_id`.
- Policies compare `auth.uid()` (+ the user's role row) to those columns.
- The **AI service role** uses scoped service credentials and writes an `audit_log` row per action.
