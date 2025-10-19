-- name: WmsPaginatePackage :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(packages),
  sqlc.embed(sales_order),
  sqlc.embed(warehouse),
  sqlc.embed(packed_by_user)
from
  "wms"."packages_view" as packages
  inner join "wms"."sales_orders" as sales_order on packages.sales_order_id = sales_order.id
  inner join "wms"."warehouses" as warehouse on packages.warehouse_id = warehouse.id
  left join "public"."user" as packed_by_user on packages.packed_by_user_id = packed_by_user.id
where (sales_order.order_number ilike sqlc.narg(search)::text
  or warehouse.name ilike sqlc.narg(search)::text
  or packages.package_number ilike sqlc.narg(search)::text
  or packages.tracking_number ilike sqlc.narg(search)::text
  or packages.carrier ilike sqlc.narg(search)::text
  or packed_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindPackage :one
select
  sqlc.embed(packages),
  sqlc.embed(sales_order),
  sqlc.embed(warehouse),
  sqlc.embed(packed_by_user)
from
  "wms"."packages_view" as packages
  inner join "wms"."sales_orders" as sales_order on packages.sales_order_id = sales_order.id
  inner join "wms"."warehouses" as warehouse on packages.warehouse_id = warehouse.id
  left join "public"."user" as packed_by_user on packages.packed_by_user_id = packed_by_user.id
where
  packages.id = sqlc.arg(id)::uuid;

-- name: WmsAnyPackage :many
select
  sqlc.embed(packages),
  sqlc.embed(sales_order),
  sqlc.embed(warehouse),
  sqlc.embed(packed_by_user)
from
  "wms"."packages_view" as packages
  inner join "wms"."sales_orders" as sales_order on packages.sales_order_id = sales_order.id
  inner join "wms"."warehouses" as warehouse on packages.warehouse_id = warehouse.id
  left join "public"."user" as packed_by_user on packages.packed_by_user_id = packed_by_user.id
where
  packages.id = any (@ids::uuid[]);

-- name: WmsRangePackage :many
select
  sqlc.embed(packages),
  sqlc.embed(sales_order),
  sqlc.embed(warehouse),
  sqlc.embed(packed_by_user)
from
  "wms"."packages_view" as packages
  inner join "wms"."sales_orders" as sales_order on packages.sales_order_id = sales_order.id
  inner join "wms"."warehouses" as warehouse on packages.warehouse_id = warehouse.id
  left join "public"."user" as packed_by_user on packages.packed_by_user_id = packed_by_user.id
where
  packages.created_at >= @dateFrom::date
  and packages.created_at <= @dateTo::date
  and (sales_order.order_number ilike sqlc.narg(search)::text
    or warehouse.name ilike sqlc.narg(search)::text
    or packages.package_number ilike sqlc.narg(search)::text
    or packages.tracking_number ilike sqlc.narg(search)::text
    or packages.carrier ilike sqlc.narg(search)::text
    or packed_by_user.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertPackage :one
insert into "wms"."packages"(sales_order_id, package_number, warehouse_id, package_type, weight, length, width, height, tracking_number, carrier, service_level, packed_by_user_id, packed_at, shipped_at, is_fragile, is_hazmat, requires_signature, insurance_value)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
returning
  *;

-- name: WmsUpdatePackage :one
update
  "wms"."packages"
set
  updated_at = now(),
  sales_order_id = case when sqlc.arg(sales_order_id) is not null then
    sqlc.arg(sales_order_id)::uuid
  else
    sales_order_id
  end,
  package_number = case when sqlc.arg(package_number) is not null then
    sqlc.arg(package_number)::varchar
  else
    package_number
  end,
  warehouse_id = case when sqlc.arg(warehouse_id) is not null then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  package_type = case when sqlc.arg(package_type) is not null then
    sqlc.arg(package_type)::varchar
  else
    package_type
  end,
  weight = case when sqlc.arg(weight) is not null then
    sqlc.arg(weight)::real
  else
    weight
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
  tracking_number = case when sqlc.arg(tracking_number) is not null then
    sqlc.arg(tracking_number)::varchar
  else
    tracking_number
  end,
  carrier = case when sqlc.arg(carrier) is not null then
    sqlc.arg(carrier)::varchar
  else
    carrier
  end,
  service_level = case when sqlc.arg(service_level) is not null then
    sqlc.arg(service_level)::varchar
  else
    service_level
  end,
  packed_by_user_id = case when sqlc.arg(packed_by_user_id) is not null then
    sqlc.arg(packed_by_user_id)::text
  else
    packed_by_user_id
  end,
  packed_at = case when sqlc.arg(packed_at) is not null then
    sqlc.arg(packed_at)::timestamp
  else
    packed_at
  end,
  shipped_at = case when sqlc.arg(shipped_at) is not null then
    sqlc.arg(shipped_at)::timestamp
  else
    shipped_at
  end,
  is_fragile = case when sqlc.arg(is_fragile) is not null then
    sqlc.arg(is_fragile)::boolean
  else
    is_fragile
  end,
  is_hazmat = case when sqlc.arg(is_hazmat) is not null then
    sqlc.arg(is_hazmat)::boolean
  else
    is_hazmat
  end,
  requires_signature = case when sqlc.arg(requires_signature) is not null then
    sqlc.arg(requires_signature)::boolean
  else
    requires_signature
  end,
  insurance_value = case when sqlc.arg(insurance_value) is not null then
    sqlc.arg(insurance_value)::numeric
  else
    insurance_value
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemovePackage :exec
delete from "wms"."packages"
where id = @id::uuid;

