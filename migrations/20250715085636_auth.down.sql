-- Add down migration script here
drop function if exists auth.current_user;

drop index if exists auth.idx_auth_users_email;

drop table if exists auth.users;

drop schema if exists auth;

drop extension pgcrypto;

