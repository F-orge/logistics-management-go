-- name: DmsPaginateCustomerTrackingLink :many
select
  sqlc.embed(customer_tracking_links),
  sqlc.embed(delivery_task)
from
  "dms"."customer_tracking_links" as customer_tracking_links
  inner join "dms"."delivery_tasks" as delivery_task on customer_tracking_links.delivery_task_id = delivery_task.id
where (customer_tracking_links.tracking_token ilike sqlc.narg(search)::text
  or delivery_task.recipient_name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: DmsFindCustomerTrackingLink :one
select
  sqlc.embed(customer_tracking_links),
  sqlc.embed(delivery_task)
from
  "dms"."customer_tracking_links" as customer_tracking_links
  inner join "dms"."delivery_tasks" as delivery_task on customer_tracking_links.delivery_task_id = delivery_task.id
where
  customer_tracking_links.id = sqlc.arg(id)::uuid;

-- name: DmsAnyCustomerTrackingLink :many
select
  sqlc.embed(customer_tracking_links),
  sqlc.embed(delivery_task)
from
  "dms"."customer_tracking_links" as customer_tracking_links
  inner join "dms"."delivery_tasks" as delivery_task on customer_tracking_links.delivery_task_id = delivery_task.id
where
  customer_tracking_links.id = any (@ids::uuid[]);

-- name: DmsRangeCustomerTrackingLink :many
select
  sqlc.embed(customer_tracking_links),
  sqlc.embed(delivery_task)
from
  "dms"."customer_tracking_links" as customer_tracking_links
  inner join "dms"."delivery_tasks" as delivery_task on customer_tracking_links.delivery_task_id = delivery_task.id
where
  customer_tracking_links.created_at >= @dateFrom::date
  and customer_tracking_links.created_at <= @dateTo::date
  and (customer_tracking_links.tracking_token ilike sqlc.narg(search)::text
    or delivery_task.recipient_name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: DmsInsertCustomerTrackingLink :one
insert into "dms"."customer_tracking_links"(delivery_task_id, tracking_token, is_active, access_count, last_accessed_at, expires_at)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: DmsUpdateCustomerTrackingLink :one
update
  "dms"."customer_tracking_links"
set
  updated_at = now(),
  delivery_task_id = case when sqlc.arg(delivery_task_id) is not null then
    sqlc.arg(delivery_task_id)::uuid
  else
    delivery_task_id
  end,
  tracking_token = case when sqlc.arg(tracking_token) is not null then
    sqlc.arg(tracking_token)::varchar
  else
    tracking_token
  end,
  is_active = case when sqlc.arg(is_active) is not null then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end,
  access_count = case when sqlc.arg(access_count) is not null then
    sqlc.arg(access_count)::integer
  else
    access_count
  end,
  last_accessed_at = case when sqlc.arg(last_accessed_at) is not null then
    sqlc.arg(last_accessed_at)::timestamp
  else
    last_accessed_at
  end,
  expires_at = case when sqlc.arg(expires_at) is not null then
    sqlc.arg(expires_at)::timestamp
  else
    expires_at
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: DmsRemoveCustomerTrackingLink :exec
delete from "dms"."customer_tracking_links"
where id = @id::uuid;

