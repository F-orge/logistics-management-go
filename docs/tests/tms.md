# TMS Schema Test Cases

This document outlines comprehensive test cases for the Transportation Management System (TMS) schema that should be integrated into the testing suite at `@packages/graphql/tests/client/tms/`. The test cases are organized by entity and operation type (CRUD mutations and queries), and are aligned with the data flows documented in `@docs/dataflow/tms.md` and user stories in `@docs/stories/tms.md`.

## Test Case Structure

Each entity follows this pattern:
- **Create Operations**: Valid creation, missing required fields, invalid input
- **Update Operations**: Valid updates, partial updates, invalid field updates
- **Delete Operations**: Successful deletion, non-existent records
- **Query Operations**: Table queries with pagination, search queries with filters, analytics queries with aggregations

---

## 1. Drivers Test Cases

### 1.1 Create Driver Tests

#### Valid Cases
- **Create driver with required fields**
  - Input: name, license_number, license_expiry_date
  - Expected: Driver created with unique ID
  - Related Story: Driver Profile Management

- **Create driver with full information**
  - Input: name, email, phone, address, license_number, license_expiry_date, experience_years
  - Expected: All fields persisted correctly

- **Create driver with license expiry in future**
  - Input: license_expiry_date as future date
  - Expected: Driver created without alerts

#### Invalid Cases
- **Create driver without name**
  - Expected: Validation error

- **Create driver without license_number**
  - Expected: Validation error

- **Create driver with invalid license number format**
  - Expected: Format validation error

- **Create driver with duplicate license number**
  - Expected: Duplicate check error

- **Create driver with license already expired**
  - Expected: Warning or error (depends on business logic)

### 1.2 Update Driver Tests

#### Valid Cases
- **Update driver contact information**
  - Input: phone, email, address
  - Expected: Contact details updated
  - Related Story: Driver Profile Management

- **Update driver license expiry date**
  - Input: new license_expiry_date
  - Expected: License date updated, may trigger alert refresh
  - Related Story: Driver Profile Management

- **Update driver status**
  - Input: status (Active, Inactive, On Leave)
  - Expected: Status updated

- **Update driver experience years**
  - Expected: Experience years updated

#### Invalid Cases
- **Update driver with invalid license expiry date**
  - Input: past date in wrong format
  - Expected: Validation error

- **Update non-existent driver**
  - Expected: Not found error

- **Update driver with duplicate license number**
  - Expected: Duplicate check error

### 1.3 Delete Driver Tests

#### Valid Cases
- **Delete driver with no active assignments**
  - Expected: Driver deleted or marked inactive

#### Invalid Cases
- **Delete driver with active trips**
  - Expected: Error or cascade behavior (based on rules)

- **Delete non-existent driver**
  - Expected: Not found error

### 1.4 Driver Query Tests

#### Table Driver Query
- **Retrieve all drivers with pagination**
  - Expected: Paginated list of drivers

- **Retrieve drivers sorted by name**
  - Expected: Alphabetically sorted

- **Retrieve drivers with license status**
  - Expected: Each driver includes license expiry status

#### Search Drivers Query
- **Search drivers by name**
  - Input: name contains "John"
  - Expected: Matching drivers

- **Search drivers by license status**
  - Input: license_expiry_date filter (expiring soon, expired, valid)
  - Expected: Drivers filtered by license status
  - Related Story: Driver Profile Management

- **Search drivers by status**
  - Input: status = "Active"
  - Expected: All active drivers

- **Search drivers with expiring license (within 30 days)**
  - Expected: Drivers needing license renewal alerts
  - Related Story: Driver Profile Management

#### Driver Performance Analytics Query
- **Get drivers with upcoming license expirations**
  - Expected: Drivers expiring within 30/60/90 days
  - Related Story: Driver Profile Management

- **Get driver on-time delivery rates**
  - Expected: Percentage of on-time deliveries per driver
  - Related Story: Driver Performance Analytics

- **Get average trip duration per driver**
  - Expected: Mean duration of trips by driver

- **Get driver by performance ranking**
  - Expected: Drivers ranked by KPIs
  - Related Story: Driver Performance Analytics

---

## 2. Vehicles Test Cases

### 2.1 Create Vehicle Tests

#### Valid Cases
- **Create vehicle with required fields**
  - Input: registration_number, model, capacity
  - Expected: Vehicle created with "Available" status
  - Related Story: Vehicle Fleet Management

- **Create vehicle with full information**
  - Input: registration_number, model, capacity, year, color, mileage, status
  - Expected: All fields persisted

- **Create vehicle with custom capacity**
  - Input: capacity (e.g., 5000kg, 20 units)
  - Expected: Capacity stored for shipment matching

#### Invalid Cases
- **Create vehicle without registration_number**
  - Expected: Validation error

- **Create vehicle without model**
  - Expected: Validation error

- **Create vehicle without capacity**
  - Expected: Validation error

- **Create vehicle with duplicate registration number**
  - Expected: Duplicate check error

- **Create vehicle with invalid capacity (negative/zero)**
  - Expected: Validation error

### 2.2 Update Vehicle Tests

#### Valid Cases
- **Update vehicle status to "Available"**
  - Expected: Status updated
  - Related Story: Vehicle Fleet Management

