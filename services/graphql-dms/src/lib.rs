pub mod entities;

pub mod models;
pub mod queries;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "DmsQueries")]
pub struct Query(
    entities::_generated::customer_tracking_links::Entity,
    entities::_generated::delivery_routes::Entity,
    entities::_generated::delivery_tasks::Entity,
    entities::_generated::driver_locations::Entity,
    entities::_generated::proof_of_deliveries::Entity,
    entities::_generated::task_events::Entity,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "DmsMutations")]
pub struct Mutation(
    queries::customer_tracking_links::Mutations,
    queries::delivery_routes::Mutations,
    queries::delivery_tasks::Mutations,
    queries::driver_locations::Mutations,
    queries::proof_of_deliveries::Mutations,
    queries::task_events::Mutations,
);
