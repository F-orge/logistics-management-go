## Public - User Analytics

- **User Growth Over Time (Chart)**
  - query: `SELECT date_trunc('day', created_at) AS day, count(*) FROM "public"."user" GROUP BY day ORDER BY day;`

- **User Roles Distribution (Chart)**
  - query: `SELECT role, count(*) FROM "public"."user" GROUP BY role;`

- **Banned Users (Stat Card)**
  - query: `SELECT count(*) FROM "public"."user" WHERE banned = true;`

- **User Connections by Browser (Chart)**
  - query: `SELECT split_part(user_agent, ' ', 1) as browser, count(*) FROM "public"."session" GROUP BY browser;`

## Billing - Financial Analytics

- **Total Revenue Over Time (Chart)**
  - query: `SELECT date_trunc('month', payment_date) AS month, sum(amount) FROM "billing"."payments" WHERE status = 'SUCCESSFUL' GROUP BY month ORDER BY month;`

- **Average Transaction Amount (Stat Card)**
  - query: `SELECT avg(amount) FROM "billing"."account_transactions";`

- **Transaction Volume Over Time (Chart)**
  - query: `SELECT date_trunc('day', transaction_date) AS day, count(*) FROM "billing"."account_transactions" GROUP BY day ORDER BY day;`

- **Revenue by Payment Method (Chart)**
  - query: `SELECT payment_method, sum(amount) FROM "billing"."payments" WHERE status = 'SUCCESSFUL' GROUP BY payment_method;`

- **Outstanding Revenue (Stat Card)**
  - query: `SELECT sum(amount_outstanding) FROM "billing"."invoices" WHERE status IN ('SENT', 'VIEWED', 'PARTIAL_PAID', 'PAST_DUE');`

- **Overdue Invoices (Stat Card)**
  - query: `SELECT count(*) FROM "billing"."invoices" WHERE status = 'PAST_DUE';`

- **Invoices by Status (Chart)**
  - query: `SELECT status, count(*) FROM "billing"."invoices" GROUP BY status;`

- **Dispute Resolution Time (Stat Card)**
  - query: `SELECT avg(resolved_at - submitted_at) FROM "billing"."disputes" WHERE status = 'CLOSED';`

- **Credit Notes Amount Over Time (Chart)**
  - query: `SELECT date_trunc('month', issue_date) AS month, sum(amount) FROM "billing"."credit_notes" GROUP BY month ORDER BY month;`

- **Revenue by Service/Product (Chart)**
    -   query: `SELECT description, sum(total_price) FROM "billing"."invoice_line_items" GROUP BY description ORDER BY sum(total_price) DESC;`
- **Average Discount Rate (Stat Card)**
    -   query: `SELECT avg(discount_rate) FROM "billing"."invoice_line_items" WHERE discount_rate > 0;`
- **Disputes by Status (Chart)**
    -   query: `SELECT status, count(*) FROM "billing"."disputes" GROUP BY status;`
- **Total Disputed Amount (Stat Card)**
    -   query: `SELECT sum(disputed_amount) FROM "billing"."disputes" WHERE status = 'OPEN';`
- **Total Credit Issued (Stat Card)**
    -   query: `SELECT sum(amount) FROM "billing"."credit_notes";`
- **Client Account Credit vs. Wallet (Chart)**
    -   query: `SELECT c.name, ca.available_credit, ca.wallet_balance FROM "billing"."client_accounts" ca JOIN "crm"."companies" c ON ca.client_id = c.id;`
- **Quote Conversion Rate (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "billing"."quotes" WHERE status = 'CONVERTED')::float / count(*) FROM "billing"."quotes";`
- **Revenue from Surcharges (Chart)**
    -   query: `SELECT name, sum(amount) as total_revenue FROM "billing"."surcharges" s JOIN "billing"."invoice_line_items" ili ON ili.description ILIKE '%' || s.name || '%' GROUP BY name;`
- **Active vs. Inactive Rate Cards (Stat Card)**
    -   query: `SELECT is_active, count(*) FROM "billing"."rate_cards" GROUP BY is_active;`
- **Accounting Sync Success Rate (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "billing"."accounting_sync_log" WHERE status = 'SUCCESS')::float / count(*) FROM "billing"."accounting_sync_log";`

## CRM - Sales & Customer Analytics

