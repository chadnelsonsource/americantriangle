# Test strategy

Vitest covers domain rules that must stay true without a live vendor:

- Authorization, including cross-organization denial, self-review, and suspended accounts
- Contributor eligibility, duplicate applications, and country rules
- Exclusive task submission
- Review transitions and the earnings gate
- Earnings and payment state transitions, including the rule that an invoice does not pay a contributor
- Webhook replay
- Dataset quality and approved-only export
- Assessment scoring without leaking the answer key
- File type, size, and name checks
- Lead validation, consent, and the honeypot
- Metric rates that stay empty when the denominator is zero
- The migration text enables row level security and does not grant `answer_key` to the browser role
- UI and page files do not import the service-role client

Playwright covers the public home page and lead-form validation in `e2e/public.spec.ts`. It runs against `npm run start` after a production build.

These checks do not replace a live Supabase policy test, a Stripe test-mode webhook, or a signed-in browser journey. Those need credentials and are listed in [KNOWN_ISSUES.md](KNOWN_ISSUES.md).

Commands:

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```
