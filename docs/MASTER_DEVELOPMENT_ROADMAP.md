# AMERICANTRIANGLE — MASTER CURSOR DEVELOPMENT PLAN

## Project objective

Build Americantriangle, a professional AI technology company and platform inspired by the business architecture and operational capabilities of Scale AI.

The platform has two primary business divisions:

**A. AI Data & Model Training**
- Data collection, annotation, and preparation
- Expert contributor network
- Human feedback and preference ranking
- LLM evaluation and benchmarking
- Coding, mathematics, scientific, and domain-specific tasks
- Model improvement and post-training workflows
- Quality assurance and expert review

**B. Enterprise AI Engineering**
- AI strategy and consulting
- Custom AI applications
- LLM and RAG systems
- AI agents and automation
- Machine learning and data engineering
- Enterprise software integrations
- Deployment, monitoring, and ongoing support

The product must support:
- Public website
- Contributor platform
- Enterprise client portal
- Internal operations platform
- Shared backend, database, identity, and permission system

---

# GLOBAL RULES FOR EVERY DEVELOPMENT STEP

Follow these requirements throughout the project.

1. Inspect the existing repository before changing files.
2. Do not rebuild working features unnecessarily.
3. Use TypeScript strict mode.
4. Follow the approved architecture and existing design system.
5. Keep business logic out of UI components.
6. Use reusable components and modular domain services.
7. Use server-side authorization for every protected operation.
8. Never rely on frontend-only role checks for security.
9. Never expose secret keys, privileged credentials, or service-role keys to the browser.
10. Use database migrations for schema changes.
11. Validate all external input on the server.
12. Add tests for important business logic and permissions.
13. Use transactions for operations that must succeed or fail together.
14. Make financial operations and external webhooks idempotent.
15. Avoid unnecessary dependencies and premature microservices.
16. Do not invent customer logos, testimonials, revenue, employee numbers, certifications, partnerships, or performance statistics.
17. Do not use fake data in production.
18. Clearly identify demo data and development-only functionality.
19. Do not silently remove or overwrite existing code.
20. After each step, run relevant tests, type checks, linting, and builds.
21. Report files changed, decisions made, tests executed, results, and remaining risks.
22. Stop and request approval before major architectural changes outside the approved plan.

For every step, first produce a concise implementation plan. Execute only the assignment in that step. Do not begin future steps automatically.

---

# PHASE 1 — PRODUCT DEFINITION AND ARCHITECTURE

## STEP 0 — Repository Audit and Permanent Cursor Instructions

**Assignment:** Establish the development rules and understand the current codebase before implementation.

Inspect the complete repository.

Determine:
- Current framework and version
- Package manager
- Existing dependencies
- Existing application routes
- Existing UI components
- Existing backend integrations
- Existing database configuration
- Authentication status
- Environment variables and configuration structure
- Current tests and build process
- Existing technical debt

Do not make unnecessary code changes during this audit.

Create or update the following documentation:

1. `AGENTS.md` — permanent project-wide development instructions.
2. `.cursor/rules/architecture.mdc` — architecture and coding standards.
3. `.cursor/rules/security.mdc` — security and authorization requirements.
4. `.cursor/rules/ui-design.mdc` — design system and UI requirements.
5. `.cursor/rules/testing.mdc` — testing and verification standards.
6. `docs/PROJECT_OVERVIEW.md` — project description and business scope.
7. `docs/DEVELOPMENT_STATUS.md` — current repository status.

The instructions must reflect the Americantriangle business model and approved technology stack.

**Deliverables:**
- Repository audit report
- Permanent Cursor rules
- Existing functionality inventory
- List of technical risks
- Recommended next implementation steps

**Completion gate:** Do not start product development until the repository audit is complete.

---

## STEP 1 — Product Requirements Document (PRD)

**Assignment:** Define exactly what Americantriangle is building.

Create a detailed PRD for the complete platform.

Include:

1. Product vision and positioning.
2. Business model.
3. Target customer profiles.
4. Contributor personas.
5. Internal employee personas.
6. AI Data & Model Training service catalog.
7. Enterprise AI Engineering service catalog.
8. Public website requirements.
9. Contributor platform requirements.
10. Enterprise client portal requirements.
11. Internal operations requirements.
12. Functional requirements.
13. Non-functional requirements.
14. MVP scope.
15. Future product scope.
16. Key business metrics.
17. User journeys.
18. Assumptions and risks.

