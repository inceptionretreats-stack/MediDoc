"use client";

import Link from "next/link";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import { Reveal } from "./reveal";

type Step = { title: string; sub: string; icon: ReactNode };
type Flow = { key: string; label: string; cta: { text: string; href: string }; steps: Step[] };

const HW_FLOWS: Flow[] = [
  {
    key: "consult",
    label: "Online Consultation",
    cta: { text: "Start a video consultation", href: "/video-consult" },
    steps: [
      {
        title: "Select a speciality or symptom",
        sub: "Browse 30+ specialties or type your symptom — we route you to the right doctor.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 22l8 22 4-10 10-4z" />
              <path d="M34 34l10 10" />
              <path className="hw-spark" d="M14 14l4-4M50 14l-4-4M14 50l4 4" />
            </g>
          </svg>
        ),
      },
      {
        title: "Audio / video call with a verified doctor",
        sub: "Connect in under 60 seconds with secure, end-to-end encrypted calls.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="6" y="14" width="40" height="28" rx="4" />
              <path d="M46 22l12-6v32l-12-6z" />
              <circle className="hw-blink" cx="58" cy="14" r="3" fill="currentColor" />
            </g>
          </svg>
        ),
      },
      {
        title: "Digital prescription & a free follow-up",
        sub: "Prescription delivered instantly on WhatsApp + free follow-up within 7 days.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="14" y="6" width="36" height="52" rx="4" />
              <path d="M22 18h12v12h-12z M22 22l12 12 M44 36l-10 10 M48 32l4 4" />
            </g>
          </svg>
        ),
      },
    ],
  },
  {
    key: "doctor",
    label: "Find a Doctor (in-clinic)",
    cta: { text: "Find doctors near me", href: "/find-doctor" },
    steps: [
      {
        title: "Pick your city & specialty",
        sub: "30+ cities across India — from metros down to local areas in your district.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 58s-18-16-18-30a18 18 0 0 1 36 0c0 14-18 30-18 30z" />
              <circle cx="32" cy="26" r="7" />
            </g>
          </svg>
        ),
      },
      {
        title: "Compare doctors & book a slot",
        sub: "Filter by experience, rating, clinic & timings — one-tap booking with confirmation.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <rect x="10" y="14" width="44" height="42" rx="4" />
              <path d="M10 26h44 M22 6v12 M42 6v12 M20 38l6 6 12-12" />
            </g>
          </svg>
        ),
      },
      {
        title: "Visit clinic & leave a review",
        sub: "Get treated by trusted specialists — your honest review helps the next patient.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 56V26l24-16 24 16v30" />
              <path d="M28 56V40h8v16 M40 22v8M36 26h8" />
            </g>
          </svg>
        ),
      },
    ],
  },
  {
    key: "lab",
    label: "Book a Lab Test",
    cta: { text: "Browse lab tests", href: "/services" },
    steps: [
      {
        title: "Choose a test or health panel",
        sub: "CBC, thyroid, diabetes, full-body checkup — packaged or à la carte.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M26 6v18l-10 22a6 6 0 0 0 6 8h20a6 6 0 0 0 6-8l-10-22V6" />
              <path d="M22 6h20" />
            </g>
          </svg>
        ),
      },
      {
        title: "Home sample collection",
        sub: "A phlebotomist visits your home at a slot you choose — free in most cities.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 56V28l24-18 24 18v28" />
              <path d="M22 56V42h20v14" />
              <circle cx="32" cy="34" r="3" fill="currentColor" />
            </g>
          </svg>
        ),
      },
      {
        title: "Digital reports in hours",
        sub: "NABL-certified labs · reports on app + email + free doctor explanation.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 6h28l10 10v42H14z" />
              <path d="M42 6v10h10 M22 30h20 M22 38h20 M22 46h14" />
            </g>
          </svg>
        ),
      },
    ],
  },
  {
    key: "hospital",
    label: "Find a Hospital",
    cta: { text: "Browse hospitals", href: "/hospitals" },
    steps: [
      {
        title: "Browse top multi-specialty hospitals",
        sub: "Verified hospitals, dental clinics, eye centers — filter by city & specialty.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 56V20h48v36 M20 56V36h8v20 M36 56V36h8v20" />
              <path d="M32 12v6M28 14h8" />
            </g>
          </svg>
        ),
      },
      {
        title: "Compare facilities, ratings & cost",
        sub: "See ICU, OT, cashless insurance partners and patient reviews before deciding.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 6l8 16 18 2-13 12 4 18-17-9-17 9 4-18-13-12 18-2z" />
            </g>
          </svg>
        ),
      },
      {
        title: "Directions, contact & emergency",
        sub: "Tap-to-call, Google Maps directions & 24×7 emergency hotlines all in one place.",
        icon: (
          <svg viewBox="0 0 64 64" className="w-9 h-9" aria-hidden>
            <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 8h12l4 12-6 4a28 28 0 0 0 16 16l4-6 12 4v12a4 4 0 0 1-4 4A40 40 0 0 1 10 14a4 4 0 0 1 4-6z" />
            </g>
          </svg>
        ),
      },
    ],
  },
];

