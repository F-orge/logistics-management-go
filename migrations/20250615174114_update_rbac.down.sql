-- Add down migration script here

drop table user_roles;

alter table users add column role_id uuid references roles(id);