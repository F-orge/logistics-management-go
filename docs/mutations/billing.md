# Billing Management Mutations Plan

> **Domain Description**: The Billing Management system handles all financial transactions, including client accounts, quoting, invoicing, payments, and disputes. It ensures accurate and timely billing for all logistics services.

### Overview

This document outlines the mutation strategy for all Billing Management entities. Each entity includes Create, Update, and Delete mutation specifications with field-level metadata for frontend form generation and PocketBase backend operations.

### Key Principles

- **Quote-to-Invoice Lifecycle**: Quotes can be converted into invoices, ensuring a seamless transition from pricing to billing.
- **Atomic Transactions**: Financial operations, such as applying a payment to an invoice, are atomic to prevent data inconsistencies.
- **Audit Trail**: All financial records (invoices, payments, credit notes) are designed to be immutable or have a clear audit trail for changes.
- **Role-Based Access**: Financial operations are strictly controlled by roles like Accounts Manager and Billing Specialist.
- **Data Integrity**: Financial calculations are performed and validated on the backend to ensure accuracy.

### Related Domains

- **Customer Relations (CRM)**: Invoices can be generated from Opportunities. Client information is shared.
- **Transport Management (TMS)**: Costs from internal trips and partner invoices feed into the billing system.
- **Warehouse Management (WMS)**: Storage and fulfillment services are billable items that generate invoices.

---

## Client Accounts

### Overview

**Purpose**: Manages the financial accounts for each client, including their wallet balance, credit limit, and payment terms. This entity is central to all billing operations.

**Key Relationships**:
- Belongs to: `Client` (from CRM/Users)
- Has many: `AccountTransactions`, `Invoices`, `Quotes`

**User Roles Involved**: Accounts Manager, Billing Specialist

### Create Mutation

#### Required Fields

- **client**
  - Type: `relation: Users`
  - Label: "Client"
  - Description: "The client this financial account belongs to."
  - Tooltip: "Select a user with the 'client' or 'client-admin' role."
  - Constraints: Required, unique.

#### Optional Fields

- **walletBalance**
  - Type: `number`
  - Label: "Wallet Balance"
  - Description: "The current prepaid balance in the client's wallet."
  - Tooltip: "Defaults to 0. Increases with top-ups, decreases with payments."
  - Constraints: Optional, defaults to 0.

- **creditLimit**
  - Type: `number`
  - Label: "Credit Limit"
  - Description: "The maximum amount of credit extended to this client."
  - Tooltip: "Set to 0 for no credit."
  - Constraints: Optional, defaults to 0.

- **isCreditApproved**
  - Type: `boolean`
  - Label: "Credit Approved"
  - Description: "Indicates if the client is approved to use credit."
  - Tooltip: "Must be true for the credit limit to be used."
  - Constraints: Optional, defaults to false.

- **paymentTermsDays**
  - Type: `number`
  - Label: "Payment Terms (Days)"
  - Description: "The number of days the client has to pay an invoice (e.g., 30 for Net 30)."
  - Tooltip: "Used to calculate invoice due dates."
  - Constraints: Optional, integer.

### Update Mutation

#### Mutable Fields

- **creditLimit**: Can be updated by an Accounts Manager.
- **isCreditApproved**: Can be updated.
- **paymentTermsDays**: Can be updated.

#### Immutable Fields

- **client**: Cannot be changed after creation.
- **walletBalance**: Cannot be updated directly. It is only changed via `AccountTransactions`.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Admin only.
- **Reference Constraints**: Cannot be deleted if there are any associated invoices or transactions.
- **Recommended Deletion Strategy**: Deactivation is strongly recommended over deletion. An `is_active` flag should be used to prevent new billing activities while preserving financial history.

---

## Account Transactions

### Overview

**Purpose**: Records every financial movement within a `ClientAccount`, such as payments, refunds, and adjustments. This provides a complete, auditable ledger of all transactions.

**Key Relationships**:
- Belongs to: `ClientAccount`

**User Roles Involved**: System (most transactions are system-generated), Accounts Manager (for adjustments)

### Create Mutation

#### Required Fields

- **clientAccount**
  - Type: `relation: ClientAccounts`
  - Label: "Client Account"
  - Description: "The account where the transaction occurred."
  - Constraints: Required.