Define the distinction between:
- Data annotation
- Supervised fine-tuning data preparation
- Human preference feedback
- Model evaluation
- AI application development
- AI agent deployment

Do not describe every data operation as model training.

Create:
- `docs/PRD.md`
- `docs/USER_PERSONAS.md`
- `docs/PRODUCT_ROADMAP.md`

**Deliverables:** Approved requirements and clear MVP boundaries.

**Completion gate:** No coding of major product modules until the PRD is reviewed.

---

## STEP 2 — System Architecture and Technical Design

**Assignment:** Design the production architecture.

Use the following initial architecture unless the repository audit identifies a compelling reason to change it:

- Next.js App Router
- React
- TypeScript strict mode
- PostgreSQL through Supabase
- Supabase Auth
- Supabase Storage
- Tailwind CSS
- shadcn/ui
- Zod for validation
- Inngest for durable background workflows
- Stripe for payments
- Resend for transactional email
- Sentry for error monitoring
- PostHog for product analytics
- Vitest for unit and integration testing
- Playwright for browser testing

Design a modular monolith with clear domain boundaries.

Proposed domains:

- Identity and Access
- Organizations
- Contributors
- Assessments
- Projects
- Tasks
- Submissions
- Quality Assurance
- AI Integrations
- Enterprise Delivery
- Billing and Payments
- Notifications
- File Management
- Analytics
- Administration
- Audit and Compliance

Define:
- Application architecture
- Domain boundaries
- Server/client boundaries
- Database access patterns
- API conventions
- Background job architecture
- External integration architecture
- Error handling
- Logging and observability
- Deployment architecture

Do not introduce microservices unless a specific technical requirement justifies them.

Create:
- `docs/ARCHITECTURE.md`
- `docs/DOMAIN_MODEL.md`
- `docs/TECH_STACK.md`
- `docs/ARCHITECTURE_DECISIONS.md`

Include Mermaid diagrams for the system architecture and key request flows.

**Completion gate:** Review the architecture before implementation.

---

## STEP 3 — User Journeys, Permissions and Application Sitemap

**Assignment:** Design the complete application experience.

Define the route structure and user journeys for:

1. Anonymous visitors
2. Contributors
3. Client organization owners
4. Client organization members
5. Project managers
6. Reviewers
7. Talent operations
8. Finance operations
9. Engineers
10. Administrators
11. Super administrators

Create route groups for:

- Public website
- Authentication
- Contributor workspace
- Client workspace
- Internal operations

Define:
- Navigation structure
- Dashboard structure
- Route protection
- User onboarding
- Organization onboarding
- Invitation flows
- Account recovery
- Logout and session expiration
- Unauthorized and not-found pages

Document the permissions matrix for every role.

Create:
- `docs/USER_FLOWS.md`
- `docs/ROUTES_AND_NAVIGATION.md`
- `docs/PERMISSION_MATRIX.md`

**Completion gate:** Every major user journey and route must be documented.

---

# PHASE 2 — BRAND AND APPLICATION FOUNDATION

## STEP 4 — Americantriangle Brand and Design Direction

**Assignment:** Establish a distinctive enterprise technology brand.

Brand: **Americantriangle**

The brand should communicate:
- AI infrastructure
- Engineering excellence
- Human expertise
- Trust and reliability
- Scientific and technical capability
- Enterprise readiness
- Global ambition

Create a professional brand direction inspired by the quality of leading enterprise technology companies, without copying their identity.

Develop:
- Logo and wordmark direction
- Color palette
- Typography
- Brand voice
- Iconography
- Image direction
- Illustration direction
- UI visual language
- Button and interaction styles

Use a restrained, premium technology aesthetic.

Avoid generic AI imagery, excessive gradients, glowing brain illustrations, and template-like website layouts.

Do not invent an official corporate legal name or trademark status.

Create:
- `docs/BRAND_GUIDELINES.md`
- `docs/BRAND_ASSETS.md`

Implement the reusable design tokens after the direction is approved.

**Completion gate:** Brand direction and design tokens are consistent across the application.

---

## STEP 5 — Application Foundation and Repository Structure

**Assignment:** Establish a clean, scalable application foundation.

