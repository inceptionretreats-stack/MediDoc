-- ============================================================================
-- 20260616090300_leads_bookings.sql
-- Operational tables: leads, lead_events, bookings, reviews, audit_log.
-- Tenant-scoped; patients see their own; public reads only approved reviews.
-- NOTE: public/anon lead intake (the popup form) lands in Phase 1 via a
-- security-definer RPC `create_lead()` — direct anon INSERT is denied here.
-- ============================================================================

-- ── Leads ───────────────────────────────────────────────────────────────────
create table public.leads (
  id                 uuid primary key default gen_random_uuid(),
  tenant_id          uuid not null references public.tenants(id) on delete cascade,
  owner_doctor_id    uuid references public.doctors(id) on delete set null,
  clinic_id          uuid references public.clinics(id) on delete set null,
  assigned_manager_id uuid references auth.users(id) on delete set null,
  patient_profile_id uuid references public.profiles(id) on delete set null,
  patient_name       text not null,
  patient_phone      text not null,                   -- E.164
  problem            text,
  preferred_time     text,
  source             text,
  status             public.lead_status not null default 'new',
  ai_summary         text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ── Lead activity log ───────────────────────────────────────────────────────
create table public.lead_events (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references public.tenants(id) on delete cascade,
  lead_id     uuid not null references public.leads(id) on delete cascade,
  actor_id    uuid references auth.users(id) on delete set null,
  type        text not null,
  note        text,
  created_at  timestamptz not null default now()
);

-- ── Bookings ────────────────────────────────────────────────────────────────
create table public.bookings (
  id                 uuid primary key default gen_random_uuid(),
  tenant_id          uuid not null references public.tenants(id) on delete cascade,
  lead_id            uuid references public.leads(id) on delete set null,
  doctor_id          uuid not null references public.doctors(id) on delete cascade,
  clinic_id          uuid references public.clinics(id) on delete set null,
  slot_id            uuid references public.availability_slots(id) on delete set null,
  patient_profile_id uuid references public.profiles(id) on delete set null,
  patient_name       text not null,
  patient_phone      text not null,
  status             public.booking_status not null default 'pending',
  scheduled_at       timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ── Reviews ─────────────────────────────────────────────────────────────────
create table public.reviews (
  id                 uuid primary key default gen_random_uuid(),
  tenant_id          uuid not null references public.tenants(id) on delete cascade,
  doctor_id          uuid not null references public.doctors(id) on delete cascade,
  patient_profile_id uuid not null references public.profiles(id) on delete cascade,
  booking_id         uuid references public.bookings(id) on delete set null,
  rating             int not null check (rating between 1 and 5),
  body               text,
  status             text not null default 'pending',  -- pending | approved | rejected
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ── Audit log (security/traceability; written server-side via service role) ─
create table public.audit_log (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid references public.tenants(id) on delete set null,
  actor_id    uuid references auth.users(id) on delete set null,
  action      text not null,
  entity      text not null,
  entity_id   uuid,
  before      jsonb,
  after       jsonb,
  created_at  timestamptz not null default now()
);

-- ── Indexes ─────────────────────────────────────────────────────────────────
create index leads_tenant_id_idx        on public.leads (tenant_id);
create index leads_owner_doctor_idx     on public.leads (owner_doctor_id);
create index leads_assigned_mgr_idx     on public.leads (assigned_manager_id);
create index leads_patient_idx          on public.leads (patient_profile_id);
create index leads_status_idx           on public.leads (tenant_id, status);
create index lead_events_tenant_idx     on public.lead_events (tenant_id);
create index lead_events_lead_idx       on public.lead_events (lead_id);
create index bookings_tenant_id_idx     on public.bookings (tenant_id);
create index bookings_doctor_idx        on public.bookings (doctor_id);
create index bookings_patient_idx       on public.bookings (patient_profile_id);
create index bookings_lead_idx          on public.bookings (lead_id);
create index reviews_tenant_id_idx      on public.reviews (tenant_id);
create index reviews_doctor_status_idx  on public.reviews (doctor_id, status);
create index reviews_patient_idx        on public.reviews (patient_profile_id);
create index audit_log_tenant_idx       on public.audit_log (tenant_id);
create index audit_log_entity_idx       on public.audit_log (entity, entity_id);

-- ── updated_at triggers ─────────────────────────────────────────────────────
create trigger trg_leads_updated    before update on public.leads
  for each row execute function public.set_updated_at();
create trigger trg_bookings_updated before update on public.bookings
  for each row execute function public.set_updated_at();
create trigger trg_reviews_updated  before update on public.reviews
  for each row execute function public.set_updated_at();

-- ── RLS ─────────────────────────────────────────────────────────────────────
alter table public.leads       enable row level security;
alter table public.lead_events enable row level security;
alter table public.bookings    enable row level security;
alter table public.reviews     enable row level security;
alter table public.audit_log   enable row level security;

-- leads: tenant staff + platform admin; patient sees own. (Anon intake → RPC, Phase 1.)
create policy leads_select on public.leads for select
  using (
    (select public.is_platform_admin())
    or (select public.is_tenant_member(tenant_id))
    or patient_profile_id = (select auth.uid())
  );
create policy leads_write on public.leads for all
  using ((select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)))
  with check ((select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));

-- lead_events: tenant staff + platform admin.
create policy lead_events_select on public.lead_events for select
  using ((select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));
create policy lead_events_insert on public.lead_events for insert
  with check ((select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));

-- bookings: tenant staff + platform admin; patient sees own.
create policy bookings_select on public.bookings for select
  using (
    (select public.is_platform_admin())
    or (select public.is_tenant_member(tenant_id))
    or patient_profile_id = (select auth.uid())
  );
create policy bookings_write on public.bookings for all
  using ((select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)))
  with check ((select public.is_platform_admin()) or (select public.is_tenant_member(tenant_id)));

-- reviews: public reads approved; patient writes own; staff/admin moderate.
create policy reviews_select_public on public.reviews for select
  using (
    status = 'approved'
    or patient_profile_id = (select auth.uid())
    or (select public.is_platform_admin())
    or (select public.is_tenant_member(tenant_id))
  );
create policy reviews_insert_own on public.reviews for insert
  with check (patient_profile_id = (select auth.uid()));
create policy reviews_moderate on public.reviews for update
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])))
  with check ((select public.is_platform_admin()) or (select public.has_tenant_role(tenant_id, array['doctor','manager']::public.app_role[])));

-- audit_log: read by platform admin + tenant owner; writes happen via service role.
create policy audit_log_select on public.audit_log for select
  using ((select public.is_platform_admin()) or (tenant_id is not null and (select public.has_tenant_role(tenant_id, array['doctor']::public.app_role[]))));
