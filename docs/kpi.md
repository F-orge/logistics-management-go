
### 1\. `users` (Auth Collection)

**Overall User Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalUsers,
  count(case when verified = true then 1 end) as verifiedUsers,
  count(case when verified = false then 1 end) as unverifiedUsers,
  count(distinct role) as distinctRoles
from users;
```

**User Count by Role:**

```sql
select
  role as id,
  role,
  count(*) as userCountPerRole
from users
group by role;
```

**User Count by Company:**

```sql
select
  company as id,
  company as companyId,
  count(*) as userCountPerCompany
from users
where company is not null and company != ''
group by company;
```

**User Count by Department:**

```sql
select
  department as id,
  department as departmentId,
  count(*) as userCountPerDepartment
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
  count(*) as totalCompanies,
  count(distinct type) as distinctCompanyTypes
from companies;
```

**Company Count by Type:**

```sql
select
  type as id,
  type,
  count(*) as companyCountPerType
from companies
group by type;
```

-----

### 3\. `products` (Base Collection)

**Overall Product Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalProducts,
  avg(cost) as averageProductCost,
  count(case when image is not null and image != '' then 1 end) as productsWithImages,
  count(case when image is null or image = '' then 1 end) as productsWithoutImages
from products;
```

**Product Count by Supplier:**

```sql
select
  supplier as id,
  supplier as supplierId,
  count(*) as productCountPerSupplier
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
  count(*) as totalWarehouses
from warehouses;
```

**Warehouse Count by Manager:**

```sql
select
  manager as id,
  manager as managerId,
  count(*) as warehouseCountPerManager
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
  count(*) as totalOrders,
  sum(total_amount) as totalRevenueFromOrders,
  avg(total_amount) as averageOrderValue,
  count(case when status = 'delivered' then 1 end) as deliveredOrders,
  count(case when status = 'cancelled' then 1 end) as cancelledOrders,
  count(case when status = 'pending-validation' then 1 end) as pendingValidationOrders,
  count(case when status = 'shipped' then 1 end) as shippedOrders
from orders;
```

**Order Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as orderCountPerStatus,
  sum(total_amount) as totalAmountPerStatus
from orders
group by status;
```

*(Ensure that in your actual `orders.status` field, the values are stored as `pending-validation`, `validated`, `allocated`, `picking`, `packing`, `ready-for-shipment`, `shipped`, `delivered`, `cancelled`, `on-hold` for these queries to work as expected.)*

**Order Count by Customer:**

```sql
select
  customer as id,
  customer as customerId,
  count(*) as orderCountPerCustomer,
  sum(total_amount) as totalSpentByCustomer
from orders
group by customer;
```

**Monthly Orders and Revenue:**

```sql
select
  strftime('%Y-%m', order_date) as id,
  strftime('%Y-%m', order_date) as yearMonth,
  count(*) as monthlyOrderCount,
  sum(total_amount) as montlyRevenue
from orders
group by yearMonth
order by yearMonth desc;
```

-----

### 6\. `orderLineItems` (Base Collection)

**Overall Order Line Item Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalLineItems,
  sum(quantity) as totalQuantitySold,
  sum(subtotal) as totalSubtotalRevenue,
  avg(quantity) as averageQuantityPerLine,
  avg(price_per_unit) as averagePricePerUnit
from orderlineitems;
```

**Top Selling Products (by Quantity):**

```sql
select
  product as id,
  product as productId,
  sum(quantity) as totalQuantitySold,
  sum(subtotal) as totalRevenueFromProduct
from orderlineitems
group by product
order by total_quantity_sold desc;
```

**Revenue per Product:**

```sql
select
  product as id,
  product as productId,
  sum(subtotal) as revenuePerProduct
from orderlineitems
group by product
order by revenuePerProduct desc;
```

-----

### 7\. `inventoryItems` (Base Collection)

**Overall Inventory Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalInventoryRecords,
  sum(quantity_on_hand) as totalQuantityOnHandAllProducts,
  count(distinct product) as distinctProductInInventory
