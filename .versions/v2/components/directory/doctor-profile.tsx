"use client";

import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  Languages,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  formatFee,
  getRelatedDoctors,
  type DoctorFixture,
} from "@/lib/demo-directory";

import { LeadRequestDialog } from "./lead-request-dialog";

export function DoctorProfile({ doctor }: { doctor: DoctorFixture }) {
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const relatedDoctors = getRelatedDoctors(doctor);

  return (
    <>
      <main className="min-h-dvh bg-background">
        <div className="mx-auto max-w-6xl px-5 py-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft aria-hidden /> Back to search
            </Link>
          </Button>

          <section className="mt-5 grid gap-6 rounded-lg border bg-background p-5 shadow-sm lg:grid-cols-[1fr_320px] lg:p-7">
            <div>
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-accent text-2xl font-semibold text-accent-foreground">
                  {doctor.name
                    .split(" ")
                    .slice(1, 3)
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">{doctor.name}</h1>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      <CheckCircle2 className="size-4" aria-hidden /> Verified
                    </span>
                  </div>
                  <p className="mt-2 text-base text-muted-foreground">
                    {doctor.specialty} / {doctor.experienceYears} years experience
                  </p>
                  <p className="mt-4 max-w-2xl leading-7">{doctor.summary}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <ProfileFact icon={MapPin} label={`${doctor.clinic}, ${doctor.area}`} />
                <ProfileFact icon={IndianRupee} label={`${formatFee(doctor.feePaise)} fee`} />
                <ProfileFact icon={CalendarCheck} label={doctor.nextAvailable} />
                <ProfileFact icon={Languages} label={doctor.languages.join(", ")} />
              </div>

              <div className="mt-7">
                <h2 className="text-lg font-semibold">Common reasons patients book</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {doctor.highlights.map((highlight) => (
                    <span
                      className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                      key={highlight}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="rounded-lg border bg-secondary/25 p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="size-4 text-primary" aria-hidden />
                {doctor.rating} rating from {doctor.reviews} reviews
              </div>
              <h2 className="mt-4 text-xl font-semibold">Request this appointment</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The form currently validates locally and preserves the security boundary:
                public persistence waits for the reviewed `create_lead()` RPC.
              </p>
              <Button className="mt-5 w-full" onClick={() => setShowLeadDialog(true)}>
                <CalendarCheck aria-hidden /> Book appointment
              </Button>
              <div className="mt-4 flex items-start gap-2 rounded-md bg-background p-3 text-sm">
                <ShieldCheck className="mt-0.5 size-4 text-primary" aria-hidden />
                <span>Consent copy and medical disclaimer are visible before submission.</span>
              </div>
            </aside>
          </section>

          {relatedDoctors.length > 0 ? (
            <section className="mt-8">
              <h2 className="text-xl font-semibold">Related doctors</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {relatedDoctors.map((related) => (
                  <Link
                    className="rounded-lg border p-4 transition hover:border-primary"
                    href={`/doctors/${related.slug}`}
                    key={related.id}
                  >
                    <p className="font-semibold">{related.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {related.specialty} / {related.area}
                    </p>
                    <p className="mt-3 text-sm">{related.nextAvailable}</p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <LeadRequestDialog
        doctor={showLeadDialog ? doctor : null}
        onClose={() => setShowLeadDialog(false)}
      />
    </>
  );
}

function ProfileFact({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border p-3 text-sm">
      <Icon className="size-4 text-primary" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
