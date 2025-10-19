-- name: DmsPaginateTaskEventMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "dms"."task_events" as task_events;

-- name: DmsPaginateTaskEvent :many
select
  task_events.*,
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where (task_events.status::text ilike sqlc.narg(search)::text
  or delivery_task.recipient_name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: DmsFindTaskEvent :one
select
  task_events.*,
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where
  task_events.id = sqlc.arg(id)::uuid;

-- name: DmsAnyTaskEvent :many
select
  task_events.*,
  sqlc.embed(delivery_task)
from
  "dms"."task_events" as task_events
  inner join "dms"."delivery_tasks" as delivery_task on task_events.delivery_task_id = delivery_task.id
where
  task_events.id = any (@ids::uuid[]);

-- name: DmsRangeTaskEvent :many
select
  task_events.*,
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
  updated_at = now(),
  delivery_task_id = case when sqlc.arg(delivery_task_id) is not null then
    sqlc.arg(delivery_task_id)::uuid
  else
    delivery_task_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::dms.task_event_status_enum
  else
    status
  end,
  reason = case when sqlc.arg(reason) is not null then
    sqlc.arg(reason)::text
  else
    reason
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
  end,
  latitude = case when sqlc.arg(latitude) is not null then
    sqlc.arg(latitude)::real
  else
    latitude
  end,
  longitude = case when sqlc.arg(longitude) is not null then
    sqlc.arg(longitude)::real
  else
    longitude
  end,
  timestamp = case when sqlc.arg(timestamp) is not null then
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

