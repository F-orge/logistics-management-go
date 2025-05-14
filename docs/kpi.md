Okay, here is the finalized set of SQL KPI queries in Markdown format. Please ensure that the string values used in `WHERE` clauses or `CASE` statements (e.g., for status fields) match the exact kebab-case or lowercase values stored in your database for these `select` type fields.

### 1\. `users` (Auth Collection)

**Overall User Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_users,
  count(case when verified = true then 1 end) as verified_users,
  count(case when verified = false then 1 end) as unverified_users,
  count(distinct role) as distinct_roles
from users;
```

**User Count by Role:**

```sql
select
  role as id,
  role,
  count(*) as user_count_per_role
from users
group by role;
```

**User Count by Company:**

```sql
select
  company as id,
  company as company_id,
  count(*) as user_count_per_company
from users
where company is not null and company != ''
group by company;
```

**User Count by Department:**

```sql
select
  department as id,
  department as department_id,
  count(*) as user_count_per_department
from users
where department is not null and department != ''
group by department;
```

-----

### 2\. `companies` (Base Collection)

**Overall Company Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_companies,
  count(distinct type) as distinct_company_types
from companies;
```

**Company Count by Type:**

```sql
select
  type as id,
  type,
  count(*) as company_count_per_type
from companies
group by type;
```

-----

### 3\. `products` (Base Collection)

**Overall Product Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_products,
  avg(cost) as average_product_cost,
  count(case when image is not null and image != '' then 1 end) as products_with_images,
  count(case when image is null or image = '' then 1 end) as products_without_images
from products;
```

**Product Count by Supplier:**

```sql
select
  supplier as id,
  supplier as supplier_id,
  count(*) as product_count_per_supplier
from products
where supplier is not null and supplier != ''
group by supplier;
```

-----

### 4\. `warehouses` (Base Collection)

**Overall Warehouse Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_warehouses
from warehouses;
```

**Warehouse Count by Manager:**

```sql
select
  manager as id,
  manager as manager_id,
  count(*) as warehouse_count_per_manager
from warehouses
where manager is not null and manager != ''
group by manager;
```

-----

### 5\. `orders` (Base Collection)

**Overall Order Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_orders,
  sum(total_amount) as total_revenue_from_orders,
  avg(total_amount) as average_order_value,
  count(case when status = 'delivered' then 1 end) as delivered_orders,
  count(case when status = 'cancelled' then 1 end) as cancelled_orders,
  count(case when status = 'pending-validation' then 1 end) as pending_validation_orders,
  count(case when status = 'shipped' then 1 end) as shipped_orders
from orders;
```

**Order Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as order_count_per_status,
  sum(total_amount) as total_amount_for_status
from orders
group by status;
```

*(Ensure that in your actual `orders.status` field, the values are stored as `pending-validation`, `validated`, `allocated`, `picking`, `packing`, `ready-for-shipment`, `shipped`, `delivered`, `cancelled`, `on-hold` for these queries to work as expected.)*

**Order Count by Customer:**

```sql
select
  customer as id,
  customer as customer_id,
  count(*) as order_count_per_customer,
  sum(total_amount) as total_spent_by_customer
from orders
group by customer;
```

**Monthly Orders and Revenue:**

```sql
select
  strftime('%Y-%m', order_date) as id,
  strftime('%Y-%m', order_date) as year_month,
  count(*) as monthly_order_count,
  sum(total_amount) as monthly_revenue
from orders
group by year_month
order by year_month desc;
```

-----

### 6\. `orderLineItems` (Base Collection)

**Overall Order Line Item Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_line_items,
  sum(quantity) as total_quantity_sold,
  sum(subtotal) as total_subtotal_revenue,
  avg(quantity) as average_quantity_per_line,
  avg(price_per_unit) as average_price_per_unit
from orderlineitems;
```

**Top Selling Products (by Quantity):**

```sql
select
  product as id,
  product as product_id,
  sum(quantity) as total_quantity_sold,
  sum(subtotal) as total_revenue_from_product
from orderlineitems
group by product
order by total_quantity_sold desc;
```

**Revenue per Product:**

```sql
select
  product as id,
  product as product_id,
  sum(subtotal) as revenue_per_product
from orderlineitems
group by product
order by revenue_per_product desc;
```

-----

### 7\. `inventoryItems` (Base Collection)

**Overall Inventory Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_inventory_records,
  sum(quantity_on_hand) as total_quantity_on_hand_all_products,
  count(distinct product) as distinct_products_in_inventory
from inventoryitems;
```

**Inventory Quantity by Product:**

