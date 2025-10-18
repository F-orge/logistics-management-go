-- name: WmsPaginatePickBatchItem :many
select
  sqlc.embed(pick_batch_items),
  sqlc.embed(pick_batch),
  sqlc.embed(sales_order)
from
  "wms"."pick_batch_items" as pick_batch_items
  inner join "wms"."pick_batches" as pick_batch on pick_batch_items.pick_batch_id = pick_batch.id
  inner join "wms"."sales_orders" as sales_order on pick_batch_items.sales_order_id = sales_order.id
where (pick_batch.batch_number ilike sqlc.narg(search)::text
  or sales_order.order_number ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindPickBatchItem :one
select
  sqlc.embed(pick_batch_items),
  sqlc.embed(pick_batch),
  sqlc.embed(sales_order)
from
  "wms"."pick_batch_items" as pick_batch_items
  inner join "wms"."pick_batches" as pick_batch on pick_batch_items.pick_batch_id = pick_batch.id
  inner join "wms"."sales_orders" as sales_order on pick_batch_items.sales_order_id = sales_order.id
where
  pick_batch_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnyPickBatchItem :many
select
  sqlc.embed(pick_batch_items),
  sqlc.embed(pick_batch),
  sqlc.embed(sales_order)
from
  "wms"."pick_batch_items" as pick_batch_items
  inner join "wms"."pick_batches" as pick_batch on pick_batch_items.pick_batch_id = pick_batch.id
  inner join "wms"."sales_orders" as sales_order on pick_batch_items.sales_order_id = sales_order.id
where
  pick_batch_items.id = any (@ids::uuid[]);

-- name: WmsRangePickBatchItem :many
select
  sqlc.embed(pick_batch_items),
  sqlc.embed(pick_batch),
  sqlc.embed(sales_order)
from
  "wms"."pick_batch_items" as pick_batch_items
  inner join "wms"."pick_batches" as pick_batch on pick_batch_items.pick_batch_id = pick_batch.id
  inner join "wms"."sales_orders" as sales_order on pick_batch_items.sales_order_id = sales_order.id
where
  pick_batch_items.created_at >= @dateFrom::date
  and pick_batch_items.created_at <= @dateTo::date
  and (pick_batch.batch_number ilike sqlc.narg(search)::text
    or sales_order.order_number ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertPickBatchItem :one
insert into "wms"."pick_batch_items"(pick_batch_id, sales_order_id, order_priority, estimated_pick_time, actual_pick_time)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdatePickBatchItem :one
update
  "wms"."pick_batch_items"
set
  updated_at = now(),
  pick_batch_id = case when sqlc.arg(pick_batch_id) is not null then
    sqlc.arg(pick_batch_id)::uuid
  else
    pick_batch_id
  end,
  sales_order_id = case when sqlc.arg(sales_order_id) is not null then
    sqlc.arg(sales_order_id)::uuid
  else
    sales_order_id
  end,
  order_priority = case when sqlc.arg(order_priority) is not null then
    sqlc.arg(order_priority)::integer
  else
    order_priority
  end,
  estimated_pick_time = case when sqlc.arg(estimated_pick_time) is not null then
    sqlc.arg(estimated_pick_time)::integer
  else
    estimated_pick_time
  end,
  actual_pick_time = case when sqlc.arg(actual_pick_time) is not null then
    sqlc.arg(actual_pick_time)::integer
  else
    actual_pick_time
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemovePickBatchItem :exec
delete from "wms"."pick_batch_items"
where id = @id::uuid;