- **amount**
  - Type: `number`
  - Label: "Amount"
  - Description: "The value of the transaction. Can be positive or negative."
  - Constraints: Required.

- **type**
  - Type: `enum: ['credit', 'debit', 'top-up', 'refund', 'adjustment', 'fee']`
  - Label: "Transaction Type"
  - Description: "The nature of the transaction."
  - Tooltip: "'debit' for payments, 'credit' for refunds/top-ups."
  - Constraints: Required.

#### Optional Fields

- **referenceNumber**
  - Type: `string`
  - Label: "Reference Number"
  - Description: "A reference for the transaction, such as a payment ID or invoice number."
  - Constraints: Optional.

- **processedBy**
  - Type: `relation: Users`
  - Label: "Processed By"
  - Description: "The user who initiated an adjustment or manual transaction."
  - Constraints: Optional.

#### Auto-Generated Fields

- **runningBalance**
  - Type: `number`
  - Description: "The snapshot of the `walletBalance` after this transaction was completed. Auto-calculated by a backend hook."

### Update Mutation

- **All fields are immutable**. Once a transaction is recorded, it cannot be changed. To correct an error, a new, counteracting transaction (e.g., an 'adjustment') must be created.

### Delete Mutation

### Delete Mutation

- **Deletion is not allowed**. As a core financial document, credit notes must never be deleted.

---

## Rate Cards

### Overview

**Purpose**: Defines the base pricing structure for services offered. Rate cards contain rules that determine how charges are calculated based on various factors like weight, distance, service level, and zone.

**Key Relationships**:
- Has many: `RateRules`

**User Roles Involved**: Pricing Analyst, Accounts Manager

### Create Mutation

#### Required Fields

- **name**
  - Type: `string`
  - Label: "Rate Card Name"
  - Description: "A descriptive name for this rate card (e.g., 'Domestic Shipping Rates Q1 2025')."
  - Constraints: Required, max 200 chars.

- **type**
  - Type: `enum: ['shipping', 'storage', 'fulfillment', 'handling', 'insurance', 'customs', 'packaging', 'returns']`
  - Label: "Service Type"
  - Description: "The category of service this rate card applies to."
  - Constraints: Required.

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether this rate card is currently in use."
  - Tooltip: "Only active rate cards are used in quote calculations."
  - Constraints: Required, defaults to false.

#### Optional Fields

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "A detailed explanation of when and how this rate card should be used."
  - Constraints: Optional.

- **validFrom / validTo**
  - Type: `date`
  - Label: "Validity Period"
  - Description: "The date range during which this rate card is valid."
  - Constraints: Optional.

- **createdBy**
  - Type: `relation: Users`
  - Description: "The user who created this rate card. Auto-set."
  - Constraints: Auto-generated.

### Update Mutation

#### Mutable Fields

- **name**: Can be updated.
- **description**: Can be updated.
- **isActive**: Can be toggled to activate/deactivate the rate card.
- **validFrom / validTo**: Can be updated.

#### Immutable Fields

- **type**: Cannot be changed after creation. To change the type, create a new rate card.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Pricing Analyst or Admin.
- **Reference Constraints**: Cannot delete a rate card that has associated `RateRules`.
- **Recommendation**: Instead of deleting, set `isActive` to false and set `validTo` to today's date. This preserves the historical record.

---

## Rate Rules

### Overview

**Purpose**: Defines specific pricing rules within a `RateCard`. Each rule specifies a condition (e.g., weight range, zone) and the corresponding price.

**Key Relationships**:
- Belongs to: `RateCards`

**User Roles Involved**: Pricing Analyst

### Create Mutation

#### Required Fields

- **rateCard**
  - Type: `relation: RateCards`
  - Label: "Rate Card"
  - Description: "The rate card this rule belongs to."
  - Constraints: Required.

- **value**
  - Type: `string`
  - Label: "Value"
  - Description: "The value that this rule applies to (e.g., zone code, weight range). The format depends on the rule type."
  - Constraints: Required.

- **condition**
  - Type: `string`
  - Label: "Condition"
  - Description: "The condition that must be met for this rule to apply (e.g., 'weight_between', 'zone_equals')."
  - Constraints: Required.

