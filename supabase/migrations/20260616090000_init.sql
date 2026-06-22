-- ============================================================================
-- 20260616090000_init.sql
-- Extensions, enums, and shared trigger functions.
-- Conventions: snake_case; uuid PKs; created_at/updated_at on every table;
-- money in paise (int); timestamps UTC (tz-aware); phones E.164.
-- ============================================================================

create extension if not exists pgcrypto;          -- gen_random_uuid(), crypto

-- ── Enums ───────────────────────────────────────────────────────────────────
create type public.app_role as enum (
  'super_admin', 'admin', 'manager', 'doctor', 'front_desk', 'patient'
);

create type public.lead_status as enum (
  'new', 'contacted', 'booked', 'closed_won', 'closed_lost'
);

create type public.booking_status as enum (
  'pending', 'confirmed', 'rescheduled', 'cancelled', 'completed', 'no_show'
);

create type public.listing_status as enum (
  'draft', 'pending_review', 'live', 'suspended'
);

create type public.doctor_status as enum (
  'pending', 'verified', 'rejected'
);

-- ── Shared trigger: keep updated_at current ────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
