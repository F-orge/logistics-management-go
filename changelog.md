# Project Changelog

## chore: update version to 1.10 and enhance RelationCell functionality with improved handling of contact values
* **Commit**: `1c53103`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-14



---
## refactor: update imports to use 'type' for type-only imports in leads and server files
* **Commit**: `2401986`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-14



---
## refactor: update import statements to use 'type' for type-only imports and adjust tsconfig include/exclude paths
* **Commit**: `2730215`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-14



---
## feat: enhance CRM table components with editable fields and improved data handling
* **Commit**: `4340fe2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-14



---
## feat: enhance EnumCell and add RelationCell for improved data handling in CRM tables
* **Commit**: `1fff2f5`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-14



---
## Refactor table components to enhance functionality and improve code organization
* **Commit**: `796c7d2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13

- Added DataTableColumnHeader component for consistent column headers across tables.
- Updated DateCell and StringCell components to support inline editing with mutation hooks.
- Removed unused NumberCell and TextCell components from the Kibo UI table.
- Refactored table definitions in CRM campaigns, cases, companies, contacts, and leads to utilize new components and features.
- Improved styling and layout for better user experience in table cells.


---
## feat: add new forms for various WMS and TMS entities
* **Commit**: `c53ae41`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13

- Implemented NewVehicleFormDialog for creating new vehicles in TMS.
- Implemented NewBinThresholdFormDialog for creating new bin thresholds in WMS.
- Implemented NewInboundShipmentFormDialog for creating new inbound shipments in WMS.
- Implemented NewInventoryAdjustmentFormDialog for creating new inventory adjustments in WMS.
- Implemented NewInventoryBatchFormDialog for creating new inventory batches in WMS.
- Implemented NewInventoryStockFormDialog for creating new inventory stocks in WMS.
- Implemented NewLocationFormDialog for creating new locations in WMS.
- Implemented NewOutboundShipmentFormDialog for creating new outbound shipments in WMS.
- Implemented NewPackageFormDialog for creating new packages in WMS.
- Implemented NewPickBatchFormDialog for creating new pick batches in WMS.
- Implemented NewProductFormDialog for creating new products in WMS.
- Implemented NewPutawayRuleFormDialog for creating new putaway rules in WMS.
- Implemented NewReorderPointFormDialog for creating new reorder points in WMS.
- Implemented NewReturnFormDialog for creating new returns in WMS.
- Implemented NewSalesOrderFormDialog for creating new sales orders in WMS.
- Implemented NewStockTransferFormDialog for creating new stock transfers in WMS.
- Implemented NewSupplierFormDialog for creating new suppliers in WMS.
- Implemented NewTaskFormDialog for creating new tasks in WMS.
- Implemented NewWarehouseFormDialog for creating new warehouses in WMS.


---
## Refactor CRM schemas and forms to integrate AutoForm with Zod validation
* **Commit**: `a7419d7`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13

- Updated NewProductFormDialog to use AutoForm for form handling.
- Replaced useAppForm with AutoForm and ZodProvider for better validation.
- Enhanced CRM schemas (attachments, campaigns, cases, companies, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products) to include field configurations for better UI integration.
- Added field descriptions and labels to improve form usability and accessibility.


