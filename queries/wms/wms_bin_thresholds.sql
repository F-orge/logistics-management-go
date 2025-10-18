-- name: WmsPaginateBinThreshold :many
select
  sqlc.embed(bin_thresholds),
  sqlc.embed(location),
  sqlc.embed(product)
from
  "wms"."bin_thresholds" as bin_thresholds
  inner join "wms"."locations" as location on bin_thresholds.location_id = location.id
  inner join "wms"."products" as product on bin_thresholds.product_id = product.id
where (location.name ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindBinThreshold :one
select
  sqlc.embed(bin_thresholds),
  sqlc.embed(location),
  sqlc.embed(product)
from
  "wms"."bin_thresholds" as bin_thresholds
  inner join "wms"."locations" as location on bin_thresholds.location_id = location.id
  inner join "wms"."products" as product on bin_thresholds.product_id = product.id
where
  bin_thresholds.id = sqlc.arg(id)::uuid;

-- name: WmsAnyBinThreshold :many
select
  sqlc.embed(bin_thresholds),
  sqlc.embed(location),
  sqlc.embed(product)
from
  "wms"."bin_thresholds" as bin_thresholds
  inner join "wms"."locations" as location on bin_thresholds.location_id = location.id
  inner join "wms"."products" as product on bin_thresholds.product_id = product.id
where
  bin_thresholds.id = any (@ids::uuid[]);

-- name: WmsRangeBinThreshold :many
select
  sqlc.embed(bin_thresholds),
  sqlc.embed(location),
  sqlc.embed(product)
from
  "wms"."bin_thresholds" as bin_thresholds
  inner join "wms"."locations" as location on bin_thresholds.location_id = location.id
  inner join "wms"."products" as product on bin_thresholds.product_id = product.id
where
  bin_thresholds.created_at >= @dateFrom::date
  and bin_thresholds.created_at <= @dateTo::date
  and (location.name ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertBinThreshold :one
insert into "wms"."bin_thresholds"(location_id, product_id, min_quantity, max_quantity, reorder_quantity, alert_threshold, is_active)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: WmsUpdateBinThreshold :one
update
  "wms"."bin_thresholds"
set
  updated_at = now(),
  location_id = case when sqlc.arg(location_id) is not null then
    sqlc.arg(location_id)::uuid
  else
    location_id
  end,
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  min_quantity = case when sqlc.arg(min_quantity) is not null then
    sqlc.arg(min_quantity)::integer
  else
    min_quantity
  end,
  max_quantity = case when sqlc.arg(max_quantity) is not null then
    sqlc.arg(max_quantity)::integer
  else
    max_quantity
  end,
  reorder_quantity = case when sqlc.arg(reorder_quantity) is not null then
    sqlc.arg(reorder_quantity)::integer
  else
    reorder_quantity
  end,
  alert_threshold = case when sqlc.arg(alert_threshold) is not null then
    sqlc.arg(alert_threshold)::integer
  else
    alert_threshold
  end,
  is_active = case when sqlc.arg(is_active) is not null then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveBinThreshold :exec
delete from "wms"."bin_thresholds"
where id = @id::uuid;

