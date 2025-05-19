# Changelog
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