- **price**
  - Type: `number`
  - Label: "Price"
  - Description: "The calculated price when this rule applies."
  - Constraints: Required, must be >= 0.

- **pricingModel**
  - Type: `enum: ['per-kg', 'per-item', 'flat-rate', 'per-cubic-meter', 'per-zone', 'percentage', 'tiered']`
  - Label: "Pricing Model"
  - Description: "The model used to calculate the final price."
  - Tooltip: "'per-kg' multiplies price by weight; 'flat-rate' is a fixed charge; 'percentage' applies a percentage surcharge."
  - Constraints: Required.

- **priority**
  - Type: `number`
  - Label: "Priority"
  - Description: "The order in which rules are evaluated. Lower numbers are evaluated first."
  - Tooltip: "If multiple rules match, the one with the lowest priority wins."
  - Constraints: Required, integer.

#### Optional Fields

- **minValue / maxValue**
  - Type: `number`
  - Label: "Value Range"
  - Description: "For numeric conditions, the minimum and maximum values this rule applies to."
  - Constraints: Optional.

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether this rule is currently used in calculations."
  - Constraints: Optional, defaults to true.

### Update Mutation

#### Mutable Fields

- **value**: Can be updated.
- **price**: Can be updated.
- **condition**: Can be updated.
- **pricingModel**: Can be updated.
- **priority**: Can be updated.
- **minValue / maxValue**: Can be updated.
- **isActive**: Can be toggled.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Pricing Analyst.
- **Constraints**: Can be deleted freely. To deactivate a rule without deleting it, set `isActive` to false.

---

## Surcharges

### Overview

**Purpose**: Represents additional charges or fees that can be applied globally or conditionally to invoices. Surcharges are often used for fuel adjustments, seasonal charges, or special fees.

**Key Relationships**:
- Applied to: `Invoices`

**User Roles Involved**: Pricing Analyst, Accounts Manager

### Create Mutation

#### Required Fields

- **name**
  - Type: `string`
  - Label: "Surcharge Name"
  - Description: "The name of the surcharge (e.g., 'Fuel Surcharge', 'Peak Season Fee')."
  - Constraints: Required.

- **calculationMethod**
  - Type: `enum: ['percentage', 'fixed', 'per-unit', 'sliding-scale']`
  - Label: "Calculation Method"
  - Description: "How the surcharge is calculated."
  - Tooltip: "'percentage' is a % of the invoice total; 'fixed' is a flat amount; 'per-unit' multiplies by quantity."
  - Constraints: Required.

- **isActive**
  - Type: `boolean`
  - Label: "Active"
  - Description: "Whether this surcharge is currently applied to new invoices."
  - Constraints: Required, defaults to false.

#### Optional Fields

- **amount**
  - Type: `number`
  - Label: "Amount / Rate"
  - Description: "For fixed or percentage surcharges, the amount or rate."
  - Constraints: Optional.

- **type**
  - Type: `string`
  - Label: "Surcharge Type"
  - Description: "A category for grouping surcharges (e.g., 'Fuel', 'Seasonal', 'Special')."
  - Constraints: Optional.

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "A detailed explanation of the surcharge."
  - Constraints: Optional.

- **validFrom / validTo**
  - Type: `date`
  - Label: "Validity Period"
  - Description: "The date range during which this surcharge applies."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **name**: Can be updated.
- **calculationMethod**: Can be updated.
- **amount**: Can be updated.
- **isActive**: Can be toggled.
- **description**: Can be updated.
- **validFrom / validTo**: Can be updated.
- **type**: Can be updated.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Pricing Analyst.
- **Recommendation**: Instead of deleting, set `isActive` to false. This preserves the historical record of when surcharges were applied.

---

## Quotes

### Overview

**Purpose**: Provides a formal price estimate for services based on shipment details. Quotes are the initial step in the sales and billing process and can be accepted by clients to be converted into orders and invoices.

**Key Relationships**:
- Belongs to: `ClientAccounts`
- Can be converted to: `Invoices`

**User Roles Involved**: Sales Representative, Client (via portal), Accounts Manager

### Create Mutation

