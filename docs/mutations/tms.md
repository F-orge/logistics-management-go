# TMS Mutations Plan

> **Domain Description**: The Transportation Management System (TMS) manages all aspects of physical goods movement, including fleet management, driver scheduling, trip planning and execution, real-time tracking, and third-party carrier coordination.

### Overview

This document outlines the mutation strategy for all TMS entities. Each entity includes Create, Update, and Delete mutation specifications with field-level metadata for frontend form generation and PocketBase backend operations.

### Key Principles

- **Atomic Operations**: Trip creation is an atomic operation that includes assigning a driver, vehicle, and a sequence of stops.
- **Status-Driven Workflows**: Entity statuses (e.g., `Trip.status`, `Vehicle.status`) dictate available actions and follow a strict lifecycle.
- **Real-Time Updates**: Driver and vehicle locations are updated in real-time, triggering geofence events and providing live tracking.
- **Ownership & Roles**: Access to operations is controlled by user roles (e.g., Transport Manager, Fleet Manager, Dispatcher, Driver).
- **Data Integrity**: Immutable fields (e.g., `TripStop` completion timestamps) and soft deletes are used to maintain a reliable audit trail.

### Related Domains

- **Warehouse Management (WMS)**: Shipments from WMS are the primary input for creating trips.
- **Billing Management**: Approved driver expenses and partner carrier invoices are forwarded to the billing system for payment.
- **Customer Relations (CRM)**: Delivery status updates can be linked back to customer-facing orders.

---

## Drivers

### Overview

**Purpose**: Manages driver profiles, including their qualifications, contact information, and operational status. This entity links a `User` record to a driver-specific role.

**Key Relationships**:
- Belongs to: `Users` (one-to-one)
- Has many: `DriverSchedules`, `Trips`, `Expenses`

**User Roles Involved**: Transport Manager, Admin

### Create Mutation

#### Required Fields

- **user**
  - Type: `relation: Users`
  - Label: "User Account"
  - Description: "The system user account for this driver."
  - Tooltip: "Select a user with the 'driver' role."
  - Constraints: Required, must be unique.

- **licenseNumber**
  - Type: `string`
  - Label: "Driver's License Number"
  - Description: "The official driver's license number."
  - Tooltip: "Must match the physical license."
  - Constraints: Required, unique.

- **status**
  - Type: `enum: ['active', 'inactive', 'on-leave']`
  - Label: "Driver Status"
  - Description: "The driver's current operational status."
  - Tooltip: "'Active' drivers are available for trip assignments."
  - Constraints: Required, defaults to 'active'.

#### Optional Fields

- **licenseExpiryDate**
  - Type: `date`
  - Label: "License Expiry Date"
  - Description: "The expiration date of the driver's license."
  - Tooltip: "The system will generate alerts for upcoming expirations."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **licenseNumber**: Can be updated for corrections.
- **licenseExpiryDate**: Can be updated.
- **status**: Can be updated. Side effect: If set to 'inactive' or 'on-leave', the driver cannot be assigned to new trips.

#### Immutable Fields

- **user**: Cannot be changed after creation to maintain a stable link between a driver and their user account.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Transport Manager or Admin.
- **State Constraints**: Cannot delete a driver who is currently 'on-trip'.
- **Reference Constraints**: Cannot delete if associated with trips within the last 90 days.

#### Recommended Deletion Strategy

- **Soft Delete**: Set `status` to 'inactive'. This preserves historical data and prevents the driver from being assigned to new trips while maintaining their record for analytics.

---

## Driver Schedules

### Overview

**Purpose**: Manages driver availability by tracking periods of leave or unavailability.

**Key Relationships**:
- Belongs to: `Drivers`

**User Roles Involved**: Transport Manager, Driver (view-only)

### Create Mutation

#### Required Fields

- **driver**
  - Type: `relation: Drivers`
  - Label: "Driver"
  - Description: "The driver this schedule applies to."
  - Tooltip: "Select the driver who will be unavailable."
  - Constraints: Required.

- **startDate**
  - Type: `date`
  - Label: "Start Date"
  - Description: "The first day the driver is unavailable."
  - Tooltip: "Must be today or in the future."
  - Constraints: Required.

- **endDate**
  - Type: `date`
  - Label: "End Date"
  - Description: "The last day the driver is unavailable."
  - Tooltip: "Must be on or after the start date."
  - Constraints: Required, must be >= `startDate`.

#### Optional Fields

