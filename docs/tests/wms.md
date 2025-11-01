# WMS Schema Test Cases

This document outlines comprehensive test cases for the Warehouse Management System (WMS) schema that should be integrated into the testing suite at `@packages/graphql/tests/client/wms/`. The test cases are organized by entity and operation type (CRUD mutations and queries), and are aligned with the data flows documented in `@docs/dataflow/wms.md` and user stories in `@docs/stories/wms.md`.

## Test Case Structure

Each entity follows this pattern:
- **Create Operations**: Valid creation, missing required fields, invalid input
- **Update Operations**: Valid updates, partial updates, invalid field updates
- **Delete Operations**: Successful deletion, non-existent records
- **Query Operations**: Table queries with pagination, search queries with filters, analytics queries with aggregations

---

## 1. Warehouse Test Cases

### 1.1 Create Warehouse Tests

#### Valid Cases
- **Create warehouse with required fields**
  - Input: name, code, location
  - Expected: Warehouse created with "Active" status
  - Related Story: Warehouse Layout Configuration

- **Create warehouse with full information**
  - Input: name, code, location, capacity, address, contact info
  - Expected: All fields persisted correctly

- **Create warehouse with operating hours**
  - Input: name, code, operating_hours, timezone
  - Expected: Operating hours configured for task assignment

#### Invalid Cases
- **Create warehouse without name**
  - Expected: Validation error

- **Create warehouse without code**
  - Expected: Validation error

- **Create warehouse with duplicate code**
  - Expected: Duplicate check error

- **Create warehouse with negative capacity**
  - Expected: Validation error

### 1.2 Update Warehouse Tests

#### Valid Cases
- **Update warehouse name**
  - Expected: Name updated, audit trail recorded

- **Update warehouse operating hours**
  - Expected: Hours updated for task scheduling

- **Update warehouse capacity**
  - Expected: Capacity increased/decreased (with validation)

- **Update warehouse status**
  - Input: Active, Inactive
  - Expected: Status changed

#### Invalid Cases
- **Update warehouse with duplicate code**
  - Expected: Duplicate check error

- **Update non-existent warehouse**
  - Expected: Not found error

### 1.3 Delete Warehouse Tests

#### Valid Cases
- **Delete warehouse with no active locations**
  - Expected: Warehouse deleted/archived

#### Invalid Cases
- **Delete warehouse with active locations**
  - Expected: Error or cascade behavior

- **Delete non-existent warehouse**
  - Expected: Not found error

### 1.4 Warehouse Query Tests

#### Table Warehouse Query
- **Retrieve all warehouses with pagination**
  - Expected: Paginated list of warehouses

- **Retrieve warehouses sorted by name**
  - Expected: Alphabetically sorted

- **Retrieve warehouses by status**
  - Expected: Active/Inactive warehouses

#### Search Warehouses Query
- **Search warehouses by code**
  - Input: code contains "WH"
  - Expected: Matching warehouses

- **Search warehouses by name**
  - Input: name contains "Central"
  - Expected: Matching warehouses

- **Filter warehouses by capacity range**
  - Input: capacity > 10000
  - Expected: Warehouses meeting criteria

#### Warehouse Analytics Query
- **Get total warehouse capacity**
  - Expected: Sum of all warehouse capacities

- **Get warehouse utilization metrics**
  - Expected: Current usage percentage per warehouse

---

## 2. Location Test Cases

### 2.1 Create Location Tests

#### Valid Cases
- **Create warehouse zone**
  - Input: warehouse_id, name, code, type="zone"
  - Expected: Zone created at top level

- **Create hierarchical locations**
  - Input: Create zone → aisle → rack → bin hierarchy
  - Expected: Parent-child relationships maintained

- **Create location with capacity**
  - Input: name, capacity, dimensions
  - Expected: Location created with properties stored

- **Create special location types**
  - Input: type = "receiving_dock", "packing_station", "cross_dock"
  - Expected: Special locations created for operations

#### Invalid Cases
- **Create location without parent (non-zone)**
  - Expected: Validation error

- **Create location with invalid type**
  - Expected: Type validation error

- **Create location with negative dimensions**
  - Expected: Validation error

### 2.2 Update Location Tests

#### Valid Cases
- **Update location name and description**
  - Expected: Location details updated

- **Update location capacity**
  - Expected: Capacity updated (with validation)

- **Update location status**
  - Input: Available, Unavailable, Maintenance
  - Expected: Status changed

- **Move location to different parent**
  - Input: new_parent_id (if no inventory)
  - Expected: Location hierarchy updated

#### Invalid Cases
- **Update location with inventory to different parent**
  - Expected: Error (inventory locked)

- **Update non-existent location**
  - Expected: Not found error

### 1.3 Delete Location Tests

#### Valid Cases
- **Delete empty leaf location**
  - Expected: Location deleted

- **Delete location hierarchy**
  - Input: Delete zone with empty child locations
  - Expected: Cascade delete to empty children

#### Invalid Cases
- **Delete location with inventory**
  - Expected: Error

- **Delete location with active tasks**
  - Expected: Error

### 2.4 Location Query Tests

#### Table Location Query
- **Retrieve all locations with pagination**
  - Expected: Paginated list

- **Retrieve locations by warehouse**
  - Expected: All locations in warehouse

