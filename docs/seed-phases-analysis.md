# Seed Script Phases Analysis (10-13)

## Overview
This document provides a detailed breakdown of all collections and their requirements for each seed phase, including foreign key dependencies, status enums, and field constraints.

---

## Phase 10: Billing System

### Purpose
Seed entities related to billing management including rate cards, rate rules, surcharges, client accounts, quotes, invoices, and related financial entities.

### Collections to Seed (in order)

#### 1. **billing_management_rate_cards**
- **ID**: `pbc_15931691`
- **Purpose**: Define base rate structures for billing
- **Required Fields**:
  - `id` (auto-generated: `[a-z0-9]{15}`)
  - `name` (text, required, max 255)
  - `type` (select, optional): shipping, storage, fulfillment, handling, insurance, customs, packaging, returns
  - `isActive` (bool, optional)
  - `validFrom` (date, optional)
  - `validTo` (date, optional)
  - `description` (editor, optional)
  - `createdBy` (relation to users, optional)

**Seed Data**: Create 3-4 rate cards (Standard, Premium, Express, Bulk)

---

#### 2. **billing_management_rate_rules**
- **ID**: `pbc_2376849642`
- **Purpose**: Define pricing rules within rate cards
- **Dependencies**: `billing_management_rate_cards`
- **Required Fields**:
  - `id` (auto-generated)
  - `rateCard` (relation, optional) → from rate_cards
  - `condition` (text, required) - e.g., "weight:0-5kg", "distance:0-50km"
  - `value` (text, required) - e.g., "5", "50"
  - `price` (number, required)
  - `pricingModel` (select, required): per-kg, per-item, flat-rate, per-cubic-meter, per-zone, percentage, tiered
  - `minValue` (number, optional)
  - `maxValue` (number, optional)
  - `priority` (number, required, 1-100)
  - `isActive` (bool, optional)

**Seed Data**: 2-3 rules per rate card (e.g., weight-based, distance-based)

---

#### 3. **billing_management_surcharges**
- **ID**: `pbc_2571604235`
- **Purpose**: Define additional charges applied to billing
- **Required Fields**:
  - `id` (auto-generated)
  - `name` (text, optional)
  - `type` (text, optional) - e.g., "fuel-adjustment", "hazmat-fee"
  - `amount` (number, optional)
  - `calculationMethod` (select, optional): percentage, fixed, per-unit, sliding-scale
  - `isActive` (bool, optional)
  - `validFrom` (date, optional)
  - `validTo` (date, optional)
  - `description` (editor, optional)

**Seed Data**: 2-3 surcharges (Fuel Adjustment, Hazmat Fee, Peak Season)

---

#### 4. **billing_management_client_accounts**
- **ID**: `pbc_710744944`
- **Purpose**: Manage client billing accounts and credit
- **Dependencies**: Must have clients from earlier phases (pbc_609858025)
- **Required Fields**:
  - `id` (auto-generated)
  - `client` (relation, optional) → customer_relations_companies
  - `creditLimit` (number, optional)
  - `availableCredit` (number, optional)
  - `walletBalance` (number, optional)
  - `currency` (text, optional, max 3) - e.g., "PHP", "USD"
  - `paymentTermsDays` (number, optional)
  - `isCreditApproved` (bool, optional)
  - `lastPaymentDate` (date, optional)

**Seed Data**: Create accounts for each client (3-5 per client)

---

#### 5. **billing_management_quotes**
- **ID**: `pbc_11546788`
- **Purpose**: Store quotation requests
- **Dependencies**: Must have clients from earlier phases
- **Required Fields**:
  - `id` (auto-generated)
  - `client` (relation, optional) → customer_relations_companies
  - `originDetails` (editor, optional) - JSON pickup location
  - `destinationDetails` (editor, optional) - JSON delivery location
  - `weight` (number, optional) - kg
  - `length` (number, optional) - cm
  - `width` (number, optional) - cm
  - `height` (number, optional) - cm
  - `quotePrice` (number, optional)
  - `serviceLevel` (text, optional) - e.g., "Standard", "Express"
  - `expiredAt` (date, optional)
  - `status` (select, optional): pending, accepted, expired, cancelled, converted
  - `quoteNumber` (text, auto-generated: `QUOTE-[A-Z]{10}-[0-9]{10}`)
  - `notes` (editor, optional)
  - `createdBy` (relation, optional) → users