```sql
select
  product as id,
  product as product_id,
  sum(quantity_on_hand) as total_quantity_for_product
from inventoryitems
group by product;
```

**Inventory Quantity by Warehouse:**

```sql
select
  warehouse as id,
  warehouse as warehouse_id,
  sum(quantity_on_hand) as total_quantity_in_warehouse
from inventoryitems
group by warehouse;
```

**Inventory by Status:**

```sql
select
  status as id,
  status,
  count(*) as item_count_by_status,
  sum(quantity_on_hand) as quantity_by_status
from inventoryitems
group by status;
```

*(Ensure `inventoryItems.status` values like `available`, `on-hold`, `allocated`, `damaged`, `in-transit-to-warehouse` are used in the database.)*

**Items Nearing Expiry (e.g., within next 30 days):**

```sql
select
  (row_number() over()) as id,
  count(*) as items_expiring_soon_count,
  sum(quantity_on_hand) as quantity_expiring_soon
from inventoryitems
where expiry_date is not null
  and expiry_date between date('now') and date('now', '+30 days');
```

-----

### 8\. `shipments` (Base Collection)

**Overall Shipment Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_shipments,
  count(case when status = 'delivered' then 1 end) as delivered_shipments,
  count(case when status = 'in-transit' then 1 end) as shipments_in_transit,
  count(case when status = 'exception' then 1 end) as shipment_exceptions,
  count(case when proof_of_delivery is not null and proof_of_delivery != '' then 1 end) as shipments_with_pod
from shipments;
```

**Shipment Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as shipment_count_per_status
from shipments
group by status;
```

*(Ensure `shipments.status` values like `label-created`, `pending-pickup`, `in-transit`, `out-for-delivery`, `delivered`, `exception`, `returned` are used.)*

**Shipment Count by Carrier:**

```sql
select
  carrier as id,
  carrier as carrier_id,
  count(*) as shipment_count_per_carrier
from shipments
where carrier is not null and carrier != ''
group by carrier;
```

**Shipment Count by Driver:**

```sql
select
  driver as id,
  driver as driver_id,
  count(*) as shipment_count_per_driver
from shipments
where driver is not null and driver != ''
group by driver;
```

**On-Time Delivery Rate (for delivered shipments with estimated dates):**

```sql
select
  (row_number() over()) as id,
  sum(case when actual_delivery_date is not null and estimated_delivery_date is not null and actual_delivery_date <= estimated_delivery_date then 1 else 0 end) as on_time_shipments,
  count(case when status = 'delivered' and actual_delivery_date is not null and estimated_delivery_date is not null then 1 end) as total_comparable_delivered_shipments,
  (sum(case when actual_delivery_date is not null and estimated_delivery_date is not null and actual_delivery_date <= estimated_delivery_date then 1.0 else 0.0 end) * 100.0 / count(case when status = 'delivered' and actual_delivery_date is not null and estimated_delivery_date is not null then 1 end)) as on_time_delivery_percentage
from shipments
where status = 'delivered';
```

-----

### 9\. `vehicles` (Base Collection)

**Overall Vehicle Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_vehicles,
  avg(capacity_volume) as average_volume_capacity,
  avg(capacity_weight) as average_weight_capacity,
  count(case when status = 'available' then 1 end) as available_vehicles,
  count(case when status = 'in-use' then 1 end) as vehicles_in_use,
  count(case when status = 'maintenance' then 1 end) as vehicles_in_maintenance
from vehicles;
```

**Vehicle Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as vehicle_count_per_status
from vehicles
group by status;
```

*(Ensure `vehicles.status` values like `available`, `in-use`, `maintenance`, `out-of-service` are used.)*

**Vehicle Count by Type:**

```sql
select
  type as id,
  type as vehicle_type,
  count(*) as vehicle_count_per_type
from vehicles
where type is not null and type != ''
group by type;
```

-----

### 10\. `routes` (Base Collection)

**Overall Route Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_routes,
  count(case when status = 'completed' then 1 end) as completed_routes,
  count(case when status = 'in-progress' then 1 end) as routes_in_progress,
  count(case when status = 'planned' then 1 end) as planned_routes
from routes;
```

**Route Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as route_count_per_status
from routes
group by status;
```

*(Ensure `routes.status` values like `planned`, `in-progress`, `completed`, `delayed`, `cancelled` are used.)*

**Route Count by Driver Assigned:**

```sql
select
  driver_assigned as id,
  driver_assigned as driver_id,
  count(*) as route_count_per_driver
from routes
where driver_assigned is not null and driver_assigned != ''
group by driver_assigned;
```

