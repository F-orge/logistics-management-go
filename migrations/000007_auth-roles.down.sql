alter table "user"
  alter column role type TEXT
  using role::text;

drop type if exists user_role;

