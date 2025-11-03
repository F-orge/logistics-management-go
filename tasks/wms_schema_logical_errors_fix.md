# WMS Schema Logical Errors Fix - Comprehensive Plan

**Date Created:** 2025-11-03  
**Reference Document:** `@docs/tests/wms.md`  
**Target Files:** `packages/graphql/src/schema/wms/<entity>/resolvers/`  
**Error Handling Strategy:** Use `GraphQLError` for all error scenarios

---

## Overview

Fix logical errors across 26 WMS entities (Warehouses, Locations, Products, Inventory Stock, Inbound Shipments, Sales Orders, Pick Batches, Packages, Outbound Shipments, Inventory Adjustments, Returns, Bin Thresholds, Put-Away Rules, and supporting entities) in their Mutations and Queries. All errors will use `GraphQLError` for proper error handling and user feedback.

---

## Implementation Checklist

### Phase 1: Core Infrastructure & Critical Validations

- [ ] **1.1 Warehouses Module - WmsMutation.ts**
  - [ ] Add warehouse code uniqueness validation
  - [ ] Add name/code required field validation
  - [ ] Add negative capacity validation
  - [ ] Add warehouse existence check in delete

- [ ] **1.2 Warehouses Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict (clearLimit/clearOffset bug)
  - [ ] Add warehouse status filter
  - [ ] Add capacity range filter
  - [ ] Add search by name/code
  - [ ] Add warehouse analytics query (total capacity, utilization)

- [ ] **1.3 Locations Module - WmsMutation.ts**
  - [ ] Add location type enum validation
  - [ ] Add parent-child hierarchy validation (non-zone requires parent)
  - [ ] Add circular reference detection
  - [ ] Add location capacity validation
  - [ ] Add warehouse_id existence check
  - [ ] Add validation: cannot move location with inventory to different parent
  - [ ] Add validation: cannot delete location with inventory
  - [ ] Add validation: cannot delete location with active tasks

- [ ] **1.4 Locations Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse_id filter
  - [ ] Add location type filter
  - [ ] Add status filter (Available, Unavailable, Maintenance)
  - [ ] Add search by code/name
  - [ ] Add location hierarchy path query (get full parent chain)
  - [ ] Add available locations query (status=Available AND available_capacity > 0)
  - [ ] Add location tree query (hierarchical structure)

- [ ] **1.5 Products Module - WmsMutation.ts**
  - [ ] Add product SKU uniqueness validation
  - [ ] Add name/category required field validation
  - [ ] Add UOM validation against allowed values
  - [ ] Add validation: cannot change SKU if product has inventory
  - [ ] Add validation: cannot delete product with inventory

- [ ] **1.6 Products Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add category filter
  - [ ] Add status filter (active/inactive)
  - [ ] Add search by SKU/name
  - [ ] Add batch_tracked filter
  - [ ] Add expiration_tracked filter
  - [ ] Add product analytics query (count by category, active vs inactive)

### Phase 2: Inventory Management & Stock Operations

- [ ] **2.1 Inventory Stock Module - WmsMutation.ts**
  - [ ] Add location existence validation
  - [ ] Add product existence validation
  - [ ] Add negative quantity prevention
  - [ ] Add status enum validation
  - [ ] Add quantity allocation validation (cannot allocate exceeding available)
  - [ ] Add validation: cannot decrease below zero
  - [ ] Add status transition validation (on_hand → allocated → on_hand)

- [ ] **2.2 Inventory Stock Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add location filter
  - [ ] Add product filter
  - [ ] Add status filter
  - [ ] Add search by product code
  - [ ] Add low-stock items query (quantity < minimum_threshold)
  - [ ] Add overstock query (quantity > location_capacity)
  - [ ] Add inventory analytics queries:
    - [ ] Total inventory by product
    - [ ] Total inventory by location
    - [ ] Total inventory value (quantity × unit_cost)
    - [ ] FIFO query (oldest stock first by batch)
    - [ ] Inventory turnover rate