- **reason**
  - Type: `enum: ['vacation', 'sick-leave', 'training', 'personal-leave']`
  - Label: "Reason for Absence"
  - Description: "The reason for the driver's unavailability."
  - Tooltip: "Provides context for scheduling."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **startDate**: Can be updated.
- **endDate**: Can be updated.
- **reason**: Can be updated.

#### Immutable Fields

- **driver**: Cannot be changed. To move a schedule, delete and create a new one.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Transport Manager.
- **Constraints**: Can be deleted freely. Deleting a schedule makes the driver available again for that period unless their status is 'inactive' or 'on-leave'.

---

## Vehicles

### Overview

**Purpose**: Manages the company's fleet of vehicles, including their specifications, status, and maintenance history.

**Key Relationships**:
- Has many: `VehicleMaintenance`, `Trips`, `GpsPings`

**User Roles Involved**: Fleet Manager, Admin

### Create Mutation

#### Required Fields

- **registrationNumber**
  - Type: `string`
  - Label: "Registration Number"
  - Description: "The official vehicle registration or license plate number."
  - Tooltip: "Must be unique across the entire fleet."
  - Constraints: Required, unique.

- **status**
  - Type: `enum: ['available', 'in-maintenance', 'on-trip', 'out-of-service']`
  - Label: "Vehicle Status"
  - Description: "The current operational status of the vehicle."
  - Tooltip: "'Available' vehicles can be assigned to trips."
  - Constraints: Required, defaults to 'available'.

#### Optional Fields

- **model**
  - Type: `string`
  - Label: "Vehicle Model"
  - Description: "The make and model of the vehicle (e.g., 'Ford Transit')."
  - Tooltip: "Helps in identifying vehicle types."
  - Constraints: Optional.

- **capacityWeight**
  - Type: `number`
  - Label: "Capacity (Weight)"
  - Description: "The maximum weight capacity of the vehicle in kilograms."
  - Tooltip: "Used for matching vehicles to shipment requirements."
  - Constraints: Optional, must be >= 0.

- **capacityVolume**
  - Type: `number`
  - Label: "Capacity (Volume)"
  - Description: "The maximum volume capacity of the vehicle in cubic meters."
  - Tooltip: "Used for matching vehicles to shipment requirements."
  - Constraints: Optional, must be >= 0.

### Update Mutation

#### Mutable Fields

- **registrationNumber**: Can be updated for corrections.
- **model**: Can be updated.
- **status**: Can be updated. If set to 'in-maintenance' or 'out-of-service', the vehicle cannot be assigned to new trips.
- **capacityWeight**: Can be updated.
- **capacityVolume**: Can be updated.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Fleet Manager or Admin.
- **State Constraints**: Cannot delete a vehicle that is currently 'on-trip'.
- **Reference Constraints**: Cannot delete if associated with trips in the last year.

#### Recommended Deletion Strategy

- **Soft Delete**: Set `status` to 'out-of-service'. This is the recommended approach to preserve the vehicle's history for analytics and compliance.

---

## Vehicle Maintenance

### Overview

**Purpose**: Logs all maintenance activities for each vehicle, creating a service history.

**Key Relationships**:
- Belongs to: `Vehicles`

**User Roles Involved**: Fleet Manager

### Create Mutation

#### Required Fields

- **vehicle**
  - Type: `relation: Vehicles`
  - Label: "Vehicle"
  - Description: "The vehicle that was serviced."
  - Tooltip: "Select the vehicle from the fleet."
  - Constraints: Required.

- **serviceDate**
  - Type: `date`
  - Label: "Service Date"
  - Description: "The date the maintenance was performed."
  - Tooltip: "Must be today or in the past."
  - Constraints: Required.

- **serviceType**
  - Type: `string`
  - Label: "Service Type"
  - Description: "The type of service performed (e.g., 'Oil Change', 'Tire Rotation')."
  - Tooltip: "A brief description of the maintenance activity."
  - Constraints: Required.

#### Optional Fields

- **cost**
  - Type: `number`
  - Label: "Maintenance Cost"
  - Description: "The total cost of the service."
  - Tooltip: "Used for financial tracking."
  - Constraints: Optional, must be >= 0.

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Detailed notes about the service, including parts replaced or observations."
  - Tooltip: "Provide as much detail as possible for future reference."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **serviceDate**: Can be updated.
- **serviceType**: Can be updated.
- **cost**: Can be updated.
- **notes**: Can be updated.

#### Immutable Fields