**Unique Index**: `quoteNumber`

**Seed Data**: 5-10 quotes with mixed statuses

---

#### 6. **billing_management_invoices**
- **ID**: `pbc_3547590600`
- **Purpose**: Store generated invoices
- **Dependencies**: Optionally references quotes
- **Required Fields**:
  - `id` (auto-generated)
  - `quote` (relation, optional) → quotes
  - `invoiceNumber` (text, auto-generated: `INVOICE-[A-Z]{10}-[0-9]{10}`)
  - `status` (select, optional): draft, sent, viewed, paid, partial-paid, past-due, disputed, cancelled, void
  - `issueDate` (date, optional)
  - `dueDate` (date, optional)
  - `totalAmount` (number, optional)
  - `amountPaid` (number, optional)
  - `currency` (text, optional, max 3)
  - `discountAmount` (number, optional)
  - `subtotal` (number, optional)
  - `paymentTerms` (editor, optional) - e.g., "Net 30"
  - `notes` (editor, optional)
  - `sentAt` (date, optional)
  - `paidAt` (date, optional)
  - `createdBy` (relation, optional) → users

**Seed Data**: 10-15 invoices (mix of statuses: draft, sent, paid, partial-paid)

---

#### 7. **billing_management_invoice_line_items**
- **ID**: `pbc_2752470042`
- **Purpose**: Store line items for each invoice
- **Dependencies**: `billing_management_invoices`
- **Required Fields**:
  - `id` (auto-generated)
  - `invoice` (relation, optional) → invoices
  - `description` (editor, optional) - e.g., "Shipping Charge"
  - `quantity` (number, optional, int)
  - `unitPrice` (number, optional)
  - `taxRate` (number, optional) - percentage
  - `taxAmount` (number, optional)
  - `discountRate` (number, optional) - percentage
  - `discountAmount` (number, optional)

**Seed Data**: 2-3 line items per invoice

---

#### 8. **billing_management_payments**
- **ID**: `pbc_3700317039`
- **Purpose**: Record payment transactions
- **Dependencies**: `billing_management_invoices`
- **Required Fields**:
  - `id` (auto-generated)
  - `invoice` (relation, optional) → invoices
  - `amount` (number, optional)
  - `paymentMethod` (select, optional): credit-card, debit-card, wallet, qr-ph, client-credit, bank-transfer, cash, check
  - `transactionId` (text, auto-generated: `TRANSACTION-[A-Z]{10}-[0-9]{10}`)
  - `gatewayReferenceId` (text, optional)
  - `status` (select, optional): pending, processing, successful, failed, cancelled, refunded
  - `paymentDate` (date, optional)
  - `processedAt` (date, optional)
  - `currency` (text, optional, max 3)
  - `fees` (number, optional)
  - `netAmount` (number, optional)
  - `notes` (editor, optional)
  - `processedBy` (relation, optional) → users
  - `attachments` (file, optional, max 99)

**Seed Data**: 5-10 payments with mixed statuses

---

#### 9. **billing_management_disputes**
- **ID**: `pbc_1007290533`
- **Purpose**: Track billing disputes
- **Dependencies**: `billing_management_invoice_line_items` and `customer_relations_companies`
- **Required Fields**:
  - `id` (auto-generated)
  - `lineItem` (relation, optional) → invoice_line_items
  - `client` (relation, optional) → customer_relations_companies
  - `reason` (editor, optional) - e.g., "Service not provided"
  - `status` (select, optional): open, under-review, approved, denied, escalated, closed
  - `disputeAmount` (number, optional)
  - `resolutionNotes` (editor, optional)
  - `submittedAt` (date, optional)
  - `resolvedAt` (date, optional)
  - `resolvedBy` (relation, optional) → users

**Seed Data**: 2-3 disputes with mixed statuses

---

