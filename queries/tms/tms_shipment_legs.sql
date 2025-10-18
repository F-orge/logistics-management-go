-- name: TmsPaginateShipmentLeg :many
select
  sqlc.embed(shipment_legs),
  sqlc.embed(carrier),
  sqlc.embed(internal_trip)
from
  "tms"."shipment_legs" as shipment_legs
  left join "tms"."carriers" as carrier on shipment_legs.carrier_id = carrier.id
  left join "tms"."trips" as internal_trip on shipment_legs.internal_trip_id = internal_trip.id
where
  (carrier.name ilike sqlc.narg(search)::text
  or internal_trip.status::text ilike sqlc.narg(search)::text
  or shipment_legs.start_location ilike sqlc.narg(search)::text
  or shipment_legs.end_location ilike sqlc.narg(search)::text
  or shipment_legs.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindShipmentLeg :one
select
  sqlc.embed(shipment_legs),
  sqlc.embed(carrier),
  sqlc.embed(internal_trip)
from
  "tms"."shipment_legs" as shipment_legs
  left join "tms"."carriers" as carrier on shipment_legs.carrier_id = carrier.id
  left join "tms"."trips" as internal_trip on shipment_legs.internal_trip_id = internal_trip.id
where
  shipment_legs.id = sqlc.arg(id)::uuid;

-- name: TmsAnyShipmentLeg :many
select
  sqlc.embed(shipment_legs),
  sqlc.embed(carrier),
  sqlc.embed(internal_trip)
from
  "tms"."shipment_legs" as shipment_legs
  left join "tms"."carriers" as carrier on shipment_legs.carrier_id = carrier.id
  left join "tms"."trips" as internal_trip on shipment_legs.internal_trip_id = internal_trip.id
where
  shipment_legs.id = any (@ids::uuid[]);

-- name: TmsRangeShipmentLeg :many
select
  sqlc.embed(shipment_legs),
  sqlc.embed(carrier),
  sqlc.embed(internal_trip)
from
  "tms"."shipment_legs" as shipment_legs
  left join "tms"."carriers" as carrier on shipment_legs.carrier_id = carrier.id
  left join "tms"."trips" as internal_trip on shipment_legs.internal_trip_id = internal_trip.id
where
  shipment_legs.created_at >= @dateFrom::date
  and shipment_legs.created_at <= @dateTo::date
  and (carrier.name ilike sqlc.narg(search)::text
  or internal_trip.status::text ilike sqlc.narg(search)::text
  or shipment_legs.start_location ilike sqlc.narg(search)::text
  or shipment_legs.end_location ilike sqlc.narg(search)::text
  or shipment_legs.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertShipmentLeg :one
insert into "tms"."shipment_legs"(shipment_id, leg_sequence, start_location, end_location, carrier_id, internal_trip_id, status)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: TmsUpdateShipmentLeg :one
update
  "tms"."shipment_legs"
set
  shipment_id = case when sqlc.arg(set_shipment_id)::boolean then
    sqlc.arg(shipment_id)::uuid
  else
    shipment_id
  end,
  leg_sequence = case when sqlc.arg(set_leg_sequence)::boolean then
    sqlc.arg(leg_sequence)::integer
  else
    leg_sequence
  end,
  start_location = case when sqlc.arg(set_start_location)::boolean then
    sqlc.arg(start_location)::varchar
  else
    start_location
  end,
  end_location = case when sqlc.arg(set_end_location)::boolean then
    sqlc.arg(end_location)::varchar
  else
    end_location
  end,
  carrier_id = case when sqlc.arg(set_carrier_id)::boolean then
    sqlc.arg(carrier_id)::uuid
  else
    carrier_id
  end,
  internal_trip_id = case when sqlc.arg(set_internal_trip_id)::boolean then
    sqlc.arg(internal_trip_id)::uuid
  else
    internal_trip_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::tms.shipment_leg_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveShipmentLeg :exec
delete from "tms"."shipment_legs"
where id = @id::uuid;
