
-- name: CreatePayment :one
insert into payments (invoice, payment_date, amount_paid, payment_method, transaction_id, status, notes)
values ($1, $2, $3, $4, $5, $6, $7)
returning *;

-- name: GetPayments :many
select * from payments order by created desc offset $1 limit $2;

-- name: GetPaymentByID :one
select * from payments where id = $1;

-- name: UpdatePaymentStatus :one
update payments set status = $1 where id = $2 returning *;

-- name: UpdatePaymentAmount :one
update payments set amount_paid = $1 where id = $2 returning *;

-- name: UpdatePaymentNotes :one
update payments set notes = $1 where id = $2 returning *;

-- name: SearchPayments :many
select * from payments where transaction_id ilike '%' || @search_text::text || '%' or
  status ilike '%' || @search_text::text || '%' or
  notes ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByStatus :many
select * from payments where status = $1 order by created desc offset $2 limit $3;

-- name: GetPaymentsByInvoice :many
select * from payments where invoice = $1 order by created desc offset $2 limit $3;

-- name: GetPaymentsByDateRange :many
select * from payments where payment_date >= $1 and payment_date <= $2
order by created desc offset $3 limit $4;

-- name: GetPaymentsByInvoiceAndStatus :many
select * from payments where invoice = $1 and status = $2
order by created desc offset $3 limit $4;

-- name: GetPaymentsByInvoiceAndDateRange :many
select * from payments where invoice = $1 and payment_date >= $2 and payment_date <= $3
order by created desc offset $4 limit $5;

-- name: GetPaymentsByMethod :many
select * from payments where payment_method = $1 order by created desc offset $2 limit $3;

-- name: GetPaymentsByMethodAndStatus :many
select * from payments where payment_method = $1 and status = $2
order by created desc offset $3 limit $4; 

-- name: GetPaymentsByMethodAndDateRange :many
select * from payments where payment_method = $1 and payment_date >= $2 and payment_date <= $3
order by created desc offset $4 limit $5;

-- name: GetPaymentsByTransactionID :many
select * from payments where transaction_id = $1 order by created desc offset $2 limit $3;