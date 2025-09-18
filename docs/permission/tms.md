# TMS Domain Permissions

## tms_drivers

- create: admin, transport manager
- read: admin, transport manager, fleet manager, dispatcher
- update: admin, transport manager
- delete: admin, transport manager

## tms_driver_schedules

- create: admin, transport manager
- read: admin, transport manager, fleet manager, dispatcher, driver (self)
- update: admin, transport manager
- delete: admin, transport manager

## tms_vehicles

- create: admin, fleet manager
- read: admin, fleet manager, transport manager, dispatcher
- update: admin, fleet manager
- delete: admin, fleet manager

## tms_vehicle_maintenance

- create: admin, fleet manager
- read: admin, fleet manager, transport manager
- update: admin, fleet manager
- delete: admin, fleet manager

## tms_trips

- create: admin, dispatcher
- read: admin, dispatcher, transport manager, fleet manager, driver (assigned)
- update: admin, dispatcher
- delete: admin, dispatcher

## tms_trip_stops

- create: admin, dispatcher
- read: admin, dispatcher, transport manager, fleet manager, driver (assigned)
- update: admin, dispatcher, driver (assigned)
- delete: admin, dispatcher

## tms_gps_pings

- create: system, vehicle (auto)
- read: admin, dispatcher, transport manager, fleet manager
- update: system
- delete: admin

## tms_routes

- create: admin, dispatcher, transport manager
- read: admin, dispatcher, transport manager, driver (assigned)
- update: admin, dispatcher, transport manager
- delete: admin, dispatcher, transport manager

## tms_proof_of_deliveries

- create: driver (assigned), admin
- read: admin, dispatcher, transport manager, driver (assigned)
- update: admin
- delete: admin

## tms_expenses

- create: driver (assigned), admin
- read: admin, transport manager, accounts manager, driver (self)
- update: admin, transport manager, accounts manager
- delete: admin, transport manager, accounts manager

## tms_geofences

- create: admin, dispatcher
- read: admin, dispatcher, transport manager
- update: admin, dispatcher
- delete: admin, dispatcher

## tms_geofence_events

- create: system (auto)
- read: admin, dispatcher, transport manager
- update: system
- delete: admin

## tms_carriers

- create: admin, logistics manager
- read: admin, logistics manager, logistics planner, dispatcher
- update: admin, logistics manager
- delete: admin, logistics manager

## tms_carrier_rates

- create: admin, logistics manager
- read: admin, logistics manager, logistics planner, dispatcher
- update: admin, logistics manager
- delete: admin, logistics manager

## tms_shipment_legs

- create: admin, logistics planner
- read: admin, logistics planner, dispatcher, transport manager
- update: admin, logistics planner
- delete: admin, logistics planner

## tms_shipment_leg_events

- create: system (auto), admin
- read: admin, logistics planner, dispatcher, transport manager
- update: admin
- delete: admin

## tms_partner_invoices

- create: admin, accounts manager
- read: admin, accounts manager, logistics manager
- update: admin, accounts manager
- delete: admin, accounts manager

## tms_partner_invoice_items

- create: admin, accounts manager
- read: admin, accounts manager, logistics manager
- update: admin, accounts manager
- delete: admin, accounts manager

_Note: "driver (assigned)" means the driver assigned to the trip/stop/expense.
"system" refers to automated system actions (e.g., GPS pings, geofence events)._
