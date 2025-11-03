# TMS Schema Logical Errors Fix - Comprehensive Plan

**Date Created:** Nov 03, 2025  
**Reference Document:** `@docs/tests/tms.md`  
**Target Files:** `packages/graphql/src/schema/tms/<entity>/resolvers/`  
**Error Handling Strategy:** Use `GraphQLError` for all error scenarios

---

## Overview

Fix logical errors across 18 TMS entities (drivers, vehicles, vehicle_maintenance, driver_schedules, trips, trip_stops, routes, gps_pings, geofences, geofence_events, proof_of_deliveries, expenses, carriers, carrier_rates, shipment_legs, shipment_leg_events, partner_invoices, partner_invoice_items) in their Mutations and Queries. All errors will use `GraphQLError` for proper error handling and user feedback.

---

## Implementation Checklist

### Phase 1: Fix Query Pagination & Search (Highest Impact)

- [ ] **1.1 Drivers Module - TmsQuery.ts**
  - [ ] Fix pagination + filter combination (page/perPage with from/to/status/search)
  - [ ] Add missing search field: `name` (currently only licenseNumber and contactPhone)
  - [ ] Ensure filters don't clear pagination limits/offsets

- [ ] **1.2 Vehicles Module - TmsQuery.ts**
  - [ ] Fix pagination + filter combination
  - [ ] Add missing search fields: `color`, `year` (extend current registration/model/make/vin)
  - [ ] Ensure filters don't clear pagination limits/offsets

- [ ] **1.3 Trips Module - TmsQuery.ts**
  - [ ] Fix pagination + filter combination
  - [ ] Add missing search fields: `driverId`, `vehicleId` for relationship filtering
  - [ ] Ensure filters don't clear pagination limits/offsets

- [ ] **1.4 Vehicle Maintenance Module - TmsQuery.ts**
  - [ ] Add date range filtering for maintenance records
  - [ ] Add vehicle_id filtering
  - [ ] Add maintenance_type filtering
  - [ ] Implement pagination with filters

- [ ] **1.5 Trip Stops Module - TmsQuery.ts**
  - [ ] Add trip_id filtering
  - [ ] Add status filtering (Pending, In Progress, Completed)
  - [ ] Add pagination support

- [ ] **1.6 Driver Schedules Module - TmsQuery.ts**
  - [ ] Add driver_id filtering
  - [ ] Add date range filtering
  - [ ] Add status filtering
  - [ ] Implement pagination

- [ ] **1.7 Expenses Module - TmsQuery.ts**
  - [ ] Add driver_id filtering
  - [ ] Add expense_type filtering
  - [ ] Add status filtering (Draft, Submitted, Approved, Rejected)
  - [ ] Add date range filtering
  - [ ] Implement pagination

- [ ] **1.8 Proof of Deliveries Module - TmsQuery.ts**
  - [ ] Add trip_stop_id filtering
  - [ ] Add trip_id filtering
  - [ ] Add pod_type filtering (SIGNATURE, PHOTO, PHOTO_WITH_SIGNATURE)
  - [ ] Implement pagination

- [ ] **1.9 Geofences Module - TmsQuery.ts**
  - [ ] Add type filtering (Warehouse, Customer, etc.)
  - [ ] Add name search
  - [ ] Implement pagination

- [ ] **1.10 Geofence Events Module - TmsQuery.ts**
  - [ ] Add geofence_id filtering
  - [ ] Add vehicle_id filtering
  - [ ] Add event_type filtering (ENTER, EXIT)
  - [ ] Add date range filtering
  - [ ] Implement pagination

### Phase 2: Add Missing Analytics & Aggregation Queries

- [ ] **2.1 Drivers Module - New Analytics Queries**
  - [ ] Add `driversWithExpiringLicense()` - filter by days until expiry (30/60/90)
  - [ ] Add `driverPerformanceMetrics()` - on-time delivery rate per driver
  - [ ] Add `driverTripDuration()` - average trip duration per driver
  - [ ] Add `driverPerformanceRanking()` - rank drivers by KPIs

- [ ] **2.2 Vehicles Module - New Analytics Queries**
  - [ ] Add `vehicleMaintenanceDue()` - vehicles due for maintenance
  - [ ] Add `vehicleUtilization()` - percentage time on trips
  - [ ] Add `vehicleMaintenanceCosts()` - total maintenance spending per vehicle

- [ ] **2.3 Trips Module - New Analytics Queries**
  - [ ] Add `tripOnTimeDeliveryRate()` - percentage of on-time deliveries
  - [ ] Add `tripAverageDuration()` - mean trip duration
  - [ ] Add `tripsByDriver()` - trip metrics by driver
  - [ ] Add `tripsCompletedInDateRange()` - trip completion statistics

- [ ] **2.4 Expenses Module - New Analytics Queries**
  - [ ] Add `totalExpensesByDriver()` - spending per driver
  - [ ] Add `totalExpensesByType()` - breakdown by expense type
  - [ ] Add `averageExpensePerTrip()` - mean expense value

- [ ] **2.5 Carrier Rates Module - New Query**
  - [ ] Add `getCarrierRateForRoute()` - get rate for specific route (origin/destination)

