import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/server/db/client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const supabase = await createSupabaseServerClient();
  if (code && supabase) await supabase.auth.exchangeCodeForSession(code);
  return NextResponse.redirect(new URL("/login", url.origin));
}