- [ ] **2.3 Inventory Batch Module - WmsMutation.ts**
  - [ ] Add inventory_stock existence validation
  - [ ] Add lot_number uniqueness validation (per product)
  - [ ] Add quality_status enum validation
  - [ ] Add validation: production_date < expiration_date
  - [ ] Add cost_per_unit validation (non-negative)

- [ ] **2.4 Inventory Batch Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add product filter
  - [ ] Add search by lot_number
  - [ ] Add expiring soon query (expiration_date <= today + 30 days)
  - [ ] Add quarantined batches query (quality_status = "QUARANTINE")
  - [ ] Add batch analytics queries:
    - [ ] Aging report (expiration timeline)
    - [ ] Inventory value by batch
    - [ ] Batch turnover analysis (FIFO/FEFO)

- [ ] **2.5 Inventory Adjustment Module - WmsMutation.ts**
  - [ ] Add location existence validation
  - [ ] Add product existence validation
  - [ ] Add reason enum validation
  - [ ] Add status workflow: pending → reviewed → approved/rejected
  - [ ] Add validation: cannot update approved adjustments (reverse instead)
  - [ ] Add validation: cannot delete approved adjustments

- [ ] **2.6 Inventory Adjustment Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add location filter
  - [ ] Add reason filter
  - [ ] Add search by location
  - [ ] Add unapproved adjustments query
  - [ ] Add adjustment analytics queries:
    - [ ] Total variance by location
    - [ ] Inventory accuracy rate
    - [ ] Variance breakdown by reason

### Phase 3: Inbound Operations & Receiving

- [ ] **3.1 Inbound Shipments Module - WmsMutation.ts (Enhancement)**
  - [ ] Add supplier existence validation
  - [ ] Add warehouse existence validation
  - [ ] Add validation: at least one line item required
  - [ ] Add validation: all quantities positive
  - [ ] Add status transition validation:
    - [ ] PENDING → ARRIVED → PROCESSING → COMPLETED
    - [ ] Any → CANCELLED
  - [ ] Add auto-generation: when status=PROCESSING, generate put-away tasks
  - [ ] Add auto-generation: when status=COMPLETED, update inventory

- [ ] **3.2 Inbound Shipments Module - WmsQuery.ts (Enhancement)**
  - [ ] Fix pagination/filter conflict (if exists)
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add supplier filter
  - [ ] Add date range filter (without clearing pagination)
  - [ ] Add search by ASN number
  - [ ] Add pending reception query
  - [ ] Add inbound analytics queries:
    - [ ] Shipment count by status
    - [ ] Average receipt time

- [ ] **3.3 Inbound Shipment Items Module - WmsMutation.ts**
  - [ ] Add inbound_shipment existence validation
  - [ ] Add product existence validation
  - [ ] Add validation: positive quantities
  - [ ] Add validation: received_qty <= expected_qty
  - [ ] Add quantity update logic with inventory sync

- [ ] **3.4 Inbound Shipment Items Module - WmsQuery.ts**
  - [ ] Add shipment filter
  - [ ] Add product filter
  - [ ] Add status filter
  - [ ] Add search by ASN/product code

### Phase 4: Outbound Operations & Fulfillment

- [ ] **4.1 Sales Orders Module - WmsMutation.ts**
  - [ ] Add warehouse existence validation
  - [ ] Add validation: at least one line item required
  - [ ] Add validation: all quantities positive
  - [ ] Add status transition validation:
    - [ ] PENDING → PROCESSING → SHIPPED → COMPLETED
    - [ ] Any → CANCELLED (but not after SHIPPED)
  - [ ] Add auto-generation: when status=PROCESSING, create pick batch
  - [ ] Add auto-generation: allocate inventory on processing

- [ ] **4.2 Sales Orders Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add date range filter (without clearing pagination)
  - [ ] Add search by order number
  - [ ] Add customer filter
  - [ ] Add pending fulfillment query
  - [ ] Add order analytics queries:
    - [ ] Orders fulfilled per day
    - [ ] Average fulfillment time
    - [ ] Order accuracy rate

