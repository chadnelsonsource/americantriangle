# Americantriangle — Product Requirements

Status: Draft for review. Step 1 of [MASTER_DEVELOPMENT_ROADMAP.md](MASTER_DEVELOPMENT_ROADMAP.md).

This document defines what Americantriangle is building. It does not authorize implementation. Major product modules stay uncoded until this PRD is reviewed. Architecture remains the approved modular monolith and target stack in [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md).

Personas: [USER_PERSONAS.md](USER_PERSONAS.md). Release boundaries: [PRODUCT_ROADMAP.md](PRODUCT_ROADMAP.md).

## 1. Product vision and positioning

Americantriangle is a professional AI technology company and platform. It helps organizations build, evaluate, and deploy more capable AI systems by combining expert human work, high-quality data operations, and software engineering.

Public positioning, for the website in a later step:

**Building Reliable AI. Powered by Human Expertise.**

Supporting message: Americantriangle combines expert human intelligence, high-quality AI data operations, and advanced engineering to help organizations build, evaluate, and deploy more capable AI systems.

The current README line, “Building Intelligence. Engineering Possibility.”, stays until brand and website steps resolve it. No legal entity name, trademark status, customer proof, or certification is claimed.

## 2. Business model

Americantriangle has two revenue lines on one operating platform.

**AI Data & Model Training.** Clients pay for expert human data work: annotation, supervised fine-tuning data preparation, preference feedback, evaluation, and quality assurance. Qualified contributors do the work. Americantriangle reviews it, approves earnings, and delivers accepted output to the client.

**Enterprise AI Engineering.** Clients pay for professional services and custom systems: strategy, LLM and RAG applications, agents, automation, data engineering, integrations, deployment, and ongoing support. Internal engineers and project managers deliver the work. Contributor labor may support a delivery project, and that labor stays a separate work stream with its own approval and pay rules.

Commercial shape:

- Enterprise work is quoted, proposed, contracted, and invoiced. Client payment status is tracked. Card data is never stored on Americantriangle systems.
- Contributor pay is calculated from approved work, then approved as earnings, then paid. An invoice to a client does not by itself pay a contributor.
- Registration does not guarantee paid work.
- The platform does not train foundation models. It prepares and evaluates data and can export approved datasets to a client’s existing training systems.

## 3. Target customer profiles

Design profiles, not real customers. No logos, case studies, or performance claims are attached to them. Detail lives in [USER_PERSONAS.md](USER_PERSONAS.md).

| Profile | Buys | Success looks like |
| --- | --- | --- |
| Model evaluation lead | Human evaluation, preference ranking, benchmark runs, quality reports | Trusted scores and an export the team can audit |
| Data operations lead | Annotation, classification, prompt creation, supervised example sets | A versioned, reviewed dataset with known provenance |
| Engineering director | An LLM application, RAG system, agent, or integration | A delivered system with milestones, approvals, and support |
| Transformation sponsor | Strategy, discovery, and a build that follows | A scoped proposal and a project the sponsor can track |

Buyers are organizations. A client owner represents the organization. Client members see only what their role allows. One organization cannot see another organization’s data.

Industries to feature on the public site are not selected yet. Candidates consistent with the expertise catalog are software, financial services, healthcare and life sciences, scientific research, and professional services. Publishing a specific industry focus is an open decision in section 18.

## 4. Contributor personas

Contributors are independent experts who apply, qualify, and then accept eligible work. They are not employees and not client users.

Expertise categories:

- Software engineering
- Mathematics
- Physics
- Science
- AI and machine learning
- Data science
- Writing and linguistics
- Finance
- Business
- Legal
- Healthcare and life sciences

Design personas in [USER_PERSONAS.md](USER_PERSONAS.md): Alex (software), Priya (mathematics and science), Jordan (writing and linguistics), Morgan (regulated domain: finance, legal, or life sciences).

Contributor states: Registered, Profile Incomplete, Pending Assessment, Under Review, Qualified, Rejected, Suspended.

Account states, separate from contributor qualification: Pending verification, Active, Suspended, Deactivated.

## 5. Internal employee personas

Employees are invited. There is no public self-registration as an employee or administrator.

