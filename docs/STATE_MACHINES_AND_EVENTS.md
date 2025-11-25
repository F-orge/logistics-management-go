# State Machines & Email Event Triggers

Generated: November 23, 2025

## State Machines Overview

Based on the schema analysis at `src/pocketbase/schemas/`, the following state machines have been identified:

---

## 1. CRM Module

### 1.1 Lead Status (`crm.lead_status`)
**Location:** `src/pocketbase/schemas/customer-relations/leads.ts`

| State | Description |
|-------|-------------|
| `NEW` | Initial state when a lead is first created |
| `CONTACTED` | Lead has been reached out to; initial contact made |
| `QUALIFIED` | Lead meets criteria and shows buying intent |
| `UNQUALIFIED` | Lead does not meet criteria or lacks buying intent |
| `CONVERTED` | Lead successfully converted to a customer/opportunity |

**Transitions:** NEW → CONTACTED → QUALIFIED → CONVERTED
**Alternative Path:** NEW → CONTACTED → UNQUALIFIED (terminal state)

**Potential Email Events:**
- ✉️ `LeadQualified` - Notify sales team when lead is qualified
- ✉️ `LeadConverted` - Notify customer success team when converted
- ✉️ `LeadUnqualified` - Internal notification for archival

---

### 1.2 Opportunity Stage (`crm.opportunity_stage`)
**Location:** `src/pocketbase/schemas/customer-relations/opportunities.ts`

| State | Description |
|-------|-------------|
| `PROSPECTING` | Identifying potential customers; early research phase |
| `QUALIFICATION` | Determining if prospect fits business needs |
| `NEED_ANALYSIS` | Analyzing prospect's specific business requirements |
| `DEMO` | Demonstrating product/service to prospect |
| `PROPOSAL` | Formal proposal submitted for consideration |
| `NEGOTIATION` | Discussing terms, pricing, and contract details |
| `CLOSED_WON` | Deal successfully closed; customer acquired (terminal) |
| `CLOSED_LOST` | Deal lost; opportunity archived (terminal) |

**Transitions:** PROSPECTING → QUALIFICATION → NEED_ANALYSIS → DEMO → PROPOSAL → NEGOTIATION → (CLOSED_WON \| CLOSED_LOST)

**Potential Email Events:**
- ✉️ `OpportunityCreated` - Notify owner on new opportunity
- ✉️ `OpportunityQualified` - Move to qualification completed
- ✉️ `DemoScheduled` - Notify parties before demo
- ✉️ `ProposalSent` - Track when proposal goes out
- ✉️ `OpportunityClosed` - Notify stakeholders of close (won/lost)

---

### 1.3 Case Status (`crm.case_status`)
**Location:** `src/pocketbase/schemas/customer-relations/cases.ts`

| State | Description |
|-------|-------------|
| `NEW` | Case just created; awaiting assignment |
| `IN_PROGRESS` | Case assigned and work has started |
| `WAITING_FOR_CUSTOMER` | Awaiting customer response or action |
| `WAITING_FOR_INTERNAL` | Awaiting internal response or escalation |
| `ESCALATED` | Case escalated to management/senior team |
| `RESOLVED` | Resolution provided; awaiting customer confirmation |
| `CLOSED` | Case formally closed (terminal state) |
| `CANCELLED` | Case cancelled or no longer valid (terminal state) |

**Potential Email Events:**
- ✉️ `CaseCreated` - Notify support team of new case
- ✉️ `CaseAssigned` - Notify assigned agent
- ✉️ `CaseEscalated` - Alert management of escalation
- ✉️ `CaseResolved` - Notify customer of resolution
- ✉️ `CaseClosed` - Archive notification

---

### 1.4 Invoice Status (`crm.invoice_status`)
**Location:** `src/pocketbase/schemas/customer-relations/invoices.ts`

