# Warehouse Management (WMS) Mutations Plan

> **Domain Description**: The Warehouse Management System (WMS) orchestrates all physical warehouse operations, including receiving and put-away of inbound inventory, intelligent picking and packing of outbound orders, automated replenishment to maintain picking bin stock, and returns processing for reverse logistics.

### Overview

This document outlines the mutation strategy for all Warehouse Management entities in the logistics management system. Each entity includes Create, Update, and Delete mutation specifications with field-level metadata for frontend form generation and PocketBase backend operations.

### Key Principles

- **Task-Driven Operations**: All warehouse work is managed through Tasks that guide operators step-by-step
- **Location Hierarchy**: Warehouses contain zones, aisles, racks, shelves, and bins in a hierarchical structure
- **Inventory Tracking**: Stock is tracked at the location level with status (on-hand, allocated, reserved)
- **Put-Away Rules**: Intelligent routing directs inventory to optimal locations based on rules and thresholds
- **Status Workflows**: Pick, put-away, and packing tasks follow strict state transitions
- **Audit Trail**: All movements are logged with timestamps and user attribution for compliance and analytics

### Related Domains

- **IMS** (Inventory Management): Source of inbound shipments and demand signals
- **CRM** (Customer Relations): Sales orders that drive fulfillment
- **TMS/DMS** (Transport/Delivery): Shipping labels and carrier integration
- **WMS Notifications**: Task assignments and status updates

---

## Warehouses

### Overview

**Purpose**: Represents a physical warehouse location in the network, storing its configuration, location hierarchy, and operational metadata.

**Key Relationships**:
- Has many: Locations (zones, aisles, racks, bins)
- Has many: Inventory Stock
- Has many: Tasks (picking, put-away, replenishment)
- Has many: Put-Away Rules

**User Roles Involved**: Warehouse Manager, Warehouse Operator, Admin

### Create Mutation

#### Required Fields

- **name**
  - Type: `string`
  - Label: "Warehouse Name"
  - Description: "Name of the warehouse facility"
  - Tooltip: "e.g., 'Oakland Distribution Center', 'West Coast Fulfillment'"
  - Constraints: Required, max 200 chars, unique

- **address**
  - Type: `string`
  - Label: "Street Address"
  - Description: "Physical street address"
  - Tooltip: "e.g., '123 Industrial Park Blvd'"
  - Constraints: Required, max 300 chars

- **city**
  - Type: `string`
  - Label: "City"
  - Description: "City name"
  - Tooltip: "e.g., 'Oakland'"
  - Constraints: Required, max 100 chars

- **state**
  - Type: `string`
  - Label: "State/Province"
  - Description: "State or province code"
  - Tooltip: "e.g., 'CA'"
  - Constraints: Required, max 100 chars

- **country**
  - Type: `string`
  - Label: "Country"
  - Description: "Country name"
  - Tooltip: "e.g., 'United States'"
  - Constraints: Required, max 100 chars

- **postalCode**
  - Type: `string`
  - Label: "Postal Code"
  - Description: "ZIP or postal code"
  - Tooltip: "e.g., '94621'"
  - Constraints: Required, max 20 chars

#### Optional Fields

- **contactPerson**
  - Type: `string`
  - Label: "Contact Person"
  - Description: "Primary contact at warehouse"
  - Tooltip: "Name of warehouse manager or lead"
  - Constraints: Optional, max 200 chars

- **contactPhone**
  - Type: `string`
  - Label: "Contact Phone"
  - Description: "Main phone number"
  - Tooltip: "Include country code"
  - Constraints: Optional, max 20 chars

- **contactEmail**
  - Type: `email`
  - Label: "Contact Email"
  - Description: "Primary email contact"
  - Tooltip: "e.g., 'manager@warehouse.com'"
  - Constraints: Optional, valid email format

- **timezone**
  - Type: `string`
  - Label: "Timezone"
  - Description: "Warehouse timezone for scheduling"
  - Tooltip: "e.g., 'America/Los_Angeles'"
  - Constraints: Optional, must be valid IANA timezone

- **location**
  - Type: `geo: GeoPoint`
  - Label: "GPS Coordinates"
  - Description: "Latitude and longitude"
  - Tooltip: "Used for distance calculations and mapping"
  - Constraints: Optional, valid coordinates

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether warehouse is operational"
  - Tooltip: "Disable to pause operations without deleting"
  - Constraints: Optional, defaults to true

- **images**
  - Type: `file[]`
  - Label: "Warehouse Images"
  - Description: "Photos of facility, layout, etc."
  - Tooltip: "Documentation and reference images"
  - Constraints: Optional, max 10 files, max 20MB each

### Update Mutation

- **name**: Can be updated
- **address, city, state, country, postalCode**: Can be updated
- **contactPerson, contactPhone, contactEmail**: Can be updated
- **timezone**: Can be updated
- **location**: Can be updated
- **isActive**: Can be updated
- **images**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if warehouse has active Tasks
  - Cannot delete if warehouse has Inventory Stock
  - Admin role required
  - Deactivate (set isActive=false) instead of hard delete

---

## Locations (Warehouse Bin Structure)

### Overview

**Purpose**: Represents hierarchical locations within a warehouse (zones, aisles, racks, shelves, bins). Each location has capacity constraints and operational properties.

**Key Relationships**:
- Belongs to: Warehouse
- Parent: Location (self-referential for hierarchy)
- Children: Locations (racks, bins under this location)
- Has many: Inventory Stock
- Has many: Tasks
- Has many: Bin Thresholds

**User Roles Involved**: Warehouse Manager, Warehouse Operator

### Create Mutation

#### Required Fields

- **name**
  - Type: `string`
  - Label: "Location Name"
  - Description: "Name or identifier for this location"
  - Tooltip: "e.g., 'Zone A', 'Aisle 1', 'Rack 02', 'Bin 101'"
  - Constraints: Required, max 100 chars

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Description: "Parent warehouse"
  - Tooltip: "Which warehouse is this location in?"
  - Constraints: Required

- **type**
  - Type: `enum: ['zone', 'aisle', 'rack', 'shelf', 'bin', 'dock', 'packing-station', 'cross-dock', 'quarantine', 'bulk-storage']`
  - Label: "Location Type"
  - Description: "Category of location"
  - Tooltip: "Determines operational purpose and rules"
  - Constraints: Required, must be one of predefined options

#### Optional Fields

- **parentLocation**
  - Type: `relation: Locations`
  - Label: "Parent Location"
  - Description: "Parent location in hierarchy"
  - Tooltip: "e.g., Bin 101 belongs to Rack 02"
  - Constraints: Optional, must be in same warehouse, no circular references

- **barcode**
  - Type: `string`
  - Label: "Location Barcode"
  - Description: "Barcode/QR code for scanning"
  - Tooltip: "Unique identifier for mobile scanning"
  - Constraints: Optional, max 100 chars, unique per warehouse

- **level**
  - Type: `number`
  - Label: "Shelf Level"
  - Description: "Vertical level (for racked storage)"
  - Tooltip: "e.g., 1=floor level, 2=eye level, 3=high"
  - Constraints: Optional, 0-10

- **maxWeight**
  - Type: `number`
  - Label: "Max Weight (kg)"
  - Description: "Weight capacity limit"
  - Tooltip: "Maximum weight this bin can hold"
  - Constraints: Optional, >= 0

- **maxVolume**
  - Type: `number`
  - Label: "Max Volume (m³)"
  - Description: "Volume capacity limit"
  - Tooltip: "Maximum volume this bin can hold"
  - Constraints: Optional, >= 0

- **maxPallets**
  - Type: `number`
  - Label: "Max Pallets"
  - Description: "Maximum number of pallets"
  - Tooltip: "For bulk storage areas"
  - Constraints: Optional, >= 0, integer

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether location is available for use"
  - Tooltip: "Disable without deleting to temporarily close"
  - Constraints: Optional, defaults to true

- **isPickable**
  - Type: `boolean`
  - Label: "Pickable"
  - Description: "Can items be picked from here?"
  - Tooltip: "Used for pick strategy optimization"
  - Constraints: Optional, defaults to true

- **isReceivable**
  - Type: `boolean`
  - Label: "Receivable"
  - Description: "Can items be received here?"
  - Tooltip: "Used for receiving dock flagging"
  - Constraints: Optional, defaults to true

- **temperatureControlled**
  - Type: `boolean`
  - Label: "Temperature Controlled"
  - Description: "Is this a climate-controlled area?"
  - Tooltip: "For sensitive products"
  - Constraints: Optional, defaults to false

