# User Story: Product Catalog Management

**User Story:** As an inventory manager, I want to manage the product catalog,
so that I can maintain an accurate record of all items stored in the warehouse.

**Acceptance Criteria:**

- **Given** I am logged in as an inventory manager **When** I navigate to the
  "Products" section **Then** I should be able to add a new product with a
  unique SKU, name, description, and supplier information.

- **Given** I am viewing a product's details **When** I update its attributes,
  such as cost price or dimensions **Then** the changes should be saved and
  reflected across the system.

- **Given** a product is no longer being sold **When** I mark it as
  "Discontinued" **Then** it should no longer be available for new purchase
  orders but should remain in the system for historical reporting.

---

# User Story: Real-Time Stock Level Tracking

**User Story:** As a warehouse manager, I want to view real-time stock levels
for all products across different warehouse locations, so that I can have full
visibility of our inventory.

**Acceptance Criteria:**

- **Given** I am on the inventory dashboard **When** I search for a product
  **Then** I should see the current quantity on hand, quantity committed to
  orders, and quantity available.

- **Given** a new shipment is received and processed at the warehouse **When**
  the items are scanned into inventory **Then** the stock level for that product
  should automatically increase in real-time.

- **Given** a sales order is fulfilled and the items are shipped **When** the
  items are scanned out of the warehouse **Then** the stock level for that
  product should automatically decrease in real-time.

---

# User Story: Inventory Adjustments and Cycle Counting

**User Story:** As a warehouse operator, I want to perform cycle counts and make
manual adjustments to inventory levels, so that I can ensure the physical stock
matches the system records.

**Acceptance Criteria:**

- **Given** I am performing a cycle count for a specific product **When** I
  enter the physical count into the system **Then** the system should show me
  any discrepancy between the physical count and the system count.

- **Given** there is a discrepancy **When** I confirm the new count **Then** an
  inventory adjustment record should be created, including the reason for the
  adjustment (e.g., "Cycle Count," "Damaged Goods," "Shrinkage").

- **Given** an adjustment has been made **When** an inventory manager reviews
  the adjustment history **Then** they should see who made the change, when it
  was made, and the reason for it.

---

# User Story: Low Stock Alerts for Clients

**User Story:** As an account manager, I want to configure and send automated
low stock alerts to my clients when their product's stock level falls below a
predefined reorder point, so that they can be notified to replenish their
inventory.

**Acceptance Criteria:**

- **Given** I am managing a client's product catalog in the system **When** I
  define a minimum stock level (reorder point) for one of their products
  **Then** the system should save this threshold for that client's product.

- **Given** a client's product stock level drops below its reorder point
  **When** the system detects this change **Then** an automated notification
  (e.g., email) should be sent to the designated contact for that client.

- **Given** a client receives a low stock alert **When** they review the
  notification **Then** it should contain the product name, SKU, current stock
  level, and the reorder point that was triggered.

---

# User Story: Inbound Shipment (ASN) Management

**User Story:** As a warehouse receiving manager, I want to process inbound
shipments (Advance Shipping Notices or ASNs) from our clients, so that I can
anticipate incoming inventory, schedule labor, and ensure accurate put-away.

**Acceptance Criteria:**

- **Given** a client has notified us of an incoming shipment **When** I create a
  new ASN in the system **Then** I should be able to specify the client, the
  expected arrival date, and the list of products and quantities in the
  shipment.

- **Given** a physical shipment arrives at the warehouse **When** I pull up the
  corresponding ASN **Then** I should be able to verify the received items
  against the quantities listed in the ASN.

- **Given** there are discrepancies between the ASN and the physical count
  (e.g., damaged or missing items) **When** I record these discrepancies
  **Then** the system should log the exceptions, and the client should be
  notified automatically.

---

# User Story: Barcode Scanning for Operations

**User Story:** As a warehouse operator, I want to use a handheld scanner to
perform inventory operations (like receiving stock, picking orders, and cycle
counting), so that I can work faster and reduce manual data entry errors.

**Acceptance Criteria:**

- **Given** I am receiving a client's inbound shipment **When** I scan the
  barcode on a product **Then** the system should identify the product and
  increment the received quantity against the ASN.

- **Given** I am picking items for an outbound order **When** I scan the barcode
  of an item and its bin location **Then** the system should confirm that I am
  picking the correct item from the correct location.

- **Given** I am performing a cycle count **When** I scan the barcodes of all
  items in a specific location **Then** the system should automatically compare
  the scanned count against the system count and flag any discrepancies.

---

# User Story: CRM Integration for Client Data

**User Story:** As an inventory or account manager, I want the IMS to be
seamlessly integrated with the CRM, so that client data is always accurate and
synchronized, and I don't have to manage the same information in two different
systems.

**Acceptance Criteria:**

- **Given** I am creating a new Inbound Shipment (ASN) in the IMS, **When** I
  need to select the client who is sending the inventory, **Then** the list of
  clients I can choose from should be pulled directly from the CRM.

- **Given** a client's contact information (e.g., email for notifications) is
  updated in the CRM, **When** the IMS sends an automated alert (like a low
  stock notification) to that client, **Then** it should use the updated contact
  information from the CRM.

- **Given** I am viewing an inventory report in the IMS that is filtered by
  client, **When** I see the client's name, **Then** clicking on it should
  provide a link to navigate directly to that client's full profile in the CRM.

---

# User Story: Multi-Warehouse Inventory Management

**User Story:** As a logistics coordinator, I want to be able to track inventory
levels for the same client product across multiple warehouse locations, so that
I can manage stock distribution and fulfill orders from the optimal location.

**Acceptance Criteria:**

- **Given** a product is stored in multiple warehouses **When** I search for
  that product **Then** the system should display a breakdown of stock levels
  (e.g., on-hand, available) for each warehouse location.

- **Given** I need to move stock between warehouses **When** I create a stock
  transfer order **Then** the inventory level should decrease from the source
  warehouse's "on-hand" quantity and be marked as "in-transit" until it is
  received at the destination warehouse.

---

# User Story: Batch and Expiry Date Tracking

**User Story:** As a quality control manager, I want to track products by batch
or lot number and their expiration dates, so that I can manage recalls
effectively and ensure we follow a First-Expired, First-Out (FEFO) fulfillment
strategy.

**Acceptance Criteria:**

- **Given** I am receiving a batch-tracked product **When** I scan the item
  **Then** the system should prompt me to enter the batch number and expiration
  date.

- **Given** an order needs to be picked for a product that is tracked by
  expiration date **When** the system generates a picklist **Then** it should
  direct the picker to the location containing the batch with the soonest
  expiration date.

- **Given** a client issues a recall for a specific batch number **When** I
  search for that batch number in the system **Then** I should be able to see
  its current location, quantity, and a history of all shipments that contained
  items from that batch.
