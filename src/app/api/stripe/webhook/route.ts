import Stripe from "stripe";
import { createAdminClient } from "@/server/db/admin";
import { logOperationalEvent } from "@/server/observability/log";
import { safeDatabaseCode } from "@/server/observability/record";
import { planLedgerEntry, webhookWriteResult } from "@/services/webhooks";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) return new Response("Stripe is not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const stripe = new Stripe(key);
  const body = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    logOperationalEvent({ level: "warn", event: "stripe.webhook", code: "signature_invalid" });
    return new Response("Invalid signature", { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) return new Response("Data store is not configured", { status: 503 });

  const inserted = await admin.from("webhook_events").insert({ id: event.id, provider: "stripe" });
  const eventWrite = webhookWriteResult(inserted.error?.code);
  if (eventWrite === "failed") {
    logOperationalEvent({
      level: "error",
      event: "stripe.webhook",
      code: "event_not_stored",
      fields: { eventId: event.id, eventType: event.type, databaseCode: safeDatabaseCode(inserted.error?.code) },
    });
    return new Response("Event was not stored", { status: 500 });
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;
    const draft = planLedgerEntry(new Set(), {
      eventId: event.id,
      amountCents: intent.amount_received,
      currency: intent.currency.toUpperCase(),
      direction: "credit",
      reason: "client_payment",
    });
    if (draft.ok) {
      const ledger = await admin.from("ledger_entries").insert({
        event_id: draft.entry.eventId,
        amount_cents: draft.entry.amountCents,
        currency: draft.entry.currency,
        direction: draft.entry.direction,
        reason: draft.entry.reason,
      });
      if (webhookWriteResult(ledger.error?.code) === "failed") {
        logOperationalEvent({
          level: "error",
          event: "stripe.webhook",
          code: "ledger_not_stored",
          fields: { eventId: event.id, eventType: event.type, databaseCode: safeDatabaseCode(ledger.error?.code) },
        });
        return new Response("Ledger was not stored", { status: 500 });
      }
    }
  }

  return new Response("ok", { status: 200 });
}
