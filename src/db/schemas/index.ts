// Central index for all Drizzle ORM schemas
// This file imports every schema file for each domain so Drizzle can detect all tables

// Top-level schemas (if any)
export * from './better-auth.schema.ts';
export * from './better-auth.sql.ts';
export * from './billing/accountingSyncLog.sql.ts';
export * from './billing/accountTransactions.sql.ts';
export * from './billing/clientAccounts.sql.ts';
export * from './billing/creditNotes.sql.ts';
export * from './billing/disputes.sql.ts';
export * from './billing/documents.sql.ts';
// Billing domain
export { billingSchema } from './billing/index';
export * from './billing/invoiceLineItems.sql.ts';
export * as billingInvoice from './billing/invoices.sql.ts';
export * from './billing/payments.sql.ts';
export * from './billing/quotes.sql.ts';
export * from './billing/rateCards.sql.ts';
export * from './billing/rateRules.sql.ts';
export * from './billing/surcharges.sql.ts';
// CRM domain
export * from './crm/attachments.sql.ts';
export * from './crm/campaigns.sql.ts';
export * from './crm/cases.sql.ts';
export * from './crm/companies.sql.ts';
export * from './crm/contacts.sql.ts';
// Import schema instances for each domain
export { crmSchema } from './crm/index';
export * from './crm/interactions.sql.ts';
export * from './crm/invoiceItems.sql.ts';
export * from './crm/invoices.sql.ts';
export * from './crm/leads.sql.ts';
export * from './crm/notifications.sql.ts';
export * from './crm/opportunities.sql.ts';
export * from './crm/opportunityProducts.sql.ts';
export * from './crm/products.sql.ts';
export * from './crm/taggings.sql.ts';
export * from './crm/tags.sql.ts';
export * from './dms/customerTrackingLinks.sql.ts';
export * from './dms/deliveryRoutes.sql.ts';
export * from './dms/deliveryTasks.sql.ts';
export * from './dms/driverLocations.sql.ts';
// DMS domain
export { dmsSchema } from './dms/index';
export * as dmsProofOfDelivery from './dms/proofOfDeliveries.sql.ts';
export * from './dms/taskEvents.sql.ts';
// IMS domain
export * from './ims/inbound_shipment_items.sql.ts';
export * from './ims/inbound_shipments.sql.ts';
export { imsSchema } from './ims/index';
export * from './ims/inventory_adjustments.sql.ts';
export * from './ims/inventory_batches.sql.ts';
export * from './ims/inventory_levels.sql.ts';
export * from './ims/outbound_shipment_items.sql.ts';
export * from './ims/outbound_shipments.sql.ts';
export * as imsProducts from './ims/products.sql.ts';
export * from './ims/reorder_points.sql.ts';
export * from './ims/return_items.sql.ts';
export * from './ims/returns.sql.ts';
export * from './ims/sales_order_items.sql.ts';
export * from './ims/sales_orders.sql.ts';
export * from './ims/stock_transfers.sql.ts';
export * from './ims/suppliers.sql.ts';
export * from './portal/auditLog.sql.ts';
// Portal domain
export { portalSchema } from './portal/index';
export * as portalNotification from './portal/notifications.sql.ts';
export * from './portal/permissions.sql.ts';
export * from './portal/rolePermissions.sql.ts';
export * from './portal/roles.sql.ts';
export * from './portal/userRoles.sql.ts';
export * from './portal/userSettings.sql.ts';
export * from './tms/carrierRates.sql.ts';
export * from './tms/carriers.sql.ts';
export * from './tms/driverSchedules.sql.ts';
export * from './tms/drivers.sql.ts';
export * from './tms/expenses.sql.ts';
export * from './tms/geofenceEvents.sql.ts';
export * from './tms/geofences.sql.ts';
export * from './tms/gpsPings.sql.ts';
// TMS domain
export { tmsSchema } from './tms/index';
export * from './tms/partnerInvoiceItems.sql.ts';
export * from './tms/partnerInvoices.sql.ts';
export * from './tms/proofOfDeliveries.sql.ts';
export * from './tms/routes.sql.ts';
export * from './tms/shipmentLegEvents.sql.ts';
export * from './tms/shipmentLegs.sql.ts';
export * from './tms/tripStops.sql.ts';
export * from './tms/trips.sql.ts';
export * from './tms/vehicleMaintenance.sql.ts';
export * from './tms/vehicles.sql.ts';
// WMS domain
export * from './wms/bin_thresholds.sql.ts';
export { wmsSchema } from './wms/index';
export * from './wms/inventory_stock.sql.ts';
export * from './wms/locations.sql.ts';
export * from './wms/packages.sql.ts';
export * from './wms/pick_batches.sql.ts';
export * from './wms/putaway_rules.sql.ts';
export * from './wms/task_history.sql.ts';
export * from './wms/tasks.sql.ts';
export * from './wms/warehouse.sql.ts';
