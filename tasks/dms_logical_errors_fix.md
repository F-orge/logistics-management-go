# DMS Schema Logical Errors Fix - Comprehensive Plan

**Date Created:** 2025-11-03  
**Reference Document:** `@docs/tests/dms.md`  
**Target Files:** `packages/graphql/src/schema/dms/<entity>/resolvers/`  
**Error Handling Strategy:** Use `GraphQLError` for all error scenarios

---

## Overview

Fix logical errors across 6 DMS entities (Delivery Routes, Delivery Tasks, Proof of Deliveries, Task Events, Driver Locations, Customer Tracking Links) in their Mutations and Queries. All errors will use `GraphQLError` for proper error handling and user feedback.

---

## Implementation Checklist

### Phase 1: Query Improvements & Filtering

- [ ] **1.1 Delivery Routes - DmsQuery.ts**
  - [ ] Add filter by driver_id
  - [ ] Add filter by warehouse_id
  - [ ] Add sorting capability (date, status)
  - [ ] Improve search filter (expand beyond optimizedRouteData)
  - [ ] Fix pagination + date range bug (don't clearLimit/clearOffset when filtering by date)
  - [ ] Add proper null safety / not found handling for single route query

- [ ] **1.2 Delivery Tasks - DmsQuery.ts**
  - [ ] Add filter by route_id
  - [ ] Add filter by driver_id
  - [ ] Add filter by date
  - [ ] Fix pagination + date range bug
  - [ ] Improve search to include package information
  - [ ] Add proper null safety / not found handling

- [ ] **1.3 Proof of Deliveries - DmsQuery.ts**
  - [ ] Add filter by task_id
  - [ ] Add filter by driver_id
  - [ ] Add filter by date
  - [ ] Expand search to include all searchable fields
  - [ ] Add filter by type status (has_photo, has_signature)
  - [ ] Add proper null safety / not found handling

- [ ] **1.4 Task Events - DmsQuery.ts**
  - [ ] Add filter by delivery_task_id
  - [ ] Add filter by driver_id
  - [ ] Add filter by date
  - [ ] Add ordering by timestamp (chronological)
  - [ ] Improve search filters
  - [ ] Add proper null safety / not found handling

- [ ] **1.5 Driver Locations - DmsQuery.ts**
  - [ ] Add filter by driver_id
  - [ ] Add filter by date
  - [ ] Add ordering by timestamp (newest first or configurable)
  - [ ] Add support for "latest location only" query
  - [ ] Add geospatial queries (radius search, bounding box)
  - [ ] Add proper null safety / not found handling

- [ ] **1.6 Customer Tracking Links - DmsQuery.ts**
  - [ ] Add filter by task_id
  - [ ] Add filter by date
  - [ ] Add filter by status (active, expired, used)
  - [ ] Add filter by isActive
  - [ ] Improve search query
  - [ ] Add proper null safety / not found handling

### Phase 2: Mutation Validations & Business Logic

- [ ] **2.1 Delivery Routes - DmsMutation.ts**
  - [ ] createDeliveryRoute: Add validation for required fields (driver_id, delivery_tasks array)
  - [ ] createDeliveryRoute: Add check for driver availability/active status
  - [ ] createDeliveryRoute: Add validation for duplicate tasks in route
  - [ ] createDeliveryRoute: Initialize optimizedSequence and optimizedRouteData
  - [ ] updateDeliveryRoute: Add status transition validation (no circular transitions)
  - [ ] updateDeliveryRoute: Restrict field modifications based on current status
  - [ ] updateDeliveryRoute: Prevent task add/remove on active routes
  - [ ] removeDeliveryRoute: Add check to prevent deletion of COMPLETED/IN_PROGRESS routes
  - [ ] removeDeliveryRoute: Add proper error handling for data integrity

- [ ] **2.2 Delivery Tasks - DmsMutation.ts**
  - [ ] createDeliveryTask: Add validation - package must exist and be ready
  - [ ] createDeliveryTask: Add validation - delivery address required
  - [ ] createDeliveryTask: Add validation - if delivery window, latestTime > earliestTime
  - [ ] updateDeliveryTask: Add status transition validation (PENDING → ASSIGNED → OUT_FOR_DELIVERY → DELIVERED/FAILED)
  - [ ] updateDeliveryTask: Add check - cannot update address/time window once OUT_FOR_DELIVERY
  - [ ] updateDeliveryTask: Add validation - FAILED status must have failureReason
  - [ ] updateDeliveryTask: Add check - cannot modify delivery_route_id once assigned
  - [ ] updateDeliveryTask: Prevent updates to DELIVERED tasks

- [ ] **2.3 Proof of Deliveries - DmsMutation.ts**
  - [ ] createDmsProofOfDelivery: Add validation - task must exist
  - [ ] createDmsProofOfDelivery: Add validation - task status must be DELIVERED
  - [ ] createDmsProofOfDelivery: Add validation - at least one of (signature, photo) required
  - [ ] createDmsProofOfDelivery: Add duplicate check (prevent multiple PODs for same task)
  - [ ] createDmsProofOfDelivery: Add timestamp initialization

- [ ] **2.4 Task Events - DmsMutation.ts**
  - [ ] createTaskEvent: Add validation - delivery_task must exist
  - [ ] createTaskEvent: Add validation - status must be valid enum value
  - [ ] createTaskEvent: Auto-set timestamp (don't allow override)
  - [ ] deleteTaskEvent: Add validation - cannot delete events if task is completed (audit trail immutability)

- [ ] **2.5 Driver Locations - DmsMutation.ts**
  - [ ] createDriverLocation: Add validation - driver must exist
  - [ ] createDriverLocation: Add validation - coordinates valid (lat/lon ranges)
  - [ ] createDriverLocation: Add validation - timestamp not in future
  - [ ] createDriverLocation: Add accuracy validation (warning if > 100m)
  - [ ] updateDriverLocation: Remove this operation or make it throw error (locations must be immutable)

- [ ] **2.6 Customer Tracking Links - DmsMutation.ts**
  - [ ] createCustomerTrackingLink: Add validation - task must exist
  - [ ] createCustomerTrackingLink: Add validation - task status must be OUT_FOR_DELIVERY
  - [ ] createCustomerTrackingLink: Add validation - customer contact (email/phone) required
  - [ ] createCustomerTrackingLink: Add duplicate check (return existing if already created)
  - [ ] createCustomerTrackingLink: Prevent creation for non-delivery tasks
  - [ ] updateCustomerTrackingLink: Fix expired event logic (should publish when link becomes expired/inactive)
  - [ ] updateCustomerTrackingLink: Restrict updatable fields (expiration, isActive only)
  - [ ] updateCustomerTrackingLink: Add check - cannot update expired links
  - [ ] updateCustomerTrackingLink: Add check - cannot update links for completed tasks
  - [ ] deleteCustomerTrackingLink: Add validation - cannot delete active links per test case

### Phase 3: Cross-Cutting Improvements

- [ ] **3.1 Pagination Bug Fix (All Queries)**
  - [ ] Fix bug where date range filtering clears pagination
  - [ ] Apply both filters when both date range and pagination specified

- [ ] **3.2 Sorting Capabilities (All Queries)**
  - [ ] Add sorting by date
  - [ ] Add sorting by status
  - [ ] Add sorting by creation timestamp

- [ ] **3.3 Ordering for Chronological Data**
  - [ ] Task events: order by timestamp ASC/DESC
  - [ ] Driver locations: order by timestamp DESC (latest first)

- [ ] **3.4 Data Validation (All Mutations)**
  - [ ] Add foreign key validation (tasks → routes, PODs → tasks, etc.)
  - [ ] Add status validation (enum values)
  - [ ] Add required field validation

- [ ] **3.5 Status Transitions (All Entities)**
  - [ ] Document valid transitions per entity
  - [ ] Enforce transitions in mutations

- [ ] **3.6 Event Publishing**
  - [ ] Add event publishing for delete operations where applicable
  - [ ] Ensure event payload includes necessary data

---

## Detailed Issues & Fixes

### 1. DELIVERY ROUTES MODULE

**File:** `packages/graphql/src/schema/dms/delivery_routes/resolvers/`

#### DmsMutation.ts Issues:

- **Missing required field validation in createDeliveryRoute:**
  - **Problem:** No validation for required fields (driver_id, delivery_tasks array)
  - **Fix:** Add schema validation before creating route
  - **Impact:** Invalid routes can be created with incomplete data

- **Missing driver availability check:**
  - **Problem:** No check if driver is available/active
  - **Fix:** Query driver status before route creation
  - **Impact:** Routes assigned to unavailable drivers

- **Missing task deduplication:**
  - **Problem:** No validation for duplicate tasks in the route
  - **Fix:** Check for task ID duplicates in delivery_tasks array
  - **Impact:** Same task can be added multiple times to a route

- **Missing route initialization:**
  - **Problem:** No initialization of `optimizedSequence` or `optimizedRouteData`
  - **Fix:** Initialize with empty/default values on creation
  - **Impact:** Route data incomplete on first read

- **Missing status transition validation in updateDeliveryRoute:**
  - **Problem:** No validation for valid status transitions (e.g., COMPLETED can't revert to active)
  - **Fix:** Define valid transitions and validate before update
  - **Impact:** Routes can enter invalid states

- **Missing field modification restrictions:**
  - **Problem:** Can modify any field regardless of route status
  - **Fix:** Restrict field changes based on current status
  - **Impact:** Critical fields (driver_id) can be changed on IN_PROGRESS routes

- **Missing route deletion protection in removeDeliveryRoute:**
  - **Problem:** Can delete COMPLETED or IN_PROGRESS routes
  - **Fix:** Throw error if trying to delete routes with these statuses
  - **Impact:** Loss of audit trail and data integrity issues

#### DmsQuery.ts Issues:

- **Missing driver_id filter:**
  - **Problem:** Cannot query routes for specific driver
  - **Fix:** Add driver_id parameter to query arguments and filter
  - **Impact:** Cannot efficiently list driver's routes

- **Missing warehouse_id filter:**
  - **Problem:** Cannot filter by warehouse
  - **Fix:** Add warehouse_id filter capability
  - **Impact:** Multi-warehouse queries inefficient

- **Insufficient search capability:**
  - **Problem:** Search only looks at optimizedRouteData
  - **Fix:** Expand search to include driver name, status, dates
  - **Impact:** Users can't find routes by relevant criteria

- **Pagination + date range bug:**
  - **Problem:** When date range filters applied, pagination is cleared
  - **Fix:** Apply both filters without clearing pagination settings
  - **Impact:** Cannot paginate through date-filtered results

- **Missing null safety in single route query:**
  - **Problem:** No error handling for non-existent routes
  - **Fix:** Throw GraphQLError with NOT_FOUND code
  - **Impact:** Null reference errors instead of proper error messages

---

### 2. DELIVERY TASKS MODULE

**File:** `packages/graphql/src/schema/dms/delivery_tasks/resolvers/`

#### DmsMutation.ts Issues:

- **Missing package existence validation in createDeliveryTask:**
  - **Problem:** No check if package exists or is in correct status
  - **Fix:** Query package table and validate status before task creation
  - **Impact:** Tasks created for non-existent packages

- **Missing delivery address validation:**
  - **Problem:** No validation that delivery address is provided
  - **Fix:** Add required field validation for delivery address
  - **Impact:** Tasks created without delivery location data

- **Missing delivery window validation:**
  - **Problem:** No check that latestTime > earliestTime if delivery window provided
  - **Fix:** Add time range validation logic
  - **Impact:** Invalid time windows accepted

- **Missing status transition validation in updateDeliveryTask:**
  - **Problem:** Can transition from any status to any status
  - **Fix:** Define and enforce valid transitions (PENDING → ASSIGNED → OUT_FOR_DELIVERY → DELIVERED/FAILED)
  - **Impact:** Tasks can enter invalid states

- **Missing field modification restrictions:**
  - **Problem:** Can update address/time window even when OUT_FOR_DELIVERY
  - **Fix:** Restrict updates to specific fields based on status
  - **Impact:** Can change delivery location while driver is on the way

- **Missing failureReason validation:**
  - **Problem:** No check that FAILED status includes failure reason
  - **Fix:** Require failureReason when status = FAILED
  - **Impact:** Failed deliveries without reason tracking

- **Missing delivery_route_id immutability check:**
  - **Problem:** Can modify route assignment after initial assignment
  - **Fix:** Throw error if trying to change delivery_route_id on assigned task
  - **Impact:** Tasks can be moved between routes unpredictably

- **Missing DELIVERED status protection:**
  - **Problem:** Can modify already delivered tasks
  - **Fix:** Throw error if trying to update DELIVERED tasks
  - **Impact:** Audit trail corruption

#### DmsQuery.ts Issues:

- **Missing route_id filter:**
  - **Problem:** Cannot query tasks for specific route
  - **Fix:** Add route_id parameter to query
  - **Impact:** Cannot efficiently list tasks in a route

- **Missing driver_id filter:**
  - **Problem:** Cannot query tasks for specific driver
  - **Fix:** Add driver_id parameter
  - **Impact:** Cannot find all tasks assigned to a driver

- **Missing date filter:**
  - **Problem:** Cannot filter by delivery date
  - **Fix:** Add date range filtering
  - **Impact:** Cannot find tasks for specific day

- **Missing package information in search:**
  - **Problem:** Search doesn't include package data
  - **Fix:** Expand search to include package names, references
  - **Impact:** Users can't search tasks by package info

- **Pagination bug with date filtering:**
  - **Problem:** Same as delivery routes
  - **Fix:** Apply both filters without clearing pagination
  - **Impact:** Cannot paginate through date-filtered results

---

### 3. PROOF OF DELIVERIES MODULE

**File:** `packages/graphql/src/schema/dms/proof_of_deliveries/resolvers/`

#### DmsMutation.ts Issues:

- **Missing task existence validation in createDmsProofOfDelivery:**
  - **Problem:** No check if task exists
  - **Fix:** Query task before creating POD
  - **Impact:** PODs created for non-existent tasks

- **Missing task status validation:**
  - **Problem:** Can create POD for tasks not in DELIVERED status
  - **Fix:** Validate task status = DELIVERED
  - **Impact:** PODs created for tasks still in delivery

- **Missing proof requirement validation:**
  - **Problem:** Can create POD without signature or photo
  - **Fix:** Require at least one of (signature, photo)
  - **Impact:** Empty PODs with no proof

- **Missing duplicate check:**
  - **Problem:** Can create multiple PODs for same task
  - **Fix:** Query for existing POD, throw error or return existing
  - **Impact:** Multiple conflicting PODs for single delivery

- **Missing timestamp initialization:**
  - **Problem:** Timestamp not automatically set
  - **Fix:** Initialize with current timestamp on creation
  - **Impact:** PODs without proper timestamps

#### DmsQuery.ts Issues:

- **Missing task_id filter:**
  - **Problem:** Cannot query POD for specific task
  - **Fix:** Add task_id parameter
  - **Impact:** Cannot find proof for specific delivery

- **Missing driver_id filter:**
  - **Problem:** Cannot query PODs by driver
  - **Fix:** Add driver_id parameter with join to tasks
  - **Impact:** Cannot retrieve driver's delivered items with proof

- **Missing date filter:**
  - **Problem:** Cannot filter by date
  - **Fix:** Add date range filtering
  - **Impact:** Cannot find PODs for specific period

- **Insufficient search capability:**
  - **Problem:** Search doesn't include recipient, package, or task info
  - **Fix:** Expand search to include all searchable fields
  - **Impact:** Hard to find PODs by relevant criteria

- **Missing status filters:**
  - **Problem:** Cannot filter by has_photo or has_signature
  - **Fix:** Add filters for proof type availability
  - **Impact:** Cannot find PODs with only certain proof types

---

### 4. TASK EVENTS MODULE

**File:** `packages/graphql/src/schema/dms/task_events/resolvers/`

#### DmsMutation.ts Issues:

- **Missing task existence validation in createTaskEvent:**
  - **Problem:** No check if delivery task exists
  - **Fix:** Query delivery_task table before creating event
  - **Impact:** Events created for non-existent tasks

- **Missing status enum validation:**
  - **Problem:** No validation that status is valid enum value
  - **Fix:** Use enum type validation from schema
  - **Impact:** Invalid status values accepted

- **Missing timestamp immutability:**
  - **Problem:** Timestamp can be overridden by caller
  - **Fix:** Auto-set timestamp to current time, ignore input value
  - **Impact:** Events with incorrect timestamps

- **Missing audit trail protection:**
  - **Problem:** Can delete task events
  - **Fix:** Prevent deletion if task is completed (immutable audit trail)
  - **Impact:** Audit trail can be modified

#### DmsQuery.ts Issues:

- **Missing delivery_task_id filter:**
  - **Problem:** Cannot query events for specific task
  - **Fix:** Add delivery_task_id parameter
  - **Impact:** Cannot get event history for task

- **Missing driver_id filter:**
  - **Problem:** Cannot query events by driver
  - **Fix:** Add driver_id parameter with join
  - **Impact:** Cannot find all events for driver

- **Missing date filter:**
  - **Problem:** Cannot filter by date
  - **Fix:** Add date range filtering
  - **Impact:** Cannot find events for specific period

- **Missing chronological ordering:**
  - **Problem:** Events not ordered by timestamp
  - **Fix:** Add orderBy timestamp (configurable ASC/DESC)
  - **Impact:** Event sequence unclear

---

### 5. DRIVER LOCATIONS MODULE

**File:** `packages/graphql/src/schema/dms/driver_locations/resolvers/`

#### DmsMutation.ts Issues:

- **Missing driver existence validation in createDriverLocation:**
  - **Problem:** No check if driver exists
  - **Fix:** Query driver table before creating location
  - **Impact:** Locations created for non-existent drivers

- **Missing coordinate validation:**
  - **Problem:** No validation that lat/lon are in valid ranges
  - **Fix:** Validate lat [-90, 90] and lon [-180, 180]
  - **Impact:** Invalid coordinates accepted

- **Missing timestamp validation:**
  - **Problem:** Can set timestamp to future date
  - **Fix:** Validate timestamp <= current time
  - **Impact:** Future-dated locations

- **Missing accuracy validation:**
  - **Problem:** No warning for poor accuracy
  - **Fix:** Add validation/warning if accuracy > 100m
  - **Impact:** Cannot identify low-quality location data

- **CRITICAL: updateDriverLocation should not exist:**
  - **Problem:** Locations are immutable (audit trail)
  - **Fix:** Remove operation or throw BUSINESS_LOGIC_ERROR
  - **Impact:** Location history can be falsified

#### DmsQuery.ts Issues:

- **Missing driver_id filter:**
  - **Problem:** Cannot query locations for specific driver
  - **Fix:** Add driver_id parameter
  - **Impact:** Cannot get driver's location history

- **Missing date filter:**
  - **Problem:** Cannot filter by date range
  - **Fix:** Add date range filtering
  - **Impact:** Cannot find locations for specific time period

- **Missing timestamp ordering:**
  - **Problem:** No default ordering
  - **Fix:** Add configurable ordering by timestamp (DESC default for "latest first")
  - **Impact:** Unclear which location is most recent

- **Missing "latest location" query:**
  - **Problem:** No efficient way to get driver's current location
  - **Fix:** Add parameter to limit results to latest location
  - **Impact:** Must fetch and filter all locations

- **Missing geospatial queries:**
  - **Problem:** No spatial filtering (radius, bounding box)
  - **Fix:** Add radius search and bounding box queries
  - **Impact:** Cannot find drivers near location or area

---

### 6. CUSTOMER TRACKING LINKS MODULE

**File:** `packages/graphql/src/schema/dms/customer_tracking_links/resolvers/`

#### DmsMutation.ts Issues:

- **Missing task existence validation in createCustomerTrackingLink:**
  - **Problem:** No check if task exists
  - **Fix:** Query task before creating link
  - **Impact:** Tracking links for non-existent tasks

- **Missing task status validation:**
  - **Problem:** Can create link for tasks not in OUT_FOR_DELIVERY
  - **Fix:** Require task status = OUT_FOR_DELIVERY
  - **Impact:** Links created for not-yet-delivered tasks

- **Missing customer contact validation:**
  - **Problem:** No validation that email or phone provided
  - **Fix:** Require at least one of (email, phone)
  - **Impact:** Tracking link recipients not contacted

- **Missing duplicate check:**
  - **Problem:** Can create multiple links for same task
  - **Fix:** Query for existing link, return if found
  - **Impact:** Multiple tracking links for single delivery

- **Missing non-delivery task check:**
  - **Problem:** Can create links for non-delivery tasks
  - **Fix:** Add validation to ensure task is delivery task type
  - **Impact:** Tracking links in wrong context

- **Incorrect expired event logic in updateCustomerTrackingLink:**
  - **Problem:** Event logic doesn't publish when link expires
  - **Fix:** Publish event when isActive changes from true to false or expiration reached
  - **Impact:** Expiration events not processed

- **Missing field restriction:**
  - **Problem:** Can modify any field
  - **Fix:** Only allow updates to (expiration, isActive)
  - **Impact:** Tracking token and customer info can be changed

- **Missing expired link protection:**
  - **Problem:** Can update expired links
  - **Fix:** Throw error if link is expired
  - **Impact:** Expired links can be reactivated

- **Missing completed task protection:**
  - **Problem:** Can update links for completed tasks
  - **Fix:** Check task status before allowing update
  - **Impact:** Links for finished deliveries can be modified

- **Missing active link deletion protection:**
  - **Problem:** Can delete active links
  - **Fix:** Throw error if trying to delete active link
  - **Impact:** Customer loses tracking access

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
// Add to schema first
if (args.sortBy) {
  if (args.sortBy === "[FIELD_NAME]") {
    query = query.orderBy("[field_name]", args.sortDirection === "DESC" ? "desc" : "asc");
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

## Status Transition Validation Pattern

Enforce valid state transitions:

```typescript
// Define valid transitions
const validTransitions = {
  PENDING: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "FAILED"],
  DELIVERED: [],
  FAILED: []
};

// Validate transition
if (!validTransitions[previousEntity.status]?.includes(payload.status)) {
  throw new GraphQLError(`Cannot transition from ${previousEntity.status} to ${payload.status}`, {
    extensions: { code: "BUSINESS_LOGIC_ERROR" }
  });
}
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total DMS Entities | 6 |
| Mutation Resolvers to Fix | 6 |
| Query Resolvers to Fix | 6 |
| New Filter Parameters | 25+ |
| GraphQLError imports to add | 12 |
| Pagination bugs to fix | 3 |
| FK validations to add | 8 |

---

## Testing Strategy

Once all fixes are implemented, verify against `@docs/tests/dms.md`:

- [ ] Create operations with required/optional fields
- [ ] Update operations with correct input schemas
- [ ] Delete operations with error handling and protection checks
- [ ] Query operations with pagination support
- [ ] Search operations with multiple filters
- [ ] Sorting operations with configurable direction
- [ ] Error handling with GraphQLError
- [ ] Foreign key validations
- [ ] Business logic validations
- [ ] Status transition validations

---

## Implementation Order (Recommended)

1. **Phase 1:** Query Improvements & Filtering - Add missing filters and fix pagination bugs
2. **Phase 2:** Mutation Validations & Business Logic - Add all validation and business rule enforcement
3. **Phase 3:** Cross-Cutting Improvements - Apply consistent patterns across all modules
4. **Phase 4:** Validation & Testing - Code review and test case verification

---

## Notes

- **Test Reference:** All requirements derived from `@docs/tests/dms.md`
- **Error Handling:** All errors must use `GraphQLError` for consistent client response format
- **Database Consistency:** All FK validations must check existence before linking
- **Business Rules:** Implement rules as specified in test cases
- **Pagination:** Apply date range and other filters without clearing pagination

---

## Progress Tracking

**Last Updated:** 2025-11-03  
**Total Checklist Items:** 64  
**Completed:** 0  
**In Progress:** 0  
**Remaining:** 64  

**Current Phase:** Phase 1 - Query Improvements & Filtering

### Session 1 Progress:

**Completed:**
- ✅ Document converted to template format

**In Progress:**
- 🔄 Phase 1 - Query Improvements & Filtering

**Blocked:**
- None yet

**Next Steps:**
1. Start Phase 1 - Delivery Routes Query improvements
2. Add driver_id and warehouse_id filters
3. Fix pagination + date range bug
4. Expand search capability
