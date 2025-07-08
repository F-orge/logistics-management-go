-- Revert constraints and indexes from auth.users table

-- Drop the email format check constraint
alter table auth.users drop constraint if exists chk_users_email_format;

-- Drop the email index
drop index if exists idx_users_email;