- **hazmatApproved**
  - Type: `boolean`
  - Label: "Hazmat Approved"
  - Description: "Can hazardous materials be stored here?"
  - Tooltip: "Regulatory compliance"
  - Constraints: Optional, defaults to false

### Update Mutation

- **name**: Can be updated
- **warehouse**: Cannot be updated (move by deleting and recreating)
- **type**: Can be updated
- **parentLocation**: Cannot be updated (prevent circular refs)
- **barcode**: Can be updated
- **level, maxWeight, maxVolume, maxPallets**: Can be updated
- **isActive, isPickable, isReceivable**: Can be updated
- **temperatureControlled, hazmatApproved**: Can be updated

### Delete Mutation

- Constraints:
  - Cannot delete if has child locations
  - Cannot delete if has inventory stock
  - Cannot delete if referenced by active tasks
  - Warehouse Manager role required
  - Deactivate instead via isActive=false

---

## Inventory Stock

### Overview

**Purpose**: Tracks the quantity of a product at a specific location with status (on-hand, allocated, reserved). Central to all WMS operations.

**Key Relationships**:
- Belongs to: Product
- Belongs to: Location (warehouse bin)
- Belongs to: Batch (optional, for expiration tracking)
- Referenced by: Tasks (picking, put-away)
- Referenced by: Pick Batch Items

**User Roles Involved**: Warehouse Operator, Warehouse Manager, Picker

### Create Mutation

#### Required Fields

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "What product is stored here?"
  - Tooltip: "Select product from catalog"
  - Constraints: Required, unique combination with location and batch

- **location**
  - Type: `relation: Locations`
  - Label: "Location"
  - Description: "Storage bin location"
  - Tooltip: "Where in warehouse is this stored?"
  - Constraints: Required, must be in same warehouse

- **quantity**
  - Type: `number`
  - Label: "On-Hand Quantity"
  - Description: "Available inventory count"
  - Tooltip: "Quantity not allocated to orders"
  - Constraints: Required, >= 0, integer, defaults to 0

#### Optional Fields

- **batch**
  - Type: `relation: Inventory Batches`
  - Label: "Batch/Lot"
  - Description: "Batch or lot number for traceability"
  - Tooltip: "For expiration tracking and recalls"
  - Constraints: Optional, must be for same product

- **reservedQuantity**
  - Type: `number`
  - Label: "Reserved Quantity"
  - Description: "Quantity held for orders"
  - Tooltip: "Counted toward allocations"
  - Constraints: Optional, >= 0, <= quantity, integer

- **status**
  - Type: `enum: ['on-hand', 'allocated', 'reserved', 'damaged', 'expired', 'quarantined']`
  - Label: "Status"
  - Description: "Current inventory state"
  - Tooltip: "on-hand → allocated when picked"
  - Constraints: Optional, defaults to 'on-hand'

- **lastMovementAt**
  - Type: `datetime`
  - Label: "Last Movement"
  - Description: "When was this last moved/picked?"
  - Tooltip: "Used for aging and velocity analysis"
  - Constraints: Optional, auto-updated on movements

- **lastCountedAt**
  - Type: `datetime`
  - Label: "Last Counted"
  - Description: "When was inventory last physically counted?"
  - Tooltip: "For cycle count scheduling"
  - Constraints: Optional

### Update Mutation

- **product**: Cannot be updated (create new stock if changing)
- **location**: Cannot be updated (move via transfer task)
- **quantity**: Can be updated (but via task movements for audit)
- **batch**: Cannot be updated (create new stock record)
- **reservedQuantity**: Can be updated (by picking process)
- **status**: Can be updated (by task completion)
- **lastMovementAt**: Auto-updated, read-only
- **lastCountedAt**: Can be updated (manual cycle counts)

### Delete Mutation

- Constraints:
  - Cannot delete if quantity > 0
  - Cannot delete if referenced by active tasks
  - Warehouse Operator or Manager role required
  - Use inventory adjustments instead

---

## Bin Thresholds

### Overview

**Purpose**: Defines minimum/maximum stock levels for locations, triggering automated replenishment tasks when thresholds are crossed.

**Key Relationships**:
- Belongs to: Location (pick bin)
- Belongs to: Product
- Triggers: Replenishment Tasks

**User Roles Involved**: Warehouse Manager

### Create Mutation

#### Required Fields

- **location**
  - Type: `relation: Locations`
  - Label: "Location"
  - Description: "Pick bin location"
  - Tooltip: "Usually a primary pick bin"
  - Constraints: Required, should be of type 'bin'

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "Product to track"
  - Tooltip: "Which product triggers replenishment?"
  - Constraints: Required, unique per location+product

#### Optional Fields

- **minQuantity**
  - Type: `number`
  - Label: "Minimum Quantity"
  - Description: "Level that triggers replenishment"
  - Tooltip: "When stock falls below this, create replenishment task"
  - Constraints: Optional, >= 0, integer

- **maxQuantity**
  - Type: `number`
  - Label: "Maximum Quantity"
  - Description: "Optimal stock level"
  - Tooltip: "Replenish up to this level"
  - Constraints: Optional, >= minQuantity

- **reorderQuantity**
  - Type: `number`
  - Label: "Reorder Quantity"
  - Description: "Amount to replenish when threshold hit"
  - Tooltip: "How many units to move from bulk storage?"
  - Constraints: Optional, >= 0, integer

- **alertThreshold**
  - Type: `number`
  - Label: "Alert Threshold"
  - Description: "Critical level that triggers alerts"
  - Tooltip: "Send alert to manager if below this"
  - Constraints: Optional, < minQuantity

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether this threshold is monitored"
  - Tooltip: "Disable to pause replenishment"
  - Constraints: Optional, defaults to true

### Update Mutation

- **location**: Cannot be updated
- **product**: Cannot be updated
- **minQuantity, maxQuantity, reorderQuantity**: Can be updated
- **alertThreshold**: Can be updated
- **isActive**: Can be updated

### Delete Mutation

- Constraints:
  - Warehouse Manager role required
  - Can delete freely (no cascading effects)

---

## Put-Away Rules

### Overview

**Purpose**: Defines intelligent routing rules that direct warehouse operators to optimal bin locations during receiving and put-away operations.

**Key Relationships**:
- Belongs to: Warehouse
- Belongs to: Product
- Optional: Client (for client-specific rules)
- Optional: Preferred Location

**User Roles Involved**: Warehouse Manager

### Create Mutation

#### Required Fields

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Description: "Warehouse these rules apply to"
  - Tooltip: "Rules are warehouse-specific"
  - Constraints: Required

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "Product to apply rule to"
  - Tooltip: "Which product? Or all products?"
  - Constraints: Required or use wildcard

- **locationType**
  - Type: `enum: ['zone', 'aisle', 'rack', 'shelf', 'bin', 'bulk-storage', 'climate-controlled', 'hazmat']`
  - Label: "Location Type"
  - Description: "Type of location to direct to"
  - Tooltip: "e.g., 'bulk-storage' for slow movers"
  - Constraints: Required

- **priority**
  - Type: `number`
  - Label: "Priority"
  - Description: "Rule execution priority (lower = higher priority)"
  - Tooltip: "0 = highest priority, 10 = lowest"
  - Constraints: Required, 0-10, integer

#### Optional Fields

- **client**
  - Type: `relation: Clients`
  - Label: "Client"
  - Description: "Client-specific rule (optional)"
  - Tooltip: "Leave blank for all clients"
  - Constraints: Optional

- **preferredLocation**
  - Type: `relation: Locations`
  - Label: "Preferred Location"
  - Description: "Specific location to prefer"
  - Tooltip: "If available, use this location first"
  - Constraints: Optional, must match locationType

- **minQuantity**
  - Type: `number`
  - Label: "Min Quantity"
  - Description: "Minimum stock to apply rule"
  - Tooltip: "Only apply rule if receiving >= this qty"
  - Constraints: Optional, >= 0

- **maxQuantity**
  - Type: `number`
  - Label: "Max Quantity"
  - Description: "Maximum quantity per location"
  - Tooltip: "Don't put more than this in one bin"
  - Constraints: Optional, >= minQuantity

- **requireTemperatureControl**
  - Type: `boolean`
  - Label: "Require Climate Control"
  - Description: "Must be in temperature-controlled area?"
  - Tooltip: "e.g., for frozen goods"
  - Constraints: Optional, defaults to false

