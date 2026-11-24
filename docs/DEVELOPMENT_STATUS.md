# Americantriangle — Development Status

Status date: 2026-11-20. Steps 0–26 have a first implementation in the working tree. **Production is not launched.** Nothing has been committed in this pass.

Primary reference: [MASTER_DEVELOPMENT_ROADMAP.md](MASTER_DEVELOPMENT_ROADMAP.md).

## What is in the repository

- Requirements, architecture, journeys, permissions, and brand docs.
- A Next.js App Router application in TypeScript strict mode, with Tailwind tokens and shared UI.
- Public pages for both divisions, platform, industries, about, contributors, contact, consultation, privacy, and terms.
- Lead capture with server validation, a honeypot, consent, and per-process rate limiting.
- Supabase migrations for the domain model, row level security, private storage buckets, and a development-only seed.
- Auth actions for email password sign-up, sign-in, reset, and sign-out. Staff cannot be created by the public form.
- Workspaces for contributors, clients, and internal operations. They render empty states instead of fake records.
- Domain services and Vitest coverage for authorization, matching, tasks, review, earnings, webhooks, datasets, assessments, files, and metrics.
- Inngest function definitions and a Stripe webhook route that checks signatures and stores event ids.
- A model gateway that refuses calls without a server key and a data-handling approval.
- CI workflow, deployment notes, a launch checklist, a security review, and a production-readiness statement.

## Decisions

