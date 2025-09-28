pub mod models;
pub mod mutation;
pub mod query;
pub mod subscription;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "TmsQueries")]
pub struct Query(
    query::carriers::Query,
    query::drivers::Query,
    query::expenses::Query,
    query::geofences::Query,
    query::gps_pings::Query,
    query::partner_invoices::Query,
    query::proof_of_deliveries::Query,
    query::routes::Query,
    query::shipment_legs::Query,
    query::trips::Query,
    query::vehicles::Query,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "TmsMutations")]
pub struct Mutation(
    mutation::carriers::Mutation,
    mutation::drivers::Mutation,
    mutation::expenses::Mutation,
    mutation::geofence_events::Mutation,
    mutation::geofences::Mutation,
    mutation::gps_pings::Mutation,
    mutation::partner_invoices::Mutation,
    mutation::proof_of_deliveries::Mutation,
    mutation::routes::Mutation,
    mutation::shipment_legs::Mutation,
    mutation::trips::Mutation,
    mutation::vehicle_maintenance::Mutation,
    mutation::vehicles::Mutation,
);