---
## feat: add @autoform/zod dependency and integrate AutoForm with Zod validation in NewCompanyFormDialog
* **Commit**: `55ee4e0`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## feat: integrate AutoForm components with new field types and wrappers
* **Commit**: `3d1f62d`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## refactor: remove volume limit validation from billingQuoteSchema and related tests
* **Commit**: `15469d2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## Refactor delete contracts to transform output to string representation of deleted rows
* **Commit**: `5f8918f`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13

- Updated multiple delete contracts across billing, crm, dms, tms, and wms modules to transform the output of DeleteResult to a string representation of the number of deleted rows.
- This change enhances the consistency of the API responses for delete operations, making it easier for clients to handle the output.


---
## refactor: remove unused tag and tagging repositories from CRM seed data generation
* **Commit**: `f74d9d0`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## feat: update CRM and TMS seed data generation with improved repository naming and additional fields
* **Commit**: `6e839c4`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## feat: update TMS geofence schema to replace coordinates with latitude and longitude fields
* **Commit**: `4a12e37`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## Refactor CRM and TMS schemas for improved validation and structure
* **Commit**: `f4ae36c`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13

- Updated CRM campaign schema to use z.coerce for date fields.
- Modified CRM company schema to remove unnecessary nullable() calls.
- Enhanced CRM contact schema to provide clearer error messages for email validation.
- Adjusted TMS carrier schema to rename contactPerson and reintroduce contactEmail and contactPhone.
- Added fuelQuantity and odometerReading fields to TMS expense schema.
- Removed createdAt and updatedAt fields from TMS GPS ping schema.
- Revised TMS proof of delivery schema to include filePath, latitude, longitude, and timestamp.
- Updated TMS route schema to replace string fields with optimizedRouteData, totalDistance, and totalDuration.
- Renamed licensePlate to registrationNumber in TMS vehicle schema.
- Created migrations to fix carriers, drivers, expenses, trips, and vehicles tables by adding/removing necessary columns.


---
## feat: enhance invoice and client account pagination by adding related data retrieval for clients and invoice line items
* **Commit**: `afc5692`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## feat: enhance pagination queries by adding item retrieval for inbound, outbound, package, pick batch, return, task, and sales order components
* **Commit**: `fef5c68`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## Refactor WMS schemas to improve validation and structure
* **Commit**: `cb433fb`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13

- Updated inventory stock schema to include additional validations for reserved quantity and last counted date.
- Introduced separate schemas for inventory stock insert, update, response, and adjustment.
- Enhanced location schema by removing redundant optional and nullable calls.
- Modified outbound shipment item schema to use coercion for quantity shipped.
- Adjusted package schema to apply coercion for weight, dimensions, and insurance value.
- Updated package item schema to use coercion for quantity and total weight.
- Refined pick batch schema to include coercion for priority, total items, and completed items.
- Enhanced sales order and sales order item schemas by cleaning up optional and nullable calls.
- Improved task and task item schemas by consolidating optional and nullable definitions.
- Updated warehouse schema to streamline optional and nullable definitions for address fields.


---
## feat: add WMS dashboard routes for reorder points, returns, sales orders, stock transfers, suppliers, tasks, and warehouses with CRUD functionality and data tables
* **Commit**: `d3153fc`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-13



---
## feat: add tables for various WMS components including putaway rules, reorder points, returns, sales orders, and more
* **Commit**: `5cabc9d`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Implemented table structures for managing putaway rules, reorder points, returns, return items, sales orders, sales order items, stock transfers, suppliers, tasks, task items, and warehouses.
- Each table includes relevant columns with appropriate data types and cell renderers for displaying numbers, strings, dates, and links to related entities.
- Enhanced user navigation by linking product, warehouse, client, and other related entities directly from the table cells.


---
## Refactor: Remove unused table component files for TMS and WMS routes
* **Commit**: `3d09cd7`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Deleted table component files for driver schedule, geofence event, partner invoice item, shipment leg event, trip stop, vehicle maintenance, inbound shipment item, outbound shipment item, package item, pick batch item, return item, and sales order item.
- Added new routes for billing account transaction, accounting sync log, client account, credit note, dispute, and invoice with basic component structure.


---
## feat: add settings dialog and navigation to user menu; refactor data fetching in CRM and invoices
* **Commit**: `c5cc8c4`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12



---
## feat: add tables for various WMS components including pick-batch, product, putaway-rule, reorder-point, return-item, return, sales-order-item, sales-order, stock-transfer, supplier, task-item, task, and warehouse
* **Commit**: `82ad10f`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Implemented column definitions for each component with appropriate cell rendering.
- Added links to related entities for better navigation within the WMS dashboard.
- Ensured consistent use of date and string cells across all tables.


---
## refactor: reorder imports and improve code formatting across multiple files
* **Commit**: `6cfb587`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Updated import statements in various query files to maintain consistency.
- Reformatted code for better readability by aligning parameters and function calls.
- Ensured that all query files in the WMS module follow the same import structure.
- Improved the clarity of the code by breaking long lines into multiple lines.


---
## feat(billing): add queries and mutations for accounting sync log, client account, credit note, dispute, invoice, invoice line item, payment, quote, rate card, rate rule, and surcharge
* **Commit**: `acb1dbb`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Implemented pagination and range queries for accounting sync log, client account, credit note, dispute, invoice, invoice line item, payment, quote, rate card, rate rule, and surcharge.
- Added create, update, and delete mutations for each entity with success and error handling using toast notifications.
- Integrated related data fetching for credit notes, disputes, invoices, payments, and rate rules to enhance data completeness.


---
## feat: Implement WMS queries and mutations for putaway rules, reorder points, returns, sales orders, stock transfers, suppliers, tasks, and warehouse management
* **Commit**: `5eb7327`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Added pagination, range, and individual queries for putaway rules, reorder points, returns, sales orders, stock transfers, suppliers, tasks, and warehouse management.
- Implemented create, update, and delete mutations for each entity with success and error handling using toast notifications.
- Integrated related data fetching for products, warehouses, and other entities where applicable.


---
## feat(tms): add GPS Ping, Partner Invoice, and related queries and mutations
* **Commit**: `9b72903`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12

- Implemented pagination, range, and in queries for GPS Ping, Partner Invoice, Partner Invoice Item, Proof of Delivery, Route, Shipment Leg, Shipment Leg Event, Trip, Trip Stop, Vehicle, and Vehicle Maintenance.
- Added create, update, and delete mutations for each of the above entities with success and error handling using toast notifications.
- Enhanced data fetching by ensuring related entities are fetched and included in the response.


---
## feat: implement document handling contracts and handlers for upload, download, metadata retrieval, and deletion
* **Commit**: `34aa30a`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-12



---
## refactor(tms): remove createdAt and updatedAt fields from geofence event, GPS ping, partner invoice item, and shipment leg event schemas
* **Commit**: `c8cf2f4`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11



---
## feat(wms): implement CRUD operations for various entities including locations, outbound shipments, packages, and more
* **Commit**: `f11da60`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11

- Added handlers for pagination, range queries, and CRUD operations for:
  - Locations
  - Outbound Shipments
  - Outbound Shipment Items
  - Packages
  - Package Items
  - Pick Batches
  - Pick Batch Items
  - Products
  - Putaway Rules
  - Reorder Points
  - Returns
  - Return Items
  - Sales Orders
  - Sales Order Items
  - Stock Transfers
  - Suppliers
  - Tasks
  - Task Items
  - Warehouses

Each handler implements the respective contract and interacts with the repository for database operations.


---
## Implement CRUD operations and pagination for WMS repositories
* **Commit**: `d5705b3`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11

- Added pagination, sorting, and filtering capabilities to the following repositories:
  - PackageRepository
  - PickBatchItemRepository
  - PickBatchRepository
  - ProductRepository
  - PutawayRuleRepository
  - ReorderPointRepository
  - ReturnItemRepository
  - ReturnRepository
  - SalesOrderItemRepository
  - SalesOrderRepository
  - StockTransferRepository
  - SupplierRepository
  - TaskItemRepository
  - TaskRepository
  - WarehouseRepository

- Implemented methods for creating, updating, and deleting records in each repository.
- Ensured all methods return appropriate query builders for further chaining.


---
## feat: Implement generic repository classes for WMS entities
* **Commit**: `7e12f75`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11

- Added ReturnItemRepository with methods for pagination, range, filtering, creation, updating, and deletion of return items.
- Added ReturnRepository with methods for pagination, range, filtering, creation, updating, and deletion of returns.
- Added SalesOrderItemRepository with methods for pagination, range, filtering, creation, updating, and deletion of sales order items.
- Added SalesOrderRepository with methods for pagination, range, filtering, creation, updating, and deletion of sales orders.
- Added StockTransferRepository with methods for pagination, range, filtering, creation, updating, and deletion of stock transfers.
- Added SupplierRepository with methods for pagination, range, filtering, creation, updating, and deletion of suppliers.
- Added TaskItemRepository with methods for pagination, range, filtering, creation, updating, and deletion of task items.
- Added TaskRepository with methods for pagination, range, filtering, creation, updating, and deletion of tasks.
- Added WarehouseRepository with methods for pagination, range, filtering, creation, updating, and deletion of warehouses.


---
## Refactor DMS repositories: Implement CRUD operations and pagination for customer tracking links, delivery routes, delivery tasks, driver locations, proof of deliveries, and task events. Remove WMS task item and warehouse handlers.
* **Commit**: `6b0b956`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11



---
## feat(wms): implement CRUD operations for various WMS entities including packages, package items, pick batches, products, putaway rules, reorder points, returns, sales orders, stock transfers, suppliers, tasks, and warehouses.
* **Commit**: `823855f`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11

- Added pagination and range functionalities for each entity.
- Implemented create, update, and delete operations with error handling.
- Introduced new repository classes for managing database interactions.
- Enhanced query capabilities for user authentication.


---
## feat: enhance CRM leads functionality with campaign, company, contact, and opportunity associations; update schemas and improve data fetching in related components
* **Commit**: `faf3c36`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11



---
## feat: add view and edit functionality for CRM entities
* **Commit**: `8b07cd8`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11

- Implemented context menu options for viewing and editing opportunities and products.
- Added ViewOpportunityFormDialog and ViewProductFormDialog components for detailed views.
- Created view components for campaigns, cases, contacts, interactions, invoices, leads, and notifications.
- Updated server configuration to support SendGrid for email services.
- Introduced new fields and improved data handling in view dialogs for better user experience.


---
## feat: update Dockerfile and justfile for production builds, enhance server migration handling, and adjust mailer configuration based on environment
* **Commit**: `2540927`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11



---
## feat: add new dialogs for creating CRM records including campaigns, cases, companies, contacts, interactions, invoices, leads, opportunities, and products
* **Commit**: `ef51ebb`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-11



---
## feat: Add BooleanCell component for editable boolean values with visual indicators feat(crm): enhance companies table with industry column and address formatting feat(crm): update leads table to include conversion info and remove unused fields feat(crm): improve opportunities table with related entities and opportunity details
* **Commit**: `ca74e1c`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10



---
## feat: Implement CRM dashboard components for cases, companies, contacts, interactions, invoices, leads, notifications, opportunities, and products with search and pagination functionality
* **Commit**: `41bbb81`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10



---
## feat(crm): implement CRUD operations for campaigns, cases, contacts, interactions, invoices, leads, notifications, opportunities, products, and opportunity products with toast notifications and query invalidation feat(crm): add pagination and range queries for companies with a data table and chart integration feat(dashboard): create settings dialog and enhance companies page with search and create functionality
* **Commit**: `93a3b47`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10



---
## Refactor enums in types.ts to use uppercase naming convention and update database interface for consistency
* **Commit**: `8289479`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10

Enhance authFactory to support dynamic email verification settings and improve email handling

Simplify orpc index by exporting crm handlers directly

Update root route to use context-aware routing with orpc and query clients

Modify login route to handle email verification errors and navigate accordingly

Implement email verification route to send verification emails based on user input

Adjust server configuration for mail transport based on environment variables

Add orpc client setup for API communication

Create CRM company queries with pagination, creation, updating, and deletion functionalities


---
## fix: remove unused error variable from signOut function in NavUser component
* **Commit**: `a2bccdc`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10



---
## feat: integrate NavUser component into AppSidebar; update user session handling in route
* **Commit**: `413d522`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10



---
## feat: implement authentication flow with reset and forgot password functionalities; add CRM dashboard route
* **Commit**: `cc2a513`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-10



---
## chore: update nodemailer to version 7.0.9 in package.json and bun.lock
* **Commit**: `214c67d`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-09

feat: add MailHog service to docker-compose for email testing

build: enhance development setup with concurrent backend and frontend tasks in justfile

refactor: improve theme provider implementation for better theme management

refactor: switch from drizzle-orm to kysely for database interactions

refactor: remove unused auth and server utility files

fix: correct NotificationRepositry class name to NotificationRepository

chore: clean up route tree by removing unused API routes

chore: remove obsolete router setup and integrate new routing structure

feat: implement email verification functionality in auth module

feat: create client auth instance for better-auth integration

style: add email verification component for sending verification emails


---
## Refactor WMS schemas to allow nullable optional fields; remove CRM tagging functionality and related migration; add comprehensive tests for BunStorageRepository
* **Commit**: `7171995`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-09



---
## feat: implement attachment handling with upload, download, show metadata, and delete functionalities
* **Commit**: `64284f8`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-09



---
## Refactor server structure and implement CRM handlers
* **Commit**: `c6e952f`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08

- Removed the existing server implementation in `src/server.ts`.
- Added a new checklist in `checklist.md` for Chapter 4 documentation.
- Created multiple CRM handler files for campaigns, cases, companies, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products, tagging, and tags.
- Each handler implements pagination, range, create, update, and delete functionalities using the respective repositories.
- Reintroduced the server setup in `src/server.test.ts` with necessary imports and configurations.


---
## refactor: reorganize imports in CRM contract files for consistency
* **Commit**: `7109262`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08



---
## fix: update downloadAttachmentContract output to use z.instanceof(File) for correct type validation
* **Commit**: `6ebf574`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08



---
## Refactor CRM schemas and contracts for improved structure and validation
* **Commit**: `8963611`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08

- Updated `crmTaggingSchema` and `crmTagSchema` to enhance readability and maintainability.
- Refactored test cases in `tags.test.ts` for consistency and clarity.
- Introduced new ORPC contracts for CRM entities including attachments, campaigns, cases, contacts, interactions, invoices, leads, notifications, opportunities, products, tagging, and tags.
- Implemented pagination, filtering, and sorting transformers in the new contracts.
- Ensured all schemas and contracts adhere to Zod validation standards.


---
## feat: implement pagination and sorting transformers for CRM company contracts
* **Commit**: `f846f28`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08



---
## Add comprehensive tests for billing surcharge schemas
* **Commit**: `9678d09`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08

- Implement tests for billingSurchargeSchema, covering valid and invalid cases.
- Validate various scenarios including minimum and maximum values, required fields, and incorrect formats.
- Add tests for billingSurchargeInsertSchema and billingSurchargeUpdateSchema, ensuring proper validation for insert and update operations.
- Utilize Zod for schema validation and error handling in tests.


---
## Add comprehensive tests for billing payment schemas using Zod validation
* **Commit**: `edfd765`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08

- Implemented valid and invalid test cases for billingPaymentSchema, billingPaymentInsertSchema, and billingPaymentUpdateSchema.
- Valid cases cover minimum and maximum boundaries, optional fields, and various payment methods.
- Invalid cases include missing fields, incorrect formats, and out-of-bound values.
- Added safeParse tests to ensure proper error handling and success responses for valid data.


---
## feat: add comprehensive validation tests for CRM tagging and tags schemas
* **Commit**: `95eb343`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-08

- Implemented tests for crmTaggingSchema, crmTaggingInsertSchema, and crmTaggingUpdateSchema to validate various cases including valid and invalid inputs.
- Added tests for crmTagSchema, crmTagInsertSchema, and crmTagUpdateSchema with similar validation coverage.
- Ensured all schemas handle edge cases and provide appropriate error messages for invalid data formats.
- Established safeParse tests to verify successful parsing of valid data and error handling for invalid data.
- Introduced server setup with Hono framework, integrating Kysely for database interactions and ORPC for RPC handling.
- Configured authentication middleware and database migration setup within the server factory.


---
## feat: add WMS query and mutation options for various entities
* **Commit**: `4cfb086`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07

- Implemented query options for inbound shipments, inventory adjustments, inventory batches, inventory stocks, locations, outbound shipments, package items, packages, pick batch items, pick batches, products, putaway rules, reorder points, return items, sales order items, sales orders, stock transfers, suppliers, task items, tasks, and warehouses.
- Added mutation options for creating, updating, and removing entities in the WMS.
- Utilized zod for schema validation and Kysely for database interactions.


---
## feat(table): enhance table cell components with editable NumberCell and UrlCell, and integrate them into CRM company table
* **Commit**: `955d69b`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## Refactor WMS schemas to replace nullable fields with optional, update date fields to use z.date(), and add createdAt/updatedAt fields where missing. Introduce CRM company queries and table components for better data management in the dashboard.
* **Commit**: `f4cddb6`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## refactor(string): remove duplicate React import in StringCell component
* **Commit**: `7962eb4`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## feat(table): add StringCell component with editable input and tooltip support
* **Commit**: `6593e77`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## refactor(auth): reorganize imports for consistency across authentication routes
* **Commit**: `2433b8a`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## feat(auth): implement login and signup forms with validation feat(auth): add OTP verification form for email verification refactor(crm): remove unused company management components and routes
* **Commit**: `eea3055`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## feat(auth): add request middleware and integrate it into authentication handlers
* **Commit**: `eaa8b73`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## feat(auth): add authentication middleware and reorganize imports in auth files
* **Commit**: `bafac09`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## feat(auth): implement email and password authentication endpoints
* **Commit**: `c408ef8`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07



---
## feat(auth): implement admin actions for user management and permissions
* **Commit**: `fb61c32`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-07

- Added functions for creating, listing, updating, banning, unbanning, and removing users.
- Implemented user session management including listing and revoking sessions.
- Introduced role management with functions to set and check user roles and permissions.
- Established a comprehensive permissions system with various roles and their respective access rights.


---
## Enhance Zod schemas for WMS entities with detailed validation messages and constraints
* **Commit**: `fd5298c`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated schemas for pick_batch_item, product, putaway_rule, reorder_point, return, return_item, sales_order, sales_order_item, stock_transfer, supplier, task, task_item, and warehouse to include:
  - Custom error messages for UUID, string, number, and date validations.
  - Additional constraints such as minimum and maximum values for numbers.
  - Required fields and optional fields with appropriate validation.

- Modified tsconfig.json to include tests directory in the compilation.
- Added initial test files for database setup and CRM.


---
## Refactor CRM schemas to improve validation messages and types
* **Commit**: `ab7274e`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated all CRM schemas to provide more descriptive error messages for validation failures.
- Changed ID fields to use UUID validation with custom error messages.
- Enhanced string validations to specify expected types and required fields.
- Added nullable checks and custom messages for nullable fields across all schemas.
- Removed deprecated DMS schemas related to documents, categories, links, tags, and folders.


---
## feat(dms): implement CRUD operations for documents, folders, and related entities
* **Commit**: `26250e6`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Added actions for managing documents, including selection, creation, updating, and deletion.
- Implemented folder management with corresponding CRUD functionalities.
- Introduced schemas for documents, folders, document access logs, categories, links, tags, and tag links.
- Established repositories for data access and manipulation for each entity.
- Ensured input validation using Zod schemas for all operations.
- Enhanced sorting and pagination capabilities in selection queries.


---
## Refactor WMS schemas and actions for improved structure and validation
* **Commit**: `d9bdc30`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated stock_transfer schema to use UUIDs for warehouse and product IDs.
- Renamed fields in supplier schema for clarity (contactName to contactPerson, contactEmail to email, contactPhone to phoneNumber).
- Enhanced task schema with additional fields for better task management.
- Modified task_item schema to include quantityCompleted and quantityRemaining, and updated field types to UUIDs.
- Revised warehouse schema to include address and contact details, and added isActive field.
- Added new actions for managing bin thresholds, inventory batches, locations, products, and suppliers with appropriate input validation and error handling.
- Implemented server functions for CRUD operations in WMS, ensuring type safety with Zod schemas.


---
## feat: add registration number to vehicle schema
* **Commit**: `97dc403`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

feat: implement CRUD operations for carrier rates

feat: implement CRUD operations for carriers

feat: implement CRUD operations for driver schedules

feat: implement CRUD operations for drivers

feat: implement CRUD operations for expenses

feat: implement CRUD operations for geofence events

feat: implement CRUD operations for geofences

feat: implement CRUD operations for GPS pings

feat: implement CRUD operations for partner invoice items

feat: implement CRUD operations for partner invoices

feat: implement CRUD operations for proof of deliveries

feat: implement CRUD operations for routes

feat: implement CRUD operations for shipment leg events

feat: implement CRUD operations for shipment legs

feat: implement CRUD operations for trip stops

feat: implement CRUD operations for trips

feat: implement CRUD operations for vehicle maintenance

feat: implement CRUD operations for vehicles


---
## refactor: reorganize imports and clean up unused code in various seed and action files
* **Commit**: `8702ac4`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06



---
## fix: update input validators to use correct schemas for creating and updating CRM companies
* **Commit**: `00840d8`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06



---
## feat: add support for server-side rendering with react-router-ssr-query
* **Commit**: `aaa4092`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated package.json to include @tanstack/react-router-ssr-query
- Refactored CRM company actions to use Kysely for database operations
- Introduced selectQueryParams utility for input validation in server actions
- Implemented CRUD operations for CRM campaigns, cases, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products, taggings, and tags
- Enhanced router setup to integrate QueryClient for SSR
- Updated root route to support context for QueryClient


---
## refactor: remove commented-out code for accounting sync logs in billing seed script
* **Commit**: `628fa66`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06



---
## fix: correct naming inconsistencies in billing accounting sync log references
* **Commit**: `4239f42`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06



---
## feat: add DMS and Billing seed scripts with comprehensive data generation
* **Commit**: `091945b`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Implemented DMS seed script to generate delivery routes, tasks, customer tracking links, driver locations, proof of deliveries, and task events using faker.
- Created Billing seed script to generate rate cards, rate rules, surcharges, client accounts, quotes, invoices, invoice line items, payments, disputes, credit notes, documents, and account transactions.
- Developed repositories for DMS entities including delivery routes, delivery tasks, driver locations, proof of deliveries, and task events to facilitate data operations.
- Enhanced data fetching from prerequisite sources such as TMS and WMS for DMS and CRM for Billing.
- Added batch creation methods in repositories to optimize data insertion processes.


---
## Add seed generation helpers for billing, CRM, DMS, TMS, and WMS modules
* **Commit**: `159a7d3`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Implemented billing helpers for accounting sync logs, client accounts, quotes, invoices, line items, payments, disputes, credit notes, documents, rate cards, rate rules, and surcharges.
- Created CRM helpers for attachments, campaigns, cases, companies, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products, tagging, and tags.
- Developed DMS helpers for delivery routes, tasks, customer tracking links, driver locations, proof of deliveries, and task events.
- Added TMS helpers for carriers, carrier rates, drivers, driver schedules, expenses, geofences, geofence events, GPS pings, partner invoices, partner invoice items, proof of deliveries, routes, shipment legs, shipment leg events, trips, trip stops, vehicles, and vehicle maintenance.
- Established WMS helpers for warehouses, suppliers, products, locations, bin thresholds, inventory batches, inventory stock, inventory adjustments, inbound shipments, inbound shipment items, sales orders, sales order items, outbound shipments, outbound shipment items, packages, package items, pick batches, pick batch items, putaway rules, reorder points, returns, return items, stock transfers, tasks, and task items.


---
## Refactor schemas in WMS module to enforce stricter validation using Zod
* **Commit**: `b52fa6f`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated various schemas to replace UUID types with string validation and added min/max constraints for string fields.
- Enhanced numeric fields with min/max validation to ensure data integrity.
- Introduced enum validations for specific fields to restrict values to predefined options.
- Improved error messages for better clarity on validation failures.
- Removed deprecated or unnecessary fields across multiple schemas.


---
## Enhance validation for billing and DMS schemas
* **Commit**: `a87cdf0`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated billing document schema to enforce required fields and character limits for fileName, filePath, fileSize, mimeType, recordType, and uploadedByUserId.
- Improved billing invoice schema with validation for amountOutstanding, amountPaid, createdByUserId, currency, discountAmount, invoiceNumber, notes, paymentTerms, subtotal, taxAmount, and totalAmount.
- Enhanced billing invoice line item schema to include validation for description, discountAmount, discountRate, lineTotal, quantity, sourceRecordType, taxAmount, taxRate, totalPrice, and unitPrice.
- Strengthened billing payment schema with validation for amount, currency, exchangeRate, fees, gatewayReference, netAmount, notes, and processedByUserId.
- Updated billing quote schema to enforce validation on createdByUserId, destinationDetails, height, length, notes, originDetails, quotedPrice, quoteNumber, serviceLevel, volume, weight, and width.
- Improved billing rate card schema with validation for createdByUserId, description, and name.
- Enhanced billing rate rule schema with validation for condition, maxValue, minValue, price, priority, and value.
- Strengthened billing surcharge schema with validation for amount, description, name, and type.
- Updated DMS customer tracking link schema to enforce validation on token.
- Enhanced DMS delivery route schema with validation for name.
- Improved DMS delivery task schema with validation for address, recipientName, recipientPhone, and notes.
- Strengthened DMS driver location schema with validation for latitude and longitude.
- Updated DMS proof of delivery schema to enforce validation on fileUrl and notes.
- Enhanced DMS task event schema with validation for notes.
- Improved TMS carrier schema with validation for name, contactName, contactEmail, and contactPhone.
- Strengthened TMS carrier rate schema with validation for origin, destination, and rate.
- Updated TMS driver schema with validation for name, licenseNumber, and phone.
- Enhanced TMS driver schedule schema with validation for notes.
- Improved TMS expense schema with validation for amount and notes.
- Strengthened TMS geofence schema with validation for name and coordinates.
- Updated TMS GPS ping schema with validation for latitude and longitude.
- Enhanced TMS partner invoice item schema with validation for description and amount.
- Improved TMS proof of delivery schema with validation for fileUrl and notes.
- Strengthened TMS route schema with validation for name, origin, and destination.
- Updated TMS shipment leg schema with validation for origin and destination.
- Enhanced TMS shipment leg event schema with validation for event and notes.
- Improved TMS trip stop schema with validation for address and notes.
- Strengthened TMS vehicle schema with validation for plateNumber, model, and capacity.
- Updated TMS vehicle maintenance schema with validation for description and cost.


---
## Enhance schema validation across CRM, DMS, TMS, and WMS modules
* **Commit**: `01f2896`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Updated contact, interaction, invoice, lead, notification, opportunity, product, tagging, and tag schemas in CRM to enforce stricter validation rules including required fields and character limits.
- Changed ID fields to UUID type for consistency across CRM schemas.
- Enhanced validation for invoice items, opportunities, and products with minimum and maximum constraints on numeric fields.
- Updated DMS schemas to use UUID for IDs and added validation for required fields.
- Standardized ID fields to UUID in TMS schemas and added validation for various fields including status and type.
- Updated WMS schemas to use UUID for IDs and enforced validation on fields such as quantity, status, and reference numbers.


---
## convert string to uuid
* **Commit**: `09618c2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06



---
## feat: update billing and CRM schemas to use numeric types instead of strings for financial fields
* **Commit**: `5228402`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06



---
## feat: add schemas for TMS and WMS entities
* **Commit**: `ad30e88`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-06

- Added TMS schemas for carrier rates, drivers, driver schedules, expenses, geofences, geofence events, GPS pings, partner invoices, partner invoice items, proof of deliveries, routes, shipment legs, shipment leg events, trips, trip stops, vehicles, and vehicle maintenance.
- Added WMS schemas for bin thresholds, inbound shipments, inbound shipment items, inventory adjustments, inventory batches, inventory stocks, locations, outbound shipments, outbound shipment items, packages, package items, pick batches, pick batch items, products, putaway rules, reorder points, returns, return items, sales orders, sales order items, stock transfers, suppliers, tasks, task items, and warehouses.


---
## feat: Implement WMS repository classes for various entities
* **Commit**: `87b70ae`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05

- Added WmsLocationRepository for managing locations.
- Added WmsOutboundShipmentItemRepository for handling outbound shipment items.
- Added WmsOutboundShipmentRepository for managing outbound shipments.
- Added WmsPackageItemRepository for handling package items.
- Added WmsPackageRepository for managing packages.
- Added WmsPickBatchItemRepository for handling pick batch items.
- Added WmsPickBatchRepository for managing pick batches.
- Added WmsProductRepository for managing products.
- Added WmsPutawayRuleRepository for handling putaway rules.
- Added WmsReorderPointRepository for managing reorder points.
- Added WmsReturnItemRepository for handling return items.
- Added WmsReturnRepository for managing returns.
- Added WmsSalesOrderItemRepository for handling sales order items.
- Added WmsSalesOrderRepository for managing sales orders.
- Added WmsStockTransferRepository for handling stock transfers.
- Added WmsSupplierRepository for managing suppliers.
- Added WmsTaskItemRepository for handling task items.
- Added WmsTaskRepository for managing tasks.
- Added WmsWarehouseRepository for managing warehouses.

