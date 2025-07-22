mod auth;
mod crm;
mod lms;
mod org;

use async_graphql::SimpleObject;

#[derive(SimpleObject, Default)]
pub struct Query {
    pub auth: auth::AuthQuery,
    pub crm: crm::CrmQuery,
    pub org: org::OrgQuery,
}

#[derive(SimpleObject, Default)]
pub struct Mutation {
    pub auth: auth::AuthMutation,
    pub crm: crm::CrmMutation,
    pub org: org::OrgMutation,
}
