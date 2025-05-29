"# Changelog"
### f25143c: feat: update version to 0.17.0 in package.json

### 7f790a1: feat: add permission check for executive and finance roles in invoice forms

### 56c80e4: feat: Implement role-based navigation for user access control
- Added user role definitions and navigation item types in utils.ts.
- Defined all navigation items with their respective access roles.
- Created a function to filter navigation items based on user roles.
- Updated AppSidebar component to utilize the new role-based navigation.
- Restricted access to "Create Invoice" and "Create Payment" buttons based on user roles.
- Updated invoice and payment edit forms to disable fields appropriately.
- Added migrations to update collection rules for various user roles.

### 2a19ed9: feat: update access control for invoices; enhance edit form with disabled fields for non-editable data

### 670fdeb: feat: update date handling in inventory, orders, and shipments forms; add role field to user migration

### ceb06a3: Merge pull request 60 from F-orge/51-feature---apply-crud-operation-to-all-tables
51 feature   apply crud operation to all tables
### 573eb48: chore(changelog): update changelog with recent feature implementations and enhancements

### 28d9f9c: Refactor dashboard routes to improve import organization and component structure
- Reorganized imports in various dashboard components for better readability and maintainability.
- Moved component imports to the top and grouped related imports together.
- Ensured consistent import order across different files in the dashboard section.
- Updated the structure of the dashboard routes for companies, departments, inventory, orders, products, shipments, tasks, and warehouses.
- Removed unnecessary imports and streamlined the code for better performance.

### a1af61d: feat: implement invoice and payment management forms with CRUD functionality

### 4154d77: Refactor route search query handling and update dialog states
- Updated search query keys in delete, edit, and new route forms to use consistent naming conventions.
- Removed unnecessary type assertions for search queries in various route components.
- Simplified navigation logic by standardizing search query parameters.
- Removed unused pagination configurations from collections.
- Added new columns and options for invoices and payments in the dashboard.
- Introduced a new schema for search queries to streamline data handling.
- Deleted unused invoice and payment route files to clean up the codebase.

### 2845173: feat: add vehicle management functionality to dashboard
- Introduced new vehicle actions: create, edit, and delete forms.
- Implemented vehicle columns for the dashboard table.
- Enhanced dashboard routing to support vehicle management.
- Updated search query schema to handle vehicle-specific queries.
- Improved date formatting for planned start and end times in routes.
- Removed unused vehicle route files.

### ae75df7: feat: add route collections management with CRUD forms and enhanced column definitions

### 2bb3179: feat: enhance route management with new fields and delete functionality

### 1c7b8b8: feat: implement new route management form and enhance route columns in dashboard

### 1bf0c53: feat: add dashboard routes and CRUD functionality for orders and shipments
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

### 090805c: refactor: clean up sidebar sample data and enhance inventory item forms with dialog components

### f7dc558: Refactor navigation hooks in dashboard routes to use Route.useNavigate()
- Updated all instances of useNavigate({ from: Route.fullPath }) to Route.useNavigate() in the dashboard companies, departments, products, tasks, and warehouses routes.
- Removed unused inventory routes and added new inventory item management components including forms for creating, editing, and deleting inventory items.
- Introduced a new schema for inventory item search queries.
- Added migration for updating inventory items collection rules.
- Enhanced the inventory items table with appropriate columns and dropdown actions.

### 683c57b: feat: implement delete product functionality with confirmation dialog

### bd95dce: refactor: remove old product routes and implement new product management features
- Deleted old product edit, index, inventory, and new routes.
- Introduced a new product listing page with advanced data table features.
- Added new forms for creating, editing, and deleting products.
- Implemented search query validation using Zod.
- Updated product schema in migrations to include new fields for dimensions.
- Enhanced product columns to display additional information such as dimensions and supplier.

### f68b4a7: feat: implement delete warehouse functionality with confirmation dialog

### 0323443: chore: update version to 0.16.0 in package.json

### 38f1b08: feat: add delete department functionality with confirmation dialog

