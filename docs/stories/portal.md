# User Story: Client Self-Service Portal

**User Story:** As a client, I want a single, secure web portal where I can
manage all aspects of my account and services, so that I have full visibility
and control without needing to contact customer support for every request.

**Acceptance Criteria:**

- **Given** I am a client and I log into the self-service portal, **When** I
  land on the main dashboard, **Then** I should see a high-level summary of my
  key metrics, including current inventory levels (from IMS), the status of my
  in-transit shipments (from TMS/DMS), and a summary of my outstanding invoices
  (from Billing).

- **Given** I am on the portal dashboard, **When** I navigate to the "Inventory"
  section, **Then** I should be able to view detailed stock levels for all my
  products and create a new Inbound Shipment (ASN) to notify the warehouse of
  incoming stock.

- **Given** I am on the portal dashboard, **When** I navigate to the "Shipments"
  section, **Then** I should be able to track the real-time status of all my
  outbound shipments and view my complete shipment history.

- **Given** I am on the portal dashboard, **When** I navigate to the "Billing"
  section, **Then** I should be able to view and download all my past invoices,
  see my current account balance or credit limit, and make payments for
  outstanding invoices.
