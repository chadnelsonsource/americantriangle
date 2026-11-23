# Americantriangle

**Talent. Technology. Opportunity.**

Connecting human expertise, applied technology, and a requirement that can be scoped.

Talent, Technology, and Opportunity are how the company thinks. The three divisions are what it delivers. A customer can use one division or combine them.

### 1. AI Data Infrastructure

The foundation. Collection, annotation, human feedback, and training-data preparation. The work product is reviewed data, not a trained model.

### 2. AI Model Training, Research & Evaluation

The intelligence. Model evaluation is a current service. Training, research, benchmarking, and safety review are scoped engagements, not a foundation-model training platform.

### 3. Enterprise AI Applications

The implementation. Agents, custom applications, integrations, and operations, delivered as projects with milestones and client approval.

**Project status:** Application foundation is in the repository. Production launch is not complete. See `docs/DEVELOPMENT_STATUS.md`.

## Development

```bash
npm install
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
```

Copy `.env.example` to `.env.local` before connecting Supabase, Stripe, email, or a model provider. The public site runs without those values. Workspace data stays empty until a database is configured. Do not commit `.env.local`.
