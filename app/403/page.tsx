import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Not allowed - Doctor Platform",
  description: "Your role does not have access to this page.",
};

export default function ForbiddenPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center p-8 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-rose-600">
        403
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">
        You don&apos;t have access to this page
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        You&apos;re signed in, but your role doesn&apos;t include the permission
        needed here. If you think this is a mistake, ask an admin to review your
        role assignment.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild variant="default">
          <Link href="/dashboard">Back to dashboard</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </main>
  );
}
