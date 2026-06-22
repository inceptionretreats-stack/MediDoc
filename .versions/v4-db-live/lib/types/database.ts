export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          after: Json | null
          before: Json | null
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          tenant_id: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          tenant_id?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      availability_slots: {
        Row: {
          created_at: string
          doctor_id: string
          ends_at: string
          id: string
          starts_at: string
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          doctor_id: string
          ends_at: string
          id?: string
          starts_at: string
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          doctor_id?: string
          ends_at?: string
          id?: string
          starts_at?: string
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_slots_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "availability_slots_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          clinic_id: string | null
          created_at: string
          doctor_id: string
          id: string
          lead_id: string | null
          patient_name: string
          patient_phone: string
          patient_profile_id: string | null
          scheduled_at: string | null
          slot_id: string | null
          status: Database["public"]["Enums"]["booking_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string
          doctor_id: string
          id?: string
          lead_id?: string | null
          patient_name: string
          patient_phone: string
          patient_profile_id?: string | null
          scheduled_at?: string | null
          slot_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          clinic_id?: string | null
          created_at?: string
          doctor_id?: string
          id?: string
          lead_id?: string | null
          patient_name?: string
          patient_phone?: string
          patient_profile_id?: string | null
          scheduled_at?: string | null
          slot_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_patient_profile_id_fkey"
            columns: ["patient_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "availability_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      clinics: {
        Row: {
          address: string | null
          area: string | null
          city: string
          created_at: string
          id: string
          lat: number | null
          lng: number | null
          name: string
          phone: string | null
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          area?: string | null
          city?: string
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          name: string
          phone?: string | null
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          area?: string | null
          city?: string
          created_at?: string
          id?: string
          lat?: number | null
          lng?: number | null
          name?: string
          phone?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinics_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_specialties: {
        Row: {
          doctor_id: string
          specialty_id: string
          tenant_id: string
        }
        Insert: {
          doctor_id: string
          specialty_id: string
          tenant_id: string
        }
        Update: {
          doctor_id?: string
          specialty_id?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctor_specialties_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_specialties_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_specialties_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          clinic_id: string | null
          created_at: string
          experience_years: number
          fee_paise: number
          full_name: string
          gender: string | null
          id: string
          languages: string[]
          profile_id: string | null
          slug: string
          status: Database["public"]["Enums"]["doctor_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          clinic_id?: string | null
          created_at?: string
          experience_years?: number
          fee_paise?: number
          full_name: string
          gender?: string | null
          id?: string
          languages?: string[]
          profile_id?: string | null
          slug: string
          status?: Database["public"]["Enums"]["doctor_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          clinic_id?: string | null
          created_at?: string
          experience_years?: number
          fee_paise?: number
          full_name?: string
          gender?: string | null
          id?: string
          languages?: string[]
          profile_id?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["doctor_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctors_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_events: {
        Row: {
          actor_id: string | null
          created_at: string
          id: string
          lead_id: string
          note: string | null
          tenant_id: string
          type: string
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          id?: string
          lead_id: string
          note?: string | null
          tenant_id: string
          type: string
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          id?: string
          lead_id?: string
          note?: string | null
          tenant_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          ai_summary: string | null
          assigned_manager_id: string | null
          clinic_id: string | null
          created_at: string
          id: string
          owner_doctor_id: string | null
          patient_name: string
          patient_phone: string
          patient_profile_id: string | null
          preferred_time: string | null
          problem: string | null
          source: string | null
          status: Database["public"]["Enums"]["lead_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          ai_summary?: string | null
          assigned_manager_id?: string | null
          clinic_id?: string | null
          created_at?: string
          id?: string
          owner_doctor_id?: string | null
          patient_name: string
          patient_phone: string
          patient_profile_id?: string | null
          preferred_time?: string | null
          problem?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          ai_summary?: string | null
          assigned_manager_id?: string | null
          clinic_id?: string | null
          created_at?: string
          id?: string
          owner_doctor_id?: string | null
          patient_name?: string
          patient_phone?: string
          patient_profile_id?: string | null
          preferred_time?: string | null
          problem?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_owner_doctor_id_fkey"
            columns: ["owner_doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_patient_profile_id_fkey"
            columns: ["patient_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          bio: string | null
          created_at: string
          doctor_id: string
          id: string
          photo_url: string | null
          status: Database["public"]["Enums"]["listing_status"]
          tenant_id: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          doctor_id: string
          id?: string
          photo_url?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          tenant_id: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          doctor_id?: string
          id?: string
          photo_url?: string | null
          status?: Database["public"]["Enums"]["listing_status"]
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: true
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          locale: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string
          id: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          locale?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          body: string | null
          booking_id: string | null
          created_at: string
          doctor_id: string
          id: string
          patient_profile_id: string
          rating: number
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          booking_id?: string | null
          created_at?: string
          doctor_id: string
          id?: string
          patient_profile_id: string
          rating: number
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          booking_id?: string | null
          created_at?: string
          doctor_id?: string
          id?: string
          patient_profile_id?: string
          rating?: number
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_patient_profile_id_fkey"
            columns: ["patient_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      specialties: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      tenants: {
        Row: {
          city: string
          created_at: string
          id: string
          name: string
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          city?: string
          created_at?: string
          id?: string
          name: string
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          name?: string
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_tenant_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _tenant_id: string
        }
        Returns: boolean
      }
      is_platform_admin: { Args: never; Returns: boolean }
      is_super_admin: { Args: never; Returns: boolean }
      is_tenant_member: { Args: { _tenant_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "manager"
        | "doctor"
        | "front_desk"
        | "patient"
      booking_status:
        | "pending"
        | "confirmed"
        | "rescheduled"
        | "cancelled"
        | "completed"
        | "no_show"
      doctor_status: "pending" | "verified" | "rejected"
      lead_status: "new" | "contacted" | "booked" | "closed_won" | "closed_lost"
      listing_status: "draft" | "pending_review" | "live" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "admin",
        "manager",
        "doctor",
        "front_desk",
        "patient",
      ],
      booking_status: [
        "pending",
        "confirmed",
        "rescheduled",
        "cancelled",
        "completed",
        "no_show",
      ],
      doctor_status: ["pending", "verified", "rejected"],
      lead_status: ["new", "contacted", "booked", "closed_won", "closed_lost"],
      listing_status: ["draft", "pending_review", "live", "suspended"],
    },
  },
} as const