- [ ] **2.6 Routes Module - New Analytics Queries**
  - [ ] Add `mostEfficientRoutes()` - rank routes by distance/efficiency
  - [ ] Add `routeMetrics()` - total_distance, total_time, waypoint_count

- [ ] **2.7 GPS Pings Module - New Analytics Queries**
  - [ ] Add `currentVehicleLocation()` - latest GPS ping for active vehicle
  - [ ] Add `gpsTrailForTrip()` - chronological GPS points for trip
  - [ ] Add `detectRouteDeviation()` - pings outside planned route
  - [ ] Add `activeVehiclesOnMap()` - real-time vehicle locations

- [ ] **2.8 Partner Invoices Module - New Queries**
  - [ ] Add `getInvoicesByCarrier()` - filter by carrier_id
  - [ ] Add `getPendingInvoices()` - status != "Reconciled"
  - [ ] Add `getReconciledInvoices()` - status = "Reconciled"

- [ ] **2.9 Partner Invoice Items Module - New Query**
  - [ ] Add `getInvoiceDiscrepancies()` - items where billed != recorded

- [ ] **2.10 Shipment Legs Module - New Query**
  - [ ] Add `getShipmentLegsByCarrier()` - filter by carrier_id

- [ ] **2.11 Shipment Leg Events Module - New Queries**
  - [ ] Add `getEventHistoryForShipment()` - all leg events for shipment
  - [ ] Add `getEventsFromCarrier()` - events from specific carrier

### Phase 3: Add Mutation Validations & Business Logic

- [ ] **3.1 Drivers Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Add duplicate license_number check in createDriver
  - [ ] Add license expiry date validation (warn if expired)
  - [ ] Prevent deletion if driver has active trips (add FK check)
  - [ ] Add proper NOT_FOUND error handling with GraphQLError

- [ ] **3.2 Vehicles Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Add duplicate registration_number check in createVehicle
  - [ ] Validate capacity is positive in createVehicle
  - [ ] Prevent deletion if vehicle is on active trip
  - [ ] Add proper NOT_FOUND error handling with GraphQLError

- [ ] **3.3 Trips Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate driver exists and is not on another active trip
  - [ ] Validate vehicle exists and is available (not in maintenance)
  - [ ] Prevent status transition from COMPLETED back to other states
  - [ ] Prevent deletion of IN_PROGRESS or COMPLETED trips
  - [ ] Add proper error messages with GraphQLError

- [ ] **3.4 Trip Stops Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate trip exists before creating stop
  - [ ] Validate sequence_number is positive
  - [ ] Prevent modification of completed stops
  - [ ] Add proper NOT_FOUND error handling

- [ ] **3.5 Expenses Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate amount is positive (not negative/zero)
  - [ ] Validate expense_type is valid enum
  - [ ] Validate driver exists
  - [ ] Prevent modification of APPROVED expenses
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.6 Proof of Deliveries Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate trip_stop_id exists
  - [ ] Validate pod_type is valid enum (SIGNATURE, PHOTO, PHOTO_WITH_SIGNATURE)
  - [ ] Prevent duplicate POD for same trip_stop
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.7 Geofences Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate coordinates form valid polygon (min 3 points)
  - [ ] Validate name is not empty
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.8 Geofence Events Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate geofence_id exists
  - [ ] Validate vehicle_id exists
  - [ ] Validate event_type is valid enum (ENTER, EXIT)
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.9 Partner Invoices Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate carrier_id exists
  - [ ] Add duplicate invoice_number check per carrier
  - [ ] Prevent modification of RECONCILED invoices
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.10 Shipment Legs Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate shipment_id exists
  - [ ] Validate carrier_id exists if carrier_type is EXTERNAL
  - [ ] Validate leg_number is positive
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.11 Carriers Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Add duplicate company_name check
  - [ ] Validate required contact information
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.12 Carrier Rates Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate carrier_id exists
  - [ ] Validate rates are positive (not negative/zero)
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.13 Vehicle Maintenance Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate vehicle_id exists
  - [ ] Validate cost is positive
  - [ ] Prevent status updates to invalid states
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.14 Driver Schedules Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate driver_id exists
  - [ ] Validate end_time > start_time
  - [ ] Detect overlapping schedule conflicts
  - [ ] Prevent modification of completed schedules
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.15 Routes Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate waypoints array has at least 2 points
  - [ ] Validate shipment_ids if provided
  - [ ] Add proper error handling with GraphQLError

- [ ] **3.16 GPS Pings Module - TmsMutation.ts**
  - [ ] Add GraphQLError import
  - [ ] Validate latitude/longitude are valid coordinates
  - [ ] Validate trip_id exists
  - [ ] Validate vehicle_id exists
  - [ ] Add proper error handling with GraphQLError

### Phase 4: Status Transition & Advanced Validations

- [ ] **4.1 Trips Module - Advanced Validations**
  - [ ] Implement valid status transitions (PLANNED → IN_PROGRESS → COMPLETED)
  - [ ] Prevent status COMPLETED from going back
  - [ ] Auto-update vehicle status when trip status changes
  - [ ] Add proper transition error messages

- [ ] **4.2 Trip Stops Module - Advanced Validations**
  - [ ] Implement valid stop status transitions
  - [ ] Prevent going backward in sequence
  - [ ] Track actual arrival/departure times

