# DMS Schema Test Cases

This document outlines comprehensive test cases for the Delivery Management System (DMS) schema that should be integrated into the testing suite at `@packages/graphql/tests/client/dms/`. The test cases are organized by entity and operation type (CRUD mutations and queries), and are aligned with the data flows documented in `@docs/dataflow/dms.md` and user stories in `@docs/stories/dms.md`.

## Test Case Structure

Each entity follows this pattern:
- **Create Operations**: Valid creation, missing required fields, invalid input
- **Update Operations**: Valid updates, partial updates, invalid field updates
- **Delete Operations**: Successful deletion, non-existent records
- **Query Operations**: Table queries with pagination, search queries with filters, analytics queries with aggregations

---

## 1. Delivery Route Test Cases

### 1.1 Create Delivery Route Tests

#### Valid Cases
- **Create route with assigned driver**
  - Input: driver_id, delivery_tasks, warehouse_id
  - Expected: Route created with "planned" status
  - Related Story: Delivery Task Assignment

- **Create route with multiple delivery tasks**
  - Input: Array of task IDs
  - Expected: Tasks linked to route

- **Create route with assigned date**
  - Input: scheduled_date, driver_id
  - Expected: Route scheduled for date

#### Invalid Cases
- **Create route without driver**
  - Expected: Validation error

- **Create route without delivery tasks**
  - Expected: Validation error

- **Create route with unavailable driver**
  - Expected: Error (driver status check)

- **Create route with duplicate tasks**
  - Expected: Duplicate check error

### 1.2 Update Delivery Route Tests

#### Valid Cases
- **Optimize route**
  - Input: Trigger optimization algorithm
  - Expected: Route sequence optimized, ETA calculated

- **Update route status to "active"**
  - Input: Driver starts route
  - Expected: Status changed to "active"

- **Update route status to "completed"**
  - Input: All tasks completed
  - Expected: Status changed to "completed"

- **Add task to route**
  - Input: new_task_id (if route not started)
  - Expected: Task added to route

- **Remove task from route**
  - Input: task_id (if route not started)
  - Expected: Task removed from route

- **Update optimized sequence**
  - Input: new task sequence order
  - Expected: Sequence updated, ETA recalculated

- **Update driver assignment**
  - Input: new_driver_id (if route not started)
  - Expected: Driver reassigned

- **Update delivery windows/constraints**
  - Expected: Route re-optimized if needed

#### Invalid Cases
- **Update active route**
  - Expected: Limited updates only (e.g., notes)

- **Update completed route**
  - Expected: Error (route locked)

- **Assign unavailable driver**
  - Expected: Error

- **Add task to completed route**
  - Expected: Error

### 1.3 Delete Delivery Route Tests

#### Valid Cases
- **Delete planned route (not started)**
  - Expected: Route deleted/cancelled

#### Invalid Cases
- **Delete active route**
  - Expected: Error (route in progress)

- **Delete completed route**
  - Expected: Error (data integrity)

### 1.4 Delivery Route Query Tests

#### Table Route Query
- **Retrieve all routes with pagination**
  - Expected: Paginated list of routes

- **Retrieve routes by driver**
  - Input: driver_id
  - Expected: Driver's routes

- **Retrieve routes by status**
  - Input: status = "planned", "active", "completed"
  - Expected: Filtered routes

- **Retrieve routes by date**
  - Input: scheduled_date
  - Expected: Routes for date

- **Retrieve routes by warehouse**
  - Expected: Warehouse routes

#### Search Routes Query
- **Search routes by driver name**
  - Input: driver_name
  - Expected: Matching routes

- **Find routes for today**
  - Input: Scheduled_date = today
  - Expected: Today's routes

- **Find active routes**
  - Expected: Currently in progress

- **Find pending optimization routes**
  - Expected: Routes not yet optimized

#### Route Analytics Query
- **Average stops per route**
  - Expected: Mean number of tasks per route

- **Average route distance**
  - Expected: Mean distance in kilometers

- **Average route duration**
  - Expected: Mean time to complete

