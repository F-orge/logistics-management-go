create table public.org_departments(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(128) not null unique,
  code varchar(32) not null unique,
  description varchar(512),
  department_type varchar(64) not null,
  manager_id uuid references public.auth_users(id),
  phone_number varchar(20),
  email varchar(128),
  budget decimal(15, 2),
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.org_departments is 'Organizational departments with hierarchy and permissions';

comment on column public.org_departments.name is 'Department display name';

comment on column public.org_departments.code is 'Unique department code for identification';

comment on column public.org_departments.department_type is 'Type of department (e.g., logistics, finance, operations)';

comment on column public.org_departments.manager_id is 'Department manager user reference';

comment on column public.org_departments.budget is 'Department budget allocation';

create table public.org_department_transport_modes(
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references public.org_departments(id),
  transport_mode text not null,
  is_primary boolean not null default false,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.org_department_transport_modes is 'Transport modes available to each department';

comment on column public.org_department_transport_modes.transport_mode is 'Transport method (e.g., truck, rail, air, sea)';

comment on column public.org_department_transport_modes.is_primary is 'Whether this is the primary transport mode for the department';

create type public.org_permission_status as enum(
  'create',
  'read',
  'update',
  'delete'
);

comment on type public.org_permission_status is 'CRUD permission types for department resources';

create table public.org_department_permissions(
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references public.org_departments(id),
  resource text not null,
  action public.org_permission_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.org_department_permissions is 'Resource permissions available to departments';

create table public.org_department_users(
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references public.org_departments(id),
  user_id uuid not null references public.auth_users(id),
  role text not null,
  assigned_date date not null default current_date,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (department_id, user_id, role)
);

comment on table public.org_department_users is 'User assignments to departments with roles';

create table public.org_department_user_permissions(
  id uuid not null primary key default gen_random_uuid(),
  permission_id uuid not null references public.org_department_permissions(id),
  user_id uuid not null references public.auth_users(id),
  unique (permission_id, user_id),
  created timestamp with time zone not null default now()
);

comment on table public.org_department_user_permissions is 'Individual user permissions within departments';

create index idx_org_departments_manager_id on public.org_departments(manager_id);

create index idx_org_departments_is_active on public.org_departments(is_active);

create index idx_org_department_transport_modes_dept_id on public.org_department_transport_modes(department_id);

create index idx_org_department_transport_modes_is_primary on public.org_department_transport_modes(is_primary);

create index idx_org_department_permissions_dept_id on public.org_department_permissions(department_id);

create index idx_org_department_users_dept_id on public.org_department_users(department_id);

create index idx_org_department_users_user_id on public.org_department_users(user_id);

create index idx_org_department_users_is_active on public.org_department_users(is_active);

create index idx_org_department_user_permissions_user_id on public.org_department_user_permissions(user_id);

alter table public.org_departments
  add constraint check_email_format check (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$' or email is null),
  add constraint check_budget_positive check (budget >= 0 or budget is null),
  add constraint check_department_type_not_empty check (length(trim(department_type)) > 0);

alter table public.org_department_transport_modes
  add constraint check_transport_mode_not_empty check (length(trim(transport_mode)) > 0);

alter table public.org_department_users
  add constraint check_role_not_empty check (length(trim(role)) > 0);

alter table public.org_department_permissions
  add constraint check_resource_not_empty check (length(trim(resource)) > 0);

