-- Americantriangle initial schema. Apply with the Supabase CLI or SQL editor.
-- Service-role credentials do not belong in this file.

create extension if not exists pgcrypto;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  account_kind text not null check (account_kind in ('contributor', 'client', 'staff')),
  account_status text not null default 'pending_verification' check (account_status in ('pending_verification', 'active', 'suspended', 'deactivated')),
  platform_role text not null check (platform_role in (
    'contributor', 'client_owner', 'client_member', 'project_manager', 'reviewer',
    'talent_operations', 'finance_operations', 'engineer', 'administrator', 'super_administrator'
  )),
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_kind_role check (
    (account_kind = 'contributor' and platform_role = 'contributor')
    or (account_kind = 'client' and platform_role in ('client_owner', 'client_member'))
    or (account_kind = 'staff' and platform_role in (
      'project_manager', 'reviewer', 'talent_operations', 'finance_operations', 'engineer', 'administrator', 'super_administrator'
    ))
  )
);

create or replace function public.platform_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select platform_role from public.profiles where id = auth.uid();
$$;

create or replace function public.account_status()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select account_status from public.profiles where id = auth.uid();
$$;

create or replace function public.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.account_status() = 'active';
$$;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  member_role text not null check (member_role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table public.organization_invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  email text not null,
  member_role text not null check (member_role in ('owner', 'member')),
  token_hash text not null unique,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.contributor_profiles (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  qualification_status text not null default 'registered' check (qualification_status in (
    'registered', 'profile_incomplete', 'pending_assessment', 'under_review', 'qualified', 'rejected', 'suspended'
  )),
  country text not null default '',
  time_zone text not null default '',
  availability_hours numeric not null default 0,
  languages text[] not null default '{}',
  skills text[] not null default '{}',
  education jsonb not null default '[]'::jsonb,
  experience jsonb not null default '[]'::jsonb,
  portfolio_links text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.assessments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  expertise text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.assessment_versions (
  id uuid primary key default gen_random_uuid(),
  assessment_id uuid not null references public.assessments (id) on delete cascade,
  version_number integer not null,
  max_attempts integer not null default 2 check (max_attempts > 0),
  pass_threshold numeric not null default 0.8,
  time_limit_seconds integer,
  created_at timestamptz not null default now(),
  unique (assessment_id, version_number)
);

create table public.assessment_questions (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.assessment_versions (id) on delete cascade,
  position integer not null,
  question_type text not null check (question_type in ('multiple_choice', 'written', 'coding', 'mathematics', 'scientific', 'domain', 'file')),
  prompt text not null,
  choices jsonb not null default '[]'::jsonb,
  answer_key text,
  unique (version_id, position)
);

create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.assessment_versions (id),
  contributor_id uuid not null references public.profiles (id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  score numeric,
  review_status text not null default 'submitted' check (review_status in ('submitted', 'auto_scored', 'manual_review', 'passed', 'failed')),
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  project_type text not null check (project_type in ('data_operations', 'model_evaluation', 'consulting', 'application', 'agent', 'integration')),
  delivery_state text not null default 'new_inquiry' check (delivery_state in (
    'new_inquiry', 'qualification', 'discovery', 'estimation', 'proposal', 'contract',
    'kickoff', 'execution', 'quality_review', 'client_approval', 'delivery', 'support'
  )),
  visibility text not null default 'invite_only' check (visibility in ('invite_only', 'qualified_pool')),
  required_skills text[] not null default '{}',
  required_assessment_ids uuid[] not null default '{}',
  required_languages text[] not null default '{}',
  allowed_countries text[],
  country_restriction_reason text,
  min_availability_hours numeric not null default 0,
  capacity integer not null default 1 check (capacity > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_members (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  member_kind text not null check (member_kind in ('client', 'staff', 'contributor')),
  unique (project_id, user_id)
);

create table public.project_applications (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  contributor_id uuid not null references public.profiles (id) on delete cascade,
  status text not null default 'submitted' check (status in ('submitted', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  unique (project_id, contributor_id)
);

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  due_on date,
  completed_on date,
  position integer not null default 0
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now()
);

create table public.client_approvals (
  id uuid primary key default gen_random_uuid(),
  deliverable_id uuid not null references public.deliverables (id) on delete cascade,
  approver_id uuid not null references public.profiles (id),
  decided_at timestamptz not null default now(),
  decision text not null check (decision in ('approved', 'changes_requested'))
);

create table public.internal_notes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table public.client_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  format text not null check (format in (
    'text_annotation', 'classification', 'prompt_creation', 'response_evaluation', 'response_ranking',
    'preference_comparison', 'coding', 'mathematics', 'scientific_reasoning', 'structured_extraction',
    'image_annotation', 'audio_annotation', 'video_annotation'
  )),
  instructions text not null,
  payload_schema jsonb not null default '{}'::jsonb,
  schema_version integer not null default 1,
  created_at timestamptz not null default now()
);

create table public.task_assignments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  contributor_id uuid not null references public.profiles (id),
  status text not null default 'assigned' check (status in ('assigned', 'in_progress', 'submitted', 'expired', 'released')),
  lock_holder_id uuid references public.profiles (id),
  expires_at timestamptz,
  exclusive_assignment boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_org_member(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_memberships
    where organization_id = target and user_id = auth.uid()
  );
$$;

create or replace function public.is_org_owner(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_memberships
    where organization_id = target and user_id = auth.uid() and member_role = 'owner'
  );
$$;

create or replace function public.is_project_member(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.project_members
    where project_id = target and user_id = auth.uid()
  );
$$;

create unique index task_assignments_one_open_exclusive
  on public.task_assignments (task_id)
  where exclusive_assignment and status in ('assigned', 'in_progress', 'submitted');

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null unique references public.task_assignments (id) on delete cascade,
  contributor_id uuid not null references public.profiles (id),
  status text not null default 'draft' check (status in ('draft', 'submitted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.submission_versions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  version_number integer not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  unique (submission_id, version_number)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  submission_version_id uuid not null references public.submission_versions (id) on delete cascade,
  reviewer_id uuid not null references public.profiles (id),
  state text not null check (state in ('submitted', 'queued', 'under_review', 'approved', 'revision_required', 'rejected', 'disputed')),
  score numeric,
  comment text not null default '',
  layer_number integer not null default 1 check (layer_number > 0),
  created_at timestamptz not null default now()
);

create table public.datasets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table public.dataset_versions (
  id uuid primary key default gen_random_uuid(),
  dataset_id uuid not null references public.datasets (id) on delete cascade,
  version_number integer not null,
  stage text not null check (stage in ('raw', 'processed', 'approved')),
  created_at timestamptz not null default now(),
  unique (dataset_id, version_number)
);

create table public.data_records (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.dataset_versions (id) on delete cascade,
  group_key text,
  values jsonb not null
);

create table public.evaluation_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  dataset_version_id uuid references public.dataset_versions (id),
  criteria jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.quality_reports (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.dataset_versions (id) on delete cascade,
  issues jsonb not null,
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id),
  project_id uuid references public.projects (id),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  status text not null default 'issued' check (status in ('draft', 'issued', 'paid', 'void')),
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices (id),
  provider_event_id text not null unique,
  state text not null check (state in ('requires_payment', 'processing', 'succeeded', 'failed', 'refunded')),
  amount_cents integer not null,
  currency text not null,
  created_at timestamptz not null default now()
);

create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments (id),
  amount_cents integer not null check (amount_cents > 0),
  created_at timestamptz not null default now()
);

create table public.earnings (
  id uuid primary key default gen_random_uuid(),
  contributor_id uuid not null references public.profiles (id),
  submission_id uuid references public.submissions (id),
  state text not null check (state in ('pending', 'approved', 'payout_initiated', 'paid', 'payout_failed')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ledger_entries (
  id uuid primary key default gen_random_uuid(),
  event_id text not null unique,
  amount_cents integer not null check (amount_cents <> 0),
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  direction text not null check (direction in ('credit', 'debit')),
  reason text not null,
  created_at timestamptz not null default now()
);

create table public.payout_batches (
  id uuid primary key default gen_random_uuid(),
  status text not null check (status in ('recorded', 'initiated', 'confirmed', 'failed')),
  connect_transfer_id text,
  created_at timestamptz not null default now()
);

create table public.webhook_events (
  id text primary key,
  provider text not null,
  received_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null,
  name text not null,
  email text not null,
  organization text not null,
  message text not null,
  route text not null,
  created_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  body text not null,
  email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed', 'skipped')),
  created_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  author_id uuid not null references public.profiles (id),
  subject text not null,
  body text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamptz not null default now()
);

create table public.file_objects (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  object_path text not null unique,
  owner_id uuid references public.profiles (id),
  organization_id uuid references public.organizations (id),
  byte_size integer not null,
  content_type text not null,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  target text not null,
  created_at timestamptz not null default now()
);

create table public.ai_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects (id),
  provider text not null,
  purpose text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  data_handling_approved boolean not null,
  created_at timestamptz not null default now()
);

create index projects_organization_id_idx on public.projects (organization_id);
create index task_assignments_contributor_idx on public.task_assignments (contributor_id);
create index earnings_contributor_idx on public.earnings (contributor_id);
create index notifications_user_idx on public.notifications (user_id);
create index audit_events_actor_idx on public.audit_events (actor_id);

create or replace function public.protect_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.platform_role is distinct from old.platform_role and public.platform_role() is distinct from 'super_administrator' then
    raise exception 'role change denied';
  end if;
  if new.account_kind is distinct from old.account_kind and public.platform_role() is distinct from 'super_administrator' then
    raise exception 'account kind change denied';
  end if;
  if new.account_status is distinct from old.account_status
     and public.platform_role() not in ('administrator', 'super_administrator') then
    raise exception 'status change denied';
  end if;
  return new;
end;
$$;

create trigger profiles_protect before update on public.profiles
for each row execute function public.protect_profile_privileges();

create trigger profiles_touch before update on public.profiles
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  kind text := coalesce(new.raw_user_meta_data->>'account_kind', 'contributor');
  role text;
begin
  if kind not in ('contributor', 'client') then
    kind := 'contributor';
  end if;
  role := case when kind = 'client' then 'client_owner' else 'contributor' end;
  insert into public.profiles (id, account_kind, account_status, platform_role, full_name)
  values (new.id, kind, 'pending_verification', role, nullif(new.raw_user_meta_data->>'full_name', ''));
  if kind = 'contributor' then
    insert into public.contributor_profiles (user_id) values (new.id);
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.handle_user_verified()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email_confirmed_at is not null and old.email_confirmed_at is null then
    update public.profiles
    set account_status = 'active'
    where id = new.id and account_status = 'pending_verification';
  end if;
  return new;
end;
$$;

create trigger on_auth_user_verified
after update of email_confirmed_at on auth.users
for each row execute function public.handle_user_verified();

create or replace function public.add_organization_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.created_by is not null then
    insert into public.organization_memberships (organization_id, user_id, member_role)
    values (new.id, new.created_by, 'owner');
  end if;
  return new;
end;
$$;

create trigger organizations_owner
after insert on public.organizations
for each row execute function public.add_organization_owner();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.organization_invitations enable row level security;
alter table public.contributor_profiles enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_versions enable row level security;
alter table public.assessment_questions enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.project_applications enable row level security;
alter table public.milestones enable row level security;
alter table public.deliverables enable row level security;
alter table public.client_approvals enable row level security;
alter table public.internal_notes enable row level security;
alter table public.client_updates enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assignments enable row level security;
alter table public.submissions enable row level security;
alter table public.submission_versions enable row level security;
alter table public.reviews enable row level security;
alter table public.datasets enable row level security;
alter table public.dataset_versions enable row level security;
alter table public.data_records enable row level security;
alter table public.evaluation_runs enable row level security;
alter table public.quality_reports enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.refunds enable row level security;
alter table public.earnings enable row level security;
alter table public.ledger_entries enable row level security;
alter table public.payout_batches enable row level security;
alter table public.webhook_events enable row level security;
alter table public.leads enable row level security;
alter table public.notifications enable row level security;
alter table public.messages enable row level security;
alter table public.support_tickets enable row level security;
alter table public.file_objects enable row level security;
alter table public.audit_events enable row level security;
alter table public.ai_requests enable row level security;

create policy profiles_select_own on public.profiles for select to authenticated
using (id = auth.uid() or public.platform_role() in ('talent_operations', 'administrator', 'super_administrator'));

create policy profiles_update_own on public.profiles for update to authenticated
using (id = auth.uid() or public.platform_role() in ('administrator', 'super_administrator'))
with check (id = auth.uid() or public.platform_role() in ('administrator', 'super_administrator'));

create policy organizations_member_select on public.organizations for select to authenticated
using (public.is_org_member(id) or public.platform_role() in ('administrator', 'super_administrator'));

create policy organizations_insert_client on public.organizations for insert to authenticated
with check (created_by = auth.uid() and public.platform_role() = 'client_owner');

create policy memberships_select on public.organization_memberships for select to authenticated
using (user_id = auth.uid() or public.is_org_member(organization_id) or public.platform_role() in ('administrator', 'super_administrator'));

create policy contributor_select_own on public.contributor_profiles for select to authenticated
using (user_id = auth.uid() or public.platform_role() in ('talent_operations', 'administrator', 'super_administrator'));

create policy contributor_update_own on public.contributor_profiles for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy assessments_read on public.assessments for select to authenticated
using (published = true or public.platform_role() in ('talent_operations', 'administrator', 'super_administrator'));

create policy assessment_versions_read on public.assessment_versions for select to authenticated
using (true);

create policy attempts_own on public.assessment_attempts for select to authenticated
using (contributor_id = auth.uid() or public.platform_role() in ('talent_operations', 'administrator', 'super_administrator'));

create policy attempts_insert_own on public.assessment_attempts for insert to authenticated
with check (contributor_id = auth.uid() and public.is_active_user());

revoke all on public.assessment_questions from anon, authenticated;
grant select (id, version_id, position, question_type, prompt, choices) on public.assessment_questions to authenticated;

create policy projects_select on public.projects for select to authenticated
using (
  public.is_org_member(organization_id)
  or public.is_project_member(id)
  or public.platform_role() in ('administrator', 'super_administrator')
);

create policy projects_insert_owner on public.projects for insert to authenticated
with check (
  (public.is_org_owner(organization_id) and public.is_active_user())
  or public.platform_role() in ('project_manager', 'super_administrator')
);

create policy project_members_select on public.project_members for select to authenticated
using (user_id = auth.uid() or public.is_project_member(project_id) or public.platform_role() in ('administrator', 'super_administrator'));

create policy applications_own on public.project_applications for select to authenticated
using (contributor_id = auth.uid() or public.platform_role() in ('project_manager', 'talent_operations', 'administrator', 'super_administrator'));

create policy applications_insert_own on public.project_applications for insert to authenticated
with check (contributor_id = auth.uid());

create policy milestones_select on public.milestones for select to authenticated
using (exists (
  select 1 from public.projects p
  where p.id = project_id and (public.is_org_member(p.organization_id) or public.is_project_member(p.id) or public.platform_role() in ('administrator', 'super_administrator'))
));

create policy deliverables_select on public.deliverables for select to authenticated
using (exists (
  select 1 from public.projects p
  where p.id = project_id and (public.is_org_member(p.organization_id) or public.is_project_member(p.id) or public.platform_role() in ('administrator', 'super_administrator'))
));

create policy internal_notes_staff on public.internal_notes for select to authenticated
using (public.platform_role() in ('project_manager', 'reviewer', 'engineer', 'administrator', 'super_administrator') and (public.is_project_member(project_id) or public.platform_role() in ('administrator', 'super_administrator')));

create policy client_updates_select on public.client_updates for select to authenticated
using (exists (
  select 1 from public.projects p
  where p.id = project_id and (public.is_org_member(p.organization_id) or public.is_project_member(p.id) or public.platform_role() in ('administrator', 'super_administrator'))
));

create policy assignments_own on public.task_assignments for select to authenticated
using (contributor_id = auth.uid() or public.platform_role() in ('project_manager', 'reviewer', 'administrator', 'super_administrator'));

create policy submissions_own on public.submissions for select to authenticated
using (contributor_id = auth.uid() or public.platform_role() in ('project_manager', 'reviewer', 'administrator', 'super_administrator'));

create policy submission_versions_own on public.submission_versions for select to authenticated
using (exists (
  select 1 from public.submissions s
  where s.id = submission_id and (s.contributor_id = auth.uid() or public.platform_role() in ('project_manager', 'reviewer', 'administrator', 'super_administrator'))
));

create policy reviews_staff on public.reviews for select to authenticated
using (
  reviewer_id = auth.uid()
  or public.platform_role() in ('project_manager', 'administrator', 'super_administrator')
  or exists (
    select 1 from public.submission_versions v
    join public.submissions s on s.id = v.submission_id
    where v.id = submission_version_id and s.contributor_id = auth.uid()
  )
);

create policy earnings_own on public.earnings for select to authenticated
using (contributor_id = auth.uid() or public.platform_role() in ('finance_operations', 'super_administrator'));

create policy invoices_owner on public.invoices for select to authenticated
using (public.is_org_owner(organization_id) or public.platform_role() in ('finance_operations', 'super_administrator'));

create policy payments_finance on public.payments for select to authenticated
using (public.platform_role() in ('finance_operations', 'super_administrator'));

create policy ledger_finance on public.ledger_entries for select to authenticated
using (public.platform_role() in ('finance_operations', 'super_administrator'));

create policy leads_insert_public on public.leads for insert to anon, authenticated
with check (char_length(message) >= 20 and char_length(email) <= 200);

create policy leads_select_staff on public.leads for select to authenticated
using (public.platform_role() in ('project_manager', 'administrator', 'super_administrator'));

create policy notifications_own on public.notifications for select to authenticated
using (user_id = auth.uid());

create policy messages_org on public.messages for select to authenticated
using (public.is_org_member(organization_id) or public.platform_role() in ('project_manager', 'administrator', 'super_administrator'));

create policy messages_insert_org on public.messages for insert to authenticated
with check (author_id = auth.uid() and public.is_org_member(organization_id));

create policy support_org on public.support_tickets for select to authenticated
using (public.is_org_member(organization_id) or public.platform_role() in ('administrator', 'super_administrator'));

create policy support_insert_org on public.support_tickets for insert to authenticated
with check (author_id = auth.uid() and public.is_org_member(organization_id));

create policy files_select on public.file_objects for select to authenticated
using (
  owner_id = auth.uid()
  or (organization_id is not null and public.is_org_member(organization_id))
  or public.platform_role() in ('administrator', 'super_administrator')
);

create policy audit_select on public.audit_events for select to authenticated
using (public.platform_role() in ('administrator', 'super_administrator'));

create policy datasets_staff on public.datasets for select to authenticated
using (public.platform_role() in ('project_manager', 'engineer', 'administrator', 'super_administrator'));

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant insert on public.leads to anon;
revoke insert, update, delete on public.ledger_entries from authenticated;
revoke insert, update, delete on public.webhook_events from authenticated, anon;
revoke update, delete on public.audit_events from authenticated;
revoke select on public.payments from authenticated;
grant select on public.payments to authenticated;
revoke all on public.assessment_questions from anon, authenticated;
grant select (id, version_id, position, question_type, prompt, choices) on public.assessment_questions to authenticated;