- **Update vehicle status to "In Maintenance"**
  - Input: status = "In Maintenance"
  - Expected: Status updated, vehicle unavailable for dispatch

- **Update vehicle status to "On Trip"**
  - Input: status = "On Trip", trip_id
  - Expected: Status updated with trip association

- **Update vehicle mileage**
  - Input: new mileage
  - Expected: Mileage recorded

- **Log vehicle maintenance activity**
  - Input: maintenance_type, service_date, cost, notes
  - Expected: Maintenance record created and linked
  - Related Story: Vehicle Fleet Management

#### Invalid Cases
- **Update non-existent vehicle**
  - Expected: Not found error

- **Update vehicle with invalid capacity**
  - Expected: Validation error

### 2.3 Delete Vehicle Tests

#### Valid Cases
- **Delete vehicle with no active trips**
  - Expected: Vehicle deleted or archived

#### Invalid Cases
- **Delete vehicle on active trip**
  - Expected: Error (vehicle in use)

- **Delete non-existent vehicle**
  - Expected: Not found error

### 2.4 Vehicle Query Tests

#### Table Vehicle Query
- **Retrieve all vehicles with pagination**
  - Expected: Paginated list

- **Retrieve vehicles by status**
  - Parameters: status filter
  - Expected: Vehicles with specified status
  - Related Story: Vehicle Fleet Management

- **Retrieve vehicles with maintenance status**
  - Expected: Each vehicle includes maintenance due info

#### Search Vehicles Query
- **Search vehicles by registration number**
  - Expected: Specific vehicle found

- **Search vehicles by model**
  - Expected: Vehicles of specified model

- **Search vehicles by status**
  - Input: status = "Available"
  - Expected: Available vehicles for dispatch

- **Search vehicles due for maintenance**
  - Expected: Vehicles with maintenance overdue
  - Related Story: Vehicle Fleet Management

#### Vehicle Analytics Query
- **Get vehicles due for scheduled maintenance**
  - Expected: Maintenance schedule alerts
  - Related Story: Vehicle Fleet Management

- **Get vehicle utilization rates**
  - Expected: Percentage of time vehicle is on trips

- **Get maintenance cost per vehicle**
  - Expected: Total maintenance spending

---

## 3. Vehicle Maintenance Test Cases

### 3.1 Create Maintenance Tests

#### Valid Cases
- **Create maintenance record with required fields**
  - Input: vehicle_id, maintenance_type, service_date, cost
  - Expected: Maintenance record created
  - Related Story: Vehicle Fleet Management

- **Create maintenance with full details**
  - Input: vehicle_id, type, date, cost, service_provider, notes, mileage_at_service
  - Expected: All fields persisted

- **Create preventive maintenance schedule**
  - Input: vehicle_id, scheduled_date, type="Preventive"
  - Expected: Scheduled maintenance recorded

#### Invalid Cases
- **Create maintenance without vehicle_id**
  - Expected: Validation error

- **Create maintenance without date**
  - Expected: Validation error

- **Create maintenance with invalid cost (negative)**
  - Expected: Validation error

- **Create maintenance for non-existent vehicle**
  - Expected: Foreign key error

### 3.2 Update Maintenance Tests

#### Valid Cases
- **Update maintenance status to completed**
  - Input: status = "Completed"
  - Expected: Completion logged with timestamp

- **Update maintenance cost**
  - Expected: Cost updated

- **Update maintenance notes**
  - Expected: Notes updated

#### Invalid Cases
- **Update non-existent maintenance**
  - Expected: Not found error

### 3.3 Maintenance Query Tests

#### Search Maintenance Query
- **Search maintenance by vehicle**
  - Input: vehicle_id filter
  - Expected: All maintenance records for vehicle
  - Related Story: Vehicle Fleet Management

- **Search maintenance by type**
  - Input: maintenance_type filter
  - Expected: All maintenance of specified type

- **Search maintenance by date range**
  - Input: service_date between start and end
  - Expected: Maintenance in timeframe

#### Maintenance Analytics Query
- **Get maintenance due/overdue alerts**
  - Expected: Vehicles requiring attention
  - Related Story: Vehicle Fleet Management

- **Get total maintenance cost per vehicle**
  - Expected: Maintenance spending breakdown

---

## 4. Drivers Schedule Test Cases

### 4.1 Create Driver Schedule Tests

#### Valid Cases
- **Create driver schedule for assigned trip**
  - Input: driver_id, trip_id, scheduled_start, scheduled_end
  - Expected: Schedule created
  - Related Story: Shipment Assignment and Dispatch

- **Create driver schedule with availability windows**
  - Expected: Schedule stored with time slots

#### Invalid Cases
- **Create schedule for non-existent driver**
  - Expected: Foreign key error

- **Create schedule with end time before start time**
  - Expected: Time validation error

### 4.2 Update Driver Schedule Tests

#### Valid Cases
- **Update schedule status to "In Progress"**
  - Expected: Status updated

- **Update schedule status to "Completed"**
  - Expected: Status updated with completion time

- **Modify scheduled times**
  - Expected: Times updated

#### Invalid Cases
- **Update schedule with conflicting time**
  - Expected: Conflict error (overlapping schedules)

### 4.3 Driver Schedule Query Tests

#### Search Driver Schedule Query
- **Get driver's schedule for date**
  - Input: driver_id, date
  - Expected: Driver's assignments for that day
  - Related Story: Shipment Assignment and Dispatch

