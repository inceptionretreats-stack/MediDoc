"use client";

import { CheckCircle2, Clock, ShieldCheck, X } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { DoctorFixture } from "@/lib/demo-directory";

type LeadRequestDialogProps = {
  doctor: DoctorFixture | null;
  onClose: () => void;
};

type LeadFormState = {
  patientName: string;
  phone: string;
  problem: string;
  preferredTime: string;
  consent: boolean;
};

const initialFormState: LeadFormState = {
  patientName: "",
  phone: "",
  problem: "",
  preferredTime: "",
  consent: false,
};

export function LeadRequestDialog({ doctor, onClose }: LeadRequestDialogProps) {
  const [form, setForm] = useState<LeadFormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);

  const normalizedPhone = useMemo(
    () => form.phone.replace(/[^\d+]/g, ""),
    [form.phone],
  );

  if (!doctor) {
    return null;
  }

  const canSubmit =
    form.patientName.trim().length >= 2 &&
    normalizedPhone.length >= 10 &&
    form.problem.trim().length >= 4 &&
    form.consent;

  function updateField<K extends keyof LeadFormState>(
    key: K,
    value: LeadFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  }

  function handleClose() {
    setForm(initialFormState);
    setSubmitted(false);
    onClose();
  }

  return (
    <div
      aria-labelledby="lead-request-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end bg-foreground/35 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
      role="dialog"
    >
      <div className="max-h-[92dvh] w-full overflow-y-auto rounded-t-lg bg-background shadow-2xl ring-1 ring-border sm:max-w-2xl sm:rounded-lg">
        <div className="flex items-start justify-between border-b px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-primary">Request appointment</p>
            <h2 className="mt-1 text-xl font-semibold" id="lead-request-title">
              {doctor.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {doctor.specialty} at {doctor.clinic}, {doctor.area}
            </p>
          </div>
          <Button aria-label="Close lead form" onClick={handleClose} size="icon" variant="ghost">
            <X aria-hidden />
          </Button>
        </div>

        {submitted ? (
          <div className="px-5 py-8 sm:px-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 size-7 text-primary" aria-hidden />
              <div>
                <h3 className="text-lg font-semibold">Lead preview captured locally</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This validates the patient-side flow. When the `create_lead()` RPC
                  is added and Supabase credentials are configured, this form can
                  submit through RLS-safe server code.
                </p>
              </div>
            </div>
            <dl className="mt-6 grid gap-3 rounded-md border bg-muted/40 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Patient</dt>
                <dd className="font-medium">{form.patientName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{normalizedPhone}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Preferred time</dt>
                <dd className="font-medium">{form.preferredTime || doctor.nextAvailable}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Lead status</dt>
                <dd className="font-medium uppercase">{doctor.leadStatus}</dd>
              </div>
            </dl>
            <Button className="mt-6" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <form className="px-5 py-5 sm:px-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium">
                Patient name
                <input
                  className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                  onChange={(event) => updateField("patientName", event.target.value)}
                  placeholder="Full name"
                  value={form.patientName}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Phone number
                <input
                  className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                  inputMode="tel"
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="+91 98765 43210"
                  value={form.phone}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium sm:col-span-2">
                Problem or symptoms
                <textarea
                  className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring transition focus:ring-2"
                  onChange={(event) => updateField("problem", event.target.value)}
                  placeholder="Briefly describe what the patient needs help with"
                  value={form.problem}
                />
              </label>
              <label className="grid gap-2 text-sm font-medium sm:col-span-2">
                Preferred time
                <input
                  className="h-10 rounded-md border bg-background px-3 text-sm outline-none ring-ring transition focus:ring-2"
                  onChange={(event) => updateField("preferredTime", event.target.value)}
                  placeholder={doctor.nextAvailable}
                  value={form.preferredTime}
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 rounded-md border bg-muted/30 p-3 text-sm">
              <input
                checked={form.consent}
                className="mt-1 size-4"
                onChange={(event) => updateField("consent", event.target.checked)}
                type="checkbox"
              />
              <span>
                I consent to be contacted for this appointment request and understand this
                is not emergency medical advice.
              </span>
            </label>

            <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" aria-hidden />
                OTP verification hook planned
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden />
                Staff SLA timer starts after RPC submit
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={handleClose} type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={!canSubmit} type="submit">
                Preview lead request
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
