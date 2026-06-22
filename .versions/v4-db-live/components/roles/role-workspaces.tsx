"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  Phone,
  Stethoscope,
  UserCog,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { BookingStatus } from "@/lib/constants";
import {
  DOCTOR_WORKSPACE_FIXTURE,
  FRONT_DESK_WORKSPACE_FIXTURE,
  MANAGER_WORKSPACE_FIXTURE,
  getDoctorName,
  type DoctorAvailabilityFixture,
  type FrontDeskCallbackFixture,
  type FrontDeskCallbackStatus,
  type ManagerFollowUpFixture,
  type RoleWorkspaceKey,
} from "@/lib/demo-operations";

const ROLE_TABS: Array<{
  key: RoleWorkspaceKey;
  label: string;
  description: string;
  icon: typeof Stethoscope;
}> = [
  {
    key: "doctor",
    label: "Doctor",
    description: "Listing health, availability and own demand.",
    icon: Stethoscope,
  },
  {
    key: "manager",
    label: "Manager",
    description: "Assigned clinics, SLA risk and conversion.",
    icon: UserCog,
  },
  {
    key: "front_desk",
    label: "Front-desk",
    description: "Callbacks, bookings and local queue updates.",
    icon: Phone,
  },
];

const AVAILABILITY_LABELS: Record<DoctorAvailabilityFixture["status"], string> = {
  open: "Open",
  limited: "Limited",
  blocked: "Blocked",
};

const FOLLOW_UP_LABELS: Record<ManagerFollowUpFixture["status"], string> = {
  queued: "Queued",
  assigned: "Assigned",
  done: "Done",
};

const CALLBACK_LABELS: Record<FrontDeskCallbackStatus, string> = {
  pending: "Pending",
  called: "Called",
  rescheduled: "Rescheduled",
};

