
-- name: CreateRoute :one
insert into routes (
  name, 
  planned_start_time, 
  planned_end_time, 
  status
)
values (
  @name::text,
  @planned_start_time::timestamptz,
  @planned_end_time::timestamptz,
  @status::text
)
returning *;

-- name: GetRoutes :many
select * from routes order by created desc offset @page::integer limit @per_page::integer;

-- name: GetRouteByID :one
select * from routes where id = @id::uuid;

-- name: UpdateRouteStatus :one
update routes set status = @status::text where id = @id::uuid returning *;

-- name: UpdateRoutePlannedStartTime :one
update routes set planned_start_time = @planned_start_time::timestamptz where id = @id::uuid returning *;

-- name: UpdateRoutePlannedEndTime :one
update routes set planned_end_time = @planned_end_time::timestamptz where id = @id::uuid returning *;

-- name: DeleteRoute :one
delete from routes where id = @id::uuid returning *;

-- name: SearchRoutes :many
select * from routes where name ilike '%' || @search_text::text || '%' or status ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetRoutesByStatus :many
select * from routes where status = @status::text order by created desc offset @page::integer limit @per_page::integer;

-- name: AddShipmentToRoute :one
insert into shipments_on_route (
  route, shipment
)
values (@route::uuid, @shipment::uuid)
returning *;

-- name: RemoveShipmentFromRoute :one
delete from shipments_on_route where route = @route::uuid and shipment = @shipment::uuid returning *;

-- name: GetShipmentsOnRoute :many
select s.* from shipments_on_route sor
join shipments s on sor.shipment = s.id
where sor.route = @route::uuid
order by s.created desc offset @page::integer limit @per_page::integer;

-- name: GetRoutesByShipment :many
select r.* from shipments_on_route sor
join routes r on sor.route = r.id
where sor.shipment = @shipment::uuid
order by r.created desc offset @page::integer limit @per_page::integer;

-- name: CreateRouteSegment :one
insert into route_segments (route, sequence_number, segment_type, address, longitude, latitude,
  instructions, estimated_arrival_time, actual_arrival_time, estimated_departure_time, actual_departure_time)
values (
  @route::uuid, 
  @sequence_number::integer, 
  @segment_type::text, 
  @address::text, 
  @longitude::numeric, 
  @latitude::numeric,
  @instructions::text, 
  @estimated_arrival_time::timestamptz, 
  @actual_arrival_time::timestamptz, 
  @estimated_departure_time::timestamptz, 
  @actual_departure_time::timestamptz
)
returning *;

-- name: GetRouteSegments :many
select * from route_segments where route = @route::uuid order by sequence_number asc offset @page::integer limit @per_page::integer;

-- name: GetRouteSegmentByID :one
select * from route_segments where id = @id::uuid;

-- name: UpdateRouteSegmentInstructions :one
update route_segments set instructions = @instructions::text where id = @id::uuid returning *;

-- name: UpdateRouteSegmentEstimatedArrivalTime :one
update route_segments set estimated_arrival_time = @estimated_arrival_time::timestamptz where id = @id::uuid returning *;

-- name: UpdateRouteSegmentActualArrivalTime :one
update route_segments set actual_arrival_time = @actual_arrival_time::timestamptz where id = @id::uuid returning *;

-- name: UpdateRouteSegmentEstimatedDepartureTime :one
update route_segments set estimated_departure_time = @estimated_departure_time::timestamptz where id = @id::uuid returning *;

-- name: UpdateRouteSegmentActualDepartureTime :one
update route_segments set actual_departure_time = @actual_departure_time::timestamptz where id = @id::uuid returning *;

-- name: DeleteRouteSegment :one
delete from route_segments where id = @id::uuid returning *;

-- name: SearchRouteSegments :many
select * from route_segments where address ilike '%' || @search_text::text || '%' or
  instructions ilike '%' || @search_text::text || '%'
order by sequence_number asc, created desc offset @page::integer limit @per_page::integer;

-- name: GetRouteSegmentsByType :many
select * from route_segments where segment_type = @segment_type::text order by sequence_number asc, created desc offset @page::integer limit @per_page::integer;