# Americantriangle — Agent Instructions

Americantriangle is a professional AI technology platform with two divisions: **AI Data & Model Training** and **Enterprise AI Engineering**. The primary product reference is [docs/MASTER_DEVELOPMENT_ROADMAP.md](docs/MASTER_DEVELOPMENT_ROADMAP.md).

Follow these instructions on every step. Do not change the approved technical direction without explaining why and requesting approval.

## How to work

1. Inspect the repository before changing files.
2. Execute only the step that has been explicitly assigned.
3. Produce a concise implementation plan before changing files when the assignment requires approval first.
4. Do not begin the next roadmap step automatically.
5. Do not implement multiple development steps at the same time.
6. After the assigned step, stop and report files changed, decisions made, tests executed, results, and remaining risks.
7. Update [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md) when a step changes repository status.
8. Do not rebuild working features unnecessarily.
9. Do not silently remove or overwrite existing code.
10. Stop and request approval before major architectural changes outside the approved plan.

## Product boundaries

Preserve the two-division business model and the four product surfaces: public website, contributor platform, enterprise client portal, and internal operations. They share one backend, database, identity system, and permission system.

Distinguish these activities. Do not describe every data operation as model training.

- Data annotation
- Supervised fine-tuning data preparation
- Human preference feedback
- Model evaluation
- AI application development
- AI agent deployment

Do not invent customer logos, testimonials, revenue, employee numbers, certifications, partnerships, performance statistics, an official legal name, or trademark status. Do not claim SOC 2, HIPAA, ISO 27001, or any other certification without completed independent verification.

Do not use fake data in production. Label demo data and development-only behavior clearly.

## Engineering standards

- Use TypeScript strict mode.
- Build a modular monolith. Do not introduce microservices unless a specific requirement is approved.
- Keep business logic out of UI components. Use reusable components and modular domain services.
- Authorize every protected operation on the server. Frontend role checks are not security.
- Never expose secret keys, privileged credentials, or service-role keys to the browser.
- Change schema only through database migrations.
- Validate all external input on the server.
- Add tests for important business logic and permissions.
- Use transactions when operations must succeed or fail together.
- Make financial operations and external webhooks idempotent.
- Avoid unnecessary dependencies.
- After each step that has a toolchain, run the relevant tests, type checks, lint, and build.

## Approved target stack

This stack is the approved direction. It is not installed until the roadmap step that adds it says so. See [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md).

- Next.js App Router, React, TypeScript strict mode
- Public inquiries by email through Resend. No accounts and no Supabase database in this application.
- Tailwind CSS and shadcn/ui
- Zod for validation
- Inngest for durable background workflows
- Stripe for payments
- Resend for transactional email
- Sentry for error monitoring
- PostHog for product analytics
- Vitest for unit and integration tests
- Playwright for browser tests

## Where to look

- [docs/MASTER_DEVELOPMENT_ROADMAP.md](docs/MASTER_DEVELOPMENT_ROADMAP.md) — sequence, gates, and global rules
- [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) — business scope
- [docs/DEVELOPMENT_STATUS.md](docs/DEVELOPMENT_STATUS.md) — current repository status
- `.cursor/rules/` — architecture, security, UI, and testing standards