Each repository includes methods for selecting, creating, updating, and deleting records.


---
## feat: Implement CRM repository classes for attachments, campaigns, cases, companies, contacts, invoices, invoice items, leads, notifications, opportunities, opportunity products, products, taggings, and tags
* **Commit**: `3ff976c`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05

- Added CrmAttachmentRepository for managing attachments
- Added CrmCampaignRepository for managing campaigns
- Added CrmCaseRepository for managing cases
- Added CrmCompanyRepository for managing companies
- Added CrmContactRepository for managing contacts
- Added CrmInvoiceRepository for managing invoices
- Added CrmInvoiceItemRepository for managing invoice items
- Added CrmLeadRepository for managing leads
- Added CrmNotificationRepository for managing notifications
- Added CrmOpportunityRepository for managing opportunities
- Added CrmOpportunityProductRepository for managing opportunity products
- Added CrmProductRepository for managing products
- Added CrmTaggingRepository for managing taggings
- Added CrmTagRepository for managing tags

Each repository includes methods for selecting, creating, updating, and deleting records, with support for pagination, sorting, and searching.


---
## feat(migrations): add comprehensive billing schema with enums, tables, and constraints
* **Commit**: `f9451c9`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05

- Created billing schema with various enums for service types, pricing models, and statuses.
- Implemented tables for rate cards, rate rules, surcharges, quotes, client accounts, account transactions, invoices, invoice line items, payments, disputes, credit notes, documents, and accounting sync logs.
- Added constraints and comments for better documentation and data integrity.
- Created indexes for performance optimization.

feat(migrations): update user roles with new enum type

- Introduced user_role enum to standardize user roles across the application.
- Altered the role column in the user table to utilize the new enum type.

fix(migrations): correct primary key structure in CRM tables

- Modified opportunity_products and taggings tables to use UUID as primary keys.
- Added unique constraints to ensure data integrity for opportunity_products and taggings.

feat(ui): implement NumberCell component for editable number fields

- Created a NumberCell component that allows users to double-click to edit numeric values.
- Integrated dialog for input with validation and submission handling.
- Enhanced user experience with formatted number display and customizable decimal places.


---
## refactor: standardize import statements and improve code consistency across components
* **Commit**: `83f21d6`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05

- Updated import statements in various files to use consistent single quotes.
- Refactored Field components to improve readability and maintainability.
- Added NumberField component for handling numeric input with proper context.
- Cleaned up unused imports and organized existing ones in several files.
- Enhanced the structure of route definitions for better clarity and maintainability.


---
## feat: refactor form components and add new fields for enhanced functionality
* **Commit**: `eba5168`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05



---
## feat: add company removal functionality and enhance DataTable with context and dialog components
* **Commit**: `b5ac9e0`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05



---
## feat: enhance DataTable with empty state handling and pagination controls
* **Commit**: `25192ff`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05



---
## feat: integrate context menu into DataTable for enhanced row actions
* **Commit**: `003b745`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05



---
## feat: add CheckboxDialog component and update text-dialog for enhanced functionality
* **Commit**: `e55f7c2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-05

chore: add vite-plugin-node-polyfills to package.json

refactor: update imports in various components to use new form structure

fix: improve NavMain component structure and key usage for better rendering

refactor: simplify ThemeProvider and related theme management logic

feat: implement new Field components for better form handling

feat: enhance DataTable with pagination controls and improved data handling

chore: clean up unused imports and files in CRM schemas

feat: add server actions for company management in CRM

style: update UI components for consistency and improved accessibility


---
## Refactor CRM schemas by removing server action handlers for cases, companies, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products, taggings, and tags. Update route tree imports for better organization and clarity.
* **Commit**: `2244a49`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04



---
## Refactor and organize imports across various CRM schema files for consistency and clarity.
* **Commit**: `26957d2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04

- Moved import statements to the top of files in `src/db/schemas/crm/*` files.
- Removed duplicate imports in `src/db/schemas/crm/*` files.
- Added missing imports in `src/db/schemas/better-auth/actions.ts`.
- Updated `src/lib/auth.ts` to remove unnecessary imports.
- Adjusted import statements in `src/lib/server-utils.ts` for better organization.
- Cleaned up route imports in `src/routeTree.gen.ts` for improved readability.
- Added new dialog components for form handling: `EditDateDialog`, `EditNumberDialog`, `EditSelectDialog`, and `EditTextDialog`.
- Created a new form component structure in `src/components/form/index.tsx` to streamline form handling.
- Implemented a reusable `FormDialog` component for consistent dialog presentation across forms.


---
## feat: implement SystemBreadcrumbs component and replace static breadcrumbs in RouteComponent
* **Commit**: `8d389a4`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04



---
## fix: update SidebarType to use subSystems in SubSystemSwitcher and NavMain components; refactor sidebar data structure
* **Commit**: `96dd43f`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04



---
## feat: implement SubSystemSwitcher component and remove TeamSwitcher; update sidebar data structure
* **Commit**: `aae7648`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04



---
## refactor: remove unused orpc component and update imports
* **Commit**: `3ef760c`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04

feat: enhance TeamSwitcher component with improved state management and styling

fix: update ChoiceboxItem styles for better visual consistency

fix: update TextField component to support ReactNode labels

refactor: change utils import paths for better organization

refactor: update CRM schemas to use new server-utils for actions

feat: implement Kanban board component with drag-and-drop functionality

feat: create authentication routes and login action handler

chore: update Vite configuration to include Tailwind CSS plugin


---
## feat: implement server actions and CRUD operations for CRM schemas; add database middleware and logger
* **Commit**: `2ce5a6b`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-04



---
## feat: update CRM schemas and routes with Zod validation and clean up imports
* **Commit**: `5b8c149`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-03



---
## feat: restructure authentication schema and routes for CRM dashboard
* **Commit**: `b48c459`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-03



---
## feat: add seed script for populating database with fake data
* **Commit**: `9019371`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-03

- Implemented user, account, session, and CRM data seeding functions using Faker.js
- Created functions to generate fake data for various CRM entities including companies, contacts, cases, campaigns, interactions, invoices, leads, notifications, opportunities, products, and attachments
- Integrated database operations using drizzle-orm for inserting generated data into the PostgreSQL database
- Ensured unique constraints are respected during data insertion with onConflictDoNothing
- Added support for multiple locales in Faker.js for diverse data generation


---
## chore: remove Cargo.toml, codegen.ts, and crm.up.sql files; update db index and schemas; add Copilot instructions for project guidelines
* **Commit**: `c12479e`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-03



---
## feat: add initial CRM schema and authentication tables
* **Commit**: `6d7b2d3`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-03

- Created user, session, account, and verification tables for authentication.
- Implemented CRM schema with tables for attachments, campaigns, cases, companies, contacts, interactions, invoices, leads, notifications, opportunities, products, tags, and taggings.
- Added entity fields for common attributes across tables.
- Established relationships between tables using foreign keys.
- Introduced enums for various statuses and types within the CRM schema.
- Implemented a login route with validation for email and password.
- Added seed functionality to populate the database with initial data.


---
## feat: implement API route for authentication with GET and POST handlers
* **Commit**: `9a9aca0`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-02



---
## refactor: remove dev.compose.yaml and replace with compose.dev.yaml for development overrides
* **Commit**: `aff7e0b`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-02

fix: update justfile to use DOCKER_REGISTRY_URL instead of REGISTRY_URL for consistency

chore: bump version to 1.6.0 in package.json and remove unused dependencies

build: enable minification in vite.config.ts for improved performance

feat: create a new production compose.yaml file for production deployment

chore: remove old compose.dev.yaml and replace with new structure for development


---
## feat: add start command to justfile for server execution
* **Commit**: `46561c2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-02



---
## add dependencies
* **Commit**: `57e4931`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-02



---
## last commit before change to techstack
* **Commit**: `787ab3c`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-02



---
## feat: implement GraphQL mutations and responses for user authentication and session management
* **Commit**: `ced5b61`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-01



---
## feat: add fake data generation support to Rust models
* **Commit**: `da446b2`
* **Author**: Karl robeck alferez
* **Date**: 2025-10-01

- Implemented `#[derive(Dummy)]` for various models in the WMS service to enable automatic fake data generation.
- Configured field-specific fakers for `lot_number`, `serial_numbers`, and `notes` in task items.
- Enhanced warehouse model with fakers for `name`, `address`, `city`, `state`, `postal_code`, `country`, `timezone`, `contact_person`, `contact_email`, and `contact_phone`.
- Created seed functions for different services (auth, billing, CRM, DMS, TMS, WMS) in the seeding command.
- Updated TypeScript configuration to include the `apps` directory.
- Added a new TOML configuration for fake data generation.
- Set up GraphQL code generation for the auth service.
- Established database models for user, account, session, and verification in the auth service.
- Implemented CLI commands for serving and introspecting the auth service.


---
## Add GraphQL queries for TMS and WMS operations
* **Commit**: `de80f6d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29

- Implemented carrier operations: getCarrier and getCarriers queries.
- Implemented driver operations: getDriver and getDrivers queries.
- Implemented expense operations: getExpense and getExpenses queries.
- Implemented geofence operations: getGeofence and getGeofences queries.
- Implemented GPS ping operations: getGpsPing and getGpsPings queries.
- Implemented partner invoice operations: getPartnerInvoice and getPartnerInvoices queries.
- Implemented proof of delivery operations: getProofOfDelivery and getProofOfDeliveries queries.
- Implemented route operations: getRoute and getRoutes queries.
- Implemented shipment leg operations: getShipmentLeg and getShipmentLegs queries.
- Implemented trip operations: getTrip and getTrips queries.
- Implemented vehicle operations: getVehicle and getVehicles queries.
- Implemented bin threshold operations: getBinThreshold and getBinThresholds queries.
- Implemented inbound shipment operations: getInboundShipment and getInboundShipments queries.
- Implemented inventory adjustment operations: getInventoryAdjustment and getInventoryAdjustments queries.
- Implemented inventory batch operations: getInventoryBatch and getInventoryBatches queries.
- Implemented inventory stock operations: getInventoryStockItem and getInventoryStock queries.
- Implemented location operations: getLocation and getLocations queries.
- Implemented outbound shipment operations: getOutboundShipment and getOutboundShipments queries.
- Implemented package operations: getPackage and getPackages queries.
- Implemented pick batch operations: getPickBatch and getPickBatches queries.
- Implemented product operations: getProduct and getProducts queries.
- Implemented putaway rule operations: getPutawayRule and getPutawayRules queries.
- Implemented reorder point operations: getReorderPoint and getReorderPoints queries.
- Implemented return operations: getReturnItem and getReturns queries.
- Implemented sales order operations: getSalesOrder and getSalesOrders queries.
- Implemented stock transfer operations: getStockTransfer and getStockTransfers queries.
- Implemented supplier operations: getSupplier and getSuppliers queries.
- Implemented task operations: getTask and getTasks queries.
- Implemented warehouse operations: getWarehouse and getWarehouses queries.


---
## Refactor CRM Queries and Mutations
* **Commit**: `756d8f1`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29

- Deleted unused CRM query file: src/queries/crm.ts
- Added GraphQL generation configuration: .gemini/commands/graphql-generate.toml
- Created index file for CRM queries: src/graphql/queries/crm/index.ts
- Implemented company-related mutations in src/queries/crm/company.ts
- Implemented contact-related mutations in src/queries/crm/contact.ts
- Created mutation options for contacts in src/queries/crm/mutation/contacts.ts
- Implemented query options for attachments in src/queries/crm/query/attachments.ts
- Implemented query options for campaigns in src/queries/crm/query/campaigns.ts
- Implemented query options for cases in src/queries/crm/query/cases.ts
- Implemented query options for companies in src/queries/crm/query/companies.ts
- Implemented query options for contacts in src/queries/crm/query/contacts.ts
- Implemented query options for interactions in src/queries/crm/query/interactions.ts
- Implemented query options for invoices in src/queries/crm/query/invoices.ts
- Implemented query options for leads in src/queries/crm/query/leads.ts
- Implemented query options for notifications in src/queries/crm/query/notifications.ts
- Implemented query options for opportunities in src/queries/crm/query/opportunities.ts
- Implemented query options for products in src/queries/crm/query/products.ts
- Implemented query options for tags in src/queries/crm/query/tags.ts


---
## Refactor code structure for improved readability and maintainability
* **Commit**: `95a5536`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29



---
## Implement GraphQL mutations for warehouse management, including creation, updating, and deletion of warehouses. Add mutations for bin thresholds, inventory stock, locations, packages, pick batches, putaway rules, and tasks, enabling comprehensive management of warehouse operations through GraphQL API.
* **Commit**: `585e8f5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29



---
## refactor: rename invoice input structs for consistency and clarity
* **Commit**: `3b7038a`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29



---
## feat(graphql-billing): add GraphQL query modules for client accounts, invoices, quotes, rate cards, and surcharges
* **Commit**: `935c523`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29



---
## Implement GraphQL mutations for billing components including payments, quotes, rate cards, rate rules, and surcharges
* **Commit**: `12c9f13`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29

- Added `PaymentsMutation` with methods for creating, updating, and removing payments.
- Introduced `QuotesMutation` for managing quotes with various attributes and status updates.
- Created `RateCardsMutation` to handle rate card creation and updates.
- Developed `RateRulesMutation` for managing rate rules associated with rate cards.
- Implemented `SurchargesMutation` for creating and updating surcharges with different calculation methods.
- Each mutation includes necessary input structures and database interactions using SQLx.


---
## Refactor SQL queries in GraphQL query modules for improved readability
* **Commit**: `0d359e5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29

- Simplified SQL query formatting in `returns.rs`, `sales_orders.rs`, `stock_transfers.rs`, `suppliers.rs`, `tasks.rs`, and `warehouses.rs` by removing unnecessary line breaks.
- Ensured consistent formatting across all query modules for better maintainability.

Add GraphQL model and mutation generation commands

- Introduced `graphql-model.toml` and `graphql-mutation.toml` for generating Rust GraphQL model and mutation files based on database schema.
- Defined conventions for model and mutation generation, including input object structures and resolver methods.

Enhance Gemini CLI command documentation

- Added comprehensive command documentation in `commands.md` to assist users in utilizing the Gemini CLI effectively.
- Included detailed descriptions, usage examples, and argument handling for various commands.

Implement enums for billing models

- Created `enums.rs` in the billing model directory to define various enums related to billing, such as `DisputeStatusEnum`, `InvoiceStatusEnum`, and `PaymentMethodEnum`.
- Ensured enums are compatible with async-graphql and sqlx for seamless integration in the application.


---
## feat: Add items resolver to outbound shipments model for fetching associated outbound shipment items
* **Commit**: `cb7b886`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29



---
## feat: Implement GraphQL mutations and queries for sales orders, stock transfers, suppliers, and inventory management
* **Commit**: `67c4b39`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-29

- Added mutations for creating, updating, and removing sales orders and items in `sales_orders.rs`.
- Implemented stock transfer mutations in `stock_transfers.rs` for managing stock movements.
- Created supplier management mutations in `suppliers.rs` for CRUD operations on suppliers.
- Developed queries for fetching inbound shipments, inventory adjustments, inventory batches, outbound shipments, products, reorder points, returns, sales orders, stock transfers, and suppliers.
- Each query and mutation includes necessary database interactions using SQLx and async-graphql.


---
## feat(graphql-billing): enhance rate rules model with data loader and complex object support
* **Commit**: `f4734bb`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28

feat(graphql-billing): update sea_orm_active_enums with sqlx integration for enum types

feat(graphql-billing): implement surcharges model with data loader functionality

feat(graphql-wms): add models module to the WMS service

feat(graphql-wms): enhance bin thresholds model with data loader and complex object support

feat(graphql-wms): update inventory stock model to include data loader and complex object methods

feat(graphql-wms): enhance locations model with data loader and complex object support

feat(graphql-wms): implement package items model with data loader and complex object methods

feat(graphql-wms): enhance packages model with data loader and complex object support

feat(graphql-wms): implement pick batch items model with data loader functionality

feat(graphql-wms): enhance pick batches model with data loader and complex object support

feat(graphql-wms): implement putaway rules model with data loader and complex object methods

feat(graphql-wms): update sea_orm_active_enums for WMS with sqlx integration

feat(graphql-wms): enhance task items model with data loader and complex object support

feat(graphql-wms): implement tasks model with data loader and complex object methods

feat(graphql-wms): enhance warehouses model with data loader and complex object support


---
## Implement CRUD operations for products, reorder points, returns, sales orders, stock transfers, and suppliers in GraphQL mutations
* **Commit**: `2fee042`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28

- Added create, update, and delete functionality for products, including handling of transactions.
- Implemented similar CRUD operations for reorder points, returns, sales orders, stock transfers, and suppliers.
- Ensured proper error handling and transaction management across all mutations.
- Updated relevant input structures to accommodate new fields where necessary.


---
## feat: Implement inbound shipment mutations and queries for handling inbound shipments and items
* **Commit**: `ac16fd0`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28



---
## feat: Implement DataLoader for related models in GraphQL queries across multiple modules
* **Commit**: `2558568`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28



---
## feat: Implement DataLoader for efficient loading of related models in GraphQL
* **Commit**: `4040cd5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28



