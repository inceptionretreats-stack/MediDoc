import { DOCTOR_FIXTURES, type DoctorFixture } from "@/lib/demo-directory";

export type SmartSearchIntentFixture = {
  id: string;
  label: string;
  specialty: string;
  keywords: string[];
  explanation: string;
  doctorIds: string[];
  confidence: number;
};

export type SmartSearchPreviewResult = {
  query: string;
  matchedIntent: SmartSearchIntentFixture;
  suggestedDoctors: DoctorFixture[];
  matchedKeywords: string[];
  explanation: string;
};

export type PhoneNormalizationResult = {
  input: string;
  normalized: string;
  valid: boolean;
  guidance: string;
};

export type LeadAssistantPreviewResult = {
  issueSummary: string;
  likelySpecialty: string;
  suggestedDoctor: DoctorFixture;
  phone: PhoneNormalizationResult;
  missingFields: string[];
};

export type TriagePreviewResult = {
  input: string;
  suggestedSpecialty: string;
  matchedKeywords: string[];
  emergency: boolean;
  guidance: string;
  disclaimer: string;
  suggestedDoctors: DoctorFixture[];
};

export const MEDICAL_TRIAGE_DISCLAIMER =
  "This local preview is triage guidance only, not a diagnosis or medical advice. A qualified clinician must review care decisions.";

export const SMART_SEARCH_INTENTS: SmartSearchIntentFixture[] = [
  {
    id: "fever-primary-care",
    label: "Fever, infection or general illness",
    specialty: "General Physician",
    keywords: ["fever", "body ache", "infection", "cold", "cough", "viral", "weakness"],
    explanation:
      "Fever and infection terms map to primary care first, with same-day availability prioritized.",
    doctorIds: ["doc-aarti-sharma"],
    confidence: 92,
  },
  {
    id: "bone-joint-pain",
    label: "Bone, joint or sports injury",
    specialty: "Orthopedist",
    keywords: ["knee", "joint", "back pain", "fracture", "sports", "injury", "shoulder"],
    explanation:
      "Musculoskeletal symptoms map to orthopedics, especially when pain follows walking, sports or injury.",
    doctorIds: ["doc-rahul-mehta"],
    confidence: 89,
  },
  {
    id: "skin-hair-allergy",
    label: "Skin, hair or allergy concern",
    specialty: "Dermatologist",
    keywords: ["skin", "acne", "rash", "itching", "hair fall", "pigmentation", "allergy"],
    explanation:
      "Skin, hair and allergy terms map to dermatology with same-day slots when available.",
    doctorIds: ["doc-neha-kothari"],
    confidence: 88,
  },
  {
    id: "tooth-dental-pain",
    label: "Dental pain or oral care",
    specialty: "Dentist",
    keywords: ["tooth", "dental", "gum", "root canal", "cleaning", "cavity", "jaw pain"],
    explanation:
      "Dental pain and oral-care terms map to dentists, with evening appointment intent preserved.",
    doctorIds: ["doc-vikram-jain"],
    confidence: 91,
  },
  {
    id: "child-care",
    label: "Child health or vaccination",
    specialty: "Pediatrician",
    keywords: ["child", "baby", "kid", "vaccination", "pediatric", "growth", "nutrition"],
    explanation:
      "Child-focused symptoms and vaccination questions map to pediatrics and child-friendly clinics.",
    doctorIds: ["doc-sana-khan"],
    confidence: 90,
  },
];

const DEFAULT_INTENT: SmartSearchIntentFixture = SMART_SEARCH_INTENTS[0]!;

const RED_FLAG_RULES = [
  {
    id: "chest-pain",
    specialty: "Emergency care / Cardiologist",
    keywords: ["chest pain", "pressure in chest", "heart attack", "sweating with chest"],
    guidance:
      "Chest pain can be urgent. Call 108 in India or local emergency services, and go to the nearest emergency department now.",
  },
  {
    id: "stroke-signs",
    specialty: "Emergency care / Neurologist",
    keywords: ["stroke", "face drooping", "slurred speech", "arm weakness", "sudden weakness"],
    guidance:
      "Possible stroke signs are time-critical. Call emergency services immediately and do not wait for an appointment callback.",
  },
  {
    id: "breathing-trouble",
    specialty: "Emergency care / Pulmonologist",
    keywords: [
      "breathing trouble",
      "difficulty breathing",
      "shortness of breath",
      "cannot breathe",
      "severe wheezing",
    ],
    guidance:
      "Breathing trouble can become serious quickly. Seek emergency care now or call 108 in India.",
  },
] as const;

export const AI_PREVIEW_EXAMPLES = {
  smartSearch: [
    "Fever and body ache since yesterday evening",
    "Knee pain after morning walk near Hiran Magri",
    "Tooth pain and wants evening appointment",
  ],
  leadAssistant: [
    "Patient has dental pain since last night and wants a callback after 6 PM.",
    "Child vaccination schedule consultation for tomorrow morning.",
  ],
  triage: [
    "Acne and itching for one week",
    "Chest pain with sweating",
    "Face drooping and slurred speech",
  ],
} as const;

