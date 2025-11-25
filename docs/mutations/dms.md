# Delivery Management System (DMS) Mutations Plan

> **Domain Description**: The Delivery Management System (DMS) orchestrates the final mile of logistics, managing the dispatch of packages to drivers, route optimization for efficiency, real-time tracking of vehicle locations, proof of delivery capture, and customer notification with live tracking capabilities.

### Overview

This document outlines the mutation strategy for all Delivery Management entities in the logistics management system. Each entity includes Create, Update, and Delete mutation specifications with field-level metadata for frontend form generation and PocketBase backend operations.

### Key Principles

- **Route-Based Operations**: All deliveries are organized into optimized routes assigned to drivers
- **Real-Time Tracking**: GPS pings from vehicles feed live driver location data to the system
- **Task Event Trail**: Every status change creates an immutable audit event for compliance
- **Proof of Delivery**: Digital signatures/photos captured at delivery completion
- **Customer Visibility**: Secure tracking links allow real-time customer notification
- **Dynamic Optimization**: Routes can be re-optimized before driver departure
- **Event-Driven Architecture**: Route/task changes trigger downstream notifications

### Related Domains

- **WMS** (Warehouse): Source of packages ready for delivery
- **TMS** (Transport): Driver and vehicle data, carrier integration
- **CRM** (Customer Relations): Customer contact information
- **Notifications**: SMS/email trigger system

---

## Delivery Routes

### Overview

**Purpose**: Represents a planned delivery route for a single driver, containing the optimized sequence of delivery tasks for a given day.

**Key Relationships**:
- Belongs to: Driver (TMS integration)
- Belongs to: Vehicle (TMS integration)
- Has many: Delivery Tasks (stops on route)
- Has many: Driver Locations (GPS pings along route)

**User Roles Involved**: Dispatch Manager, Driver, Route Optimizer

### Create Mutation

#### Required Fields

- **driver**
  - Type: `relation: Drivers (TMS)`
  - Label: "Assigned Driver"
  - Description: "Driver responsible for this route"
  - Tooltip: "Select from available drivers"
  - Constraints: Required, must be active driver

- **vehicle**
  - Type: `relation: Vehicles (TMS)`
  - Label: "Assigned Vehicle"
  - Description: "Vehicle for this delivery route"
  - Tooltip: "Must be available for the day"
  - Constraints: Required, must match driver's vehicle assignment

- **routeDate**
  - Type: `date`
  - Label: "Route Date"
  - Description: "Date of deliveries"
  - Tooltip: "Which day is this route?"
  - Constraints: Required, cannot be in the past

- **status**
  - Type: `enum: ['planned', 'in-progress', 'completed', 'cancelled']`
  - Label: "Status"
  - Description: "Current route state"
  - Tooltip: "planned → in-progress → completed"
  - Constraints: Required, defaults to 'planned'

#### Optional Fields

- **totalDistance**
  - Type: `number`
  - Label: "Total Distance (km)"
  - Description: "Planned total route distance"
  - Tooltip: "Calculated by route optimizer"
  - Constraints: Optional, >= 0

- **estimatedDurationInMinutes**
  - Type: `number`
  - Label: "Est. Duration (min)"
  - Description: "Estimated time to complete route"
  - Tooltip: "Includes driving + delivery time"
  - Constraints: Optional, >= 0, integer

- **startedAt**
  - Type: `datetime`
  - Label: "Started At"
  - Description: "When driver started this route"
  - Tooltip: "Auto-set when status → in-progress"
  - Constraints: Optional, auto-set

- **completedAt**
  - Type: `datetime`
  - Label: "Completed At"
  - Description: "When route was finished"
  - Tooltip: "Auto-set when all tasks completed"
  - Constraints: Optional, auto-set

### Update Mutation

