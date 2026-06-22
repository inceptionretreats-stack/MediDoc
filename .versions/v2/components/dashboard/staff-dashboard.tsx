"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Filter,
  Phone,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { LeadStatus } from "@/lib/constants";
import {
  BOOKING_FIXTURES,
  LEAD_FIXTURES,
  getDoctorName,
  getLeadCounts,
  type LeadFixture,
} from "@/lib/demo-operations";

const STATUS_FILTERS: Array<LeadStatus | "all"> = [
  "all",
  "new",
  "contacted",
  "booked",
  "closed_won",
  "closed_lost",
];

const STATUS_LABELS: Record<LeadStatus | "all", string> = {
  all: "All",
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  closed_won: "Closed won",
  closed_lost: "Closed lost",
};

export function StaffDashboard() {
  const [leads, setLeads] = useState<LeadFixture[]>(LEAD_FIXTURES);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");

  const counts = useMemo(() => getLeadCounts(leads), [leads]);
  const filteredLeads = useMemo(
    () =>
      statusFilter === "all"
        ? leads
        : leads.filter((lead) => lead.status === statusFilter),
    [leads, statusFilter],
  );

  function updateLeadStatus(leadId: string, status: LeadStatus) {
    setLeads((current) =>
      current.map((lead) => (lead.id === leadId ? { ...lead, status } : lead)),
    );
  }

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Local staff workspace</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Lead pipeline</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fixture-backed dashboard for validating Phase 1 workflow before live RLS tests.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:flex sm:flex-wrap">
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/">Public search</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/admin">Admin review</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/onboarding">Onboard doctor</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardMetric icon={Phone} label="New leads" value={counts.new.toString()} />
            <DashboardMetric
              icon={UserRoundCheck}
              label="Contacted"
              value={counts.contacted.toString()}
            />
            <DashboardMetric icon={CheckCircle2} label="Booked" value={counts.booked.toString()} />
            <DashboardMetric
              icon={Clock3}
              label="SLA risk"
              value={leads.filter((lead) => lead.slaMinutesRemaining <= 20).length.toString()}
            />
          </div>

          <div className="rounded-lg border bg-background">
            <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold">Incoming leads</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Status changes here are local UI state until backend actions are connected.
                </p>
              </div>
              <label className="flex h-10 items-center gap-2 rounded-md border px-3 text-sm">
                <Filter className="size-4 text-muted-foreground" aria-hidden />
                <select
                  className="bg-transparent outline-none"
                  onChange={(event) =>
                    setStatusFilter(event.target.value as LeadStatus | "all")
                  }
                  value={statusFilter}
                >
                  {STATUS_FILTERS.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="divide-y">
              {filteredLeads.map((lead) => (
                <LeadRow
                  key={lead.id}
                  lead={lead}
                  onStatusChange={(status) => updateLeadStatus(lead.id, status)}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border p-5">
            <h2 className="font-semibold">Today&apos;s bookings</h2>
            <div className="mt-4 space-y-4">
              {BOOKING_FIXTURES.map((booking) => (
                <div className="rounded-md bg-secondary/50 p-4" key={booking.id}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{booking.patientName}</p>
                    <span className="rounded-md bg-background px-2 py-1 text-xs font-medium uppercase">
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {getDoctorName(booking.doctorId)}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm">
                    <CalendarDays className="size-4 text-primary" aria-hidden />
                    {booking.scheduledAt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-5">
            <h2 className="font-semibold">Implementation boundary</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This screen validates role-dashboard UX only. Real assignment,
              booking mutation and audit writes must go through server actions and
              Supabase RLS after credentials are connected.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function DashboardMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
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

function LeadRow({
  lead,
  onStatusChange,
}: {
  lead: LeadFixture;
  onStatusChange: (status: LeadStatus) => void;
}) {
  return (
    <article className="grid gap-4 p-4 lg:grid-cols-[1fr_180px_150px] lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{lead.patientName}</h3>
          <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
            {STATUS_LABELS[lead.status]}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {lead.problem} / {getDoctorName(lead.doctorId)}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {lead.source} / preferred {lead.preferredTime} / assigned to {lead.assignedTo}
        </p>
      </div>

      <div className="text-sm">
        <p className="flex items-center gap-2">
          <Phone className="size-4 text-primary" aria-hidden />
          {lead.phone}
        </p>
        <p className="mt-2 text-muted-foreground">
          SLA: {lead.slaMinutesRemaining > 0 ? `${lead.slaMinutesRemaining} min left` : "met"}
        </p>
      </div>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
        onChange={(event) => onStatusChange(event.target.value as LeadStatus)}
        value={lead.status}
      >
        {STATUS_FILTERS.filter((status) => status !== "all").map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </article>
  );
}