- **Get driver's schedule for date range**
  - Expected: All assignments in timeframe

- **Get driver's current assignment**
  - Expected: Active or upcoming assignment

---

## 5. Trips Test Cases

### 5.1 Create Trip Tests

#### Valid Cases
- **Create trip with required fields**
  - Input: driver_id, vehicle_id, status="Planned"
  - Expected: Trip created with unique ID
  - Related Story: Shipment Assignment and Dispatch

- **Create trip with multiple stops**
  - Input: driver_id, vehicle_id, trip_stops (array)
  - Expected: Trip created with associated stops
  - Related Story: Shipment Assignment and Dispatch

- **Create trip from optimized route**
  - Input: route_id, driver_id, vehicle_id
  - Expected: Trip created with route waypoints as stops
  - Related Story: Route Optimization

- **Create trip with shipments assigned**
  - Input: driver_id, vehicle_id, shipment_ids (array)
  - Expected: Trip created with shipment associations

#### Invalid Cases
- **Create trip without driver**
  - Expected: Validation error

- **Create trip without vehicle**
  - Expected: Validation error

- **Create trip with non-existent driver**
  - Expected: Foreign key error

- **Create trip with non-existent vehicle**
  - Expected: Foreign key error

- **Create trip with unavailable vehicle**
  - Input: vehicle in "In Maintenance" status
  - Expected: Error or warning

### 5.2 Update Trip Tests

#### Valid Cases
- **Update trip status to "In Transit"**
  - Input: status = "In Transit", started_at timestamp
  - Expected: Status updated, trip marked as active
  - Related Story: Shipment Assignment and Dispatch

- **Update trip status to "Completed"**
  - Input: status = "Completed", completed_at timestamp
  - Expected: Status updated with completion time

- **Update trip with new shipment**
  - Input: add shipment_id to trip
  - Expected: Shipment added to trip

- **Update trip vehicle (in case of breakdown)**
  - Input: new vehicle_id
  - Expected: Vehicle swapped

#### Invalid Cases
- **Update completed trip**
  - Expected: Error (cannot modify completed trip)

- **Update trip with invalid status**
  - Expected: Validation error

- **Update non-existent trip**
  - Expected: Not found error

### 5.3 Delete Trip Tests

#### Valid Cases
- **Delete planned trip (not started)**
  - Expected: Trip deleted

#### Invalid Cases
- **Delete in-transit trip**
  - Expected: Error (active trip cannot be deleted)

- **Delete completed trip**
  - Expected: Error or archive only

### 5.4 Trip Query Tests

#### Table Trip Query
- **Retrieve all trips with pagination**
  - Expected: Paginated list

- **Retrieve trips by status**
  - Parameters: status filter
  - Expected: Trips with specified status
  - Related Story: Shipment Assignment and Dispatch

- **Retrieve trips sorted by created date**
  - Expected: Chronologically sorted

- **Retrieve trips by driver**
  - Parameters: driver_id filter
  - Expected: All trips for driver

- **Retrieve active trips (in-progress)**
  - Expected: Only "In Transit" trips
  - Related Story: Real-Time GPS Tracking

#### Search Trips Query
- **Search trips by driver name**
  - Expected: Trips assigned to driver

- **Search trips by vehicle registration**
  - Expected: Trips using vehicle

- **Search trips by status**
  - Input: status = "In Transit"
  - Expected: Active trips
  - Related Story: Real-Time GPS Tracking

- **Search trips by date created**
  - Input: created between start and end
  - Expected: Trips created in timeframe

#### Trip Analytics Query
- **Get on-time delivery rate**
  - Expected: Percentage of trips completed on schedule
  - Related Story: Driver Performance Analytics

- **Get average trip duration**
  - Expected: Mean duration per trip

- **Get trips by driver (for performance tracking)**
  - Expected: Trip count and metrics by driver
  - Related Story: Driver Performance Analytics

- **Get trips completed in date range**
  - Expected: Trip completion statistics
  - Related Story: Driver Performance Analytics

---

## 6. Trip Stops Test Cases

### 6.1 Create Trip Stop Tests

#### Valid Cases
- **Create trip stop with required fields**
  - Input: trip_id, location, sequence_number, status="Pending"
  - Expected: Stop created
  - Related Story: Shipment Assignment and Dispatch

- **Create trip stop with shipment**
  - Input: trip_id, location, shipment_id
  - Expected: Stop created linked to shipment
  - Related Story: Shipment Assignment and Dispatch

- **Create trip stop with delivery window**
  - Input: trip_id, location, expected_arrival, expected_departure
  - Expected: Stop created with time windows

#### Invalid Cases
- **Create stop for non-existent trip**
  - Expected: Foreign key error

- **Create stop with invalid sequence**
  - Expected: Sequence validation error

### 6.2 Update Trip Stop Tests

#### Valid Cases
- **Update stop status to "In Progress"**
  - Input: status = "In Progress", actual_arrival timestamp
  - Expected: Status updated with timestamp
  - Related Story: Shipment Assignment and Dispatch

- **Update stop status to "Completed"**
  - Input: status = "Completed", actual_departure timestamp
  - Expected: Status updated

- **Update stop with actual times**
  - Input: actual_arrival, actual_departure
  - Expected: Actual times recorded