- **driver**: Cannot be updated after creation
- **vehicle**: Cannot be updated after creation
- **routeDate**: Cannot be updated (immutable)
- **status**: Can be updated (with validation for state transitions)
- **totalDistance**: Can be updated (if re-optimizing)
- **estimatedDurationInMinutes**: Can be updated (if re-optimizing)
- **startedAt, completedAt**: Auto-managed (read-only)

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'in-progress' or 'completed'
  - Can only delete if 'planned' and before driver departure
  - Dispatch Manager role required

---

## Delivery Tasks

### Overview

**Purpose**: Individual delivery stops within a route, representing a specific package delivery to a customer location.

**Key Relationships**:
- Belongs to: Delivery Route (parent route)
- Belongs to: Package (WMS)
- Belongs to: Shipment Leg (TMS) - optional, for multi-leg shipments
- Has many: Task Events (status change audit trail)
- Optional: Has: Proof of Delivery

**User Roles Involved**: Driver (execution), Dispatch Manager (creation/assignment)

### Create Mutation

#### Required Fields

- **route**
  - Type: `relation: Delivery Routes`
  - Label: "Route"
  - Description: "Parent delivery route"
  - Tooltip: "Which route?"
  - Constraints: Required

- **package**
  - Type: `relation: Packages (WMS)`
  - Label: "Package"
  - Description: "Package to deliver"
  - Tooltip: "Which package?"
  - Constraints: Required, must be ready for delivery

- **deliveryAddress**
  - Type: `string`
  - Label: "Delivery Address"
  - Description: "Full delivery address"
  - Tooltip: "e.g., '123 Main St, Apt 4B, San Francisco, CA 94102'"
  - Constraints: Required, max 500 chars

- **sequence**
  - Type: `number`
  - Label: "Sequence"
  - Description: "Order in route (1 = first stop)"
  - Tooltip: "Determines pickup order"
  - Constraints: Required, > 0, integer

- **status**
  - Type: `enum: ['pending', 'assigned', 'out-for-delivery', 'delivered', 'failed', 'cancelled', 'rescheduled']`
  - Label: "Status"
  - Description: "Current delivery status"
  - Tooltip: "pending → assigned → out-for-delivery → delivered"
  - Constraints: Required, defaults to 'pending'

#### Optional Fields

- **recipientName**
  - Type: `string`
  - Label: "Recipient Name"
  - Description: "Name of person receiving package"
  - Tooltip: "Who should receive this?"
  - Constraints: Optional, max 200 chars

- **recipientPhone**
  - Type: `string`
  - Label: "Recipient Phone"
  - Description: "Contact number for recipient"
  - Tooltip: "For delivery notifications"
  - Constraints: Optional, max 20 chars

- **deliveryInstructions**
  - Type: `string (HTML)`
  - Label: "Delivery Instructions"
  - Description: "Special instructions for delivery"
  - Tooltip: "e.g., 'Ring bell twice', 'Leave at back door', 'Call upon arrival'"
  - Constraints: Optional, max 1000 chars

- **estimatedArrivalTime**
  - Type: `datetime`
  - Label: "Estimated Arrival"
  - Description: "When driver expects to arrive"
  - Tooltip: "Based on route optimization"
  - Constraints: Optional

- **actualArrivalTime**
  - Type: `datetime`
  - Label: "Actual Arrival"
  - Description: "When driver actually arrived"
  - Tooltip: "Set by driver app on arrival"
  - Constraints: Optional

- **deliveryTime**
  - Type: `datetime`
  - Label: "Delivery Time"
  - Description: "When package was delivered"
  - Tooltip: "Set on status → delivered"
  - Constraints: Optional

- **failureReason**
  - Type: `enum: ['recipient-not-home', 'address-not-found', 'refused-delivery', 'damaged-package', 'access-denied', 'weather-conditions', 'vehicle-breakdown', 'other']`
  - Label: "Failure Reason"
  - Description: "Why delivery failed (if applicable)"
  - Tooltip: "Set when status → failed"
  - Constraints: Optional, only when status='failed'

