-- Add down migration script here
alter table users drop column if exists role_id;

drop table if exists role_permissions;

drop table if exists roles;

drop type if exists table_permission_enum;