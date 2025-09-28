use async_graphql::MergedObject;

pub mod models;
pub mod mutation;
pub mod query;

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "CrmQueries")]
pub struct Query(
    query::companies::Query,
    query::contacts::Query,
    query::attactments::Query,
    query::campaigns::Query,
    query::cases::Query,
    query::interactions::Query,
    query::invoices::Query,
    query::leads::Query,
    query::notifications::Query,
    query::opportunities::Query,
    query::products::Query,
    query::tags::Query,
);

#[derive(Debug, Default, MergedObject)]
#[graphql(name = "CrmMutations")]
pub struct Mutation(
    mutation::companies::Mutation,
    mutation::contacts::Mutation,
    mutation::attactments::Mutation,
    mutation::campaigns::Mutation,
    mutation::cases::Mutation,
    mutation::interactions::Mutation,
    mutation::invoices::Mutation,
    mutation::leads::Mutation,
    mutation::notifications::Mutation,
    mutation::opportunities::Mutation,
    mutation::products::Mutation,
    mutation::tags::Mutation,
);
