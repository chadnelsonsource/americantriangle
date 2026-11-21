import "server-only";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/config/public-env";
import { createSupabaseServerClient } from "@/server/db/client";
import { workspaceAllowed } from "@/server/auth/workspace";

export async function requireWorkspace(allowedKinds: readonly string[]) {
  if (!isSupabaseConfigured()) return;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/login");
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login");
  const { data: profile } = await supabase
    .from("profiles")
    .select("account_kind, account_status")
    .eq("id", data.user.id)
    .maybeSingle();
  const allowed = workspaceAllowed(
    profile ? { accountKind: String(profile.account_kind), accountStatus: String(profile.account_status) } : null,
    allowedKinds,
  );
  if (!allowed) redirect("/unauthorized");
}