- **Retrieve locations by type**
  - Input: type = "bin"
  - Expected: All bin locations

#### Search Locations Query
- **Search locations by code**
  - Input: code contains "A01"
  - Expected: Matching locations

- **Search locations by name**
  - Input: name contains "Receiving"
  - Expected: Matching locations

- **Get location hierarchy path**
  - Input: location_id
  - Expected: Full parent path (Zone > Aisle > Rack > Bin)

- **Find available locations**
  - Input: Filter by status="Available" AND available_capacity > 0
  - Expected: Locations ready for inventory

#### Location Tree Query
- **Get warehouse structure as tree**
  - Expected: Hierarchical tree view

- **Get all leaf locations (bins) for warehouse**
  - Expected: List of all bins

---

## 3. Bin Threshold Test Cases

### 3.1 Create Bin Threshold Tests

#### Valid Cases
- **Create threshold for pick bin**
  - Input: bin_location_id, product_id, minimum_qty, reorder_qty, source_location_id
  - Expected: Threshold created and active

- **Create multiple thresholds for same location**
  - Input: Different products with different thresholds
  - Expected: Multiple thresholds coexist

- **Create threshold with reorder point**
  - Input: minimum_qty=50, reorder_qty=100
  - Expected: Threshold configured for replenishment

#### Invalid Cases
- **Create threshold for non-bin location**
  - Expected: Validation error

- **Create threshold with negative quantities**
  - Expected: Validation error

- **Create threshold without source location**
  - Expected: Validation error

- **Create threshold pointing to same location**
  - Expected: Error (circular reference)

### 3.2 Update Bin Threshold Tests

#### Valid Cases
- **Update minimum quantity**
  - Expected: New threshold effective immediately

- **Change source location**
  - Expected: Future replenishments use new source

- **Disable/enable threshold**
  - Expected: Status changed

#### Invalid Cases
- **Update threshold to exceed bin capacity**
  - Expected: Validation error

- **Update non-existent threshold**
  - Expected: Not found error

### 3.3 Delete Bin Threshold Tests

#### Valid Cases
- **Delete inactive threshold**
  - Expected: Threshold removed

- **Archive active threshold**
  - Expected: Logical delete (status changed)

#### Invalid Cases
- **Delete threshold with pending replenishment**
  - Expected: Error

### 3.4 Bin Threshold Query Tests

#### Table Threshold Query
- **Retrieve all thresholds with pagination**
  - Expected: Paginated list

- **Retrieve thresholds by warehouse**
  - Expected: All thresholds in warehouse

- **Retrieve thresholds by location**
  - Expected: Thresholds for specific location

#### Search Thresholds Query
- **Find thresholds by product**
  - Input: product_id
  - Expected: All thresholds for product

- **Find thresholds currently triggered**
  - Expected: Thresholds below minimum quantity

---

## 4. Put-Away Rule Test Cases

### 4.1 Create Put-Away Rule Tests

#### Valid Cases
- **Create rule for specific product and location**
  - Input: product_id, target_location_id, priority, conditions
  - Expected: Rule created and active

- **Create rule with multiple eligible locations**
  - Input: List of target locations with priority
  - Expected: Rule configured with fallback locations

- **Create rule with conditions**
  - Input: Conditions like "high_velocity → zone_A", "client_X → dedicated_area"
  - Expected: Rule with conditional logic

#### Invalid Cases
- **Create rule without target location**
  - Expected: Validation error

- **Create rule with invalid conditions**
  - Expected: Condition validation error

- **Create conflicting rule priorities**
  - Expected: Error if conflicts with existing rules

### 4.2 Update Put-Away Rule Tests

#### Valid Cases
- **Update target location**
  - Expected: New rules use updated location

- **Adjust priority**
  - Expected: Rule priority changed

- **Enable/disable rule**
  - Expected: Status updated

#### Invalid Cases
- **Update rule with deleted target location**
  - Expected: Error

- **Update non-existent rule**
  - Expected: Not found error

### 4.3 Delete Put-Away Rule Tests

#### Valid Cases
- **Delete inactive rule**
  - Expected: Rule removed

#### Invalid Cases
- **Delete rule referenced by active tasks**
  - Expected: Error or cascade behavior

### 4.4 Put-Away Rule Query Tests

#### Table Rule Query
- **Retrieve all put-away rules with pagination**
  - Expected: Paginated list

- **Retrieve rules by warehouse**
  - Expected: Rules for warehouse

- **Retrieve rules by priority**
  - Expected: Rules sorted by priority

#### Search Rules Query
- **Find applicable rules for product**
  - Input: product_id
  - Expected: Matching rules in priority order

- **Find rules by client**
  - Input: client_id
  - Expected: Client-specific rules

---

## 5. Inbound Shipment Test Cases

### 5.1 Create Inbound Shipment Tests

#### Valid Cases
- **Create shipment from supplier**
  - Input: warehouse_id, supplier_id, expected_arrival, line_items
  - Expected: Shipment created with "Expected" status

- **Create shipment with multiple line items**
  - Input: Multiple SKUs with quantities
  - Expected: Line items created with shipment

- **Create shipment linked to ASN**
  - Input: asn_number, warehouse_id
  - Expected: Shipment linked to ASN

#### Invalid Cases
- **Create shipment without warehouse**
  - Expected: Validation error

