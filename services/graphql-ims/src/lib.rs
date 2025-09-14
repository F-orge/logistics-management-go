pub mod entities;
pub mod queries;

use async_graphql::MergedObject;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "ImsQueries")]
pub struct Query(
    entities::_generated::inbound_shipment_items::Entity,
    entities::_generated::inbound_shipments::Entity,
    entities::_generated::inventory_adjustments::Entity,
    entities::_generated::inventory_batches::Entity,
    entities::_generated::outbound_shipment_items::Entity,
    entities::_generated::outbound_shipments::Entity,
    entities::_generated::products::Entity,
    entities::_generated::reorder_points::Entity,
    entities::_generated::return_items::Entity,
    entities::_generated::returns::Entity,
    entities::_generated::sales_order_items::Entity,
    entities::_generated::sales_orders::Entity,
    entities::_generated::stock_transfers::Entity,
    entities::_generated::suppliers::Entity,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "ImsMutations")]
pub struct Mutation(
    queries::inbound_shipment_items::Mutations,
    queries::inbound_shipments::Mutations,
    queries::inventory_adjustments::Mutations,
    queries::inventory_batches::Mutations,
    queries::outbound_shipment_items::Mutations,
    queries::outbound_shipments::Mutations,
    queries::products::Mutations,
    queries::reorder_points::Mutations,
    queries::return_items::Mutations,
    queries::returns::Mutations,
    queries::sales_order_items::Mutations,
    queries::sales_orders::Mutations,
    queries::stock_transfers::Mutations,
    queries::suppliers::Mutations,
);
