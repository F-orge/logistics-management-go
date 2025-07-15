-- Add up migration script here
create schema org;

create table org.departments(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(128) not null unique,
  code varchar(32) not null unique,
  description varchar(512),
  department_type varchar(64) not null,
  manager_id uuid references auth.users(id),
  phone_number varchar(20),
  email varchar(128),
  budget decimal(15, 2),
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on schema org is 'Organization structure and department management';

comment on table org.departments is 'Organizational departments with hierarchy and permissions';

comment on column org.departments.name is 'Department display name';

comment on column org.departments.code is 'Unique department code for identification';

comment on column org.departments.department_type is 'Type of department (e.g., logistics, finance, operations)';

comment on column org.departments.manager_id is 'Department manager user reference';

comment on column org.departments.budget is 'Department budget allocation';

alter table auth.users
  add column department_id uuid references org.departments(id);

create table org.department_transport_modes(
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references org.departments(id),
  transport_mode text not null,
  is_primary boolean not null default false,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table org.department_transport_modes is 'Transport modes available to each department';

comment on column org.department_transport_modes.transport_mode is 'Transport method (e.g., truck, rail, air, sea)';

comment on column org.department_transport_modes.is_primary is 'Whether this is the primary transport mode for the department';

create type org.permission_status as enum(
  'create',
  'read',
  'update',
  'delete'
);

comment on type org.permission_status is 'CRUD permission types for department resources';

create table org.department_permissions(
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references org.departments(id),
  resource text not null,
  action org.permission_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table org.department_permissions is 'Resource permissions available to departments';

create table org.department_users(
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references org.departments(id),
  user_id uuid not null references auth.users(id),
  role text not null,
  assigned_date date not null default current_date,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (department_id, user_id, role)
);

comment on table org.department_users is 'User assignments to departments with roles';

create table org.department_user_permissions(
  id uuid not null primary key default gen_random_uuid(),
  permission_id uuid not null references org.department_permissions(id),
  user_id uuid not null references auth.users(id),
  unique (permission_id, user_id),
  created timestamp with time zone not null default now()
);

comment on table org.department_user_permissions is 'Individual user permissions within departments';

create index idx_departments_manager_id on org.departments(manager_id);

create index idx_departments_is_active on org.departments(is_active);

create index idx_department_transport_modes_dept_id on org.department_transport_modes(department_id);

create index idx_department_transport_modes_is_primary on org.department_transport_modes(is_primary);

create index idx_department_permissions_dept_id on org.department_permissions(department_id);

create index idx_department_users_dept_id on org.department_users(department_id);

create index idx_department_users_user_id on org.department_users(user_id);

create index idx_department_users_is_active on org.department_users(is_active);

create index idx_department_user_permissions_user_id on org.department_user_permissions(user_id);

alter table org.departments
  add constraint check_email_format check (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' or email is null),
  add constraint check_budget_positive check (budget >= 0 or budget is null),
  add constraint check_department_type_not_empty check (length(trim(department_type)) > 0);

alter table org.department_transport_modes
  add constraint check_transport_mode_not_empty check (length(trim(transport_mode)) > 0);

alter table org.department_users
  add constraint check_role_not_empty check (length(trim(role)) > 0);

alter table org.department_permissions
  add constraint check_resource_not_empty check (length(trim(resource)) > 0);