#### 10. **billing_management_credit_notes**
- **ID**: `pbc_1427075181`
- **Purpose**: Track credit notes issued for refunds/adjustments
- **Dependencies**: `billing_management_invoices` and `billing_management_disputes`
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `invoice` (relation, required) → invoices
  - `dispute` (relation, required) → disputes
  - `creditNoteNumber` (text, auto-generated: `CREDIT-[A-Z]{10}`, required)
  - `amount` (number, optional)
  - `reason` (editor, required)
  - `issueDate` (date, required)
  - `appliedAt` (date, optional)
  - `currency` (text, required)
  - `notes` (editor, optional)

**Seed Data**: 2-3 credit notes

---

### Phase 10 Seeding Order
1. Rate Cards
2. Rate Rules (depend on Rate Cards)
3. Surcharges
4. Client Accounts
5. Quotes (depends on Clients - from earlier phase)
6. Invoices (optional depend on Quotes)
7. Invoice Line Items (depend on Invoices)
8. Payments (depend on Invoices)
9. Disputes (depend on Line Items and Clients)
10. Credit Notes (depend on Invoices and Disputes)

---

## Phase 11: Logistics Execution (TMS)

### Purpose
Seed entities related to shipment logistics execution including shipment legs, shipment leg events, and proof of deliveries.

### Collections to Seed (in order)

#### 1. **transport_management_shipment_legs**
- **ID**: `pbc_2996053313`
- **Purpose**: Define shipment legs (segments of a shipment journey)
- **Dependencies**: Requires carriers (pbc_3084165411) and internal trips (pbc_488978894) from earlier phases
- **Required Fields**:
  - `id` (auto-generated)
  - `shipmentId` (text, optional)
  - `legSequence` (number, required) - e.g., 1, 2, 3
  - `startLocation` (geoPoint, optional)
  - `endLocation` (geoPoint, optional)
  - `carrier` (relation, optional) → transport_management_carriers
  - `internalTrip` (relation, optional) → transport_management_trips
  - `status` (select, optional): pending, in-transit, delivered, cancelled, failed

**Seed Data**: 5-10 shipment legs for different shipment scenarios

---

#### 2. **transport_management_shipment_leg_events**
- **ID**: `pbc_1648828818`
- **Purpose**: Track events during shipment leg execution
- **Dependencies**: `transport_management_shipment_legs`
- **Required Fields**:
  - `id` (auto-generated)
  - `message` (text, optional) - e.g., "Shipment picked up", "In transit"
  - `shipmentLegId` (relation, optional) → shipment_legs
  - `location` (geoPoint, optional)
  - `timestamp` (autodate, auto-set)

**Seed Data**: 2-4 events per shipment leg

---

#### 3. **transport_management_proof_of_deliveries** (TMS version)
- **ID**: `pbc_339364137`
- **Purpose**: Record proof of delivery at trip stops
- **Dependencies**: `transport_management_trip_stops` (pbc_1396130671)
- **Required Fields**:
  - `id` (auto-generated)
  - `tripStop` (relation, optional) → trip_stops
  - `coordinate` (geoPoint, optional)
  - `attachments` (file, optional, max 99)

**Seed Data**: 3-5 proof of deliveries for completed trip stops

---

### Phase 11 Seeding Order
1. Shipment Legs (require existing carriers and trips from Phase 6-7)
2. Shipment Leg Events (depend on Shipment Legs)
3. Proof of Deliveries (depend on Trip Stops from Phase 8)

---

## Phase 12: Delivery Management (DMS)

### Purpose
Seed entities related to delivery route management and task execution including delivery routes, tasks, task events, driver locations, and proof of deliveries.

### Collections to Seed (in order)

#### 1. **delivery_management_delivery_routes**
- **ID**: `pbc_1877544058`
- **Purpose**: Define delivery routes assigned to drivers
- **Dependencies**: Requires drivers (pbc_3317586480) from earlier phases
- **Required Fields**:
  - `id` (auto-generated)
  - `driver` (relation, optional) → transport_management_drivers
  - `routeDate` (date, optional)
  - `status` (select, optional): planned, in-progress, completed, cancelled, paused
  - `totalDistance` (number, optional) - km
  - `estimatedDurationInMinutes` (number, optional, int)
  - `startedAt` (date, optional)
  - `completedAt` (date, optional)

**Seed Data**: 3-5 delivery routes for different statuses

---