const BOOKING_LABELS: Partial<Record<BookingStatus, string>> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function RoleWorkspaces() {
  const [selectedRole, setSelectedRole] = useState<RoleWorkspaceKey>("doctor");

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Local role workspaces</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Doctor Platform operating roles
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Fixture-backed dashboards for validating role-specific workflows before
              Supabase Auth, RLS scoping and server actions are connected.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:grid-cols-3 lg:w-auto lg:flex lg:flex-wrap">
            <Button asChild className="w-full lg:w-auto" variant="outline">
              <Link href="/">Public search</Link>
            </Button>
            <Button asChild className="w-full lg:w-auto" variant="outline">
              <Link href="/dashboard">Lead pipeline</Link>
            </Button>
            <Button asChild className="w-full lg:w-auto" variant="outline">
              <Link href="/admin">Admin review</Link>
            </Button>
            <Button asChild className="w-full lg:w-auto" variant="outline">
              <Link href="/booking">Booking preview</Link>
            </Button>
            <Button asChild className="w-full lg:w-auto" variant="outline">
              <Link href="/ai-preview">AI preview</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-3 rounded-lg border bg-secondary/40 p-2 md:grid-cols-3">
          {ROLE_TABS.map((role) => {
            const Icon = role.icon;

            return (
              <button
                aria-pressed={selectedRole === role.key}
                className="flex min-w-0 items-start gap-3 rounded-md px-4 py-3 text-left transition hover:bg-background aria-pressed:bg-background aria-pressed:shadow-sm"
                key={role.key}
                onClick={() => setSelectedRole(role.key)}
                type="button"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{role.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {role.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {selectedRole === "doctor" ? <DoctorWorkspace /> : null}
        {selectedRole === "manager" ? <ManagerWorkspace /> : null}
        {selectedRole === "front_desk" ? <FrontDeskWorkspace /> : null}
      </section>
    </main>
  );
}

function DoctorWorkspace() {
  const [availability, setAvailability] = useState(DOCTOR_WORKSPACE_FIXTURE.availability);

  const openSlots = availability.filter((item) => item.status === "open").length;
  const limitedSlots = availability.filter((item) => item.status === "limited").length;

  function updateAvailabilityStatus(
    availabilityId: string,
    status: DoctorAvailabilityFixture["status"],
  ) {
    setAvailability((current) =>
      current.map((item) => (item.id === availabilityId ? { ...item, status } : item)),
    );
  }

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RoleMetric
            icon={Activity}
            label="Listing score"
            value={`${DOCTOR_WORKSPACE_FIXTURE.listingScore}/100`}
          />
          <RoleMetric
            icon={ClipboardList}
            label="Profile complete"
            value={`${DOCTOR_WORKSPACE_FIXTURE.profileCompleteness}%`}
          />
          <RoleMetric
            icon={UsersRound}
            label="Profile views"
            value={DOCTOR_WORKSPACE_FIXTURE.monthlyViews.toString()}
          />
          <RoleMetric icon={CalendarDays} label="Open sessions" value={openSlots.toString()} />
        </div>

        <section className="rounded-lg border bg-background">
          <SectionHeader
            detail="Signals a doctor can act on before a live listing-publish workflow exists."
            icon={Stethoscope}
            title="Own listing health"
          />
          <div className="divide-y">
            {DOCTOR_WORKSPACE_FIXTURE.listingHealth.map((item) => (
              <article className="grid gap-3 p-4 md:grid-cols-[1fr_120px] md:items-center" key={item.label}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{item.label}</h3>
                    <StatusBadge tone={item.status === "good" ? "success" : "warning"}>
                      {item.status === "good" ? "Healthy" : "Needs attention"}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
                <p className="text-left text-2xl font-semibold md:text-right">{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-background">
          <SectionHeader
            detail="Changing availability is local UI state only in this phase."
            icon={CalendarDays}
            title="Availability preview"
          />
          <div className="divide-y">
            {availability.map((item) => (
              <article className="grid gap-4 p-4 lg:grid-cols-[1fr_180px_150px] lg:items-center" key={item.id}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{item.day}</h3>
                    <StatusBadge tone={item.status === "open" ? "success" : "warning"}>
                      {AVAILABILITY_LABELS[item.status]}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.session}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.slots}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Clinic status: {item.status === "blocked" ? "review required" : "visible"}
                </p>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                  onChange={(event) =>
                    updateAvailabilityStatus(
                      item.id,
                      event.target.value as DoctorAvailabilityFixture["status"],
                    )
                  }
                  value={item.status}
                >
                  {Object.entries(AVAILABILITY_LABELS).map(([status, label]) => (
                    <option key={status} value={status}>
                      {label}
                    </option>
                  ))}
                </select>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-lg border p-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" aria-hidden />
            <h2 className="font-semibold">Own leads and bookings</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {Object.entries(DOCTOR_WORKSPACE_FIXTURE.leadSummary).map(([label, value]) => (
              <div className="flex items-center justify-between gap-3 rounded-md bg-secondary/50 p-3" key={label}>
                <p className="text-sm capitalize text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {DOCTOR_WORKSPACE_FIXTURE.upcomingBookings.map((booking) => (
              <div className="rounded-md border p-3" key={booking.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{booking.patientName}</p>
                  <StatusBadge tone={booking.status === "confirmed" ? "success" : "warning"}>
                    {BOOKING_LABELS[booking.status] ?? booking.status}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{booking.scheduledAt}</p>
                <p className="mt-1 flex items-center gap-2 text-sm">
                  <Phone className="size-4 text-primary" aria-hidden />
                  {booking.phone}
                </p>
              </div>
            ))}
          </div>
        </section>

        <BoundaryCard
          text="Doctor-specific visibility, own-clinic scoping and availability mutations require Supabase Auth, RLS and server actions. This page only proves the local role UX."
          title="Implementation boundary"
        />

        <section className="rounded-lg border p-5">
          <Clock3 className="size-5 text-primary" aria-hidden />
          <h2 className="mt-4 font-semibold">Slot health</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {openSlots} open sessions and {limitedSlots} limited sessions are visible in this
            local preview.
          </p>
        </section>
      </aside>
    </div>
  );
}

function ManagerWorkspace() {
  const [followUps, setFollowUps] = useState(MANAGER_WORKSPACE_FIXTURE.followUps);

  const assignedDoctorCount = useMemo(
    () =>
      new Set(
        MANAGER_WORKSPACE_FIXTURE.clinics.flatMap((clinic) => clinic.doctors),
      ).size,
    [],
  );
  const highRiskCount = MANAGER_WORKSPACE_FIXTURE.slaRisks.filter(
    (risk) => risk.priority === "high",
  ).length;
  const bookedCount =
    MANAGER_WORKSPACE_FIXTURE.conversion.find((stage) => stage.stage === "Booked")?.count ?? 0;

  function updateFollowUpStatus(
    followUpId: string,
    status: ManagerFollowUpFixture["status"],
  ) {
    setFollowUps((current) =>
      current.map((item) => (item.id === followUpId ? { ...item, status } : item)),
    );
  }

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RoleMetric
            icon={Building2}
            label="Assigned clinics"
            value={MANAGER_WORKSPACE_FIXTURE.clinics.length.toString()}
          />
          <RoleMetric
            icon={Stethoscope}
            label="Assigned doctors"
            value={assignedDoctorCount.toString()}
          />
          <RoleMetric icon={AlertTriangle} label="High SLA risk" value={highRiskCount.toString()} />
          <RoleMetric icon={CheckCircle2} label="Booked leads" value={bookedCount.toString()} />
        </div>

        <section className="rounded-lg border bg-background">
          <SectionHeader
            detail="Manager scope is simulated from fixture clinics and doctors."
            icon={Building2}
            title="Assigned clinics and doctors"
          />
          <div className="divide-y">
            {MANAGER_WORKSPACE_FIXTURE.clinics.map((clinic) => (
              <article className="grid gap-4 p-4 lg:grid-cols-[1fr_150px_150px] lg:items-center" key={clinic.id}>
                <div className="min-w-0">
                  <h3 className="font-semibold">{clinic.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{clinic.area}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {clinic.doctors.map(getDoctorName).join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{clinic.activeLeads}</p>
                  <p className="text-sm text-muted-foreground">Active leads</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{clinic.conversionPercent}%</p>
                  <p className="text-sm text-muted-foreground">Conversion</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-background">
          <SectionHeader
            detail="Queue state is local; live assignment must write through audited server actions."
            icon={ClipboardList}
            title="Follow-up queue"
          />
          <div className="divide-y">
            {followUps.map((followUp) => (
              <article className="grid gap-4 p-4 lg:grid-cols-[1fr_170px_150px] lg:items-center" key={followUp.id}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{followUp.patientName}</h3>
                    <StatusBadge tone={followUp.status === "done" ? "success" : "warning"}>
                      {FOLLOW_UP_LABELS[followUp.status]}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getDoctorName(followUp.doctorId)} / due {followUp.dueAt}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-primary" aria-hidden />
                    {followUp.phone}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manager action: {followUp.status === "done" ? "audit later" : "monitor"}
                </p>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                  onChange={(event) =>
                    updateFollowUpStatus(
                      followUp.id,
                      event.target.value as ManagerFollowUpFixture["status"],
                    )
                  }
                  value={followUp.status}
                >
                  {Object.entries(FOLLOW_UP_LABELS).map(([status, label]) => (
                    <option key={status} value={status}>
                      {label}
                    </option>
                  ))}
                </select>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-lg border p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-primary" aria-hidden />
            <h2 className="font-semibold">SLA risk</h2>
          </div>
          <div className="mt-4 space-y-3">
            {MANAGER_WORKSPACE_FIXTURE.slaRisks.map((risk) => (
              <div className="rounded-md bg-secondary/50 p-3" key={risk.id}>
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium">{risk.patientName}</p>
                  <StatusBadge tone={risk.priority === "high" ? "danger" : "warning"}>
                    {risk.priority}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {getDoctorName(risk.doctorId)}
                </p>
                <p className="mt-1 text-sm">{risk.minutesRemaining} min remaining</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border p-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-5 text-primary" aria-hidden />
            <h2 className="font-semibold">Conversion snapshot</h2>
          </div>
          <div className="mt-5 space-y-4">
            {MANAGER_WORKSPACE_FIXTURE.conversion.map((stage) => (
              <div key={stage.stage}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{stage.stage}</p>
                  <span className="text-sm font-semibold">{stage.count}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${Math.min(stage.count * 7, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{stage.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <BoundaryCard
          text="Manager clinic assignment, cross-doctor visibility and SLA escalation must come from Supabase role claims, RLS and server-side writes. These controls are fixture-only."
          title="Implementation boundary"
        />
      </aside>
    </div>
  );
}

function FrontDeskWorkspace() {
  const [callbacks, setCallbacks] = useState(FRONT_DESK_WORKSPACE_FIXTURE.callbacks);
  const [bookings, setBookings] = useState(FRONT_DESK_WORKSPACE_FIXTURE.bookings);

  const pendingCallbacks = callbacks.filter((callback) => callback.status === "pending").length;
  const confirmedBookings = bookings.filter((booking) => booking.status === "confirmed").length;
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length;

  function updateCallbackStatus(callbackId: string, status: FrontDeskCallbackStatus) {
    setCallbacks((current) =>
      current.map((callback) =>
        callback.id === callbackId ? { ...callback, status } : callback,
      ),
    );
  }

  function updateBookingStatus(bookingId: string, status: BookingStatus) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking,
      ),
    );
  }

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RoleMetric icon={Phone} label="Callbacks pending" value={pendingCallbacks.toString()} />
          <RoleMetric
            icon={CheckCircle2}
            label="Confirmed bookings"
            value={confirmedBookings.toString()}
          />
          <RoleMetric
            icon={Clock3}
            label="Pending bookings"
            value={pendingBookings.toString()}
          />
          <RoleMetric icon={LayoutDashboard} label="Queue size" value={callbacks.length.toString()} />
        </div>

        <section className="rounded-lg border bg-background">
          <SectionHeader
            detail="Callback status changes are local and reset on refresh."
            icon={Phone}
            title="Today's callbacks"
          />
          <div className="divide-y">
            {callbacks.map((callback) => (
              <CallbackRow
                callback={callback}
                key={callback.id}
                onStatusChange={(status) => updateCallbackStatus(callback.id, status)}
              />
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-background">
          <SectionHeader
            detail="Use this table to validate front-desk booking triage before live writes exist."
            icon={CalendarDays}
            title="Confirmed and pending bookings"
          />
          <div className="divide-y">
            {bookings.map((booking) => (
              <article className="grid gap-4 p-4 lg:grid-cols-[1fr_170px_150px] lg:items-center" key={booking.id}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{booking.patientName}</h3>
                    <StatusBadge tone={booking.status === "confirmed" ? "success" : "warning"}>
                      {BOOKING_LABELS[booking.status] ?? booking.status}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {getDoctorName(booking.doctorId)} / {booking.scheduledAt}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Phone className="size-4 text-primary" aria-hidden />
                    {booking.phone}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Desk action: {booking.status === "confirmed" ? "prepare visit" : "confirm slot"}
                </p>
                <select
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                  onChange={(event) => updateBookingStatus(booking.id, event.target.value as BookingStatus)}
                  value={booking.status}
                >
                  {Object.entries(BOOKING_LABELS).map(([status, label]) => (
                    <option key={status} value={status}>
                      {label}
                    </option>
                  ))}
                </select>
              </article>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-lg border p-5">
          <div className="flex items-center gap-2">
            <ClipboardList className="size-5 text-primary" aria-hidden />
            <h2 className="font-semibold">Quick local controls</h2>
          </div>
          <div className="mt-4 grid gap-3">
            <Button
              className="w-full justify-start"
              onClick={() =>
                setCallbacks((current) =>
                  current.map((callback) =>
                    callback.status === "pending"
                      ? { ...callback, status: "called" }
                      : callback,
                  ),
                )
              }
              type="button"
              variant="outline"
            >
              <Phone className="size-4" aria-hidden />
              Mark pending callbacks called
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() =>
                setBookings((current) =>
                  current.map((booking) =>
                    booking.status === "pending"
                      ? { ...booking, status: "confirmed" }
                      : booking,
                  ),
                )
              }
              type="button"
              variant="outline"
            >
              <CheckCircle2 className="size-4" aria-hidden />
              Confirm pending bookings
            </Button>
          </div>
        </section>

        <section className="rounded-lg border p-5">
          <Clock3 className="size-5 text-primary" aria-hidden />
          <h2 className="mt-4 font-semibold">Shift snapshot</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {pendingCallbacks} callbacks and {pendingBookings} pending bookings need attention
            in this fixture shift.
          </p>
        </section>

        <BoundaryCard
          text="Front-desk phone queue visibility, booking confirmation and patient notes must be scoped by tenant and role through Supabase Auth, RLS and server actions. Nothing here writes to the database."
          title="Implementation boundary"
        />
      </aside>
    </div>
  );
}

function CallbackRow({
  callback,
  onStatusChange,
}: {
  callback: FrontDeskCallbackFixture;
  onStatusChange: (status: FrontDeskCallbackStatus) => void;
}) {
  return (
    <article className="grid gap-4 p-4 lg:grid-cols-[1fr_170px_150px] lg:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{callback.patientName}</h3>
          <StatusBadge tone={callback.status === "called" ? "success" : "warning"}>
            {CALLBACK_LABELS[callback.status]}
          </StatusBadge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {getDoctorName(callback.doctorId)} / {callback.reason}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm">
          <Phone className="size-4 text-primary" aria-hidden />
          {callback.phone}
        </p>
      </div>
      <p className="text-sm text-muted-foreground">Due {callback.dueAt}</p>
      <select
        className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
        onChange={(event) => onStatusChange(event.target.value as FrontDeskCallbackStatus)}
        value={callback.status}
      >
        {Object.entries(CALLBACK_LABELS).map(([status, label]) => (
          <option key={status} value={status}>
            {label}
          </option>
        ))}
      </select>
    </article>
  );
}

function RoleMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Stethoscope;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border p-4">
      <Icon className="size-5 text-primary" aria-hidden />
      <p className="mt-4 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionHeader({
  detail,
  icon: Icon,
  title,
}: {
  detail: string;
  icon: typeof Stethoscope;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-primary" aria-hidden />
          <h2 className="font-semibold">{title}</h2>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function StatusBadge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger";
}) {
  const classes: Record<"neutral" | "success" | "warning" | "danger", string> = {
    neutral: "bg-accent text-accent-foreground",
    success: "bg-primary/10 text-primary",
    warning: "bg-secondary text-secondary-foreground",
    danger: "bg-destructive/10 text-destructive",
  };

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium ${classes[tone]}`}>
      {children}
    </span>
  );
}

function BoundaryCard({ text, title }: { text: string; title: string }) {
  return (
    <section className="rounded-lg border p-5">
      <LayoutDashboard className="size-5 text-primary" aria-hidden />
      <h2 className="mt-4 font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
    </section>
  );
}
