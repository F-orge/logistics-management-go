# ETMAR Logistics System: Final Proposed PocketBase Collections

This document outlines the final proposed PocketBase collections designed to support the functionalities described in the ETMAR Logistics' Next-Generation Logistics Management System Product Requirements Document. The `it_admin` application role has been removed, with its responsibilities either absorbed by other high-level application roles (like `executive`) or managed by PocketBase superusers via the Admin Dashboard.

---

### 1. `users` (Auth Collection)

* **Collection Name:** `users`
* **Collection Type:** `auth`
* **Schema (Fields):**
    * **Standard Auth Fields:** (Managed by PocketBase: `id`, `username`, `email`, `emailVisibility`, `verified`, `password`, `lastResetSentAt`, `lastVerificationSentAt`)
    * **Field 1:**
        * Name: `name`
        * Type: `text`
        * Required: `true`
        * Options:
            * Min Length: `2`
            * Max Length: `100`
    * **Field 2:**
        * Name: `role`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["executive", "warehouse_manager", "dispatch_coordinator", "delivery_driver", "customer_service_rep", "finance_dept", "customer_rep", "department_manager", "department_employee"]`
            * Max Select: `1`
    * **Field 3:**
        * Name: `avatar`
        * Type: `file`
        * Options:
            * Max Select: `1`
            * Max Size: `5242880` (5MB)
            * MIME Types: `["image/jpeg", "image/png", "image/webp"]`
    * **Field 4:**
        * Name: `company`
        * Type: `relation`
        * Options:
            * Collection: `companies`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 5:**
        * Name: `phone`
        * Type: `text`
    * **Field 6:**
        * Name: `department`
        * Type: `relation`
        * Options:
            * Collection: `departments`
            * Max Select: `1`
            * Cascade Delete: `false`
* **API Rules:**
    * List Rule: `@request.auth.id != "" && @request.auth.role = "executive"`
    * View Rule: `@request.auth.id = id || @request.auth.role = "executive" || (@request.auth.role = "department_manager" && @request.auth.department.id = department.id)`
    * Create Rule: `@request.auth.role = "executive"`
    * Update Rule: `@request.auth.id = id || @request.auth.role = "executive" || (@request.auth.role = "department_manager" && @request.auth.department.id = department.id)`
    * Delete Rule: `@request.auth.role = "executive"`
* **Options (Auth Collection Specific):**
    * Allow Email Auth: `true`
    * Allow OAuth2 Auth: `true`
    * Allow Username Auth: `false`
    * Min Password Length: `10`
    * Require Email: `true`

---

### 2. `companies` (Base Collection)

* **Collection Name:** `companies`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `name`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `type`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["customer", "supplier", "carrier", "internal"]`
            * Max Select: `1`
    * **Field 3:**
        * Name: `address`
        * Type: `text`
    * **Field 4:**
        * Name: `contact_email`
        * Type: `email`
    * **Field 5:**
        * Name: `contact_phone`
        * Type: `text`
    * **Field 6:**
        * Name: `primary_contact_person`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
* **API Rules:**
    * List Rule: `@request.auth.id != ""`
    * View Rule: `@request.auth.id != ""`
    * Create Rule: `@request.auth.role = "executive" || @request.auth.role = "customer_service_rep"`
    * Update Rule: `@request.auth.role = "executive" || @request.auth.role = "customer_service_rep"`
    * Delete Rule: `@request.auth.role = "executive"`

---

### 3. `products` (Base Collection)

* **Collection Name:** `products`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `sku`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `name`
        * Type: `text`
        * Required: `true`
    * **Field 3:**
        * Name: `description`
        * Type: `editor`
    * **Field 4:**
        * Name: `weight`
        * Type: `number`
        * Options:
            * Min: `0`
    * **Field 5:**
        * Name: `dimensions`
        * Type: `text`
        * Options:
            * Placeholder: "LxWxH unit (e.g., 10x5x3 cm)"
    * **Field 6:**
        * Name: `cost`
        * Type: `number`
        * Options:
            * Min: `0`
    * **Field 7:**
        * Name: `supplier`
        * Type: `relation`
        * Options:
            * Collection: `companies`
            * Max Select: `1`
            * Cascade Delete: `false`
            * Note: UI should filter by `companies.type = "supplier"`
    * **Field 8:**
        * Name: `image`
        * Type: `file`
        * Options:
            * Max Select: `1`
            * MIME Types: `["image/jpeg", "image/png", "image/webp"]`