- **attemptCount**
  - Type: `number`
  - Label: "Attempt Count"
  - Description: "Number of delivery attempts"
  - Tooltip: "Incremented on each failed attempt"
  - Constraints: Optional, >= 0, integer, defaults to 0

- **attachments**
  - Type: `file[]`
  - Label: "Attachments"
  - Description: "Photos or documents related to delivery"
  - Tooltip: "Incident photos, etc."
  - Constraints: Optional, max 5 files

### Update Mutation

- **route**: Cannot be updated (reassign by moving to different route)
- **package**: Cannot be updated (immutable)
- **deliveryAddress**: Can be updated (before delivery)
- **sequence**: Can be updated (before route starts)
- **status**: Can be updated (with validation)
- **recipientName, recipientPhone**: Can be updated (before delivery)
- **deliveryInstructions**: Can be updated (before driver arrival)
- **estimatedArrivalTime**: Can be updated (if re-optimizing)
- **actualArrivalTime, deliveryTime**: Auto-managed on status changes
- **failureReason**: Can be set when status → failed
- **attemptCount**: Auto-incremented on failed delivery attempts

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'out-for-delivery', 'delivered', or 'failed'
  - Can only delete if 'pending' or 'assigned' and before route starts
  - Dispatch Manager role required

---

## Task Events

### Overview

**Purpose**: Immutable audit trail of every status change for a delivery task, created automatically when task state changes.

**Key Relationships**:
- Belongs to: Delivery Task (parent task)

**User Roles Involved**: System (auto-created), Driver (triggers events)

### Create Mutation

#### Required Fields

- **task**
  - Type: `relation: Delivery Tasks`
  - Label: "Task"
  - Description: "Associated delivery task"
  - Tooltip: "Which task?"
  - Constraints: Required

- **status**
  - Type: `enum: ['assigned', 'started', 'arrived', 'delivered', 'failed', 'exception', 'cancelled', 'rescheduled']`
  - Label: "Status"
  - Description: "Status at this event"
  - Tooltip: "What happened?"
  - Constraints: Required, must match task status options

- **timestamp**
  - Type: `datetime`
  - Label: "Event Timestamp"
  - Description: "When this status change occurred"
  - Tooltip: "Auto-set to now"
  - Constraints: Required, auto-set to current time

#### Optional Fields

- **coordinates**
  - Type: `geo: GeoPoint`
  - Label: "Location"
  - Description: "GPS coordinates at event"
  - Tooltip: "Where was driver when event occurred?"
  - Constraints: Optional, from GPS ping

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Event notes or context"
  - Tooltip: "e.g., 'Customer not present, will retry tomorrow'"
  - Constraints: Optional, max 1000 chars

- **reason**
  - Type: `string (HTML)`
  - Label: "Reason"
  - Description: "Reason for event (failures, exceptions)"
  - Tooltip: "Why did this happen?"
  - Constraints: Optional, max 500 chars

### Update Mutation

- **task**: Cannot be updated (immutable event)
- **status**: Cannot be updated (immutable event)
- **timestamp**: Cannot be updated (immutable event)
- **coordinates**: Cannot be updated (immutable event)
- **notes**: Cannot be updated (audit trail integrity)
- **reason**: Cannot be updated (audit trail integrity)

### Delete Mutation

- Constraints:
  - **NEVER delete** task events (immutable audit trail)
  - Compliance/legal requirement to preserve all events

---

## Proof of Deliveries

### Overview

**Purpose**: Digital evidence of delivery completion, containing signature or photo and metadata. Created at delivery completion.

**Key Relationships**:
- Belongs to: Delivery Task
- Stores: Digital signature or photo file

**User Roles Involved**: Driver (capture), Dispatch Manager (verification)

### Create Mutation

#### Required Fields

