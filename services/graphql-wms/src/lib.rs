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
    // queries::bin_thresholds::Mutations,
    // queries::inventory_stock::Mutations,
    // queries::locations::Mutations,
    // queries::package_items::Mutations,
    // queries::packages::Mutations,
    // queries::pick_batch_items::Mutations,
    // queries::pick_batches::Mutations,
    // queries::putaway_rules::Mutations,
    // queries::task_items::Mutations,
    // queries::tasks::Mutations,
    // queries::warehouses::Mutations,
);
