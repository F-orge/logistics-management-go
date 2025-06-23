
-- name: CreateVehicle :one
insert into vehicles (
  license_plate, 
  make, 
  model, 
  type, 
  capacity_volume, 
  capacity_weight, 
  status, 
  current_driver
)
values (
  @license_plate::text, 
  @make::text, 
  @model::text, 
  @type::text, 
  @capacity_volume::decimal, 
  @capacity_weight::decimal, 
  @status::text, 
  @current_driver_id::uuid
)
returning *;

-- name: GetVehicles :many
select * from vehicles order by created desc offset @page::integer limit @per_page::integer;

-- name: GetVehicleByID :one
select * from vehicles where id = @id::uuid;

-- name: UpdateVehicleStatus :one
update vehicles set status = @status::text where id = @id::uuid returning *;

-- name: UpdateVehicleCurrentDriver :one
update vehicles set current_driver = @current_driver_id::uuid where id = @id::uuid returning *;

-- name: UpdateVehicleCapacity :one
update vehicles set capacity_volume = @capacity_volume::decimal, capacity_weight = @capacity_weight::decimal where id = @id::uuid
returning *;

-- name: DeleteVehicle :one
delete from vehicles where id = @id::uuid returning *;

-- name: SearchVehicles :many
select * from vehicles where license_plate ilike '%' || @search_text::text || '%' or
make ilike '%' || @search_text::text || '%' or
model ilike '%' || @search_text::text || '%' or
type ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetVehiclesByStatus :many
select * from vehicles where status = @status::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetVehiclesByDriver :many
select * from vehicles where current_driver = @driver_id::uuid order by created desc offset @page::integer limit @per_page::integer;