- [ ] **4.3 Sales Order Items Module - WmsMutation.ts**
  - [ ] Add sales_order existence validation
  - [ ] Add product existence validation
  - [ ] Add validation: positive quantities
  - [ ] Add validation: allocated_qty <= ordered_qty

- [ ] **4.4 Sales Order Items Module - WmsQuery.ts**
  - [ ] Add order filter
  - [ ] Add product filter
  - [ ] Add search by product code

- [ ] **4.5 Pick Batches Module - WmsMutation.ts**
  - [ ] Add validation: at least one order required
  - [ ] Add validation: orders must not be already picked
  - [ ] Add status transition validation:
    - [ ] ASSIGNED → IN_PROGRESS → COMPLETED
    - [ ] Any → CANCELLED
  - [ ] Add validation: cannot add item to in-progress batch
  - [ ] Add validation: cannot update completed batch
  - [ ] Add validation: cannot cancel completed batch

- [ ] **4.6 Pick Batches Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add picker filter
  - [ ] Add zone filter
  - [ ] Add pending batches query
  - [ ] Add batch analytics queries:
    - [ ] Picks per hour by picker
    - [ ] Average batch size

- [ ] **4.7 Pick Batch Items Module - WmsMutation.ts**
  - [ ] Add pick_batch existence validation
  - [ ] Add sales_order_item existence validation
  - [ ] Add inventory stock existence validation

- [ ] **4.8 Pick Batch Items Module - WmsQuery.ts**
  - [ ] Add batch filter
  - [ ] Add order filter

### Phase 5: Packing & Shipping Operations

- [ ] **5.1 Packages Module - WmsMutation.ts**
  - [ ] Add validation: at least one item required
  - [ ] Add validation: all items from same order
  - [ ] Add status transition validation:
    - [ ] PACKING → PACKED → SHIPPED
  - [ ] Add validation: cannot update shipped package
  - [ ] Add validation: cannot delete packed/shipped package

- [ ] **5.2 Packages Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add order filter
  - [ ] Add search by tracking number
  - [ ] Add package analytics queries:
    - [ ] Average package weight
    - [ ] Packing accuracy

- [ ] **5.3 Package Items Module - WmsMutation.ts**
  - [ ] Add package existence validation
  - [ ] Add pick_batch_item existence validation

- [ ] **5.4 Package Items Module - WmsQuery.ts**
  - [ ] Add package filter
  - [ ] Add pick_batch_item filter

- [ ] **5.5 Outbound Shipments Module - WmsMutation.ts**
  - [ ] Add validation: at least one package required
  - [ ] Add validation: packages must be PACKED status
  - [ ] Add carrier existence validation
  - [ ] Add warehouse existence validation
  - [ ] Add status transition validation:
    - [ ] READY_FOR_PICKUP → PICKED_UP → IN_TRANSIT → DELIVERED
    - [ ] Any → CANCELLED (but not after IN_TRANSIT)
  - [ ] Add validation: cannot update delivered shipment
  - [ ] Add validation: cannot delete picked_up/in_transit shipments

- [ ] **5.6 Outbound Shipments Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add carrier filter
  - [ ] Add date range filter
  - [ ] Add search by tracking number
  - [ ] Add ready shipments query
  - [ ] Add shipment analytics queries:
    - [ ] Shipments per day
    - [ ] Average delivery time

- [ ] **5.7 Outbound Shipment Items Module - WmsMutation.ts**
  - [ ] Add outbound_shipment existence validation
  - [ ] Add package existence validation

- [ ] **5.8 Outbound Shipment Items Module - WmsQuery.ts**
  - [ ] Add shipment filter
  - [ ] Add package filter

### Phase 6: Return Management

- [ ] **6.1 Returns Module - WmsMutation.ts**
  - [ ] Add warehouse existence validation
  - [ ] Add RMA number existence/validation
  - [ ] Add validation: at least one return item
  - [ ] Add status transition validation:
    - [ ] REQUESTED → APPROVED → RECEIVED → INSPECTING → PROCESSED
    - [ ] Any state → REJECTED
  - [ ] Add auto-generation: when status=PROCESSED, create put-away tasks for resellable items
  - [ ] Add auto-generation: move damaged items to quarantine location

