# ETMAR Logistics System - Conceptual Sitemap

## I. Public/Authentication
* `/login` (User login via email/OAuth2)
* `/forgot-password`
* `/reset-password`
* Optional: `/register` (If self-registration for certain roles like `customer_rep` is allowed. User creation is primarily a backend/super_admin task.)

## II. Main Dashboard (Role-Dependent Content)
* `/dashboard`
    * Overview of relevant metrics (e.g., pending orders, active shipments, tasks due)
    * Quick access links based on user role

## III. User & Company Management
* **A. My Profile**
    * `/profile` (View own user details)
    * `/profile/edit` (Edit own user details - name, avatar, phone, password)
* **B. User Management (Primarily handled via PocketBase Admin UI by Super Admin)**
    * *Note: Global user listing, creation, and deletion are managed via the PocketBase Admin UI. Executives or Department Managers might view/edit users they have permissions for contextually (e.g., within a department's view).*
    * Contextual: `/users/{user_id}` (View specific user details by authorized roles like Executive, or own profile)
    * Contextual: `/users/{user_id}/edit` (Edit specific user details by authorized roles like Executive, or own profile)
* **C. Company Management (Executive, Customer Service Rep)**
    * `/companies` (List all companies - `companies` collection)
    * `/companies/new` (Create new company - customer, supplier, carrier)
    * `/companies/{company_id}` (View company details)
        * Associated Users
        * Associated Products (if supplier)
        * Associated Orders (if customer)
        * Associated Shipments (if carrier)
    * `/companies/{company_id}/edit` (Edit company details)
* **D. Department Management (Executive, Department Managers)**
    * `/departments` (List all departments - `departments` collection)
    * `/departments/new` (Create new department)
    * `/departments/{department_id}` (View department details)
        * View/Assign Department Managers
        * View/Assign Department Employees
        * Associated Tasks
        * Associated Shipments
    * `/departments/{department_id}/edit` (Edit department details)

## IV. Product & Inventory Management
* **A. Product Catalog (Warehouse Manager, Executive, and view for many others)**
    * `/products` (List all products - `products` collection)
    * `/products/new` (Create new product)
    * `/products/{product_id}` (View product details - SKU, description, supplier, image)
    * `/products/{product_id}/edit` (Edit product details)
    * `/products/{product_id}/inventory` (View inventory levels for this product across warehouses)
* **B. Inventory Management (Warehouse Manager, Inventory Clerk, Executive)**
    * `/inventory` (List all inventory items - `inventoryItems` collection, filterable by warehouse, product)
    * `/inventory/new` (Add new inventory stock - e.g., received goods)
    * `/inventory/{inventory_item_id}` (View specific inventory item details - lot, serial, expiry)
    * `/inventory/{inventory_item_id}/edit` (Adjust quantity, status, location, count date)
    * `/inventory/stock-levels` (Aggregated view of stock, potentially by warehouse)
    * `/inventory/adjustments` (Log of stock adjustments or a section for performing adjustments)

## V. Order Management & Fulfillment
* **A. Orders (Customer Service Rep, Warehouse Manager, Dispatch Coordinator, Finance, Executive, Customer Rep for their own orders)**
    * `/orders` (List all orders - `orders` collection, filterable by status, customer, date)
    * `/orders/new` (Create new order)
    * `/orders/{order_id_custom}` (View order details)
        * Customer Information
        * Shipping & Billing Addresses
        * Order Status & History
        * Assigned Warehouse
        * Created By
        * **Line Items (`orderLineItems` Collection - managed within the order context):**
            * View line items
            * Add/Edit/Remove line items (if order status allows)
        * Related Shipments
        * Related Invoice
        * Related Tasks
        * Order-Specific Chat (`chatRooms` of type `order_chat`)
    * `/orders/{order_id_custom}/edit` (Edit order details - status, addresses, warehouse assignment, if permissible)
    * `/orders/{order_id_custom}/validate` (Action for pending validation)
    * `/orders/{order_id_custom}/allocate` (Action for inventory allocation)
    * `/orders/{order_id_custom}/create-shipment` (Initiate shipment creation)

## VI. Warehouse Operations (Warehouse Manager, relevant Department Employees)
* **A. Warehouse Management (Executive, Warehouse Manager for their own)**
    * `/warehouses` (List all warehouses - `warehouses` collection)
    * `/warehouses/new` (Create new warehouse)
    * `/warehouses/{warehouse_id}` (View warehouse details - address, manager, GPS)
        * View Inventory at this Warehouse (`inventoryItems` filtered by this warehouse)
        * View Orders assigned to this Warehouse
    * `/warehouses/{warehouse_id}/edit` (Edit warehouse details)
* **B. Picking & Packing (via Task System, see Section IX)**
    * Tasks like "Pick Order XYZ", "Pack Order XYZ"

## VII. Shipment & Dispatch Management
* **A. Shipments (Dispatch Coordinator, Warehouse Manager, Delivery Driver, Customer Rep for their orders, Department Members for assigned shipments)**
    * `/shipments` (List all shipments - `shipments` collection, filterable by status, carrier, driver, department)
    * `/shipments/new` (Create new shipment - often initiated from an order)
    * `/shipments/{tracking_number}` (View shipment details)
        * Order Reference
        * Carrier Information
        * Status & History
        * Estimated/Actual Delivery Dates
        * Proof of Delivery
        * Assigned Driver
        * Current Location Notes
        * Assigned Department
        * Related Tasks
    * `/shipments/{tracking_number}/edit` (Update status, driver, delivery dates, POD, notes)
    * `/shipments/{tracking_number}/assign-to-route`
* **B. Route Planning & Management (Dispatch Coordinator, Delivery Driver, Executive)**
    * `/routes` (List all routes - `routes` collection, filterable by status, driver, date)
    * `/routes/new` (Create new route plan)
    * `/routes/{route_name_or_id}` (View route details)
        * Vehicle Assigned
        * Driver Assigned
        * Planned Times & Status
        * **Shipments on Route (`shipments` relation):**
            * View list of shipments
            * Add/Remove shipments from route (if status allows)
        * **Route Segments (`routeSegments` Collection - managed within the route context):**
            * View segments in sequence
            * Add/Edit/Reorder route segments (start, pickup, delivery, waypoint, end)
            * Update actual arrival/departure times for segments (primarily by driver)
            * View instructions for each segment
    * `/routes/{route_name_or_id}/edit` (Edit route details - vehicle, driver, times, status)
    * `/routes/{route_name_or_id}/optimize` (Conceptual - trigger route optimization logic)
* **C. Vehicle Management (Dispatch Coordinator, Executive)**
    * `/vehicles` (List all vehicles - `vehicles` collection)
    * `/vehicles/new` (Add new vehicle)
    * `/vehicles/{license_plate}` (View vehicle details - make, model, capacity, status)
    * `/vehicles/{license_plate}/edit` (Edit vehicle details, assign current driver)
    * `/vehicles/{license_plate}/maintenance-log` (Conceptual - could be a related collection or tasks)

## VIII. Financial Management (Finance Dept, Executive, Customer Rep for their own invoices)
* **A. Invoices**
    * `/invoices` (List all invoices - `invoices` collection, filterable by customer, status, date)
    * `/invoices/new` (Create new invoice - often generated from an order by `Finance Dept`)
    * `/invoices/{invoice_number}` (View invoice details)
        * Order Reference
        * Customer Details
        * Dates (Invoice, Due)
        * Total Amount & Status
        * View/Download Invoice PDF
        * Related Payments
    * `/invoices/{invoice_number}/edit` (Edit invoice details - status, if permissible by `Finance Dept`)
    * `/invoices/{invoice_number}/send` (Action to mark as sent by `Finance Dept`)
    * `/invoices/{invoice_number}/record-payment` (Navigate to create payment by `Finance Dept`)
* **B. Payments**
    * `/payments` (List all payments - `payments` collection, filterable by invoice, date, method)
    * `/payments/new` (Record new payment against an invoice by `Finance Dept`)
    * `/payments/{payment_id}` (View payment details - date, amount, method, transaction ID, notes)
    * `/payments/{payment_id}/edit` (Edit payment details - status, notes, if permissible by `Finance Dept`)

## IX. Collaboration & Workflow
* **A. Tasks (Kanban/List View for various roles based on assignment/department)**
    * `/tasks` (View tasks - `tasks` collection - typically in a Kanban board view [Todo, Scheduled, Picking, Packing, etc.] or list view, filterable by status, priority, assignee, department, order, shipment)
    * `/tasks/my-tasks` (Tasks assigned to the logged-in user)
    * `/tasks/department/{department_id}` (Tasks for a specific department)
    * `/tasks/new` (Create new task - general or linked to order/shipment)
    * `/tasks/{task_id}` (View task details)
        * Title, Description, Status, Priority
        * Assignees, Due Date, Tags
        * Related Order/Shipment/Department
        * Primary Attachment
        * **Task Messages (`taskMessages` Collection - managed within the task context):**
            * View messages/comments
            * Add new message/comment with attachments
    * `/tasks/{task_id}/edit` (Edit task details, change status, reassign)
* **B. Chat / Messaging**
    * `/chat` (List of user's chat rooms - `chatRooms` collection)
        * Filter by type (Direct, Group, Order, Support)
    * `/chat/new` (Start new direct message or group chat)
    * `/chat/start/order/{order_id}` (Initiate or go to order-specific chat)
    * `/chat/start/support/{customer_id}` (Initiate or go to support chat)
    * `/chat/{room_id}` (View chat room - `chatMessages` collection)
        * View message history
        * Send new message
        * Upload attachments to messages
        * View participants
        * Manage room (if creator/admin - e.g., add/remove participants for group chats)

## X. Settings / System Configuration (Primarily Executive for application-level settings; core system config via PocketBase Admin UI by Super Admin)
* `/settings` (General application settings available to Executives)
* *Note: Core system configurations, advanced role/permission management beyond application logic, and deep integrations would be handled by the Super Admin via the PocketBase Admin UI.*