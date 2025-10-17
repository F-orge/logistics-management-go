-- name: CrmPaginateNotification :many
select
  sqlc.embed(notifications),
  sqlc.embed(users)
from
  "crm"."notifications" as notifications
  inner join "public"."user" as users on notifications.user_id = users.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

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
  and notifications.created_at <= @dateTo::date;

-- name: CrmInsertNotification :one
insert into "crm"."notifications"(user_id, message, is_read, link)
  values ($1, $2, $3, $4)
returning
  *;

-- name: CrmUpdateNotification :one
update
  "crm"."notifications"
set
  user_id = case when sqlc.arg(set_user_id)::boolean then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  message = case when sqlc.arg(set_message)::boolean then
    sqlc.arg(message)::text
  else
    message
  end,
  is_read = case when sqlc.arg(set_is_read)::boolean then
    sqlc.arg(is_read)::boolean
  else
    is_read
  end,
  link = case when sqlc.arg(set_link)::boolean then
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

