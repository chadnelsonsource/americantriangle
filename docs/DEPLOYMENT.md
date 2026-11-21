# Deployment

Target: one Next.js app on Vercel, one Supabase project per environment, separate keys.

This pass does not create the Vercel project, the Supabase projects, the DNS records, or the SSL certificate. Those stay with the account owner.

## Environments

| Environment | App URL | Database | Secrets |
| --- | --- | --- | --- |
| Development | local `npm run dev` | Supabase local or a dev project | `.env.local`, never committed |
| Staging | staging hostname | A separate Supabase project | Vercel staging env |
| Production | production hostname | A separate Supabase project | Vercel production env |

Copy `.env.example`. Leave a value blank to keep that integration off. The service-role key is server-only.

Inquiry email uses Resend only when `RESEND_API_KEY` and `EMAIL_FROM` are both set. A stored inquiry still succeeds when email is off, and the page says the confirmation was not sent. Set `LEAD_NOTIFY_EMAIL` to also send a copy to the team. Do not put a key or an address in source. Apply `supabase/migrations/0003_lead_details.sql` and `supabase/migrations/0004_partnership_inquiries.sql` with the other migrations before expecting the inquiry columns, including partnership fields, to save.

## Release sequence

1. Create a feature branch.
2. Implement the change.
3. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
4. Open a pull request. GitHub Actions runs the same checks.
5. Review the diff.
6. Apply the SQL migrations to staging by hand or with the Supabase CLI. Do not auto-run a migration that deletes production data.
7. Deploy the app to staging.
8. Smoke-test sign-in, an inquiry, a denied cross-organization read, and a Stripe test webhook.
9. Approve the production release.
10. Watch Sentry, once `SENTRY_DSN` is set, and the payment ledger after release.

## Observability

The app writes one JSON line per operational failure to the server log. Each line has a time, a level, an event, a code, and an error id. It does not include passwords, tokens, cookies, email addresses, inquiry text, or request bodies. Public error pages can show the Next.js digest. They do not show a stack trace.

`GET /api/health` returns `{ "status": "ok" }`. It does not list secrets or prove that a vendor is reachable. The operations overview shows whether the database, the privileged database client, email, payments, and background jobs have the required environment values. Configured means the values are present.

Sentry is not installed. A value in `SENTRY_DSN` does not send events. When you are ready, add `@sentry/nextjs` and initialize it from `src/instrumentation.ts` only if `SENTRY_DSN` is present. Scrub email, inquiry text, documents, and authorization headers before an event leaves the server. Do not add the package without a DSN.

PostHog is not installed. Add `posthog-js` only when `NEXT_PUBLIC_POSTHOG_KEY` is set, and do not send inquiry text or contributor documents as event properties.

Inngest shows job retries once `INNGEST_SIGNING_KEY` is set. Email and webhook failures are in the server log before that. Vercel keeps the deployment log for the hosted process. This repository does not add a second log store.

## Domain

Point DNS at Vercel after the staging smoke test. Vercel terminates TLS. Do not deploy production with development keys.
