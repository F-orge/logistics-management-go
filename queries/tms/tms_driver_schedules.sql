-- name: TmsPaginateDriverSchedule :many
select
  sqlc.embed(driver_schedules),
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where
  (driver.name ilike sqlc.narg(search)::text
  or driver_schedules.reason::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindDriverSchedule :one
select
  sqlc.embed(driver_schedules),
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where
  driver_schedules.id = sqlc.arg(id)::uuid;

-- name: TmsAnyDriverSchedule :many
select
  sqlc.embed(driver_schedules),
  sqlc.embed(driver)
from
  "tms"."driver_schedules" as driver_schedules
  inner join "tms"."drivers" as driver on driver_schedules.driver_id = driver.id
where
  driver_schedules.id = any (@ids::uuid[]);

-- name: TmsRangeDriverSchedule :many
select
  sqlc.embed(driver_schedules),
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
  driver_id = case when sqlc.arg(set_driver_id)::boolean then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  start_date = case when sqlc.arg(set_start_date)::boolean then
    sqlc.arg(start_date)::date
  else
    start_date
  end,
  end_date = case when sqlc.arg(set_end_date)::boolean then
    sqlc.arg(end_date)::date
  else
    end_date
  end,
  reason = case when sqlc.arg(set_reason)::boolean then
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
