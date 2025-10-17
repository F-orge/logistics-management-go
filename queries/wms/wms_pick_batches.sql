-- name: WmsPaginatePickBatch :many
select
  sqlc.embed(pick_batches),
  sqlc.embed(warehouse),
  sqlc.embed(assigned_user)
from
  "wms"."pick_batches" as pick_batches
  inner join "wms"."warehouses" as warehouse on pick_batches.warehouse_id = warehouse.id
  left join "public"."user" as assigned_user on pick_batches.assigned_user_id = assigned_user.id
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
  and pick_batches.created_at <= @dateTo::date;

-- name: WmsInsertPickBatch :one
insert into "wms"."pick_batches"(batch_number, warehouse_id, status, strategy, priority, assigned_user_id, wave_id, zone_restrictions, estimated_duration, actual_duration, total_items, completed_items, started_at, completed_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning
  *;

-- name: WmsUpdatePickBatch :one
update
  "wms"."pick_batches"
set
  batch_number = case when sqlc.arg(set_batch_number)::boolean then
    sqlc.arg(batch_number)::varchar
  else
    batch_number
  end,
  warehouse_id = case when sqlc.arg(set_warehouse_id)::boolean then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::wms.pick_batch_status_enum
  else
    status
  end,
  strategy = case when sqlc.arg(set_strategy)::boolean then
    sqlc.arg(strategy)::wms.pick_strategy_enum
  else
    strategy
  end,
  priority = case when sqlc.arg(set_priority)::boolean then
    sqlc.arg(priority)::integer
  else
    priority
  end,
  assigned_user_id = case when sqlc.arg(set_assigned_user_id)::boolean then
    sqlc.arg(assigned_user_id)::text
  else
    assigned_user_id
  end,
  wave_id = case when sqlc.arg(set_wave_id)::boolean then
    sqlc.arg(wave_id)::varchar
  else
    wave_id
  end,
  zone_restrictions = case when sqlc.arg(set_zone_restrictions)::boolean then
    sqlc.arg(zone_restrictions)::text[]
  else
    zone_restrictions
  end,
  estimated_duration = case when sqlc.arg(set_estimated_duration)::boolean then
    sqlc.arg(estimated_duration)::integer
  else
    estimated_duration
  end,
  actual_duration = case when sqlc.arg(set_actual_duration)::boolean then
    sqlc.arg(actual_duration)::integer
  else
    actual_duration
  end,
  total_items = case when sqlc.arg(set_total_items)::boolean then
    sqlc.arg(total_items)::integer
  else
    total_items
  end,
  completed_items = case when sqlc.arg(set_completed_items)::boolean then
    sqlc.arg(completed_items)::integer
  else
    completed_items
  end,
  started_at = case when sqlc.arg(set_started_at)::boolean then
    sqlc.arg(started_at)::timestamp
  else
    started_at
  end,
  completed_at = case when sqlc.arg(set_completed_at)::boolean then
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
