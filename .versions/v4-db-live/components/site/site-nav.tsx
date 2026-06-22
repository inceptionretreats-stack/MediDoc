"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/find-doctor", label: "Find a Doctor" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/services", label: "Services" },
  { href: "/home-services", label: "Home Services" },
  { href: "/video-consult", label: "Video Consult" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-lavender-100/70">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex w-9 h-9 rounded-xl bg-gradient-to-br from-lavender-600 to-sky-500 items-center justify-center shadow-soft">
            <Heart className="w-5 h-5 text-white" strokeWidth={2.2} />
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            Doctor <span className="gradient-text">Platform</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-active={isActive(l.href)}
              className={`nav-link hover:text-lavender-700 ${
                isActive(l.href) ? "text-lavender-700 font-semibold" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-lavender-700 hover:text-lavender-900"
          >
            Sign in
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl bg-gradient-to-r from-lavender-600 to-sky-500 hover:from-lavender-700 hover:to-sky-600 shadow-soft"
          >
            List Your Practice
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-lavender-50"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-lavender-100 bg-white/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-1 text-sm font-medium text-slate-700">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`py-2 hover:text-lavender-700 ${
                  isActive(l.href) ? "text-lavender-700 font-semibold" : ""
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 pt-3 border-t border-lavender-100 flex gap-3">
              <Link
                href="/dashboard"
                className="flex-1 text-center py-2 rounded-xl border border-lavender-200 text-lavender-700 font-semibold"
              >
                Sign in
              </Link>
              <Link
                href="/onboarding"
                className="flex-1 text-center py-2 rounded-xl bg-gradient-to-r from-lavender-600 to-sky-500 text-white font-semibold"
              >
                List Practice
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
