-- name: BillingPaginateDisputeMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "billing"."disputes" as disputes;

-- name: BillingPaginateDispute :many
select
  disputes.*,
  sqlc.embed(line_item),
  sqlc.embed(client),
  sqlc.embed(resolved_by_user)
from
  "billing"."disputes" as disputes
  inner join "billing"."invoice_line_items" as line_item on disputes.line_item_id = line_item.id
  inner join "crm"."companies" as client on disputes.client_id = client.id
  left join "public"."user" as resolved_by_user on disputes.resolved_by_user_id = resolved_by_user.id
where (line_item.description ilike sqlc.narg(search)::text
  or client.name ilike sqlc.narg(search)::text
  or resolved_by_user.name ilike sqlc.narg(search)::text
  or disputes.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindDispute :one
select
  disputes.*,
  sqlc.embed(line_item),
  sqlc.embed(client),
  sqlc.embed(resolved_by_user)
from
  "billing"."disputes" as disputes
  inner join "billing"."invoice_line_items" as line_item on disputes.line_item_id = line_item.id
  inner join "crm"."companies" as client on disputes.client_id = client.id
  left join "public"."user" as resolved_by_user on disputes.resolved_by_user_id = resolved_by_user.id
where
  disputes.id = sqlc.arg(id)::uuid;

-- name: BillingAnyDispute :many
select
  disputes.*,
  sqlc.embed(line_item),
  sqlc.embed(client),
  sqlc.embed(resolved_by_user)
from
  "billing"."disputes" as disputes
  inner join "billing"."invoice_line_items" as line_item on disputes.line_item_id = line_item.id
  inner join "crm"."companies" as client on disputes.client_id = client.id
  left join "public"."user" as resolved_by_user on disputes.resolved_by_user_id = resolved_by_user.id
where
  disputes.id = any (@ids::uuid[]);

-- name: BillingRangeDispute :many
select
  disputes.*,
  sqlc.embed(line_item),
  sqlc.embed(client),
  sqlc.embed(resolved_by_user)
from
  "billing"."disputes" as disputes
  inner join "billing"."invoice_line_items" as line_item on disputes.line_item_id = line_item.id
  inner join "crm"."companies" as client on disputes.client_id = client.id
  left join "public"."user" as resolved_by_user on disputes.resolved_by_user_id = resolved_by_user.id
where
  disputes.created_at >= @dateFrom::date
  and disputes.created_at <= @dateTo::date
  and (line_item.description ilike sqlc.narg(search)::text
    or client.name ilike sqlc.narg(search)::text
    or resolved_by_user.name ilike sqlc.narg(search)::text
    or disputes.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertDispute :one
insert into "billing"."disputes"(line_item_id, client_id, reason, status, disputed_amount, resolution_notes, submitted_at, resolved_at, resolved_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning
  *;

-- name: BillingUpdateDispute :one
update
  "billing"."disputes"
set
  updated_at = now(),
  line_item_id = case when sqlc.arg(line_item_id) is not null then
    sqlc.arg(line_item_id)::uuid
  else
    line_item_id
  end,
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  reason = case when sqlc.arg(reason) is not null then
    sqlc.arg(reason)::text
  else
    reason
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::billing.dispute_status_enum
  else
    status
  end,
  disputed_amount = case when sqlc.arg(disputed_amount) is not null then
    sqlc.arg(disputed_amount)::numeric
  else
    disputed_amount
  end,
  resolution_notes = case when sqlc.arg(resolution_notes) is not null then
    sqlc.arg(resolution_notes)::text
  else
    resolution_notes
  end,
  submitted_at = case when sqlc.arg(submitted_at) is not null then
    sqlc.arg(submitted_at)::timestamp
  else
    submitted_at
  end,
  resolved_at = case when sqlc.arg(resolved_at) is not null then
    sqlc.arg(resolved_at)::timestamp
  else
    resolved_at
  end,
  resolved_by_user_id = case when sqlc.arg(resolved_by_user_id) is not null then
    sqlc.arg(resolved_by_user_id)::text
  else
    resolved_by_user_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveDispute :exec
delete from "billing"."disputes"
where id = @id::uuid;

