-- name: WmsPaginateProduct :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(products),
  sqlc.embed(supplier),
  sqlc.embed(client)
from
  "wms"."products_view" as products
  left join "wms"."suppliers" as supplier on products.supplier_id = supplier.id
  left join "crm"."companies" as client on products.client_id = client.id
where (products.name ilike sqlc.narg(search)::text
  or products.sku ilike sqlc.narg(search)::text
  or products.barcode ilike sqlc.narg(search)::text
  or products.status::text ilike sqlc.narg(search)::text
  or supplier.name ilike sqlc.narg(search)::text
  or client.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindProduct :one
select
  sqlc.embed(products),
  sqlc.embed(supplier),
  sqlc.embed(client)
from
  "wms"."products_view" as products
  left join "wms"."suppliers" as supplier on products.supplier_id = supplier.id
  left join "crm"."companies" as client on products.client_id = client.id
where
  products.id = sqlc.arg(id)::uuid;

-- name: WmsAnyProduct :many
select
  sqlc.embed(products),
  sqlc.embed(supplier),
  sqlc.embed(client)
from
  "wms"."products_view" as products
  left join "wms"."suppliers" as supplier on products.supplier_id = supplier.id
  left join "crm"."companies" as client on products.client_id = client.id
where
  products.id = any (@ids::uuid[]);

-- name: WmsRangeProduct :many
select
  sqlc.embed(products),
  sqlc.embed(supplier),
  sqlc.embed(client)
from
  "wms"."products_view" as products
  left join "wms"."suppliers" as supplier on products.supplier_id = supplier.id
  left join "crm"."companies" as client on products.client_id = client.id
where
  products.created_at >= @dateFrom::date
  and products.created_at <= @dateTo::date
  and (products.name ilike sqlc.narg(search)::text
    or products.sku ilike sqlc.narg(search)::text
    or products.barcode ilike sqlc.narg(search)::text
    or products.status::text ilike sqlc.narg(search)::text
    or supplier.name ilike sqlc.narg(search)::text
    or client.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertProduct :one
insert into "wms"."products"(name, sku, barcode, description, cost_price, length, width, height, weight, status, supplier_id, client_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
returning
  *;

-- name: WmsUpdateProduct :one
update
  "wms"."products"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::varchar
  else
    name
  end,
  sku = case when sqlc.arg(sku) is not null then
    sqlc.arg(sku)::varchar
  else
    sku
  end,
  barcode = case when sqlc.arg(barcode) is not null then
    sqlc.arg(barcode)::varchar
  else
    barcode
  end,
  description = case when sqlc.arg(description) is not null then
    sqlc.arg(description)::text
  else
    description
  end,
  cost_price = case when sqlc.arg(cost_price) is not null then
    sqlc.arg(cost_price)::numeric
  else
    cost_price
  end,
  length = case when sqlc.arg(length) is not null then
    sqlc.arg(length)::real
  else
    length
  end,
  width = case when sqlc.arg(width) is not null then
    sqlc.arg(width)::real
  else
    width
  end,
  height = case when sqlc.arg(height) is not null then
    sqlc.arg(height)::real
  else
    height
  end,
  weight = case when sqlc.arg(weight) is not null then
    sqlc.arg(weight)::real
  else
    weight
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.product_status_enum
  else
    status
  end,
  supplier_id = case when sqlc.arg(supplier_id) is not null then
    sqlc.arg(supplier_id)::uuid
  else
    supplier_id
  end,
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveProduct :exec
delete from "wms"."products"
where id = @id::uuid;

