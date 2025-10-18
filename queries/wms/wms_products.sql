-- name: WmsPaginateProduct :many
select
  sqlc.embed(products),
  sqlc.embed(supplier),
  sqlc.embed(client)
from
  "wms"."products" as products
  left join "wms"."suppliers" as supplier on products.supplier_id = supplier.id
  left join "crm"."companies" as client on products.client_id = client.id
where
  (products.name ilike sqlc.narg(search)::text
  or products.sku ilike sqlc.narg(search)::text
  or products.barcode ilike sqlc.narg(search)::text
  or products.status::text ilike sqlc.narg(search)::text
  or supplier.name ilike sqlc.narg(search)::text
  or client.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindProduct :one
select
  sqlc.embed(products),
  sqlc.embed(supplier),
  sqlc.embed(client)
from
  "wms"."products" as products
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
  "wms"."products" as products
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
  "wms"."products" as products
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
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::varchar
  else
    name
  end,
  sku = case when sqlc.arg(set_sku)::boolean then
    sqlc.arg(sku)::varchar
  else
    sku
  end,
  barcode = case when sqlc.arg(set_barcode)::boolean then
    sqlc.arg(barcode)::varchar
  else
    barcode
  end,
  description = case when sqlc.arg(set_description)::boolean then
    sqlc.arg(description)::text
  else
    description
  end,
  cost_price = case when sqlc.arg(set_cost_price)::boolean then
    sqlc.arg(cost_price)::numeric
  else
    cost_price
  end,
  length = case when sqlc.arg(set_length)::boolean then
    sqlc.arg(length)::real
  else
    length
  end,
  width = case when sqlc.arg(set_width)::boolean then
    sqlc.arg(width)::real
  else
    width
  end,
  height = case when sqlc.arg(set_height)::boolean then
    sqlc.arg(height)::real
  else
    height
  end,
  weight = case when sqlc.arg(set_weight)::boolean then
    sqlc.arg(weight)::real
  else
    weight
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::wms.product_status_enum
  else
    status
  end,
  supplier_id = case when sqlc.arg(set_supplier_id)::boolean then
    sqlc.arg(supplier_id)::uuid
  else
    supplier_id
  end,
  client_id = case when sqlc.arg(set_client_id)::boolean then
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