Roles:

| Role | Primary responsibility |
| --- | --- |
| Contributor | External. Completes eligible assigned work |
| Client Owner | Owns one client organization, billing visibility, and membership |
| Client Member | Works inside one client organization within granted access |
| Project Manager | Runs delivery from inquiry through client acceptance |
| Reviewer | Scores contributor work against a rubric. Does not review own submissions |
| Talent Operations | Reviews contributor applications and qualifications |
| Finance Operations | Invoices, earnings approval, payouts, reconciliation |
| Engineer | Builds and supports enterprise AI systems and internal tooling |
| Administrator | Operates the platform inside granted administrative powers |
| Super Administrator | Cross-organization administration, with audited actions |

Personas for the internal roles are in [USER_PERSONAS.md](USER_PERSONAS.md).

## 6. AI Data & Model Training service catalog

Each service is a distinct offer. Sales and delivery copy must use the specific name.

| Service | Client receives | Human work |
| --- | --- | --- |
| Data annotation | Labeled or structured records against a schema | Apply labels, spans, or structure to source material |
| Data classification | Records assigned to an allowed label set | Choose one or more classes per item |
| Prompt creation | Prompts written to a stated spec | Write and revise prompts |
| Supervised fine-tuning data preparation | Approved input-output examples, versioned and exportable | Write or correct examples. This is data preparation, not training a model |
| Human preference feedback | Ranked or pairwise preferences | Compare or rank model outputs |
| LLM response evaluation | Scores and comments against criteria | Judge responses |
| Coding tasks | Reviewed code, solutions, or code judgments | Solve or review programming work |
| Mathematics and scientific reasoning | Reviewed solutions and reasoning | Solve or assess technical problems |
| Domain tasks | Work product in finance, law, business, or life sciences | Apply domain judgment within project instructions |
| Benchmarking | A benchmark run and a quality report | Evaluate items against a fixed set |
| Quality assurance | An accept, revise, or reject decision with a score | Expert review of submitted work |

Image, audio, and video annotation are in the product. They are outside the first release. See [PRODUCT_ROADMAP.md](PRODUCT_ROADMAP.md).

## 7. Enterprise AI Engineering service catalog

| Service | Client receives |
| --- | --- |
| AI strategy and consulting | Discovery notes the client is allowed to see, a recommendation, and an estimate |
| Custom AI development | A scoped application and its deliverables |
| LLM applications | A product feature or internal tool that calls a language model |
| RAG systems | Retrieval over the client’s authorized content, with citations or source links where the design requires them |
| AI agents | An agent operating inside an agreed workflow and tool set |
| Workflow automation | An automated process with human approval where the design requires it |
| Data engineering | Pipelines and datasets needed for the engagement |
| Enterprise integrations | Connections to the client’s systems under an agreed interface |
| Deployment, monitoring, and support | A released system, an operating handoff, and a support path |

An engineering project can include a data service. The data service keeps its own tasks, reviews, and earnings. The engineering project keeps milestones, deliverables, and client approvals.

## 8. Public website requirements

Pages:

1. Home
2. AI Data & Model Training
3. Enterprise AI Engineering
4. Platform
5. Industries
6. About
7. Become a Contributor
8. Contact
9. Request a Consultation
10. Privacy Policy
11. Terms of Service

Home includes a hero, both divisions, the human-expertise proposition, a platform workflow, industries, an enterprise call to action, a contributor call to action, and a footer.

Lead forms:

- AI data projects
- Model evaluation projects
- AI consulting
- Custom AI development
- General enterprise inquiries

Each submission is validated on the server, stored, protected against obvious spam, and routed to the internal team for that inquiry type. The visitor sees a confirmation or a recoverable error. Consent is collected where a privacy review says it is required.

Search requirements: unique titles and descriptions, canonical URLs, Open Graph metadata, sitemap, robots rules, structured data where it matches visible content, semantic headings, optimized images, and alt text.

The site publishes no invented logos, testimonials, revenue, headcount, certifications, partnerships, or statistics.

## 9. Contributor platform requirements

A contributor can:

- Register with email and password, verify email, reset password, and sign out.
- Complete a profile: skills, education, work experience, languages, portfolio links, availability, country, time zone, and professional background.
- Upload documents only where a project or compliance step requires them.
- See profile completeness and the current qualification state.
- Take eligible assessments and see the result the policy allows them to see.
- Discover projects they are eligible for, apply once, accept an invitation once, and decline.
- Open an assigned task, save a draft, submit once for an exclusive assignment, and track status.
- Respond to a revision request.
- See pending earnings, approved earnings, payable balance, and payment history for their own work.
- Receive in-app notices and email for decisions that affect their account, assignments, reviews, and pay.

A contributor cannot see another contributor’s submissions, earnings, or personal profile. A contributor cannot see client-private notes, internal rubrics, or correct assessment answers before the policy allows. A contributor cannot review their own submission.

## 10. Enterprise client portal requirements

A client owner can register an organization, manage its profile, invite members, and choose member roles inside the organization.

A client user can:

- Start an inquiry in a service category from section 6 or 7.
- Provide requirements and upload documents.
- Request a consultation.
- Track the inquiry.
- See, for their organization only: active projects, pending proposals, milestones, deliverables, approvals, messages, invoices, and support requests.
- Approve a deliverable when the project asks for client approval.

Client-visible updates and internal notes are different records. Clients do not see internal notes, contributor personal data, unpublished rubrics, or other organizations.

## 11. Internal operations requirements

Talent operations can review applications and move contributors through the qualification states.

Reviewers work from a queue, apply criteria, score, comment, request revision, escalate, and resolve disputes. High-risk projects can require more than one review layer. That multi-layer default is a later release. The first release supports one required review layer and an escalation path.

Project managers can create a project, record scope, objectives, requirements, owners, team, milestones, dependencies, status, risks, deliverables, and client approvals. They can keep internal notes off the client timeline. Project types: AI data operations, model evaluation, AI consulting, AI application development, agent deployment, and integration projects.

The delivery path is: new inquiry, qualification, technical discovery, estimation, proposal, contract, kickoff, execution, quality review, client approval, delivery, support.

Finance can issue quotes and invoices, record payment status, approve earnings, and record payouts. Engineers can be assigned to delivery projects. Administrators and super administrators can manage accounts and see audit events for sensitive actions. Super-administrator actions that cross organizations are audited.

Employees see contributor personal data only when their role requires it.

## 12. Functional requirements

### Identity and access

- FR-ID-1. Email and password authentication, email verification, password reset, session refresh, and logout.
- FR-ID-2. Account states: Pending verification, Active, Suspended, Deactivated. Suspended and deactivated accounts cannot start protected work.
- FR-ID-3. Contributor registration and client registration are public. Employee and administrator accounts are invitation-only.
- FR-ID-4. Every protected action checks identity, role, organization membership, and resource access on the server.
- FR-ID-5. Optional later: Google sign-in, GitHub sign-in, and enterprise SSO.

### Organizations

- FR-ORG-1. A client organization has a profile, members, and roles.
- FR-ORG-2. Data from one organization is unavailable to another organization.
- FR-ORG-3. Invitations can be accepted once and expire.

### Contributors and assessments

- FR-CON-1. Profile fields and completeness from section 9.
- FR-CON-2. Qualification states from section 4. Talent operations can approve or reject an application.
- FR-ASS-1. Assessment types: multiple choice, written, coding, mathematics, scientific reasoning, domain questions, and file submission.
- FR-ASS-2. Assessments have versions, eligibility rules, optional time limits, and attempt limits.
- FR-ASS-3. Supported objective items are scored automatically. Other items can require manual review.
- FR-ASS-4. Attempts and versions stay stored so a result can be audited.
- FR-ASS-5. Correct answers and private scoring notes stay hidden until a published policy shows them.

### Marketplace and tasks

