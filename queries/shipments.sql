
-- name: CreateShipment :one
insert into shipments (
  "order", 
  tracking_number, 
  carrier, 
  status, 
  estimated_delivery_date, 
  actual_delivery_date, 
  proof_of_delivery_image_url, 
  driver, 
  current_location_notes, 
  department_assigned
)
values (
  @order_id::uuid, 
  @tracking_number::text, 
  @carrier::uuid, 
  @status::text, 
  @estimated_delivery_date::timestamptz, 
  @actual_delivery_date::timestamptz, 
  @proof_of_delivery_image_url::text[], 
  @driver_id::uuid, 
  @current_location_notes::text, 
  @department_id::uuid
)
returning *;

-- name: GetShipments :many
select * from shipments order by created desc;

-- name: PaginateShipments :many
select * from shipments order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentByID :one
select * from shipments where id = @id::uuid;

-- name: UpdateShipmentStatus :one
update shipments set status = @status::text where id = @id::uuid returning *;

-- name: UpdateShipmentEstimatedDeliveryDate :one
update shipments set estimated_delivery_date = @estimated_delivery_date::timestamptz where id = @id::uuid returning *;

-- name: UpdateShipmentActualDeliveryDate :one
update shipments set actual_delivery_date = @actual_delivery_date::timestamptz where id = @id::uuid returning *;

-- name: AddShipmentProofOfDeliveryImage :one
update shipments 
set proof_of_delivery_image_url = 
  array_append(proof_of_delivery_image_url, @proof_of_delivery_image_url::text)
where id = @id::uuid 
returning *;

-- name: RemoveShipmentProofOfDeliveryImage :one
update shipments 
set proof_of_delivery_image_url = 
  array_remove(proof_of_delivery_image_url, @proof_of_delivery_image_url::text) 
where id = @id::uuid 
returning *;

-- name: UpdateShipmentCurrentLocationNotes :one
update shipments set current_location_notes = @current_location_notes::text where id = @id::uuid returning *;

-- name: UpdateShipmentDepartmentAssigned :one
update shipments set department_assigned = @department_assigned::text where id = @id::uuid returning *;

-- name: DeleteShipment :one
delete from shipments where id = @id::uuid returning *;

-- name: SearchShipments :many
select * from shipments where tracking_number ilike '%' || @search_text::text || '%' or status ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentsByOrder :many
select * from shipments where "order" = @order_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentsByCarrier :many
select * from shipments where carrier = @carrier::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentsByStatus :many
select * from shipments where status = @status::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentsByDepartment :many
select * from shipments where department_assigned = @department_assigned::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentsByDriver :many
select * from shipments where driver = @driver_id::uuid order by created desc offset @page::integer limit @per_page::integer;