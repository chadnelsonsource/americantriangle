export function webhookWriteResult(code: string | undefined): "stored" | "duplicate" | "failed" {
  if (!code) return "stored";
  if (code === "23505") return "duplicate";
  return "failed";
}

export function acceptWebhookEvent(
  seenIds: ReadonlySet<string>,
  eventId: string,
): { accept: boolean; reason: "new" | "duplicate" | "missing_id" } {
  if (!eventId.trim()) return { accept: false, reason: "missing_id" };
  if (seenIds.has(eventId)) return { accept: false, reason: "duplicate" };
  return { accept: true, reason: "new" };
}

export interface LedgerDraft {
  eventId: string;
  amountCents: number;
  currency: string;
  direction: "credit" | "debit";
  reason: string;
}

export function planLedgerEntry(
  seenIds: ReadonlySet<string>,
  draft: LedgerDraft,
): { ok: true; entry: LedgerDraft } | { ok: false; reason: "duplicate" | "missing_id" | "invalid_amount" } {
  const accepted = acceptWebhookEvent(seenIds, draft.eventId);
  if (!accepted.accept) return { ok: false, reason: accepted.reason === "missing_id" ? "missing_id" : "duplicate" };
  if (!Number.isInteger(draft.amountCents) || draft.amountCents === 0) {
    return { ok: false, reason: "invalid_amount" };
  }
  if (!/^[A-Z]{3}$/.test(draft.currency)) return { ok: false, reason: "invalid_amount" };
  return { ok: true, entry: draft };
}
