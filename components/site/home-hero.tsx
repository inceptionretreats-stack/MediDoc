"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Search, ArrowRight } from "lucide-react";

const ROTATING_WORDS = ["health", "doctors", "wellness", "care"];

export function HomeHero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase("out");
      window.setTimeout(() => {
        setWordIdx((i) => (i + 1) % ROTATING_WORDS.length);
        setPhase("in");
      }, 400);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative pt-12 pb-6 overflow-hidden">
      <div className="hero-mesh" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-grid" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 text-xs font-bold border border-lavender-200 shadow-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Powered by Doctor Platform · India
        </span>
        <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
          Your home for{" "}
          <span className="hero-rotator">
            <span className={`hero-word ${phase}`}>{ROTATING_WORDS[wordIdx]}</span>
          </span>
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          Find verified doctors in Udaipur, book appointments and request callbacks — in seconds.
        </p>

        <form
          action="/find-doctor"
          className="mt-8 max-w-4xl mx-auto p-2 bg-white rounded-2xl shadow-glow border border-lavender-100 flex flex-col sm:flex-row gap-2 text-left relative"
        >
          <div className="relative sm:flex-1">
            <div className="flex items-center gap-2 px-4 py-3 border-b sm:border-b-0 sm:border-r border-lavender-100">
              <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <input
                type="text"
                defaultValue="Udaipur"
                name="loc"
                className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 placeholder-slate-400"
                placeholder="City, state or area"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 sm:flex-[2]">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Search doctors, clinics, hospitals, symptoms…"
              className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder-slate-400"
            />
            <button
              type="submit"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-lavender-600 to-sky-500 text-white text-sm font-semibold hover:shadow-glow"
              aria-label="Search"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs">
          <span className="text-slate-500">Popular:</span>
          {["Dentist", "Gynecologist", "Cardiologist", "Dermatologist", "Pediatrician"].map(
            (s, i) => (
              <span key={s} className="contents">
                <Link href="/find-doctor" className="text-slate-700 font-semibold hover:text-lavender-700">
                  {s}
                </Link>
                {i < 4 && <span className="text-slate-300">·</span>}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