- **Create shipment without line items**
  - Expected: Validation error

- **Create shipment with negative quantities**
  - Expected: Validation error

### 5.2 Update Inbound Shipment Tests

#### Valid Cases
- **Update shipment status to "Receiving"**
  - Expected: Reception started

- **Log partial receipt**
  - Input: product_id, received_qty
  - Expected: Quantity updated, inventory increased

- **Mark shipment as "Received"**
  - Input: Mark all items received
  - Expected: Status changed, put-away tasks generated

- **Update received quantity for line item**
  - Expected: Line item quantity updated

#### Invalid Cases
- **Update shipment after completion**
  - Expected: Error (shipment locked)

- **Update received quantity > expected**
  - Expected: Warning or error

- **Update non-existent shipment**
  - Expected: Not found error

### 5.3 Delete Inbound Shipment Tests

#### Valid Cases
- **Delete "Expected" shipment (not yet received)**
  - Expected: Shipment deleted

#### Invalid Cases
- **Delete received shipment**
  - Expected: Error (data integrity)

- **Delete shipment if put-away tasks generated**
  - Expected: Error (tasks exist)

### 5.4 Inbound Shipment Query Tests

#### Table Shipment Query
- **Retrieve all inbound shipments with pagination**
  - Expected: Paginated list

- **Retrieve shipments by warehouse**
  - Expected: Shipments for warehouse

- **Retrieve shipments by status**
  - Input: status = "Expected", "Receiving", "Received"
  - Expected: Filtered shipments

- **Retrieve shipments by date range**
  - Input: date range
  - Expected: Shipments in range

#### Search Shipments Query
- **Search by ASN number**
  - Input: asn_number
  - Expected: Matching shipment

- **Search by supplier**
  - Input: supplier_id
  - Expected: Supplier shipments

- **Find pending reception shipments**
  - Expected: Shipments not yet received

#### Inbound Analytics Query
- **Count shipments by status**
  - Expected: { "Expected": 5, "Receiving": 2, "Received": 28 }

- **Average receipt time**
  - Expected: Mean time from expected to received

---

## 6. Inventory Stock Test Cases

### 6.1 Create Inventory Stock Tests

#### Valid Cases
- **Create stock record on receipt**
  - Input: location_id, product_id, quantity, status="on_hand"
  - Expected: Stock created in location

- **Create stock from replenishment**
  - Input: Stock from stock transfer completion
  - Expected: Quantity added to destination

- **Create stock from return**
  - Input: Stock from return processing
  - Expected: Stock created for resellable return

#### Invalid Cases
- **Create stock without location**
  - Expected: Validation error

- **Create stock with negative quantity**
  - Expected: Validation error

- **Create stock with invalid status**
  - Expected: Status validation error

### 6.2 Update Inventory Stock Tests

#### Valid Cases
- **Decrease quantity on pick**
  - Input: quantity decreased by picker
  - Expected: New quantity in location

- **Change status to "Allocated"**
  - Input: Pick task created
  - Expected: Status changed, quantity reserved

- **Change status back to "On Hand"**
  - Input: Pick cancelled
  - Expected: Allocation released

- **Update status to "Damaged"**
  - Expected: Stock moved to damaged status

- **Increase quantity on replenishment**
  - Input: Stock transfer completed
  - Expected: New quantity recorded

#### Invalid Cases
- **Decrease below zero**
  - Expected: Error (insufficient stock)

- **Allocate exceeding available**
  - Expected: Error

- **Update non-existent stock**
  - Expected: Not found error

### 6.3 Delete Inventory Stock Tests

#### Valid Cases
- **Archive zero-quantity stock**
  - Expected: Logical delete

#### Invalid Cases
- **Delete active stock**
  - Expected: Error (only archive allowed)

### 6.4 Inventory Stock Query Tests

#### Table Stock Query
- **Retrieve all inventory with pagination**
  - Expected: Paginated list

- **Retrieve inventory by warehouse**
  - Expected: All stock in warehouse

- **Retrieve inventory by location**
  - Expected: Stock in specific location

- **Retrieve inventory by product**
  - Expected: Stock of product across locations

- **Retrieve inventory by status**
  - Input: status = "on_hand", "allocated", "damaged"
  - Expected: Filtered inventory

#### Search Stock Query
- **Search by product code**
  - Input: product_code
  - Expected: Stock locations for product

- **Find low-stock items**
  - Input: Quantity < minimum threshold
  - Expected: Low-stock items

- **Find overstock situations**
  - Expected: Locations exceeding capacity

#### Stock Analytics Query
- **Total inventory by product**
  - Expected: Sum of quantities by product

- **Total inventory by location**
  - Expected: Sum of quantities by location

- **Total inventory value**
  - Expected: Inventory × unit cost calculation

- **FIFO query**
  - Expected: Oldest stock first (by batch)

- **Inventory turnover rate**
  - Expected: Turnover metrics by product

---

## 7. Inventory Batch Test Cases

### 7.1 Create Inventory Batch Tests

#### Valid Cases
- **Create batch from inbound receipt**
  - Input: lot_number, production_date, expiration_date
  - Expected: Batch created and linked to stock

- **Create batch with quality status**
  - Input: quality_status = "good", "quarantine", "damaged"
  - Expected: Batch created with status