- **Capture proof of delivery at stop**
  - Input: pod_signature or pod_photo, stop_id
  - Expected: POD recorded
  - Related Story: Proof of Delivery (POD)

#### Invalid Cases
- **Update non-existent stop**
  - Expected: Not found error

- **Update completed stop**
  - Expected: Error or warning

### 6.3 Trip Stop Query Tests

#### Search Trip Stops Query
- **Get all stops for trip**
  - Input: trip_id filter
  - Expected: All stops in trip order
  - Related Story: Shipment Assignment and Dispatch

- **Get stop by sequence number**
  - Input: trip_id, sequence_number
  - Expected: Specific stop

- **Get pending stops for trip**
  - Input: trip_id, status = "Pending"
  - Expected: Uncompleted stops

- **Get current stop for active trip**
  - Expected: Driver's current stop
  - Related Story: Real-Time GPS Tracking

---

## 7. Routes Test Cases

### 7.1 Create Route Tests

#### Valid Cases
- **Create route with waypoints**
  - Input: waypoints (array of locations), created_by
  - Expected: Route created with optimized path
  - Related Story: Route Optimization

- **Create route with shipments**
  - Input: shipment_ids (array), optimize=true
  - Expected: Route created with shipments sequenced

#### Invalid Cases
- **Create route without waypoints**
  - Expected: Validation error

- **Create route with single waypoint**
  - Expected: Error (need at least 2 points)

### 7.2 Update Route Tests

#### Valid Cases
- **Update route with reordered waypoints**
  - Input: new waypoint sequence
  - Expected: Route updated with new optimization

- **Update route estimated time/distance**
  - Expected: Metrics updated

#### Invalid Cases
- **Update non-existent route**
  - Expected: Not found error

### 7.3 Route Query Tests

#### Search Routes Query
- **Get optimized route for shipments**
  - Input: shipment_ids array
  - Expected: Optimal route with waypoints
  - Related Story: Route Optimization

- **Get route metrics**
  - Expected: total_distance, total_time, waypoint_count

- **Get route by ID**
  - Expected: Complete route details with directions

#### Route Analytics Query
- **Get most efficient routes (by distance)**
  - Expected: Routes ranked by efficiency
  - Related Story: Route Optimization

---

## 8. GPS Pings Test Cases

### 8.1 Create GPS Ping Tests

#### Valid Cases
- **Create GPS ping for active trip**
  - Input: vehicle_id, trip_id, latitude, longitude, timestamp
  - Expected: GPS location recorded
  - Related Story: Real-Time GPS Tracking

- **Create GPS ping with accuracy**
  - Input: lat, lon, accuracy_meters
  - Expected: Ping recorded with accuracy metadata

#### Invalid Cases
- **Create GPS ping without coordinates**
  - Expected: Validation error

- **Create GPS ping with invalid coordinates**
  - Expected: Geolocation validation error

### 8.2 GPS Ping Query Tests

#### Search GPS Pings Query
- **Get GPS trail for trip**
  - Input: trip_id
  - Expected: Chronological GPS points
  - Related Story: Real-Time GPS Tracking

- **Get current location for active vehicle**
  - Input: vehicle_id
  - Expected: Latest GPS ping
  - Related Story: Real-Time GPS Tracking

- **Get GPS history for date range**
  - Input: vehicle_id, date_start, date_end
  - Expected: All pings in timeframe

#### GPS Analytics Query
- **Get active vehicles on live map**
  - Expected: Real-time vehicle locations
  - Related Story: Real-Time GPS Tracking

- **Detect route deviation**
  - Input: trip_id, deviation_threshold_meters
  - Expected: Pings outside planned route
  - Related Story: Real-Time GPS Tracking

---

## 9. Geofences Test Cases

### 9.1 Create Geofence Tests

#### Valid Cases
- **Create geofence with polygon**
  - Input: name, coordinates (array of lat/lon), type (e.g., "Warehouse", "Customer")
  - Expected: Geofence created with boundary
  - Related Story: Geofencing and Automated Alerts

- **Create geofence with alert settings**
  - Input: name, coordinates, alert_on_enter, alert_on_exit
  - Expected: Geofence with alert configuration
  - Related Story: Geofencing and Automated Alerts

#### Invalid Cases
- **Create geofence without name**
  - Expected: Validation error

- **Create geofence without coordinates**
  - Expected: Validation error

- **Create geofence with less than 3 points**
  - Expected: Polygon validation error

### 9.2 Update Geofence Tests

#### Valid Cases
- **Update geofence boundaries**
  - Input: new coordinates
  - Expected: Boundary updated

- **Update geofence alerts**
  - Input: alert_on_enter, alert_on_exit
  - Expected: Alert settings updated

#### Invalid Cases
- **Update non-existent geofence**
  - Expected: Not found error

### 9.3 Delete Geofence Tests

#### Valid Cases
- **Delete geofence**
  - Expected: Geofence deleted

### 9.4 Geofence Query Tests

#### Search Geofences Query
- **Get all geofences**
  - Expected: List of all geofences
  - Related Story: Geofencing and Automated Alerts

- **Get geofences for location type**
  - Input: type = "Warehouse"
  - Expected: Geofences of specified type

- **Get geofence by name**
  - Expected: Specific geofence

---

## 10. Geofence Events Test Cases

