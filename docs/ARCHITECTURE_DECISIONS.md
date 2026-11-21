# Architecture decisions

## ADR-001 Modular monolith

The product is one Next.js deployment with domain modules. A separate service is not introduced. Operational overhead of a network between billing and tasks is not justified by the current scale.

## ADR-002 Supabase for Postgres, Auth, and Storage

One vendor supplies the database, row-level policies, sessions, and object storage. Application code still treats SQL migrations as the schema source. Auth users and `profiles.id` share the same UUID.

## ADR-003 Authorization in two places

`authorize` in `src/services/authorization` decides whether a command may run. Postgres policies decide whether a row may be read or written. The UI hides links as a courtesy. Hidden links are not the control.

## ADR-004 Pure domain rules

Eligibility, exclusive submit, review conflict, earnings transitions, webhook replay, and dataset checks are pure functions. Tests run without Supabase, Stripe, or a model provider. Repositories perform I/O after those functions return.

## ADR-005 Provider adapters for models

`src/services/ai` selects OpenAI, Anthropic, Google Gemini, or an OpenAI-compatible endpoint behind one interface. Business modules depend on the interface. Keys are read from server environment variables at call time.

## ADR-006 Payments are a state machine

Client invoices, client payments, earnings, and payouts are separate. `invoice_created` does not move an earning. Stripe webhook ids are unique. Connect payout execution is a later step gated by a legal decision; the states already exist.

## ADR-007 Durable jobs for retry, not for the request itself

A form submission commits its own row in the request. Inngest handles grading, notification, and email retry. Email failure is stored on the notification attempt and does not roll back the review or the payment.

## ADR-008 No demo data in the production path

`supabase/seed/dev.sql` is development-only reference data. The application returns empty states when a table has no rows. It does not invent metrics. Public pages do not include customer logos, quotes, or statistics.

## ADR-009 Brand tokens live in CSS

Color, type, and radius are CSS variables in `src/styles/globals.css`, consumed by Tailwind. Components use those tokens so the public site and the three workspaces stay on one visual system.

## ADR-010 Environment separation

Development, staging, and production use different Supabase projects and different secrets. Production migrations that delete data are applied by a person, not by an automatic job.