- **Create batch with cost tracking**
  - Input: cost_per_unit
  - Expected: Cost recorded for batch

#### Invalid Cases
- **Create batch without inventory stock**
  - Expected: Validation error

- **Create batch with production_date > expiration_date**
  - Expected: Validation error

- **Create batch with duplicate lot_number for same product**
  - Expected: Duplicate check error

### 7.2 Update Inventory Batch Tests

#### Valid Cases
- **Update batch quality status**
  - Expected: Status changed

- **Mark batch expired**
  - Expected: Batch archived/flagged

- **Update batch quality inspection result**
  - Expected: Result recorded

#### Invalid Cases
- **Update non-existent batch**
  - Expected: Not found error

### 7.3 Delete Inventory Batch Tests

#### Valid Cases
- **Archive expired batch**
  - Expected: Logical delete

- **Archive zero-quantity batch**
  - Expected: Logical delete

#### Invalid Cases
- **Delete active batch with inventory**
  - Expected: Error

### 7.4 Inventory Batch Query Tests

#### Table Batch Query
- **Retrieve all batches with pagination**
  - Expected: Paginated list

- **Retrieve batches by warehouse**
  - Expected: Batches in warehouse

- **Retrieve batches by product**
  - Expected: Batches of product

#### Search Batches Query
- **Search by lot number**
  - Input: lot_number
  - Expected: Matching batch

- **Find expiring batches**
  - Input: Expiration date <= today + 30 days
  - Expected: Batches expiring soon

- **Find quarantined batches**
  - Input: quality_status = "quarantine"
  - Expected: Quarantined batches

- **Find batches by quality status**
  - Expected: Batches with status

#### Batch Analytics Query
- **Batches expiring in X days (aging report)**
  - Expected: Expiration timeline

- **Inventory value by batch**
  - Expected: Cost × quantity per batch

- **Batch turnover analysis**
  - Expected: FIFO/FEFO metrics

---

## 8. Inventory Adjustment Test Cases

### 8.1 Create Inventory Adjustment Tests

#### Valid Cases
- **Create adjustment for cycle count**
  - Input: location_id, product_id, expected_qty, actual_qty, reason="cycle_count"
  - Expected: Adjustment created with status="pending"

- **Create adjustment for damage**
  - Input: reason="damage", quantity
  - Expected: Negative adjustment created

- **Create adjustment for correction**
  - Input: reason="correction", variance
  - Expected: Adjustment recorded

#### Invalid Cases
- **Create adjustment without reason**
  - Expected: Validation error

- **Create adjustment with non-existent location/product**
  - Expected: Not found error

### 8.2 Update Inventory Adjustment Tests

#### Valid Cases
- **Mark adjustment as reviewed**
  - Expected: Status changed to "reviewed"

- **Approve adjustment**
  - Expected: Status changed to "approved", inventory updated

- **Reject adjustment**
  - Expected: Status changed to "rejected"

#### Invalid Cases
- **Update non-existent adjustment**
  - Expected: Not found error

### 8.3 Delete Inventory Adjustment Tests

#### Valid Cases
- **Delete unapproved adjustment**
  - Expected: Adjustment deleted

#### Invalid Cases
- **Delete approved adjustment**
  - Expected: Must reverse instead

### 8.4 Inventory Adjustment Query Tests

#### Table Adjustment Query
- **Retrieve all adjustments with pagination**
  - Expected: Paginated list

- **Retrieve adjustments by warehouse**
  - Expected: Adjustments in warehouse

- **Retrieve adjustments by status**
  - Input: status = "pending", "reviewed", "approved"
  - Expected: Filtered adjustments

- **Retrieve adjustments by date range**
  - Expected: Adjustments in range

#### Search Adjustments Query
- **Search by location**
  - Input: location_id
  - Expected: Location adjustments

- **Search by reason**
  - Input: reason = "cycle_count"
  - Expected: Adjustments by reason

- **Find unapproved adjustments**
  - Expected: Pending approval

#### Adjustment Analytics Query
- **Total variance by location**
  - Expected: Sum of adjustments by location

- **Inventory accuracy rate**
  - Expected: (Expected - |Variance|) / Expected × 100%

- **Variance by reason**
  - Expected: Breakdown of variance types

---

## 9. Sales Order Test Cases

### 9.1 Create Sales Order Tests

#### Valid Cases
- **Create order from CRM**
  - Input: order_id (from IMS/CRM), warehouse_id, line_items
  - Expected: Order created with "pending_fulfillment" status

- **Create order with multiple items**
  - Input: Multiple SKUs with quantities
  - Expected: Line items created

#### Invalid Cases
- **Create order without warehouse**
  - Expected: Validation error

- **Create order without line items**
  - Expected: Validation error

- **Create order with negative quantities**
  - Expected: Validation error

### 9.2 Update Sales Order Tests

#### Valid Cases
- **Update status to "fulfillment_in_progress"**
  - Expected: Pick batch created

- **Update status to "fulfilled"**
  - Input: All items picked and packed
  - Expected: Status changed

- **Update status to "shipped"**
  - Input: Shipment dispatched
  - Expected: Status changed

- **Cancel order**
  - Input: status = "cancelled"
  - Expected: Status changed, tasks cancelled, stock deallocated

#### Invalid Cases
- **Update after fulfillment**
  - Expected: Error (order locked)

