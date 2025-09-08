create extension if not exists pgcrypto;

create schema if not exists auth;

create table auth."user"(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  email_verified boolean default false,
  image text,
  created_at timestamp not null default NOW(),
  updated_at timestamp not null default NOW(),
  role TEXT,
  banned boolean default false,
  ban_reason text,
  ban_expires timestamp
);

comment on table auth."user" is 'Represents a user in the system.';

comment on column auth."user".id is 'Unique identifier for the user';

comment on column auth."user".name is 'The user''s full name';

comment on column auth."user".email is 'The user''s email address, used for login and communication';

comment on column auth."user".email_verified is 'Indicates if the user has verified their email address';

comment on column auth."user".image is 'URL to the user''s profile picture';

comment on column auth."user".created_at is 'Timestamp when the user was created';

comment on column auth."user".updated_at is 'Timestamp when the user was last updated';

comment on column auth."user".role is 'The user''s role (optional)';

comment on column auth."user".banned is 'Indicates if the user is banned';

comment on column auth."user".ban_reason is 'Reason for banning the user (optional)';

comment on column auth."user".ban_expires is 'Timestamp when the ban expires (optional)';

create table auth.session(
  id uuid primary key default gen_random_uuid(),
  expires_at timestamp not null,
  token text not null unique,
  created_at timestamp not null default NOW(),
  updated_at timestamp not null default NOW(),
  ip_address text,
  user_agent text,
  user_id uuid not null,
  impersonated_by uuid,
  foreign key (user_id) references auth."user"(id),
  foreign key (impersonated_by) references auth."user"(id)
);

comment on table auth.session is 'Stores session information for logged-in users.';

comment on column auth.session.id is 'Unique identifier for the session';

comment on column auth.session.expires_at is 'Timestamp when the session expires';

comment on column auth.session.token is 'Unique token for the session';

comment on column auth.session.created_at is 'Timestamp when the session was created';

comment on column auth.session.updated_at is 'Timestamp when the session was last updated';

comment on column auth.session.ip_address is 'IP address from which the session was created';

comment on column auth.session.user_agent is 'User agent of the client';

comment on column auth.session.user_id is 'References auth.user(id)';

comment on column auth.session.impersonated_by is 'User ID of the impersonator (optional)';

create table auth.account(
  id uuid primary key default gen_random_uuid(),
  account_id text not null,
  provider_id text not null,
  user_id uuid not null,
  access_token text,
  refresh_token text,
  id_token text,
  access_token_expires_at timestamp,
  refresh_token_expires_at timestamp,
  scope text,
  password TEXT,
  created_at timestamp not null default NOW(),
  updated_at timestamp not null default NOW(),
  foreign key (user_id) references auth."user"(id)
);

comment on table auth.account is 'Links a user to different authentication providers (e.g., email/password, Google, GitHub).';

comment on column auth.account.id is 'Unique identifier for the account';

comment on column auth.account.account_id is 'ID of the account from the provider';

comment on column auth.account.provider_id is 'ID of the authentication provider (e.g., "credentials", "google")';

comment on column auth.account.user_id is 'References auth.user(id)';

comment on column auth.account.access_token is 'Access token from the provider';

comment on column auth.account.refresh_token is 'Refresh token from the provider';

comment on column auth.account.id_token is 'ID token from the provider';

comment on column auth.account.access_token_expires_at is 'Expiration timestamp for the access token';

comment on column auth.account.refresh_token_expires_at is 'Expiration timestamp for the refresh token';

comment on column auth.account.scope is 'Scope of permissions granted by the provider';

comment on column auth.account.password is 'Hashed password for credentials-based authentication';

comment on column auth.account.created_at is 'Timestamp when the account was created';

comment on column auth.account.updated_at is 'Timestamp when the account was last updated';

create table auth.verification(
  id uuid primary key default gen_random_uuid(),
  identifier text not null,
  value text not null,
  expires_at timestamp not null,
  created_at timestamp not null default NOW(),
  updated_at timestamp not null default NOW()
);

comment on table auth.verification is 'Stores tokens for email verification or password reset.';

comment on column auth.verification.id is 'Unique identifier for the verification record';

comment on column auth.verification.identifier is 'Identifier for the verification (e.g., email address)';

comment on column auth.verification.value is 'Verification token';

comment on column auth.verification.expires_at is 'Timestamp when the verification token expires';

comment on column auth.verification.created_at is 'Timestamp when the verification record was created';

comment on column auth.verification.updated_at is 'Timestamp when the verification record was last updated';

-- Create indexes for performance
create index idx_auth_user_email on auth."user"(email);

create index idx_auth_user_role on auth."user"(role);

create index idx_auth_user_banned on auth."user"(banned);

create index idx_auth_user_ban_expires on auth."user"(ban_expires);

create index idx_auth_session_token on auth.session(token);

create index idx_auth_session_user_id on auth.session(user_id);

create index idx_auth_session_expires_at on auth.session(expires_at);

create index idx_auth_session_impersonated_by on auth.session(impersonated_by);

create index idx_auth_account_user_id on auth.account(user_id);

create index idx_auth_account_provider_id on auth.account(provider_id);

create index idx_auth_account_account_id on auth.account(account_id);

create index idx_auth_account_provider_account on auth.account(provider_id, account_id);

create index idx_auth_verification_identifier on auth.verification(identifier);

create index idx_auth_verification_value on auth.verification(value);

create index idx_auth_verification_expires_at on auth.verification(expires_at);

