import Link from "next/link";
import { Heart, MapPin, Phone, Mail } from "lucide-react";

const PLATFORM_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/find-doctor", label: "Specialties" },
  { href: "/hospitals", label: "Hospitals & Clinics" },
  { href: "/", label: "Find Doctors" },
  { href: "/services#packages", label: "Packages" },
];

const FOR_DOCTORS_LINKS = [
  { href: "/onboarding", label: "List your practice" },
  { href: "/services#packages", label: "Website development" },
  { href: "/services#packages", label: "Social media marketing" },
  { href: "/services#packages", label: "Paid advertising" },
  { href: "/services#packages", label: "Branding & promotions" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-lavender-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-600 to-sky-500 items-center justify-center shadow-soft">
              <Heart className="w-5 h-5 text-white" strokeWidth={2.2} />
            </span>
            <span className="font-display font-extrabold text-lg">
              Doctor <span className="gradient-text">Platform</span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-slate-600">
            Udaipur&apos;s complete healthcare discovery and doctor growth platform.
          </p>
          <div className="mt-5 flex gap-3 text-slate-500">
            {["Twitter", "Facebook", "Instagram", "WhatsApp"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="w-9 h-9 rounded-lg border border-lavender-200 hover:bg-lavender-50 flex items-center justify-center text-xs font-semibold"
              >
                {s.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900">Platform</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {PLATFORM_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-lavender-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900">For Doctors</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {FOR_DOCTORS_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-lavender-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-slate-900">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-lavender-600 shrink-0" />
              Udaipur, Rajasthan, India
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 text-lavender-600 shrink-0" />
              +91 99999 99999
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 text-lavender-600 shrink-0" />
              hello@doctorplatform.in
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-lavender-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} Doctor Platform · Udaipur, Rajasthan</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-lavender-700">Privacy</Link>
            <Link href="#" className="hover:text-lavender-700">Terms</Link>
            <Link href="#" className="hover:text-lavender-700">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
