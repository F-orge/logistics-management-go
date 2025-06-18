
-- name: CreateOrder :one
insert into orders (custom_id, customer, order_date, status, total_amount, created_by, shipping_address, billing_address, assigned_warehouse) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *;

-- name: GetOrders :many
select * from orders order by created desc offset $1 limit $2;

-- name: GetOrderByID :one
select * from orders where id = $1;

-- name: UpdateOrderStatus :one
update orders set status = $1 where id = $2 returning *;

-- name: UpdateOrderTotalAmount :one
update orders set total_amount = $1 where id = $2 returning *;

-- name: UpdateOrderShippingAddress :one
update orders set shipping_address = $1 where id = $2 returning *;

-- name: UpdateOrderBillingAddress :one
update orders set billing_address = $1 where id = $2 returning *;

-- name: UpdateOrderAssignedWarehouse :one
update orders set assigned_warehouse = $1 where id = $2 returning *;

-- name: DeleteOrder :one
delete from orders where id = $1 returning *;

-- name: SearchOrders :many
select * from orders where custom_id ilike '%' || @search_text::text || '%' or shipping_address ilike '%' || @search_text::text || '%' or billing_address ilike '%' || @search_text::text || '%' order by created desc offset @page::integer limit @per_page::integer;

-- name: GetOrdersByCustomer :many
select * from orders where customer = $1 order by created desc offset $2 limit $3;

-- name: GetOrdersByStatus :many
select * from orders where status = $1 order by created desc offset $2 limit $3;

-- name: GetOrdersByDateRange :many
select * from orders where order_date >= $1 and order_date <= $2 order by created desc offset $3 limit $4;

-- name: GetOrdersByWarehouse :many
select * from orders where assigned_warehouse = $1 order by created desc offset $2 limit $3;

-- name: CreateOrderLineItem :one
insert into order_line_items ("order", product, quantity, price_per_unit) values ($1, $2, $3, $4)
returning *;

-- name: GetOrderLineItems :many
select * from order_line_items where "order" = $1 order by created desc offset $2 limit $3;

-- name: GetOrderLineItemByID :one
select * from order_line_items where id = $1;

-- name: UpdateOrderLineItemQuantity :one
update order_line_items set quantity = $1 where id = $2 returning *;

-- name: UpdateOrderLineItemPricePerUnit :one
update order_line_items set price_per_unit = $1 where id = $2 returning *;

-- name: DeleteOrderLineItem :one
delete from order_line_items where id = $1 returning *;

-- name: GetOrderLineItemsByProduct :many
select * from order_line_items where product = $1 order by created desc offset $2 limit $3;

-- name: GetOrderLineItemsByOrder :many
select * from order_line_items where "order" = $1 order by created desc offset $2 limit $3;
