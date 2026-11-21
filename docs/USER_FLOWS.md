# User flows

Routes are listed in [ROUTES_AND_NAVIGATION.md](ROUTES_AND_NAVIGATION.md). Permissions are listed in [PERMISSION_MATRIX.md](PERMISSION_MATRIX.md).

## Anonymous visitor

1. Opens the public site and moves through Home, the two divisions, Platform, Industries, About, Become a Contributor, Contact, and Request a Consultation.
2. Submits a lead form. The server validates it. A honeypot must stay empty. The visitor sees confirmation, field errors, or a clear message when the database is not configured.
3. Opens Privacy and Terms. Those pages describe product behavior and state that counsel has not issued binding legal text.
4. Follows Register or Sign in.

## Authentication

1. Contributor or client registers with email and password. The account is `pending_verification` until the email link is confirmed.
2. The user can request a password reset and set a new password.
3. Sign-out clears the session. Expired sessions are refreshed by middleware when Supabase is configured. A missing session on a workspace URL redirects to sign in.
4. Google, GitHub, and enterprise SSO are not offered. The auth module has a single password provider so a later provider can be added beside it.
5. Staff accounts are not created by the public form. An administrator invites them.

## Contributor

1. After verification, the contributor completes profile, skills, education, experience, languages, links, availability, country, and time zone.
2. Completeness moves the qualification state from `profile_incomplete` toward `pending_assessment`.
3. The contributor starts an eligible assessment. Objective items can be scored immediately. Written and coding items wait for talent review. Answer keys are not in the page payload.
4. Talent operations sets `qualified` or `rejected`.
5. A qualified contributor sees openings whose rules they pass, applies once, or accepts one invitation.
6. An exclusive assignment can be drafted and submitted by that contributor only.
7. The contributor sees review state, revision requests, and their own earnings states.

## Reviewer and talent

1. Talent operations opens the application queue and records a qualification decision.
2. A reviewer opens a queue item they did not author, scores it, and sets a review state.
3. Revision returns the task to the contributor and keeps the old version.
4. Dispute and escalation are visible to a reviewer or project manager who is not the author.

## Client organization

1. A client registers and creates an organization. That user is the owner.
2. The owner invites a member. The invite can be accepted once.
3. Owner or member submits an inquiry in a known service category and can attach a file that passes type and size checks.
4. They see projects, proposals, milestones, deliverables, messages, and support for their organization.
5. The owner sees invoices. A member does not, unless a later permission grant says so.
6. An approval button on a deliverable records a client approval. Internal notes never appear on these pages.

## Project manager, engineer, finance, admin

1. A project manager creates a project and moves it along: new inquiry, qualification, discovery, estimation, proposal, contract, kickoff, execution, quality review, client approval, delivery, support.
2. The manager writes internal notes and, separately, client-visible updates.
3. An engineer sees assigned delivery projects and can call the model gateway only through the server.
4. Finance issues an invoice, reconciles a Stripe event, approves earnings after the review policy passes, and records payout initiation and confirmation as separate steps.
5. An administrator can suspend an account. A super administrator can read across organizations. Both actions write an audit event.
6. Suspended and deactivated users are refused protected commands.

## Failure paths

- Invalid input returns field errors and writes nothing.
- A user without a membership who requests another organization's project is denied.
- A second submission on an exclusive assignment is denied.
- A replayed Stripe event does not create a second payment.
- A failed email leaves a notification error and leaves the domain row in its committed state.