#### Required Fields (User Input)

- **originDetails**
  - Type: `string (HTML)`
  - Label: "Origin Details"
  - Description: "The full origin address or zone for the quote."
  - Constraints: Required.

- **destinationDetails**
  - Type: `string (HTML)`
  - Label: "Destination Details"
  - Description: "The full destination address or zone for the quote."
  - Constraints: Required.

- **weight**
  - Type: `number`
  - Label: "Weight (kg)"
  - Description: "The total weight of the shipment."
  - Constraints: Required, must be > 0.

#### Optional Fields (User Input)

- **client**
  - Type: `relation: ClientAccounts`
  - Label: "Client"
  - Description: "The client this quote is for."
  - Constraints: Optional, but required for client-specific pricing.

- **serviceLevel**
  - Type: `string`
  - Label: "Service Level"
  - Description: "The requested service level (e.g., 'Standard', 'Express')."
  - Tooltip: "Affects pricing and delivery time."
  - Constraints: Optional.

- **length / width / height**
  - Type: `number`
  - Label: "Dimensions (cm)"
  - Description: "The dimensions of the shipment, used for volumetric pricing."
  - Constraints: Optional.

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Any additional notes or instructions for this quote."
  - Constraints: Optional.

- **attachments**
  - Type: `file[]`
  - Label: "Attachments"
  - Description: "Supporting documents for the quote."
  - Constraints: Optional.

#### Auto-Generated & Backend-Set Fields

- **quoteNumber**
  - Type: `string`
  - Description: "A unique, sequential number for the quote. Generated by the backend."

- **quotePrice**
  - Type: `number`
  - Description: "The calculated price based on the pricing engine. Set by the backend."

- **status**
  - Type: `enum: ['pending', 'accepted', 'expired', 'cancelled', 'converted']`
  - Description: "The lifecycle status of the quote. Defaults to 'pending'."

- **expiredAt**
  - Type: `date`
  - Description: "The date the quote is no longer valid. Typically set to 30 days from creation."

- **createdBy**
  - Type: `relation: Users`
  - Description: "The user who created the quote. Auto-set to the current user."

### Update Mutation

#### Mutable Fields

- **status**: Can be updated to 'accepted', 'cancelled', or 'expired'. This is the primary mutation.
  - Side effects: Changing status to 'accepted' may trigger the invoice conversion process.

#### Immutable Fields

- All other fields are generally considered immutable after creation. To change quote details, it's better to cancel the existing quote and create a new one to maintain a clear audit trail.

### Delete Mutation

#### Deletion Rules

- **Role Requirements**: Accounts Manager or Admin.
- **State Constraints**: Can only be deleted if the status is 'pending' or 'cancelled'.
- **Recommendation**: It's highly recommended to never hard-delete quotes. Instead, set the status to 'cancelled' or 'expired' to maintain a complete history of all pricing offered to clients.

---

## Invoices

### Overview

**Purpose**: Represents a formal request for payment for services rendered. Invoices are the primary record for accounts receivable and can be generated from a `Quote`, a `SalesOrder`, or through a recurring billing cycle.

**Key Relationships**:
- Belongs to: `ClientAccounts`
- Can be created from: `Quotes`
- Has many: `InvoiceLineItems`, `Payments`, `Disputes`

**User Roles Involved**: Accounts Manager, Billing Specialist, System (auto-generation)

### Create Mutation

#### Required Fields (Backend-Set)

- **invoiceNumber**
  - Type: `string`
  - Description: "Unique, sequential invoice number. Generated by the backend."
  - Constraints: Required, unique.

- **issueDate**
  - Type: `date`
  - Description: "The date the invoice is generated. Auto-set to the creation date."
  - Constraints: Required.

- **dueDate**
  - Type: `date`
  - Description: "The date by which payment is due. Calculated based on `issueDate` and the client's `paymentTermsDays`."
  - Constraints: Required.

- **status**
  - Type: `enum: ['draft', 'sent', 'viewed', 'paid', 'partial-paid', 'past-due', 'disputed', 'cancelled', 'void']`
  - Label: "Invoice Status"
  - Description: "The current state of the invoice in the payment lifecycle."
  - Constraints: Required, defaults to 'draft'.

