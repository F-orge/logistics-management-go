
-- name: CreateInvoice :one
insert into invoices (invoice_number, "order", customer, invoice_date, due_date, total_amount, status, invoice_pdf_url)
values ($1, $2, $3, $4, $5, $6,
  $7, $8)
returning *;

-- name: GetInvoices :many
select * from invoices order by created desc offset $1 limit $2;

-- name: GetInvoiceByID :one
select * from invoices where id = $1;

-- name: UpdateInvoiceStatus :one
update invoices set status = $1 where id = $2 returning *;

-- name: UpdateInvoiceTotalAmount :one
update invoices set total_amount = $1 where id = $2 returning *;

-- name: UpdateInvoiceDueDate :one
update invoices set due_date = $1 where id = $2 returning *;

-- name: DeleteInvoice :one
delete from invoices where id = $1 returning *;

-- name: SearchInvoices :many
select * from invoices where invoice_number ilike '%' || @search_text::text || '%' or
  status ilike '%' || @search_text::text || '%' or
  customer ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer; 

-- name: GetInvoicesByStatus :many
select * from invoices where status = $1 order by created desc offset $2 limit $3;

-- name: GetInvoicesByCustomer :many
select * from invoices where customer = $1 order by created desc offset $2 limit $3;

-- name: GetInvoicesByOrder :many
select * from invoices where "order" = $1 order by created desc offset $2 limit $3;

-- name: GetInvoicesByDateRange :many
select * from invoices where invoice_date >= $1 and invoice_date <= $2
order by created desc offset $3 limit $4;

-- name: GetInvoicesByDueDateRange :many
select * from invoices where due_date >= $1 and due_date <= $2
order by created desc offset $3 limit $4;

-- name: GetInvoicesByCustomerAndStatus :many
select * from invoices where customer = $1 and status = $2
order by created desc offset $3 limit $4;

-- name: GetInvoicesByOrderAndStatus :many
select * from invoices where "order" = $1 and status = $2
order by created desc offset $3 limit $4;

-- name: GetInvoicesByCustomerAndDateRange :many
select * from invoices where customer = $1 and invoice_date >= $2 and invoice_date <= $3
order by created desc offset $4 limit $5;

-- name: GetInvoicesByOrderAndDateRange :many
select * from invoices where "order" = $1 and invoice_date >= $2 and invoice_date <= $3
order by created desc offset $4 limit $5;

-- name: GetInvoicesByCustomerAndDueDateRange :many
select * from invoices where customer = $1 and due_date >= $2 and due_date <= $3
order by created desc offset $4 limit $5;

-- name: GetInvoicesByOrderAndDueDateRange :many
select * from invoices where "order" = $1 and due_date >= $2 and due_date <= $3
order by created desc offset $4 limit $5;

-- name: GetInvoicesByCustomerAndStatusAndDateRange :many
select * from invoices where customer = $1 and status = $2 and invoice_date >= $3 and invoice_date <= $4
order by created desc offset $5 limit $6;

-- name: GetInvoicesByOrderAndStatusAndDateRange :many
select * from invoices where "order" = $1 and status = $2 and invoice_date >= $3 and invoice_date <= $4
order by created desc offset $5 limit $6;