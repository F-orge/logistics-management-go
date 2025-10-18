-- name: BillingPaginateCreditNote :many
select
  sqlc.embed(credit_notes),
  sqlc.embed(invoice),
  sqlc.embed(dispute),
  sqlc.embed(created_by_user)
from
  "billing"."credit_notes" as credit_notes
  inner join "billing"."invoices" as invoice on credit_notes.invoice_id = invoice.id
  left join "billing"."disputes" as dispute on credit_notes.dispute_id = dispute.id
  left join "public"."user" as created_by_user on credit_notes.created_by_user_id = created_by_user.id
where (invoice.invoice_number ilike sqlc.narg(search)::text
  or dispute.reason ilike sqlc.narg(search)::text
  or created_by_user.name ilike sqlc.narg(search)::text
  or credit_notes.credit_note_number ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: BillingFindCreditNote :one
select
  sqlc.embed(credit_notes),
  sqlc.embed(invoice),
  sqlc.embed(dispute),
  sqlc.embed(created_by_user)
from
  "billing"."credit_notes" as credit_notes
  inner join "billing"."invoices" as invoice on credit_notes.invoice_id = invoice.id
  left join "billing"."disputes" as dispute on credit_notes.dispute_id = dispute.id
  left join "public"."user" as created_by_user on credit_notes.created_by_user_id = created_by_user.id
where
  credit_notes.id = sqlc.arg(id)::uuid;

-- name: BillingAnyCreditNote :many
select
  sqlc.embed(credit_notes),
  sqlc.embed(invoice),
  sqlc.embed(dispute),
  sqlc.embed(created_by_user)
from
  "billing"."credit_notes" as credit_notes
  inner join "billing"."invoices" as invoice on credit_notes.invoice_id = invoice.id
  left join "billing"."disputes" as dispute on credit_notes.dispute_id = dispute.id
  left join "public"."user" as created_by_user on credit_notes.created_by_user_id = created_by_user.id
where
  credit_notes.id = any (@ids::uuid[]);

-- name: BillingRangeCreditNote :many
select
  sqlc.embed(credit_notes),
  sqlc.embed(invoice),
  sqlc.embed(dispute),
  sqlc.embed(created_by_user)
from
  "billing"."credit_notes" as credit_notes
  inner join "billing"."invoices" as invoice on credit_notes.invoice_id = invoice.id
  left join "billing"."disputes" as dispute on credit_notes.dispute_id = dispute.id
  left join "public"."user" as created_by_user on credit_notes.created_by_user_id = created_by_user.id
where
  credit_notes.created_at >= @dateFrom::date
  and credit_notes.created_at <= @dateTo::date
  and (invoice.invoice_number ilike sqlc.narg(search)::text
    or dispute.reason ilike sqlc.narg(search)::text
    or created_by_user.name ilike sqlc.narg(search)::text
    or credit_notes.credit_note_number ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertCreditNote :one
insert into "billing"."credit_notes"(invoice_id, dispute_id, credit_note_number, amount, reason, issue_date, applied_at, currency, notes, created_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning
  *;

-- name: BillingUpdateCreditNote :one
update
  "billing"."credit_notes"
set
  updated_at = now(),
  invoice_id = case when sqlc.arg(invoice_id) is not null then
    sqlc.arg(invoice_id)::uuid
  else
    invoice_id
  end,
  dispute_id = case when sqlc.arg(dispute_id) is not null then
    sqlc.arg(dispute_id)::uuid
  else
    dispute_id
  end,
  credit_note_number = case when sqlc.arg(credit_note_number) is not null then
    sqlc.arg(credit_note_number)::varchar
  else
    credit_note_number
  end,
  amount = case when sqlc.arg(amount) is not null then
    sqlc.arg(amount)::numeric
  else
    amount
  end,
  reason = case when sqlc.arg(reason) is not null then
    sqlc.arg(reason)::text
  else
    reason
  end,
  issue_date = case when sqlc.arg(issue_date) is not null then
    sqlc.arg(issue_date)::date
  else
    issue_date
  end,
  applied_at = case when sqlc.arg(applied_at) is not null then
    sqlc.arg(applied_at)::timestamp
  else
    applied_at
  end,
  currency = case when sqlc.arg(currency) is not null then
    sqlc.arg(currency)::varchar
  else
    currency
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
  end,
  created_by_user_id = case when sqlc.arg(created_by_user_id) is not null then
    sqlc.arg(created_by_user_id)::text
  else
    created_by_user_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveCreditNote :exec
delete from "billing"."credit_notes"
where id = @id::uuid;

