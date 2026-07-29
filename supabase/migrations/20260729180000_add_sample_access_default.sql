alter table public.student_access alter column access_mode set default 'sample';

alter table public.student_access drop constraint if exists student_access_access_mode_check;
alter table public.student_access add constraint student_access_access_mode_check
  check (access_mode = any (array['sample'::text, 'grade'::text, 'custom'::text, 'all'::text, 'none'::text]));

update public.student_access sa
set access_mode = 'sample',
    allowed_curricula = array[]::text[],
    booklet_access = false,
    updated_at = now()
where sa.grade is not null
  and not exists (
    select 1 from public.profiles p
    where p.id = sa.user_id and p.username = 'mr.mahmd'
  );

create or replace function public.assign_sample_access_on_first_grade()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.grade is not null
     and old.grade is null
     and new.access_mode in ('none', 'sample') then
    new.access_mode := 'sample';
    new.booklet_access := false;
    new.allowed_curricula := array[]::text[];
  end if;
  return new;
end;
$$;

revoke all on function public.assign_sample_access_on_first_grade() from public, anon, authenticated;
drop trigger if exists student_access_assign_sample_on_first_grade on public.student_access;
create trigger student_access_assign_sample_on_first_grade
before update of grade on public.student_access
for each row execute function public.assign_sample_access_on_first_grade();
