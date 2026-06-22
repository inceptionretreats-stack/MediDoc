import type { BookingStatus, LeadStatus } from "@/lib/constants";
import { DOCTOR_FIXTURES } from "@/lib/demo-directory";

export type LeadFixture = {
  id: string;
  patientName: string;
  phone: string;
  problem: string;
  preferredTime: string;
  source: string;
  status: LeadStatus;
  assignedTo: string;
  doctorId: string;
  createdAt: string;
  slaMinutesRemaining: number;
  notes: string[];
};

export type BookingFixture = {
  id: string;
  patientName: string;
  doctorId: string;
  scheduledAt: string;
  status: BookingStatus;
  phone: string;
};

export type VerificationFixture = {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  area: string;
  submittedAt: string;
  status: "pending" | "needs_changes" | "approved";
  checklist: Array<{
    label: string;
    complete: boolean;
  }>;
};

export type ReviewFixture = {
  id: string;
  patientName: string;
  doctorId: string;
  rating: number;
  comment: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
};

export type AuditEventFixture = {
  id: string;
  actor: string;
  action: string;
  target: string;
  occurredAt: string;
  severity: "info" | "warning";
};

export type PlatformMetricFixture = {
  label: string;
  value: string;
  detail: string;
  trend: string;
};

export const LEAD_FIXTURES: LeadFixture[] = [
  {
    id: "lead-1001",
    patientName: "Rakesh Soni",
    phone: "+919876543210",
    problem: "Fever and body ache since yesterday evening",
    preferredTime: "Today evening",
    source: "Search: fever",
    status: "new",
    assignedTo: "Front desk",
    doctorId: "doc-aarti-sharma",
    createdAt: "2026-06-17T08:20:00+05:30",
    slaMinutesRemaining: 18,
    notes: ["Needs callback before 2 PM."],
  },
  {
    id: "lead-1002",
    patientName: "Meena Lodha",
    phone: "+919414000111",
    problem: "Knee pain after morning walk",
    preferredTime: "Tomorrow morning",
    source: "Doctor card: Book",
    status: "contacted",
    assignedTo: "Manager",
    doctorId: "doc-rahul-mehta",
    createdAt: "2026-06-17T09:05:00+05:30",
    slaMinutesRemaining: 44,
    notes: ["Patient asked for Hiran Magri clinic."],
  },
  {
    id: "lead-1003",
    patientName: "Arjun Singh",
    phone: "+919829000555",
    problem: "Dental pain, wants evening appointment",
    preferredTime: "Today after 6 PM",
    source: "Profile: Request call",
    status: "booked",
    assignedTo: "Front desk",
    doctorId: "doc-vikram-jain",
    createdAt: "2026-06-17T10:10:00+05:30",
    slaMinutesRemaining: 0,
    notes: ["Converted to booking for 7:15 PM."],
  },
  {
    id: "lead-1004",
    patientName: "Saba Qureshi",
    phone: "+919571002244",
    problem: "Child vaccination schedule consultation",
    preferredTime: "Tomorrow",
    source: "Search: pediatrician",
    status: "new",
    assignedTo: "Front desk",
    doctorId: "doc-sana-khan",
    createdAt: "2026-06-17T10:45:00+05:30",
    slaMinutesRemaining: 57,
    notes: ["Needs Hindi callback."],
  },
];

export const BOOKING_FIXTURES: BookingFixture[] = [
  {
    id: "booking-2001",
    patientName: "Arjun Singh",
    doctorId: "doc-vikram-jain",
    scheduledAt: "Today, 7:15 PM",
    status: "confirmed",
    phone: "+919829000555",
  },
  {
    id: "booking-2002",
    patientName: "Pooja Bhandari",
    doctorId: "doc-neha-kothari",
    scheduledAt: "Today, 5:00 PM",
    status: "pending",
    phone: "+919999112233",
  },
  {
    id: "booking-2003",
    patientName: "Kavya Jain",
    doctorId: "doc-sana-khan",
    scheduledAt: "Tomorrow, 9:30 AM",
    status: "confirmed",
    phone: "+919812340000",
  },
];

