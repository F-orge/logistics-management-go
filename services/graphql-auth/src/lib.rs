use async_graphql::MergedObject;

pub mod entities;
pub mod queries;

#[derive(MergedObject, Default, Debug)]
#[graphql(name = "AuthQuery")]
pub struct Query(entities::_generated::user::Entity);

#[derive(MergedObject, Default, Debug)]
#[graphql(name = "AuthMutations")]
pub struct Mutations(queries::user::Mutations);
