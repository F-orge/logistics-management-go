-- name: WmsPaginateReorderPoint :many
select
  sqlc.embed(reorder_points),
  sqlc.embed(product)
from
  "wms"."reorder_points" as reorder_points
  inner join "wms"."products" as product on reorder_points.product_id = product.id
where
  (product.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindReorderPoint :one
select
  sqlc.embed(reorder_points),
  sqlc.embed(product)
from
  "wms"."reorder_points" as reorder_points
  inner join "wms"."products" as product on reorder_points.product_id = product.id
where
  reorder_points.id = sqlc.arg(id)::uuid;

-- name: WmsAnyReorderPoint :many
select
  sqlc.embed(reorder_points),
  sqlc.embed(product)
from
  "wms"."reorder_points" as reorder_points
  inner join "wms"."products" as product on reorder_points.product_id = product.id
where
  reorder_points.id = any (@ids::uuid[]);

-- name: WmsRangeReorderPoint :many
select
  sqlc.embed(reorder_points),
  sqlc.embed(product)
from
  "wms"."reorder_points" as reorder_points
  inner join "wms"."products" as product on reorder_points.product_id = product.id
where
  reorder_points.created_at >= @dateFrom::date
  and reorder_points.created_at <= @dateTo::date
  and (product.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: WmsInsertReorderPoint :one
insert into "wms"."reorder_points"(product_id, warehouse_id, threshold)
  values ($1, $2, $3)
returning
  *;

-- name: WmsUpdateReorderPoint :one
update
  "wms"."reorder_points"
set
  product_id = case when sqlc.arg(set_product_id)::boolean then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  warehouse_id = case when sqlc.arg(set_warehouse_id)::boolean then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  threshold = case when sqlc.arg(set_threshold)::boolean then
    sqlc.arg(threshold)::integer
  else
    threshold
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveReorderPoint :exec
delete from "wms"."reorder_points"
where id = @id::uuid;

