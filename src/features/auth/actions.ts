"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/server/db/client";
import { appUrl } from "@/config/site";
import { safeInternalPath } from "@/server/auth/paths";
import { logOperationalEvent } from "@/server/observability/log";
import { providerOutage } from "@/server/observability/record";
import { isRateLimited } from "@/services/operations";

export type AuthState = { message?: string; fieldErrors?: Record<string, string> };

const signInFailures = new Map<string, number[]>();
const signInWindowMs = 15 * 60 * 1000;
const signInMaxAttempts = 8;

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(12, "Use at least 12 characters."),
});

function fieldErrorsOf(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

async function clientOrError(): Promise<{ ok: true; supabase: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>> } | { ok: false; state: AuthState }> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { ok: false, state: { message: "Sign-in is not configured yet." } };
  return { ok: true, supabase };
}

export async function signIn(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };
  const email = parsed.data.email.toLowerCase();
  const now = Date.now();
  const prior = signInFailures.get(email) ?? [];
  if (isRateLimited(prior, now, signInWindowMs, signInMaxAttempts)) {
    return { message: "Too many sign-in attempts. Try again later." };
  }
  const ready = await clientOrError();
  if (!ready.ok) return ready.state;
  const { error } = await ready.supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    if (providerOutage(error.status)) logOperationalEvent({ level: "error", event: "auth.sign_in", code: "provider_unavailable" });
    signInFailures.set(email, [...prior, now].slice(-signInMaxAttempts));
    return { message: "Those credentials were not accepted." };
  }
  signInFailures.delete(email);
  redirect(safeInternalPath(String(formData.get("next") ?? "")));
}

export async function signUp(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const kind = formData.get("accountKind") === "client" ? "client" : "contributor";
  const parsed = credentials.safeParse({ email: formData.get("email"), password: formData.get("password") });
  const name = String(formData.get("fullName") ?? "").trim();
  if (!parsed.success || name.length < 2) {
    const fieldErrors: Record<string, string> = parsed.success ? {} : fieldErrorsOf(parsed.error);
    if (name.length < 2) fieldErrors.fullName = "Enter your full name.";
    return { fieldErrors };
  }
  const ready = await clientOrError();
  if (!ready.ok) return ready.state;
  const { error } = await ready.supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${appUrl()}/auth/callback`,
      data: { account_kind: kind, full_name: name },
    },
  });
  if (error) {
    if (providerOutage(error.status)) logOperationalEvent({ level: "error", event: "auth.sign_up", code: "provider_unavailable" });
    return { message: "The account could not be created." };
  }
  return { message: "Check your email to verify the account. Verification is required before protected work." };
}

export async function requestReset(_previous: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!z.string().email().safeParse(email).success) return { fieldErrors: { email: "Enter the account email." } };
  const ready = await clientOrError();
  if (!ready.ok) return ready.state;
  const { error } = await ready.supabase.auth.resetPasswordForEmail(email, { redirectTo: `${appUrl()}/account-recovery` });
  if (error) {
    if (providerOutage(error.status)) logOperationalEvent({ level: "error", event: "auth.reset", code: "provider_unavailable" });
    return { message: "The reset email could not be sent." };
  }
  return { message: "If an account exists for that email, a reset link is on its way." };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}