- [ ] **6.2 Returns Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add date range filter
  - [ ] Add search by RMA number
  - [ ] Add order filter
  - [ ] Add pending returns query
  - [ ] Add return analytics queries:
    - [ ] Returns by disposition
    - [ ] Return rate by product
    - [ ] Average return processing time

- [ ] **6.3 Return Items Module - WmsMutation.ts**
  - [ ] Add return existence validation
  - [ ] Add product existence validation
  - [ ] Add condition enum validation
  - [ ] Add disposition validation (resellable, refurbish, damaged, write_off)
  - [ ] Add auto-stock-update: when disposition assigned

- [ ] **6.4 Return Items Module - WmsQuery.ts**
  - [ ] Add return filter
  - [ ] Add product filter
  - [ ] Add condition filter
  - [ ] Add disposition filter

### Phase 7: Configuration & Rules

- [ ] **7.1 Bin Thresholds Module - WmsMutation.ts (Enhancement)**
  - [ ] Add location existence validation (must be bin type)
  - [ ] Add product existence validation
  - [ ] Add source_location existence validation
  - [ ] Add validation: source_location != destination (circular ref)
  - [ ] Add validation: minimum_qty/reorder_qty positive
  - [ ] Add validation: cannot create if threshold > bin capacity
  - [ ] Add validation: cannot delete threshold with pending replenishment

- [ ] **7.2 Bin Thresholds Module - WmsQuery.ts (Enhancement)**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add location filter
  - [ ] Add product filter
  - [ ] Add search by product
  - [ ] Add triggered thresholds query (current_qty < minimum_qty)

- [ ] **7.3 Put-Away Rules Module - WmsMutation.ts**
  - [ ] Add target location existence validation
  - [ ] Add validation: target_location must allow put-away
  - [ ] Add priority uniqueness validation (no conflicts)
  - [ ] Add condition validation (if complex rules)
  - [ ] Add validation: cannot delete rule with active tasks

- [ ] **7.4 Put-Away Rules Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add priority filter
  - [ ] Add search by product
  - [ ] Add client filter
  - [ ] Add applicable rules query (for product matching)

- [ ] **7.5 Reorder Points Module - WmsMutation.ts**
  - [ ] Add product existence validation
  - [ ] Add warehouse existence validation
  - [ ] Add validation: reorder_qty >= minimum_qty
  - [ ] Add validation: all quantities positive

- [ ] **7.6 Reorder Points Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add product filter

- [ ] **7.7 Stock Transfers Module - WmsMutation.ts**
  - [ ] Add source location existence validation
  - [ ] Add destination location existence validation
  - [ ] Add product existence validation
  - [ ] Add status transition validation:
    - [ ] PENDING → IN_TRANSIT → RECEIVED
    - [ ] Any → CANCELLED
  - [ ] Add validation: source location has sufficient quantity
  - [ ] Add auto-update: decrease source inventory on IN_TRANSIT
  - [ ] Add auto-update: increase destination inventory on RECEIVED

- [ ] **7.8 Stock Transfers Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add status filter
  - [ ] Add source location filter
  - [ ] Add destination location filter

### Phase 8: Tasks & Operations

- [ ] **8.1 Tasks Module - WmsMutation.ts**
  - [ ] Add operator existence validation
  - [ ] Add location existence validation (for put-away)
  - [ ] Add product existence validation
  - [ ] Add validation: positive quantities
  - [ ] Add status transition validation:
    - [ ] ASSIGNED → IN_PROGRESS → COMPLETED
    - [ ] Any → CANCELLED
  - [ ] Add validation: cannot reassign in-progress task
  - [ ] Add validation: cannot update completed task
  - [ ] Add auto-update: deallocate inventory on CANCELLED

