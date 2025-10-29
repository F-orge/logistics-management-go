# Database Constraints

This document outlines the business logic constraints that should be enforced during data mutation. These include data validation rules, state machine transitions, and higher-level business process integrity rules like transactional atomicity and access control.

---

## High-Level Business Process Constraints

These constraints govern end-to-end flows that cross multiple schemas and are critical for system stability.

### Cross-Schema Transactional Integrity

- **Quote-to-Shipment Atomicity**: The process from accepting a quote to creating a shipment must be transactional. When a `billing.quote` is paid, the system must attempt to create the `ims.outbound_shipment`. If shipment creation fails (e.g., due to a final stock check failure), the corresponding `billing.payment` must be automatically voided or flagged for immediate refund, and the `billing.invoice` must not be finalized as 'Paid'.

- **Return-to-Credit Integrity**: A financial credit for a returned item should only be issued after the physical return is confirmed. The creation of a `billing.credit_note` for a returned good is conditional on the corresponding `ims.returns` record being fully processed and dispositioned (e.g., as 'Resellable' or 'Damaged').

---

## Auth Schema (`public`)

This schema governs user identity, authentication, and session management.

### `user` table

**Access Control**
- User creation is public (registration).
- `role` assignment is restricted to 'Admin' users.

**CREATE**
- `email`: Must be unique across all users and have a valid email format.
- `name`: Is a required field.
- `email_verified`: Defaults to `false`.

**UPDATE**
- `email`: If changed, the new email must also be unique.
- `role`: Must be one of the predefined values in the `user_role` enum.
- `banned`: If a user is banned (`banned` = `true`), `ban_reason` should not be empty.

**DELETE**
- Deleting a user should cascade and delete all associated records in `account` and `session` tables to maintain data integrity.

### `session` table

**CREATE**
- `token`: Must be unique.
- `user_id`: Must correspond to an existing record in the `user` table.
- `expires_at`: Must be a timestamp in the future.

**UPDATE**
- Core session fields (`id`, `token`, `user_id`, `created_at`, `expires_at`) should be considered immutable. Only metadata like `ip_address` or `user_agent` might be updatable.

**DELETE**
- A session can be deleted manually (user logout).
- A periodic job must delete all sessions where `expires_at` is in the past.

### `account` table

**CREATE**
- `user_id`: Must correspond to an existing record in the `user` table.
- `provider_id` and `account_id`: The combination must be unique to prevent duplicate provider accounts for the same user.

**DELETE**
- Accounts should be deleted when the parent `user` record is deleted.

---

## Billing Schema

This schema manages all financial aspects, from quoting and invoicing to payments and disputes.

### `rate_cards` table

**Access Control**
- `CREATE`, `UPDATE`, `DELETE` operations are restricted to users with the 'Pricing Analyst' role.

**Temporal Integrity**
- When generating a `quote` or `invoice`, the pricing engine must only use rate cards where the current date is within the `valid_from` and `valid_to` range and `is_active` is true.

### `client_accounts` table

**Access Control**
- Credit-related fields (`credit_limit`, `is_credit_approved`) can only be modified by users with an 'Accounts Manager' or 'Finance Manager' role.

**UPDATE**
- **Credit Check**: Before processing a shipment or service on credit, the system must validate that the cost does not exceed the `available_credit`. The operation must fail if credit is insufficient, and the `available_credit` must be decreased upon success.

### `invoices` table

**Access Control**
- `UPDATE` of status to `Void` is restricted to users with a 'Finance Manager' role.

**State Machine (`status`)**
- The `status` must follow a defined lifecycle: `Draft` -> `Sent` -> (`Paid` | `Overdue` | `Void`).
- `Paid` or `Void` invoices are terminal states and cannot be modified.
- Note: Invoices generated from an immediate, successful upfront payment (e.g., from a quote) can enter the `Paid` state directly.

**CREATE**
- `due_date`: Must be on or after `issue_date`.

**UPDATE**
- `amount_paid`: Cannot be greater than `total_amount`.
- When a payment is made that covers the full `total_amount`, the `status` must be updated to `Paid`.
- A periodic job should update the `status` to `Overdue` if the `due_date` is in the past and the invoice is not `Paid`.
- Applying a `credit_note` must decrease the `amount_outstanding`.

### `payments` table

**CREATE**
- `amount`: Must be a positive value.
- `invoice_id`: Must reference an existing invoice that is not in `Paid` or `Void` status.
- The payment `amount` cannot exceed the `amount_outstanding` on the referenced invoice.

**UPDATE**
- A payment in a terminal state (`Processed`, `Failed`) should be immutable.

### `quotes` table

**State Machine (`status`)**
- The `status` can transition from `Draft` -> `Sent` -> `Accepted` | `Expired`.
- `Accepted` or `Expired` quotes are terminal states and cannot be modified.
- An `Accepted` quote, upon successful payment, must trigger the creation of a corresponding shipment record in the IMS.

**UPDATE**
- A periodic job must update the `status` to `Expired` if `expires_at` is in the past and the status is not `Accepted`.

### `disputes` table

**CREATE**
- Can only be created for a line item on an invoice with `Sent` or `Overdue` status.

**UPDATE**
- `status`: Can only transition from `Open` -> `Approved` | `Rejected`.
- A resolved dispute (`Approved`, `Rejected`) is immutable.
- If `status` is updated to `Approved`, a trigger must generate a corresponding `credit_notes` record.

### `credit_notes` table

**CREATE**
- `amount`: Must be a positive value.
- The `amount` cannot exceed the `amount_outstanding` on the associated invoice.
- Can only be created for an invoice that is not `Paid` or `Void`.

