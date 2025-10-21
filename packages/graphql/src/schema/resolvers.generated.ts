/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { crm as Query_crm } from './crm/resolvers/Query/crm';
import    { tms as Query_tms } from './tms/resolvers/Query/tms';
import    { wms as Query_wms } from './wms/resolvers/Query/wms';
import    { crm as Mutation_crm } from './crm/resolvers/Mutation/crm';
import    { tms as Mutation_tms } from './tms/resolvers/Mutation/tms';
import    { wms as Mutation_wms } from './wms/resolvers/Mutation/wms';
import    { Attachments } from './crm/attachments/resolvers/Attachments';
import    { BinThresholds } from './wms/bin_thresholds/resolvers/BinThresholds';
import    { Campaigns } from './crm/campaigns/resolvers/Campaigns';
import    { CarrierRates } from './tms/carrier_rates/resolvers/CarrierRates';
import    { Carriers } from './tms/carriers/resolvers/Carriers';
import    { Cases } from './crm/cases/resolvers/Cases';
import    { Companies } from './crm/companies/resolvers/Companies';
import    { Contacts } from './crm/contacts/resolvers/Contacts';
import    { CrmMutation as attachments_CrmMutation } from './crm/attachments/resolvers/CrmMutation';
import    { CrmMutation as campaigns_CrmMutation } from './crm/campaigns/resolvers/CrmMutation';
import    { CrmMutation as cases_CrmMutation } from './crm/cases/resolvers/CrmMutation';
import    { CrmMutation as companies_CrmMutation } from './crm/companies/resolvers/CrmMutation';
import    { CrmMutation as contacts_CrmMutation } from './crm/contacts/resolvers/CrmMutation';
import    { CrmMutation as interactions_CrmMutation } from './crm/interactions/resolvers/CrmMutation';
import    { CrmMutation as invoices_CrmMutation } from './crm/invoices/resolvers/CrmMutation';
import    { CrmMutation as invoice_items_CrmMutation } from './crm/invoice_items/resolvers/CrmMutation';
import    { CrmMutation as leads_CrmMutation } from './crm/leads/resolvers/CrmMutation';
import    { CrmMutation as notifications_CrmMutation } from './crm/notifications/resolvers/CrmMutation';
import    { CrmMutation as opportunities_CrmMutation } from './crm/opportunities/resolvers/CrmMutation';
import    { CrmMutation as opportunity_products_CrmMutation } from './crm/opportunity_products/resolvers/CrmMutation';
import    { CrmMutation as products_CrmMutation } from './crm/products/resolvers/CrmMutation';
import    { CrmQuery as attachments_CrmQuery } from './crm/attachments/resolvers/CrmQuery';
import    { CrmQuery as campaigns_CrmQuery } from './crm/campaigns/resolvers/CrmQuery';
import    { CrmQuery as cases_CrmQuery } from './crm/cases/resolvers/CrmQuery';
import    { CrmQuery as companies_CrmQuery } from './crm/companies/resolvers/CrmQuery';
import    { CrmQuery as contacts_CrmQuery } from './crm/contacts/resolvers/CrmQuery';
import    { CrmQuery as interactions_CrmQuery } from './crm/interactions/resolvers/CrmQuery';
import    { CrmQuery as invoices_CrmQuery } from './crm/invoices/resolvers/CrmQuery';
import    { CrmQuery as invoice_items_CrmQuery } from './crm/invoice_items/resolvers/CrmQuery';
import    { CrmQuery as leads_CrmQuery } from './crm/leads/resolvers/CrmQuery';
import    { CrmQuery as notifications_CrmQuery } from './crm/notifications/resolvers/CrmQuery';
import    { CrmQuery as opportunities_CrmQuery } from './crm/opportunities/resolvers/CrmQuery';
import    { CrmQuery as opportunity_products_CrmQuery } from './crm/opportunity_products/resolvers/CrmQuery';
import    { CrmQuery as products_CrmQuery } from './crm/products/resolvers/CrmQuery';
import    { DeleteResult } from './base/resolvers/DeleteResult';
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
import    { PickBatchItems } from './wms/pick_batch_items/resolvers/PickBatchItems';
import    { PickBatches } from './wms/pick_batches/resolvers/PickBatches';
import    { Products } from './crm/products/resolvers/Products';
import    { ProofOfDeliveries } from './tms/proof_of_deliveries/resolvers/ProofOfDeliveries';
import    { PutawayRules } from './wms/putaway_rules/resolvers/PutawayRules';
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
import    { TaskItems } from './wms/task_items/resolvers/TaskItems';
import    { Tasks } from './wms/tasks/resolvers/Tasks';
import    { TmsMutation as carriers_TmsMutation } from './tms/carriers/resolvers/TmsMutation';
import    { TmsMutation as carrier_rates_TmsMutation } from './tms/carrier_rates/resolvers/TmsMutation';
import    { TmsMutation as drivers_TmsMutation } from './tms/drivers/resolvers/TmsMutation';
import    { TmsMutation as driver_schedules_TmsMutation } from './tms/driver_schedules/resolvers/TmsMutation';
import    { TmsMutation as expenses_TmsMutation } from './tms/expenses/resolvers/TmsMutation';
import    { TmsMutation as geofences_TmsMutation } from './tms/geofences/resolvers/TmsMutation';
import    { TmsMutation as geofence_events_TmsMutation } from './tms/geofence_events/resolvers/TmsMutation';
import    { TmsMutation as gps_pings_TmsMutation } from './tms/gps_pings/resolvers/TmsMutation';
import    { TmsMutation as partner_invoices_TmsMutation } from './tms/partner_invoices/resolvers/TmsMutation';
import    { TmsMutation as partner_invoice_items_TmsMutation } from './tms/partner_invoice_items/resolvers/TmsMutation';
import    { TmsMutation as proof_of_deliveries_TmsMutation } from './tms/proof_of_deliveries/resolvers/TmsMutation';
import    { TmsMutation as routes_TmsMutation } from './tms/routes/resolvers/TmsMutation';
import    { TmsMutation as shipment_legs_TmsMutation } from './tms/shipment_legs/resolvers/TmsMutation';
import    { TmsMutation as shipment_leg_events_TmsMutation } from './tms/shipment_leg_events/resolvers/TmsMutation';
import    { TmsMutation as trips_TmsMutation } from './tms/trips/resolvers/TmsMutation';
import    { TmsMutation as trip_stops_TmsMutation } from './tms/trip_stops/resolvers/TmsMutation';
import    { TmsMutation as vehicles_TmsMutation } from './tms/vehicles/resolvers/TmsMutation';
import    { TmsMutation as vehicle_maintenance_TmsMutation } from './tms/vehicle_maintenance/resolvers/TmsMutation';
import    { TmsQuery as carriers_TmsQuery } from './tms/carriers/resolvers/TmsQuery';
import    { TmsQuery as carrier_rates_TmsQuery } from './tms/carrier_rates/resolvers/TmsQuery';
import    { TmsQuery as drivers_TmsQuery } from './tms/drivers/resolvers/TmsQuery';
import    { TmsQuery as driver_schedules_TmsQuery } from './tms/driver_schedules/resolvers/TmsQuery';
import    { TmsQuery as expenses_TmsQuery } from './tms/expenses/resolvers/TmsQuery';
import    { TmsQuery as geofences_TmsQuery } from './tms/geofences/resolvers/TmsQuery';
import    { TmsQuery as geofence_events_TmsQuery } from './tms/geofence_events/resolvers/TmsQuery';
import    { TmsQuery as gps_pings_TmsQuery } from './tms/gps_pings/resolvers/TmsQuery';
import    { TmsQuery as partner_invoices_TmsQuery } from './tms/partner_invoices/resolvers/TmsQuery';
import    { TmsQuery as partner_invoice_items_TmsQuery } from './tms/partner_invoice_items/resolvers/TmsQuery';
import    { TmsQuery as proof_of_deliveries_TmsQuery } from './tms/proof_of_deliveries/resolvers/TmsQuery';
import    { TmsQuery as routes_TmsQuery } from './tms/routes/resolvers/TmsQuery';
import    { TmsQuery as shipment_legs_TmsQuery } from './tms/shipment_legs/resolvers/TmsQuery';
import    { TmsQuery as shipment_leg_events_TmsQuery } from './tms/shipment_leg_events/resolvers/TmsQuery';
import    { TmsQuery as trips_TmsQuery } from './tms/trips/resolvers/TmsQuery';
import    { TmsQuery as trip_stops_TmsQuery } from './tms/trip_stops/resolvers/TmsQuery';
import    { TmsQuery as vehicles_TmsQuery } from './tms/vehicles/resolvers/TmsQuery';
import    { TmsQuery as vehicle_maintenance_TmsQuery } from './tms/vehicle_maintenance/resolvers/TmsQuery';
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
import    { WmsQuery as inbound_shipment_items_WmsQuery } from './wms/inbound_shipment_items/resolvers/WmsQuery';
import    { WmsQuery as inventory_adjustments_WmsQuery } from './wms/inventory_adjustments/resolvers/WmsQuery';
import    { WmsQuery as inventory_batches_WmsQuery } from './wms/inventory_batches/resolvers/WmsQuery';
import    { WmsQuery as inventory_stock_WmsQuery } from './wms/inventory_stock/resolvers/WmsQuery';
import    { WmsQuery as locations_WmsQuery } from './wms/locations/resolvers/WmsQuery';
import    { WmsQuery as outbound_shipments_WmsQuery } from './wms/outbound_shipments/resolvers/WmsQuery';
import    { WmsQuery as outbound_shipment_items_WmsQuery } from './wms/outbound_shipment_items/resolvers/WmsQuery';
import    { WmsQuery as packages_WmsQuery } from './wms/packages/resolvers/WmsQuery';
import    { WmsQuery as package_items_WmsQuery } from './wms/package_items/resolvers/WmsQuery';
import    { WmsQuery as pick_batches_WmsQuery } from './wms/pick_batches/resolvers/WmsQuery';
import    { WmsQuery as pick_batch_items_WmsQuery } from './wms/pick_batch_items/resolvers/WmsQuery';
import    { WmsQuery as putaway_rules_WmsQuery } from './wms/putaway_rules/resolvers/WmsQuery';
import    { WmsQuery as reorder_points_WmsQuery } from './wms/reorder_points/resolvers/WmsQuery';
import    { WmsQuery as returns_WmsQuery } from './wms/returns/resolvers/WmsQuery';
import    { WmsQuery as return_items_WmsQuery } from './wms/return_items/resolvers/WmsQuery';
import    { WmsQuery as sales_orders_WmsQuery } from './wms/sales_orders/resolvers/WmsQuery';
import    { WmsQuery as sales_order_items_WmsQuery } from './wms/sales_order_items/resolvers/WmsQuery';
import    { WmsQuery as stock_transfers_WmsQuery } from './wms/stock_transfers/resolvers/WmsQuery';
import    { WmsQuery as suppliers_WmsQuery } from './wms/suppliers/resolvers/WmsQuery';
import    { WmsQuery as tasks_WmsQuery } from './wms/tasks/resolvers/WmsQuery';
import    { WmsQuery as task_items_WmsQuery } from './wms/task_items/resolvers/WmsQuery';
import    { WmsQuery as warehouses_WmsQuery } from './wms/warehouses/resolvers/WmsQuery';
import    { WmsQuery as products_WmsQuery } from './wms/products/resolvers/WmsQuery';
    export const resolvers: Resolvers = {
      Query: { crm: Query_crm,tms: Query_tms,wms: Query_wms },
      Mutation: { crm: Mutation_crm,tms: Mutation_tms,wms: Mutation_wms },
      
      Attachments: Attachments,
BinThresholds: BinThresholds,
Campaigns: Campaigns,
CarrierRates: CarrierRates,
Carriers: Carriers,
Cases: Cases,
Companies: Companies,
Contacts: Contacts,
CrmMutation: { ...attachments_CrmMutation,...campaigns_CrmMutation,...cases_CrmMutation,...companies_CrmMutation,...contacts_CrmMutation,...interactions_CrmMutation,...invoices_CrmMutation,...invoice_items_CrmMutation,...leads_CrmMutation,...notifications_CrmMutation,...opportunities_CrmMutation,...opportunity_products_CrmMutation,...products_CrmMutation },
CrmQuery: { ...attachments_CrmQuery,...campaigns_CrmQuery,...cases_CrmQuery,...companies_CrmQuery,...contacts_CrmQuery,...interactions_CrmQuery,...invoices_CrmQuery,...invoice_items_CrmQuery,...leads_CrmQuery,...notifications_CrmQuery,...opportunities_CrmQuery,...opportunity_products_CrmQuery,...products_CrmQuery },
DeleteResult: DeleteResult,
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
PickBatchItems: PickBatchItems,
PickBatches: PickBatches,
Products: Products,
ProofOfDeliveries: ProofOfDeliveries,
PutawayRules: PutawayRules,
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
TaskItems: TaskItems,
Tasks: Tasks,
TmsMutation: { ...carriers_TmsMutation,...carrier_rates_TmsMutation,...drivers_TmsMutation,...driver_schedules_TmsMutation,...expenses_TmsMutation,...geofences_TmsMutation,...geofence_events_TmsMutation,...gps_pings_TmsMutation,...partner_invoices_TmsMutation,...partner_invoice_items_TmsMutation,...proof_of_deliveries_TmsMutation,...routes_TmsMutation,...shipment_legs_TmsMutation,...shipment_leg_events_TmsMutation,...trips_TmsMutation,...trip_stops_TmsMutation,...vehicles_TmsMutation,...vehicle_maintenance_TmsMutation },
TmsQuery: { ...carriers_TmsQuery,...carrier_rates_TmsQuery,...drivers_TmsQuery,...driver_schedules_TmsQuery,...expenses_TmsQuery,...geofences_TmsQuery,...geofence_events_TmsQuery,...gps_pings_TmsQuery,...partner_invoices_TmsQuery,...partner_invoice_items_TmsQuery,...proof_of_deliveries_TmsQuery,...routes_TmsQuery,...shipment_legs_TmsQuery,...shipment_leg_events_TmsQuery,...trips_TmsQuery,...trip_stops_TmsQuery,...vehicles_TmsQuery,...vehicle_maintenance_TmsQuery },
TripStops: TripStops,
Trips: Trips,
User: User,
VehicleMaintenance: VehicleMaintenance,
Vehicles: Vehicles,
Warehouses: Warehouses,
WmsMutation: { ...bin_thresholds_WmsMutation,...inbound_shipments_WmsMutation,...inbound_shipment_items_WmsMutation,...inventory_adjustments_WmsMutation,...inventory_batches_WmsMutation,...inventory_stock_WmsMutation,...locations_WmsMutation,...outbound_shipments_WmsMutation,...outbound_shipment_items_WmsMutation,...packages_WmsMutation,...package_items_WmsMutation,...pick_batches_WmsMutation,...pick_batch_items_WmsMutation,...putaway_rules_WmsMutation,...reorder_points_WmsMutation,...returns_WmsMutation,...return_items_WmsMutation,...sales_orders_WmsMutation,...sales_order_items_WmsMutation,...stock_transfers_WmsMutation,...suppliers_WmsMutation,...tasks_WmsMutation,...task_items_WmsMutation,...warehouses_WmsMutation,...products_WmsMutation },
WmsProducts: WmsProducts,
WmsQuery: { ...bin_thresholds_WmsQuery,...inbound_shipments_WmsQuery,...inbound_shipment_items_WmsQuery,...inventory_adjustments_WmsQuery,...inventory_batches_WmsQuery,...inventory_stock_WmsQuery,...locations_WmsQuery,...outbound_shipments_WmsQuery,...outbound_shipment_items_WmsQuery,...packages_WmsQuery,...package_items_WmsQuery,...pick_batches_WmsQuery,...pick_batch_items_WmsQuery,...putaway_rules_WmsQuery,...reorder_points_WmsQuery,...returns_WmsQuery,...return_items_WmsQuery,...sales_orders_WmsQuery,...sales_order_items_WmsQuery,...stock_transfers_WmsQuery,...suppliers_WmsQuery,...tasks_WmsQuery,...task_items_WmsQuery,...warehouses_WmsQuery,...products_WmsQuery }
    }