- The approved modular monolith and stack stayed in place.
- The first release boundary from the PRD still describes what the UI claims it can deliver. Image, audio, and video formats exist in the model without annotation canvases.
- Stripe Connect does not send payouts.
- Privacy, terms, and cookies pages describe the software and mark the text counsel still has to issue. No cookie banner is shown, because no analytics or advertising script is installed. Forms state what they store. The signed-in client inquiry checks requirements and attachments and does not save them.
- Sentry and PostHog are named in [DEPLOYMENT.md](DEPLOYMENT.md) and are not installed until a DSN or key exists.
- The README headline was not replaced. Metadata still uses “Building Reliable AI. Powered by Human Expertise.” The public site uses a shared marketing shell: night bands, catalog pages, method notes, and no invented customer proof.
- Design foundation: tokens for type, space, shadow, and motion live in `src/styles/globals.css`. Marketing cards, breadcrumbs, and navigation links share that system. The testimonial list is empty because no approved quote exists.
- The public site describes three complementary divisions: AI Data Infrastructure, AI Model Training, Research & Evaluation, and Enterprise AI Applications. A customer can use one or combine them. Model evaluation is a current service. Training, research, benchmarking automation, and red-team review are labeled Later because the product does not run a foundation-model training platform. The product requirements still record the earlier two-division service catalogs.
- The homepage section “One Ecosystem. Three Connected Capabilities.” shows the three divisions around the mark and describes optional feedback among them. It is not a required sequence. Training remains a scoped engagement.
- Each division overview states capabilities, the problems the work is for, illustrative use cases, the implementation approach, the existing catalog, and an inquiry. Use cases are labeled as demonstrations. Training, automated benchmarking, and red-team review remain Later.
- The About page states the company introduction, mission, vision, three pillars, and why those capabilities can belong together. The mission and vision describe intent. They are not a customer list or a results record. Training remains a scoped engagement.
- Industry solutions extend `/industries` and add a page for healthcare, financial services, software, education, manufacturing, and retail. Each industry page states use cases as a challenge, an approach, the capability, the operational record, and the division. They are potential applications. Training, image annotation, and automated benchmarks stay Later. No customers, certifications, or results are claimed.
- The Trust page at `/trust` describes controls that are in the software, controls declared in migrations and not applied to a hosted database, and controls that are absent. It does not claim a certification, a penetration test, backups, or installed error monitoring.
- Privacy, terms, and cookies pages are linked from the footer and from the forms that collect account, inquiry, or organization data. They are product descriptions. Counsel has not issued a privacy policy, terms of service, cookie policy, company address, or data-processing agreement.
- The public contact and consultation form collects the enterprise inquiry fields, validates them on the server, keeps the honeypot and per-process rate limit, and confirms only after the row is stored. Email is sent only when Resend is configured. Migration `0003_lead_details.sql` adds the extra columns and has not been applied to a hosted database. Older consultation links still select the matching area.
- The Quality page at `/quality` separates first-release review records from practices a project must define and from later work such as automated benchmarks, red-team review, and installed monitoring. It states no acceptance rate or certification.
- The Partnerships page at `/partners` collects a collaboration proposal in the existing inquiry store. It is not a partner directory and it does not claim an endorsement. Migration `0004_partnership_inquiries.sql` adds the website, category, and capabilities columns and has not been applied to a hosted database. Stored inquiries can be read at `/internal/inquiries` by an active project manager, administrator, or super administrator.
- Inquiry management is planned in [INQUIRY_MANAGEMENT.md](INQUIRY_MANAGEMENT.md). Supabase is not connected, so the plan does not add a second inquiry table, sample counts, or a management screen. The current staff page reads `public.leads` and shows that the store is not configured.
- Insights at `/insights` is the editorial list. There is no CMS and no article table. The catalog in `src/content/insights.ts` is empty. A record can move through draft, review, approved, published, and archived, and the public pages render a complete published record only. No author, date, or article has been invented. Method notes remain at `/resources`.
- The public visual system uses the tokens in `src/styles/globals.css`: one type scale, a 65-character measure, shared `.surface` cards, and accent reserved for buttons. Night bands keep a fixed light text color. No new UI library was added. Routes and the two homepage diagrams stayed in place.
- Interaction motion stays in `src/styles/globals.css`. Menus, the mobile dialog, and the FAQ disclosure move over 180ms. Scroll reveals shift 0.4rem and do not hide the content. Reduced motion removes those transitions and the loading pulse. No animation library was added.
- Responsive layout uses the existing `sm` (40rem), `md` (48rem), and `lg` (64rem) breakpoints. Phone pages stack. Tablet keeps two-column cards and a horizontal workspace nav. Four-column steps and side-by-side text start at `lg`. The workflow graphic is hidden below `lg` because its labels were shrinking below a readable size. The platform isolation graphic is text in three rooms. Inquiry rows stack below `md` and stay in a scrolling table from `md` up. Form controls use 16px type. No new breakpoint scale was added.
- Public loading was measured on a local production server in Chrome. Lighthouse was not installed, and these are not field numbers. The About photograph was a portrait file shown in a 3:2 frame, so the optimizer encoded pixels the page never displayed. The source is now 3:2. Image widths stop at 1920 because the files are 1920 pixels wide. Both editorial images stay lazy inside a reserved frame. The site footer is a server component. Fonts remain the two self-hosted files. No third-party script was added, and no private page is cached. On that run, the About transfer fell from 364 KB to 321 KB and the research image from 83 KB to 38 KB. Homepage, industries, and contact stayed within about 5 KB. Largest Contentful Paint and layout shift were already low.
- Accessibility fixes stay inside the existing visual system. The skip link becomes a visible paper chip when focused. Workspace pages have a main landmark. Form controls and secondary buttons use a border that clears 3:1, and the accent button's pressed color keeps its text above 4.5:1. Focus on the night header uses the light band color. A correction moves focus to the first field and is written next to that field. The theme button exposes light or dark. Reduced motion was already in place. No certification is claimed.
- A read-only security pass on 2026-11-20 did not find a service-role key in the browser bundle. Production is still not ready: migrations and row level security have not been applied, and legal text is unset. Application fixes in this pass reject an off-site sign-in redirect, return 500 from the Stripe webhook when the event or ledger write fails, count an inquiry toward the rate limit only after it is stored, and check account kind and active status on the three workspace layouts when Supabase is configured. Password recovery still does not collect a new password. No certification is claimed.
- Operational failures write a JSON line to the server log with an event, a code, and an error id. The line omits passwords, tokens, email addresses, and message text. Error pages can show a digest and do not show a stack trace. `GET /api/health` returns liveness only. The operations overview shows whether required environment values are present, and error monitoring stays uninstalled. No Sentry package, credential, or schema change was added.
- Operations keeps the same routes and the same server authorization. The overview links each queue. Inquiry search filters stored rows only. A deletion request requires an explicit confirmation on the server. Analytics no longer prints a zero when no rows were loaded. No sample records and no schema change were added.
- The homepage keeps one diagram for how the divisions can inform each other. A note between divisions is a later inquiry. Training and research stay scoped engagements. No new page or dependency was added.
- Light-mode layout rules apply again. The dark theme block in `src/styles/globals.css` now closes before the rest of the stylesheet, and it sets the brand dark canvas and card. The inquiry honeypot is clipped. No new page or dependency was added.
- The public header stays light. The homepage hero autoplays a 20-second data-center clip, then a 12-second engineering meeting at their computers, and repeats. White type, a still poster, and a visible credit stay in place. Neither video is an Americantriangle team, facility, or client. Reduced motion keeps the still.
- Interior pages open on the light canvas, with the same navy type and a cyan label. Shared cards, catalog rows, and closing invitations use a rounder corner and a softer shadow. The homepage hero is unchanged.
- Public sections fade and rise once as they enter the viewport. Content already on screen stays put, and scrolling back does not replay the entrance. The homepage hero, forms, and the capability diagram stay still. Reduced motion shows every section immediately.
- The public header and its menus use the theme canvas and card colors. Light stays a frosted white bar. Dark stays a frosted navy bar, so the wordmark and links remain readable.
- Sign-in, sign-up, workspaces, and Supabase are removed from this application. Public forms send email through Resend. There is no account and no inquiry database.
- The homepage hero is left-aligned, with one primary action and the service links in a bar under it. Service rows move an arrow on hover. Quality copy describes a person, a second reader, and a named result. No customer proof was added.
- Public SEO uses https://americantriangle.com for canonical URLs, the sitemap, and robots.txt. www requests that reach this app redirect to the bare host. Organization and WebSite structured data are on public pages. Service and breadcrumb structured data follow the existing pages. No address, phone number, rating, or award was added.
- The Company menu in the header and the footer keeps About, Enterprise solutions, Industries, Trust, and Contact, plus Privacy, Terms, and Cookies in the footer. Platform, Technology, Quality, Insights, Resources, Contributors, and Partnerships stay as pages and are no longer listed there.
- The About page no longer shows the health-research photograph or its credit. The image file remains in the repository.
- The Industries page no longer shows the laboratory-bench photograph or its credit. The image file remains in the repository.
- The header, About page, and capability diagram use `public/images/logo2.png`. The file is transparent. Dark theme does not add a plate behind it. The site starts in the light theme unless the visitor has saved dark.
- The browser icon uses the triangle files in `public/favicon_io`. The generated letter A is gone.
- The homepage notes section lists the three method notes, and a short set of starting questions sits above the closing invitations. Insights still publishes nothing until an article is approved. No outside client, quote, award, or certification was added.
- Public brand line is “Talent. Technology. Opportunity.” The homepage headline stays “The human layer behind reliable AI.” About explains the principles and the three divisions as two readings of the triangle. Each division overview says how talent, technology, and the client’s requirement show up in that work. Open Graph and the footer use the same line. Evaluation remains a current service. Training, research, and safety review remain scoped.
- The public footer is a single dark bar: the copyright, Privacy, Terms, and Cookies, and a Back to top control. Service and company links stay in the header. No certification badge is shown.
- Careers lives at `/careers` and in the Company menu. It separates expert qualification from staff openings. No staff role, quote, award, office, or benefit is listed.
- The public header links are About us, Industries, Careers, and Contact us. The division menus remain on the service pages.
- Customers, partners, and experts can submit the public forms without an account. `/contributors` is no longer treated as the signed-in contributor workspace. Expert applications are inquiries. Missing optional fields are sent as empty text. If the inquiry store is unavailable or rejects the row, the form still sends the confirmation and the team copy when email is configured. Email uses `RESEND_API_KEY`, `EMAIL_FROM`, and optional `LEAD_NOTIFY_EMAIL`. Migration `0005_expert_applications.sql` has not been applied.
- The homepage keeps its headline, diagrams, and section structure. The first screen now states the three kinds of work and leads an organization to a consultation or enterprise solutions. The expert application stays available as a text link and in the closing card. Hero services link to current work. Industries sit with the service list and point at use cases. Insights are linked without invented articles.
- Technology lives at `/technology`. The page lists capabilities and the tools named in the repository or in the stack document. Model providers are adapter names, not partnerships. Sentry and PostHog stay named and not installed. No certification or team-experience claim is added.
- Enterprise solutions live at `/solutions`. The page organizes a requirement across the three existing divisions and links to the service catalogs, industry pages, and the consultation form. It does not add a second catalog, a customer list, or a measured result. Industry pages remain the domain view.
- Public labels use one pair of names. The full names are AI Data Infrastructure, AI Model Training, Research & Evaluation, and Enterprise AI Applications. Navigation, breadcrumbs, and short references use Data infrastructure, Model intelligence, and Enterprise applications. Model evaluation stays at `/services/data/evaluation` and its breadcrumb parent is the intelligence division.
- No git commit or push was made.