- **subtotal / totalAmount**
  - Type: `number`
  - Description: "The sum of all line items before and after taxes/discounts. Calculated by the backend."
  - Constraints: Required.

#### Optional Fields (Context-Dependent)

- **quote**
  - Type: `relation: Quotes`
  - Label: "Original Quote"
  - Description: "The quote that this invoice was converted from."
  - Constraints: Optional.

- **client**
  - Type: `relation: ClientAccounts`
  - Description: "The client being invoiced. Inherited from the quote or order."
  - Constraints: Required, but set based on context.

- **notes / paymentTerms**
  - Type: `string (HTML)`
  - Label: "Notes / Payment Terms"
  - Description: "Additional notes for the client or specific payment instructions."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **status**: Can be updated based on workflow events (e.g., sending the invoice changes it to 'sent'; applying a full payment changes it to 'paid').
- **notes / paymentTerms**: Can be updated on a 'draft' invoice.

#### Immutable Fields

- Once an invoice has been 'sent', most fields become immutable to maintain financial integrity. This includes `invoiceNumber`, `issueDate`, `dueDate`, and all financial amounts. Corrections should be made via `CreditNotes`.

### Delete Mutation

- **Hard deletion is not allowed**. Invoices are critical financial records. To invalidate an invoice, its `status` should be set to 'void' or 'cancelled'. This preserves the record for auditing purposes while ensuring it is not acted upon.

---

## Invoice Line Items

### Overview

**Purpose**: Represents a single item or service being charged on an `Invoice`. Each line item has its own description, quantity, and price.

**Key Relationships**:
- Belongs to: `Invoices`
- Can have: `Disputes`

**User Roles Involved**: System, Accounts Manager

### Create Mutation

#### Required Fields

- **invoice**
  - Type: `relation: Invoices`
  - Label: "Parent Invoice"
  - Description: "The invoice this line item belongs to."
  - Constraints: Required.

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "A clear description of the service or product being charged."
  - Constraints: Required.

- **quantity**
  - Type: `number`
  - Label: "Quantity"
  - Description: "The quantity of the item or service."
  - Constraints: Required, must be > 0.

- **unitPrice**
  - Type: `number`
  - Label: "Unit Price"
  - Description: "The price per unit of the item or service."
  - Constraints: Required, must be >= 0.

#### Optional Fields

- **discountAmount / discountRate**
  - Type: `number`
  - Label: "Discount"
  - Description: "A discount applied to this specific line item."
  - Constraints: Optional.

- **taxAmount / taxRate**
  - Type: `number`
  - Label: "Tax"
  - Description: "Tax applied to this specific line item."
  - Constraints: Optional.

### Update Mutation

- **All fields are immutable** once the parent invoice has been sent. If the invoice is in a 'draft' state, line items can be modified or deleted.

### Delete Mutation

- **Deletion is only allowed** if the parent invoice is in a 'draft' state. Once sent, line items cannot be removed; a `CreditNote` must be issued instead.

---

## Payments

### Overview

**Purpose**: Records a payment received from a client. Payments can be applied to one or more invoices and are critical for tracking revenue and accounts receivable.

**Key Relationships**:
- Belongs to: `ClientAccounts`
- Can be applied to: `Invoices`

**User Roles Involved**: System (via payment gateway), Accounts Manager, Billing Specialist

### Create Mutation

#### Required Fields

- **clientAccount**
  - Type: `relation: ClientAccounts`
  - Label: "Client Account"
  - Description: "The client account that made the payment."
  - Constraints: Required.

- **amount**
  - Type: `number`
  - Label: "Payment Amount"
  - Description: "The total amount of the payment received."
  - Constraints: Required, must be > 0.

- **paymentDate**
  - Type: `date`
  - Label: "Payment Date"
  - Description: "The date the payment was received."
  - Constraints: Required.

- **paymentMethod**
  - Type: `enum: ['credit-card', 'debit-card', 'wallet', 'qr-ph', 'client-credit', 'bank-transfer', 'cash', 'check']`
  - Label: "Payment Method"
  - Description: "The method used for the payment."
  - Constraints: Required.