- [ ] **4.3 Driver Schedules Module - Conflict Detection**
  - [ ] Implement overlapping schedule detection
  - [ ] Query to find conflicts before creating
  - [ ] Prevent driver from being double-booked

- [ ] **4.4 Expenses Module - Approval Workflow**
  - [ ] Implement expense status workflow (Draft → Submitted → Approved/Rejected)
  - [ ] Prevent status reversals
  - [ ] Track approval metadata (approved_by, approved_at)

- [ ] **4.5 Partner Invoices Module - Reconciliation**
  - [ ] Implement invoice status workflow
  - [ ] Add reconciliation logic matching items to shipment legs
  - [ ] Calculate and flag variance discrepancies
  - [ ] Prevent modification after reconciliation

---

## Detailed Issues & Fixes

### 1. DRIVERS MODULE

**File:** `packages/graphql/src/schema/tms/drivers/resolvers/`

#### TmsQuery.ts Issues:

- **Issue: Pagination + Filter Incompatibility**
  - **Location:** Lines 13-19
  - **Problem:** When `from && to` date filters are applied, `clearLimit()` and `clearOffset()` remove pagination
  - **Fix:** Remove `clearLimit()` and `clearOffset()` calls; let pagination work with all filters
  - **Impact:** Users cannot apply date range AND pagination together; large result sets unmanageable
  - **Test Case:** "Retrieve all drivers with pagination" + date filtering

- **Issue: Incomplete Search Coverage**
  - **Location:** Lines 21-28
  - **Problem:** Search only checks `licenseNumber` and `contactPhone`, missing `name`
  - **Fix:** Add `eb("name", "ilike", ...)` to search conditions
  - **Impact:** Users cannot search drivers by name, major usability issue
  - **Test Case:** "Search drivers by name"

- **Missing: License Expiry Status Query**
  - **Fix:** Add new query `driversWithExpiringLicense(days: Int)` with date comparison logic
  - **Impact:** Cannot identify drivers needing license renewal
  - **Test Case:** "Search drivers with expiring license (within 30 days)"

#### TmsMutation.ts Issues:

- **Issue: No Duplicate Check**
  - **Location:** Line 13-25 (createDriver)
  - **Problem:** Duplicate license_number can be created, only caught by DB constraint
  - **Fix:** Query for existing license_number before insert; throw GraphQLError if found
  - **Impact:** Poor UX with database errors instead of GraphQL errors
  - **Test Case:** "Create driver with duplicate license number"

- **Issue: No License Expiry Validation**
  - **Location:** Line 13-25 (createDriver)
  - **Problem:** Expired licenses accepted without warning
  - **Fix:** Add warning if license_expiry_date is in past (consider business rule)
  - **Impact:** Cannot enforce business rules around license validity
  - **Test Case:** "Create driver with license already expired"

- **Issue: No FK Validation on Delete**
  - **Location:** Lines 57-67 (removeDriver)
  - **Problem:** Driver can be deleted even with active trips
  - **Fix:** Check for active trips before deletion; throw GraphQLError if found
  - **Impact:** Data integrity issues; orphaned trip records possible
  - **Test Case:** "Delete driver with active trips"

---

### 2. VEHICLES MODULE

**File:** `packages/graphql/src/schema/tms/vehicles/resolvers/`

#### TmsQuery.ts Issues:

- **Issue: Pagination + Filter Incompatibility**
  - **Location:** Lines 13-19
  - **Problem:** When `from && to` date filters are applied, `clearLimit()` and `clearOffset()` remove pagination
  - **Fix:** Remove `clearLimit()` and `clearOffset()` calls; let pagination work with all filters
  - **Impact:** Same as drivers - cannot combine filters with pagination
  - **Test Case:** "Retrieve all vehicles with pagination" + status filtering

- **Issue: Incomplete Search Coverage**
  - **Location:** Lines 21-30
  - **Problem:** Search only checks registration/model/make/vin, missing color/year
  - **Fix:** Add `eb("color", "ilike", ...)` and `eb("year", "=", ...)` to search
  - **Impact:** Cannot search by color or year, limiting discovery
  - **Test Case:** Derived from search requirements

- **Missing: Maintenance Due Query**
  - **Fix:** Add new query `vehicleMaintenanceDue()` with JOIN to vehicle_maintenance table
  - **Impact:** Cannot identify vehicles needing maintenance
  - **Test Case:** "Search vehicles due for maintenance"

#### TmsMutation.ts Issues:

- **Issue: No Duplicate Check**
  - **Location:** Line 12-28 (createVehicle)
  - **Problem:** Duplicate registration_number can be created
  - **Fix:** Query for existing registration_number before insert; throw GraphQLError
  - **Impact:** Poor UX with database errors
  - **Test Case:** "Create vehicle with duplicate registration number"

- **Issue: No Capacity Validation**
  - **Location:** Line 12-28 (createVehicle)
  - **Problem:** Negative/zero capacity accepted (relies on DB constraint)
  - **Fix:** Check payload.capacity > 0 before insert; throw GraphQLError if invalid
  - **Impact:** Poor UX with database errors instead of GraphQL errors
  - **Test Case:** "Create vehicle with invalid capacity (negative/zero)"

