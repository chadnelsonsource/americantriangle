"use server";

import { accountRequestKind } from "@/features/account/request";
import { createSupabaseServerClient } from "@/server/db/client";
import { withReference } from "@/server/observability/record";
import { writeAuditEvent } from "@/server/repositories/audit";

export type AccountState = { message?: string };

export async function requestAccountAction(_previous: AccountState, formData: FormData): Promise<AccountState> {
  const kind = accountRequestKind(formData.get("kind"), formData.get("confirm"));
  if (kind === "invalid") return { message: "Choose export or deletion." };
  if (kind === "unconfirmed") return { message: "Confirm the deletion request before it is recorded." };
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { message: "Identity is not configured, so the request was not recorded." };
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { message: "Sign in before requesting an export or deletion." };
  const saved = await writeAuditEvent({
    actorId: data.user.id,
    action: kind === "delete" ? "account_deletion_requested" : "account_export_requested",
    target: data.user.id,
  });
  if (!saved.ok && saved.error === "store_failed") return { message: withReference("The request was not recorded.", saved.errorId) };
  if (!saved.ok) return { message: "The audit store is not configured, so the request was not recorded." };
  return { message: "The request is recorded. Staff still have to complete the export or deletion." };
}
