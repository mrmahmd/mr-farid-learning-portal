create table if not exists public.course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  app_id text not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, app_id)
);

alter table public.course_progress enable row level security;

drop policy if exists "Students can read their own course progress" on public.course_progress;
create policy "Students can read their own course progress"
on public.course_progress for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Students can add their own course progress" on public.course_progress;
create policy "Students can add their own course progress"
on public.course_progress for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Students can update their own course progress" on public.course_progress;
create policy "Students can update their own course progress"
on public.course_progress for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
