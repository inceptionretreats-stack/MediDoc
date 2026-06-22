"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  CalendarCheck,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import {
  AREA_FILTERS,
  DOCTOR_FIXTURES,
  SPECIALTY_FILTERS,
  formatFee,
} from "@/lib/demo-directory";

const SPECIALTY_TILES = [
  { name: "General Physician", emoji: "🩺", route: "general" },
  { name: "Dentist", emoji: "🦷", route: "dentist" },
  { name: "Gynecologist", emoji: "🌸", route: "gyn" },
  { name: "Pediatrician", emoji: "👶", route: "ped" },
  { name: "Dermatologist", emoji: "✨", route: "derm" },
  { name: "Cardiologist", emoji: "❤️", route: "card" },
  { name: "Orthopedist", emoji: "🦴", route: "ortho" },
  { name: "Neurologist", emoji: "🧠", route: "neuro" },
  { name: "ENT", emoji: "👂", route: "ent" },
  { name: "Ophthalmologist", emoji: "👁", route: "eye" },
  { name: "Urologist", emoji: "💧", route: "uro" },
  { name: "Psychiatrist", emoji: "💭", route: "psy" },
];

const POPULAR_AREAS = ["Fatehsagar", "Hiran Magri", "Bhupalpura", "Sukher", "Sector 14", "Madhuban"];

export function FindDoctorPage() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<(typeof SPECIALTY_FILTERS)[number]>("All specialties");
  const [area, setArea] = useState<(typeof AREA_FILTERS)[number]>("All areas");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCTOR_FIXTURES.filter((d) => {
      const matchesSpec = specialty === "All specialties" || d.specialty === specialty;
      const matchesArea = area === "All areas" || d.area === area;
      const hay = [d.name, d.specialty, d.clinic, d.area, d.summary, ...d.highlights]
        .join(" ")
        .toLowerCase();
      const matchesQ = q.length === 0 || hay.includes(q);
      return matchesSpec && matchesArea && matchesQ;
    });
  }, [query, specialty, area]);

  return (
    <>
      {/* Hero with search */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-50/60 via-white to-white pt-12 pb-12">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 text-xs font-bold border border-lavender-200 shadow-soft">
            <MapPin className="size-3.5 text-rose-500" />
            Doctors in Udaipur — verified by our team
          </span>
          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl text-slate-900 leading-tight">
            Find the right <span className="gradient-text">doctor</span> near you
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            {DOCTOR_FIXTURES.length} verified specialists · Same-day appointments · Confirmed callbacks within 30 minutes.
          </p>

          <Reveal delay={150}>
            <div className="mt-8 p-2 bg-white rounded-2xl shadow-glow border border-lavender-100 grid sm:grid-cols-[1fr_220px_200px_auto] gap-2 text-left">
              <label className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-lavender-100">
                <MapPin className="size-4 text-rose-500 shrink-0" />
                <select
                  className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800"
                  value={area}
                  onChange={(e) => setArea(e.target.value as typeof area)}
                >
                  {AREA_FILTERS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-lavender-100">
                <Search className="size-4 text-lavender-600 shrink-0" />
                <select
                  className="w-full bg-transparent outline-none text-sm text-slate-800"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value as typeof specialty)}
                >
                  {SPECIALTY_FILTERS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 px-4 py-3 sm:col-span-1">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Symptom or condition…"
                  className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
                />
              </label>
              <Button variant="gradient" className="rounded-xl">
                <Search className="size-4" /> Search
              </Button>
            </div>
          </Reveal>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="text-xs text-slate-500 self-center">Popular areas:</span>
            {POPULAR_AREAS.map((a) => (
              <button
                key={a}
                onClick={() => {
                  const match = AREA_FILTERS.find((f) => f === a);
                  setArea(match ?? "All areas");
                }}
                className={`area-chip text-xs font-semibold px-3 py-1 rounded-full border border-lavender-200 bg-white ${
                  area === a ? "active" : "text-slate-700"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Browse by <span className="gradient-text">specialty</span>
            </h2>
            <p className="mt-2 text-slate-600">Pick a category — we&apos;ll match you to the right specialist.</p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPECIALTY_TILES.map((s, i) => (
              <Reveal key={s.name} delay={i * 40}>
                <button
                  type="button"
                  onClick={() => {
                    const match = SPECIALTY_FILTERS.find((f) => f === s.name);
                    if (match) setSpecialty(match);
                  }}
                  className="card-hover w-full rounded-2xl border border-lavender-100 bg-white p-5 shadow-soft text-center"
                >
                  <div className="text-3xl">{s.emoji}</div>
                  <p className="mt-2 font-display font-bold text-slate-900 text-sm">{s.name}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gradient-to-b from-white via-lavender-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between gap-3 border-b border-lavender-100 pb-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                {results.length} doctor{results.length === 1 ? "" : "s"} found
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Showing {specialty === "All specialties" ? "all specialties" : specialty} in{" "}
                {area === "All areas" ? "Udaipur" : area}.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {results.map((d) => (
              <article
                key={d.id}
                className="card-hover rounded-2xl border border-lavender-100 bg-white p-5 shadow-soft"
              >
                <div className="flex gap-4">
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-100 to-sky-100 text-xl font-display font-bold text-lavender-800">
                    {d.name
                      .split(" ")
                      .slice(1, 3)
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-slate-900 truncate">{d.name}</h3>
                      {d.verified && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lavender-700 bg-lavender-50 border border-lavender-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="size-3" /> Verified
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {d.specialty} · {d.experienceYears} yrs
                    </p>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{d.summary}</p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <MapPin className="size-3 text-rose-500" /> {d.area}
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-700">
                        <Star className="size-3 fill-amber-500 text-amber-500" /> {d.rating} ({d.reviews})
                      </span>
                      <span className="inline-flex items-center gap-1 text-emerald-700">
                        <CalendarCheck className="size-3" /> {d.nextAvailable}
                      </span>
                      <span className="text-slate-600 font-semibold">{formatFee(d.feePaise)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link
                      href={`/doctors/${d.slug}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      View profile <ChevronRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="gradient" className="flex-1">
                    <Link
                      href={`/doctors/${d.slug}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <CalendarCheck className="size-4" /> Book
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {results.length === 0 && (
            <div className="mt-6 rounded-2xl border border-dashed border-lavender-200 p-10 text-center bg-white">
              <p className="font-display font-semibold text-slate-900">No doctors match those filters.</p>
              <p className="mt-2 text-sm text-slate-500">Try a broader area or specialty.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
