"use client";

import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/constants";
import {
  BOOKING_PREVIEW_FIXTURES,
  NOTIFICATION_PREVIEW_FIXTURES,
  getBookingStatusCounts,
  getDoctorName,
  renderNotificationCopy,
  renderNotificationSubject,
  type BookingPreviewFixture,
  type ReminderChannel,
} from "@/lib/demo-operations";

const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  rescheduled: "Rescheduled",
  cancelled: "Cancelled",
  completed: "Completed",
  no_show: "No show",
};

const BOOKING_STATUS_HELP: Record<BookingStatus, string> = {
  pending: "Slot requested, clinic confirmation still required.",
  confirmed: "Clinic accepted the appointment and reminders may be queued.",
  rescheduled: "Original slot changed and the patient accepted a new time.",
  cancelled: "Appointment is no longer active and reminders must stop.",
  completed: "Patient checked in and consultation is marked complete.",
  no_show: "Patient missed the slot and staff follow-up may be required.",
};

const CHANNEL_ICONS: Record<ReminderChannel, typeof Phone> = {
  sms: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

export function BookingPreview() {
  const [bookings, setBookings] = useState<BookingPreviewFixture[]>(
    BOOKING_PREVIEW_FIXTURES,
  );
  const [selectedBookingId, setSelectedBookingId] = useState(
    BOOKING_PREVIEW_FIXTURES[0]?.id ?? "",
  );
  const [selectedChannel, setSelectedChannel] = useState<ReminderChannel>("sms");

  const selectedBooking = useMemo(
    () =>
      bookings.find((booking) => booking.id === selectedBookingId) ??
      bookings[0],
    [bookings, selectedBookingId],
  );
  const selectedNotification = useMemo(
    () =>
      NOTIFICATION_PREVIEW_FIXTURES.find(
        (notification) => notification.channel === selectedChannel,
      ) ?? NOTIFICATION_PREVIEW_FIXTURES[0]!,
    [selectedChannel],
  );
  const statusCounts = useMemo(() => getBookingStatusCounts(bookings), [bookings]);
  const todayBookings = useMemo(
    () => bookings.filter((booking) => booking.dayLabel === "Today"),
    [bookings],
  );
  const upcomingBookings = useMemo(
    () => bookings.filter((booking) => booking.dayLabel === "Upcoming"),
    [bookings],
  );

  function updateBookingStatus(bookingId: string, status: BookingStatus) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking,
      ),
    );
  }

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Local booking workspace</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Patient booking preview
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Fixture-backed appointment list and reminder copy preview for validating
              booking operations before live server actions are connected.
            </p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:flex sm:flex-wrap">
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/">
                <CalendarDays aria-hidden />
                Public search
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/dashboard">
                <Clock3 aria-hidden />
                Lead pipeline
              </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/roles">Role workspaces</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/ai-preview">AI preview</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/admin">
                <ShieldCheck aria-hidden />
                Admin review
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <BookingMetric
              icon={Clock3}
              label="Pending"
              value={statusCounts.pending.toString()}
            />
            <BookingMetric
              icon={CheckCircle2}
              label="Confirmed"
              value={statusCounts.confirmed.toString()}
            />
            <BookingMetric
              icon={RotateCw}
              label="Rescheduled"
              value={statusCounts.rescheduled.toString()}
            />
            <BookingMetric
              icon={Bell}
              label="Reminder previews"
              value={NOTIFICATION_PREVIEW_FIXTURES.length.toString()}
            />
          </div>

          <BookingListSection
            bookings={todayBookings}
            onSelectBooking={setSelectedBookingId}
            onStatusChange={updateBookingStatus}
            selectedBookingId={selectedBooking?.id}
            title="Today's appointment slots"
          />

          <BookingListSection
            bookings={upcomingBookings}
            onSelectBooking={setSelectedBookingId}
            onStatusChange={updateBookingStatus}
            selectedBookingId={selectedBooking?.id}
            title="Upcoming and recent lifecycle samples"
          />
        </div>

        <aside className="min-w-0 space-y-6">
          <section className="rounded-lg border p-5">
            <div className="flex items-center gap-2">
              <RotateCw className="size-5 text-primary" aria-hidden />
              <h2 className="font-semibold">Booking lifecycle preview</h2>
            </div>
            <div className="mt-5 space-y-3">
              {BOOKING_STATUSES.map((status) => (
                <div className="rounded-md bg-secondary/50 p-3" key={status}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">
                      {BOOKING_STATUS_LABELS[status]}
                    </p>
                    <span className="rounded-md bg-background px-2 py-1 text-xs font-medium">
                      {statusCounts[status]}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {BOOKING_STATUS_HELP[status]}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {selectedBooking ? (
            <NotificationPreviewPanel
              booking={selectedBooking}
              channel={selectedChannel}
              notification={selectedNotification}
              onBookingChange={setSelectedBookingId}
              onChannelChange={setSelectedChannel}
            />
          ) : null}

          <section className="rounded-lg border p-5">
            <ShieldCheck className="size-5 text-primary" aria-hidden />
            <h2 className="mt-4 font-semibold">Implementation boundary</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This page is local UI state only. Real booking mutations,
              reminders and delivery logs require server actions, tenant-scoped
              Supabase RLS, and a provider decision for SMS, WhatsApp and email.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}

function BookingListSection({
  bookings,
  onSelectBooking,
  onStatusChange,
  selectedBookingId,
  title,
}: {
  bookings: BookingPreviewFixture[];
  onSelectBooking: (bookingId: string) => void;
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
  selectedBookingId?: string;
  title: string;
}) {
  return (
    <section className="rounded-lg border bg-background">
      <div className="border-b p-4">
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Status changes update fixture state only for this browser session.
        </p>
      </div>
      <div className="divide-y">
        {bookings.map((booking) => (
          <BookingRow
            booking={booking}
            isSelected={booking.id === selectedBookingId}
            key={booking.id}
            onSelectBooking={onSelectBooking}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </section>
  );
}

function BookingRow({
  booking,
  isSelected,
  onSelectBooking,
  onStatusChange,
}: {
  booking: BookingPreviewFixture;
  isSelected: boolean;
  onSelectBooking: (bookingId: string) => void;
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
}) {
  return (
    <article className="grid min-w-0 gap-4 p-4 lg:grid-cols-[1fr_210px_190px] lg:items-center">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="min-w-0 font-semibold">{booking.patientName}</h3>
          <StatusBadge>{BOOKING_STATUS_LABELS[booking.status]}</StatusBadge>
        </div>
        <p className="mt-1 break-words text-sm text-muted-foreground">
          {booking.reason} / {getDoctorName(booking.doctorId)}
        </p>
        <p className="mt-2 break-words text-xs text-muted-foreground">
          {booking.clinic}, {booking.area} / {booking.source}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {booking.timeline.map((event) => (
            <span
              className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
              key={event}
            >
              {event}
            </span>
          ))}
        </div>
      </div>

      <div className="min-w-0 text-sm">
        <p className="flex items-center gap-2 font-medium">
          <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
          <span className="break-words">{booking.slotLabel}</span>
        </p>
        <p className="mt-2 break-words text-muted-foreground">
          Reminder: {booking.reminderDue}
        </p>
        <p className="mt-2 flex items-center gap-2 break-words text-muted-foreground">
          <Phone className="size-4 shrink-0 text-primary" aria-hidden />
          <span>{booking.phone}</span>
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <select
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
          onChange={(event) =>
            onStatusChange(booking.id, event.target.value as BookingStatus)
          }
          value={booking.status}
        >
          {BOOKING_STATUSES.map((status) => (
            <option key={status} value={status}>
              {BOOKING_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <Button
          className="w-full"
          onClick={() => onSelectBooking(booking.id)}
          type="button"
          variant={isSelected ? "default" : "outline"}
        >
          <Bell aria-hidden />
          Preview reminder
        </Button>
      </div>
    </article>
  );
}

function NotificationPreviewPanel({
  booking,
  channel,
  notification,
  onBookingChange,
  onChannelChange,
}: {
  booking: BookingPreviewFixture;
  channel: ReminderChannel;
  notification: (typeof NOTIFICATION_PREVIEW_FIXTURES)[number];
  onBookingChange: (bookingId: string) => void;
  onChannelChange: (channel: ReminderChannel) => void;
}) {
  const ChannelIcon = CHANNEL_ICONS[channel];
  const copy = renderNotificationCopy(notification, booking);
  const subject = renderNotificationSubject(notification, booking);

  return (
    <section className="rounded-lg border p-5">
      <div className="flex items-center gap-2">
        <Bell className="size-5 text-primary" aria-hidden />
        <h2 className="font-semibold">Notification preview</h2>
      </div>

      <div className="mt-5 grid gap-3">
        <label className="grid gap-2 text-sm font-medium">
          Booking
          <select
            className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal outline-none ring-ring transition focus:ring-2"
            onChange={(event) => onBookingChange(event.target.value)}
            value={booking.id}
          >
            {BOOKING_PREVIEW_FIXTURES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.patientName} / {item.slotLabel}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Reminder channel
          <select
            className="h-10 w-full rounded-md border bg-background px-3 text-sm font-normal outline-none ring-ring transition focus:ring-2"
            onChange={(event) => onChannelChange(event.target.value as ReminderChannel)}
            value={channel}
          >
            {NOTIFICATION_PREVIEW_FIXTURES.map((item) => (
              <option key={item.channel} value={item.channel}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-md bg-secondary/50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm font-medium">
            <ChannelIcon className="size-4 text-primary" aria-hidden />
            {notification.label} to {notification.deliveryTarget}
          </p>
          <StatusBadge>{BOOKING_STATUS_LABELS[booking.status]}</StatusBadge>
        </div>

        {subject ? (
          <p className="mt-4 break-words text-sm font-medium">Subject: {subject}</p>
        ) : null}

        <p className="mt-4 break-words text-sm leading-6">{copy}</p>
        <p className="mt-4 break-words text-xs leading-5 text-muted-foreground">
          {notification.complianceNote}
        </p>
      </div>
    </section>
  );
}

function BookingMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
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

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
      {children}
    </span>
  );
}
