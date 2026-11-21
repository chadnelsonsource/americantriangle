# Production readiness

Status: **not ready for production.**

The application builds as a modular monolith and the domain rules are tested. A production launch still needs accounts and reviews this repository cannot complete on its own.

| Check | State |
| --- | --- |
| Public pages and lead validation | Implemented |
| TypeScript strict, lint, unit tests, production build | Run in CI when GitHub Actions is enabled |
| Supabase migrations present | Not applied to a hosted project in this pass |
| Row Level Security executed against Postgres | Not run. The SQL is in the repo and a text guard checks that policies are declared |
| Auth email, reset, and session | Implemented against Supabase. Not exercised without keys |
| Stripe signature check and idempotent event insert | Implemented. Not exercised against test mode |
| Model provider call | Adapter boundary tested with a fake adapter. No live provider call |
| Inngest functions | Defined. Not executed on Inngest Cloud |
| Legal terms and privacy policy | Placeholders. Counsel has not issued text |
| Contributor payout automation | Recorded as a later, legally gated step |
| Malware scanning | Not integrated |
| Independent certification | Not claimed and not started |
| Staging smoke test | Not run |

Do not point a production domain at this build until the launch checklist is complete and the critical gaps in [KNOWN_ISSUES.md](KNOWN_ISSUES.md) are closed or explicitly accepted.