#### 2. **delivery_management_tasks**
- **ID**: `pbc_2766347546`
- **Purpose**: Individual delivery tasks within routes
- **Dependencies**: `delivery_management_delivery_routes` and `warehouse_management_packages` (pbc_670737719)
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `package` (relation, required) → warehouse_management_packages
  - `route` (relation, required) → delivery_routes
  - `sequence` (number, required, int) - order in route
  - `deliveryAddress` (text, required)
  - `recipientName` (text, optional)
  - `recipientPhone` (text, optional)
  - `deliveryInstructions` (editor, optional)
  - `estimatedArrivalTime` (date, optional)
  - `actualArrivalTime` (date, optional)
  - `deliveryTime` (date, optional)
  - `status` (select, required): pending, assigned, out-for-delivery, delivered, failed, cancelled, rescheduled
  - `attemptCount` (number, optional)
  - `attachments` (file, optional, max 99)
  - `failureReason` (select, optional): recipient-not-home, address-not-found, refused-delivery, damaged-package, access-denied, weather-conditions, vehicle-breakdown, other

**Seed Data**: 3-4 tasks per delivery route

---

#### 3. **delivery_management_task_events**
- **ID**: `pbc_2065460486`
- **Purpose**: Track status changes and events for delivery tasks
- **Dependencies**: `delivery_management_tasks`
- **Required Fields** (status required):
  - `id` (auto-generated)
  - `task` (relation, required) → delivery_tasks
  - `status` (select, required): assigned, started, arrived, delivered, failed, exception, cancelled, rescheduled
  - `reason` (editor, optional)
  - `notes` (editor, optional)
  - `coordinates` (geoPoint, optional)
  - `timestamp` (autodate, auto-set)

**Seed Data**: 2-3 events per delivery task

---

#### 4. **delivery_management_proof_of_deliveries** (DMS version)
- **ID**: `pbc_483536037`
- **Purpose**: Record signature and proof of delivery
- **Dependencies**: `delivery_management_tasks`
- **Required Fields**:
  - `id` (auto-generated)
  - `task` (relation, optional) → delivery_tasks
  - `signatureData` (json, optional) - base64 encoded signature
  - `recipientName` (text, optional)
  - `coordinates` (geoPoint, optional)
  - `timestamp` (autodate, auto-set)

**Seed Data**: 2-3 proof of deliveries for delivered tasks

---

#### 5. **delivery_management_driver_location**
- **ID**: `pbc_1355030704`
- **Purpose**: Real-time driver location tracking
- **Dependencies**: Requires drivers from earlier phases
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `driver` (relation, required) → transport_management_drivers
  - `coordinates` (geoPoint, required)
  - `heading` (geoPoint, required) - direction/bearing
  - `timestamp` (autodate, auto-set)

**Seed Data**: 3-5 location records per active driver

---

### Phase 12 Seeding Order
1. Delivery Routes (require existing drivers from Phase 6)
2. Delivery Tasks (depend on Routes and Packages from Phase 8)
3. Task Events (depend on Delivery Tasks)
4. Proof of Deliveries (depend on Delivery Tasks)
5. Driver Locations (require existing drivers from Phase 6)

**Note**: Packages must be seeded in an earlier phase (Phase 8 - Warehouse Management)

---

## Phase 13: Advanced & Operational

### Purpose
Seed optional/operational entities like expenses, geofences, geofence events, notifications, billing logs, stock transfers, packages, package items, returns, and return items.

### Collections to Seed (in order)

#### 1. **transport_management_expenses**
- **ID**: `pbc_2617964749`
- **Purpose**: Track driver and trip expenses
- **Dependencies**: Requires trips (pbc_488978894) and drivers (pbc_3317586480) from earlier phases
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `trip` (relation, optional) → transport_management_trips
  - `driver` (relation, optional) → transport_management_drivers
  - `type` (select, optional): fuel, tolls, maintenance, parking, meals, accommodation
  - `amount` (number, required)
  - `currency` (select, optional): PHP, USD, EUR
  - `receipts` (file, optional, max 99)
  - `fuelQuantity` (number, optional) - liters (for fuel type)
  - `odometerReading` (number, required, int)
  - `status` (select, optional): pending, approved, rejected, reimbursed

**Seed Data**: 5-10 expenses with mixed types and statuses

---