* **API Rules:**
    * List Rule: `@request.auth.id != ""`
    * View Rule: `@request.auth.id != ""`
    * Create Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "executive"`
    * Update Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "executive"`
    * Delete Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "executive"`

---

### 4. `warehouses` (Base Collection)

* **Collection Name:** `warehouses`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `name`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `address`
        * Type: `text`
        * Required: `true`
    * **Field 3:**
        * Name: `location_gps`
        * Type: `geoPoint`
    * **Field 4:**
        * Name: `manager`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
            * Note: UI should filter by `users.role = "warehouse_manager"`
* **API Rules:**
    * List Rule: `@request.auth.id != ""`
    * View Rule: `@request.auth.id != ""`
    * Create Rule: `@request.auth.role = "executive"`
    * Update Rule: `@request.auth.role = "executive" || @request.auth.id = manager.id`
    * Delete Rule: `@request.auth.role = "executive"`

---

### 5. `orders` (Base Collection)

* **Collection Name:** `orders`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `order_id_custom`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `customer`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `companies`
            * Max Select: `1`
            * Note: UI should filter by `companies.type = "customer"`
    * **Field 3:**
        * Name: `order_date`
        * Type: `date`
        * Required: `true`
        * Options:
            * Default value (on create): `now`
    * **Field 4:**
        * Name: `status`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["pending_validation", "validated", "allocated", "picking", "packing", "ready_for_shipment", "shipped", "delivered", "cancelled", "on_hold"]`
            * Default value (on create): `"pending_validation"`
    * **Field 5:**
        * Name: `total_amount`
        * Type: `number`
        * Options:
            * Min: `0`
            * Note: This should be calculated based on `orderLineItems` and updated via hooks or application logic.
    * **Field 6:**
        * Name: `created_by`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 7:**
        * Name: `shipping_address`
        * Type: `text`
        * Required: `true`
    * **Field 8:**
        * Name: `billing_address`
        * Type: `text`
        * Required: `true`
    * **Field 9:**
        * Name: `assigned_warehouse`
        * Type: `relation`
        * Options:
            * Collection: `warehouses`
            * Max Select: `1`
            * Cascade Delete: `false`
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (@request.auth.role = "customer_service_rep" || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id))`
    * View Rule: `(@request.auth.id != "" && (@request.auth.role = "customer_service_rep" || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "finance_dept" || @request.auth.role = "executive")) || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id)`
    * Create Rule: `@request.auth.role = "customer_service_rep" || @request.auth.role = "executive"`
    * Update Rule: `@request.auth.role = "customer_service_rep" || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"`
    * Delete Rule: `@request.auth.role = "executive"` (Consider soft delete by changing status to "cancelled")

---

### 6. `orderLineItems` (Base Collection)

* **Collection Name:** `orderLineItems`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `order`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `orders`
            * Max Select: `1`
            * Cascade Delete: `true`
    * **Field 2:**
        * Name: `product`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `products`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 3:**
        * Name: `quantity`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `1`
    * **Field 4:**
        * Name: `price_per_unit`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `0`
    * **Field 5:**
        * Name: `subtotal`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `0`
            * Note: This should be calculated (quantity \* price_per_unit) via hooks or application logic.
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (order.customer.id = @request.auth.company.id || @request.auth.role != "customer_rep")`
    * View Rule: `@request.auth.id != "" && (order.customer.id = @request.auth.company.id || @request.auth.role != "customer_rep")`
    * Create Rule: `@request.auth.role = "customer_service_rep" || @request.auth.id = order.created_by.id`
    * Update Rule: `@request.auth.role = "customer_service_rep" || @request.auth.id = order.created_by.id` (Restrict updates after order processing)
    * Delete Rule: `@request.auth.role = "customer_service_rep" || @request.auth.id = order.created_by.id` (Restrict deletions after order processing)

---

### 7. `inventoryItems` (Base Collection)

* **Collection Name:** `inventoryItems`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `product`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `products`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 2:**
        * Name: `warehouse`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `warehouses`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 3:**
        * Name: `quantity_on_hand`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `0`
    * **Field 4:**
        * Name: `lot_number`
        * Type: `text`
    * **Field 5:**
        * Name: `serial_number`
        * Type: `text`
        * Unique: `true` (Set this only if individual serial number tracking is strictly required and always unique)
    * **Field 6:**
        * Name: `status`
        * Type: `select`
        * Options:
            * Values: `["available", "on_hold", "allocated", "damaged", "in_transit_to_warehouse"]`
            * Default value (on create): `"available"`
    * **Field 7:**
        * Name: `expiry_date`
        * Type: `date`
    * **Field 8:**
        * Name: `storage_location_code`
        * Type: `text`
        * Options:
            * Placeholder: "e.g., Aisle 5, Rack 3, Shelf B"
    * **Field 9:**
        * Name: `last_counted_date`
        * Type: `date`
* **API Rules:**
    * List Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk" || @request.auth.role = "executive"`
    * View Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk" || @request.auth.role = "executive"`
    * Create Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk"`
    * Update Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk"`
    * Delete Rule: `@request.auth.role = "warehouse_manager"` (Usually, items are adjusted, not deleted)

