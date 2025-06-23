
-- name: CreateWarehouse :one
insert into warehouses (name, address, longitude, latitude, manager)
values ($1, $2, $3, $4, $5)
returning *;

-- name: GetAllWarehouses :many
select * from warehouses order by created desc;

-- name: PaginateWarehouses :many 
select * from warehouses order by created desc offset $1 limit $2;

-- name: GetWarehouseByID :one
select * from warehouses where id = $1;

-- name: UpdateWarehouseName :one
update warehouses set name = $1 where id = $2 returning *;

-- name: UpdateWarehouseAddress :one
update warehouses set address = $1 where id = $2 returning *;

-- name: UpdateWarehouseLongitude :one
update warehouses set longitude = $1 where id = $2 returning *;

-- name: UpdateWarehouseLatitude :one
update warehouses set latitude = $1 where id = $2 returning *;

-- name: UpdateWarehouseManager :one
update warehouses set manager = $1 where id = $2 returning *;

-- name: DeleteWarehouse :one
delete from warehouses where id = $1 returning *;

-- name: SearchWarehouses :many
select * from warehouses where name ilike '%' || @search_text::text || '%' or address ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;

-- name: GetWarehousesByManager :many
select * from warehouses where manager = $1 order by created desc offset $2 limit $3;

-- name: GetWarehousesByLocation :many
select * from warehouses where longitude = $1 and latitude = $2 order by created desc offset $3 limit $4;