### b3fcd53: chore(changelog): update changelog with recent feature implementations and enhancements

### b69f7a0: Merge pull request 50 from F-orge/49-feature---implement-crud-operation-for-companies-and-departments-collection
49 feature   implement crud operation for companies and departments collection
### 7dcf95c: feat: Refactor warehouse management with CRUD operations
- Implemented new warehouse creation and editing forms with validation.
- Added file handling for attachments in tasks and departments.
- Enhanced user experience with loading states and improved dialog handling.
- Removed unused warehouse routes and consolidated warehouse-related components.
- Introduced utility functions for dialog management and file fetching.
- Updated task and department forms to include multi-select options for users.
- Improved data fetching logic using React Query for better performance.

### d435819: Refactor dashboard routes for companies and departments
- Removed old file-based routes for editing and viewing companies and departments.
- Implemented new forms for creating, editing, and deleting companies and departments with improved UI components.
- Introduced data tables for displaying companies and departments with sorting and filtering capabilities.
- Updated query schemas for handling pagination and search parameters.
- Added new migration for updating department collection rules.
- Enhanced error handling and user feedback with toast notifications.

### 2428309: chore(package): bump version to 0.15.0

### 9171f1c: chore(changelog): update changelog with recent migration and seeding enhancements

### 4983150: Merge pull request 48 from F-orge/47-improvement---improve-validation-for-all-collections
47 improvement   improve validation for all collections
### 61807d4: chore(package): bump version to 0.14.0

### 2e97bab: feat: enhance seed functionality and update migrations
- Updated seed.ts to use Omit for records without 'id' field, ensuring proper data structure during seeding.
- Improved product seeding logic to always assign a supplier.
- Refactored various seed functions for consistency and clarity.
- Added new fields to companies, departments, and routes collections in migrations to enforce required relationships.
- Adjusted notifications seeding to include priority and type options.
- Cleaned up imports in dashboard task components for better organization and readability.

### f22a95e: feat(migrations): update product, route segments, routes, shipments, tasks, vehicles, and warehouses collections
- Added new fields to products: weight, dimensions, cost, supplier, and image.
- Updated route segments with new fields: sequenceNumber, segmentType, addressText, longitude, latitude, and relatedShipment.
- Introduced status, longitude, and latitude fields to routes.
- Enhanced shipments with trackingNumber, carrier, status, estimatedDeliveryDate, proofOfDelivery, driver, and departmentAssigned fields.
- Modified tasks to remove kanbanOrder field and add an index.
- Updated vehicles with make, model, type, capacityVolume, capacityWeight, and status fields.
- Adjusted warehouses to include longitude, latitude, and manager fields with unique indexes.

### 4487abd: Merge pull request 46 from F-orge/45-fix---finish-task-management-page
45 fix   finish task management page
### afd421e: chore(changelog): add detailed entries for recent task form and migration updates

### e8a1cb7: fix(task-form): set default status to 'todo' in CreateNewTaskForm

### 5e7eb19: feat(migrations): update task messages, vehicles, user access, chat messages, and tasks collections with new fields and indexes
- Updated task messages collection to change field name from "readBy" to "read_by".
- Modified vehicles collection to add fields for capacity volume and weight, and updated license plate field name.
- Created user access collection with fields for user relations and access control.
- Updated user access collection to allow multiple selections for the field.
- Updated chat messages collection to add an index on the content field.
- Enhanced tasks collection to include file attachments with specified MIME types.
- Refactored task edit and delete routes to improve user experience and data handling.
- Implemented KPI components for tasks overview, priority, and department statistics.

### 722e443: chore(package): bump version to 0.13.0 and update @marahuyo/react-ui dependency

### 4b71a40: Merge pull request 44 from F-orge/28-feature---add-view-table-in-pocketbase-for-kpis-key-performance-indicators
28 feature   add view table in pocketbase for kpis key performance indicators
### ddb3a79: chore(changelog): update changelog with recent entries and improve formatting

### 9720f21: chore(package): bump version to 0.12.0