- **vehicle**: Cannot be changed. To reassign a maintenance log, it must be deleted and recreated.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Fleet Manager.
- **Constraints**: Can be deleted freely. Deletion should be restricted to correcting errors.

---

## Trips

### Overview

**Purpose**: Represents a single, planned journey for a driver and vehicle, containing a sequence of stops for pickups or deliveries. It acts as the central record for an operational tour of duty.

**Key Relationships**:
- Belongs to: `Driver`, `Vehicle`
- Has many: `TripStops`, `TransportManagementExpenses`

**User Roles Involved**: Dispatcher, Transport Manager, Driver

### Create Mutation

#### Required Fields

- **driver**
  - Type: `relation: Drivers`
  - Label: "Assigned Driver"
  - Description: "The driver responsible for executing the trip."
  - Tooltip: "Must be an 'active' driver with no conflicting schedules."
  - Constraints: Required.

- **vehicle**
  - Type: `relation: Vehicles`
  - Label: "Assigned Vehicle"
  - Description: "The vehicle to be used for the trip."
  - Tooltip: "Must be an 'available' vehicle."
  - Constraints: Required.

- **status**
  - Type: `enum: ['planned', 'in-progress', 'completed', 'cancelled']`
  - Label: "Trip Status"
  - Description: "The current lifecycle stage of the trip."
  - Tooltip: "Starts as 'planned' and progresses based on driver actions."
  - Constraints: Required, defaults to 'planned'.

### Update Mutation

#### Mutable Fields

- **driver**: Can be updated, but only if the trip status is 'planned'.
- **vehicle**: Can be updated, but only if the trip status is 'planned'.
- **status**: Can be updated according to the workflow (e.g., a driver starting the trip moves it to 'in-progress').

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Dispatcher or Transport Manager.
- **State Constraints**: A trip can only be deleted if its status is 'planned'. Once 'in-progress', it must be 'cancelled' instead.
- **Cascading Behavior**: Deleting a trip should also delete all its associated `TripStops`.

---

## Trip Stops

### Overview

**Purpose**: Represents a single destination within a trip, such as a pickup, delivery, or waypoint. Each stop has its own status and is completed in a specific sequence.

**Key Relationships**:
- Belongs to: `Trips`
- Can relate to: `WarehouseManagementShipments` (for pickups), `DeliveryManagementTasks` (for deliveries)
- Has one: `TransportManagementProofOfDeliveries`

**User Roles Involved**: Dispatcher, Driver

### Create Mutation

#### Required Fields

- **trip**
  - Type: `relation: Trips`
  - Label: "Parent Trip"
  - Description: "The trip this stop belongs to."
  - Constraints: Required.

- **sequence**
  - Type: `number`
  - Label: "Stop Sequence"
  - Description: "The order of this stop within the trip (e.g., 1, 2, 3)."
  - Tooltip: "Determines the route order."
  - Constraints: Required, must be a positive integer.

- **status**
  - Type: `enum: ['pending', 'arrived', 'completed', 'skipped']`
  - Label: "Stop Status"
  - Description: "The current status of the delivery or pickup at this stop."
  - Tooltip: "Updated by the driver via the mobile app."
  - Constraints: Required, defaults to 'pending'.

#### Optional Fields

- **address**
  - Type: `string`
  - Label: "Address"
  - Description: "The physical address for this stop."
  - Tooltip: "e.g., '123 Main St, Anytown, USA'."
  - Constraints: Optional, but highly recommended.

- **shipment**
  - Type: `relation: Shipments`
  - Label: "Related Shipment"
  - Description: "The specific shipment to be picked up or delivered at this stop."
  - Constraints: Optional.

- **estimatedArrivalTime**
  - Type: `datetime`
  - Label: "Estimated Arrival Time"
  - Description: "The ETA provided by the route optimization engine."
  - Constraints: Optional.

- **estimatedDepartureTime**
  - Type: `datetime`
  - Label: "Estimated Departure Time"
  - Description: "The estimated departure time after completing the stop's tasks."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **status**: Can be updated by the driver (e.g., from 'pending' to 'arrived').
- **actualArrivalTime**: Set automatically when the driver marks themselves as 'arrived'.
- **actualDepartureTime**: Set automatically when the driver marks the stop as 'completed'.
- **address**: Can be updated by a dispatcher before the trip is 'in-progress'.

#### Immutable Fields

- **trip**: Cannot be changed.
- **sequence**: Cannot be changed once the trip is 'in-progress'.
- **shipment**: Cannot be changed once set.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Dispatcher.
- **State Constraints**: Can only be deleted if the parent trip's status is 'planned'.

