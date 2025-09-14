pub mod entities;
pub mod queries;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "TmsQueries")]
pub struct Query(
    entities::_generated::carriers::Entity,
    entities::_generated::drivers::Entity,
    entities::_generated::vehicles::Entity,
    entities::_generated::carrier_rates::Entity,
    entities::_generated::driver_schedules::Entity,
    entities::_generated::vehicle_maintenance::Entity,
    entities::_generated::expenses::Entity,
    entities::_generated::geofence_events::Entity,
    entities::_generated::geofences::Entity,
    entities::_generated::gps_pings::Entity,
    entities::_generated::partner_invoice_items::Entity,
    entities::_generated::partner_invoices::Entity,
    entities::_generated::proof_of_deliveries::Entity,
    entities::_generated::routes::Entity,
    entities::_generated::shipment_leg_events::Entity,
    entities::_generated::shipment_legs::Entity,
    entities::_generated::trip_stops::Entity,
    entities::_generated::trips::Entity,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "TmsMutations")]
pub struct Mutation(
    queries::carriers::Mutations,
    queries::drivers::Mutations,
    queries::vehicles::Mutations,
    queries::carrier_rates::Mutations,
    queries::driver_schedules::Mutations,
    queries::vehicle_maintenance::Mutations,
    queries::expenses::Mutations,
    queries::geofence_events::Mutations,
    queries::geofences::Mutations,
    queries::gps_pings::Mutations,
    queries::partner_invoice_items::Mutations,
    queries::partner_invoices::Mutations,
    queries::proof_of_deliveries::Mutations,
    queries::routes::Mutations,
    queries::shipment_leg_events::Mutations,
    queries::shipment_legs::Mutations,
    queries::trip_stops::Mutations,
    queries::trips::Mutations,
);
