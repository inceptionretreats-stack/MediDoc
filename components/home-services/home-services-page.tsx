"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  Home,
  Stethoscope,
  Baby,
  HeartPulse,
  Activity,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    id: "nurse",
    name: "Nurse at Home",
    icon: Stethoscope,
    bg: "from-lavender-100 to-sky-100",
    text: "text-lavender-700",
    rating: 4.9,
    reviews: 1248,
    duration: "12 / 24 hrs",
    price: 1499,
    description:
      "Trained, RN-certified nurses for post-op care, wound dressing, IV/injections, vitals monitoring and elderly bedside support.",
    tags: ["Post-surgery", "Injections", "Vitals", "Wound dressing"],
  },
  {
    id: "physio",
    name: "Physiotherapy",
    icon: Activity,
    bg: "from-emerald-100 to-sky-100",
    text: "text-emerald-700",
    rating: 4.8,
    reviews: 836,
    duration: "60 min",
    price: 799,
    description:
      "DPT-qualified physiotherapists for orthopedic recovery, sports rehab, sciatica, frozen shoulder and neuro physiotherapy.",
    tags: ["Knee rehab", "Sciatica", "Stroke recovery", "Frozen shoulder"],
  },
  {
    id: "baby",
    name: "Baby Care",
    icon: Baby,
    bg: "from-pink-100 to-rose-100",
    text: "text-rose-700",
    rating: 4.9,
    reviews: 612,
    duration: "8 / 12 / 24 hrs",
    price: 1299,
    description:
      "Certified neonatal caregivers for newborn handling, lactation support, sleep training and postnatal mother recovery.",
    tags: ["Newborn", "Lactation", "Postnatal", "Sleep training"],
  },
  {
    id: "elder",
    name: "Elder Care",
    icon: HeartPulse,
    bg: "from-amber-100 to-orange-100",
    text: "text-amber-700",
    rating: 4.8,
    reviews: 974,
    duration: "12 / 24 hrs",
    price: 1199,
    description:
      "Compassionate trained attendants for elders — medication reminders, mobility assistance, companionship and personal hygiene.",
    tags: ["Dementia care", "Mobility", "Medication", "Companionship"],
  },
];

const STEPS = [
  {
    n: 1,
    title: "Tell us what you need",
    sub: "Pick a service — nurse, physio, baby or elder care — and the hours you need.",
  },
  {
    n: 2,
    title: "We match a verified pro",
    sub: "Trained, background-checked professional confirmed for your address within 2 hours.",
  },
  {
    n: 3,
    title: "Care arrives at your door",
    sub: "Service starts on time. Switch caregiver or extend hours from the dashboard anytime.",
  },
];

export function HomeServicesPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-50/60 via-white to-white pt-12 pb-16">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-3" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 text-xs font-bold border border-lavender-200 shadow-soft">
            <Home className="size-3.5 text-lavender-600" />
            Healthcare at your doorstep · Udaipur
          </span>
          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
            Healthcare that comes <span className="gradient-text">home to you</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Trained nurses, physiotherapists and caregivers — at your door, in 2 hours.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button variant="gradient" size="lg" asChild>
              <Link href="#book">
                <Home className="size-4" /> Browse services
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#book">Book now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
              At-home <span className="gradient-text">care services</span>
            </h2>
            <p className="mt-2 text-slate-600">Verified, trained professionals — pick the one you need.</p>
          </Reveal>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <div className="card-hover rounded-3xl border border-lavender-100 bg-white shadow-soft overflow-hidden h-full flex flex-col">
                  <div className={`p-6 bg-gradient-to-br ${s.bg}`}>
                    <div className={`inline-flex size-14 items-center justify-center rounded-2xl bg-white ${s.text} shadow-soft`}>
                      <s.icon className="size-7" />
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{s.name}</h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-3 text-xs">
                      <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                        <Star className="size-3 fill-amber-500 text-amber-500" /> {s.rating}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{s.reviews} reviews</span>
                      <span className="text-slate-400">·</span>
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <Clock className="size-3" /> {s.duration}
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-lavender-100 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Starting</p>
                        <p className="font-display text-xl font-bold text-slate-900">₹{s.price}</p>
                      </div>
                      <Button variant="gradient" size="sm" asChild>
                        <Link href="#book">Book</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gradient-to-b from-white via-lavender-50/40 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              How home care <span className="gradient-text">works</span>
            </h2>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 150}>
                <div className="rounded-2xl border border-lavender-100 bg-white p-6 shadow-soft text-center h-full">
                  <div className="inline-flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-lavender-600 to-sky-500 text-white font-display font-extrabold text-xl shadow-soft">
                    {step.n}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{step.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form */}
      <section id="book" className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl border border-lavender-100 bg-white shadow-glow p-8 sm:p-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-lavender-700 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-200">
                Book a home visit
              </span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                Request a caregiver
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Fill in your details — our team confirms within 30 minutes.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3">
                  <CheckCircle2 className="size-6 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-display font-bold text-emerald-900">
                      Request received — we&apos;ll call you shortly.
                    </p>
                    <p className="mt-1 text-sm text-emerald-700">
                      Expect a confirmation call within 30 minutes during working hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Your name
                    <input className="field" required placeholder="Full name" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Phone
                    <input className="field" required inputMode="tel" placeholder="+91 98765 43210" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Service
                    <select className="field" required>
                      {SERVICES.map((s) => (
                        <option key={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700">
                    Start date
                    <input className="field" type="date" required />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-4 text-rose-500" /> Address in Udaipur
                    </span>
                    <input className="field" required placeholder="Building, street, area" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                    Notes (optional)
                    <textarea className="field min-h-24" placeholder="Special instructions, patient condition, schedule preferences…" />
                  </label>
                  <div className="sm:col-span-2">
                    <Button variant="gradient" type="submit" className="w-full">
                      Request a caregiver <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
