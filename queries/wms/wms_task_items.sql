-- name: WmsPaginateTaskItem :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(task_items),
  sqlc.embed(task),
  sqlc.embed(product),
  sqlc.embed(batch),
  sqlc.embed(source_location),
  sqlc.embed(destination_location)
from
  "wms"."task_items" as task_items
  inner join "wms"."tasks" as task on task_items.task_id = task.id
  inner join "wms"."products" as product on task_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on task_items.batch_id = batch.id
  left join "wms"."locations" as source_location on task_items.source_location_id = source_location.id
  left join "wms"."locations" as destination_location on task_items.destination_location_id = destination_location.id
where (task.task_number ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or batch.batch_number ilike sqlc.narg(search)::text
  or source_location.name ilike sqlc.narg(search)::text
  or destination_location.name ilike sqlc.narg(search)::text
  or task_items.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindTaskItem :one
select
  sqlc.embed(task_items),
  sqlc.embed(task),
  sqlc.embed(product),
  sqlc.embed(batch),
  sqlc.embed(source_location),
  sqlc.embed(destination_location)
from
  "wms"."task_items" as task_items
  inner join "wms"."tasks" as task on task_items.task_id = task.id
  inner join "wms"."products" as product on task_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on task_items.batch_id = batch.id
  left join "wms"."locations" as source_location on task_items.source_location_id = source_location.id
  left join "wms"."locations" as destination_location on task_items.destination_location_id = destination_location.id
where
  task_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnyTaskItem :many
select
  sqlc.embed(task_items),
  sqlc.embed(task),
  sqlc.embed(product),
  sqlc.embed(batch),
  sqlc.embed(source_location),
  sqlc.embed(destination_location)
from
  "wms"."task_items" as task_items
  inner join "wms"."tasks" as task on task_items.task_id = task.id
  inner join "wms"."products" as product on task_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on task_items.batch_id = batch.id
  left join "wms"."locations" as source_location on task_items.source_location_id = source_location.id
  left join "wms"."locations" as destination_location on task_items.destination_location_id = destination_location.id
where
  task_items.id = any (@ids::uuid[]);

-- name: WmsRangeTaskItem :many
select
  sqlc.embed(task_items),
  sqlc.embed(task),
  sqlc.embed(product),
  sqlc.embed(batch),
  sqlc.embed(source_location),
  sqlc.embed(destination_location)
from
  "wms"."task_items" as task_items
  inner join "wms"."tasks" as task on task_items.task_id = task.id
  inner join "wms"."products" as product on task_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on task_items.batch_id = batch.id
  left join "wms"."locations" as source_location on task_items.source_location_id = source_location.id
  left join "wms"."locations" as destination_location on task_items.destination_location_id = destination_location.id
where
  task_items.created_at >= @dateFrom::date
  and task_items.created_at <= @dateTo::date
  and (task.task_number ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or batch.batch_number ilike sqlc.narg(search)::text
    or source_location.name ilike sqlc.narg(search)::text
    or destination_location.name ilike sqlc.narg(search)::text
    or task_items.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertTaskItem :one
insert into "wms"."task_items"(task_id, product_id, batch_id, source_location_id, destination_location_id, quantity_required, quantity_completed, status, lot_number, serial_numbers, expiry_date, notes, completed_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning
  *;

-- name: WmsUpdateTaskItem :one
update
  "wms"."task_items"
set
  updated_at = now(),
  task_id = case when sqlc.arg(task_id) is not null then
    sqlc.arg(task_id)::uuid
  else
    task_id
  end,
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  batch_id = case when sqlc.arg(batch_id) is not null then
    sqlc.arg(batch_id)::uuid
  else
    batch_id
  end,
  source_location_id = case when sqlc.arg(source_location_id) is not null then
    sqlc.arg(source_location_id)::uuid
  else
    source_location_id
  end,
  destination_location_id = case when sqlc.arg(destination_location_id) is not null then
    sqlc.arg(destination_location_id)::uuid
  else
    destination_location_id
  end,
  quantity_required = case when sqlc.arg(quantity_required) is not null then
    sqlc.arg(quantity_required)::integer
  else
    quantity_required
  end,
  quantity_completed = case when sqlc.arg(quantity_completed) is not null then
    sqlc.arg(quantity_completed)::integer
  else
    quantity_completed
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.task_item_status_enum
  else
    status
  end,
  lot_number = case when sqlc.arg(lot_number) is not null then
    sqlc.arg(lot_number)::varchar
  else
    lot_number
  end,
  serial_numbers = case when sqlc.arg(serial_numbers) is not null then
    sqlc.arg(serial_numbers)::text[]
  else
    serial_numbers
  end,
  expiry_date = case when sqlc.arg(expiry_date) is not null then
    sqlc.arg(expiry_date)::date
  else
    expiry_date
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
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

-- name: WmsRemoveTaskItem :exec
delete from "wms"."task_items"
where id = @id::uuid;