- **task**
  - Type: `relation: Delivery Tasks`
  - Label: "Task"
  - Description: "Associated delivery task"
  - Tooltip: "Which delivery?"
  - Constraints: Required, must be first POD for this task

- **timestamp**
  - Type: `datetime`
  - Label: "Captured At"
  - Description: "When proof was captured"
  - Tooltip: "Auto-set to now"
  - Constraints: Required, auto-set

#### Optional Fields

- **recipientName**
  - Type: `string`
  - Label: "Recipient Name"
  - Description: "Name of person who received package"
  - Tooltip: "Signature name or entered by driver"
  - Constraints: Optional, max 200 chars

- **signatureData**
  - Type: `json/binary`
  - Label: "Signature"
  - Description: "Digital signature captured on mobile"
  - Tooltip: "SVG or binary signature data"
  - Constraints: Optional (unless photo not provided)

- **coordinates**
  - Type: `geo: GeoPoint`
  - Label: "Delivery Location"
  - Description: "GPS coordinates where delivery occurred"
  - Tooltip: "Geo-tagged proof"
  - Constraints: Optional, from GPS at time of delivery

### Update Mutation

- **task**: Cannot be updated (immutable)
- **timestamp**: Cannot be updated (immutable)
- **recipientName**: Cannot be updated (audit trail)
- **signatureData**: Cannot be updated (immutable)
- **coordinates**: Cannot be updated (immutable)

### Delete Mutation

- Constraints:
  - **NEVER delete** proof of deliveries (legal evidence)
  - Compliance requirement

---

## Driver Locations

### Overview

**Purpose**: Real-time GPS location pings from delivery vehicles, continuously updated throughout the day for live tracking and analytics.

**Key Relationships**:
- Belongs to: Driver (TMS)
- Belongs to: Delivery Route (optional, for context)
- Referenced by: Customer Tracking (live map)

**User Roles Involved**: Driver app (sends), System (stores)

### Create Mutation

#### Required Fields

- **driver**
  - Type: `relation: Drivers (TMS)`
  - Label: "Driver"
  - Description: "Driver sending location"
  - Tooltip: "Which driver?"
  - Constraints: Required

- **coordinates**
  - Type: `geo: GeoPoint`
  - Label: "GPS Coordinates"
  - Description: "Latitude and longitude"
  - Tooltip: "Current location"
  - Constraints: Required, valid lat/lon

- **timestamp**
  - Type: `datetime`
  - Label: "Timestamp"
  - Description: "When location was recorded"
  - Tooltip: "Auto-set to now"
  - Constraints: Required, auto-set

#### Optional Fields

- **heading**
  - Type: `geo: GeoPoint` (or `number` for bearing)
  - Label: "Heading"
  - Description: "Direction of travel (degrees or vector)"
  - Tooltip: "0-360 degrees or direction vector"
  - Constraints: Optional

- **speed**
  - Type: `number`
  - Label: "Speed (km/h)"
  - Description: "Velocity"
  - Tooltip: "Current speed"
  - Constraints: Optional, >= 0

- **accuracy**
  - Type: `number`
  - Label: "GPS Accuracy (m)"
  - Description: "Horizontal accuracy in meters"
  - Tooltip: "Lower is better"
  - Constraints: Optional, >= 0

### Update Mutation

- **driver**: Cannot be updated (immutable)
- **coordinates**: Cannot be updated (immutable)
- **timestamp**: Cannot be updated (immutable)
- **heading, speed, accuracy**: Cannot be updated (immutable)

### Delete Mutation

- Constraints:
  - Can delete aged GPS data (e.g., older than 30 days)
  - Archive instead of hard delete for analytics
  - System Administrator role required

---

## Customer Tracking Links

### Overview

**Purpose**: Secure, unique tracking links generated per delivery, allowing customers to view live tracking of their package without exposing driver identity or allowing general access.

**Key Relationships**:
- Belongs to: Delivery Task
- References: Delivery Route (for live data)
- References: Driver Locations (for display)

