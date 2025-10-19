-- name: TmsPaginateShipmentLegEventMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "tms"."shipment_leg_events" as shipment_leg_events;

-- name: TmsPaginateShipmentLegEvent :many
select
  shipment_leg_events.*,
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where (shipment_leg.start_location ilike sqlc.narg(search)::text
  or shipment_leg_events.status_message ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindShipmentLegEvent :one
select
  shipment_leg_events.*,
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where
  shipment_leg_events.id = sqlc.arg(id)::uuid;

-- name: TmsAnyShipmentLegEvent :many
select
  shipment_leg_events.*,
  sqlc.embed(shipment_leg)
from
  "tms"."shipment_leg_events" as shipment_leg_events
  inner join "tms"."shipment_legs" as shipment_leg on shipment_leg_events.shipment_leg_id = shipment_leg.id
where
  shipment_leg_events.id = any (@ids::uuid[]);

-- name: TmsRangeShipmentLegEvent :many
select
  shipment_leg_events.*,
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
  updated_at = now(),
  shipment_leg_id = case when sqlc.arg(shipment_leg_id) is not null then
    sqlc.arg(shipment_leg_id)::uuid
  else
    shipment_leg_id
  end,
  status_message = case when sqlc.arg(status_message) is not null then
    sqlc.arg(status_message)::varchar
  else
    status_message
  end,
  location = case when sqlc.arg(location) is not null then
    sqlc.arg(location)::varchar
  else
    location
  end,
  event_timestamp = case when sqlc.arg(event_timestamp) is not null then
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