Implement or improve:
- Next.js App Router configuration
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui
- ESLint
- Prettier
- Path aliases
- Environment configuration
- Error boundaries
- Loading states
- Not-found pages
- Global layout
- Responsive application shell

Organize code by business domain.

Suggested structure:

- `src/app`
- `src/components`
- `src/features`
- `src/lib`
- `src/server`
- `src/services`
- `src/types`
- `src/config`
- `src/hooks`
- `src/styles`
- `supabase/migrations`
- `supabase/seed`
- `docs`

Use a consistent feature structure with components, schemas, services, types, and tests.

Avoid creating a large number of empty files.

**Deliverables:** A working application foundation with a clean build and documented conventions.

**Completion gate:** Application runs locally and passes lint, type checks, and production build.

---

## STEP 6 — Shared Design System and Component Library

**Assignment:** Build the reusable UI component system.

Implement reusable components for:

- Buttons
- Inputs
- Selects
- Textareas
- Checkboxes
- Radio controls
- Form validation
- Dialogs
- Drawers
- Dropdown menus
- Tooltips
- Tabs
- Badges
- Alerts
- Cards
- Tables
- Pagination
- Search
- Filters
- Breadcrumbs
- Sidebars
- Top navigation
- Dashboard metrics
- Charts
- Empty states
- Skeleton loading
- Toast notifications
- File upload interfaces

Use accessible components and consistent design tokens.

Requirements:
- Keyboard accessibility
- Clear focus states
- Responsive behavior
- Light and dark theme support
- Consistent spacing
- Reusable variants
- Strong visual hierarchy

Do not create separate implementations of the same component for different dashboards.

**Deliverables:** A shared component library and design system documentation.

**Completion gate:** All components have consistent styles and usable responsive behavior.

---

# PHASE 3 — PUBLIC WEBSITE AND CUSTOMER ACQUISITION

## STEP 7 — Public Corporate Website

**Assignment:** Build the public Americantriangle website.

Create the following pages:

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

Homepage positioning:

**Building Reliable AI. Powered by Human Expertise.**

Supporting message:

"Americantriangle combines expert human intelligence, high-quality AI data operations, and advanced engineering to help organizations build, evaluate, and deploy more capable AI systems."

Present the two primary business divisions clearly.

Include:
- Strong hero section
- Service overview
- Human expertise proposition
- Platform workflow
- Industries
- Enterprise CTA
- Contributor CTA
- Footer

Do not fabricate customer logos, case studies, certifications, testimonials, or business statistics.

Use polished, professional copy.

**Deliverables:** Complete responsive public website with functional navigation and CTAs.

**Completion gate:** All public routes work, links are valid, and forms have appropriate validation states.

---

## STEP 8 — SEO, Content and Lead Generation

**Assignment:** Prepare the public website for discoverability and business inquiries.

Implement:
- Page titles and descriptions
- Canonical URLs
- Open Graph metadata
- Sitemap
- Robots configuration
- Structured data where appropriate
- Semantic headings
- Image optimization
- Accessible alt text
- Performance optimization

Create lead generation forms for:
- AI data projects
- Model evaluation projects
- AI consulting
- Custom AI development
- General enterprise inquiries

Each inquiry must be stored securely and routed to the appropriate internal team.

Implement:
- Server-side form validation
- Spam protection
- Consent handling where required
- Submission confirmation
- Error handling
- Internal lead notifications

Do not use fabricated case studies or misleading SEO claims.

**Deliverables:** Search-ready website and working lead capture.

**Completion gate:** Verify metadata, sitemap, forms, and submission handling.

---

# PHASE 4 — BACKEND, DATABASE AND IDENTITY

## STEP 9 — Supabase and Database Foundation

**Assignment:** Establish the production database foundation.

Configure Supabase for local development, staging, and production.

Implement:
- Supabase client configuration
- Server-side Supabase client
- Browser client where appropriate
- Environment validation
- Database migrations
- Database type generation
- Seed data for development only
- Storage bucket planning
- Connection and error handling

Design the initial database schema for:

- Users
- Profiles
- Organizations
- Organization memberships
- Roles
- Permissions
- Contributor profiles
- Skills
- Assessments
- Projects
- Project members
- Tasks
- Task assignments
- Submissions
- Reviews
- Earnings
- Payment records
- Invoices
- Notifications
- Messages
- Support tickets
- Files
- Audit events

Use UUID identifiers where appropriate.

