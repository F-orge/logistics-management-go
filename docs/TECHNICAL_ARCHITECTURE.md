# Logistics Management System - Technical Architecture Documentation

**Version:** 1.34  
**Author:** Karl Robeck Alferez  
**Contributors:** Mhell Bergonio, Vien Kendrick Morfe, Andrei Barlaan  
**Last Updated:** December 2, 2025  
**Total Lines of Code:** 94,116 lines (22,507 Go + 71,609 TypeScript/React)  
**Total Files:** 712 (233 Go files + 479 TS/TSX files)

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Design](#architecture-design)
4. [Project Structure](#project-structure)
5. [Core Modules](#core-modules)
6. [Database Schema](#database-schema)
7. [Backend Architecture](#backend-architecture)
8. [Frontend Architecture](#frontend-architecture)
9. [Data Flow & Event System](#data-flow--event-system)
10. [Deployment & DevOps](#deployment--devops)
11. [Development Workflow](#development-workflow)

---

## System Overview

The **Logistics Management System** is a comprehensive, full-stack application designed for ETMAR International Logistics Corporation to streamline their global food export and logistics operations. The system addresses critical operational challenges including inventory management, customer relations, transportation management, warehouse operations, and delivery tracking.

### Problem Statement

ETMAR Logistics previously relied on:
- Google Sheets and Google Docs for collaborative document management
- Manual email processes for shipment updates
- Outdated document sharing systems with poor version control
- Limited access control and security mechanisms
- No centralized system for inventory, order processing, or customer data
- Manual and time-consuming pricing quote generation
- Unreliable order and shipment tracking

### Solution

This monolithic full-stack system provides:
- **Centralized inventory and warehouse management**
- **Customer relationship management (CRM) capabilities**
- **Real-time shipment and delivery tracking**
- **Multi-modal transport management** (air freight, courier services)
- **Role-based access control (RBAC)**
- **Automated event-driven notifications**
- **Real-time GPS tracking and geofencing**

---

## Technology Stack

### Backend
- **Runtime:** Go 1.24.2
- **Database:** PocketBase (SQLite/PostgreSQL compatible)
- **HTTP Framework:** PocketBase HTTP Router
- **Event System:** PocketBase Core Event Hooks
- **ORM Concepts:** Custom record proxies with type-safe operations

### Frontend
- **Framework:** React 19.2.0 with TypeScript
- **Build Tool:** RSBuild (Webpack-based, faster than Vite for this use case)
- **UI Framework:** Radix UI (Headless components)
- **Styling:** Tailwind CSS 4.1
- **Routing:** TanStack Router v1.139
- **State Management:** TanStack Query v5.90 (Server state)
- **Form Management:** React Hook Form + AutoForm
- **Schema Validation:** Zod v4.1
- **Tables:** TanStack Table v8.21
- **Charting:** Recharts 2.15
- **Maps & Geolocation:** Leaflet + React Leaflet
- **Notifications:** Sonner (Toast library)
- **Theme Management:** next-themes

### Development & DevOps
- **Package Manager:** Bun (primary) + pnpm
- **Monorepo:** Bun workspaces
- **Linting & Formatting:** Biome 2.2.5 (enforces 120-char line width, 2-space indentation)
- **Task Runner:** Just (Makefile alternative)
- **Containerization:** Docker (multi-stage builds)
- **Database Migrations:** PocketBase migration system (Go-based)
- **Code Generation:** pocketbase-typegen (generates TypeScript types from PocketBase schema)

---

## Architecture Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Tailwind)              │
│  - React Router (TanStack Router)                          │
│  - Component Library (Radix UI)                            │
│  - State Management (React Query)                          │
│  - Form Management (React Hook Form + AutoForm)            │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST
┌──────────────────────▼──────────────────────────────────────┐
│           BACKEND (Go + PocketBase Framework)               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ API Router & HTTP Server (PocketBase)               │   │
│  │ - REST API endpoints auto-generated from schema     │   │
│  │ - Static file serving (frontend distribution)       │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Event System & Business Logic                       │   │
│  │ - OnRecordCreate hooks for Customer Relations       │   │
│  │ - OnRecordUpdate hooks for complex state machines   │   │
│  │ - Email notifications on entity transitions         │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Database Migrations                                 │   │
│  │ - Auto-migration support (300+ migrations)          │   │
│  │ - Schema versioning and rollback capability         │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │ SQL
┌──────────────────────▼──────────────────────────────────────┐
│              DATABASE (PocketBase SQLite)                    │
│  - Collections-based schema (~75+ collections)              │
│  - Automatic CRUD operations                                │
│  - Real-time subscriptions support                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 DEPLOYMENT (Docker)                          │
│  - Multi-stage build: Go backend + Node frontend            │
│  - Single Alpine image (lightweight & secure)               │
│  - Database volume persistence                              │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Full-Stack Monolith with Clear Separation of Concerns**
   - Backend handles business logic, events, and data persistence
   - Frontend handles presentation, forms, and client-side routing
   - Clear API boundary via REST

2. **Type-Safe End-to-End Development**
   - Go for backend type safety
   - TypeScript for frontend type safety
   - Automatic type generation from PocketBase schema (pocketbase-typegen)

3. **Event-Driven Architecture**
   - Business logic triggered by database record events
   - Decoupled event handlers for different domains
   - Email notifications triggered by entity state transitions

4. **Database-Centric Design**
   - PocketBase provides automatic REST API
   - No explicit API route definitions needed for CRUD
   - Migrations as code (versioned Go files)

5. **Component-Based UI**
   - Radix UI for accessible, unstyled components
   - Tailwind CSS for styling consistency
   - Reusable form components via AutoForm

---

## Project Structure

```
logistics-management-go/
│
├── package.json                    # Node dependencies (frontend + tooling)
├── go.mod                         # Go module definition
├── main.go                        # Backend entry point
├── justfile                       # Task automation (just dev, just build, etc.)
├── biome.json                     # Code formatting & linting config
├── rsbuild.config.ts              # Frontend build configuration
├── tsconfig.json                  # TypeScript configuration
├── Dockerfile                     # Multi-stage Docker build
│
├── src/                           # FRONTEND SOURCE CODE (71,609 lines)
│   ├── index.tsx                  # React entry point & app initialization
│   ├── routes/                    # TanStack Router pages
│   │   ├── __root.tsx             # Root layout
│   │   ├── index.tsx              # Home/login page
│   │   ├── auth.login.tsx         # Authentication route
│   │   └── dashboard/             # Dashboard with dynamic routing
│   │       ├── route.tsx
│   │       └── $schema.$collection.tsx  # Dynamic collection explorer
│   │
│   ├── components/                # REUSABLE COMPONENTS
│   │   ├── ui/                    # Base UI components (forms, inputs, etc.)
│   │   │   ├── autoform/          # Auto-generated forms from Zod schemas
│   │   │   ├── autoform-tanstack/ # TanStack Form integration
│   │   │   └── forms/             # Custom form components
│   │   │
│   │   ├── dialogs/               # Modal dialogs for CRUD operations
│   │   │   ├── customer-relations/
│   │   │   ├── warehouse-management/
│   │   │   ├── transport-management/
│   │   │   └── delivery-management/
│   │   │
│   │   ├── tables/                # Data tables by domain
│   │   │   ├── customer-relations/
│   │   │   ├── warehouse-management/
│   │   │   ├── transport-management/
│   │   │   └── delivery-management/
│   │   │
│   │   ├── controls/              # Domain-specific control components
│   │   │   ├── customer-relations/
│   │   │   ├── warehouse-management/
│   │   │   ├── transport-management/
│   │   │   └── delivery-management/
│   │   │
│   │   ├── actions/               # Form action components
│   │   ├── kibo-ui/               # Custom UI components
│   │   └── theme-provider.tsx     # Theme management
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-debounce.ts
│   │   └── use-mobile.ts
│   │
│   ├── lib/                       # Utility functions & type definitions
│   │   ├── pb.types.ts            # AUTO-GENERATED PocketBase types (~1,966 lines)
│   │   ├── utils.ts               # Helper functions
│   │   └── get-default-route.ts
│   │
│   ├── pocketbase/                # PocketBase schema definitions
│   │   └── schemas/               # Type-safe schema proxies
│   │       ├── customer-relations/     # CRM schemas
│   │       ├── warehouse-management/   # Inventory & warehouse schemas
│   │       ├── transport-management/   # Transport schemas
│   │       ├── delivery-management/    # Delivery schemas
│   │       └── system/                 # System schemas (users, auth, etc.)
│   │
│   └── styles/                    # Global CSS
│       └── globals.css            # Tailwind + custom styles
│
├── events/                        # BACKEND EVENT HANDLERS (Go)
│   ├── customer-relations.go      # CRM event handlers (~1,088 lines)
│   │   - OnLeadQualified
│   │   - OnLeadConverted
│   │   - OnLeadUnqualified
│   │   - OnOpportunityCreated
│   │   - OnOpportunityClosed
│   │   - OnProposalSent
│   │   - OnCaseCreated/Escalated/Resolved/Closed/Assigned
│   │   - OnInvoiceSent/Paid/Overdue/Cancelled
│   │
│   ├── warehouse-management.go    # Warehouse event handlers (~234 lines)
│   │   - OnOrderShipped
│   │   - OnOrderCompleted
│   │   - OnOrderCancelled
│   │
│   ├── email.go                   # Email proxy types for event handlers
│   └── [interceptors]/            # Pre/post-save hooks
│
├── migrations/                    # DATABASE MIGRATIONS (~180 migration files)
│   ├── 1762163871_created_customer_relations_products.go
│   ├── 1762165695_created_customer_relations_leads.go
│   ├── 1762183024_created_warehouse_management_products.go
│   ├── ... (300+ migration files covering all domains)
│   └── 1764575119_deleted_transport_management_vehicle_maintenance.go
│
├── pb_data/                       # PocketBase data directory
│   └── storage/                   # File uploads & backups
│
├── docs/                          # DOCUMENTATION
│   ├── main.md                    # Project overview & problem statement
│   ├── mvp.md                     # MVP scope & features
│   ├── TECHNICAL_ARCHITECTURE.md  # This file
│   ├── STATE_MACHINES_AND_EVENTS.md
│   ├── CUSTOMER_RELATIONS_REFACTORING.md
│   ├── seed-phases-analysis.md
│   ├── dataflow/                  # Data flow diagrams
│   ├── diagrams/                  # Architecture diagrams
│   ├── mutations/                 # GraphQL mutation documentation
│   ├── permission/                # RBAC documentation
│   ├── postgres/                  # PostgreSQL setup docs
│   ├── stories/                   # User stories by module
│   └── tests/                     # Testing documentation
│
├── scripts/                       # UTILITY SCRIPTS
│   └── register-field-schemas.ts  # Schema registration helper
│
└── components.json                # UI component registry
```

---

## Core Modules

The system is organized into 4 major business domains, each with complete CRUD functionality:

### 1. **Customer Relations Management (CRM)**

**Purpose:** Manage customer interactions, sales pipeline, and relationships.

**Collections:**
- `customer_relations_leads` - Sales leads with qualification status
- `customer_relations_opportunities` - Sales opportunities with stage tracking
- `customer_relations_companies` - Customer company information
- `customer_relations_contacts` - Individual contacts at companies
- `customer_relations_cases` - Support cases & issue tracking
- `customer_relations_interactions` - Communication history (emails, calls, meetings)
- `customer_relations_campaigns` - Marketing & sales campaigns
- `customer_relations_invoices` - Customer invoices
- `customer_relations_invoice_items` - Individual line items
- `customer_relations_products` - Products offered
- `customer_relations_opportunity_products` - Products in opportunities

**Key Features:**
- Lead scoring and qualification workflow
- Opportunity stage tracking (qualification → proposal → closed-won/lost)
- Automated email notifications on status transitions
- Invoice lifecycle management (draft → sent → paid → overdue)
- Support case escalation and resolution tracking

**Event Handlers:**
- Lead qualified → Notify sales team
- Lead converted → Create customer contact record
- Opportunity created → Email opportunity owner
- Invoice sent/overdue → Customer notification
- Case escalated → Management notification

---

### 2. **Warehouse Management (WMS)**

**Purpose:** Manage inventory, stock levels, and warehouse operations.

**Collections:**
- `warehouse_management_products` - Product catalog
- `warehouse_management_inventory_stock` - Current stock levels by location
- `warehouse_management_inventory_batches` - Batch tracking (expiry, lot numbers)
- `warehouse_management_warehouses` - Physical warehouse locations
- `warehouse_management_locations` - Bin/shelf locations within warehouses
- `warehouse_management_inbound_shipments` - Purchase orders received
- `warehouse_management_inbound_shipment_items` - Items in purchase orders
- `warehouse_management_outbound_shipments` - Sales orders to ship
- `warehouse_management_outbound_shipment_items` - Items in sales orders
- `warehouse_management_sales_orders` - Customer orders
- `warehouse_management_sales_order_items` - Individual order items
- `warehouse_management_pick_batches` - Batch picking operations
- `warehouse_management_packages` - Packaged shipments ready to ship
- `warehouse_management_returns` - Returned products
- `warehouse_management_stock_transfer` - Internal stock movements
- `warehouse_management_suppliers` - Vendor management
- `warehouse_management_reorder_points` - Inventory reorder thresholds
- `warehouse_management_bin_threshold` - Bin capacity limits
- `warehouse_management_putaway_rules` - Rules for bin assignment
- `warehouse_management_tasks` - Warehouse tasks (picking, packing, etc.)

**Key Features:**
- Real-time inventory tracking across multiple warehouses
- Automatic reorder point monitoring
- Batch/lot tracking for expiry management
- Pick/pack/ship operations
- Stock transfer between warehouses
- Return processing
- Supplier management

**Event Handlers:**
- Order shipped → Customer notification
- Order completed → Inventory adjustment
- Order cancelled → Stock return to inventory

---

### 3. **Transport Management (TMS)**

**Purpose:** Manage vehicle fleet, drivers, and carriers.

**Collections:**
- `transport_management_vehicles` - Fleet vehicles (trucks, vans)
- `transport_management_drivers` - Driver information & qualifications
- `transport_management_carriers` - Third-party carriers (partners)
- `transport_management_carrier_rates` - Carrier pricing

**Key Features:**
- Fleet vehicle management
- Driver profile and qualification tracking
- Third-party carrier management
- Carrier rate configuration

---

### 4. **Delivery Management**

**Purpose:** Manage delivery operations and last-mile tracking.

**Collections:**
- `delivery_management_tasks` - Individual delivery tasks
- `delivery_management_proof_of_deliveries` - Delivery confirmations
- `delivery_management_driver_location` - Driver GPS locations

**Key Features:**
- Delivery task management
- Driver location tracking
- Proof of delivery capture

---

### 5. **System Collections** (Supporting)

**Collections:**
- `users` - User accounts
- `emails` - Email queue/history (auto-generated by event handlers)
- `notifications` - System notifications
- `_authOrigins` - External authentication
- `_externalAuths` - Social auth links
- `_mfas` - Multi-factor authentication
- `_otps` - One-time passwords
- `_superusers` - Admin users

---

## Database Schema

### Schema Statistics

- **Total Collections:** ~42 (plus 8 system collections)
- **Total Migrations:** 180+
- **Total Database Records (typical deployment):** ~1,000,000+
- **Primary Key Strategy:** UUID (auto-generated by PocketBase)
- **Soft Deletes:** Supported via timestamp fields
- **Relationships:** Fully normalized with foreign keys

### Schema Organization

All collections follow a consistent naming convention:
```
{domain}_{entity}
```

Examples:
- `customer_relations_leads`
- `warehouse_management_inventory_stock`
- `transport_management_vehicles`
- `delivery_management_tasks`

### Key Relationships

```
CUSTOMER RELATIONS:
  Companies (1) ──→ (N) Contacts
  Companies (1) ──→ (N) Opportunities
  Companies (1) ──→ (N) Cases
  Leads ──[convert to]──> Contacts & Companies
  Opportunities (1) ──→ (N) Opportunity Products
  Opportunities (1) ──→ (N) Invoices
  Invoices (1) ──→ (N) Invoice Items

WAREHOUSE MANAGEMENT:
  Warehouses (1) ──→ (N) Locations
  Products (1) ──→ (N) Inventory Stock
  Inventory Stock ──→ Locations
  Suppliers (1) ──→ (N) Inbound Shipments
  Inbound Shipments (1) ──→ (N) Inbound Shipment Items
  Sales Orders (1) ──→ (N) Sales Order Items
  Outbound Shipments (1) ──→ (N) Outbound Shipment Items
  Pick Batches (1) ──→ (N) Pick Batch Items
  Returns (1) ──→ (N) Return Items
  Packages (1) ──→ (N) Package Items

TRANSPORT MANAGEMENT:
  Vehicles (1) ──→ (N) Drivers
  Carriers (1) ──→ (N) Carrier Rates

DELIVERY MANAGEMENT:
  Tasks (1) ──→ (N) Proof of Deliveries
  Drivers (1) ──→ (N) Driver Locations
```

---

## Backend Architecture

### Entry Point: `main.go`

```go
// Initialize PocketBase application
app := pocketbase.New()

// Register auto-migration system
migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
  Automigrate: true,  // Auto-apply pending migrations
})

// Serve frontend from ./frontend directory
app.OnServe().BindFunc(func(se *core.ServeEvent) error {
  se.Router.GET("/{path...}", apis.Static(os.DirFS("./frontend"), true))
  return se.Next()
})

// Register event handlers
app.OnRecordCreate("collection_name").BindFunc(handler)
app.OnRecordUpdate("collection_name").BindFunc(handler)
```

### Event System Architecture

**Event Hooks Registered:** ~20+ handlers across domains

#### Customer Relations Events

```go
// Lead Status Transitions
OnRecordUpdate("customer_relations_leads") → {
  status == "qualified"    → OnLeadQualified()     → Email sales team
  status == "converted"    → OnLeadConverted()     → Create contact/company
  status == "unqualified"  → OnLeadUnqualified()   → Email manager
}

// Opportunity Transitions
OnRecordCreate("customer_relations_opportunities") → OnOpportunityCreated()
OnRecordUpdate("customer_relations_opportunities") → {
  stage == "proposal"      → OnProposalSent()      → Email customer
  stage == "closed-won/closed-lost" → OnOpportunityClosed() → Notify
}

// Case Lifecycle
OnRecordCreate("customer_relations_cases") → OnCaseCreated() → Assign & notify
OnRecordUpdate("customer_relations_cases") → {
  status == "escalated"    → OnCaseEscalated()     → Notify management
  status == "resolved"     → OnCaseResolved()      → Customer confirmation
  status == "closed"       → OnCaseClosed()        → Archive
  owner != ""              → OnCaseAssigned()      → Notify assignee
}

// Invoice Lifecycle
OnRecordUpdate("customer_relations_invoices") → {
  status == "sent"         → OnInvoiceSent()       → Email customer
  status == "paid"         → OnInvoicePaid()       → Record payment
  status == "overdue"      → OnInvoiceOverdue()    → Reminder email
  status == "cancelled"    → OnInvoiceCancelled()  → Notification
}
```

#### Warehouse Events

```go
OnRecordUpdate("warehouse_management_sales_orders") → {
  status == "shipped"      → OnOrderShipped()      → Email customer
  status == "completed"    → OnOrderCompleted()    → Inventory finalize
  status == "cancelled"    → OnOrderCancelled()    → Stock return
}
```

### Email System Integration

Emails are created dynamically by event handlers:

```go
func OnLeadQualified(e *core.RecordEvent) error {
  // Find or create emails collection
  emailCollection, err := e.App.FindCollectionByNameOrId("emails")
  
  // Create email record with proxy
  emailRecord := core.NewRecord(emailCollection)
  emailProxy := &Emails{}
  emailProxy.SetProxyRecord(emailRecord)
  
  // Set email fields
  emailProxy.SetTo(leadEmail)
  emailProxy.SetSubject("Lead Qualified: " + leadName)
  emailProxy.SetMessage(emailBody)
  emailProxy.SetUserId(ownerID)
  
  // Save to database
  return e.App.Save(emailProxy)
}
```

### Type-Safe Record Proxies

Email proxy type:

```go
type Emails struct {
  core.BaseRecordProxy
}

func (e *Emails) UserId() string { return e.GetString("user") }
func (e *Emails) SetUserId(id string) { e.Set("user", id) }

func (e *Emails) To() string { return e.GetString("to") }
func (e *Emails) SetTo(to string) { e.Set("to", to) }

func (e *Emails) Subject() string { return e.GetString("subject") }
func (e *Emails) SetSubject(subject string) { e.Set("subject", subject) }

func (e *Emails) Message() string { return e.GetString("message") }
func (e *Emails) SetMessage(message string) { e.Set("message", message) }
```

### Database Migrations

Migrations are stored in `/migrations/` as Go files using PocketBase migration format:

```go
// File: 1762165695_created_customer_relations_leads.go
package migrations

import (
  "log"
  "github.com/pocketbase/pocketbase/core"
  m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
  m.Register(func(db *dbx.DB) error {
    jsonSchema := []byte(`{
      "id": "...",
      "name": "customer_relations_leads",
      "type": "base",
      "system": false,
      "fields": [...],
      ...
    }`)
    
    collection := &models.Collection{}
    json.Unmarshal(jsonSchema, &collection)
    return db.Model(collection).Create(collection).Error
  }, func(db *dbx.DB) error {
    // Rollback logic
  })
}
```

---

## Frontend Architecture

### React Application Structure

**Entry Point:** `src/index.tsx`

```tsx
// Setup TanStack Query for server state
const queryClient = new QueryClient()

// Initialize PocketBase client (type-safe)
const pocketbase = new PocketBase() as TypedPocketBase

// Setup TanStack Router with context
const router = createRouter({
  routeTree,
  context: { queryClient, pocketbase }
})

// Render app with providers
<PocketBaseProvider>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </ThemeProvider>
  </QueryClientProvider>
</PocketBaseProvider>
```

### Routing Architecture

Uses TanStack Router with file-based routing:

```
routes/
├── __root.tsx                           # Root layout
├── index.tsx                            # Login page (/)
├── auth.login.tsx                       # Auth page (/auth/login)
└── dashboard/
    ├── route.tsx                        # Dashboard layout (/dashboard)
    └── $schema.$collection.tsx          # Dynamic collection view
                                         # (/dashboard/[schema]/[collection])
```

**Dynamic Route:** `$schema.$collection.tsx`

This single route handles all 42 implemented collections:
- `/dashboard/customer-relations/leads`
- `/dashboard/warehouse-management/products`
- `/dashboard/transport-management/vehicles`
- `/dashboard/delivery-management/tasks`
- etc.

### Component Organization

```
COMPONENT HIERARCHY:

src/components/
├── ui/                                  # Base UI (inputs, buttons, etc.)
│   ├── forms/                           # Form components
│   ├── autoform/                        # Auto-generate forms from Zod
│   └── autoform-tanstack/               # TanStack Form integration
│
├── tables/                              # Data tables (TanStack Table)
│   ├── customer-relations/              # CRM tables
│   ├── warehouse-management/            # WMS tables
│   ├── transport-management/            # TMS tables
│   └── delivery-management/             # DMS tables
│
├── dialogs/                             # Modal forms (create/edit/delete)
│   ├── customer-relations/
│   ├── warehouse-management/
│   ├── transport-management/
│   └── delivery-management/
│
├── controls/                            # Domain controls (specialized UI)
│   ├── customer-relations/
│   ├── warehouse-management/
│   ├── transport-management/
│   └── delivery-management/
│
├── actions/                             # Form action components
└── kibo-ui/                             # Custom design system
```

### Form Management Pattern

**Pattern:** React Hook Form + Zod + AutoForm

```tsx
// Define Zod schema (type-safe)
const createLeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  score: z.number().min(0).max(100),
  status: z.enum(["new", "qualified", "converted", "unqualified"]),
  owner: z.string()
})

// Auto-generate form UI from schema
<AutoForm
  schema={createLeadSchema}
  onSubmit={async (data) => {
    await pb.collection("customer_relations_leads").create(data)
  }}
/>
```

### State Management

**Server State:** TanStack Query

```tsx
// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ["leads"],
  queryFn: () => pb.collection("customer_relations_leads").getFullList()
})

// Mutate data
const { mutate } = useMutation({
  mutationFn: (data) => pb.collection("customer_relations_leads").create(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["leads"] })
  }
})
```

### Styling Strategy

**Tailwind CSS v4.1** with custom configuration:

```tsx
// Applied via className
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Submit
</button>

// CSS-in-JS via class composition
import { clsx } from "clsx"
<div className={clsx(
  "px-4 py-2",
  isActive && "bg-blue-500",
  !isActive && "bg-gray-200"
)} />
```

### UI Component Library (Radix)

Radix UI provides unstyled, accessible components:

```tsx
import { Button } from "@radix-ui/react-primitive"

<Button
  asChild
  className="px-4 py-2 bg-blue-500 rounded"
>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

---

## Data Flow & Event System

### Lead Lifecycle Data Flow

```
FRONTEND
  User creates lead via form
    ↓
    Submits POST to /api/leads
    ↓
BACKEND (PocketBase)
  Record saved to database
    ↓
    OnRecordCreate("customer_relations_leads") triggered
    ↓
  Event Handler executes
    ├─ Validates lead data
    ├─ Optionally creates contact record
    └─ Returns to next handler
    ↓
FRONTEND
  Query invalidates
    ↓
    Re-fetches leads list
    ↓
  UI updates with new lead
```

### Lead Qualification Data Flow

```
FRONTEND
  User updates lead status to "qualified"
    ↓
    Submits PATCH to /api/leads/{id}
    ↓
BACKEND (PocketBase)
  Record updated in database
    ↓
    OnRecordUpdate("customer_relations_leads") triggered
    ↓
    Status === "qualified" check
    ↓
    OnLeadQualified event handler executes:
    ├─ Extract lead info (name, email, score)
    ├─ Create emails collection record
    ├─ Set email fields:
    │   ├─ to: leadEmail
    │   ├─ subject: "Lead Qualified: {name} (Score: {score})"
    │   ├─ message: Formatted HTML template
    │   └─ user: leadOwner
    ├─ Save email record to database
    └─ Continue to next handler
    ↓
EMAIL SYSTEM (external/async)
  Email processing job picks up record
    ↓
    Sends notification to sales team
    ↓
    Updates email status (sent/failed)
```

### Order Shipment Data Flow

```
FRONTEND (Warehouse Staff)
  Updates sales order status to "shipped"
    ↓
    Submits PATCH to /api/sales-orders/{id}
    ↓
BACKEND (PocketBase)
  Record updated
    ↓
    OnRecordUpdate("warehouse_management_sales_orders") triggered
    ↓
    Status === "shipped" check
    ↓
    OnOrderShipped event handler executes:
    ├─ Get order details (orderNumber, shippingAddress)
    ├─ Query for contact via company relationship
    ├─ Extract contact email
    ├─ Create email notification:
    │   ├─ to: customerEmail
    │   ├─ subject: "Your Order #{orderNumber} Has Been Shipped"
    │   ├─ message: "Your order is on its way..."
    │   └─ user: staffMember
    └─ Save email record
    ↓
FRONTEND (Customer Portal)
  Polls for order updates
    ↓
    Displays "Order Shipped" status
    ↓
    Shows tracking information (if available)
```

### Complex State Machine: Opportunity Lifecycle

```
NEW
  │
  ├─→ OnRecordCreate() triggered
  │     └─ Email opportunity owner
  │
QUALIFICATION
  │
  ├─→ Progress to PROPOSAL
  │     └─ OnProposalSent()
  │         ├─ Generate quote/proposal
  │         └─ Email customer
  │
PROPOSAL
  │
  ├─→ Progress to NEGOTIATION
  │
NEGOTIATION
  │
  ├─→ Progress to CLOSED-WON
  │     └─ OnOpportunityClosed()
  │         ├─ Create sales order
  │         ├─ Email customer success
  │         └─ Trigger fulfillment workflow
  │
  └─→ Progress to CLOSED-LOST
      └─ OnOpportunityClosed()
          ├─ Archive opportunity
          └─ Email sales management
```

---

## Deployment & DevOps

### Dockerfile Architecture

Multi-stage build for optimization:

```dockerfile
# STAGE 1: Go Backend Build
FROM golang:1.24.2-alpine
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o pocketbase .

# STAGE 2: Node Frontend Build
FROM node:latest
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
COPY src ./src
COPY rsbuild.config.ts tsconfig.json ./
RUN pnpm install
RUN pnpm run build    # Outputs to .output/

# STAGE 3: Runtime (Alpine)
FROM alpine:3.20
WORKDIR /app
COPY --from=go-builder /app/pocketbase ./
COPY --from=frontend-builder /app/.output ./frontend
COPY migrations ./migrations
EXPOSE 80
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:80"]
```

**Build Output:**
- Single Alpine image (~100-150MB)
- Backend binary: `pocketbase` (~10-15MB)
- Frontend: Static files in `./frontend` (~5-10MB)
- Lightweight, production-ready

### Docker Deployment

**Environment Variables:**
```bash
DOCKER_REGISTRY_URL=registry.example.com
DEPLOYMENT_WEBHOOK_URL=https://webhook.example.com/deploy
```

**Commands:**
```bash
just docker-build          # Build Docker image
just docker-push           # Push to registry & trigger deployment
```

### Development Workflow

**Commands via `justfile`:**

```bash
just dev                   # Run backend + frontend concurrently
just dev-backend          # Run backend only
just dev-frontend         # Run backend only
just build                # Build for production
just typecheck            # Run TypeScript type checking
just lint                 # Lint & auto-fix code
just test                 # Run tests
just introspect           # Generate TypeScript types from schema
```

---

## Development Workflow

### Code Formatting & Linting

**Tool:** Biome 2.2.5 (enforced standards)

```bash
# Auto-fix formatting & linting issues
bun run check

# Or use just command
just check
```

**Rules:**
- Line width: 120 characters
- Indentation: 2 spaces
- Quotes: Double quotes
- Semicolons: Always required
- Trailing commas: ES5 style

### Type Generation

Generate TypeScript types from PocketBase schema:

```bash
just introspect

# Outputs: src/lib/pb.types.ts (~1,966 lines)
```

### Adding New Collections

1. **Create migration** (in `/migrations/`):
```go
// 1762XXX_created_new_collection.go
func init() {
  m.Register(func(db *dbx.DB) error {
    // Create collection with fields
  })
}
```

2. **Generate types**:
```bash
just introspect
```

3. **Create schema proxy** (in `src/pocketbase/schemas/`):
```ts
export const newCollectionSchema = z.object({
  field1: z.string(),
  field2: z.number(),
  // ...
})
```

4. **Create UI components** (dialogs, tables, forms):
```tsx
// src/components/tables/domain/new-collection-table.tsx
// src/components/dialogs/domain/new-collection-dialog.tsx
// src/components/actions/domain/new-collection-actions.tsx
```

5. **Register in dashboard router** (if not auto-discovered)

### Adding Event Handlers

1. **Create event handler** in `events/{domain}.go`:

```go
func OnNewEvent(e *core.RecordEvent) error {
  // Get record data
  record := e.Record
  
  // Process logic
  // Create email, update other records, etc.
  
  // Continue to next handler
  return e.Next()
}
```

2. **Register in `main.go`**:

```go
app.OnRecordUpdate("collection_name").BindFunc(func(e *core.RecordEvent) error {
  if e.Record.GetString("field") == "value" {
    return events.OnNewEvent(e)
  }
  return e.Next()
})
```

3. **Test the event handler** by triggering the condition in the UI

### Local Development Setup

```bash
# Install dependencies
bun install

# Start dev server (backend + frontend)
just dev

# Access application
# Frontend: http://localhost:3001
# Backend API: http://localhost:8090
# PocketBase Admin: http://localhost:8090/_/
```

---

## Code Statistics

### Lines of Code Breakdown

| Category | Files | Lines | Language |
|----------|-------|-------|----------|
| Backend (Go) | 233 | 22,507 | Go |
| Frontend | 479 | 71,609 | TypeScript/React |
| **Total** | **712** | **94,116** | - |

### File Distribution

| Component | File Count | Purpose |
|-----------|-----------|---------|
| Components | ~280 | React components (dialogs, tables, forms) |
| Hooks | 2 | Custom React hooks |
| Routes | 5 | Page/route definitions |
| Libraries | 4 | Utilities & types |
| Schemas | ~40 | PocketBase type definitions |
| Styles | 1 | Global CSS |
| Events | 3 | Backend event handlers |
| Migrations | 180 | Database schema versions |
| Scripts | 1 | Utility scripts |

### Database Migrations

- **Total migrations:** 180+
- **Creation migrations:** ~75 (initial schema creation)
- **Update migrations:** ~105 (schema modifications)
- **Auto-migration:** Enabled (applied on startup)

---

## Key Design Decisions

### Why PocketBase?

1. **Rapid prototyping:** Auto-generated REST API from schema
2. **Minimal backend code:** No explicit CRUD routes needed
3. **Built-in features:** Authentication, permissions, file uploads
4. **Type-safe:** Schema defines API contract
5. **Embeddable:** Single binary includes frontend + backend

### Why TanStack Router?

1. **File-based routing:** Less boilerplate than traditional routers
2. **Type-safe routes:** Compile-time route validation
3. **Nested layouts:** Supports complex dashboard layouts
4. **Code splitting:** Automatic per-route code splitting
5. **Context injection:** Pass database & query client to routes

### Why React Hook Form + Zod?

1. **Performance:** Minimal re-renders
2. **Type-safe:** Zod provides runtime validation
3. **Flexible:** Works with any UI component library
4. **Integration:** Seamless with AutoForm
5. **DX:** Excellent developer experience

### Why Radix UI?

1. **Unstyled:** Full control over appearance
2. **Accessible:** WCAG compliant components
3. **Composable:** Build custom components easily
4. **Headless:** Works with any CSS solution
5. **Active maintenance:** Well-maintained library

### Why Monolith (Not Microservices)?

1. **Complexity:** Microservices would add deployment complexity
2. **Scale:** Current scale doesn't require distributed system
3. **Data consistency:** Event handlers can be co-located with database
4. **DevOps:** Single deployment unit is simpler
5. **Team size:** Team can maintain single codebase

---

## Performance Considerations

### Frontend Optimization

- **Code splitting:** TanStack Router auto-splits by route
- **Query caching:** TanStack Query caches server data
- **Virtual scrolling:** Tables with 1000+ rows
- **Lazy loading:** Components loaded on-demand
- **CSS-in-JS:** Tailwind purges unused CSS

### Backend Optimization

- **Database indexing:** Automatic on commonly queried fields
- **Connection pooling:** PocketBase handles connection management
- **Request rate limiting:** Built into PocketBase
- **Caching:** Browser cache headers on static assets
- **Gzip compression:** Enabled by default

### Database Optimization

- **Normalization:** Proper schema design for query performance
- **Batch operations:** Use transactions for multi-record updates
- **Indexes:** Created on foreign keys and frequently filtered fields
- **Query optimization:** PocketBase generates efficient SQL

---

## Security Considerations

### Authentication & Authorization

- **User registration:** Secure password hashing (bcrypt)
- **Session management:** JWT tokens with expiration
- **MFA support:** Optional multi-factor authentication
- **RBAC:** Role-based access control via PocketBase rules
- **External auth:** Support for OAuth providers

### Data Security

- **Encryption at rest:** Database can be encrypted
- **Encryption in transit:** HTTPS/TLS required in production
- **API validation:** Zod schemas validate all inputs
- **SQL injection prevention:** Parameterized queries via PocketBase ORM
- **CORS:** Configured appropriately for security

### Access Control

- **Collection-level permissions:** PocketBase rules engine
- **Record-level permissions:** Custom Go event handlers
- **Field-level permissions:** Can be implemented in PocketBase rules
- **Audit logging:** Track all data changes via audit collection

---

## Monitoring & Debugging

### Development Tools

- **Browser DevTools:** Debug frontend state & network
- **PocketBase Admin UI:** Manage collections & data (http://localhost:8090/_/)
- **React DevTools:** Inspect component hierarchy
- **Network Inspector:** Monitor API requests
- **Console logs:** Debug event handlers

### Production Monitoring

- **Error tracking:** Implement Sentry integration
- **Performance monitoring:** Add web vitals tracking
- **Log aggregation:** Centralize backend logs
- **Database monitoring:** Monitor query performance
- **Health checks:** Implement health endpoints

---

## Future Enhancements

### Potential Improvements

1. **GraphQL API:** Add GraphQL layer for complex queries
2. **Real-time subscriptions:** WebSocket support for live updates
3. **Search capabilities:** Full-text search across collections
4. **Advanced reporting:** BI dashboard & analytics
5. **Workflow automation:** No-code workflow builder
6. **Mobile app:** Native mobile application (React Native)
7. **Internationalization:** Multi-language support
8. **Advanced analytics:** Customer behavior tracking
9. **AI-powered features:** Recommendation engine
10. **Integration marketplace:** Third-party integrations

---

## Conclusion

The Logistics Management System is a comprehensive, production-ready application built with modern full-stack technologies. It addresses ETMAR Logistics' critical operational challenges through:

- **Type-safe end-to-end development** (Go + TypeScript)
- **Event-driven architecture** for business logic automation
- **Full-featured database schema** covering all logistics domains
- **Accessible, responsive UI** using Radix UI & Tailwind
- **Production-ready deployment** via Docker

The monolithic architecture provides a solid foundation for ETMAR's operations while maintaining code clarity and developer productivity. As the business grows, the system can be extended with new collections, event handlers, and UI components without requiring major architectural changes.

### Getting Started

```bash
# Clone repository
git clone <repo-url>

# Install dependencies
bun install

# Start development server
just dev

# Generate database types
just introspect

# Build for production
just build

# Deploy via Docker
just docker-push
```

### Key Contact Points

- **Frontend entry:** `src/index.tsx`
- **Backend entry:** `main.go`
- **Event handlers:** `events/`
- **Database schema:** `migrations/`
- **UI components:** `src/components/`
- **Type definitions:** `src/lib/pb.types.ts`

---

**Document Generated:** December 2, 2025  
**System Version:** 1.34  
**Total Development Time:** ~6 months  
**Team Size:** 4 developers