**User Roles Involved**: System (generation), Customer (usage)

### Create Mutation

#### Required Fields

- **task**
  - Type: `relation: Delivery Tasks`
  - Label: "Task"
  - Description: "Associated delivery task"
  - Tooltip: "Which delivery?"
  - Constraints: Required

#### Optional Fields

- **expiresAt**
  - Type: `datetime`
  - Label: "Expires At"
  - Description: "When tracking link becomes invalid"
  - Tooltip: "Usually 24-48 hours after delivery"
  - Constraints: Optional, auto-set to 24h after task.deliveryTime

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether link is currently valid"
  - Tooltip: "Can be deactivated before expiry"
  - Constraints: Optional, defaults to true

- **accessCount**
  - Type: `number`
  - Label: "Access Count"
  - Description: "How many times customer accessed link"
  - Tooltip: "For analytics"
  - Constraints: Optional, >= 0, auto-incremented

### Update Mutation

- **task**: Cannot be updated (immutable)
- **expiresAt**: Can be updated (extend or shorten validity)
- **isActive**: Can be updated (deactivate link)
- **accessCount**: Auto-incremented on each access (read-only)

### Delete Mutation

- Constraints:
  - Can delete after expiry
  - Can delete if delivery failed and no longer needed
  - System Administrator role required

---

## Complex Mutation Scenarios

### Scenario 1: Create and Optimize Route

**Trigger**: Dispatch Manager assigns packages to driver

**Atomic Operation** (must all succeed or all fail):

1. Create Delivery Route:
   - driver = selected driver
   - vehicle = driver's assigned vehicle
   - routeDate = today (or specified date)
   - status = 'planned'

2. Create Delivery Tasks:
   - For each selected package
   - Create task with deliveryAddress from package
   - Set status = 'pending'
   - Set sequence = temporary sequential order

3. Call Route Optimizer (external/internal):
   - Input: task locations, estimated delivery times
   - Output: optimized sequence, total distance, ETA
   - Apply results:
     - Update route.totalDistance, estimatedDurationInMinutes
     - Update each task.estimatedArrivalTime
     - Reorder task.sequence numbers

4. Create Notifications:
   - Notify driver: "New route assigned"
   - Push route to driver app

5. Create Customer Notifications (optional):
   - For each task with "out-for-delivery" trigger
   - Create tracking link
   - Queue SMS/email notification

**Error Handling**:
- If optimizer fails: Use default sequence order
- If notification fails: Queue for retry
- If driver offline: Queue route push for next sync

### Scenario 2: Driver Updates Delivery Status

**Trigger**: Driver marks package as delivered, failed, or attempted

**Atomic Operation**:

1. Validate Status Transition:
   - pending/assigned → out-for-delivery (start)
   - out-for-delivery → delivered/failed/rescheduled
   - failed → out-for-delivery (reattempt) or cancelled

2. Create Task Event:
   - task = delivery task
   - status = new status
   - timestamp = now
   - coordinates = current GPS location
   - Auto-set by system

3. Update Delivery Task:
   - task.status = new status
   - If delivered: set deliveryTime = now, create Proof of Delivery capture prompt
   - If failed: set failureReason, increment attemptCount
   - If rescheduled: set status, mark for next-day routing

4. Update Inventory (if delivered):
   - Call WMS to mark package as delivered
   - Update shipment status in CRM/IMS

5. Update Route (if task completed):
   - Check if all tasks completed → route.status = 'completed'
   - Calculate route metrics (actual time, distance)

6. Trigger Downstream Events:
   - Send customer notification if delivery status changed
   - Update dispatcher dashboard in real-time
   - Update analytics/KPI data

**Error Handling**:
- If offline: Queue status update, send when online
- If inventory update fails: Retry with exponential backoff
- If notification fails: Log and queue for retry

### Scenario 3: Capture Proof of Delivery

