-- name: WmsPaginateInventoryStock :many
select
  sqlc.embed(inventory_stock),
  sqlc.embed(location),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."inventory_stock" as inventory_stock
  inner join "wms"."locations" as location on inventory_stock.location_id = location.id
  inner join "wms"."products" as product on inventory_stock.product_id = product.id
  left join "wms"."inventory_batches" as batch on inventory_stock.batch_id = batch.id
where
  (location.name ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or batch.batch_number ilike sqlc.narg(search)::text
  or inventory_stock.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindInventoryStock :one
select
  sqlc.embed(inventory_stock),
  sqlc.embed(location),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."inventory_stock" as inventory_stock
  inner join "wms"."locations" as location on inventory_stock.location_id = location.id
  inner join "wms"."products" as product on inventory_stock.product_id = product.id
  left join "wms"."inventory_batches" as batch on inventory_stock.batch_id = batch.id
where
  inventory_stock.id = sqlc.arg(id)::uuid;

-- name: WmsAnyInventoryStock :many
select
  sqlc.embed(inventory_stock),
  sqlc.embed(location),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."inventory_stock" as inventory_stock
  inner join "wms"."locations" as location on inventory_stock.location_id = location.id
  inner join "wms"."products" as product on inventory_stock.product_id = product.id
  left join "wms"."inventory_batches" as batch on inventory_stock.batch_id = batch.id
where
  inventory_stock.id = any (@ids::uuid[]);

-- name: WmsRangeInventoryStock :many
select
  sqlc.embed(inventory_stock),
  sqlc.embed(location),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."inventory_stock" as inventory_stock
  inner join "wms"."locations" as location on inventory_stock.location_id = location.id
  inner join "wms"."products" as product on inventory_stock.product_id = product.id
  left join "wms"."inventory_batches" as batch on inventory_stock.batch_id = batch.id
where
  inventory_stock.created_at >= @dateFrom::date
  and inventory_stock.created_at <= @dateTo::date
  and (location.name ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or batch.batch_number ilike sqlc.narg(search)::text
  or inventory_stock.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: WmsInsertInventoryStock :one
insert into "wms"."inventory_stock"(location_id, product_id, batch_id, quantity, reserved_quantity, status, last_counted_at, last_movement_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: WmsUpdateInventoryStock :one
update
  "wms"."inventory_stock"
set
  updated_at = now(),
  location_id = case when sqlc.arg(set_location_id)::boolean then
    sqlc.arg(location_id)::uuid
  else
    location_id
  end,
  product_id = case when sqlc.arg(set_product_id)::boolean then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  batch_id = case when sqlc.arg(set_batch_id)::boolean then
    sqlc.arg(batch_id)::uuid
  else
    batch_id
  end,
  quantity = case when sqlc.arg(set_quantity)::boolean then
    sqlc.arg(quantity)::integer
  else
    quantity
  end,
  reserved_quantity = case when sqlc.arg(set_reserved_quantity)::boolean then
    sqlc.arg(reserved_quantity)::integer
  else
    reserved_quantity
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::wms.inventory_stock_status_enum
  else
    status
  end,
  last_counted_at = case when sqlc.arg(set_last_counted_at)::boolean then
    sqlc.arg(last_counted_at)::timestamp
  else
    last_counted_at
  end,
  last_movement_at = case when sqlc.arg(set_last_movement_at)::boolean then
    sqlc.arg(last_movement_at)::timestamp
  else
    last_movement_at
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveInventoryStock :exec
delete from "wms"."inventory_stock"
where id = @id::uuid;
