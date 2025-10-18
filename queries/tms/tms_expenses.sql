-- name: TmsPaginateExpense :many
select
  sqlc.embed(expenses),
  sqlc.embed(trip),
  sqlc.embed(driver)
from
  "tms"."expenses" as expenses
  left join "tms"."trips" as trip on expenses.trip_id = trip.id
  left join "tms"."drivers" as driver on expenses.driver_id = driver.id
where
  (trip.status::text ilike sqlc.narg(search)::text
  or driver.name ilike sqlc.narg(search)::text
  or expenses.type::text ilike sqlc.narg(search)::text
  or expenses.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindExpense :one
select
  sqlc.embed(expenses),
  sqlc.embed(trip),
  sqlc.embed(driver)
from
  "tms"."expenses" as expenses
  left join "tms"."trips" as trip on expenses.trip_id = trip.id
  left join "tms"."drivers" as driver on expenses.driver_id = driver.id
where
  expenses.id = sqlc.arg(id)::uuid;

-- name: TmsAnyExpense :many
select
  sqlc.embed(expenses),
  sqlc.embed(trip),
  sqlc.embed(driver)
from
  "tms"."expenses" as expenses
  left join "tms"."trips" as trip on expenses.trip_id = trip.id
  left join "tms"."drivers" as driver on expenses.driver_id = driver.id
where
  expenses.id = any (@ids::uuid[]);

-- name: TmsRangeExpense :many
select
  sqlc.embed(expenses),
  sqlc.embed(trip),
  sqlc.embed(driver)
from
  "tms"."expenses" as expenses
  left join "tms"."trips" as trip on expenses.trip_id = trip.id
  left join "tms"."drivers" as driver on expenses.driver_id = driver.id
where
  expenses.created_at >= @dateFrom::date
  and expenses.created_at <= @dateTo::date
  and (trip.status::text ilike sqlc.narg(search)::text
  or driver.name ilike sqlc.narg(search)::text
  or expenses.type::text ilike sqlc.narg(search)::text
  or expenses.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertExpense :one
insert into "tms"."expenses"(trip_id, driver_id, type, amount, currency, receipt_url, fuel_quantity, odometer_reading, status)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning
  *;

-- name: TmsUpdateExpense :one
update
  "tms"."expenses"
set
  trip_id = case when sqlc.arg(set_trip_id)::boolean then
    sqlc.arg(trip_id)::uuid
  else
    trip_id
  end,
  driver_id = case when sqlc.arg(set_driver_id)::boolean then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  type = case when sqlc.arg(set_type)::boolean then
    sqlc.arg(type)::tms.expense_type_enum
  else
    type
  end,
  amount = case when sqlc.arg(set_amount)::boolean then
    sqlc.arg(amount)::numeric
  else
    amount
  end,
  currency = case when sqlc.arg(set_currency)::boolean then
    sqlc.arg(currency)::tms.currency_enum
  else
    currency
  end,
  receipt_url = case when sqlc.arg(set_receipt_url)::boolean then
    sqlc.arg(receipt_url)::varchar
  else
    receipt_url
  end,
  fuel_quantity = case when sqlc.arg(set_fuel_quantity)::boolean then
    sqlc.arg(fuel_quantity)::real
  else
    fuel_quantity
  end,
  odometer_reading = case when sqlc.arg(set_odometer_reading)::boolean then
    sqlc.arg(odometer_reading)::integer
  else
    odometer_reading
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::tms.expense_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveExpense :exec
delete from "tms"."expenses"
where id = @id::uuid;
