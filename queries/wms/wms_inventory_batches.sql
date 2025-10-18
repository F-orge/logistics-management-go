-- name: WmsPaginateInventoryBatch :many
select
  sqlc.embed(inventory_batches),
  sqlc.embed(product)
from
  "wms"."inventory_batches" as inventory_batches
  inner join "wms"."products" as product on inventory_batches.product_id = product.id
where (product.name ilike sqlc.narg(search)::text
  or inventory_batches.batch_number ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindInventoryBatch :one
select
  sqlc.embed(inventory_batches),
  sqlc.embed(product)
from
  "wms"."inventory_batches" as inventory_batches
  inner join "wms"."products" as product on inventory_batches.product_id = product.id
where
  inventory_batches.id = sqlc.arg(id)::uuid;

-- name: WmsAnyInventoryBatch :many
select
  sqlc.embed(inventory_batches),
  sqlc.embed(product)
from
  "wms"."inventory_batches" as inventory_batches
  inner join "wms"."products" as product on inventory_batches.product_id = product.id
where
  inventory_batches.id = any (@ids::uuid[]);

-- name: WmsRangeInventoryBatch :many
select
  sqlc.embed(inventory_batches),
  sqlc.embed(product)
from
  "wms"."inventory_batches" as inventory_batches
  inner join "wms"."products" as product on inventory_batches.product_id = product.id
where
  inventory_batches.created_at >= @dateFrom::date
  and inventory_batches.created_at <= @dateTo::date
  and (product.name ilike sqlc.narg(search)::text
    or inventory_batches.batch_number ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertInventoryBatch :one
insert into "wms"."inventory_batches"(product_id, batch_number, expiration_date)
  values ($1, $2, $3)
returning
  *;

-- name: WmsUpdateInventoryBatch :one
update
  "wms"."inventory_batches"
set
  updated_at = now(),
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  batch_number = case when sqlc.arg(batch_number) is not null then
    sqlc.arg(batch_number)::varchar
  else
    batch_number
  end,
  expiration_date = case when sqlc.arg(expiration_date) is not null then
    sqlc.arg(expiration_date)::date
  else
    expiration_date
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveInventoryBatch :exec
delete from "wms"."inventory_batches"
where id = @id::uuid;

