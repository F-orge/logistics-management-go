use async_graphql::MergedObject;

pub mod entities;
pub mod guards;
pub mod models;
pub mod mutation;
pub mod queries;
pub mod query;

#[derive(MergedObject, Default, Debug)]
#[graphql(name = "AuthQuery")]
pub struct Query(query::user::Query);

#[derive(MergedObject, Default, Debug)]
#[graphql(name = "AuthMutations")]
pub struct Mutation(
    mutation::user::Mutation,
    mutation::account::Mutation,
    mutation::session::Mutation,
);
