# Americantriangle — Product Roadmap

Status: Draft for review with [PRD.md](PRD.md).

This is the product release sequence. The engineering sequence remains [MASTER_DEVELOPMENT_ROADMAP.md](MASTER_DEVELOPMENT_ROADMAP.md). Implementation still proceeds one assigned step at a time. A later release in this document is not a reason to start that work early.

## Release definition

| Release | Product outcome | Engineering steps, when assigned |
| --- | --- | --- |
| R0 Foundations | Reviewed requirements, architecture, journeys, and permissions | 1, 2, 3 |
| R1 Brand and shell | A consistent brand and an empty application that builds | 4, 5, 6 |
| R2 Public presence | The website and working lead capture | 7, 8 |
| R3 Trust boundary | Database, accounts, and tested tenant isolation | 9, 10, 11 |
| MVP | First controlled release in PRD section 14 | 12 through 26, inside the MVP cut |
| R4 Depth | Catalog and automation the PRD places after MVP | Later passes over the same steps’ deferred items |

R0 through R3 are prerequisites. They are not a public launch. The MVP is the first production release. R4 starts only after the MVP is reviewed.

## MVP

The MVP is PRD section 14. In product language, a stranger can request work, a contributor can qualify and finish a reviewed text or coding task, a client can see only their project, and finance can tell client cash from contributor pay.

Included:

- Both service catalogs are described on the site. The data catalog that can actually be delivered is text annotation, classification, prompt creation, response evaluation, ranking, preference comparison, coding, mathematics, structured extraction, and a single reviewed dataset export.
- Enterprise delivery can be tracked from inquiry to client approval for consulting, LLM applications, RAG, agents, automation, data engineering, and integrations. Depth of each engineering offer is the project scope, not a prebuilt product for every offer.
- One model provider, behind an internal adapter, for text and structured evaluation support.
- Client card payments through Stripe. Contributor payouts recorded by finance when paid.
- One review layer, with dispute and escalation.

## After MVP

These stay in the approved direction. They are not part of the first production claim.

| Item | Why it waits |
| --- | --- |
| Image, audio, and video annotation | Different tools and file policies. Text and structured tasks prove the workflow first |
| Multi-layer review as a default | The state model supports escalation first. A second required layer is a project setting to add |
| More model providers, embeddings, benchmark suites | The adapter and one provider come first |
| Google, GitHub, and enterprise SSO | Email and password plus staff invitations cover the first accounts |
| Stripe Connect payouts | Needs a legal and operational decision. Manual payout confirmation is the MVP record |
| Upload malware scanning | File type, size, and signed URLs come first. Scanning is an integration after a vendor is chosen |
| Learned matching | Rule-based matching stays until history and an evaluation method exist |
| Broader analytics | MVP dashboards cover the metrics that already have records |
| Certifications | Only after an independent audit. The product will not display them early |

## Not on this roadmap

- In-platform training of foundation models.
- A microservice split without an approved technical requirement.
- Invented customers, metrics, or certifications on the website.

## Dependency order

```text
R0 requirements and design
  -> R1 brand and application shell
    -> R2 public site
      -> R3 identity and tenant isolation
        -> MVP contributor, client, review, dataset, billing, launch
          -> R4 deferred catalog
```

R3 blocks every workspace. Contributor qualification blocks marketplace assignment. Review approval blocks earnings approval. Earnings approval blocks payout confirmation. Client organization membership blocks project visibility.

## What “done” means for the MVP

- A reviewer can refuse a user from another organization, a contributor opening someone else’s submission, and a client opening internal notes. Tests show the refusal.
- One dataset can be imported, worked, reviewed, and exported as an approved version.
- A duplicate payment webhook does not create a second payment record.
- Public pages contain no fabricated proof.
- Staging is smoked before production, and production data is not demo data.

## Open product choices

Held in PRD section 18. They can change the MVP edge without changing the architecture:

- Legal entity and contract party.
- Industries named on the first site.
- Whether a first customer requires image, audio, or video tasks.
- Retention periods.
- Who may approve earnings and cross-organization access, to be fixed in the Step 3 permission matrix.