- [ ] **8.2 Tasks Module - WmsQuery.ts**
  - [ ] Fix pagination/filter conflict
  - [ ] Add warehouse filter
  - [ ] Add operator filter
  - [ ] Add status filter
  - [ ] Add type filter (put_away, pick, replenish, return)
  - [ ] Add location filter
  - [ ] Add priority filter
  - [ ] Add pending tasks query
  - [ ] Add overdue tasks query
  - [ ] Add task analytics queries:
    - [ ] Tasks completed per operator
    - [ ] Average task completion time
    - [ ] Task accuracy rate
    - [ ] Picks per hour
    - [ ] Put-aways per hour

- [ ] **8.3 Task Items Module - WmsMutation.ts (Enhancement)**
  - [ ] Add task existence validation
  - [ ] Add status transition validation
  - [ ] Add auto-update: inventory changes on status change

- [ ] **8.4 Task Items Module - WmsQuery.ts (Enhancement)**
  - [ ] Add task filter
  - [ ] Add status filter

### Phase 9: Supporting Entities

- [ ] **9.1 Suppliers Module - WmsQuery.ts & WmsMutation.ts**
  - [ ] ✅ Already properly implemented - no changes needed

- [ ] **9.2 Reorder Points - Already implemented**
  - [ ] ✅ Basic validations complete - enhance if needed

### Phase 10: Integration Testing & Validation

- [ ] Run complete test suite against `@docs/tests/wms.md`
- [ ] Verify all CRUD operations
- [ ] Verify status transitions
- [ ] Verify pagination fixes
- [ ] Verify error handling with GraphQLError
- [ ] Verify business logic validations
- [ ] Verify cascading operations

---

## Detailed Issues & Fixes

### 1. VALIDATION & REQUIRED FIELDS

**Affected Entities:** All 26 WMS entities

- **Issue:** Missing required field validation
  - **Location:** All *Mutation.ts files
  - **Problem:** Zod schema parsing not comprehensive; missing business rule validations
  - **Fix:** Add explicit checks before database operations for required foreign keys, uniqueness constraints, and business rules
  - **Impact:** Prevents invalid data from entering database

- **Issue:** Duplicate code/SKU validation missing
  - **Location:** Warehouses, Products, Locations, Batches
  - **Problem:** No uniqueness checks implemented
  - **Fix:** Query database to verify unique field doesn't exist before insert
  - **Impact:** Ensures data integrity for critical identifiers

- **Issue:** Circular reference detection missing
  - **Location:** Locations (parent-child), Bin Thresholds (source-destination)
  - **Problem:** No validation that source ≠ destination or parent ≠ self
  - **Fix:** Add validation logic in mutations
  - **Impact:** Prevents infinite loops and invalid hierarchies

### 2. STATUS TRANSITION ERRORS

**Affected Entities:** Inbound Shipments, Sales Orders, Pick Batches, Packages, Outbound Shipments, Returns, Tasks, Stock Transfers

- **Issue:** No valid state transition validation
  - **Location:** All update mutations
  - **Problem:** Any status can be changed to any other status
  - **Fix:** Define valid transitions and validate before update
  - **Impact:** Enforces business process workflows

- **Issue:** Cannot prevent updates after completion
  - **Location:** Update mutations
  - **Problem:** Completed records can still be modified
  - **Fix:** Add status check that throws error if entity is "locked"
  - **Impact:** Ensures data immutability for finalized records

### 3. INVENTORY CONSTRAINTS

**Affected Entities:** Inventory Stock, Sales Orders, Pick Batches, Tasks, Stock Transfers

- **Issue:** Negative quantity prevention missing
  - **Location:** Stock update/decrease operations
  - **Problem:** No check that quantity >= 0
  - **Fix:** Validate quantity before update
  - **Impact:** Prevents negative inventory

- **Issue:** Allocation exceeding available stock
  - **Location:** Pick batch creation, task allocation
  - **Problem:** No check that allocated <= available
  - **Fix:** Query current availability before allocation
  - **Impact:** Prevents overselling

