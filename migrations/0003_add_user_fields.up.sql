-- Add new fields to auth.users table

-- Add is_admin column
alter table auth.users add column if not exists is_admin boolean not null default false;

-- Add email_verified column
alter table auth.users add column if not exists email_verified boolean not null default false;

-- Add phone column
alter table auth.users add column if not exists phone varchar(20);

-- Add last_login column
alter table auth.users add column if not exists last_login timestamptz;

-- Add status column
alter table auth.users add column if not exists status text not null default 'active';

-- Add profile_picture_url column
alter table auth.users add column if not exists profile_picture_url text;

-- Add deleted_at column
alter table auth.users add column if not exists deleted_at timestamptz;
