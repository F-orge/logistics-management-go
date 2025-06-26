-- Add up migration script here
create table
  roles (
    id uuid not null primary key default gen_random_uuid (),
    name text not null unique,
    description text not null,
    is_active boolean not null default true,
    created timestamptz not null default now (),
    updated timestamptz not null default now ()
  );

create table
  access_control (
    id uuid not null primary key default gen_random_uuid (),
    role_id uuid not null references roles (id) on delete cascade,
    target_table text not null,
    can_read boolean not null default false,
    can_write boolean not null default false,
    can_update boolean not null default false,
    can_delete boolean not null default false,
    created timestamptz not null default now (),
    updated timestamptz not null default now (),
    unique (role_id, target_table)
  );

create table
  user_roles (
    user_id uuid not null references auth.users (id),
    role_id uuid not null references roles (id),
    created timestamptz not null default now (),
    primary key (user_id, role_id)
  );

create index idx_user_roles_user_id on user_roles (user_id);

create index idx_user_roles_role_id on user_roles (role_id);

create index idx_access_control_role_id on access_control (role_id);

create index idx_access_control_target_table on access_control (target_table);