- **Lead Conversion Rate (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "crm"."leads" WHERE status = 'CONVERTED')::float / count(*) FROM "crm"."leads";`
- **Leads by Source (Chart)**
    -   query: `SELECT lead_source, count(*) FROM "crm"."leads" GROUP BY lead_source;`
- **Sales Pipeline Value (Chart)**
    -   query: `SELECT stage, sum(deal_value) FROM "crm"."opportunities" GROUP BY stage;`
- **Top 10 Products in Open Opportunities (Chart)**
    -   query: `SELECT p.name, sum(op.quantity) as total_quantity FROM "crm"."opportunity_products" op JOIN "crm"."products" p ON op.product_id = p.id JOIN "crm"."opportunities" o ON op.opportunity_id = o.id WHERE o.stage NOT IN ('CLOSED_WON', 'CLOSED_LOST') GROUP BY p.name ORDER BY total_quantity DESC LIMIT 10;`
- **Average Case Resolution Time (Stat Card)**
    -   query: `SELECT avg(updated_at - created_at) FROM "crm"."cases" WHERE status = 'RESOLVED';`
- **Interactions by Type (Chart)**
    -   query: `SELECT type, count(*) FROM "crm"."interactions" GROUP BY type;`
- **Campaign ROI (Chart)**
    -   query: `SELECT c.name, (sum(o.deal_value) - c.budget) as roi FROM "crm"."campaigns" c JOIN "crm"."opportunities" o ON c.id = o.campaign_id WHERE o.stage = 'CLOSED_WON' GROUP BY c.name, c.budget;`
- **Customers by Industry (Chart)**
    -   query: `SELECT industry, count(*) FROM "crm"."companies" GROUP BY industry;`
- **Top 10 Customer Job Titles (Chart)**
    -   query: `SELECT job_title, count(*) FROM "crm"."contacts" GROUP BY job_title ORDER BY count(*) DESC LIMIT 10;`

## DMS - Delivery & Driver Analytics

- **Delivery Success Rate (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "dms"."delivery_tasks" WHERE status = 'DELIVERED')::float / count(*) FROM "dms"."delivery_tasks";`
- **Average Route Efficiency (Stat Card)**
    -   query: `SELECT avg(actual_duration_minutes / estimated_duration_minutes) FROM "dms"."delivery_routes" WHERE actual_duration_minutes IS NOT NULL;`
- **Average Driver Speed (Stat Card)**
    -   query: `SELECT avg(speed_kmh) FROM "dms"."driver_locations" WHERE speed_kmh > 0;`
- **Tracking Link Engagement (Stat Card)**
    -   query: `SELECT avg(access_count) FROM "dms"."customer_tracking_links";`
- **Average Time Between Delivery Events (Chart)**
    -   query: `SELECT status, avg(time_in_status) as avg_time_in_status
    FROM (
        SELECT
            status,
            timestamp - lag(timestamp) OVER (PARTITION BY delivery_task_id ORDER BY timestamp) as time_in_status
        FROM "dms"."task_events"
    ) as subquery
    WHERE time_in_status IS NOT NULL
    GROUP BY status;`
- **Proof of Delivery Types (Chart)**
    -   query: `SELECT type, count(*) FROM "dms"."proof_of_deliveries" GROUP BY type;`

## TMS - Transportation & Fleet Analytics

- **Trips by Status (Chart)**
    -   query: `SELECT status, count(*) FROM "tms"."trips" GROUP BY status;`
