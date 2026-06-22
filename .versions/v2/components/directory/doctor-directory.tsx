"use client";

import {
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AREA_FILTERS,
  DOCTOR_FIXTURES,
  SPECIALTY_FILTERS,
  formatFee,
  type DoctorFixture,
} from "@/lib/demo-directory";

import { LeadRequestDialog } from "./lead-request-dialog";

export function DoctorDirectory() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<(typeof SPECIALTY_FILTERS)[number]>(
    "All specialties",
  );
  const [area, setArea] = useState<(typeof AREA_FILTERS)[number]>("All areas");
  const [activeDoctor, setActiveDoctor] = useState<DoctorFixture | null>(null);

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return DOCTOR_FIXTURES.filter((doctor) => {
      const matchesSpecialty =
        specialty === "All specialties" || doctor.specialty === specialty;
      const matchesArea = area === "All areas" || doctor.area === area;
      const searchable = [
        doctor.name,
        doctor.specialty,
        doctor.clinic,
        doctor.area,
        doctor.summary,
        ...doctor.highlights,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || searchable.includes(normalizedQuery);

      return matchesSpecialty && matchesArea && matchesQuery;
    });
  }, [area, query, specialty]);

  const sameDayCount = DOCTOR_FIXTURES.filter((doctor) =>
    doctor.nextAvailable.startsWith("Today"),
  ).length;

  return (
    <>
      <main className="min-h-dvh bg-background text-foreground">
        <header className="border-b bg-background/95">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Stethoscope className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-base font-semibold">Doctor Platform</p>
                <p className="text-xs text-muted-foreground">Udaipur doctor directory</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a className="transition hover:text-foreground" href="#directory">
                Search
              </a>
              <a className="transition hover:text-foreground" href="#how-it-works">
                Lead flow
              </a>
              <a className="transition hover:text-foreground" href="#supply">
                For clinics
              </a>
              <Link className="transition hover:text-foreground" href="/dashboard">
                Staff
              </Link>
              <Link className="transition hover:text-foreground" href="/admin">
                Admin
              </Link>
            </nav>
            <Button asChild variant="outline">
              <Link href="/onboarding">List practice</Link>
            </Button>
          </div>
        </header>

        <section className="border-b bg-secondary/35">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_360px] lg:py-14">
            <div className="flex flex-col justify-center">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Find a verified doctor in Udaipur and request a booking callback.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                Search by specialty, area or symptom. The patient request flow is wired
                locally first, ready for the Phase 1 Supabase lead RPC handoff.
              </p>

              <div className="mt-7 grid gap-3 rounded-lg border bg-background p-3 shadow-sm lg:grid-cols-[1fr_190px_170px_auto]">
                <label className="flex min-h-11 items-center gap-2 rounded-md border bg-background px-3">
                  <Search className="size-4 text-muted-foreground" aria-hidden />
                  <input
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search fever, knee pain, dentist..."
                    value={query}
                  />
                </label>
                <label className="flex min-h-11 items-center gap-2 rounded-md border bg-background px-3">
                  <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden />
                  <select
                    className="w-full bg-transparent text-sm outline-none"
                    onChange={(event) =>
                      setSpecialty(event.target.value as (typeof SPECIALTY_FILTERS)[number])
                    }
                    value={specialty}
                  >
                    {SPECIALTY_FILTERS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="flex min-h-11 items-center gap-2 rounded-md border bg-background px-3">
                  <MapPin className="size-4 text-muted-foreground" aria-hidden />
                  <select
                    className="w-full bg-transparent text-sm outline-none"
                    onChange={(event) =>
                      setArea(event.target.value as (typeof AREA_FILTERS)[number])
                    }
                    value={area}
                  >
                    {AREA_FILTERS.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <Button onClick={() => setQuery(query.trim())}>
                  <Search aria-hidden /> Search
                </Button>
              </div>
            </div>

            <aside className="rounded-lg border bg-background p-5 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">Local launch snapshot</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Metric label="Verified doctors" value={DOCTOR_FIXTURES.length.toString()} />
                <Metric label="Same-day slots" value={sameDayCount.toString()} />
                <Metric label="Lead status" value="New" />
                <Metric label="Market" value="Udaipur" />
              </div>
              <div className="mt-5 rounded-md bg-accent p-4 text-sm leading-6 text-accent-foreground">
                Direct patient submissions remain local until the security-definer lead
                RPC is implemented and reviewed.
              </div>
            </aside>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_320px]"
          id="directory"
        >
          <div>
            <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold">Available doctors</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filteredDoctors.length} result{filteredDoctors.length === 1 ? "" : "s"} match
                  the current filters.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Sorted by verification, availability and rating.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              {filteredDoctors.map((doctor) => (
                <DoctorResult
                  doctor={doctor}
                  key={doctor.id}
                  onRequestLead={() => setActiveDoctor(doctor)}
                />
              ))}
              {filteredDoctors.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <p className="font-medium">No doctors match those filters.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try a broader specialty, area, or symptom search.
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <ProcessPanel />
            <div className="rounded-lg border p-5" id="supply">
              <h3 className="font-semibold">Clinic onboarding next</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Doctor onboarding, listing edits, availability management and dashboard
                screens are the next Codex-owned Phase 1 surfaces after this public flow.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href="/onboarding">Open onboarding</Link>
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/admin">Review queue</Link>
                </Button>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <LeadRequestDialog doctor={activeDoctor} onClose={() => setActiveDoctor(null)} />
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function DoctorResult({
  doctor,
  onRequestLead,
}: {
  doctor: DoctorFixture;
  onRequestLead: () => void;
}) {
  return (
    <article className="rounded-lg border bg-background p-5 shadow-sm">
      <div className="grid gap-5 md:grid-cols-[1fr_auto]">
        <div className="flex gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-accent text-lg font-semibold text-accent-foreground">
            {doctor.name
              .split(" ")
              .slice(1, 3)
              .map((part) => part[0])
              .join("")}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              {doctor.verified ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3.5" aria-hidden /> Verified
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {doctor.specialty} / {doctor.experienceYears} years experience
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6">{doctor.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {doctor.highlights.map((highlight) => (
                <span
                  className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  key={highlight}
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2 text-sm md:min-w-56">
          <InfoRow icon={MapPin} label={`${doctor.clinic}, ${doctor.area}`} />
          <InfoRow icon={IndianRupee} label={`${formatFee(doctor.feePaise)} consultation`} />
          <InfoRow icon={CalendarCheck} label={doctor.nextAvailable} />
          <InfoRow icon={Star} label={`${doctor.rating} (${doctor.reviews} reviews)`} />
        </div>
      </div>

        <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Languages: {doctor.languages.join(", ")} / {doctor.availabilityLabel}
        </p>
        <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end">
          <Button asChild className="w-full sm:w-auto" variant="ghost">
            <Link href={`/doctors/${doctor.slug}`}>View profile</Link>
          </Button>
          <Button className="w-full sm:w-auto" onClick={onRequestLead} variant="outline">
            Request call
          </Button>
          <Button className="w-full sm:w-auto" onClick={onRequestLead}>
            <CalendarCheck aria-hidden /> Book
          </Button>
        </div>
      </div>
    </article>
  );
}

function InfoRow({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="size-4 text-primary" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

function ProcessPanel() {
  return (
    <div className="rounded-lg border p-5" id="how-it-works">
      <h3 className="font-semibold">Lead flow being validated</h3>
      <ol className="mt-4 space-y-4 text-sm">
        {[
          "Patient searches and selects a verified doctor.",
          "Call or Book opens the lead popup with consent.",
          "Local preview validates required fields and phone shape.",
          "Phase 1 RPC will create the tenant-scoped lead server-side.",
        ].map((item, index) => (
          <li className="flex gap-3" key={item}>
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <span className="leading-6 text-muted-foreground">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