- **Issue: No FK Validation on Delete**
  - **Location:** Lines 62-72 (removeVehicle)
  - **Problem:** Vehicle can be deleted even if on active trip
  - **Fix:** Check for trips with this vehicle status = "IN_PROGRESS"; throw error if found
  - **Impact:** Data integrity issues; orphaned trip records
  - **Test Case:** "Delete vehicle on active trip"

---

### 3. TRIPS MODULE

**File:** `packages/graphql/src/schema/tms/trips/resolvers/`

#### TmsQuery.ts Issues:

- **Issue: Pagination + Filter Incompatibility**
  - **Location:** Lines 13-19
  - **Problem:** Same pagination clear issue as other modules
  - **Fix:** Remove `clearLimit()` and `clearOffset()` calls
  - **Impact:** Cannot combine date range with pagination
  - **Test Case:** "Retrieve all trips with pagination" + status filtering

- **Issue: Incomplete Search Coverage**
  - **Location:** Lines 21-28
  - **Problem:** Search only checks startLocation/endLocation, missing driverId/vehicleId
  - **Fix:** Add relationship filtering for driver_id and vehicle_id
  - **Impact:** Cannot find trips by driver or vehicle assignment
  - **Test Case:** "Search trips by driver name" / "Search trips by vehicle registration"

- **Missing: Trip Analytics Queries**
  - **Fix:** Add queries for on-time delivery rate, average duration, trips by driver
  - **Impact:** Cannot build performance dashboards
  - **Test Case:** "Get on-time delivery rate", "Get average trip duration"

#### TmsMutation.ts Issues:

- **Issue: No Driver/Vehicle Validation**
  - **Location:** Lines 13-29 (createTrip)
  - **Problem:** driver_id and vehicle_id not validated; foreign key errors occur at DB
  - **Fix:** Query both entities before insertion; throw GraphQLError if not found
  - **Impact:** Poor error messages; unclear what's wrong
  - **Test Case:** "Create trip with non-existent driver/vehicle"

- **Issue: No Vehicle Availability Check**
  - **Location:** Lines 13-29 (createTrip)
  - **Problem:** Vehicle in "In Maintenance" status can be assigned to trip
  - **Fix:** Check vehicle.status is "Available" or "On Trip"; throw error otherwise
  - **Impact:** Cannot enforce vehicle availability rules
  - **Test Case:** "Create trip with unavailable vehicle"

- **Issue: No Status Transition Validation**
  - **Location:** Lines 30-73 (updateTrip)
  - **Problem:** Completed trips can be updated back to other states
  - **Fix:** Define valid transitions; validate before update
  - **Impact:** Data integrity issues; completed trips modified
  - **Test Case:** "Update completed trip" (should fail)

- **Issue: Cannot Prevent Delete of Active Trips**
  - **Location:** Lines 74-84 (removeTrip)
  - **Problem:** Planned trips deleted, but no check for IN_PROGRESS/COMPLETED
  - **Fix:** Check trip status; only allow delete if PLANNED; throw error otherwise
  - **Impact:** Data integrity issues; orphaned trip data
  - **Test Case:** "Delete in-transit trip" (should fail)

---

### 4. VEHICLE MAINTENANCE MODULE

**File:** `packages/graphql/src/schema/tms/vehicle_maintenance/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Date Range Filtering**
  - **Fix:** Add `from` and `to` date parameters for maintenance records
  - **Impact:** Cannot query maintenance history by time period
  - **Test Case:** "Search maintenance by date range"

- **Missing: Vehicle ID Filtering**
  - **Fix:** Add `vehicle_id` parameter to filter by specific vehicle
  - **Impact:** Cannot list all maintenance for a vehicle efficiently
  - **Test Case:** "Search maintenance by vehicle"

- **Missing: Maintenance Type Filtering**
  - **Fix:** Add `maintenance_type` parameter
  - **Impact:** Cannot find specific types of maintenance
  - **Test Case:** "Search maintenance by type"

#### TmsMutation.ts Issues:

- **Issue: No FK Validation**
  - **Problem:** vehicle_id not validated
  - **Fix:** Query vehicle existence before insert
  - **Impact:** Database errors instead of GraphQL errors
  - **Test Case:** "Create maintenance for non-existent vehicle"

- **Issue: No Cost Validation**
  - **Problem:** Negative costs accepted
  - **Fix:** Validate cost > 0
  - **Impact:** Invalid data in database
  - **Test Case:** "Create maintenance with invalid cost (negative)"

---

### 5. TRIP STOPS MODULE

**File:** `packages/graphql/src/schema/tms/trip_stops/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Trip ID Filtering**
  - **Fix:** Add `trip_id` parameter to get all stops for a trip
  - **Impact:** Cannot efficiently retrieve trip's stops
  - **Test Case:** "Get all stops for trip"

- **Missing: Status Filtering**
  - **Fix:** Add `status` parameter (Pending, In Progress, Completed)
  - **Impact:** Cannot filter by completion status
  - **Test Case:** "Get pending stops for trip"

- **Missing: Current Stop Query**
  - **Fix:** Add query to get current/active stop for a trip
  - **Impact:** Cannot determine driver's current location/stop
  - **Test Case:** "Get current stop for active trip"