- **Cancel shipped order**
  - Expected: Error (cannot undo shipment)

### 9.3 Delete Sales Order Tests

#### Valid Cases
- **Delete unfulfilled order (no tasks)**
  - Expected: Order deleted

#### Invalid Cases
- **Delete order with active tasks**
  - Expected: Error

### 9.4 Sales Order Query Tests

#### Table Order Query
- **Retrieve all orders with pagination**
  - Expected: Paginated list

- **Retrieve orders by warehouse**
  - Expected: Orders for warehouse

- **Retrieve orders by status**
  - Input: status
  - Expected: Filtered orders

- **Retrieve orders by date range**
  - Expected: Orders in range

#### Search Orders Query
- **Search by order number**
  - Input: order_number
  - Expected: Matching order

- **Search by customer**
  - Input: customer_id
  - Expected: Customer orders

- **Find pending fulfillment orders**
  - Expected: Not yet started

#### Order Analytics Query
- **Orders fulfilled per day**
  - Expected: Daily fulfillment count

- **Average fulfillment time**
  - Expected: Mean time from created to shipped

- **Order accuracy rate**
  - Expected: Orders shipped with correct items

---

## 10. Pick Batch Test Cases

### 10.1 Create Pick Batch Tests

#### Valid Cases
- **Create batch from pending orders**
  - Input: Order list, picking strategy
  - Expected: Batch created with "assigned" status

- **Create batch with zone optimization**
  - Input: Multiple orders from same zone
  - Expected: Optimized batch created

- **Create batch with cross-zone orders**
  - Input: Orders spanning multiple zones
  - Expected: Tasks created per zone

#### Invalid Cases
- **Create batch without orders**
  - Expected: Validation error

- **Create batch with already-picked orders**
  - Expected: Error

### 10.2 Update Pick Batch Tests

#### Valid Cases
- **Update status to "in_progress"**
  - Input: Picker receives task
  - Expected: Status changed, picker assigned

- **Update status to "completed"**
  - Input: All items picked
  - Expected: Status changed, items moved to packing

- **Assign picker to batch**
  - Expected: Picker assignment recorded

- **Add item to batch**
  - Input: New item_id
  - Expected: Item added (if batch not started)

#### Invalid Cases
- **Update completed batch**
  - Expected: Error (batch locked)

- **Add item to in-progress batch**
  - Expected: Error

### 10.3 Delete Pick Batch Tests

#### Valid Cases
- **Delete unstarted batch**
  - Expected: Batch deleted

- **Cancel in-progress batch**
  - Expected: Status changed to "cancelled", stock deallocated

#### Invalid Cases
- **Delete completed batch**
  - Expected: Error

### 10.4 Pick Batch Query Tests

#### Table Batch Query
- **Retrieve all batches with pagination**
  - Expected: Paginated list

- **Retrieve batches by warehouse**
  - Expected: Warehouse batches

- **Retrieve batches by status**
  - Input: status
  - Expected: Filtered batches

- **Retrieve batches by picker**
  - Expected: Picker's batches

#### Search Batches Query
- **Find pending batches**
  - Expected: Not yet started

- **Find batches by zone**
  - Expected: Zone batches

#### Batch Analytics Query
- **Picks per hour by picker**
  - Expected: Productivity metric

- **Average batch size**
  - Expected: Mean items per batch

---

## 11. Package Test Cases

### 11.1 Create Package Tests

#### Valid Cases
- **Create package for picked items**
  - Input: items, packaging_type, sales_order_id
  - Expected: Package created with "packing" status

- **Create package with items**
  - Input: Multiple items from order
  - Expected: Items linked to package

#### Invalid Cases
- **Create package without items**
  - Expected: Validation error

- **Create package with items from different orders**
  - Expected: Error (order isolation)

### 11.2 Update Package Tests

#### Valid Cases
- **Mark as "packed"**
  - Expected: Status changed

- **Record weight and dimensions**
  - Input: weight, length, width, height
  - Expected: Dimensions recorded

- **Link shipping label**
  - Input: label_id from carrier
  - Expected: Label linked

- **Update tracking number**
  - Input: tracking_number from carrier
  - Expected: Tracking recorded

#### Invalid Cases
- **Update shipped package**
  - Expected: Error (package locked)

### 11.3 Delete Package Tests

#### Valid Cases
- **Delete unpacked package**
  - Expected: Package deleted

#### Invalid Cases
- **Delete packed/shipped package**
  - Expected: Error

### 11.4 Package Query Tests

#### Table Package Query
- **Retrieve all packages with pagination**
  - Expected: Paginated list

- **Retrieve packages by warehouse**
  - Expected: Warehouse packages

- **Retrieve packages by status**
  - Input: status
  - Expected: Filtered packages

#### Search Packages Query
- **Search by tracking number**
  - Input: tracking_number
  - Expected: Matching package

- **Search by order**
  - Input: order_id
  - Expected: Order packages

#### Package Analytics Query
- **Average package weight**
  - Expected: Mean weight

- **Packing accuracy**
  - Expected: Correct items per package rate

---

## 12. Outbound Shipment Test Cases

### 12.1 Create Outbound Shipment Tests

#### Valid Cases
- **Create shipment from packages**
  - Input: package_ids, warehouse_id, carrier_id
  - Expected: Shipment created with "ready_for_pickup" status

