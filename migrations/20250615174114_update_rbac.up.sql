-- Add up migration script here
alter table users drop column role_id;

create table user_roles (
  id uuid not null primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  role_id uuid not null references roles(id),
  unique (user_id, role_id)
);