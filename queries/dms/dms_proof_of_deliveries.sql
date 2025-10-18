-- name: DmsPaginateProofOfDelivery :many
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(delivery_task)
from
  "dms"."proof_of_deliveries" as proof_of_deliveries
  inner join "dms"."delivery_tasks" as delivery_task on proof_of_deliveries.delivery_task_id = delivery_task.id
where
  (proof_of_deliveries.recipient_name ilike sqlc.narg(search)::text
  or proof_of_deliveries.type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: DmsFindProofOfDelivery :one
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(delivery_task)
from
  "dms"."proof_of_deliveries" as proof_of_deliveries
  inner join "dms"."delivery_tasks" as delivery_task on proof_of_deliveries.delivery_task_id = delivery_task.id
where
  proof_of_deliveries.id = sqlc.arg(id)::uuid;

-- name: DmsAnyProofOfDelivery :many
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(delivery_task)
from
  "dms"."proof_of_deliveries" as proof_of_deliveries
  inner join "dms"."delivery_tasks" as delivery_task on proof_of_deliveries.delivery_task_id = delivery_task.id
where
  proof_of_deliveries.id = any (@ids::uuid[]);

-- name: DmsRangeProofOfDelivery :many
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(delivery_task)
from
  "dms"."proof_of_deliveries" as proof_of_deliveries
  inner join "dms"."delivery_tasks" as delivery_task on proof_of_deliveries.delivery_task_id = delivery_task.id
where
  proof_of_deliveries.created_at >= @dateFrom::date
  and proof_of_deliveries.created_at <= @dateTo::date
  and (proof_of_deliveries.recipient_name ilike sqlc.narg(search)::text
  or proof_of_deliveries.type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: DmsInsertProofOfDelivery :one
insert into "dms"."proof_of_deliveries"(delivery_task_id, type, file_path, signature_data, recipient_name, verification_code, latitude, longitude, timestamp)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning
  *;

-- name: DmsUpdateProofOfDelivery :one
update
  "dms"."proof_of_deliveries"
set
  delivery_task_id = case when sqlc.arg(set_delivery_task_id)::boolean then
    sqlc.arg(delivery_task_id)::uuid
  else
    delivery_task_id
  end,
  type = case when sqlc.arg(set_type)::boolean then
    sqlc.arg(type)::dms.proof_of_delivery_type_enum
  else
    type
  end,
  file_path = case when sqlc.arg(set_file_path)::boolean then
    sqlc.arg(file_path)::varchar
  else
    file_path
  end,
  signature_data = case when sqlc.arg(set_signature_data)::boolean then
    sqlc.arg(signature_data)::text
  else
    signature_data
  end,
  recipient_name = case when sqlc.arg(set_recipient_name)::boolean then
    sqlc.arg(recipient_name)::varchar
  else
    recipient_name
  end,
  verification_code = case when sqlc.arg(set_verification_code)::boolean then
    sqlc.arg(verification_code)::varchar
  else
    verification_code
  end,
  latitude = case when sqlc.arg(set_latitude)::boolean then
    sqlc.arg(latitude)::real
  else
    latitude
  end,
  longitude = case when sqlc.arg(set_longitude)::boolean then
    sqlc.arg(longitude)::real
  else
    longitude
  end,
  timestamp = case when sqlc.arg(set_timestamp)::boolean then
    sqlc.arg(timestamp)::timestamp
  else
    timestamp
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: DmsRemoveProofOfDelivery :exec
delete from "dms"."proof_of_deliveries"
where id = @id::uuid;
