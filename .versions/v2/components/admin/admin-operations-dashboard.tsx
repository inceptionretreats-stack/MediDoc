"use client";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  Star,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AUDIT_EVENT_FIXTURES,
  BOOKING_FIXTURES,
  LEAD_FIXTURES,
  PLATFORM_METRICS,
  REVIEW_FIXTURES,
  VERIFICATION_FIXTURES,
  getDoctorName,
  getLeadCounts,
  type ReviewFixture,
  type VerificationFixture,
} from "@/lib/demo-operations";

const VERIFICATION_LABELS: Record<VerificationFixture["status"], string> = {
  pending: "Pending",
  needs_changes: "Needs changes",
  approved: "Approved",
};

const REVIEW_LABELS: Record<ReviewFixture["status"], string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export function AdminOperationsDashboard() {
  const [verificationQueue, setVerificationQueue] = useState(VERIFICATION_FIXTURES);
  const [reviews, setReviews] = useState(REVIEW_FIXTURES);

  const leadCounts = useMemo(() => getLeadCounts(LEAD_FIXTURES), []);
  const pendingVerifications = verificationQueue.filter(
    (item) => item.status !== "approved",
  ).length;
  const pendingReviews = reviews.filter((review) => review.status === "pending").length;
  const bookedLeads = leadCounts.booked + leadCounts.closed_won;
  const totalLeads = LEAD_FIXTURES.length;
  const conversionPercent = Math.round((bookedLeads / totalLeads) * 100);

  function updateVerificationStatus(
    verificationId: string,
    status: VerificationFixture["status"],
  ) {
    setVerificationQueue((current) =>
      current.map((item) => (item.id === verificationId ? { ...item, status } : item)),
    );
  }

  function updateReviewStatus(reviewId: string, status: ReviewFixture["status"]) {
    setReviews((current) =>
      current.map((review) => (review.id === reviewId ? { ...review, status } : review)),
    );
  }

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Local admin workspace</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Platform operations review
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Fixture-backed Admin and Super Admin view for verification, moderation,
              analytics and audit readiness.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:flex sm:flex-wrap">
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/">Public search</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/dashboard">Lead pipeline</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/onboarding">Onboard doctor</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <AdminMetric
              icon={UserRoundCheck}
              label="Verification queue"
              value={pendingVerifications.toString()}
            />
            <AdminMetric icon={Star} label="Reviews pending" value={pendingReviews.toString()} />
            <AdminMetric
              icon={BarChart3}
              label="Lead conversion"
              value={`${conversionPercent}%`}
            />
            <AdminMetric
              icon={Activity}
              label="Bookings today"
              value={BOOKING_FIXTURES.length.toString()}
            />
          </div>

          <section className="rounded-lg border bg-background">
            <div className="border-b p-4">
              <h2 className="font-semibold">Doctor verification queue</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Local action state for validating the admin review workflow.
              </p>
            </div>
            <div className="divide-y">
              {verificationQueue.map((item) => (
                <VerificationRow
                  item={item}
                  key={item.id}
                  onStatusChange={(status) => updateVerificationStatus(item.id, status)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-lg border bg-background">
            <div className="border-b p-4">
              <h2 className="font-semibold">Review moderation</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Public trust controls remain local until moderated review tables are wired.
              </p>
            </div>
            <div className="divide-y">
              {reviews.map((review) => (
                <ReviewRow
                  key={review.id}
                  onStatusChange={(status) => updateReviewStatus(review.id, status)}
                  review={review}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border p-5">
            <div className="flex items-center gap-2">
              <BarChart3 className="size-5 text-primary" aria-hidden />
              <h2 className="font-semibold">Operating snapshot</h2>
            </div>
            <div className="mt-5 space-y-4">
              {PLATFORM_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{metric.label}</p>
                    <span className="text-sm font-semibold">{metric.value}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: metricWidth(metric.label) }}
                    />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {metric.detail} / {metric.trend}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" aria-hidden />
              <h2 className="font-semibold">Audit trail preview</h2>
            </div>
            <div className="mt-4 space-y-3">
              {AUDIT_EVENT_FIXTURES.map((event) => (
                <div className="rounded-md bg-secondary/50 p-3" key={event.id}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{event.action}</p>
                    {event.severity === "warning" ? (
                      <AlertTriangle className="size-4 shrink-0 text-destructive" aria-hidden />
                    ) : (
                      <Activity className="size-4 shrink-0 text-primary" aria-hidden />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.actor} / {event.target} / {event.occurredAt}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border p-5">
            <ClipboardCheck className="size-5 text-primary" aria-hidden />
            <h2 className="mt-4 font-semibold">Implementation boundary</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This route validates role-dashboard UX only. Real verification,
              moderation, audit writes and cross-tenant visibility must be enforced
              server-side by Supabase RLS after the dedicated project is selected.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}

function AdminMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRoundCheck;
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

function VerificationRow({
  item,
  onStatusChange,
}: {
  item: VerificationFixture;
  onStatusChange: (status: VerificationFixture["status"]) => void;
}) {
  const completeCount = item.checklist.filter((check) => check.complete).length;

  return (
    <article className="grid gap-4 p-4 lg:grid-cols-[1fr_220px_170px] lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{item.doctorName}</h3>
          <StatusBadge>{VERIFICATION_LABELS[item.status]}</StatusBadge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {item.specialty} / {item.clinic}, {item.area}
        </p>
        <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
          {item.checklist.map((check) => (
            <span className="flex items-start gap-1.5" key={check.label}>
              {check.complete ? (
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
              ) : (
                <AlertTriangle
                  className="mt-0.5 size-3.5 shrink-0 text-destructive"
                  aria-hidden
                />
              )}
              {check.label}
            </span>
          ))}
        </div>
      </div>

      <div className="text-sm">
        <p className="font-medium">
          {completeCount} of {item.checklist.length} checks complete
        </p>
        <p className="mt-1 text-muted-foreground">Submitted {item.submittedAt}</p>
      </div>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
        onChange={(event) =>
          onStatusChange(event.target.value as VerificationFixture["status"])
        }
        value={item.status}
      >
        {Object.entries(VERIFICATION_LABELS).map(([status, label]) => (
          <option key={status} value={status}>
            {label}
          </option>
        ))}
      </select>
    </article>
  );
}

function ReviewRow({
  review,
  onStatusChange,
}: {
  review: ReviewFixture;
  onStatusChange: (status: ReviewFixture["status"]) => void;
}) {
  return (
    <article className="grid gap-4 p-4 lg:grid-cols-[1fr_190px_170px] lg:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{review.patientName}</h3>
          <StatusBadge>{REVIEW_LABELS[review.status]}</StatusBadge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{getDoctorName(review.doctorId)}</p>
        <p className="mt-2 text-sm leading-6">{review.comment}</p>
      </div>

      <div className="text-sm">
        <p className="flex items-center gap-1.5 font-medium">
          <Star className="size-4 text-primary" aria-hidden />
          {review.rating} out of 5
        </p>
        <p className="mt-1 text-muted-foreground">Submitted {review.submittedAt}</p>
      </div>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
        onChange={(event) => onStatusChange(event.target.value as ReviewFixture["status"])}
        value={review.status}
      >
        {Object.entries(REVIEW_LABELS).map(([status, label]) => (
          <option key={status} value={status}>
            {label}
          </option>
        ))}
      </select>
    </article>
  );
}

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
      {children}
    </span>
  );
}

function metricWidth(label: string) {
  const widths: Record<string, string> = {
    "Lead conversion": "25%",
    "Verification queue": "75%",
    "Review moderation": "50%",
    "SLA risk": "20%",
  };

  return widths[label] ?? "35%";
}
