"use client";

import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  formatFee,
  getRelatedDoctors,
  type DoctorFixture,
} from "@/lib/demo-directory";

import { LeadRequestDialog } from "./lead-request-dialog";

type Section = {
  id: string;
  title: string;
};

export function DoctorProfile({ doctor }: { doctor: DoctorFixture }) {
  const [showLeadDialog, setShowLeadDialog] = useState(false);
  const relatedDoctors = getRelatedDoctors(doctor);

  const sections: Section[] = [
    { id: "overview", title: "Overview" },
    { id: "education-and-training", title: "Education and training" },
    { id: "career-and-experience", title: "Career and experience" },
    { id: "conditions-treated", title: "Conditions treated" },
    { id: "services-offered", title: "Services offered" },
    { id: "awards-and-recognition", title: "Awards and recognition" },
    { id: "professional-memberships", title: "Professional memberships" },
    { id: "clinic-and-location", title: "Clinic and location" },
    { id: "languages-spoken", title: "Languages spoken" },
    { id: "availability", title: "Availability" },
    { id: "reviews-and-ratings", title: "Reviews and ratings" },
    ...(relatedDoctors.length > 0
      ? [{ id: "see-also", title: "See also" }]
      : []),
    { id: "references", title: "References" },
  ];

  const yearStarted = 2026 - doctor.experienceYears;

  return (
    <>
      <main className="min-h-dvh bg-[#f8f9fa] font-serif text-[15px] leading-7 text-[#202122]">
        <div className="mx-auto max-w-6xl bg-white px-5 py-6 shadow-sm sm:px-10 sm:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 font-sans text-sm text-[#3366cc] hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            Back to directory search
          </Link>

          <header className="mt-4 border-b border-[#a2a9b1] pb-3">
            <h1 className="font-serif text-[2rem] font-normal leading-tight text-[#000]">
              {doctor.name}
            </h1>
            <p className="mt-1 text-sm italic text-[#54595d]">
              From Doctor Platform, the verified Udaipur health directory.
            </p>
          </header>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
            <article className="min-w-0">
              <p>
                <strong>{doctor.name}</strong> (
                <span className="italic">practising since {yearStarted}</span>) is
                a <WikiLink>{doctor.specialty.toLowerCase()}</WikiLink> based in{" "}
                <WikiLink>{doctor.area}</WikiLink>, {doctor.city},
                Rajasthan, India. They consult at{" "}
                <WikiLink>{doctor.clinic}</WikiLink> and have{" "}
                {doctor.experienceYears} years of clinical experience.
                {doctor.verified ? (
                  <>
                    {" "}
                    The listing is{" "}
                    <span className="inline-flex items-center gap-1 align-middle font-sans text-xs font-semibold text-[#0a7d1a]">
                      <CheckCircle2 className="size-3.5" /> verified
                    </span>{" "}
                    by the platform&apos;s onboarding team.
                  </>
                ) : null}
                <Sup>[1]</Sup>
              </p>

              {doctor.bio.map((paragraph) => (
                <p className="mt-3" key={paragraph.slice(0, 40)}>
                  {paragraph}
                </p>
              ))}

              {/* Wikipedia-style table of contents */}
              <nav
                aria-label="Contents"
                className="mt-6 inline-block min-w-[260px] border border-[#a2a9b1] bg-[#f8f9fa] px-5 py-3"
              >
                <p className="font-sans text-sm font-bold text-[#202122]">
                  Contents
                </p>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-[#3366cc] hover:underline"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <Section id="overview" title="Overview">
                <p>
                  {doctor.name} is listed in the{" "}
                  <WikiLink>Doctor Platform</WikiLink> directory under the{" "}
                  <WikiLink>{doctor.specialty}</WikiLink> specialty for{" "}
                  {doctor.city}. With {doctor.experienceYears} years of
                  experience, they manage a{" "}
                  <WikiLink>{doctor.availabilityLabel.toLowerCase()}</WikiLink>{" "}
                  consultation calendar at {doctor.clinic}.<Sup>[1]</Sup>
                </p>
                <p className="mt-3">
                  Consultations are charged at{" "}
                  <strong>{formatFee(doctor.feePaise)}</strong> per visit.
                  Patient ratings for this listing average{" "}
                  <strong>{doctor.rating}</strong> across{" "}
                  <strong>{doctor.reviews}</strong> reviews.<Sup>[3]</Sup>
                </p>
              </Section>

              <Section
                id="education-and-training"
                title="Education and training"
              >
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[#a2a9b1] bg-[#eaecf0] text-left">
                      <th className="px-3 py-2 font-sans font-bold">Year</th>
                      <th className="px-3 py-2 font-sans font-bold">Degree</th>
                      <th className="px-3 py-2 font-sans font-bold">Institution</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctor.education.map((entry) => (
                      <tr
                        className="border-b border-[#eaecf0]"
                        key={`${entry.degree}-${entry.year}`}
                      >
                        <td className="px-3 py-2 align-top">{entry.year}</td>
                        <td className="px-3 py-2 align-top">
                          <strong>{entry.degree}</strong>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <WikiLink>{entry.institution}</WikiLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>

              <Section id="career-and-experience" title="Career and experience">
                <p>
                  {doctor.name} has been in active practice since{" "}
                  <strong>{yearStarted}</strong> ({doctor.experienceYears}{" "}
                  years).
                </p>
                <ul className="mt-3 space-y-2">
                  {doctor.careerHighlights.map((entry) => (
                    <li
                      className="grid grid-cols-[60px_1fr] gap-3"
                      key={`${entry.year}-${entry.description.slice(0, 20)}`}
                    >
                      <span className="font-sans font-bold text-[#54595d]">
                        {entry.year}
                      </span>
                      <span>{entry.description}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="conditions-treated" title="Conditions treated">
                <ul className="grid list-disc gap-1 pl-6 sm:grid-cols-2">
                  {doctor.conditionsTreated.map((condition) => (
                    <li key={condition}>
                      <WikiLink>{condition}</WikiLink>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="services-offered" title="Services offered">
                <ul className="list-disc space-y-1 pl-6">
                  {doctor.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </Section>

              <Section id="awards-and-recognition" title="Awards and recognition">
                {doctor.awards.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-6">
                    {doctor.awards.map((award) => (
                      <li key={award}>{award}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="italic text-[#54595d]">
                    No published awards on file. <em>[citation needed]</em>
                  </p>
                )}
              </Section>

              <Section
                id="professional-memberships"
                title="Professional memberships"
              >
                <ul className="list-disc space-y-1 pl-6">
                  {doctor.memberships.map((membership) => (
                    <li key={membership}>
                      <WikiLink>{membership}</WikiLink>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="clinic-and-location" title="Clinic and location">
                <p>
                  Consultations take place at <strong>{doctor.clinic}</strong>,{" "}
                  <span className="italic">{doctor.clinicAddress}</span>, in the{" "}
                  <WikiLink>{doctor.area}</WikiLink> neighbourhood of{" "}
                  <WikiLink>{doctor.city}</WikiLink>, Rajasthan. The clinic is
                  searchable by area or specialty from the platform&apos;s public
                  directory.
                </p>
                <p className="mt-3">
                  <strong>Consultation hours:</strong> {doctor.consultationHours}
                  .<Sup>[2]</Sup>
                </p>
              </Section>

              <Section id="languages-spoken" title="Languages spoken">
                <p>
                  This listing reports comfort consulting in the following
                  languages:
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  {doctor.languages.map((language) => (
                    <li key={language}>
                      <WikiLink>{language}</WikiLink>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section id="availability" title="Availability">
                <p>
                  Next available consultation slot:{" "}
                  <strong>{doctor.nextAvailable}</strong>. The doctor&apos;s
                  general consultation window is described as{" "}
                  <em>{doctor.availabilityLabel.toLowerCase()}</em>. Slot
                  visibility is updated by the clinic&apos;s front-desk
                  workspace.<Sup>[2]</Sup>
                </p>
              </Section>

              <Section id="reviews-and-ratings" title="Reviews and ratings">
                <p>
                  The current published rating is{" "}
                  <strong>{doctor.rating} / 5</strong>, aggregated from{" "}
                  <strong>{doctor.reviews}</strong> moderated patient reviews.
                  Reviews are accepted only after a completed booking and are
                  reviewed by the platform&apos;s moderation team before they
                  appear publicly.<Sup>[3]</Sup>
                </p>
              </Section>

              {relatedDoctors.length > 0 ? (
                <Section id="see-also" title="See also">
                  <ul className="space-y-3">
                    {relatedDoctors.map((related) => (
                      <li
                        className="flex items-start gap-3"
                        key={related.id}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          className="size-12 shrink-0 rounded-md border border-[#a2a9b1] object-cover"
                          loading="lazy"
                          src={related.photoUrl}
                        />
                        <div>
                          <Link
                            className="text-[#3366cc] hover:underline"
                            href={`/doctors/${related.slug}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {related.name}
                          </Link>{" "}
                          <span className="text-sm text-[#54595d]">
                            — {related.specialty}, {related.area}
                          </span>
                          <p className="text-sm text-[#54595d]">
                            {related.summary}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}

              <Section id="references" title="References">
                <ol className="list-decimal space-y-1.5 pl-6 text-sm">
                  <li id="cite_note-1">
                    <span className="text-[#54595d]">
                      Doctor Platform directory entry —{" "}
                    </span>
                    <em>{doctor.slug}</em>. Verified {doctor.city} doctor
                    listings, 2026.
                  </li>
                  <li id="cite_note-2">
                    <span className="text-[#54595d]">
                      Platform booking module —{" "}
                    </span>
                    appointment availability for {doctor.clinic}.
                  </li>
                  <li id="cite_note-3">
                    <span className="text-[#54595d]">
                      Patient review aggregate —{" "}
                    </span>
                    {doctor.reviews} moderated reviews, average{" "}
                    {doctor.rating} / 5.
                  </li>
                </ol>
              </Section>
            </article>

            {/* Wikipedia-style infobox */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <table className="w-full border-collapse border border-[#a2a9b1] bg-[#f8f9fa] font-sans text-sm">
                <caption className="bg-[#eaecf0] px-3 py-2 text-base font-bold text-[#000]">
                  {doctor.name}
                </caption>
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      className="border-b border-[#a2a9b1] p-4 text-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={`Portrait of ${doctor.name}`}
                        className="mx-auto h-44 w-44 rounded-sm border border-[#a2a9b1] object-cover"
                        src={doctor.photoUrl}
                      />
                      <p className="mt-2 text-xs italic text-[#54595d]">
                        Placeholder portrait. Replaced with the doctor&apos;s
                        own photo after verification.
                      </p>
                    </td>
                  </tr>
                  <InfoRow label="Born/started practice">{yearStarted}</InfoRow>
                  <InfoRow label="Specialty">{doctor.specialty}</InfoRow>
                  <InfoRow label="Experience">
                    {doctor.experienceYears} years
                  </InfoRow>
                  <InfoRow label="Clinic">{doctor.clinic}</InfoRow>
                  <InfoRow label="Address">{doctor.clinicAddress}</InfoRow>
                  <InfoRow label="Area">
                    {doctor.area}, {doctor.city}
                  </InfoRow>
                  <InfoRow label="Hours">{doctor.consultationHours}</InfoRow>
                  <InfoRow label="Languages">
                    {doctor.languages.join(", ")}
                  </InfoRow>
                  <InfoRow label="Consultation fee">
                    {formatFee(doctor.feePaise)}
                  </InfoRow>
                  <InfoRow label="Next available">
                    {doctor.nextAvailable}
                  </InfoRow>
                  <InfoRow label="Rating">
                    {doctor.rating} / 5 ({doctor.reviews} reviews)
                  </InfoRow>
                  <InfoRow label="Verification status">
                    {doctor.verified ? "Verified" : "Pending"}
                  </InfoRow>
                  <tr>
                    <td
                      colSpan={2}
                      className="border-t border-[#a2a9b1] bg-white p-3"
                    >
                      <Button
                        className="w-full"
                        onClick={() => setShowLeadDialog(true)}
                      >
                        <CalendarCheck aria-hidden /> Request appointment
                      </Button>
                      <p className="mt-2 flex items-start gap-1.5 text-xs text-[#54595d]">
                        <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-[#0a7d1a]" />
                        Consent and medical disclaimer shown before submit.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 border border-[#a2a9b1] bg-[#f8f9fa] p-3 font-sans text-xs text-[#54595d]">
                <p className="font-bold text-[#202122]">External searches</p>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a
                      className="text-[#3366cc] hover:underline"
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        `${doctor.name} ${doctor.specialty} Udaipur`,
                      )}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Search on Google
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-[#3366cc] hover:underline"
                      href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(
                        doctor.specialty,
                      )}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Read about {doctor.specialty} on Wikipedia
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <LeadRequestDialog
        doctor={showLeadDialog ? doctor : null}
        onClose={() => setShowLeadDialog(false)}
      />
    </>
  );
}

function Section({
  children,
  id,
  title,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section className="mt-8">
      <h2
        className="border-b border-[#a2a9b1] pb-1 font-serif text-[1.5rem] font-normal text-[#000]"
        id={id}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-1">{children}</div>
    </section>
  );
}

function InfoRow({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <tr className="border-t border-[#a2a9b1]">
      <th
        className="w-[42%] bg-[#eaecf0] px-3 py-2 text-left align-top text-xs font-bold text-[#202122]"
        scope="row"
      >
        {label}
      </th>
      <td className="px-3 py-2 align-top">{children}</td>
    </tr>
  );
}

function WikiLink({ children }: { children: React.ReactNode }) {
  return <span className="text-[#3366cc] underline-offset-2">{children}</span>;
}

function Sup({ children }: { children: React.ReactNode }) {
  return (
    <sup className="ml-0.5 text-[10px] text-[#3366cc]">{children}</sup>
  );
}
