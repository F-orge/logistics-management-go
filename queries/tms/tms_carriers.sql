-- name: TmsPaginateCarrierMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "tms"."carriers_view" as carriers;

-- name: TmsPaginateCarrier :many
select
  *
from
  "tms"."carriers_view" as carriers
where (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindCarrier :one
select
  *
from
  "tms"."carriers_view"
where
  id = sqlc.arg(id)::uuid;

-- name: TmsAnyCarrier :many
select
  *
from
  "tms"."carriers_view"
where
  id = any (@ids::uuid[]);

-- name: TmsRangeCarrier :many
select
  *
from
  "tms"."carriers_view"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertCarrier :one
insert into "tms"."carriers"(name, contact_details, services_offered)
  values ($1, $2, $3)
returning
  *;

-- name: TmsUpdateCarrier :one
update
  "tms"."carriers"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::varchar
  else
    name
  end,
  contact_details = case when sqlc.arg(contact_details) is not null then
    sqlc.arg(contact_details)::text
  else
    contact_details
  end,
  services_offered = case when sqlc.arg(services_offered) is not null then
    sqlc.arg(services_offered)::text
  else
    services_offered
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveCarrier :exec
delete from "tms"."carriers"
where id = @id::uuid;

