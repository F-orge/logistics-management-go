-- name: TmsPaginateDriverScheduleMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "tms"."driver_schedules" as driver_schedules;

-- name: TmsPaginateDriverSchedule :many
select
  driver_schedules.*,
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where (driver.name ilike sqlc.narg(search)::text
  or driver_schedules.reason::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindDriverSchedule :one
select
  driver_schedules.*,
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where
  driver_schedules.id = sqlc.arg(id)::uuid;

-- name: TmsAnyDriverSchedule :many
select
  driver_schedules.*,
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where
  driver_schedules.id = any (@ids::uuid[]);

-- name: TmsRangeDriverSchedule :many
select
  driver_schedules.*,
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where
  driver_schedules.created_at >= @dateFrom::date
  and driver_schedules.created_at <= @dateTo::date
  and (driver.name ilike sqlc.narg(search)::text
    or driver_schedules.reason::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertDriverSchedule :one
insert into "tms"."driver_schedules"(driver_id, start_date, end_date, reason)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateDriverSchedule :one
update
  "tms"."driver_schedules"
set
  updated_at = now(),
  driver_id = case when sqlc.arg(driver_id) is not null then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  start_date = case when sqlc.arg(start_date) is not null then
    sqlc.arg(start_date)::date
  else
    start_date
  end,
  end_date = case when sqlc.arg(end_date) is not null then
    sqlc.arg(end_date)::date
  else
    end_date
  end,
  reason = case when sqlc.arg(reason) is not null then
    sqlc.arg(reason)::tms.driver_schedule_reason_enum
  else
    reason
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveDriverSchedule :exec
delete from "tms"."driver_schedules"
where id = @id::uuid;

