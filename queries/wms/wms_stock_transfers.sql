-- name: WmsPaginateStockTransferMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "wms"."stock_transfers" as stock_transfers;

-- name: WmsPaginateStockTransfer :many
select
  stock_transfers.*,
  sqlc.embed(product)
from
  "wms"."stock_transfers" as stock_transfers
  inner join "wms"."products" as product on stock_transfers.product_id = product.id
where (product.name ilike sqlc.narg(search)::text
  or stock_transfers.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindStockTransfer :one
select
  stock_transfers.*,
  sqlc.embed(product)
from
  "wms"."stock_transfers" as stock_transfers
  inner join "wms"."products" as product on stock_transfers.product_id = product.id
where
  stock_transfers.id = sqlc.arg(id)::uuid;

-- name: WmsAnyStockTransfer :many
select
  stock_transfers.*,
  sqlc.embed(product)
from
  "wms"."stock_transfers" as stock_transfers
  inner join "wms"."products" as product on stock_transfers.product_id = product.id
where
  stock_transfers.id = any (@ids::uuid[]);

-- name: WmsRangeStockTransfer :many
select
  stock_transfers.*,
  sqlc.embed(product)
from
  "wms"."stock_transfers" as stock_transfers
  inner join "wms"."products" as product on stock_transfers.product_id = product.id
where
  stock_transfers.created_at >= @dateFrom::date
  and stock_transfers.created_at <= @dateTo::date
  and (product.name ilike sqlc.narg(search)::text
    or stock_transfers.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertStockTransfer :one
insert into "wms"."stock_transfers"(product_id, source_warehouse_id, destination_warehouse_id, quantity, status)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateStockTransfer :one
update
  "wms"."stock_transfers"
set
  updated_at = now(),
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  source_warehouse_id = case when sqlc.arg(source_warehouse_id) is not null then
    sqlc.arg(source_warehouse_id)::uuid
  else
    source_warehouse_id
  end,
  destination_warehouse_id = case when sqlc.arg(destination_warehouse_id) is not null then
    sqlc.arg(destination_warehouse_id)::uuid
  else
    destination_warehouse_id
  end,
  quantity = case when sqlc.arg(quantity) is not null then
    sqlc.arg(quantity)::integer
  else
    quantity
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.stock_transfer_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveStockTransfer :exec
delete from "wms"."stock_transfers"
where id = @id::uuid;

