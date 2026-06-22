import Link from "next/link";
import type { ComponentType } from "react";
import { Reveal } from "./reveal";

type Tile = {
  href: string;
  title: string;
  subtitle: string;
  bg: string;
  Art: ComponentType;
};

const TILES: Tile[] = [
  {
    href: "/video-consult",
    title: "Instant Video Consultation",
    subtitle: "Connect within 60 secs",
    bg: "#dbeafe",
    Art: VideoConsultArt,
  },
  {
    href: "/find-doctor",
    title: "Find Doctors Near You",
    subtitle: "Confirmed appointments",
    bg: "#a7e7d8",
    Art: FindDoctorArt,
  },
  {
    href: "/services",
    title: "Lab Tests",
    subtitle: "Safe and trusted lab tests",
    bg: "#e0d4ff",
    Art: LabArt,
  },
  {
    href: "/hospitals",
    title: "Hospitals & Clinics",
    subtitle: "Top-rated centers near you",
    bg: "#cbd5e1",
    Art: HospitalsArt,
  },
  {
    href: "/home-services",
    title: "Home Services",
    subtitle: "Care at your doorstep",
    bg: "#fde2c4",
    Art: HomeServicesArt,
  },
];

export function QuickServiceTiles() {
  return (
    <section className="pt-12 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {TILES.map((t) => (
            <Reveal key={t.title}>
              <Link
                href={t.href}
                className="qt-card group block rounded-3xl bg-white border border-lavender-100 overflow-hidden shadow-soft hover:shadow-glow transition"
              >
                <div
                  className="qt-art aspect-square flex items-end justify-center"
                  style={{ background: t.bg }}
                >
                  <t.Art />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{t.subtitle}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoConsultArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <rect x="55" y="20" width="90" height="160" rx="14" fill="#0f172a" />
      <rect x="62" y="32" width="76" height="136" rx="6" fill="#bfdbfe" />
      <rect x="88" y="24" width="24" height="3" rx="1.5" fill="#1e293b" />
      <g transform="translate(100 95)">
        <circle r="26" fill="#fde2c4" stroke="#7c2d12" strokeWidth="1.5" />
        <path
          d="M-26 -6 Q -22 -28, 0 -28 Q 22 -28, 26 -6 Q 22 -12, 0 -14 Q -22 -12, -26 -6 Z"
          fill="#1f2937"
        />
        <circle cx="-10" cy="0" r="6" fill="none" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="10" cy="0" r="6" fill="none" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M-6 12 Q 0 18, 6 12" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
        <path
          d="M-26 26 L -12 50 L 12 50 L 26 26 L 32 60 L -32 60 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
      </g>
      <g transform="translate(146 100)" className="qt-wave">
        <ellipse cx="0" cy="0" rx="9" ry="11" fill="#fde2c4" stroke="#7c2d12" strokeWidth="1" />
        <line x1="0" y1="11" x2="0" y2="22" stroke="#fde2c4" strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="78" cy="44" r="4" fill="#ef4444">
        <animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="90" y="47" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700" fill="#0f172a">
        LIVE
      </text>
    </svg>
  );
}

function FindDoctorArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <g transform="translate(100 110)">
        <rect x="-8" y="20" width="16" height="14" fill="#fde2c4" />
        <circle r="30" cy="-5" fill="#fde2c4" stroke="#7c2d12" strokeWidth="1.5" />
        <path
          d="M-30 -10 Q -34 -38, 0 -38 Q 34 -38, 30 -10 L 32 12 Q 18 16, 0 14 Q -18 16, -32 12 Z"
          fill="#1f2937"
        />
        <ellipse cx="-10" cy="-6" rx="2" ry="3" fill="#0f172a" />
        <ellipse cx="10" cy="-6" rx="2" ry="3" fill="#0f172a" />
        <path d="M-7 8 Q 0 14, 7 8" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
        <path d="M-50 50 Q -10 30, 0 36 Q 10 30, 50 50 L 50 90 L -50 90 Z" fill="#0d9488" />
        <path
          d="M-50 50 L -25 60 L -10 90 L -50 90 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <path
          d="M50 50 L 25 60 L 10 90 L 50 90 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <path
          d="M-18 50 Q -22 65, -14 72 Q -8 76, 0 76 Q 8 76, 14 72 Q 22 65, 18 50"
          fill="none"
          stroke="#ef4444"
          strokeWidth="3"
        />
        <circle cx="14" cy="80" r="6" fill="#ef4444" />
      </g>
    </svg>
  );
}

function LabArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <g transform="translate(100 130)">
        <rect x="-22" y="20" width="44" height="60" rx="6" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1.5" />
        <rect x="-24" y="20" width="48" height="6" fill="#7c3aed" />
        <ellipse cx="0" cy="0" rx="26" ry="22" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1.5" />
        <rect x="-18" y="-22" width="6" height="20" rx="3" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" />
        <rect x="-8" y="-26" width="6" height="24" rx="3" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" />
        <rect x="2" y="-24" width="6" height="22" rx="3" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" />
        <rect x="12" y="-22" width="6" height="20" rx="3" fill="#f9fafb" stroke="#9ca3af" strokeWidth="1" />
      </g>
      <g transform="translate(100 56)" className="qt-float">
        <rect x="-9" y="0" width="18" height="50" rx="3" fill="#ffffff" stroke="#475569" strokeWidth="1.8" />
        <rect x="-11" y="-6" width="22" height="10" rx="2" fill="#475569" />
        <rect x="-7" y="22" width="14" height="24" rx="2" fill="#dc2626">
          <animate attributeName="height" values="20;28;20" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="y" values="26;18;26" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <rect x="-7" y="10" width="14" height="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function HospitalsArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <g transform="translate(100 100)" opacity="0.25">
        <rect x="-70" y="-20" width="140" height="100" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
        <g fill="#0f172a">
          {[-58, -38, -18, 2, 22, 42].map((x) => (
            <rect key={`u-${x}`} x={x} y="-10" width="14" height="14" />
          ))}
          {[-58, -38, -18, 2, 22, 42].map((x) => (
            <rect key={`l-${x}`} x={x} y="14" width="14" height="14" />
          ))}
        </g>
        <g transform="translate(0 -40)">
          <rect x="-8" y="-12" width="16" height="24" fill="#dc2626" />
          <rect x="-12" y="-4" width="24" height="8" fill="#dc2626" />
        </g>
      </g>
      <g transform="translate(100 115)">
        <circle r="28" cy="0" fill="#fde2c4" stroke="#7c2d12" strokeWidth="1.5" />
        <path
          d="M-28 -6 Q -22 -34, 0 -34 Q 22 -34, 28 -6 Q 24 -10, 0 -12 Q -24 -10, -28 -6 Z"
          fill="#60a5fa"
        />
        <ellipse cx="0" cy="-24" rx="22" ry="3" fill="#3b82f6" />
        <circle cx="-9" cy="-2" r="5" fill="none" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx="9" cy="-2" r="5" fill="none" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="-4" y1="-2" x2="4" y2="-2" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M-8 10 Q 0 8, 8 10 Q 10 16, 0 16 Q -10 16, -8 10 Z" fill="#9ca3af" />
        <path
          d="M-44 28 Q -10 14, 0 22 Q 10 14, 44 28 L 44 60 L -44 60 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <path d="M-10 22 L 0 32 L 10 22 L 8 38 L -8 38 Z" fill="#60a5fa" />
        <path
          d="M-22 26 Q -28 40, -20 50 Q -10 56, 0 56 Q 10 56, 20 50 Q 28 40, 22 26"
          fill="none"
          stroke="#475569"
          strokeWidth="2.5"
        />
        <circle cx="20" cy="56" r="5" fill="#475569" />
      </g>
    </svg>
  );
}

function HomeServicesArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden>
      <g transform="translate(100 110)" opacity="0.35">
        <path
          d="M-60 10 L 0 -40 L 60 10 L 60 60 L -60 60 Z"
          fill="#ffffff"
          stroke="#7c2d12"
          strokeWidth="1.5"
        />
        <rect x="-12" y="20" width="24" height="40" fill="#7c2d12" opacity="0.5" />
      </g>
      <g transform="translate(100 118)">
        <circle r="24" cy="-2" fill="#fde2c4" stroke="#7c2d12" strokeWidth="1.5" />
        <path
          d="M-22 -18 Q -18 -34, 0 -34 Q 18 -34, 22 -18 L 22 -10 L -22 -10 Z"
          fill="#ffffff"
          stroke="#7c2d12"
          strokeWidth="1.2"
        />
        <rect x="-3" y="-28" width="6" height="14" fill="#dc2626" />
        <rect x="-7" y="-24" width="14" height="6" fill="#dc2626" />
        <path d="M-22 -10 Q -18 -6, -14 -8 L -14 -2 Q -20 -4, -22 -10 Z" fill="#1f2937" />
        <path d="M22 -10 Q 18 -6, 14 -8 L 14 -2 Q 20 -4, 22 -10 Z" fill="#1f2937" />
        <ellipse cx="-8" cy="-2" rx="1.8" ry="2.6" fill="#0f172a" />
        <ellipse cx="8" cy="-2" rx="1.8" ry="2.6" fill="#0f172a" />
        <path d="M-6 8 Q 0 13, 6 8" stroke="#7c2d12" strokeWidth="1.8" fill="none" />
        <path
          d="M-40 30 Q -10 18, 0 24 Q 10 18, 40 30 L 40 60 L -40 60 Z"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
        <path
          d="M-16 30 Q -20 44, -12 50 Q -4 54, 0 54 Q 4 54, 12 50 Q 20 44, 16 30"
          fill="none"
          stroke="#475569"
          strokeWidth="2.5"
        />
        <circle cx="12" cy="54" r="4" fill="#475569" />
      </g>
      <g transform="translate(150 50)" className="qt-float">
        <path d="M0 6 C -8 -4, -16 4, 0 16 C 16 4, 8 -4, 0 6 Z" fill="#ef4444" />
        <animate attributeName="opacity" values="1;.5;1" dur="1.8s" repeatCount="indefinite" />
      </g>
    </svg>
  );
}