**Trigger**: Driver completes delivery, prompted to capture POD

**Process**:

1. Prompt Driver:
   - Show signature pad or camera
   - Request recipient name
   - Option for photo instead of signature

2. Capture Data:
   - Signature: Render SVG and save
   - Photo: Capture and encode
   - GPS coordinates: From device location
   - Timestamp: Current time

3. Create Proof of Delivery:
   - task = delivery task
   - signatureData/photo = captured data
   - recipientName = from input
   - coordinates = GPS location
   - timestamp = now

4. Update Task Status:
   - task.status = 'delivered'
   - task.deliveryTime = now
   - Create Task Event (auto)

5. Archive Photo/Signature:
   - Store file in cloud storage
   - Reference in POD record
   - Compress/optimize for storage

**Error Handling**:
- Signature/photo capture fails: Retry or allow skip
- Upload timeout: Queue for retry
- GPS unavailable: Continue without coordinates (non-critical)

### Scenario 4: Generate Customer Tracking Link

**Trigger**: Task status changes to 'out-for-delivery' or manually created by dispatcher

**Process**:

1. Generate Secure Token:
   - Create unique, unguessable token
   - Hash task ID + random salt
   - Store in Customer Tracking Link record

2. Create Tracking Link:
   - task = delivery task
   - Generate public-facing URL
   - Set expiresAt = 24h after delivery
   - isActive = true

3. Send Customer Notification:
   - Extract customer contact from package/task
   - Generate SMS/email message with tracking URL
   - Include ETA and driver first name (not full name)
   - Send via notification system

4. Link Live Data Source:
   - When customer accesses link:
     - Query latest Driver Location for task's driver
     - Query task's estimated/actual times
     - Display on map interface
     - Increment accessCount

**Error Handling**:
- If notification fails: Queue for retry
- If contact info invalid: Log error and skip customer notification
- If tracking query slow: Cache recent data with 30-second TTL

### Scenario 5: Real-Time GPS Ping Stream

**Trigger**: Driver app continuously sends location updates (every 30-60 seconds)

**Process**:

1. Receive GPS Ping:
   - driver = from authenticated session
   - coordinates = lat/lon from device
   - timestamp = server time (not device time, to prevent tampering)
   - heading, speed, accuracy = from GPS sensor

2. Validate Data:
   - Check that driver is on active route
   - Verify coordinates are reasonable (not teleporting)
   - Check accuracy threshold (ignore poor accuracy)

3. Store Driver Location:
   - Create new Driver Location record
   - Batch writes if high frequency

4. Update Route Context (if applicable):
   - Calculate actual distance traveled
   - Update ETA for remaining stops
   - Check for geofence events (if available)

5. Broadcast to Tracking Systems:
   - Send WebSocket push to dispatcher dashboard
   - Send to customer tracking map (via secure token)
   - Update live analytics

6. Cleanup/Archive:
   - Keep recent locations (last 7 days) in hot storage
   - Archive older locations for analytics
   - Implement data retention policy

**Error Handling**:
- GPS quality poor: Log but store, may filter in queries
- Coordinate anomaly detected: Flag for review
- High-frequency pings: Debounce/throttle updates
- Storage quota exceeded: Archive oldest data

---

## Validation Rules

### Global Validation Rules

- **Coordinates**: Valid latitude (-90 to 90), longitude (-180 to 180)
- **Dates**: Must be present or future, not in past (except historical data)
- **Time windows**: Start time <= end time
- **Sequence**: Must be positive integers, no gaps
- **Status transitions**: Only valid state changes allowed
- **Relations**: Driver must be available for assigned date
- **Driver online time**: Cannot complete deliveries before route start

### Entity-Specific Validation Rules

#### Delivery Tasks

- `deliveryAddress` must not be empty
- `package` must be marked ready for delivery from WMS
- `estimatedArrivalTime` must be after route.startedAt
- Cannot have duplicate packages in same route
- `attemptCount` auto-incremented, cannot be set directly