Define foreign keys, constraints, indexes, timestamps, and appropriate deletion behavior.

Do not store sensitive payment credentials or unnecessary personal information.

Use SQL migrations as the authoritative source of schema changes.

**Deliverables:** Version-controlled schema and documented data model.

**Completion gate:** Database can be recreated from migrations and all schema tests pass.

---

## STEP 10 — Authentication and Account Lifecycle

**Assignment:** Implement secure authentication using Supabase Auth.

Support:
- Email and password
- Email verification
- Password reset
- Secure session handling
- Logout
- Session refresh
- Protected routes
- Account status checks

Prepare for optional future:
- Google sign-in
- GitHub sign-in
- Enterprise SSO

Build account flows for:
- Contributor registration
- Client registration
- Internal employee invitations

Do not allow public self-registration as an administrator or employee.

Implement account states:
- Pending verification
- Active
- Suspended
- Deactivated

Ensure sensitive account operations happen on the server.

**Deliverables:** Working authentication and account lifecycle.

**Completion gate:** Test registration, login, logout, verification, password recovery, and protected route access.

---

## STEP 11 — Role-Based Access Control and Multi-Tenant Security

**Assignment:** Implement production-grade authorization.

The platform must support multiple client organizations without exposing one organization's data to another.

Implement:
- Role-based access control
- Organization membership
- Organization-level permissions
- Project-level permissions where needed
- Server-side authorization policies
- PostgreSQL Row Level Security
- Secure administrative actions
- Audit logging for sensitive actions

Roles:
- Contributor
- Client Owner
- Client Member
- Project Manager
- Reviewer
- Talent Operations
- Finance Operations
- Engineer
- Administrator
- Super Administrator

Every protected operation must verify the user's identity, role, organization membership, and resource-level access as appropriate.

Test:
- Cross-organization data access
- Contributor access to another contributor's data
- Client access to internal notes
- Reviewer access to unauthorized tasks
- Employee access to restricted financial records
- Privilege escalation attempts

Do not treat hidden frontend navigation as security.

**Deliverables:** Tested authorization and RLS policies.

**Completion gate:** Negative security tests must prove that unauthorized access is denied.

---

# PHASE 5 — CONTRIBUTOR AND AI DATA PLATFORM

## STEP 12 — Contributor Onboarding and Talent Profiles

**Assignment:** Build the contributor onboarding system.

Implement:
- Registration
- Profile setup
- Skills and expertise
- Education
- Work experience
- Languages
- Portfolio links
- Availability
- Country and time zone
- Relevant professional background
- Document uploads where appropriate
- Profile completeness tracking

Support expertise categories such as:
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

Create internal application review workflows.

Contributor states:
- Registered
- Profile Incomplete
- Pending Assessment
- Under Review
- Qualified
- Rejected
- Suspended

Do not promise that registration guarantees work.

Protect personal information and limit employee access based on role.

**Deliverables:** Complete contributor onboarding and internal profile review.

**Completion gate:** A new contributor can register, complete a profile, and enter the assessment process.

---

## STEP 13 — Assessment and Qualification Engine

**Assignment:** Build a reusable expert assessment system.

Support:
- Multiple-choice assessments
- Written assessments
- Coding assessments
- Mathematics problems
- Scientific reasoning
- Domain-specific questions
- File-based submissions

Implement:
- Assessment creation
- Question management
- Assessment versions
- Time limits where needed
- Eligibility requirements
- Attempt limits
- Submission
- Automatic scoring for supported question types
- Manual expert review
- Assessment results
- Qualification status

Store assessment versions and attempts so results remain auditable.

Do not expose correct answers or private scoring criteria to users before permitted.

Design the system so different contributor categories can have different qualification requirements.

**Deliverables:** Reusable assessment engine and qualification workflow.

**Completion gate:** Complete an end-to-end assessment with both automatic and manual review paths.

---

## STEP 14 — Project Marketplace and Contributor Matching

**Assignment:** Build the contributor project opportunity system.

Implement:
- Project discovery
- Eligibility rules
- Required skills
- Qualification requirements
- Country and language restrictions where legally appropriate
- Availability requirements
- Invitations
- Applications
- Acceptance and rejection
- Assignment capacity
- Project visibility rules

Create a matching service that evaluates:
- Skills
- Assessment results
- Quality history
- Availability
- Language
- Relevant experience
- Project-specific eligibility