### 6edb2b8: feat(routes): update route imports for dashboard and related entities

### 18673ce: 
## Merge branch 'main' into 28-feature---add-view-table-in-pocketbase-for-kpis-key-performance-indicators


### 6af3a00: feat(migrations): update various KPIs and notifications
- Updated `tasksDepartmentKPI` to modify fields and view query for department task counts.
- Updated `tasksSpecificTagKPI` to enhance tag counting logic and field definitions.
- Refined `taskMessagesOverallKPI` to include detailed message statistics.
- Enhanced `taskMessagesCountKPI` to track message counts per task with updated field names.
- Improved `notificationsOverallKPI` to summarize notification statistics with distinct counts.
- Created `notificationsUnreadKPI` to track unread notifications per user.
- Updated `notifications` collection to add a priority field for notifications.
- Created `notificationsPriorityKPI` to analyze notifications based on priority levels.

### 7a99061: Merge pull request 43 from F-orge/36-feature---apply-proper-error-handling-and-not-found-page
36 feature   apply proper error handling and not found page
### 36fa9af: fix(changelog): update changelog entries for recent changes and improve formatting

### 4a7c33f: fix(package): update version to 0.11.0

### c24803e: feat(routes): add NotFoundPage component and integrate with router

### f45f92c: added key performance indicators for notifications EXCEPTION for UnreadKPI (SQL logic error: no such column: user_recipient (1).) and PriorityKPI (SQL logic error: no such column: priority (1).)

### 0cdf5f9: added key performance indicators for taskMessages collection

### 42a85d3: added key performance indicators for tasks collection EXCEPTION for OverallKPI (SQL logic error: no such column: due_date (1).) and SpecificTagKPI (error when created)

### 2f3cb6a: added key performance indicators for departments collection

### d5796dc: added key performance indicators for chatMessages collection

### 96655fe: added key performance indicators for chatrooms collection

### 94ac985: added key performance indicators for payments collections EXCEPTION for Payment Count and Amount Method (value cannot contain 'via')

### 2979589: added key performance indicators for invoices collection

### e4f1a17: added key performance indicators for routeSegments collection

### cf89fa6: added key performance indicators for routes collection

### a2a3f91: added key performance indicators for vehicles collection

### 33a54d3: added key performance indicators for shipments collection exception of On-Time Delivery Rate (SQL Logic Error)

### 433efd3: added key performance indicators for inventoryItems collection

### a1832cc: added key performance indicators for orderLineItems collection

### 87186fe: added key performance indicators for orders collection

### 5e8c1eb: added key performance indicators for warehouse collection

### 50128eb: added key performance indicators for products collection

### d081b39: added key performance indicators for companies

### ca136b3: added key performance indicator for users collection

### 8b21b69: add users KPI

### a199afa: Merge pull request 41 from F-orge/40-improvement---improve-code-structure-at-task-management
40 improvement  improve code structure at task management
### b850046: fix(changelog): update changelog generation script for clarity and formatting

### df5e028: fix(changelog): update import order and add missing imports for consistency across components
fix(package): update version to 0.10.1

chore(package): rename changelog script for clarity and improve formatting

### 1c64acb: fix(package): update version to 0.10.1

### a32ed1e: fix(changelog): update import order and add missing imports for consistency across components

### a847e12: fix: update imports and re-order for consistency across components
- Fixed import order in breadcrumbs, data-table, form, and notification-sheet components.
- Added missing imports for new routes in routeTree.gen.ts.
- Refactored imports in dashboard companies and tasks forms for clarity.
- Ensured consistent usage of hooks and types across various components.
- Cleaned up unused imports and organized existing ones for better readability.

### 319dd0e: feat(tasks): implement CreateTaskForm with validation and dialog integration

### 8649dc7: Merge pull request 39 from F-orge/38-refactor---apply-form-composition-globally
38 refactor   apply form composition globally
### 68b595e: fix(form): update query key in CreateCompanyForm to use 'companies'

