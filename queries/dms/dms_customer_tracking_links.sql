-- name: DmsPaginateCustomerTrackingLink :many
select
  sqlc.embed(customer_tracking_links),
  sqlc.embed(delivery_task)
from
  "dms"."customer_tracking_links" as customer_tracking_links
  inner join "dms"."delivery_tasks" as delivery_task on customer_tracking_links.delivery_task_id = delivery_task.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

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
  and customer_tracking_links.created_at <= @dateTo::date;

-- name: DmsInsertCustomerTrackingLink :one
insert into "dms"."customer_tracking_links"(delivery_task_id, tracking_token, is_active, access_count, last_accessed_at, expires_at)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: DmsUpdateCustomerTrackingLink :one
update
  "dms"."customer_tracking_links"
set
  delivery_task_id = case when sqlc.arg(set_delivery_task_id)::boolean then
    sqlc.arg(delivery_task_id)::uuid
  else
    delivery_task_id
  end,
  tracking_token = case when sqlc.arg(set_tracking_token)::boolean then
    sqlc.arg(tracking_token)::varchar
  else
    tracking_token
  end,
  is_active = case when sqlc.arg(set_is_active)::boolean then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end,
  access_count = case when sqlc.arg(set_access_count)::boolean then
    sqlc.arg(access_count)::integer
  else
    access_count
  end,
  last_accessed_at = case when sqlc.arg(set_last_accessed_at)::boolean then
    sqlc.arg(last_accessed_at)::timestamp
  else
    last_accessed_at
  end,
  expires_at = case when sqlc.arg(set_expires_at)::boolean then
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