- FR-MKT-1. A project can require skills, qualifications, language, country where the restriction is legally appropriate, and availability.
- FR-MKT-2. Matching is rule-based and explainable. Learned or opaque ranking is out of scope until there is enough history and a written evaluation method.
- FR-MKT-3. The system blocks duplicate applications, duplicate assignments, ineligible acceptance, and assignments past project capacity.
- FR-TASK-1. Task formats: text annotation, classification, prompt creation, LLM response evaluation, response ranking, preference comparison, coding, mathematics, scientific reasoning, structured extraction, image annotation, audio annotation, and video annotation.
- FR-TASK-2. A task has a versioned payload schema, instructions, assignment, expiration, lock, draft, submission, version history, and status.
- FR-TASK-3. An exclusive assignment accepts one active contributor submission.
- FR-TASK-4. Staff can request a revision. The contributor can submit a new version. History is kept.

### Quality

- FR-QA-1. Review states: Submitted, Queued for Review, Under Review, Approved, Revision Required, Rejected, Disputed.
- FR-QA-2. A review has criteria, a score, comments, and an actor.
- FR-QA-3. A contributor does not review their own submission unless a named workflow grants that exception.
- FR-QA-4. Earnings are not approvable until the project’s approval policy is satisfied.
- FR-QA-5. The system can record accuracy, agreement, completion rate, rework rate, review turnaround, and reviewer consistency from stored reviews.

### Enterprise delivery

- FR-DEL-1. Inquiry categories match sections 6 and 7.
- FR-DEL-2. The delivery path in section 11 is represented as project status, not as free text only.
- FR-DEL-3. Internal notes and client-visible updates are stored separately.
- FR-DEL-4. Client approval is an explicit action on a deliverable.

### AI and datasets

- FR-AI-1. Business code calls an internal model interface. Provider SDKs stay behind adapters.
- FR-AI-2. The interface covers text generation, structured output, classification, embeddings, evaluation, summarization, and scoring.
- FR-AI-3. Provider calls record model, token usage, cost metadata, timeouts, and errors. API keys stay on the server.
- FR-AI-4. Private customer content is sent to an external provider only when that project is authorized and a data-handling rule is configured.
- FR-DATA-1. Records exist for dataset, dataset version, source, record, annotation schema, job, result, expert feedback, preference pair, evaluation run, criteria, benchmark, and quality report.
- FR-DATA-2. A dataset can move from imported source data, through validation, human work, disagreement handling, and aggregation, to an approved export.
- FR-DATA-3. Quality checks cover missing values, duplicates, invalid formats, schema violations, inconsistent labels, and reviewer disagreement.
- FR-DATA-4. Raw, processed, and approved outputs stay distinct.
- FR-DATA-5. The product does not claim that it trains foundation models.

### Notifications, files, and finance

- FR-NOT-1. In-app notifications exist for assignment, review outcome, project status, and payment status changes that the user is allowed to see.
- FR-NOT-2. Transactional email uses the same events. A failed email does not mark the project or payment as failed.
- FR-NOT-3. Background workflows that retry, wait, or span steps are durable, idempotent, and logged.
- FR-FILE-1. Uploads declare allowed types and a size limit. Downloads of private files use time-limited authorized URLs.
- FR-FIN-1. Client artifacts: quote, proposal, invoice, payment status, payment history, and refund record where a refund happens.
- FR-FIN-2. Contributor artifacts: pending earnings, approved earnings, payable balance, payment batch, and payment history.
- FR-FIN-3. Ledger entries are immutable. Corrections are new adjustment entries.
- FR-FIN-4. Client card payments use Stripe. Webhooks are signature-checked and idempotent.
- FR-FIN-5. Work approval, earnings calculation, earnings approval, payout initiation, and payout confirmation are separate states.
- FR-FIN-6. Contributor payout automation through Stripe Connect waits on a legal and operational decision. Until then, finance records a payout that occurred outside the product.

### Administration and analytics

- FR-AUD-1. Sensitive actions write an audit event with actor, action, target, and time.
- FR-AN-1. Operational dashboards read stored records and respect role access.
- FR-AN-2. Product analytics and error monitoring exclude unnecessary personal data and private customer content.

## 13. Non-functional requirements

