import "server-only";
import { integrationHealth } from "@/server/observability/record";

export function readIntegrationStatus() {
  const url = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  return integrationHealth({
    database: url && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    privilegedDatabase: url && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    email: Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM),
    payments: Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET),
    jobs: Boolean(process.env.INNGEST_EVENT_KEY && process.env.INNGEST_SIGNING_KEY),
  });
}