---

### 8. `shipments` (Base Collection)

* **Collection Name:** `shipments`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `order_ref`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `orders`
            * Max Select: `1`
    * **Field 2:**
        * Name: `tracking_number`
        * Type: `text`
        * Unique: `true` (If globally unique, otherwise unique per carrier)
    * **Field 3:**
        * Name: `carrier`
        * Type: `relation`
        * Options:
            * Collection: `companies`
            * Max Select: `1`
            * Note: UI should filter by `companies.type = "carrier"`
    * **Field 4:**
        * Name: `status`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["label_created", "pending_pickup", "in_transit", "out_for_delivery", "delivered", "exception", "returned"]`
            * Default value (on create): `"label_created"`
    * **Field 5:**
        * Name: `estimated_delivery_date`
        * Type: `date`
    * **Field 6:**
        * Name: `actual_delivery_date`
        * Type: `date`
    * **Field 7:**
        * Name: `proof_of_delivery`
        * Type: `file`
        * Options:
            * Max Select: `1`
            * MIME Types: `["image/jpeg", "image/png", "application/pdf"]`
    * **Field 8:**
        * Name: `driver`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Note: UI should filter by `users.role = "delivery_driver"`
    * **Field 9:**
        * Name: `current_location_notes`
        * Type: `text`
    * **Field 10:**
        * Name: `department_assigned`
        * Type: `relation`
        * Options:
            * Collection: `departments`
            * Max Select: `1`
            * Cascade Delete: `false`
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (order_ref.customer.id = @request.auth.company.id || @request.auth.role != "customer_rep" || @request.auth.id ~ department_assigned.managers.id || @request.auth.id ~ department_assigned.employees.id)`
    * View Rule: `@request.auth.id != "" && (order_ref.customer.id = @request.auth.company.id || @request.auth.role != "customer_rep" || @request.auth.id ~ department_assigned.managers.id || @request.auth.id ~ department_assigned.employees.id)`
    * Create Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "warehouse_manager"`
    * Update Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "warehouse_manager" || (@request.auth.role = "delivery_driver" && driver.id = @request.auth.id) || @request.auth.id ~ department_assigned.managers.id`
    * Delete Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"` (Usually shipments are cancelled/returned, not deleted)

---

### 9. `vehicles` (Base Collection)

* **Collection Name:** `vehicles`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `license_plate`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `make`
        * Type: `text`
    * **Field 3:**
        * Name: `model`
        * Type: `text`
    * **Field 4:**
        * Name: `type`
        * Type: `text`
        * Options:
            * Placeholder: "e.g., Cargo Van, 26ft Box Truck"
    * **Field 5:**
        * Name: `capacity_volume`
        * Type: `number`
        * Options:
            * Placeholder: "in cubic meters/feet"
    * **Field 6:**
        * Name: `capacity_weight`
        * Type: `number`
        * Options:
            * Placeholder: "in kg/lbs"
    * **Field 7:**
        * Name: `status`
        * Type: `select`
        * Options:
            * Values: `["available", "in_use", "maintenance", "out_of_service"]`
            * Default value (on create): `"available"`
    * **Field 8:**
        * Name: `current_driver`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Note: UI should filter by `users.role = "delivery_driver"`
