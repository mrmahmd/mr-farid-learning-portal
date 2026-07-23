create table if not exists public.student_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_suspended boolean not null default false,
  grade smallint check (grade between 1 and 6),
  allowed_curricula text[] not null default array[]::text[],
  booklet_access boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.student_access enable row level security;
grant select on table public.student_access to authenticated;
