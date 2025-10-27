## Auth - User Events

- **User Creation**: When a new user signs up, a new record is created in the `user` table.
- **User Update**: When a user updates their profile, the corresponding record in the `user` table is updated.
- **User Deletion**: When a user is deleted, their record is removed from the `user` table.

## Auth - Session Events

- **Session Creation**: When a user logs in, a new session is created in the `session` table.
- **Session Deletion**: When a user logs out or a session expires, the session record is deleted.

## Public - Data Hygiene

- **Clean Up Expired Sessions**: A periodic scheduled job (e.g., daily) that deletes records from the `public.session` table where the `expires_at` timestamp is in the past.

## Billing - Invoice Events

- **Invoice Generation from Opportunity**: When a CRM opportunity is marked as "Won," a trigger can automatically generate a new invoice in the `billing.invoices` table.
- **Invoice Status Update on Payment**: When a payment is successfully recorded in `billing.payments`, a trigger can update the status of the corresponding invoice in `billing.invoices` to "Paid."
- **Update Invoice Balance on Credit Note**: When a `billing.credit_notes` record is applied, a trigger automatically updates the `amount_outstanding` on the related `billing.invoices` record.
- **Update Invoice Status to Overdue**: A daily scheduled job checks for invoices where the `due_date` has passed and the `status` is not 'Paid', and updates the `status` to 'Overdue'.

## Billing - Account Transaction Events

- **Transaction on Payment**: When a new payment is created in `billing.payments`, a trigger can create a corresponding "credit" transaction in `billing.account_transactions`.
- **Transaction on Invoice**: When a new invoice is generated in `billing.invoices`, a trigger can create a "debit" transaction in `billing.account_transactions`.
- **Calculate Running Balance**: When a new `billing.account_transactions` record is inserted, a trigger calculates the `running_balance` based on the previous balance for that account and the new transaction's amount.

## Billing - Client Account Events

- **Balance Update on Transaction**: When a new transaction is added to `billing.account_transactions`, a trigger can update the `available_credit` or `wallet_balance` in the `billing.client_accounts` table.
- **Update `last_payment_date`**: When a new `billing.payments` record is created, a trigger updates the `last_payment_date` on the corresponding `billing.client_accounts` table.

## Billing - Credit Note Events

- **Credit Note on Dispute Approval**: When a dispute's status in `billing.disputes` is updated to "Approved," a trigger can automatically generate a `credit_note` in the `billing.credit_notes` table.

## Billing - Lifecycle Management

- **Deactivate Expired Rate Cards & Surcharges**: A daily scheduled job automatically sets the `is_active` flag to `false` on `billing.rate_cards` and `billing.surcharges` that are outside their `valid_from`/`valid_to` date range.
- **Update Quote Status to Expired**: A daily scheduled job finds `billing.quotes` where `expires_at` is in the past and automatically updates their `status` to 'Expired'.

## Billing - Shipment Creation on Payment

- **Shipment Creation on Payment**: When a payment is successfully recorded in `billing.payments` for a quote, a trigger can automatically create a new shipment record in `ims.outbound_shipments`.

## Billing - Document Generation on Shipment Confirmation

- **Document Generation on Shipment Confirmation**: When a shipment in `ims.outbound_shipments` is confirmed, a trigger can automatically generate a Bill of Lading and create a record in `billing.documents`.

## Billing - Scheduled Billing

- **Scheduled Billing for Recurring Services**: A time-based event (e.g., a monthly scheduled job) gathers usage data from IMS/WMS and generates invoices in `billing.invoices`.

## Billing - Accounting Sync

- **Accounting Sync on Financial Events**: When a new invoice or payment is created, an event is triggered to synchronize the record with an external accounting system, logging the result in `billing.accounting_sync_log`.

## CRM - Lead Events

- **Lead Conversion**: When a lead in `crm.leads` is converted, a trigger can automatically create new records in the `crm.companies`, `crm.contacts`, and `crm.opportunities` tables.

## CRM - Opportunity Events

- **Set Opportunity Probability from Stage**: When the `stage` in the `crm.opportunities` table is changed, a trigger automatically updates the `probability` field based on predefined business logic.

## CRM - Notification Events

- **Notification on Lead Assignment**: When a lead is assigned to a Sales Rep in `crm.leads`, a trigger can create a new notification in the `crm.notifications` table for that user.
- **Notification on Case Assignment**: When a `crm.cases` record is created or the `owner_id` is updated, a trigger can create a notification for the assigned user in `crm.notifications`.

## CRM - Invoice Events

- **Invoice Generation from Opportunity**: When an opportunity's stage in `crm.opportunities` is updated to "Won," a trigger can automatically generate a new invoice in the `crm.invoices` table.

## DMS - Delivery Route Events

- **Route Creation**: When a dispatcher assigns packages to a driver, a new `delivery_route` is created in the `dms.delivery_routes` table.
- **Calculate Actual Route Duration**: When the `completed_at` field is set on a `dms.delivery_routes` record, a trigger calculates the difference between `completed_at` and `started_at` and populates the `actual_duration_minutes` field.

## DMS - Customer Tracking Link Events

- **Tracking Link Generation**: When a `delivery_task` status in `dms.delivery_tasks` is updated to 'Out for Delivery', a trigger can generate a unique `customer_tracking_link` in the `dms.customer_tracking_links` table.
- **Deactivate Expired Customer Tracking Links**: A daily scheduled job sets the `is_active` flag to `false` for any `dms.customer_tracking_links` that have passed their `expires_at` date.

## DMS - Task Events

- **Update Task Status from Event**: When a new `dms.task_events` record is inserted, a trigger automatically updates the `status` of the parent `dms.delivery_tasks` record to ensure it reflects the latest event.

## IMS - Low Stock Alert

- **Low Stock Alert**: When an update to `ims.inventory_levels` causes the quantity to fall below the `reorder_point`, an event is triggered to notify the client.

## IMS - Inventory Adjustment

- **Inventory Adjustment on Damaged Return**: When a returned item is marked as "Damaged" in `ims.returns`, a trigger can automatically create an `ims.inventory_adjustments` record to write off the stock.

## TMS - Trip Events

- **Trip Creation**: When a dispatcher assigns a driver and vehicle, a new `trip` is created in the `tms.trips` table.

## TMS - Geofence Events

- **Geofence Event Trigger**: When a vehicle's location update indicates it has entered a predefined geofence, a trigger can create a `geofence_event` in the `tms.geofence_events` table.

## WMS - Task Events

- **Replenishment Task Creation**: When a picking action causes the quantity in a bin to fall below the threshold defined in `wms.wms_bin_thresholds`, a trigger can automatically create a 'Replenishment' task in the `wms.wms_tasks` table.
- **Put-Away Task on Return**: When a returned item from `ims.returns` is marked as "Resellable," a trigger can create a 'Put-Away' task in the `wms.wms_tasks` table to restock the item.