export function HowItWorks() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % HW_FLOWS.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const flow = HW_FLOWS[idx]!;
  const go = (delta: number) =>
    setIdx((i) => (i + delta + HW_FLOWS.length) % HW_FLOWS.length);

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-b from-white via-lavender-50/40 to-white relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
            Quick journey
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="mt-2 text-slate-600">
            Pick a flow below — every option takes you from search to specialist in 3 simple steps.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {HW_FLOWS.map((f, i) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                i === idx
                  ? "bg-gradient-to-r from-lavender-600 to-sky-500 text-white border-transparent shadow-soft"
                  : "bg-white text-slate-700 border-lavender-200 hover:border-lavender-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-12 relative">
          <button
            type="button"
            aria-label="Previous flow"
            onClick={() => go(-1)}
            className="hw-arrow left-0 md:-left-2"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            aria-label="Next flow"
            onClick={() => go(1)}
            className="hw-arrow right-0 md:-right-2"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl bg-white border border-lavender-100 shadow-soft p-8 sm:p-12 min-h-[280px]">
              <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-4">
                {flow.steps.map((s, i) => (
                  <Fragment key={`${flow.key}-${i}`}>
                    {i > 0 && (
                      <div className="hw-line">
                        <div className="hw-line-fill" style={{ animationDelay: `${i * 0.3}s` }} />
                      </div>
                    )}
                    <div
                      className="hw-step flex flex-col items-center text-center"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    >
                      <div className="hw-bubble">
                        <span className="hw-icon">{s.icon}</span>
                      </div>
                      <div className="hw-num">Step {i + 1}</div>
                      <h3 className="mt-2 font-display font-bold text-slate-900 text-base lg:text-lg max-w-[16rem]">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 max-w-[18rem] leading-relaxed">
                        {s.sub}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div className="md:hidden space-y-6">
                {flow.steps.map((s, i) => (
                  <div
                    key={`${flow.key}-m-${i}`}
                    className="hw-step flex items-start gap-4"
                    style={{ animationDelay: `${i * 0.18}s` }}
                  >
                    <div className="hw-bubble flex-shrink-0">
                      <span className="hw-icon">{s.icon}</span>
                    </div>
                    <div>
                      <div className="hw-num">Step {i + 1}</div>
                      <h3 className="mt-1 font-display font-bold text-slate-900">{s.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {HW_FLOWS.map((f, i) => (
              <button
                key={`dot-${f.key}`}
                type="button"
                aria-label={`Go to ${f.label}`}
                onClick={() => setIdx(i)}
                className={`h-2.5 rounded-full transition ${
                  i === idx ? "bg-lavender-600 w-8" : "bg-lavender-200 hover:bg-lavender-400 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>

        <Reveal className="mt-10 text-center">
          <Link
            href={flow.cta.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-lavender-600 to-sky-500 text-white font-semibold hover:shadow-glow"
          >
            {flow.cta.text}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