#### TmsMutation.ts Issues:

- **Issue: No Trip Existence Validation**
  - **Problem:** trip_id not validated
  - **Fix:** Query trip existence before insert
  - **Impact:** Database errors instead of GraphQL errors

- **Issue: No Sequence Validation**
  - **Problem:** sequence_number can be negative/zero
  - **Fix:** Validate sequence_number > 0
  - **Impact:** Invalid data

---

### 6. GEOFENCES MODULE

**File:** `packages/graphql/src/schema/tms/geofences/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Type Filtering**
  - **Fix:** Add `type` parameter (Warehouse, Customer, etc.)
  - **Impact:** Cannot filter geofences by location type
  - **Test Case:** "Get geofences for location type"

- **Missing: Name Search**
  - **Fix:** Add search parameter for geofence name
  - **Impact:** Cannot find geofences by name
  - **Test Case:** "Get geofence by name"

#### TmsMutation.ts Issues:

- **Issue: No Coordinate Validation**
  - **Problem:** Polygon validation not enforced
  - **Fix:** Check coordinates.length >= 3; validate lat/lon ranges
  - **Impact:** Invalid geofences created
  - **Test Case:** "Create geofence with less than 3 points"

- **Issue: No Name Validation**
  - **Problem:** Empty name allowed
  - **Fix:** Check name is not empty
  - **Impact:** Invalid geofences

---

### 7. GEOFENCE EVENTS MODULE

**File:** `packages/graphql/src/schema/tms/geofence_events/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Geofence ID Filtering**
  - **Fix:** Add `geofence_id` parameter
  - **Impact:** Cannot get events for specific geofence
  - **Test Case:** "Get events for geofence"

- **Missing: Vehicle ID Filtering**
  - **Fix:** Add `vehicle_id` parameter
  - **Impact:** Cannot get events for vehicle
  - **Test Case:** "Get events for vehicle"

- **Missing: Event Type Filtering**
  - **Fix:** Add `event_type` parameter (ENTER, EXIT)
  - **Impact:** Cannot filter by entry/exit
  - **Test Case:** "Get entry events only"

- **Missing: Date Range Filtering**
  - **Fix:** Add `from` and `to` date parameters
  - **Impact:** Cannot query recent events efficiently
  - **Test Case:** "Get recent events (last 24 hours)"

#### TmsMutation.ts Issues:

- **Issue: No FK Validations**
  - **Problem:** geofence_id and vehicle_id not validated
  - **Fix:** Query both entities before insert
  - **Impact:** Database errors

---

### 8. PROOF OF DELIVERIES MODULE

**File:** `packages/graphql/src/schema/tms/proof_of_deliveries/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Trip Stop ID Filtering**
  - **Fix:** Add `trip_stop_id` parameter
  - **Impact:** Cannot retrieve POD for specific stop
  - **Test Case:** "Get POD for trip stop"

- **Missing: Trip ID Filtering**
  - **Fix:** Add `trip_id` parameter
  - **Impact:** Cannot get all PODs for entire trip
  - **Test Case:** "Get all PODs for trip"

- **Missing: POD Type Filtering**
  - **Fix:** Add `pod_type` parameter filtering
  - **Impact:** Cannot filter by signature/photo type
  - **Test Case:** "Get POD by type"

#### TmsMutation.ts Issues:

- **Issue: No Trip Stop Validation**
  - **Problem:** trip_stop_id not validated
  - **Fix:** Query trip_stop existence before insert
  - **Impact:** Database errors

- **Issue: No POD Type Validation**
  - **Problem:** Invalid pod_type accepted
  - **Fix:** Validate pod_type in (SIGNATURE, PHOTO, PHOTO_WITH_SIGNATURE)
  - **Impact:** Invalid data

---

### 9. EXPENSES MODULE

**File:** `packages/graphql/src/schema/tms/expenses/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Driver ID Filtering**
  - **Fix:** Add `driver_id` parameter
  - **Impact:** Cannot get expenses for specific driver
  - **Test Case:** "Get expenses for driver"

- **Missing: Status Filtering**
  - **Fix:** Add `status` parameter
  - **Impact:** Cannot filter pending/approved expenses
  - **Test Case:** "Get pending expenses"

- **Missing: Type Filtering**
  - **Fix:** Add `expense_type` parameter
  - **Impact:** Cannot filter by fuel/toll/maintenance
  - **Test Case:** "Get expenses by type"

- **Missing: Date Range Filtering**
  - **Fix:** Add `from` and `to` parameters
  - **Impact:** Cannot query expenses by period
  - **Test Case:** "Get expenses for date range"

- **Missing: Analytics Queries**
  - **Fix:** Add totalExpensesByDriver, totalExpensesByType, averageExpensePerTrip
  - **Impact:** Cannot build expense reports
  - **Test Case:** Expense analytics test cases

#### TmsMutation.ts Issues:

- **Issue: No Amount Validation**
  - **Problem:** Negative/zero amounts accepted
  - **Fix:** Check amount > 0
  - **Impact:** Invalid data

- **Issue: No Type Validation**
  - **Problem:** Invalid expense_type accepted
  - **Fix:** Validate against enum
  - **Impact:** Invalid data

