pub mod entities;
pub mod models;
pub mod mutation;
pub mod queries;
pub mod query;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "ImsQueries")]
pub struct Query(
    query::inbound_shipments::Query,
    query::inventory_adjustments::Query,
    query::inventory_batches::Query,
    query::outbound_shipments::Query,
    query::products::Query,
    query::reorder_points::Query,
    query::returns::Query,
    query::sales_orders::Query,
    query::stock_transfers::Query,
    query::suppliers::Query,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "ImsMutations")]
pub struct Mutation(
    mutation::inbound_shipments::Mutation,
    mutation::inventory_adjustments::Mutation,
    mutation::inventory_batches::Mutation,
    mutation::outbound_shipments::Mutation,
    mutation::products::Mutation,
    mutation::reorder_points::Mutation,
    mutation::returns::Mutation,
    mutation::sales_orders::Mutation,
    mutation::stock_transfers::Mutation,
    mutation::suppliers::Mutation,
);
