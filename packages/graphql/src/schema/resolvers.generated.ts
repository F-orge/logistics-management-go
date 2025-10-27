/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { billing as Query_billing } from './billing/resolvers/Query/billing';
import    { crm as Query_crm } from './crm/resolvers/Query/crm';
import    { dms as Query_dms } from './dms/resolvers/Query/dms';
import    { tms as Query_tms } from './tms/resolvers/Query/tms';
import    { wms as Query_wms } from './wms/resolvers/Query/wms';
import    { billing as Mutation_billing } from './billing/resolvers/Mutation/billing';
import    { crm as Mutation_crm } from './crm/resolvers/Mutation/crm';
import    { dms as Mutation_dms } from './dms/resolvers/Mutation/dms';
import    { tms as Mutation_tms } from './tms/resolvers/Mutation/tms';
import    { wms as Mutation_wms } from './wms/resolvers/Mutation/wms';
import    { AccountTransactions } from './billing/account_transactions/resolvers/AccountTransactions';
import    { AccountingSyncLogs } from './billing/accounting_sync_log/resolvers/AccountingSyncLogs';
import    { Attachments } from './crm/attachments/resolvers/Attachments';
import    { BillingInvoices } from './billing/invoices/resolvers/BillingInvoices';
import    { BillingMutation as account_transactions_BillingMutation } from './billing/account_transactions/resolvers/BillingMutation';
import    { BillingMutation as accounting_sync_log_BillingMutation } from './billing/accounting_sync_log/resolvers/BillingMutation';
import    { BillingMutation as invoices_BillingMutation } from './billing/invoices/resolvers/BillingMutation';
import    { BillingMutation as client_accounts_BillingMutation } from './billing/client_accounts/resolvers/BillingMutation';
import    { BillingMutation as credit_notes_BillingMutation } from './billing/credit_notes/resolvers/BillingMutation';
import    { BillingMutation as disputes_BillingMutation } from './billing/disputes/resolvers/BillingMutation';
import    { BillingMutation as documents_BillingMutation } from './billing/documents/resolvers/BillingMutation';
import    { BillingMutation as invoice_line_items_BillingMutation } from './billing/invoice_line_items/resolvers/BillingMutation';
import    { BillingMutation as payments_BillingMutation } from './billing/payments/resolvers/BillingMutation';
import    { BillingMutation as quotes_BillingMutation } from './billing/quotes/resolvers/BillingMutation';
import    { BillingMutation as rate_cards_BillingMutation } from './billing/rate_cards/resolvers/BillingMutation';
import    { BillingMutation as rate_rules_BillingMutation } from './billing/rate_rules/resolvers/BillingMutation';
import    { BillingMutation as surcharges_BillingMutation } from './billing/surcharges/resolvers/BillingMutation';
import    { BillingQuery as account_transactions_BillingQuery } from './billing/account_transactions/resolvers/BillingQuery';
import    { BillingQuery as accounting_sync_log_BillingQuery } from './billing/accounting_sync_log/resolvers/BillingQuery';
import    { BillingQuery as invoices_BillingQuery } from './billing/invoices/resolvers/BillingQuery';
import    { BillingQuery as client_accounts_BillingQuery } from './billing/client_accounts/resolvers/BillingQuery';
import    { BillingQuery as credit_notes_BillingQuery } from './billing/credit_notes/resolvers/BillingQuery';
import    { BillingQuery as disputes_BillingQuery } from './billing/disputes/resolvers/BillingQuery';
import    { BillingQuery as documents_BillingQuery } from './billing/documents/resolvers/BillingQuery';
import    { BillingQuery as payments_BillingQuery } from './billing/payments/resolvers/BillingQuery';
import    { BillingQuery as quotes_BillingQuery } from './billing/quotes/resolvers/BillingQuery';
import    { BillingQuery as rate_cards_BillingQuery } from './billing/rate_cards/resolvers/BillingQuery';
import    { BillingQuery as rate_rules_BillingQuery } from './billing/rate_rules/resolvers/BillingQuery';
import    { BillingQuery as surcharges_BillingQuery } from './billing/surcharges/resolvers/BillingQuery';
import    { BinThresholds } from './wms/bin_thresholds/resolvers/BinThresholds';
import    { Campaigns } from './crm/campaigns/resolvers/Campaigns';
import    { CarrierRates } from './tms/carrier_rates/resolvers/CarrierRates';
import    { Carriers } from './tms/carriers/resolvers/Carriers';
import    { Cases } from './crm/cases/resolvers/Cases';
import    { ClientAccounts } from './billing/client_accounts/resolvers/ClientAccounts';
import    { Companies } from './crm/companies/resolvers/Companies';
import    { Contacts } from './crm/contacts/resolvers/Contacts';
import    { CreditNotes } from './billing/credit_notes/resolvers/CreditNotes';
import    { CrmMutation as invoice_items_CrmMutation } from './crm/invoice_items/resolvers/CrmMutation';
import    { CrmMutation as opportunity_products_CrmMutation } from './crm/opportunity_products/resolvers/CrmMutation';
import    { CrmMutation as attachments_CrmMutation } from './crm/attachments/resolvers/CrmMutation';
import    { CrmMutation as campaigns_CrmMutation } from './crm/campaigns/resolvers/CrmMutation';
import    { CrmMutation as cases_CrmMutation } from './crm/cases/resolvers/CrmMutation';
import    { CrmMutation as companies_CrmMutation } from './crm/companies/resolvers/CrmMutation';
import    { CrmMutation as contacts_CrmMutation } from './crm/contacts/resolvers/CrmMutation';
import    { CrmMutation as interactions_CrmMutation } from './crm/interactions/resolvers/CrmMutation';
import    { CrmMutation as invoices_CrmMutation } from './crm/invoices/resolvers/CrmMutation';
import    { CrmMutation as leads_CrmMutation } from './crm/leads/resolvers/CrmMutation';
import    { CrmMutation as notifications_CrmMutation } from './crm/notifications/resolvers/CrmMutation';
import    { CrmMutation as opportunities_CrmMutation } from './crm/opportunities/resolvers/CrmMutation';
import    { CrmMutation as products_CrmMutation } from './crm/products/resolvers/CrmMutation';
import    { CrmQuery as attachments_CrmQuery } from './crm/attachments/resolvers/CrmQuery';
import    { CrmQuery as campaigns_CrmQuery } from './crm/campaigns/resolvers/CrmQuery';
import    { CrmQuery as cases_CrmQuery } from './crm/cases/resolvers/CrmQuery';
import    { CrmQuery as companies_CrmQuery } from './crm/companies/resolvers/CrmQuery';
import    { CrmQuery as contacts_CrmQuery } from './crm/contacts/resolvers/CrmQuery';
import    { CrmQuery as interactions_CrmQuery } from './crm/interactions/resolvers/CrmQuery';
import    { CrmQuery as invoices_CrmQuery } from './crm/invoices/resolvers/CrmQuery';
import    { CrmQuery as leads_CrmQuery } from './crm/leads/resolvers/CrmQuery';
import    { CrmQuery as notifications_CrmQuery } from './crm/notifications/resolvers/CrmQuery';
import    { CrmQuery as opportunities_CrmQuery } from './crm/opportunities/resolvers/CrmQuery';
import    { CrmQuery as products_CrmQuery } from './crm/products/resolvers/CrmQuery';
import    { CustomerTrackingLinks } from './dms/customer_tracking_links/resolvers/CustomerTrackingLinks';
import    { DeleteResult } from './base/resolvers/DeleteResult';
import    { DeliveryRoutes } from './dms/delivery_routes/resolvers/DeliveryRoutes';
import    { DeliveryTasks } from './dms/delivery_tasks/resolvers/DeliveryTasks';
import    { Disputes } from './billing/disputes/resolvers/Disputes';
import    { DmsMutation as customer_tracking_links_DmsMutation } from './dms/customer_tracking_links/resolvers/DmsMutation';
import    { DmsMutation as delivery_routes_DmsMutation } from './dms/delivery_routes/resolvers/DmsMutation';
import    { DmsMutation as delivery_tasks_DmsMutation } from './dms/delivery_tasks/resolvers/DmsMutation';
import    { DmsMutation as proof_of_deliveries_DmsMutation } from './dms/proof_of_deliveries/resolvers/DmsMutation';
import    { DmsMutation as driver_locations_DmsMutation } from './dms/driver_locations/resolvers/DmsMutation';
import    { DmsMutation as task_events_DmsMutation } from './dms/task_events/resolvers/DmsMutation';
import    { DmsProofOfDeliveries } from './dms/proof_of_deliveries/resolvers/DmsProofOfDeliveries';
import    { DmsQuery as customer_tracking_links_DmsQuery } from './dms/customer_tracking_links/resolvers/DmsQuery';
import    { DmsQuery as delivery_routes_DmsQuery } from './dms/delivery_routes/resolvers/DmsQuery';
import    { DmsQuery as delivery_tasks_DmsQuery } from './dms/delivery_tasks/resolvers/DmsQuery';
import    { DmsQuery as proof_of_deliveries_DmsQuery } from './dms/proof_of_deliveries/resolvers/DmsQuery';
import    { DmsQuery as driver_locations_DmsQuery } from './dms/driver_locations/resolvers/DmsQuery';
import    { DmsQuery as task_events_DmsQuery } from './dms/task_events/resolvers/DmsQuery';
import    { Documents } from './billing/documents/resolvers/Documents';
import    { DriverLocations } from './dms/driver_locations/resolvers/DriverLocations';
import    { DriverSchedules } from './tms/driver_schedules/resolvers/DriverSchedules';
import    { Drivers } from './tms/drivers/resolvers/Drivers';
import    { Expenses } from './tms/expenses/resolvers/Expenses';
import    { GeofenceEvents } from './tms/geofence_events/resolvers/GeofenceEvents';
import    { Geofences } from './tms/geofences/resolvers/Geofences';
import    { GpsPings } from './tms/gps_pings/resolvers/GpsPings';
import    { InboundShipmentItems } from './wms/inbound_shipment_items/resolvers/InboundShipmentItems';
import    { InboundShipments } from './wms/inbound_shipments/resolvers/InboundShipments';
import    { Interactions } from './crm/interactions/resolvers/Interactions';
import    { InventoryAdjustments } from './wms/inventory_adjustments/resolvers/InventoryAdjustments';
import    { InventoryBatches } from './wms/inventory_batches/resolvers/InventoryBatches';
import    { InventoryStock } from './wms/inventory_stock/resolvers/InventoryStock';
import    { InvoiceItems } from './crm/invoice_items/resolvers/InvoiceItems';
import    { InvoiceLineItems } from './billing/invoice_line_items/resolvers/InvoiceLineItems';
import    { Invoices } from './crm/invoices/resolvers/Invoices';
import    { Leads } from './crm/leads/resolvers/Leads';
import    { Locations } from './wms/locations/resolvers/Locations';
import    { Notifications } from './crm/notifications/resolvers/Notifications';
import    { Opportunities } from './crm/opportunities/resolvers/Opportunities';
import    { OpportunityProducts } from './crm/opportunity_products/resolvers/OpportunityProducts';
import    { OutboundShipmentItems } from './wms/outbound_shipment_items/resolvers/OutboundShipmentItems';
import    { OutboundShipments } from './wms/outbound_shipments/resolvers/OutboundShipments';
import    { PackageItems } from './wms/package_items/resolvers/PackageItems';
import    { Packages } from './wms/packages/resolvers/Packages';
import    { PartnerInvoiceItems } from './tms/partner_invoice_items/resolvers/PartnerInvoiceItems';
import    { PartnerInvoices } from './tms/partner_invoices/resolvers/PartnerInvoices';
import    { Payments } from './billing/payments/resolvers/Payments';
import    { PickBatchItems } from './wms/pick_batch_items/resolvers/PickBatchItems';
import    { PickBatches } from './wms/pick_batches/resolvers/PickBatches';
import    { Products } from './crm/products/resolvers/Products';
import    { ProofOfDeliveries } from './tms/proof_of_deliveries/resolvers/ProofOfDeliveries';
import    { PutawayRules } from './wms/putaway_rules/resolvers/PutawayRules';
import    { Quotes } from './billing/quotes/resolvers/Quotes';
import    { RateCards } from './billing/rate_cards/resolvers/RateCards';
import    { RateRules } from './billing/rate_rules/resolvers/RateRules';
import    { ReorderPoints } from './wms/reorder_points/resolvers/ReorderPoints';
import    { ReturnItems } from './wms/return_items/resolvers/ReturnItems';
import    { Returns } from './wms/returns/resolvers/Returns';
import    { Routes } from './tms/routes/resolvers/Routes';
import    { SalesOrderItems } from './wms/sales_order_items/resolvers/SalesOrderItems';
import    { SalesOrders } from './wms/sales_orders/resolvers/SalesOrders';
import    { ShipmentLegEvents } from './tms/shipment_leg_events/resolvers/ShipmentLegEvents';
import    { ShipmentLegs } from './tms/shipment_legs/resolvers/ShipmentLegs';
import    { StockTransfers } from './wms/stock_transfers/resolvers/StockTransfers';
import    { Suppliers } from './wms/suppliers/resolvers/Suppliers';
import    { Surcharges } from './billing/surcharges/resolvers/Surcharges';
import    { TaskEvents } from './dms/task_events/resolvers/TaskEvents';
import    { TaskItems } from './wms/task_items/resolvers/TaskItems';
import    { Tasks } from './wms/tasks/resolvers/Tasks';
import    { TmsMutation as partner_invoice_items_TmsMutation } from './tms/partner_invoice_items/resolvers/TmsMutation';
import    { TmsMutation as vehicle_maintenance_TmsMutation } from './tms/vehicle_maintenance/resolvers/TmsMutation';
import    { TmsMutation as carriers_TmsMutation } from './tms/carriers/resolvers/TmsMutation';
import    { TmsMutation as carrier_rates_TmsMutation } from './tms/carrier_rates/resolvers/TmsMutation';
import    { TmsMutation as drivers_TmsMutation } from './tms/drivers/resolvers/TmsMutation';
import    { TmsMutation as driver_schedules_TmsMutation } from './tms/driver_schedules/resolvers/TmsMutation';
import    { TmsMutation as expenses_TmsMutation } from './tms/expenses/resolvers/TmsMutation';
import    { TmsMutation as geofences_TmsMutation } from './tms/geofences/resolvers/TmsMutation';
import    { TmsMutation as geofence_events_TmsMutation } from './tms/geofence_events/resolvers/TmsMutation';
import    { TmsMutation as gps_pings_TmsMutation } from './tms/gps_pings/resolvers/TmsMutation';
import    { TmsMutation as partner_invoices_TmsMutation } from './tms/partner_invoices/resolvers/TmsMutation';
import    { TmsMutation as proof_of_deliveries_TmsMutation } from './tms/proof_of_deliveries/resolvers/TmsMutation';
import    { TmsMutation as routes_TmsMutation } from './tms/routes/resolvers/TmsMutation';
import    { TmsMutation as shipment_legs_TmsMutation } from './tms/shipment_legs/resolvers/TmsMutation';
import    { TmsMutation as shipment_leg_events_TmsMutation } from './tms/shipment_leg_events/resolvers/TmsMutation';
import    { TmsMutation as trips_TmsMutation } from './tms/trips/resolvers/TmsMutation';
import    { TmsMutation as trip_stops_TmsMutation } from './tms/trip_stops/resolvers/TmsMutation';
import    { TmsMutation as vehicles_TmsMutation } from './tms/vehicles/resolvers/TmsMutation';
import    { TmsQuery as carriers_TmsQuery } from './tms/carriers/resolvers/TmsQuery';
import    { TmsQuery as drivers_TmsQuery } from './tms/drivers/resolvers/TmsQuery';
import    { TmsQuery as expenses_TmsQuery } from './tms/expenses/resolvers/TmsQuery';
import    { TmsQuery as geofences_TmsQuery } from './tms/geofences/resolvers/TmsQuery';
import    { TmsQuery as gps_pings_TmsQuery } from './tms/gps_pings/resolvers/TmsQuery';
import    { TmsQuery as partner_invoices_TmsQuery } from './tms/partner_invoices/resolvers/TmsQuery';
import    { TmsQuery as proof_of_deliveries_TmsQuery } from './tms/proof_of_deliveries/resolvers/TmsQuery';
import    { TmsQuery as routes_TmsQuery } from './tms/routes/resolvers/TmsQuery';
import    { TmsQuery as shipment_legs_TmsQuery } from './tms/shipment_legs/resolvers/TmsQuery';
import    { TmsQuery as trips_TmsQuery } from './tms/trips/resolvers/TmsQuery';
import    { TmsQuery as vehicles_TmsQuery } from './tms/vehicles/resolvers/TmsQuery';
import    { TripStops } from './tms/trip_stops/resolvers/TripStops';
import    { Trips } from './tms/trips/resolvers/Trips';
import    { User } from './base/resolvers/User';
import    { VehicleMaintenance } from './tms/vehicle_maintenance/resolvers/VehicleMaintenance';
import    { Vehicles } from './tms/vehicles/resolvers/Vehicles';
import    { Warehouses } from './wms/warehouses/resolvers/Warehouses';
import    { WmsMutation as bin_thresholds_WmsMutation } from './wms/bin_thresholds/resolvers/WmsMutation';
import    { WmsMutation as inbound_shipments_WmsMutation } from './wms/inbound_shipments/resolvers/WmsMutation';
import    { WmsMutation as inbound_shipment_items_WmsMutation } from './wms/inbound_shipment_items/resolvers/WmsMutation';
import    { WmsMutation as inventory_adjustments_WmsMutation } from './wms/inventory_adjustments/resolvers/WmsMutation';
import    { WmsMutation as inventory_batches_WmsMutation } from './wms/inventory_batches/resolvers/WmsMutation';
import    { WmsMutation as inventory_stock_WmsMutation } from './wms/inventory_stock/resolvers/WmsMutation';
import    { WmsMutation as locations_WmsMutation } from './wms/locations/resolvers/WmsMutation';
import    { WmsMutation as outbound_shipments_WmsMutation } from './wms/outbound_shipments/resolvers/WmsMutation';
import    { WmsMutation as outbound_shipment_items_WmsMutation } from './wms/outbound_shipment_items/resolvers/WmsMutation';
import    { WmsMutation as packages_WmsMutation } from './wms/packages/resolvers/WmsMutation';
import    { WmsMutation as package_items_WmsMutation } from './wms/package_items/resolvers/WmsMutation';
import    { WmsMutation as pick_batches_WmsMutation } from './wms/pick_batches/resolvers/WmsMutation';
import    { WmsMutation as pick_batch_items_WmsMutation } from './wms/pick_batch_items/resolvers/WmsMutation';
import    { WmsMutation as putaway_rules_WmsMutation } from './wms/putaway_rules/resolvers/WmsMutation';
import    { WmsMutation as reorder_points_WmsMutation } from './wms/reorder_points/resolvers/WmsMutation';
import    { WmsMutation as returns_WmsMutation } from './wms/returns/resolvers/WmsMutation';
import    { WmsMutation as return_items_WmsMutation } from './wms/return_items/resolvers/WmsMutation';
import    { WmsMutation as sales_orders_WmsMutation } from './wms/sales_orders/resolvers/WmsMutation';
import    { WmsMutation as sales_order_items_WmsMutation } from './wms/sales_order_items/resolvers/WmsMutation';
import    { WmsMutation as stock_transfers_WmsMutation } from './wms/stock_transfers/resolvers/WmsMutation';
import    { WmsMutation as suppliers_WmsMutation } from './wms/suppliers/resolvers/WmsMutation';
import    { WmsMutation as tasks_WmsMutation } from './wms/tasks/resolvers/WmsMutation';
import    { WmsMutation as task_items_WmsMutation } from './wms/task_items/resolvers/WmsMutation';
import    { WmsMutation as warehouses_WmsMutation } from './wms/warehouses/resolvers/WmsMutation';
import    { WmsMutation as products_WmsMutation } from './wms/products/resolvers/WmsMutation';
import    { WmsProducts } from './wms/products/resolvers/WmsProducts';
import    { WmsQuery as bin_thresholds_WmsQuery } from './wms/bin_thresholds/resolvers/WmsQuery';
import    { WmsQuery as inbound_shipments_WmsQuery } from './wms/inbound_shipments/resolvers/WmsQuery';
import    { WmsQuery as inventory_adjustments_WmsQuery } from './wms/inventory_adjustments/resolvers/WmsQuery';
import    { WmsQuery as inventory_batches_WmsQuery } from './wms/inventory_batches/resolvers/WmsQuery';
import    { WmsQuery as inventory_stock_WmsQuery } from './wms/inventory_stock/resolvers/WmsQuery';
import    { WmsQuery as locations_WmsQuery } from './wms/locations/resolvers/WmsQuery';
import    { WmsQuery as outbound_shipments_WmsQuery } from './wms/outbound_shipments/resolvers/WmsQuery';
import    { WmsQuery as packages_WmsQuery } from './wms/packages/resolvers/WmsQuery';
import    { WmsQuery as pick_batches_WmsQuery } from './wms/pick_batches/resolvers/WmsQuery';
import    { WmsQuery as putaway_rules_WmsQuery } from './wms/putaway_rules/resolvers/WmsQuery';
import    { WmsQuery as reorder_points_WmsQuery } from './wms/reorder_points/resolvers/WmsQuery';
import    { WmsQuery as returns_WmsQuery } from './wms/returns/resolvers/WmsQuery';
import    { WmsQuery as sales_orders_WmsQuery } from './wms/sales_orders/resolvers/WmsQuery';
import    { WmsQuery as stock_transfers_WmsQuery } from './wms/stock_transfers/resolvers/WmsQuery';
import    { WmsQuery as suppliers_WmsQuery } from './wms/suppliers/resolvers/WmsQuery';
import    { WmsQuery as tasks_WmsQuery } from './wms/tasks/resolvers/WmsQuery';
import    { WmsQuery as warehouses_WmsQuery } from './wms/warehouses/resolvers/WmsQuery';
import    { WmsQuery as products_WmsQuery } from './wms/products/resolvers/WmsQuery';
import    { File } from './base/resolvers/File';
import    { DateResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { billing: Query_billing,crm: Query_crm,dms: Query_dms,tms: Query_tms,wms: Query_wms },
      Mutation: { billing: Mutation_billing,crm: Mutation_crm,dms: Mutation_dms,tms: Mutation_tms,wms: Mutation_wms },
      
      AccountTransactions: AccountTransactions,
AccountingSyncLogs: AccountingSyncLogs,
Attachments: Attachments,
BillingInvoices: BillingInvoices,
BillingMutation: { ...account_transactions_BillingMutation,...accounting_sync_log_BillingMutation,...invoices_BillingMutation,...client_accounts_BillingMutation,...credit_notes_BillingMutation,...disputes_BillingMutation,...documents_BillingMutation,...invoice_line_items_BillingMutation,...payments_BillingMutation,...quotes_BillingMutation,...rate_cards_BillingMutation,...rate_rules_BillingMutation,...surcharges_BillingMutation },
BillingQuery: { ...account_transactions_BillingQuery,...accounting_sync_log_BillingQuery,...invoices_BillingQuery,...client_accounts_BillingQuery,...credit_notes_BillingQuery,...disputes_BillingQuery,...documents_BillingQuery,...payments_BillingQuery,...quotes_BillingQuery,...rate_cards_BillingQuery,...rate_rules_BillingQuery,...surcharges_BillingQuery },
BinThresholds: BinThresholds,
Campaigns: Campaigns,
CarrierRates: CarrierRates,
Carriers: Carriers,
Cases: Cases,
ClientAccounts: ClientAccounts,
Companies: Companies,
Contacts: Contacts,
CreditNotes: CreditNotes,
CrmMutation: { ...invoice_items_CrmMutation,...opportunity_products_CrmMutation,...attachments_CrmMutation,...campaigns_CrmMutation,...cases_CrmMutation,...companies_CrmMutation,...contacts_CrmMutation,...interactions_CrmMutation,...invoices_CrmMutation,...leads_CrmMutation,...notifications_CrmMutation,...opportunities_CrmMutation,...products_CrmMutation },
CrmQuery: { ...attachments_CrmQuery,...campaigns_CrmQuery,...cases_CrmQuery,...companies_CrmQuery,...contacts_CrmQuery,...interactions_CrmQuery,...invoices_CrmQuery,...leads_CrmQuery,...notifications_CrmQuery,...opportunities_CrmQuery,...products_CrmQuery },
CustomerTrackingLinks: CustomerTrackingLinks,
DeleteResult: DeleteResult,
DeliveryRoutes: DeliveryRoutes,
DeliveryTasks: DeliveryTasks,
Disputes: Disputes,
DmsMutation: { ...customer_tracking_links_DmsMutation,...delivery_routes_DmsMutation,...delivery_tasks_DmsMutation,...proof_of_deliveries_DmsMutation,...driver_locations_DmsMutation,...task_events_DmsMutation },
DmsProofOfDeliveries: DmsProofOfDeliveries,
DmsQuery: { ...customer_tracking_links_DmsQuery,...delivery_routes_DmsQuery,...delivery_tasks_DmsQuery,...proof_of_deliveries_DmsQuery,...driver_locations_DmsQuery,...task_events_DmsQuery },
Documents: Documents,
DriverLocations: DriverLocations,
DriverSchedules: DriverSchedules,
Drivers: Drivers,
Expenses: Expenses,
GeofenceEvents: GeofenceEvents,
Geofences: Geofences,
GpsPings: GpsPings,
InboundShipmentItems: InboundShipmentItems,
InboundShipments: InboundShipments,
Interactions: Interactions,
InventoryAdjustments: InventoryAdjustments,
InventoryBatches: InventoryBatches,
InventoryStock: InventoryStock,
InvoiceItems: InvoiceItems,
InvoiceLineItems: InvoiceLineItems,
Invoices: Invoices,
Leads: Leads,
Locations: Locations,
Notifications: Notifications,
Opportunities: Opportunities,
OpportunityProducts: OpportunityProducts,
OutboundShipmentItems: OutboundShipmentItems,
OutboundShipments: OutboundShipments,
PackageItems: PackageItems,
Packages: Packages,
PartnerInvoiceItems: PartnerInvoiceItems,
PartnerInvoices: PartnerInvoices,
Payments: Payments,
PickBatchItems: PickBatchItems,
PickBatches: PickBatches,
Products: Products,
ProofOfDeliveries: ProofOfDeliveries,
PutawayRules: PutawayRules,
Quotes: Quotes,
RateCards: RateCards,
RateRules: RateRules,
ReorderPoints: ReorderPoints,
ReturnItems: ReturnItems,
Returns: Returns,
Routes: Routes,
SalesOrderItems: SalesOrderItems,
SalesOrders: SalesOrders,
ShipmentLegEvents: ShipmentLegEvents,
ShipmentLegs: ShipmentLegs,
StockTransfers: StockTransfers,
Suppliers: Suppliers,
Surcharges: Surcharges,
TaskEvents: TaskEvents,
TaskItems: TaskItems,
Tasks: Tasks,
TmsMutation: { ...partner_invoice_items_TmsMutation,...vehicle_maintenance_TmsMutation,...carriers_TmsMutation,...carrier_rates_TmsMutation,...drivers_TmsMutation,...driver_schedules_TmsMutation,...expenses_TmsMutation,...geofences_TmsMutation,...geofence_events_TmsMutation,...gps_pings_TmsMutation,...partner_invoices_TmsMutation,...proof_of_deliveries_TmsMutation,...routes_TmsMutation,...shipment_legs_TmsMutation,...shipment_leg_events_TmsMutation,...trips_TmsMutation,...trip_stops_TmsMutation,...vehicles_TmsMutation },
TmsQuery: { ...carriers_TmsQuery,...drivers_TmsQuery,...expenses_TmsQuery,...geofences_TmsQuery,...gps_pings_TmsQuery,...partner_invoices_TmsQuery,...proof_of_deliveries_TmsQuery,...routes_TmsQuery,...shipment_legs_TmsQuery,...trips_TmsQuery,...vehicles_TmsQuery },
TripStops: TripStops,
Trips: Trips,
User: User,
VehicleMaintenance: VehicleMaintenance,
Vehicles: Vehicles,
Warehouses: Warehouses,
WmsMutation: { ...bin_thresholds_WmsMutation,...inbound_shipments_WmsMutation,...inbound_shipment_items_WmsMutation,...inventory_adjustments_WmsMutation,...inventory_batches_WmsMutation,...inventory_stock_WmsMutation,...locations_WmsMutation,...outbound_shipments_WmsMutation,...outbound_shipment_items_WmsMutation,...packages_WmsMutation,...package_items_WmsMutation,...pick_batches_WmsMutation,...pick_batch_items_WmsMutation,...putaway_rules_WmsMutation,...reorder_points_WmsMutation,...returns_WmsMutation,...return_items_WmsMutation,...sales_orders_WmsMutation,...sales_order_items_WmsMutation,...stock_transfers_WmsMutation,...suppliers_WmsMutation,...tasks_WmsMutation,...task_items_WmsMutation,...warehouses_WmsMutation,...products_WmsMutation },
WmsProducts: WmsProducts,
WmsQuery: { ...bin_thresholds_WmsQuery,...inbound_shipments_WmsQuery,...inventory_adjustments_WmsQuery,...inventory_batches_WmsQuery,...inventory_stock_WmsQuery,...locations_WmsQuery,...outbound_shipments_WmsQuery,...packages_WmsQuery,...pick_batches_WmsQuery,...putaway_rules_WmsQuery,...reorder_points_WmsQuery,...returns_WmsQuery,...sales_orders_WmsQuery,...stock_transfers_WmsQuery,...suppliers_WmsQuery,...tasks_WmsQuery,...warehouses_WmsQuery,...products_WmsQuery },
File: File,
Date: DateResolver
    }