Start with transparent rule-based matching.

Do not introduce opaque AI-based ranking until there is sufficient data and an evaluation process.

Prevent:
- Duplicate applications
- Duplicate assignments
- Ineligible contributors accepting work
- Assignments beyond project capacity

**Deliverables:** Working project marketplace and matching rules.

**Completion gate:** Qualified contributors can discover and accept eligible opportunities without duplicate assignments.

---

## STEP 15 — Task Management and Submission Engine

**Assignment:** Build the core AI data task execution platform.

Support task formats including:

1. Text annotation
2. Data classification
3. Prompt creation
4. LLM response evaluation
5. Response ranking
6. Preference comparisons
7. Coding tasks
8. Mathematics problems
9. Scientific reasoning
10. Structured data extraction
11. Image annotation
12. Audio annotation
13. Video annotation

Implement:
- Task templates
- Project-specific task configuration
- Task instructions
- Task assignment
- Task expiration
- Task locking
- Draft saving
- Submission
- Version history
- Submission status
- Revision requests
- Submission audit trail

Use reusable task renderers based on task type.

Design task payloads with versioned schemas.

Prevent two contributors from unintentionally submitting the same exclusive assignment.

**Deliverables:** Working task workspace and submission lifecycle.

**Completion gate:** A contributor can complete, save, submit, and track an assigned task.

---

## STEP 16 — Quality Assurance and Human Review

**Assignment:** Build a professional review and quality-control system.

Implement review states:
- Submitted
- Queued for Review
- Under Review
- Approved
- Revision Required
- Rejected
- Disputed

Features:
- Reviewer assignment
- Review queues
- Review criteria
- Rubrics
- Quality scores
- Reviewer comments
- Revision history
- Escalation
- Dispute handling
- Reviewer performance metrics

Support multiple review layers for high-value or high-risk work.

Create configurable project quality thresholds.

Measure:
- Accuracy
- Agreement
- Completion rate
- Rework rate
- Review turnaround
- Reviewer consistency

Prevent contributors from reviewing their own submissions unless a specifically authorized workflow permits it.

Do not approve earnings before the associated work passes the required approval policy.

**Deliverables:** Complete review and quality-control workflow.

**Completion gate:** Test approval, rejection, revision, escalation, and dispute flows.

---

# PHASE 6 — ENTERPRISE CLIENT AND PROJECT DELIVERY

## STEP 17 — Enterprise Client Portal

**Assignment:** Build the enterprise customer workspace.

Implement:
- Organization registration
- Organization profile
- Team invitations
- Member roles
- Project inquiry
- Service selection
- Requirements collection
- Document uploads
- Consultation requests
- Inquiry tracking

Client service categories:
- Data annotation
- Human feedback
- Model evaluation
- AI training data
- AI consulting
- LLM applications
- RAG systems
- AI agents
- Workflow automation
- Data engineering
- Custom AI development

Client dashboard:
- Active projects
- Pending proposals
- Milestones
- Deliverables
- Approvals
- Messages
- Invoices
- Support requests

Clients must only see their own organization's information.

**Deliverables:** Functional enterprise client portal.

**Completion gate:** A client can submit an inquiry, invite a colleague, and view authorized project information.

---

## STEP 18 — Enterprise Project Management and Delivery Operations

**Assignment:** Build the internal project delivery management system.

Support project types:
- AI data operations
- Model evaluation
- AI consulting
- AI application development
- Agent deployment
- Integration projects

Implement:
- Project creation
- Project scope
- Objectives
- Requirements
- Project owners
- Project managers
- Team assignments
- Milestones
- Tasks
- Dependencies
- Status tracking
- Time tracking where appropriate
- Risk tracking
- Deliverables
- Client approvals
- Project history

Create a workflow for:
- New inquiry
- Qualification
- Technical discovery
- Estimation
- Proposal
- Contract
- Project kickoff
- Execution
- Quality review
- Client approval
- Delivery
- Support

Separate internal project notes from client-visible updates.

**Deliverables:** Enterprise project management workspace.

**Completion gate:** An internal project manager can manage a project from creation through delivery.

---

# PHASE 7 — AI INFRASTRUCTURE AND AUTOMATION

## STEP 19 — AI Provider Integration and Model Gateway

**Assignment:** Build a provider-independent AI integration layer.

