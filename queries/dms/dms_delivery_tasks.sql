-- name: DmsPaginateDeliveryTask :many
select
  sqlc.embed(delivery_tasks),
  sqlc.embed(delivery_route)
from
  "dms"."delivery_tasks_view" as delivery_tasks
  inner join "dms"."delivery_routes_view" as delivery_route on delivery_tasks.delivery_route_id = delivery_route.id
  -- Assuming wms.packages is in a different schema and cannot be joined directly for sqlc.embed
where (delivery_tasks.recipient_name ilike sqlc.narg(search)::text
  or delivery_tasks.delivery_address ilike sqlc.narg(search)::text
  or delivery_tasks.status::text ilike sqlc.narg(search)::text
  or delivery_route.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: DmsFindDeliveryTask :one
select
  sqlc.embed(delivery_tasks),
  sqlc.embed(delivery_route)
from
  "dms"."delivery_tasks_view" as delivery_tasks
  inner join "dms"."delivery_routes" as delivery_route on delivery_tasks.delivery_route_id = delivery_route.id
where
  delivery_tasks.id = sqlc.arg(id)::uuid;

-- name: DmsAnyDeliveryTask :many
select
  sqlc.embed(delivery_tasks),
  sqlc.embed(delivery_route)
from
  "dms"."delivery_tasks_view" as delivery_tasks
  inner join "dms"."delivery_routes" as delivery_route on delivery_tasks.delivery_route_id = delivery_route.id
where
  delivery_tasks.id = any (@ids::uuid[]);

-- name: DmsRangeDeliveryTask :many
select
  sqlc.embed(delivery_tasks),
  sqlc.embed(delivery_route)
from
  "dms"."delivery_tasks_view" as delivery_tasks
  inner join "dms"."delivery_routes" as delivery_route on delivery_tasks.delivery_route_id = delivery_route.id
where
  delivery_tasks.created_at >= @dateFrom::date
  and delivery_tasks.created_at <= @dateTo::date
  and (delivery_tasks.recipient_name ilike sqlc.narg(search)::text
    or delivery_tasks.delivery_address ilike sqlc.narg(search)::text
    or delivery_tasks.status::text ilike sqlc.narg(search)::text
    or delivery_route.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: DmsInsertDeliveryTask :one
insert into "dms"."delivery_tasks"(package_id, delivery_route_id, route_sequence, delivery_address, recipient_name, recipient_phone, delivery_instructions, estimated_arrival_time, actual_arrival_time, delivery_time, status, failure_reason, attempt_count)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning
  *;

-- name: DmsUpdateDeliveryTask :one
update
  "dms"."delivery_tasks"
set
  updated_at = now(),
  package_id = case when sqlc.arg(package_id) is not null then
    sqlc.arg(package_id)::uuid
  else
    package_id
  end,
  delivery_route_id = case when sqlc.arg(delivery_route_id) is not null then
    sqlc.arg(delivery_route_id)::uuid
  else
    delivery_route_id
  end,
  route_sequence = case when sqlc.arg(route_sequence) is not null then
    sqlc.arg(route_sequence)::integer
  else
    route_sequence
  end,
  delivery_address = case when sqlc.arg(delivery_address) is not null then
    sqlc.arg(delivery_address)::text
  else
    delivery_address
  end,
  recipient_name = case when sqlc.arg(recipient_name) is not null then
    sqlc.arg(recipient_name)::varchar
  else
    recipient_name
  end,
  recipient_phone = case when sqlc.arg(recipient_phone) is not null then
    sqlc.arg(recipient_phone)::varchar
  else
    recipient_phone
  end,
  delivery_instructions = case when sqlc.arg(delivery_instructions) is not null then
    sqlc.arg(delivery_instructions)::text
  else
    delivery_instructions
  end,
  estimated_arrival_time = case when sqlc.arg(estimated_arrival_time) is not null then
    sqlc.arg(estimated_arrival_time)::timestamp
  else
    estimated_arrival_time
  end,
  actual_arrival_time = case when sqlc.arg(actual_arrival_time) is not null then
    sqlc.arg(actual_arrival_time)::timestamp
  else
    actual_arrival_time
  end,
  delivery_time = case when sqlc.arg(delivery_time) is not null then
    sqlc.arg(delivery_time)::timestamp
  else
    delivery_time
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::dms.delivery_task_status_enum
  else
    status
  end,
  failure_reason = case when sqlc.arg(failure_reason) is not null then
    sqlc.arg(failure_reason)::dms.delivery_failure_reason_enum
  else
    failure_reason
  end,
  attempt_count = case when sqlc.arg(attempt_count) is not null then
    sqlc.arg(attempt_count)::integer
  else
    attempt_count
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: DmsRemoveDeliveryTask :exec
delete from "dms"."delivery_tasks"
where id = @id::uuid;

