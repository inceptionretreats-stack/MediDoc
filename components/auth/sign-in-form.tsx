"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signInWithMagicLink } from "@/app/actions/auth";

export function SignInForm({ next }: { next: string }) {
  const [pending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<
    | { kind: "success"; message: string }
    | { kind: "error"; message: string }
    | null
  >(null);

  function onSubmit(formData: FormData) {
    setFeedback(null);
    startTransition(async () => {
      const result = await signInWithMagicLink(formData);
      setFeedback(
        result.ok
          ? { kind: "success", message: result.message }
          : { kind: "error", message: result.error },
      );
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
        />
      </div>

      {feedback && (
        <div
          className={
            feedback.kind === "success"
              ? "rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
              : "rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
          }
        >
          {feedback.message}
        </div>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={pending}
      >
        {pending ? "Sending link…" : "Send magic link"}
      </Button>
    </form>
  );
}