### 0578b77: refactor: update company schema fields to use camelCase and add new form components
- Changed `contact_email` and `contact_phone` fields to `contactEmail` and `contactPhone` in CompaniesRecordSchema.
- Introduced new `TextAreaInputField` and `SingleSelectField` components for better form handling.
- Updated the CreateCompanyForm to utilize the new field components and adjusted validation schema accordingly.
- Added a migration script to update existing database fields to match the new naming conventions.

### 348627f: feat(login): integrate form components and refactor login route

### 57a45d4: chore(package): bump version to 0.10.0

### be19767: feat(form): implement form hook contexts and createAppForm hook

### 661b532: Merge pull request 37 from F-orge/26-fix---refactor-data-table
feat(data-table): refactor DataTable component and integrate into Tas…
### dc41594: feat(data-table): refactor DataTable component and integrate into TaskTable

### 1b5ea53: Merge pull request 35 from F-orge/34-feature---refactor-github-issue-template
feat(issue-template): enhance feature request template with descripti…
### ddd31a8: feat(issue-template): enhance feature request template with descriptions and placeholders

### cf21e18: Merge pull request 32 from F-orge/23-feature---add-notification-sidesheet
23 feature  add notification sidesheet
### dc3b077: chore(changelog): update changelog with recent changes and enhancements

### ef1ab77: feat(notification): add NotificationSideSheet component and integrate into dashboard layout

### 6a4308f: chore(package): update version to 0.9.0

### e06fcf4: Merge pull request 31 from F-orge/22-feature---add-breadcrumbs-navigation
22 feature   add breadcrumbs navigation
### 7cbc425: feat(breadcrumbs): add TSRBreadCrumbs component and integrate into dashboard layout; refactor route imports for better organization

### 80a12e1: feat(breadcrumbs): add TSRBreadCrumbs component for enhanced navigation refactor(dashboard): integrate TSRBreadCrumbs into dashboard layout refactor(routeTree): update route imports for better organization

### 9814442: chore(package): update version to 0.8.0

### c0317f8: Merge pull request 21 from F-orge/19-feature---add-zod-validation-schema-to-all-collections
19 feature   add zod validation schema to all collections
### b9e7a67: chore(changelog): update changelog with recent changes and enhancements

### 6c61f97: refactor(tasks): reorganize imports and enhance task components for better structure

### 2882174: feat(schemas): add comprehensive schemas for various records including users, tasks, and inventory

### 3a89bc5: chore(package): update version to 0.7.1

### ee489da: add changelog

### f935f00: Merge pull request 20 from F-orge/17-fix---refactor-data-fetching-in-task-management
17 fix  refactor data fetching in task management
### 981c828: feat(tasks): update NewTask component with form handling and integrate date-fns for date management

### 5b889fa: feat(users): implement user management queries and mutations for CRUD operations

### 950f1f8: feat(tasks): replace due date select with popover calendar for improved date selection

### 838e022: feat(tasks): update task assignment dialog and remove unused components

### 023be6c: feat(tasks): enhance priority selection with dropdown menu for task management

### e55d2fa: feat(tasks): enhance task assignment display with external link icons and improved handling for unassigned employees

### dfc21d1: Refactor task management: streamline task seeding, enhance task assignment UI, and update task status handling
- Simplified task seeding logic by always assigning a department from available options.
- Updated task queries to allow optional assignees and improved mutation handling for task updates.
- Removed obsolete task columns and views, consolidating task management UI components.
- Introduced a new AssignTask component for better user experience in assigning tasks to employees.
- Enhanced task table with improved filtering and status update functionality.
- Added migration to update task collection schema for assignees relationship.

### 1cc6148: feat(tasks): enhance task retrieval with optional filter; refactor task query schema and table component

### 155b27b: feat(routes): replace loader with beforeLoad for dashboard and login routes; add query schema for task management

### 36233e5: feat(tasks): enhance mutation functions for task management with attachments

### 235e360: feat(routes): update route imports for improved organization and maintainability

