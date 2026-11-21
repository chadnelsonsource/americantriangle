-- Partnership proposal fields. Apply after 0003_lead_details.sql. This file does not connect a database.

alter table public.leads
  add column website text not null default '',
  add column partnership_category text not null default '',
  add column capabilities text not null default '';

drop policy if exists leads_insert_public on public.leads;

create policy leads_insert_public on public.leads for insert to anon, authenticated
with check (
  char_length(name) between 2 and 120
  and char_length(email) between 3 and 200
  and char_length(organization) between 2 and 200
  and char_length(job_title) <= 120
  and char_length(message) between 20 and 5000
  and char_length(timeline) <= 120
  and char_length(scope) <= 200
  and char_length(details) <= 2000
  and char_length(website) <= 200
  and char_length(capabilities) <= 2000
  and inquiry_type in (
    'data_infrastructure',
    'model_intelligence',
    'enterprise_applications',
    'integrated',
    'partnerships',
    'other'
  )
  and (
    (
      inquiry_type <> 'partnerships'
      and char_length(industry) between 2 and 80
      and website = ''
      and partnership_category = ''
      and capabilities = ''
    )
    or (
      inquiry_type = 'partnerships'
      and char_length(industry) <= 80
      and partnership_category in ('technology', 'research', 'business', 'talent')
      and char_length(capabilities) between 20 and 2000
    )
  )
);