- **status**
  - Type: `enum: ['pending', 'processing', 'successful', 'failed', 'cancelled', 'refunded']`
  - Label: "Payment Status"
  - Description: "The current status of the payment transaction."
  - Constraints: Required, defaults to 'successful' for manual entries, or set by gateway.

#### Optional Fields

- **invoice**
  - Type: `relation: Invoices`
  - Label: "Applied to Invoice"
  - Description: "The invoice this payment is for. If empty, it's a wallet top-up."
  - Tooltip: "Applying a payment here will update the invoice's `amountPaid`."
  - Constraints: Optional.

- **transactionId**
  - Type: `string`
  - Label: "Transaction ID"
  - Description: "The unique ID from the payment gateway or bank."
  - Constraints: Optional, but highly recommended for reconciliation.

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Any internal notes about the payment."
  - Constraints: Optional.

### Update Mutation

- **All fields are immutable**. Like other financial records, a payment record cannot be changed once created. To handle issues like a bounced check or a chargeback, a new transaction (e.g., a 'refund' or 'adjustment') must be created to reverse the payment.

### Delete Mutation

- **Deletion is not allowed**. Payments are fundamental audit trail items and must never be deleted.

---

## Disputes

### Overview

**Purpose**: Manages client disputes raised against specific invoice line items. This entity provides a formal workflow for reviewing, approving, or denying client claims about billing discrepancies.

**Key Relationships**:
- Belongs to: `Invoices`, `InvoiceLineItems`, `ClientAccounts`
- Can generate: `CreditNotes`

**User Roles Involved**: Client (via portal), Accounts Manager

### Create Mutation

#### Required Fields

- **client**
  - Type: `relation: ClientAccounts`
  - Label: "Client"
  - Description: "The client raising the dispute."
  - Constraints: Required.

- **lineItem**
  - Type: `relation: InvoiceLineItems`
  - Label: "Disputed Line Item"
  - Description: "The specific line item on the invoice that is being disputed."
  - Constraints: Required.

- **reason**
  - Type: `string (HTML)`
  - Label: "Reason for Dispute"
  - Description: "The client's explanation for why they are disputing the charge."
  - Constraints: Required.

- **status**
  - Type: `enum: ['open', 'under-review', 'approved', 'denied', 'escalated', 'closed']`
  - Label: "Dispute Status"
  - Description: "The current stage of the dispute resolution process."
  - Constraints: Required, defaults to 'open'.

#### Optional Fields

- **disputeAmount**
  - Type: `number`
  - Label: "Disputed Amount"
  - Description: "The amount being disputed. Defaults to the full line item amount if not specified."
  - Constraints: Optional.

- **attachments**
  - Type: `file[]`
  - Label: "Supporting Attachments"
  - Description: "Any evidence provided by the client to support their claim."
  - Constraints: Optional.

### Update Mutation

#### Mutable Fields

- **status**: Can be updated by an Accounts Manager as they review the dispute.
  - Side effect: Changing the status to 'approved' will trigger the creation of a `CreditNote`.
- **resolutionNotes**: An Accounts Manager can add notes when resolving the dispute.

#### Immutable Fields

- All other fields are immutable once the dispute is created.

### Delete Mutation

- **Deletion is not allowed**. Disputes are part of the financial audit trail and must be preserved. A dispute can be marked as 'closed' or 'denied' if it is invalid.

---

## Credit Notes

### Overview

**Purpose**: Represents a credit issued to a client, typically as the result of an approved `Dispute`. Credit notes are applied to invoices to reduce the amount owed.

**Key Relationships**:
- Belongs to: `Invoices`, `Disputes`

**User Roles Involved**: System (auto-generated), Accounts Manager

### Create Mutation

#### Required Fields (Backend-Set)

- **creditNoteNumber**
  - Type: `string`
  - Description: "Unique, sequential number for the credit note. Generated by the backend."
  - Constraints: Required, unique.

- **invoice**
  - Type: `relation: Invoices`
  - Description: "The invoice to which this credit is applied."
  - Constraints: Required.

- **dispute**
  - Type: `relation: Disputes`
  - Description: "The approved dispute that triggered this credit note."
  - Constraints: Required.

- **amount**
  - Type: `number`
  - Description: "The amount of the credit. Inherited from the `disputeAmount`."
  - Constraints: Required, must be > 0.

