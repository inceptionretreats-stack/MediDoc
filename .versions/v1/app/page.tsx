import { Stethoscope, Search, CalendarCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP } from "@/lib/constants";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col px-6">
      <header className="flex items-center gap-2 py-6">
        <Stethoscope className="size-6 text-primary" aria-hidden />
        <span className="text-lg font-semibold">{APP.name}</span>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-8 py-16 text-center">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {APP.city} · trusted &amp; verified doctors
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Find the right doctor.
            <br />
            Book in minutes.
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-muted-foreground">
            Search verified doctors in {APP.city} by specialty, location and availability —
            then request a call or book an appointment instantly.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg">
            <Search aria-hidden /> Find a doctor
          </Button>
          <Button size="lg" variant="outline">
            <CalendarCheck aria-hidden /> List your practice
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Foundation scaffold · Phase&nbsp;0.1 · search, listings &amp; the lead form arrive next.
        </p>
      </section>
    </main>
  );
}