#### 2. **transport_management_geofence**
- **ID**: `pbc_209153493`
- **Purpose**: Define geographical boundaries for monitoring
- **Required Fields**:
  - `id` (auto-generated)
  - `name` (text, optional) - e.g., "Main Warehouse", "Customer Zone"
  - `coordinates` (geoPoint, optional) - center point
  - `radius` (number, optional) - in meters

**Seed Data**: 3-5 geofences (warehouses, restricted zones, service areas)

---

#### 3. **transport_management_geofence_events**
- **ID**: `pbc_3858826184`
- **Purpose**: Track vehicle entries and exits from geofences
- **Dependencies**: `transport_management_geofence` and `transport_management_vehicles` (pbc_2807194220)
- **Required Fields** (all required):
  - `id` (auto-generated)
  - `vehicle` (relation, required) → transport_management_vehicles
  - `geofence` (relation, required) → geofence
  - `type` (select, required): enter, exit
  - `timestamp` (autodate, auto-set)

**Seed Data**: 5-10 geofence events (mix of entry and exit)

---

#### 4. **notifications**
- **ID**: `pbc_2301922722`
- **Purpose**: System notifications for users
- **Dependencies**: Requires users from auth system
- **Required Fields** (user and message required):
  - `id` (auto-generated)
  - `user` (relation, required) → _pb_users_auth_
  - `message` (editor, required) - e.g., "Delivery completed", "Payment received"
  - `isRead` (bool, optional)
  - `link` (url, optional) - link to related resource

**Seed Data**: 10-15 notifications with mix of read/unread

---

#### 5. **billing_management_logs**
- **ID**: `pbc_1621132607`
- **Purpose**: Audit trail for billing system integrations
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `recordId` (text, required) - ID of the billing record
  - `recordType` (text, required) - e.g., "invoice", "payment", "quote"
  - `externalSystem` (text, required) - e.g., "accounting", "payment_gateway"
  - `externalId` (text, optional) - ID in external system
  - `status` (select, optional): pending, in-progress, success, failed, retry
  - `errorMessage` (text, optional)
  - `requestPayload` (json, optional)
  - `responsePayload` (json, optional)
  - `lastSyncAt` (date, optional)
  - `retryCount` (number, optional)
  - `nextRetryAt` (date, optional)

**Seed Data**: 5-10 logs with mixed statuses

---

#### 6. **warehouse_management_stock_transfer**
- **ID**: `pbc_1282758371`
- **Purpose**: Track stock transfers between warehouses
- **Dependencies**: Requires products (pbc_267730890) from Phase 8
- **Required Fields**:
  - `id` (auto-generated)
  - `product` (relation, optional) → warehouse_management_products
  - `quantity` (number, optional, int)
  - `status` (select, optional): pending, in-transit, received, cancelled

**Seed Data**: 3-5 stock transfers

---

#### 7. **warehouse_management_packages**
- **ID**: `pbc_670737719`
- **Purpose**: Package management for shipment
- **Dependencies**: Requires sales orders (pbc_2175921124) and warehouses (pbc_3815792949) from Phase 8
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `salesOrder` (relation, required) → warehouse_management_sales_orders
  - `packageNumber` (text, auto-generated: `PACKAGE-[A-Z]{10}-[0-9]{10}`, required)
  - `warehouse` (relation, required) → warehouse_management_warehouses
  - `type` (text, optional) - e.g., "Box", "Envelope"
  - `weight` (number, optional) - kg
  - `length` (number, optional) - cm
  - `width` (number, optional) - cm
  - `height` (number, optional) - cm
  - `packedByUser` (relation, optional) → users
  - `packedAt` (date, optional)
  - `shippedAt` (date, optional)
  - `isFragile` (bool, optional)
  - `isHazmat` (bool, optional)
  - `requireSignature` (bool, optional)
  - `insuranceValue` (number, optional)
  - `images` (file, optional, max 99)

**Unique Index**: `packageNumber`

**Seed Data**: 8-12 packages with mix of characteristics

---

#### 8. **warehouse_management_package_items**
- **ID**: `pbc_2589124034`
- **Purpose**: Individual items within a package
- **Dependencies**: `warehouse_management_packages` and `warehouse_management_products` (pbc_267730890), `warehouse_management_inventory_batches` (pbc_1019214288)
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `package` (relation, required) → warehouse_management_packages
  - `product` (relation, required) → warehouse_management_products
  - `batch` (relation, optional) → warehouse_management_inventory_batches
  - `quantity` (number, required)
  - `lotNumber` (text, optional)
  - `expiryDate` (date, optional)