| State | Description |
|-------|-------------|
| `DRAFT` | Invoice created but not yet sent |
| `SENT` | Invoice sent to customer |
| `PAID` | Invoice fully paid (terminal state) |
| `OVERDUE` | Payment past due date (terminal state) |
| `CANCELLED` | Invoice cancelled/void (terminal state) |

**Potential Email Events:**
- ✉️ `InvoiceSent` - Notify customer invoice is ready
- ✉️ `InvoicePaid` - Acknowledge payment received
- ✉️ `InvoiceOverdue` - Payment reminder for overdue invoices
- ✉️ `InvoiceCancelled` - Notify of cancellation

---

## 2. Warehouse Management Module

### 2.1 Sales Order Status (`wms.sales_order_status`)
**Location:** `src/pocketbase/schemas/warehouse-management/sales-orders.ts`

| State | Description |
|-------|-------------|
| `PENDING` | Order received; awaiting warehouse processing |
| `PROCESSING` | Order in fulfillment; picking and packing in progress |
| `SHIPPED` | Order shipped; in transit to customer |
| `COMPLETED` | Order delivered and completed (terminal) |
| `CANCELLED` | Order cancelled (terminal) |

**Potential Email Events:**
- ✉️ `OrderCreated` - Confirm order received
- ✉️ `OrderProcessing` - Notify customer fulfillment started
- ✉️ `OrderShipped` - Send tracking information
- ✉️ `OrderCompleted` - Delivery confirmation
- ✉️ `OrderCancelled` - Cancellation notification

---

### 2.2 Return Status (`wms.return_status`)
**Location:** `src/pocketbase/schemas/warehouse-management/returns.ts`

| State | Description |
|-------|-------------|
| `REQUESTED` | Customer initiates return request |
| `APPROVED` | Warehouse manager approves the return |
| `REJECTED` | Return request denied |
| `RECEIVED` | Returned items received at warehouse |
| `PROCESSED` | Return fully processed and inventory updated (terminal) |

**Potential Email Events:**
- ✉️ `ReturnRequested` - Notify warehouse of return request
- ✉️ `ReturnApproved` - Notify customer approval
- ✉️ `ReturnRejected` - Notify rejection reason
- ✉️ `ReturnProcessed` - Final confirmation to customer

---

### 2.3 Inventory Stock Status (`wms.inventory_stock_status`)
**Location:** `src/pocketbase/schemas/warehouse-management/inventory-stock.ts`

| State | Description |
|-------|-------------|
| `AVAILABLE` | Stock ready for order fulfillment |
| `ALLOCATED` | Stock reserved for specific orders |
| `DAMAGED` | Stock damaged; awaiting disposal |
| `QUARANTINE` | Stock held for inspection/quality check |
| `HOLD` | Stock on hold for various reasons |
| `SHIPPED` | Stock shipped; no longer in warehouse |
| `EXPIRED` | Stock expired; disposal pending |

**Potential Email Events:**
- ✉️ `StockLow` - Alert when stock drops below threshold
- ✉️ `StockDamaged` - Notify of damaged inventory
- ✉️ `StockExpired` - Expiration warning

---

## 3. Transport Management Module

### 3.1 Driver Status (`tms.driver_status`)
**Location:** `src/pocketbase/schemas/transport-management/drivers.ts`

| State | Description |
|-------|-------------|
| `ACTIVE` | Driver available for assignments |
| `INACTIVE` | Driver not available/off-duty |
| `ON_LEAVE` | Driver on approved leave |

**Potential Email Events:**
- ✉️ `DriverStatusChanged` - Notify dispatch on status change
- ✉️ `DriverOnLeave` - Calendar update for leave
- ✉️ `DriverReturned` - Notify when driver returns active

---

### 3.2 Vehicle Status (`tms.vehicle_status`)
**Location:** `src/pocketbase/schemas/transport-management/vehicles.ts`