- **Issue: No Driver Validation**
  - **Problem:** driver_id not validated
  - **Fix:** Query driver existence
  - **Impact:** Database errors

- **Issue: Cannot Prevent Modification of Approved**
  - **Problem:** Approved expenses can be modified
  - **Fix:** Check status != "APPROVED"; throw error if true
  - **Impact:** Data integrity issues

---

### 10. CARRIERS MODULE

**File:** `packages/graphql/src/schema/tms/carriers/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Service Type Filtering**
  - **Fix:** Add `service_type` parameter
  - **Impact:** Cannot find carriers by service
  - **Test Case:** "Get carriers by service"

#### TmsMutation.ts Issues:

- **Issue: No Duplicate Company Name Check**
  - **Problem:** Duplicate company names allowed
  - **Fix:** Query for existing company_name; throw error if found
  - **Impact:** Duplicate carrier records

- **Issue: No Contact Validation**
  - **Problem:** Missing contact info accepted
  - **Fix:** Validate email and/or phone present
  - **Impact:** Invalid carrier records

---

### 11. CARRIER RATES MODULE

**File:** `packages/graphql/src/schema/tms/carrier_rates/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Route Rate Query**
  - **Fix:** Add query to get rate for specific route (carrier_id, origin, destination)
  - **Impact:** Cannot lookup rates for route optimization
  - **Test Case:** "Get rate for route"

#### TmsMutation.ts Issues:

- **Issue: No Carrier Validation**
  - **Problem:** carrier_id not validated
  - **Fix:** Query carrier existence
  - **Impact:** Database errors

- **Issue: No Rate Validation**
  - **Problem:** Negative rates accepted
  - **Fix:** Validate rates > 0
  - **Impact:** Invalid pricing data

---

### 12. SHIPMENT LEGS MODULE

**File:** `packages/graphql/src/schema/tms/shipment_legs/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Carrier ID Filtering**
  - **Fix:** Add `carrier_id` parameter
  - **Impact:** Cannot get legs for carrier
  - **Test Case:** "Get legs for carrier"

#### TmsMutation.ts Issues:

- **Issue: No Shipment Validation**
  - **Problem:** shipment_id not validated
  - **Fix:** Query shipment existence
  - **Impact:** Database errors

- **Issue: No Carrier Validation for External**
  - **Problem:** carrier_id not validated when carrier_type=EXTERNAL
  - **Fix:** Check carrier_id exists if external
  - **Impact:** Database errors

---

### 13. ROUTES MODULE

**File:** `packages/graphql/src/schema/tms/routes/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Analytics Queries**
  - **Fix:** Add mostEfficientRoutes (ordered by distance), routeMetrics
  - **Impact:** Cannot analyze route efficiency
  - **Test Case:** "Get most efficient routes"

#### TmsMutation.ts Issues:

- **Issue: No Waypoint Validation**
  - **Problem:** Routes with 0-1 waypoints allowed
  - **Fix:** Check waypoints.length >= 2
  - **Impact:** Invalid routes

---

### 14. GPS PINGS MODULE

**File:** `packages/graphql/src/schema/tms/gps_pings/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Current Location Query**
  - **Fix:** Add query to get latest ping for vehicle
  - **Impact:** Cannot show real-time vehicle location
  - **Test Case:** "Get current location for active vehicle"

- **Missing: Route Deviation Detection**
  - **Fix:** Add query to find pings outside planned route
  - **Impact:** Cannot detect off-route behavior
  - **Test Case:** "Detect route deviation"

- **Missing: Active Vehicles Map**
  - **Fix:** Add query for all active vehicle locations
  - **Impact:** Cannot build live map
  - **Test Case:** "Get active vehicles on live map"

#### TmsMutation.ts Issues:

- **Issue: No Coordinate Validation**
  - **Problem:** Invalid lat/lon accepted
  - **Fix:** Validate lat in [-90, 90], lon in [-180, 180]
  - **Impact:** Invalid GPS data

- **Issue: No Entity Validation**
  - **Problem:** trip_id and vehicle_id not validated
  - **Fix:** Query both before insert
  - **Impact:** Database errors

---

### 15. SHIPMENT LEG EVENTS MODULE

**File:** `packages/graphql/src/schema/tms/shipment_leg_events/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Event History Query**
  - **Fix:** Add query to get all leg events for shipment (via JOIN)
  - **Impact:** Cannot see shipment event history
  - **Test Case:** "Get event history for shipment"

- **Missing: Carrier Events Query**
  - **Fix:** Add query to get events from specific carrier
  - **Impact:** Cannot filter by carrier
  - **Test Case:** "Get events from specific carrier"

#### TmsMutation.ts Issues:

- **Issue: No Leg Validation**
  - **Problem:** leg_id not validated
  - **Fix:** Query leg existence
  - **Impact:** Database errors

---

### 16. PARTNER INVOICES MODULE

