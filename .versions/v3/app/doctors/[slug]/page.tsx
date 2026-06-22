import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DoctorProfile } from "@/components/directory/doctor-profile";
import { DOCTOR_FIXTURES, getDoctorBySlug } from "@/lib/demo-directory";

type DoctorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return DOCTOR_FIXTURES.map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    return {};
  }

  return {
    title: `${doctor.name} - ${doctor.specialty} in ${doctor.area}`,
    description: `${doctor.name} at ${doctor.clinic}, ${doctor.area}, Udaipur. Request an appointment callback.`,
  };
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);

  if (!doctor) {
    notFound();
  }

  return <DoctorProfile doctor={doctor} />;
}
