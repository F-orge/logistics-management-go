-- name: WmsPaginatePickBatch :many
select
  sqlc.embed(pick_batches),
  sqlc.embed(warehouse),
  sqlc.embed(assigned_user)
from
  "wms"."pick_batches" as pick_batches
  inner join "wms"."warehouses" as warehouse on pick_batches.warehouse_id = warehouse.id
  left join "public"."user" as assigned_user on pick_batches.assigned_user_id = assigned_user.id
where (warehouse.name ilike sqlc.narg(search)::text
  or pick_batches.batch_number ilike sqlc.narg(search)::text
  or pick_batches.status::text ilike sqlc.narg(search)::text
  or assigned_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindPickBatch :one
select
  sqlc.embed(pick_batches),
  sqlc.embed(warehouse),
  sqlc.embed(assigned_user)
from
  "wms"."pick_batches" as pick_batches
  inner join "wms"."warehouses" as warehouse on pick_batches.warehouse_id = warehouse.id
  left join "public"."user" as assigned_user on pick_batches.assigned_user_id = assigned_user.id
where
  pick_batches.id = sqlc.arg(id)::uuid;

-- name: WmsAnyPickBatch :many
select
  sqlc.embed(pick_batches),
  sqlc.embed(warehouse),
  sqlc.embed(assigned_user)
from
  "wms"."pick_batches" as pick_batches
  inner join "wms"."warehouses" as warehouse on pick_batches.warehouse_id = warehouse.id
  left join "public"."user" as assigned_user on pick_batches.assigned_user_id = assigned_user.id
where
  pick_batches.id = any (@ids::uuid[]);

-- name: WmsRangePickBatch :many
select
  sqlc.embed(pick_batches),
  sqlc.embed(warehouse),
  sqlc.embed(assigned_user)
from
  "wms"."pick_batches" as pick_batches
  inner join "wms"."warehouses" as warehouse on pick_batches.warehouse_id = warehouse.id
  left join "public"."user" as assigned_user on pick_batches.assigned_user_id = assigned_user.id
where
  pick_batches.created_at >= @dateFrom::date
  and pick_batches.created_at <= @dateTo::date
  and (warehouse.name ilike sqlc.narg(search)::text
    or pick_batches.batch_number ilike sqlc.narg(search)::text
    or pick_batches.status::text ilike sqlc.narg(search)::text
    or assigned_user.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertPickBatch :one
insert into "wms"."pick_batches"(batch_number, warehouse_id, status, strategy, priority, assigned_user_id, wave_id, zone_restrictions, estimated_duration, actual_duration, total_items, completed_items, started_at, completed_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning
  *;

-- name: WmsUpdatePickBatch :one
update
  "wms"."pick_batches"
set
  updated_at = now(),
  batch_number = case when sqlc.arg(batch_number) is not null then
    sqlc.arg(batch_number)::varchar
  else
    batch_number
  end,
  warehouse_id = case when sqlc.arg(warehouse_id) is not null then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.pick_batch_status_enum
  else
    status
  end,
  strategy = case when sqlc.arg(strategy) is not null then
    sqlc.arg(strategy)::wms.pick_strategy_enum
  else
    strategy
  end,
  priority = case when sqlc.arg(priority) is not null then
    sqlc.arg(priority)::integer
  else
    priority
  end,
  assigned_user_id = case when sqlc.arg(assigned_user_id) is not null then
    sqlc.arg(assigned_user_id)::text
  else
    assigned_user_id
  end,
  wave_id = case when sqlc.arg(wave_id) is not null then
    sqlc.arg(wave_id)::varchar
  else
    wave_id
  end,
  zone_restrictions = case when sqlc.arg(zone_restrictions) is not null then
    sqlc.arg(zone_restrictions)::text[]
  else
    zone_restrictions
  end,
  estimated_duration = case when sqlc.arg(estimated_duration) is not null then
    sqlc.arg(estimated_duration)::integer
  else
    estimated_duration
  end,
  actual_duration = case when sqlc.arg(actual_duration) is not null then
    sqlc.arg(actual_duration)::integer
  else
    actual_duration
  end,
  total_items = case when sqlc.arg(total_items) is not null then
    sqlc.arg(total_items)::integer
  else
    total_items
  end,
  completed_items = case when sqlc.arg(completed_items) is not null then
    sqlc.arg(completed_items)::integer
  else
    completed_items
  end,
  started_at = case when sqlc.arg(started_at) is not null then
    sqlc.arg(started_at)::timestamp
  else
    started_at
  end,
  completed_at = case when sqlc.arg(completed_at) is not null then
    sqlc.arg(completed_at)::timestamp
  else
    completed_at
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemovePickBatch :exec
delete from "wms"."pick_batches"
where id = @id::uuid;