**Seed Data**: 2-3 items per package

---

#### 9. **warehouse_management_returns**
- **ID**: `pbc_2733688340`
- **Purpose**: Manage returned products
- **Dependencies**: Requires sales orders (pbc_2175921124) and clients (pbc_609858025) from earlier phases
- **Required Fields** (some required):
  - `id` (auto-generated)
  - `returnNumber` (text, auto-generated: `RETURN-[A-Z]{10}`, required)
  - `salesOrder` (relation, optional) → warehouse_management_sales_orders
  - `client` (relation, optional) → customer_relations_companies
  - `status` (select, required): requested, approved, rejected, received, processed
  - `reason` (editor, optional)

**Unique Index**: `returnNumber`

**Seed Data**: 3-5 returns with mixed statuses

---

#### 10. **warehouse_management_return_items**
- **ID**: `pbc_2126709027`
- **Purpose**: Individual items in a return
- **Dependencies**: `warehouse_management_returns` and `warehouse_management_products` (pbc_267730890)
- **Required Fields** (all required):
  - `id` (auto-generated)
  - `return` (relation, required) → warehouse_management_returns
  - `product` (relation, required) → warehouse_management_products
  - `quantityExpected` (number, optional)
  - `quantityReceived` (number, optional)
  - `condition` (select, optional): sellable, damaged, defective, expired, unsellable

**Unique Index**: `(return, product)` - combination

**Seed Data**: 2-3 items per return

---

### Phase 13 Seeding Order
1. Expenses (require existing trips and drivers from Phase 6-7)
2. Geofences (independent)
3. Geofence Events (depend on Geofences and Vehicles from Phase 6)
4. Notifications (require existing users)
5. Billing Logs (independent)
6. Stock Transfers (require existing products from Phase 8)
7. Packages (require existing sales orders and warehouses from Phase 8)
8. Package Items (depend on Packages and Products from Phase 8)
9. Returns (require existing sales orders and clients from Phase 3-4)
10. Return Items (depend on Returns and Products from Phase 8)

---

## Cross-Phase Dependencies

### Phase 10 Dependencies
- **Clients**: From `customer_relations_companies` (Phase 3)
- **Users**: From auth system

### Phase 11 Dependencies
- **Carriers**: From `transport_management_carriers` (Phase 6)
- **Internal Trips**: From `transport_management_trips` (Phase 7)
- **Trip Stops**: From `transport_management_trip_stops` (Phase 7)

### Phase 12 Dependencies
- **Drivers**: From `transport_management_drivers` (Phase 6)
- **Packages**: From `warehouse_management_packages` (Phase 8 / Phase 13)
- **Trip Stops**: From `transport_management_trip_stops` (Phase 7)

### Phase 13 Dependencies
- **Trips**: From `transport_management_trips` (Phase 6)
- **Drivers**: From `transport_management_drivers` (Phase 6)
- **Vehicles**: From `transport_management_vehicles` (Phase 6)
- **Products**: From `warehouse_management_products` (Phase 8)
- **Sales Orders**: From `warehouse_management_sales_orders` (Phase 8)
- **Warehouses**: From `warehouse_management_warehouses` (Phase 8)
- **Inventory Batches**: From `warehouse_management_inventory_batches` (Phase 8)
- **Clients**: From `customer_relations_companies` (Phase 3)
- **Users**: From auth system

---

## Enum Values Reference

### Billing Status Values
- **Quotes**: pending, accepted, expired, cancelled, converted
- **Invoices**: draft, sent, viewed, paid, partial-paid, past-due, disputed, cancelled, void
- **Payments**: pending, processing, successful, failed, cancelled, refunded
- **Disputes**: open, under-review, approved, denied, escalated, closed

### Billing Types/Models
- **Rate Card Types**: shipping, storage, fulfillment, handling, insurance, customs, packaging, returns
- **Pricing Models**: per-kg, per-item, flat-rate, per-cubic-meter, per-zone, percentage, tiered
- **Calculation Methods**: percentage, fixed, per-unit, sliding-scale
- **Payment Methods**: credit-card, debit-card, wallet, qr-ph, client-credit, bank-transfer, cash, check