## Roadmap position

| Steps | State |
| --- | --- |
| 0–1 | Complete as documents. The PRD is still a draft for any product-boundary change |
| 2–8 | Documents and a running public application foundation |
| 9–22 | Schema, auth code, domain rules, jobs, and billing code. Live vendors are not connected |
| 23 | Security review written. High findings block production |
| 24 | Analytics page computes rates from counts. With no database it shows dashes |
| 25 | Unit tests and a Playwright spec exist. Live RLS and payment tests were not run |
| 26 | CI and launch docs exist. Vercel, Supabase, DNS, and production were not provisioned |

## Remaining risks

See [KNOWN_ISSUES.md](KNOWN_ISSUES.md) and [PRODUCTION_READINESS.md](PRODUCTION_READINESS.md). The blocking items are an unapplied database, placeholder legal text, and untested hosted integrations.

## Verification

- `npm test`: 81 tests passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build` (`next build --webpack`): passed, 79 pages, including `GET /api/health`. The Turbopack build crashed in this environment, so the script uses webpack.
- Browser check of the running dev server: homepage mobile menu opens, industries shows the laboratory photograph, resources lists the three notes. Desktop dropdowns were not exercised because the tool viewport stayed under 400px. Playwright was not run. Hosted Supabase and Stripe were not executed.
