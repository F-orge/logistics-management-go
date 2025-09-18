-- Revert the role column in auth.user to TEXT
alter table auth."user"
  alter column role type TEXT
  using role::text;

drop type if exists auth.user_role;

