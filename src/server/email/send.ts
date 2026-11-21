import "server-only";
import { logOperationalEvent } from "@/server/observability/log";
import { emailOutcome } from "@/server/observability/record";

export async function sendTransactionalEmail(input: {
  to: string;
  subject: string;
  text: string;
}): Promise<{ ok: true } | { ok: false; error: "email_not_configured" | "email_failed"; errorId?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return emailOutcome({ configured: false, providerError: false, thrown: false });

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to: input.to,
      subject: input.subject,
      text: input.text,
    });
    const outcome = emailOutcome({ configured: true, providerError: Boolean(result.error), thrown: false });
    if (!outcome.ok) return { ...outcome, errorId: logOperationalEvent({ level: "error", event: "email.send", code: "email_failed" }).errorId };
    return outcome;
  } catch {
    return { ok: false, error: "email_failed", errorId: logOperationalEvent({ level: "error", event: "email.send", code: "email_failed" }).errorId };
  }
}
