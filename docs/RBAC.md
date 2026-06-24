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

## RBAC verification matrix (table × role)

The source of truth is the RLS policies in `supabase/migrations/20260616090100_tenancy_rbac.sql`,
`20260616090200_directory.sql`, and `20260616090300_leads_bookings.sql`. This matrix mirrors them
so reviewers can verify intent at a glance. If a policy changes, update this table in the same PR.

Legend: **S** = SELECT, **I** = INSERT, **U** = UPDATE, **D** = DELETE, blank = denied.
Scope hints: `(self)` = own row only, `(tenant)` = limited to the user's tenant via `is_tenant_member()` / `has_tenant_role()`, `(via RPC)` = direct table write denied, allowed only through a `SECURITY DEFINER` RPC.

| Table | anon | patient | doctor | front_desk | manager | admin | super_admin |
|---|---|---|---|---|---|---|---|
| `tenants` |  |  |  |  | S (tenant) | SIU (tenant) | SIUD |
| `profiles` |  | S (self) | S (self+tenant) | S (tenant) | S (tenant) | SIU (tenant) | SIUD |
| `user_roles` |  | S (self) | S (self) | S (tenant) | S (tenant) | SIU (tenant) | SIUD |
| `specialties` | S | S | S | S | S | SIUD | SIUD |
| `clinics` | S | S | S (tenant) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `doctors` | S | S | SU (self) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `doctor_specialties` | S | S | SU (self) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `listings` | S | S | S (self) | S (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `availability_slots` | S | S | SIU (self) | SIU (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `leads` | I (via RPC) | S (self) | S (tenant) | SIU (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `lead_events` |  | S (self lead) | S (tenant) | SI (tenant) | SI (tenant) | SI (tenant) | SIUD |
| `bookings` |  | S (self) | S (self) | SIU (tenant) | SIU (tenant) | SIUD (tenant) | SIUD |
| `reviews` | S | SI (self booking) | S (self) | S (tenant) | SU (tenant) | SIUD (tenant) | SIUD |
| `audit_log` |  |  |  |  | S (tenant) | S (tenant) | SIUD |

### How to verify a row

Run two queries in the Supabase SQL editor, set to each role's JWT, and compare against the matrix:

```sql
-- Example: anon can read specialties but not tenants
set local role anon;
select count(*) from specialties;  -- expect: 10
select count(*) from tenants;      -- expect: 0 rows visible (RLS denies)

-- Example: as a patient (logged-in user with role 'patient')
set local jwt.claims.sub = '<patient-user-id>';
set local role authenticated;
select count(*) from leads;        -- expect: own leads only
insert into leads (...) values (...); -- expect: ERROR; use create_lead() RPC instead
```

Automated coverage is **Phase 10** (Playwright + Supabase service-role seed → role-scoped client tests
against this matrix).
