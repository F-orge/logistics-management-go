-- Add down migration script here
alter table auth.users
drop column is_admin;