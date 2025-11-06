# PocketBase Seeding Script - Comprehensive Plan

Based on analysis of the PocketBase schema (`pb.types.ts`), dataflow documentation, and user stories, this document outlines the complete seeding strategy for the logistics management system.

## Data Seeding Order (Critical Dependencies)

### Phase 1: Foundational Setup
**Users** - All other records reference users as owners/managers
- Create 5-10 sample users with different roles (sales rep, warehouse manager, driver, etc.)
- Dependencies: None (foundational)

### Phase 2: CRM Core
**Companies** → **Contacts** → **Products (CRM)**
- Companies (independent, needs only owner reference)
- Contacts (depends on Companies, Users)
- Customer Relations Products (independent, basic product setup)

### Phase 3: Marketing & Sales Pipeline
**Campaigns** → **Leads** → **Opportunities** → **Opportunity Products**
- Campaigns (depends on Users - owner)
- Leads (depends on Users, Campaigns, optional)
- Opportunities (depends on Users, Companies, Contacts, Campaigns)
- Opportunity Products (depends on Opportunities, Products)

### Phase 4: CRM Operations
**Interactions** → **Cases** → **Invoices (CRM)**
- Interactions (depends on Contacts, Users, Cases)
- Cases (depends on Contacts, Users, owner)
- Customer Relations Invoices (depends on Opportunities, Products)
- Invoice Items (depends on Invoices, Products)

### Phase 5: Warehouse Infrastructure
**Warehouses** → **Locations** → **Putaway Rules**
- Warehouses (independent)
- Warehouse Locations (depends on Warehouses, parent locations)
- Putaway Rules (depends on Locations, Products, Warehouses)

### Phase 6: Inventory Management
**Suppliers** → **Products (WMS)** → **Inventory Batches** → **Inventory Stock** → **Bin Thresholds** → **Reorder Points**
- Warehouse Suppliers (independent)
- Warehouse Products (depends on Suppliers, optional)
- Inventory Batches (depends on Products)
- Inventory Stock (depends on Products, Locations, Batches)
- Bin Thresholds (depends on Products, Locations)
- Reorder Points (depends on Products, Warehouses)

### Phase 7: Sales & Fulfillment Orders
**Inbound Shipments** → **Sales Orders** → **Sales Order Items** → **Outbound Shipments**
- Inbound Shipments (depends on Clients/CRM Companies, Warehouses)
- Inbound Shipment Items (depends on Inbound Shipments, Products)
- Sales Orders (depends on Clients, Opportunities)
- Sales Order Items (depends on Sales Orders, Products)
- Outbound Shipments (depends on Sales Orders, Warehouses, Carriers)
- Outbound Shipment Items (depends on Outbound Shipments, Products, Sales Order Items, Batches)

### Phase 8: WMS Task Management
**Pick Batches** → **Pick Batch Items** → **Tasks** → **Task Items**
- Pick Batches (depends on Warehouses)
- Pick Batch Items (depends on Pick Batches, Sales Orders)
- Warehouse Tasks (depends on Warehouses, Users, Pick Batches)
- Task Items (depends on Tasks, Products, Locations)

### Phase 9: Transport Management
**Drivers** → **Vehicles** → **Carriers** → **Carrier Rates**
- Drivers (depends on Users)
- Driver Schedules (depends on Drivers)
- Vehicles (independent)
- Vehicle Maintenance (depends on Vehicles)
- Carriers (independent)
- Carrier Rates (depends on Carriers)

### Phase 10: Billing System
**Rate Cards** → **Rate Rules** → **Surcharges** → **Client Accounts** → **Quotes** → **Payments** → **Invoices**
- Rate Cards (depends on Users)
- Rate Rules (depends on Rate Cards)
- Surcharges (independent)
- Client Accounts (depends on CRM Companies/Users)
- Quotes (depends on Clients)
- Payments (depends on Invoices)
- Billing Invoices (depends on Quotes, Payments)
- Invoice Line Items (depends on Invoices)
- Billing Disputes (depends on Invoice Line Items, Clients)
- Credit Notes (depends on Invoices, Disputes)
- Account Transactions (depends on Client Accounts)

### Phase 11: Logistics Execution
**Routes** → **Trips** → **Trip Stops** → **Shipment Legs** → **Proof of Deliveries**
- Routes (independent, or derived from Vehicles)
- Trips (depends on Drivers, Vehicles)
- Trip Stops (depends on Trips, Shipments)
- Shipment Legs (depends on Trips, Carriers, Shipments)
- Shipment Leg Events (depends on Shipment Legs)
- Proof of Deliveries (TMS) (depends on Trip Stops)

### Phase 12: Delivery Management
**Delivery Routes** → **Delivery Tasks** → **Delivery Task Events** → **Driver Locations**
- Delivery Routes (depends on Drivers, Warehouses/WMS Packages)
- Delivery Tasks (depends on Delivery Routes, WMS Packages)
- Delivery Task Events (depends on Delivery Tasks)
- Driver Location (depends on Drivers)
- Proof of Deliveries (DMS) (depends on Delivery Tasks)

