import Link from "next/link";
import {
  Check,
  Sparkles,
  Globe,
  Megaphone,
  Trophy,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

const PACKAGES = [
  {
    name: "Website Dev",
    price: "₹19,999",
    setup: "one-time",
    icon: Globe,
    style: "white",
    features: [
      "Custom 5-page website",
      "Mobile-first responsive design",
      "Practice profile + doctor bios",
      "Online appointment form",
      "Basic SEO setup",
      "1 year free hosting",
    ],
  },
  {
    name: "Website + Social",
    price: "₹39,999",
    setup: "per quarter",
    icon: Sparkles,
    badge: "Popular",
    style: "gradient",
    features: [
      "Everything in Website Dev",
      "Instagram + Facebook page",
      "12 branded posts / month",
      "1 reel per week",
      "Reputation monitoring",
      "WhatsApp Business setup",
    ],
  },
  {
    name: "Website + Social + Ads",
    price: "₹79,999",
    setup: "per quarter",
    icon: Megaphone,
    style: "white",
    features: [
      "Everything in Website + Social",
      "Google Ads (₹15k budget)",
      "Meta Ads (₹15k budget)",
      "Landing page optimization",
      "Lead tracking dashboard",
      "Monthly performance review",
    ],
  },
  {
    name: "Complete Digital Growth",
    price: "₹1,49,999",
    setup: "per quarter",
    icon: Trophy,
    badge: "Best Value",
    style: "dark",
    features: [
      "Everything in Website + Social + Ads",
      "SEO content (8 articles / month)",
      "Video content (4 videos / month)",
      "Brand strategy + identity",
      "Influencer partnerships",
      "Dedicated growth manager",
    ],
  },
];

const PLANS = [
  {
    name: "Free Listing",
    price: "₹0",
    body: "Basic profile, 1 specialty, contact info shown.",
    features: ["Searchable listing", "Phone number visible", "1 photo"],
  },
  {
    name: "Premium Listing",
    price: "₹999/mo",
    badge: "Most chosen",
    body: "Featured placement, multiple specialties, gallery + reviews.",
    features: [
      "Top of category placement",
      "Up to 5 specialties",
      "Up to 20 photos",
      "Patient reviews module",
      "Lead notifications via SMS",
      "Calendar integration",
    ],
  },
  {
    name: "Featured Listing",
    price: "₹2,499/mo",
    body: "Maximum visibility, video intro, priority leads, analytics.",
    features: [
      "Homepage featured slot",
      "Video introduction",
      "Priority lead routing",
      "Detailed analytics dashboard",
      "Verified badge",
      "Concierge support",
    ],
  },
];

export function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-50/60 via-white to-white pt-12 pb-16">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 text-xs font-bold border border-lavender-200 shadow-soft">
            <TrendingUp className="size-3.5 text-emerald-600" />
            Trusted by 500+ clinics across India
          </span>
          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
            Services that <span className="gradient-text">grow</span> your practice
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Website, social media, ads and content packages — designed for healthcare providers.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Growth <span className="gradient-text">packages</span>
            </h2>
            <p className="mt-2 text-slate-600">From listing to full digital marketing — pick a tier that fits.</p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={`relative rounded-3xl p-6 shadow-soft h-full flex flex-col ${
                    p.style === "dark"
                      ? "bg-slate-900 text-white border border-slate-800"
                      : p.style === "gradient"
                      ? "bg-gradient-to-br from-lavender-600 to-sky-500 text-white border border-transparent"
                      : "bg-white border border-lavender-100"
                  }`}
                >
                  {p.badge && (
                    <span
                      className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                        p.style === "dark"
                          ? "bg-amber-400 text-slate-900"
                          : "bg-white text-lavender-700 shadow-soft"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                  <div
                    className={`inline-flex size-12 items-center justify-center rounded-xl ${
                      p.style === "white"
                        ? "bg-gradient-to-br from-lavender-100 to-sky-100 text-lavender-700"
                        : "bg-white/15"
                    }`}
                  >
                    <p.icon className="size-6" />
                  </div>
                  <h3
                    className={`mt-4 font-display text-xl font-bold ${
                      p.style === "white" ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <div className="mt-2">
                    <span
                      className={`font-display text-3xl font-extrabold ${
                        p.style === "white" ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {p.price}
                    </span>
                    <span
                      className={`ml-2 text-xs ${
                        p.style === "white" ? "text-slate-500" : "text-white/80"
                      }`}
                    >
                      {p.setup}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2.5 flex-1">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2 text-sm ${
                          p.style === "white" ? "text-slate-700" : "text-white/95"
                        }`}
                      >
                        <span className={p.style === "white" ? "check" : "check-w"} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`mt-6 w-full ${
                      p.style === "white"
                        ? ""
                        : "bg-white text-lavender-700 hover:bg-white/90"
                    }`}
                    variant={p.style === "white" ? "gradient" : "default"}
                  >
                    <Link href="/contact">Get started</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Listing plans */}
      <section className="py-16 bg-gradient-to-b from-white via-lavender-50/40 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              Listing <span className="gradient-text">plans</span>
            </h2>
            <p className="mt-2 text-slate-600">Just need a listing? Pick one of these.</p>
          </Reveal>

          <div className="mt-10 grid md:grid-cols-3 gap-5 items-stretch">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 120}>
                <div
                  className={`relative rounded-2xl border bg-white p-7 shadow-soft h-full flex flex-col ${
                    plan.badge ? "border-lavender-300 ring-2 ring-lavender-200 lg:scale-105" : "border-lavender-100"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-lavender-600 to-sky-500 text-white shadow-soft">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="mt-1 font-display text-3xl font-extrabold gradient-text">{plan.price}</p>
                  <p className="mt-2 text-sm text-slate-600">{plan.body}</p>
                  <ul className="mt-5 space-y-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                        <Check className="size-4 text-lavender-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full" variant={plan.badge ? "gradient" : "outline"}>
                    <Link href="/onboarding">Choose this plan</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-r from-lavender-600 via-lavender-700 to-sky-600 text-white p-10 sm:p-14 text-center relative overflow-hidden shadow-glow">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
              <h2 className="relative font-display text-3xl sm:text-4xl font-extrabold">
                Ready to grow your practice?
              </h2>
              <p className="relative mt-3 text-white/85">Book a free 30-minute consultation with our growth team.</p>
              <Button asChild size="lg" className="relative mt-7 bg-white text-lavender-700 hover:bg-white/90">
                <Link href="/contact">
                  Talk to growth team <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
