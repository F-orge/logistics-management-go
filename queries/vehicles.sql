
-- name: CreateVehicle :one
insert into vehicles (license_plate, make, model, type, capacity_volume, capacity_weight, status, current_driver, created, updated)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;

-- name: GetVehicles :many
select * from vehicles order by created desc offset $1 limit $2;

-- name: GetVehicleByID :one
select * from vehicles where id = $1;

-- name: UpdateVehicleStatus :one
update vehicles set status = $1 where id = $2 returning *;

-- name: UpdateVehicleCurrentDriver :one
update vehicles set current_driver = $1 where id = $2 returning *;

-- name: UpdateVehicleCapacity :one
update vehicles set capacity_volume = $1, capacity_weight = $2 where id = $3
returning *;

-- name: DeleteVehicle :one
delete from vehicles where id = $1 returning *;

-- name: SearchVehicles :many
select * from vehicles where license_plate ilike '%' || @search_text::text || '%' or
make ilike '%' || @search_text::text || '%' or
model ilike '%' || @search_text::text || '%' or
type ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetVehiclesByStatus :many
select * from vehicles where status = $1 order by created desc offset $2 limit $3;

-- name: GetVehiclesByDriver :many
select * from vehicles where current_driver = $1 order by created desc offset $2 limit $3;