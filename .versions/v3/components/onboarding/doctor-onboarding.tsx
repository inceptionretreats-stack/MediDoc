"use client";

import { CheckCircle2, ClipboardCheck, MapPin, Stethoscope } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { AREA_FILTERS, SPECIALTY_FILTERS } from "@/lib/demo-directory";

type OnboardingState = {
  fullName: string;
  specialty: string;
  clinic: string;
  area: string;
  fee: string;
  languages: string;
  experienceYears: string;
  consent: boolean;
};

const initialState: OnboardingState = {
  fullName: "",
  specialty: "General Physician",
  clinic: "",
  area: "Fatehsagar",
  fee: "",
  languages: "Hindi, English",
  experienceYears: "",
  consent: false,
};

export function DoctorOnboarding() {
  const [form, setForm] = useState<OnboardingState>(initialState);
  const [saved, setSaved] = useState(false);

  const canSave =
    form.fullName.trim().length >= 3 &&
    form.clinic.trim().length >= 3 &&
    Number(form.fee) > 0 &&
    Number(form.experienceYears) >= 0 &&
    form.consent;

  function updateField<K extends keyof OnboardingState>(
    key: K,
    value: OnboardingState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSave) {
      return;
    }
    setSaved(true);
  }

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Doctor onboarding</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Create listing draft</h1>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:flex">
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/dashboard">Lead dashboard</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/admin">Admin review</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/roles">Role workspaces</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-8 lg:grid-cols-[1fr_300px]">
        <form className="rounded-lg border p-5 shadow-sm" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Doctor name">
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Dr. Full Name"
                value={form.fullName}
              />
            </Field>
            <Field label="Specialty">
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                onChange={(event) => updateField("specialty", event.target.value)}
                value={form.specialty}
              >
                {SPECIALTY_FILTERS.filter((item) => item !== "All specialties").map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Clinic name">
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                onChange={(event) => updateField("clinic", event.target.value)}
                placeholder="Clinic or hospital"
                value={form.clinic}
              />
            </Field>
            <Field label="Area">
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                onChange={(event) => updateField("area", event.target.value)}
                value={form.area}
              >
                {AREA_FILTERS.filter((item) => item !== "All areas").map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>
            <Field label="Experience years">
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                min="0"
                onChange={(event) => updateField("experienceYears", event.target.value)}
                placeholder="10"
                type="number"
                value={form.experienceYears}
              />
            </Field>
            <Field label="Consultation fee (INR)">
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                min="1"
                onChange={(event) => updateField("fee", event.target.value)}
                placeholder="500"
                type="number"
                value={form.fee}
              />
            </Field>
            <Field label="Languages">
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                onChange={(event) => updateField("languages", event.target.value)}
                value={form.languages}
              />
            </Field>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-md border bg-muted/30 p-3 text-sm">
            <input
              checked={form.consent}
              className="mt-1 size-4"
              onChange={(event) => updateField("consent", event.target.checked)}
              type="checkbox"
            />
            <span>
              I confirm this is a draft listing and verification/KYC must be completed
              before public publishing.
            </span>
          </label>

          <Button className="mt-6" disabled={!canSave} type="submit">
            <ClipboardCheck aria-hidden /> Save local draft
          </Button>
        </form>

        <aside className="space-y-4">
          <div className="rounded-lg border p-5">
            <Stethoscope className="size-5 text-primary" aria-hidden />
            <h2 className="mt-4 font-semibold">Publishing boundary</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This draft flow does not bypass admin verification. Real persistence
              must use tenant-scoped server actions after Supabase is connected.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <MapPin className="size-5 text-primary" aria-hidden />
            <h2 className="mt-4 font-semibold">Udaipur-first data</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Areas and specialties are seeded from local fixtures until live
              `specialties`, `clinics`, and `doctors` reads are available.
            </p>
          </div>
          {saved ? (
            <div className="rounded-lg border bg-accent p-5 text-accent-foreground">
              <CheckCircle2 className="size-5" aria-hidden />
              <h2 className="mt-4 font-semibold">Draft validated locally</h2>
              <p className="mt-2 text-sm leading-6">
                {form.fullName} / {form.specialty} / {form.clinic}, {form.area}
              </p>
            </div>
          ) : null}
        </aside>
      </section>
    </main>
  );
}

function Field({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
    </label>
  );
}
