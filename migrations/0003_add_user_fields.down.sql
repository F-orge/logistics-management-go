-- Revert new fields from auth.users table

-- Drop is_admin column
alter table auth.users drop column if exists is_admin;

-- Drop email_verified column
alter table auth.users drop column if exists email_verified;

-- Drop phone column
alter table auth.users drop column if exists phone;

-- Drop last_login column
alter table auth.users drop column if exists last_login;

-- Drop status column
alter table auth.users drop column if exists status;

-- Drop profile_picture_url column
alter table auth.users drop column if exists profile_picture_url;

-- Drop deleted_at column
alter table auth.users drop column if exists deleted_at;
