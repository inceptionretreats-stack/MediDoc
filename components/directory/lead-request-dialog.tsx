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

  if (!doctor) return null;

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
    if (!canSubmit) return;
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
      role="dialog"
      className="fixed inset-0 z-50 flex items-end backdrop p-0 sm:items-center sm:justify-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-enter max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-lavender-100 bg-white shadow-glow sm:max-w-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between border-b border-lavender-100 px-6 py-5">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-lavender-700">
              Request appointment
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-slate-900" id="lead-request-title">
              {doctor.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {doctor.specialty} · {doctor.clinic}, {doctor.area}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-lavender-50 hover:text-lavender-700"
          >
            <X className="size-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="size-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Request captured
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Our team will reach out to you shortly to confirm your appointment.
                </p>
              </div>
            </div>
            <dl className="mt-6 grid gap-3 rounded-2xl border border-lavender-100 bg-lavender-50/40 p-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Patient</dt>
                <dd className="font-semibold text-slate-900">{form.patientName}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Phone</dt>
                <dd className="font-semibold text-slate-900">{normalizedPhone}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Preferred time</dt>
                <dd className="font-semibold text-slate-900">
                  {form.preferredTime || doctor.nextAvailable}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="font-semibold uppercase text-emerald-700">{doctor.leadStatus}</dd>
              </div>
            </dl>
            <Button variant="gradient" className="mt-6" onClick={handleClose}>
              Done
            </Button>
          </div>
        ) : (
          <form className="px-6 py-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Patient name
                <input
                  className="field"
                  onChange={(e) => updateField("patientName", e.target.value)}
                  placeholder="Full name"
                  value={form.patientName}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700">
                Phone number
                <input
                  className="field"
                  inputMode="tel"
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  value={form.phone}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                Problem or symptoms
                <textarea
                  className="field min-h-24"
                  onChange={(e) => updateField("problem", e.target.value)}
                  placeholder="Briefly describe what the patient needs help with"
                  value={form.problem}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
                Preferred time
                <input
                  className="field"
                  onChange={(e) => updateField("preferredTime", e.target.value)}
                  placeholder={doctor.nextAvailable}
                  value={form.preferredTime}
                />
              </label>
            </div>

            <label className="mt-5 flex items-start gap-3 rounded-xl border border-lavender-100 bg-lavender-50/40 p-4 text-sm text-slate-700">
              <input
                checked={form.consent}
                className="mt-0.5 size-4 accent-lavender-600"
                onChange={(e) => updateField("consent", e.target.checked)}
                type="checkbox"
              />
              <span>
                I consent to be contacted for this appointment request and understand this
                is not emergency medical advice.
              </span>
            </label>

            <div className="mt-5 grid gap-3 text-xs text-slate-500 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-lavender-600" />
                OTP verification on submit
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-lavender-600" />
                Staff response within 30 minutes
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button onClick={handleClose} type="button" variant="outline">
                Cancel
              </Button>
              <Button disabled={!canSubmit} type="submit" variant="gradient">
                Request appointment
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