- **issueDate**
  - Type: `date`
  - Description: "The date the credit note was issued. Auto-set to the creation date."
  - Constraints: Required.

- **reason**
  - Type: `string (HTML)`
  - Description: "The reason for the credit. Inherited from the dispute `reason`."
  - Constraints: Required.

### Update Mutation

- **All fields are immutable**. A credit note is a final record of a financial adjustment and cannot be changed.

### Delete Mutation

- **Deletion is not allowed**. As a core financial document, credit notes must never be deleted.

---

## Complex Mutation Scenarios

### Scenario 1: Quote Acceptance and Payment Processing

**Trigger**: A client accepts a quote and proceeds to payment via the portal.

**Atomic Operation**:

1. **Create `Payment` Record**:
   - A payment request is sent to the payment gateway (e.g., Stripe, Maya).
   - If successful, a new `Payment` record is created with `status: 'successful'`.

2. **Create `Invoice` Record**:
   - A new `Invoice` is auto-generated from the quote.
   - `invoiceNumber` is auto-generated by the backend.
   - `status` is set to 'paid'.
   - `amountPaid` is set to the full `totalAmount`.

3. **Update `ClientAccount`**:
   - Create an `AccountTransaction` of type 'debit' for the payment amount.
   - Update the client's `walletBalance` if wallet payment was used.

4. **Create `Shipment` Record** (WMS):
   - A new shipment is created in the Warehouse Management System with the quote details.

**Error Handling**:
- If the payment gateway rejects the payment, the `Payment` record is created with `status: 'failed'`, and the operation stops.
- No invoice is generated, and no shipment is created.
- The client is notified and can retry with a different payment method.

### Scenario 2: Automated Monthly Billing for Services

**Trigger**: End-of-month scheduled job executes.

**Atomic Operation**:

1. **Query WMS/IMS for Usage Data**:
   - Retrieve all storage records for the month.
   - Retrieve all fulfillment activities (picks, packs) for the month.

2. **Calculate Charges**:
   - For each client, apply the active `RateCards` and `RateRules` to calculate storage and fulfillment fees.
   - Apply any active `Surcharges` (e.g., fuel, seasonal).

3. **Create `Invoice` and `InvoiceLineItems`**:
   - Create a new `Invoice` for the client with `status: 'draft'`.
   - Add `InvoiceLineItems` for each charge (e.g., storage, fulfillment, surcharges).
   - Calculate `subtotal`, `totalAmount`, and `dueDate` based on client's `paymentTermsDays`.

4. **Send Invoice**:
   - Update `Invoice.status` to 'sent'.
   - Send the invoice to the client's billing contact (from CRM).

**Error Handling**:
- If a client has no rate card defined, skip them and log an error for manual review.
- If an invoice calculation fails, the invoice remains in 'draft' state and is flagged for investigation.

### Scenario 3: Dispute Resolution with Credit Note Issuance

**Trigger**: An Accounts Manager approves a `Dispute`.

**Atomic Operation**:

1. **Update `Dispute` Record**:
   - Change `status` to 'approved'.
   - Add `resolutionNotes`.

2. **Create `CreditNote` Record**:
   - Generate a unique `creditNoteNumber`.
   - Set the `amount` to the `disputeAmount` from the dispute.
   - Link to both the `Dispute` and the `Invoice`.

3. **Update `Invoice`**:
   - Reduce `totalAmount` by the credit note amount.
   - If the credit note fully offsets the invoice, update the invoice `status` to 'paid'.

4. **Create `AccountTransaction`**:
   - Create a transaction of type 'credit' on the client's account for the credit note amount.

5. **Notify Client**:
   - Send a notification to the client about the approved dispute and the issued credit note.

**Error Handling**:
- If the credit note amount exceeds the line item amount, the operation fails and requires manual intervention.

---

## Validation Rules

### Global Validation Rules

- **Currency Fields**: Must be >= 0, exactly 2 decimal places for all financial amounts.
- **Invoice Numbers**: Must be unique and sequential.
- **Due Date**: Cannot be before the issue date.
- **Relations**: All referenced entities must exist in the database.
- **Enums**: Must be one of the predefined values.