Support a modular architecture for:
- OpenAI
- Anthropic
- Google Gemini
- Compatible open-source model endpoints

Implement:
- Provider adapters
- Model configuration
- Server-side API key management
- Request validation
- Token usage tracking
- Cost tracking
- Timeout handling
- Retry policies
- Rate limits
- Error handling
- Request metadata
- Provider-specific capabilities

Use a shared internal interface so business modules do not depend directly on one provider's SDK.

Create AI capabilities for:
- Text generation
- Structured output
- Classification
- Embeddings
- Evaluation
- Summarization
- Scoring

Add human review where required.

Do not send private customer data to an external provider without appropriate authorization and configured data-handling policies.

**Deliverables:** Secure, provider-independent AI service layer.

**Completion gate:** Test at least one provider end to end and verify that credentials remain server-side.

---

## STEP 20 — AI Evaluation, Dataset and Training Workflows

**Assignment:** Build the first version of the AI data operations pipeline.

Implement data workflow concepts:

- Dataset
- Dataset version
- Data source
- Data record
- Annotation schema
- Annotation job
- Annotation result
- Expert feedback
- Preference pair
- Evaluation run
- Evaluation criteria
- Benchmark
- Quality report

Support workflows such as:

1. Import approved source data.
2. Validate and normalize records.
3. Create an annotation or evaluation project.
4. Assign qualified contributors.
5. Collect human responses.
6. Review and resolve disagreements.
7. Aggregate results.
8. Export approved datasets.
9. Track dataset versions and provenance.

Implement dataset quality checks:
- Missing values
- Duplicate records
- Invalid formats
- Schema violations
- Inconsistent labels
- Reviewer disagreement

Separate raw data, processed data, and approved output.

Do not claim that this platform trains foundation models automatically. Initially, it prepares and evaluates data and supports integrations with existing training systems.

**Deliverables:** Initial dataset and human evaluation pipeline.

**Completion gate:** Complete one small dataset workflow from ingestion to reviewed export.

---

## STEP 21 — Background Jobs, Notifications and Workflow Automation

**Assignment:** Implement reliable asynchronous processing.

Use Inngest for workflows that require retries, scheduling, waiting, or multiple dependent operations.

Examples:
- Assessment grading
- Task assignment
- Submission review notifications
- Project milestone notifications
- Scheduled reminders
- Dataset processing
- AI evaluation
- Client updates
- Email delivery
- Payment reconciliation

Implement:
- Event definitions
- Typed payloads
- Durable workflow steps
- Retry policies
- Idempotency
- Concurrency limits
- Failure handling
- Dead-letter or manual recovery strategy
- Execution logging

Use Resend for transactional email.

Use in-app notifications for important user actions.

Make sure failed email delivery does not incorrectly mark a project or payment operation as failed.

**Deliverables:** Observable background workflow system.

**Completion gate:** Demonstrate successful retry and recovery after a simulated workflow failure.

---

# PHASE 8 — FINANCIAL OPERATIONS, SECURITY AND REPORTING

## STEP 22 — Billing, Earnings and Financial Ledger

**Assignment:** Build the financial foundation.

Implement separate financial flows for clients and contributors.

Client side:
- Quotes
- Proposals
- Invoices
- Payment status
- Payment history
- Refund records where applicable

Contributor side:
- Pending earnings
- Approved earnings
- Payable balances
- Payment batches
- Payment history

Implement an internal financial ledger with immutable transaction records and auditable adjustments.

Use Stripe for client payments.

Prepare a separate Stripe Connect integration for contributor payouts, subject to legal and operational requirements.

Requirements:
- Webhook signature verification
- Idempotency
- Duplicate event prevention
- Payment state transitions
- Reconciliation
- Failed payment handling
- Refund handling
- Currency handling
- Access restrictions

Never mark work as paid merely because a client invoice was created.

Separate:
- Work approval
- Earnings calculation
- Earnings approval
- Payout initiation
- Payout confirmation

Do not store card numbers or sensitive banking credentials.

**Deliverables:** Auditable billing and earnings foundation.

**Completion gate:** Test payment state transitions and duplicate webhook events using test mode.

---

## STEP 23 — File Management, Privacy and Security Hardening

**Assignment:** Strengthen platform security and data governance.

