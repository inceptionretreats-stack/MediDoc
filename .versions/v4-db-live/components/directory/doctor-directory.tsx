"use client";

import {
  CalendarCheck,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
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
      <section id="directory" className="relative py-16 bg-gradient-to-b from-white via-lavender-50/30 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-lavender-700 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-200">
              <span className="w-1.5 h-1.5 rounded-full bg-lavender-600 animate-pulse" />
              Verified doctors in Udaipur
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Find a <span className="gradient-text">verified doctor</span> and request a callback
            </h2>
            <p className="mt-2 text-slate-600">
              Search by specialty, area or symptom. {DOCTOR_FIXTURES.length} verified
              doctors · {sameDayCount} same-day slots available.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <div className="grid gap-3 rounded-2xl border border-lavender-100 bg-white p-3 shadow-soft lg:grid-cols-[1fr_220px_200px_auto]">
              <label className="flex min-h-11 items-center gap-2 rounded-xl border border-lavender-100 bg-white px-3">
                <Search className="size-4 text-lavender-600" aria-hidden />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search fever, knee pain, dentist…"
                  value={query}
                />
              </label>
              <label className="flex min-h-11 items-center gap-2 rounded-xl border border-lavender-100 bg-white px-3">
                <SlidersHorizontal className="size-4 text-lavender-600" aria-hidden />
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
              <label className="flex min-h-11 items-center gap-2 rounded-xl border border-lavender-100 bg-white px-3">
                <MapPin className="size-4 text-rose-500" aria-hidden />
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
              <Button variant="gradient" onClick={() => setQuery(query.trim())}>
                <Search aria-hidden /> Search
              </Button>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col justify-between gap-3 border-b border-lavender-100 pb-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Available doctors</h3>
              <p className="mt-1 text-sm text-slate-500">
                {filteredDoctors.length} result{filteredDoctors.length === 1 ? "" : "s"} match the current filters.
              </p>
            </div>
            <p className="text-sm text-slate-500">
              Sorted by verification, availability and rating.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {filteredDoctors.map((doctor) => (
              <DoctorResult
                doctor={doctor}
                key={doctor.id}
                onRequestLead={() => setActiveDoctor(doctor)}
              />
            ))}
            {filteredDoctors.length === 0 ? (
              <div className="md:col-span-2 rounded-2xl border border-dashed border-lavender-200 p-8 text-center bg-white">
                <p className="font-display font-semibold text-slate-900">No doctors match those filters.</p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a broader specialty, area, or symptom search.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <LeadRequestDialog doctor={activeDoctor} onClose={() => setActiveDoctor(null)} />
    </>
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
    <article className="card-hover rounded-2xl border border-lavender-100 bg-white p-5 shadow-soft">
      <div className="flex gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-100 to-sky-100 text-lg font-display font-bold text-lavender-800">
          {doctor.name
            .split(" ")
            .slice(1, 3)
            .map((part) => part[0])
            .join("")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-bold text-slate-900 truncate">{doctor.name}</h3>
            {doctor.verified ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-lavender-700 bg-lavender-50 border border-lavender-200 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="size-3.5" aria-hidden /> Verified
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {doctor.specialty} · {doctor.experienceYears} yrs experience
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">{doctor.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {doctor.highlights.map((highlight) => (
              <span
                className="rounded-full bg-lavender-50 border border-lavender-100 px-2.5 py-1 text-[11px] font-medium text-lavender-800"
                key={highlight}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-lavender-100 pt-4">
        <InfoRow icon={MapPin} label={`${doctor.clinic}, ${doctor.area}`} />
        <InfoRow icon={IndianRupee} label={`${formatFee(doctor.feePaise)} fee`} />
        <InfoRow icon={CalendarCheck} label={doctor.nextAvailable} />
        <InfoRow icon={Star} label={`${doctor.rating} (${doctor.reviews})`} />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button asChild className="flex-1" variant="ghost">
          <Link
            href={`/doctors/${doctor.slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            View profile
          </Link>
        </Button>
        <Button className="flex-1" onClick={onRequestLead} variant="outline">
          Request call
        </Button>
        <Button className="flex-1" onClick={onRequestLead} variant="gradient">
          <CalendarCheck aria-hidden /> Book
        </Button>
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
    <div className="flex items-center gap-2 text-slate-600">
      <Icon className="size-4 text-lavender-600" aria-hidden />
      <span className="truncate">{label}</span>
    </div>
  );
}