- **Consolidate multiple packages**
  - Input: Multiple packages to same destination
  - Expected: Shipment created

#### Invalid Cases
- **Create shipment without packages**
  - Expected: Validation error

- **Create shipment with unpacked packages**
  - Expected: Error

### 12.2 Update Outbound Shipment Tests

#### Valid Cases
- **Update status to "picked_up"**
  - Expected: Carrier pickup recorded

- **Update status to "in_transit"**
  - Expected: Shipment in transit

- **Update status to "delivered"**
  - Expected: POD received

- **Update tracking number**
  - Input: carrier tracking number
  - Expected: Tracking recorded

#### Invalid Cases
- **Update delivered shipment**
  - Expected: Error (shipment complete)

### 12.3 Delete Outbound Shipment Tests

#### Valid Cases
- **Delete ready_for_pickup shipment**
  - Expected: Shipment deleted

#### Invalid Cases
- **Delete picked_up shipment**
  - Expected: Error (in transit)

### 12.4 Outbound Shipment Query Tests

#### Table Shipment Query
- **Retrieve all shipments with pagination**
  - Expected: Paginated list

- **Retrieve shipments by warehouse**
  - Expected: Warehouse shipments

- **Retrieve shipments by status**
  - Input: status
  - Expected: Filtered shipments

- **Retrieve shipments by carrier**
  - Expected: Carrier shipments

#### Search Shipments Query
- **Search by tracking number**
  - Input: tracking_number
  - Expected: Matching shipment

- **Find ready shipments**
  - Expected: Awaiting pickup

#### Shipment Analytics Query
- **Shipments per day**
  - Expected: Daily volume

- **Average delivery time**
  - Expected: Mean time to delivery

---

## 13. Task Test Cases

### 13.1 Create Task Tests

#### Valid Cases
- **Create put-away task**
  - Input: inbound_shipment_item_id, location_id, operator_id
  - Expected: Task created with "assigned" status

- **Create pick task**
  - Input: pick_batch_id, operator_id
  - Expected: Task created with "assigned" status

- **Create replenishment task**
  - Input: source_location_id, destination_location_id, product_id, quantity
  - Expected: Task created (auto-generated from threshold)

- **Create return task**
  - Input: return_id, operator_id
  - Expected: Task created for returns processor

- **Assign priority**
  - Input: priority (high, normal, low)
  - Expected: Priority set for ordering

#### Invalid Cases
- **Create task without operator**
  - Expected: Validation error

- **Create task with invalid location**
  - Expected: Not found error

- **Create task with negative quantity**
  - Expected: Validation error

### 13.2 Update Task Tests

#### Valid Cases
- **Update status to "in_progress"**
  - Input: Operator starts task
  - Expected: Status changed, timestamp recorded

- **Update status to "completed"**
  - Input: Operator completes task
  - Expected: Status changed, completion time recorded

- **Reassign task to different operator**
  - Input: new_operator_id (if not started)
  - Expected: Operator reassigned

- **Update task quantity**
  - Input: new_quantity (if not started)
  - Expected: Quantity updated

- **Cancel task**
  - Expected: Status changed to "cancelled", stock deallocated

#### Invalid Cases
- **Update completed task**
  - Expected: Error (task locked)

- **Reassign in-progress task**
  - Expected: Error

### 13.3 Delete Task Tests

#### Valid Cases
- **Delete unstarted task**
  - Expected: Task deleted

#### Invalid Cases
- **Delete in-progress task**
  - Expected: Must cancel instead

### 13.4 Task Query Tests

#### Table Task Query
- **Retrieve all tasks with pagination**
  - Expected: Paginated list

- **Retrieve tasks by warehouse**
  - Expected: Warehouse tasks

- **Retrieve tasks by operator**
  - Expected: Operator's tasks

- **Retrieve tasks by status**
  - Input: status
  - Expected: Filtered tasks

- **Retrieve tasks by type**
  - Input: type = "put_away", "pick", "replenish", "return"
  - Expected: Filtered by type

#### Search Tasks Query
- **Find pending tasks for operator**
  - Input: operator_id, status="assigned"
  - Expected: Operator's pending tasks

- **Find tasks by location**
  - Input: location_id
  - Expected: Location tasks

- **Find high-priority tasks**
  - Expected: Priority tasks

- **Find overdue tasks**
  - Expected: Tasks past expected completion

#### Task Analytics Query
- **Tasks completed per operator**
  - Expected: Completion count by operator

- **Average task completion time**
  - Expected: Mean duration

- **Task accuracy rate**
  - Expected: Correct execution percentage

- **Picks per hour**
  - Expected: Pick task productivity

- **Put-aways per hour**
  - Expected: Put-away task productivity

---

## 14. Return Test Cases

### 14.1 Create Return Tests

#### Valid Cases
- **Create return from RMA**
  - Input: rma_number, warehouse_id, order_id
  - Expected: Return created with "received" status

- **Create return with items**
  - Input: Multiple return items
  - Expected: Return items linked

#### Invalid Cases
- **Create return without RMA**
  - Expected: Validation error

- **Create return without warehouse**
  - Expected: Validation error

### 14.2 Update Return Tests

#### Valid Cases
- **Update status to "inspecting"**
  - Expected: Inspection started