export function matchSmartSearchIntent(query: string): SmartSearchPreviewResult {
  const normalizedQuery = normalizeText(query);
  let bestIntent: SmartSearchIntentFixture = DEFAULT_INTENT;
  let bestKeywords: string[] = [];

  for (const intent of SMART_SEARCH_INTENTS) {
    const matchedKeywords = intent.keywords.filter((keyword) =>
      normalizedQuery.includes(keyword),
    );

    if (matchedKeywords.length > bestKeywords.length) {
      bestIntent = intent;
      bestKeywords = matchedKeywords;
    }
  }

  const suggestedDoctors = doctorsByIds(bestIntent.doctorIds);
  const fallbackDoctor = getFallbackDoctor();

  return {
    query,
    matchedIntent: bestIntent,
    suggestedDoctors: suggestedDoctors.length > 0 ? suggestedDoctors : [fallbackDoctor],
    matchedKeywords: bestKeywords,
    explanation:
      bestKeywords.length > 0
        ? `${bestIntent.explanation} Matched: ${bestKeywords.join(", ")}.`
        : `${bestIntent.explanation} No specific keyword matched yet, so the preview falls back to primary care.`,
  };
}

export function previewLeadAssistant(
  patientIssue: string,
  phoneInput: string,
): LeadAssistantPreviewResult {
  const smartSearch = matchSmartSearchIntent(patientIssue);
  const firstDoctor = smartSearch.suggestedDoctors[0] ?? getFallbackDoctor();
  const issueSummary = summarizeIssue(patientIssue);
  const phone = normalizeIndianPhone(phoneInput);
  const missingFields = [
    patientIssue.trim().length === 0 ? "Patient issue" : null,
    phone.valid ? null : "Valid E.164 phone",
  ].filter((field): field is string => field !== null);

  return {
    issueSummary,
    likelySpecialty: smartSearch.matchedIntent.specialty,
    suggestedDoctor: firstDoctor,
    phone,
    missingFields,
  };
}

export function previewSymptomTriage(input: string): TriagePreviewResult {
  const normalizedInput = normalizeText(input);

  for (const rule of RED_FLAG_RULES) {
    const matchedKeywords = rule.keywords.filter((keyword) =>
      normalizedInput.includes(keyword),
    );

    if (matchedKeywords.length > 0) {
      return {
        input,
        suggestedSpecialty: rule.specialty,
        matchedKeywords,
        emergency: true,
        guidance: rule.guidance,
        disclaimer: MEDICAL_TRIAGE_DISCLAIMER,
        suggestedDoctors: [],
      };
    }
  }

  const smartSearch = matchSmartSearchIntent(input);

  return {
    input,
    suggestedSpecialty: smartSearch.matchedIntent.specialty,
    matchedKeywords: smartSearch.matchedKeywords,
    emergency: false,
    guidance:
      "No local red-flag rule matched. Suggest the listed specialty and ask the patient to book a clinician-reviewed consultation.",
    disclaimer: MEDICAL_TRIAGE_DISCLAIMER,
    suggestedDoctors: smartSearch.suggestedDoctors,
  };
}

function doctorsByIds(ids: string[]) {
  const doctorMap = new Map(DOCTOR_FIXTURES.map((doctor) => [doctor.id, doctor]));
  return ids.flatMap((id) => {
    const doctor = doctorMap.get(id);
    return doctor ? [doctor] : [];
  });
}

function getFallbackDoctor() {
  const doctor = DOCTOR_FIXTURES.find((candidate) => candidate.id === "doc-aarti-sharma");

  if (!doctor) {
    throw new Error("Missing required doctor fixture: doc-aarti-sharma");
  }

  return doctor;
}

function normalizeIndianPhone(input: string): PhoneNormalizationResult {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (trimmed.startsWith("+") && digits.length >= 10 && digits.length <= 15) {
    return {
      input,
      normalized: `+${digits}`,
      valid: true,
      guidance: "Already shaped like E.164. Keep country code and remove spaces before saving.",
    };
  }

  if (digits.length === 10) {
    return {
      input,
      normalized: `+91${digits}`,
      valid: true,
      guidance: "Indian 10-digit mobile detected. Preview normalizes to +91 E.164 format.",
    };
  }

  if (digits.length === 12 && digits.startsWith("91")) {
    return {
      input,
      normalized: `+${digits}`,
      valid: true,
      guidance: "Country code detected. Add the plus sign before server-side validation.",
    };
  }

  return {
    input,
    normalized: trimmed,
    valid: false,
    guidance:
      "Enter an E.164 phone number such as +919876543210. The live assistant must validate before lead creation.",
  };
}

function summarizeIssue(issue: string) {
  const trimmed = issue.trim().replace(/\s+/g, " ");

  if (trimmed.length === 0) {
    return "Waiting for patient issue.";
  }

  const sentence = trimmed.length > 140 ? `${trimmed.slice(0, 137)}...` : trimmed;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function normalizeText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}