---

## Carriers

### Overview

**Purpose**: Manages a directory of third-party transport providers (carriers), including their contact details, services, and rate structures. This is essential for multi-leg shipments involving external partners.

**Key Relationships**:
- Has many: `CarrierRates`, `ShipmentLegs`

**User Roles Involved**: Logistics Manager, Admin

### Create Mutation

#### Required Fields

- **name**
  - Type: `string`
  - Label: "Carrier Name"
  - Description: "The official name of the third-party carrier company."
  - Tooltip: "e.g., 'Global Shipping Co.', 'Local Couriers Inc.'"
  - Constraints: Required, unique.

#### Optional Fields

- **contactDetails**
  - Type: `string (HTML)`
  - Label: "Contact Details"
  - Description: "Contact information for the carrier, such as phone, email, and address."
  - Tooltip: "Can include multiple points of contact."
  - Constraints: Optional.

- **serviceOffered**
  - Type: `string (HTML)`
  - Label: "Services Offered"
  - Description: "A description of the transport services the carrier provides (e.g., 'Ocean Freight', 'Air Cargo', 'Last-Mile Delivery')."
  - Tooltip: "Helps in selecting the right partner for a shipment leg."
  - Constraints: Optional.

- **image**
  - Type: `file`
  - Label: "Carrier Logo"
  - Description: "The carrier's company logo."
  - Tooltip: "Used for display purposes in the UI."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **name**: Can be updated.
- **contactDetails**: Can be updated.
- **serviceOffered**: Can be updated.
- **image**: Can be updated.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Logistics Manager or Admin.
- **Reference Constraints**: Cannot delete a carrier that is assigned to any `ShipmentLegs`.
- **Recommended Deletion Strategy**: Soft delete by adding an `is_active` flag. This preserves historical data while preventing the carrier from being assigned to new shipment legs.

---

## Carrier Rates

### Overview

**Purpose**: Stores the pricing information for services offered by third-party carriers. Rates can be defined based on origin, destination, service type, and unit of measurement.

**Key Relationships**:
- Belongs to: `Carriers`

**User Roles Involved**: Logistics Manager

### Create Mutation

#### Required Fields

- **carrier**
  - Type: `relation: Carriers`
  - Label: "Carrier"
  - Description: "The carrier this rate belongs to."
  - Constraints: Required.

- **origin**
  - Type: `string`
  - Label: "Origin"
  - Description: "The starting point for this rate (e.g., a city, port, or country)."
  - Constraints: Required.

- **destination**
  - Type: `string`
  - Label: "Destination"
  - Description: "The ending point for this rate."
  - Constraints: Required.

- **rate**
  - Type: `number`
  - Label: "Rate"
  - Description: "The cost for the service."
  - Tooltip: "The numeric value of the rate."
  - Constraints: Required, must be >= 0.

#### Optional Fields

- **serviceType**
  - Type: `string`
  - Label: "Service Type"
  - Description: "The specific service this rate applies to (e.g., 'Express Air', 'Standard LTL')."
  - Tooltip: "Allows for multiple rates between the same origin and destination."
  - Constraints: Optional.

- **unit**
  - Type: `enum: ['per-kg', 'per-container', 'per-mile', 'per-km', 'flat-rate']`
  - Label: "Unit of Measurement"
  - Description: "The unit the rate is based on."
  - Tooltip: "Defines how the final cost is calculated."
  - Constraints: Optional, defaults to 'flat-rate'.

### Update Mutation

#### Mutable Fields

- **origin**: Can be updated.
- **destination**: Can be updated.
- **rate**: Can be updated.
- **serviceType**: Can be updated.
- **unit**: Can be updated.

#### Immutable Fields

- **carrier**: Cannot be changed. To move a rate, it must be deleted and recreated.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Logistics Manager.
- **Constraints**: Can be deleted freely, but caution is advised if the rate is actively used in cost calculations.

---

## Shipment Legs

### Overview

**Purpose**: Represents a distinct segment of a larger shipment's journey. A shipment can be broken down into multiple legs, each handled by either the internal fleet (as a `Trip`) or an external `Carrier`. This is crucial for tracking complex, multi-modal journeys.

**Key Relationships**:
- Belongs to: `Shipments` (from WMS)
- Can belong to: `Trips` (if internal) or `Carriers` (if external)
- Has many: `ShipmentLegEvents`

**User Roles Involved**: Logistics Planner, Dispatcher

### Create Mutation

