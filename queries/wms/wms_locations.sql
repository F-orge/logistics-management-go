-- name: WmsPaginateLocation :many
select
  sqlc.embed(locations),
  sqlc.embed(warehouse)
from
  "wms"."locations" as locations
  inner join "wms"."warehouses" as warehouse on locations.warehouse_id = warehouse.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindLocation :one
select
  sqlc.embed(locations),
  sqlc.embed(warehouse)
from
  "wms"."locations" as locations
  inner join "wms"."warehouses" as warehouse on locations.warehouse_id = warehouse.id
where
  locations.id = sqlc.arg(id)::uuid;

-- name: WmsAnyLocation :many
select
  sqlc.embed(locations),
  sqlc.embed(warehouse)
from
  "wms"."locations" as locations
  inner join "wms"."warehouses" as warehouse on locations.warehouse_id = warehouse.id
where
  locations.id = any (@ids::uuid[]);

-- name: WmsRangeLocation :many
select
  sqlc.embed(locations),
  sqlc.embed(warehouse)
from
  "wms"."locations" as locations
  inner join "wms"."warehouses" as warehouse on locations.warehouse_id = warehouse.id
where
  locations.created_at >= @dateFrom::date
  and locations.created_at <= @dateTo::date;

-- name: WmsInsertLocation :one
insert into "wms"."locations"(warehouse_id, parent_location_id, name, barcode, type, level, path, max_weight, max_volume, max_pallets, x_coordinate, y_coordinate, z_coordinate, is_pickable, is_receivable, temperature_controlled, hazmat_approved, is_active)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
returning
  *;

-- name: WmsUpdateLocation :one
update
  "wms"."locations"
set
  warehouse_id = case when sqlc.arg(set_warehouse_id)::boolean then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  parent_location_id = case when sqlc.arg(set_parent_location_id)::boolean then
    sqlc.arg(parent_location_id)::uuid
  else
    parent_location_id
  end,
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::varchar
  else
    name
  end,
  barcode = case when sqlc.arg(set_barcode)::boolean then
    sqlc.arg(barcode)::varchar
  else
    barcode
  end,
  type = case when sqlc.arg(set_type)::boolean then
    sqlc.arg(type)::wms.location_type_enum
  else
    type
  end,
  level = case when sqlc.arg(set_level)::boolean then
    sqlc.arg(level)::integer
  else
    level
  end,
  path = case when sqlc.arg(set_path)::boolean then
    sqlc.arg(path)::text
  else
    path
  end,
  max_weight = case when sqlc.arg(set_max_weight)::boolean then
    sqlc.arg(max_weight)::real
  else
    max_weight
  end,
  max_volume = case when sqlc.arg(set_max_volume)::boolean then
    sqlc.arg(max_volume)::real
  else
    max_volume
  end,
  max_pallets = case when sqlc.arg(set_max_pallets)::boolean then
    sqlc.arg(max_pallets)::integer
  else
    max_pallets
  end,
  x_coordinate = case when sqlc.arg(set_x_coordinate)::boolean then
    sqlc.arg(x_coordinate)::real
  else
    x_coordinate
  end,
  y_coordinate = case when sqlc.arg(set_y_coordinate)::boolean then
    sqlc.arg(y_coordinate)::real
  else
    y_coordinate
  end,
  z_coordinate = case when sqlc.arg(set_z_coordinate)::boolean then
    sqlc.arg(z_coordinate)::real
  else
    z_coordinate
  end,
  is_pickable = case when sqlc.arg(set_is_pickable)::boolean then
    sqlc.arg(is_pickable)::boolean
  else
    is_pickable
  end,
  is_receivable = case when sqlc.arg(set_is_receivable)::boolean then
    sqlc.arg(is_receivable)::boolean
  else
    is_receivable
  end,
  temperature_controlled = case when sqlc.arg(set_temperature_controlled)::boolean then
    sqlc.arg(temperature_controlled)::boolean
  else
    temperature_controlled
  end,
  hazmat_approved = case when sqlc.arg(set_hazmat_approved)::boolean then
    sqlc.arg(hazmat_approved)::boolean
  else
    hazmat_approved
  end,
  is_active = case when sqlc.arg(set_is_active)::boolean then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveLocation :exec
delete from "wms"."locations"
where id = @id::uuid;

