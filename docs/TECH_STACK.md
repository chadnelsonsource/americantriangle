# Technology stack

The repository uses this stack. Empty credentials do not stop the public site from building. Protected writes report that the integration is not configured.

| Concern | Choice | Where |
| --- | --- | --- |
| Application | Next.js App Router, React | `src/app` |
| Language | TypeScript strict | `tsconfig.json` |
| Database, auth, files | Supabase (PostgreSQL, Auth, Storage) | `supabase/migrations`, `src/server/db` |
| UI | Tailwind CSS, shared components in the shadcn pattern | `src/components/ui`, `src/styles` |
| Validation | Zod | `src/features/*/schema.ts` and services |
| Background work | Inngest | `src/server/inngest`, `src/app/api/inngest` |
| Client payments | Stripe | `src/app/api/stripe/webhook` |
| Email | Resend | `src/server/email` |
| Errors | JSON server log now. Sentry only after `@sentry/nextjs` is added and `SENTRY_DSN` is set | `src/server/observability` |
| Product analytics | PostHog, only when the public key is set | `src/components/analytics` |
| Unit and integration tests | Vitest | `src/**/*.test.ts` |
| Browser tests | Playwright | `e2e` |
| Hosting target | Vercel, one app, three environments | [DEPLOYMENT.md](DEPLOYMENT.md) |

## Not used

- Microservices, a second database, or an in-browser service-role key.
- A learned matching model.
- In-platform foundation-model training.
- Live Stripe Connect payouts. The ledger has a place for them. Money movement waits on a legal decision.

## Local commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Copy `.env.example` to `.env.local` and fill only the integrations you are exercising. Never commit `.env.local`.