#### Required Fields

- **shipment**
  - Type: `relation: Shipments`
  - Label: "Parent Shipment"
  - Description: "The overall shipment this leg is a part of."
  - Constraints: Required.

- **legSequence**
  - Type: `number`
  - Label: "Leg Sequence"
  - Description: "The order of this leg in the shipment's journey (e.g., 1, 2, 3)."
  - Tooltip: "Defines the end-to-end route."
  - Constraints: Required, must be a positive integer.

- **startLocation**
  - Type: `geopoint`
  - Label: "Start Location"
  - Description: "The geographical starting point of this leg."
  - Constraints: Required.

- **endLocation**
  - Type: `geopoint`
  - Label: "End Location"
  - Description: "The geographical ending point of this leg."
  - Constraints: Required.

- **status**
  - Type: `enum: ['pending', 'in-transit', 'delivered', 'cancelled', 'failed']`
  - Label: "Leg Status"
  - Description: "The current status of this segment of the journey."
  - Constraints: Required, defaults to 'pending'.

#### Optional Fields

- **internalTrip**
  - Type: `relation: Trips`
  - Label: "Internal Trip"
  - Description: "The internal trip assigned to handle this leg."
  - Tooltip: "Use this field if the leg is handled by the company's own fleet."
  - Constraints: Optional. Must be null if `carrier` is set.

- **carrier**
  - Type: `relation: Carriers`
  - Label: "External Carrier"
  - Description: "The third-party carrier assigned to handle this leg."
  - Tooltip: "Use this field if the leg is outsourced."
  - Constraints: Optional. Must be null if `internalTrip` is set.

### Update Mutation

#### Mutable Fields

- **status**: Can be updated based on events from the assigned carrier or internal driver.
- **internalTrip / carrier**: Can be updated, but only if the leg status is 'pending'.

#### Immutable Fields

- **shipment**: Cannot be changed.
- **legSequence**: Cannot be changed.
- **startLocation / endLocation**: Cannot be changed once the leg is 'in-transit'.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Logistics Planner.
- **State Constraints**: Can only be deleted if the status is 'pending'.

---

## Partner Invoices

### Overview

**Purpose**: Records and manages invoices received from third-party carriers for the transport services they have provided.

**Key Relationships**:
- Belongs to: `Carriers`
- Has many: `PartnerInvoiceItems`

**User Roles Involved**: Accounts Manager, Logistics Manager

### Create Mutation

#### Required Fields

- **carrier**
  - Type: `relation: Carriers`
  - Label: "Carrier"
  - Description: "The carrier that issued the invoice."
  - Constraints: Required.

- **invoiceNumber**
  - Type: `string`
  - Label: "Invoice Number"
  - Description: "The unique identifier for the invoice, as provided by the carrier."
  - Constraints: Required, must be unique per carrier.

- **invoiceDate**
  - Type: `date`
  - Label: "Invoice Date"
  - Description: "The date the invoice was issued."
  - Constraints: Required.

- **totalAmount**
  - Type: `number`
  - Label: "Total Amount"
  - Description: "The total amount due on the invoice."
  - Constraints: Required, must be >= 0.

- **status**
  - Type: `enum: ['pending', 'paid', 'disputed', 'overdue', 'cancelled']`
  - Label: "Invoice Status"
  - Description: "The current status of the invoice in the payment process."
  - Constraints: Required, defaults to 'pending'.

### Update Mutation

#### Mutable Fields

- **status**: Can be updated as the invoice is processed (e.g., moved to 'paid' or 'disputed').
- **totalAmount**: Can be updated to correct errors before payment.

#### Immutable Fields

- **carrier**: Cannot be changed.
- **invoiceNumber**: Cannot be changed.
- **invoiceDate**: Cannot be changed.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Accounts Manager.
- **State Constraints**: Can only be deleted if the status is 'pending' or 'cancelled'. Invoices that have been 'paid' or are 'disputed' should not be deleted.

---

## Partner Invoice Items

### Overview

**Purpose**: A junction table that links a line item on a `PartnerInvoice` to a specific `ShipmentLeg` that was serviced. This is crucial for reconciling carrier invoices and ensuring accurate cost allocation.

**Key Relationships**:
- Belongs to: `PartnerInvoice`, `ShipmentLeg`

**User Roles Involved**: Accounts Manager

### Create Mutation

#### Required Fields

- **partnerInvoice**
  - Type: `relation: PartnerInvoice`
  - Label: "Partner Invoice"
  - Description: "The invoice this line item belongs to."
  - Constraints: Required.

