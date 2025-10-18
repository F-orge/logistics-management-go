-- name: WmsPaginateInboundShipment :many
select
  sqlc.embed(inbound_shipments),
  sqlc.embed(client)
from
  "wms"."inbound_shipments" as inbound_shipments
  left join "crm"."companies" as client on inbound_shipments.client_id = client.id
where
  (client.name ilike sqlc.narg(search)::text
  or inbound_shipments.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindInboundShipment :one
select
  sqlc.embed(inbound_shipments),
  sqlc.embed(client)
from
  "wms"."inbound_shipments" as inbound_shipments
  left join "crm"."companies" as client on inbound_shipments.client_id = client.id
where
  inbound_shipments.id = sqlc.arg(id)::uuid;

-- name: WmsAnyInboundShipment :many
select
  sqlc.embed(inbound_shipments),
  sqlc.embed(client)
from
  "wms"."inbound_shipments" as inbound_shipments
  left join "crm"."companies" as client on inbound_shipments.client_id = client.id
where
  inbound_shipments.id = any (@ids::uuid[]);

-- name: WmsRangeInboundShipment :many
select
  sqlc.embed(inbound_shipments),
  sqlc.embed(client)
from
  "wms"."inbound_shipments" as inbound_shipments
  left join "crm"."companies" as client on inbound_shipments.client_id = client.id
where
  inbound_shipments.created_at >= @dateFrom::date
  and inbound_shipments.created_at <= @dateTo::date
  and (client.name ilike sqlc.narg(search)::text
  or inbound_shipments.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: WmsInsertInboundShipment :one
insert into "wms"."inbound_shipments"(client_id, warehouse_id, status, expected_arrival_date, actual_arrival_date)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateInboundShipment :one
update
  "wms"."inbound_shipments"
set
  client_id = case when sqlc.arg(set_client_id)::boolean then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  warehouse_id = case when sqlc.arg(set_warehouse_id)::boolean then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::wms.inbound_shipment_status_enum
  else
    status
  end,
  expected_arrival_date = case when sqlc.arg(set_expected_arrival_date)::boolean then
    sqlc.arg(expected_arrival_date)::date
  else
    expected_arrival_date
  end,
  actual_arrival_date = case when sqlc.arg(set_actual_arrival_date)::boolean then
    sqlc.arg(actual_arrival_date)::date
  else
    actual_arrival_date
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveInboundShipment :exec
delete from "wms"."inbound_shipments"
where id = @id::uuid;