### Entity-Specific Validation Rules

#### Invoices

- **issueDate** cannot be in the future.
- **dueDate** must be >= **issueDate**.
- **totalAmount** must be the sum of all line items plus any surcharges minus discounts.
- Cannot transition from 'paid' or 'past-due' back to 'draft'.

#### Payments

- **amount** must match the invoice amount or be less (for partial payments).
- **paymentDate** cannot be in the future.
- **transactionId** must be unique per payment method for reconciliation.

#### Quotes

- **quotePrice** is calculated by the backend based on active rate cards.
- **expiredAt** defaults to 30 days from creation unless explicitly set.
- Only one active quote per client-shipment combination (to avoid confusion).

#### Rate Rules

- **priority** is evaluated in ascending order. If two rules have the same priority, the one created first wins.
- **minValue** must be <= **maxValue** if both are provided.

---

## Frontend Implementation Guidance

### Form Generation

```typescript
// Example Zod schema for creating an invoice
const CreateInvoiceSchema = z.object({
  invoiceNumber: z.string().max(50),
  issueDate: z.date(),
  dueDate: z.date(),
  clientId: z.string().uuid(),
  totalAmount: z.number().min(0).multipleOf(0.01),
  status: z.enum(['draft', 'sent', 'viewed', 'paid', 'partial-paid', 'past-due', 'disputed', 'cancelled', 'void']),
});

// Example Zod schema for creating a rate rule
const CreateRateRuleSchema = z.object({
  rateCardId: z.string().uuid(),
  value: z.string(),
  condition: z.string(),
  price: z.number().min(0),
  pricingModel: z.enum(['per-kg', 'per-item', 'flat-rate', 'per-cubic-meter', 'per-zone', 'percentage', 'tiered']),
  priority: z.number().int(),
});
```

---

## Backend Implementation Guidance

### PocketBase Hooks

```go
// Example: Auto-generate invoice number
router.OnRecordBeforeCreate("billing_management_invoices").Add(func(e *core.RecordCreateEvent) error {
    // Generate the next sequential invoice number
    lastInvoice := // Query for the last invoice
    nextNumber := fmt.Sprintf("INV-%d", lastNumber + 1)
    e.Record.Set("invoiceNumber", nextNumber)
    return nil
})

// Example: Calculate invoice total on line item creation
router.OnRecordAfterCreate("billing_management_invoice_line_items").Add(func(e *core.RecordCreateEvent) error {
    invoiceId := e.Record.GetString("invoice")
    // Query all line items for this invoice and recalculate the total
    // Update the parent invoice's totalAmount
    return nil
})

// Example: Auto-generate credit note on dispute approval
router.OnRecordAfterUpdate("billing_management_disputes").Add(func(e *core.RecordUpdateEvent) error {
    if e.Record.GetString("status") == "approved" {
        // Create a new CreditNote record
        // Update the related invoice's status
    }
    return nil
})
```

---

## Testing Strategy

### Unit Tests

- Test each validation rule in isolation.
- Test quote price calculations with different rate cards and surcharges.
- Test invoice total calculations with various line items.

### Integration Tests

- Test the complete quote-to-invoice workflow.
- Test payment processing and invoice status updates.
- Test dispute resolution and credit note generation.
- Test automated billing cycles.

### User Story Tests

- Test end-to-end client quote request and payment flow.
- Test monthly billing automation for service charges.
- Test dispute submission, review, and resolution workflow.
- Test credit and wallet management for clients.

---

## Related Documentation

- [Billing Dataflow](./dataflow/billing.md)
- [Billing User Stories](./stories/billing.md)
- [Database Schema](./postgres/billing.md)
- [API Documentation](./api/billing.md)

---

## Version History

| Date | Author | Changes |
|------|--------|---------|
| 2025-11-06 | AI Assistant | Initial creation of comprehensive Billing Management mutations plan |
| | | |

---

## Questions & Notes

- How frequently should we update rate cards and surcharges? Should we version them?
- Should we support multi-currency invoicing, or lock to a single currency per client?
- What is the automatic escalation workflow for overdue invoices?
- Should credit notes be tied only to disputes, or can they be issued for other reasons?
