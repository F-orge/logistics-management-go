-- name: CrmPaginateAttachment :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(attachments)
from
  "crm"."attachments" as attachments
where (record_type::text ilike sqlc.narg(search)::text
  or mime_type ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindAttachment :one
select
  *
from
  "crm"."attachments"
where
  id = sqlc.arg(id)::uuid;

-- name: CrmAnyAttachment :many
select
  *
from
  "crm"."attachments"
where
  id = any (@ids::uuid[]);

-- name: CrmRangeAttachment :many
select
  *
from
  "crm"."attachments"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (record_type::text ilike sqlc.narg(search)::text
    or mime_type ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertAttachment :one
insert into "crm"."attachments"(file_name, file_path, mime_type, record_id, record_type)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: CrmUpdateAttachment :one
update
  "crm"."attachments"
set
  updated_at = now(),
  file_name = case when sqlc.arg(file_name) is not null then
    sqlc.arg(file_name)::varchar
  else
    file_name
  end,
  file_path = case when sqlc.arg(file_path) is not null then
    sqlc.arg(file_path)::varchar
  else
    file_path
  end,
  mime_type = case when sqlc.arg(mime_type) is not null then
    sqlc.arg(mime_type)::varchar
  else
    mime_type
  end,
  record_id = case when sqlc.arg(record_id) is not null then
    sqlc.arg(record_id)::uuid
  else
    record_id
  end,
  record_type = case when sqlc.arg(record_type) is not null then
    sqlc.arg(record_type)::crm.record_type
  else
    record_type
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveAttachment :exec
delete from "crm"."attachments"
where id = @id::uuid;

