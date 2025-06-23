
-- name: CreateWarehouse :one
insert into warehouses (
  name, 
  address, 
  longitude, 
  latitude, 
  manager
)
values (
  @name::text, 
  @address::text, 
  @longitude::decimal, 
  @latitude::decimal, 
  @manager_id::uuid
)
returning *;

-- name: GetAllWarehouses :many
select * from warehouses order by created desc;

-- name: PaginateWarehouses :many 
select * from warehouses order by created desc offset @page::integer limit @per_page::integer;

-- name: GetWarehouseByID :one
select * from warehouses where id = @id::uuid;

-- name: UpdateWarehouseName :one
update warehouses set name = @name::text where id = @id::uuid returning *;

-- name: UpdateWarehouseAddress :one
update warehouses set address = @address::text where id = @id::uuid returning *;

-- name: UpdateWarehouseLongitude :one
update warehouses set longitude = @longitude::decimal where id = @id::uuid returning *;

-- name: UpdateWarehouseLatitude :one
update warehouses set latitude = @latitude::decimal where id = @id::uuid returning *;

-- name: UpdateWarehouseManager :one
update warehouses set manager = @manager_id::uuid where id = @id::uuid returning *;

-- name: DeleteWarehouse :one
delete from warehouses where id = @id::uuid returning *;

-- name: SearchWarehouses :many
select * from warehouses where name ilike '%' || @search_text::text || '%' or address ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;

-- name: GetWarehousesByManager :many
select * from warehouses where manager = @manager_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetWarehousesByLocation :many
select * from warehouses where longitude = @longitude::decimal and latitude = @latitude::decimal order by created desc offset @page::integer limit @per_page::integer;
