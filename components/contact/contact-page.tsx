"use client";

import { useState, type FormEvent } from "react";
import {
  User,
  Stethoscope,
  Hospital,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";

type Role = "patient" | "doctor" | "clinic" | "lab" | "wellness";

const ROLES: { id: Role; label: string; icon: typeof User; copy: string }[] = [
  { id: "patient", label: "Patient", icon: User, copy: "Looking for a doctor or service" },
  { id: "doctor", label: "Doctor", icon: Stethoscope, copy: "List your practice & grow online" },
  { id: "clinic", label: "Clinic", icon: Hospital, copy: "Multi-specialty / hospital signup" },
  { id: "lab", label: "Lab", icon: FlaskConical, copy: "Diagnostic / pathology / imaging" },
  { id: "wellness", label: "Wellness", icon: Sparkles, copy: "Yoga, diet, alternative medicine" },
];

export function ContactPage() {
  const [role, setRole] = useState<Role>("patient");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-lavender-50/60 via-white to-white pt-12 pb-12">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur text-slate-800 text-xs font-bold border border-lavender-200 shadow-soft">
            Get in touch
          </span>
          <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl text-slate-900 leading-tight">
            Join <span className="gradient-text">Doctor Platform</span>
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Patients, doctors, clinics, labs and wellness centers — pick your role to begin.
          </p>
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_360px] gap-10">
          <Reveal>
            <div className="rounded-3xl border border-lavender-100 bg-white shadow-glow p-6 sm:p-8">
              {/* Role tabs */}
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setSubmitted(false);
                    }}
                    className={`filter-chip inline-flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-full border border-lavender-200 bg-white ${
                      role === r.id ? "active" : "text-slate-700"
                    }`}
                  >
                    <r.icon className="size-4" /> {r.label}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-sm text-slate-500">
                {ROLES.find((r) => r.id === role)!.copy}
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex items-start gap-3 signup-fade-in">
                  <CheckCircle2 className="size-6 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="font-display font-bold text-emerald-900">
                      Thanks — we&apos;ve received your details.
                    </p>
                    <p className="mt-1 text-sm text-emerald-700">
                      Our team will reach out to you within one working day.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 signup-fade-in grid gap-4 sm:grid-cols-2">
                  {role === "patient" && <PatientFields />}
                  {role === "doctor" && <DoctorFields />}
                  {role === "clinic" && <ClinicFields />}
                  {role === "lab" && <LabFields />}
                  {role === "wellness" && <WellnessFields />}

                  <div className="sm:col-span-2">
                    <Button variant="gradient" type="submit" className="w-full">
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <aside className="space-y-5">
              <div className="rounded-2xl border border-lavender-100 bg-white p-6 shadow-soft">
                <h3 className="font-display font-bold text-slate-900">Reach us</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="size-4 mt-0.5 text-lavender-600 shrink-0" />
                    <span className="text-slate-700">Udaipur, Rajasthan, India</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="size-4 mt-0.5 text-lavender-600 shrink-0" />
                    <span className="text-slate-700">+91 99999 99999</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="size-4 mt-0.5 text-emerald-600 shrink-0" />
                    <span className="text-slate-700">WhatsApp +91 99999 99999</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="size-4 mt-0.5 text-lavender-600 shrink-0" />
                    <span className="text-slate-700">hello@doctorplatform.in</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-lavender-100 bg-white p-6 shadow-soft">
                <h3 className="font-display font-bold text-slate-900 inline-flex items-center gap-2">
                  <Clock className="size-4 text-lavender-600" /> Working hours
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  <li>Mon–Sat · 9:00 AM – 9:00 PM</li>
                  <li>Sunday · 10:00 AM – 6:00 PM</li>
                </ul>
              </div>

              <div className="map-mock rounded-2xl border border-lavender-100 h-48 relative">
                <div className="pin">
                  <span className="pulse" />
                  <MapPin className="size-7 relative z-10" />
                </div>
                <span className="absolute bottom-3 left-3 right-3 text-center text-[11px] font-semibold text-lavender-800 bg-white/80 backdrop-blur px-2 py-1 rounded-full">
                  Udaipur, Rajasthan
                </span>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PatientFields() {
  return (
    <>
      <Field name="name" label="Your name" required />
      <Field name="phone" label="Phone" inputMode="tel" required placeholder="+91 98765 43210" />
      <Field name="email" label="Email" type="email" />
      <Field name="city" label="City" required defaultValue="Udaipur" />
      <Select
        name="concern"
        label="Primary concern"
        options={[
          "General consultation",
          "Video consult",
          "Lab test",
          "Home care",
          "Find a specialist",
        ]}
      />
    </>
  );
}

function DoctorFields() {
  return (
    <>
      <Field name="name" label="Full name" required />
      <Field name="phone" label="Phone" inputMode="tel" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="degree" label="Degree (MBBS, MD, etc.)" required />
      <Field name="specialty" label="Specialty" required />
      <Field name="reg" label="Medical council reg. #" required />
      <Field name="experience" label="Years of experience" inputMode="numeric" required />
      <Field name="clinic" label="Clinic name" />
      <Field name="city" label="City" required defaultValue="Udaipur" />
      <Textarea name="bio" label="Short bio" full />
    </>
  );
}

function ClinicFields() {
  return (
    <>
      <Field name="name" label="Clinic / hospital name" required />
      <Field name="owner" label="Owner / contact person" required />
      <Field name="phone" label="Phone" inputMode="tel" required />
      <Field name="email" label="Email" type="email" required />
      <Select
        name="type"
        label="Facility type"
        options={["Multi-specialty", "Single specialty", "Dental", "Eye", "Wellness", "Hospital"]}
      />
      <Field name="city" label="City" required defaultValue="Udaipur" />
      <Field name="doctors" label="Number of doctors" inputMode="numeric" />
      <Field name="beds" label="Number of beds" inputMode="numeric" />
      <Textarea name="address" label="Address" full />
    </>
  );
}

function LabFields() {
  return (
    <>
      <Field name="name" label="Lab name" required />
      <Field name="owner" label="Owner / contact person" required />
      <Field name="phone" label="Phone" inputMode="tel" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="city" label="City" required defaultValue="Udaipur" />
      <Field name="estd" label="Established (year)" inputMode="numeric" />
      <Textarea name="address" label="Address" full />
    </>
  );
}

function WellnessFields() {
  return (
    <>
      <Field name="name" label="Center name" required />
      <Field name="owner" label="Owner / contact person" required />
      <Field name="phone" label="Phone" inputMode="tel" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="city" label="City" required defaultValue="Udaipur" />
      <Textarea name="services" label="Services offered" full />
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
  defaultValue,
  inputMode,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  inputMode?: "tel" | "numeric";
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      {required && <span className="sr-only">required</span>}
      <input
        className="field"
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        inputMode={inputMode}
      />
    </label>
  );
}

function Textarea({
  name,
  label,
  full = false,
}: {
  name: string;
  label: string;
  full?: boolean;
}) {
  return (
    <label
      className={`grid gap-2 text-sm font-semibold text-slate-700 ${full ? "sm:col-span-2" : ""}`}
    >
      {label}
      <textarea className="field min-h-24" name={name} />
    </label>
  );
}

function Select({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
      {label}
      <select className="field" name={name}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
