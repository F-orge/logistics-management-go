# Minimum Viable Product (MVP)

This document outlines the Minimum Viable Product (MVP) for the ETMAR Logistics
management system. The goal of the MVP is to deliver a core set of features that
address the most critical challenges outlined in the
[project overview](./main.md), providing immediate value and a foundation for
future development.

The MVP focuses on solving the primary problems of:

- Inefficient and manual inventory management.
- Lack of a centralized product reservation and order tracking system.
- Poor data security and access control.

## Core Features

The MVP will consist of the following key modules and features:

### 1. Centralized Inventory & Warehouse Management

This is the foundational module to replace the current spreadsheet-based system.
It will provide a single source of truth for inventory data.

- **Features:**
  - Product catalog management (adding, editing, viewing products).
  - Real-time inventory level tracking for each product in the warehouse.
  - Manual entry for stock updates (in/out).
- **Related Documents:**
  - **User Stories:** [Inventory Management](./stories/ims.md),
    [Warehouse Management](./stories/wms.md)
  - **Dataflow:** [Inventory Management](./dataflow/ims.md),
    [Warehouse Management](./dataflow/wms.md)
  - **Diagrams:** [Inventory Management](./diagrams/ims.md),
    [Warehouse Management](./diagrams/wms.md)

### 2. Customer Management & Online Portal

To streamline customer interactions and reservations, a simple online portal
will be developed.

- **Features:**
  - Customer account creation and management.
  - A simple interface for customers to browse products and place reservations.
  - Customers can view their order history and current status.
- **Related Documents:**
  - **User Stories:** [CRM](./stories/crm.md),
    [Customer Portal](./stories/portal.md)
  - **Dataflow:** [CRM](./dataflow/crm.md),
    [Customer Portal](./dataflow/portal.md)
  - **Diagrams:** [CRM](./diagrams/crm.md),
    [Customer Portal](./diagrams/portal.md)

### 3. Basic Transportation Management

To address the need for better shipment tracking, a basic tracking feature will
be implemented.

- **Features:**
  - Staff can create shipments associated with orders.
  - Manually update shipment status and add tracking numbers from external
    carriers.
  - Customers can view the status of their shipments via the online portal.
- **Related Documents:**
  - **User Stories:** [Transportation Management](./stories/tms.md)
  - **Dataflow:** [Transportation Management](./dataflow/tms.md)
  - **Diagrams:** [Transportation Management](./diagrams/tms.md)

### 4. System-Wide Features

These features are essential for the security and usability of the system.

- **Role-Based Access Control (RBAC):**
  - Define roles for different types of employees (e.g., Admin, Warehouse Staff,
    Sales).
  - Restrict access to features and data based on user roles to enhance
    security, as requested in the problem statement.
- **Document Management:**
  - A centralized place to manage documents related to shipments and orders.
  - **User Stories:** [DMS](./stories/dms.md)
  - **Dataflow:** [DMS](./dataflow/dms.md)
  - **Diagrams:** [DMS](./diagrams/dms.md)

### 5. QR Code Integration

To optimize inventory and shipment tracking, QR code scanning will be
implemented.

- **Features:**
  - Generate unique QR codes for products and shipments.
  - Use a mobile device to scan QR codes for quick stock updates and tracking.
- **Related Documents:**
  - **User Stories:** [Inventory Management](./stories/ims.md)
  - **Dataflow:** [Inventory Management](./dataflow/ims.md)
  - **Diagrams:** [Inventory Management](./diagrams/ims.md)

### 6. Automated Pricing & Billing

To streamline the quotation and payment process, an automated system will be
included.

- **Features:**
  - Automated pricing engine based on product type, destination, and other
    variables.
  - Generate invoices and manage billing for customers.
- **Related Documents:**
  - **User Stories:** [Billing](./stories/billing.md)
  - **Dataflow:** [Billing](./dataflow/billing.md)
  - **Diagrams:** [Billing](./diagrams/billing.md)

### 7. Automated Notifications

To improve customer communication, automated notifications will be integrated.

- **Features:**
  - Automatic email/SMS notifications for order confirmation, shipment status
    changes, and delivery updates.

### 8. Reporting and Analytics

To provide insights into the business operations, a basic reporting dashboard
will be available.

- **Features:**
  - View key metrics like order volume, inventory levels, and sales trends.
