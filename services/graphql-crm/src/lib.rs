use async_graphql::MergedObject;

pub mod entities;
pub mod models;
pub mod mutation;
pub mod queries;
pub mod query;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "CrmQueries")]
pub struct Query(
    entities::_generated::companies::Entity,
    entities::_generated::contacts::Entity,
    entities::_generated::attachments::Entity,
    entities::_generated::campaigns::Entity,
    entities::_generated::cases::Entity,
    entities::_generated::interactions::Entity,
    entities::_generated::invoice_items::Entity,
    entities::_generated::invoices::Entity,
    entities::_generated::leads::Entity,
    entities::_generated::notifications::Entity,
    entities::_generated::opportunities::Entity,
    entities::_generated::opportunity_products::Entity,
    entities::_generated::products::Entity,
    entities::_generated::taggings::Entity,
    entities::_generated::tags::Entity,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "CrmMutations")]
pub struct Mutation(
    queries::companies::Mutations,
    queries::contacts::Mutations,
    queries::attachments::Mutations,
    queries::campaigns::Mutations,
    queries::cases::Mutations,
    queries::interactions::Mutations,
    queries::invoice_items::Mutations,
    queries::invoices::Mutations,
    queries::leads::Mutations,
    queries::notifications::Mutations,
    queries::opportunities::Mutations,
    queries::opportunity_products::Mutations,
    queries::products::Mutations,
    queries::taggings::Mutations,
    queries::tags::Mutations,
);
