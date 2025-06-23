
-- name: CreatePayment :one
insert into payments (
  invoice, 
  payment_date, 
  amount_paid, 
  payment_method, 
  transaction_id, 
  status, 
  notes
)
values (
  @invoice_id::uuid, 
  @payment_date::timestamptz, 
  @amount_paid::numeric, 
  @payment_method::text, 
  @transaction_id::text, 
  @status::text, 
  @notes::text
)
returning *;

-- name: GetPayments :many
select * from payments order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentByID :one
select * from payments where id = @id::uuid;

-- name: UpdatePaymentStatus :one
update payments set status = @status::text where id = @id::uuid returning *;

-- name: UpdatePaymentAmount :one
update payments set amount_paid = @amount_paid::numeric where id = @id::uuid returning *;

-- name: UpdatePaymentNotes :one
update payments set notes = @notes::text where id = @id::uuid returning *;

-- name: SearchPayments :many
select * from payments where transaction_id ilike '%' || @search_text::text || '%' or
  status ilike '%' || @search_text::text || '%' or
  notes ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByStatus :many
select * from payments where status = @status::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByInvoice :many
select * from payments where invoice = @invoice::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByDateRange :many
select * from payments where payment_date >= @start_date::timestamptz and payment_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByInvoiceAndStatus :many
select * from payments where invoice = @invoice::uuid and status = @status::text
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByInvoiceAndDateRange :many
select * from payments where invoice = @invoice::uuid and payment_date >= @start_date::timestamptz and payment_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByMethod :many
select * from payments where payment_method = @payment_method::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByMethodAndStatus :many
select * from payments where payment_method = @payment_method::text and status = @status::text
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByMethodAndDateRange :many
select * from payments where payment_method = @payment_method::text and payment_date >= @start_date::timestamptz and payment_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetPaymentsByTransactionID :many
select * from payments where transaction_id = @transaction_id::text order by created desc offset @page::integer limit @per_page::integer;