### 10.1 Create Geofence Event Tests

#### Valid Cases
- **Create geofence entry event**
  - Input: geofence_id, vehicle_id, event_type="ENTER", timestamp
  - Expected: Event logged
  - Related Story: Geofencing and Automated Alerts

- **Create geofence exit event**
  - Input: geofence_id, vehicle_id, event_type="EXIT", timestamp
  - Expected: Event logged
  - Related Story: Geofencing and Automated Alerts

#### Invalid Cases
- **Create event for non-existent geofence**
  - Expected: Foreign key error

- **Create event for non-existent vehicle**
  - Expected: Foreign key error

### 10.2 Geofence Event Query Tests

#### Search Geofence Events Query
- **Get events for geofence**
  - Input: geofence_id
  - Expected: All entry/exit events for geofence
  - Related Story: Geofencing and Automated Alerts

- **Get events for vehicle**
  - Input: vehicle_id
  - Expected: All geofence events for vehicle

- **Get recent events (last 24 hours)**
  - Expected: Recent geofence crossings
  - Related Story: Geofencing and Automated Alerts

- **Get entry events only**
  - Input: event_type = "ENTER"
  - Expected: Only entry events

- **Get exit events only**
  - Input: event_type = "EXIT"
  - Expected: Only exit events

---

## 11. Proof of Deliveries (POD) Test Cases

### 11.1 Create POD Tests

#### Valid Cases
- **Create POD with signature**
  - Input: trip_stop_id, pod_type="SIGNATURE", signature_image_base64
  - Expected: Signature POD created
  - Related Story: Proof of Delivery (POD)

- **Create POD with photo**
  - Input: trip_stop_id, pod_type="PHOTO", photo_image_base64, geolocation
  - Expected: Photo POD created with geotag and timestamp
  - Related Story: Proof of Delivery (POD)

- **Create POD with recipient info**
  - Input: trip_stop_id, pod_type, signature, recipient_name
  - Expected: POD with recipient details
  - Related Story: Proof of Delivery (POD)

#### Invalid Cases
- **Create POD without trip stop**
  - Expected: Validation error

- **Create POD with invalid pod_type**
  - Expected: Validation error (only: SIGNATURE, PHOTO, PHOTO_WITH_SIGNATURE)

- **Create POD for non-existent trip stop**
  - Expected: Foreign key error

### 11.2 POD Query Tests

#### Search POD Query
- **Get POD for trip stop**
  - Input: trip_stop_id
  - Expected: POD with proof data
  - Related Story: Proof of Delivery (POD)

- **Get all PODs for trip**
  - Input: trip_id
  - Expected: All proofs of delivery for trip

- **Get POD by type**
  - Input: pod_type filter
  - Expected: PODs of specified type

---

## 12. Expenses Test Cases

### 12.1 Create Expense Tests

#### Valid Cases
- **Create fuel expense**
  - Input: driver_id, trip_id, expense_type="FUEL", amount, receipt_image
  - Expected: Expense created
  - Related Story: Fuel and Expense Tracking

- **Create toll expense**
  - Input: driver_id, trip_id, expense_type="TOLL", amount, location
  - Expected: Toll expense recorded

- **Create maintenance expense**
  - Input: driver_id, trip_id, expense_type="MAINTENANCE", amount, receipt_image
  - Expected: Maintenance expense recorded

- **Create expense with receipt**
  - Input: expense data + receipt_image (base64)
  - Expected: Expense stored with receipt
  - Related Story: Fuel and Expense Tracking

#### Invalid Cases
- **Create expense without amount**
  - Expected: Validation error

- **Create expense with negative amount**
  - Expected: Validation error

- **Create expense with invalid type**
  - Expected: Validation error

- **Create expense for non-existent driver**
  - Expected: Foreign key error

### 12.2 Update Expense Tests

#### Valid Cases
- **Update expense status to "Submitted"**
  - Input: status = "Submitted"
  - Expected: Submitted for approval
  - Related Story: Fuel and Expense Tracking

- **Update expense status to "Approved"**
  - Input: status = "Approved", approved_by, approved_at
  - Expected: Expense approved with approver info
  - Related Story: Fuel and Expense Tracking

- **Update expense status to "Rejected"**
  - Input: status = "Rejected", rejection_reason
  - Expected: Expense rejected with reason
  - Related Story: Fuel and Expense Tracking

- **Update expense amount**
  - Expected: Amount updated

#### Invalid Cases
- **Update non-existent expense**
  - Expected: Not found error

- **Update approved expense**
  - Expected: Error (approved expenses immutable)

### 12.3 Expense Query Tests

#### Search Expenses Query
- **Get expenses for driver**
  - Input: driver_id
  - Expected: All expenses for driver
  - Related Story: Fuel and Expense Tracking

- **Get pending expenses (status = "Submitted")**
  - Expected: Expenses awaiting approval
  - Related Story: Fuel and Expense Tracking

- **Get approved expenses**
  - Input: status = "Approved"
  - Expected: Approved expenses

- **Get expenses by type**
  - Input: expense_type filter
  - Expected: Expenses of specified type

- **Get expenses for date range**
  - Input: date_start, date_end
  - Expected: Expenses created in timeframe

#### Expense Analytics Query
- **Get total expenses by driver**
  - Expected: Spending per driver
  - Related Story: Driver Performance Analytics

