import type { LeadStatus } from "@/lib/constants";

export type DoctorFixture = {
  id: string;
  tenantId: string;
  clinicId: string;
  name: string;
  slug: string;
  specialty: string;
  specialtySlug: string;
  clinic: string;
  area: string;
  city: string;
  experienceYears: number;
  feePaise: number;
  languages: string[];
  gender: "female" | "male";
  rating: number;
  reviews: number;
  nextAvailable: string;
  availabilityLabel: string;
  verified: boolean;
  leadStatus: LeadStatus;
  summary: string;
  highlights: string[];
};

export const DOCTOR_FIXTURES: DoctorFixture[] = [
  {
    id: "doc-aarti-sharma",
    tenantId: "tenant-lakecity-care",
    clinicId: "clinic-fatehsagar-primary",
    name: "Dr. Aarti Sharma",
    slug: "dr-aarti-sharma-general-physician",
    specialty: "General Physician",
    specialtySlug: "general-physician",
    clinic: "Lakecity Family Clinic",
    area: "Fatehsagar",
    city: "Udaipur",
    experienceYears: 12,
    feePaise: 50000,
    languages: ["Hindi", "English"],
    gender: "female",
    rating: 4.8,
    reviews: 184,
    nextAvailable: "Today, 6:30 PM",
    availabilityLabel: "Evening slots",
    verified: true,
    leadStatus: "new",
    summary:
      "Primary care for fever, infection, diabetes follow-up and preventive checkups.",
    highlights: ["Fever & infections", "Family medicine", "Diabetes care"],
  },
  {
    id: "doc-rahul-mehta",
    tenantId: "tenant-aravalli-ortho",
    clinicId: "clinic-hiran-magri-ortho",
    name: "Dr. Rahul Mehta",
    slug: "dr-rahul-mehta-orthopedist",
    specialty: "Orthopedist",
    specialtySlug: "orthopedist",
    clinic: "Aravalli Ortho & Sports Care",
    area: "Hiran Magri",
    city: "Udaipur",
    experienceYears: 15,
    feePaise: 70000,
    languages: ["Hindi", "English", "Mewari"],
    gender: "male",
    rating: 4.7,
    reviews: 143,
    nextAvailable: "Tomorrow, 11:00 AM",
    availabilityLabel: "Morning slots",
    verified: true,
    leadStatus: "new",
    summary:
      "Joint pain, fracture follow-up, back pain and sports injury consultations.",
    highlights: ["Knee pain", "Sports injury", "Back pain"],
  },
  {
    id: "doc-neha-kothari",
    tenantId: "tenant-skinplus",
    clinicId: "clinic-shobhagpura-derma",
    name: "Dr. Neha Kothari",
    slug: "dr-neha-kothari-dermatologist",
    specialty: "Dermatologist",
    specialtySlug: "dermatologist",
    clinic: "SkinPlus Dermatology",
    area: "Shobhagpura",
    city: "Udaipur",
    experienceYears: 9,
    feePaise: 60000,
    languages: ["Hindi", "English"],
    gender: "female",
    rating: 4.9,
    reviews: 211,
    nextAvailable: "Today, 5:00 PM",
    availabilityLabel: "Same-day",
    verified: true,
    leadStatus: "new",
    summary:
      "Acne, pigmentation, hair fall and allergy care with procedure counseling.",
    highlights: ["Acne", "Hair fall", "Skin allergy"],
  },
  {
    id: "doc-vikram-jain",
    tenantId: "tenant-city-dental",
    clinicId: "clinic-ashok-nagar-dental",
    name: "Dr. Vikram Jain",
    slug: "dr-vikram-jain-dentist",
    specialty: "Dentist",
    specialtySlug: "dentist",
    clinic: "City Dental Studio",
    area: "Ashok Nagar",
    city: "Udaipur",
    experienceYears: 18,
    feePaise: 40000,
    languages: ["Hindi", "English"],
    gender: "male",
    rating: 4.6,
    reviews: 126,
    nextAvailable: "Today, 7:15 PM",
    availabilityLabel: "After-work",
    verified: true,
    leadStatus: "new",
    summary:
      "Dental pain, cleaning, root canal evaluation and cosmetic dentistry.",
    highlights: ["Tooth pain", "Root canal", "Cleaning"],
  },
  {
    id: "doc-sana-khan",
    tenantId: "tenant-childcare-udaipur",
    clinicId: "clinic-sector-14-child",
    name: "Dr. Sana Khan",
    slug: "dr-sana-khan-pediatrician",
    specialty: "Pediatrician",
    specialtySlug: "pediatrician",
    clinic: "Little Steps Child Clinic",
    area: "Sector 14",
    city: "Udaipur",
    experienceYears: 10,
    feePaise: 55000,
    languages: ["Hindi", "English", "Urdu"],
    gender: "female",
    rating: 4.8,
    reviews: 198,
    nextAvailable: "Tomorrow, 9:30 AM",
    availabilityLabel: "Child-friendly",
    verified: true,
    leadStatus: "new",
    summary:
      "Child fever, vaccination schedules, nutrition and growth monitoring.",
    highlights: ["Child fever", "Vaccination", "Nutrition"],
  },
];

export const SPECIALTY_FILTERS = [
  "All specialties",
  ...Array.from(new Set(DOCTOR_FIXTURES.map((doctor) => doctor.specialty))),
] as const;

export const AREA_FILTERS = [
  "All areas",
  ...Array.from(new Set(DOCTOR_FIXTURES.map((doctor) => doctor.area))),
] as const;

export function formatFee(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function getDoctorBySlug(slug: string) {
  return DOCTOR_FIXTURES.find((doctor) => doctor.slug === slug) ?? null;
}

export function getRelatedDoctors(doctor: DoctorFixture) {
  return DOCTOR_FIXTURES.filter(
    (candidate) =>
      candidate.id !== doctor.id &&
      (candidate.specialty === doctor.specialty || candidate.area === doctor.area),
  ).slice(0, 3);
}
