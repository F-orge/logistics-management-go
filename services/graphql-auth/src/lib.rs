use async_graphql::MergedObject;

pub mod entities;
pub mod guards;
pub mod models;
pub mod mutation;
pub mod query;

#[derive(MergedObject, Default, Debug)]
#[graphql(name = "AuthQuery")]
pub struct Query(query::user::Query);

#[derive(MergedObject, Default, Debug)]
#[graphql(name = "AuthMutation")]
pub struct Mutation(
    mutation::user::Mutation,
    mutation::account::Mutation,
    mutation::session::Mutation,
);
