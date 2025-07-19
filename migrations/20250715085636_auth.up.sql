-- Add up migration script here
create extension pgcrypto;

create schema auth;

comment on schema auth is 'Authentication and user management schema';

create table auth.users(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(128) not null,
  email varchar(128) not null unique,
  email_verified boolean not null default false,
  _password_hash text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table auth.users is 'Application users with authentication credentials';

comment on column auth.users.name is 'User display name';

comment on column auth.users.email is 'Unique email address for authentication';

comment on column auth.users.email_verified is 'Whether the email address has been verified';

comment on column auth.users._password_hash is 'Hashed password using bcrypt or similar - never store plaintext';

comment on column auth.users.created is 'Timestamp when user was created';

comment on column auth.users.updated is 'Timestamp when user was last updated';

create index idx_auth_users_email on auth.users(email);

create or replace function auth.current_user ()
  returns setof auth.users
  as $$
begin
  return query
  select
    *
  from
    auth.users
  where
    id = current_setting('app.current_user', true)::uuid;
end;
$$
language plpgsql
security definer;

comment on function auth.current_user() is 'Returns the current authenticated user based on app.current_user setting';

