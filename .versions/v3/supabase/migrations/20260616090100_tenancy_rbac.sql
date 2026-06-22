-- ============================================================================
-- 20260616090100_tenancy_rbac.sql
-- Multi-tenancy core (clinic/hospital = tenant), profiles, roles, and the
-- security-definer helper functions that every tenant-scoped RLS policy uses.
-- ============================================================================

-- ── Tenants (the isolation boundary: one clinic/hospital org = one tenant) ──
create table public.tenants (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  city        text not null default 'Udaipur',
  status      text not null default 'active',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Profiles (one row per auth user) ────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  phone       text,                                   -- E.164
  locale      text not null default 'en-IN',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Role assignment ─────────────────────────────────────────────────────────
-- Platform roles (super_admin/admin/patient) have tenant_id = null.
-- Tenant staff (doctor/manager/front_desk) have a tenant_id.
create table public.user_roles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  tenant_id   uuid references public.tenants(id) on delete cascade,
  role        public.app_role not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, tenant_id, role)
);

create index user_roles_user_id_idx   on public.user_roles (user_id);
create index user_roles_tenant_id_idx on public.user_roles (tenant_id);

create trigger trg_tenants_updated    before update on public.tenants
  for each row execute function public.set_updated_at();
create trigger trg_profiles_updated   before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger trg_user_roles_updated before update on public.user_roles
  for each row execute function public.set_updated_at();

-- ── New-user trigger: create a profile + default 'patient' role on signup ───
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.phone
  )
  on conflict (id) do nothing;

  insert into public.user_roles (user_id, tenant_id, role)
  values (new.id, null, 'patient')
  on conflict do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── RLS helper functions (security definer → bypass RLS, no recursion) ──────
create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = (select auth.uid())
      and ur.tenant_id is null
      and ur.role in ('super_admin', 'admin')
  );
$$;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = (select auth.uid())
      and ur.tenant_id is null
      and ur.role = 'super_admin'
  );
$$;

create or replace function public.is_tenant_member(_tenant_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = (select auth.uid())
      and ur.tenant_id = _tenant_id
  );
$$;

create or replace function public.has_tenant_role(_tenant_id uuid, _roles public.app_role[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.user_roles ur
    where ur.user_id = (select auth.uid())
      and ur.tenant_id = _tenant_id
      and ur.role = any(_roles)
  );
$$;

-- ── Enable RLS ──────────────────────────────────────────────────────────────
alter table public.tenants    enable row level security;
alter table public.profiles   enable row level security;
alter table public.user_roles enable row level security;

-- tenants: members + platform admins read; admins/owners write.
create policy tenants_select on public.tenants for select
  using ((select public.is_platform_admin()) or (select public.is_tenant_member(id)));
create policy tenants_insert on public.tenants for insert
  with check ((select public.is_platform_admin()));
create policy tenants_update on public.tenants for update
  using ((select public.is_platform_admin()) or (select public.has_tenant_role(id, array['doctor']::public.app_role[])));
create policy tenants_delete on public.tenants for delete
  using ((select public.is_super_admin()));

-- profiles: own + platform admin.
create policy profiles_select on public.profiles for select
  using (id = (select auth.uid()) or (select public.is_platform_admin()));
create policy profiles_insert on public.profiles for insert
  with check (id = (select auth.uid()) or (select public.is_platform_admin()));
create policy profiles_update on public.profiles for update
  using (id = (select auth.uid()) or (select public.is_platform_admin()));

-- user_roles: own + platform admin + tenant owner (manages their staff).
create policy user_roles_select on public.user_roles for select
  using (
    user_id = (select auth.uid())
    or (select public.is_platform_admin())
    or (tenant_id is not null and (select public.has_tenant_role(tenant_id, array['doctor']::public.app_role[])))
  );
create policy user_roles_write on public.user_roles for all
  using (
    (select public.is_platform_admin())
    or (tenant_id is not null and (select public.has_tenant_role(tenant_id, array['doctor']::public.app_role[])))
  )
  with check (
    (select public.is_platform_admin())
    or (tenant_id is not null and (select public.has_tenant_role(tenant_id, array['doctor']::public.app_role[])))
  );