---
## Refactor models to implement DataLoader for efficient data fetching
* **Commit**: `d0c2a07`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28

- Introduced PrimaryKey struct for unique identification in models.
- Updated models (carriers, driver_schedules, drivers, expenses, geofence_events, geofences, gps_pings, partner_invoice_items, partner_invoices, proof_of_deliveries, routes, shipment_leg_events, shipment_legs, trip_stops, trips, vehicle_maintenance, vehicles) to include DataLoader implementation.
- Changed timestamp fields to use DateTime<Utc> for consistency.
- Added complex object implementations for related data fetching.
- Created new modules for mutation, query, and subscription handling.


---
## feat: Add GraphQL queries and mutations for stock transfers, enhance existing models, and update Cargo dependencies
* **Commit**: `83e0c28`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28



---
## feat: Add mutations for stock transfers, suppliers, sales orders, returns, reorder points, and enhance inventory adjustments and outbound shipments
* **Commit**: `ad78344`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-28



---
## feat: Implement mutations for inbound shipments, inventory adjustments, and related models
* **Commit**: `f6d22e5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## feat: Add GraphQL queries for inbound shipments, inventory adjustments, inventory batches, outbound shipments, products, reorder points, returns, sales orders, and suppliers
* **Commit**: `7a62fcb`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## feat: Enhance GraphQL models with complex object implementations and skip fields for improved data handling
* **Commit**: `3345631`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## feat: Implement data loaders for various models using PostgresDataLoader
* **Commit**: `aba7eab`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## fix: Add kebab-case renaming for SQLx type names in enums
* **Commit**: `9afbbf2`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## feat: Add PrimaryKey struct for UUID handling in multiple models
* **Commit**: `11c11de`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## feat: Add GraphQL DMS module and update models with UTC timestamps
* **Commit**: `cce654f`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## feat: Implement GraphQL mutations and queries for delivery tasks, driver locations, proof of deliveries, and task events
* **Commit**: `4d31d98`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27

- Added mutations for creating, updating, and removing delivery tasks, driver locations, proof of deliveries, and task events.
- Implemented queries to fetch delivery tasks, driver locations, proof of deliveries, and task events with pagination support.
- Introduced input objects for creating new records and handling optional fields.
- Updated the module structure to include new mutation and query files.


---
## feat: implement data loaders for customer tracking links, delivery routes, delivery tasks, driver locations, proof of deliveries, and task events
* **Commit**: `714883d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27



---
## Add initial model definitions for inventory and shipment management
* **Commit**: `f6598d7`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27

- Implemented models for inbound shipments, inventory adjustments, inventory batches, outbound shipments, and related items.
- Defined enums for various statuses and reasons related to shipments and inventory adjustments.
- Created prelude modules for easier access to models across the application.
- Established models for products, reorder points, returns, sales orders, and suppliers.
- Introduced models for carrier rates, drivers, expenses, geofences, and vehicles in the transportation management system.
- Added models for tasks, warehouses, and inventory stock management in the warehouse management system.
- Ensured all models are compatible with async-graphql for GraphQL integration.


---
## feat: add GraphQL mutations and queries for CRM entities including invoices, leads, notifications, opportunities, products, and tags
* **Commit**: `93b3b8c`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-27

- Implemented mutations for creating, updating, and removing invoices, leads, notifications, opportunities, products, and tags.
- Added queries for retrieving individual and lists of invoices, leads, notifications, opportunities, products, and tags.
- Enhanced data structures to include relevant fields for each entity, ensuring comprehensive data retrieval and manipulation capabilities.


---
## Refactor import statements to use single quotes for consistency across auth and registration components; add CRM queries for various entities including attachments, campaigns, cases, companies, contacts, interactions, invoices, leads, notifications, opportunities, products, and tags.
* **Commit**: `9f63c77`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## feat(crm): add queries for attachments, campaigns, and cases
* **Commit**: `f9c28fa`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## Refactor GraphQL client exports and update schema for mutation parameters
* **Commit**: `70b1bda`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26

- Standardized import/export syntax in GraphQL client files.
- Simplified mutation parameter definitions in the GraphQL schema for better readability.
- Updated auth queries to use new mutation structure and handle errors more effectively.
- Refactored login and register forms to utilize new input types and mutation hooks.
- Added new CRM mutation for adding invoice items.
- Created a new CRM queries file for future use.


---
## chore: add trailing comma in tsconfig.json include section
* **Commit**: `604528b`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## Refactor code style and formatting across multiple files
* **Commit**: `13cde52`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26

- Standardized single quotes for string literals in TypeScript and GraphQL files.
- Reformatted GraphQL schema for better readability by aligning parameters.
- Updated authentication queries to improve consistency in localStorage key usage.
- Adjusted route definitions and imports for better clarity and organization.
- Cleaned up unused imports and ensured consistent import styles.
- Minor adjustments to breadcrumb and dynamic routing logic for improved readability.


---
## feat(auth): implement GraphQL mutations for authentication and session management
* **Commit**: `73af67d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26

- Added signUpEmail, signInEmail, revokeSession, refreshSession, and changePassword mutations in auth.ts.
- Created corresponding mutation options for sign up, sign in, revoke session, refresh session, and change password in queries/auth.ts.
- Integrated local storage management for user tokens and data upon successful authentication.
- Implemented error handling and success notifications using toast for user feedback.


---
## feat: integrate graphql-crm module with updated query and mutation structures
* **Commit**: `353ea95`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## feat: add functionality to manage invoice items with add and remove mutations
* **Commit**: `0ba3354`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## Refactor: Clean up whitespace and formatting across multiple entity files
* **Commit**: `04cacd8`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26

- Removed unnecessary blank lines in various generated entity files in the graphql-dms, graphql-ims, graphql-tms, and graphql-wms services.
- Improved code readability by ensuring consistent formatting in struct definitions and async functions.
- Updated async function signatures for better clarity and consistency.


---
## feat: add mutations for attachments, campaigns, cases, companies, contacts, interactions, invoices, leads, notifications, opportunities, products, and tags
* **Commit**: `a998adb`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## feat: add GraphQL queries for attachments, campaigns, cases, companies, contacts, interactions, invoices, leads, notifications, opportunities, products, and tags
* **Commit**: `601a09d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-26



---
## feat: update invoice loading logic in Model to utilize DataLoader for improved efficiency
* **Commit**: `ac4777d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: implement data loading for related models using DataLoader in multiple model files
* **Commit**: `356b110`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: implement data loading for multiple models using sqlx in PostgresDataLoader
* **Commit**: `089e9ac`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: add sqlx::FromRow derive for model structs across multiple files
* **Commit**: `576a61e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: implement Loader for PostgresDataLoader in multiple model files
* **Commit**: `ca7c073`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: add PrimaryKey struct to multiple model files for improved uniqueness handling
* **Commit**: `7ffc769`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## Refactor generated SeaORM entities by removing version comments and updating model structures
* **Commit**: `9ddb37d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25

- Removed version comments from generated SeaORM entity files in graphql-tms and graphql-wms services.
- Added new model definitions for attachments, campaigns, cases, companies, contacts, interactions, invoices, leads, notifications, opportunities, products, and tags in the graphql-crm service.
- Introduced enums for case priority, status, type, interaction type, invoice status, lead source, and opportunity stage in the graphql-crm service.
- Implemented complex object relationships in models for better data handling and querying.


---
## refactor: update database interactions to use sqlx and replace deprecated sea_orm references
* **Commit**: `3d349e4`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: implement change password functionality with session guard and error handling
* **Commit**: `3478656`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## Refactor user role imports across multiple GraphQL query files
* **Commit**: `117d1ee`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25

- Updated imports from `graphql_auth::entities::_generated::sea_orm_active_enums::UserRole` to `graphql_auth::models::user::UserRole` in the following files:
  - trips.rs
  - vehicle_maintenance.rs
  - vehicles.rs
  - bin_thresholds.rs
  - inventory_stock.rs
  - locations.rs
  - package_items.rs
  - packages.rs
  - pick_batch_items.rs
  - pick_batches.rs
  - putaway_rules.rs
  - task_items.rs
  - tasks.rs
  - warehouses.rs

- Reformatted GraphQL query guards for better readability.


---
## feat: implement sign-in functionality with email and password validation
* **Commit**: `ffad919`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: implement account and session models with GraphQL integration and user association
* **Commit**: `7b08d42`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: implement authentication mutations and queries with user model integration
* **Commit**: `e9f00df`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-25



---
## feat: add rand crate and enhance seeding functionality with additional fake data generation
* **Commit**: `c97a75a`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-23



---
## Add fake data generation for various entities in the WMS and TMS services
* **Commit**: `6d9327f`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-23

- Integrated `fake` crate to generate dummy data for input objects in geofence_events, geofences, partner_invoice_items, partner_invoices, proof_of_deliveries, routes, shipment_leg_events, shipment_legs, trip_stops, vehicle_maintenance, vehicles, and other related entities.
- Enhanced Insert structs with `#[dummy]` attributes for fields to facilitate testing and development.
- Updated Cargo.toml to include the `fake` crate as a workspace dependency.


---
## feat: integrate fake data generation for GraphQL insert structs
* **Commit**: `46bdab4`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-23

- Added `fake` crate for generating fake data across various entities.
- Enhanced InsertInvoice, InsertLead, InsertNotification, InsertOpportunity, InsertOpportunityProduct, InsertProduct, InsertTagging, InsertTag, and others with dummy data generation using `fake`.
- Updated Cargo.toml to include `fake` as a dependency.
- Created comprehensive documentation for implementing fake data generation in Rust structs, covering best practices and field-specific guidelines.


---
## feat: update guards to use SystemGuard for automated actions across multiple queries
* **Commit**: `a9983b2`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-19



---
## Implement Role-Based Access Control (RBAC) using RoleGuard across multiple GraphQL resolvers
* **Commit**: `251e468`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-19

- Added RoleGuard to various queries and mutations in the graphql-wms service to enforce role-based access control.
- Updated resolvers for bin thresholds, inventory stock, locations, package items, packages, pick batch items, pick batches, putaway rules, task items, tasks, and warehouses.
- Ensured that only users with appropriate roles (Admin, Warehouse Manager, Warehouse Operator, Picker, Packer) can access specific operations.
- Removed redundant session checks where global enforcement is already applied.
- Documented the implementation approach and provided instructions for future RBAC implementations in the repository.


---
## feat: implement CRUD operations for invoices, leads, notifications, opportunities, opportunity products, products, taggings, and tags
* **Commit**: `ef11ec4`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-19



---
## feat: add comprehensive domain permissions for Auth, Billing, CRM, DMS, IMS, TMS, and WMS
* **Commit**: `77b4f98`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18



---
## feat: implement UserRole enum and update role handling in user and guards
* **Commit**: `8d3f832`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18



---
## feat: enhance RoleGuard with error handling in has_role method
* **Commit**: `feadbd9`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18



---
## Refactor GraphQL Auth Service
* **Commit**: `b5ec641`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18

- Added guards module to handle role-based and session-based access control.
- Implemented RoleGuard for role verification in user queries.
- Updated user queries to utilize new guards for authorization.
- Removed old guards implementation from the main library.
- Cleaned up project structure by removing unused templates and configuration files.
- Adjusted TypeScript configuration to include only necessary source files.
- Removed Docker Compose setup for integration tests and related setup scripts.


---
## feat: simplify introspection command by removing arguments and implementing schema execution
* **Commit**: `e34506c`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18



---
## Implement pagination for various GraphQL queries in the inventory and transportation management services
* **Commit**: `442772b`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18

- Updated inventory_batches, outbound_shipment_items, outbound_shipmets, products, reorder_points, return_items, returns, sales_order_items, sales_orders, stock_transfers, suppliers queries to use pagination.
- Enhanced carrier_rates, carriers, driver_schedules, drivers, expenses, geofence_events, geofences, gps_pings, partner_invoice_items, partner_invoices, proof_of_deliveries, routes, shipment_leg_events, shipment_legs, trip_stops, trips, vehicle_maintenance, vehicles queries with pagination.
- Modified bin_thresholds, inventory_stock, locations, package_items, packages, pick_batch_items, pick_batches, putaway_rules, task_items, tasks, and warehouses queries to support pagination.


---
## feat: Add pagination parameters to list queries across multiple modules
* **Commit**: `909d883`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-18

- Updated the `list` function in various GraphQL query files to include `page` and `limit` parameters for pagination.
- Modified the following modules: outbound_shipments, products, reorder_points, return_items, returns, sales_order_items, sales_orders, stock_transfers, suppliers, carrier_rates, carriers, driver_schedules, drivers, expenses, geofence_events, geofences, gps_pings, partner_invoice_items, partner_invoices, proof_of_deliveries, routes, shipment_leg_events, shipment_legs, trip_stops, trips, vehicle_maintenance, vehicles, bin_thresholds, inventory_stock, locations, package_items, packages, pick_batch_items, pick_batches, putaway_rules, task_items, tasks, and warehouses.


---
## refactor: remove unused imports from seed and extractor modules
* **Commit**: `d479ad9`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-16



---
## feat: implement user seeding functionality with random data generation
* **Commit**: `0dd6bc0`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-16



---
## feat: add new dependencies for enhanced functionality and update seed command to establish database connection
* **Commit**: `97d3d3e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## feat: add session management and user extraction functionality
* **Commit**: `5707a37`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## feat: refactor project structure and add command handling for CLI
* **Commit**: `74900ad`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## feat: add token generation for user session during sign-in
* **Commit**: `a3611bf`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## refactor: remove drivers and vehicles management components
* **Commit**: `4e83710`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15

- Deleted driver management components including forms, loading states, and tables.
- Removed vehicle management components including forms, loading states, and tables.
- Simplified the index route to return a basic "hello world" message.


---
## Refactor code structure for improved readability and maintainability
* **Commit**: `576cad3`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## Enhance GraphQL entities with relationships and data fetching
* **Commit**: `31e94b8`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15

- Added vehicle relationship to geofence_events, gps_pings, and vehicle_maintenance entities.
- Introduced geofence relationship in geofence_events.
- Implemented geofence_events retrieval in geofences.
- Added partner_invoice and shipment_leg relationships in partner_invoice_items.
- Implemented partner_invoice_items retrieval in partner_invoices.
- Added trip_stop relationship in proof_of_deliveries.
- Introduced trip relationship in routes.
- Added shipment_leg relationship in shipment_leg_events.
- Implemented shipment_leg retrieval in shipment_legs.
- Added trip and proof_of_deliveries relationships in trip_stops.
- Implemented vehicle relationships in vehicles.
- Enhanced bin_thresholds with location and product relationships.
- Added inventory_stock relationships with batch, location, and product.
- Implemented locations with bin_thresholds, inventory_stock, parent_location, and putaway_rules relationships.
- Enhanced package_items with batch, package, and product relationships.
- Added packages with package_items, sales_order, packed_by, and warehouse relationships.
- Implemented pick_batch_items with sales_order and pick_batch relationships.
- Enhanced pick_batches with pick_batch_items, tasks, assigned_user, and warehouse relationships.
- Added putaway_rules with product, client, preferred_location, and warehouse relationships.
- Enhanced task_items with task, product, batch, source_location, and destination_location relationships.
- Implemented tasks with task_items, user, pick_batch, and warehouse relationships.
- Enhanced warehouses with locations, packages, pick_batches, and putaway_rules relationships.


---
## feat: Enhance GraphQL models with additional resolvers for related entities
* **Commit**: `0554977`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## Add ComplexObject implementation for various models in GraphQL services
* **Commit**: `7213e46`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15

- Implemented `ComplexObject` for inbound shipments, inventory adjustments, inventory batches, outbound shipment items, outbound shipments, products, reorder points, return items, returns, sales order items, sales orders, stock transfers, and suppliers in the GraphQL IMS service.
- Added `ComplexObject` for carrier rates, carriers, driver schedules, drivers, expenses, geofence events, geofences, GPS pings, partner invoice items, partner invoices, proof of deliveries, routes, shipment leg events, shipment legs, trip stops, trips, vehicle maintenance, and vehicles in the GraphQL TMS service.
- Introduced `ComplexObject` for bin thresholds, inventory stock, locations, package items, packages, pick batch items, pick batches, putaway rules, task items, tasks, and warehouses in the GraphQL WMS service.
- Created new files for account and session entities in the GraphQL Auth service with `ComplexObject` implementation.


---
## improve justfile
* **Commit**: `c079620`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## add justfile
* **Commit**: `5677467`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-15



---
## feat: Implement complex resolvers for various GraphQL entities including campaigns, cases, interactions, invoices, leads, notifications, opportunities, products, taggings, and tags
* **Commit**: `4a32c46`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## feat: Add relationship resolvers for companies and contacts entities in GraphQL
* **Commit**: `c28ccad`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## feat(billing): add GraphQL queries and mutations for billing entities
* **Commit**: `ab5337e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Added billing queries for account transactions, accounting sync logs, client accounts, credit notes, disputes, documents, invoice line items, invoices, payments, quotes, rate cards, rate rules, and surcharges.
- Implemented corresponding mutations for creating, updating, and deleting each billing entity.
- Updated main GraphQL schema to include billing queries and mutations.