- **requireHazmatApproval**
  - Type: `boolean`
  - Label: "Require Hazmat Approval"
  - Description: "Must be in hazmat-approved area?"
  - Tooltip: "For hazardous materials"
  - Constraints: Optional, defaults to false

- **weightThreshold**
  - Type: `number`
  - Label: "Weight Threshold (kg)"
  - Description: "Max weight this rule applies to"
  - Tooltip: "Don't use for heavy items"
  - Constraints: Optional, >= 0

- **volumeThreshold**
  - Type: `number`
  - Label: "Volume Threshold (m³)"
  - Description: "Max volume this rule applies to"
  - Tooltip: "Don't use for large items"
  - Constraints: Optional, >= 0

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether this rule is active"
  - Tooltip: "Disable to temporarily pause"
  - Constraints: Optional, defaults to true

### Update Mutation

- **warehouse**: Cannot be updated
- **product**: Cannot be updated
- **locationType**: Can be updated
- **priority**: Can be updated
- **client, preferredLocation**: Can be updated
- **minQuantity, maxQuantity**: Can be updated
- **requireTemperatureControl, requireHazmatApproval**: Can be updated
- **weightThreshold, volumeThreshold**: Can be updated
- **isActive**: Can be updated

### Delete Mutation

- Constraints:
  - Warehouse Manager role required
  - Can delete freely

---

## Tasks

### Overview

**Purpose**: Represents actionable work items that guide warehouse operators through specific operations (picking, put-away, packing, replenishment, etc.).

**Key Relationships**:
- Belongs to: Warehouse
- Belongs to: User (assigned operator)
- Belongs to: Pick Batch (for picks)
- Has many: Task Items (line items)

**User Roles Involved**: Warehouse Manager (assignment), Warehouse Operator (execution), Picker, Packer

### Create Mutation

#### Required Fields

- **taskNumber**
  - Type: `string (auto-generated)`
  - Label: "Task Number"
  - Description: "Unique task identifier"
  - Tooltip: "Auto-generated: TASK-2025-001234"
  - Constraints: Required, auto-generated, unique

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Description: "Warehouse where task occurs"
  - Tooltip: "Which warehouse?"
  - Constraints: Required

- **type**
  - Type: `enum: ['put-away', 'pick', 'pack', 'replenishment', 'cycle-count', 'returns', 'transfer', 'consolidation']`
  - Label: "Task Type"
  - Description: "Kind of work to perform"
  - Tooltip: "e.g., 'pick' = fulfill an order"
  - Constraints: Required

- **status**
  - Type: `enum: ['pending', 'assigned', 'in-progress', 'completed', 'cancelled', 'on-hold']`
  - Label: "Status"
  - Description: "Current task state"
  - Tooltip: "pending → assigned → in-progress → completed"
  - Constraints: Required, defaults to 'pending'

- **priority**
  - Type: `number`
  - Label: "Priority"
  - Description: "Task priority for sequencing"
  - Tooltip: "1-10: 1=urgent, 10=low"
  - Constraints: Required, 1-10, integer, defaults to 5

#### Optional Fields

- **user**
  - Type: `relation: Users`
  - Label: "Assigned To"
  - Description: "Operator assigned this task"
  - Tooltip: "Mobile device user"
  - Constraints: Optional (until task starts)

- **pickBatchId**
  - Type: `relation: Pick Batches`
  - Label: "Pick Batch"
  - Description: "Associated pick batch (for pick tasks)"
  - Tooltip: "Which batch is this pick part of?"
  - Constraints: Optional, only for type='pick'

- **instructions**
  - Type: `string (HTML)`
  - Label: "Instructions"
  - Description: "Detailed task instructions"
  - Tooltip: "Guide operator step-by-step"
  - Constraints: Optional, max 5000 chars

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Additional task notes"
  - Tooltip: "Special handling, cautions, etc."
  - Constraints: Optional, max 2000 chars

- **startTime**
  - Type: `datetime`
  - Label: "Started At"
  - Description: "When operator started task"
  - Tooltip: "Auto-set when status → in-progress"
  - Constraints: Optional, auto-set

- **endTime**
  - Type: `datetime`
  - Label: "Completed At"
  - Description: "When operator completed task"
  - Tooltip: "Auto-set when status → completed"
  - Constraints: Optional, auto-set

- **attachments**
  - Type: `file[]`
  - Label: "Attachments"
  - Description: "Task-related documents or images"
  - Tooltip: "Photos of completed work"
  - Constraints: Optional, max 10 files

### Update Mutation

- **taskNumber**: Cannot be updated (immutable identifier)
- **warehouse**: Cannot be updated
- **type**: Cannot be updated after creation
- **status**: Can be updated (with validation for state transitions)
- **priority**: Can be updated
- **user**: Can be updated (reassignment)
- **pickBatchId**: Cannot be updated
- **instructions, notes**: Can be updated
- **startTime, endTime**: Auto-managed (read-only)
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'in-progress' or 'completed'
  - Can cancel instead (status='cancelled')
  - Warehouse Manager role required

---

## Task Items

### Overview

**Purpose**: Line items within a Task, representing specific products, locations, and quantities involved in the task.

**Key Relationships**:
- Belongs to: Task
- Belongs to: Product (optional, for identity)
- Belongs to: Source Location (for put-away/pick)
- Belongs to: Destination Location (for put-away/transfers)
- Belongs to: Batch (for traceability)

**User Roles Involved**: Warehouse Operator (execution)

### Create Mutation

#### Required Fields

- **task**
  - Type: `relation: Tasks`
  - Label: "Task"
  - Description: "Parent task"
  - Tooltip: "Which task?"
  - Constraints: Required

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "Product to handle"
  - Tooltip: "What product?"
  - Constraints: Optional (can use free-text for non-catalog items)

- **quantityRequired**
  - Type: `number`
  - Label: "Quantity Required"
  - Description: "Qty to pick/move/receive"
  - Tooltip: "How many units?"
  - Constraints: Required, > 0, integer

#### Optional Fields

- **sourceLocation**
  - Type: `relation: Locations`
  - Label: "Source Location"
  - Description: "Pick from or move from here"
  - Tooltip: "Where to start"
  - Constraints: Optional (for put-away, this is destination)

- **destinationLocation**
  - Type: `relation: Locations`
  - Label: "Destination Location"
  - Description: "Move to or put away here"
  - Tooltip: "Where to end up"
  - Constraints: Optional

- **batch**
  - Type: `relation: Inventory Batches`
  - Label: "Batch/Lot"
  - Description: "Specific batch to handle"
  - Tooltip: "For FIFO and expiration"
  - Constraints: Optional

- **quantityCompleted**
  - Type: `number`
  - Label: "Quantity Completed"
  - Description: "Actual qty completed"
  - Tooltip: "What did operator actually do?"
  - Constraints: Optional, 0 to quantityRequired, integer

- **status**
  - Type: `enum: ['pending', 'in-progress', 'completed', 'skipped', 'failed']`
  - Label: "Status"
  - Description: "Line item status"
  - Tooltip: "pending → in-progress → completed"
  - Constraints: Optional, defaults to 'pending'

- **expiryDate**
  - Type: `date`
  - Label: "Expiry Date"
  - Description: "Product expiration date"
  - Tooltip: "For expiration tracking"
  - Constraints: Optional

- **lotNumber**
  - Type: `number`
  - Label: "Lot Number"
  - Description: "Lot identification"
  - Tooltip: "Product lot/batch number"
  - Constraints: Optional

- **estimatedPickTime**
  - Type: `datetime`
  - Label: "Estimated Pick Time"
  - Description: "Estimated completion"
  - Tooltip: "When should this be done?"
  - Constraints: Optional

- **actualPickTime**
  - Type: `number`
  - Label: "Actual Pick Time"
  - Description: "Seconds taken to complete"
  - Tooltip: "For productivity metrics"
  - Constraints: Optional, >= 0, auto-calculated

- **completedAt**
  - Type: `datetime`
  - Label: "Completed At"
  - Description: "When item was completed"
  - Tooltip: "Timestamp of completion"
  - Constraints: Optional, auto-set on completion

### Update Mutation

- **task**: Cannot be updated
- **product**: Cannot be updated
- **quantityRequired**: Cannot be updated
- **sourceLocation, destinationLocation**: Cannot be updated
- **batch**: Cannot be updated
- **quantityCompleted**: Can be updated (during execution)
- **status**: Can be updated (per item progress)
- **expiryDate, lotNumber**: Can be updated
- **completedAt**: Auto-managed on status=completed