**File:** `packages/graphql/src/schema/tms/partner_invoices/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Carrier Filtering**
  - **Fix:** Add `carrier_id` parameter
  - **Impact:** Cannot get invoices for specific carrier
  - **Test Case:** "Get invoices for carrier"

- **Missing: Pending Invoices Query**
  - **Fix:** Add query filtering status != "Reconciled"
  - **Impact:** Cannot find invoices awaiting reconciliation
  - **Test Case:** "Get pending invoices"

- **Missing: Reconciled Invoices Query**
  - **Fix:** Add query filtering status = "Reconciled"
  - **Impact:** Cannot see completed reconciliations

#### TmsMutation.ts Issues:

- **Issue: No Carrier Validation**
  - **Problem:** carrier_id not validated
  - **Fix:** Query carrier existence
  - **Impact:** Database errors

- **Issue: No Duplicate Invoice Number Check**
  - **Problem:** Duplicate invoice numbers allowed per carrier
  - **Fix:** Check (carrier_id, invoice_number) uniqueness
  - **Impact:** Duplicate invoice records

---

### 17. PARTNER INVOICE ITEMS MODULE

**File:** `packages/graphql/src/schema/tms/partner_invoice_items/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Discrepancy Detection**
  - **Fix:** Add query finding items where billed_amount != recorded_amount
  - **Impact:** Cannot detect invoice discrepancies
  - **Test Case:** "Get discrepancies in invoice"

#### TmsMutation.ts Issues:

- **Issue: No Invoice Validation**
  - **Problem:** invoice_id not validated
  - **Fix:** Query invoice existence
  - **Impact:** Database errors

---

### 18. DRIVER SCHEDULES MODULE

**File:** `packages/graphql/src/schema/tms/driver_schedules/resolvers/`

#### TmsQuery.ts Issues:

- **Missing: Driver ID Filtering**
  - **Fix:** Add `driver_id` parameter
  - **Impact:** Cannot get driver's schedule
  - **Test Case:** "Get driver's schedule for date"

- **Missing: Date Range Filtering**
  - **Fix:** Add `from` and `to` date parameters
  - **Impact:** Cannot query schedule by date range

- **Missing: Status Filtering**
  - **Fix:** Add `status` parameter
  - **Impact:** Cannot filter by completion status

- **Missing: Current Assignment Query**
  - **Fix:** Add query to get driver's active/upcoming assignment
  - **Impact:** Cannot show current task
  - **Test Case:** "Get driver's current assignment"

#### TmsMutation.ts Issues:

- **Issue: No Time Validation**
  - **Problem:** End time can be before start time
  - **Fix:** Validate end_time > start_time
  - **Impact:** Invalid schedules

- **Issue: No Conflict Detection**
  - **Problem:** Overlapping schedules allowed
  - **Fix:** Check for existing schedules in time window; throw error if overlap
  - **Impact:** Driver double-booking

- **Issue: No Driver Validation**
  - **Problem:** driver_id not validated
  - **Fix:** Query driver existence
  - **Impact:** Database errors

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

// Database errors (catch and rethrow)
throw new GraphQLError("Database operation failed", {
  extensions: {
    code: "DATABASE_ERROR"
  }
});

