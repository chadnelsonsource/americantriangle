# Launch checklist

Use this before a production domain serves the app. Unchecked items mean the launch waits.

- [ ] Counsel publishes the privacy policy and terms. Replace the placeholder pages.
- [ ] Contracting entity and governing law are recorded outside this repo.
- [ ] Production Supabase project exists and is not the development project.
- [ ] Migrations `0001_init.sql` and `0002_storage.sql` are applied.
- [ ] A negative test in that database shows one organization cannot read another.
- [ ] Auth email templates and the site URL match `NEXT_PUBLIC_APP_URL`.
- [ ] Staff accounts are created by invitation, then checked so public signup cannot create them.
- [ ] Stripe is in the intended mode. Webhook signing secret matches the production endpoint.
- [ ] A replayed test webhook does not create a second ledger row.
- [ ] `EMAIL_FROM` uses a domain you control, with SPF and DKIM.
- [ ] `SENTRY_DSN` is set. A thrown test error arrives there, then the test error is removed.
- [ ] Backups for the production database are enabled and a restore has been tried on a copy.
- [ ] Incident contacts are written down for the people who can roll back Vercel and pause Stripe.
- [ ] No demo rows are in the production database.
- [ ] The public site still has no customer logos, testimonials, or performance numbers.
- [ ] Contributor agreements exist before the first paid assignment.
- [ ] Stripe Connect remains off until the payout decision is written down.

## Incident contacts

Names and phone numbers are not invented here. Add them when the operating team exists.