- **Routes by status breakdown**
  - Expected: Count by status

- **Driver utilization**
  - Expected: Routes per driver

---

## 2. Delivery Task Test Cases

### 2.1 Create Delivery Task Tests

#### Valid Cases
- **Create task from package**
  - Input: package_id, recipient_address, delivery_window, special_instructions
  - Expected: Task created with "pending" status

- **Create task with time window**
  - Input: earliest_time, latest_time
  - Expected: Delivery window set

- **Create task with special instructions**
  - Input: instructions text
  - Expected: Instructions stored for driver

- **Create task with signature requirement**
  - Input: requires_signature = true
  - Expected: Flag set for POD

#### Invalid Cases
- **Create task without package**
  - Expected: Validation error

- **Create task without delivery address**
  - Expected: Validation error

- **Create task with invalid time window**
  - Input: latest_time < earliest_time
  - Expected: Validation error

- **Create task for invalid package status**
  - Expected: Error (package not ready)

### 2.2 Update Delivery Task Tests

#### Valid Cases
- **Update status to "assigned"**
  - Input: Assigned to route
  - Expected: Status changed

- **Update status to "out_for_delivery"**
  - Input: Driver at/near location
  - Expected: Status changed, tracking link generated

- **Update status to "delivered"**
  - Input: Driver completes delivery
  - Expected: Status changed, completion time recorded

- **Update status to "failed"**
  - Input: Delivery attempt failed
  - Expected: Status changed, failure reason recorded

- **Update delivery address**
  - Input: new address (if not started)
  - Expected: Address updated

- **Update time window**
  - Input: new window (if not started)
  - Expected: Window updated

- **Update special instructions**
  - Expected: Instructions updated

- **Reassign task to different route**
  - Input: new_route_id (if not started)
  - Expected: Task reassigned

#### Invalid Cases
- **Update delivered task**
  - Expected: Error (task completed)

- **Update to invalid status**
  - Expected: Status validation error

- **Update task with failed package lookup**
  - Expected: Error

### 2.3 Delete Delivery Task Tests

#### Valid Cases
- **Delete pending task**
  - Expected: Task deleted

#### Invalid Cases
- **Delete assigned task**
  - Expected: Error (task in route)

- **Delete completed task**
  - Expected: Error

### 2.4 Delivery Task Query Tests

#### Table Task Query
- **Retrieve all tasks with pagination**
  - Expected: Paginated list

- **Retrieve tasks by route**
  - Input: route_id
  - Expected: Route's tasks

- **Retrieve tasks by status**
  - Input: status
  - Expected: Filtered tasks

- **Retrieve tasks by driver**
  - Input: driver_id
  - Expected: Driver's tasks

- **Retrieve tasks by date**
  - Expected: Tasks for date

#### Search Tasks Query
- **Find tasks by delivery address**
  - Input: address contains "Main St"
  - Expected: Matching tasks

- **Find tasks by recipient name**
  - Input: recipient_name
  - Expected: Matching tasks

- **Find tasks requiring signature**
  - Expected: Signature-required tasks

- **Find failed delivery tasks**
  - Input: status = "failed"
  - Expected: Failed deliveries

- **Find overdue tasks**
  - Expected: Past delivery window

#### Task Analytics Query
- **Tasks by status breakdown**
  - Expected: Count by status

- **Average task duration**
  - Expected: Mean time to complete

- **Failed delivery rate**
  - Expected: Failed / Total × 100%

- **Tasks with special instructions**
  - Expected: Count requiring special handling

---

## 3. Proof of Delivery Test Cases

### 3.1 Create Proof of Delivery Tests

#### Valid Cases
- **Create POD with signature**
  - Input: task_id, signature_image, recipient_name, timestamp
  - Expected: POD created with signature

- **Create POD with photo**
  - Input: task_id, photo_image, recipient_name, timestamp
  - Expected: POD created with photo

- **Create POD with notes**
  - Input: task_id, notes, timestamp
  - Expected: POD created with additional notes

