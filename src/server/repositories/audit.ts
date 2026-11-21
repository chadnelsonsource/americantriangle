import "server-only";
import { createAdminClient } from "@/server/db/admin";
import { logOperationalEvent } from "@/server/observability/log";
import { safeDatabaseCode } from "@/server/observability/record";

export async function writeAuditEvent(input: { actorId: string | null; action: string; target: string }) {
  const admin = createAdminClient();
  if (!admin) return { ok: false as const, error: "data_store_unconfigured" };
  const { error } = await admin.from("audit_events").insert({
    actor_id: input.actorId,
    action: input.action,
    target: input.target,
  });
  if (error) {
    return {
      ok: false as const,
      error: "store_failed" as const,
      errorId: logOperationalEvent({ level: "error", event: "audit.write", code: "store_failed", fields: { databaseCode: safeDatabaseCode(error.code) } }).errorId,
    };
  }
  return { ok: true as const };
}
