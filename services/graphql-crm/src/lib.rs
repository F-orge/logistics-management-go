use async_graphql::MergedObject;

pub mod entities;
pub mod queries;

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
);
