-- Add up migration script here
create schema org;

create table org.departments (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  code text not null unique,
  description text,
  department_type text not null,
  manager_id uuid references auth.users(id),
  phone_number text,
  email text,
  budget decimal(15,2),
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

alter table auth.users add column department_id uuid references org.departments(id);

create table org.department_transport_modes (
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references org.departments(id),
  transport_mode text not null,
  is_primary boolean not null default false,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create type org.permission_status as enum (
  'create','read','update','delete'
);

create table org.department_permissions (
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references org.departments(id),
  resource text not null,
  action org.permission_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table org.department_users (
  id uuid not null primary key default gen_random_uuid(),
  department_id uuid not null references org.departments(id),
  user_id uuid not null references auth.users(id),
  role text not null,
  assigned_date date not null default current_date,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (department_id,user_id,role)
);

create table org.department_user_permissions (
  id uuid not null primary key default gen_random_uuid(),
  permission_id uuid not null references org.departments(id),
  user_id uuid not null references auth.users(id),
  unique (permission_id,user_id),
  created timestamp with time zone not null default now()
);