-- name: CreateUser :one
insert into "user"(id, name, email, email_verified, image, role, banned, ban_reason, ban_expires)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning
  *;

-- name: GetUser :one
select
  *
from
  "user"
where
  id = $1
limit 1;

-- name: ListUsers :many
select
  *
from
  "user"
order by
  name;

-- name: UpdateUser :one
update
  "user"
set
  name = case when sqlc.narg('name') is not null then
    sqlc.narg('name')::text
  else
    name
  end,
  email = case when sqlc.narg('email') is not null then
    sqlc.narg('email')::text
  else
    email
  end,
  email_verified = case when sqlc.narg('email_verified') is not null then
    sqlc.narg('email_verified')::boolean
  else
    email_verified
  end,
  image = case when sqlc.narg('image') is not null then
    sqlc.narg('image')::text
  else
    image
  end,
  role = case when sqlc.narg('role') is not null then
    sqlc.narg('role')::text
  else
    role
  end,
  banned = case when sqlc.narg('banned') is not null then
    sqlc.narg('banned')::boolean
  else
    banned
  end,
  ban_reason = case when sqlc.narg('ban_reason') is not null then
    sqlc.narg('ban_reason')::text
  else
    ban_reason
  end,
  ban_expires = case when sqlc.narg('ban_expires') is not null then
    sqlc.narg('ban_expires')::timestamptz
  else
    ban_expires
  end,
  updated_at = now()
where
  id = sqlc.arg('id')::text
returning
  *;

-- name: DeleteUser :exec
delete from "user"
where id = $1;

-- name: CreateSession :one
insert into "session"(id, expires_at, token, user_id, ip_address, user_agent, impersonated_by)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: GetSession :one
select
  *
from
  "session"
where
  id = $1
limit 1;

-- name: GetSessionByToken :one
select
  *
from
  "session"
where
  token = $1
limit 1;

-- name: ListSessions :many
select
  *
from
  "session"
where
  user_id = $1
order by
  created_at;

-- name: DeleteSession :exec
delete from "session"
where id = $1;

-- name: DeleteAllSessionsForUser :exec
delete from "session"
where user_id = $1;

-- name: CreateAccount :one
insert into "account"(id, account_id, provider_id, user_id, access_token, refresh_token, id_token, access_token_expires_at, refresh_token_expires_at, scope, password)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning
  *;

-- name: GetAccount :one
select
  *
from
  "account"
where
  id = $1
limit 1;

-- name: GetAccountByProvider :one
select
  *
from
  "account"
where
  provider_id = $1
  and account_id = $2
limit 1;

-- name: ListAccounts :many
select
  *
from
  "account"
where
  user_id = $1
order by
  created_at;

-- name: UpdateAccount :one
update
  "account"
set
  access_token = case when sqlc.narg('access_token') is not null then
    sqlc.narg('access_token')::text
  else
    access_token
  end,
  refresh_token = case when sqlc.narg('refresh_token') is not null then
    sqlc.narg('refresh_token')::text
  else
    refresh_token
  end,
  id_token = case when sqlc.narg('id_token') is not null then
    sqlc.narg('id_token')::text
  else
    id_token
  end,
  access_token_expires_at = case when sqlc.narg('access_token_expires_at') is not null then
    sqlc.narg('access_token_expires_at')::timestamptz
  else
    access_token_expires_at
  end,
  refresh_token_expires_at = case when sqlc.narg('refresh_token_expires_at') is not null then
    sqlc.narg('refresh_token_expires_at')::timestamptz
  else
    refresh_token_expires_at
  end,
  scope = case when sqlc.narg('scope') is not null then
    sqlc.narg('scope')::text
  else
    scope
  end,
  password = case when sqlc.narg('password') is not null then
    sqlc.narg('password')::text
  else
    password
  end,
  updated_at = now()
where
  id = sqlc.arg('id')::text
returning
  *;

-- name: DeleteAccount :exec
delete from "account"
where id = $1;

-- name: CreateVerification :one
insert into "verification"(id, identifier, value, expires_at)
  values ($1, $2, $3, $4)
returning
  *;

-- name: GetVerification :one
select
  *
from
  "verification"
where
  identifier = $1
  and value = $2
limit 1;

-- name: DeleteVerification :exec
delete from "verification"
where id = $1;

-- name: GetUserByEmail :one
select
  *
from
  "user"
where
  email = $1
limit 1;

-- name: VerifyEmail :one
update
  "user"
set
  email_verified = true,
  updated_at = now()
where
  id = $1
returning
  *;

-- name: UpdatePassword :one
update
  "account"
set
  password = $2,
  updated_at = now()
where
  user_id = $1
  and provider_id = 'email'
returning
  *;

