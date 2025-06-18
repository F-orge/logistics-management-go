
-- name: CreateInventoryItem :one
insert into inventory_items (product, warehouse, quantity_on_hand, lot_number, serial_number, status, expiry_date, storage_location_code, last_counted_date)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *;

-- name: GetInventoryItems :many
select * from inventory_items order by created desc offset $1 limit $2;

-- name: GetInventoryItemByID :one
select * from inventory_items where id = $1;

-- name: UpdateInventoryItemQuantity :one
update inventory_items set quantity_on_hand = $1 where id = $2 returning *;

-- name: UpdateInventoryItemStatus :one
update inventory_items set status = $1 where id = $2 returning *;

-- name: UpdateInventoryItemExpiryDate :one
update inventory_items set expiry_date = $1 where id = $2 returning *;

-- name: UpdateInventoryItemStorageLocationCode :one
update inventory_items set storage_location_code = $1 where id = $2 returning *;

-- name: UpdateInventoryItemLastCountedDate :one
update inventory_items set last_counted_date = $1 where id = $2 returning *;

-- name: DeleteInventoryItem :one
delete from inventory_items where id = $1 returning *;

-- name: SearchInventoryItems :many
select * from inventory_items where lot_number ilike '%' || @search_text::text || '%' or serial_number ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInventoryItemsByProduct :many
select * from inventory_items where product = $1 order by created desc offset $2 limit $3;

-- name: GetInventoryItemsByWarehouse :many
select * from inventory_items where warehouse = $1 order by created desc offset $2 limit $3;

-- name: GetInventoryItemsByStatus :many
select * from inventory_items where status = $1 order by created desc offset $2 limit $3;