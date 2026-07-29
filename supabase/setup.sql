
revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;

create or replace function public.handle_new_student()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  student_name text := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  student_username text := lower(trim(coalesce(new.raw_user_meta_data ->> 'username', '')));
  grade_text text := trim(coalesce(new.raw_user_meta_data ->> 'grade', ''));
  student_grade smallint;
  expected_email text;
begin
  if char_length(student_name) < 3 or char_length(student_name) > 100 then
    raise exception 'Invalid student full name';
  end if;

  if student_username !~ '^[a-z0-9._-]{4,30}$' then
    raise exception 'Invalid student username';
  end if;

  if grade_text !~ '^[1-6]$' then
    raise exception 'Invalid primary grade';
  end if;
  student_grade := grade_text::smallint;

  expected_email := student_username || '@students.mrfarid.invalid';

  if lower(coalesce(new.email, '')) <> expected_email then
    raise exception 'Invalid student account identifier';
  end if;

  insert into public.profiles (id, full_name, username, role)
  values (new.id, student_name, student_username, 'student');

  insert into public.student_access (user_id, grade, access_mode, booklet_access)
  values (new.id, student_grade, 'sample', false)
  on conflict (user_id) do update
  set grade = excluded.grade,
      access_mode = case when public.student_access.grade is null then 'sample' else public.student_access.access_mode end,
      booklet_access = case when public.student_access.grade is null then false else public.student_access.booklet_access end,
      updated_at = now();

  return new;
end;
$$;

revoke all on function public.handle_new_student() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_student();

commit;
