
-- name: CreateOrder :one
insert into orders (
  custom_id, 
  customer, 
  order_date, 
  status, 
  total_amount, 
  created_by, 
  shipping_address, 
  billing_address, 
  assigned_warehouse
) values (
  @custom_id::text,
  @customer_id::uuid,
  @order_date::timestamptz,
  @status::text,
  @total_amount::numeric,
  @created_by::uuid,
  @shipping_address::text,
  @billing_address::text,
  @assigned_warehouse::uuid
)
returning *;

-- name: GetAllOrders :many
select * from orders order by created desc;

-- name: PaginateOrders :many
select * from orders order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrderByID :one
select * from orders where id = @id::uuid;

-- name: UpdateOrderStatus :one
update orders set status = @status::text where id = @id::uuid returning *;

-- name: UpdateOrderTotalAmount :one
update orders set total_amount = @total_amount::numeric where id = @id::uuid returning *;

-- name: UpdateOrderShippingAddress :one
update orders set shipping_address = @shipping_address::text where id = @id::uuid returning *;

-- name: UpdateOrderBillingAddress :one
update orders set billing_address = @billing_address::text where id = @id::uuid returning *;

-- name: UpdateOrderAssignedWarehouse :one
update orders set assigned_warehouse = @assigned_warehouse::uuid where id = @id::uuid returning *;

-- name: DeleteOrder :one
delete from orders where id = @id::uuid returning *;

-- name: SearchOrders :many
select * from orders where custom_id ilike '%' || @search_text::text || '%' or shipping_address ilike '%' || @search_text::text || '%' or billing_address ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrdersByCustomer :many
select * from orders where customer = @customer_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrdersByStatus :many
select * from orders where status = @status::text order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrdersByDateRange :many
select * from orders where order_date >= @start_date::timestamptz and order_date <= @end_date::timestamptz order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrdersByWarehouse :many
select * from orders where assigned_warehouse = @warehouse_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: CreateOrderLineItem :one
insert into order_line_items (
  "order", 
  product, 
  quantity, 
  price_per_unit
) values (
  @order_id::uuid, 
  @product_id::uuid, 
  @quantity::integer, 
  @price_per_unit::numeric
)
returning *;

-- name: GetOrderLineItems :many
select * from order_line_items where "order" = @order_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrderLineItemByID :one
select * from order_line_items where id = @id::uuid;

-- name: UpdateOrderLineItemQuantity :one
update order_line_items set quantity = @quantity::integer where id = @id::uuid returning *;

-- name: UpdateOrderLineItemPricePerUnit :one
update order_line_items set price_per_unit = @price_per_unit::numeric where id = @id::uuid returning *;

-- name: DeleteOrderLineItem :one
delete from order_line_items where id = @id::uuid returning *;

-- name: GetOrderLineItemsByProduct :many
select * from order_line_items where product = @product_id::uuid order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrderLineItemsByOrder :many
select * from order_line_items where "order" = @order_id::uuid order by created desc offset @page::integer limit @per_page::integer;
