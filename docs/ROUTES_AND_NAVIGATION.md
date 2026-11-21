# Routes and navigation

Route groups keep URLs clean. `(public)`, `(auth)`, and `(workspace)` are folders, not URL segments.

## Public

| Path | Page |
| --- | --- |
| `/` | Home |
| `/services/data` | AI Data Infrastructure |
| `/services/data/annotation` | Annotation and collection |
| `/services/data/feedback` | Human feedback |
| `/services/data/evaluation` | Model evaluation, linked from the intelligence division |
| `/services/intelligence` | AI Model Training, Research & Evaluation |
| `/services/engineering` | Enterprise AI Applications |
| `/services/engineering/applications` | Applications |
| `/services/engineering/agents` | Agents and automation |
| `/platform` | Platform |
| `/technology` | Technology. Capabilities and the repository stack. Not a partner or certification list |
| `/industries` | Industry solutions. Six industries, with links to each detail page |
| `/industries/[slug]` | Healthcare, financial services, software, education, manufacturing, or retail |
| `/about` | About |
| `/insights` | Insights. Published articles only. The catalog is empty until a real article is published |
| `/insights/category/[category]` | One of the eight insight categories |
| `/insights/[slug]` | One published article. Drafts are not routed |
| `/insights/search` | Search over published articles |
| `/resources` | Method notes |
| `/resources/[slug]` | One method note |
| `/contributors/join` | Become a Contributor |
| `/partners` | Partnership proposals. Not a partner directory |
| `/contact` | Contact |
| `/consultation` | Request a Consultation. `?type=` selects a known inquiry type |
| `/trust` | Trust. Product controls, with implemented, declared, and absent marked separately |
| `/quality` | Quality. First-release review, practices set per project, and later work |
| `/privacy` | Privacy. Product handling, with counsel items marked separately |
| `/terms` | Terms. Not a contract until counsel issues one |
| `/cookies` | Browser storage. Theme preference and sign-in session. No tracking banner |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |

The header is sticky. Services opens a panel with the three divisions: data infrastructure, model intelligence, and enterprise applications. Company opens its own panel. Sign in and consultation stay visible on desktop. The footer repeats those divisions, company pages, privacy, terms, and cookies. There is no case-study route. Article search is `/insights/search` and reads published records only.

## Authentication

| Path | Page |
| --- | --- |
| `/login` | Sign in |
| `/register` | Create a contributor or client account |
| `/forgot-password` | Send a reset email |
| `/auth/callback` | Exchange the email link for a session |
| `/unauthorized` | Signed in, not allowed |
| `/account-recovery` | Reset outcome |

There is no public page that creates an administrator.

## Contributor workspace

Navigation: Overview, Profile, Assessments, Projects, Earnings.

| Path | Purpose |
| --- | --- |
| `/contributor` | Qualification and assignment summary |
| `/contributor/profile` | Profile form |
| `/contributor/assessments` | Available exams |
| `/contributor/assessments/[assessmentId]` | Take an exam |
| `/contributor/projects` | Eligible openings |
| `/contributor/tasks/[assignmentId]` | Draft and submit |
| `/contributor/earnings` | Own earnings only |

## Client workspace

Navigation: Overview, New inquiry, Projects, Team, Messages, Invoices, Support.

| Path | Purpose |
| --- | --- |
| `/client` | Organization summary |
| `/client/inquiries/new` | Service inquiry |
| `/client/projects` | Projects and approvals |
| `/client/projects/[projectId]` | Milestones and client updates |
| `/client/team` | Invitations |
| `/client/messages` | Organization messages |
| `/client/invoices` | Owner billing view |
| `/client/support` | Support tickets |

## Internal operations

Navigation: Overview, Inquiries, Talent, Review, Projects, Finance, Analytics, Admin.

| Path | Purpose |
| --- | --- |
| `/internal` | Operations home |
| `/internal/inquiries` | Stored contact and partnership proposals. Project managers and administrators |
| `/internal/talent` | Application review |
| `/internal/review` | Quality queue |
| `/internal/projects` | Delivery list |
| `/internal/projects/[projectId]` | Scope, notes, milestones |
| `/internal/finance` | Invoices, earnings, payouts |
| `/internal/analytics` | Metrics from stored rows |
| `/internal/admin` | Account status and audit |

## Protection

Middleware sends anonymous users from `/contributor`, `/client`, and `/internal` to `/login` when Supabase Auth is configured. When it is not configured, those layouts render a configuration message and no records. Server actions still call `authorize` before any write.

## Session behavior

Sign-out posts to a server action that clears Supabase cookies. Middleware refreshes the session on each workspace request. A suspended profile that still has a session receives `/unauthorized` from the workspace layout.

## Not found and errors

`not-found.tsx` covers unknown URLs. `error.tsx` and `global-error.tsx` cover render failures and can show a digest. They do not show a stack trace. `GET /api/health` returns `{ "status": "ok" }`. Loading files show a skeleton on the workspaces.