| State | Description |
|-------|-------------|
| `AVAILABLE` | Vehicle ready for dispatch |
| `IN_MAINTENANCE` | Vehicle undergoing maintenance/repair |
| `ON_TRIP` | Vehicle currently on active delivery/trip |
| `OUT_OF_SERVICE` | Vehicle temporarily out of service |

**Potential Email Events:**
- ✉️ `VehicleMaintenanceScheduled` - Notify of maintenance
- ✉️ `VehicleReturnedToService` - Alert when vehicle available again
- ✉️ `VehicleOutOfService` - Notify dispatch of unavailability

---

## 4. Billing Module (From Migrations)

### 4.1 Invoice Status (`billing.invoice_status_enum`)
**Location:** Database migration `1759665626293_billing.ts`

| State | Description |
|-------|-------------|
| `DRAFT` | Invoice template created |
| `SENT` | Invoice dispatched to payer |
| `VIEWED` | Invoice opened by recipient |
| `PAID` | Full payment received |
| `PARTIAL_PAID` | Partial payment received; balance outstanding |
| `PAST_DUE` | Payment deadline passed |
| `DISPUTED` | Payment disputed by customer |
| `CANCELLED` | Invoice voided |
| `VOID` | Invoice nullified (terminal) |

**Potential Email Events:**
- ✉️ `BillingInvoiceSent` - Invoice notification
- ✉️ `BillingPaymentReceived` - Payment confirmation
- ✉️ `BillingInvoiceOverdue` - Overdue payment notice
- ✉️ `BillingInvoiceDisputed` - Dispute notification
- ✉️ `BillingInvoiceCancelled` - Cancellation notice

---

## Summary Table: Email Event Opportunities

| Event Name | Module | Trigger | Recipients | Priority |
|------------|--------|---------|------------|----------|
| LeadQualified | CRM | Lead → QUALIFIED | Sales Team, Lead Owner | High |
| LeadConverted | CRM | Lead → CONVERTED | Customer Success, Lead Owner | High |
| OpportunityClosed | CRM | Opportunity → CLOSED_WON/LOST | All Stakeholders | High |
| ProposalSent | CRM | Opportunity → PROPOSAL | Customer, Sales Rep | High |
| CaseCreated | CRM | Case → NEW | Support Team | Medium |
| CaseEscalated | CRM | Case → ESCALATED | Management | High |
| CaseResolved | CRM | Case → RESOLVED | Customer, Support Team | High |
| InvoiceSent | CRM/Billing | Invoice → SENT | Customer, Finance | High |
| InvoicePaid | Billing | Invoice → PAID | Finance, Customer | High |
| InvoiceOverdue | Billing | Invoice → PAST_DUE/OVERDUE | Customer, Collections | High |
| OrderCreated | WMS | Order → PENDING | Customer, Warehouse | Medium |
| OrderShipped | WMS | Order → SHIPPED | Customer, Logistics | High |

---

## Recommended Implementation Priority

**Phase 1 (High Priority):**
- CRM: LeadQualified, LeadConverted, OpportunityClosed, ProposalSent
- Billing: InvoiceSent, InvoicePaid, InvoiceOverdue
- WMS: OrderShipped, ReturnApproved

**Phase 2 (Medium Priority):**
- CRM: CaseCreated, CaseEscalated, CaseResolved
- WMS: OrderCreated, ReturnProcessed, StockLow
- TMS: VehicleMaintenanceScheduled

**Phase 3 (Low Priority):**
- TMS: DriverStatusChanged
- Additional custom events based on business requirements

---

## Go Event Structure Template

```go
// Example event structure using the Emails proxy
type [EventName]Event struct {
    core.BaseRecordProxy
    
    // Reference to the affected entity
    EntityID   string
    EntityType string
    
    // Previous and new states (for state transitions)
    PreviousState string
    NewState      string
    
    // Metadata
    Timestamp     time.Time
    UserID        string
    
    // Email template and recipients
    Template  string
    Recipients []string
}
```