- **shipmentLeg**
  - Type: `relation: ShipmentLegs`
  - Label: "Shipment Leg"
  - Description: "The specific shipment leg this charge corresponds to."
  - Constraints: Required.

- **amount**
  - Type: `number`
  - Label: "Amount"
  - Description: "The cost of this specific line item."
  - Constraints: Required, must be >= 0.

### Update Mutation

#### Mutable Fields

- **amount**: Can be updated to correct discrepancies found during reconciliation.

#### Immutable Fields

- **partnerInvoice**: Cannot be changed.
- **shipmentLeg**: Cannot be changed.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Accounts Manager.
- **State Constraints**: Can only be deleted if the parent invoice is in a 'pending' or 'disputed' state.

---

## Complex Mutation Scenarios

### Scenario 1: Creating a Multi-Stop Internal Trip

**Trigger**: A dispatcher selects multiple shipments from the WMS and clicks "Create Internal Trip".

**Atomic Operation**:

1. **Create `Trip` Record**:
   - A new `Trip` is created with `status: 'planned'`.
   - An available `Driver` and `Vehicle` are assigned. Their statuses are updated to `on-trip`.
2. **Create `TripStop` Records**:
   - For each shipment selected, a `TripStop` record is created and linked to the new `Trip`.
   - Each `TripStop` is assigned a `sequence` number based on the optimized route.
   - The `address` and `shipment` relation are populated for each stop.
3. **Create Notifications**:
   - A notification is sent to the assigned driver's mobile app with the new trip details.

**Error Handling**:
- If a valid driver or vehicle cannot be assigned, the operation fails.
- If any `TripStop` fails to be created, the entire trip and all other stops are rolled back.

### Scenario 2: Driver Completing a Stop with Proof of Delivery

**Trigger**: A driver arrives at a destination and marks a `TripStop` as 'completed' on their mobile app.

**Atomic Operation**:

1. **Update `TripStop`**:
   - The `status` is changed to 'completed'.
   - The `actualArrivalTime` and `actualDepartureTime` are set.
2. **Create `ProofOfDelivery` Record**:
   - A new `ProofOfDelivery` record is created.
   - The `tripStop` relation is set.
   - The `signature` (if captured) or `photo` is uploaded and linked.
   - The `timestamp` and `coordinates` are recorded.
3. **Update `Shipment` (WMS)**:
   - The status of the related `Shipment` in the WMS is updated to 'delivered'.

**Error Handling**:
- If the proof of delivery upload fails, the stop status update is rolled back, and the driver is prompted to try again.

---

## Validation Rules

### Entity-Specific Validation Rules

#### Trips
- A `Driver` can only be assigned to one 'in-progress' trip at a time.
- A `Vehicle` can only be assigned to one 'in-progress' trip at a time.
- The `status` can only be moved from 'planned' to 'in-progress' by the assigned driver.

#### Trip Stops
- The `sequence` number must be unique within a single trip.
- `actualArrivalTime` must be before or the same as `actualDepartureTime`.

#### Shipment Legs
- A `ShipmentLeg` must have either an `internalTrip` or a `carrier` assigned, but not both.

---

## Frontend Implementation Guidance

### Form Generation

```typescript
// Example Zod schema for creating a Trip
const CreateTripSchema = z.object({
  driverId: z.string().uuid(),
  vehicleId: z.string().uuid(),
  stopIds: z.array(z.string().uuid()).min(1),
});

// Example Zod schema for logging a maintenance activity
const CreateMaintenanceSchema = z.object({
  vehicleId: z.string().uuid(),
  serviceDate: z.date(),
  serviceType: z.string().min(3),
  cost: z.number().optional(),
  notes: z.string().optional(),
});
```

---

## Backend Implementation Guidance

### PocketBase Hooks

```go
// Example: Ensure a driver is not double-booked when creating a trip
router.OnRecordBeforeCreate("transport_management_trips").Add(func(e *core.RecordCreateEvent) error {
    driverId := e.Record.GetString("driver")
    // Query to check if this driver has any other trips with status 'in-progress'
    // If so, return an error.
    return nil
})

// Example: Update vehicle status after a trip is completed
router.OnRecordAfterUpdate("transport_management_trips").Add(func(e *core.RecordUpdateEvent) error {
    if e.Record.GetString("status") == "completed" {
        vehicleId := e.Record.GetString("vehicle")
        // Find the vehicle and update its status to 'available'
    }
    return nil
})
```