* **API Rules:**
    * List Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"`
    * View Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"`
    * Create Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"`
    * Update Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"`
    * Delete Rule: `@request.auth.role = "executive"`

---

### 10. `routes` (Base Collection)

* **Collection Name:** `routes`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `route_name`
        * Type: `text`
        * Required: `true`
        * Options:
            * Placeholder: "e.g., Downtown Deliveries - May 9"
    * **Field 2:**
        * Name: `vehicle_assigned`
        * Type: `relation`
        * Options:
            * Collection: `vehicles`
            * Max Select: `1`
    * **Field 3:**
        * Name: `driver_assigned`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Note: UI should filter by `users.role = "delivery_driver"`
    * **Field 4:**
        * Name: `planned_start_time`
        * Type: `date`
    * **Field 5:**
        * Name: `planned_end_time`
        * Type: `date`
    * **Field 6:**
        * Name: `status`
        * Type: `select`
        * Options:
            * Values: `["planned", "in_progress", "completed", "delayed", "cancelled"]`
            * Default value (on create): `"planned"`
    * **Field 7:**
        * Name: `shipments_on_route`
        * Type: `relation`
        * Options:
            * Collection: `shipments`
            * Max Select: `0` (Many)
* **API Rules:**
    * List Rule: `@request.auth.role = "dispatch_coordinator" || @request.auth.role = "delivery_driver" || @request.auth.role = "executive"`
    * View Rule: `@request.auth.role = "dispatch_coordinator" || (@request.auth.role = "delivery_driver" && driver_assigned.id = @request.auth.id) || @request.auth.role = "executive"`
    * Create Rule: `@request.auth.role = "dispatch_coordinator"`
    * Update Rule: `@request.auth.role = "dispatch_coordinator" || (@request.auth.role = "delivery_driver" && driver_assigned.id = @request.auth.id)`
    * Delete Rule: `@request.auth.role = "dispatch_coordinator"`

---

### 11. `routeSegments` (Base Collection)

* **Collection Name:** `routeSegments`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `route`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `routes`
            * Max Select: `1`
            * Cascade Delete: `true`
    * **Field 2:**
        * Name: `sequence_number`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `0`
    * **Field 3:**
        * Name: `segment_type`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["start_point", "pickup", "delivery", "waypoint", "end_point"]`
    * **Field 4:**
        * Name: `address_text`
        * Type: `text`
    * **Field 5:**
        * Name: `location_gps`
        * Type: `geoPoint`
    * **Field 6:**
        * Name: `instructions`
        * Type: `text`
    * **Field 7:**
        * Name: `estimated_arrival_time`
        * Type: `date`
    * **Field 8:**
        * Name: `actual_arrival_time`
        * Type: `date`
    * **Field 9:**
        * Name: `estimated_departure_time`
        * Type: `date`
    * **Field 10:**
        * Name: `actual_departure_time`
        * Type: `date`
    * **Field 11:**
        * Name: `related_shipment`
        * Type: `relation`
        * Options:
            * Collection: `shipments`
            * Max Select: `1`
            * Cascade Delete: `false`
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (route.driver_assigned.id = @request.auth.id || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive")`
    * View Rule: `@request.auth.id != "" && (route.driver_assigned.id = @request.auth.id || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive")`
    * Create Rule: `@request.auth.role = "dispatch_coordinator"`
    * Update Rule: `@request.auth.role = "dispatch_coordinator" || (@request.auth.id = route.driver_assigned.id)`
    * Delete Rule: `@request.auth.role = "dispatch_coordinator"`

---

### 12. `invoices` (Base Collection)