- **Get total expenses by type**
  - Expected: Breakdown by expense type (Fuel, Tolls, etc.)

- **Get average expense per trip**
  - Expected: Mean expense value

---

## 13. Carriers Test Cases

### 13.1 Create Carrier Tests

#### Valid Cases
- **Create carrier with required fields**
  - Input: company_name, contact_name, email, phone
  - Expected: Carrier created
  - Related Story: Third-Party Carrier Management

- **Create carrier with services**
  - Input: company_name, contact_info, services (array)
  - Expected: Carrier created with service types
  - Related Story: Third-Party Carrier Management

- **Create carrier with API integration details**
  - Input: carrier_data, api_endpoint, api_key
  - Expected: Carrier with integration details
  - Related Story: Third-Party Carrier Management

#### Invalid Cases
- **Create carrier without company_name**
  - Expected: Validation error

- **Create carrier without contact information**
  - Expected: Validation error

- **Create carrier with duplicate company name**
  - Expected: Duplicate check error

### 13.2 Update Carrier Tests

#### Valid Cases
- **Update carrier contact information**
  - Expected: Contact details updated

- **Update carrier services**
  - Input: new services array
  - Expected: Services updated

- **Update carrier rate card**
  - Expected: Rates updated

#### Invalid Cases
- **Update non-existent carrier**
  - Expected: Not found error

### 13.3 Carrier Query Tests

#### Search Carriers Query
- **Get all carriers**
  - Expected: List of all carriers
  - Related Story: Third-Party Carrier Management

- **Get carriers by service**
  - Input: service type filter
  - Expected: Carriers offering service
  - Related Story: Third-Party Carrier Management

- **Get carrier by name**
  - Expected: Specific carrier

---

## 14. Carrier Rates Test Cases

### 14.1 Create Carrier Rate Tests

#### Valid Cases
- **Create carrier rate for route**
  - Input: carrier_id, origin, destination, base_rate, per_km_rate
  - Expected: Rate card entry created
  - Related Story: Third-Party Carrier Management

- **Create carrier rate for service**
  - Input: carrier_id, service_type, rate
  - Expected: Service rate recorded

#### Invalid Cases
- **Create rate for non-existent carrier**
  - Expected: Foreign key error

- **Create rate with negative amount**
  - Expected: Validation error

### 14.2 Update Carrier Rate Tests

#### Valid Cases
- **Update carrier rate**
  - Input: new base_rate or per_km_rate
  - Expected: Rate updated
  - Related Story: Third-Party Carrier Management

#### Invalid Cases
- **Update non-existent rate**
  - Expected: Not found error

### 14.3 Carrier Rate Query Tests

#### Search Carrier Rates Query
- **Get rates for carrier**
  - Input: carrier_id
  - Expected: All rates for carrier

- **Get rate for route**
  - Input: carrier_id, origin, destination
  - Expected: Specific route rate
  - Related Story: Third-Party Carrier Management

---

## 15. Shipment Legs Test Cases

### 15.1 Create Shipment Leg Tests

#### Valid Cases
- **Create shipment leg for internal trip**
  - Input: shipment_id, leg_number, origin, destination, carrier_type="INTERNAL", trip_id
  - Expected: Leg created linked to trip
  - Related Story: Multi-Leg Shipment Planning

- **Create shipment leg for third-party carrier**
  - Input: shipment_id, leg_number, origin, destination, carrier_type="EXTERNAL", carrier_id, estimated_cost
  - Expected: Leg created with carrier assignment
  - Related Story: Multi-Leg Shipment Planning

- **Create shipment leg with expected timeline**
  - Input: leg_data, expected_start_date, expected_end_date
  - Expected: Leg with timeline

#### Invalid Cases
- **Create leg without shipment**
  - Expected: Validation error

- **Create leg without origin/destination**
  - Expected: Validation error

- **Create leg for non-existent shipment**
  - Expected: Foreign key error

### 15.2 Update Shipment Leg Tests

#### Valid Cases
- **Update leg status to "In Transit"**
  - Input: status = "In Transit"
  - Expected: Status updated
  - Related Story: Multi-Leg Shipment Planning

- **Update leg status to "Delivered"**
  - Input: status = "Delivered"
  - Expected: Status updated

- **Update leg actual cost**
  - Input: actual_cost
  - Expected: Cost recorded for billing

#### Invalid Cases
- **Update non-existent leg**
  - Expected: Not found error

### 15.3 Shipment Leg Query Tests

#### Search Shipment Legs Query
- **Get legs for shipment**
  - Input: shipment_id
  - Expected: All legs in sequence
  - Related Story: Multi-Leg Shipment Planning

- **Get leg by sequence number**
  - Input: shipment_id, leg_number
  - Expected: Specific leg

- **Get legs for carrier**
  - Input: carrier_id
  - Expected: All legs assigned to carrier

---

## 16. Shipment Leg Events Test Cases

### 16.1 Create Shipment Leg Event Tests

#### Valid Cases
- **Create leg event from carrier API**
  - Input: leg_id, event_type, timestamp, event_data (carrier-specific)
  - Expected: Event logged
  - Related Story: Integrating Third-Party Tracking Data

- **Create leg event for status change**
  - Input: leg_id, event_type="STATUS_CHANGE", new_status
  - Expected: Event recorded
  - Related Story: Integrating Third-Party Tracking Data

