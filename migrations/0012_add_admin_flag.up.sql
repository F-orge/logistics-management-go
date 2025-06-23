-- Add up migration script here
alter table auth.users
add column is_admin boolean default false;