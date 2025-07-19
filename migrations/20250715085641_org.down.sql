-- Add down migration script here
drop index if exists idx_department_user_permissions_user_id;

drop index if exists idx_department_users_is_active;

drop index if exists idx_department_users_user_id;

drop index if exists idx_department_users_dept_id;

drop index if exists idx_department_permissions_dept_id;

drop index if exists idx_department_transport_modes_is_primary;

drop index if exists idx_department_transport_modes_dept_id;

drop index if exists idx_departments_is_active;

drop index if exists idx_departments_manager_id;

drop table if exists org.department_user_permissions;

drop table if exists org.department_users;

drop table if exists org.department_permissions;

drop type if exists org.permission_status;

drop table if exists org.department_transport_modes;

drop table if exists org.departments;

drop schema if exists org;