### Phase 13: Advanced & Operational
**GPS/Tracking** → **Expenses** → **Geofences** → **Notifications** & **Logs**
- GPS Pings (depends on Vehicles)
- Geofences (independent)
- Geofence Events (depends on Geofences, Vehicles)
- Expenses (depends on Drivers, Trips)
- Partner Invoices (depends on Carriers, Shipment Legs)
- Partner Invoice Items (depends on Partner Invoices, Shipment Legs)
- Notifications (depends on Users)
- Billing Management Logs (independent)
- Stock Transfers (depends on Warehouses, Products)
- Packages & Package Items (depends on Sales Orders, Products)
- Returns & Return Items (depends on Sales Orders, Products)

## Key Seeding Patterns

### Required Fields by Collection Type

**Auth Collections** (Users):
- email (required, unique)
- password (required)
- name (optional but recommended)

**Base Collections**:
- All collections require strategically chosen fields based on business logic
- Use descriptive, realistic names
- Maintain referential integrity

### Realistic Sample Data Scale

- **5-10 Users**: Sales reps, warehouse managers, drivers, dispatchers
- **3-5 Companies**: Sample logistics clients
- **20-30 Products**: Mix of warehouse and CRM products
- **2-3 Warehouses**: Different locations with hierarchical locations
- **1-3 Carriers**: Third-party shipping partners
- **5-10 Vehicles**: Fleet mix (different statuses)
- **5-10 Drivers**: With schedules and active status
- **Cascading Orders**: 5-10 sales orders with items, trips, delivery tasks
- **Relationships**: 1:N relationships properly seeded

### Data Flow Alignment

The seeding script should create realistic end-to-end flows:
1. **Marketing Flow**: Campaign → Lead → Opportunity → Invoice
2. **Sales Flow**: Company/Contact → Opportunity → Sales Order
3. **Warehouse Flow**: Inbound Shipment → Inventory → Pick Task → Outbound Shipment
4. **Transport Flow**: Driver + Vehicle → Trip → Trip Stops → POD
5. **Delivery Flow**: Package → Delivery Route → Delivery Tasks → Proof
6. **Billing Flow**: Rate Cards → Quote → Payment → Invoice

## File Structure Recommendation

Create a single TypeScript file: `/scripts/seed.ts` with organized phases:

```
src/scripts/seed.ts
├─ Phase 1: User seeding
│   ├─ Sales representatives
│   ├─ Warehouse managers
│   ├─ Drivers
│   └─ Dispatchers
├─ Phase 2-4: CRM data
│   ├─ Companies
│   ├─ Contacts
│   ├─ Campaigns
│   ├─ Leads
│   ├─ Opportunities
│   └─ Invoices
├─ Phase 5-6: Warehouse setup & inventory
│   ├─ Warehouses
│   ├─ Locations
│   ├─ Products
│   ├─ Inventory
│   └─ Thresholds
├─ Phase 7-9: Fulfillment & transport
│   ├─ Sales orders
│   ├─ Drivers & vehicles
│   ├─ Carriers
│   └─ Pick batches
├─ Phase 10-13: Billing, delivery, and operational data
│   ├─ Rate cards
│   ├─ Quotes
│   ├─ Trips
│   ├─ Delivery routes
│   └─ GPS/expenses
└─ Error handling & transaction management
```

## Implementation Considerations

### Database Constraints to Handle
- Unique constraints: email (Users)
- Foreign key constraints: All RecordIdString fields
- Enum constraints: Status fields with specific allowed values
- Optional vs. required fields: Omit optional fields to keep data clean

### Error Handling Strategy
- Wrap each phase in try-catch blocks
- Log successful creations with IDs for debugging
- Provide rollback mechanism or clear error messages
- Handle duplicate entries gracefully

### Data Validation
- Use Zod schemas from `@packages/graphql` if available
- Validate enum values against pb.types.ts
- Ensure date formats are ISO strings
- Handle GeoPoint coordinates correctly

### Testing & Verification
- Create seed script with dry-run option
- Verify referential integrity after seeding
- Check data counts per collection
- Validate relationships are properly established

## PocketBase SDK Integration

```typescript
import PocketBase from 'pocketbase';
import type { TypedPocketBase, Collections } from '../src/lib/pb.types';

const pb = new PocketBase('http://localhost:8090') as TypedPocketBase;

// Example seed function structure
async function seedPhase1() {
  try {
    const user = await pb.collection(Collections.Users).create({
      email: 'user@example.com',
      password: 'secure_password',
      passwordConfirm: 'secure_password',
      name: 'John Doe'
    });
    console.log('Created user:', user.id);
    return user.id;
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}
```

## Next Steps

1. Implement Phase 1 (Users) with basic CRUD error handling
2. Create ID storage mechanism for cross-phase references
3. Implement Phases 2-4 (CRM) with company/contact/lead flows
4. Implement Phases 5-6 (Warehouse) with inventory management
5. Implement Phases 7-9 (Orders & Transport) with complex relationships
6. Implement Phases 10-13 (Billing, Delivery, Operational)
7. Add seed command to package.json scripts
8. Document how to run seed script locally