- **Issue:** Cannot move locations with inventory
  - **Location:** Location update mutation
  - **Problem:** No validation that location is empty before moving
  - **Fix:** Check if inventory exists before allowing parent change
  - **Impact:** Maintains inventory location integrity

### 4. HIERARCHICAL & RELATIONSHIP CONSTRAINTS

**Affected Entities:** Locations, Inventory Batches, Put-Away Rules

- **Issue:** Parent-child validation missing
  - **Location:** Location creation
  - **Problem:** Non-zone locations can be created without parent
  - **Fix:** Check location type and require parent if not zone
  - **Impact:** Enforces warehouse structure

- **Issue:** Cascade delete not implemented
  - **Location:** Location, Put-Away Rule deletes
  - **Problem:** Deleting parent should handle children appropriately
  - **Fix:** Check for child records; either cascade or error
  - **Impact:** Maintains referential integrity

### 5. QUERY FILTERING & PAGINATION ISSUES

**Affected Entities:** All query resolvers

- **Issue:** Pagination cleared when filters applied
  - **Location:** All *Query.ts files (e.g., line 17 in bin_thresholds)
  - **Problem:** `query.clearLimit().clearOffset()` removes pagination
  - **Fix:** Never use clearLimit/clearOffset with other filters
  - **Impact:** Allows paginated results with filters

- **Issue:** Missing search/filter parameters
  - **Location:** All *Query.ts files
  - **Problem:** Test cases require filters not implemented
  - **Fix:** Add filter conditions based on test case requirements
  - **Impact:** Enables comprehensive querying

### 6. MISSING QUERY OPERATIONS

**Affected Entities:** All 26 entities

- **Issue:** No analytics queries
  - **Location:** All *Query.ts files
  - **Problem:** Test cases require aggregation queries
  - **Fix:** Implement analytics queries with proper aggregations (SUM, COUNT, AVG)
  - **Impact:** Enables reporting and dashboards

- **Issue:** No search queries
  - **Location:** All *Query.ts files
  - **Problem:** Test cases require flexible search
  - **Fix:** Add ilike search on text fields
  - **Impact:** Better UX for finding records

### 7. DELETE/REMOVE LOGIC ERRORS

**Affected Entities:** All entities with delete operations

- **Issue:** No constraint checking before delete
  - **Location:** All removeMutation methods
  - **Problem:** Deletes cascade without validation
  - **Fix:** Check for dependent records; throw error or cascade appropriately
  - **Impact:** Prevents orphaned references

- **Issue:** Physical delete instead of logical delete
  - **Location:** All delete operations
  - **Problem:** Some records (adjustments, batches) shouldn't be physically deleted
  - **Fix:** Use logical delete (status = archived) or implement soft delete
  - **Impact:** Maintains audit trail

### 8. BUSINESS LOGIC IN MUTATIONS

**Affected Entities:** Inbound Shipments, Sales Orders, Returns, Tasks, Stock Transfers

- **Issue:** No auto-task generation
  - **Location:** Status update mutations
  - **Problem:** When shipment received, no put-away tasks created
  - **Fix:** On PROCESSING status, generate tasks per item + location
  - **Impact:** Automates fulfillment workflow

- **Issue:** No inventory updates on status changes
  - **Location:** Status change mutations
  - **Problem:** Inventory not synced with shipment/transfer status
  - **Fix:** Create inventory records on completion, deallocate on cancel
  - **Impact:** Keeps inventory accurate

- **Issue:** No auto-replenishment task creation
  - **Location:** Stock decrease operations
  - **Problem:** When stock falls below threshold, no replenishment task
  - **Fix:** Check thresholds after decrease, create tasks if needed
  - **Impact:** Maintains stock levels

### 9. ENUM HANDLING

**Affected Entities:** All entities with enums

- **Issue:** Inconsistent enum conversion
  - **Location:** Mutation files with status enums
  - **Problem:** Some conversions use `WmsStatusEnum[value]`, inconsistently
  - **Fix:** Standardize enum conversion pattern across all mutations
  - **Impact:** Ensures type safety

