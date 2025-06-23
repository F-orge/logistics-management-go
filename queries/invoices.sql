
-- name: CreateInvoice :one
insert into invoices (
  invoice_number, 
  "order", 
  customer, 
  invoice_date, 
  due_date, 
  total_amount, 
  status, 
  invoice_pdf_url
)
values (
  @invoice_number::text, 
  @order_id::uuid, 
  @customer_id::uuid, 
  @invoice_date::timestamptz, 
  @due_date::timestamptz, 
  @total_amount::numeric, 
  @status::text, 
  @invoice_pdf_url::text
)
returning *;

-- name: GetInvoices :many
select * from invoices order by created desc;

-- name: PaginateInvoices :many
select * from invoices order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoiceByID :one
select * from invoices where id = @id::uuid;

-- name: UpdateInvoiceStatus :one
update invoices set status = @status::text where id = @id::uuid returning *;

-- name: UpdateInvoiceTotalAmount :one
update invoices set total_amount = @total_amount::numeric where id = @id::uuid returning *;

-- name: UpdateInvoiceDueDate :one
update invoices set due_date = @due_date::timestamptz where id = @id::uuid returning *;

-- name: DeleteInvoice :one
delete from invoices where id = @id::uuid returning *;

-- name: SearchInvoices :many
select * from invoices where invoice_number ilike '%' || @search_text::text || '%' or
  status ilike '%' || @search_text::text || '%' or
  customer ilike '%' || @search_text::text || '%'
order by created desc offset @page::integer limit @per_page::integer; 

-- name: GetInvoicesByStatus :many
select * from invoices where status = @status::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByCustomer :many
select * from invoices where customer = @customer_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByOrder :many
select * from invoices where "order" = @order_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByDateRange :many
select * from invoices where invoice_date >= @start_date::timestamptz and invoice_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByDueDateRange :many
select * from invoices where due_date >= @start_date::timestamptz and due_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByCustomerAndStatus :many
select * from invoices where customer = @customer_id::uuid and status = @status::text
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByOrderAndStatus :many
select * from invoices where "order" = @order_id::uuid and status = @status::text
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByCustomerAndDateRange :many
select * from invoices where customer = @customer_id::uuid and invoice_date >= @start_date::timestamptz and invoice_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByOrderAndDateRange :many
select * from invoices where "order" = @order_id::uuid and invoice_date >= @start_date::timestamptz and invoice_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByCustomerAndDueDateRange :many
select * from invoices where customer = @customer_id::uuid and due_date >= @start_date::timestamptz and due_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByOrderAndDueDateRange :many
select * from invoices where "order" = @order_id::uuid and due_date >= @start_date::timestamptz and due_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByCustomerAndStatusAndDateRange :many
select * from invoices where customer = @customer_id::uuid and status = @status::text and invoice_date >= @start_date::timestamptz and invoice_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;

-- name: GetInvoicesByOrderAndStatusAndDateRange :many
select * from invoices where "order" = @order_id::uuid and status = @status::text and invoice_date >= @start_date::timestamptz and invoice_date <= @end_date::timestamptz
order by created desc offset @page::integer limit @per_page::integer;