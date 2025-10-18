-- name: TmsPaginateShipmentLegEvent :many
select
  sqlc.embed(shipment_leg_events),
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where
  (shipment_leg.start_location ilike sqlc.narg(search)::text
  or shipment_leg_events.status_message ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindShipmentLegEvent :one
select
  sqlc.embed(shipment_leg_events),
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where
  shipment_leg_events.id = sqlc.arg(id)::uuid;

-- name: TmsAnyShipmentLegEvent :many
select
  sqlc.embed(shipment_leg_events),
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where
  shipment_leg_events.id = any (@ids::uuid[]);

-- name: TmsRangeShipmentLegEvent :many
select
  sqlc.embed(shipment_leg_events),
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where
  shipment_leg_events.event_timestamp >= @dateFrom::date
  and shipment_leg_events.event_timestamp <= @dateTo::date
  and (shipment_leg.start_location ilike sqlc.narg(search)::text
  or shipment_leg_events.status_message ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertShipmentLegEvent :one
insert into "tms"."shipment_leg_events"(shipment_leg_id, status_message, location, event_timestamp)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateShipmentLegEvent :one
update
  "tms"."shipment_leg_events"
set
  shipment_leg_id = case when sqlc.arg(set_shipment_leg_id)::boolean then
    sqlc.arg(shipment_leg_id)::uuid
  else
    shipment_leg_id
  end,
  status_message = case when sqlc.arg(set_status_message)::boolean then
    sqlc.arg(status_message)::varchar
  else
    status_message
  end,
  location = case when sqlc.arg(set_location)::boolean then
    sqlc.arg(location)::varchar
  else
    location
  end,
  event_timestamp = case when sqlc.arg(set_event_timestamp)::boolean then
    sqlc.arg(event_timestamp)::timestamp
  else
    event_timestamp
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveShipmentLegEvent :exec
delete from "tms"."shipment_leg_events"
where id = @id::uuid;
