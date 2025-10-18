-- name: WmsPaginateTask :many
select
  sqlc.embed(tasks),
  sqlc.embed(warehouse),
  sqlc.embed(users),
  sqlc.embed(pick_batch)
from
  "wms"."tasks_view" as tasks
  inner join "wms"."warehouses" as warehouse on tasks.warehouse_id = warehouse.id
  left join "public"."user" as users on tasks.user_id = users.id
  left join "wms"."pick_batches" as pick_batch on tasks.pick_batch_id = pick_batch.id
where (tasks.task_number ilike sqlc.narg(search)::text
  or warehouse.name ilike sqlc.narg(search)::text
  or users.name ilike sqlc.narg(search)::text
  or tasks.type::text ilike sqlc.narg(search)::text
  or tasks.status::text ilike sqlc.narg(search)::text
  or pick_batch.batch_number ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindTask :one
select
  sqlc.embed(tasks),
  sqlc.embed(warehouse),
  sqlc.embed(users),
  sqlc.embed(pick_batch)
from
  "wms"."tasks_view" as tasks
  inner join "wms"."warehouses" as warehouse on tasks.warehouse_id = warehouse.id
  left join "public"."user" as users on tasks.user_id = users.id
  left join "wms"."pick_batches" as pick_batch on tasks.pick_batch_id = pick_batch.id
where
  tasks.id = sqlc.arg(id)::uuid;

-- name: WmsAnyTask :many
select
  sqlc.embed(tasks),
  sqlc.embed(warehouse),
  sqlc.embed(users),
  sqlc.embed(pick_batch)
from
  "wms"."tasks_view" as tasks
  inner join "wms"."warehouses" as warehouse on tasks.warehouse_id = warehouse.id
  left join "public"."user" as users on tasks.user_id = users.id
  left join "wms"."pick_batches" as pick_batch on tasks.pick_batch_id = pick_batch.id
where
  tasks.id = any (@ids::uuid[]);

-- name: WmsRangeTask :many
select
  sqlc.embed(tasks),
  sqlc.embed(warehouse),
  sqlc.embed(users),
  sqlc.embed(pick_batch)
from
  "wms"."tasks_view" as tasks
  inner join "wms"."warehouses" as warehouse on tasks.warehouse_id = warehouse.id
  left join "public"."user" as users on tasks.user_id = users.id
  left join "wms"."pick_batches" as pick_batch on tasks.pick_batch_id = pick_batch.id
where
  tasks.created_at >= @dateFrom::date
  and tasks.created_at <= @dateTo::date
  and (tasks.task_number ilike sqlc.narg(search)::text
    or warehouse.name ilike sqlc.narg(search)::text
    or users.name ilike sqlc.narg(search)::text
    or tasks.type::text ilike sqlc.narg(search)::text
    or tasks.status::text ilike sqlc.narg(search)::text
    or pick_batch.batch_number ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertTask :one
insert into "wms"."tasks"(task_number, warehouse_id, user_id, type, status, priority, source_entity_id, source_entity_type, pick_batch_id, estimated_duration, actual_duration, instructions, notes, start_time, end_time)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
returning
  *;

-- name: WmsUpdateTask :one
update
  "wms"."tasks"
set
  updated_at = now(),
  task_number = case when sqlc.arg(task_number) is not null then
    sqlc.arg(task_number)::varchar
  else
    task_number
  end,
  warehouse_id = case when sqlc.arg(warehouse_id) is not null then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  user_id = case when sqlc.arg(user_id) is not null then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::wms.task_type_enum
  else
    type
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.task_status_enum
  else
    status
  end,
  priority = case when sqlc.arg(priority) is not null then
    sqlc.arg(priority)::integer
  else
    priority
  end,
  source_entity_id = case when sqlc.arg(source_entity_id) is not null then
    sqlc.arg(source_entity_id)::uuid
  else
    source_entity_id
  end,
  source_entity_type = case when sqlc.arg(source_entity_type) is not null then
    sqlc.arg(source_entity_type)::varchar
  else
    source_entity_type
  end,
  pick_batch_id = case when sqlc.arg(pick_batch_id) is not null then
    sqlc.arg(pick_batch_id)::uuid
  else
    pick_batch_id
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
  instructions = case when sqlc.arg(instructions) is not null then
    sqlc.arg(instructions)::text
  else
    instructions
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
  end,
  start_time = case when sqlc.arg(start_time) is not null then
    sqlc.arg(start_time)::timestamp
  else
    start_time
  end,
  end_time = case when sqlc.arg(end_time) is not null then
    sqlc.arg(end_time)::timestamp
  else
    end_time
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveTask :exec
delete from "wms"."tasks"
where id = @id::uuid;