- **Create POD with both signature and photo**
  - Input: signature_image, photo_image
  - Expected: Multiple POD artifacts

#### Invalid Cases
- **Create POD without task**
  - Expected: Validation error

- **Create POD with invalid task status**
  - Expected: Error (task not delivered)

- **Create POD without signature/photo**
  - Input: Neither signature nor photo
  - Expected: Validation error (at least one required)

- **Create POD for non-delivery task**
  - Expected: Error

### 3.2 Update Proof of Delivery Tests

#### Valid Cases
- **Update POD notes**
  - Expected: Notes updated

- **Add photo to existing POD**
  - Expected: Photo added (if only signature exists)

- **Update signature**
  - Expected: Signature replaced

#### Invalid Cases
- **Update non-existent POD**
  - Expected: Not found error

### 3.3 Delete Proof of Delivery Tests

#### Valid Cases
- **Delete POD for cancelled task**
  - Expected: POD deleted

#### Invalid Cases
- **Delete POD for delivered task**
  - Expected: Error (data integrity)

### 3.4 Proof of Delivery Query Tests

#### Table POD Query
- **Retrieve all PODs with pagination**
  - Expected: Paginated list

- **Retrieve PODs by task**
  - Input: task_id
  - Expected: Task's POD

- **Retrieve PODs by driver**
  - Input: driver_id
  - Expected: Driver's PODs

- **Retrieve PODs by date**
  - Expected: PODs created on date

#### Search PODs Query
- **Search by recipient name**
  - Input: recipient_name
  - Expected: Matching PODs

- **Find PODs with photos**
  - Expected: Photo PODs

- **Find PODs with signatures**
  - Expected: Signature PODs

#### POD Analytics Query
- **Total PODs created**
  - Expected: Count by date/driver

- **POD capture rate**
  - Expected: PODs / Delivered Tasks × 100%

---

## 4. Task Event Test Cases

### 4.1 Create Task Event Tests

#### Valid Cases
- **Create event on status change**
  - Input: task_id, old_status, new_status, timestamp
  - Expected: Event created with metadata

- **Create event with location**
  - Input: task_id, status, latitude, longitude, timestamp
  - Expected: Event with GPS location

- **Create event with notes**
  - Input: task_id, status, notes
  - Expected: Event with additional context

- **Create event for task start**
  - Input: task_id, status="in_progress"
  - Expected: Task start event recorded

- **Create event for task completion**
  - Input: task_id, status="delivered"
  - Expected: Task completion event with timestamp

- **Create event for failed delivery**
  - Input: task_id, status="failed", reason
  - Expected: Failure event with reason

#### Invalid Cases
- **Create event without task**
  - Expected: Validation error

- **Create event with invalid status**
  - Expected: Status validation error

- **Create event for non-existent task**
  - Expected: Not found error

### 4.2 Update Task Event Tests

#### Valid Cases
- **Update event notes**
  - Expected: Notes updated

- **Update event metadata**
  - Expected: Metadata updated

#### Invalid Cases
- **Update event timestamp**
  - Expected: Error (timestamp immutable)

- **Update non-existent event**
  - Expected: Not found error

### 4.3 Delete Task Event Tests

#### Valid Cases
- **Delete event for cancelled task**
  - Expected: Event deleted

#### Invalid Cases
- **Delete event for completed task**
  - Expected: Error (audit trail immutable)

### 4.4 Task Event Query Tests

#### Table Event Query
- **Retrieve all events with pagination**
  - Expected: Paginated list

- **Retrieve events by task**
  - Input: task_id
  - Expected: Task's event history

- **Retrieve events by driver**
  - Input: driver_id
  - Expected: Driver's events

- **Retrieve events by date**
  - Expected: Events on date

#### Search Events Query
- **Search events by status**
  - Input: status
  - Expected: Events with status

- **Find delivery completion events**
  - Input: status = "delivered"
  - Expected: Delivery events

- **Find failed delivery events**
  - Input: status = "failed"
  - Expected: Failure events

