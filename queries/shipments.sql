
-- name: CreateShipment :one
insert into shipments ("order", tracking_number, carrier, status, estimated_delivery_date, actual_delivery_date, proof_of_delivery_image_url, driver, current_location_notes, department_assigned)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;

-- name: GetShipments :many
select * from shipments order by created desc offset $1 limit $2;

-- name: GetShipmentByID :one
select * from shipments where id = $1;

-- name: UpdateShipmentStatus :one
update shipments set status = $1 where id = $2 returning *;

-- name: UpdateShipmentEstimatedDeliveryDate :one
update shipments set estimated_delivery_date = $1 where id = $2 returning *;

-- name: UpdateShipmentActualDeliveryDate :one
update shipments set actual_delivery_date = $1 where id = $2 returning *;

-- name: UpdateShipmentProofOfDeliveryImageURL :one
update shipments set proof_of_delivery_image_url = $1 where id = $2 returning *;

-- name: UpdateShipmentCurrentLocationNotes :one
update shipments set current_location_notes = $1 where id = $2 returning *;

-- name: UpdateShipmentDepartmentAssigned :one
update shipments set department_assigned = $1 where id = $2 returning *;

-- name: DeleteShipment :one
delete from shipments where id = $1 returning *;

-- name: SearchShipments :many
select * from shipments where tracking_number ilike '%' || @search_text::text || '%' or status ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetShipmentsByOrder :many
select * from shipments where "order" = $1 order by created desc offset $2 limit $3;

-- name: GetShipmentsByCarrier :many
select * from shipments where carrier = $1 order by created desc offset $2 limit $3;

-- name: GetShipmentsByStatus :many
select * from shipments where status = $1 order by created desc offset $2 limit $3;

-- name: GetShipmentsByDepartment :many
select * from shipments where department_assigned = $1 order by created desc offset $2 limit $3;

-- name: GetShipmentsByDriver :many
select * from shipments where driver = $1 order by created desc offset $2 limit $3;