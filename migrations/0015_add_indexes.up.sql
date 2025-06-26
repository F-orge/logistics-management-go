-- Add up migration script here
create index idx_orders_customer on orders (customer);

create index idx_orders_status on orders (status);

create index idx_orders_order_date on orders (order_date);

create index idx_inventory_product_warehouse on inventory_items (product, warehouse);

create index idx_inventory_status on inventory_items (status);

create index idx_shipments_tracking_number on shipments (tracking_number);

create index idx_shipments_status on shipments (status);