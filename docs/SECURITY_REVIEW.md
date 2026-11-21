# Security review

Date: 2026-11-18. Scope: the application added in Steps 2–26. This is an internal review, not a certification.

## What is in place

- Protected commands go through `authorize` before a write.
- Postgres policies are declared for tenant reads, own-submission reads, finance reads, and anonymous lead inserts. Anonymous users cannot select leads.
- The service-role client lives in `src/server/db/admin.ts` and imports `server-only`. A unit test fails if a component or page imports it. The Stripe webhook is the exception, and it is a route handler.
- Profile role and account-kind changes are rejected in a trigger unless the caller is a super administrator. Public signup forces contributor or client.
- Assessment answer keys are omitted from the column grant to `authenticated`.
- Stripe webhooks require a signature and store the event id as a primary key.
- Earnings cannot jump from “no work approved” to paid, and an invoice event does not move an earning.
- Uploads are checked for type, size, and path characters. Storage buckets in the second migration are private.
- Account export and deletion requests are audit events, not silent deletes.
- Model calls refuse to run without a data-handling flag and a server key.

## Findings

| Severity | Finding | State |
| --- | --- | --- |
| High | RLS policies have not been executed against a database, so a SQL mistake would not have been caught here | Open. Block production until a live negative test passes |
| High | Legal text, retention periods, and the contracting party are unset | Open. Block production |
| Medium | Lead rate limits are process-local | Open. Acceptable for a single dev server, not for a scaled launch |
| Medium | No malware scanner | Open. Accept for text inquiries. Do not accept untrusted office documents in production until a scanner is chosen |
| Medium | `npm audit` reported dependency advisories at install time | Open. Review before production |
| Low | Password reset copy is generic, which is intended | Accepted |
| Low | Sentry is documented and not installed | Open until the DSN exists |

No critical issue was left in the browser bundle as a service-role key. Production is still blocked by the high findings.

## Follow-up, 2026-11-20

This is still an internal review, not a certification. Automated tests were not a hosted database.

| Severity | Finding | State |
| --- | --- | --- |
| High | A sign-in `next` value of `//host` was accepted because it starts with `/` | Fixed in application code. `safeInternalPath` rejects `//`, `/\`, `\`, and `://` |
| High | Workspace layouts checked that someone was signed in, not the account kind or status | Fixed when Supabase is configured. An inactive profile or the wrong kind is sent to `/unauthorized`. Empty states remain when Supabase is not configured. `/account` stays available to a signed-in user |
| High | The recovery page tells the person to choose a new password and does not offer that form. The auth callback always returns to `/login` | Open. Needs an approved recovery form before production sign-in is offered |
| High | A Stripe webhook write error, including a database outage, was returned as HTTP 200 | Fixed. A unique conflict stays 200. Any other write error returns 500 so Stripe can retry. The ledger `event_id` is unique, so a retry does not add a second credit |
| Medium | `assessment_versions` select policy is `using (true)`. It exposes attempt limits and the pass threshold, not answer keys | Open. Do not change the migration until the policy is reviewed. Answer keys stay off the `authenticated` column grant |
| Medium | Many select policies do not call `is_active_user()` | Open. The app gate covers the three workspaces. The SQL change needs approval before it is applied |
| Low | The route error page said the error was logged. No logger is installed | Fixed. The page no longer claims a log |