- NFR-1. TypeScript strict mode. Business rules live in server-side domain services.
- NFR-2. Schema changes ship as migrations. Identifiers for primary records are UUIDs.
- NFR-3. Protected operations are authorized on the server. Row Level Security is part of tenant and personal-data isolation.
- NFR-4. External input is validated on the server.
- NFR-5. Multi-record business actions that must succeed or fail together run in a transaction.
- NFR-6. Financial writes and payment webhooks are idempotent.
- NFR-7. Secrets and the database service-role credential are never shipped to the browser.
- NFR-8. The first release is a modular monolith. A new deployable service requires an approved reason.
- NFR-9. Interactive UI is keyboard accessible, has visible focus, works on narrow and wide viewports, and supports light and dark themes.
- NFR-10. Permission-sensitive behavior has automated tests, including cross-organization access, contributor-to-contributor access, client access to internal notes, and privilege escalation.
- NFR-11. Demo data is labeled and is not present in production.
- NFR-12. Development, staging, and production use separate credentials and databases.
- NFR-13. Production migrations that destroy data are not applied automatically.

## 14. MVP scope

The first controlled release is the smallest set that can take an enterprise inquiry, qualify a contributor, complete a reviewed task, show the client their own project, and account for money without mixing client payment and contributor pay.

In the first release:

- Public website, metadata, and the five lead forms.
- Email-password accounts, verification, recovery, sessions, and invitation-only staff.
- Organizations, the role list, server authorization, and tenant isolation.
- Contributor profiles, talent review, and assessments for multiple choice, written response, and coding. Mathematics and domain written items may ride the written type.
- Rule-based matching, applications, invitations, and capacity limits.
- Task formats: text annotation, classification, prompt creation, response evaluation, ranking, preference comparison, coding, mathematics, and structured extraction.
- One review layer, the full review state list, escalation, and dispute.
- Client inquiry, documents, member invites, and organization-scoped project, message, and invoice views.
- Internal delivery path and separate internal notes.
- One server-side model provider for text generation, structured output, and evaluation support.
- One dataset path from import to reviewed export, including version and provenance.
- Durable jobs and email for assessment results, assignment, review, and payment status.
- Stripe client payments in test mode before any live key. Ledger, earnings approval, and manually confirmed contributor payouts.
- Private file upload and signed download, account export and deletion requests, and an audit log for sensitive actions.
- Dashboards whose numbers come from those records, for the roles that may see them.
- Automated tests for the permission cases in NFR-10, plus a staging smoke test before production.

Engineering still follows the master roadmap one step at a time. The MVP list is a release boundary, not permission to skip ahead or to build several steps at once.

## 15. Future product scope

Still on the approved roadmap, after the first release is reviewed:

- Image, audio, and video annotation.
- File-based and timed scientific assessments as first-class types where the written type is not enough.
- Multi-layer review as a standard project setting.
- Additional model providers, embeddings, and benchmark suites.
- Google sign-in, GitHub sign-in, and enterprise SSO.
- Stripe Connect contributor payouts, after legal and operational approval.
- Malware scanning for uploads.
- Learned matching, only with an evaluation method.
- Richer operational analytics.
- Independent certifications, only after a real audit. The product must not imply they already exist.

Outside the approved product until the roadmap is changed:

- Training foundation models inside Americantriangle.
- Splitting the system into microservices by default.
- Publishing invented customer proof or performance statistics.

## 16. Key business metrics

These are definitions. No baseline or target number is set, because none has been measured.

| Metric | Definition |
| --- | --- |
| Inquiries | Stored lead or portal inquiries, by service category |
| Qualified leads | Inquiries a project manager marks qualified |
| Proposals | Proposals issued |
| Active clients | Organizations with a project in execution or support |
| Applications | Contributor applications created |
| Qualification rate | Contributors who reach Qualified, divided by contributors who finish the required assessment |
| Active contributors | Qualified contributors who submitted work in the reporting window |
| Task completion | Assigned tasks submitted before expiration |
| Approval, rejection, revision rates | Reviews in each terminal or revision state, divided by reviews completed |
| Reviewer agreement | Share of items where independent reviewers match, when a project collects more than one review |
| Review turnaround | Time from Queued for Review to a terminal review state |
| On-time milestones | Milestones completed by their due date |
| Invoiced revenue | Sum of issued invoices |
| Collected revenue | Sum of payments confirmed by the payment provider or by a recorded manual confirmation |
| Approved earnings | Contributor earnings in the approved state |
| Outstanding earnings | Approved earnings not yet confirmed paid |
| Payment success | Provider payments that reach a succeeded state, divided by payment attempts |

