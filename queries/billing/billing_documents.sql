-- name: BillingPaginateDocument :many
select
  sqlc.embed(documents),
  sqlc.embed(uploaded_by_user)
from
  "billing"."documents" as documents
  left join "public"."user" as uploaded_by_user on documents.uploaded_by_user_id = uploaded_by_user.id
where
  (documents.file_name ilike sqlc.narg(search)::text
  or documents.record_type ilike sqlc.narg(search)::text
  or documents.document_type::text ilike sqlc.narg(search)::text
  or uploaded_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: BillingFindDocument :one
select
  sqlc.embed(documents),
  sqlc.embed(uploaded_by_user)
from
  "billing"."documents" as documents
  left join "public"."user" as uploaded_by_user on documents.uploaded_by_user_id = uploaded_by_user.id
where
  documents.id = sqlc.arg(id)::uuid;

-- name: BillingAnyDocument :many
select
  sqlc.embed(documents),
  sqlc.embed(uploaded_by_user)
from
  "billing"."documents" as documents
  left join "public"."user" as uploaded_by_user on documents.uploaded_by_user_id = uploaded_by_user.id
where
  documents.id = any (@ids::uuid[]);

-- name: BillingRangeDocument :many
select
  sqlc.embed(documents),
  sqlc.embed(uploaded_by_user)
from
  "billing"."documents" as documents
  left join "public"."user" as uploaded_by_user on documents.uploaded_by_user_id = uploaded_by_user.id
where
  documents.created_at >= @dateFrom::date
  and documents.created_at <= @dateTo::date
  and (documents.file_name ilike sqlc.narg(search)::text
  or documents.record_type ilike sqlc.narg(search)::text
  or documents.document_type::text ilike sqlc.narg(search)::text
  or uploaded_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: BillingInsertDocument :one
insert into "billing"."documents"(record_id, record_type, document_type, file_path, file_name, file_size, mime_type, uploaded_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: BillingUpdateDocument :one
update
  "billing"."documents"
set
  updated_at = now(),
  record_id = case when sqlc.arg(set_record_id)::boolean then
    sqlc.arg(record_id)::uuid
  else
    record_id
  end,
  record_type = case when sqlc.arg(set_record_type)::boolean then
    sqlc.arg(record_type)::varchar
  else
    record_type
  end,
  document_type = case when sqlc.arg(set_document_type)::boolean then
    sqlc.arg(document_type)::billing.document_type_enum
  else
    document_type
  end,
  file_path = case when sqlc.arg(set_file_path)::boolean then
    sqlc.arg(file_path)::varchar
  else
    file_path
  end,
  file_name = case when sqlc.arg(set_file_name)::boolean then
    sqlc.arg(file_name)::varchar
  else
    file_name
  end,
  file_size = case when sqlc.arg(set_file_size)::boolean then
    sqlc.arg(file_size)::integer
  else
    file_size
  end,
  mime_type = case when sqlc.arg(set_mime_type)::boolean then
    sqlc.arg(mime_type)::varchar
  else
    mime_type
  end,
  uploaded_by_user_id = case when sqlc.arg(set_uploaded_by_user_id)::boolean then
    sqlc.arg(uploaded_by_user_id)::text
  else
    uploaded_by_user_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveDocument :exec
delete from "billing"."documents"
where id = @id::uuid;
