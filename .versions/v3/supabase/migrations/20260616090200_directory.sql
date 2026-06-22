-- ============================================================================
-- 20260616090200_directory.sql
-- Public-facing directory: specialties (global), clinics, doctors, listings,
-- availability slots. Public read for live/verified records; tenant-scoped write.
-- ============================================================================

-- ── Specialties (global master lookup; no tenant) ───────────────────────────
create table public.specialties (
  id          uuid primary key default gen_random_uuid(),
  name        text not null unique,
  slug        text not null unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Clinics (physical locations under a tenant) ─────────────────────────────
create table public.clinics (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  name        text not null,
  address     text,
  area        text,
  city        text not null default 'Udaipur',
  lat         double precision,
  lng         double precision,
  phone       text,
  status      text not null default 'active',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Doctors ─────────────────────────────────────────────────────────────────
create table public.doctors (
  id               uuid primary key default gen_random_uuid(),
  tenant_id        uuid not null references public.tenants(id) on delete cascade,
  profile_id       uuid references public.profiles(id) on delete set null,
  clinic_id        uuid references public.clinics(id) on delete set null,
  full_name        text not null,
  slug             text not null,
  gender           text,
  experience_years int not null default 0,
  fee_paise        int not null default 0 check (fee_paise >= 0),
  languages        text[] not null default '{}',
  status           public.doctor_status not null default 'pending',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  unique (tenant_id, slug)
);

-- ── Doctor ↔ Specialty (M:N; tenant_id denormalized for fast RLS) ───────────
create table public.doctor_specialties (
  doctor_id    uuid not null references public.doctors(id) on delete cascade,
  specialty_id uuid not null references public.specialties(id) on delete cascade,
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  primary key (doctor_id, specialty_id)
);

-- ── Listings (public profile content for a doctor) ──────────────────────────
create table public.listings (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  doctor_id   uuid not null references public.doctors(id) on delete cascade unique,
  bio         text,
  photo_url   text,
  status      public.listing_status not null default 'draft',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Availability slots ──────────────────────────────────────────────────────
create table public.availability_slots (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  doctor_id   uuid not null references public.doctors(id) on delete cascade,
  starts_at   timestamptz not null,
  ends_at     timestamptz not null,
  status      text not null default 'open',           -- open | held | booked | blocked
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  check (ends_at > starts_at)
);

-- ── Indexes (FK + RLS + common filters) ─────────────────────────────────────
create index clinics_tenant_id_idx            on public.clinics (tenant_id);
create index doctors_tenant_id_idx            on public.doctors (tenant_id);
create index doctors_clinic_id_idx            on public.doctors (clinic_id);
create index doctors_profile_id_idx           on public.doctors (profile_id);
create index doctors_status_idx               on public.doctors (status);
create index doctor_specialties_specialty_idx on public.doctor_specialties (specialty_id);
create index doctor_specialties_tenant_idx    on public.doctor_specialties (tenant_id);
create index listings_tenant_id_idx           on public.listings (tenant_id);
create index listings_status_idx              on public.listings (status);
create index slots_tenant_id_idx              on public.availability_slots (tenant_id);
create index slots_doctor_time_idx            on public.availability_slots (doctor_id, starts_at);

-- ── updated_at triggers ─────────────────────────────────────────────────────
create trigger trg_specialties_updated before update on public.specialties
  for each row execute function public.set_updated_at();
create trigger trg_clinics_updated     before update on public.clinics
  for each row execute function public.set_updated_at();
create trigger trg_doctors_updated     before update on public.doctors
  for each row execute function public.set_updated_at();
create trigger trg_listings_updated    before update on public.listings
  for each row execute function public.set_updated_at();
create trigger trg_slots_updated       before update on public.availability_slots
  for each row execute function public.set_updated_at();

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table public.specialties         enable row level security;
alter table public.clinics             enable row level security;
alter table public.doctors             enable row level security;
alter table public.doctor_specialties  enable row level security;
alter table public.listings            enable row level security;
alter table public.availability_slots  enable row level security;

-- helper: tenant staff who may edit directory content
-- (doctor=owner, manager, front_desk) — expressed inline per policy.

-- specialties: world-readable; platform admin writes.
create policy specialties_select on public.specialties for select using (true);
create policy specialties_write  on public.specialties for all
  using ((select public.is_platform_admin())) with check ((select public.is_platform_admin()));

-- clinics: public reads active; tenant members read all; staff/admin write.
create policy clinics_select_public on public.clinics for select
  using (status = 'active' or (select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));
create policy clinics_write on public.clinics for all
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])))
  with check ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])));

-- doctors: public reads verified; tenant members read all; staff/admin write.
create policy doctors_select_public on public.doctors for select
  using (status = 'verified' or (select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));
create policy doctors_write on public.doctors for all
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])))
  with check ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])));

-- doctor_specialties: world-readable; staff/admin write.
create policy doctor_specialties_select on public.doctor_specialties for select using (true);
create policy doctor_specialties_write on public.doctor_specialties for all
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])))
  with check ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])));

-- listings: public reads live; tenant members read all; staff/admin write.
create policy listings_select_public on public.listings for select
  using (status = 'live' or (select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));
create policy listings_write on public.listings for all
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])))
  with check ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])));

-- availability: public reads open; tenant members read all; staff/admin write.
create policy slots_select_public on public.availability_slots for select
  using (status = 'open' or (select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));
create policy slots_write on public.availability_slots for all
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager','front_desk']::public.app_role[])))
  with check ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager','front_desk']::public.app_role[])));
