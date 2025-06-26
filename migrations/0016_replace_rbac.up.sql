-- Add up migration script here
drop index if exists idx_access_control_role_id;

drop index if exists idx_access_control_target_table;

drop table if exists access_control;

create table
  permissions (
    id uuid not null primary key default gen_random_uuid (),
    name text not null unique generated always as (resource || '.' || action) stored,
    resource text not null, -- e.g., 'orders', 'inventory', 'users'
    action text not null, -- e.g., 'create', 'read', 'update', 'delete'
    description text,
    is_active boolean not null default true,
    created timestamptz not null default now (),
    updated timestamptz not null default now (),
    unique (resource, action)
  );

create table
  role_permissions (
    role_id uuid not null references roles (id) on delete cascade,
    permission_id uuid not null references permissions (id) on delete cascade,
    granted_at timestamptz not null default now (),
    granted_by uuid references auth.users (id),
    primary key (role_id, permission_id)
  );

create index idx_permissions_resource on permissions (resource);

create index idx_permissions_action on permissions (action);

create index idx_permissions_name on permissions (name);

create index idx_role_permissions_role_id on role_permissions (role_id);

create index idx_role_permissions_permission_id on role_permissions (permission_id);