Dashboards must compute these from stored rows. A missing data source shows an empty state, not a placeholder number.

## 17. User journeys

Route-level detail is Step 3. These are the journeys the product must support.

1. **Visitor inquiry.** An anonymous visitor reads a service page, submits a valid inquiry, and sees confirmation. An internal owner sees the lead. An invalid form shows field errors and stores nothing.
2. **Contributor qualification.** A person registers, verifies email, completes a profile, passes or fails the required assessment, and is accepted or rejected by talent operations. Rejection explains that work is not available. Acceptance makes eligible projects visible.
3. **Eligible assignment.** A qualified contributor opens only eligible projects, applies once or accepts one invitation, and receives a single exclusive assignment.
4. **Task completion.** The contributor saves a draft, submits, and sees the review state. A second contributor cannot submit that same exclusive assignment.
5. **Review.** A reviewer who is not the contributor approves, rejects, or requests revision. A revision returns the task to the contributor. A dispute is visible to an authorized reviewer or manager.
6. **Earnings.** After the approval policy passes, finance sees pending earnings, approves them, and later records a payout. The contributor sees only their own amounts and statuses.
7. **Client project.** A client owner creates an organization, invites a colleague, submits an inquiry, and later sees proposals, milestones, deliverables, and invoices for that organization only.
8. **Delivery.** A project manager moves the work along the delivery path, writes an internal note the client cannot see, and requests client approval on a deliverable.
9. **Dataset export.** Staff import source records, contributors complete the human step, reviewers resolve disagreements, and an authorized user exports the approved version.
10. **Recovery and denial.** A user resets a password, a suspended user is refused protected actions, and a user who opens another organization’s URL receives an authorization failure.

## 18. Assumptions and risks

### Assumptions

- A-1. The first release boundary in section 14 is a proposal for this review. The master roadmap remains the implementation sequence.
- A-2. The public brand line for the website is the roadmap line in section 1, not the current README line.
- A-3. Pricing is project-based. The product stores quotes and invoices. It does not publish a rate card until the business provides one.
- A-4. Contributor payouts in the first release can be confirmed manually. Automated Connect payouts wait for a legal decision.
- A-5. The product UI is specified in English. Other UI languages are not required for the first release.
- A-6. Country restrictions on tasks are allowed only when a documented legal reason exists for that project.
- A-7. One external model vendor is enough for the first release. The adapter boundary stays in place so a second vendor does not rewrite business modules.
- A-8. Privacy Policy and Terms of Service pages exist for launch. Counsel supplies the legal text. The product team does not invent legal terms.
- A-9. Industries listed in section 3 are candidates, not a commitment.

### Open decisions

- Legal entity, contracting party, and governing law.
- Which industries appear on the first website.
- Whether any image, audio, or video work is required to win the first customer. The default in this PRD is no.
- Who may approve earnings, refunds, and cross-organization administration. Step 3 will turn the answer into a permission matrix.
- Data retention periods. Step 23 defines the mechanism. Retention durations need a business decision.

### Risks

- R-1. Building the full catalog before a narrow first workflow will delay a usable release. Section 14 exists to prevent that.
- R-2. Treating annotation, preference data, and engineering delivery as one “training” pipeline will confuse buyers and corrupt metrics.
- R-3. Client payment and contributor payout can be conflated. FR-FIN-5 is the control.
- R-4. Tenant isolation implemented only in the interface will leak data. NFR-3 and the negative tests are the control.
- R-5. Publishing unverified certifications or sample customers would mislead buyers. The website requirements forbid it.
- R-6. Sending client content to a model provider without a project-level rule would break confidentiality. FR-AI-4 is the control.
- R-7. There is no legal entity on record. Contracts, privacy text, and payouts cannot be finalized inside the product docs alone.

## Completion gate

No coding of major product modules until this PRD is reviewed. The next engineering assignment, when given, is Step 2 only: system architecture and technical design.