**Route Count by Vehicle Assigned:**

```sql
select
  vehicle_assigned as id,
  vehicle_assigned as vehicle_id,
  count(*) as route_count_per_vehicle
from routes
where vehicle_assigned is not null and vehicle_assigned != ''
group by vehicle_assigned;
```

-----

### 11\. `routeSegments` (Base Collection)

**Overall Route Segment Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_route_segments,
  count(distinct route) as distinct_routes_with_segments
from routesegments;
```

**Route Segment Count by Type:**

```sql
select
  segment_type as id,
  segment_type,
  count(*) as segment_count_per_type
from routesegments
group by segment_type;
```

*(Ensure `routeSegments.segment_type` values like `start-point`, `pickup`, `delivery`, `waypoint`, `end-point` are used.)*

**Average Time Spent at Segments (in minutes, where actual times are recorded):**

```sql
select
  segment_type as id,
  segment_type,
  avg(case
    when actual_arrival_time is not null and actual_departure_time is not null
    then (julianday(actual_departure_time) - julianday(actual_arrival_time)) * 24 * 60
    else null
  end) as avg_duration_minutes_at_segment
from routesegments
where actual_arrival_time is not null and actual_departure_time is not null
group by segment_type;
```

**Segments with Delays (Actual Arrival \> Estimated Arrival):**

```sql
select
  segment_type as id,
  segment_type,
  count(case when actual_arrival_time > estimated_arrival_time then 1 end) as delayed_segments_count
from routesegments
where actual_arrival_time is not null and estimated_arrival_time is not null
group by segment_type;
```

-----

### 12\. `invoices` (Base Collection)

**Overall Invoice Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_invoices,
  sum(total_amount) as total_invoiced_amount,
  count(case when status = 'paid' then 1 end) as paid_invoices_count,
  sum(case when status = 'paid' then total_amount else 0 end) as total_amount_from_paid_invoices,
  count(case when status = 'overdue' then 1 end) as overdue_invoices_count,
  sum(case when status = 'overdue' then total_amount else 0 end) as total_overdue_amount
from invoices;
```

**Invoice Count and Amount by Status:**

```sql
select
  status as id,
  status,
  count(*) as invoice_count_per_status,
  sum(total_amount) as total_amount_for_status
from invoices
group by status;
```

*(Ensure `invoices.status` values like `draft`, `sent`, `paid`, `partially-paid`, `overdue`, `void` are used.)*

**Invoice Count and Amount by Customer:**

```sql
select
  customer as id,
  customer as customer_id,
  count(*) as invoice_count_per_customer,
  sum(total_amount) as total_invoiced_to_customer
from invoices
group by customer;
```

-----

### 13\. `payments` (Base Collection)

**Overall Payment Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_payments_recorded,
  sum(amount_paid) as total_amount_paid,
  avg(amount_paid) as average_payment_amount,
  count(case when status = 'completed' then 1 end) as completed_payments,
  count(case when status = 'failed' then 1 end) as failed_payments,
  count(case when status = 'refunded' then 1 end) as refunded_payments
from payments;
```

**Payment Count and Amount by Method:**

```sql
select
  payment_method as id,
  payment_method,
  count(*) as payment_count_per_method,
  sum(amount_paid) as total_amount_via_method
from payments
where payment_method is not null and payment_method != ''
group by payment_method;
```

*(Ensure `payments.payment_method` values like `credit-card`, `bank-transfer`, `ach`, `check`, `cash`, `other` are used.)*

**Payment Count and Amount by Status:**

```sql
select
  status as id,
  status,
  count(*) as payment_count_per_status,
  sum(amount_paid) as total_amount_for_status
from payments
group by status;
```

*(Ensure `payments.status` values like `pending`, `completed`, `failed`, `refunded` are used.)*

-----

### 14\. `chatRooms` (Base Collection)

**Overall Chat Room Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_chat_rooms,
  count(distinct type) as distinct_room_types,
  count(case when last_message_at >= date('now', '-7 days') then 1 end) as rooms_active_last_7_days
from chatrooms;
```

**Chat Room Count by Type:**

```sql
select
  type as id,
  type,
  count(*) as room_count_per_type
from chatrooms
group by type;
```

*(Ensure `chatRooms.type` values like `direct-message`, `group-chat`, `order-chat`, `support-chat` are used.)*

