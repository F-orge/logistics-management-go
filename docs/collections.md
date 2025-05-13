# ETMAR Logistics System: Proposed PocketBase Collections

This document outlines the proposed PocketBase collections designed to support the functionalities described in the ETMAR Logistics' Next-Generation Logistics Management System Product Requirements Document. 
---

### 1. `users` (Auth Collection)

* **Collection Name:** `users`
* **Collection Type:** `auth`
* **Schema (Fields):**
    * **Standard Auth Fields:** (Managed by PocketBase)
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
    * Create Rule: `@request.auth.role = "executive"` (Executives can create users; superusers can also via Admin UI)
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
    * `name` (text, required, unique)
    * `type` (select, required: `["customer", "supplier", "carrier", "internal"]`)
    * `address` (text)
    * `contact_email` (email)
    * `contact_phone` (text)
    * `primary_contact_person` (relation to `users`)
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
    * `sku` (text, required, unique)
    * `name` (text, required)
    * `description` (editor)
    * `weight` (number)
    * `dimensions` (text)
    * `cost` (number)
    * `supplier` (relation to `companies`)
    * `image` (file)
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
    * `name` (text, required, unique)
    * `address` (text, required)
    * `location_gps` (geoPoint)
    * `manager` (relation to `users`)
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
    * `order_id_custom` (text, required, unique)
    * `customer` (relation to `companies`, required)
    * `order_date` (date, required)
    * `status` (select, required)
    * `total_amount` (number)
    * `created_by` (relation to `users`)
    * `shipping_address` (text, required)
    * `billing_address` (text, required)
    * `assigned_warehouse` (relation to `warehouses`)
* **API Rules:**
    * List Rule: `@request.auth.id != "" && (@request.auth.role = "customer_service_rep" || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id))`
    * View Rule: `(@request.auth.id != "" && (@request.auth.role = "customer_service_rep" || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "finance_dept" || @request.auth.role = "executive")) || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id)`
    * Create Rule: `@request.auth.role = "customer_service_rep" || @request.auth.role = "executive"`
    * Update Rule: `@request.auth.role = "customer_service_rep" || @request.auth.role = "warehouse_manager" || @request.auth.role = "dispatch_coordinator" || @request.auth.role = "executive"`
    * Delete Rule: `@request.auth.role = "executive"`

---

### 6. `orderLineItems` (Base Collection)

* **Collection Name:** `orderLineItems`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---

### 7. `inventoryItems` (Base Collection)

* **Collection Name:** `inventoryItems`
* **Collection Type:** `base`
* **Schema (Fields):**
    * `product` (relation to `products`, required)
    * `warehouse` (relation to `warehouses`, required)
    * `quantity_on_hand` (number, required)
    * `lot_number` (text)
    * `serial_number` (text, unique if applicable)
    * `status` (select)
    * `expiry_date` (date)
    * `storage_location_code` (text)
    * `last_counted_date` (date)
* **API Rules:**
    * List Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk" || @request.auth.role = "executive"`
    * View Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk" || @request.auth.role = "executive"`
    * Create Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk"`
    * Update Rule: `@request.auth.role = "warehouse_manager" || @request.auth.role = "inventory_clerk"`
    * Delete Rule: `@request.auth.role = "warehouse_manager"`

---

### 8. `shipments` (Base Collection)

* **Collection Name:** `shipments`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, adjusted for department assignments, they did not use `it_admin`)*

---

### 9. `vehicles` (Base Collection)

* **Collection Name:** `vehicles`
* **Collection Type:** `base`
* **Schema (Fields):**
    * `license_plate` (text, required, unique)
    * `make` (text)
    * `model` (text)
    * `type` (text)
    * `capacity_volume` (number)
    * `capacity_weight` (number)
    * `status` (select)
    * `current_driver` (relation to `users`)
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
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---

### 11. `routeSegments` (Base Collection)

* **Collection Name:** `routeSegments`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---

### 12. `invoices` (Base Collection)

* **Collection Name:** `invoices`
* **Collection Type:** `base`
* **Schema (Fields):**
    * `invoice_number` (text, required, unique)
    * `order_ref` (relation to `orders`, required)
    * `customer` (relation to `companies`, required)
    * `invoice_date` (date, required)
    * `due_date` (date, required)
    * `total_amount` (number, required)
    * `status` (select, required)
    * `invoice_pdf` (file)
* **API Rules:**
    * List Rule: `@request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id)`
    * View Rule: `@request.auth.role = "finance_dept" || @request.auth.role = "executive" || (@request.auth.role = "customer_rep" && customer.id = @request.auth.company.id)`
    * Create Rule: `@request.auth.role = "finance_dept"`
    * Update Rule: `@request.auth.role = "finance_dept"`
    * Delete Rule: `@request.auth.role = "finance_dept"`

---

### 13. `payments` (Base Collection)

* **Collection Name:** `payments`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---

### 14. `chatRooms` (Base Collection)

* **Collection Name:** `chatRooms`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---

### 15. `chatMessages` (Base Collection)

* **Collection Name:** `chatMessages`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---

### 16. `departments` (Base Collection)

* **Collection Name:** `departments`
* **Collection Type:** `base`
* **Schema (Fields):**
    * `name` (text, required, unique)
    * `description` (editor)
    * `cover_photo` (file)
    * `managers` (relation to `users`, multiple)
    * `employees` (relation to `users`, multiple)
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
* *(Schema and API Rules as previously defined, they did not use `it_admin` explicitly in a way that needs specific replacement beyond general role permissions)*

---

### 18. `taskMessages` (Base Collection)

* **Collection Name:** `taskMessages`
* **Collection Type:** `base`
* *(Schema and API Rules as previously defined, they did not use `it_admin`)*

---