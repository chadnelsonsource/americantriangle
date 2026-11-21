export const EARNINGS_STATES = [
  "none",
  "pending",
  "approved",
  "payout_initiated",
  "paid",
  "payout_failed",
] as const;

export type EarningsState = (typeof EARNINGS_STATES)[number];

export type EarningsEvent =
  | "work_approved"
  | "invoice_created"
  | "approve_earnings"
  | "initiate_payout"
  | "confirm_payout"
  | "fail_payout";

export type EarningsTransition =
  | { ok: true; state: EarningsState }
  | { ok: false; error: "invalid_transition" };

const TRANSITIONS: Record<EarningsState, Partial<Record<EarningsEvent, EarningsState>>> = {
  none: { work_approved: "pending" },
  pending: { approve_earnings: "approved" },
  approved: { initiate_payout: "payout_initiated" },
  payout_initiated: { confirm_payout: "paid", fail_payout: "payout_failed" },
  paid: {},
  payout_failed: { initiate_payout: "payout_initiated" },
};

export function nextEarningsState(state: EarningsState, event: EarningsEvent): EarningsTransition {
  if (event === "invoice_created") return { ok: true, state };
  const next = TRANSITIONS[state][event];
  if (!next) return { ok: false, error: "invalid_transition" };
  return { ok: true, state: next };
}

export type PaymentState = "requires_payment" | "processing" | "succeeded" | "failed" | "refunded";

export function nextPaymentState(
  state: PaymentState,
  eventType: string,
): { ok: true; state: PaymentState } | { ok: false; error: "ignored_event" | "invalid_transition" } {
  if (eventType === "invoice.created") return { ok: true, state };
  const map: Record<string, PaymentState | undefined> = {
    "payment_intent.processing": state === "requires_payment" ? "processing" : undefined,
    "payment_intent.succeeded": state === "requires_payment" || state === "processing" ? "succeeded" : undefined,
    "payment_intent.payment_failed": state === "succeeded" || state === "refunded" ? undefined : "failed",
    "charge.refunded": state === "succeeded" ? "refunded" : undefined,
  };
  if (!(eventType in map)) return { ok: false, error: "ignored_event" };
  const next = map[eventType];
  if (!next) return { ok: false, error: "invalid_transition" };
  return { ok: true, state: next };
}