Implement:
- Secure file uploads
- File type validation
- File size restrictions
- Signed download URLs
- Storage permissions
- Malware scanning integration strategy
- Access logging
- Data retention policies
- Account deletion workflow
- Data export workflow
- Sensitive data classification

Review:
- Authentication
- Authorization
- RLS
- API endpoints
- Input validation
- XSS
- CSRF where applicable
- SQL injection risks
- Rate limiting
- Secret management
- File access
- Webhook security
- Audit logs
- Dependency vulnerabilities

Prepare documentation for:
- Privacy practices
- Data processing
- Customer data separation
- Contributor agreements
- Confidentiality requirements
- Incident response
- Backup and recovery

Do not claim SOC 2, HIPAA, ISO 27001, or other certifications without completed independent verification.

**Deliverables:** Security assessment and remediation report.

**Completion gate:** Critical and high-severity security findings must be resolved or explicitly blocked from production.

---

## STEP 24 — Internal Analytics and Operational Intelligence

**Assignment:** Build operational dashboards for management.

Create dashboards for:

**Contributor operations**
- Applications
- Qualification rates
- Active contributors
- Task completion
- Contributor retention

**Project operations**
- Active projects
- Project status
- Completion rates
- Delayed milestones
- Review queues

**Quality**
- Approval rate
- Rejection rate
- Revision rate
- Reviewer agreement
- Quality trends

**Enterprise**
- New inquiries
- Qualified leads
- Proposals
- Active clients
- Project delivery status

**Financial**
- Invoiced revenue
- Collected revenue
- Approved contributor earnings
- Outstanding liabilities
- Payment status

Use PostHog for product analytics and Sentry for errors.

Ensure analytics do not expose sensitive customer data or unnecessary contributor personal information.

Implement role-based access to reports.

**Deliverables:** Operational dashboards and documented metrics.

**Completion gate:** Metrics must be traceable to real underlying records, not hardcoded demo values.

---

# PHASE 9 — TESTING, DEPLOYMENT AND LAUNCH

## STEP 25 — Comprehensive Testing and Production Readiness

**Assignment:** Conduct a complete production readiness assessment.

Create and execute tests for:

- Public website
- Authentication
- Contributor onboarding
- Assessments
- Project marketplace
- Task assignments
- Task submissions
- QA review
- Client registration
- Organization permissions
- Project management
- AI provider integration
- Dataset workflows
- Notifications
- Billing
- File access
- Admin operations

Use:
- Vitest for unit and integration tests
- Playwright for end-to-end browser tests
- Database policy tests for RLS and tenant isolation

Test:
- Happy paths
- Invalid input
- Missing permissions
- Expired sessions
- Duplicate submissions
- Duplicate webhooks
- Failed background jobs
- Network failures
- Concurrent updates
- Unauthorized file downloads

Measure:
- Build reliability
- Application performance
- API latency
- Database query performance
- Accessibility
- Error rates

Create:
- `docs/TEST_STRATEGY.md`
- `docs/PRODUCTION_READINESS.md`
- `docs/KNOWN_ISSUES.md`

Do not declare production readiness if critical tests have not been executed.

**Deliverables:** Test results and prioritized remediation list.

**Completion gate:** No unresolved critical security or data-integrity issues.

---

## STEP 26 — Deployment, CI/CD and Production Launch

**Assignment:** Prepare Americantriangle for a controlled production launch.

Configure:

- GitHub repository
- Development environment
- Staging environment
- Production environment
- Vercel deployment
- Supabase production project
- Environment variable separation
- GitHub Actions CI
- Automated test execution
- Database migration process
- Error monitoring
- Analytics
- Domain and DNS configuration
- SSL
- Backup and restore strategy

Use separate credentials and databases for development, staging, and production.

Establish a deployment process:
1. Create feature branch.
2. Implement changes.
3. Run tests.
4. Open pull request.
5. Review changes.
6. Apply approved migrations.
7. Deploy to staging.
8. Perform smoke tests.
9. Approve production release.
10. Monitor after deployment.

Do not automatically run destructive production database migrations.

Prepare a launch checklist covering:
- Legal pages
- Privacy policy
- Terms of service
- Customer contracts
- Contributor agreements
- Support process
- Billing configuration
- Email domain authentication
- Security review
- Backups
- Incident contacts

**Deliverables:** Production deployment and launch documentation.

**Completion gate:** A verified staging release and a controlled production launch plan.