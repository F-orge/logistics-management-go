-- Add constraints and indexes to auth.users table

-- Add a check constraint for email format
alter table auth.users add constraint chk_users_email_format 
check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add an index for faster email lookups
create index idx_users_email on auth.users (email);
