-- Add down migration script here
drop table org.department_user_permissions;

drop table org.department_users;

drop table org.department_permissions;

drop type org.permission_status;

drop table org.department_transport_modes;

alter table auth.users drop column department_id;

drop table org.departments;

drop schema org;