* **Collection Name:** `invoices`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `invoice_number`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `order_ref`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `orders`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 3:**
        * Name: `customer`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `companies`
            * Max Select: `1`
            * Note: UI should filter by `companies.type = "customer"`
    * **Field 4:**
        * Name: `invoice_date`
        * Type: `date`
        * Required: `true`
    * **Field 5:**
        * Name: `due_date`
        * Type: `date`
        * Required: `true`
    * **Field 6:**
        * Name: `total_amount`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `0`
    * **Field 7:**
        * Name: `status`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["draft", "sent", "paid", "partially_paid", "overdue", "void"]`
            * Default value (on create): `"draft"`
    * **Field 8:**
        * Name: `invoice_pdf`
        * Type: `file`
        * Options:
            * Max Select: `1`
            * MIME Types: `["application/pdf"]`
* **API Rules:**
    * List Rule: `@request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id)`
    * View Rule: `@request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id)`
    * Create Rule: `@request.auth.role = "finance_dept"`
    * Update Rule: `@request.auth.role = "finance_dept"`
    * Delete Rule: `@request.auth.role = "finance_dept"` (Consider voiding via status update)

---

### 13. `payments` (Base Collection)

* **Collection Name:** `payments`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `invoice`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `invoices`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 2:**
        * Name: `payment_date`
        * Type: `date`
        * Required: `true`
    * **Field 3:**
        * Name: `amount_paid`
        * Type: `number`
        * Required: `true`
        * Options:
            * Min: `0.01`
    * **Field 4:**
        * Name: `payment_method`
        * Type: `select`
        * Options:
            * Values: `["credit_card", "bank_transfer", "ach", "check", "cash", "other"]`
    * **Field 5:**
        * Name: `transaction_id`
        * Type: `text`
    * **Field 6:**
        * Name: `status`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["pending", "completed", "failed", "refunded"]`
            * Default value (on create): `"completed"`
    * **Field 7:**
        * Name: `notes`
        * Type: `text`
* **API Rules:**
    * List Rule: `@request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && invoice.customer.id = @request.auth.company.id)`
    * View Rule: `@request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && invoice.customer.id = @request.auth.company.id)`
    * Create Rule: `@request.auth.role = "finance_dept"`
    * Update Rule: `@request.auth.role = "finance_dept"`
    * Delete Rule: `@request.auth.role = "finance_dept"` (Typically payments are not deleted but might be refunded, creating a new refund transaction)

---

### 14. `chatRooms` (Base Collection)

* **Collection Name:** `chatRooms`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `name`
        * Type: `text`
        * Options:
            * Placeholder: "e.g., Order XYZ Discussion, Support Chat with Customer A"
    * **Field 2:**
        * Name: `participants`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `users`
            * Max Select: `0` (Many users)
    * **Field 3:**
        * Name: `last_message_at`
        * Type: `date`
        * Options:
            * Note: Should be updated by a hook when a new message is added.
    * **Field 4:**
        * Name: `type`
        * Type: `select`
        * Options:
            * Values: `["direct_message", "group_chat", "order_chat", "support_chat"]`
            * Default value: `"direct_message"`
    * **Field 5 (Optional Relation):**
        * Name: `related_order`
        * Type: `relation`
        * Options:
            * Collection: `orders`
            * Max Select: `1`
            * Cascade Delete: `false`
* **API Rules:**
    * List Rule: `@request.auth.id != "" && @request.auth.id ~ participants.id`
    * View Rule: `@request.auth.id != "" && @request.auth.id ~ participants.id`
    * Create Rule: `@request.auth.id != ""`
    * Update Rule: `@request.auth.id != "" && @request.auth.id ~ participants.id`
    * Delete Rule: `@request.auth.id != "" && @request.auth.id ~ participants.id` (Or more restrictive based on creator/admin logic)

---

### 15. `chatMessages` (Base Collection)

* **Collection Name:** `chatMessages`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `room`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `chatRooms`
            * Max Select: `1`
            * Cascade Delete: `true`
    * **Field 2:**
        * Name: `sender`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 3:**
        * Name: `content`
        * Type: `text`
        * Required: `true`
        * Options:
            * Min Length: `1`
    * **Field 4:**
        * Name: `attachments`
        * Type: `file`
        * Options:
            * Max Select: `5`
            * MIME Types: `["image/jpeg", "image/png", "application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]`
    * **Field 5:**
        * Name: `read_by`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `0` (Many)