### 10. DUPLICATE KEY VALIDATIONS

**Affected Entities:** Products, Warehouses, Locations, Inventory Batches

- **Issue:** Missing duplicate checks
  - **Location:** Create mutations
  - **Problem:** SKU, warehouse code, location code, lot_number can be duplicated
  - **Fix:** Query DB for existing record before insert
  - **Impact:** Ensures unique identifiers

---

## Cross-Cutting Error Handling Pattern

All modules should follow this pattern:

```typescript
import { GraphQLError } from "graphql";

// Validation errors
throw new GraphQLError("Descriptive error message", {
  extensions: {
    code: "VALIDATION_ERROR"
  }
});

// Not found errors
throw new GraphQLError("Entity not found", {
  extensions: {
    code: "NOT_FOUND"
  }
});

// Business logic errors
throw new GraphQLError("Cannot perform operation", {
  extensions: {
    code: "BUSINESS_LOGIC_ERROR"
  }
});

// Database errors
throw new GraphQLError("Database operation failed", {
  extensions: {
    code: "DATABASE_ERROR"
  }
});

// Duplicate key error
throw new GraphQLError("Record with this identifier already exists", {
  extensions: {
    code: "DUPLICATE_KEY"
  }
});

// Status transition error
throw new GraphQLError("Cannot transition from X to Y status", {
  extensions: {
    code: "INVALID_STATUS_TRANSITION"
  }
});
```

---

## Pagination Fix Pattern

All queries should follow this pattern:

```typescript
// WRONG - Clears pagination when filters applied
if (args.from && args.to) {
  query = query.clearLimit().clearOffset()...
}

// CORRECT - Combines all filters
let query = ctx.db.selectFrom("table").selectAll();

if (args.page && args.perPage) {
  const offset = (args.page - 1) * args.perPage;
  query = query.offset(offset).limit(args.perPage);
}

if (args.from && args.to) {
  query = query
    .where("createdAt", ">=", args.from)
    .where("createdAt", "<=", args.to);
  // Pagination stays intact!
}

// Apply other filters
if (args.status) {
  query = query.where("status", "=", args.status);
}

if (args.search) {
  query = query.where((eb) =>
    eb.or([
      eb("name", "ilike", `%${args.search}%`),
      eb("code", "ilike", `%${args.search}%`),
    ]),
  );
}

return query.execute();
```

---

## Input Schema Usage Pattern

All mutations should use correct schemas:

```typescript
// For CREATE mutations
const payload = Create[Entity]InputSchema().parse(args.value);

// For UPDATE mutations (NOT Create!)
const payload = Update[Entity]InputSchema().parse(args.value);
```

---

## Sorting Implementation Pattern

Add sorting support to queries:

```typescript
// Add to query parameters and schema first
if (args.sortBy && args.sortDirection) {
  if (args.sortBy === "NAME") {
    query = query.orderBy("name", args.sortDirection === "DESC" ? "desc" : "asc");
  } else if (args.sortBy === "CODE") {
    query = query.orderBy("code", args.sortDirection === "DESC" ? "desc" : "asc");
  } else if (args.sortBy === "CREATED_AT") {
    query = query.orderBy("createdAt", args.sortDirection === "DESC" ? "desc" : "asc");
  }
}
```

---

## Foreign Key Validation Pattern

Validate related entities before linking:

```typescript
// Check if related entity exists
const relatedEntity = await ctx.db
  .selectFrom("[schema].[table]")
  .select("id")
  .where("id", "=", payload.[field_name])
  .executeTakeFirst();

if (!relatedEntity) {
  throw new GraphQLError("[Entity] not found", {
    extensions: { code: "NOT_FOUND" }
  });
}
```

---

## Duplicate Key Validation Pattern

Check for unique constraints:

```typescript
// Check for duplicate
const existing = await ctx.db
  .selectFrom("[schema].[table]")
  .select("id")
  .where("sku", "=", payload.sku)
  .executeTakeFirst();

if (existing) {
  throw new GraphQLError("Product with this SKU already exists", {
    extensions: { code: "DUPLICATE_KEY" }
  });
}
```