---
## feat: Add GraphQL DMS service with queries and mutations for customer tracking links, delivery routes, delivery tasks, driver locations, proof of deliveries, and task events
* **Commit**: `535cd12`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## Refactor entity definitions in GraphQL services to include `Eq` trait and update GraphQL names
* **Commit**: `d6587e6`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Added `Eq` trait to various entity models in the GraphQL DMS, IMS, and TMS services.
- Updated GraphQL names for entities to follow a consistent naming convention.
- Removed unnecessary `lib.rs` files from generated entities in both IMS and TMS services.
- Ensured all entity models are derived with `Clone`, `Debug`, `PartialEq`, `DeriveModel`, and `DeriveActiveModel`.


---
## feat: Add GraphQL WMS service and update related entities and queries
* **Commit**: `a6e7825`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## Refactor GraphQL entities and queries for improved structure and functionality
* **Commit**: `a5fd03d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Updated enum definitions in sea_orm_active_enums.rs to correct derive attributes.
- Enhanced task_items, tasks, and warehouses models with Eq trait for better comparison.
- Added new modules for pick_batch_items, pick_batches, putaway_rules, task_items, and tasks in mod.rs.
- Implemented GraphQL queries and mutations for bin_thresholds, inventory_stock, locations, package_items, packages, pick_batch_items, pick_batches, putaway_rules, task_items, tasks, and warehouses.
- Each query includes list, view, create, update, and delete functionalities with appropriate error handling.


---
## Refactor entity imports by removing unused dependencies across various files to enhance code clarity and maintainability.
* **Commit**: `e1d87c0`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## Refactor GraphQL queries and mutations for partner invoice items, partner invoices, routes, shipment leg events, shipment legs, trip stops, trips, and vehicle maintenance to improve code readability and maintainability. This includes restructuring async function signatures, enhancing error handling, and ensuring consistent formatting across the files. Additionally, updated entity imports in inventory stock, package items, and packages to streamline code organization.
* **Commit**: `158f0f2`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## feat: Implement GraphQL input objects and active model conversions for billing and delivery entities
* **Commit**: `2be091f`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Added Insert and Update input objects for documents, invoice line items, invoices, payments, quotes, rate cards, rate rules, surcharges, customer tracking links, delivery routes, delivery tasks, driver locations, proof of deliveries, and task events.
- Implemented IntoActiveModel trait for each entity to facilitate conversion from input objects to active models for database operations.
- Utilized async-graphql for input object definitions and sea-orm for database interactions.


---
## Add new entities and update dependencies for GraphQL WMS service
* **Commit**: `53e5090`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Added new modules for `packages`, `package_items`, `pick_batches`, `pick_batch_items`, `putaway_rules`, `task_items`, `tasks`, and `warehouses`.
- Implemented input objects and active model conversions for each new entity.
- Updated `Cargo.toml` to include `graphql-core` and `rust_decimal` dependencies.
- Modified `Cargo.lock` to reflect the new dependencies.
- Enhanced the `mod.rs` file to include newly created modules.


---
## Implement GraphQL queries and mutations for geofence events, geofences, GPS pings, partner invoice items, partner invoices, proof of deliveries, routes, shipment leg events, shipment legs, trip stops, trips, vehicle maintenance, and vehicles.
* **Commit**: `abc065b`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## Implement GraphQL queries and mutations for inventory management entities
* **Commit**: `50c82b2`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Added queries and mutations for Inventory Adjustments, Inventory Batches, Outbound Shipment Items, Outbound Shipments, Products, Reorder Points, Return Items, Returns, Sales Order Items, Sales Orders, Stock Transfers, and Suppliers.
- Each entity includes list and view queries, as well as create, update, and delete mutations.
- Utilized async-graphql and sea-orm for database interactions and GraphQL schema definitions.


---
## Refactor GraphQL entity definitions to integrate async-graphql support
* **Commit**: `2a56a24`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Updated SeaORM active enums to derive async_graphql::Enum for GraphQL compatibility.
- Modified entity model structs to derive async_graphql::SimpleObject for GraphQL integration.
- Created GraphQL resolvers for various entities including attachments, campaigns, cases, contacts, interactions, and invoice items.
- Implemented query and mutation traits for each entity to handle CRUD operations via GraphQL.
- Ensured proper transaction handling during database operations in resolvers.


---
## feat: Add CRM entities and queries for attachments, campaigns, cases, companies, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products, taggings, and tags
* **Commit**: `9b6a01b`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14

- Introduced new modules for each entity in the CRM domain.
- Implemented Insert and Update structs for each entity with appropriate fields.
- Added IntoActiveModel implementations for converting Insert and Update structs to ActiveModel.
- Created GraphQL queries for companies, including list, view, create, update, and delete operations.
- Updated lib.rs to include new entities and queries.
- Added instructions for generating entity files in the CRM domain.


---
## feat: Update Cargo.toml and Cargo.lock for async-graphql and axum integration; enhance GraphQL queries and mutations
* **Commit**: `e4e89af`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-14



---
## feat: Add GraphQL user service with input handling and mutations
* **Commit**: `d32890a`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-13



---
## Refactor entity definitions in WMS and CRM services to use new SeaORM structure
* **Commit**: `12061bc`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-12

- Updated entity models in `packages.rs`, `pick_batch_items.rs`, `pick_batches.rs`, `putaway_rules.rs`, `task_items.rs`, `tasks.rs`, and `warehouses.rs` to implement the new `Entity` and `Column` structures.
- Removed deprecated attributes and replaced them with the new column definitions.
- Added primary key implementations for relevant entities.
- Updated relation definitions to align with the new structure.
- Generated new entity files for CRM, DMS, IMS, and TMS services, ensuring consistency across the codebase.


---
## Add GraphQL WMS service with SeaORM entities and dependencies
* **Commit**: `9cd735e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11

- Created the `graphql-wms` service with a new `Cargo.toml` file including dependencies such as `sqlx`, `async-graphql`, and others.
- Generated SeaORM entities for the WMS schema, including models for `bin_thresholds`, `inventory_stock`, `locations`, `package_items`, `packages`, `pick_batch_items`, `pick_batches`, `putaway_rules`, `task_items`, `tasks`, and `warehouses`.
- Implemented relationships between entities using SeaORM's relation definitions.
- Added active model behaviors for all generated entities.
- Updated the module structure in `mod.rs` files for both `graphql-tms` and `graphql-wms` services to include the new entities.


---
## feat: Update dependencies and add utility functions for test fixtures
* **Commit**: `498f014`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11



---
## refactor: Remove unused UpdateStatement import from taggings.rs
* **Commit**: `8281198`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11



---
## feat: Add enums for case, invoice, lead, opportunity, and tagging entities with associated fields
* **Commit**: `c81edc5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11



---
## feat: Add integration test instructions for SQLx and rstest
* **Commit**: `a284107`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11



---
## feat: Implement CRUD operations for CRM entities
* **Commit**: `04e7e5d`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11

- Added entities for cases, companies, contacts, interactions, invoice items, invoices, leads, notifications, opportunities, opportunity products, products, taggings, and tags.
- Each entity includes structures for insert and update inputs, as well as implementations for converting these inputs into SQL statements using sea-query.
- Integrated validation for input structures using the validator crate.
- Established relationships between entities where applicable, such as linking contacts to companies and opportunities.


---
## feat: Add verification entity with insert and update functionality
* **Commit**: `de68962`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-11



---
## feat: Implement account entity with insert and update functionality
* **Commit**: `7acaed5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-10



---
## test: Enhance session input validation tests with additional cases
* **Commit**: `2286070`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-10



---
## feat: Update Cargo.toml for workspace configuration and add session entity with input structures
* **Commit**: `d5948b7`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-10



---
## feat: Add user entity and related functionality
* **Commit**: `244e76a`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-10

- Introduced user entity with fields for user management including name, email, and ban details.
- Implemented InsertUserInput and UpdateUserInput structs with validation.
- Added SQL insert and update operations using sea-query.
- Updated Cargo.toml to include necessary dependencies for chrono, uuid, and url.
- Refactored lib.rs to expose entities module.
- Added tests for user insertion and update operations using rstest.


---
## feat: add graphql-auth and graphql-crm packages with initial setup and dependencies
* **Commit**: `864110c`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-09



---
## Add billing schema and related tables with enums for pricing and transactions
* **Commit**: `41a5730`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-09

- Created billing schema with necessary tables including rate_cards, rate_rules, surcharges, quotes, client_accounts, invoices, invoice_line_items, payments, disputes, credit_notes, documents, and accounting_sync_log.
- Defined enums for service types, pricing models, surcharge calculation methods, quote statuses, transaction types, invoice statuses, payment methods, payment statuses, dispute statuses, document types, and sync statuses.
- Implemented constraints and comments for clarity and data integrity.
- Added indexes for performance optimization.
- Created migration scripts for both up and down operations to facilitate schema changes.


---
## refactor: remove authentication-related files and implement requireAuth middleware
* **Commit**: `546f648`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-08



---
## remove go
* **Commit**: `197d7ff`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-07



---
## Merge pull request #144 from F-orge/85-feature-crm-implementation
* **Commit**: `51d58a0`
* **Author**: karlrobeck
* **Date**: 2025-09-06

85 feature crm implementation

---
## refactor: streamline import statements and improve code formatting across CRM-related files
* **Commit**: `36b3089`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-06



---
## feat: Implement CRUD operations for invoices, opportunities, and products
* **Commit**: `f9b9586`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-06

- Added invoice management API with create, list, view, update, and remove functionalities.
- Implemented opportunity management API with similar CRUD operations.
- Created product management API to handle product-related actions.
- Developed corresponding contracts for invoices, opportunities, and products using zod for validation.
- Established database schemas for invoices, opportunities, and products with appropriate validation rules.
- Added comprehensive tests for opportunity and product management APIs to ensure functionality and reliability.


---
## refactor: standardize import statements and improve code formatting across multiple files
* **Commit**: `719ce18`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-06

feat(auth): enhance registration flow with password confirmation and error handling

feat(dashboard): implement authentication check and breadcrumb functionality

test(api): add comprehensive tests for CRM campaigns, companies, contacts, interactions, and leads

feat(api): implement CRUD operations for CRM cases, companies, contacts, interactions, and leads

chore(tests): update test setup to use Docker for PostgreSQL integration

chore: add Docker Compose configuration for integration testing


---
## feat: enhance campaign management by updating schemas and implementing create and list operations
* **Commit**: `4ff666b`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-06



---
## feat: implement CRUD operations for CRM entities with updated schemas for campaigns, cases, companies, contacts, interactions, and leads
* **Commit**: `bacad84`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-06



---
## feat: add schemas for CRM entities including campaigns, cases, companies, contacts, interactions, and leads
* **Commit**: `9817cbe`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-06

- Created insert and update schemas for campaigns with start and end date validation.
- Established insert and update schemas for cases.
- Developed schemas for companies with phone number and website validation.
- Implemented contact schemas with email and phone number validation.
- Added interaction schema without specific fields.
- Created lead schemas with email validation.


---
## Merge pull request #142 from F-orge/80-feature-user-authentication
* **Commit**: `fa0cf79`
* **Author**: karlrobeck
* **Date**: 2025-09-06

80 feature user authentication

---
## refactor: standardize user data handling in NavUser component and update login route to store user information
* **Commit**: `2a9a758`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-05



---
## Refactor dashboard route and breadcrumb logic; update authentication flow and remove deprecated login route
* **Commit**: `1ef62fd`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-05

- Updated dashboard route to check for JWT token in local storage instead of Pocketbase auth store.
- Refactored breadcrumb labels to use consistent string formatting.
- Removed the login route and replaced it with a new authentication flow using ORPC.
- Implemented new login and registration forms with ORPC integration.
- Added error handling for login and registration processes.
- Created a new context for ORPC client to manage API calls.
- Updated server configuration to handle ORPC requests with a prefix.


---
## refactor: remove priority dropdown from user story template
* **Commit**: `6b38355`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-05



---
## Merge pull request #79 from F-orge/orpc-rework
* **Commit**: `fabe803`
* **Author**: karlrobeck
* **Date**: 2025-09-06

Orpc rework

