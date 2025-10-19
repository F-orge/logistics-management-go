-- name: WmsPaginatePutawayRuleMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "wms"."putaway_rules" as putaway_rules;

-- name: WmsPaginatePutawayRule :many
select
  putaway_rules.*,
  sqlc.embed(product),
  sqlc.embed(client),
  sqlc.embed(warehouse),
  sqlc.embed(preferred_location)
from
  "wms"."putaway_rules" as putaway_rules
  inner join "wms"."products" as product on putaway_rules.product_id = product.id
  left join "crm"."companies" as client on putaway_rules.client_id = client.id
  inner join "wms"."warehouses" as warehouse on putaway_rules.warehouse_id = warehouse.id
  left join "wms"."locations" as preferred_location on putaway_rules.preferred_location_id = preferred_location.id
where (product.name ilike sqlc.narg(search)::text
  or client.name ilike sqlc.narg(search)::text
  or warehouse.name ilike sqlc.narg(search)::text
  or preferred_location.name ilike sqlc.narg(search)::text
  or putaway_rules.location_type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindPutawayRule :one
select
  putaway_rules.*,
  sqlc.embed(product),
  sqlc.embed(client),
  sqlc.embed(warehouse),
  sqlc.embed(preferred_location)
from
  "wms"."putaway_rules" as putaway_rules
  inner join "wms"."products" as product on putaway_rules.product_id = product.id
  left join "crm"."companies" as client on putaway_rules.client_id = client.id
  inner join "wms"."warehouses" as warehouse on putaway_rules.warehouse_id = warehouse.id
  left join "wms"."locations" as preferred_location on putaway_rules.preferred_location_id = preferred_location.id
where
  putaway_rules.id = sqlc.arg(id)::uuid;

-- name: WmsAnyPutawayRule :many
select
  putaway_rules.*,
  sqlc.embed(product),
  sqlc.embed(client),
  sqlc.embed(warehouse),
  sqlc.embed(preferred_location)
from
  "wms"."putaway_rules" as putaway_rules
  inner join "wms"."products" as product on putaway_rules.product_id = product.id
  left join "crm"."companies" as client on putaway_rules.client_id = client.id
  inner join "wms"."warehouses" as warehouse on putaway_rules.warehouse_id = warehouse.id
  left join "wms"."locations" as preferred_location on putaway_rules.preferred_location_id = preferred_location.id
where
  putaway_rules.id = any (@ids::uuid[]);

-- name: WmsRangePutawayRule :many
select
  putaway_rules.*,
  sqlc.embed(product),
  sqlc.embed(client),
  sqlc.embed(warehouse),
  sqlc.embed(preferred_location)
from
  "wms"."putaway_rules" as putaway_rules
  inner join "wms"."products" as product on putaway_rules.product_id = product.id
  left join "crm"."companies" as client on putaway_rules.client_id = client.id
  inner join "wms"."warehouses" as warehouse on putaway_rules.warehouse_id = warehouse.id
  left join "wms"."locations" as preferred_location on putaway_rules.preferred_location_id = preferred_location.id
where
  putaway_rules.created_at >= @dateFrom::date
  and putaway_rules.created_at <= @dateTo::date
  and (product.name ilike sqlc.narg(search)::text
    or client.name ilike sqlc.narg(search)::text
    or warehouse.name ilike sqlc.narg(search)::text
    or preferred_location.name ilike sqlc.narg(search)::text
    or putaway_rules.location_type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertPutawayRule :one
insert into "wms"."putaway_rules"(product_id, client_id, warehouse_id, preferred_location_id, location_type, priority, min_quantity, max_quantity, weight_threshold, volume_threshold, requires_temperature_control, requires_hazmat_approval, is_active)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning
  *;

-- name: WmsUpdatePutawayRule :one
update
  "wms"."putaway_rules"
set
  updated_at = now(),
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  warehouse_id = case when sqlc.arg(warehouse_id) is not null then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  preferred_location_id = case when sqlc.arg(preferred_location_id) is not null then
    sqlc.arg(preferred_location_id)::uuid
  else
    preferred_location_id
  end,
  location_type = case when sqlc.arg(location_type) is not null then
    sqlc.arg(location_type)::wms.location_type_enum
  else
    location_type
  end,
  priority = case when sqlc.arg(priority) is not null then
    sqlc.arg(priority)::integer
  else
    priority
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
  weight_threshold = case when sqlc.arg(weight_threshold) is not null then
    sqlc.arg(weight_threshold)::real
  else
    weight_threshold
  end,
  volume_threshold = case when sqlc.arg(volume_threshold) is not null then
    sqlc.arg(volume_threshold)::real
  else
    volume_threshold
  end,
  requires_temperature_control = case when sqlc.arg(requires_temperature_control) is not null then
    sqlc.arg(requires_temperature_control)::boolean
  else
    requires_temperature_control
  end,
  requires_hazmat_approval = case when sqlc.arg(requires_hazmat_approval) is not null then
    sqlc.arg(requires_hazmat_approval)::boolean
  else
    requires_hazmat_approval
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

-- name: WmsRemovePutawayRule :exec
delete from "wms"."putaway_rules"
where id = @id::uuid;