### Logistics Status Values
- **Shipment Legs**: pending, in-transit, delivered, cancelled, failed
- **Delivery Routes**: planned, in-progress, completed, cancelled, paused
- **Delivery Tasks**: pending, assigned, out-for-delivery, delivered, failed, cancelled, rescheduled
- **Task Events**: assigned, started, arrived, delivered, failed, exception, cancelled, rescheduled

### Warehouse & Operational Status Values
- **Stock Transfer**: pending, in-transit, received, cancelled
- **Returns**: requested, approved, rejected, received, processed
- **Expenses**: pending, approved, rejected, reimbursed
- **Billing Logs**: pending, in-progress, success, failed, retry
- **Geofence Events**: enter, exit

### Other Enums
- **Expense Types**: fuel, tolls, maintenance, parking, meals, accommodation
- **Return Item Conditions**: sellable, damaged, defective, expired, unsellable
- **Delivery Task Failure Reasons**: recipient-not-home, address-not-found, refused-delivery, damaged-package, access-denied, weather-conditions, vehicle-breakdown, other
- **Currencies**: PHP, USD, EUR

---

## Auto-Generation Patterns

- **Generic IDs**: `[a-z0-9]{15}` (all records)
- **Quote Numbers**: `QUOTE-[A-Z]{10}-[0-9]{10}`
- **Invoice Numbers**: `INVOICE-[A-Z]{10}-[0-9]{10}`
- **Transaction IDs**: `TRANSACTION-[A-Z]{10}-[0-9]{10}`
- **Package Numbers**: `PACKAGE-[A-Z]{10}-[0-9]{10}`
- **Return Numbers**: `RETURN-[A-Z]{10}`
- **Credit Note Numbers**: `CREDIT-[A-Z]{10}`

---

## Field Constraints Summary

| Constraint Type | Examples |
|---|---|
| **Integer Only** | `legSequence`, `attemptCount`, `odometerReading`, `sequence`, `retryCount` |
| **Max/Min** | `priority` (max 100), `currency` (max 3) |
| **Required** | Fields marked with "required" in field list |
| **Unique** | `quoteNumber`, `invoiceNumber`, `packageNumber`, `returnNumber` |
| **File Limits** | Max 99 files for `attachments`, `images`, `receipts` |
| **Text Editor** | `description`, `notes`, `reason`, `message`, `resolutionNotes` |
| **GeoPoint** | Latitude/Longitude coordinates |
| **JSON** | `signatureData`, `requestPayload`, `responsePayload` |

---

## Recommended Seed Quantities

| Collection | Min | Max | Suggested |
|---|---|---|---|
| Rate Cards | 2 | 5 | 4 |
| Rate Rules | 6 | 15 | 10 |
| Surcharges | 1 | 3 | 2 |
| Client Accounts | 3 | 10 | 5 |
| Quotes | 5 | 20 | 10 |
| Invoices | 5 | 30 | 15 |
| Invoice Line Items | 10 | 45 | 20 |
| Payments | 5 | 20 | 10 |
| Disputes | 1 | 5 | 3 |
| Credit Notes | 1 | 5 | 3 |
| Shipment Legs | 3 | 15 | 10 |
| Shipment Leg Events | 6 | 40 | 20 |
| TMS Proof of Deliveries | 2 | 10 | 5 |
| Delivery Routes | 2 | 8 | 5 |
| Delivery Tasks | 8 | 30 | 15 |
| Task Events | 12 | 60 | 25 |
| DMS Proof of Deliveries | 3 | 15 | 8 |
| Driver Locations | 3 | 20 | 10 |
| Expenses | 3 | 20 | 10 |
| Geofences | 2 | 8 | 5 |
| Geofence Events | 5 | 30 | 15 |
| Notifications | 5 | 30 | 15 |
| Billing Logs | 3 | 20 | 10 |
| Stock Transfers | 2 | 10 | 5 |
| Packages | 5 | 30 | 12 |
| Package Items | 10 | 50 | 25 |
| Returns | 2 | 10 | 5 |
| Return Items | 3 | 20 | 10 |