* **API Rules:**
    * List Rule: `@request.auth.id != "" && @request.auth.id ~ room.participants.id`
    * View Rule: `@request.auth.id != "" && @request.auth.id ~ room.participants.id`
    * Create Rule: `@request.auth.id != "" && @request.auth.id = sender.id && @request.auth.id ~ room.participants.id`
    * Update Rule: `@request.auth.id = sender.id` (Potentially with time limits)
    * Delete Rule: `@request.auth.id = sender.id` (Or room admin)

---

### 16. `departments` (Base Collection)

* **Collection Name:** `departments`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `name`
        * Type: `text`
        * Required: `true`
        * Unique: `true`
    * **Field 2:**
        * Name: `description`
        * Type: `editor`
    * **Field 3:**
        * Name: `cover_photo`
        * Type: `file`
        * Options:
            * Max Select: `1`
            * MIME Types: `["image/jpeg", "image/png", "image/webp"]`
    * **Field 4:**
        * Name: `managers`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `0` (Many managers)
            * Note: UI should filter by `users.role = "department_manager"`
    * **Field 5:**
        * Name: `employees`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `0` (Many employees)
            * Note: UI should filter by `users.role = "department_employee"`
* **API Rules:**
    * List Rule: `@request.auth.id != ""`
    * View Rule: `@request.auth.id != ""`
    * Create Rule: `@request.auth.role = "executive"`
    * Update Rule: `@request.auth.role = "executive" || @request.auth.id ~ managers.id`
    * Delete Rule: `@request.auth.role = "executive"`

---

### 17. `tasks` (Base Collection)

