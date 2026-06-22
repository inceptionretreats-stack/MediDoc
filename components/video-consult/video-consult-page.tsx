"use client";

import Link from "next/link";
import {
  Video,
  ShieldCheck,
  Zap,
  MessageSquare,
  Clock3,
  Headphones,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Zap,
    title: "Connect in 60 seconds",
    body: "Our AI-routing matches you to the right specialist instantly — no waiting room.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end encrypted",
    body: "Calls are secured with E2E encryption. Your medical conversation stays private.",
  },
  {
    icon: MessageSquare,
    title: "Prescription on WhatsApp",
    body: "Digital prescription delivered instantly to your WhatsApp the moment the call ends.",
  },
  {
    icon: Clock3,
    title: "Free 7-day follow-up",
    body: "Have a follow-up question? Chat with the same doctor free for 7 days after your consult.",
  },
  {
    icon: Headphones,
    title: "Audio fallback",
    body: "Patchy network? One tap to switch to voice-only — your consultation continues.",
  },
  {
    icon: Stethoscope,
    title: "30+ specialties",
    body: "General physician, pediatrics, gynecology, dermatology, mental health and more.",
  },
];

const SPECIALTIES = [
  { name: "General Physician", emoji: "🩺", waitTime: "60 sec" },
  { name: "Pediatrician", emoji: "👶", waitTime: "2 min" },
  { name: "Gynecologist", emoji: "🌸", waitTime: "3 min" },
  { name: "Dermatologist", emoji: "✨", waitTime: "2 min" },
  { name: "Cardiologist", emoji: "❤️", waitTime: "5 min" },
  { name: "Dentist", emoji: "🦷", waitTime: "3 min" },
  { name: "ENT", emoji: "👂", waitTime: "4 min" },
  { name: "Psychiatrist", emoji: "🧠", waitTime: "8 min" },
];

export function VideoConsultPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-50/60 via-white to-white pt-12 pb-20">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_420px] gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 text-xs font-bold border border-lavender-200 shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Average wait: under 60 seconds
            </span>
            <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
              See a doctor on{" "}
              <span className="gradient-text">video</span>
              <br /> in under a minute
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">
              Skip the waiting room. Connect with a verified doctor 24×7 over secure video,
              get a prescription on WhatsApp, and a free 7-day follow-up.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/contact">
                  <Video className="size-4" /> Start consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/find-doctor">Browse doctors instead</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
              <div className="flex -space-x-2">
                {["AS", "RM", "NK", "+"].map((init, i) => (
                  <span
                    key={init}
                    className={`hero-av ${i === 3 ? "hero-av-more" : ""}`}
                    style={
                      i === 3
                        ? undefined
                        : { background: ["#7c3aed", "#0ea5e9", "#10b981"][i] }
                    }
                  >
                    {init}
                  </span>
                ))}
              </div>
              <div>
                <p className="font-display font-bold text-slate-900">2.4M+ consults</p>
                <p className="text-xs text-slate-500">delivered last year</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-lavender-600 to-sky-500 p-1.5 shadow-glow">
                <div className="rounded-[20px] bg-slate-900 aspect-[4/5] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-[10px] font-bold tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> LIVE
                  </div>
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/40 text-white text-[10px] font-mono">
                    02:14
                  </div>

                  <svg viewBox="0 0 200 200" className="w-2/3 h-2/3" aria-hidden>
                    <g transform="translate(100 100)">
                      <circle r="60" fill="#fde2c4" stroke="#7c2d12" strokeWidth="1.5" />
                      <path
                        d="M-60 -14 Q -50 -64, 0 -64 Q 50 -64, 60 -14 Q 50 -28, 0 -32 Q -50 -28, -60 -14 Z"
                        fill="#1f2937"
                      />
                      <circle cx="-22" cy="-2" r="14" fill="none" stroke="#0f172a" strokeWidth="3" />
                      <circle cx="22" cy="-2" r="14" fill="none" stroke="#0f172a" strokeWidth="3" />
                      <line x1="-8" y1="-2" x2="8" y2="-2" stroke="#0f172a" strokeWidth="3" />
                      <path d="M-14 26 Q 0 38, 14 26" stroke="#7c2d12" strokeWidth="3" fill="none" />
                    </g>
                  </svg>

                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
                    {[
                      { bg: "bg-white/15", icon: "🎙" },
                      { bg: "bg-white/15", icon: "📹" },
                      { bg: "bg-red-500", icon: "📞" },
                      { bg: "bg-white/15", icon: "💬" },
                    ].map((b, i) => (
                      <div
                        key={i}
                        className={`w-11 h-11 rounded-full ${b.bg} backdrop-blur flex items-center justify-center text-lg`}
                      >
                        {b.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hero-card absolute -bottom-6 -left-6 bg-white rounded-2xl border border-lavender-100 shadow-glow p-4 w-56">
                <div className="flex items-center gap-2">
                  <div className="size-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                    <ShieldCheck className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">E2E Encrypted</p>
                    <p className="text-[10px] text-slate-500">DPDP Act compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-gradient-to-b from-white via-lavender-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Care designed around <span className="gradient-text">your time</span>
            </h2>
            <p className="mt-3 text-slate-600">
              Every detail of the video consultation flow is tuned for the fastest, most private
              experience possible.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="card-hover rounded-2xl border border-lavender-100 bg-white p-6 shadow-soft h-full">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-lavender-100 to-sky-100 text-lavender-700">
                    <f.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              Available <span className="gradient-text">specialties</span>
            </h2>
            <p className="mt-3 text-slate-600">
              30+ specialties online 24×7. Tap one to begin.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SPECIALTIES.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <Link
                  href="/find-doctor"
                  className="card-hover block rounded-2xl border border-lavender-100 bg-white p-5 shadow-soft text-center"
                >
                  <div className="text-4xl">{s.emoji}</div>
                  <p className="mt-3 font-display font-bold text-slate-900">{s.name}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Clock3 className="size-3" /> {s.waitTime}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-r from-lavender-600 via-lavender-700 to-sky-600 text-white p-10 sm:p-14 text-center relative overflow-hidden shadow-glow">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-sky-300/30 blur-3xl" />
              <h2 className="relative font-display text-3xl sm:text-4xl font-extrabold leading-tight">
                Ready to skip the waiting room?
              </h2>
              <p className="relative mt-3 text-white/85 max-w-xl mx-auto">
                Start a video consultation now — pay only after the call connects.
              </p>
              <div className="relative mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-white text-lavender-700 hover:bg-white/90 shadow-soft">
                  <Link href="/contact">
                    Start consultation <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  <Link href="/find-doctor">Book in-clinic instead</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