---
## refactor: remove unnecessary task breakdown sections from user story template
* **Commit**: `d49ea6e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-05



---
## Refactor database schema definitions and update journal entries
* **Commit**: `7732964`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-05

- Updated journal entry to reflect new migration version and tag.
- Modified opportunityProducts and taggings schema to remove primary key constraints on foreign keys.
- Added new SQL migration file for fresh schema setup, including tables for billing, CRM, DMS, IMS, portal, TMS, and WMS.
- Created comprehensive table structures with appropriate fields and data types for each schema.


---
## feat: Add Drizzle ORM schemas for IMS, TMS, and WMS domains
* **Commit**: `0a36578`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-05

- Created `stock_transfers` and `suppliers` schemas in IMS.
- Updated `index.ts` to include new IMS schemas.
- Added `auditLog`, `notifications`, `permissions`, `rolePermissions`, `roles`, `userRoles`, and `userSettings` schemas in the Portal domain.
- Introduced various TMS schemas including `carrierRates`, `carriers`, `driverSchedules`, `drivers`, `expenses`, `geofenceEvents`, `geofences`, `gpsPings`, `partnerInvoiceItems`, `partnerInvoices`, `proofOfDeliveries`, `routes`, `shipmentLegEvents`, `shipmentLegs`, `tripStops`, and `trips`.
- Added `vehicleMaintenance` and `vehicles` schemas in TMS.
- Created WMS schemas for `bin_thresholds`, `inventory_stock`, `locations`, `packages`, `pick_batches`, `putaway_rules`, `task_history`, `tasks`, and `warehouses`.


---
## feat: Enhance CRM documentation and add authentication flow
* **Commit**: `8551d07`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-04

- Updated CRM data flow documentation to clarify user roles and interactions.
- Removed redundant sections in CRM diagrams and streamlined user role descriptions.
- Added detailed authentication data flow documentation, including user authentication and session verification processes.
- Introduced new diagrams for the authentication domain, outlining user, session, account, and verification entities.
- Created user stories for user authentication and session management to define acceptance criteria.
- Added nodemailer dependency for email functionalities in the project.


---
## feat(auth): enhance sign-in and sign-out handlers with async support; add comprehensive tests for authentication flows
* **Commit**: `ffc922c`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-04



---
## feat(auth): integrate better-auth with context in sign-in, sign-out, and sign-up handlers
* **Commit**: `073021b`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-04

feat(tests): add comprehensive sign-up tests with various scenarios

chore(tests): setup PostgreSQL container for testing environment

chore(deps): add testcontainers for PostgreSQL in dev dependencies

fix(schema): change image field to URL type in emailSignUpSchema

chore(justfile): add test command for running tests with bun

chore(tsconfig): include tests directory in TypeScript configuration

refactor(auth): create authFactory for better-auth initialization


---
## Refactor: Standardize import statements and formatting across shipment and warehouse components
* **Commit**: `f4ad25c`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-04

- Updated import statements to use single quotes consistently.
- Reformatted code for better readability, including consistent spacing and line breaks.
- Improved loading skeletons in loading components for warehouses and shipments.
- Enhanced the structure of forms and dialogs for creating, editing, and deleting shipments and warehouses.
- Added new authentication API endpoints for sign-in, sign-out, and sign-up with appropriate schemas.
- Introduced better error handling and user feedback through toast notifications.
- Updated database schemas for user and session management.


---
## feat: integrate PostgreSQL with Drizzle ORM and Better Auth
* **Commit**: `acf36ea`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-04

- Added PostgreSQL service configuration in dev.compose.yaml.
- Created drizzle.config.ts for database connection settings.
- Implemented database schema for user authentication in auth.schema.ts.
- Established database connection in src/db/index.ts.
- Integrated Better Auth for user authentication and session management.
- Developed health check API endpoint.
- Updated justfile for new development commands and PostgreSQL setup.
- Refactored server.ts to include ORPC and Better Auth middleware.
- Added necessary dependencies in package.json for PostgreSQL, Drizzle ORM, and Better Auth.


---
## refactor: Update MVP documentation to enhance clarity and organization of user stories, dataflows, and diagrams
* **Commit**: `5f07097`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-04



---
## feat: Add comprehensive documentation for Logistics Management System, including MVP outline and subsystem details
* **Commit**: `a1f968c`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-03



---
## Add comprehensive data flow documentation for CRM, DMS, IMS, Portal, TMS, and WMS systems
* **Commit**: `480f3a5`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-03

- Introduced detailed explanations and diagrams for the CRM data flow, covering roles such as Administrator, Marketing Manager, Sales Representatives, Customer Support Agents, and Account Managers.
- Documented the DMS data flow, focusing on dispatch and route optimization, driver delivery execution, and customer tracking experience.
- Outlined the IMS data flow, detailing inbound receiving, inventory control, outbound fulfillment, and reverse logistics processes.
- Created a thorough overview of the Portal data flow, including user authentication, dashboard data aggregation, self-service actions, and user management.
- Explained the TMS data flow, emphasizing fleet management, internal trip lifecycle, and third-party shipment coordination.
- Provided insights into the WMS data flow, detailing warehouse configuration, inbound processing, outbound fulfillment, and performance management.


---
## refactor: Revise documentation structure to enhance clarity and organization; add sections for user stories, data models, and additional resources
* **Commit**: `709f5af`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-03



---
## Enhance documentation for logistics management system
* **Commit**: `5fc02d7`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-03

- Added detailed domain explanations for Billing, CRM, DMS, IMS, Portal, TMS, and WMS, including entity descriptions and key fields.
- Updated mermaid diagrams to reflect new entities and relationships.
- Introduced comprehensive guidelines for creating mermaid diagrams and domain explanations to ensure consistency and clarity across documentation.


---
## feat: Update billing ERD with new line items and payment structures; remove outdated ERD
* **Commit**: `9cb0579`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-02



---
## Add comprehensive entity relationship diagrams for various systems
* **Commit**: `2480f54`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-02

- Introduced billing.md to define billing-related entities and relationships, including rate cards, invoices, payments, and disputes.
- Created crm.md to outline the CRM structure, detailing users, roles, companies, contacts, and interactions.
- Added dms.md for the Delivery Management System, covering delivery routes, tasks, events, and proof of deliveries.
- Developed erd.md to consolidate the core entities and relationships across systems, enhancing overall data structure visibility.
- Implemented ims.md for the Inventory Management System, detailing products, suppliers, warehouses, and inventory levels.
- Established portal.md to define user access control and settings within the portal environment.
- Created tms.md for the Transportation Management System, including drivers, vehicles, trips, and geofences.
- Added wms.md for the Warehouse Management System, detailing locations, inventory stock, tasks, and packages.


---
## Add user stories for CRM, DMS, IMS, Portal, TMS, and WMS
* **Commit**: `17a54d0`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-02

- Introduced comprehensive user stories for the CRM module, detailing features for sales pipeline management, marketing campaign tracking, customer support case management, and more.
- Added user stories for the DMS, focusing on delivery task assignment, route optimization, and real-time tracking for customers.
- Included user stories in the IMS for product catalog management, real-time stock tracking, inventory adjustments, and low stock alerts.
- Created user stories for the client self-service portal, enabling clients to manage their accounts and services.
- Developed user stories for the TMS, covering driver profile management, shipment assignment, real-time GPS tracking, and proof of delivery.
- Implemented user stories for the WMS, addressing warehouse layout configuration, order fulfillment, packing, and labor productivity reporting.


---
## standardized search params
* **Commit**: `6105335`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01



---
## feat: Implement shipment management with create, edit, delete functionalities and loading states
* **Commit**: `d7e5dab`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01



---
## feat: Add loading and table components for CRM cases and LMS packages
* **Commit**: `0ead752`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01

- Implemented loading skeleton for CRM cases and LMS packages.
- Created table structure for displaying CRM cases with actions (edit, delete).
- Developed actions for creating, editing, and deleting LMS packages with appropriate dialogs.
- Added warehouse management features including loading, table display, and CRUD operations.
- Enhanced UI with dropdown menus for actions and badges for status representation.


---
## feat: Update version to 1.5.0 and refactor imports in components for consistency
* **Commit**: `032f40e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01



---
## feat: Enhance AppSidebar with domain management and update NavMain and NavUser components for improved user experience
* **Commit**: `59ef8c1`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01



---
## Refactor LMS routes and components
* **Commit**: `3a25849`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01

- Removed old route files for addresses, inventories, packages, pricing, providers, shipments, shipping, and warehouses.
- Added new components for managing addresses including loading, table, and action dialogs (create, edit, delete).
- Implemented a new loading page for addresses.
- Updated the migration for LMS addresses to modify collection rules.
- Introduced a checkbox field component for form handling.
- Created index files for inventories, packages, pricing, providers, shipments, shipping, and warehouses with basic route setup.


---
## feat: Implement organization management with create, edit, and delete functionalities
* **Commit**: `1b0c72e`
* **Author**: Karl robeck alferez
* **Date**: 2025-09-01

- Added EditOrganizationDialog for editing organization details.
- Added NewOrganizationDialog for creating new organizations.
- Implemented LoadingPage component for organization routes.
- Created DataTable for displaying organization data with actions.
- Integrated search parameters for organization management.
- Added role management with create, edit, and delete functionalities.
- Implemented EditRoleDialog and NewRoleDialog for role management.
- Created LoadingPage and DataTable for roles.
- Added team management with create, edit, and delete functionalities.
- Implemented EditTeamDialog and NewTeamDialog for team management.
- Created LoadingPage and DataTable for teams.


---
## feat: implement CRUD functionality for drivers and vehicles in the dashboard
* **Commit**: `e3f4d54`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-31

- Added Delete, Edit, and New dialogs for drivers and vehicles with respective forms.
- Integrated loading states for driver and vehicle pages.
- Created data tables for displaying driver and vehicle information with action menus.
- Implemented navigation and state management for dialog visibility and form submissions.
- Utilized react-query for data fetching and state management.


---
## feat: implement CRUD functionality for CRM invoices, opportunities, and products
* **Commit**: `fd00a0f`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-28

- Added invoice management with create, edit, and delete functionalities.
- Implemented opportunity management including actions for creating, editing, and deleting opportunities.
- Developed product management features with options to create, edit, and delete products.
- Introduced loading states and data tables for better user experience.
- Enhanced UI with dialog components for confirmation and form submissions.


---
## feat: enhance loading page with Skeleton component; update global styles for improved design consistency and add new CSS variables
* **Commit**: `d08d154`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-27



---
## chore: update version to 1.4.0 in package.json
* **Commit**: `ecc92fb`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-27



---
## Refactor route imports and formatting across multiple files; enhance lead management dialogs with delete and edit functionalities; implement new lead creation form; update table actions for leads; ensure consistent code style and formatting.
* **Commit**: `85e0de8`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-27



---
## feat: conditionally render NewLeadsDialog based on search parameters
* **Commit**: `e969788`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-26



---
## feat: enhance leads route with additional search parameters for improved filtering and sorting
* **Commit**: `a05e287`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-26



---
## feat: integrate @tanstack/react-query for improved data fetching and state management, add new leads form with validation and dialog support
* **Commit**: `ff08741`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-26



---
## feat: enhance CRM leads management with new dialogs, data table integration, and routing improvements
* **Commit**: `045ad36`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-25



---
## feat: update CRM leads management with new routes and components, migrate to react-table
* **Commit**: `c71f8bc`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24



---
## feat: add new Choicebox, Combobox, Dropzone, QRCode, and Tags components
* **Commit**: `a6cec6b`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24

- Introduced Choicebox component for radio group selection.
- Added Combobox component with context for managing state and dropdown functionality.
- Implemented Dropzone component for file uploads with drag-and-drop support.
- Created QRCode component for generating customizable QR codes.
- Developed Tags component for tag selection with context management.
- Updated package.json to include new dependencies for the above components.
- Removed unnecessary "use client" directive from popover component.


---
## feat: update login form and user schema for improved type safety
* **Commit**: `77d2ff4`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24



---
## feat: integrate @tanstack/react-form for form handling and validation
* **Commit**: `66a3641`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24

- Added @tanstack/react-form to package.json for improved form management.
- Refactored existing form components to utilize the new form library.
- Created a new LoginForm component with integrated form handling.
- Implemented a DateField component with a date picker using Popover.
- Developed MultiSelect and SelectField components for enhanced selection capabilities.
- Updated UI components to ensure consistent styling and functionality.
- Improved error handling and user feedback in form submissions.


---
## chore: update version to 1.2.0 in package.json
* **Commit**: `667cf26`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24



---
## feat: add login form and route for user authentication
* **Commit**: `0ee37bf`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24



---
## feat: implement app sidebar with navigation and user management
* **Commit**: `94c1d0f`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-24

- Added AppSidebar component with collapsible sections for navigation.
- Integrated NavMain for main navigation items and NavProjects for project links.
- Created NavUser for user profile and settings dropdown.
- Introduced TeamSwitcher for managing active teams.
- Updated dashboard route to include the new sidebar layout.
- Refactored tooltip and skeleton components for consistency.
- Enhanced mobile responsiveness in useIsMobile hook.
- Adjusted route structure for dashboard-related routes.


---
## feat: add CRM and LMS schemas with Zod validation
* **Commit**: `733d175`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-23

- Introduced CRM schemas for campaigns, contacts, invoices, leads, opportunities, and products.
- Implemented LMS schemas for addresses, packages, pricing rates, shipments, and transport providers.
- Generated manifest files for both CRM and LMS schemas.
- Added organization and role management schemas for the org domain.
- Included driver and vehicle schemas for the TMS domain.
- Established user schema for user management.


---
## feat(routes): add NotFound component and update root route configuration
* **Commit**: `e32b427`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-23

feat(migrations): update LMS provider services and related collections

feat(routes): create dashboard CRM routes for campaigns, cases, companies, contacts, interactions, invoices, leads, and opportunities

feat(routes): create dashboard LMS routes for addresses, inventories, packages, pricing, providers, shipments, shipping, and warehouses

feat(routes): create dashboard organization routes for organization, roles, and teams

feat(routes): create dashboard TMS routes for drivers and vehicles


---
## Refactor code structure for improved readability and maintainability
* **Commit**: `bdca989`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-23



---
## Refactor routeTree and route files for consistency and readability
* **Commit**: `015bc0f`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-23

- Updated import statements to use consistent single quotes.
- Added semicolons at the end of statements in routeTree.gen.ts for consistency.
- Reformatted the structure of the routeTree and related interfaces for better readability.
- Adjusted the Route component in __root.tsx to maintain consistent import order.
- Reformatted the Route component in index.tsx for improved readability.
- Ensured proper formatting in globals.css by adding a newline at the end of the file.
- Cleaned up tsconfig.json by removing unnecessary line breaks for better clarity.


---
## Add migrations for LMS and CRM invoice collections and line items
* **Commit**: `fffac1f`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19

- Created `lms_provider_invoices` collection with fields for invoice management.
- Created `lms_provider_invoice_line_items` collection for line items associated with provider invoices.
- Created `crm_invoices` collection with fields for CRM invoice management.
- Created `crm_invoice_line_items` collection for line items associated with CRM invoices.


---
## feat(migrations): add collections for LMS warehouse inventories, transport providers, provider services, and related entities
* **Commit**: `90629b1`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19

- Created `lms_warehouse_inventories` collection with fields for ID, warehouse, shipment, package, location code, status, arrival and departure dates, and timestamps.
- Created `lms_transport_providers` collection with fields for ID, company name, type, contact person, email, phone number, address, API endpoint, API key, contract dates, payment terms, insurance coverage, performance rating, and timestamps.
- Created `lms_provider_services` collection with fields for ID, provider relation, name, type, transport mode, max weight, transit times, cutoff time, tracking and insurance availability, and timestamps.
- Created `lms_provider_service_origin_countries` collection with fields for ID, provider relation, country code, and timestamps.
- Created `lms_provider_service_destination_countries` collection with fields for ID, provider relation, country code, and timestamps.
- Created `lms_provider_service_max_dimensions` collection with fields for ID, provider relation, length, width, height, and timestamps.
- Created `lms_provider_rates` collection with fields for ID, provider relation, origin and destination zones, weight limits, rates, currency, effective and expiry dates, and timestamps.
- Created `lms_provider_performance` collection with fields for ID, provider relation, shipment relation, metric type, metric value, measurement date, notes, and timestamps.


---
## feat: update version to 1.0.5 in package.json and add migrations for TMS drivers and vehicles
* **Commit**: `bb75cff`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19



---
## feat: bump version to 1.0.4 in package.json
* **Commit**: `679b59f`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19



---
## feat: update package version to 1.0.3 and add migration for updated LMS addresses collection
* **Commit**: `edac4b0`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19



---
## feat: add migration for LMS addresses collection with fields and rules
* **Commit**: `398713e`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19



---
## fix: update package name and version in package.json; adjust docker commands to include organization name
* **Commit**: `0150627`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19



---
## feat: add CRM collections for leads, opportunities, interactions, campaigns, and products
* **Commit**: `a430ba6`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19

- Created `crm_leads` collection with fields for ID, first name, last name, email, phone number, company name, lead source, lead status, lead score, converted contact relation, and timestamps.
- Created `crm_opportunities` collection with fields for ID, name, company relation, primary contact relation, stage, amount, close date, probability, and timestamps.
- Created `crm_interactions` collection with fields for ID, type, subject, description, interaction date, contact relation, opportunity relation, and timestamps.
- Created `crm_campaigns` collection with fields for ID, name, description, start date, end date, budget, status, and timestamps.
- Created `crm_campaign_contacts` collection with fields for ID, campaign relation, contact relation, status, interaction date, and timestamps.
- Created `crm_cases` collection with fields for ID, subject, description, status, priority, contact relation, closed at date, and timestamps.
- Created `crm_products` collection with fields for ID, name, description, price, SKU, and timestamps.
- Created `crm_opportunity_products` collection with fields for ID, opportunity relation, product relation, quantity, unit price, and timestamps.


---
## Add migrations for organization management features
* **Commit**: `ed24ac4`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19

- Created `org_teams` collection with fields for ID, organization relation, name, description, and timestamps.
- Created `org_team_members` collection with fields for ID, team relation, user relation, and timestamps.
- Created `org_roles` collection with fields for ID, organization relation, name, description, and timestamps.
- Created `org_team_roles` collection with fields for ID, team relation, roles relation, and timestamps.
- Updated `org_team_members` collection to add a unique index on team and user relations.
- Created `org_role_actions` collection with fields for ID, role relation, action, and timestamps.
- Created `org_team_resources` collection with fields for ID, resource, and timestamps.
- Created `crm_companies` collection with fields for ID, name, description, email, website, industry, phone number, and timestamps.


