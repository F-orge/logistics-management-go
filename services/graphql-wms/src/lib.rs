pub mod models;
pub mod mutation;
pub mod query;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "WmsQueries")]
pub struct Query(
    query::bin_thresholds::Query,
    query::inbound_shipments::Query,
    query::inventory_adjustments::Query,
    query::inventory_batches::Query,
    query::inventory_stock::Query,
    query::locations::Query,
    query::outbound_shipments::Query,
    query::packages::Query,
    query::pick_batches::Query,
    query::products::Query,
    query::putaway_rules::Query,
    query::reorder_points::Query,
    query::returns::Query,
    query::sales_orders::Query,
    query::stock_transfers::Query,
    query::suppliers::Query,
    query::tasks::Query,
    query::warehouses::Query,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "WmsMutations")]
pub struct Mutation(
    mutation::bin_thresholds::Mutation,
    mutation::inventory_stock::Mutation,
    mutation::locations::Mutation,
    mutation::packages::Mutation,
    mutation::pick_batches::Mutation,
    mutation::putaway_rules::Mutation,
    mutation::tasks::Mutation,
    mutation::warehouses::Mutation,
);