### 82c0eac: chore(package): bump version to 0.6.1

### efd6685: feat(manifest): add purpose attribute to maskable icon for better PWA support
refactor(index.tsx): fix import order for clarity

refactor(routeTree.gen.ts): reorganize route imports for improved structure

refactor(NewTask): reorder imports for consistency

### a55cab3: Merge pull request 18 from F-orge/14-feature---add-pwa-metadata
14 feature add pwa metadata
### c74d79c: chore(package): update version to 0.6.0

### 9650e7b: feat(manifest): add web app manifest for improved PWA support feat(routes): integrate new routes for user authentication and dashboard features

### 9b1234f: Merge pull request 16 from F-orge/15-feature---implement-crud-operations-for-task-management
15 feature   implement crud operations for task management
### a4f4183: feat(tasks): enhance task management with new task creation and improved query handling
- Implemented a new task creation form with validation using Zod.
- Integrated task querying with pagination and filtering capabilities.
- Updated task permissions and rules in migrations for better access control.
- Removed the old new task route and consolidated functionality into a modal.
- Added new fields and relationships in the task schema to support enhanced task features.
- Improved UI components for better user experience in task management.

### c6f6934: Add SQL KPI queries for various collections and implement tasks KPI migration
- Created a comprehensive set of SQL KPI queries for users, companies, products, warehouses, orders, order line items, inventory items, shipments, vehicles, routes, route segments, invoices, payments, chat rooms, chat messages, departments, tasks, task messages, and notifications.
- Implemented migrations for tasks KPI, including creation, updates, and field management.
- Enhanced the dashboard view for tasks with detailed information, including status, priority, due date, assignees, related orders, and shipments.

### af3be23: Merge pull request 13 from F-orge/11-feature---add-data-table-component
11 feature   add data table component
### 7eaa356: chore: update version to 0.5.0 in package.json

### 6293373: feat: Implement task management table with filtering and pagination
- Added DataTable component for displaying tasks with sorting, filtering, and pagination.
- Integrated useTasks hook to fetch task data from PocketBase.
- Created columns definition for task attributes including ID, status, title, due date, assigner, and priority.
- Updated dashboard tasks route to render the DataTable with fetched tasks.
- Removed unnecessary border styling from the dashboard layout.

### 0b75c80: Merge pull request 12 from F-orge/10-feature---implement-dashboard-layout
10 feature   implement dashboard layout
### 1afa8e6: chore: update version to 0.4.0 in package.json

### 13d8522: Implement code changes to enhance functionality and improve performance

### 2bbff11: feat: refactor sidebar navigation and user profile components; remove settings route

### 6da7c80: feat: implement sidebar navigation in dashboard
- Added AppSidebar component to the dashboard route.
- Created NavMain, NavProjects, and NavUser components for sidebar navigation.
- Integrated collapsible menus and dropdowns for better user experience.
- Included sample data for user, teams, and navigation items.

### b42a472: Merge pull request 9 from F-orge/7-feature---implement-authentication-logic-in-the-login-page
7 feature  implement authentication logic in the login page
### 1e5747f: chore: update version to 0.3.0 in package.json

### fe3209d: Implement feature X to enhance user experience and fix bug Y in module Z

### ce67195: feat: add input types for email and password fields and remove duplicate redirect

### 1623ea5: refactor: reorder imports for better readability in login.tsx

### 7427af4: feat: implement login functionality with form validation and redirect to dashboard
- Added a login form with email and password fields using @marahuyo/react-ui components.
- Integrated Pocketbase authentication and error handling.
- Redirect users to the dashboard if already authenticated.
- Created a dashboard route that checks for authentication and redirects to login if not valid.

### 08ca6db: Merge pull request 6 from F-orge/5-feature---implement-sonner-notification-in-frontend
5 feature implement sonner notification in frontend
### 9293129: Bump version to 0.2.1 in package.json

### 3dcadd4: fix linting

### 233334b: Add sonner for toast notifications and update radius in globals.css

### ba908d2: Refactor code structure for improved readability and maintainability

