-- Add up migration script here
create extension pgcrypto;

create table public.auth_users(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(128) not null,
  email varchar(128) not null unique,
  email_verified boolean not null default false,
  _password_hash text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.auth_users is 'Application users with authentication credentials';

comment on column public.auth_users.name is 'User display name';

comment on column public.auth_users.email is 'Unique email address for authentication';

comment on column public.auth_users.email_verified is 'Whether the email address has been verified';

comment on column public.auth_users._password_hash is 'Hashed password using bcrypt or similar - never store plaintext';

comment on column public.auth_users.created is 'Timestamp when user was created';

comment on column public.auth_users.updated is 'Timestamp when user was last updated';

create index idx_auth_users_email on public.auth_users(email);

create or replace function public.auth_current_user()
  returns setof public.auth_users
  as $$
begin
  return query
  select
    *
  from
    public.auth_users
  where
    id = current_setting('app.current_user', true)::uuid;
end;
$$
language plpgsql
security definer;

comment on function public.auth_current_user() is 'Returns the current authenticated user based on app.current_user setting';