- **On-Time Stop Performance (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "tms"."trip_stops" WHERE actual_arrival_time <= estimated_arrival_time)::float / count(*) FROM "tms"."trip_stops";`
- **Total Expenses by Type (Chart)**
    -   query: `SELECT type, sum(amount) FROM "tms"."expenses" GROUP BY type;`
- **Vehicles by Status (Chart)**
    -   query: `SELECT status, count(*) FROM "tms"."vehicles" GROUP BY status;`
- **Total Maintenance Cost (Stat Card)**
    -   query: `SELECT sum(cost) FROM "tms"."vehicle_maintenance";`
- **Top 5 Carriers by Number of Trips (Chart)**
    -   query: `SELECT c.name, count(sl.id) as leg_count FROM "tms"."shipment_legs" sl JOIN "tms"."carriers" c ON sl.carrier_id = c.id GROUP BY c.name ORDER BY leg_count DESC LIMIT 5;`
- **Average Rate per Carrier Service (Chart)**
    -   query: `SELECT c.name, cr.service_type, avg(cr.rate) FROM "tms"."carrier_rates" cr JOIN "tms"."carriers" c ON cr.carrier_id = c.id GROUP BY c.name, cr.service_type;`
- **Partner Invoice Status (Chart)**
    -   query: `SELECT status, count(*) FROM "tms"."partner_invoices" GROUP BY status;`
- **Total Cost by Shipment Leg (Chart)**
    -   query: `SELECT shipment_leg_id, sum(amount) FROM "tms"."partner_invoice_items" GROUP BY shipment_leg_id;`

- **Geofence Entry/Exit Frequency (Chart)**
    -   query: `SELECT g.name, ge.event_type, count(*) FROM "tms"."geofence_events" ge JOIN "tms"."geofences" g ON ge.geofence_id = g.id GROUP BY g.name, ge.event_type;`
- **Driver Time Off by Reason (Chart)**
    -   query: `SELECT reason, count(*) FROM "tms"."driver_schedules" GROUP BY reason ORDER BY count(*) DESC;`
- **Time Spent in Each Shipment Leg Status (Chart)**
    -   query: `SELECT status_message, avg(time_in_status) as avg_time_in_status
    FROM (
        SELECT
            status_message,
            event_timestamp - lag(event_timestamp) OVER (PARTITION BY shipment_leg_id ORDER BY event_timestamp) as time_in_status
        FROM "tms"."shipment_leg_events"
    ) as subquery
    WHERE time_in_status IS NOT NULL
    GROUP BY status_message;`

## WMS - Warehouse & Inventory Analytics

- **Orders by Fulfillment Status (Chart)**
    -   query: `SELECT status, count(*) FROM "wms"."sales_orders" GROUP BY status;`
- **Top 10 Most Ordered Products (Chart)**
    -   query: `SELECT p.name, sum(soi.quantity_ordered) as total_ordered FROM "wms"."sales_order_items" soi JOIN "wms"."products" p ON soi.product_id = p.id GROUP BY p.name ORDER BY total_ordered DESC LIMIT 10;`
- **Outbound Shipments by Carrier (Chart)**
    -   query: `SELECT carrier, count(*) FROM "wms"."outbound_shipments" GROUP BY carrier;`
- **Average Items per Package (Stat Card)**
    -   query: `SELECT avg(item_count) FROM (SELECT package_id, count(id) as item_count FROM "wms"."package_items" GROUP BY package_id) as package_counts;`
- **Inventory Value by Product (Chart)**
    -   query: `SELECT p.name, sum(s.quantity * p.cost_price) as inventory_value FROM "wms"."inventory_stock" s JOIN "wms"."products" p ON s.product_id = p.id GROUP BY p.name;`
- **Supplier On-Time Delivery Rate (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "wms"."inbound_shipments" WHERE actual_arrival_date <= expected_arrival_date)::float / count(*) FROM "wms"."inbound_shipments";`
- **Receiving Discrepancy Rate (Stat Card)**
    -   query: `SELECT sum(discrepancy_quantity)::float / sum(expected_quantity) FROM "wms"."inbound_shipment_items" WHERE received_quantity IS NOT NULL;`
- **Returns by Reason (Chart)**
    -   query: `SELECT reason, count(*) FROM "wms"."returns" GROUP BY reason;`
- **Returned Items by Condition (Chart)**
    -   query: `SELECT condition, count(*) FROM "wms"."return_items" GROUP BY condition;`
- **Inventory Adjustments by Reason (Chart)**
    -   query: `SELECT reason, sum(quantity_change) as total_change FROM "wms"."inventory_adjustments" GROUP BY reason;`
- **Warehouse Task Efficiency (Stat Card)**
    -   query: `SELECT avg(actual_duration / estimated_duration) FROM "wms"."tasks" WHERE actual_duration IS NOT NULL AND estimated_duration > 0;`
- **Average Pick Batch Completion Time (Stat Card)**
    -   query: `SELECT avg(actual_duration) FROM "wms"."pick_batches" WHERE status = 'COMPLETED';`
- **Top 5 Suppliers by Inbound Volume (Chart)**
    -   query: `SELECT s.name, count(i.id) as shipment_count FROM "wms"."inbound_shipments" i JOIN "wms"."suppliers" s ON i.client_id = s.id GROUP BY s.name ORDER BY shipment_count DESC LIMIT 5;`
- **Warehouse Space Utilization (Stat Card)**
    -   query: `SELECT (SELECT count(*) FROM "wms"."locations" WHERE is_pickable = true)::float / count(*) as pickable_ratio FROM "wms"."locations";`