- **Assign disposition to item**
  - Input: disposition = "resellable", "refurbish", "damaged", "write_off"
  - Expected: Disposition recorded

- **Mark as "processed"**
  - Input: All items disposition assigned
  - Expected: Status changed

- **Generate put-away task for resellable**
  - Expected: Task created for inventory restoration

#### Invalid Cases
- **Update processed return**
  - Expected: Error (return locked)

### 14.3 Delete Return Tests

#### Valid Cases
- **Delete unprocessed return**
  - Expected: Return deleted

#### Invalid Cases
- **Delete processed return**
  - Expected: Error (data integrity)

### 14.4 Return Query Tests

#### Table Return Query
- **Retrieve all returns with pagination**
  - Expected: Paginated list

- **Retrieve returns by warehouse**
  - Expected: Warehouse returns

- **Retrieve returns by status**
  - Input: status
  - Expected: Filtered returns

- **Retrieve returns by date range**
  - Expected: Returns in range

#### Search Returns Query
- **Search by RMA number**
  - Input: rma_number
  - Expected: Matching return

- **Search by order**
  - Input: order_id
  - Expected: Order returns

- **Find pending returns**
  - Expected: Not yet processed

#### Return Analytics Query
- **Returns by disposition**
  - Expected: Breakdown of dispositions

- **Return rate by product**
  - Expected: Returns per product

- **Average return processing time**
  - Expected: Mean processing duration

---

## 15. Product Test Cases

### 15.1 Create Product Tests

#### Valid Cases
- **Create product with required fields**
  - Input: sku, name, category
  - Expected: Product created with "active" status

- **Create product with full information**
  - Input: sku, name, category, description, uom
  - Expected: All fields persisted

- **Create batch-tracked product**
  - Input: batch_tracked=true, lot_number_format
  - Expected: Product marked for batch tracking

- **Create expiration-tracked product**
  - Input: expiration_tracked=true
  - Expected: Product marked for expiration tracking

#### Invalid Cases
- **Create product without SKU**
  - Expected: Validation error

- **Create product with duplicate SKU**
  - Expected: Duplicate check error

- **Create product with invalid UOM**
  - Expected: UOM validation error

### 15.2 Update Product Tests

#### Valid Cases
- **Update product name**
  - Expected: Name updated

- **Update product category**
  - Expected: Category updated

- **Update product status**
  - Input: active, inactive
  - Expected: Status changed

- **Update tracking settings**
  - Expected: Tracking updated

#### Invalid Cases
- **Update product with duplicate SKU**
  - Expected: Duplicate check error

- **Update with inventory (SKU change)**
  - Expected: Error (SKU locked)

### 15.3 Delete Product Tests

#### Valid Cases
- **Delete product with no inventory**
  - Expected: Product deleted

#### Invalid Cases
- **Delete product with inventory**
  - Expected: Error or archive

### 15.4 Product Query Tests

#### Table Product Query
- **Retrieve all products with pagination**
  - Expected: Paginated list

- **Retrieve products by category**
  - Expected: Category products

- **Retrieve products by status**
  - Input: status
  - Expected: Filtered products

#### Search Products Query
- **Search by SKU**
  - Input: sku
  - Expected: Matching product

- **Search by name**
  - Input: name contains
  - Expected: Matching products

- **Find batch-tracked products**
  - Expected: Batch products

- **Find expiration-tracked products**
  - Expected: Expiration products

#### Product Analytics Query
- **Product count by category**
  - Expected: Breakdown by category

- **Active vs inactive products**
  - Expected: Status count

---

## 16. Integration & Cross-Entity Tests

### 16.1 End-to-End: Receiving to Put-Away

**Workflow:**
1. Inbound shipment created with ASN
2. Shipment received at receiving dock
3. Items scanned against ASN
4. Put-away rules applied
5. Put-away tasks generated
6. Operator completes put-away
7. Inventory stock updated in location

**Test Cases:**
- Verify inventory increases in correct location
- Verify put-away tasks created correctly
- Verify stock status is "on_hand"
- Verify audit trail recorded

### 16.2 End-to-End: Picking to Shipping

**Workflow:**
1. Sales order created
2. Pick batch created
3. Picker receives tasks
4. Items picked from bins
5. Inventory allocated
6. Items moved to packing station
7. Packer verifies items
8. Package created with weight/dimensions
9. Shipping label generated
10. Outbound shipment created
11. Package picked up by carrier

**Test Cases:**
- Verify stock status transitions correctly
- Verify picking accuracy
- Verify package weight recorded
- Verify shipment created
- Verify order marked shipped

### 16.3 End-to-End: Returns Processing

**Workflow:**
1. Return/RMA received
2. Items inspected
3. Disposition assigned
4. If resellable: put-away task created
5. Stock moved back to picking bin
6. If damaged: moved to quarantine
7. Inventory adjustment created

**Test Cases:**
- Verify return items inspected
- Verify resellable items restored to inventory
- Verify damaged items handled correctly
- Verify inventory corrected

### 16.4 Replenishment Automation

**Workflow:**
1. Pick from bin below threshold
2. System detects threshold breach
3. Replenishment task auto-created
4. Operator moves stock from bulk location
5. Both locations scanned
6. Inventory updated in both locations

