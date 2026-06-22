/**
 * Database types for the Supabase client. Hand-written to match
 * `supabase/migrations/*`. After the project is connected, regenerate with:
 *   npx supabase gen types typescript --project-id <ref> --schema public > lib/types/database.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "doctor"
  | "front_desk"
  | "patient";
export type LeadStatus =
  | "new"
  | "contacted"
  | "booked"
  | "closed_won"
  | "closed_lost";
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "no_show";
export type ListingStatus = "draft" | "pending_review" | "live" | "suspended";
export type DoctorStatus = "pending" | "verified" | "rejected";

type Timestamps = { created_at: string; updated_at: string };

type Table<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export interface DoctorRow extends Timestamps {
  id: string;
  tenant_id: string;
  profile_id: string | null;
  clinic_id: string | null;
  full_name: string;
  slug: string;
  gender: string | null;
  experience_years: number;
  fee_paise: number;
  languages: string[];
  status: DoctorStatus;
}

export interface ListingRow extends Timestamps {
  id: string;
  tenant_id: string;
  doctor_id: string;
  bio: string | null;
  photo_url: string | null;
  status: ListingStatus;
}

export interface SpecialtyRow extends Timestamps {
  id: string;
  name: string;
  slug: string;
}

export interface ClinicRow extends Timestamps {
  id: string;
  tenant_id: string;
  name: string;
  address: string | null;
  area: string | null;
  city: string;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  status: string;
}

export interface LeadRow extends Timestamps {
  id: string;
  tenant_id: string;
  owner_doctor_id: string | null;
  clinic_id: string | null;
  assigned_manager_id: string | null;
  patient_profile_id: string | null;
  patient_name: string;
  patient_phone: string;
  problem: string | null;
  preferred_time: string | null;
  source: string | null;
  status: LeadStatus;
  ai_summary: string | null;
}

export interface ReviewRow extends Timestamps {
  id: string;
  tenant_id: string;
  doctor_id: string;
  patient_profile_id: string;
  booking_id: string | null;
  rating: number;
  body: string | null;
  status: string;
}

export interface Database {
  public: {
    Tables: {
      doctors: Table<DoctorRow>;
      listings: Table<ListingRow>;
      specialties: Table<SpecialtyRow>;
      clinics: Table<ClinicRow>;
      leads: Table<LeadRow>;
      reviews: Table<ReviewRow>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: AppRole;
      lead_status: LeadStatus;
      booking_status: BookingStatus;
      listing_status: ListingStatus;
      doctor_status: DoctorStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
