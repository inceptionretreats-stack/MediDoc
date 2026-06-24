import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in — Doctor Platform",
  description: "Sign in to your Doctor Platform account.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; message?: string }>;
}) {
  const params = await searchParams;
  const next = params.next ?? "/dashboard";
  const message = params.message;

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-md flex-col justify-center px-6 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-slate-600">
          Sign in with a magic link sent to your email.
        </p>
      </div>

      {message && (
        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}

      <div className="mt-8">
        <SignInForm next={next} />
      </div>

      <p className="mt-6 text-center text-sm text-slate-600">
        New to Doctor Platform?{" "}
        <Link
          href={`/sign-up?next=${encodeURIComponent(next)}`}
          className="font-medium text-sky-600 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </section>
  );
}
