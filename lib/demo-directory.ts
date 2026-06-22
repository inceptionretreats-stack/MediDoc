import type { LeadStatus } from "@/lib/constants";

export type EducationFixture = {
  degree: string;
  institution: string;
  year: number;
};

export type CareerHighlightFixture = {
  year: number;
  description: string;
};

export type DoctorFixture = {
  id: string;
  tenantId: string;
  clinicId: string;
  name: string;
  slug: string;
  specialty: string;
  specialtySlug: string;
  clinic: string;
  clinicAddress: string;
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
  consultationHours: string;
  verified: boolean;
  leadStatus: LeadStatus;
  summary: string;
  highlights: string[];
  /** Stable portrait URL (RandomUser CDN — labelled as placeholder in the UI). */
  photoUrl: string;
  /** 2-3 paragraph extended bio for the Wikipedia-style article body. */
  bio: string[];
  education: EducationFixture[];
  awards: string[];
  memberships: string[];
  conditionsTreated: string[];
  services: string[];
  careerHighlights: CareerHighlightFixture[];
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
    clinicAddress: "Plot 14, Lake Road, Fatehsagar",
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
    consultationHours: "Mon–Sat, 9:00 AM–1:00 PM and 5:00 PM–9:00 PM",
    verified: true,
    leadStatus: "new",
    summary:
      "Primary care for fever, infection, diabetes follow-up and preventive checkups.",
    highlights: ["Fever & infections", "Family medicine", "Diabetes care"],
    photoUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: [
      "Aarti Sharma is a general physician with over a decade of primary-care experience in Udaipur, currently consulting at Lakecity Family Clinic in the Fatehsagar locality. Her practice focuses on adult internal medicine, infectious-disease workups, and long-term management of lifestyle conditions such as type 2 diabetes and hypertension.",
      "She is known among patients for unhurried consultations and clear treatment plans, and the clinic operates a same-day callback policy for fever and acute infection enquiries. Dr. Sharma also runs a weekly preventive-health camp for elderly patients in partnership with two nearby resident welfare associations.",
    ],
    education: [
      { degree: "MBBS", institution: "RNT Medical College, Udaipur", year: 2010 },
      { degree: "MD (Internal Medicine)", institution: "SMS Medical College, Jaipur", year: 2014 },
    ],
    awards: [
      "Rajasthan Medical Council — Young Physician Award (2018)",
      "Udaipur Civic Health Foundation — Community Service Citation (2022)",
    ],
    memberships: [
      "Indian Medical Association (IMA)",
      "Association of Physicians of India (API)",
      "Research Society for the Study of Diabetes in India (RSSDI)",
    ],
    conditionsTreated: [
      "Viral fever and influenza-like illness",
      "Type 2 diabetes mellitus",
      "Hypertension",
      "Thyroid disorders",
      "Gastritis and acid reflux",
      "Vitamin and iron deficiency",
    ],
    services: [
      "OPD consultation and follow-up",
      "Preventive health checkup",
      "Diabetes monitoring and medication titration",
      "Vaccination counselling for adults and seniors",
      "Referral coordination with specialists",
    ],
    careerHighlights: [
      { year: 2014, description: "Completed MD residency and joined Pacific Hospital, Udaipur as junior consultant." },
      { year: 2017, description: "Co-founded Lakecity Family Clinic with a community-care focus." },
      { year: 2021, description: "Launched a weekly senior-citizen preventive camp at Fatehsagar RWA." },
    ],
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
    clinicAddress: "Sector 11, Hiran Magri",
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
    consultationHours: "Mon–Fri, 10:00 AM–2:00 PM and 6:00 PM–8:30 PM; Sat morning only",
    verified: true,
    leadStatus: "new",
    summary:
      "Joint pain, fracture follow-up, back pain and sports injury consultations.",
    highlights: ["Knee pain", "Sports injury", "Back pain"],
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: [
      "Rahul Mehta is a consultant orthopedic surgeon with 15 years of experience in joint, spine and sports-injury care. He trained in arthroscopic procedures during his fellowship and now leads the conservative-management OPD at Aravalli Ortho & Sports Care in Hiran Magri.",
      "His practice combines clinical examination with structured physiotherapy referrals, and reserves surgery for cases that fail to respond to graded rehab. He is on the Rajasthan Cricket Association's medical advisory panel for under-19 selections.",
    ],
    education: [
      { degree: "MBBS", institution: "Government Medical College, Kota", year: 2007 },
      { degree: "MS (Orthopedics)", institution: "AIIMS, Jodhpur", year: 2011 },
      { degree: "Fellowship in Arthroscopy & Sports Medicine", institution: "Apollo Hospitals, Hyderabad", year: 2013 },
    ],
    awards: [
      "Indian Orthopaedic Association — Best Paper, Sports Injury Session (2019)",
      "Aravalli Sports Trust — Team Physician Recognition (2023)",
    ],
    memberships: [
      "Indian Orthopaedic Association (IOA)",
      "Indian Arthroscopy Society (IAS)",
      "International Society of Arthroscopy, Knee Surgery and Orthopaedic Sports Medicine (ISAKOS)",
    ],
    conditionsTreated: [
      "ACL and meniscus injury",
      "Frozen shoulder",
      "Cervical and lumbar spondylosis",
      "Osteoarthritis of the knee",
      "Sports overuse injuries",
      "Post-fracture rehabilitation",
    ],
    services: [
      "Clinical orthopedic assessment",
      "Joint and soft-tissue injection",
      "Pre-operative arthroscopy counselling",
      "Sports-injury triage and return-to-play planning",
      "Coordinated physiotherapy follow-up",
    ],
    careerHighlights: [
      { year: 2013, description: "Completed sports-medicine fellowship and returned to Udaipur as senior registrar." },
      { year: 2016, description: "Founded Aravalli Ortho & Sports Care with a sports-rehab focus." },
      { year: 2022, description: "Appointed to RCA U-19 medical advisory panel." },
    ],
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
    clinicAddress: "1st Floor, Madhuban Plaza, Shobhagpura",
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
    consultationHours: "Tue–Sun, 11:00 AM–8:00 PM (Mon closed)",
    verified: true,
    leadStatus: "new",
    summary:
      "Acne, pigmentation, hair fall and allergy care with procedure counseling.",
    highlights: ["Acne", "Hair fall", "Skin allergy"],
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: [
      "Neha Kothari is a consultant dermatologist focused on medical dermatology and aesthetic counselling. Her clinic, SkinPlus Dermatology, runs structured treatment plans for adult and adolescent acne, hair-loss workups, and pigmentary disorders.",
      "She is particularly known for evidence-based scepticism around cosmetic up-selling and prefers stepwise topical and medical management before recommending energy-based procedures.",
    ],
    education: [
      { degree: "MBBS", institution: "Geetanjali Medical College, Udaipur", year: 2013 },
      { degree: "MD (Dermatology, Venereology & Leprosy)", institution: "Maulana Azad Medical College, New Delhi", year: 2017 },
    ],
    awards: [
      "Indian Association of Dermatologists — Rising Practitioner Award (2020)",
      "Udaipur Skin Health Forum — Patient Trust Recognition (2024)",
    ],
    memberships: [
      "Indian Association of Dermatologists, Venereologists and Leprologists (IADVL)",
      "Cosmetic Dermatology Society of India (CDSI)",
    ],
    conditionsTreated: [
      "Adult and adolescent acne",
      "Androgenetic and telogen hair loss",
      "Melasma and post-inflammatory hyperpigmentation",
      "Atopic dermatitis and eczema",
      "Contact and drug allergies",
      "Fungal skin infections",
    ],
    services: [
      "Clinical dermatology consultation",
      "Acne staging and protocol planning",
      "Trichology workup and PRP counselling",
      "Pigmentation and chemical-peel counselling",
      "Patch testing for contact allergy",
    ],
    careerHighlights: [
      { year: 2017, description: "Completed MD and joined a private dermatology group in Delhi." },
      { year: 2020, description: "Returned to Udaipur and launched SkinPlus Dermatology." },
      { year: 2023, description: "Started a weekend teledermatology slot for follow-up patients." },
    ],
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
    clinicAddress: "Shop 5, Ashok Nagar Main Road",
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
    consultationHours: "Mon–Sat, 10:00 AM–9:00 PM (extended evening hours)",
    verified: true,
    leadStatus: "new",
    summary:
      "Dental pain, cleaning, root canal evaluation and cosmetic dentistry.",
    highlights: ["Tooth pain", "Root canal", "Cleaning"],
    photoUrl: "https://randomuser.me/api/portraits/men/54.jpg",
    bio: [
      "Vikram Jain is a senior dental surgeon with nearly two decades of restorative and endodontic practice. City Dental Studio operates extended evening hours specifically for working patients and runs a stepwise cost-estimate workflow before any procedure.",
      "He completed his BDS in Udaipur and trained in advanced endodontics in Mumbai. The clinic also coordinates with a paediatric dentist on Saturdays for family appointments.",
    ],
    education: [
      { degree: "BDS", institution: "Pacific Dental College, Udaipur", year: 2006 },
      { degree: "MDS (Conservative Dentistry & Endodontics)", institution: "Nair Hospital Dental College, Mumbai", year: 2010 },
    ],
    awards: [
      "Indian Dental Association, Rajasthan — Best Clinical Practice Award (2019)",
    ],
    memberships: [
      "Indian Dental Association (IDA)",
      "Federation of Operative Dentistry of India (FODI)",
    ],
    conditionsTreated: [
      "Tooth pain and acute pulpitis",
      "Dental caries and restorations",
      "Root canal infections",
      "Gum disease",
      "Cosmetic concerns (chipped or stained teeth)",
      "Wisdom-tooth assessment",
    ],
    services: [
      "Routine cleaning and scaling",
      "Single and multi-rooted root canal therapy",
      "Tooth-coloured restorations",
      "Crown and bridge consultation",
      "Cosmetic veneers counselling",
    ],
    careerHighlights: [
      { year: 2010, description: "Completed MDS and joined a multi-specialty dental practice in Mumbai." },
      { year: 2014, description: "Opened City Dental Studio in Ashok Nagar, Udaipur." },
      { year: 2020, description: "Introduced extended evening hours for working patients." },
    ],
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
    clinicAddress: "Sector 14, Near Central Park",
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
    consultationHours: "Mon–Sat, 9:00 AM–1:00 PM and 4:00 PM–7:00 PM",
    verified: true,
    leadStatus: "new",
    summary:
      "Child fever, vaccination schedules, nutrition and growth monitoring.",
    highlights: ["Child fever", "Vaccination", "Nutrition"],
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: [
      "Sana Khan is a paediatrician with a decade of practice across newborn, infant and adolescent care. Little Steps Child Clinic is designed around child comfort, with a separate sick-child waiting area and visual vaccination timeline charts for parents.",
      "She follows the IAP immunization schedule and offers a structured well-baby visit programme that combines growth tracking, developmental screening and nutrition counselling.",
    ],
    education: [
      { degree: "MBBS", institution: "JLN Medical College, Ajmer", year: 2012 },
      { degree: "MD (Paediatrics)", institution: "Sawai Man Singh Medical College, Jaipur", year: 2016 },
    ],
    awards: [
      "Indian Academy of Pediatrics — Best Resident Award (2015)",
      "Udaipur Maternal & Child Health Forum — Outreach Award (2022)",
    ],
    memberships: [
      "Indian Academy of Pediatrics (IAP)",
      "National Neonatology Forum (NNF)",
    ],
    conditionsTreated: [
      "Newborn jaundice and feeding concerns",
      "Recurrent fever in children",
      "Asthma and wheezing in children",
      "Growth and nutrition concerns",
      "Common childhood infections",
      "Developmental delay screening",
    ],
    services: [
      "Well-baby visits and growth tracking",
      "IAP immunization schedule",
      "Newborn examination and counselling",
      "Adolescent health counselling",
      "Nutrition and feeding plans",
    ],
    careerHighlights: [
      { year: 2016, description: "Completed MD and joined a tertiary paediatric unit in Jaipur." },
      { year: 2019, description: "Launched Little Steps Child Clinic in Udaipur's Sector 14." },
      { year: 2023, description: "Started a monthly nutrition workshop for mothers of under-5 children." },
    ],
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
