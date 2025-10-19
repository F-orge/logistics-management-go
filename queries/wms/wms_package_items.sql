-- name: WmsPaginatePackageItem :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(package_items),
  sqlc.embed(package),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."package_items" as package_items
  inner join "wms"."packages" as package on package_items.package_id = package.id
  inner join "wms"."products" as product on package_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on package_items.batch_id = batch.id
where (package.package_number ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindPackageItem :one
select
  sqlc.embed(package_items),
  sqlc.embed(package),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."package_items" as package_items
  inner join "wms"."packages" as package on package_items.package_id = package.id
  inner join "wms"."products" as product on package_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on package_items.batch_id = batch.id
where
  package_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnyPackageItem :many
select
  sqlc.embed(package_items),
  sqlc.embed(package),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."package_items" as package_items
  inner join "wms"."packages" as package on package_items.package_id = package.id
  inner join "wms"."products" as product on package_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on package_items.batch_id = batch.id
where
  package_items.id = any (@ids::uuid[]);

-- name: WmsRangePackageItem :many
select
  sqlc.embed(package_items),
  sqlc.embed(package),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."package_items" as package_items
  inner join "wms"."packages" as package on package_items.package_id = package.id
  inner join "wms"."products" as product on package_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on package_items.batch_id = batch.id
where
  package_items.created_at >= @dateFrom::date
  and package_items.created_at <= @dateTo::date
  and (package.package_number ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertPackageItem :one
insert into "wms"."package_items"(package_id, product_id, batch_id, quantity, lot_number, serial_numbers, expiry_date, unit_weight)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: WmsUpdatePackageItem :one
update
  "wms"."package_items"
set
  updated_at = now(),
  package_id = case when sqlc.arg(package_id) is not null then
    sqlc.arg(package_id)::uuid
  else
    package_id
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
  quantity = case when sqlc.arg(quantity) is not null then
    sqlc.arg(quantity)::integer
  else
    quantity
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
  unit_weight = case when sqlc.arg(unit_weight) is not null then
    sqlc.arg(unit_weight)::real
  else
    unit_weight
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemovePackageItem :exec
delete from "wms"."package_items"
where id = @id::uuid;