- **Events timeline for task**
  - Input: task_id
  - Expected: Chronological event sequence

#### Event Analytics Query
- **Event count by type/status**
  - Expected: Breakdown by event type

- **Timeline analysis for route**
  - Expected: Route progress visualization

---

## 5. Driver Location Test Cases

### 5.1 Create Driver Location Tests

#### Valid Cases
- **Create location update**
  - Input: driver_id, latitude, longitude, timestamp, accuracy
  - Expected: Location created with GPS coordinates

- **Create location with address**
  - Input: driver_id, latitude, longitude, address (reverse geocode)
  - Expected: Location stored with address

- **Create location with speed**
  - Input: latitude, longitude, speed_kmh, bearing
  - Expected: Movement data captured

- **Batch create locations**
  - Input: Multiple location updates
  - Expected: Batch processed

#### Invalid Cases
- **Create location for invalid driver**
  - Expected: Not found error

- **Create location with invalid coordinates**
  - Expected: Validation error

- **Create location with future timestamp**
  - Expected: Validation error

- **Create location with poor accuracy**
  - Input: accuracy > 100 meters
  - Expected: Warning or rejection (based on config)

### 5.2 Update Driver Location Tests

#### Valid Cases
- **Update location with new coordinates**
  - Expected: Location updated

#### Invalid Cases
- **Update historical location**
  - Expected: Error (locations immutable after creation)

### 5.3 Delete Driver Location Tests

#### Valid Cases
- **Archive old location data (e.g., > 30 days)**
  - Expected: Archived/deleted per retention policy

#### Invalid Cases
- **Delete active route location**
  - Expected: Error or prevention

### 5.4 Driver Location Query Tests

#### Table Location Query
- **Retrieve all locations with pagination**
  - Expected: Paginated list

- **Retrieve locations by driver**
  - Input: driver_id
  - Expected: Driver's location history

- **Retrieve locations by date**
  - Input: date
  - Expected: Locations on date

- **Retrieve latest location**
  - Input: driver_id
  - Expected: Most recent location

#### Search Locations Query
- **Find drivers near coordinate**
  - Input: latitude, longitude, radius_km
  - Expected: Drivers within radius

- **Find driver location at specific time**
  - Input: driver_id, timestamp
  - Expected: Location at time

- **Find drivers in region**
  - Input: bounding box
  - Expected: Drivers in region

- **Get driver path**
  - Input: driver_id, date
  - Expected: Daily route trace

#### Location Analytics Query
- **Distance traveled by driver**
  - Input: driver_id, date
  - Expected: Total distance

- **Average speed**
  - Expected: Mean speed for route

- **Idle time analysis**
  - Expected: Time spent stationary

- **Coverage/heat maps**
  - Expected: Geographic delivery density

---

## 6. Customer Tracking Link Test Cases

### 6.1 Create Customer Tracking Link Tests

#### Valid Cases
- **Create tracking link for out-for-delivery task**
  - Input: task_id, customer_email
  - Expected: Link created with unique token
  - Related Story: Real-Time Tracking for Customers

- **Create link with expiration**
  - Input: task_id, expiry_date (e.g., next day)
  - Expected: Link created with expiration

- **Create link with one-time use**
  - Input: task_id, max_uses=1
  - Expected: Link limited to single use

- **Create link via SMS or email**
  - Input: notification_channel (sms, email)
  - Expected: Link sent to customer

#### Invalid Cases
- **Create link for non-delivery task**
  - Expected: Error (task not out for delivery)

- **Create link without customer contact**
  - Expected: Validation error

- **Create duplicate link**
  - Expected: Error or return existing

### 6.2 Update Customer Tracking Link Tests

#### Valid Cases
- **Update link expiration**
  - Expected: Expiry extended

- **Deactivate link**
  - Expected: Link disabled

- **Mark link as used**
  - Input: Link accessed
  - Expected: Usage recorded

#### Invalid Cases
- **Update expired link**
  - Expected: Error

- **Update link for completed task**
  - Expected: Error (delivery complete)

