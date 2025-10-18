-- name: BillingPaginateAccountingSyncLog :many
select
  *
from
  "billing"."accounting_sync_log"
where (record_type ilike sqlc.narg(search)::text
  or external_system ilike sqlc.narg(search)::text
  or status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindAccountingSyncLog :one
select
  *
from
  "billing"."accounting_sync_log"
where
  id = sqlc.arg(id)::uuid;

-- name: BillingAnyAccountingSyncLog :many
select
  *
from
  "billing"."accounting_sync_log"
where
  id = any (@ids::uuid[]);

-- name: BillingRangeAccountingSyncLog :many
select
  *
from
  "billing"."accounting_sync_log"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (record_type ilike sqlc.narg(search)::text
    or external_system ilike sqlc.narg(search)::text
    or status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertAccountingSyncLog :one
insert into "billing"."accounting_sync_log"(record_id, record_type, external_system, external_id, status, error_message, request_payload, response_payload, last_sync_at, retry_count, next_retry_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning
  *;

-- name: BillingUpdateAccountingSyncLog :one
update
  "billing"."accounting_sync_log"
set
  updated_at = now(),
  record_id = case when sqlc.arg(record_id) is not null then
    sqlc.arg(record_id)::uuid
  else
    record_id
  end,
  record_type = case when sqlc.arg(record_type) is not null then
    sqlc.arg(record_type)::varchar
  else
    record_type
  end,
  external_system = case when sqlc.arg(external_system) is not null then
    sqlc.arg(external_system)::varchar
  else
    external_system
  end,
  external_id = case when sqlc.arg(external_id) is not null then
    sqlc.arg(external_id)::varchar
  else
    external_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::billing.sync_status_enum
  else
    status
  end,
  error_message = case when sqlc.arg(error_message) is not null then
    sqlc.arg(error_message)::text
  else
    error_message
  end,
  request_payload = case when sqlc.arg(request_payload) is not null then
    sqlc.arg(request_payload)::text
  else
    request_payload
  end,
  response_payload = case when sqlc.arg(response_payload) is not null then
    sqlc.arg(response_payload)::text
  else
    response_payload
  end,
  last_sync_at = case when sqlc.arg(last_sync_at) is not null then
    sqlc.arg(last_sync_at)::timestamp
  else
    last_sync_at
  end,
  retry_count = case when sqlc.arg(retry_count) is not null then
    sqlc.arg(retry_count)::integer
  else
    retry_count
  end,
  next_retry_at = case when sqlc.arg(next_retry_at) is not null then
    sqlc.arg(next_retry_at)::timestamp
  else
    next_retry_at
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveAccountingSyncLog :exec
delete from "billing"."accounting_sync_log"
where id = @id::uuid;

