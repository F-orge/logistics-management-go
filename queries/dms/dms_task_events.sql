-- name: DmsPaginateTaskEvent :many
select
  sqlc.embed(task_events),
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where
  (task_events.status::text ilike sqlc.narg(search)::text
  or delivery_task.recipient_name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: DmsFindTaskEvent :one
select
  sqlc.embed(task_events),
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where
  task_events.id = sqlc.arg(id)::uuid;

-- name: DmsAnyTaskEvent :many
select
  sqlc.embed(task_events),
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where
  task_events.id = any (@ids::uuid[]);

-- name: DmsRangeTaskEvent :many
select
  sqlc.embed(task_events),
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where
  task_events.created_at >= @dateFrom::date
  and task_events.created_at <= @dateTo::date
  and (task_events.status::text ilike sqlc.narg(search)::text
  or delivery_task.recipient_name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: DmsInsertTaskEvent :one
insert into "dms"."task_events"(delivery_task_id, status, reason, notes, latitude, longitude, timestamp)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: DmsUpdateTaskEvent :one
update
  "dms"."task_events"
set
  delivery_task_id = case when sqlc.arg(set_delivery_task_id)::boolean then
    sqlc.arg(delivery_task_id)::uuid
  else
    delivery_task_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::dms.task_event_status_enum
  else
    status
  end,
  reason = case when sqlc.arg(set_reason)::boolean then
    sqlc.arg(reason)::text
  else
    reason
  end,
  notes = case when sqlc.arg(set_notes)::boolean then
    sqlc.arg(notes)::text
  else
    notes
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

-- name: DmsRemoveTaskEvent :exec
delete from "dms"."task_events"
where id = @id::uuid;
