# Americantriangle — Project Overview

Americantriangle is a professional AI technology company and platform. The long-term reference is [MASTER_DEVELOPMENT_ROADMAP.md](MASTER_DEVELOPMENT_ROADMAP.md). This overview states the business scope. It does not replace the roadmap, and it does not authorize implementation beyond the assigned step.

## Positioning

The roadmap’s public positioning, to be implemented in Step 7, is:

**Building Reliable AI. Powered by Human Expertise.**

Americantriangle combines expert human intelligence, high-quality AI data operations, and advanced engineering to help organizations build, evaluate, and deploy more capable AI systems.

[README.md](../README.md) currently uses a different line: “Building Intelligence. Engineering Possibility.” That file was not changed in Step 0. Public copy and brand direction belong to Steps 4 and 7.

No official corporate legal name or trademark status is defined. Do not invent one.

## Business divisions

### AI Data & Model Training

- Data collection, annotation, and preparation
- Expert contributor network
- Human feedback and preference ranking
- LLM evaluation and benchmarking
- Coding, mathematics, scientific, and domain-specific tasks
- Model improvement and post-training workflows
- Quality assurance and expert review

### Enterprise AI Engineering

- AI strategy and consulting
- Custom AI applications
- LLM and RAG systems
- AI agents and automation
- Machine learning and data engineering
- Enterprise software integrations
- Deployment, monitoring, and ongoing support

These are different kinds of work. Do not describe every data operation as model training.

| Activity | What it is |
| --- | --- |
| Data annotation | Humans label, classify, or structure source material |
| Supervised fine-tuning data preparation | Approved examples are prepared for a training system |
| Human preference feedback | People compare or rank model outputs |
| Model evaluation | People or harnesses measure model behavior against criteria |
| AI application development | Engineers build a product that uses models |
| AI agent deployment | Engineers ship and operate an agent in a customer workflow |

The platform prepares and evaluates data and can integrate with existing training systems. It does not, by itself, claim to train foundation models.

## Product surfaces

One shared backend, database, identity system, and permission system serves four surfaces:

1. **Public website** — services, positioning, contributor recruiting, and enterprise inquiries.
2. **Contributor platform** — profiles, assessments, eligible work, task execution, and earnings visibility.
3. **Enterprise client portal** — organization workspace, inquiries, projects, deliverables, messages, and invoices.
4. **Internal operations platform** — talent review, quality assurance, delivery management, finance, and administration.

Client data is isolated by organization. Contributor personal data is limited to roles that need it. Internal notes stay separate from client-visible updates.

## Approved technical direction

Modular monolith. The target stack is Next.js App Router, React, TypeScript strict mode, PostgreSQL through Supabase, Supabase Auth, Supabase Storage, Tailwind CSS, shadcn/ui, Zod, Inngest, Stripe, Resend, Sentry, PostHog, Vitest, and Playwright.

Proposed domains: Identity and Access, Organizations, Contributors, Assessments, Projects, Tasks, Submissions, Quality Assurance, AI Integrations, Enterprise Delivery, Billing and Payments, Notifications, File Management, Analytics, Administration, Audit and Compliance.

None of this stack is installed yet. See [DEVELOPMENT_STATUS.md](DEVELOPMENT_STATUS.md).

## Explicit non-goals

- Do not invent customer logos, testimonials, revenue, employee numbers, certifications, partnerships, or performance statistics.
- Do not claim SOC 2, HIPAA, ISO 27001, or any other certification without completed independent verification.
- Do not use fake data in production. Label demo and development-only behavior.
- Do not introduce microservices unless a specific requirement is approved.
- Do not promise that contributor registration guarantees work.
- Do not treat a client invoice as proof that contributor work has been paid.
