/** App-wide constants. Single source of truth — no magic values elsewhere. */
export const APP = {
  name: "Doctor Platform",
  city: "Udaipur",
  timezone: "Asia/Kolkata",
  currency: "INR",
  defaultLocale: "en-IN",
} as const;

/** Human roles (see docs/RBAC.md). Authorization is enforced server-side via RLS. */
export const ROLES = [
  "super_admin",
  "admin",
  "manager",
  "doctor",
  "front_desk",
  "patient",
] as const;
export type Role = (typeof ROLES)[number];

/** Lead pipeline statuses (see docs/PRD.md). */
export const LEAD_STATUSES = [
  "new",
  "contacted",
  "booked",
  "closed_won",
  "closed_lost",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Booking lifecycle. */
export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "rescheduled",
  "cancelled",
  "completed",
  "no_show",
] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