---
## feat: add UI components including Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle Group, Toggle, Tooltip, and Pocketbase integration
* **Commit**: `a1b981b`
* **Author**: Karl robeck alferez
* **Date**: 2025-08-19

- Implemented Skeleton component for loading states.
- Created Slider component with customizable min, max, and value props.
- Added Sonner component for notifications with theme support.
- Developed Switch component for toggle functionality.
- Built Table component with subcomponents for headers, body, footer, rows, and cells.
- Introduced Tabs component with triggers and content management.
- Created Textarea component with styling and accessibility features.
- Implemented Toggle Group and Toggle components for grouped toggle functionality.
- Developed Tooltip component with customizable content and triggers.
- Integrated Pocketbase for backend data management with type definitions.
- Added utility functions for class name merging and responsive design hooks.
- Updated global styles with custom properties for theming and layout.


---
## feat: add user story template with acceptance criteria and task breakdown
* **Commit**: `868cdeb`
* **Author**: Karl robeck alferez
* **Date**: 2025-07-15



---
## Merge pull request #62 from F-orge/61-feature---implement-access-control
* **Commit**: `10956dd`
* **Author**: karlrobeck
* **Date**: 2025-05-30

61 feature   implement access control

---
## chore: update changelog with recent feature implementations and enhancements
* **Commit**: `b5674a1`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-30



---
## feat: update version to 0.17.0 in package.json
* **Commit**: `f25143c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-30



---
## feat: add permission check for executive and finance roles in invoice forms
* **Commit**: `7f790a1`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-30



---
## feat: Implement role-based navigation for user access control
* **Commit**: `56c80e4`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-30

- Added user role definitions and navigation item types in utils.ts.
- Defined all navigation items with their respective access roles.
- Created a function to filter navigation items based on user roles.
- Updated AppSidebar component to utilize the new role-based navigation.
- Restricted access to "Create Invoice" and "Create Payment" buttons based on user roles.
- Updated invoice and payment edit forms to disable fields appropriately.
- Added migrations to update collection rules for various user roles.


---
## feat: update access control for invoices; enhance edit form with disabled fields for non-editable data
* **Commit**: `2a19ed9`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-30



---
## feat: update date handling in inventory, orders, and shipments forms; add role field to user migration
* **Commit**: `670fdeb`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-30



---
## Merge pull request #60 from F-orge/51-feature---apply-crud-operation-to-all-tables
* **Commit**: `ceb06a3`
* **Author**: karlrobeck
* **Date**: 2025-05-29

51 feature   apply crud operation to all tables

---
## chore(changelog): update changelog with recent feature implementations and enhancements
* **Commit**: `573eb48`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29



---
## Refactor dashboard routes to improve import organization and component structure
* **Commit**: `28d9f9c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29

- Reorganized imports in various dashboard components for better readability and maintainability.
- Moved component imports to the top and grouped related imports together.
- Ensured consistent import order across different files in the dashboard section.
- Updated the structure of the dashboard routes for companies, departments, inventory, orders, products, shipments, tasks, and warehouses.
- Removed unnecessary imports and streamlined the code for better performance.


---
## feat: implement invoice and payment management forms with CRUD functionality
* **Commit**: `a1af61d`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29



---
## Refactor route search query handling and update dialog states
* **Commit**: `4154d77`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29

- Updated search query keys in delete, edit, and new route forms to use consistent naming conventions.
- Removed unnecessary type assertions for search queries in various route components.
- Simplified navigation logic by standardizing search query parameters.
- Removed unused pagination configurations from collections.
- Added new columns and options for invoices and payments in the dashboard.
- Introduced a new schema for search queries to streamline data handling.
- Deleted unused invoice and payment route files to clean up the codebase.


---
## feat: add vehicle management functionality to dashboard
* **Commit**: `2845173`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29

- Introduced new vehicle actions: create, edit, and delete forms.
- Implemented vehicle columns for the dashboard table.
- Enhanced dashboard routing to support vehicle management.
- Updated search query schema to handle vehicle-specific queries.
- Improved date formatting for planned start and end times in routes.
- Removed unused vehicle route files.


---
## feat: add route collections management with CRUD forms and enhanced column definitions
* **Commit**: `ae75df7`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29



---
## feat: enhance route management with new fields and delete functionality
* **Commit**: `2bb3179`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29



---
## feat: implement new route management form and enhance route columns in dashboard
* **Commit**: `1c7b8b8`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-29



---
## feat: add dashboard routes and CRUD functionality for orders and shipments
* **Commit**: `1bf0c53`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-28

- Implemented dashboard route for collections with dynamic routing.
- Created columns definition for orders with actions for edit and delete.
- Added delete functionality for orders with confirmation dialog.
- Developed edit form for orders with data fetching and submission.
- Implemented new order creation form with validation and submission.
- Defined search query schema for orders.
- Created columns definition for shipments with actions for edit and delete.
- Added delete functionality for shipments with confirmation dialog.
- Developed edit form for shipments with data fetching and submission.
- Implemented new shipment creation form with validation and submission.
- Defined search query schema for shipments.


---
## refactor: clean up sidebar sample data and enhance inventory item forms with dialog components
* **Commit**: `090805c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-28



---
## Refactor navigation hooks in dashboard routes to use Route.useNavigate()
* **Commit**: `f7dc558`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27

- Updated all instances of useNavigate({ from: Route.fullPath }) to Route.useNavigate() in the dashboard companies, departments, products, tasks, and warehouses routes.
- Removed unused inventory routes and added new inventory item management components including forms for creating, editing, and deleting inventory items.
- Introduced a new schema for inventory item search queries.
- Added migration for updating inventory items collection rules.
- Enhanced the inventory items table with appropriate columns and dropdown actions.


---
## feat: implement delete product functionality with confirmation dialog
* **Commit**: `683c57b`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27



---
## refactor: remove old product routes and implement new product management features
* **Commit**: `bd95dce`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27

- Deleted old product edit, index, inventory, and new routes.
- Introduced a new product listing page with advanced data table features.
- Added new forms for creating, editing, and deleting products.
- Implemented search query validation using Zod.
- Updated product schema in migrations to include new fields for dimensions.
- Enhanced product columns to display additional information such as dimensions and supplier.


---
## feat: implement delete warehouse functionality with confirmation dialog
* **Commit**: `f68b4a7`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27



---
## chore: update version to 0.16.0 in package.json
* **Commit**: `0323443`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27



---
## feat: add delete department functionality with confirmation dialog
* **Commit**: `38f1b08`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27



---
## chore(changelog): update changelog with recent feature implementations and enhancements
* **Commit**: `b3fcd53`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27



---
## Merge pull request #50 from F-orge/49-feature---implement-crud-operation-for-companies-and-departments-collection
* **Commit**: `b69f7a0`
* **Author**: karlrobeck
* **Date**: 2025-05-27

49 feature   implement crud operation for companies and departments collection

---
## feat: Refactor warehouse management with CRUD operations
* **Commit**: `7dcf95c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-27

- Implemented new warehouse creation and editing forms with validation.
- Added file handling for attachments in tasks and departments.
- Enhanced user experience with loading states and improved dialog handling.
- Removed unused warehouse routes and consolidated warehouse-related components.
- Introduced utility functions for dialog management and file fetching.
- Updated task and department forms to include multi-select options for users.
- Improved data fetching logic using React Query for better performance.


---
## Refactor dashboard routes for companies and departments
* **Commit**: `d435819`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-26

- Removed old file-based routes for editing and viewing companies and departments.
- Implemented new forms for creating, editing, and deleting companies and departments with improved UI components.
- Introduced data tables for displaying companies and departments with sorting and filtering capabilities.
- Updated query schemas for handling pagination and search parameters.
- Added new migration for updating department collection rules.
- Enhanced error handling and user feedback with toast notifications.


---
## chore(package): bump version to 0.15.0
* **Commit**: `2428309`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-26



---
## chore(changelog): update changelog with recent migration and seeding enhancements
* **Commit**: `9171f1c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-26



---
## Merge pull request #48 from F-orge/47-improvement---improve-validation-for-all-collections
* **Commit**: `4983150`
* **Author**: karlrobeck
* **Date**: 2025-05-26

47 improvement   improve validation for all collections

---
## chore(package): bump version to 0.14.0
* **Commit**: `61807d4`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-26



---
## feat: enhance seed functionality and update migrations
* **Commit**: `2e97bab`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-26

- Updated seed.ts to use Omit for records without 'id' field, ensuring proper data structure during seeding.
- Improved product seeding logic to always assign a supplier.
- Refactored various seed functions for consistency and clarity.
- Added new fields to companies, departments, and routes collections in migrations to enforce required relationships.
- Adjusted notifications seeding to include priority and type options.
- Cleaned up imports in dashboard task components for better organization and readability.


---
## feat(migrations): update product, route segments, routes, shipments, tasks, vehicles, and warehouses collections
* **Commit**: `f22a95e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-26

- Added new fields to products: weight, dimensions, cost, supplier, and image.
- Updated route segments with new fields: sequenceNumber, segmentType, addressText, longitude, latitude, and relatedShipment.
- Introduced status, longitude, and latitude fields to routes.
- Enhanced shipments with trackingNumber, carrier, status, estimatedDeliveryDate, proofOfDelivery, driver, and departmentAssigned fields.
- Modified tasks to remove kanbanOrder field and add an index.
- Updated vehicles with make, model, type, capacityVolume, capacityWeight, and status fields.
- Adjusted warehouses to include longitude, latitude, and manager fields with unique indexes.


---
## Merge pull request #46 from F-orge/45-fix---finish-task-management-page
* **Commit**: `4487abd`
* **Author**: karlrobeck
* **Date**: 2025-05-25

45 fix   finish task management page

---
## chore(changelog): add detailed entries for recent task form and migration updates
* **Commit**: `afd421e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## fix(task-form): set default status to 'todo' in CreateNewTaskForm
* **Commit**: `e8a1cb7`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## feat(migrations): update task messages, vehicles, user access, chat messages, and tasks collections with new fields and indexes
* **Commit**: `5e7eb19`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25

- Updated task messages collection to change field name from "readBy" to "read_by".
- Modified vehicles collection to add fields for capacity volume and weight, and updated license plate field name.
- Created user access collection with fields for user relations and access control.
- Updated user access collection to allow multiple selections for the field.
- Updated chat messages collection to add an index on the content field.
- Enhanced tasks collection to include file attachments with specified MIME types.
- Refactored task edit and delete routes to improve user experience and data handling.
- Implemented KPI components for tasks overview, priority, and department statistics.


---
## chore(package): bump version to 0.13.0 and update @marahuyo/react-ui dependency
* **Commit**: `722e443`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## Merge pull request #44 from F-orge/28-feature---add-view-table-in-pocketbase-for-kpis-key-performance-indicators
* **Commit**: `4b71a40`
* **Author**: karlrobeck
* **Date**: 2025-05-25

28 feature   add view table in pocketbase for kpis key performance indicators

---
## chore(changelog): update changelog with recent entries and improve formatting
* **Commit**: `ddb3a79`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## chore(package): bump version to 0.12.0
* **Commit**: `9720f21`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## feat(routes): update route imports for dashboard and related entities
* **Commit**: `6edb2b8`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## Merge branch 'main' into 28-feature---add-view-table-in-pocketbase-for-kpis-key-performance-indicators
* **Commit**: `18673ce`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25



---
## feat(migrations): update various KPIs and notifications
* **Commit**: `6af3a00`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-25

- Updated `tasksDepartmentKPI` to modify fields and view query for department task counts.
- Updated `tasksSpecificTagKPI` to enhance tag counting logic and field definitions.
- Refined `taskMessagesOverallKPI` to include detailed message statistics.
- Enhanced `taskMessagesCountKPI` to track message counts per task with updated field names.
- Improved `notificationsOverallKPI` to summarize notification statistics with distinct counts.
- Created `notificationsUnreadKPI` to track unread notifications per user.
- Updated `notifications` collection to add a priority field for notifications.
- Created `notificationsPriorityKPI` to analyze notifications based on priority levels.


---
## Merge pull request #43 from F-orge/36-feature---apply-proper-error-handling-and-not-found-page
* **Commit**: `7a99061`
* **Author**: karlrobeck
* **Date**: 2025-05-25

36 feature   apply proper error handling and not found page

---
## fix(changelog): update changelog entries for recent changes and improve formatting
* **Commit**: `36fa9af`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-24



---
## fix(package): update version to 0.11.0
* **Commit**: `4a7c33f`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-24



---
## feat(routes): add NotFoundPage component and integrate with router
* **Commit**: `c24803e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-24



---
## added key performance indicators for notifications EXCEPTION for UnreadKPI (SQL logic error: no such column: user_recipient (1).) and PriorityKPI (SQL logic error: no such column: priority (1).)
* **Commit**: `f45f92c`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for taskMessages collection
* **Commit**: `0cdf5f9`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for tasks collection EXCEPTION for OverallKPI (SQL logic error: no such column: due_date (1).) and SpecificTagKPI (error when created)
* **Commit**: `42a85d3`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for departments collection
* **Commit**: `2f3cb6a`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for chatMessages collection
* **Commit**: `d5796dc`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for chatrooms collection
* **Commit**: `96655fe`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for payments collections EXCEPTION for Payment Count and Amount Method (value cannot contain 'via')
* **Commit**: `94ac985`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for invoices collection
* **Commit**: `2979589`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for routeSegments collection
* **Commit**: `e4f1a17`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for routes collection
* **Commit**: `cf89fa6`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for vehicles collection
* **Commit**: `a2a3f91`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for shipments collection exception of On-Time Delivery Rate (SQL Logic Error)
* **Commit**: `33a54d3`
* **Author**: VienMorfe
* **Date**: 2025-05-24



---
## added key performance indicators for inventoryItems collection
* **Commit**: `433efd3`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## added key performance indicators for orderLineItems collection
* **Commit**: `a1832cc`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## added key performance indicators for orders collection
* **Commit**: `87186fe`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## added key performance indicators for warehouse collection
* **Commit**: `5e8c1eb`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## added key performance indicators for products collection
* **Commit**: `50128eb`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## added key performance indicators for companies
* **Commit**: `d081b39`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## added key performance indicator for users collection
* **Commit**: `ca136b3`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## add users KPI
* **Commit**: `8b21b69`
* **Author**: VienMorfe
* **Date**: 2025-05-23



---
## Merge pull request #41 from F-orge/40-improvement---improve-code-structure-at-task-management
* **Commit**: `a199afa`
* **Author**: karlrobeck
* **Date**: 2025-05-23

40 improvement  improve code structure at task management

---
## fix(changelog): update changelog generation script for clarity and formatting
* **Commit**: `b850046`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## fix(changelog): update import order and add missing imports for consistency across components
* **Commit**: `df5e028`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23

fix(package): update version to 0.10.1

chore(package): rename changelog script for clarity and improve formatting


---
## fix(package): update version to 0.10.1
* **Commit**: `1c64acb`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## fix(changelog): update import order and add missing imports for consistency across components
* **Commit**: `a32ed1e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## fix: update imports and re-order for consistency across components
* **Commit**: `a847e12`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23

- Fixed import order in breadcrumbs, data-table, form, and notification-sheet components.
- Added missing imports for new routes in routeTree.gen.ts.
- Refactored imports in dashboard companies and tasks forms for clarity.
- Ensured consistent usage of hooks and types across various components.
- Cleaned up unused imports and organized existing ones for better readability.


---
## feat(tasks): implement CreateTaskForm with validation and dialog integration
* **Commit**: `319dd0e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## Merge pull request #39 from F-orge/38-refactor---apply-form-composition-globally
* **Commit**: `8649dc7`
* **Author**: karlrobeck
* **Date**: 2025-05-23

38 refactor   apply form composition globally

