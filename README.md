# Americantriangle

**Building Intelligence. Engineering Possibility.**

Americantriangle is an AI technology company with three complementary divisions. A customer can use one division or combine them.

### 1. AI Data Infrastructure
- Data collection and annotation
- Human feedback and preference data
- Training-data preparation
- Curation and quality review

### 2. AI Model Training, Research & Evaluation
- Model testing and evaluation
- Training and fine-tuning, scoped as an engagement
- Research and benchmarking
- Safety, alignment, and red-team review

### 3. Enterprise AI Applications
- AI agents and automation
- Custom AI applications
- Enterprise integrations
- Deployment and operations

The public site describes these divisions. Model evaluation is a current service. Training, research, and red-team work are scoped engagements, not a foundation-model training platform.

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
