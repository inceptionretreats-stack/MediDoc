import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const safeNext = next.startsWith("/") ? next : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    const failure = new URL("/sign-in", origin);
    failure.searchParams.set("message", error.message);
    return NextResponse.redirect(failure);
  }

  const fallback = new URL("/sign-in", origin);
  fallback.searchParams.set("message", "Sign-in link is invalid or expired.");
  return NextResponse.redirect(fallback);
}