---
## fix(form): update query key in CreateCompanyForm to use 'companies'
* **Commit**: `68b595e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## refactor: update company schema fields to use camelCase and add new form components
* **Commit**: `0578b77`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23

- Changed `contact_email` and `contact_phone` fields to `contactEmail` and `contactPhone` in CompaniesRecordSchema.
- Introduced new `TextAreaInputField` and `SingleSelectField` components for better form handling.
- Updated the CreateCompanyForm to utilize the new field components and adjusted validation schema accordingly.
- Added a migration script to update existing database fields to match the new naming conventions.


---
## feat(login): integrate form components and refactor login route
* **Commit**: `348627f`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## chore(package): bump version to 0.10.0
* **Commit**: `57a45d4`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## feat(form): implement form hook contexts and createAppForm hook
* **Commit**: `be19767`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-23



---
## Merge pull request #37 from F-orge/26-fix---refactor-data-table
* **Commit**: `661b532`
* **Author**: karlrobeck
* **Date**: 2025-05-22

feat(data-table): refactor DataTable component and integrate into Tas…

---
## feat(data-table): refactor DataTable component and integrate into TaskTable
* **Commit**: `dc41594`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-22



---
## Merge pull request #35 from F-orge/34-feature---refactor-github-issue-template
* **Commit**: `1b5ea53`
* **Author**: karlrobeck
* **Date**: 2025-05-22

feat(issue-template): enhance feature request template with descripti…

---
## feat(issue-template): enhance feature request template with descriptions and placeholders
* **Commit**: `ddd31a8`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-22



---
## Merge pull request #32 from F-orge/23-feature---add-notification-sidesheet
* **Commit**: `cf21e18`
* **Author**: karlrobeck
* **Date**: 2025-05-20

23 feature  add notification sidesheet

---
## chore(changelog): update changelog with recent changes and enhancements
* **Commit**: `dc3b077`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## feat(notification): add NotificationSideSheet component and integrate into dashboard layout
* **Commit**: `ef1ab77`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## chore(package): update version to 0.9.0
* **Commit**: `6a4308f`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## Merge pull request #31 from F-orge/22-feature---add-breadcrumbs-navigation
* **Commit**: `e06fcf4`
* **Author**: karlrobeck
* **Date**: 2025-05-20

22 feature   add breadcrumbs navigation

---
## feat(breadcrumbs): add TSRBreadCrumbs component and integrate into dashboard layout; refactor route imports for better organization
* **Commit**: `7cbc425`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## feat(breadcrumbs): add TSRBreadCrumbs component for enhanced navigation refactor(dashboard): integrate TSRBreadCrumbs into dashboard layout refactor(routeTree): update route imports for better organization
* **Commit**: `80a12e1`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## chore(package): update version to 0.8.0
* **Commit**: `9814442`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## Merge pull request #21 from F-orge/19-feature---add-zod-validation-schema-to-all-collections
* **Commit**: `c0317f8`
* **Author**: karlrobeck
* **Date**: 2025-05-20

19 feature   add zod validation schema to all collections

---
## chore(changelog): update changelog with recent changes and enhancements
* **Commit**: `b9e7a67`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## refactor(tasks): reorganize imports and enhance task components for better structure
* **Commit**: `6c61f97`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## feat(schemas): add comprehensive schemas for various records including users, tasks, and inventory
* **Commit**: `2882174`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-20



---
## chore(package): update version to 0.7.1
* **Commit**: `3a89bc5`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-19



---
## add changelog
* **Commit**: `ee489da`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-19



---
## Merge pull request #20 from F-orge/17-fix---refactor-data-fetching-in-task-management
* **Commit**: `f935f00`
* **Author**: karlrobeck
* **Date**: 2025-05-19

17 fix  refactor data fetching in task management

---
## feat(tasks): update NewTask component with form handling and integrate date-fns for date management
* **Commit**: `981c828`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-19



---
## feat(users): implement user management queries and mutations for CRUD operations
* **Commit**: `5b889fa`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-19



---
## feat(tasks): replace due date select with popover calendar for improved date selection
* **Commit**: `950f1f8`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(tasks): update task assignment dialog and remove unused components
* **Commit**: `838e022`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(tasks): enhance priority selection with dropdown menu for task management
* **Commit**: `023be6c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(tasks): enhance task assignment display with external link icons and improved handling for unassigned employees
* **Commit**: `e55d2fa`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## Refactor task management: streamline task seeding, enhance task assignment UI, and update task status handling
* **Commit**: `dfc21d1`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18

- Simplified task seeding logic by always assigning a department from available options.
- Updated task queries to allow optional assignees and improved mutation handling for task updates.
- Removed obsolete task columns and views, consolidating task management UI components.
- Introduced a new AssignTask component for better user experience in assigning tasks to employees.
- Enhanced task table with improved filtering and status update functionality.
- Added migration to update task collection schema for assignees relationship.


---
## feat(tasks): enhance task retrieval with optional filter; refactor task query schema and table component
* **Commit**: `1cc6148`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(routes): replace loader with beforeLoad for dashboard and login routes; add query schema for task management
* **Commit**: `155b27b`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(tasks): enhance mutation functions for task management with attachments
* **Commit**: `36233e5`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(routes): update route imports for improved organization and maintainability
* **Commit**: `235e360`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## chore(package): bump version to 0.6.1
* **Commit**: `82c0eac`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(manifest): add purpose attribute to maskable icon for better PWA support
* **Commit**: `efd6685`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18

refactor(index.tsx): fix import order for clarity

refactor(routeTree.gen.ts): reorganize route imports for improved structure

refactor(NewTask): reorder imports for consistency


---
## Merge pull request #18 from F-orge/14-feature---add-pwa-metadata
* **Commit**: `a55cab3`
* **Author**: karlrobeck
* **Date**: 2025-05-18

14 feature add pwa metadata

---
## chore(package): update version to 0.6.0
* **Commit**: `c74d79c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## feat(manifest): add web app manifest for improved PWA support feat(routes): integrate new routes for user authentication and dashboard features
* **Commit**: `9650e7b`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-18



---
## Merge pull request #16 from F-orge/15-feature---implement-crud-operations-for-task-management
* **Commit**: `9b1234f`
* **Author**: karlrobeck
* **Date**: 2025-05-17

15 feature   implement crud operations for task management

---
## feat(tasks): enhance task management with new task creation and improved query handling
* **Commit**: `a4f4183`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-16

- Implemented a new task creation form with validation using Zod.
- Integrated task querying with pagination and filtering capabilities.
- Updated task permissions and rules in migrations for better access control.
- Removed the old new task route and consolidated functionality into a modal.
- Added new fields and relationships in the task schema to support enhanced task features.
- Improved UI components for better user experience in task management.


---
## Add SQL KPI queries for various collections and implement tasks KPI migration
* **Commit**: `c6f6934`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-15

- Created a comprehensive set of SQL KPI queries for users, companies, products, warehouses, orders, order line items, inventory items, shipments, vehicles, routes, route segments, invoices, payments, chat rooms, chat messages, departments, tasks, task messages, and notifications.
- Implemented migrations for tasks KPI, including creation, updates, and field management.
- Enhanced the dashboard view for tasks with detailed information, including status, priority, due date, assignees, related orders, and shipments.


---
## Merge pull request #13 from F-orge/11-feature---add-data-table-component
* **Commit**: `af3be23`
* **Author**: karlrobeck
* **Date**: 2025-05-14

11 feature   add data table component

---
## chore: update version to 0.5.0 in package.json
* **Commit**: `7eaa356`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## feat: Implement task management table with filtering and pagination
* **Commit**: `6293373`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14

- Added DataTable component for displaying tasks with sorting, filtering, and pagination.
- Integrated useTasks hook to fetch task data from PocketBase.
- Created columns definition for task attributes including ID, status, title, due date, assigner, and priority.
- Updated dashboard tasks route to render the DataTable with fetched tasks.
- Removed unnecessary border styling from the dashboard layout.


---
## Merge pull request #12 from F-orge/10-feature---implement-dashboard-layout
* **Commit**: `0b75c80`
* **Author**: karlrobeck
* **Date**: 2025-05-14

10 feature   implement dashboard layout

---
## chore: update version to 0.4.0 in package.json
* **Commit**: `1afa8e6`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## Implement code changes to enhance functionality and improve performance
* **Commit**: `13d8522`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## feat: refactor sidebar navigation and user profile components; remove settings route
* **Commit**: `2bbff11`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## feat: implement sidebar navigation in dashboard
* **Commit**: `6da7c80`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14

- Added AppSidebar component to the dashboard route.
- Created NavMain, NavProjects, and NavUser components for sidebar navigation.
- Integrated collapsible menus and dropdowns for better user experience.
- Included sample data for user, teams, and navigation items.


---
## Merge pull request #9 from F-orge/7-feature---implement-authentication-logic-in-the-login-page
* **Commit**: `b42a472`
* **Author**: karlrobeck
* **Date**: 2025-05-14

7 feature  implement authentication logic in the login page

---
## chore: update version to 0.3.0 in package.json
* **Commit**: `1e5747f`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## Implement feature X to enhance user experience and fix bug Y in module Z
* **Commit**: `fe3209d`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## feat: add input types for email and password fields and remove duplicate redirect
* **Commit**: `ce67195`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## refactor: reorder imports for better readability in login.tsx
* **Commit**: `1623ea5`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## feat: implement login functionality with form validation and redirect to dashboard
* **Commit**: `7427af4`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14

- Added a login form with email and password fields using @marahuyo/react-ui components.
- Integrated Pocketbase authentication and error handling.
- Redirect users to the dashboard if already authenticated.
- Created a dashboard route that checks for authentication and redirects to login if not valid.


---
## Merge pull request #6 from F-orge/5-feature---implement-sonner-notification-in-frontend
* **Commit**: `08ca6db`
* **Author**: karlrobeck
* **Date**: 2025-05-14

5 feature implement sonner notification in frontend

---
## Bump version to 0.2.1 in package.json
* **Commit**: `9293129`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## fix linting
* **Commit**: `3dcadd4`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## Add sonner for toast notifications and update radius in globals.css
* **Commit**: `233334b`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## Refactor code structure for improved readability and maintainability
* **Commit**: `ba908d2`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-14



---
## Bump version to 0.2.0 in package.json
* **Commit**: `85c0c03`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## Refactor route definitions to ensure consistent formatting and improve readability
* **Commit**: `31050cf`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13

- Added semicolons at the end of import statements and return statements in route components across multiple files.
- Reformatted the createFileRoute function calls to use a consistent multi-line style for better clarity.
- Ensured all route components return statements are consistently formatted with semicolons.


---
## Refactor dashboard routes to use dynamic parameters
* **Commit**: `a329040`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13

- Removed old route files for companies, departments, inventory, orders, products, routes, shipments, tasks, users, and warehouses.
- Added new route files with dynamic parameters for companies, departments, inventory items, orders, products, routes, shipments, tasks, users, and warehouses.
- Updated route paths to use more descriptive dynamic parameters (e.g., $company_id, $department_id, $inventory_item_id, $order_id_custom, $product_id, $route_name_or_id, $tracking_number, $task_id, $user_id, $warehouse_id).


---
## Add dashboard routes for chat, invoices, payments, settings, and tasks
* **Commit**: `056baaf`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13

- Created routes for chat including room, new chat, and support.
- Added invoice routes for editing, recording payment, sending, and new invoice.
- Implemented payment routes for editing and creating new payments.
- Established settings route for dashboard settings.
- Developed task routes for editing, department tasks, my tasks, and new tasks.


---
## Add dashboard routes for departments, inventory, orders, products, shipments, vehicles, and warehouses
* **Commit**: `0872d69`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13

- Created routes for editing, viewing, and managing departments.
- Added inventory management routes including adjustments and stock levels.
- Implemented order management routes for allocation, shipment creation, and validation.
- Established product routes for inventory management and product creation.
- Set up shipment routes for assigning to routes and editing shipments.
- Developed vehicle routes for maintenance logs and vehicle management.
- Created warehouse routes for managing warehouse information and creation.


---
## Add new routes for dashboard, login, and password management
* **Commit**: `49d207d`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## Add new fields to notifications collection
* **Commit**: `7015dbb`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13

- Added 'is_read' boolean field to the notifications collection.
- Added 'read_at' date field to the notifications collection.
- Added 'type' select field with predefined values to the notifications collection.


---
## Refactor collections and records to standardize naming conventions and remove unused types
* **Commit**: `3f1eb46`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## Add migration scripts for updating and deleting collections, and modifying fields
* **Commit**: `806a92a`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## Add migration scripts for updating departments and deleting employee collection
* **Commit**: `d7e1de7`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13

- Created migration to update the 'departments' collection with a new unique index and name change.
- Added migration to delete the 'employee' collection and provide a rollback option to recreate it with the original schema.


---
## Implement code changes to enhance functionality and improve performance
* **Commit**: `8a3125a`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## fix formatting in rsbuild.config.ts for server proxy configuration
* **Commit**: `33d8a3e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## update collections documentation to remove `it_admin` role and clarify user permissions
* **Commit**: `222c44e`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## refine user management section in sitemap and clarify roles for various functionalities
* **Commit**: `20890ea`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## add conceptual sitemap for ETMAR Logistics System
* **Commit**: `7db5848`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## update version in package.json
* **Commit**: `1ba4e6b`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## add go embed
* **Commit**: `041451c`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## update the codebase to use react and @marahuyo/ui
* **Commit**: `c1ce98d`
* **Author**: Karl robeck alferez
* **Date**: 2025-05-13



---
## add fields and constraints
* **Commit**: `51ff3c3`
* **Author**: mhellb10
* **Date**: 2025-05-13



---
## revalidate collections
* **Commit**: `0656c8f`
* **Author**: Karl Robeck Alferez
* **Date**: 2025-05-13



---
## Added API rules for existing collections
* **Commit**: `a89d7ff`
* **Author**: root
* **Date**: 2025-05-13



---
## updated collections
* **Commit**: `b1259ac`
* **Author**: mhellb10
* **Date**: 2025-05-12



---
## add collections
* **Commit**: `5b3ca4d`
* **Author**: mhellb10
* **Date**: 2025-05-12



---
## add seeding
* **Commit**: `bfb550a`
* **Author**: Karl Robeck Alferez
* **Date**: 2025-05-07



---
## add migrations
* **Commit**: `2dae71c`
* **Author**: karlrobeck
* **Date**: 2025-04-29



---
## added security rules
* **Commit**: `3681e4b`
* **Author**: root
* **Date**: 2025-04-29



---
## remove --exclude flag in dockerfile
* **Commit**: `d1c0f78`
* **Author**: karlrobeck
* **Date**: 2025-04-08



---
## add hero page
* **Commit**: `4c486dc`
* **Author**: karlrobeck
* **Date**: 2025-04-08



---
## add landing page
* **Commit**: `c625984`
* **Author**: karlrobeck
* **Date**: 2025-04-08



---
## add backend url
* **Commit**: `aa2a680`
* **Author**: karlrobeck
* **Date**: 2025-04-08



---
## add email verification when sign in
* **Commit**: `954d743`
* **Author**: karlrobeck
* **Date**: 2025-04-08



---
## add sign in
* **Commit**: `a2d15c4`
* **Author**: karlrobeck
* **Date**: 2025-04-08



---
## deleted test collection
* **Commit**: `7e226db`
* **Author**: root
* **Date**: 2025-04-05



---
## created api rules for chat messages
* **Commit**: `f5e317f`
* **Author**: root
* **Date**: 2025-04-05



---
## update fields
* **Commit**: `0cc9e0c`
* **Author**: mhellb10
* **Date**: 2025-04-03



---
## implement multiple collections
* **Commit**: `b681e86`
* **Author**: mhellb10
* **Date**: 2025-04-03



---
## create chat_message
* **Commit**: `53ba39a`
* **Author**: mhellb10
* **Date**: 2025-04-03



---
## remove inventory and shipment
* **Commit**: `f23b6a9`
* **Author**: karlrobeck
* **Date**: 2025-04-03



---
## add proxy config to rsbuild
* **Commit**: `09f7d1d`
* **Author**: karlrobeck
* **Date**: 2025-04-03



---
## add verification and reset password pages
* **Commit**: `3caeb3b`
* **Author**: karlrobeck
* **Date**: 2025-03-21



---
## add auth pages and actions
* **Commit**: `2508f60`
* **Author**: karlrobeck
* **Date**: 2025-03-21



---
## removing subdomain
* **Commit**: `f7260de`
* **Author**: karlrobeck
* **Date**: 2025-03-21



---
## add collections
* **Commit**: `4e02d13`
* **Author**: karlrobeck
* **Date**: 2025-03-20



---
## add signin and register
* **Commit**: `dff3496`
* **Author**: karlrobeck
* **Date**: 2025-03-20



---
## add components and notification
* **Commit**: `df2f812`
* **Author**: karlrobeck
* **Date**: 2025-03-20



---
## initial commit
* **Commit**: `f865c71`
* **Author**: karlrobeck
* **Date**: 2025-03-19



---