### 85c0c03: Bump version to 0.2.0 in package.json

### 31050cf: Refactor route definitions to ensure consistent formatting and improve readability
- Added semicolons at the end of import statements and return statements in route components across multiple files.
- Reformatted the createFileRoute function calls to use a consistent multi-line style for better clarity.
- Ensured all route components return statements are consistently formatted with semicolons.

### a329040: Refactor dashboard routes to use dynamic parameters
- Removed old route files for companies, departments, inventory, orders, products, routes, shipments, tasks, users, and warehouses.
- Added new route files with dynamic parameters for companies, departments, inventory items, orders, products, routes, shipments, tasks, users, and warehouses.
- Updated route paths to use more descriptive dynamic parameters (e.g., $company_id, $department_id, $inventory_item_id, $order_id_custom, $product_id, $route_name_or_id, $tracking_number, $task_id, $user_id, $warehouse_id).

### 056baaf: Add dashboard routes for chat, invoices, payments, settings, and tasks
- Created routes for chat including room, new chat, and support.
- Added invoice routes for editing, recording payment, sending, and new invoice.
- Implemented payment routes for editing and creating new payments.
- Established settings route for dashboard settings.
- Developed task routes for editing, department tasks, my tasks, and new tasks.

### 0872d69: Add dashboard routes for departments, inventory, orders, products, shipments, vehicles, and warehouses
- Created routes for editing, viewing, and managing departments.
- Added inventory management routes including adjustments and stock levels.
- Implemented order management routes for allocation, shipment creation, and validation.
- Established product routes for inventory management and product creation.
- Set up shipment routes for assigning to routes and editing shipments.
- Developed vehicle routes for maintenance logs and vehicle management.
- Created warehouse routes for managing warehouse information and creation.

### 49d207d: Add new routes for dashboard, login, and password management

### 7015dbb: Add new fields to notifications collection
- Added 'is_read' boolean field to the notifications collection.
- Added 'read_at' date field to the notifications collection.
- Added 'type' select field with predefined values to the notifications collection.

### 3f1eb46: Refactor collections and records to standardize naming conventions and remove unused types

### 806a92a: Add migration scripts for updating and deleting collections, and modifying fields

### d7e1de7: Add migration scripts for updating departments and deleting employee collection
- Created migration to update the 'departments' collection with a new unique index and name change.
- Added migration to delete the 'employee' collection and provide a rollback option to recreate it with the original schema.

### 8a3125a: Implement code changes to enhance functionality and improve performance

### 33d8a3e: fix formatting in rsbuild.config.ts for server proxy configuration

### 222c44e: update collections documentation to remove `it_admin` role and clarify user permissions

### 20890ea: refine user management section in sitemap and clarify roles for various functionalities

### 7db5848: add conceptual sitemap for ETMAR Logistics System

### 1ba4e6b: update version in package.json

### 041451c: add go embed

### c1ce98d: update the codebase to use react and @marahuyo/ui

### 51ff3c3: add fields and constraints

### 0656c8f: revalidate collections

### a89d7ff: Added API rules for existing collections

### b1259ac: updated collections

### 5b3ca4d: add collections

### bfb550a: add seeding

### 2dae71c: add migrations

### 3681e4b: added security rules

### d1c0f78: remove --exclude flag in dockerfile

### 4c486dc: add hero page

### c625984: add landing page

### aa2a680: add backend url

### 954d743: add email verification when sign in

### a2d15c4: add sign in

### 7e226db: deleted test collection

### f5e317f: created api rules for chat messages

### 0cc9e0c: update fields

### b681e86: implement multiple collections

### 53ba39a: create chat_message

### f23b6a9: remove inventory and shipment

### 09f7d1d: add proxy config to rsbuild

### 3caeb3b: add verification and reset password pages

### 2508f60: add auth pages and actions

### f7260de: removing subdomain

### 4e02d13: add collections

### dff3496: add signin and register

### df2f812: add components and notification

### f865c71: initial commit