#### Driver Locations

- `timestamp` cannot be in future (received time, not device time)
- Cannot have >2 GPS pings within same second (debounce)
- Must have one active driver per route
- Coordinates should show continuous movement (no >2km/min jumps)

#### Proof of Deliveries

- `task` must have status 'delivered' or 'failed' (not pending)
- Cannot create duplicate POD for same task
- Must have either signatureData or photo (at least one)
- `timestamp` must be close to task.deliveryTime (within 5 minutes)

#### Task Events

- Status must match task.status at time of event
- Timestamp cannot be in future
- Cannot have >1 event with same status for same task (in close succession)

---

## Frontend Implementation Guidance

### Dispatch Dashboard

```typescript
// Example Zod schema for route creation
const CreateRouteSchema = z.object({
  driver: z.string().uuid(),
  vehicle: z.string().uuid(),
  routeDate: z.date().min(new Date()).max(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)), // Max 30 days ahead
  status: z.enum(['planned', 'in-progress', 'completed', 'cancelled']).default('planned'),
  totalDistance: z.number().min(0).optional(),
  estimatedDurationInMinutes: z.number().min(0).int().optional(),
});

type CreateRouteInput = z.infer<typeof CreateRouteSchema>;
```

### Driver Mobile App

- **Route View**: Shows optimized sequence with turn-by-turn directions
- **Task Detail**: Recipient info, delivery instructions, ETA
- **Status Updates**: One-tap status changes with reason selection
- **POD Capture**: Signature pad or camera interface
- **GPS Tracking**: Continuous background location sending

### Customer Tracking Page

- **Live Map**: Shows vehicle location updated real-time via WebSocket
- **ETA Display**: Dynamic ETA based on current speed and remaining distance
- **Route Info**: Optimized path, number of stops before this one
- **Support Link**: Contact info for delivery issues
- **Minimalist Design**: No driver details exposed, security-focused

---

## Backend Implementation Guidance

### PocketBase Hooks

```go
// Route optimization trigger
router.OnRecordAfterCreate("dms_delivery_routes").Add(func(e *core.RecordCreateEvent) error {
    // Fetch associated tasks
    // Call route optimizer service
    // Update route distance and ETA
    // Push to driver app
    return nil
})

// Task status update with event creation
router.OnRecordBeforeUpdate("dms_delivery_tasks").Add(func(e *core.RecordUpdateEvent) error {
    oldStatus := e.OldRecord.GetString("status")
    newStatus := e.Record.GetString("status")
    
    // Create task event
    event := &core.Record{}
    event.SetString("task", e.Record.GetString("id"))
    event.SetString("status", newStatus)
    event.SetDateTime("timestamp", types.DateTime{Time: time.Now()})
    
    if err := dao.SaveRecord(event); err != nil {
        return err
    }
    
    return nil
})

// Driver location stream processing
router.OnRecordAfterCreate("dms_driver_locations").Add(func(e *core.RecordCreateEvent) error {
    // Update route ETA
    // Broadcast to dispatcher/tracking
    return broadcastLocationUpdate(e)
})
```

### Route Optimizer Integration

- Call external optimization service (Google OR-Tools, Graphhopper, etc.)
- Input: delivery locations, time windows, vehicle constraints
- Output: optimized sequence, distance matrix, ETA calculations
- Cache results for 15 minutes to avoid repeated calls

### Real-Time Updates (WebSocket/Server-Sent Events)

- Dispatcher dashboard: Route updates, task status changes
- Customer tracking: Driver location updates (every 30-60 sec)
- Use message queuing (Redis) for high-throughput broadcasts

### Data Privacy & Security

- Customer tracking links: Secure, time-limited tokens
- GPS data: Encrypt in transit and at rest
- POD: Store securely, access restricted
- Driver identity: Don't expose to customers (except first name)

---

## Database Implementation Guidance