* **Collection Name:** `tasks`
* **Collection Type:** `base`
* **Schema (Fields):**
    * **Field 1:**
        * Name: `title`
        * Type: `text`
        * Required: `true`
    * **Field 2:**
        * Name: `description`
        * Type: `editor`
    * **Field 3:**
        * Name: `status` (Represents Kanban columns)
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["Todo", "Scheduled", "Picking", "Packing", "Ready for Dispatch", "In Progress", "Blocked", "Review", "Done", "Cancelled"]`
            * Default value (on create): `"Todo"`
    * **Field 4:**
        * Name: `priority`
        * Type: `select`
        * Options:
            * Values: `["Low", "Medium", "High", "Urgent"]`
            * Default value (on create): `"Medium"`
    * **Field 5:**
        * Name: `assigned_to`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `0` (Many users)
    * **Field 6:**
        * Name: `order_ref`
        * Type: `relation`
        * Options:
            * Collection: `orders`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 7:**
        * Name: `due_date`
        * Type: `date`
    * **Field 8:**
        * Name: `kanban_order`
        * Type: `number`
        * Options:
            * Min: `0`
            * Note: For UI ordering within a status column.
    * **Field 9:**
        * Name: `tags`
        * Type: `select`
        * Options:
            * Max Select: `0` (Multiple tags)
            * Values: `["Dispatch", "Warehouse", "Customer_Update", "Inventory_Check", "Finance_Review"]` (Expand as needed)
    * **Field 10:**
        * Name: `created_by`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 11:**
        * Name: `related_shipment`
        * Type: `relation`
        * Options:
            * Collection: `shipments`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 12:**
        * Name: `department`
        * Type: `relation`
        * Options:
            * Collection: `departments`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 13 (Optional):**
        * Name: `primary_attachment`
        * Type: `file`
        * Options:
            * Max Select: `1`
            * Note: For a primary document related to the task itself.
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (@request.auth.id ~ assigned_to.id || @request.auth.id = created_by.id || @request.auth.id ~ department.managers.id || @request.auth.id ~ department.employees.id || @request.auth.role = "executive" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "warehouse_manager")`
    * View Rule: `@request.auth.id != "" && (@request.auth.id ~ assigned_to.id || @request.auth.id = created_by.id || @request.auth.id ~ department.managers.id || @request.auth.id ~ department.employees.id || @request.auth.role = "executive" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "warehouse_manager")`
    * Create Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "customer_service_rep" || @request.auth.role = "executive" || @request.auth.id ~ department.managers.id`
    * Update Rule: `@request.auth.id != "" && (@request.auth.id = created_by.id || @request.auth.id ~ assigned_to.id || @request.auth.id ~ department.managers.id || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive")`
    * Delete Rule: `@request.auth.id = created_by.id || @request.auth.role = "executive" || @request.auth.id ~ department.managers.id` (Or change status to "Cancelled")

---

### 18. `taskMessages` (Base Collection)

* **Collection Name:** `taskMessages`
* **Collection Type:** `base`
* **Purpose:** To allow communication within a specific task among its participants.
* **Schema (Fields):**
    * **Field 1:**
        * Name: `task`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `tasks`
            * Max Select: `1`
            * Cascade Delete: `true`
    * **Field 2:**
        * Name: `sender`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
    * **Field 3:**
        * Name: `content`
        * Type: `text`
        * Required: `true`
        * Options:
            * Min Length: `1`
    * **Field 4:**
        * Name: `attachments`
        * Type: `file`
        * Options:
            * Max Select: `5`
            * MIME Types: `["image/jpeg", "image/png", "application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]`
    * **Field 5:**
        * Name: `read_by`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `0` (Many)
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (@request.auth.id ~ task.assigned_to.id || @request.auth.id = task.created_by.id || @request.auth.id ~ task.department.managers.id || @request.auth.id ~ task.department.employees.id)`
    * View Rule: `@request.auth.id != "" && (@request.auth.id ~ task.assigned_to.id || @request.auth.id = task.created_by.id || @request.auth.id ~ task.department.managers.id || @request.auth.id ~ task.department.employees.id)`
    * Create Rule: `@request.auth.id != "" && @request.auth.id = sender.id && (@request.auth.id ~ task.assigned_to.id || @request.auth.id = task.created_by.id || @request.auth.id ~ task.department.managers.id || @request.auth.id ~ task.department.employees.id)`
    * Update Rule: `@request.auth.id = sender.id` (Potentially with time limits)
    * Delete Rule: `@request.auth.id = sender.id || @request.auth.id = task.created_by.id || @request.auth.id ~ task.department.managers.id`

---

### 19. `notifications` (Base Collection)

* **Collection Name:** `notifications`
* **Collection Type:** `base`
* **Purpose:** To inform users about important events, updates, or actions relevant to them within the system.
* **Schema (Fields):**
    * **Field 1:**
        * Name: `user_recipient`
        * Type: `relation`
        * Required: `true`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `true`
    * **Field 2:**
        * Name: `type`
        * Type: `select`
        * Required: `true`
        * Options:
            * Values: `["new_task_assigned", "task_updated", "task_comment", "order_status_updated", "shipment_alert", "new_chat_message", "new_task_message", "system_announcement", "mention"]`
            * Max Select: `1`
    * **Field 3:**
        * Name: `title`
        * Type: `text`
        * Required: `true`
        * Options:
            * Max Length: `255`
    * **Field 4:**
        * Name: `message`
        * Type: `editor`
        * Required: `true`
    * **Field 5:**
        * Name: `is_read`
        * Type: `bool`
        * Required: `true`
        * Options:
            * Default value (on create): `false`
    * **Field 6:**
        * Name: `read_at`
        * Type: `date`
    * **Field 7 (Optional):**
        * Name: `link_collection_name`
        * Type: `text`
        * Options:
            * Placeholder: "e.g., tasks, orders, chatMessages"
    * **Field 8 (Optional):**
        * Name: `link_record_id`
        * Type: `text`
        * Options:
            * Placeholder: "ID of the related record"
    * **Field 9 (Optional):**
        * Name: `priority`
        * Type: `select`
        * Options:
            * Values: `["low", "medium", "high"]`
            * Default value (on create): `"medium"`
    * **Field 10 (Optional):**
        * Name: `sender_actor`
        * Type: `relation`
        * Options:
            * Collection: `users`
            * Max Select: `1`
            * Cascade Delete: `false`
            * Note: Can be null if it's a pure system notification.
* **API Rules:**
    * List Rule: `@request.auth.id = user_recipient.id`
    * View Rule: `@request.auth.id = user_recipient.id`
    * Create Rule: `@request.auth.id != ""` (Notifications are typically created by backend logic/hooks. This rule allows authenticated actions to trigger notification creation programmatically where the `user_recipient` is set by the backend.)
    * Update Rule: `@request.auth.id = user_recipient.id && (@request.data.is_read:isset = true || @request.data.read_at:isset = true)`
    * Delete Rule: `@request.auth.id = user_recipient.id`

---