from inventoryitems;
```

**Inventory Quantity by Product:**

```sql
select
  product as id,
  product as productId,
  sum(quantity_on_hand) as totalQuantityforProduct
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
  count(*) as itemsExpiringSoonCount,
  sum(quantity_on_hand) as quantityExpiringSoon
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
  count(*) as totalShipments,
  count(case when status = 'delivered' then 1 end) as deliveredShipments,
  count(case when status = 'in-transit' then 1 end) as shipmentsInTransit,
  count(case when status = 'exception' then 1 end) as shipmentExceptions,
  count(case when proof_of_delivery is not null and proof_of_delivery != '' then 1 end) as shipmentWithPod
from shipments;
```

**Shipment Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as shipmentCountPerStatus
from shipments
group by status;
```

*(Ensure `shipments.status` values like `label-created`, `pending-pickup`, `in-transit`, `out-for-delivery`, `delivered`, `exception`, `returned` are used.)*

**Shipment Count by Carrier:**

```sql
select
  carrier as id,
  carrier as carrierId,
  count(*) as shipmentCountPerCarrier
from shipments
where carrier is not null and carrier != ''
group by carrier;
```

**Shipment Count by Driver:**

```sql
select
  driver as id,
  driver as driverId,
  count(*) as shipmentCountPerDriver
from shipments
where driver is not null and driver != ''
group by driver;
```

**On-Time Delivery Rate (for delivered shipments with estimated dates):**

```sql
select
  (row_number() over()) as id,
  sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1 else 0 end) as onTimeShipments,
  count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end) as totalComparableDeliveredShipments,
  (sum(case when actual_delivered_date is not null and estimated_delivered_date is not null and actual_delivered_date <= estimated_delivered_date then 1.0 else 0.0 end) * 100.0 / count(case when status = 'delivered' and actual_delivered_date is not null and estimated_delivered_date is not null then 1 end)) as onTimeDeliveryPercentage
from shipments
where status = 'delivered';
```

-----

### 9\. `vehicles` (Base Collection)

**Overall Vehicle Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalVehicles,
  avg(capacity_volume) as averageVolumeCapacity,
  avg(capacity_weight) as averageWeightCapacity,
  count(case when status = 'available' then 1 end) as availableVehicles,
  count(case when status = 'in-use' then 1 end) as vehiclesInUse,
  count(case when status = 'maintenance' then 1 end) as vehiclesInMaintainance
from vehicles;
```

**Vehicle Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as vehicleCountPerStatus
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
  count(*) as totalRoutes,
  count(case when status = 'completed' then 1 end) as completedRoutes,
  count(case when status = 'in-progress' then 1 end) as routesInProgress,
  count(case when status = 'planned' then 1 end) as plannedRoutes
from routes;
```

**Route Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as routeCountPerStatus
from routes
group by status;
```

*(Ensure `routes.status` values like `planned`, `in-progress`, `completed`, `delayed`, `cancelled` are used.)*

**Route Count by Driver Assigned:**

```sql
select
  driver_assigned as id,
  driver_assigned as driverId,
  count(*) as routeCountPerDriver
from routes
where driver_assigned is not null and driver_assigned != ''
group by driver_assigned;
```

**Route Count by Vehicle Assigned:**

```sql
select
  vehicle_assigned as id,
  vehicle_assigned as vehicleId,
  count(*) as routeCountPerVehicle
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
  count(*) as totalRouteSegment,
  count(distinct route) as distinctRoutesWithSegments
from routesegments;
```

**Route Segment Count by Type:**

```sql
select
  segment_type as id,
  segment_type as segmentType,
  count(*) as segmentCountPerType
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
  segment_type as segmentType,
  count(case when actual_arrival_time > estimated_arrival_time then 1 end) as delayedSegmentsCount
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
  count(*) as totalInvoices,
  sum(total_amount) as totalInvoiceAmount,
  count(case when status = 'paid' then 1 end) as paidInvoicesCount,
  sum(case when status = 'paid' then total_amount else 0 end) as totalAmountFromPaidInvoice,
  count(case when status = 'overdue' then 1 end) as overdueInvoicesCount,
  sum(case when status = 'overdue' then total_amount else 0 end) as totalOverdueAmount
from invoices;
```

**Invoice Count and Amount by Status:**

```sql
select
  status as id,
  status,
  count(*) as invoiceCountPerStatus,
  sum(total_amount) as totalAmountForStatus