### Delete Mutation

- Constraints:
  - Cannot delete if parent task is completed
  - Warehouse Operator or Manager role required

---

## Pick Batches

### Overview

**Purpose**: Groups multiple pick tasks together using a picking strategy (batch, zone, or order picking) to optimize operator efficiency.

**Key Relationships**:
- Belongs to: Warehouse
- Has many: Pick Batch Items
- Has many: Tasks (the individual picks)

**User Roles Involved**: Warehouse Manager (batch creation), Picker (execution)

### Create Mutation

#### Required Fields

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Description: "Warehouse for this batch"
  - Tooltip: "Which warehouse?"
  - Constraints: Required

- **batchNumber**
  - Type: `string (auto-generated)`
  - Label: "Batch Number"
  - Description: "Unique batch identifier"
  - Tooltip: "Auto-generated: BATCH-2025-001"
  - Constraints: Required, auto-generated, unique

- **priority**
  - Type: `number`
  - Label: "Priority"
  - Description: "Batch execution priority"
  - Tooltip: "1-10: 1=urgent, 10=normal"
  - Constraints: Required, 1-10, integer, defaults to 5

#### Optional Fields

- **status**
  - Type: `enum: ['pending', 'in-progress', 'completed', 'cancelled', 'on-hold']`
  - Label: "Status"
  - Description: "Current batch state"
  - Tooltip: "pending → in-progress → completed"
  - Constraints: Optional, defaults to 'pending'

- **strategy**
  - Type: `enum: ['order-picking', 'batch-picking', 'zone-picking']`
  - Label: "Picking Strategy"
  - Description: "How picks are organized"
  - Tooltip: "Batch = multi-order, Zone = by area"
  - Constraints: Optional, defaults to 'order-picking'

- **assignedUser**
  - Type: `relation: Users`
  - Label: "Assigned To"
  - Description: "Picker assigned to batch"
  - Tooltip: "Which picker?"
  - Constraints: Optional (until started)

- **totalItems**
  - Type: `number`
  - Label: "Total Items"
  - Description: "Total line items in batch"
  - Tooltip: "Sum of all items to pick"
  - Constraints: Optional, auto-calculated, read-only

- **completedItems**
  - Type: `number`
  - Label: "Completed Items"
  - Description: "Items picked so far"
  - Tooltip: "Progress counter"
  - Constraints: Optional, auto-calculated, read-only

- **estimatedDuration**
  - Type: `number`
  - Label: "Estimated Duration (min)"
  - Description: "Estimated minutes to complete"
  - Tooltip: "Based on pick complexity"
  - Constraints: Optional, >= 0

- **actualDuration**
  - Type: `number`
  - Label: "Actual Duration (min)"
  - Description: "Minutes actually taken"
  - Tooltip: "For productivity tracking"
  - Constraints: Optional, >= 0, read-only

- **startedAt**
  - Type: `datetime`
  - Label: "Started At"
  - Description: "When batch started"
  - Tooltip: "Auto-set on status → in-progress"
  - Constraints: Optional, auto-set

- **completedAt**
  - Type: `datetime`
  - Label: "Completed At"
  - Description: "When batch finished"
  - Tooltip: "Auto-set on status → completed"
  - Constraints: Optional, auto-set

- **items**
  - Type: `relation[]: Pick Batch Items`
  - Label: "Pick Items"
  - Description: "Items in this batch"
  - Tooltip: "List of what to pick"
  - Constraints: Optional

### Update Mutation

- **warehouse**: Cannot be updated
- **batchNumber**: Cannot be updated (immutable)
- **priority**: Can be updated
- **status**: Can be updated (with validation)
- **strategy**: Cannot be updated after batch starts
- **assignedUser**: Can be reassigned
- **totalItems, completedItems**: Auto-calculated (read-only)
- **estimatedDuration**: Can be updated
- **actualDuration**: Auto-calculated (read-only)
- **startedAt, completedAt**: Auto-managed

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'in-progress' or 'completed'
  - Can cancel instead
  - Warehouse Manager role required

---

## Pick Batch Items

### Overview

**Purpose**: Individual line items within a pick batch, representing specific products and quantities to be picked from specific locations.

