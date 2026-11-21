-- Private storage buckets. Requires the Supabase storage schema.

insert into storage.buckets (id, name, public)
values
  ('contributor-documents', 'contributor-documents', false),
  ('project-files', 'project-files', false),
  ('dataset-exports', 'dataset-exports', false)
on conflict (id) do nothing;

create policy project_files_read on storage.objects for select to authenticated
using (
  bucket_id = 'project-files'
  and (
    owner = auth.uid()
    or public.platform_role() in ('administrator', 'super_administrator')
  )
);