from invoices
group by status;
```

*(Ensure `invoices.status` values like `draft`, `sent`, `paid`, `partially-paid`, `overdue`, `void` are used.)*

**Invoice Count and Amount by Customer:**

```sql
select
  customer as id,
  customer as customerId,
  count(*) as invoiceCountPerCustomer,
  sum(total_amount) as totalInvoicedToCustomer
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
  payment_method as paymentMethod,
  count(*) as paymentCountPerMethod,
  sum(amount_paid) as totalAmountByMethod
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
  count(*) as roomCountPerType
from chatrooms
group by type;
```

*(Ensure `chatRooms.type` values like `direct-message`, `group-chat`, `order-chat`, `support-chat` are used.)*

**Order-Related Chat Rooms:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalOrderChatRooms
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
  count(*) as totalDepartments
from departments;
```

**Department Manager and Employee Counts (if `users.department` links them):**

```sql
select
    d.id as id,
    d.name as departmentName,
    count(distinct case when u.role = 'department_manager' then u.id end) as managerCount,
    count(distinct case when u.role = 'department_employee' then u.id end) as employeeCount
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
  count(*) as totalTasks,
  count(case when status = 'done' then 1 end) as completedTasks,
  count(case when status = 'todo' then 1 end) as todoTasks,
  count(case when status = 'in-progress' then 1 end) as in_progressTasks,
  count(case when status = 'blocked' then 1 end) as blockedTasks,
  count(case when due_date < date('now') and status not in ('done', 'cancelled') then 1 end) as overdueTasks
from tasks;
```

**Task Count by Status:**

```sql
select
  status as id,
  status,
  count(*) as taskCountPerStatus
from tasks
group by status;
```

*(Ensure `tasks.status` values like `todo`, `scheduled`, `picking`, `packing`, `ready-for-dispatch`, `in-progress`, `blocked`, `review`, `done`, `cancelled` are used.)*

**Task Count by Priority:**

```sql
select
  priority as id,
  priority,
  count(*) as taskCountPerPriority
from tasks
where priority is not null and priority != ''
group by priority;
```

*(Ensure `tasks.priority` values like `low`, `medium`, `high`, `urgent` are used.)*

**Task Count by Department:**

```sql
select
  department as id,
  department as departmentId,
  count(*) as taskCountPerDepartment
from tasks
where department is not null and department != ''
group by department;
```

**Task Count for a Specific Tag (Example for 'dispatch' tag, assuming JSON array storage for `tags` field):**

```sql
select
  (row_number() over ()) as id,
  'dispatch' as tagname,
  count(*) as taskswithtagcount
from
  tasks,
  json_each(tasks.tags) as tag_item
where
  json_valid(tasks.tags) = 1 and 
  tag_item.value = 'dispatch';
```

*(Ensure tag values like `dispatch`, `warehouse`, `customer-update`, `inventory-check`, `finance-review` are used in the `where` clause if querying specific tags, and that they are stored this way in the JSON array.)*

-----

### 18\. `taskMessages` (Base Collection)

**Overall Task Message Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalTaskMessages,
  count(distinct task) as tasksWithMessages,
  count(distinct sender) as distinctTaskMessageSenders,
  count(case when attachments is not null and attachments != '' then 1 end) as taskMessagesWithAttachments
from taskmessages;
```

**Message Count per Task:**

```sql
select
  task as id,
  task as taskId,
  count(*) as messageCountInTask
from taskmessages
group by task
order by messageCountInTask desc;
```

-----

### 19\. `notifications` (Base Collection)

**Overall Notification Statistics:**

```sql
select
  (row_number() over()) as id,
  count(*) as totalNotifications,
  count(case when isRead = 1 then 1 end) as readNotifications,
  count(case when isRead = 0 then 1 end) as unreadNotifications,
  count(distinct type) as distinctNotificationTypes
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
  user_recipient as userId,
  count(*) as unreadNotificationCount
from notifications
where is_read = 0
group by user_recipient
order by unreadNotificationCount desc;
```

**Notification Count by Priority:**

```sql
select
  priority as id,
  priority,
  count(*) as notificationCountPerPriority
from notifications
where priority is not null and priority != ''
group by priority;
```

*(Ensure `notifications.priority` values like `low`, `medium`, `high` are used.)*