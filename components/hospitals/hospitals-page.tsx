"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  Phone,
  MapPin,
  Star,
  Hospital,
  Eye,
  Smile,
  FlaskConical,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

type Category = "all" | "hospital" | "eye" | "dental" | "lab" | "wellness";

const CATEGORIES: { id: Category; name: string; icon: typeof Hospital }[] = [
  { id: "all", name: "All facilities", icon: Building2 },
  { id: "hospital", name: "Hospitals", icon: Hospital },
  { id: "eye", name: "Eye centers", icon: Eye },
  { id: "dental", name: "Dental clinics", icon: Smile },
  { id: "lab", name: "Diagnostic labs", icon: FlaskConical },
  { id: "wellness", name: "Wellness centers", icon: Sparkles },
];

type Facility = {
  id: string;
  name: string;
  type: Exclude<Category, "all">;
  area: string;
  rating: number;
  reviews: number;
  specialties: string[];
  nabl?: boolean;
  homeCollection?: boolean;
};

const FACILITIES: Facility[] = [
  { id: "f1", name: "Geetanjali Medical College Hospital", type: "hospital", area: "Manwa Kheda", rating: 4.6, reviews: 1840, specialties: ["Cardiology", "Oncology", "Neuro"] },
  { id: "f2", name: "Pacific Medical Hospital", type: "hospital", area: "Bhilon-ka-Bedla", rating: 4.4, reviews: 980, specialties: ["Cardiac surgery", "Trauma", "ICU"] },
  { id: "f3", name: "Bhansali Eye Hospital", type: "eye", area: "Bhuwana", rating: 4.8, reviews: 612, specialties: ["LASIK", "Cataract", "Retina"] },
  { id: "f4", name: "Smile Studio Dental", type: "dental", area: "Sukher", rating: 4.9, reviews: 418, specialties: ["Implants", "Aligners", "Whitening"] },
  { id: "f5", name: "Vitruvia Wellness", type: "wellness", area: "Sector 14", rating: 4.7, reviews: 256, specialties: ["Yoga", "Diet", "Detox"] },
  { id: "f6", name: "Metropolis Labs Udaipur", type: "lab", area: "Bhupalpura", rating: 4.6, reviews: 1422, specialties: ["Full body", "Thyroid", "Diabetes"], nabl: true, homeCollection: true },
  { id: "f7", name: "SRL Diagnostics", type: "lab", area: "Madhuban", rating: 4.5, reviews: 882, specialties: ["MRI", "CT", "Pathology"], nabl: true, homeCollection: true },
  { id: "f8", name: "Aravali Hospital", type: "hospital", area: "Hiran Magri", rating: 4.3, reviews: 728, specialties: ["Ortho", "ENT", "Pediatrics"] },
  { id: "f9", name: "Crystal Eye & Cataract Clinic", type: "eye", area: "Fatehsagar", rating: 4.7, reviews: 304, specialties: ["Cataract", "Glaucoma"] },
  { id: "f10", name: "GBH American Hospital", type: "hospital", area: "Meera Girls College Rd", rating: 4.5, reviews: 1612, specialties: ["Cardiac", "Cancer", "Robotics"] },
  { id: "f11", name: "Dr. Jain's Dental Care", type: "dental", area: "Ashok Nagar", rating: 4.8, reviews: 287, specialties: ["RCT", "Braces", "Pedo"] },
  { id: "f12", name: "Lab Plus NABL Center", type: "lab", area: "Court Chouraha", rating: 4.4, reviews: 530, specialties: ["Pathology", "Radiology"], nabl: true },
];

export function HospitalsPage() {
  const [cat, setCat] = useState<Category>("all");
  const filtered = cat === "all" ? FACILITIES : FACILITIES.filter((f) => f.type === cat);

  return (
    <>
      {/* Hero with typewriter feel */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-50/60 via-white to-white pt-12 pb-12">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <Reveal>
            <nav className="text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-lavender-700">
                Home
              </Link>
              <span className="mx-1.5 text-slate-300">/</span>
              <span className="text-lavender-700">Hospitals &amp; Clinics</span>
            </nav>
            <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl text-slate-900 leading-tight">
              Trusted <span className="gradient-text tw-caret">hospitals &amp; clinics</span>
              <br />in Udaipur
            </h1>
            <p className="mt-3 text-slate-600 max-w-xl">
              {FACILITIES.length} verified facilities — multi-specialty hospitals, dental clinics, eye centers
              and NABL-accredited labs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="gradient" asChild>
                <Link href="#facilities">Browse facilities</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Emergency directory</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="cat-icon-wrap inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-lavender-100 to-sky-100 text-lavender-700 relative">
              <Hospital className="size-16 sm:size-20 relative z-10" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-10 border-y border-lavender-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`filter-chip inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border border-lavender-200 bg-white ${
                  cat === c.id ? "active" : "text-slate-700"
                }`}
              >
                <c.icon className="size-4" /> {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Facility cards */}
      <section id="facilities" className="py-16 bg-gradient-to-b from-white via-lavender-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {filtered.length} facilit{filtered.length === 1 ? "y" : "ies"} in Udaipur
          </h2>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((f, i) => {
              const cat = CATEGORIES.find((c) => c.id === f.type)!;
              return (
                <Reveal key={f.id} delay={(i % 6) * 60}>
                  <article className="card-hover rounded-2xl border border-lavender-100 bg-white p-5 shadow-soft h-full flex flex-col">
                    <div className="flex items-start gap-3">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-lavender-100 to-sky-100 text-lavender-700 font-display font-bold text-lg">
                        {f.name
                          .split(" ")
                          .slice(0, 2)
                          .map((p) => p[0])
                          .join("")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-base font-bold text-slate-900 truncate">{f.name}</h3>
                        <p className="mt-0.5 text-xs font-semibold text-lavender-700 inline-flex items-center gap-1">
                          <cat.icon className="size-3" /> {cat.name.replace(/s$/, "")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <MapPin className="size-3 text-rose-500" /> {f.area}
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-700">
                        <Star className="size-3 fill-amber-500 text-amber-500" /> {f.rating}
                      </span>
                      <span className="text-slate-500">({f.reviews})</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {f.specialties.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] font-medium text-lavender-800 bg-lavender-50 border border-lavender-100 px-2 py-0.5 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {(f.nabl || f.homeCollection) && (
                      <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                        {f.nabl && (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                            NABL
                          </span>
                        )}
                        {f.homeCollection && (
                          <span className="text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                            Home collection
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-lavender-100 flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href="/contact">
                          <Phone className="size-3.5" /> Call
                        </Link>
                      </Button>
                      <Button asChild variant="gradient" size="sm" className="flex-1">
                        <Link href="/find-doctor">
                          Visit <ChevronRight className="size-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