### 6.3 Delete Customer Tracking Link Tests

#### Valid Cases
- **Delete link for cancelled delivery**
  - Expected: Link deleted

#### Invalid Cases
- **Delete active link**
  - Expected: Error (customer may still access)

### 6.4 Customer Tracking Link Query Tests

#### Table Link Query
- **Retrieve all links with pagination**
  - Expected: Paginated list

- **Retrieve links by task**
  - Input: task_id
  - Expected: Task's tracking link

- **Retrieve links by date**
  - Expected: Links created on date

#### Search Links Query
- **Find active links**
  - Expected: Non-expired links

- **Find expired links**
  - Expected: Expired links

- **Find used links**
  - Expected: Links that were accessed

- **Find links by customer**
  - Input: customer_email
  - Expected: Customer's links

#### Link Analytics Query
- **Total links created**
  - Expected: Count by date

- **Link usage rate**
  - Expected: Used / Created × 100%

- **Average time to first access**
  - Expected: Mean time from creation to first use

- **Links by status**
  - Expected: Active, expired, used breakdown

---

## 7. Integration & Cross-Entity Tests

### 7.1 End-to-End: Route Creation to Delivery

**Workflow:**
1. Packages ready at warehouse (WMS)
2. Dispatch manager creates delivery route
3. Route assigned to driver
4. Route optimized
5. Driver receives route on mobile app
6. Driver completes deliveries on route
7. Each task status updated in real-time
8. POD captured for each delivery
9. Route marked completed

**Test Cases:**
- Verify route created with all tasks
- Verify optimization applied
- Verify driver app updated in real-time
- Verify task status transitions
- Verify POD captured
- Verify route completion recorded

### 7.2 End-to-End: Customer Tracking

**Workflow:**
1. Package assigned to delivery task
2. Task marked "out_for_delivery"
3. Tracking link generated
4. Customer notified via SMS/email
5. Customer clicks link
6. Live tracking page loads
7. Real-time driver location displayed
8. ETA updated dynamically
9. Delivery completed
10. POD displayed to customer

**Test Cases:**
- Verify tracking link generated
- Verify notification sent
- Verify live map updates
- Verify ETA accuracy
- Verify POD accessible

### 7.3 Dispatch Manager Operations

**Workflow:**
1. View dispatch dashboard
2. See available drivers on map
3. See pending deliveries to assign
4. Select driver and delivery tasks
5. Create route
6. Optimize route
7. Monitor progress on live map
8. Handle exceptions (failed deliveries, delays)

**Test Cases:**
- Verify dashboard real-time updates
- Verify driver locations current
- Verify route creation flow
- Verify optimization execution
- Verify live progress monitoring

### 7.4 Driver Mobile App Operations

**Workflow:**
1. Driver logs in
2. Views daily route with tasks
3. Follows optimized sequence
4. Navigates to each stop
5. Updates delivery status
6. Captures POD (signature/photo)
7. Moves to next task
8. Completes route

**Test Cases:**
- Verify route displayed correctly
- Verify task details accessible
- Verify status update flow
- Verify POD capture
- Verify route completion

### 7.5 Failed Delivery Handling

**Workflow:**
1. Driver attempts delivery
2. Delivery fails (not home, refused, etc.)
3. Driver marks status "failed"
4. Provides failure reason
5. System updates task
6. Dispatch manager notified
7. Manager can reassign or retry

**Test Cases:**
- Verify failure status captured
- Verify failure reason recorded
- Verify dispatcher notification
- Verify task eligible for reassignment
- Verify retry capability

### 7.6 Route Re-optimization

**Workflow:**
1. Route has multiple pending tasks
2. Dispatch manager initiates re-optimization
3. System recalculates sequence
4. New sequence sent to driver
5. Driver sees updated route
6. Driver continues with new sequence

**Test Cases:**
- Verify optimization algorithm runs
- Verify new sequence calculated
- Verify driver app updated
- Verify ETA recalculated
- Verify completion timeline adjusted