#### Invalid Cases
- **Create event for non-existent leg**
  - Expected: Foreign key error

### 16.2 Shipment Leg Event Query Tests

#### Search Shipment Leg Events Query
- **Get events for leg**
  - Input: leg_id
  - Expected: All events in chronological order
  - Related Story: Integrating Third-Party Tracking Data

- **Get event history for shipment**
  - Input: shipment_id
  - Expected: All leg events for shipment
  - Related Story: Integrating Third-Party Tracking Data

- **Get events from specific carrier**
  - Input: carrier_id
  - Expected: Events from carrier's updates

---

## 17. Partner Invoices Test Cases

### 17.1 Create Partner Invoice Tests

#### Valid Cases
- **Create partner invoice**
  - Input: carrier_id, invoice_number, invoice_date, total_amount
  - Expected: Invoice created for reconciliation
  - Related Story: Managing Partner Costs and Invoices

- **Create invoice with line items**
  - Input: carrier_id, invoice_data, line_items (array of shipment legs)
  - Expected: Invoice with associated legs
  - Related Story: Managing Partner Costs and Invoices

#### Invalid Cases
- **Create invoice without carrier**
  - Expected: Validation error

- **Create invoice with duplicate invoice_number for carrier**
  - Expected: Duplicate check error

### 17.2 Update Partner Invoice Tests

#### Valid Cases
- **Update invoice status to "Received"**
  - Input: status = "Received"
  - Expected: Status updated

- **Update invoice status to "Reconciled"**
  - Input: status = "Reconciled"
  - Expected: Status updated with reconciliation timestamp
  - Related Story: Managing Partner Costs and Invoices

- **Update invoice with reconciled amounts**
  - Input: reconciled_amount, variance
  - Expected: Reconciliation data recorded

#### Invalid Cases
- **Update non-existent invoice**
  - Expected: Not found error

### 17.3 Partner Invoice Query Tests

#### Search Partner Invoices Query
- **Get invoices for carrier**
  - Input: carrier_id
  - Expected: All invoices from carrier
  - Related Story: Managing Partner Costs and Invoices

- **Get pending invoices (status != "Reconciled")**
  - Expected: Invoices needing reconciliation
  - Related Story: Managing Partner Costs and Invoices

- **Get reconciled invoices**
  - Input: status = "Reconciled"
  - Expected: Processed invoices

---

## 18. Partner Invoice Items Test Cases

### 18.1 Create Invoice Item Tests

#### Valid Cases
- **Create invoice line item**
  - Input: invoice_id, shipment_leg_id, billed_amount, description
  - Expected: Line item created
  - Related Story: Managing Partner Costs and Invoices

#### Invalid Cases
- **Create item for non-existent invoice**
  - Expected: Foreign key error

### 18.2 Update Invoice Item Tests

#### Valid Cases
- **Update line item with reconciled amount**
  - Input: reconciled_amount
  - Expected: Amount updated
  - Related Story: Managing Partner Costs and Invoices

- **Update line item status**
  - Expected: Status updated

#### Invalid Cases
- **Update non-existent item**
  - Expected: Not found error

### 18.3 Invoice Item Query Tests

#### Search Invoice Item Query
- **Get items for invoice**
  - Input: invoice_id
  - Expected: All line items
  - Related Story: Managing Partner Costs and Invoices

- **Get discrepancies in invoice**
  - Expected: Items where billed != recorded amount
  - Related Story: Managing Partner Costs and Invoices

---

## 19. Cross-Entity Integration Tests

### 19.1 Trip Planning & Dispatch Flow
- **Complete trip creation workflow**
  - Steps:
    1. Create route from shipments
    2. Assign driver and vehicle
    3. Create trip with route stops
    4. Dispatch notification to driver
  - Expected: Trip ready for execution
  - Related Story: Shipment Assignment and Dispatch

### 19.2 Trip Execution & GPS Tracking
- **Real-time trip tracking workflow**
  - Steps:
    1. Start trip (status = "In Transit")
    2. Generate GPS pings at intervals
    3. Update trip stops as completed
    4. Monitor geofence events
  - Expected: Live tracking data available
  - Related Story: Real-Time GPS Tracking

### 19.3 Proof of Delivery & Expense Logging
- **Complete delivery workflow**
  - Steps:
    1. Arrive at stop
    2. Capture POD (signature/photo)
    3. Log trip stop as completed
    4. Log fuel/toll expenses
  - Expected: Delivery completed with proof and expenses
  - Related Story: Proof of Delivery (POD), Fuel and Expense Tracking

### 19.4 Multi-Leg Shipment Tracking
- **Multi-leg shipment execution**
  - Steps:
    1. Create shipment with multiple legs
    2. Assign internal leg to trip
    3. Assign external leg to carrier
    4. Receive carrier API updates
    5. Track unified shipment status
  - Expected: Seamless multi-leg tracking
  - Related Story: Multi-Leg Shipment Planning, Integrating Third-Party Tracking Data

### 19.5 Route Optimization & Dispatch
- **Optimized route creation and dispatch**
  - Steps:
    1. Collect multiple shipments
    2. Request route optimization
    3. Create trip from optimized route
    4. Assign to driver with notification
    5. Driver receives turn-by-turn directions
  - Expected: Optimized route ready for execution
  - Related Story: Route Optimization

