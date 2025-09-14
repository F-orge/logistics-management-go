pub mod entities;

pub mod queries;

use async_graphql::{MergedObject, Object};

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "WmsQueries")]
pub struct Query(
	entities::_generated::bin_thresholds::Entity,
	entities::_generated::inventory_stock::Entity,
	entities::_generated::locations::Entity,
	entities::_generated::package_items::Entity,
	entities::_generated::packages::Entity,
	entities::_generated::pick_batch_items::Entity,
	entities::_generated::pick_batches::Entity,
	entities::_generated::putaway_rules::Entity,
	entities::_generated::task_items::Entity,
	entities::_generated::tasks::Entity,
	entities::_generated::warehouses::Entity,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "WmsMutations")]
pub struct Mutation(
	queries::bin_thresholds::Mutations,
	queries::inventory_stock::Mutations,
	queries::locations::Mutations,
	queries::package_items::Mutations,
	queries::packages::Mutations,
	queries::pick_batch_items::Mutations,
	queries::pick_batches::Mutations,
	queries::putaway_rules::Mutations,
	queries::task_items::Mutations,
	queries::tasks::Mutations,
	queries::warehouses::Mutations,
);
