-- Add down migration script here
drop function if exists public.auth_current_user;

drop index if exists public.auth_idx_auth_users_email;

drop table if exists public.auth_users cascade;

drop extension pgcrypto;

