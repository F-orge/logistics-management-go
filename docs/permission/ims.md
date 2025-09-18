# IMS Domain Permissions

## ims_products

- create: admin, inventory manager
- read: admin, inventory manager, warehouse manager, warehouse operator, account
  manager, logistics coordinator
- update: admin, inventory manager
- delete: admin, inventory manager

## ims_suppliers

- create: admin, inventory manager
- read: admin, inventory manager, warehouse manager
- update: admin, inventory manager
- delete: admin, inventory manager

## ims_inventory_batches

- create: admin, inventory manager, quality control manager
- read: admin, inventory manager, warehouse manager, warehouse operator, quality
  control manager
- update: admin, inventory manager, quality control manager
- delete: admin, inventory manager, quality control manager

## ims_inventory_adjustments

- create: admin, inventory manager, warehouse operator
- read: admin, inventory manager, warehouse manager, warehouse operator
- update: admin, inventory manager
- delete: admin, inventory manager

## ims_reorder_points

- create: admin, inventory manager, account manager
- read: admin, inventory manager, account manager
- update: admin, inventory manager, account manager
- delete: admin, inventory manager, account manager

## ims_inbound_shipments

- create: admin, receiving manager, warehouse manager
- read: admin, inventory manager, warehouse manager, warehouse operator,
  receiving manager, account manager
- update: admin, receiving manager, warehouse manager
- delete: admin, receiving manager, warehouse manager

## ims_inbound_shipment_items

- create: admin, receiving manager, warehouse operator
- read: admin, inventory manager, warehouse manager, warehouse operator,
  receiving manager
- update: admin, receiving manager, warehouse operator
- delete: admin, receiving manager, warehouse operator

## ims_stock_transfers

- create: admin, logistics coordinator, warehouse manager
- read: admin, inventory manager, warehouse manager, logistics coordinator
- update: admin, logistics coordinator, warehouse manager
- delete: admin, logistics coordinator, warehouse manager

## ims_sales_orders

- create: admin, account manager
- read: admin, inventory manager, warehouse manager, warehouse operator, account
  manager
- update: admin, account manager
- delete: admin, account manager

## ims_sales_order_items

- create: admin, account manager
- read: admin, inventory manager, warehouse manager, warehouse operator, account
  manager
- update: admin, account manager
- delete: admin, account manager

## ims_outbound_shipments

- create: admin, warehouse manager
- read: admin, inventory manager, warehouse manager, warehouse operator
- update: admin, warehouse manager
- delete: admin, warehouse manager

## ims_outbound_shipment_items

- create: admin, warehouse operator
- read: admin, inventory manager, warehouse manager, warehouse operator
- update: admin, warehouse operator
- delete: admin, warehouse operator

## ims_returns

- create: admin, account manager, warehouse operator
- read: admin, inventory manager, warehouse manager, warehouse operator, account
  manager
- update: admin, account manager, warehouse operator
- delete: admin, account manager, warehouse operator

## ims_return_items

- create: admin, warehouse operator
- read: admin, inventory manager, warehouse manager, warehouse operator
- update: admin, warehouse operator
- delete: admin, warehouse operator

_Note: Roles like "warehouse operator" and "quality control manager" can only
update or delete records they are responsible for. "admin" has full access for
support and management._
