use async_graphql::MergedObject;

pub mod entities;
pub mod queries;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "CrmQueries")]
pub struct Query(entities::_generated::companies::Entity);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "CrmMutations")]
pub struct Mutation(queries::companies::Mutations);
