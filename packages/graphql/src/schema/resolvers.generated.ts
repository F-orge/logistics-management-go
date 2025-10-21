/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { crm as Query_crm } from './crm/resolvers/Query/crm';
import    { tms as Query_tms } from './tms/resolvers/Query/tms';
import    { crm as Mutation_crm } from './crm/resolvers/Mutation/crm';
import    { tms as Mutation_tms } from './tms/resolvers/Mutation/tms';
import    { Attachments } from './crm/attachments/resolvers/Attachments';
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
import    { Interactions } from './crm/interactions/resolvers/Interactions';
import    { InvoiceItems } from './crm/invoice_items/resolvers/InvoiceItems';
import    { Invoices } from './crm/invoices/resolvers/Invoices';
import    { Leads } from './crm/leads/resolvers/Leads';
import    { Notifications } from './crm/notifications/resolvers/Notifications';
import    { Opportunities } from './crm/opportunities/resolvers/Opportunities';
import    { OpportunityProducts } from './crm/opportunity_products/resolvers/OpportunityProducts';
import    { PartnerInvoiceItems } from './tms/partner_invoice_items/resolvers/PartnerInvoiceItems';
import    { PartnerInvoices } from './tms/partner_invoices/resolvers/PartnerInvoices';
import    { Products } from './crm/products/resolvers/Products';
import    { ProofOfDeliveries } from './tms/proof_of_deliveries/resolvers/ProofOfDeliveries';
import    { Routes } from './tms/routes/resolvers/Routes';
import    { ShipmentLegEvents } from './tms/shipment_leg_events/resolvers/ShipmentLegEvents';
import    { ShipmentLegs } from './tms/shipment_legs/resolvers/ShipmentLegs';
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
    export const resolvers: Resolvers = {
      Query: { crm: Query_crm,tms: Query_tms },
      Mutation: { crm: Mutation_crm,tms: Mutation_tms },
      
      Attachments: Attachments,
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
Interactions: Interactions,
InvoiceItems: InvoiceItems,
Invoices: Invoices,
Leads: Leads,
Notifications: Notifications,
Opportunities: Opportunities,
OpportunityProducts: OpportunityProducts,
PartnerInvoiceItems: PartnerInvoiceItems,
PartnerInvoices: PartnerInvoices,
Products: Products,
ProofOfDeliveries: ProofOfDeliveries,
Routes: Routes,
ShipmentLegEvents: ShipmentLegEvents,
ShipmentLegs: ShipmentLegs,
TmsMutation: { ...carriers_TmsMutation,...carrier_rates_TmsMutation,...drivers_TmsMutation,...driver_schedules_TmsMutation,...expenses_TmsMutation,...geofences_TmsMutation,...geofence_events_TmsMutation,...gps_pings_TmsMutation,...partner_invoices_TmsMutation,...partner_invoice_items_TmsMutation,...proof_of_deliveries_TmsMutation,...routes_TmsMutation,...shipment_legs_TmsMutation,...shipment_leg_events_TmsMutation,...trips_TmsMutation,...trip_stops_TmsMutation,...vehicles_TmsMutation,...vehicle_maintenance_TmsMutation },
TmsQuery: { ...carriers_TmsQuery,...carrier_rates_TmsQuery,...drivers_TmsQuery,...driver_schedules_TmsQuery,...expenses_TmsQuery,...geofences_TmsQuery,...geofence_events_TmsQuery,...gps_pings_TmsQuery,...partner_invoices_TmsQuery,...partner_invoice_items_TmsQuery,...proof_of_deliveries_TmsQuery,...routes_TmsQuery,...shipment_legs_TmsQuery,...shipment_leg_events_TmsQuery,...trips_TmsQuery,...trip_stops_TmsQuery,...vehicles_TmsQuery,...vehicle_maintenance_TmsQuery },
TripStops: TripStops,
Trips: Trips,
User: User,
VehicleMaintenance: VehicleMaintenance,
Vehicles: Vehicles
    }