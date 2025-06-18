
-- name: CreateRoute :one
insert into routes (name, planned_start_time, planned_end_time, status)
values ($1, $2, $3, $4)
returning *;

-- name: GetRoutes :many
select * from routes order by created desc offset $1 limit $2;

-- name: GetRouteByID :one
select * from routes where id = $1;

-- name: UpdateRouteStatus :one
update routes set status = $1 where id = $2 returning *;

-- name: UpdateRoutePlannedStartTime :one
update routes set planned_start_time = $1 where id = $2 returning *;

-- name: UpdateRoutePlannedEndTime :one
update routes set planned_end_time = $1 where id = $2 returning *;

-- name: DeleteRoute :one
delete from routes where id = $1 returning *;

-- name: SearchRoutes :many
select * from routes where name ilike '%' || @search_text::text || '%' or status ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetRoutesByStatus :many
select * from routes where status = $1 order by created desc offset $2 limit $3;

-- name: AddShipmentToRoute :one
insert into shipments_on_route (route, shipment)
values ($1, $2)
returning *;

-- name: RemoveShipmentFromRoute :one
delete from shipments_on_route where route = $1 and shipment = $2 returning *;  

-- name: GetShipmentsOnRoute :many
select s.* from shipments_on_route sor
join shipments s on sor.shipment = s.id
where sor.route = $1
order by s.created desc offset $2 limit $3;

-- name: GetRoutesByShipment :many
select r.* from shipments_on_route sor
join routes r on sor.route = r.id
where sor.shipment = $1
order by r.created desc offset $2 limit $3;

-- name: CreateRouteSegment :one
insert into route_segments (route, sequence_number, segment_type, address, longitude, latitude,
  instructions, estimated_arrival_time, actual_arrival_time, estimated_departure_time, actual_departure_time)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *;

-- name: GetRouteSegments :many
select * from route_segments where route = $1 order by sequence_number asc offset $2 limit $3;

-- name: GetRouteSegmentByID :one
select * from route_segments where id = $1;

-- name: UpdateRouteSegmentInstructions :one
update route_segments set instructions = $1 where id = $2 returning *;

-- name: UpdateRouteSegmentEstimatedArrivalTime :one
update route_segments set estimated_arrival_time = $1 where id = $2 returning *;

-- name: UpdateRouteSegmentActualArrivalTime :one
update route_segments set actual_arrival_time = $1 where id = $2 returning *;

-- name: UpdateRouteSegmentEstimatedDepartureTime :one
update route_segments set estimated_departure_time = $1 where id = $2 returning *;

-- name: UpdateRouteSegmentActualDepartureTime :one
update route_segments set actual_departure_time = $1 where id = $2 returning *;

-- name: DeleteRouteSegment :one
delete from route_segments where id = $1 returning *;

-- name: SearchRouteSegments :many
select * from route_segments where address ilike '%' || @search_text::text || '%' or
  instructions ilike '%' || @search_text::text || '%'
order by sequence_number asc, created desc offset @page::integer limit @per_page::integer;

-- name: GetRouteSegmentsByType :many
select * from route_segments where segment_type = $1 order by sequence_number asc, created desc offset $2 limit $3;