---

## Status Transition Validation Pattern

Enforce valid state transitions:

```typescript
// Define valid transitions
const validTransitions = {
  PENDING: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: []
};

// Get current status
const currentEntity = await ctx.db
  .selectFrom("[table]")
  .selectAll()
  .where("id", "=", args.id)
  .executeTakeFirstOrThrow();

// Validate transition
if (!validTransitions[currentEntity.status]?.includes(payload.status)) {
  throw new GraphQLError(
    `Cannot transition from ${currentEntity.status} to ${payload.status}`,
    { extensions: { code: "INVALID_STATUS_TRANSITION" } }
  );
}
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total WMS Entities | 26 |
| Mutation Resolvers to Fix | 26 |
| Query Resolvers to Fix | 26 |
| New Analytics Queries | 30+ |
| New Filter Parameters | 50+ |
| GraphQLError imports to add | 26 |
| Pagination bugs to fix | 20+ |
| FK validations to add | 40+ |
| Status transition validations | 12 |
| Circular reference checks | 5 |
| Duplicate key checks | 5 |

---

## Testing Strategy

Once all fixes are implemented, verify against `@docs/tests/wms.md`:

- [ ] Create operations with required/optional fields
- [ ] Update operations with correct input schemas
- [ ] Delete operations with error handling
- [ ] Query operations with pagination support
- [ ] Search operations with multiple filters
- [ ] Analytics queries with aggregations
- [ ] Error handling with GraphQLError
- [ ] Foreign key validations
- [ ] Business logic validations
- [ ] Status transition validations
- [ ] Circular reference detection
- [ ] Inventory constraint enforcement
- [ ] Cascade delete behavior
- [ ] Auto-task generation on status changes
- [ ] Inventory updates on shipment status changes

---

## Implementation Order (Recommended)

1. **Phase 1:** Core Infrastructure (Warehouses, Locations, Products, Inventory Stock, Inbound Shipments)
2. **Phase 2:** Inventory Management (Batches, Adjustments, Bin Thresholds)
3. **Phase 3-4:** Outbound Operations (Sales Orders, Pick Batches, Packages, Shipments)
4. **Phase 5-6:** Returns & Configuration (Returns, Put-Away Rules, Stock Transfers)
5. **Phase 7:** Tasks & Operations (Tasks, Task Items)
6. **Phase 8:** Integration Testing - Code review and test case verification

**Estimated Effort:** ~40-60 hours distributed across phases

---

## Notes

- **Test Reference:** All requirements derived from `@docs/tests/wms.md`
- **Error Handling:** All errors must use `GraphQLError` for consistent client response format
- **Database Consistency:** All FK validations must check existence before linking
- **Business Rules:** Implement rules as specified in test cases
- **Analytics:** Implement aggregation queries for reporting requirements
- **Auto-generation:** Implement task/record auto-generation on status changes
- **Inventory:** Maintain strict consistency with status transitions

---

## Progress Tracking

**Last Updated:** 2025-11-03  
**Total Checklist Items:** 98  
**Completed:** 0  
**In Progress:** 0  
**Remaining:** 98  

**Current Phase:** Phase 1 - Core Infrastructure & Critical Validations

### Session 1 Progress:

**Completed:**
- ✅ Analyzed @docs/tests/wms.md for all test cases
- ✅ Reviewed existing implementations (Suppliers, Bin Thresholds, Inbound Shipments)
- ✅ Identified all logical error patterns
- ✅ Created comprehensive plan document

**In Progress:**
- 🔄 Planning phase - awaiting user approval to begin implementation

**Blocked:**
- None

**Next Steps:**
1. User reviews and approves this plan
2. Begin Phase 1 implementation with Warehouses module
3. Implement validation checks and error handling
4. Fix pagination bugs across all query resolvers
5. Move to Phase 2 after Phase 1 completion

---
