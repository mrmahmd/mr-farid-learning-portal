create table if not exists public.student_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_suspended boolean not null default false,
  grade smallint check (grade between 1 and 6),
  access_mode text not null default 'none' check (access_mode in ('grade', 'custom', 'all', 'none')),
  must_change_password boolean not null default false,
  allowed_curricula text[] not null default array[]::text[],
  booklet_access boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.student_access
add column if not exists access_mode text not null default 'none';

alter table public.student_access
add column if not exists must_change_password boolean not null default false;

alter table public.student_access
drop constraint if exists student_access_access_mode_check;

alter table public.student_access
add constraint student_access_access_mode_check
check (access_mode in ('grade', 'custom', 'all', 'none'));

alter table public.student_access enable row level security;
grant select on table public.student_access to authenticated;
grant update (grade) on table public.student_access to authenticated;

drop policy if exists "Students can choose their grade once" on public.student_access;
create policy "Students can choose their grade once"
on public.student_access
for update
to authenticated
using (
  (select auth.uid()) = user_id
  and grade is null
  and is_suspended = false
)
with check (
  (select auth.uid()) = user_id
  and grade between 1 and 6
);
