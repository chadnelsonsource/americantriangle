-- Development-only reference data.
-- Do not run this file in staging or production.
-- It inserts no people, organizations, invoices, or performance numbers.

insert into public.assessments (slug, title, expertise, published)
values ('writing-sample', 'Writing and instruction following', 'writing', true)
on conflict (slug) do nothing;
