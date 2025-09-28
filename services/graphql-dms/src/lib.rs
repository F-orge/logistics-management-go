pub mod models;
pub mod mutation;
pub mod query;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "DmsQueries")]
pub struct Query(
    query::customer_tracking_links::Query,
    query::delivery_routes::Query,
    query::delivery_tasks::Query,
    query::driver_locations::Query,
    query::proof_of_deliveries::Query,
    query::task_events::Query,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "DmsMutations")]
pub struct Mutation(
    mutation::customer_tracking_links::Mutation,
    mutation::delivery_routes::Mutation,
    mutation::delivery_tasks::Mutation,
    mutation::driver_locations::Mutation,
    mutation::proof_of_deliveries::Mutation,
    mutation::task_events::Mutation,
);