### 7.7 Multi-Driver Route Coverage

**Workflow:**
1. Multiple drivers available
2. Multiple delivery zones
3. Dispatch manager creates routes for each driver
4. Each route optimized independently
5. Routes executed in parallel
6. All drivers tracked simultaneously
7. Real-time metrics updated

**Test Cases:**
- Verify routes assigned to correct drivers
- Verify no task duplication
- Verify parallel execution
- Verify aggregated metrics
- Verify no conflicts

### 7.8 Peak Time/High-Volume Scenario

**Workflow:**
1. High number of deliveries (e.g., 500+ tasks)
2. Multiple dispatch managers working
3. Routes created rapidly
4. Optimization handles volume
5. Driver app responsive
6. Real-time tracking functional
7. No data consistency issues

**Test Cases:**
- Verify system handles high volume
- Verify optimization completes timely
- Verify app performance maintained
- Verify data consistency
- Verify no task loss

---

## 8. Performance & Error Handling Tests

### 8.1 Performance Tests

#### Route Optimization
- **Optimize route with 50+ stops**
  - Expected: Completes within 30 seconds

- **Optimize route with 200+ stops**
  - Expected: Completes within 5 minutes

- **Batch optimize multiple routes**
  - Expected: Acceptable performance

#### Real-Time Updates
- **100+ location updates per second**
  - Expected: All processed, no data loss

- **Live tracking page loads with 50k+ concurrent users**
  - Expected: Performance within SLA

#### Query Performance
- **Query 1000+ driver locations**
  - Expected: Response within 2 seconds

- **Retrieve route history for 1 year**
  - Expected: Paginated efficiently

#### Map Rendering
- **Display 100+ drivers on map**
  - Expected: Map responsive

- **Display 500+ delivery markers**
  - Expected: Acceptable performance

### 8.2 Error Handling Tests

#### Invalid Input
- **Create route with invalid driver ID**
  - Expected: Not found error

- **Create task with invalid package ID**
  - Expected: Not found error

- **Update task with invalid status**
  - Expected: Validation error

#### Constraint Violations
- **Assign task with past delivery window**
  - Expected: Error or warning

- **Create overlapping time windows**
  - Expected: Warning

#### Data Consistency
- **Driver location with invalid coordinates**
  - Expected: Rejection or correction

- **Conflicting task updates**
  - Expected: Last-write-wins or error

- **Route with deleted tasks**
  - Expected: Cascade or error handling

### 8.3 Edge Cases

#### Boundary Conditions
- **Route with single task**
  - Expected: Handled correctly

- **Route at midnight (time zone boundary)**
  - Expected: Correct handling

- **Delivery window < 1 minute**
  - Expected: Accepted/rejected based on config

#### Geographic Edge Cases
- **Deliveries across time zones**
  - Expected: Time windows handled correctly

- **Deliveries at international boundaries**
  - Expected: Geofencing handled

- **Extreme coordinates (poles, dateline)**
  - Expected: Handled without errors

#### Concurrency
- **Multiple updates to same task**
  - Expected: Last update wins or error

- **Route optimization while tasks completing**
  - Expected: Consistent state maintained

- **Driver location update while route active**
  - Expected: No conflicts

### 8.4 Real-Time & Async Tests

#### Live Updates
- **Driver location update appears on map < 3 seconds**
  - Expected: Near real-time visibility

- **Task status change propagates to customer tracking < 2 seconds**
  - Expected: Real-time customer notification

- **Route optimization sends update to driver < 5 seconds**
  - Expected: Driver app updated quickly

#### Notifications
- **Tracking link sent via SMS**
  - Expected: Delivered to customer

- **Failed delivery alerts sent to dispatcher**
  - Expected: Received within 1 minute

- **Route completion notification**
  - Expected: Timely notification

#### Recovery
- **Network disconnect during delivery**
  - Expected: Data synced when reconnected

- **POD upload failure retry**
  - Expected: Automatic retry mechanism

- **Route update conflict resolution**
  - Expected: Consistent final state
