# WMS Domain Permissions

## wms_locations

- create: admin, warehouse manager
- read: admin, warehouse manager, warehouse operator, supervisor
- update: admin, warehouse manager
- delete: admin, warehouse manager

## wms_warehouses

- create: admin, warehouse manager
- read: admin, warehouse manager, supervisor
- update: admin, warehouse manager
- delete: admin, warehouse manager

## wms_inventory_stock

- create: system (auto), admin
- read: admin, warehouse manager, warehouse operator, picker, packer, supervisor
- update: system (auto), admin, warehouse manager
- delete: admin, warehouse manager

## wms_putaway_rules

- create: admin, warehouse manager
- read: admin, warehouse manager, supervisor
- update: admin, warehouse manager
- delete: admin, warehouse manager

## wms_bin_thresholds

- create: admin, warehouse manager
- read: admin, warehouse manager, supervisor
- update: admin, warehouse manager
- delete: admin, warehouse manager

## wms_pick_batches

- create: admin, warehouse manager
- read: admin, warehouse manager, picker, supervisor
- update: admin, warehouse manager
- delete: admin, warehouse manager

## wms_pick_batch_items

- create: admin, warehouse manager
- read: admin, warehouse manager, picker, supervisor
- update: admin, warehouse manager
- delete: admin, warehouse manager

## wms_tasks

- create: admin, warehouse manager, system (auto)
- read: admin, warehouse manager, warehouse operator, picker, packer, supervisor
- update: admin, warehouse manager, warehouse operator, picker, packer
- delete: admin, warehouse manager

## wms_task_items

- create: admin, warehouse manager, system (auto)
- read: admin, warehouse manager, warehouse operator, picker, packer, supervisor
- update: admin, warehouse manager, warehouse operator, picker, packer
- delete: admin, warehouse manager

## wms_packages

- create: admin, packer
- read: admin, warehouse manager, packer, supervisor
- update: admin, packer
- delete: admin, packer

## wms_package_items

- create: admin, packer
- read: admin, warehouse manager, packer, supervisor
- update: admin, packer
- delete: admin, packer

_Note: "system (auto)" refers to automated system actions (e.g., inventory
updates, task generation). "picker" and "packer" can only update or delete
records for tasks assigned to them. "admin" has full access for support and
management._
