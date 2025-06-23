
-- name: CreateInventoryItem :one
insert into inventory_items (
  product, 
  warehouse, 
  quantity_on_hand, 
  lot_number, 
  serial_number, 
  status, 
  expiry_date, 
  storage_location_code, 
  last_counted_date
)
values (
  @product_id::uuid,
  @warehouse_id::uuid, 
  @quantity_on_hand::integer,
  @lot_number::text,
  @serial_number::text, 
  @status::text, 
  @expiry_date::timestamptz, 
  @storage_location_code::text, 
  @last_counted_date::timestamptz
)
returning *;

-- name: GetAllInventoryItems :many
select * from inventory_items order by created desc;

-- name: PaginateInventoryItems :many
select * from inventory_items order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInventoryItemByID :one
select * from inventory_items where id = @id::uuid;

-- name: UpdateInventoryItemQuantity :one
update inventory_items set quantity_on_hand = @quantity_on_hand::integer where id = @id::uuid returning *;

-- name: UpdateInventoryItemStatus :one
update inventory_items set status = @status::text where id = @id::uuid returning *;

-- name: UpdateInventoryItemExpiryDate :one
update inventory_items set expiry_date = @expiry_date::timestamptz where id = @id::uuid returning *;

-- name: UpdateInventoryItemStorageLocationCode :one
update inventory_items set storage_location_code = @storage_location_code::text where id = @id::uuid returning *;

-- name: UpdateInventoryItemLastCountedDate :one
update inventory_items set last_counted_date = now() where id = @id::uuid returning *;

-- name: DeleteInventoryItem :one
delete from inventory_items where id = @id::uuid returning *;

-- name: SearchInventoryItems :many
select * from inventory_items where lot_number ilike '%' || @search_text::text || '%' or serial_number ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInventoryItemsByWarehouse :many
select * from inventory_items where warehouse = $1 order by created desc offset $2 limit $3;

-- name: GetInventoryItemsByStatus :many
select * from inventory_items where status = $1 order by created desc offset $2 limit $3;