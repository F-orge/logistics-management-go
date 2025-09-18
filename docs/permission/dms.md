# DMS Domain Permissions

## dms_delivery_routes

- create: admin, dispatch manager, route planner
- read: admin, dispatch manager, route planner, delivery driver (assigned),
  logistics coordinator
- update: admin, dispatch manager, route planner
- delete: admin, dispatch manager

## dms_delivery_tasks

- create: admin, dispatch manager, route planner
- read: admin, dispatch manager, route planner, delivery driver (assigned),
  logistics coordinator
- update: admin, dispatch manager, route planner, delivery driver (assigned)
- delete: admin, dispatch manager

## dms_task_events

- create: delivery driver (assigned), admin, dispatch manager
- read: admin, dispatch manager, route planner, delivery driver (assigned),
  logistics coordinator
- update: admin
- delete: admin

## dms_proof_of_deliveries

- create: delivery driver (assigned), admin
- read: admin, dispatch manager, route planner, delivery driver (assigned),
  logistics coordinator
- update: admin
- delete: admin

## dms_driver_locations

- create: delivery driver (assigned), system (auto)
- read: admin, dispatch manager, route planner, logistics coordinator
- update: system (auto)
- delete: admin

## dms_customer_tracking_links

- create: system (auto), admin
- read: admin, dispatch manager, customer service representative, logistics
  coordinator
- update: admin, system (auto)
- delete: admin, system (auto)

_Note: "delivery driver (assigned)" means the driver assigned to the route/task.
"system (auto)" refers to automated system actions (e.g., location updates,
tracking link generation). "admin" has full access for support and management._