### 19.6 Expense Approval & Reimbursement
- **Driver expense workflow**
  - Steps:
    1. Driver logs expense with receipt
    2. Expense submitted for approval
    3. Manager reviews and approves
    4. Approved expenses included in payroll
  - Expected: Expense fully processed
  - Related Story: Fuel and Expense Tracking

### 19.7 Carrier Invoice Reconciliation
- **Partner invoice reconciliation workflow**
  - Steps:
    1. Create shipment legs with carriers
    2. Receive tracking updates
    3. Receive partner invoice
    4. Match invoice items to shipment legs
    5. Flag discrepancies
  - Expected: Invoice reconciled with variance notes
  - Related Story: Managing Partner Costs and Invoices

### 19.8 Driver License & Vehicle Maintenance Alerts
- **Alert management workflow**
  - Steps:
    1. Driver license expiring in 30 days
    2. System generates alert
    3. Manager notifies driver
    4. Vehicle due for maintenance
    5. System prevents dispatch of unmaintained vehicle
  - Expected: Alerts triggered and managed
  - Related Story: Driver Profile Management, Vehicle Fleet Management

### 19.9 Performance Analytics Dashboard
- **Performance data collection and reporting**
  - Steps:
    1. Complete multiple trips with PODs
    2. Log expenses
    3. Generate analytics dashboard
    4. Compare driver metrics
    5. Identify top performers
  - Expected: Analytics available for performance review
  - Related Story: Driver Performance Analytics

---

## 20. Performance and Edge Cases

### 20.1 Real-Time GPS Accuracy
- **High-frequency GPS tracking**
  - 100+ GPS pings per active vehicle
  - Expected: Efficient storage and retrieval

### 20.2 Multi-Stop Route Optimization
- **Complex multi-stop optimization**
  - 50+ stops in single route
  - Expected: Optimal sequencing within reasonable time

### 20.3 Concurrent Trip Updates
- **Multiple stop completions simultaneously**
  - Expected: No data corruption, atomic updates

### 20.4 Geofence Boundary Precision
- **Vehicle crossing geofence boundary multiple times**
  - Expected: Each entry/exit logged accurately

### 20.5 Large Invoice Reconciliation
- **Invoice with 1000+ line items**
  - Expected: Efficient matching and discrepancy detection

### 20.6 Driver Schedule Conflicts
- **Overlapping trip assignments**
  - Expected: Conflict detection and prevention

### 20.7 Carrier Rate Calculation
- **Complex multi-leg cost calculation**
  - Expected: Accurate cost aggregation

---

## 21. Error Handling Tests

### 21.1 Invalid Input
- **Non-numeric values in numeric fields**
- **Invalid geolocation coordinates**
- **Malformed date/time values**
- **Empty required fields**

### 21.2 Business Logic Errors
- **Assign unavailable vehicle to trip**
- **Dispatch trip for unlicensed driver**
- **Update completed trip**
- **Delete active trip**

### 21.3 Concurrency Issues
- **Simultaneous trip status updates**
- **Overlapping geofence events**
- **Duplicate expense submissions**

### 21.4 Authorization Errors
- **Driver viewing other driver's trips**
- **Dispatcher updating manager-only fields**
- **Third party accessing unauthorized shipment data**

---

## 22. Real-Time and Async Tests

### 22.1 Real-Time GPS Streaming
- **Live map updates as GPS pings arrive**
- **Expected**: Sub-second latency for GPS updates
- **Related Story**: Real-Time GPS Tracking

### 22.2 Geofence Alert Delivery
- **In-app notification on geofence entry/exit**
- **Expected**: Alert delivered within seconds
- **Related Story**: Geofencing and Automated Alerts

### 22.3 Async Carrier API Integration
- **Receive tracking updates from partner APIs**
- **Expected**: Updates processed and reflected in shipment status
- **Related Story**: Integrating Third-Party Tracking Data

---

## Test Implementation Guidelines

### Naming Convention
- `[EntityName]_[Operation]_[Scenario]`
- Example: `Driver_Create_WithFullInfo`, `Trip_Update_StatusToInTransit`, `Expense_Search_ByDriver`

### Test Organization
- Group tests by entity (folder structure)
- Within each entity, organize by operation type (Create, Update, Delete, Query)
- Use descriptive test names that indicate success/failure scenario

### Setup/Teardown
- Use `beforeAll` to create dependent entities (drivers, vehicles)
- Use `afterEach` or `afterAll` to clean up test data
- Consider transaction rollback for isolation

### Assertions
- Test response structure (expected fields present)
- Test response values (correct data returned)
- Test error messages (appropriate error for failure cases)
- Test side effects (related data created/updated)

### Test Data
- Use realistic driver/vehicle data
- Generate unique values (license numbers, registration numbers)
- Use factories or builders for complex objects
- Use geolocation coordinates for real locations (or realistic examples)

---

## Related Documentation

- **Data Flow**: `@docs/dataflow/tms.md` - Understand entity relationships and workflows
- **User Stories**: `@docs/stories/tms.md` - Business context for test scenarios
- **Schema**: `@packages/graphql/src/schema/tms.graphql` - GraphQL type definitions
- **Existing Tests**: `@packages/graphql/tests/client/tms/` - Reference implementations
