import type { BookingStatus, LeadStatus } from "@/lib/constants";
import { BOOKING_STATUSES } from "@/lib/constants";
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

export type BookingPreviewFixture = {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  doctorId: string;
  scheduledAt: string;
  dayLabel: "Today" | "Upcoming";
  slotLabel: string;
  clinic: string;
  area: string;
  reason: string;
  source: string;
  status: BookingStatus;
  reminderDue: string;
  timeline: string[];
};

export type ReminderChannel = "sms" | "whatsapp" | "email";

export type NotificationPreviewFixture = {
  channel: ReminderChannel;
  label: string;
  deliveryTarget: string;
  subject?: string;
  body: string;
  complianceNote: string;
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

export const BOOKING_PREVIEW_FIXTURES: BookingPreviewFixture[] = [
  {
    id: "booking-preview-3001",
    patientName: "Arjun Singh",
    phone: "+919829000555",
    email: "arjun.singh@example.com",
    doctorId: "doc-vikram-jain",
    scheduledAt: "2026-06-17T19:15:00+05:30",
    dayLabel: "Today",
    slotLabel: "7:15 PM",
    clinic: "City Dental Studio",
    area: "Ashok Nagar",
    reason: "Dental pain and sensitivity",
    source: "Converted from lead-1003",
    status: "confirmed",
    reminderDue: "Today, 5:15 PM",
    timeline: ["Lead booked", "Front desk confirmed", "Reminder queued"],
  },
  {
    id: "booking-preview-3002",
    patientName: "Pooja Bhandari",
    phone: "+919999112233",
    email: "pooja.bhandari@example.com",
    doctorId: "doc-neha-kothari",
    scheduledAt: "2026-06-17T17:00:00+05:30",
    dayLabel: "Today",
    slotLabel: "5:00 PM",
    clinic: "SkinPlus Dermatology",
    area: "Shobhagpura",
    reason: "Skin allergy consultation",
    source: "Public profile request",
    status: "pending",
    reminderDue: "After confirmation",
    timeline: ["Slot requested", "Awaiting clinic confirmation"],
  },
  {
    id: "booking-preview-3003",
    patientName: "Kavya Jain",
    phone: "+919812340000",
    email: "kavya.jain@example.com",
    doctorId: "doc-sana-khan",
    scheduledAt: "2026-06-18T09:30:00+05:30",
    dayLabel: "Upcoming",
    slotLabel: "Tomorrow, 9:30 AM",
    clinic: "Little Steps Child Clinic",
    area: "Sector 14",
    reason: "Vaccination schedule review",
    source: "Manager follow-up",
    status: "rescheduled",
    reminderDue: "Tomorrow, 7:30 AM",
    timeline: ["Original slot changed", "Parent accepted new time", "Reminder queued"],
  },
  {
    id: "booking-preview-3004",
    patientName: "Rakesh Soni",
    phone: "+919876543210",
    email: "rakesh.soni@example.com",
    doctorId: "doc-aarti-sharma",
    scheduledAt: "2026-06-19T11:45:00+05:30",
    dayLabel: "Upcoming",
    slotLabel: "Friday, 11:45 AM",
    clinic: "Lakecity Family Clinic",
    area: "Fatehsagar",
    reason: "Fever follow-up",
    source: "Staff callback",
    status: "cancelled",
    reminderDue: "No reminder",
    timeline: ["Slot confirmed", "Patient cancelled", "Cancellation logged"],
  },
  {
    id: "booking-preview-3005",
    patientName: "Nidhi Bansal",
    phone: "+919900112244",
    email: "nidhi.bansal@example.com",
    doctorId: "doc-neha-kothari",
    scheduledAt: "2026-06-16T16:30:00+05:30",
    dayLabel: "Upcoming",
    slotLabel: "Yesterday, 4:30 PM",
    clinic: "SkinPlus Dermatology",
    area: "Shobhagpura",
    reason: "Acne treatment review",
    source: "Repeat visit",
    status: "completed",
    reminderDue: "Completed",
    timeline: ["Reminder sent", "Patient checked in", "Consultation completed"],
  },
  {
    id: "booking-preview-3006",
    patientName: "Amit Kothari",
    phone: "+919950001122",
    email: "amit.kothari@example.com",
    doctorId: "doc-rahul-mehta",
    scheduledAt: "2026-06-16T10:15:00+05:30",
    dayLabel: "Upcoming",
    slotLabel: "Yesterday, 10:15 AM",
    clinic: "Aravalli Ortho & Sports Care",
    area: "Hiran Magri",
    reason: "Knee pain review",
    source: "Directory search",
    status: "no_show",
    reminderDue: "Missed",
    timeline: ["Reminder sent", "No check-in", "Marked no-show"],
  },
];

export const NOTIFICATION_PREVIEW_FIXTURES: NotificationPreviewFixture[] = [
  {
    channel: "sms",
    label: "SMS",
    deliveryTarget: "Patient phone",
    body:
      "Doctor Platform: Your appointment with {doctor} at {clinic}, {area} is scheduled for {slot}. Reply only if you need clinic help.",
    complianceNote: "Transactional SMS provider and consent logging are not wired in this preview.",
  },
  {
    channel: "whatsapp",
    label: "WhatsApp",
    deliveryTarget: "Patient WhatsApp",
    body:
      "Namaste {patient}, this is a reminder for your appointment with {doctor} at {clinic}, {area} on {slot}. Please arrive 10 minutes early.",
    complianceNote: "WhatsApp template approval and provider selection remain pending.",
  },
  {
    channel: "email",
    label: "Email",
    deliveryTarget: "Patient email",
    subject: "Appointment reminder for {slot}",
    body:
      "Hello {patient}, your Doctor Platform appointment with {doctor} is scheduled at {clinic}, {area} for {slot}. Please carry previous reports if available.",
    complianceNote: "Email sender domain, unsubscribe policy and audit writes are backend decisions.",
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

export type RoleWorkspaceKey = "doctor" | "manager" | "front_desk";

export type ListingHealthFixture = {
  label: string;
  value: string;
  status: "good" | "attention" | "blocked";
  detail: string;
};

export type DoctorAvailabilityFixture = {
  id: string;
  day: string;
  session: string;
  slots: string;
  status: "open" | "limited" | "blocked";
};

export type DoctorWorkspaceFixture = {
  doctorId: string;
  listingScore: number;
  profileCompleteness: number;
  monthlyViews: number;
  leadSummary: Record<"new" | "contacted" | "booked", number>;
  listingHealth: ListingHealthFixture[];
  availability: DoctorAvailabilityFixture[];
  upcomingBookings: BookingFixture[];
};

export type ManagerClinicFixture = {
  id: string;
  name: string;
  area: string;
  doctors: string[];
  activeLeads: number;
  conversionPercent: number;
};

export type ManagerSlaRiskFixture = {
  id: string;
  patientName: string;
  doctorId: string;
  minutesRemaining: number;
  priority: "high" | "medium";
};

export type ManagerFollowUpFixture = {
  id: string;
  patientName: string;
  phone: string;
  doctorId: string;
  dueAt: string;
  status: "queued" | "assigned" | "done";
};

export type ManagerConversionFixture = {
  stage: string;
  count: number;
  detail: string;
};

export type ManagerWorkspaceFixture = {
  clinics: ManagerClinicFixture[];
  slaRisks: ManagerSlaRiskFixture[];
  followUps: ManagerFollowUpFixture[];
  conversion: ManagerConversionFixture[];
};

export type FrontDeskCallbackStatus = "pending" | "called" | "rescheduled";

export type FrontDeskCallbackFixture = {
  id: string;
  patientName: string;
  phone: string;
  doctorId: string;
  dueAt: string;
  reason: string;
  status: FrontDeskCallbackStatus;
};

export type FrontDeskWorkspaceFixture = {
  callbacks: FrontDeskCallbackFixture[];
  bookings: BookingFixture[];
};

export const DOCTOR_WORKSPACE_FIXTURE: DoctorWorkspaceFixture = {
  doctorId: "doc-aarti-sharma",
  listingScore: 86,
  profileCompleteness: 92,
  monthlyViews: 428,
  leadSummary: {
    new: 2,
    contacted: 4,
    booked: 3,
  },
  listingHealth: [
    {
      label: "Profile completeness",
      value: "92%",
      status: "good",
      detail: "Core profile, fees, language and clinic data are present.",
    },
    {
      label: "Availability freshness",
      value: "2 days",
      status: "attention",
      detail: "Update this week's morning and evening slot visibility.",
    },
    {
      label: "Verification",
      value: "Live",
      status: "good",
      detail: "Public listing is verified in the fixture dataset.",
    },
  ],
  availability: [
    {
      id: "avail-aarti-today-evening",
      day: "Today",
      session: "Evening OPD",
      slots: "6:30 PM, 7:00 PM, 7:30 PM",
      status: "open",
    },
    {
      id: "avail-aarti-tomorrow-morning",
      day: "Tomorrow",
      session: "Morning OPD",
      slots: "10:00 AM, 10:30 AM",
      status: "limited",
    },
    {
      id: "avail-aarti-friday-evening",
      day: "Friday",
      session: "Evening OPD",
      slots: "Clinic round pending",
      status: "blocked",
    },
  ],
  upcomingBookings: [
    {
      id: "booking-doctor-9001",
      patientName: "Rakesh Soni",
      doctorId: "doc-aarti-sharma",
      scheduledAt: "Today, 6:30 PM",
      status: "pending",
      phone: "+919876543210",
    },
    {
      id: "booking-doctor-9002",
      patientName: "Anita Bafna",
      doctorId: "doc-aarti-sharma",
      scheduledAt: "Tomorrow, 10:00 AM",
      status: "confirmed",
      phone: "+919414220011",
    },
  ],
};

export const MANAGER_WORKSPACE_FIXTURE: ManagerWorkspaceFixture = {
  clinics: [
    {
      id: "clinic-fatehsagar-primary",
      name: "Lakecity Family Clinic",
      area: "Fatehsagar",
      doctors: ["doc-aarti-sharma"],
      activeLeads: 7,
      conversionPercent: 36,
    },
    {
      id: "clinic-hiran-magri-ortho",
      name: "Aravalli Ortho & Sports Care",
      area: "Hiran Magri",
      doctors: ["doc-rahul-mehta"],
      activeLeads: 5,
      conversionPercent: 42,
    },
    {
      id: "clinic-ashok-nagar-dental",
      name: "City Dental Studio",
      area: "Ashok Nagar",
      doctors: ["doc-vikram-jain"],
      activeLeads: 4,
      conversionPercent: 50,
    },
  ],
  slaRisks: [
    {
      id: "risk-lead-1001",
      patientName: "Rakesh Soni",
      doctorId: "doc-aarti-sharma",
      minutesRemaining: 18,
      priority: "high",
    },
    {
      id: "risk-lead-1004",
      patientName: "Saba Qureshi",
      doctorId: "doc-sana-khan",
      minutesRemaining: 57,
      priority: "medium",
    },
  ],
  followUps: [
    {
      id: "follow-up-7001",
      patientName: "Meena Lodha",
      phone: "+919414000111",
      doctorId: "doc-rahul-mehta",
      dueAt: "Today, 2:30 PM",
      status: "queued",
    },
    {
      id: "follow-up-7002",
      patientName: "Pooja Bhandari",
      phone: "+919999112233",
      doctorId: "doc-neha-kothari",
      dueAt: "Today, 4:10 PM",
      status: "assigned",
    },
    {
      id: "follow-up-7003",
      patientName: "Arjun Singh",
      phone: "+919829000555",
      doctorId: "doc-vikram-jain",
      dueAt: "Today, 5:45 PM",
      status: "done",
    },
  ],
  conversion: [
    {
      stage: "New leads",
      count: 14,
      detail: "Across assigned clinics",
    },
    {
      stage: "Contacted",
      count: 9,
      detail: "Callback completed or message sent",
    },
    {
      stage: "Booked",
      count: 5,
      detail: "Confirmed or pending appointment slot",
    },
  ],
};

export const FRONT_DESK_WORKSPACE_FIXTURE: FrontDeskWorkspaceFixture = {
  callbacks: [
    {
      id: "callback-8001",
      patientName: "Rakesh Soni",
      phone: "+919876543210",
      doctorId: "doc-aarti-sharma",
      dueAt: "Today, 1:40 PM",
      reason: "Fever consultation request",
      status: "pending",
    },
    {
      id: "callback-8002",
      patientName: "Saba Qureshi",
      phone: "+919571002244",
      doctorId: "doc-sana-khan",
      dueAt: "Today, 2:20 PM",
      reason: "Vaccination schedule",
      status: "pending",
    },
    {
      id: "callback-8003",
      patientName: "Meena Lodha",
      phone: "+919414000111",
      doctorId: "doc-rahul-mehta",
      dueAt: "Today, 3:00 PM",
      reason: "Knee pain follow-up",
      status: "called",
    },
  ],
  bookings: [
    ...BOOKING_FIXTURES,
    {
      id: "booking-frontdesk-9101",
      patientName: "Rakesh Soni",
      doctorId: "doc-aarti-sharma",
      scheduledAt: "Today, 6:30 PM",
      status: "pending",
      phone: "+919876543210",
    },
  ],
};

export function getBookingStatusCounts(bookings: BookingPreviewFixture[]) {
  return bookings.reduce<Record<BookingStatus, number>>(
    (counts, booking) => {
      counts[booking.status] += 1;
      return counts;
    },
    BOOKING_STATUSES.reduce<Record<BookingStatus, number>>(
      (counts, status) => ({ ...counts, [status]: 0 }),
      {
        pending: 0,
        confirmed: 0,
        rescheduled: 0,
        cancelled: 0,
        completed: 0,
        no_show: 0,
      },
    ),
  );
}

export function renderNotificationCopy(
  template: NotificationPreviewFixture,
  booking: BookingPreviewFixture,
) {
  const replacements: Record<string, string> = {
    "{area}": booking.area,
    "{clinic}": booking.clinic,
    "{doctor}": getDoctorName(booking.doctorId),
    "{patient}": booking.patientName,
    "{slot}": booking.slotLabel,
  };

  return Object.entries(replacements).reduce(
    (copy, [token, value]) => copy.replaceAll(token, value),
    template.body,
  );
}

export function renderNotificationSubject(
  template: NotificationPreviewFixture,
  booking: BookingPreviewFixture,
) {
  if (!template.subject) {
    return undefined;
  }

  return template.subject.replaceAll("{slot}", booking.slotLabel);
}
