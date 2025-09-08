-- Drop tables in reverse order
drop table if exists auth.verification;

drop table if exists auth.account;

drop table if exists auth.session;

drop table if exists auth."user";

-- Drop schema
drop schema if exists auth;