**Test Cases:**
- Verify threshold detection
- Verify replenishment task created
- Verify source location depleted
- Verify destination location replenished
- Verify total inventory unchanged

### 16.5 Multi-Zone Picking

**Workflow:**
1. Order spans multiple zones
2. Pick batch created with zone tasks
3. Picker A: picks zone A
4. Picker B: picks zone B
5. Picker C: picks zone C
6. Items consolidated at packing station
7. Packer verifies complete order
8. Package created

**Test Cases:**
- Verify zone tasks created
- Verify each zone picked correctly
- Verify items consolidated
- Verify order completeness verified

### 16.6 Batch Picking Across Orders

**Workflow:**
1. Multiple orders pending
2. System batches similar orders
3. Picker receives single optimized batch
4. Follows path across zones
5. Picks all items for all orders
6. Items sorted by order at packing
7. Each order packed separately

**Test Cases:**
- Verify batch optimization
- Verify efficiency improved
- Verify no order accuracy loss
- Verify correct order shipment

### 16.7 Cross-Docking

**Workflow:**
1. Inbound item scanned at receiving
2. System checks if allocated to waiting order
3. Item flagged for cross-docking
4. Item moved to packing station
5. No put-away task created
6. Item packed and shipped immediately

**Test Cases:**
- Verify cross-dock detection
- Verify no storage intermediate step
- Verify correct order picked from cross-dock
- Verify faster fulfillment time

---

## 17. Performance & Error Handling Tests

### 17.1 Performance Tests

#### Bulk Operations
- **Create 1000+ inventory records in batch**
  - Expected: Completes within SLA

- **Query inventory with 100k+ records**
  - Expected: Response within SLA

- **Pagination with large dataset**
  - Expected: Consistent performance

#### Concurrency
- **Multiple operators picking simultaneously**
  - Expected: Stock correctly allocated, no double-picks

- **Simultaneous inventory updates**
  - Expected: Data consistency maintained

- **Concurrent replenishment tasks**
  - Expected: No race conditions

#### Query Performance
- **Hierarchical location queries (deep tree)**
  - Expected: Performance acceptable

- **Complex filtering queries**
  - Expected: Indexes used effectively

- **Analytics aggregation queries**
  - Expected: Execution time acceptable

### 17.2 Error Handling Tests

#### Inventory Conflicts
- **Pick exceeding available stock**
  - Expected: Error or allocation prevention

- **Concurrent allocation exceeding available**
  - Expected: One succeeds, other fails

- **Negative quantity prevention**
  - Expected: Never negative

#### Validation Errors
- **Invalid task assignments**
  - Expected: Validation error

- **Invalid location hierarchies**
  - Expected: Validation error

- **Invalid status transitions**
  - Expected: Business rule error

#### Constraint Violations
- **Circular parent references**
  - Expected: Validation error

- **Duplicate unique values**
  - Expected: Duplicate check error

- **Required field missing**
  - Expected: Validation error

#### Business Rule Violations
- **Pick deactivated products**
  - Expected: Error or warning

- **Receive to closed warehouse**
  - Expected: Error

- **Pack items from different orders**
  - Expected: Error

- **Create threshold > bin capacity**
  - Expected: Validation error

#### Data Inconsistency Recovery
- **Failed task completion handling**
  - Expected: Graceful recovery

- **Partial put-away scenarios**
  - Expected: Consistent state

- **Inventory recount after discrepancy**
  - Expected: Corrected state

### 17.3 Edge Cases

#### Fractional Quantities
- **Products with decimal units**
  - Input: Fabric (meters), liquids (liters)
  - Expected: Decimal quantities handled

- **Partial case picking**
  - Expected: Fractional quantities supported

- **Quantity rounding**
  - Expected: Rounding rules applied consistently

#### Oversized Items
- **Items larger than bin**
  - Expected: Flagged or special handling

- **Items requiring special handling**
  - Expected: Restrictions enforced

- **Cross-dock-only items**
  - Expected: Never stored in regular bins

#### High-Velocity Products
- **Dedicated picking zones**
  - Expected: Routing applied

- **Peak demand scenarios**
  - Expected: Replenishment keeps up

- **Batch picking optimization**
  - Expected: Prioritizes fast-movers

#### Aged Inventory
- **FIFO/FEFO picking enforcement**
  - Expected: Oldest picked first

- **Expired batch handling**
  - Expected: Prevented from picking

- **Slow-moving stock alerts**
  - Expected: Alerts generated

### 17.4 Real-Time & Async Tests

#### Task Notifications
- **Operator receives task real-time**
  - Expected: Notification sent immediately

- **Task update propagation**
  - Expected: Updates visible immediately

- **Completion notification**
  - Expected: Supervisor notified

#### Automation
- **Threshold breach triggers task**
  - Expected: Task created immediately

- **Replenishment creation delay**
  - Expected: Minimal latency

#### Synchronization
- **Inventory syncs with IMS**
  - Expected: Changes reflected in IMS

- **Order status updates to IMS**
  - Expected: IMS notified of fulfillment

- **Shipment status syncs with TMS**
  - Expected: TMS receives updates

#### Analytics Updates
- **Performance metrics post-task**
  - Expected: Metrics updated immediately

- **Dashboard reflects current state**
  - Expected: Real-time visibility

- **Reports based on latest data**
  - Expected: No stale data

---