**Order-Related Chat Rooms:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_order_chat_rooms
from chatrooms
where type = 'order-chat' and related_order is not null and related_order != '';
```

-----

### 15\. `chatMessages` (Base Collection)

**Overall Chat Message Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_chat_messages,
  count(distinct room) as rooms_with_messages,
  count(distinct sender) as distinct_senders,
  count(case when attachments is not null and attachments != '' then 1 end) as messages_with_attachments
from chatmessages;
```

**Message Count per Room:**

```sql
select
  room as id,
  room as room_id,
  count(*) as message_count_in_room
from chatmessages
group by room
order by message_count_in_room desc;
```

**Message Count per Sender:**

```sql
select
  sender as id,
  sender as sender_id,
  count(*) as message_count_from_sender
from chatmessages
group by sender
order by message_count_from_sender desc;
```

-----

### 16\. `departments` (Base Collection)

**Overall Department Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_departments
from departments;
```

**Department Manager and Employee Counts (if `users.department` links them):**

```sql
select
    d.id as id,
    d.name as department_name,
    count(distinct case when u.role = 'department_manager' then u.id end) as manager_count,
    count(distinct case when u.role = 'department_employee' then u.id end) as employee_count
from departments d
left join users u on u.department = d.id
group by d.id, d.name;
```

-----

### 17\. `tasks` (Base Collection)

**Overall Task Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_tasks,
  count(case when status = 'done' then 1 end) as completed_tasks,
  count(case when status = 'todo' then 1 end) as todo_tasks,
  count(case when status = 'in-progress' then 1 end) as in_progress_tasks,
  count(case when status = 'blocked' then 1 end) as blocked_tasks,
  count(case when due_date < date('now') and status not in ('done', 'cancelled') then 1 end) as overdue_tasks
from tasks;
```

**Task Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as task_count_per_status
from tasks
group by status;
```

*(Ensure `tasks.status` values like `todo`, `scheduled`, `picking`, `packing`, `ready-for-dispatch`, `in-progress`, `blocked`, `review`, `done`, `cancelled` are used.)*

**Task Count by Priority:**

```sql
select
  priority as id,
  priority,
  count(*) as task_count_per_priority
from tasks
where priority is not null and priority != ''
group by priority;
```

*(Ensure `tasks.priority` values like `low`, `medium`, `high`, `urgent` are used.)*

**Task Count by Department:**

```sql
select
  department as id,
  department as department_id,
  count(*) as task_count_per_department
from tasks
where department is not null and department != ''
group by department;
```

**Task Count for a Specific Tag (Example for 'dispatch' tag, assuming JSON array storage for `tags` field):**

```sql
select
  (row_number() over()) as id,
  'dispatch' as tag_name,
  count(*) as tasks_with_tag_count
from tasks, json_each(tasks.tags)
where json_each.value = 'dispatch';
```

*(Ensure tag values like `dispatch`, `warehouse`, `customer-update`, `inventory-check`, `finance-review` are used in the `where` clause if querying specific tags, and that they are stored this way in the JSON array.)*

-----

### 18\. `taskMessages` (Base Collection)

**Overall Task Message Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_task_messages,
  count(distinct task) as tasks_with_messages,
  count(distinct sender) as distinct_task_message_senders,
  count(case when attachments is not null and attachments != '' then 1 end) as task_messages_with_attachments
from taskmessages;
```

**Message Count per Task:**

```sql
select
  task as id,
  task as task_id,
  count(*) as message_count_in_task
from taskmessages
group by task
order by message_count_in_task desc;
```

-----

### 19\. `notifications` (Base Collection)

**Overall Notification Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as total_notifications,
  count(case when is_read = 1 then 1 end) as read_notifications,
  count(case when is_read = 0 then 1 end) as unread_notifications,
  count(distinct type) as distinct_notification_types
from notifications;
```

**Notification Count by Type:**

```sql
select
  type as id,
  type,
  count(*) as notification_count_per_type
from notifications
group by type;
```

*(Ensure `notifications.type` values like `new-task-assigned`, `task-updated`, `task-comment`, `order-status-updated`, `shipment-alert`, `new-chat-message`, `new-task-message`, `system-announcement`, `mention` are used.)*

**Unread Notifications per User:**

```sql
select
  user_recipient as id,
  user_recipient as user_id,
  count(*) as unread_notification_count
from notifications
where is_read = 0
group by user_recipient
order by unread_notification_count desc;
```

**Notification Count by Priority:**

```sql
select
  priority as id,
  priority,
  count(*) as notification_count_per_priority
from notifications
where priority is not null and priority != ''
group by priority;
```

*(Ensure `notifications.priority` values like `low`, `medium`, `high` are used.)*