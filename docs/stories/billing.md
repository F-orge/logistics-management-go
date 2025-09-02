# User Story: Upfront Shipment Quoting and Billing

**User Story:** As a sales representative or a client using a self-service
portal, I want to get an immediate price quote for a shipment based on its
details, so that I can approve the cost and create the shipment order.

**Acceptance Criteria:**

- **Given** a user enters the shipment's origin, destination, weight, and
  dimensions, **When** they request a quote, **Then** the system should
  calculate and display the price based on pre-configured rate tables.

- **Given** the quote is displayed, **When** the user selects a service level
  (e.g., "Standard," "Express"), **Then** the price should update accordingly.

- **Given** the user accepts the quote, **When** they proceed to payment,
  **Then** the system should process the payment via an integrated payment
  gateway, and a paid invoice should be generated and associated with the new
  shipment record.

---

# User Story: Automated Client Service Billing

**User Story:** As an accounts manager, I want the system to automatically
generate monthly invoices for our clients based on their usage of our
warehousing and fulfillment services, so that we can ensure accurate and timely
billing.

**Acceptance Criteria:**

- **Given** a client is on a monthly billing cycle, **When** the end-of-month
  billing process runs, **Then** the system should calculate storage fees based
  on the volume of inventory and duration stored (data from IMS/WMS).

- **Given** the billing process is running, **When** it calculates fulfillment
  fees, **Then** it should tally the cost for each order picked and packed
  during the month (data from WMS).

- **Given** the invoice is finalized, **When** it is sent to the client,
  **Then** the invoice should be itemized with clear line items for storage,
  fulfillment, and any other services, and the client's billing contact should
  be pulled from the CRM.

---

# User Story: Shipping Documentation Management

**User Story:** As a logistics coordinator, I want the system to automatically
generate and store critical shipping documents (like Bills of Lading or Customs
Forms), so that we can ensure compliance and have a digital record for every
shipment.

**Acceptance Criteria:**

- **Given** a shipment is confirmed and ready for transit, **When** the system
  processes the shipment, **Then** it should automatically generate a standard
  Bill of Lading (BOL) pre-filled with the shipper, consignee, and cargo details
  from the shipment record.

- **Given** I am managing a shipment, **When** I need to add supporting
  documents, **Then** I should be able to upload and attach external files
  (e.g., a commercial invoice, packing list, certificate of origin) to that
  specific shipment record.

- **Given** an audit or inquiry occurs, **When** I access the shipment's detail
  page, **Then** all associated documents should be easily accessible and
  downloadable in one place.

---

# User Story: Rate Card and Pricing Engine Management

**User Story:** As a pricing analyst, I want to create and manage complex rate
cards for all our services (shipping, storage, fulfillment), so that our quoting
and invoicing are always accurate and reflect our current pricing strategy.

**Acceptance Criteria:**

- **Given** I am a pricing analyst, **When** I navigate to the "Rate Cards"
  module, **Then** I should be able to create a new rate card and define its
  rules, such as basing rates on shipping zones, weight breaks, and service
  levels.

- **Given** a rate card is active, **When** I need to add a seasonal surcharge
  or a fuel surcharge, **Then** I should be able to add it as a separate,
  configurable rule that applies to all relevant quotes.

- **Given** a new quote is requested, **When** the system calculates the price,
  **Then** it must use the currently active rate cards and apply all relevant
  rules to determine the final price.

---

# User Story: Client Credit and Pre-Paid Wallet Management

**User Story:** As an accounts manager, I want to set and manage credit limits
for our trusted corporate clients, or allow them to maintain a pre-paid wallet
balance, so that we can offer flexible payment options beyond paying for every
shipment individually.

**Acceptance Criteria:**

- **Given** I am viewing a client's profile in the CRM, **When** I navigate to
  their billing settings, **Then** I should be able to set a specific credit
  limit for them or enable a pre-paid wallet.

- **Given** a client with a credit limit creates a new shipment, **When** the
  cost of the shipment is less than their available credit, **Then** the
  shipment should be processed successfully, and the cost should be deducted
  from their available credit.

- **Given** a client with a pre-paid wallet runs low on funds, **When** their
  balance drops below a predefined threshold, **Then** the system should
  automatically send them a notification to top up their wallet.

---

# User Story: Invoice Dispute Resolution Workflow

**User Story:** As a client, I want to be able to formally dispute a specific
line item on my invoice through the client portal and track its resolution
status, so that I can easily resolve billing discrepancies without
back-and-forth emails.

**Acceptance Criteria:**

- **Given** I am a client viewing an invoice in the portal, **When** I disagree
  with a charge, **Then** I should be able to click a "Dispute" button next to
  that line item and provide a reason for the dispute.

- **Given** a line item is disputed, **When** an internal accounts manager views
  the invoice, **Then** the disputed item should be clearly flagged, and they
  should be able to review the client's comment and either approve or deny the
  dispute.

- **Given** a dispute is approved, **When** the client views the invoice again,
  **Then** a credit note for the disputed amount should be automatically
  generated and applied to the invoice, and the client should be notified of the
  resolution.

---

# User Story: Financial Reporting and Accounts Receivable

**User Story:** As a finance manager, I want to generate an Accounts Receivable
(A/R) aging report, so that I can track all outstanding invoices and see which
clients are late with their payments.

**Acceptance Criteria:**

- **Given** I am on the "Financial Reports" page, **When** I generate the A/R
  Aging Report, **Then** it should display a list of all clients with
  outstanding balances, broken down by the age of the debt (e.g., Current, 1-30
  days past due, 31-60 days past due, etc.).

- **Given** I am viewing the A/R report, **When** I click on a client's name,
  **Then** I should see a detailed list of all their unpaid invoices.

---

# User Story: Integration with Accounting Software

**User Story:** As an accountant, I want the billing system to automatically
sync all generated invoices and received payments with our company's accounting
software (e.g., QuickBooks, Xero), so that I don't have to perform manual data
entry and our financial records are always up-to-date.

**Acceptance Criteria:**

- **Given** the integration with our accounting software is configured, **When**
  a new invoice is generated in the logistics platform, **Then** it should be
  automatically created as a corresponding invoice in the accounting software.

- **Given** a payment is recorded for an invoice in the logistics platform,
  **When** the system syncs, **Then** that payment should be applied to the
  correct invoice in the accounting software, marking it as paid or partially
  paid.

---

# User Story: Payment Gateway Integration

**User Story:** As a client paying for a shipment, I want to be able to pay
using modern payment methods like a credit card or a QR code, so that I can
complete my transaction quickly and securely.

**Acceptance Criteria:**

- **Given** I have accepted a shipment quote and proceed to payment, **When** I
  am presented with payment options, **Then** I should see choices for
  "Credit/Debit Card" and "QR Ph" (or similar local QR standard).

- **Given** I select "Credit/Debit Card," **When** I am redirected to the
  payment gateway (e.g., Stripe, Maya), **Then** I should be able to securely
  enter my card details to complete the payment.

- **Given** I select "QR Ph," **When** a QR code is displayed, **Then** I should
  be able to scan it with my banking or e-wallet app to complete the payment.

- **Given** the payment is successfully processed by the third-party gateway,
  **When** I am redirected back to the logistics platform, **Then** my invoice
  should be marked as "Paid" and the shipment creation should be confirmed.