### Migration Structure

```go
// Route and task indexes
db.CreateIndex("dms_delivery_routes", "driver_id", "route_date", "status")
db.CreateIndex("dms_delivery_routes", "vehicle_id", "route_date")
db.CreateIndex("dms_delivery_tasks", "route_id", "sequence")
db.CreateIndex("dms_delivery_tasks", "package_id", "status")
db.CreateIndex("dms_delivery_tasks", "status", "delivery_time")

// GPS tracking indexes
db.CreateIndex("dms_driver_locations", "driver_id", "timestamp")
db.CreateIndex("dms_driver_locations", "timestamp") // For cleanup queries

// Customer tracking
db.CreateIndex("dms_customer_tracking_links", "task_id")
db.CreateIndex("dms_customer_tracking_links", "expires_at")

// Audit trail
db.CreateIndex("dms_task_events", "task_id", "timestamp")
db.CreateIndex("dms_proof_of_deliveries", "task_id")
```

### Constraints

- Unique: driver_id + route_date (one route per driver per day)
- Unique: task_id in proof_of_deliveries (one POD per task)
- Foreign keys: All relations must exist
- Check: estimatedArrivalTime >= route.startedAt
- Check: sequence > 0
- Check: coordinates valid lat/lon

### Partitioning Strategy

- **Driver Locations**: Partition by month for efficient cleanup
- **Task Events**: Partition by year for archive
- **Proof of Deliveries**: No partition, relatively small table

### Retention Policies

- **Driver Locations**: Keep 30 days hot, archive older
- **Task Events**: Keep indefinitely (compliance)
- **Proof of Deliveries**: Keep indefinitely (legal)
- **Delivery Routes/Tasks**: Keep 1 year, archive to cold storage

---

## Testing Strategy

### Unit Tests

- Route optimizer output parsing
- Status transition validation
- Coordinate validation (valid lat/lon)
- Distance/time calculations
- Tracking link generation and validation

### Integration Tests

- Full route creation with task generation
- Driver status update workflow
- POD capture and validation
- Tracking link generation and access
- Real-time GPS update broadcast
- Customer notification triggers

### User Story Tests

- Dispatcher assigns packages and optimizes route
- Driver views route and completes deliveries
- Customer receives tracking link and views live map
- GPS tracking continuously updates
- Proof of delivery is captured and stored

### Load Tests

- 1000+ GPS pings/second from drivers
- Real-time map updates for 100K+ concurrent customers
- Route optimization with 500+ stops
- Batch task creation (10K tasks/minute)

### Security Tests

- Tracking link token validation
- Customer cannot access other customer's tracking
- Driver cannot access other driver's routes
- POD data encrypted and secure
- GPS data not exposed to unauthorized users

---

## Related Documentation

- [DMS Dataflow Diagram](../dataflow/dms.md)
- [DMS User Stories](../stories/dms.md)
- [Route Optimizer Integration](../integration/route-optimizer.md)
- [Real-Time Tracking Architecture](../architecture/realtime-tracking.md)
- [Mobile App Specifications](../../frontend/docs/dms-mobile.md)

---

## Version History

| Date | Author | Changes |
|------|--------|---------|
| 2025-11-06 | Agent | Initial creation - 6 entities, 5 complex scenarios |
| | | |

---

## Questions & Notes

- **Route Optimizer**: Which service? Google OR-Tools, Graphhopper, or custom?
- **GPS Frequency**: How often should driver app send location? (30s, 60s, on-demand?)
- **Tracking Link Expiry**: 24h after delivery or 48h? Customizable per client?
- **POD Signature vs Photo**: Require signature or allow photo-only for residential?
- **Multiple Delivery Attempts**: Automatic retry scheduling or manual rescheduling?
- **Geofence Alerts**: Should we add geofence-based delivery zone detection?
- **Driver Incentives**: Should we track POD speed and accuracy for gamification?
