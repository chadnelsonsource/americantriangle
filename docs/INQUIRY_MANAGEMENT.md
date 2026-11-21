# Inquiry management plan

Status: planned. The database client is not connected, so this step does not add a management screen, sample counts, or a second inquiry store.

## What exists

The public contact, consultation, and partnership forms already write one row in `public.leads` through `submitLead`. Validation, the honeypot, consent, and the per-address rate limit live in `src/services/leads.ts` and `src/features/leads/actions.ts`. A stored row is the only success state. Email goes out through Resend only when `RESEND_API_KEY` and `EMAIL_FROM` are set. `LEAD_NOTIFY_EMAIL` is an optional team copy.

`/internal/inquiries` lists those rows after `authorize` allows `inquiry.read`. That action is granted to an active project manager, administrator, or super administrator. A contributor, client, talent role, and a suspended project manager are denied. The page currently reports that the inquiry store is not configured. It does not show sample inquiries.

Row Level Security for `leads` is declared in `supabase/migrations/0001_init.sql`: public insert, and select for project managers, administrators, and super administrators. There is no update policy, so a signed-in user cannot change a lead under the declared policies. Migrations `0003_lead_details.sql` and `0004_partnership_inquiries.sql` add the enterprise and partnership columns. None of these migrations has been applied to a hosted database. The repository has `.env.example` only. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are blank there.

`public.notifications` can store a per-user title, body, and email status. Its select policy is the owning user. It has no insert policy, so the public form cannot write a notice for an administrator. `public.audit_events` stores an actor, an action, and a target. Administrators and super administrators can select it. Project managers cannot. `public.internal_notes` belongs to a project and requires a project id. Inngest defines assessment and review email jobs. It is not the inquiry path, and its keys are unset.

## What this step will not add

Do not add a second inquiry table, a partnership-application table, or a parallel form. Do not turn a contributor registration into a lead. Do not show overview numbers that are not counts of stored rows. Do not mark an inquiry managed when the database write failed.

## Shape, once Supabase is connected

Apply `0001`, `0003`, and `0004` first. Then add one migration on `public.leads`:

- `status` text not null default `'new'`, limited to `new`, `in_progress`, and `closed`.
- `owner_id` uuid null, referencing `public.profiles`.
- `follow_up_on` date null.

The public insert policy must require `status = 'new'`, `owner_id is null`, and `follow_up_on is null`. A visitor cannot assign an owner or close their own inquiry. Add an update policy for the same roles that may select leads. Do not add a public update or a public select.

Replace the current read-only list at `/internal/inquiries` with the management screen. Counts are queries: total rows, `status = 'new'`, `status = 'in_progress'`, and `status = 'closed'`. Filters and search run in that same query: status, management category, owner, and a match on name, email, or organization. The detail view is `/internal/inquiries/[id]` and shows the stored fields only.

Management categories are labels over the existing inquiry type and partnership category. They are not a new stored workflow.

| Category | Existing record |
| --- | --- |
| Enterprise clients | `data_infrastructure`, `model_intelligence`, `enterprise_applications`, `integrated` |
| Strategic partnerships | `partnerships` with category `technology` or `business` |
| Research collaboration | `partnerships` with category `research` |
| Talent and contributor interest | `partnerships` with category `talent` |
| General inquiries | `other` |

A contributor application remains the contributor profile and qualification flow.

Staff actions, all checked with `authorize` before the write:

- View: `inquiry.read`, already implemented.
- Assign an owner, change status, set a follow-up date, and add a note: a new `inquiry.manage` action for the same three roles. The owner must be an active project manager, administrator, or super administrator. Status may move among `new`, `in_progress`, and `closed`. A follow-up date is optional. A note is required text with a maximum length.

Each successful change writes one `audit_events` row in the same transaction as the lead update: actor, action (`inquiry.status`, `inquiry.assign`, `inquiry.follow_up`, or `inquiry.note`), and target `lead:<id>`. Add a nullable `detail` text column to `audit_events` for the note body and the previous value. Extend the audit select policy so a project manager can read rows whose target starts with `lead:`, and leave every other audit row limited to administrators and super administrators.

When a new lead is stored, insert one `notifications` row for each active administrator and super administrator. The insert has to go through a constrained database function. The public form must not be able to choose the recipient or the body. Send the existing Resend message when Resend is configured. A failed or unconfigured email leaves the lead and the notification row in place, with `email_status` of `failed` or `skipped`. `LEAD_NOTIFY_EMAIL` remains the optional extra copy.

## Tests required with that migration

- `inquiry.manage` allows an active project manager, administrator, and super administrator, and denies a contributor, a client, a talent role, and a suspended project manager.
- A public insert with a non-new status, an owner, or a follow-up date fails the policy text.
- A status change that skips the allowed set is rejected before a write.
- An owner who is not an active inquiry reader is rejected.
- A note, an assignment, and a status change each require an audit row with the same lead id.
- A notification insert from the public role cannot set an arbitrary user id.
- The overview count equals the number of stored rows in each status. An empty table is zero, not a placeholder.

## Gate

Connect one Supabase project, put the URL and anon key in the server environment, and apply the migrations through `0004` before building this screen. Until that connection exists, `/internal/inquiries` stays an empty, honest state.
