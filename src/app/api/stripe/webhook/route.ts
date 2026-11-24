import Stripe from "stripe";
import { logOperationalEvent } from "@/server/observability/log";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) return new Response("Stripe is not configured", { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const stripe = new Stripe(key);
  const body = await request.text();
  try {
    const event = stripe.webhooks.constructEvent(body, signature, secret);
    logOperationalEvent({ level: "info", event: "stripe.webhook", code: "accepted", fields: { eventId: event.id, eventType: event.type } });
  } catch {
    logOperationalEvent({ level: "warn", event: "stripe.webhook", code: "signature_invalid" });
    return new Response("Invalid signature", { status: 400 });
  }

  return new Response("ok", { status: 200 });
}