export const VERIFICATION_FIXTURES: VerificationFixture[] = [
  {
    id: "verify-3001",
    doctorName: "Dr. Ritu Jain",
    specialty: "Gynecologist",
    clinic: "Saheli Women's Clinic",
    area: "Chetak Circle",
    submittedAt: "Today, 9:40 AM",
    status: "pending",
    checklist: [
      { label: "Medical registration uploaded", complete: true },
      { label: "Clinic address proof uploaded", complete: true },
      { label: "Admin identity check", complete: false },
    ],
  },
  {
    id: "verify-3002",
    doctorName: "Dr. Mahesh Paliwal",
    specialty: "ENT Specialist",
    clinic: "Aravali ENT Care",
    area: "Surajpole",
    submittedAt: "Yesterday, 5:15 PM",
    status: "needs_changes",
    checklist: [
      { label: "Medical registration uploaded", complete: true },
      { label: "Clinic address proof uploaded", complete: false },
      { label: "Admin identity check", complete: false },
    ],
  },
  {
    id: "verify-3003",
    doctorName: "Dr. Priya Chouhan",
    specialty: "Ophthalmologist",
    clinic: "ClearView Eye Clinic",
    area: "Shobhagpura",
    submittedAt: "Yesterday, 11:10 AM",
    status: "pending",
    checklist: [
      { label: "Medical registration uploaded", complete: true },
      { label: "Clinic address proof uploaded", complete: true },
      { label: "Admin identity check", complete: true },
    ],
  },
];

export const REVIEW_FIXTURES: ReviewFixture[] = [
  {
    id: "review-4001",
    patientName: "Nidhi Bansal",
    doctorId: "doc-neha-kothari",
    rating: 5,
    comment: "Clear diagnosis and very careful explanation for acne treatment.",
    submittedAt: "Today, 8:25 AM",
    status: "pending",
  },
  {
    id: "review-4002",
    patientName: "Amit Kothari",
    doctorId: "doc-vikram-jain",
    rating: 4,
    comment: "Clinic was busy but the dental pain consultation was helpful.",
    submittedAt: "Yesterday, 7:50 PM",
    status: "pending",
  },
  {
    id: "review-4003",
    patientName: "Farida Sheikh",
    doctorId: "doc-sana-khan",
    rating: 5,
    comment: "Good vaccination guidance and friendly front desk.",
    submittedAt: "Yesterday, 3:30 PM",
    status: "approved",
  },
];

export const AUDIT_EVENT_FIXTURES: AuditEventFixture[] = [
  {
    id: "audit-5001",
    actor: "Admin",
    action: "Updated lead status",
    target: "lead-1002",
    occurredAt: "Today, 11:24 AM",
    severity: "info",
  },
  {
    id: "audit-5002",
    actor: "Manager",
    action: "Opened verification packet",
    target: "verify-3001",
    occurredAt: "Today, 10:42 AM",
    severity: "info",
  },
  {
    id: "audit-5003",
    actor: "System",
    action: "SLA risk threshold reached",
    target: "lead-1001",
    occurredAt: "Today, 10:05 AM",
    severity: "warning",
  },
];

export const PLATFORM_METRICS: PlatformMetricFixture[] = [
  {
    label: "Lead conversion",
    value: "25%",
    detail: "1 of 4 fixture leads is booked",
    trend: "Needs staff follow-up",
  },
  {
    label: "Verification queue",
    value: "3",
    detail: "2 pending, 1 needs changes",
    trend: "Admin review required",
  },
  {
    label: "Review moderation",
    value: "2",
    detail: "Pending patient reviews",
    trend: "Keep public trust high",
  },
  {
    label: "SLA risk",
    value: "1",
    detail: "Lead callback due soon",
    trend: "Escalate to manager",
  },
];

export function getDoctorName(doctorId: string) {
  return DOCTOR_FIXTURES.find((doctor) => doctor.id === doctorId)?.name ?? "Unassigned doctor";
}

export function getLeadCounts(leads: LeadFixture[]) {
  return leads.reduce<Record<LeadStatus, number>>(
    (counts, lead) => {
      counts[lead.status] += 1;
      return counts;
    },
    {
      new: 0,
      contacted: 0,
      booked: 0,
      closed_won: 0,
      closed_lost: 0,
    },
  );
}