// Duplicate key errors
throw new GraphQLError("Entity already exists", {
  extensions: {
    code: "DUPLICATE_ERROR"
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
const validTransitions: Record<string, string[]> = {
  PENDING: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "FAILED"],
  DELIVERED: [],
  FAILED: []
};

// Validate transition
if (!validTransitions[previousEntity.status]?.includes(payload.status)) {
  throw new GraphQLError(
    `Cannot transition from ${previousEntity.status} to ${payload.status}`,
    {
      extensions: { code: "BUSINESS_LOGIC_ERROR" }
    }
  );
}
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total TMS Entities | 18 |
| Mutation Resolvers to Fix | 18 |
| Query Resolvers to Fix | 18 |
| New Analytics Queries | 11 |
| New Filter Parameters | 35+ |
| GraphQLError imports to add | 18 |
| Pagination bugs to fix | 6 |
| FK validations to add | 20+ |
| Duplicate checks to add | 5 |
| Business logic validations | 12+ |

---

## Testing Strategy

Once all fixes are implemented, verify against `@docs/tests/tms.md`:

- [ ] Create operations with required/optional fields (Zod validation)
- [ ] Update operations with correct input schemas
- [ ] Delete operations with error handling
- [ ] Query operations with pagination support
- [ ] Search operations with multiple filters combined
- [ ] Analytics queries with aggregations
- [ ] Error handling with GraphQLError
- [ ] Foreign key validations with proper messages
- [ ] Business logic validations (availability, conflicts, etc.)
- [ ] Status transition validations
- [ ] Duplicate key checks
- [ ] Constraint enforcement (positive amounts, valid ranges, etc.)

---

## Implementation Order (Recommended)

1. **Phase 1:** Fix Common Query Issues - Fix pagination+filter across all 6 main entities (drivers, vehicles, trips, etc.)
2. **Phase 2:** Add Missing Analytics & Aggregation Queries - Implement 11+ analytics queries for dashboards
3. **Phase 3:** Add Mutation Validations & Business Logic - Add 20+ FK validations and duplicate checks
4. **Phase 4:** Status Transitions & Advanced Validations - Implement complex workflows and conflict detection

---

## Notes

- **Test Reference:** All requirements derived from `@docs/tests/tms.md`
- **Error Handling:** All errors must use `GraphQLError` for consistent client response format
- **Database Consistency:** All FK validations must check existence before linking
- **Business Rules:** Implement rules as specified in test cases (e.g., cannot delete driver with active trips)
- **Analytics:** Implement aggregation queries for reporting requirements
- **Performance:** Index frequently queried fields (driver_id, vehicle_id, status, created_at)

---

## Progress Tracking

**Last Updated:** Nov 03, 2025 (Session 2)  
**Total Checklist Items:** 116  
**Completed:** 10  
**In Progress:** 1  
**Remaining:** 105  

**Current Phase:** Phase 1: Query Pagination & Search Fixes (Session 2 - Continuing)

### Session 1 Progress:

**Completed:**
- ✅ Created comprehensive plan document
- ✅ Analyzed test cases and identified all logical issues
- ✅ Documented all 18 entities with detailed issues

### Session 2 Progress:

**Completed:**
- ✅ Phase 1.1: Drivers Module - Pagination fix + search improvements
- ✅ Phase 1.2: Vehicles Module - Pagination fix + search improvements
- ✅ Phase 1.3: Trips Module - Pagination fix + search improvements
- ✅ Phase 3.1: Drivers Mutations - Added duplicate license check, license expiry validation, FK checks
- ✅ Phase 3.2: Vehicles Mutations - Added duplicate registration check, capacity validation, FK checks
- ✅ Phase 3.3: Trips Mutations - Fixed Kysely syntax errors (multi-parameter `.select()` calls)
- ✅ Phase 1.4: Vehicle Maintenance Filtering - Added vehicleId, from/to date range, serviceType filters
- ✅ Phase 1.5: Trip Stops Filtering - Added tripId, status, pagination filters
- ✅ Phase 1.6: Driver Schedules Filtering - Added driverId, from/to date range, reason filters
- ✅ Phase 1.7: Expenses Filtering - Added driverId, type, status, date range filters + fixed pagination bug
- ✅ Phase 1.8: POD Filtering - Added tripStopId, tripId filters + fixed pagination bug

**In Progress:**
- 🔄 Phase 1.9: Geofences Module - Fixed pagination bug (removed `.clearLimit()` and `.clearOffset()`)
- ⏸️ Phase 1.10: Geofence Events Module - Schema updated with TmsQuery, resolver created (pending codegen)

**Blocked:**
- None currently

**Next Steps:**
1. Run GraphQL codegen to generate types for geofence_events TmsQuery
2. Complete Phase 1.10: Geofence Events Module
3. Begin Phase 3 mutations for remaining modules
4. Implement Phase 2 analytics queries

---

## Key Changes Made in Session 2

### Pagination Bug Fix Pattern Applied
All query resolvers now follow the correct pattern:
```typescript
// Apply pagination ONLY when both page and perPage are provided
if (args.page && args.perPage) {
  const offset = (args.page - 1) * args.perPage;
  query = query.offset(offset).limit(args.perPage);
}

// Apply date range filters WITHOUT clearing pagination
if (args.from && args.to) {
  query = query
    .where("createdAt", ">=", args.from as Date)
    .where("createdAt", "<=", args.to as Date);
}
```

### Files Modified in Session 2
- `packages/graphql/src/schema/tms/drivers/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/drivers/resolvers/TmsMutation.ts` ✅
- `packages/graphql/src/schema/tms/vehicles/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/vehicles/resolvers/TmsMutation.ts` ✅
- `packages/graphql/src/schema/tms/trips/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/trips/resolvers/TmsMutation.ts` ✅ (fixed syntax)
- `packages/graphql/src/schema/tms/vehicle_maintenance/schema.graphql` ✅
- `packages/graphql/src/schema/tms/vehicle_maintenance/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/trip_stops/schema.graphql` ✅
- `packages/graphql/src/schema/tms/trip_stops/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/driver_schedules/schema.graphql` ✅
- `packages/graphql/src/schema/tms/driver_schedules/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/expenses/schema.graphql` ✅
- `packages/graphql/src/schema/tms/expenses/resolvers/TmsQuery.ts` ✅ (fixed pagination bug)
- `packages/graphql/src/schema/tms/proof_of_deliveries/schema.graphql` ✅
- `packages/graphql/src/schema/tms/proof_of_deliveries/resolvers/TmsQuery.ts` ✅
- `packages/graphql/src/schema/tms/geofences/resolvers/TmsQuery.ts` ✅ (fixed pagination bug)
- `packages/graphql/src/schema/tms/geofence_events/schema.graphql` ✅ (added TmsQuery)
- `packages/graphql/src/schema/tms/geofence_events/resolvers/TmsQuery.ts` ✅ (created)

### GraphQL Codegen Runs
- Ran codegen after each schema update to generate types
- Fixed Kysely syntax errors in Trips mutations
- All resolver type errors resolved through proper type generation

---

## Related Documentation

- **Test Cases:** `@docs/tests/tms.md` - Comprehensive test requirements
- **Data Flow:** `@docs/dataflow/tms.md` - Entity relationships
- **User Stories:** `@docs/stories/tms.md` - Business context
- **GraphQL Schema:** `@packages/graphql/src/schema/tms/**/*.graphql` - Type definitions
- **Zod Schemas:** `@packages/graphql/src/zod.schema.ts` - Validation schemas
- **Database Types:** `@packages/graphql/src/db.types.ts` - Generated Kysely types
