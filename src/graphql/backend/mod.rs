mod auth;
mod crm;

use async_graphql::SimpleObject;

#[derive(SimpleObject, Default)]
pub struct Query {
    pub auth: auth::AuthQuery,
    pub crm: crm::CrmQuery,
}

#[derive(SimpleObject, Default)]
pub struct Mutation {
    pub auth: auth::AuthMutation,
    pub crm: crm::CrmMutation,
}