**Key Relationships**:
- Belongs to: Pick Batch
- Belongs to: Sales Order (what's being fulfilled)
- Optional: Belongs to Task (the individual pick task)

**User Roles Involved**: Warehouse Manager (batch planning), Picker (execution)

### Create Mutation

#### Required Fields

- **pickBatch**
  - Type: `relation: Pick Batches`
  - Label: "Pick Batch"
  - Description: "Parent batch"
  - Tooltip: "Which batch?"
  - Constraints: Required

- **salesOrder**
  - Type: `relation: Sales Orders`
  - Label: "Sales Order"
  - Description: "Order being fulfilled"
  - Tooltip: "Which order?"
  - Constraints: Required

#### Optional Fields

- **orderPriority**
  - Type: `number`
  - Label: "Order Priority"
  - Description: "Priority within batch"
  - Tooltip: "Pick sequence order"
  - Constraints: Optional, 1-100, integer

- **estimatedPickTime**
  - Type: `datetime`
  - Label: "Estimated Time"
  - Description: "When this should be picked"
  - Tooltip: "Estimated completion"
  - Constraints: Optional

- **actualPickTime**
  - Type: `number`
  - Label: "Actual Time (sec)"
  - Description: "Seconds taken"
  - Tooltip: "For metrics"
  - Constraints: Optional, >= 0

### Update Mutation

- **pickBatch**: Cannot be updated
- **salesOrder**: Cannot be updated
- **orderPriority**: Can be updated
- **estimatedPickTime**: Can be updated
- **actualPickTime**: Auto-calculated (read-only)

### Delete Mutation

- Constraints:
  - Cannot delete if pick batch is in-progress or completed
  - Warehouse Manager role required

---

## Packages

### Overview

**Purpose**: Represents a physical package or container prepared at the packing station, ready for shipment. Contains packed items and shipping details.

**Key Relationships**:
- Belongs to: Sales Order (what's being shipped)
- Belongs to: Warehouse
- Has many: Package Items
- Related to: Shipping Labels (TMS/DMS)

**User Roles Involved**: Warehouse Packer, Warehouse Manager

### Create Mutation

#### Required Fields

- **packageNumber**
  - Type: `string (auto-generated)`
  - Label: "Package Number"
  - Description: "Unique package identifier"
  - Tooltip: "Auto-generated: PKG-2025-00123"
  - Constraints: Required, auto-generated, unique

- **salesOrder**
  - Type: `relation: Sales Orders`
  - Label: "Sales Order"
  - Description: "Order being shipped"
  - Tooltip: "Which order?"
  - Constraints: Required

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Description: "Warehouse shipping from"
  - Tooltip: "Which warehouse?"
  - Constraints: Required

#### Optional Fields

- **type**
  - Type: `string`
  - Label: "Package Type"
  - Description: "Type of packaging used"
  - Tooltip: "e.g., 'Box', 'Pallet', 'Envelope'"
  - Constraints: Optional, max 100 chars

- **weight**
  - Type: `number`
  - Label: "Weight (kg)"
  - Description: "Final package weight"
  - Tooltip: "Total weight with contents"
  - Constraints: Optional, >= 0

- **length**
  - Type: `number`
  - Label: "Length (cm)"
  - Description: "Package length"
  - Tooltip: "For shipping calculations"
  - Constraints: Optional, >= 0

- **width**
  - Type: `number`
  - Label: "Width (cm)"
  - Description: "Package width"
  - Tooltip: "For shipping calculations"
  - Constraints: Optional, >= 0

- **height**
  - Type: `number`
  - Label: "Height (cm)"
  - Description: "Package height"
  - Tooltip: "For shipping calculations"
  - Constraints: Optional, >= 0

- **isFragile**
  - Type: `boolean`
  - Label: "Fragile"
  - Description: "Contains fragile items?"
  - Tooltip: "Affects shipping handling"
  - Constraints: Optional, defaults to false

- **isHazmat**
  - Type: `boolean`
  - Label: "Hazmat"
  - Description: "Contains hazardous materials?"
  - Tooltip: "Requires special labeling"
  - Constraints: Optional, defaults to false

- **requireSignature**
  - Type: `boolean`
  - Label: "Signature Required"
  - Description: "Requires delivery signature?"
  - Tooltip: "High-value items"
  - Constraints: Optional, defaults to false

- **insuranceValue**
  - Type: `number`
  - Label: "Insurance Value"
  - Description: "Value for insurance purposes"
  - Tooltip: "In customer currency"
  - Constraints: Optional, >= 0

- **packedAt**
  - Type: `datetime`
  - Label: "Packed At"
  - Description: "When package was completed"
  - Tooltip: "Packing completion timestamp"
  - Constraints: Optional, auto-set on completion

- **packedByUser**
  - Type: `relation: Users`
  - Label: "Packed By"
  - Description: "Packer who packed this"
  - Tooltip: "Who performed packing?"
  - Constraints: Optional, auto-set

- **shippedAt**
  - Type: `datetime`
  - Label: "Shipped At"
  - Description: "When package shipped"
  - Tooltip: "Handoff to carrier"
  - Constraints: Optional

- **images**
  - Type: `file[]`
  - Label: "Package Images"
  - Description: "Photos of packed package"
  - Tooltip: "QC/documentation"
  - Constraints: Optional, max 5 files

### Update Mutation

- **packageNumber**: Cannot be updated (immutable)
- **salesOrder**: Cannot be updated
- **warehouse**: Cannot be updated
- **type**: Can be updated (before packing complete)
- **weight, length, width, height**: Can be updated
- **isFragile, isHazmat, requireSignature**: Can be updated (before shipped)
- **insuranceValue**: Can be updated (before shipped)
- **packedAt, packedByUser**: Auto-managed
- **shippedAt**: Can be updated (when handed to carrier)
- **images**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if shippedAt is not null
  - Can only delete if status is 'draft' (before packing)
  - Warehouse Manager role required

---

## Package Items

### Overview

**Purpose**: Individual line items within a package, representing specific products packed into a container.

**Key Relationships**:
- Belongs to: Package
- Belongs to: Product
- Belongs to: Batch (for traceability)

**User Roles Involved**: Warehouse Packer, Warehouse Manager

### Create Mutation

#### Required Fields

- **package**
  - Type: `relation: Packages`
  - Label: "Package"
  - Description: "Parent package"
  - Tooltip: "Which package?"
  - Constraints: Required

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "Product packed"
  - Tooltip: "What product?"
  - Constraints: Required

- **quantity**
  - Type: `number`
  - Label: "Quantity"
  - Description: "Number of units packed"
  - Tooltip: "How many?"
  - Constraints: Required, > 0, integer

#### Optional Fields

- **batch**
  - Type: `relation: Inventory Batches`
  - Label: "Batch/Lot"
  - Description: "Batch of product"
  - Tooltip: "For traceability"
  - Constraints: Optional

- **expiryDate**
  - Type: `date`
  - Label: "Expiry Date"
  - Description: "Product expiration"
  - Tooltip: "For perishables"
  - Constraints: Optional

- **lotNumber**
  - Type: `string`
  - Label: "Lot Number"
  - Description: "Product lot identifier"
  - Tooltip: "Manufacturer lot"
  - Constraints: Optional, max 100 chars

### Update Mutation

- **package**: Cannot be updated
- **product**: Cannot be updated
- **quantity**: Cannot be updated (must remove and re-add)
- **batch**: Cannot be updated
- **expiryDate, lotNumber**: Can be updated

### Delete Mutation

- Constraints:
  - Cannot delete if parent package is shipped
  - Warehouse Operator or Manager role required

---

## Returns

### Overview

**Purpose**: Represents customer returns (RMAs) being processed for reverse logistics, tracking item conditions and disposition.

**Key Relationships**:
- Belongs to: Client
- Optional: Belongs to: Sales Order (original order)
- Has many: Return Items

**User Roles Involved**: Returns Processor, Warehouse Manager

### Create Mutation

#### Required Fields

- **returnNumber**
  - Type: `string (auto-generated)`
  - Label: "Return Number"
  - Description: "Unique return identifier"
  - Tooltip: "Auto-generated: RMA-2025-001"
  - Constraints: Required, auto-generated, unique

- **client**
  - Type: `relation: Clients`
  - Label: "Client"
  - Description: "Which client is returning?"
  - Tooltip: "Who?"
  - Constraints: Required

#### Optional Fields

- **salesOrder**
  - Type: `relation: Sales Orders`
  - Label: "Original Order"
  - Description: "Original sales order"
  - Tooltip: "What was originally ordered?"
  - Constraints: Optional

- **status**
  - Type: `enum: ['pending', 'received', 'inspecting', 'approved', 'rejected', 'processing', 'completed', 'cancelled']`
  - Label: "Status"
  - Description: "Current return state"
  - Tooltip: "pending → received → inspecting → approved → completed"
  - Constraints: Optional, defaults to 'pending'

- **reason**
  - Type: `string (HTML)`
  - Label: "Reason"
  - Description: "Why are items being returned?"
  - Tooltip: "Customer reason for return"
  - Constraints: Optional, max 2000 chars

### Update Mutation

- **returnNumber**: Cannot be updated (immutable)
- **client**: Cannot be updated
- **salesOrder**: Cannot be updated
- **status**: Can be updated (workflow)
- **reason**: Can be updated

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'completed'
  - Can only delete if 'pending' or 'cancelled'
  - Warehouse Manager role required

---

## Return Items

### Overview

**Purpose**: Individual items within a return, with condition assessment and disposition assignment.

**Key Relationships**:
- Belongs to: Return
- Belongs to: Product
- Optional: Creates: Put-Away Task (if resellable)

**User Roles Involved**: Returns Processor, Warehouse Manager

### Create Mutation

#### Required Fields

- **return**
  - Type: `relation: Returns`
  - Label: "Return"
  - Description: "Parent return"
  - Tooltip: "Which return?"
  - Constraints: Required

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "Returned product"
  - Tooltip: "What product?"
  - Constraints: Required

#### Optional Fields

- **quantityExpected**
  - Type: `number`
  - Label: "Qty Expected"
  - Description: "Expected quantity"
  - Tooltip: "What should be here?"
  - Constraints: Optional, >= 0, integer

- **quantityRecevied**
  - Type: `number`
  - Label: "Qty Received"
  - Description: "Actual quantity received"
  - Tooltip: "What we actually got"
  - Constraints: Optional, >= 0, integer

- **condition**
  - Type: `enum: ['excellent', 'good', 'fair', 'damaged', 'defective', 'unknown']`
  - Label: "Condition"
  - Description: "Condition of returned item"
  - Tooltip: "Assessment of item quality"
  - Constraints: Optional

### Update Mutation

- **return**: Cannot be updated
- **product**: Cannot be updated
- **quantityExpected**: Can be updated
- **quantityRecevied**: Can be updated
- **condition**: Can be updated

### Delete Mutation

- Constraints:
  - Cannot delete if return is completed
  - Warehouse Manager role required

---

## Complex Mutation Scenarios

### Scenario 1: Receive and Put-Away Workflow

**Trigger**: Warehouse operator scans items from inbound shipment at receiving dock

**Atomic Operation** (must all succeed or all fail):

1. Check if item is needed for waiting orders (cross-dock):
   - If yes → Flag for cross-docking, skip put-away
   - If no → Proceed to step 2

2. Query Put-Away Rules:
   - Filter by product, warehouse, quantities
   - Apply priority ordering
   - Find available location matching rules

3. Create Put-Away Task:
   - type = 'put-away'
   - sourceLocation = receiving dock
   - destinationLocation = recommended bin from rules
   - quantity = received amount
   - Assign to available operator

4. Update Inventory Stock:
   - Create or update stock record at destination location
   - Set quantity += received amount
   - Set status = 'on-hand'

5. Mark Inbound Shipment item as received (external system)

6. Optional: Trigger replenishment if any bins drop below threshold

**Error Handling**:
- If no valid location found: Hold at receiving, alert manager
- If inventory update fails: Rollback task creation
- Return user-friendly error

### Scenario 2: Pick, Pack, and Ship Workflow

**Trigger**: Sales order ready for fulfillment (from CRM/IMS)

**Process**:

1. Create Pick Batch (based on strategy):
   - Group orders using selected strategy (batch/zone/order)
   - Assign priority based on due dates
   - Calculate estimated duration

2. Generate Pick Tasks:
   - For each order in batch
   - For each item in order
   - Create task with optimized path using location hierarchy

3. Assign to Picker (if not automatic):
   - Push notification to available picker
   - Task appears on mobile device

4. During Picking:
   - Operator scans location → product → confirms
   - System marks inventory as 'allocated'
   - Update Task Item progress

5. Move to Packing Station:
   - Batch complete indicator
   - Items moved to consolidation area
   - Tasks marked complete

6. Packing Process:
   - Packer scans batch/tote
   - System shows expected items
   - Packer scans each item being packed
   - System verifies against order
   - Dimensions/weight entered
   - Package created with items

7. Generate Shipping Label:
   - Call TMS/DMS with package details
   - Generate label
   - Print label
   - Mark package as 'shippedAt'
   - Update inventory to 'shipped'

8. Integration Events:
   - Notify customer: Order ready/shipped
   - Update CRM invoice status
   - Trigger logistics tracking

**Error Handling**:
- Pick discrepancy: Halt batch, alert supervisor
- Weight/dimension mismatch: Flag for review
- Inventory insufficient: Use alternative location or backorder

### Scenario 3: Automated Replenishment

**Trigger**: Inventory in pick bin drops below minimum threshold

**Atomic Operation**:

1. Check Bin Threshold:
   - Verify current qty < minQuantity
   - Verify bin is still active and pickable

2. Find Source Location:
   - Query inventory for product in bulk storage
   - Prefer nearest bulk location
   - Prefer oldest stock (FIFO)

3. Create Replenishment Task:
   - type = 'replenishment'
   - sourceLocation = bulk storage bin
   - destinationLocation = pick bin
   - quantity = reorderQuantity from threshold
   - priority = high (replenishment is urgent)
   - Assign to available operator with equipment

4. Allocate Stock:
   - Reserve quantityReordered in source location
   - Mark as 'reserved' in inventory

5. On Task Completion:
   - Operator moves stock, scans both locations
   - Update source inventory: qty -= moved
   - Update destination inventory: qty += moved
   - Mark task complete
   - Release reservation

**Error Handling**:
- Insufficient stock in bulk: Create purchase requisition or backorder notice
- Task assignment timeout: Escalate to supervisor
- Movement mismatch: Prompt for recount

### Scenario 4: Returns Processing Workflow

**Trigger**: RMA (return merchandise authorization) package arrives

**Process**:

1. Receive Return:
   - Scan RMA code
   - System pulls original order details
   - Capture received quantity

2. Inspect Items:
   - For each item: assess condition
   - Assign disposition: resellable/refurb/damaged/write-off

3. Resellable Path:
   - Create Put-Away Task using same rules as inbound
   - Move to determined location
   - Update inventory: add to stock
   - Mark Return Item condition
   - Generate audit trail

4. Damaged/Write-off Path:
   - Move to quarantine area
   - Create write-off task or RMA debit
   - Flag for accounting/disposal
   - Log in analytics

5. Update Client Balance (if applicable):
   - Issue credit note if returns are accepted
   - Update client account in Billing
   - Notify client of credit

6. Complete Return:
   - Mark Return status = 'completed'
   - Generate return receipt
   - Close RMA

---

## Validation Rules

### Global Validation Rules

- **Location hierarchy**: No circular parent-child references
- **Inventory quantities**: Must be non-negative integers
- **Dates**: End dates must be >= start dates
- **Relations**: Referenced entities must exist in same warehouse (where applicable)
- **Enums**: Must be one of predefined values

### Entity-Specific Validation Rules

#### Task Status Transitions

- `pending` → `assigned` (user assigned)
- `assigned` → `in-progress` (operator starts work)
- `in-progress` → `completed` or `on-hold` or `cancelled`
- `on-hold` → `in-progress` or `cancelled`
- Cannot go backward in workflow

#### Inventory Stock

- `quantity` >= `reservedQuantity` always
- Cannot have negative quantities
- When picking: move from 'on-hand' to 'allocated'
- When completed: remove from 'allocated'

#### Put-Away Rules Priority

- Lower numbers = higher priority
- Only one rule can match per product+warehouse combo
- Preferred location must match locationType

#### Pick Batch Item Tracking

- `completedItems` <= `totalItems`
- Progress only increases, never decreases

---

## Frontend Implementation Guidance

### Form Generation

```typescript
// Example Zod schemas for WMS entities
const CreateTaskSchema = z.object({
  warehouse: z.string().uuid(),
  type: z.enum(['put-away', 'pick', 'pack', 'replenishment', 'cycle-count', 'returns', 'transfer', 'consolidation']),
  status: z.enum(['pending', 'assigned', 'in-progress', 'completed', 'cancelled', 'on-hold']).default('pending'),
  priority: z.number().int().min(1).max(10).default(5),
  instructions: z.string().max(5000).optional(),
  notes: z.string().max(2000).optional(),
  user: z.string().uuid().optional(),
});

type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
```

### Mobile Operator Interface

- **Pick Tasks**: Show optimized path, allow barcode scanning, real-time progress
- **Put-Away Tasks**: Show recommended location from rules, allow bin scanning
- **Packing**: Show order details, verify items as scanned, capture dimensions
- **Replenishment**: Show source and destination, prompt for move confirmation

### Dashboard/Analytics

- Task completion rates by type and operator
- Pick accuracy metrics
- Labor productivity (picks per hour)
- Inventory turnover by location
- Bin threshold compliance

---

## Backend Implementation Guidance

### PocketBase Hooks

```go
// Task status transition validation
router.OnRecordBeforeUpdate("wms_tasks").Add(func(e *core.RecordUpdateEvent) error {
    oldStatus := e.OldRecord.GetString("status")
    newStatus := e.Record.GetString("status")
    
    // Validate state transition
    validTransitions := map[string][]string{
        "pending": {"assigned", "cancelled"},
        "assigned": {"in-progress", "cancelled"},
        "in-progress": {"completed", "on-hold", "cancelled"},
        "on-hold": {"in-progress", "cancelled"},
    }
    
    if !contains(validTransitions[oldStatus], newStatus) {
        return errors.New("Invalid status transition")
    }
    
    return nil
})

// Auto-update completion timestamp
router.OnRecordBeforeUpdate("wms_tasks").Add(func(e *core.RecordUpdateEvent) error {
    if e.Record.GetString("status") == "completed" && e.OldRecord.GetString("status") != "completed" {
        e.Record.Set("endTime", time.Now())
    }
    return nil
})

// Trigger replenishment on inventory movement
router.OnRecordAfterUpdate("wms_inventory_stock").Add(func(e *core.RecordUpdateEvent) error {
    // Check thresholds, create replenishment tasks
    return triggerReplenishmentIfNeeded(e)
})
```

### Atomic Transactions

- Use PocketBase transaction support for multi-table operations
- Receive → Create Task → Update Stock (all or nothing)
- Pick completion → Update allocation → Release reservation

### Audit Logging

- Log all task status changes with timestamp and user
- Log all inventory movements with before/after quantities
- Log all returns disposition assignments
- Maintain immutable audit trail for compliance

---

## Database Implementation Guidance

### Migration Structure

```go
// Location hierarchy indexes
db.CreateIndex("wms_locations", "warehouse_id", "parent_location_id")
db.CreateIndex("wms_locations", "warehouse_id", "type")
db.CreateIndex("wms_locations", "is_active", "is_pickable")

// Inventory queries
db.CreateIndex("wms_inventory_stock", "location_id", "product_id", "status")
db.CreateIndex("wms_inventory_stock", "warehouse_id", "quantity")
db.CreateIndex("wms_inventory_stock", "last_movement_at")

// Task assignment and tracking
db.CreateIndex("wms_tasks", "warehouse_id", "user_id", "status")
db.CreateIndex("wms_tasks", "warehouse_id", "created", "status")
db.CreateIndex("wms_tasks", "priority", "status")

// Batch operations
db.CreateIndex("wms_pick_batches", "warehouse_id", "status", "assigned_user_id")
db.CreateIndex("wms_pick_batch_items", "pick_batch_id", "sales_order_id")
```

### Constraints

- Unique: warehouse + location.name (no duplicate names in same warehouse)
- Unique: warehouse + product + location + batch (stock records)
- Unique: task_number, package_number, return_number, batch_number
- Foreign keys: All relations must exist
- Check: quantity >= reservedQuantity
- Check: status in enum values

### Triggers

- Auto-generate task_number, package_number using sequence
- Auto-set created/updated timestamps
- Auto-calculate totalItems, completedItems in pick batches
- Update lastMovementAt on inventory changes

---

## Inventory Management

### Overview

**Purpose**: Manages the core inventory tracking, including product master data, stock levels across locations, batch/expiry tracking, inventory adjustments, and stock transfers between warehouses.

**Key Relationships**:
- Products: Master catalog with SKU and dimensions
- Inventory Stock: Real-time stock levels at each location by status
- Inventory Batches: Batch/lot and expiry date tracking
- Inventory Adjustments: History of all stock corrections
- Reorder Points: Client-specific stock thresholds
- Stock Transfers: Inter-warehouse inventory movements

**User Roles Involved**: Inventory Manager, Warehouse Manager, Warehouse Operator, QC Manager, Account Manager

### Products

#### Overview

**Purpose**: The master product catalog. Each product has a SKU, physical dimensions for slotting, cost tracking, and status management.

**Key Relationships**:
- Has many: `InventoryStock`, `InventoryBatches`, `InventoryAdjustments`

**User Roles Involved**: Inventory Manager, Warehouse Manager

#### Create Mutation

##### Required Fields

- **sku**
  - Type: `string`
  - Label: "SKU"
  - Description: "Unique stock-keeping unit identifier"
  - Constraints: Required, unique, max 50 chars

- **name**
  - Type: `string`
  - Label: "Product Name"
  - Description: "Display name of the product"
  - Constraints: Required, max 200 chars

#### Optional Fields

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "Detailed product description"
  - Constraints: Optional

- **length / width / height / weight**
  - Type: `number`
  - Label: "Dimensions (cm) / Weight (kg)"
  - Description: "Physical dimensions for space calculations and carrier weight"
  - Constraints: Optional, must be > 0

- **barcode**
  - Type: `string`
  - Label: "Barcode"
  - Description: "UPC or other barcode for scanning"
  - Constraints: Optional, unique

- **costPrice**
  - Type: `number`
  - Label: "Cost Price"
  - Description: "The cost to acquire this product"
  - Constraints: Optional, >= 0

- **supplier**
  - Type: `relation: Suppliers`
  - Label: "Primary Supplier"
  - Description: "Default supplier for replenishment"
  - Constraints: Optional

- **status**
  - Type: `enum: ['active', 'inactive', 'discontinued']`
  - Label: "Status"
  - Description: "Product availability status"
  - Constraints: Optional, defaults to 'active'

- **images**
  - Type: `file[]`
  - Label: "Product Images"
  - Description: "Product photos for identification"
  - Constraints: Optional

#### Update Mutation

- **name, description, dimensions, barcode, costPrice, supplier**: Can be updated
- **sku**: Cannot be updated (immutable for referential integrity)
- **status**: Can be updated to 'inactive' or 'discontinued'

#### Delete Mutation

- Cannot delete products with active inventory
- Soft delete recommended: Set `status: 'discontinued'`

---

### Inventory Stock

#### Overview

**Purpose**: Real-time stock level tracking at each location by status (on-hand, allocated, reserved). This is the heart of inventory visibility.

**Key Relationships**:
- Belongs to: `Warehouses`, `Locations`, `Products`
- Can relate to: `InventoryBatches`
- Updated by: Receiving, Picking, Adjustments, Transfers

**User Roles Involved**: System, Warehouse Operator, Warehouse Manager

#### Create Mutation

##### Required Fields

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Constraints: Required

- **location**
  - Type: `relation: Locations`
  - Label: "Location"
  - Description: "Specific bin or location where stock is stored"
  - Constraints: Required

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Constraints: Required

- **status**
  - Type: `enum: ['on-hand', 'allocated', 'reserved', 'damaged', 'lost']`
  - Label: "Stock Status"
  - Description: "The current status of this inventory batch"
  - Tooltip: "on-hand = available, allocated = picked but not shipped, reserved = for pending orders"
  - Constraints: Required, defaults to 'on-hand'

#### Optional Fields

- **quantity**
  - Type: `number`
  - Label: "Quantity"
  - Description: "Number of units at this location"
  - Constraints: Optional, defaults to 0

- **reservedQuantity**
  - Type: `number`
  - Label: "Reserved Quantity"
  - Description: "Number of units allocated to orders but not yet picked"
  - Constraints: Optional, defaults to 0, must be <= quantity

- **batch**
  - Type: `relation: InventoryBatches`
  - Label: "Batch/Lot Number"
  - Description: "Links to batch tracking for expiry-sensitive items"
  - Constraints: Optional

#### Update Mutation

- **quantity**: Can be updated (typically via receiving, picking, or adjustments)
- **reservedQuantity**: Updated automatically when orders are allocated/picked
- **status**: Can be updated (e.g., to 'damaged' when items are flagged)
- **batch**: Can be updated if stock is consolidated

#### Delete Mutation

- Cannot delete stock records that have associated transactions
- Soft delete recommended: Set `quantity: 0` instead of deleting

---

### Inventory Batches

#### Overview

**Purpose**: Tracks batch/lot numbers and expiration dates for products requiring this level of detail. Enables FEFO (First-Expired, First-Out) picking and recall tracking.

**Key Relationships**:
- Belongs to: `Products`
- Has many: `InventoryStock`

**User Roles Involved**: QC Manager, Warehouse Operator

#### Create Mutation

##### Required Fields

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Constraints: Required

- **batchNumber**
  - Type: `string`
  - Label: "Batch / Lot Number"
  - Description: "Unique identifier for this batch"
  - Constraints: Required, unique per product

#### Optional Fields

- **expirationDate**
  - Type: `date`
  - Label: "Expiration Date"
  - Description: "When this batch expires"
  - Constraints: Optional, but recommended for perishables

#### Update Mutation

- **expirationDate**: Can be updated if date is corrected
- **batchNumber**: Cannot be updated (immutable for tracking)

#### Delete Mutation

- Cannot delete if stock exists for this batch
- Soft delete: archive instead of deleting

---

### Inventory Adjustments

#### Overview

**Purpose**: Complete audit trail of all inventory corrections, whether from cycle counts, damage discovery, shrinkage, or accounting corrections.

**Key Relationships**:
- Belongs to: `Products`, `Warehouses`, `Users`

**User Roles Involved**: Warehouse Operator, Inventory Manager

#### Create Mutation

##### Required Fields

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Constraints: Required

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Constraints: Required

- **quantityChange**
  - Type: `number`
  - Label: "Quantity Change"
  - Description: "Positive (increase) or negative (decrease) quantity"
  - Constraints: Required, non-zero

- **reason**
  - Type: `enum: ['cycle-count', 'damaged', 'shrinkage', 'system-correction', 'supplier-return', 'other']`
  - Label: "Reason"
  - Description: "Why the adjustment was made"
  - Constraints: Required

- **user**
  - Type: `relation: Users`
  - Label: "Recorded By"
  - Description: "User who initiated the adjustment"
  - Constraints: Required, auto-set to current user

#### Optional Fields

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Additional context about the adjustment"
  - Constraints: Optional

#### Update Mutation

- **All fields are immutable**. Adjustments are audit-trail records and cannot be edited.

#### Delete Mutation

- **Deletion is not allowed**. Adjustments must be preserved for compliance.

---

### Reorder Points

#### Overview

**Purpose**: Defines minimum stock thresholds per client/warehouse combination. When stock falls below this level, alerts are triggered to the client.

**Key Relationships**:
- Belongs to: `Products`, `Warehouses`

**User Roles Involved**: Account Manager, Inventory Manager

#### Create Mutation

##### Required Fields

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Constraints: Required

- **warehouse**
  - Type: `relation: Warehouses`
  - Label: "Warehouse"
  - Constraints: Required

- **threshold**
  - Type: `number`
  - Label: "Minimum Stock Level"
  - Description: "When inventory falls below this quantity, trigger an alert"
  - Constraints: Required, >= 0

#### Optional Fields

- **alertQuantity**
  - Type: `number`
  - Label: "Alert Quantity"
  - Description: "Quantity to suggest ordering (if different from threshold)"
  - Constraints: Optional

#### Update Mutation

- **threshold**: Can be updated
- **alertQuantity**: Can be updated
- **product / warehouse**: Cannot be updated (immutable keys)

#### Delete Mutation

- Can be deleted freely
- Deletion removes the reorder point threshold

---

### Stock Transfers

#### Overview

**Purpose**: Manages movement of inventory between warehouses. Creates a complete audit trail of inter-warehouse transfers.

**Key Relationships**:
- Belongs to: `Products`, source `Warehouse`, destination `Warehouse`

**User Roles Involved**: Logistics Coordinator, Warehouse Manager

#### Create Mutation

##### Required Fields

- **sourceWarehouse**
  - Type: `relation: Warehouses`
  - Label: "Source Warehouse"
  - Constraints: Required

- **destinationWarehouse**
  - Type: `relation: Warehouses`
  - Label: "Destination Warehouse"
  - Constraints: Required, must be different from source

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Constraints: Optional (null means multi-product transfer)

- **quantity**
  - Type: `number`
  - Label: "Quantity"
  - Description: "Number of units to transfer"
  - Constraints: Optional, >= 0

- **status**
  - Type: `enum: ['pending', 'in-transit', 'received', 'cancelled']`
  - Label: "Transfer Status"
  - Description: "Current status of the transfer"
  - Constraints: Required, defaults to 'pending'

#### Optional Fields

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Reason or context for the transfer"
  - Constraints: Optional

#### Update Mutation

- **status**: Can be updated (pending → in-transit → received)
- **quantity**: Can be updated before the transfer is sent
- **sourceWarehouse / destinationWarehouse / product**: Cannot be updated after creation

#### Delete Mutation

- Can only be deleted if `status: 'pending'`
- Cancelled transfers should update status to 'cancelled' instead

---

## Complex Inventory Scenarios

### Scenario 1: Receive Inbound Shipment with Batch Tracking

**Trigger**: Warehouse Operator scans items from an Inbound Shipment (ASN).

**Atomic Operation**:

1. **Verify against ASN**:
   - Match scanned product against ASN line items
   - Update received quantity on the ASN item

2. **Create/Locate InventoryBatch**:
   - If batch-tracked, create `InventoryBatch` record (if new) or find existing batch
   - Record expiration date from supplier documentation

3. **Create/Update InventoryStock**:
   - Find or create `InventoryStock` record for this product-location-batch combination
   - Increment quantity by received count
   - Set status to 'on-hand'

4. **Create InventoryAdjustment** (if discrepancies):
   - If received quantity differs from expected, create an adjustment record
   - Reason: 'system-correction'

5. **Update Put-Away Rules**:
   - Trigger put-away task creation to move inventory from receiving dock to proper locations

**Error Handling**:
- If product on ASN is not found, flag for manual review
- If quantity mismatch is > 5%, create dispute record

---

### Scenario 2: Automatic Low Stock Alert

**Trigger**: Stock level falls below `ReorderPoint.threshold` due to picking or adjustment.

**Operation**:

1. **Check Threshold**:
   - After any stock change, query `ReorderPoints` for this product-warehouse
   - Compare current quantity against threshold

2. **Trigger Alert** (if below threshold):
   - Create notification record for the client
   - Send email/SMS to account manager

3. **Optional**: Create Replenishment Task:
   - For replenishment-managed items, automatically create a purchase order

**Error Handling**:
- If no reorder point configured, no alert
- Alert deduplication: don't send twice in same hour

---

### Scenario 3: FEFO Picking with Batch Expiry

**Trigger**: Pick task is created for a product tracked by batch.

**Operation**:

1. **Query InventoryBatches**:
   - Find all batches of this product with available stock
   - Sort by `expirationDate` (ascending - soonest first)

2. **Generate Picklist**:
   - For each location containing the earliest-expiring batch, create a pick line
   - Prioritize locations with earliest expiry dates

3. **Update Stock Status**:
   - As items are picked, update `InventoryStock.status` from 'on-hand' to 'allocated'
   - Decrement quantity

4. **Create Adjustment** (if damaged found during pick):
   - If picker finds damaged stock, create adjustment with reason 'damaged'

**Error Handling**:
- If insufficient stock of earliest-expiring batch, cascade to next batch
- If total available < needed, create backorder

---

## Validation Rules

### Global Validation Rules

- **Stock Calculations**: `quantity >= reservedQuantity` always
- **Unique Constraints**: 
  - product + warehouse + batch = unique stock record
  - sku = globally unique
  - barcode = globally unique
- **Quantity**: All quantities must be >= 0
- **Dates**: Expiration dates must be in the future

### Entity-Specific Validation

#### Inventory Stock

- Cannot have `reservedQuantity > quantity`
- Cannot have status 'on-hand' with `reservedQuantity > 0` (should be 'allocated')

#### Inventory Adjustments

- `quantityChange` cannot be 0
- Reason must match one of predefined values
- Cannot adjust to negative stock

#### Stock Transfers

- Source and destination must be different warehouses
- Cannot transfer more than available quantity in source
- Destination warehouse must be active

#### Reorder Points

- `threshold` must be >= 0
- `alertQuantity` (if set) should be >= threshold

---

## Frontend Implementation Guidance

### Form Generation

```typescript
// Example Zod schema for inventory adjustment
const CreateAdjustmentSchema = z.object({
  productId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  quantityChange: z.number().int().refine(n => n !== 0),
  reason: z.enum(['cycle-count', 'damaged', 'shrinkage', 'system-correction', 'supplier-return', 'other']),
  notes: z.string().optional(),
});

// Example Zod schema for stock transfer
const CreateTransferSchema = z.object({
  sourceWarehouseId: z.string().uuid(),
  destinationWarehouseId: z.string().uuid(),
  productId: z.string().uuid().optional(),
  quantity: z.number().min(0),
  notes: z.string().optional(),
});
```

---

## Backend Implementation Guidance

### PocketBase Hooks

```go
// Validate stock calculation on update
router.OnRecordBeforeUpdate("wms_inventory_stock").Add(func(e *core.RecordUpdateEvent) error {
    qty := e.Record.GetFloat("quantity")
    reserved := e.Record.GetFloat("reserved_quantity")
    if reserved > qty {
        return errors.New("reserved quantity cannot exceed total quantity")
    }
    return nil
})

// Trigger reorder point check after any stock update
router.OnRecordAfterUpdate("wms_inventory_stock").Add(func(e *core.RecordUpdateEvent) error {
    productId := e.Record.GetString("product")
    warehouseId := e.Record.GetString("warehouse")
    // Query reorder points and check threshold
    // Create alert if needed
    return nil
})

// Update last_movement_at timestamp on stock changes
router.OnRecordAfterCreate("wms_inventory_adjustments").Add(func(e *core.RecordCreateEvent) error {
    productId := e.Record.GetString("product")
    warehouseId := e.Record.GetString("warehouse")
    // Update inventory_stock last_movement_at
    return nil
})
```

---

## Testing Strategy

### Unit Tests

- Reorder point calculation logic
- FEFO batch sorting
- Stock level calculations (available = on-hand - reserved)
- Inventory adjustment validation

### Integration Tests

- Complete receive workflow with batch tracking
- Multi-step stock transfer between warehouses
- Low stock alert triggering
- Pick task generation with FEFO prioritization

### User Story Tests

- Operator receives and puts away items with batch numbers
- Manager views real-time stock levels across warehouses
- Cycle count and adjustment workflow
- Multi-warehouse stock visibility and transfers
- Low stock alerts sent to correct clients

---



### Unit Tests

- Inventory calculation (qty - reserved)
- Status transition validation
- Put-away rule matching logic
- Task state machine

### Integration Tests

- Full receive → put-away workflow
- Pick batch generation with different strategies
- Pack and ship workflow
- Returns processing workflow
- Replenishment triggering

### User Story Tests

- Operator receives items without confusion
- Picker follows optimized path and completes accurately
- Packer verifies contents and ships correctly
- Returns processor handles disposition properly
- Manager views accurate productivity metrics

### Load Tests

- Handle 1000+ concurrent tasks
- Rapid inventory updates (picking speed)
- Batch operations (bulk put-away)

---

## Related Documentation

- [WMS Dataflow Diagram](../dataflow/wms.md)
- [WMS User Stories](../stories/wms.md)
- [Database Schema](../postgres/wms-schema.md)
- [Mobile App Interface Specs](../../frontend/docs/wms-mobile.md)
- [TMS/DMS Integration](../integration/shipping-labels.md)

---

## Version History

| Date | Author | Changes |
|------|--------|---------|
| 2025-11-06 | Agent | Initial creation - 13 entities, 4 complex scenarios |
| | | |

---

## Questions & Notes

- **Picking Strategy**: Should we support dynamic strategy switching or fixed per warehouse?
- **Location Hierarchy Depth**: Any limit on nesting (Zone > Aisle > Rack > Shelf > Bin = 5 levels)?
- **Cross-Docking Rules**: What percentage of inventory typically qualifies for cross-dock?
- **Reverse Logistics**: Should damaged items trigger automatic supplier RMA?
- **Real-time Sync**: Mobile app offline support vs. always-connected assumption?
