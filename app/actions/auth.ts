"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email."),
  fullName: z.string().trim().min(1).max(120).optional(),
  next: z.string().startsWith("/").default("/dashboard"),
});

export type AuthActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

async function getOrigin() {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

export async function signInWithMagicLink(
  formData: FormData,
): Promise<AuthActionResult> {
  const parsed = emailSchema.safeParse({
    email: formData.get("email"),
    next: formData.get("next") ?? "/dashboard",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(parsed.data.next)}`,
      shouldCreateUser: false,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, message: "Check your email for the sign-in link." };
}

export async function signUpWithMagicLink(
  formData: FormData,
): Promise<AuthActionResult> {
  const parsed = emailSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName") ?? undefined,
    next: formData.get("next") ?? "/dashboard",
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const supabase = await createClient();
  const origin = await getOrigin();

  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(parsed.data.next)}`,
      shouldCreateUser: true,
      data: parsed.data.fullName ? { full_name: parsed.data.fullName } : undefined,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, message: "Check your email to finish creating your account." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