---

## CRM Schema

This schema manages customer relationships, sales pipelines, and support cases.

### `products` (Service Catalog)

**Access Control**
- `CREATE`, `UPDATE`, `DELETE` operations are restricted to users with the 'Sales Manager' role.

### `leads` table

**UPDATE**
- **Conversion**: When `status` is changed to 'Qualified', a trigger must:
    1. Set the `converted_at` timestamp.
    2. Create corresponding records in `companies`, `contacts`, and `opportunities`.
- A converted lead (`converted_at` is not null) is immutable.

### `opportunities` table

**State Machine (`stage`)**
- The `stage` must follow a predefined sales pipeline (e.g., `New` -> `Qualification` -> `Proposal` -> `Closed-Won`/`Closed-Lost`).
- `Closed-Won` and `Closed-Lost` are terminal states; the record becomes immutable.

**UPDATE**
- `probability`: Must be automatically updated by a trigger based on the current `stage`, and must always be between 0 and 1.
- When `stage` is updated to `Closed-Won`, a trigger must initiate the invoice generation process in the `billing` schema.

### `opportunity_products` table

**CREATE**
- **Price Snapshot**: When a product is added to an opportunity, its price must be copied from the main product catalog at that moment in time. This ensures that future price changes in the catalog do not affect existing opportunities.

### `cases` table

**State Machine (`status`)**
- A `Closed` or `Resolved` case is immutable and cannot be reopened or modified.

---

## DMS (Delivery Management System)

This schema focuses on final-mile delivery, including route planning and execution.

### `delivery_routes` table

**State Machine (`status`)**
- The `status` must follow a lifecycle: `Pending` -> `In Progress` -> `Completed`.
- A `Completed` route is immutable.

**UPDATE**
- `actual_duration_minutes`: Must be calculated automatically by a trigger when `completed_at` is set.

### `delivery_tasks` table

**State Machine (`status`)**
- The `status` must follow a lifecycle: `Pending` -> `Out for Delivery` -> `Delivered` | `Failed`.
- `Delivered` and `Failed` are terminal states; the task is immutable.
- **POD Requirement**: The transition to `Delivered` is conditional on the successful creation of a corresponding `proof_of_deliveries` record.

**UPDATE**
- If `status` is updated to `Failed`, the `failure_reason` field must be populated.
- When `status` is updated to `Out for Delivery`, a trigger must generate a `customer_tracking_links` record.

### `task_events` table

**CREATE**
- The `status` in the new event must trigger an update to the `status` of the parent `delivery_tasks` record to keep them synchronized.

---

## IMS (Inventory Management System)

This schema manages all aspects of inventory, including stock levels, movements, and orders.

### `inventory_levels` (or similar table)

**UPDATE**
- `quantity_on_hand`: Cannot be a negative value.
- **Low Stock Alert**: A trigger must fire a notification event when an update causes `quantity_on_hand` to fall below the configured `reorder_point` for a product.
- **Stock Allocation**: `quantity_committed` must be increased when an order is allocated. `quantity_available` must be decreased accordingly. This operation must fail if there is not enough available stock.
- **Stock Fulfillment**: `quantity_on_hand` and `quantity_committed` must be decreased when an order is shipped.
- **Stock Transfers**: When a stock transfer is initiated, the item quantity at the source location should be moved from `quantity_on_hand` to an `in_transit` state to prevent it from being sold or allocated elsewhere.

### `inventory_adjustments`

**CREATE**
- `reason`: Is a mandatory field to ensure all adjustments are audited.

### `outbound_shipments`

**CREATE**
- **Stock Check**: The system must verify that there is sufficient `available` stock for every line item in the shipment. The operation must fail or place the order on backorder if stock is insufficient.

### Picking & Batch Control

- **FEFO (First-Expired, First-Out)**: For perishable goods tracked in `inventory_batches`, the picking logic must prioritize items with the soonest `expiration_date`.

---

## TMS (Transportation Management System)

This schema manages the fleet, drivers, and the movement of goods.

### `drivers` table

**Access Control**
- `CREATE`, `UPDATE`, `DELETE` operations are restricted to users with the 'Transport Manager' role.

**CREATE**
- `license_number`: Must be unique across all drivers.

**UPDATE**
- A periodic job must scan for `license_expiration_date` and trigger alerts for upcoming expirations.

### `trips` table

**Resource Integrity**
- **No Double Booking**: A new trip cannot be created for a `driver_id` or `vehicle_id` that is already associated with another trip currently in an `In Progress` status.

**State Machine (`status`)**
- The `status` must follow a lifecycle: `Planned` -> `In Progress` -> `Completed`.
- A `Completed` trip is immutable.

### `expenses` table

**CREATE**
- Must be associated with a valid `trip_id`.
- `amount`: Must be a positive value.

---

## WMS (Warehouse Management System)

This schema orchestrates all physical activities within the warehouse.

### `wms_tasks` table

**CREATE**
- **Automated Replenishment**: A `Replenishment` task must be automatically created by a trigger when a picking action causes a bin's quantity to fall below its `wms_bin_thresholds`.
- **Automated Put-Away**: A `Put-Away` task must be automatically created when a returned item is marked as "Resellable" in the IMS.

### `wms_inventory_stock` (or similar table)

**UPDATE**
- **Bin Capacity**: The system must prevent a `Put-Away` task from adding items to a bin if it would exceed the bin's maximum capacity (volume or weight).
- **Cross-Docking**: The system must prevent a `Put-Away` task from being created for an inbound item that is flagged for cross-docking.
