# Known issues

1. **No hosted Supabase project is connected.** Migrations and policies are files. They have not been applied, and the negative RLS cases have not been executed in Postgres.
2. **Workspace pages show empty states without credentials.** That is intentional. They do not invent records.
3. **Lead rate limiting is per server process.** A second instance does not see the first instance's counters. A shared store is still required before a multi-instance launch.
4. **Email, Stripe, Inngest, Sentry, and PostHog do nothing until their environment variables are set.** Operational failures now write a redacted JSON line to the server log, and `GET /api/health` reports that the process is up. Sentry and PostHog packages are still not installed. A DSN does not send events. The health check does not call a vendor. Failed email does not roll back a stored lead.
5. **Stripe Connect payouts are not sent.** `STRIPE_CONNECT_ENABLED` is documented and unused by a transfer call.
6. **Image, audio, and video tasks have formats and file rules, not dedicated annotation canvases.**
7. **Learned matching, extra sign-in providers, and multi-layer review as a default are represented in the model and not offered in the UI.**
8. **Privacy, terms, and cookies pages are not legal agreements.** Counsel has not issued the policy, the contract, a company address, or a data-processing agreement. The signed-in client inquiry checks the requirements text and any attachment, then does not save them.
9. **Malware scanning is not connected.** Uploads are rejected for type, size, and path-like names only.
10. **The public README line still differs from the site headline.** The site uses the roadmap line. The README was left as it was, with a development note added.
11. **Playwright needs a production build and a downloaded Chromium.** CI does not download browsers yet. Turbopack crashes in this Windows environment (`STATUS_ILLEGAL_INSTRUCTION`, exit `3221225501`) for both `next dev` and `next build`. `npm run dev` and `npm run build` use webpack.
12. **Next.js 16 warns that `middleware.ts` should move to `proxy`.** The session refresh still runs. The build lists it as Proxy (Middleware).
12. **Dependency audit reported vulnerabilities in the install.** Review them before production. Do not apply a forced audit fix without reading the breaking changes.
13. **Password recovery does not set a new password.** The email link lands on a page that only says to check email, and the auth callback returns to the sign-in form.
14. **Workspace kind and status checks run only after Supabase is configured.** With no database, the empty workspace pages still render. Row level security is still unapplied.
15. **Sign-in and inquiry rate limits are still per process.** A failed inquiry no longer consumes the inquiry quota. A second server still has its own counters.
