import { HomeHero } from "@/components/site/home-hero";
import { QuickServiceTiles } from "@/components/site/quick-service-tiles";
import { HowItWorks } from "@/components/site/how-it-works";
import { DoctorDirectory } from "@/components/directory/doctor-directory";

export default function Home() {
  return (
    <>
      <HomeHero />
      <QuickServiceTiles />
      <HowItWorks />
      <DoctorDirectory />
    </>
  );
}
