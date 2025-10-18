-- name: CrmPaginateNotification :many
select
  sqlc.embed(notifications),
  sqlc.embed(users)
from
  "crm"."notifications" as notifications
  inner join "public"."user" as users on notifications.user_id = users.id
where (users.name ilike sqlc.narg(search)::text
  or notifications.message ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindNotification :one
select
  sqlc.embed(notifications),
  sqlc.embed(users)
from
  "crm"."notifications" as notifications
  inner join "public"."user" as users on notifications.user_id = users.id
where
  notifications.id = sqlc.arg(id)::uuid;

-- name: CrmAnyNotification :many
select
  sqlc.embed(notifications),
  sqlc.embed(users)
from
  "crm"."notifications" as notifications
  inner join "public"."user" as users on notifications.user_id = users.id
where
  notifications.id = any (@ids::uuid[]);

-- name: CrmRangeNotification :many
select
  sqlc.embed(notifications),
  sqlc.embed(users)
from
  "crm"."notifications" as notifications
  inner join "public"."user" as users on notifications.user_id = users.id
where
  notifications.created_at >= @dateFrom::date
  and notifications.created_at <= @dateTo::date
  and (users.name ilike sqlc.narg(search)::text
    or notifications.message ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertNotification :one
insert into "crm"."notifications"(user_id, message, is_read, link)
  values ($1, $2, $3, $4)
returning
  *;

-- name: CrmUpdateNotification :one
update
  "crm"."notifications"
set
  updated_at = now(),
  user_id = case when sqlc.arg(user_id) is not null then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  message = case when sqlc.arg(message) is not null then
    sqlc.arg(message)::text
  else
    message
  end,
  is_read = case when sqlc.arg(is_read) is not null then
    sqlc.arg(is_read)::boolean
  else
    is_read
  end,
  link = case when sqlc.arg(link) is not null then
    sqlc.arg(link)::varchar
  else
    link
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveNotification :exec
delete from "crm"."notifications"
where id = @id::uuid;

